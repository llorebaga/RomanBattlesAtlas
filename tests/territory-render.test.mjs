import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { territories, territoriesForYear } from "../data/territories.ts";
import { factionColor, factionList, isContextPower, factionRole, roleRank, TERRITORY_LAYERS } from "../data/factions.ts";
import { landPolygons } from "../data/geo/mediterranean-land.ts";
import { densifyClosedRing } from "../lib/mapGeometry.ts";
import { TIMELINE_START_YEAR, TIMELINE_END_YEAR } from "../lib/historicalDates.ts";

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
    // The step adapts to the zone. A fixed 0.3° grid is fine for Carthage but
    // cannot resolve the territory of a city-state: Rome in 509 BCE is about forty
    // kilometres across, which is smaller than one sample, and the coarse grid
    // reported it as almost entirely sea.
    const span = Math.min(Math.max(...lngs) - Math.min(...lngs), Math.max(...lats) - Math.min(...lats));
    const step = Math.min(0.3, Math.max(0.02, span / 12));
    let tested = 0;
    let onLand = 0;
    for (let x = Math.min(...lngs); x <= Math.max(...lngs); x += step) {
      for (let y = Math.min(...lats); y <= Math.max(...lats); y += step) {
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
  // Frontiers that follow real features, checked on both sides of the line.
  { year: -218, places: { "Ebro south bank": [-0.9, 41.4], "Tortosa reach": [0.45, 40.7], Saguntum: [-0.3, 39.7] }, polity: "carthage" },
  { year: -264, places: { "Tripolitanian emporia": [13.2, 32.7], Byzacena: [9.8, 35.2] }, polity: "carthage" },
  { year: -264, places: { "Nile delta": [31.0, 31.2], "Cyrenaica": [21.8, 32.7] }, polity: "ptolemaic" },
  { year: -264, places: { "Po valley": [10.4, 45.0], "Alpine foot": [8.0, 45.6] }, polity: "gaul" },
  { year: -264, places: { "Apennine south slope": [11.5, 43.9] }, polity: "rome" },
  // The war with Antiochus. Ionia has to stay Seleucid while Pergamum holds the
  // north-west corner, or the naval war is fought out of somebody else's harbour.
  // Coele-Syria is Ptolemaic for the whole third century and Seleucid after Panium
  // in 200. Promoting the Seleucids out of the context layer made them win this
  // seam, which is how the error surfaced — before that they simply lost it.
  { year: -264, places: { Judaea: [35.2, 31.8], Gaza: [34.47, 31.5], Damascus: [36.3, 33.5] }, polity: "ptolemaic" },
  { year: -264, places: { Antioch: [36.2, 36.2] }, polity: "seleucid" },
  { year: -190, places: { Judaea: [35.2, 31.8], Gaza: [34.47, 31.5] }, polity: "seleucid" },
  { year: -190, places: { "Nile delta": [31.0, 31.2] }, polity: "ptolemaic" },
  { year: -195, places: { Ephesus: [27.34, 37.94], "Seleucid Syria": [37.0, 36.2], Cilicia: [34.6, 37.0] }, polity: "seleucid" },
  { year: -195, places: { Pergamum: [27.18, 39.13], "the Troad": [26.4, 39.8] }, polity: "pergamon" },
  // Antiochus' bridgehead supersedes the freed Greek states while he holds it.
  { year: -192, places: { "Malis and Phthiotis": [22.5, 39.0] }, polity: "seleucid" },
  { year: -195, places: { "Malis and Phthiotis": [22.5, 39.0] }, polity: "greek" },
  // Apamea: the Seleucids go behind the Taurus, and Rome keeps none of it.
  { year: -188, places: { "Seleucid Syria": [37.0, 36.2], "Cilicia Pedias": [35.6, 37.0] }, polity: "seleucid" },
  { year: -188, places: { Ephesus: [27.34, 37.94], Pergamum: [27.18, 39.13], Phrygia: [30.5, 38.6], Lycia: [29.6, 36.6] }, polity: "pergamon" },
  // Masinissa spent fifty years taking Carthaginian ground while the treaty of 201
  // forbade Carthage to answer, and took the Tripolitanian emporia around 162. If
  // Carthage still reads as intact in 160 the Third Punic War looks like a war
  // against a rival, which is the one thing it was not.
  { year: -170, places: { Tripolitania: [13.2, 32.7] }, polity: "carthage" },
  { year: -160, places: { Tripolitania: [13.2, 32.7] }, polity: "numidia" },
  { year: -160, places: { "Carthage hinterland": [10.17, 36.8], Byzacena: [9.8, 35.2] }, polity: "carthage" },
  // 146: both settlements land in the same year, at opposite ends of the sea.
  { year: -146, places: { "Carthage hinterland": [10.17, 36.8], Byzacena: [9.8, 35.2] }, polity: "rome" },
  { year: -146, places: { Pella: [22.52, 40.76] }, polity: "rome" },
  { year: -160, places: { Pella: [22.52, 40.76] }, polity: "macedon" },
  { year: -146, places: { "Numidian interior": [4.0, 35.6] }, polity: "numidia" },
  // The Attalid bequest, taken possession of by force and organised in 129.
  { year: -140, places: { Pergamum: [27.18, 39.13], Ephesus: [27.34, 37.94] }, polity: "pergamon" },
  { year: -120, places: { Pergamum: [27.18, 39.13], Ephesus: [27.34, 37.94] }, polity: "rome" },
  // Southern Gaul, taken to secure the road to Spain — and the ground Arausio is
  // fought on, which is why the province has to be on the map before 105.
  { year: -130, places: { Narbo: [3.0, 43.2], Arausio: [4.81, 44.14] }, polity: "gaul" },
  { year: -105, places: { Narbo: [3.0, 43.2], Arausio: [4.81, 44.14] }, polity: "rome" },
  { year: -105, places: { "free Gaul": [2.0, 45.6] }, polity: "gaul" },
  { year: -101, places: { "Numidian interior": [4.0, 35.6] }, polity: "numidia" },
];

// Ground that is blank on purpose. These peoples were independent, so colouring
// them would be the error; the test records the intent so a later "fill the gap"
// change has to argue with history first.
const UNCLAIMED_BY_DESIGN = [
  { year: -218, places: { "north of the Ebro": [0.9, 41.7], "Celtiberian interior": [-3.5, 41.2], "Cantabrian coast": [-4.0, 43.2] } },
  { year: -264, places: { Liguria: [8.4, 44.3], "free Iberia": [-4.0, 40.0] } },
  // Apamea gave the Seleucid west to Rome's allies. The northern Anatolian kingdoms
  // were never Antiochus' to lose or Rome's to give, so the grant must stop short of
  // them rather than sweeping across the peninsula.
  { year: -188, places: { Bithynia: [30.5, 40.5], "Galatia (Ancyra)": [32.85, 39.93], Cappadocia: [35.5, 38.7] } },
];

test("land held by independent peoples stays unclaimed", () => {
  for (const { year, places } of UNCLAIMED_BY_DESIGN) {
    const drawn = territoriesForYear(year).map((zone) => ({ zone, curve: densifyClosedRing(zone.ring) }));
    for (const [place, point] of Object.entries(places)) {
      const holders = drawn.filter(({ curve }) => pointInRing(point, curve)).map(({ zone }) => zone.polity);
      assert.deepEqual(holders, [], `${place} was independent in ${Math.abs(year)} BCE but reads as ${holders.join("+")}`);
    }
  }
});

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
      // 56° is where the bundled land data stops. Gaul and Britain need the room;
      // beyond it the clipped straight edge of the basemap would come into frame.
      assert.ok(lat >= 20 && lat <= 56, `${period.id}: latitude ${lat} outside the map`);
    }
  }
});

