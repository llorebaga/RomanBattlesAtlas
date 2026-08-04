// Turns Natural Earth 1:50m land into the small, Mediterranean-only land file
// the atlas bundles. Natural Earth is public domain.
//
//   curl -sL https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_land.geojson -o ne_50m_land.geojson
//   node build/make-basemap.mjs ne_50m_land.geojson
//
// Output: data/geo/mediterranean-land.json
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SOURCE = process.argv[2];
if (!SOURCE) { console.error("usage: node build/make-basemap.mjs <ne_50m_land.geojson>"); process.exit(1); }

// Generous margin around the atlas view so panning never reveals a cut edge.
const CLIP = { west: -22, east: 48, south: 18, north: 56 };
const EPSILON = 0.012; // Douglas-Peucker tolerance in degrees
const PRECISION = 3;

// Sutherland-Hodgman against the (convex) clip rectangle.
function clipToBox(ring) {
  const edges = [
    { inside: (p) => p[0] >= CLIP.west, intersect: (a, b) => interpX(a, b, CLIP.west) },
    { inside: (p) => p[0] <= CLIP.east, intersect: (a, b) => interpX(a, b, CLIP.east) },
    { inside: (p) => p[1] >= CLIP.south, intersect: (a, b) => interpY(a, b, CLIP.south) },
    { inside: (p) => p[1] <= CLIP.north, intersect: (a, b) => interpY(a, b, CLIP.north) },
  ];
  let output = ring;
  for (const edge of edges) {
    const input = output;
    output = [];
    for (let i = 0; i < input.length; i += 1) {
      const current = input[i];
      const previous = input[(i + input.length - 1) % input.length];
      const currentIn = edge.inside(current);
      const previousIn = edge.inside(previous);
      if (currentIn) {
        if (!previousIn) output.push(edge.intersect(previous, current));
        output.push(current);
      } else if (previousIn) {
        output.push(edge.intersect(previous, current));
      }
    }
    if (!output.length) return [];
  }
  return output;
}
function interpX(a, b, x) { const t = (x - a[0]) / (b[0] - a[0]); return [x, a[1] + t * (b[1] - a[1])]; }
function interpY(a, b, y) { const t = (y - a[1]) / (b[1] - a[1]); return [a[0] + t * (b[0] - a[0]), y]; }

function simplify(points, epsilon) {
  if (points.length < 4) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = 1; keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    let index = -1; let maxDistance = 0;
    for (let i = first + 1; i < last; i += 1) {
      const d = perpendicular(points[i], points[first], points[last]);
      if (d > maxDistance) { maxDistance = d; index = i; }
    }
    if (maxDistance > epsilon && index > 0) { keep[index] = 1; stack.push([first, index], [index, last]); }
  }
  return points.filter((_, i) => keep[i]);
}
function perpendicular(point, start, end) {
  const dx = end[0] - start[0]; const dy = end[1] - start[1];
  if (dx === 0 && dy === 0) return Math.hypot(point[0] - start[0], point[1] - start[1]);
  const t = ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / (dx * dx + dy * dy);
  const clamped = Math.max(0, Math.min(1, t));
  return Math.hypot(point[0] - (start[0] + clamped * dx), point[1] - (start[1] + clamped * dy));
}
const round = (points) => points.map((p) => [Number(p[0].toFixed(PRECISION)), Number(p[1].toFixed(PRECISION))]);

function intersectsClip(ring) {
  return ring.some((p) => p[0] >= CLIP.west && p[0] <= CLIP.east && p[1] >= CLIP.south && p[1] <= CLIP.north);
}

const source = JSON.parse(readFileSync(SOURCE, "utf8"));
const polygons = [];
for (const feature of source.features) {
  const groups = feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates;
  for (const group of groups) {
    const outer = group[0];
    // Keep any landmass that reaches the window, plus the huge Eurasia/Africa
    // polygon whose vertices mostly lie far outside it.
    const spans = outer.some((p) => p[0] < CLIP.west) && outer.some((p) => p[0] > CLIP.east);
    if (!intersectsClip(outer) && !spans) continue;
    const rings = [];
    for (const ring of group) {
      const clipped = clipToBox(ring);
      if (clipped.length < 4) continue;
      const simplified = simplify(clipped, EPSILON);
      if (simplified.length < 4) continue;
      const closed = round(simplified);
      if (closed[0][0] !== closed[closed.length - 1][0] || closed[0][1] !== closed[closed.length - 1][1]) closed.push(closed[0]);
      rings.push(closed);
    }
    if (rings.length) polygons.push(rings);
  }
}

// Emitted as a TypeScript module rather than JSON on purpose: a JSON import
// compiles to CommonJS here, and the consuming code was built as `z.default`,
// which is undefined for that module shape. Passing undefined as a MapLibre
// source makes the Map constructor throw and the whole atlas fails to load. A
// plain exported const has no interop surface.
mkdirSync(new URL("../data/geo/", import.meta.url), { recursive: true });
const target = new URL("../data/geo/mediterranean-land.ts", import.meta.url);
const body = `// GENERATED by build/make-basemap.mjs — do not edit by hand.
// Simplified land polygons for the Mediterranean, clipped from Natural Earth
// 1:50m land (public domain). MultiPolygon coordinates: [polygon][ring][point].
export const landPolygons: number[][][][] = ${JSON.stringify(polygons)};
`;
writeFileSync(target, body, "utf8");
const vertices = polygons.reduce((sum, rings) => sum + rings.reduce((s, r) => s + r.length, 0), 0);
console.log(`land polygons: ${polygons.length}, vertices: ${vertices}`);
console.log(`wrote ${(body.length / 1024).toFixed(1)} KB to data/geo/mediterranean-land.ts`);
