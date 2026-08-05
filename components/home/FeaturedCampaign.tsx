import Link from "next/link";
import { ArrowRight, Anchor, Swords, CalendarRange, MapPin } from "lucide-react";
import { battles } from "@/data/battles";
import { formatYearRange } from "@/data/periods";
import { atlasHref } from "@/lib/atlasLinks";
import type { CampaignCoverage } from "@/lib/coverage";
import { HomeMap, type HomeMapPoint } from "./HomeMap";
import { StatusBadge } from "./StatusBadge";

// The most developed campaign, presented as one campaign among many rather than
// as the whole project.
export function FeaturedCampaign({ coverage }: { coverage: CampaignCoverage }) {
  const { campaign, battleCount, navalBattleCount, atlasLink } = coverage;
  const points: HomeMapPoint[] = battles
    .filter((battle) => battle.war === campaign.eraId)
    .map((battle, index) => ({ id: battle.id, coordinates: battle.coordinates, kind: battle.kind, order: index }));

  return (
    <section className="hp-featured" aria-labelledby="hp-featured-title">
      <div className="hp-featured-copy">
        <p className="hp-eyebrow">Featured campaign</p>
        <h2 id="hp-featured-title">{campaign.name}</h2>
        <p className="hp-years hp-years-lg">{formatYearRange(campaign.startYear, campaign.endYear)}</p>
        <p className="hp-featured-lede">
          Follow Rome&rsquo;s first great overseas war, from the intervention at Messana to the decisive naval victory
          at the Aegates Islands.
        </p>
        <dl className="hp-featured-facts">
          <div><dt><CalendarRange size={15} aria-hidden="true" />Duration</dt><dd>{campaign.endYear - campaign.startYear} years of continuous war</dd></div>
          <div><dt><Swords size={15} aria-hidden="true" />Character</dt><dd>Land and naval conflict, with long sieges</dd></div>
          <div><dt><Anchor size={15} aria-hidden="true" />Battles mapped</dt><dd>{battleCount}, of which {navalBattleCount} at sea</dd></div>
          <div><dt><MapPin size={15} aria-hidden="true" />Region</dt><dd>{campaign.region}</dd></div>
        </dl>
        <div className="hp-featured-actions">
          <StatusBadge status={campaign.status} />
          <Link href={`/battles/${campaign.representativeBattle ?? "messana"}`} className="hp-button hp-button-primary">Explore campaign</Link>
          {atlasLink && (
            <Link href={atlasHref({ year: campaign.startYear, campaign: campaign.eraId })} className="hp-button hp-button-ghost">
              Open at {Math.abs(campaign.startYear)} BCE <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
      <div className="hp-featured-visual">
        <HomeMap
          title={`Battle sites of the ${campaign.name}`}
          bounds={{ west: 6, east: 19, south: 33, north: 41 }}
          points={points}
        />
        <p className="hp-figure-note">Every battle site of the war, drawn from the atlas data.</p>
      </div>
    </section>
  );
}
