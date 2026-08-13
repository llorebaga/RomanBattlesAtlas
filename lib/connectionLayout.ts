// Where the connections chart puts things.
//
// The old chart was hand-placed: fourteen names on two rows at coordinates typed
// into the data file, with a test to stop them colliding. That works until you
// add a fifteenth. It also could not say *when* anything happened — Sulla and
// Hannibal sat the same distance apart as Sulla and Pompey.
//
// This is the same picture drawn from the dates instead. Time runs left to right
// on the atlas's own scale, each person is the span of their life with the years
// they mattered militarily picked out inside it, Romans are packed into lanes
// above the axis and everyone they fought below it, and a relation is drawn at
// the point on the timeline where it belongs — for a battlefield meeting, the
// year of the battle the atlas actually holds.
//
// Kept free of runtime "@/" imports so the type-stripping test runner can load
// it directly; the caller binds the real data, exactly as lib/coverageCore.ts
// does for the homepage.
import type { Certainty } from "@/types/history";

export type Side = "rome" | "other";

/** What the caller has to supply about a person. Display strings come in ready. */
export interface ChartFigureInput {
  slug: string;
  name: string;
  title: string;
  faction: string;
  /** The map colour of their side, so the chart and the atlas agree. */
  color: string;
  bornYear?: number;
  diedYear: number;
  activeFrom: number;
  activeTo: number;
  battleSlugs: string[];
  lifespan: string;
  knownFor: string;
  mapped: boolean;
}

export interface ChartRelationInput {
  from: string;
  to: string;
  kind: string;
  label: string;
  note: string;
  certainty: Certainty;
  /** Set where the year is known. Otherwise it is inferred; see anchorYear. */
  year?: number;
}

export interface ChartBattleInput {
  slug: string;
  name: string;
  startYear: number;
}

export interface ChartBandInput {
  id: string;
  shortName: string;
  startYear: number;
  endYear: number;
}

export interface ChartEntry {
  slug: string;
  name: string;
  title: string;
  faction: string;
  color: string;
  side: Side;
  lane: number;
  lifespan: string;
  knownFor: string;
  mapped: boolean;
  /** False for Spartacus, who has no birth year anybody recorded. */
  bornKnown: boolean;
  /** The whole life. */
  x0: number;
  x1: number;
  /** The years they mattered militarily, drawn solid inside the life. */
  activeX0: number;
  activeX1: number;
  y: number;
  height: number;
  labelX: number;
  labelY: number;
  /** How many relations touch them. Zero is drawn quieter and said out loud. */
  degree: number;
}

export interface ChartEdge {
  id: string;
  from: string;
  to: string;
  kind: string;
  label: string;
  note: string;
  certainty: Certainty;
  year: number;
  /** Set when the anchor is a battle both of them fought in this atlas. */
  battleSlug?: string;
  battleName?: string;
  /** True when the year was authored rather than inferred from overlapping lives. */
  datedExactly: boolean;
  path: string;
  /** Midpoint of the curve, for the marker that carries the tooltip. */
  midX: number;
  midY: number;
}

export interface ConnectionChart {
  width: number;
  height: number;
  axisY: number;
  domain: { from: number; to: number };
  entries: ChartEntry[];
  edges: ChartEdge[];
  bands: { id: string; label: string; x0: number; x1: number }[];
  ticks: { year: number; x: number; label: string }[];
}

// ── The frame ───────────────────────────────────────────────────────────────
// Drawn in a 1000-unit-wide viewBox and scaled by CSS, so these are effectively
// pixels at the chart's nominal width.
export const CHART = {
  width: 1000,
  padX: 14,
  bandStripHeight: 20,
  axisLabelHeight: 17,
  laneHeight: 27,
  barHeight: 9,
  labelSize: 11,
  /** Average advance per character at labelSize, for the packing arithmetic. */
  charAdvance: 0.55,
  /** Clear space between two entries sharing a lane. */
  laneGap: 12,
  dividerGap: 13,
  bottomPad: 10,
  tickStep: 50,
} as const;

/**
 * Rome's own armies. From 88 BCE the atlas has to draw Romans fighting Romans,
 * so `optimates` and `populares` exist as separate factions — labels of
 * convenience, as data/factions.ts says at length, not parties. For this chart
 * all three belong on the Roman side of the axis: the point of the lower band is
 * "the people Rome fought", and Pompey does not stop being Roman in 49.
 */
