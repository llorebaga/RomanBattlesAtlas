import assert from "node:assert/strict";
import test from "node:test";
import { battles } from "../data/battles.ts";
import { campaignRoutes } from "../data/campaigns.ts";
import { historicalEvents } from "../data/events.ts";
import { territoriesForYear } from "../data/territories.ts";
import { battleDiagrams, NO_DIAGRAM_REASON } from "../data/battleDiagrams.ts";
import { sources } from "../data/sources.ts";
import { isRouteActive } from "../lib/routeInterpolation.ts";
import { TIMELINE_START_YEAR, TIMELINE_END_YEAR } from "../lib/historicalDates.ts";

// What a visitor sees when the scrubber lands on a year.
//
// The atlas is read year by year, so the year is the unit that has to be complete:
// something happened, something is drawn, and the map changed when it should have.
// These tests exist because all three used to fail silently — twenty years of the
// interbellum showed an empty map and said nothing about it.

const YEARS = [];
for (let year = TIMELINE_START_YEAR; year <= TIMELINE_END_YEAR; year += 1) YEARS.push(year);
const bce = (year) => `${Math.abs(year)} BCE`;

test("the mapped period is the one we think it is", () => {
  assert.equal(TIMELINE_START_YEAR, -264);
  assert.equal(TIMELINE_END_YEAR, -196);
  assert.equal(YEARS.length, 69);
});

test("every year in the mapped period has a focus event", () => {
  const missing = YEARS.filter((year) => !historicalEvents.some((event) => event.year === year));
  assert.deepEqual(missing.map(bce), [], "years with nothing in the year-in-focus panel");
});

test("no year carries two focus events", () => {
  // The panel shows one; a second would be authored and never seen.
  for (const year of YEARS) {
    const found = historicalEvents.filter((event) => event.year === year);
    assert.equal(found.length, 1, `${bce(year)}: ${found.length} events`);
  }
});

test("every year has something drawn on the map", () => {
  const empty = YEARS.filter((year) => {
    const hasBattle = battles.some((battle) => year >= battle.startYear && year <= battle.endYear);
    const hasRoute = campaignRoutes.some((route) => isRouteActive(route, year));
    return !hasBattle && !hasRoute;
  });
  assert.deepEqual(empty.map(bce), [], "years where the map shows no battle and no campaign");
});

test("every year has territory to colour", () => {
  for (const year of YEARS) {
    const zones = territoriesForYear(year);
    assert.ok(zones.length >= 8, `${bce(year)}: only ${zones.length} territory zones`);
    // Rome and Carthage are on the map throughout the Punic wars; after 201 Carthage
    // is confined to Africa but still holds it.
    assert.ok(zones.some((zone) => zone.polity === "rome"), `${bce(year)}: Rome missing`);
    assert.ok(zones.some((zone) => zone.polity === "carthage"), `${bce(year)}: Carthage missing`);
  }
});

// The years the map is *supposed* to change. Each is a settlement, a conquest, or a
// defection that the coloured zones have to reflect on the right side of.
const TRANSITIONS = [
  { year: -241, gained: ["rome-sicily"], lost: ["carthage-sicily"], why: "the peace ending the First Punic War gives Rome its first province" },
  { year: -238, gained: ["rome-sardinia"], lost: ["carthage-sardinia"], why: "Rome takes Sardinia during the Mercenary War" },
  { year: -237, gained: ["carthage-iberia-south"], lost: [], why: "Hamilcar crosses to Iberia" },
  { year: -228, gained: ["carthage-iberia"], lost: ["carthage-iberia-south"], why: "Hasdrubal extends Barcid Iberia to the Ebro" },
  { year: -216, gained: ["carthage-italy"], lost: [], why: "southern Italy defects after Cannae" },
  { year: -212, gained: ["rome-sicily-whole"], lost: ["syracuse", "rome-sicily"], why: "Syracuse falls and Rome holds the whole island" },
  { year: -211, gained: ["carthage-italy-reduced"], lost: ["carthage-italy"], why: "Capua is retaken and the defection shrinks" },
  { year: -207, gained: ["carthage-bruttium"], lost: ["carthage-italy-reduced"], why: "Hannibal is confined to Bruttium" },
  { year: -206, gained: ["rome-iberia"], lost: ["carthage-iberia"], why: "Ilipa ends Carthaginian Iberia" },
  { year: -202, gained: [], lost: ["carthage-bruttium"], why: "Hannibal is recalled to Africa" },
  { year: -201, gained: ["numidia-masinissa"], lost: ["numidia-early"], why: "the peace settles Numidia on Masinissa" },
  { year: -197, gained: ["macedon-reduced", "greek-states"], lost: ["macedon-greece"], why: "Cynoscephalae strips Macedon of Greece" },
];

