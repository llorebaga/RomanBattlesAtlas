import type { DiagramArrow, DiagramStage, DiagramTerrain, DiagramUnit } from "@/types/history";

// Where every word in a battle diagram goes.
//
// Hand-placing labels does not survive contact with twenty-two diagrams: move one
// unit and three captions collide. So the figure states *what* is labelled and this
// decides *where*, by trying the natural positions in order of preference and
// taking the first that hits nothing. An explicit `labelAt` in the data always
// wins — the author knows things the solver does not.
//
// Pure and deterministic, so the server and the client place labels identically and
// the whole diagram is in the HTML.

export const FRAME = { width: 100, height: 68 };

export const FONT = { unit: 2.7, terrain: 2.7, arrow: 2.4, caption: 3.4, key: 2.5 };
// Mean advance width as a fraction of font size, for the body face at these sizes.
// An estimate: it only has to be good enough to keep two labels apart.
const ADVANCE = 0.53;

export interface Box { x0: number; y0: number; x1: number; y1: number }

export function textBox(text: string, x: number, y: number, font: number, anchor: "middle" | "start" = "middle"): Box {
  const width = text.length * font * ADVANCE;
  return {
    x0: anchor === "middle" ? x - width / 2 : x,
    x1: anchor === "middle" ? x + width / 2 : x + width,
    y0: y - font * 0.78,
    y1: y + font * 0.22,
  };
}

function overlapArea(a: Box, b: Box): number {
  const w = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
  const h = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
  return w > 0 && h > 0 ? w * h : 0;
}

const UNIT_SIZE: Record<string, [number, number]> = { cavalry: [7, 3], phalanx: [14, 5] };
export function unitSize(unit: DiagramUnit): [number, number] {
  return unit.size ?? UNIT_SIZE[unit.kind] ?? [12, 3.4];
}
export function unitBox(unit: DiagramUnit): Box {
  const [w, h] = unitSize(unit);
  return { x0: unit.at[0] - w / 2, x1: unit.at[0] + w / 2, y0: unit.at[1] - h / 2, y1: unit.at[1] + h / 2 };
}

// Only a filled body hides text. An outline — skirmishers, a siege line, a camp — or
// the pale fill of a town can carry a haloed label without costing legibility, and
// often should: that is where the label belongs.
const SOLID = new Set(["infantry", "phalanx", "cavalry", "elephants", "ships"]);

export function arrowCurve(arrow: DiagramArrow, steps = 20): { points: [number, number][]; control: [number, number] } {
  const [x1, y1] = arrow.from;
  const [x2, y2] = arrow.to;
  const bow = arrow.bow ?? 0;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const control: [number, number] = [(x1 + x2) / 2 - (dy / length) * bow, (y1 + y2) / 2 + (dx / length) * bow];
  const points: [number, number][] = [];
  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const m = 1 - t;
    points.push([
      m * m * x1 + 2 * m * t * control[0] + t * t * x2,
      m * m * y1 + 2 * m * t * control[1] + t * t * y2,
    ]);
  }
  return { points, control };
}

// The faction key, laid out right to left with each entry as wide as its own name.
// Exported so the label solver and the figure agree on where it sits.
const KEY_SWATCH = 4;
const KEY_GAP = 1.2;
const KEY_PADDING = 3.5;
export function keyEntryWidth(name: string): number {
  return KEY_SWATCH + KEY_GAP + name.length * FONT.key * ADVANCE + KEY_PADDING;
}
export function keyLayout(names: string[]): { x: number; width: number }[] {
  const widths = names.map(keyEntryWidth);
  const total = widths.reduce((sum, width) => sum + width, 0);
  let x = FRAME.width - 2.5 - total;
  return widths.map((width) => {
    const entry = { x, width };
    x += width;
    return entry;
  });
}
export function keyBox(names: string[]): Box {
  const entries = keyLayout(names);
  return {
    x0: entries.length ? entries[0].x : FRAME.width - 2.5,
    x1: FRAME.width - 2.5,
    y0: FRAME.height - 5.2,
    y1: FRAME.height - 1.4,
  };
}

