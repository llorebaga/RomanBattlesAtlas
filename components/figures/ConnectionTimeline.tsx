"use client";
// The connections chart.
//
// Everything positional is computed on the server by lib/connectionLayout.ts and
// arrives here as coordinates, so the first paint is the whole graph — no
// measuring, no layout effect, and the same picture with JavaScript disabled.
// What this component adds is the part that needs a pointer: pick a person and
// everything they are not connected to steps back.
import { useState } from "react";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import type { ChartEdge, ChartEntry, ConnectionChart } from "@/lib/connectionLayout";
import type { Certainty } from "@/types/history";

interface KindInfo {
  kind: string;
  title: string;
  color: string;
}

// How sure the link is, in the line itself. The atlas says this with a badge
// everywhere else; a chart has to say it in the stroke or not at all.
const DASH: Record<Certainty, string | undefined> = {
  attested: undefined,
  probable: "6 4",
  disputed: "2 4",
  speculative: "1 5",
  traditional: "9 3 2 3",
};

/** The one sentence a hover has to answer: who, what, and when. */
function describe(edge: ChartEdge, bySlug: Map<string, ChartEntry>) {
  const when = edge.battleName
    ? ` at ${edge.battleName}`
    : edge.datedExactly
      ? ""
      : " (placed where their lives overlap)";
  return `${bySlug.get(edge.from)?.name} ${edge.label} ${bySlug.get(edge.to)?.name} · ${Math.abs(edge.year)} BCE${when} · ${edge.certainty}`;
}