export const ROMAN_FACTIONS = ["rome", "optimates", "populares"];

export const sideOf = (faction: string): Side => (ROMAN_FACTIONS.includes(faction) ? "rome" : "other");

/** A person's first year on the chart: their birth, or their first campaign. */
export const startYearOf = (figure: { bornYear?: number; activeFrom: number }) => figure.bornYear ?? figure.activeFrom;

const pairKey = (a: string, b: string) => [a, b].sort().join("|");

/**
 * When a relation happened.
 *
 * An authored year wins. Otherwise, if the two met in the field and the atlas
 * holds the battle, that battle's year — which is the only anchor here that is a
 * fact rather than a reading. Failing that, the middle of the years both were
 * campaigning; failing *that*, the middle of the years both were alive, which is
 * what puts Scipio Africanus' link to his adopted grandson in 184, when one was
 * dying and the other was an infant. That is the honest place for it.
 */
export function anchorYear(
  relation: ChartRelationInput,
  from: ChartFigureInput,
  to: ChartFigureInput,
  battlesBySlug: Map<string, ChartBattleInput>,
): { year: number; battle?: ChartBattleInput; datedExactly: boolean } {
  if (relation.year !== undefined) return { year: relation.year, datedExactly: true };

  // Only for "met in the field", where a battle is what the relation *is*. Two
  // people can share a battle without that being the link between them — Caesar
  // and Labienus share three, and the one that makes them commander and legate
  // is the first while the one that makes them enemies is the last. The latest
  // shared battle is the meeting that settled it.
  if (relation.kind === "battlefield") {
    const shared = from.battleSlugs
      .filter((slug) => to.battleSlugs.includes(slug))
      .map((slug) => battlesBySlug.get(slug))
      .filter((battle): battle is ChartBattleInput => Boolean(battle))
      .sort((a, b) => a.startYear - b.startYear);
    const decisive = shared[shared.length - 1];
    if (decisive) return { year: decisive.startYear, battle: decisive, datedExactly: true };
  }

  const activeFrom = Math.max(from.activeFrom, to.activeFrom);
  const activeTo = Math.min(from.activeTo, to.activeTo);
  if (activeFrom <= activeTo) return { year: Math.round((activeFrom + activeTo) / 2), datedExactly: false };

  const aliveFrom = Math.max(startYearOf(from), startYearOf(to));
  const aliveTo = Math.min(from.diedYear, to.diedYear);
  return { year: Math.round((aliveFrom + aliveTo) / 2), datedExactly: false };
}

/**
 * Greedy first-fit lane packing. Entries are placed in the first lane whose last
 * occupant has finished — where "finished" includes the name written above the
 * bar, which for Spartacus is many times longer than the two years he is on the
 * chart for.
 */
function packLanes(entries: { start: number; occupiedTo: number }[]): number[] {
  const laneEnds: number[] = [];
  return entries.map((entry) => {
    const lane = laneEnds.findIndex((end) => entry.start >= end + CHART.laneGap);
    const index = lane === -1 ? laneEnds.length : lane;
    laneEnds[index] = entry.occupiedTo;
    return index;
  });
}

