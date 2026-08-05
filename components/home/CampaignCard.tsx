import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { formatYearRange } from "@/data/periods";
import { getBattle } from "@/data/battles";
import type { CampaignCoverage } from "@/lib/coverage";
import { StatusBadge } from "./StatusBadge";

export function CampaignCard({ coverage }: { coverage: CampaignCoverage }) {
  const { campaign, atlasLink, battleCount } = coverage;
  const battle = campaign.representativeBattle ? getBattle(campaign.representativeBattle) : undefined;

  return (
    <article className={`hp-campaign-card ${atlasLink ? "" : "is-planned"}`}>
      <header>
        <h3>{campaign.name}</h3>
        <p className="hp-years">{formatYearRange(campaign.startYear, campaign.endYear)}</p>
      </header>
      <p className="hp-campaign-note">{campaign.description}</p>
      <dl className="hp-campaign-facts">
        <div><dt>Region</dt><dd><MapPin size={13} aria-hidden="true" />{campaign.region}</dd></div>
        {battle ? (
          <div><dt>Battle</dt><dd>{battle.name}</dd></div>
        ) : campaign.representativeCommander ? (
          <div><dt>Commander</dt><dd>{campaign.representativeCommander}</dd></div>
        ) : null}
        {battleCount > 0 && <div><dt>Mapped</dt><dd>{battleCount} battle{battleCount === 1 ? "" : "s"}</dd></div>}
      </dl>
      <footer>
        <StatusBadge status={campaign.status} />
        {atlasLink ? (
          <Link href={atlasLink} className="hp-card-action">
            Open on the map <ArrowRight size={15} aria-hidden="true" />
          </Link>
        ) : (
          <span className="hp-card-note">Not yet mapped</span>
        )}
      </footer>
    </article>
  );
}