export interface PlacedLabel {
  key: string;
  text: string;
  className: string;
  x: number;
  y: number;
}

interface Candidate { x: number; y: number }

interface Request {
  key: string;
  text: string;
  className: string;
  font: number;
  fixed?: [number, number];
  candidates: Candidate[];
}

// Terrain that reads as an area rather than a line, and so labels at its centre.
const AREA_KINDS = new Set<DiagramTerrain["kind"]>(["sea", "marsh", "woods", "hill", "ridge"]);

function terrainCandidates(feature: DiagramTerrain): Candidate[] {
  if (feature.kind === "town") {
    const [x, y] = feature.at ?? [0, 0];
    const [w, h] = feature.size ?? [6, 4];
    const inside = h >= 6 && w >= 12;
    return [
      inside ? { x, y: y + 1 } : { x, y: y + h / 2 + 2.6 },
      { x, y: y - h / 2 - 1.6 },
      { x, y: y + h / 2 + 2.6 },
      { x: x - w / 2 - 9, y: y + 0.9 },
      { x: x + w / 2 + 9, y: y + 0.9 },
    ];
  }
  const points = feature.points ?? [];
  if (!points.length) return [];
  if (AREA_KINDS.has(feature.kind)) {
    const cx = points.reduce((sum, point) => sum + point[0], 0) / points.length;
    const cy = points.reduce((sum, point) => sum + point[1], 0) / points.length;
    return [{ x: cx, y: cy + 0.9 }, { x: cx, y: cy - 4 }, { x: cx, y: cy + 5.5 }, { x: points[0][0] + 8, y: points[0][1] + 3 }];
  }
  // A line: sit the name beside it, trying each vertex from the middle outward so a
  // river keeps its name near the middle of its course when there is room.
  const order = [...points.keys()].sort((a, b) => Math.abs(a - points.length / 2) - Math.abs(b - points.length / 2));
  return order.flatMap((index) => {
    const [x, y] = points[index];
    return [{ x, y: y - 1.8 }, { x, y: y + 3.4 }, { x, y: y - 5 }, { x, y: y + 6.6 }];
  });
}

function unitCandidates(unit: DiagramUnit): Candidate[] {
  const [x, y] = unit.at;
  const [w, h] = unitSize(unit);
  const above = y - h / 2 - 1.5;
  const below = y + h / 2 + 3;
  return [
    { x, y: above },
    { x, y: below },
    { x: x + w / 2 + 2, y: y + 0.9 },
    { x: x - w / 2 - 2, y: y + 0.9 },
    // Shifted along the block: a line of battle can carry its name off one end.
    { x: x + w / 4, y: above },
    { x: x - w / 4, y: above },
    { x: x + w / 4, y: below },
    { x: x - w / 4, y: below },
    { x: x + w / 2 + 2, y: above },
    { x: x - w / 2 - 2, y: above },
    { x: x + w / 2 + 2, y: below },
    { x: x - w / 2 - 2, y: below },
    { x, y: y - h / 2 - 4.5 },
    { x, y: y + h / 2 + 6 },
  ];
}

// Candidates get tried again nudged sideways and up: a word that will not fit where
// it belongs is usually a couple of units from somewhere it will.
const NUDGES: [number, number][] = [[0, 0], [7, 0], [-7, 0], [0, -3.2], [0, 3.2], [14, 0], [-14, 0], [7, -3.2], [-7, -3.2], [7, 3.2], [-7, 3.2]];
function expand(candidates: Candidate[]): Candidate[] {
  const out: Candidate[] = [];
  // Round one keeps every candidate in its intended place; only then does the solver
  // start moving words about, so the preferred layout always wins when it is free.
  for (const [dx, dy] of NUDGES) {
    for (const candidate of candidates) out.push({ x: candidate.x + dx, y: candidate.y + dy });
  }
  return out;
}

/**
 * Places every label in one stage. Obstacles are the solid unit bodies, the drawn
 * arrows, the stage caption and the faction key; labels already placed become
 * obstacles for the ones after them, so nothing lands twice in the same spot.
 */
