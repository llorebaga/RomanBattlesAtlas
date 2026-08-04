import assert from "node:assert/strict";
import test from "node:test";
import { territories, territoriesForYear } from "../data/territories.ts";
import { factionColor, factionList, isContextPower } from "../data/factions.ts";
import { landPolygons } from "../data/geo/mediterranean-land.ts";

const land = { features: [{ properties: {}, geometry: { coordinates: landPolygons } }] };

function pointInRing(point, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > point[1] !== yj > point[1] && point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
const isLand = (point) => land.features[0].geometry.coordinates.some((rings) => pointInRing(point, rings[0]) && !rings.slice(1).some((hole) => pointInRing(point, hole)));

test("the bundled basemap puts land and sea in the right places", () => {
  for (const [name, point] of Object.entries({ Rome: [12.5, 41.9], Carthage: [10.3, 36.85], Sicily: [14.0, 37.5], Sardinia: [9.0, 40.1], Greece: [23.7, 38.0], Iberia: [-1.0, 37.6], Alps: [7.0, 45.5] })) {
    assert.ok(isLand(point), `${name} should be on land`);
  }
  for (const [name, point] of Object.entries({ "Tyrrhenian Sea": [12.0, 39.5], Aegean: [25.0, 37.0], Atlantic: [-15, 40] })) {
    assert.ok(!isLand(point), `${name} should be sea`);
  }
});

test("the basemap is pure geometry with no political data", () => {
  // landPolygons is coordinates only: there is nowhere for a modern country
  // name, ISO code, or sovereignty attribute to hide.
  assert.ok(Array.isArray(landPolygons) && landPolygons.length > 50);
  for (const rings of landPolygons) {
    assert.ok(Array.isArray(rings) && rings.length >= 1);
    for (const ring of rings) {
      assert.ok(ring.length >= 4, "every ring needs at least four positions");
      for (const point of ring) assert.ok(point.length === 2 && point.every((n) => typeof n === "number"), "positions are [lng, lat] numbers");
    }
  }
});

test("every territory ring is valid, closed-able Mediterranean geometry", () => {
  for (const period of territories) {
    assert.ok(period.ring.length >= 3, `${period.id}: needs at least 3 points`);
    assert.ok(period.fromYear <= period.toYear, `${period.id}: inverted years`);
    for (const [lng, lat] of period.ring) {
      assert.equal(typeof lng, "number", `${period.id}: bad longitude`);
      assert.equal(typeof lat, "number", `${period.id}: bad latitude`);
      assert.ok(lng >= -20 && lng <= 45, `${period.id}: longitude ${lng} outside the map`);
      assert.ok(lat >= 20 && lat <= 50, `${period.id}: latitude ${lat} outside the map`);
    }
  }
});

test("every polity resolves to a real hex color", () => {
  for (const period of territories) {
    assert.match(factionColor(period.polity), /^#[0-9a-f]{6}$/i, `${period.polity} has no valid color`);
  }
});

test("belligerent hues are the validated categorical set", () => {
  const belligerents = factionList.filter((info) => info.role === "belligerent").map((info) => info.color);
  assert.deepEqual(belligerents, ["#e34948", "#2a78d6", "#4a3aa7", "#eda100", "#008300"]);
  assert.ok(isContextPower("seleucid"));
  assert.ok(!isContextPower("rome"));
});

test("territory labels exist so color is never the only cue", () => {
  for (const period of territoriesForYear(-218)) {
    assert.ok(period.labelAt, `${period.id}: needs labelAt for the map label`);
  }
});

test("zones are present and change across the timeline", () => {
  for (const year of [-264, -241, -218, -201, -197]) {
    assert.ok(territoriesForYear(year).length >= 5, `year ${year}: too few zones`);
  }
  const ids = (year) => territoriesForYear(year).map((period) => period.id).sort().join(",");
  assert.notEqual(ids(-264), ids(-197), "the map should not look identical across wars");
});
