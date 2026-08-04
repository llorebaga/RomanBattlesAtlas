// Shared map geometry: projection and curve smoothing. Kept free of runtime
// "@/" imports so the type-stripping test runner can load it directly.

export type Point = [number, number];

// Equirectangular projection onto a virtual canvas. Linear in both axes, which
// is the honest choice for a schematic atlas and keeps the arithmetic checkable.
export const MAP_SCALE = 24;
export function projectPoint(point: number[] | readonly number[], scale = MAP_SCALE): Point {
  return [point[0] * scale, -point[1] * scale];
}

// Territory rings are coarse envelopes drawn by hand. Straight chords between
// their few vertices read as ruled borders, which is both ugly and a false
// precision claim — ancient frontiers were not surveyed lines. Drawing them as a
// closed Catmull-Rom spline (expressed as cubic Béziers) gives an organic edge
// that still passes through every authored point.
//
// tension 0 is a straight polygon; 1 is the standard uniform Catmull-Rom.
export function smoothClosedPath(ring: number[][], scale = MAP_SCALE, tension = 1): string {
  const points = ring.map((point) => projectPoint(point, scale));
  if (points.length < 3) return points.length ? `M${points.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("L")}Z` : "";
  const at = (index: number) => points[(index + points.length) % points.length];
  let path = `M${at(0)[0].toFixed(1)} ${at(0)[1].toFixed(1)}`;
  for (let i = 0; i < points.length; i += 1) {
    const previous = at(i - 1);
    const start = at(i);
    const end = at(i + 1);
    const next = at(i + 2);
    const c1: Point = [start[0] + ((end[0] - previous[0]) / 6) * tension, start[1] + ((end[1] - previous[1]) / 6) * tension];
    const c2: Point = [end[0] - ((next[0] - start[0]) / 6) * tension, end[1] - ((next[1] - start[1]) / 6) * tension];
    path += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)},${c2[0].toFixed(1)} ${c2[1].toFixed(1)},${end[0].toFixed(1)} ${end[1].toFixed(1)}`;
  }
  return `${path}Z`;
}

// Campaign routes as a smooth open curve. A march was not a sequence of ruled
// straight lines between waypoints, and drawing it that way looks mechanical;
// this eases through every attested waypoint without inventing detours.
export function smoothOpenPath(points: number[][], scale = MAP_SCALE, tension = 0.85): string {
  const projected = points.map((point) => projectPoint(point, scale));
  if (projected.length < 2) return "";
  const format = (point: Point) => `${point[0].toFixed(1)} ${point[1].toFixed(1)}`;
  if (projected.length === 2) return `M${format(projected[0])}L${format(projected[1])}`;
  // Clamp at the ends so the curve starts and finishes exactly on the route.
  const at = (index: number) => projected[Math.max(0, Math.min(projected.length - 1, index))];
  let path = `M${format(projected[0])}`;
  for (let i = 0; i < projected.length - 1; i += 1) {
    const previous = at(i - 1);
    const start = at(i);
    const end = at(i + 1);
    const next = at(i + 2);
    const c1: Point = [start[0] + ((end[0] - previous[0]) / 6) * tension, start[1] + ((end[1] - previous[1]) / 6) * tension];
    const c2: Point = [end[0] - ((next[0] - start[0]) / 6) * tension, end[1] - ((next[1] - start[1]) / 6) * tension];
    path += `C${format(c1)},${format(c2)},${format(end)}`;
  }
  return path;
}

// The same curve as a dense ring of lng/lat points, for geometric checks such as
// "do two powers overlap" that must reason about what is actually drawn.
export function densifyClosedRing(ring: number[][], samplesPerSegment = 8, tension = 1): Point[] {
  if (ring.length < 3) return ring.map((p) => [p[0], p[1]] as Point);
  const at = (index: number) => ring[(index + ring.length) % ring.length];
  const output: Point[] = [];
  for (let i = 0; i < ring.length; i += 1) {
    const previous = at(i - 1);
    const start = at(i);
    const end = at(i + 1);
    const next = at(i + 2);
    const c1: Point = [start[0] + ((end[0] - previous[0]) / 6) * tension, start[1] + ((end[1] - previous[1]) / 6) * tension];
    const c2: Point = [end[0] - ((next[0] - start[0]) / 6) * tension, end[1] - ((next[1] - start[1]) / 6) * tension];
    for (let step = 0; step < samplesPerSegment; step += 1) {
      const t = step / samplesPerSegment;
      const mt = 1 - t;
      output.push([
        mt * mt * mt * start[0] + 3 * mt * mt * t * c1[0] + 3 * mt * t * t * c2[0] + t * t * t * end[0],
        mt * mt * mt * start[1] + 3 * mt * mt * t * c1[1] + 3 * mt * t * t * c2[1] + t * t * t * end[1],
      ]);
    }
  }
  return output;
}