test("territory changes hands in the year it changed hands", () => {
  for (const { year, gained, lost, why } of TRANSITIONS) {
    const before = new Set(territoriesForYear(year - 1).map((zone) => zone.id));
    const after = new Set(territoriesForYear(year).map((zone) => zone.id));
    for (const id of gained) {
      assert.ok(!before.has(id), `${id} should not exist in ${bce(year - 1)} — ${why}`);
      assert.ok(after.has(id), `${id} should exist in ${bce(year)} — ${why}`);
    }
    for (const id of lost) {
      assert.ok(before.has(id), `${id} should still exist in ${bce(year - 1)} — ${why}`);
      assert.ok(!after.has(id), `${id} should be gone in ${bce(year)} — ${why}`);
    }
  }
});

test("the map is otherwise still between transitions", () => {
  // A zone appearing or vanishing in a year nobody documented is a data slip, not
  // a historical event. Every change has to be in the table above.
  const expected = new Set(TRANSITIONS.map((entry) => entry.year));
  for (const year of YEARS.slice(1)) {
    const before = territoriesForYear(year - 1).map((zone) => zone.id).sort().join(",");
    const after = territoriesForYear(year).map((zone) => zone.id).sort().join(",");
    if (before === after) continue;
    assert.ok(expected.has(year), `${bce(year)}: the territory set changes here but no transition is documented`);
  }
});

test("an event that points at a battle points at one that was being fought", () => {
  for (const event of historicalEvents) {
    if (!event.battleSlug) continue;
    const battle = battles.find((entry) => entry.slug === event.battleSlug);
    assert.ok(battle, `${event.id}: no battle called ${event.battleSlug}`);
    assert.ok(
      event.year >= battle.startYear && event.year <= battle.endYear,
      `${event.id}: ${bce(event.year)} is outside ${battle.slug} (${bce(battle.startYear)}–${bce(battle.endYear)})`,
    );
  }
});

test("every battle year has that battle's own event or marker", () => {
  // A battle nobody can reach from the timeline is invisible work.
  for (const battle of battles) {
    const years = [];
    for (let year = battle.startYear; year <= battle.endYear; year += 1) years.push(year);
    for (const year of years) {
      assert.ok(historicalEvents.some((event) => event.year === year), `${battle.slug}: ${bce(year)} has no event`);
    }
  }
});

test("a battle that is drawn is also described in full", () => {
  // The diagram and the prose were added in separate passes, and a page with one
  // and not the other reads as unfinished next to its neighbours.
  for (const battle of battles) {
    if (!battleDiagrams[battle.slug]) continue;
    assert.ok(battle.context, `${battle.slug}: has a diagram but no strategic context`);
    assert.ok(battle.forces?.length, `${battle.slug}: has a diagram but no force estimates`);
    assert.ok(battle.casualties?.length, `${battle.slug}: has a diagram but no reported losses`);
    for (const entry of [...battle.forces, ...battle.casualties]) {
      assert.ok(entry.side && entry.estimate, `${battle.slug}: a force or casualty entry is incomplete`);
      assert.ok(
        ["attested", "probable", "disputed", "speculative"].includes(entry.certainty),
        `${battle.slug}: "${entry.side}" has no evidence grade`,
      );
    }
  }
});

test("only actions that cannot be drawn are left undrawn", () => {
  // Long sieges and unlocated fields are drawable as schematic shapes; campaigns
  // spanning months and battles nobody described are not. Keep that line explicit.
  assert.deepEqual(Object.keys(NO_DIAGRAM_REASON).sort(), ["africa-invasion", "alps-crossing", "sulci"]);
  for (const battle of battles) {
    if (NO_DIAGRAM_REASON[battle.slug]) continue;
    assert.ok(battleDiagrams[battle.slug], `${battle.slug}: no diagram and no stated reason`);
  }
});

test("every source a diagram or battle cites actually exists", () => {
  const known = new Set(sources.map((source) => source.id));
  for (const battle of battles) {
    for (const id of [...battle.ancientSourceIds, ...battle.modernSourceIds]) {
      assert.ok(known.has(id), `${battle.slug} cites unknown source ${id}`);
    }
  }
  for (const [slug, diagram] of Object.entries(battleDiagrams)) {
    for (const id of diagram.sourceIds ?? []) assert.ok(known.has(id), `${slug} diagram cites unknown source ${id}`);
  }
  for (const route of campaignRoutes) {
    for (const point of route.points) {
      for (const id of point.sourceIds) assert.ok(known.has(id), `${route.id}/${point.label} cites unknown source ${id}`);
    }
  }
});

test("the battle chain reads in order and joins up", () => {
  const bySlug = new Map(battles.map((battle) => [battle.slug, battle]));
  for (const battle of battles) {
    if (battle.previousSlug) {
      const previous = bySlug.get(battle.previousSlug);
      assert.ok(previous, `${battle.slug}: previousSlug ${battle.previousSlug} does not exist`);
      assert.equal(previous.nextSlug, battle.slug, `${previous.slug} and ${battle.slug} do not point at each other`);
      // BCE years are negative, so the earlier battle is the more negative one.
      assert.ok(previous.startYear <= battle.startYear, `${previous.slug} should not come after ${battle.slug}`);
    }
    if (battle.nextSlug) assert.ok(bySlug.get(battle.nextSlug), `${battle.slug}: nextSlug ${battle.nextSlug} does not exist`);
  }
});
