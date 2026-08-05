"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { factionColor, getFactionInfo } from "@/data/factions";
import type { BattleDiagram as Diagram, Faction } from "@/types/history";
import { BattleDiagramFigure } from "./BattleDiagramFigure";

const KIND_LABEL: Record<string, string> = {
  infantry: "Infantry",
  phalanx: "Pike phalanx",
  skirmishers: "Skirmishers",
  cavalry: "Cavalry",
  elephants: "Elephants",
  ships: "Ships",
  camp: "Camp",
  works: "Field works",
};

// Steps through the stages of a battle. The stage list is also the reading order,
// so the sequence works as prose whether or not anyone touches the controls.
export function BattleDiagram({ diagram, title }: { diagram: Diagram; title: string }) {
  const [index, setIndex] = useState(0);
  const last = diagram.stages.length - 1;

  // Legend built from what this battle actually contains.
  const present = new Map<string, { faction: Faction; kind: string }>();
  for (const unit of diagram.stages.flatMap((entry) => entry.units)) {
    present.set(`${unit.faction}-${unit.kind}`, { faction: unit.faction, kind: unit.kind });
  }

  return (
    <div className="bd">
      <div className="bd-stage">
        {/* Every stage is rendered into the page, not just the active one: the
            whole battle is then present for a crawler and for a reader whose
            JavaScript never arrives, and switching stages costs no work. */}
        {diagram.stages.map((entry, position) => (
          <div key={entry.id} className="bd-panel" hidden={position !== index}>
            <BattleDiagramFigure stage={entry} terrain={diagram.terrain} title={title} />
          </div>
        ))}
        <ol className="bd-ticks" aria-hidden="true">
          {diagram.stages.map((entry, position) => (
            <li key={entry.id} className={position === index ? "is-active" : position < index ? "is-past" : ""} />
          ))}
        </ol>
      </div>

      <div className="bd-controls">
        <button type="button" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0} aria-label="Previous stage">
          <ChevronLeft size={16} aria-hidden="true" /> Previous
        </button>
        <p className="bd-counter" aria-live="polite">Stage {index + 1} of {diagram.stages.length}</p>
        <button type="button" onClick={() => setIndex(Math.min(last, index + 1))} disabled={index === last} aria-label="Next stage">
          Next <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Every stage as text, so the whole battle is readable without the controls
          and available to a screen reader in order. */}
      <ol className="bd-stages">
        {diagram.stages.map((entry, position) => (
          <li key={entry.id} className={position === index ? "is-active" : ""}>
            <button type="button" onClick={() => setIndex(position)} aria-current={position === index}>
              <span className="bd-stage-number">{String(position + 1).padStart(2, "0")}</span>
              <span className="bd-stage-copy">
                <strong>{entry.title}</strong>
                <span>{entry.description}</span>
                <span className="bd-stage-meta">
                  <EvidenceBadge certainty={entry.certainty} />
                  {entry.caveat && <em>{entry.caveat}</em>}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="bd-legend">
        <div className="bd-legend-keys">
          {[...present.values()].map(({ faction, kind }) => (
            <span key={`${faction}-${kind}`}>
              <i style={{ background: factionColor(faction) }} aria-hidden="true" />
              {getFactionInfo(faction)?.adjective ?? faction} {KIND_LABEL[kind]?.toLowerCase() ?? kind}
            </span>
          ))}
        </div>
        <p className="bd-scale"><Info size={14} aria-hidden="true" /> {diagram.scaleNote}{diagram.orientation ? ` ${diagram.orientation}` : ""}</p>
      </div>
    </div>
  );
}
