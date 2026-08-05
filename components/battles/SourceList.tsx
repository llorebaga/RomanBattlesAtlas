import { sourcesByIds } from "@/data/sources";
import { formatHistoricalYear } from "@/lib/historicalDates";
import type { HistoricalSource } from "@/types/history";

// Says what each text survives for, not only what it is called. Many of the
// citations here point at one book of forty, or at a book that is lost apart from
// fragments. A reader told "Polybius, Book 15" and nothing else has no way to know
// that Book 3 stopped at Cannae, which is why Zama cites Book 15 at all.
function coverage(source: HistoricalSource): string | null {
  if (!source.covers?.length) return null;
  const parts = source.covers.map((range) => {
    const span = range.fromYear === range.toYear
      ? formatHistoricalYear(range.fromYear)
      : `${Math.abs(range.fromYear)}–${formatHistoricalYear(range.toYear)}`;
    return range.note ? `${span} (${range.note})` : span;
  });
  return `Survives for ${parts.join("; ")}`;
}

export function SourceList({ title, ids }: { title: string; ids: string[] }) {
  return (
    <div className="source-list">
      <h3>{title}</h3>
      <ol>
        {sourcesByIds(ids).map((source) => {
          const span = coverage(source);
          return (
            <li key={source.id}>
              <span>{source.citation}</span>
              {span && <em className="source-covers">{span}</em>}
              {source.note && <small>{source.note}</small>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
