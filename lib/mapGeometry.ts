// Shared map geometry: projection and curve smoothing. Kept free of runtime
// "@/" imports so the type-stripping test runner can load it directly.

export type Point = [number, number];

// Equirectangular projection onto a virtual canvas. Linear in both axes, which
// is the honest choice for a schematic atlas and keeps the arithmetic checkable.
export const MAP_SCALE = 24;
export function projectPoint(point: number[] | readonly number[], scale = MAP_SCALE): Point {
  return [point[0] * scale, -point[1] * scale];
}

// The atlas's world, in degrees. The view is confined to this box: you cannot
// zoom out past it or pan beyond it. Chosen a little inside the bundled land
// data so the straight edges where that data was clipped never come into frame.
export const ATLAS_EXTENT = { west: -12, east: 41, south: 25, north: 50 };
export const EXTENT_BOX = {
  minX: ATLAS_EXTENT.west * MAP_SCALE,
  maxX: ATLAS_EXTENT.east * MAP_SCALE,
  minY: -ATLAS_EXTENT.north * MAP_SCALE,
  maxY: -ATLAS_EXTENT.south * MAP_SCALE,
};
export const EXTENT_WIDTH = EXTENT_BOX.maxX - EXTENT_BOX.minX;
export const EXTENT_HEIGHT = EXTENT_BOX.maxY - EXTENT_BOX.minY;

// Confine a view to the extent. `aspect` is the container's height/width, so the
// viewBox always matches the viewport and the fit is exact rather than letterboxed.
export function clampView(view: { x: number; y: number; width: number }, aspect: number, minWidth: number) {
  // Never wider than the whole atlas, and never so wide that its height would
  // exceed the atlas either.
  const maxWidth = Math.min(EXTENT_WIDTH, EXTENT_HEIGHT / Math.max(aspect, 0.0001));
  const width = Math.min(Math.max(view.width, Math.min(minWidth, maxWidth)), maxWidth);
  const height = width * aspect;
  const x = width >= EXTENT_WIDTH
    ? EXTENT_BOX.minX + (EXTENT_WIDTH - width) / 2
    : Math.min(Math.max(view.x, EXTENT_BOX.minX), EXTENT_BOX.maxX - width);
  const y = height >= EXTENT_HEIGHT
    ? EXTENT_BOX.minY + (EXTENT_HEIGHT - height) / 2
    : Math.min(Math.max(view.y, EXTENT_BOX.minY), EXTENT_BOX.maxY - height);
  return { x, y, width };
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

// The open route curve sampled in lng/lat, each sample tagged with the leg it
// belongs to and how far along that leg it sits. This is what both the renderer
// and the tests reason about: the line as actually drawn, not the waypoints.
export function sampleOpenCurve(points: number[][], samplesPerSegment = 14, tension = 0.85): { point: Point; leg: number; t: number }[] {
  if (points.length < 2) return points.map((point) => ({ point: [point[0], point[1]] as Point, leg: 0, t: 0 }));
  const at = (index: number) => points[Math.max(0, Math.min(points.length - 1, index))];
  const out: { point: Point; leg: number; t: number }[] = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    const previous = at(i - 1);
    const start = at(i);
    const end = at(i + 1);
    const next = at(i + 2);
    const c1: Point = [start[0] + ((end[0] - previous[0]) / 6) * tension, start[1] + ((end[1] - previous[1]) / 6) * tension];
    const c2: Point = [end[0] - ((next[0] - start[0]) / 6) * tension, end[1] - ((next[1] - start[1]) / 6) * tension];
    const steps = i === points.length - 2 ? samplesPerSegment : samplesPerSegment - 1;
    for (let step = 0; step <= steps; step += 1) {
      const t = step / samplesPerSegment;
      const mt = 1 - t;
      out.push({
        point: [
          mt * mt * mt * start[0] + 3 * mt * mt * t * c1[0] + 3 * mt * t * t * c2[0] + t * t * t * end[0],
          mt * mt * mt * start[1] + 3 * mt * mt * t * c1[1] + 3 * mt * t * t * c2[1] + t * t * t * end[1],
        ],
        leg: i,
        t,
      });
    }
  }
  return out;
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
