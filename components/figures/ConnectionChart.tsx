import { CHART_FRAME, chartArcs, chartNodes, relations } from "@/data/figureRelations";

// The relation kinds that arc over the top row, and the colour each one draws in.
// Kept here rather than in CSS because the SVG has to carry its own key.
const STROKE: Record<string, string> = {
  family: "#8a6a2f",
  service: "#3f6b52",
  rivalry: "#a33d33",
  battlefield: "#7b7466",
};

const byPair = new Map(relations.map((relation) => [`${relation.from}|${relation.to}`, relation]));
const node = (slug: string) => chartNodes.find((entry) => entry.slug === slug);

/** The relation joining two slugs, in whichever direction it was authored. */
function relationFor(a: string, b: string) {
  return byPair.get(`${a}|${b}`) ?? byPair.get(`${b}|${a}`);
}

export function ConnectionChart() {
  const { width, height, topRow, bottomRow } = CHART_FRAME;

  // Every top-row figure that faced someone on the bottom row, drawn as a
  // straight line down. These are the battles the atlas actually holds.
  const meetings = chartNodes
    .filter((entry) => entry.y === topRow)
    .flatMap((top) =>
      chartNodes
        .filter((entry) => entry.y === bottomRow)
        .flatMap((bottom) => {
          const relation = relationFor(top.slug, bottom.slug);
          return relation && relation.kind === "battlefield" ? [{ top, bottom, relation }] : [];
        }),
    );

  return (
    <figure className="connection-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="chart-title chart-desc">
        <title id="chart-title">How the figures of the atlas are connected</title>
        <desc id="chart-desc">
          Roman commanders along the top in chronological order, the opponents they faced below them, with family,
          service and rivalry links arcing over the top row. Every connection is listed in full beneath the chart.
        </desc>

        {/* Meetings first, so the arcs above sit over them rather than under. */}
        {meetings.map(({ top, bottom, relation }) => (
          <line
            key={`${top.slug}-${bottom.slug}`}
            x1={top.x} y1={top.y + 5} x2={bottom.x} y2={bottom.y - 5}
            stroke={STROKE.battlefield} strokeWidth={0.5} strokeDasharray="2 1.6"
          >
            <title>{`${top.label} ${relation.label} ${bottom.label} — ${relation.certainty}`}</title>
          </line>
        ))}

        {chartArcs.map(({ from, to, lift }) => {
          const a = node(from);
          const b = node(to);
          const relation = relationFor(from, to);
          if (!a || !b || !relation) return null;
          const mid = (a.x + b.x) / 2;
          return (
            <path
              key={`${from}-${to}`}
              d={`M${a.x} ${a.y - 4} Q${mid} ${lift} ${b.x} ${b.y - 4}`}
              fill="none" stroke={STROKE[relation.kind]} strokeWidth={0.7}
            >
              <title>{`${a.label} ${relation.label} ${b.label} — ${relation.certainty}`}</title>
            </path>
          );
        })}

        {chartNodes.map((entry) => (
          <g key={entry.slug}>
            <circle cx={entry.x} cy={entry.y} r={2.1} fill={entry.y === CHART_FRAME.topRow ? "#8a2b26" : "#3f4a55"} />
            <text
              x={entry.x}
              y={entry.y === CHART_FRAME.topRow ? entry.y + 8 : entry.y - 5}
              textAnchor="middle"
              fontSize={3.6}
            >
              {entry.label}
            </text>
          </g>
        ))}
      </svg>

      <figcaption>
        <ul className="chart-key">
          {[
            ["family", "Blood, marriage, adoption"],
            ["service", "Served under"],
            ["rivalry", "Rivals and partners"],
            ["battlefield", "Met in the field"],
          ].map(([kind, label]) => (
            <li key={kind}><i style={{ background: STROKE[kind] }} aria-hidden="true" />{label}</li>
          ))}
        </ul>
        <p>
          Commanders along the top, in the order the atlas meets them; the opponents they faced below. The middle of
          the chart is the point of it — Scipio Aemilianus, Marius and Jugurtha were in the same camp at Numantia in
          134, and the two halves of this atlas meet at that one node.
        </p>
      </figcaption>
    </figure>
  );
}
