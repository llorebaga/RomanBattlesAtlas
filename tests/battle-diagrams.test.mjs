import assert from "node:assert/strict";
import test from "node:test";
import { battles } from "../data/battles.ts";
import { battleDiagrams, getBattleDiagram, NO_DIAGRAM_REASON } from "../data/battleDiagrams.ts";
import { factionList } from "../data/factions.ts";

const FACTIONS = new Set(factionList.map((info) => info.id));
const CERTAINTIES = new Set(["attested", "probable", "disputed", "speculative"]);
const KINDS = new Set(["infantry", "phalanx", "skirmishers", "cavalry", "elephants", "ships", "camp", "works"]);
const FRAME = { width: 100, height: 68 };

const entries = Object.entries(battleDiagrams);

test("every diagram belongs to a battle that exists", () => {
  for (const [slug] of entries) {
    assert.ok(battles.some((battle) => battle.slug === slug), `diagram for unknown battle: ${slug}`);
    assert.ok(getBattleDiagram(slug), `${slug} should be retrievable`);
  }
  assert.ok(entries.length >= 10, "expected a substantial set of diagrams");
});

test("a battle has either a diagram or a stated reason for not having one", () => {
  // The point of the rule: a page must never be silently empty, and must never
  // invent a reconstruction the sources cannot support.
  for (const battle of battles) {
    const hasDiagram = Boolean(battleDiagrams[battle.slug]);
    const hasReason = Boolean(NO_DIAGRAM_REASON[battle.slug]);
    assert.ok(hasDiagram || hasReason, `${battle.slug}: needs a diagram or a documented reason it has none`);
    assert.ok(!(hasDiagram && hasReason), `${battle.slug}: has both a diagram and a reason for not having one`);
  }
});

test("no reason is recorded for a battle that does not exist", () => {
  for (const slug of Object.keys(NO_DIAGRAM_REASON)) {
    assert.ok(battles.some((battle) => battle.slug === slug), `reason recorded for unknown battle: ${slug}`);
  }
});

test("every diagram tells a beginning, a middle, and an end", () => {
  for (const [slug, diagram] of entries) {
    assert.ok(diagram.stages.length >= 3, `${slug}: a battle needs at least three stages to show how it developed`);
    assert.ok(diagram.scaleNote.length > 20, `${slug}: the scale note must say what the frame stands for`);
    assert.ok(diagram.sourceIds?.length, `${slug}: a reconstruction must cite its sources`);
    const ids = diagram.stages.map((stage) => stage.id);
    assert.equal(new Set(ids).size, ids.length, `${slug}: duplicate stage ids`);
    for (const stage of diagram.stages) {
      assert.ok(stage.title && stage.description, `${slug}/${stage.id}: needs a title and description`);
      assert.ok(CERTAINTIES.has(stage.certainty), `${slug}/${stage.id}: invalid certainty`);
      assert.ok(stage.units.length > 0, `${slug}/${stage.id}: a stage with no units shows nothing`);
    }
  }
});

test("every unit is a known force, inside the frame", () => {
  for (const [slug, diagram] of entries) {
    for (const stage of diagram.stages) {
      const unitIds = stage.units.map((unit) => unit.id);
      assert.equal(new Set(unitIds).size, unitIds.length, `${slug}/${stage.id}: duplicate unit ids`);
      for (const unit of stage.units) {
        assert.ok(FACTIONS.has(unit.faction), `${slug}/${stage.id}/${unit.id}: unknown faction ${unit.faction}`);
        assert.ok(KINDS.has(unit.kind), `${slug}/${stage.id}/${unit.id}: unknown kind ${unit.kind}`);
        const [x, y] = unit.at;
        assert.ok(x >= 0 && x <= FRAME.width, `${slug}/${stage.id}/${unit.id}: x=${x} outside the frame`);
        assert.ok(y >= 0 && y <= FRAME.height, `${slug}/${stage.id}/${unit.id}: y=${y} outside the frame`);
        if (unit.size) {
          const [w, h] = unit.size;
          assert.ok(w > 0 && h > 0, `${slug}/${stage.id}/${unit.id}: size must be positive`);
          assert.ok(x - w / 2 >= -2 && x + w / 2 <= FRAME.width + 2, `${slug}/${stage.id}/${unit.id}: overflows the frame horizontally`);
        }
      }
    }
  }
});

