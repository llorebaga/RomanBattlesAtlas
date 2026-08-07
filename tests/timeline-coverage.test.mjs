import assert from "node:assert/strict";
import test from "node:test";
import { battles } from "../data/battles.ts";
import { campaignRoutes } from "../data/campaigns.ts";
import { historicalEvents } from "../data/events.ts";
import { territoriesForYear } from "../data/territories.ts";
import { battleDiagrams, NO_DIAGRAM_REASON } from "../data/battleDiagrams.ts";
import { sources, sourceCoversYear } from "../data/sources.ts";
import { eras } from "../data/wars.ts";
import { isRouteActive } from "../lib/routeInterpolation.ts";
import { eventCoversYear, eventForYear } from "../lib/historySelectors.ts";
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
  // 509 BCE because that is where the Republic — and any usable narrative — begins.
  // The regal period is covered in prose on the methodology page and nowhere else.
  assert.equal(TIMELINE_START_YEAR, -509);
  // 146 because that is where the middle Republic ends and where the period the
  // atlas claims to cover is actually complete: Carthage and Corinth destroyed in
  // the same summer, and provinces in Africa and Macedonia.
  assert.equal(TIMELINE_END_YEAR, -146);
  assert.equal(YEARS.length, 364);
});

test("every year in the mapped period has a focus event", () => {
  // A phase entry covers its whole span, so the early Republic is accounted for
  // without a year of it being invented.
  const missing = YEARS.filter((year) => !historicalEvents.some((event) => eventCoversYear(event, year)));
  assert.deepEqual(missing.map(bce), [], "years with nothing in the year-in-focus panel");
});

test("every year resolves to exactly one focus event", () => {
  // The panel shows one. Overlap is allowed only in the one shape that resolves
  // cleanly: a single-year entry inside a phase, which narrows the panel for that
  // year. Two phases covering the same year, or two entries for one year, do not.
  for (const year of YEARS) {
    assert.ok(eventForYear(historicalEvents, year), `${bce(year)}: no event resolves`);
    const exact = historicalEvents.filter((event) => event.year === year && event.toYear === undefined);
    assert.ok(exact.length <= 1, `${bce(year)}: ${exact.length} single-year events`);
    const spans = historicalEvents.filter((event) => event.toYear !== undefined && eventCoversYear(event, year));
    assert.ok(spans.length <= 1, `${bce(year)}: covered by ${spans.length} overlapping phases`);
  }
});

test("a phase entry spans forwards and stays inside the timeline", () => {
  for (const event of historicalEvents) {
    if (event.toYear === undefined) continue;
    assert.ok(event.toYear > event.year, `${event.id}: toYear ${event.toYear} does not follow year ${event.year}`);
    assert.ok(event.year >= TIMELINE_START_YEAR, `${event.id}: starts before the timeline`);
    assert.ok(event.toYear <= TIMELINE_END_YEAR, `${event.id}: ends after the timeline`);
    // A phase that points at a battle would claim the battle lasted the phase.
    assert.ok(!event.battleSlug, `${event.id}: a phase entry should not point at a single battle`);
  }
});

// From 264 Polybius and Livy give a continuous campaign narrative, so every single
// year can carry a marker or a route. For the early Republic they do not: the
// fifth-century wars were annual raiding whose geography is unrecoverable, and
// drawing a route for 480 BCE would be the invention the atlas exists to avoid.
// What every year can honestly carry is territory — so the guarantee is split.
const DOCUMENTED_FROM = -264;

test("no year of the documented wars is empty of battles and campaigns", () => {
  const empty = YEARS.filter((year) => year >= DOCUMENTED_FROM).filter((year) => {
    const hasBattle = battles.some((battle) => year >= battle.startYear && year <= battle.endYear);
    const hasRoute = campaignRoutes.some((route) => isRouteActive(route, year));
    return !hasBattle && !hasRoute;
  });
  assert.deepEqual(empty.map(bce), [], "years where the map shows no battle and no campaign");
});

