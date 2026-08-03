"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Shield, X } from "lucide-react";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import type { Battle } from "@/types/history";

export function BattlePanel({ battle, onClose }: { battle: Battle; onClose: () => void }) {
  return (
    <aside className="battle-panel" aria-label={`${battle.name} information`}>
      <button className="panel-close" onClick={onClose} aria-label="Close battle information"><X size={18} /></button>
      <div className="panel-kicker"><EvidenceBadge certainty={battle.uncertainty.certainty} /> {battle.kind}</div>
      <h2>{battle.name}</h2><p className="panel-date">{battle.displayDate}</p>
      <p className="panel-location"><MapPin size={15} /> {battle.location}</p><p className="panel-summary">{battle.summary}</p>
      <dl className="battle-facts">
        <div><dt>Belligerents</dt><dd>{battle.belligerents.join(" · ")}</dd></div>
        <div><dt>Command</dt><dd>{battle.commanders.flatMap((group) => group.names).join(" · ")}</dd></div>
        <div><dt>Result</dt><dd>{battle.result}</dd></div>
      </dl>
      <div className="importance-note"><Shield size={17} /><p><strong>Why it mattered</strong>{battle.significance}</p></div>
      <p className="uncertainty-note"><strong>Location note:</strong> {battle.uncertainty.note}</p>
      <Link className="detail-link" href={`/battles/${battle.slug}`}>Read the full account <ArrowRight size={16} /></Link>
    </aside>
  );
}