export function placeStageLabels(
  stage: DiagramStage,
  terrain: DiagramTerrain[],
  captionText: string,
  sideNames: string[] = [],
): PlacedLabel[] {
  const obstacles: Box[] = [];

  // The caption, top left, and the key, bottom right, are fixed furniture.
  obstacles.push(textBox(captionText, 2.5, 5.2, FONT.caption, "start"));
  obstacles.push(keyBox(sideNames));

  for (const unit of stage.units) if (SOLID.has(unit.kind)) obstacles.push(unitBox(unit));
  for (const arrow of stage.arrows ?? []) {
    // Only the middle of a path is an obstacle: a label may sit at the tail of the
    // arrow leaving the unit it belongs to, which is where it reads best.
    const { points } = arrowCurve(arrow);
    const middle = points.slice(Math.ceil(points.length * 0.18), Math.floor(points.length * 0.82) + 1);
    for (const [x, y] of middle) obstacles.push({ x0: x - 0.5, x1: x + 0.5, y0: y - 0.5, y1: y + 0.5 });
  }

  const requests: Request[] = [];
  for (const feature of terrain) {
    if (!feature.label) continue;
    requests.push({
      key: `terrain-${feature.id}`,
      text: feature.label,
      className: "bd-terrain-label",
      font: FONT.terrain,
      fixed: feature.labelAt,
      candidates: expand(terrainCandidates(feature)),
    });
  }
  for (const unit of stage.units) {
    if (!unit.label) continue;
    requests.push({
      key: `unit-${unit.id}`,
      text: unit.label,
      className: "bd-unit-label",
      font: FONT.unit,
      fixed: unit.labelAt,
      candidates: expand(unitCandidates(unit)),
    });
  }
  for (const arrow of stage.arrows ?? []) {
    if (!arrow.label) continue;
    const { control } = arrowCurve(arrow);
    requests.push({
      key: `arrow-${arrow.id}`,
      text: arrow.label,
      className: "bd-arrow-label",
      font: FONT.arrow,
      candidates: expand([
        { x: control[0], y: control[1] - 1.4 },
        { x: control[0], y: control[1] + 3.2 },
        { x: control[0] + 8, y: control[1] + 0.9 },
        { x: control[0] - 8, y: control[1] + 0.9 },
      ]),
    });
  }

  // Longest text first: the labels with the least room to manoeuvre choose before
  // the short ones that can fit almost anywhere.
  requests.sort((a, b) => b.text.length - a.text.length);

  const placed: PlacedLabel[] = [];
  for (const request of requests) {
    if (request.fixed) {
      const box = textBox(request.text, request.fixed[0], request.fixed[1], request.font);
      obstacles.push(box);
      placed.push({ key: request.key, text: request.text, className: request.className, x: request.fixed[0], y: request.fixed[1] });
      continue;
    }
    let best: { x: number; y: number; cost: number } | null = null;
    for (const candidate of request.candidates) {
      // Keep the whole word inside the frame, sliding it in if it hangs over an edge.
      const halfWidth = (request.text.length * request.font * ADVANCE) / 2;
      const x = Math.min(Math.max(candidate.x, halfWidth + 1), FRAME.width - halfWidth - 1);
      const y = Math.min(Math.max(candidate.y, request.font * 0.78 + 0.5), FRAME.height - 1);
      const box = textBox(request.text, x, y, request.font);
      let cost = 0;
      for (const obstacle of obstacles) cost += overlapArea(box, obstacle);
      // A label shoved a long way from where it was asked for is a cost of its own.
      cost += (Math.abs(x - candidate.x) + Math.abs(y - candidate.y)) * 0.4;
      if (!best || cost < best.cost) best = { x, y, cost };
      if (cost === 0) break;
    }
    if (!best) continue;
    obstacles.push(textBox(request.text, best.x, best.y, request.font));
    placed.push({ key: request.key, text: request.text, className: request.className, x: best.x, y: best.y });
  }
  return placed;
}
