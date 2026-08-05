import { battles } from "@/data/battles";
import { campaignRoutes } from "@/data/campaigns";
import { campaignIndex, type CampaignEntry } from "@/data/campaignIndex";
import { periods, type HistoricalPeriod } from "@/data/periods";
import { atlasHref } from "@/lib/atlasLinks";
import { computeCampaignCoverage, computePeriodCoverage, computeTotals, type CampaignCoverageCore, type PeriodCoverageCore } from "@/lib/coverageCore";

// The app-facing view of coverage: the same arithmetic as lib/coverageCore.ts with
// the real data bound in and links resolved to hrefs, so components receive
// strings and never build a URL themselves.
export { STATUS_LABEL } from "@/lib/coverageCore";

export type CampaignCoverage = Omit<CampaignCoverageCore, "link"> & { atlasLink: string | null };
export type PeriodCoverage = Omit<PeriodCoverageCore, "link" | "campaigns"> & { campaigns: CampaignCoverage[]; atlasLink: string | null };

const withHref = <T extends { link: unknown }>(entry: T) => {
  const { link, ...rest } = entry;
  return { ...rest, atlasLink: link ? atlasHref(link) : null };
};

export function campaignCoverage(campaign: CampaignEntry): CampaignCoverage {
  return withHref(computeCampaignCoverage(battles, campaignRoutes, campaign)) as CampaignCoverage;
}

export function allCampaignCoverage(): CampaignCoverage[] {
  return campaignIndex.map(campaignCoverage);
}

export function periodCoverage(period: HistoricalPeriod): PeriodCoverage {
  const core = computePeriodCoverage(battles, campaignRoutes, campaignIndex, period);
  return {
    ...withHref(core),
    campaigns: core.campaigns.map((entry) => withHref(entry) as CampaignCoverage),
  } as PeriodCoverage;
}

export function allPeriodCoverage(): PeriodCoverage[] {
  return periods.map(periodCoverage);
}

export function atlasTotals() {
  return computeTotals(battles, campaignRoutes);
}