test("both sides are shown while they are still in the fight", () => {
  for (const [slug, diagram] of entries) {
    for (const stage of diagram.stages.slice(0, -1)) {
      const factions = new Set(stage.units.map((unit) => unit.faction));
      assert.ok(factions.size >= 2, `${slug}/${stage.id}: only one side is on the field before the final stage`);
    }
  }
});

test("arrows stay inside the frame and name a known side", () => {
  for (const [slug, diagram] of entries) {
    for (const stage of diagram.stages) {
      for (const arrow of stage.arrows ?? []) {
        for (const [x, y] of [arrow.from, arrow.to]) {
          assert.ok(x >= 0 && x <= FRAME.width && y >= 0 && y <= FRAME.height, `${slug}/${stage.id}/${arrow.id}: endpoint outside the frame`);
        }
        assert.notDeepEqual(arrow.from, arrow.to, `${slug}/${stage.id}/${arrow.id}: zero-length arrow`);
        if (arrow.faction) assert.ok(FACTIONS.has(arrow.faction), `${slug}/${stage.id}/${arrow.id}: unknown faction`);
        if (arrow.kind) assert.ok(["move", "attack", "retreat", "missile"].includes(arrow.kind), `${slug}/${stage.id}/${arrow.id}: unknown arrow kind`);
      }
    }
  }
});

test("terrain features are drawable", () => {
  for (const [slug, diagram] of entries) {
    for (const feature of diagram.terrain) {
      const needsPoints = ["sea", "coast", "river", "hill", "ridge", "woods", "marsh", "wall", "road"].includes(feature.kind);
      if (needsPoints) {
        assert.ok(feature.points && feature.points.length >= 2, `${slug}/${feature.id}: ${feature.kind} needs at least two points`);
        for (const [x, y] of feature.points) {
          assert.ok(Number.isFinite(x) && Number.isFinite(y), `${slug}/${feature.id}: non-finite point`);
        }
      } else {
        assert.ok(feature.at, `${slug}/${feature.id}: ${feature.kind} needs a position`);
      }
    }
  }
});

test("the diagram agrees with the battle it describes", () => {
  for (const [slug, diagram] of entries) {
    const battle = battles.find((entry) => entry.slug === slug);
    // The sides on the field must be the sides that fought.
    const factions = new Set(diagram.stages.flatMap((stage) => stage.units.map((unit) => unit.faction)));
    assert.ok(factions.has("rome") || factions.has("carthage") || factions.has("macedon"), `${slug}: no principal on the field`);
    // A naval battle is fought in ships; a land battle is not.
    const kinds = new Set(diagram.stages.flatMap((stage) => stage.units.map((unit) => unit.kind)));
    if (battle.kind === "naval") assert.ok(kinds.has("ships"), `${slug}: a naval battle should show ships`);
    if (battle.kind === "land") assert.ok(!kinds.has("ships"), `${slug}: a land battle should not show ships`);
    // Cited sources must be the battle's own.
    const known = new Set([...battle.ancientSourceIds, ...battle.modernSourceIds]);
    for (const id of diagram.sourceIds ?? []) {
      assert.ok(known.has(id), `${slug}: diagram cites ${id}, which the battle record does not`);
    }
  }
});

test("stages that claim little are marked as such", () => {
  // Not every stage can be attested. What matters is that the uncertain ones are
  // labelled and that the set is not uniformly confident.
  for (const [slug, diagram] of entries) {
    const levels = diagram.stages.map((stage) => stage.certainty);
    assert.ok(levels.some((level) => level !== "attested"), `${slug}: every stage claims to be attested, which no battle reconstruction is`);
  }
});
