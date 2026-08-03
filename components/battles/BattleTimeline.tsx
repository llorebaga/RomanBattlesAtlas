import { EvidenceBadge } from "@/components/EvidenceBadge";
import type { BattleMoment } from "@/types/history";

export function BattleTimeline({ moments }: { moments: BattleMoment[] }) {
  return <ol className="battle-timeline">{moments.map((moment, index) => <li key={moment.title}><span className="moment-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{moment.title}</h3><p>{moment.description}</p><EvidenceBadge certainty={moment.certainty} /></div></li>)}</ol>;
}
