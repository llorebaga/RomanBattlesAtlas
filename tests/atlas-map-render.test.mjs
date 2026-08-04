import assert from "node:assert/strict";
import test from "node:test";
import { landPolygons } from "../data/geo/mediterranean-land.ts";
import { territoriesForYear } from "../data/territories.ts";
import { campaignRoutes } from "../data/campaigns.ts";
import { splitRouteAtYear, isRouteActive } from "../lib/routeInterpolation.ts";
import { clampView, EXTENT_BOX, EXTENT_WIDTH, EXTENT_HEIGHT } from "../lib/mapGeometry.ts";
import { eras } from "../data/wars.ts";

// Mirrors AtlasMap's projection exactly. If these drift, the map is wrong.
const SCALE = 24;
const project = (point) => [point[0] * SCALE, -point[1] * SCALE];
const pathFor = (rings) => rings.map((ring) => `M${ring.map((p) => { const [x, y] = project(p); return `${x.toFixed(1)} ${y.toFixed(1)}`; }).join("L")}Z`).join("");

function viewBoxFor(center, zoom) {
  const spanDegrees = 360 / Math.pow(2, zoom);
  const width = spanDegrees * SCALE * 1.6;
  const height = width * 0.62;
  const [cx, cy] = project(center);
  return { x: cx - width / 2, y: cy - height / 2, width, height };
}
const inView = (point, view) => { const [x, y] = project(point); return x >= view.x && x <= view.x + view.width && y >= view.y && y <= view.y + view.height; };

test("the projection keeps north up and west left", () => {
  const [romeX, romeY] = project([12.5, 41.9]);
  const [carthageX, carthageY] = project([10.3, 36.85]);
  assert.ok(carthageX < romeX, "Carthage lies west of Rome");
  assert.ok(carthageY > romeY, "Carthage lies south of Rome (screen y grows downward)");
});

test("land renders as closed SVG paths", () => {
  const paths = landPolygons.map((rings) => pathFor(rings));
  assert.ok(paths.length > 50, "expected many land polygons");
  for (const d of paths) {
    assert.ok(d.startsWith("M"), "each path starts with a move command");
    assert.ok(d.endsWith("Z"), "each path is closed");
    assert.ok(!d.includes("NaN"), "no NaN coordinates");
  }
});

test("the default view frames the central Mediterranean", () => {
  const view = viewBoxFor([12.2, 38], 4.4);
  assert.ok(inView([12.5, 41.9], view), "Rome is visible at the opening view");
  assert.ok(inView([10.3, 36.85], view), "Carthage is visible at the opening view");
  assert.ok(inView([15.5, 38.2], view), "Messana is visible at the opening view");
});

test("each era's view frames that war's theatre", () => {
  const punic = viewBoxFor([12.4, 37.9], 4.7);
  assert.ok(inView([15.55, 38.19], punic), "Messana visible in the First Punic War view");
  const macedonian = viewBoxFor([21, 39.6], 5.1);
  assert.ok(inView([22.55, 39.42], macedonian), "Cynoscephalae visible in the Macedonian view");
});

test("territory zones project to non-degenerate paths", () => {
  for (const year of [-264, -241, -218, -201, -197]) {
    const zones = territoriesForYear(year);
    assert.ok(zones.length > 0, `expected zones in ${Math.abs(year)} BCE`);
    for (const zone of zones) {
      const d = pathFor([[...zone.ring, zone.ring[0]]]);
      assert.ok(!d.includes("NaN"), `${zone.name} has valid coordinates`);
      const points = d.split("L").length;
      assert.ok(points >= 4, `${zone.name} keeps at least four points`);
    }
  }
});

test("campaign routes produce drawable polylines", () => {
  const hannibal = campaignRoutes.find((route) => route.id === "hannibal-march-to-italy");
  assert.ok(hannibal);
  assert.ok(isRouteActive(hannibal, -218));
  // In a route's opening year nothing has elapsed yet, so the march ahead is
  // drawn as the dashed future leg; by the next year an elapsed leg exists.
  const opening = splitRouteAtYear(hannibal, -218);
  assert.ok(opening.future.length >= 2, "the march ahead is drawable at 218 BCE");
  const later = splitRouteAtYear(hannibal, -217);
  assert.ok(later.completed.length >= 2, "an elapsed leg is drawable by 217 BCE");
  for (const point of [...opening.future, ...later.completed, ...later.future]) {
    const [x, y] = project(point);
    assert.ok(Number.isFinite(x) && Number.isFinite(y), "route points project to finite coordinates");
  }
});

