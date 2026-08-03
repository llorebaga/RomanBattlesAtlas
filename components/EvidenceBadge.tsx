import type { Certainty } from "@/types/history";

const labels: Record<Certainty, string> = {
  attested: "Attested",
  probable: "Probable",
  disputed: "Disputed",
  speculative: "Speculative",
};

export function EvidenceBadge({ certainty, compact = false }: { certainty: Certainty; compact?: boolean }) {
  return (
    <span className={`evidence-badge evidence-${certainty}`} title={compact ? labels[certainty] : undefined}>
      <span aria-hidden="true" className="evidence-dot" />
      {compact ? labels[certainty].slice(0, 1) : labels[certainty]}
    </span>
  );
}