export function ConnectionTimeline({ chart, kinds }: { chart: ConnectionChart; kinds: KindInfo[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [hiddenKinds, setHiddenKinds] = useState<Record<string, boolean>>({});

  const colorOf = (kind: string) => kinds.find((entry) => entry.kind === kind)?.color ?? "#7b7466";
  const visible = (edge: ChartEdge) => !hiddenKinds[edge.kind];
  const edges = chart.edges.filter(visible);

  // Hover previews, a click pins it. Both drive the same dimming, so the chart
  // answers "who is this person connected to" before you commit to a click.
  const focus = selected ?? hovered;
  const neighbours = new Set<string>();
  if (focus) {
    neighbours.add(focus);
    for (const edge of edges) {
      if (edge.from === focus) neighbours.add(edge.to);
      if (edge.to === focus) neighbours.add(edge.from);
    }
  }
  const dimmed = (slug: string) => Boolean(focus) && !neighbours.has(slug);
  const edgeLit = (edge: ChartEdge) => !focus || edge.from === focus || edge.to === focus;

  const bySlug = new Map(chart.entries.map((entry) => [entry.slug, entry]));
  const selectedEntry = selected ? bySlug.get(selected) : undefined;
  const selectedEdges = selected
    ? chart.edges.filter((edge) => edge.from === selected || edge.to === selected)
    : [];
  const unconnected = chart.entries.filter((entry) => entry.degree === 0);

  function toggle(slug: string) {
    setSelected((current) => (current === slug ? null : slug));
  }

  return (
    <div className="ct" onKeyDown={(event) => { if (event.key === "Escape") setSelected(null); }}>
      <div className="ct-controls">
        <div className="ct-key" role="group" aria-label="Kinds of connection — press to show or hide">
          {kinds.map(({ kind, title, color }) => {
            const on = !hiddenKinds[kind];
            const count = chart.edges.filter((edge) => edge.kind === kind).length;
            return (
              <button
                key={kind}
                type="button"
                className={`ct-key-item ${on ? "" : "is-off"}`}
                aria-pressed={on}
                onClick={() => setHiddenKinds((current) => ({ ...current, [kind]: on }))}
              >
                <svg viewBox="0 0 26 6" aria-hidden="true"><line x1="1" y1="3" x2="25" y2="3" stroke={color} strokeWidth="2.4" strokeLinecap="round" /></svg>
                {title} <span className="ct-count">{count}</span>
              </button>
            );
          })}
        </div>
        {selected && (
          <button type="button" className="ct-clear" onClick={() => setSelected(null)}>Clear selection</button>
        )}
      </div>

      <div className="ct-scroll">
        <svg
          className="ct-svg"
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          role="group"
          aria-label={`Timeline of ${chart.entries.length} figures and ${chart.edges.length} connections, ${Math.abs(chart.domain.from)} to ${Math.abs(chart.domain.to)} BCE`}
          onPointerLeave={() => setHovered(null)}
        >
          {/* Periods across the top, and the century lines they sit on. */}
          <g className="ct-bands">
            {chart.bands.map((band, index) => (
              <g key={band.id}>
                <rect x={band.x0} y={0} width={Math.max(0, band.x1 - band.x0)} height={16} className={index % 2 ? "ct-band alt" : "ct-band"} />
                <text x={(band.x0 + band.x1) / 2} y={11} className="ct-band-label">{band.label}</text>
              </g>
            ))}
          </g>
          <g className="ct-grid" aria-hidden="true">
            {chart.ticks.map((tick) => (
              <g key={tick.year}>
                <line x1={tick.x} y1={18} x2={tick.x} y2={chart.height - 4} />
                <text x={tick.x} y={30} className="ct-tick">{tick.label}</text>
              </g>
            ))}
          </g>

          {/* The line the wars are fought across. */}
          <line x1={0} y1={chart.axisY} x2={chart.width} y2={chart.axisY} className="ct-divider" />
          <text x={6} y={chart.axisY - 4} className="ct-side-label">ROME</text>
          <text x={6} y={chart.axisY + 11} className="ct-side-label">AND THOSE SHE FOUGHT</text>

          {/* Lines under the names, markers over them. An edge arriving at a bar
              has to cross that bar's own name to get there — there is nowhere
              else for either of them to be — so the line goes behind the paper
              halo and the dot, which carries the year and the tooltip, stays on
              top where it can still be read and pointed at. */}
          <g className="ct-edges">
            {edges.map((edge) => (
              <g key={edge.id} className={edgeLit(edge) ? "ct-edge" : "ct-edge is-dim"}>
                <path d={edge.path} fill="none" stroke={colorOf(edge.kind)} strokeDasharray={DASH[edge.certainty]} />
                <path d={edge.path} fill="none" stroke="transparent" strokeWidth={11} className="ct-hit">
                  <title>{describe(edge, bySlug)}</title>
                </path>
              </g>
            ))}
          </g>

          <g className="ct-people">
            {chart.entries.map((entry) => (
              <Person
                key={entry.slug}
                entry={entry}
                dim={dimmed(entry.slug)}
                active={selected === entry.slug}
                onEnter={() => setHovered(entry.slug)}
                onSelect={() => toggle(entry.slug)}
              />
            ))}
          </g>

          <g className="ct-markers">
            {edges.map((edge) => (
              <circle
                key={edge.id}
                className={edgeLit(edge) ? "ct-edge" : "ct-edge is-dim"}
                cx={edge.midX}
                cy={edge.midY}
                r={3.4}
                /* Filled where a source gives the year, open where the chart has
                   placed it in the years the two of them overlapped. */
                fill={edge.datedExactly ? colorOf(edge.kind) : "var(--hp-parchment)"}
                stroke={colorOf(edge.kind)}
              >
                <title>{describe(edge, bySlug)}</title>
              </circle>
            ))}
          </g>
        </svg>
      </div>

      <div className="ct-panel" aria-live="polite">
        {selectedEntry ? (
          <>
            <p className="ct-panel-kicker">
              <span className="power-swatch" aria-hidden="true" style={{ background: selectedEntry.color }} />
              {selectedEntry.title} · {selectedEntry.lifespan}
              {!selectedEntry.bornKnown && <span className="ct-caveat"> · birth year unrecorded</span>}
            </p>
            <h3>
              {selectedEntry.mapped
                ? <Link href={`/figures/${selectedEntry.slug}`}>{selectedEntry.name}</Link>
                : selectedEntry.name}
            </h3>
            <p className="ct-known">{selectedEntry.knownFor}</p>
            {selectedEdges.length === 0 ? (
              <p className="ct-empty">The atlas records no connection between this person and anyone else it holds.</p>
            ) : (
              <ul className="ct-relations">
                {selectedEdges.map((edge) => {
                  const otherSlug = edge.from === selected ? edge.to : edge.from;
                  const other = bySlug.get(otherSlug);
                  const outgoing = edge.from === selected;
                  return (
                    <li key={edge.id}>
                      <p className="ct-relation-claim">
                        <i className="ct-dot" style={{ background: colorOf(edge.kind) }} aria-hidden="true" />
                        {outgoing ? "" : `${other?.name} `}
                        <em>{edge.label}</em>
                        {outgoing ? ` ${other?.name}` : " them"}
                        <button type="button" className="ct-jump" onClick={() => setSelected(otherSlug)}>
                          follow
                        </button>
                        <EvidenceBadge certainty={edge.certainty} compact />
                      </p>
                      <p className="ct-relation-when">
                        {Math.abs(edge.year)} BCE
                        {edge.battleSlug ? <> · <Link href={`/battles/${edge.battleSlug}`}>{edge.battleName}</Link></> : edge.datedExactly ? "" : " · placed where their lives overlap"}
                      </p>
                      <p>{edge.note}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          <>
            <h3>Pick anyone on the chart</h3>
            <p>
              Their connections stay lit and everything else steps back. Each line is drawn at the year it belongs to —
              a filled dot where a source gives that year, an open one where the chart has placed it in the years the
              two of them overlapped. {chart.entries.length} people, {chart.edges.length} connections.
            </p>
            {unconnected.length > 0 && (
              <p className="ct-empty">
                {unconnected.map((entry) => entry.name).join(", ")}{" "}
                {unconnected.length === 1 ? "has" : "have"} no recorded connection to anyone else the atlas holds, and
                {unconnected.length === 1 ? " sits" : " sit"} on the timeline without a line to anybody.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Person({
  entry, dim, active, onEnter, onSelect,
}: {
  entry: ChartEntry;
  dim: boolean;
  active: boolean;
  onEnter: () => void;
  onSelect: () => void;
}) {
  const lifeWidth = Math.max(1.5, entry.x1 - entry.x0);
  const activeWidth = Math.max(1.5, entry.activeX1 - entry.activeX0);
  return (
    <g
      className={`ct-person${dim ? " is-dim" : ""}${active ? " is-active" : ""}${entry.degree === 0 ? " is-alone" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`${entry.name}, ${entry.title}, ${entry.lifespan}. ${entry.degree} connections.`}
      onPointerEnter={onEnter}
      onFocus={onEnter}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(); }
      }}
    >
      <title>{`${entry.name} — ${entry.lifespan}`}</title>
      {/* The whole life, faint; the years they mattered militarily, solid. */}
      <rect x={entry.x0} y={entry.y} width={lifeWidth} height={entry.height} rx={2} fill={entry.color} fillOpacity={0.22} />
      <rect x={entry.activeX0} y={entry.y} width={activeWidth} height={entry.height} rx={2} fill={entry.color} />
      {/* An unknown birth is not a life that began at the first campaign. */}
      {!entry.bornKnown && (
        <rect x={entry.x0 - 1} y={entry.y} width={2} height={entry.height} fill={entry.color} fillOpacity={0.5} />
      )}
      <text x={entry.labelX} y={entry.labelY} className="ct-name">{entry.name}</text>
    </g>
  );
}
