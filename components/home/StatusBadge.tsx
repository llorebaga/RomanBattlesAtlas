import { STATUS_LABEL } from "@/lib/coverage";
import type { CoverageStatus } from "@/data/periods";

// Coverage is never signalled by colour alone: each state carries its own glyph
// and its written label.
const GLYPH: Record<CoverageStatus, string> = {
  available: "●",
  partial: "◐",
  development: "◑",
  planned: "○",
};

export function StatusBadge({ status }: { status: CoverageStatus }) {
  return (
    <span className={`status-badge status-${status}`}>
      <i aria-hidden="true">{GLYPH[status]}</i>
      {STATUS_LABEL[status]}
    </span>
  );
}
