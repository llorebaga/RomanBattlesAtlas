import Link from "next/link";
import { battles } from "@/data/battles";
import { sources } from "@/data/sources";
import { battleDiagrams } from "@/data/battleDiagrams";
import { campaignRoutes } from "@/data/campaigns";
import { formatHistoricalYear } from "@/lib/historicalDates";
import { battleHref } from "@/lib/atlasLinks";
import type { HistoricalSource } from "@/types/history";

// The evidence base as a structure rather than a bibliography.
//
// A flat list of titles hides the two things a reader of this atlas most needs to
// know: how much of it rests on any one text, and which centuries a text is even
// able to speak for. Polybius' Book 1 carries eleven battles; Livy's Periochae
// carries four, and is a paragraph per book. Both facts are computed from the same
// data the pages cite, so this cannot drift out of step with them.

function coverage(source: HistoricalSource): string | null {
  if (!source.covers?.length) return null;
  return source.covers
    .map((range) => {
      const span = range.fromYear === range.toYear
        ? formatHistoricalYear(range.fromYear)
        : `${Math.abs(range.fromYear)}–${formatHistoricalYear(range.toYear)}`;
      return range.note ? `${span} (${range.note})` : span;
    })
    .join("; ");
}

/** Everything on the atlas that leans on a given source, counted from the data. */
function usage(id: string) {
  const cited = battles.filter((battle) => battle.ancientSourceIds.includes(id) || battle.modernSourceIds.includes(id));
  const diagrams = Object.entries(battleDiagrams).filter(([, diagram]) => diagram.sourceIds?.includes(id)).length;
  const routes = campaignRoutes.filter((route) => route.points.some((point) => point.sourceIds.includes(id))).length;
  return { cited, diagrams, routes };
}

export function EvidenceRegister() {
  // Ancient sources in the order the atlas needs them, earliest surviving year first.
  const ancient = sources
    .filter((source) => source.kind === "ancient")
    .slice()
    .sort((a, b) => Math.min(...(a.covers ?? []).map((r) => r.fromYear)) - Math.min(...(b.covers ?? []).map((r) => r.fromYear)));
  const modern = sources.filter((source) => source.kind === "modern");

  // How many battles hang on a single ancient text. This is the number that says
  // how much of the atlas is one manuscript away from being unwritable.
  const single = battles.filter((battle) => battle.ancientSourceIds.length === 1);

  return (
    <div className="hp-register">
      <p className="hp-register-lede">
        {ancient.length} ancient texts and {modern.length} modern works carry the whole atlas. Each ancient text below
        says which years it actually <em>survives</em> for, and how much of this site rests on it — every figure on this
        page is counted from the same data the battle pages cite, so none of it can drift away from the citations.
        {single.length > 0 && (
          <> {single.length === 1 ? "One battle rests" : `${single.length} battles rest`} on a single ancient text:{" "}
            {single.map((battle, index) => (
              <span key={battle.slug}>
                {index > 0 && ", "}
                <Link href={battleHref(battle.slug)}>{battle.name}</Link>
              </span>
            ))}.
          </>
        )}
      </p>

      <h3 className="hp-register-heading">Ancient testimony</h3>
      <ol className="hp-register-list">
        {ancient.map((source) => {
          const { cited, diagrams, routes } = usage(source.id);
          const span = coverage(source);
          const leans = [
            cited.length > 0 && `${cited.length} battle${cited.length === 1 ? "" : "s"}`,
            diagrams > 0 && `${diagrams} diagram${diagrams === 1 ? "" : "s"}`,
            routes > 0 && `${routes} route${routes === 1 ? "" : "s"}`,
          ].filter(Boolean).join(", ");
          return (
            <li key={source.id}>
              <p className="hp-register-cite">{source.citation}</p>
              {span && <p className="hp-register-span">Survives for {span}</p>}
              {source.note && <p className="hp-register-note">{source.note}</p>}
              {leans && <p className="hp-register-leans">Cited by {leans}</p>}
            </li>
          );
        })}
      </ol>

      <h3 className="hp-register-heading">Modern scholarship</h3>
      <ol className="hp-register-list hp-register-modern">
        {modern.map((source) => (
          <li key={source.id}>
            <p className="hp-register-cite">{source.citation}</p>
            {source.note && <p className="hp-register-note">{source.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}
