import { EvidenceBadge } from "@/components/EvidenceBadge";
import type { Certainty } from "@/types/history";

// The same grades the map, routes, and battle pages use. Presented as a method the
// project stands on, not as a disclaimer. The first four rank how well a claim is
// supported; the fifth marks a different kind of claim altogether.
const LEVELS: { certainty: Certainty; note: string }[] = [
  { certainty: "attested", note: "Strong primary or archaeological support." },
  { certainty: "probable", note: "A widely accepted reconstruction, supported by several sources." },
  { certainty: "disputed", note: "Credible interpretations disagree." },
  { certainty: "speculative", note: "Drawn so a leg of the story can be followed, and labelled as such." },
  { certainty: "traditional", note: "What the Roman annalists recorded, reported as memory rather than as evidence. Used for the early Republic, where the surviving accounts were written four centuries after the events." },
];

export function EvidenceLegend() {
  return (
    <ul className="hp-evidence-list">
      {LEVELS.map((level) => (
        <li key={level.certainty}>
          <EvidenceBadge certainty={level.certainty} />
          <p>{level.note}</p>
        </li>
      ))}
    </ul>
  );
}