export function buildConnectionChart(input: {
  figures: ChartFigureInput[];
  relations: ChartRelationInput[];
  battles: ChartBattleInput[];
  bands: ChartBandInput[];
}): ConnectionChart {
  const { figures, relations, battles, bands } = input;
  const bySlug = new Map(figures.map((figure) => [figure.slug, figure]));
  const battlesBySlug = new Map(battles.map((battle) => [battle.slug, battle]));

  // Only relations both of whose ends are on the chart. The page's own test
  // already requires both to be figures; this guards the year filter above.
  const drawn = relations.filter((relation) => bySlug.has(relation.from) && bySlug.has(relation.to));
  const degree = new Map<string, number>();
  for (const relation of drawn) {
    degree.set(relation.from, (degree.get(relation.from) ?? 0) + 1);
    degree.set(relation.to, (degree.get(relation.to) ?? 0) + 1);
  }

  const from = Math.min(...figures.map(startYearOf)) - 5;
  const to = Math.max(...figures.map((figure) => figure.diedYear)) + 5;
  const span = to - from;
  const usable = CHART.width - CHART.padX * 2;
  const x = (year: number) => CHART.padX + ((year - from) / span) * usable;

  // ── Lanes ─────────────────────────────────────────────────────────────────
  const labelWidth = (name: string) => name.length * CHART.labelSize * CHART.charAdvance;
  const prepared = figures
    .map((figure) => {
      const x0 = x(startYearOf(figure));
      const x1 = x(figure.diedYear);
      return { figure, x0, x1, occupiedTo: Math.max(x1, x0 + labelWidth(figure.name)) };
    })
    // Chronological, then by name so the packing is stable when two share a year.
    .sort((a, b) => a.x0 - b.x0 || a.figure.name.localeCompare(b.figure.name));

  const sides: Record<Side, typeof prepared> = {
    rome: prepared.filter(({ figure }) => sideOf(figure.faction) === "rome"),
    other: prepared.filter(({ figure }) => sideOf(figure.faction) === "other"),
  };
  const lanes: Record<Side, number[]> = {
    rome: packLanes(sides.rome.map(({ x0, occupiedTo }) => ({ start: x0, occupiedTo }))),
    other: packLanes(sides.other.map(({ x0, occupiedTo }) => ({ start: x0, occupiedTo }))),
  };
  const laneCount = (side: Side) => (lanes[side].length ? Math.max(...lanes[side]) + 1 : 0);

  const topOfRome = CHART.bandStripHeight + CHART.axisLabelHeight;
  const axisY = topOfRome + laneCount("rome") * CHART.laneHeight + CHART.dividerGap;
  const height = axisY + CHART.dividerGap + laneCount("other") * CHART.laneHeight + CHART.bottomPad;

  // Roman lanes stack upward from the axis and their opponents' downward from it,
  // so the lane each packing algorithm fills first — the busiest one — sits
  // nearest the divider and the links that cross it stay short.
  const laneTop = (side: Side, lane: number) =>
    side === "rome"
      ? axisY - CHART.dividerGap - CHART.laneHeight * (lane + 1)
      : axisY + CHART.dividerGap + CHART.laneHeight * lane;

  const entries: ChartEntry[] = (["rome", "other"] as Side[]).flatMap((side) =>
    sides[side].map(({ figure, x0, x1 }, index) => {
      const lane = lanes[side][index];
      const top = laneTop(side, lane);
      return {
        slug: figure.slug,
        name: figure.name,
        title: figure.title,
        faction: figure.faction,
        color: figure.color,
        side,
        lane,
        lifespan: figure.lifespan,
        knownFor: figure.knownFor,
        mapped: figure.mapped,
        bornKnown: figure.bornYear !== undefined,
        x0,
        x1,
        activeX0: x(figure.activeFrom),
        activeX1: x(figure.activeTo),
        y: top + CHART.labelSize + 4,
        height: CHART.barHeight,
        // Names sit at the start of the bar, except where that would push them
        // off the right-hand edge — someone who enters the story in the last
        // years of it, like Juba, has a name longer than the timeline he has
        // left. Then the name slides back over its own bar instead.
        labelX: Math.max(0, Math.min(x0, CHART.width - CHART.padX - labelWidth(figure.name))),
        labelY: top + CHART.labelSize,
        degree: degree.get(figure.slug) ?? 0,
      };
    }),
  );
  const entryBySlug = new Map(entries.map((entry) => [entry.slug, entry]));

  // ── Edges ─────────────────────────────────────────────────────────────────
  // A pair can carry more than one relation — Marius and Sulla are both a
  // service link and a rivalry, which is the whole story of them — so repeats on
  // the same pair are bowed further out instead of drawn on top of each other.
  // Where the names sit, so the marker on a line can be kept off them. A curve
  // may pass under a name — that is what the halo behind the text is for — but
  // the dot has to stay clear, because it is the tooltip target and the one
  // thing on the line carrying the year.
  const labelBoxes = entries.map((entry) => ({
    x0: entry.labelX - 2,
    x1: entry.labelX + labelWidth(entry.name) + 2,
    y0: entry.labelY - CHART.labelSize,
    y1: entry.labelY + 3,
  }));
  const onALabel = (px: number, py: number) =>
    labelBoxes.some((box) => px > box.x0 && px < box.x1 && py > box.y0 && py < box.y1);

  const seenPairs = new Map<string, number>();
  const edges: ChartEdge[] = drawn.map((relation) => {
    const fromFigure = bySlug.get(relation.from)!;
    const toFigure = bySlug.get(relation.to)!;
    const a = entryBySlug.get(relation.from)!;
    const b = entryBySlug.get(relation.to)!;
    const { year, battle, datedExactly } = anchorYear(relation, fromFigure, toFigure, battlesBySlug);

    const key = pairKey(relation.from, relation.to);
    const repeat = seenPairs.get(key) ?? 0;
    seenPairs.set(key, repeat + 1);

    // The year, pulled back onto each bar: a link cannot leave a life it is
    // outside of, so a relation dated after one of them died lands on the end of
    // that person's bar rather than floating past it.
    const anchorX = x(year);
    const ax = Math.min(Math.max(anchorX, a.x0), a.x1);
    const bx = Math.min(Math.max(anchorX, b.x0), b.x1);
    // Each end leaves from the face of the bar that looks at the other person.
    const ay = a.y < b.y ? a.y + a.height : a.y;
    const by = a.y < b.y ? b.y : b.y + b.height;
    // Curves bow to the right by default, which keeps the whole picture reading
    // one way. Near the end of the timeline that would push the line — and the
    // marker on it — off the edge, so there they bow inward instead. The last
    // fifteen years of the Republic are the busiest part of this chart, so this
    // is not an edge case.
    const magnitude = (0.22 + repeat * 0.16) * Math.abs(by - ay);
    let bow = magnitude;
    if (Math.max(ax, bx) + bow > CHART.width - CHART.padX) bow = -magnitude;
    if (Math.min(ax, bx) + bow < CHART.padX) bow = magnitude;
    const c1x = ax + bow;
    const c1y = ay + (by - ay) * 0.35;
    const c2x = bx + bow;
    const c2y = ay + (by - ay) * 0.7;
    const path = `M${ax.toFixed(1)} ${ay.toFixed(1)} C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${bx.toFixed(1)} ${by.toFixed(1)}`;

    // The dot that carries the year and the tooltip. Halfway along unless that
    // lands on somebody's name, in which case it slides along the curve to the
    // first position that is clear — tried in a fixed order, so the server and
    // the client put it in the same place.
    const at = (t: number) => {
      const m = 1 - t;
      return [
        m * m * m * ax + 3 * m * m * t * c1x + 3 * m * t * t * c2x + t * t * t * bx,
        m * m * m * ay + 3 * m * m * t * c1y + 3 * m * t * t * c2y + t * t * t * by,
      ] as const;
    };
    const clear = [0.5, 0.62, 0.38, 0.72, 0.28, 0.8].map(at).find(([px, py]) => !onALabel(px, py));
    const [midX, midY] = clear ?? at(0.5);

    return {
      id: `${relation.from}-${relation.to}-${relation.kind}`,
      from: relation.from,
      to: relation.to,
      kind: relation.kind,
      label: relation.label,
      note: relation.note,
      certainty: relation.certainty,
      year,
      battleSlug: battle?.slug,
      battleName: battle?.name,
      datedExactly,
      path,
      midX,
      midY,
    };
  });

  return {
    width: CHART.width,
    height,
    axisY,
    domain: { from, to },
    entries,
    edges,
    bands: bands
      .filter((band) => band.endYear >= from && band.startYear <= to)
      .map((band) => ({
        id: band.id,
        label: band.shortName,
        x0: x(Math.max(band.startYear, from)),
        x1: x(Math.min(band.endYear, to)),
      })),
    ticks: (() => {
      const out: { year: number; x: number; label: string }[] = [];
      const first = Math.ceil(from / CHART.tickStep) * CHART.tickStep;
      for (let year = first; year <= to; year += CHART.tickStep) {
        out.push({ year, x: x(year), label: year === 0 ? "0" : `${Math.abs(year)}${year < 0 ? " BCE" : " CE"}` });
      }
      return out;
    })(),
  };
}
