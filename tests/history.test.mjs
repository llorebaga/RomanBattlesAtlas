import assert from "node:assert/strict";
import test from "node:test";
import { battles } from "../data/battles.ts";
import { campaignRoutes } from "../data/campaigns.ts";
import { formatHistoricalYear, clampTimelineYear, TIMELINE_START_YEAR, TIMELINE_END_YEAR } from "../lib/historicalDates.ts";
import { eras, eraForYear, TIMELINE_START_YEAR as ERAS_START, TIMELINE_END_YEAR as ERAS_END } from "../data/wars.ts";
import { territoriesForYear } from "../data/territories.ts";
import { factionColor, getFactionInfo } from "../data/factions.ts";
import { battlesForYear, activeCampaigns, validateHistoricalData } from "../lib/historySelectors.ts";
import { interpolateRoutePosition, splitRouteAtYear } from "../lib/routeInterpolation.ts";

test("formats BCE dates consistently", () => {
  assert.equal(formatHistoricalYear(-264), "264 BCE");
  assert.equal(formatHistoricalYear(-241), "241 BCE");
  assert.equal(formatHistoricalYear(0), "1 BCE / 1 CE");
});

test("clamps the continuous timeline across every era", () => {
  assert.equal(clampTimelineYear(-600), -509);
  assert.equal(clampTimelineYear(-300), -300);
  assert.equal(clampTimelineYear(-250), -250);
  assert.equal(clampTimelineYear(-216), -216);
  assert.equal(clampTimelineYear(-197), -197);
  assert.equal(clampTimelineYear(-190), -190);
  assert.equal(clampTimelineYear(-160), -160);
  assert.equal(clampTimelineYear(-101), -101);
  assert.equal(clampTimelineYear(-50), -100);
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

test("timeline bounds stay in sync with the era data", () => {
  assert.equal(TIMELINE_START_YEAR, ERAS_START);
  assert.equal(TIMELINE_END_YEAR, ERAS_END);
  assert.equal(ERAS_START, Math.min(...eras.map((era) => era.startYear)));
  assert.equal(ERAS_END, Math.max(...eras.map((era) => era.endYear)));
});

test("assigns each timeline year to an era", () => {
  assert.equal(eraForYear(-264)?.id, "first-punic");
  assert.equal(eraForYear(-230)?.id, "interbellum");
  assert.equal(eraForYear(-216)?.id, "second-punic");
  assert.equal(eraForYear(-197)?.id, "macedonian-second");
});

test("includes Second Punic War battles on the timeline", () => {
  assert.ok(battlesForYear(battles, -216).some((battle) => battle.slug === "cannae"));
  assert.ok(battlesForYear(battles, -202).some((battle) => battle.slug === "zama"));
  assert.equal(battles.find((battle) => battle.slug === "cannae")?.war, "second-punic");
  assert.ok(activeCampaigns(campaignRoutes, -218).some((route) => route.id === "hannibal-march-to-italy"));
});

test("includes the Second Macedonian War with a new faction", () => {
  assert.ok(battlesForYear(battles, -197).some((battle) => battle.slug === "cynoscephalae"));
  assert.equal(battles.find((battle) => battle.slug === "cynoscephalae")?.war, "macedonian-second");
  assert.ok(activeCampaigns(campaignRoutes, -197).some((route) => route.id === "roman-illyria-advance"));
  assert.deepEqual(eras.find((era) => era.id === "macedonian-second")?.factions, ["rome", "macedon"]);
  assert.equal(getFactionInfo("macedon")?.adjective, "Macedonian");
  assert.match(factionColor("rome"), /^#[0-9a-f]{6}$/i);
});

test("includes the war with Antiochus, and Rome's first campaign in Asia", () => {
  assert.ok(battlesForYear(battles, -191).some((battle) => battle.slug === "thermopylae"));
  assert.ok(battlesForYear(battles, -190).some((battle) => battle.slug === "magnesia"));
  assert.equal(battles.find((battle) => battle.slug === "magnesia")?.war, "seleucid-war");
  assert.equal(eraForYear(-194)?.id, "greek-settlement");
  assert.equal(eraForYear(-190)?.id, "seleucid-war");
  // The march into Asia is the point of the campaign layer here: without the
  // Hellespont crossing there is no Magnesia.
  assert.ok(activeCampaigns(campaignRoutes, -190).some((route) => route.id === "roman-army-to-asia"));
  assert.ok(campaignRoutes.find((route) => route.id === "roman-army-to-asia")?.points.some((point) => point.viaSea));
  assert.deepEqual(eras.find((era) => era.id === "seleucid-war")?.factions, ["rome", "seleucid", "pergamon"]);
  // Antiochus stops being scenery: the Seleucids were a context tint until the
  // atlas reached a war they actually fought.
  assert.equal(getFactionInfo("seleucid")?.role, "belligerent");
  assert.equal(getFactionInfo("pergamon")?.adjective, "Pergamene");
});

test("carries the middle Republic through to its end in 146", () => {
  assert.ok(battlesForYear(battles, -168).some((battle) => battle.slug === "pydna"));
  assert.ok(battlesForYear(battles, -146).some((battle) => battle.slug === "carthage"));
  assert.equal(battles.find((battle) => battle.slug === "pydna")?.war, "macedonian-third");
  assert.equal(battles.find((battle) => battle.slug === "carthage")?.war, "punic-third");
  // The siege spans four years, so the scrubber should find it in every one.
  for (const year of [-149, -148, -147, -146]) {
    assert.ok(battlesForYear(battles, year).some((battle) => battle.slug === "carthage"), `${year}: the siege should be on the map`);
  }
  // The connective stretches exist so that no year between the wars is a blank.
  assert.equal(eraForYear(-180)?.id, "western-wars");
  assert.equal(eraForYear(-160)?.id, "after-pydna");
  assert.equal(eraForYear(-146)?.id, "punic-third");
  assert.ok(activeCampaigns(campaignRoutes, -165).some((route) => route.id === "roman-spain-annual"));
});

test("reaches the wars of Marius, and the army that stops belonging to the state", () => {
  assert.ok(battlesForYear(battles, -105).some((battle) => battle.slug === "arausio"));
  assert.ok(battlesForYear(battles, -102).some((battle) => battle.slug === "aquae-sextiae"));
  assert.ok(battlesForYear(battles, -101).some((battle) => battle.slug === "vercellae"));
  assert.equal(battles.find((battle) => battle.slug === "muthul")?.war, "jugurthine-war");
  // Noreia and Arausio fall inside the Jugurthine era and belong to the Cimbric
  // war: the two ran at once, and a year can only carry one era.
  assert.equal(eraForYear(-105)?.id, "jugurthine-war");
  assert.equal(battles.find((battle) => battle.slug === "arausio")?.war, "cimbric-war");
  // The Cimbri are the one belligerent that never holds ground: they were peoples
  // on the move, and a shaded country would claim a homeland they had left.
  assert.equal(getFactionInfo("cimbri")?.role, "belligerent");
  assert.ok(!territoriesForYear(-103).some((zone) => zone.polity === "cimbri"));
  assert.ok(activeCampaigns(campaignRoutes, -103).some((route) => route.id === "cimbri-migration"));
});

test("territory zones evolve with the timeline", () => {
  const romeRegions = (targetYear) => territoriesForYear(targetYear).filter((territory) => territory.polity === "rome").map((territory) => territory.id);
  assert.ok(!romeRegions(-264).includes("rome-sicily"));
  assert.ok(romeRegions(-240).includes("rome-sicily"));
  assert.ok(territoriesForYear(-260).some((territory) => territory.id === "carthage-sicily"));
  assert.ok(!territoriesForYear(-240).some((territory) => territory.id === "carthage-sicily"));
  assert.ok(territoriesForYear(-197).some((territory) => territory.id === "macedon-reduced"));
});

test("historical data passes structural validation", () => {
  assert.deepEqual(validateHistoricalData(battles, campaignRoutes), []);
  assert.equal(new Set(battles.map((battle) => battle.slug)).size, battles.length);
});