test("no era of the early Republic is a blank", () => {
  // The weaker guarantee for the centuries before Polybius: an era may not be able
  // to fill every year, but every era must put something on the map somewhere.
  for (const era of eras) {
    if (era.endYear >= DOCUMENTED_FROM) continue;
    const hasBattle = battles.some((battle) => battle.startYear <= era.endYear && battle.endYear >= era.startYear);
    const hasRoute = campaignRoutes.some((route) => route.startYear <= era.endYear && route.endYear >= era.startYear);
    assert.ok(hasBattle || hasRoute, `${era.id} (${bce(era.startYear)}–${bce(era.endYear)}) draws nothing at all`);
  }
});

test("every year has territory to colour", () => {
  for (const year of YEARS) {
    const zones = territoriesForYear(year);
    // The early Republic has fewer powers on the map: the Hellenistic kingdoms drawn
    // as context tints for 264–196 did not exist yet, and colouring them in would be
    // a worse error than leaving the east blank.
    const floor = year >= DOCUMENTED_FROM ? 8 : 5;
    assert.ok(zones.length >= floor, `${bce(year)}: only ${zones.length} territory zones`);
    assert.ok(zones.some((zone) => zone.polity === "rome"), `${bce(year)}: Rome missing`);
    // Carthage held Africa and western Sicily from long before Rome was a republic,
    // and is on the map every year until the one in which it stopped existing. 146
    // is the exception the whole Third Punic War exists to produce, so it is stated
    // here rather than quietly dropped from the assertion.
    // BCE years are negative, so "before 146" is the more negative side.
    if (year < -146) assert.ok(zones.some((zone) => zone.polity === "carthage"), `${bce(year)}: Carthage missing`);
    else assert.ok(!zones.some((zone) => zone.polity === "carthage"), "146 BCE: Carthage should be gone from the map");
  }
});

// The years the map is *supposed* to change. Each is a settlement, a conquest, or a
// defection that the coloured zones have to reflect on the right side of.
const TRANSITIONS = [
  // ── The conquest of Italy ───────────────────────────────────────────────────
  { year: -396, gained: ["rome-ager-veii", "etruscan-inner"], lost: ["rome-ager-early", "etruscan-league"], why: "Veii is destroyed and its land annexed, roughly doubling Roman territory" },
  { year: -395, gained: ["gaul-cisalpine"], lost: [], why: "the Gauls settle the Po valley, a few years before they reach Rome" },
  { year: -338, gained: ["rome-latium-campania"], lost: ["latin-league", "rome-ager-veii"], why: "the Latin League is dissolved and replaced by Rome's alliance system" },
  { year: -299, gained: ["rome-central-italy"], lost: ["rome-latium-campania"], why: "Umbria and Picenum bring Rome to the Adriatic" },
  { year: -290, gained: ["rome-peninsular"], lost: ["rome-central-italy", "etruscan-inner", "samnite-league"], why: "Samnium submits and Etruria is bound in, leaving only the Greek south and the Gallic north" },
  { year: -272, gained: ["rome-italy"], lost: ["rome-peninsular", "magna-graecia"], why: "Tarentum surrenders and Rome holds the whole peninsula" },
  // The Hellenistic powers and Numidia enter the map with the Punic wars: before
  // 264 they are outside the atlas's story and colouring them would be decoration.
  { year: -264, gained: ["macedon-greece", "numidia-early", "seleucid", "ptolemaic", "syracuse"], lost: ["syracuse-hegemony"], why: "the eastern kingdoms and Numidia enter the frame, and Syracuse narrows to the kingdom Hiero brought into the Roman alliance" },

  // ── The Punic and Macedonian wars ───────────────────────────────────────────
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

  // ── The war with Antiochus III ──────────────────────────────────────────────
  // 200 is a hinge at both ends of the Mediterranean, and the map has to show both:
  // Rome allies with Attalus, and Antiochus finally takes Coele-Syria at Panium.
  { year: -200, gained: ["seleucid-west", "pergamon", "ptolemaic-egypt"], lost: ["seleucid", "ptolemaic"], why: "Rome's alliance with Attalus I brings Pergamum into the story, and Panium transfers Coele-Syria from Egypt to Antiochus" },
  { year: -192, gained: ["seleucid-greece"], lost: [], why: "Antiochus lands at Demetrias and holds Magnesia, Phthiotis and Malis" },
  { year: -190, gained: [], lost: ["seleucid-greece"], why: "Thermopylae ended the bridgehead — the zone runs through 191 because the battle was fought on that ground in the spring of it" },
  { year: -188, gained: ["seleucid-apamea", "pergamon-apamea"], lost: ["seleucid-west", "pergamon"], why: "Apamea pushes the Seleucids behind the Taurus and hands Asia Minor to Pergamum and Rhodes" },

  // ── The last two wars of the middle Republic ────────────────────────────────
  { year: -167, gained: ["macedon-republics"], lost: ["macedon-reduced"], why: "Pydna abolishes the Antigonid kingdom and Macedon is cut into four republics" },
  { year: -161, gained: ["carthage-reduced", "numidia-emporia"], lost: ["carthage-africa"], why: "Masinissa takes the Tripolitanian emporia, and Carthage may not answer without Rome's leave" },
  { year: -148, gained: ["rome-macedonia"], lost: ["macedon-republics"], why: "Andriscus shows the four republics can still be assembled, so Macedonia is annexed" },
  { year: -146, gained: ["rome-africa"], lost: ["carthage-reduced"], why: "Carthage is destroyed and its territory becomes the province of Africa" },
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
      assert.ok(historicalEvents.some((event) => eventCoversYear(event, year)), `${battle.slug}: ${bce(year)} has no event`);
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
        ["attested", "probable", "disputed", "speculative", "traditional"].includes(entry.certainty),
        `${battle.slug}: "${entry.side}" has no evidence grade`,
      );
    }
  }
});

