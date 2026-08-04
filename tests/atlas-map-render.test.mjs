import assert from "node:assert/strict";
import test from "node:test";
import { landPolygons } from "../data/geo/mediterranean-land.ts";
import { territoriesForYear } from "../data/territories.ts";
import { campaignRoutes } from "../data/campaigns.ts";
import { splitRouteAtYear, isRouteActive } from "../lib/routeInterpolation.ts";

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

test("every era has at least one drawable route", () => {
  for (const year of [-264, -256, -218, -216, -202, -197]) {
    const drawable = campaignRoutes.filter((route) => isRouteActive(route, year)).filter((route) => {
      const split = splitRouteAtYear(route, year);
      return split.completed.length >= 2 || split.future.length >= 2;
    });
    assert.ok(drawable.length > 0, `expected a drawable route in ${Math.abs(year)} BCE`);
  }
});
