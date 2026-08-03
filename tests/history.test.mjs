import assert from "node:assert/strict";
import test from "node:test";
import { battles } from "../data/battles.ts";
import { campaignRoutes } from "../data/campaigns.ts";
import { formatHistoricalYear, clampTimelineYear } from "../lib/historicalDates.ts";
import { battlesForYear, activeCampaigns, validateHistoricalData } from "../lib/historySelectors.ts";
import { interpolateRoutePosition, splitRouteAtYear } from "../lib/routeInterpolation.ts";

test("formats BCE dates consistently", () => {
  assert.equal(formatHistoricalYear(-264), "264 BCE");
  assert.equal(formatHistoricalYear(-241), "241 BCE");
  assert.equal(formatHistoricalYear(0), "1 BCE / 1 CE");
});

test("clamps the First Punic War timeline", () => {
  assert.equal(clampTimelineYear(-300), -264);
  assert.equal(clampTimelineYear(-250), -250);
  assert.equal(clampTimelineYear(-200), -241);
});

test("interpolates only active campaign routes", () => {
  const route = campaignRoutes.find((item) => item.id === "roman-sicily-opening");
  assert.ok(route);
  assert.deepEqual(interpolateRoutePosition(route, -264), [15.64, 38.11]);
  assert.equal(interpolateRoutePosition(route, -250), null);
  const split = splitRouteAtYear(route, -263);
  assert.ok(split.completed.length >= 2);
  assert.ok(split.future.length >= 2);
});

test("filters campaigns and battles by BCE year", () => {
  assert.ok(activeCampaigns(campaignRoutes, -260).some((route) => route.id === "roman-western-fleet"));
  assert.ok(battlesForYear(battles, -260).some((battle) => battle.slug === "mylae"));
  assert.ok(!battlesForYear(battles, -259).some((battle) => battle.slug === "mylae"));
  assert.ok(battlesForYear(battles, -249).some((battle) => battle.slug === "lilybaeum"));
});

test("historical data passes structural validation", () => {
  assert.deepEqual(validateHistoricalData(battles, campaignRoutes), []);
  assert.equal(new Set(battles.map((battle) => battle.slug)).size, battles.length);
});
