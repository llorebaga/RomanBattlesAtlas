import assert from "node:assert/strict";
import test from "node:test";
import { territories, territoriesForYear } from "../data/territories.ts";
import { factionColor, factionList, isContextPower, factionRole, roleRank, TERRITORY_LAYERS } from "../data/factions.ts";
import { landPolygons } from "../data/geo/mediterranean-land.ts";
import { densifyClosedRing } from "../lib/mapGeometry.ts";

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

test("every territory zone is mostly land and labelled on land", () => {
  for (const territory of territories) {
    // Fills are clipped to the coastline on the map, so a zone that barely
    // overlaps land would render as a sliver or vanish entirely.
    const lngs = territory.ring.map((p) => p[0]);
    const lats = territory.ring.map((p) => p[1]);
    let tested = 0;
    let onLand = 0;
    for (let x = Math.min(...lngs); x <= Math.max(...lngs); x += 0.3) {
      for (let y = Math.min(...lats); y <= Math.max(...lats); y += 0.3) {
        if (!pointInRing([x, y], territory.ring)) continue;
        tested += 1;
        if (isLand([x, y])) onLand += 1;
      }
    }
    assert.ok(tested > 0, `${territory.name} should enclose sample points`);
    // Rings are deliberately generous envelopes — the map clips them to the
    // coastline — so a lot of enclosed sea is expected and fine. What must hold
    // is that the envelope actually contains land to colour.
    assert.ok(onLand >= 3, `${territory.name} should enclose real land (found ${onLand} land samples)`);
    assert.ok(onLand / tested > 0.15, `${territory.name} should not be almost entirely sea (was ${Math.round((100 * onLand) / tested)}% land)`);
    if (territory.labelAt) assert.ok(isLand(territory.labelAt), `${territory.name}'s label should sit on land`);
  }
});

// Which power the map should show holding a given place in a given year. This is
// the check that catches unclaimed white gaps as well as wrong ownership, and it
// reasons about the densified smoothing curve — what is actually painted — and
// about draw order, since a later zone wins overlapping ground.
const OWNERSHIP = [
  { year: -264, places: { "Rome (city)": [12.48, 41.9], Capua: [14.25, 41.08], Tarentum: [17.24, 40.47], Rhegium: [15.65, 38.11], Etruria: [11.3, 43.2], Ariminum: [12.57, 44.06], Pisa: [10.4, 43.7] }, polity: "rome" },
  { year: -264, places: { "Po plain": [9.19, 45.46], Massilia: [5.37, 43.3] }, polity: "gaul" },
  { year: -264, places: { "Carthage hinterland": [10.17, 36.8], Utica: [10.06, 37.06], Hadrumetum: [10.63, 35.5] }, polity: "carthage" },
  { year: -264, places: { "western Sicily": [12.9, 37.8], Panormus: [13.36, 38.12] }, polity: "carthage" },
  { year: -264, places: { "Numidian interior": [4.0, 35.6], "Numidian coast": [2.9, 36.6] }, polity: "numidia" },
  { year: -264, places: { Pella: [22.52, 40.76], Thessaly: [22.3, 39.6] }, polity: "macedon" },
  // Rome took the Carthaginian west in 241, but Hiero's Syracuse kept the
  // south-east as an independent ally until the city fell in 212.
  { year: -240, places: { "western Sicily": [12.9, 37.8], Panormus: [13.36, 38.12] }, polity: "rome" },
  { year: -240, places: { Syracuse: [15.29, 37.07] }, polity: "syracuse" },
  { year: -211, places: { Syracuse: [15.29, 37.07], "western Sicily": [12.9, 37.8] }, polity: "rome" },
  { year: -196, places: { Corinth: [22.9, 37.94] }, polity: "greek" },
  { year: -230, places: { "Sardinia interior": [9.1, 40.1] }, polity: "rome" },
  { year: -218, places: { "New Carthage": [-0.98, 37.6], Saguntum: [-0.27, 39.68] }, polity: "carthage" },
  { year: -197, places: { "New Carthage": [-0.98, 37.6] }, polity: "rome" },
  { year: -197, places: { Pella: [22.52, 40.76] }, polity: "macedon" },
  { year: -197, places: { "Carthage hinterland": [10.17, 36.8] }, polity: "carthage" },
];

test("the map shows the expected power holding each known place", () => {
  for (const { year, places, polity } of OWNERSHIP) {
    // Resolve exactly as the map paints: context beneath, then minor powers, then
    // the principals, and within a layer a later zone wins.
    const layerRank = (polity) => TERRITORY_LAYERS.findIndex((layer) => layer.roles.includes(factionRole(polity)));
    const drawn = territoriesForYear(year)
      .map((zone, index) => ({ zone, index }))
      .sort((a, b) => layerRank(a.zone.polity) - layerRank(b.zone.polity) || roleRank(a.zone.polity) - roleRank(b.zone.polity) || a.index - b.index)
      .map(({ zone }) => ({ zone, curve: densifyClosedRing(zone.ring) }));
    for (const [place, point] of Object.entries(places)) {
      assert.ok(isLand(point), `${place} should be on land`);
      const holders = drawn.filter(({ curve }) => pointInRing(point, curve));
      assert.ok(holders.length > 0, `${place} is unclaimed in ${Math.abs(year)} BCE — that renders as a white gap`);
      const winner = holders[holders.length - 1].zone.polity;
      assert.equal(winner, polity, `${place} in ${Math.abs(year)} BCE should read as ${polity}, not ${winner}`);
    }
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
