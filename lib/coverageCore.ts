// Coverage arithmetic, with the data passed in.
//
// Keeping this free of runtime imports does two things: the type-stripping test
// runner can exercise it directly, and the rules ("a card may only claim battles
// the map holds") are stated once, in pure functions, rather than inside
// components. lib/coverage.ts binds the real data for the app.
import type { Battle, CampaignRoute } from "@/types/history";
import type { CampaignEntry } from "@/data/campaignIndex";
import type { CoverageStatus, HistoricalPeriod } from "@/data/periods";
import type { AtlasDeepLink } from "@/lib/atlasLinks";

export interface CampaignCoverageCore {
  campaign: CampaignEntry;
  battleCount: number;
  routeCount: number;
  majorBattleCount: number;
  navalBattleCount: number;
  /** Null when nothing is mapped — that is what makes a card inert. */
  link: AtlasDeepLink | null;
}

export function computeCampaignCoverage(battles: Battle[], routes: CampaignRoute[], campaign: CampaignEntry): CampaignCoverageCore {
  const mapped = campaign.eraId ? battles.filter((battle) => battle.war === campaign.eraId) : [];
  const mappedRoutes = campaign.eraId ? routes.filter((route) => route.war === campaign.eraId) : [];
  return {
    campaign,
    battleCount: mapped.length,
    routeCount: mappedRoutes.length,
    majorBattleCount: mapped.filter((battle) => battle.major).length,
    navalBattleCount: mapped.filter((battle) => battle.kind === "naval").length,
    link: campaign.eraId
      ? { year: campaign.startYear, campaign: campaign.eraId, ...(campaign.focus ? { location: campaign.focus.location, zoom: campaign.focus.zoom } : {}) }
      : null,
  };
}

export interface PeriodCoverageCore {
  period: HistoricalPeriod;
  campaigns: CampaignCoverageCore[];
  battleCount: number;
  link: AtlasDeepLink | null;
}

export function computePeriodCoverage(battles: Battle[], routes: CampaignRoute[], campaigns: CampaignEntry[], period: HistoricalPeriod): PeriodCoverageCore {
  const entries = campaigns.filter((campaign) => campaign.periodId === period.id).map((campaign) => computeCampaignCoverage(battles, routes, campaign));
  const battleCount = entries.reduce((total, entry) => total + entry.battleCount, 0);
  return {
    period,
    campaigns: entries,
    battleCount,
    link: battleCount > 0
      ? { year: period.representativeYear, ...(period.focus ? { location: period.focus.location, zoom: period.focus.zoom } : {}) }
      : null,
  };
}

export function computeTotals(battles: Battle[], routes: CampaignRoute[]) {
  const mapped = battles.filter((battle) => Boolean(battle.war));
  return {
    battles: mapped.length,
    wars: new Set(mapped.map((battle) => battle.war)).size,
    routes: routes.length,
    naval: mapped.filter((battle) => battle.kind === "naval").length,
    sieges: mapped.filter((battle) => battle.kind === "siege").length,
  };
}

export const STATUS_LABEL: Record<CoverageStatus, string> = {
  available: "Available",
  partial: "Partial",
  development: "In development",
  planned: "Planned",
};
