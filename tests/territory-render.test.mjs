import assert from "node:assert/strict";
import test from "node:test";
import { territories, territoriesForYear } from "../data/territories.ts";
import { factionColor, factionList, isContextPower } from "../data/factions.ts";

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