test("the view can never leave the atlas extent", () => {
  const aspects = [0.4, 0.58, 0.75, 1.2];
  const attempts = [
    { name: "far outside to the west", x: -100000, y: 0, width: 600 },
    { name: "far outside to the east", x: 100000, y: 0, width: 600 },
    { name: "far above", x: 0, y: -100000, width: 600 },
    { name: "far below", x: 0, y: 100000, width: 600 },
    { name: "zoomed out far past the whole map", x: 0, y: 0, width: 1e6 },
    { name: "zoomed in past any sane limit", x: 0, y: 0, width: 0.0001 },
    { name: "negative width", x: 0, y: 0, width: -500 },
  ];
  for (const aspect of aspects) {
    for (const attempt of attempts) {
      const view = clampView(attempt, aspect, 120);
      const height = view.width * aspect;
      assert.ok(Number.isFinite(view.x) && Number.isFinite(view.y) && Number.isFinite(view.width), `${attempt.name} produced a non-finite view`);
      assert.ok(view.width > 0, `${attempt.name}: width must stay positive`);
      // Never wider or taller than the atlas itself.
      assert.ok(view.width <= EXTENT_WIDTH + 0.01, `${attempt.name} at aspect ${aspect}: wider than the atlas`);
      assert.ok(height <= EXTENT_HEIGHT + 0.01, `${attempt.name} at aspect ${aspect}: taller than the atlas`);
      // And always inside it.
      assert.ok(view.x >= EXTENT_BOX.minX - 0.01 && view.x + view.width <= EXTENT_BOX.maxX + 0.01, `${attempt.name} at aspect ${aspect}: escaped horizontally`);
      assert.ok(view.y >= EXTENT_BOX.minY - 0.01 && view.y + height <= EXTENT_BOX.maxY + 0.01, `${attempt.name} at aspect ${aspect}: escaped vertically`);
    }
  }
});

test("fully zoomed out shows the whole atlas and nothing beyond", () => {
  const aspect = EXTENT_HEIGHT / EXTENT_WIDTH; // a pane shaped like the atlas
  const view = clampView({ x: 0, y: 0, width: 1e6 }, aspect, 120);
  assert.ok(Math.abs(view.width - EXTENT_WIDTH) < 0.01, "should fit the atlas exactly");
  assert.ok(Math.abs(view.x - EXTENT_BOX.minX) < 0.01, "should sit flush with the western edge");
  assert.ok(Math.abs(view.y - EXTENT_BOX.minY) < 0.01, "should sit flush with the northern edge");
});

test("panning at the closest zoom still cannot leave the atlas", () => {
  const aspect = 0.58;
  let view = clampView({ x: 0, y: 0, width: 120 }, aspect, 120);
  // Drag hard toward every corner in turn.
  for (const [dx, dy] of [[-9999, -9999], [9999, -9999], [9999, 9999], [-9999, 9999]]) {
    view = clampView({ x: view.x + dx, y: view.y + dy, width: view.width }, aspect, 120);
    const height = view.width * aspect;
    assert.ok(view.x >= EXTENT_BOX.minX - 0.01 && view.x + view.width <= EXTENT_BOX.maxX + 0.01, "escaped horizontally while panning");
    assert.ok(view.y >= EXTENT_BOX.minY - 0.01 && view.y + height <= EXTENT_BOX.maxY + 0.01, "escaped vertically while panning");
  }
});

test("every era's framing stays inside the atlas", () => {
  for (const era of eras) {
    for (const aspect of [0.4, 0.58, 0.9]) {
      const spanDegrees = 360 / Math.pow(2, era.mapView.zoom);
      const width = spanDegrees * SCALE * 1.6;
      const [cx, cy] = project(era.mapView.center);
      const view = clampView({ x: cx - width / 2, y: cy - (width * aspect) / 2, width }, aspect, 120);
      const height = view.width * aspect;
      assert.ok(view.x >= EXTENT_BOX.minX - 0.01 && view.x + view.width <= EXTENT_BOX.maxX + 0.01, `${era.id} framing escapes horizontally at aspect ${aspect}`);
      assert.ok(view.y >= EXTENT_BOX.minY - 0.01 && view.y + height <= EXTENT_BOX.maxY + 0.01, `${era.id} framing escapes vertically at aspect ${aspect}`);
    }
  }
});

test("every era has at least one drawable route", () => {
  for (const year of [-264, -256, -218, -216, -202, -197]) {
    const drawable = campaignRoutes.filter((route) => isRouteActive(route, year)).filter((route) => {
      const split = splitRouteAtYear(route, year);
      return split.completed.length >= 2 || split.future.length >= 2;
    });
    assert.ok(drawable.length > 0, `expected a drawable route in ${Math.abs(year)} BCE`);
  }
});
