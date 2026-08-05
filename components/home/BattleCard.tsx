import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { battleHref, battleOnMapHref } from "@/lib/atlasLinks";
import type { Battle } from "@/types/history";

const KIND_LABEL: Record<Battle["kind"], string> = {
  land: "Land battle",
  naval: "Naval battle",
  siege: "Siege",
  campaign: "Campaign",
};
const KIND_GLYPH: Record<Battle["kind"], string> = { land: "⚔", naval: "≋", siege: "◎", campaign: "↟" };

export function BattleCard({ battle }: { battle: Battle }) {
  return (
    <article className="hp-battle-card">
      <div className="hp-battle-kind">
        <span className={`hp-battle-glyph ${battle.kind}`} aria-hidden="true">{KIND_GLYPH[battle.kind]}</span>
        <span>{KIND_LABEL[battle.kind]}</span>
      </div>
      <h3><Link href={battleHref(battle.slug)}>{battle.name}</Link></h3>
      <p className="hp-years">{battle.displayDate}</p>
      <p className="hp-battle-note">{battle.summary}</p>
      <p className="hp-battle-result"><strong>Result</strong> {battle.result}</p>
      <p className="hp-battle-place"><MapPin size={13} aria-hidden="true" />{battle.location}</p>
      <footer>
        <EvidenceBadge certainty={battle.uncertainty.certainty} />
        <div className="hp-battle-actions">
          <Link href={battleHref(battle.slug)} className="hp-card-action">Full account <ArrowRight size={14} aria-hidden="true" /></Link>
          <Link href={battleOnMapHref(battle)} className="hp-card-action hp-card-action-quiet">View on map</Link>
        </div>
      </footer>
    </article>
  );
}