test("every polity resolves to a real hex color", () => {
  for (const period of territories) {
    assert.match(factionColor(period.polity), /^#[0-9a-f]{6}$/i, `${period.polity} has no valid color`);
  }
});

test("belligerent hues are the validated categorical set", () => {
  // Nine belligerents share five hues plus one borrowed from a minor: the palette
  // is scoped to the period, not to the roster. What must not drift is the set of
  // distinct hues in play, because that is what was validated for separation.
  const belligerents = factionList.filter((info) => info.role === "belligerent");
  const hues = [...new Set(belligerents.map((info) => info.color))].sort();
  assert.deepEqual(hues, ["#008300", "#2a78d6", "#4a3aa7", "#7d2b3a", "#a9538c", "#e34948", "#eda100"].sort());
  // Ptolemaic Egypt is the last power on the map that never takes the field. The
  // Seleucids were in that class until the atlas reached 192; promoting them cost
  // no new hue, because Etruria's magenta had been free since 291.
  assert.ok(isContextPower("ptolemaic"));
  assert.ok(!isContextPower("seleucid"));
  assert.ok(!isContextPower("rome"));
});

test("two powers sharing a hue never hold ground in the same year", () => {
  // This is the rule that makes reusing a hue legitimate rather than a collision.
  // If it ever fails, the two factions overlap in time and one of them needs a
  // colour of its own — re-validate the categorical set rather than nudging a hex.
  const byColour = new Map();
  for (const info of factionList) {
    if (!byColour.has(info.color)) byColour.set(info.color, []);
    byColour.get(info.color).push(info.id);
  }
  const shared = [...byColour.entries()].filter(([, ids]) => ids.length > 1);
  assert.ok(shared.length > 0, "expected at least one deliberately reused hue");

  for (let year = TIMELINE_START_YEAR; year <= TIMELINE_END_YEAR; year += 1) {
    const present = new Set(territoriesForYear(year).map((zone) => zone.polity));
    for (const [colour, ids] of shared) {
      const together = ids.filter((id) => present.has(id));
      assert.ok(
        together.length <= 1,
        `${Math.abs(year)} BCE: ${together.join(" and ")} both hold ground and both draw as ${colour}`,
      );
    }
  }
});

test("a zone that admits uncertainty says what kind", async () => {
  // For a long time every zone carried an evidence grade and the map threw it
  // away: the paths were fill-only, TerritoryPeriod had no note field, and the
  // Syracusan zone was marked `disputed` in a source comment no reader could see.
  // A grade alone does not tell anyone *how* a shape is uncertain — whether the
  // frontier is guessed, the date approximate, or the outline a composite of two
  // centuries that never coexisted. So the weaker grades owe an explanation.
  for (const zone of territories) {
    if (zone.certainty !== "disputed" && zone.certainty !== "speculative") continue;
    assert.ok(zone.note, `${zone.id}: graded ${zone.certainty} but does not say what it is not claiming`);
    assert.ok(zone.note.length > 40, `${zone.id}: the note should explain, not label`);
  }
  // And the map has to actually surface it, or the field is decoration again.
  const source = await readFile(new URL("../components/map/AtlasMap.tsx", import.meta.url), "utf8");
  assert.match(source, /<title>\{`\$\{zone\.name\}/, "territory paths must carry an accessible title");
  assert.match(source, /zone\.certainty/, "the title must include the evidence grade");
  assert.match(source, /zone\.note/, "the title must include the note when there is one");
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