test("only actions that cannot be drawn are left undrawn", () => {
  // Long sieges and unlocated fields are drawable as schematic shapes; campaigns
  // spanning months and battles nobody described are not. Keep that line explicit.
  assert.deepEqual(Object.keys(NO_DIAGRAM_REASON).sort(), ["africa-invasion", "alps-crossing", "aquilonia", "lake-regillus", "sulci", "tarentum", "trifanum", "vesuvius"]);
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

test("no source is cited for years it does not survive for", () => {
  // The check that makes a citation mean something. Livy wrote the Pyrrhic War in
  // books 12–14 and those books are lost; Polybius' Book 3 stops at Cannae, so
  // Zama belongs to Book 15. A citation outside a text's surviving range points a
  // reader at something that does not discuss the event — or does not exist.
  const byId = new Map(sources.map((source) => [source.id, source]));
  const problems = [];
  const check = (id, year, where) => {
    const source = byId.get(id);
    if (!source || source.kind !== "ancient") return;
    if (sourceCoversYear(source, year)) return;
    const ranges = source.covers.map((r) => `${Math.abs(r.fromYear)}–${Math.abs(r.toYear)}`).join(", ");
    problems.push(`${where}: cites ${id} for ${Math.abs(year)} BCE, but it covers ${ranges} BCE`);
  };

  for (const battle of battles) {
    for (const id of battle.ancientSourceIds) check(id, battle.startYear, `battle ${battle.slug}`);
  }
  for (const [slug, diagram] of Object.entries(battleDiagrams)) {
    const battle = battles.find((entry) => entry.slug === slug);
    for (const id of diagram.sourceIds ?? []) check(id, battle.startYear, `diagram ${slug}`);
  }
  for (const route of campaignRoutes) {
    for (const point of route.points) {
      for (const id of point.sourceIds) check(id, point.year, `route ${route.id} at "${point.label}"`);
    }
  }
  assert.deepEqual(problems, []);
});

test("every ancient source declares what it survives for, and is used", () => {
  for (const source of sources) {
    if (source.kind !== "ancient") continue;
    assert.ok(source.covers?.length, `${source.id}: an ancient source must declare its surviving range`);
    for (const range of source.covers) {
      assert.ok(range.fromYear <= range.toYear, `${source.id}: inverted range`);
    }
  }
  // A source nobody cites is either a gap in the citations or dead weight in the list.
  const cited = new Set([
    ...battles.flatMap((battle) => [...battle.ancientSourceIds, ...battle.modernSourceIds]),
    ...Object.values(battleDiagrams).flatMap((diagram) => diagram.sourceIds ?? []),
    ...campaignRoutes.flatMap((route) => route.points.flatMap((point) => point.sourceIds)),
  ]);
  const unused = sources.filter((source) => !cited.has(source.id)).map((source) => source.id);
  assert.deepEqual(unused, [], "sources declared but never cited");
});

test("the evidence register's own figures are countable from the data", () => {
  // The methodology page states how many texts carry the atlas and how many battles
  // hang on a single one. Both are rendered from these counts rather than written
  // out, so this test is really a guard against someone hardcoding them back.
  const ancient = sources.filter((source) => source.kind === "ancient");
  const modern = sources.filter((source) => source.kind === "modern");
  assert.ok(ancient.length > 0 && modern.length > 0);
  assert.equal(ancient.length + modern.length, sources.length, "every source is ancient or modern");

  // Every battle must name at least one ancient text: the atlas does not present a
  // battle on modern authority alone.
  for (const battle of battles) {
    assert.ok(battle.ancientSourceIds.length >= 1, `${battle.slug}: no ancient testimony cited`);
    assert.ok(battle.modernSourceIds.length >= 1, `${battle.slug}: no modern scholarship cited`);
    for (const id of battle.ancientSourceIds) {
      const source = sources.find((entry) => entry.id === id);
      assert.equal(source?.kind, "ancient", `${battle.slug}: ${id} is listed as ancient testimony but is not`);
    }
    for (const id of battle.modernSourceIds) {
      const source = sources.find((entry) => entry.id === id);
      assert.equal(source?.kind, "modern", `${battle.slug}: ${id} is listed as modern scholarship but is not`);
    }
  }
});

test("an ancient author named in the prose is an author the record cites", () => {
  // If a page says "Diodorus gives 24,000", Diodorus has to be in that record's
  // citations, or the reader is handed an attribution they cannot follow. This found
  // four gaps when it was written: the Allia quoting Diodorus' troop figure, Heraclea
  // weighing Dionysius against Hieronymus, and Sulci naming Polybius and Livy in
  // order to say they are absent — which reads as an attribution either way.
  //
  // Plain substring matching, deliberately. The first version used a word-boundary
  // regex built in a template literal, where \b is a backspace character rather than
  // a boundary, so it matched nothing and reported success. Author names are
  // distinctive enough without it.
  const AUTHORS = ["Polybius", "Livy", "Diodorus", "Plutarch", "Appian", "Dionysius", "Zonaras"];
  const problems = [];
  for (const battle of battles) {
    const cited = [...battle.ancientSourceIds, ...battle.modernSourceIds];
    const diagram = battleDiagrams[battle.slug];
    const prose = [
      battle.summary, battle.significance, battle.context ?? "",
      ...battle.uncertaintyNotes,
      ...(battle.forces ?? []).flatMap((force) => [force.estimate, force.note ?? ""]),
      ...(battle.casualties ?? []).flatMap((entry) => [entry.estimate, entry.note ?? ""]),
      ...(diagram ? diagram.stages.flatMap((stage) => [stage.description, stage.caveat ?? ""]) : []),
      ...(diagram ? [diagram.scaleNote, diagram.orientation ?? ""] : []),
    ].join(" ");
    for (const author of AUTHORS) {
      if (!prose.includes(author)) continue;
      if (cited.some((id) => id.startsWith(author.toLowerCase() + "-"))) continue;
      problems.push(`${battle.slug} names ${author} but does not cite him`);
    }
  }
  assert.deepEqual(problems, []);
});
