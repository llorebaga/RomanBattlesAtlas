import { EvidenceBadge } from "@/components/EvidenceBadge";
import type { Certainty } from "@/types/history";

// The same four categories the map, routes, and battle pages use. Presented as a
// method the project stands on, not as a disclaimer.
const LEVELS: { certainty: Certainty; note: string }[] = [
  { certainty: "attested", note: "Strong primary or archaeological support." },
  { certainty: "probable", note: "A widely accepted reconstruction, supported by several sources." },
  { certainty: "disputed", note: "Credible interpretations disagree." },
  { certainty: "speculative", note: "Drawn so a leg of the story can be followed, and labelled as such." },
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
