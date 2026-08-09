import assert from "node:assert/strict";
import test from "node:test";
import { readdir, readFile } from "node:fs/promises";
import { battles } from "../data/battles.ts";
import { eras } from "../data/wars.ts";
import { periods, formatYearRange } from "../data/periods.ts";
import { campaignIndex, FEATURED_CAMPAIGN_ID, getCampaign } from "../data/campaignIndex.ts";
import { timelineMilestones } from "../data/timelineMilestones.ts";
import { exploreOptions, featuredBattleSlugs } from "../data/homepage.ts";
import { figures, isMapped } from "../data/figures.ts";
import { sources, sourceCoversYear } from "../data/sources.ts";
import { atlasHref, parseAtlasSearch, battleOnMapHref, battleHref, ATLAS_PATH } from "../lib/atlasLinks.ts";
import { computeCampaignCoverage, computePeriodCoverage, computeTotals } from "../lib/coverageCore.ts";
import { campaignRoutes } from "../data/campaigns.ts";
import { clampTimelineYear, lifespan, TIMELINE_START_YEAR, TIMELINE_END_YEAR } from "../lib/historicalDates.ts";

// Bind the real data once, exactly as lib/coverage.ts does for the app.
const coverageOf = (campaign) => { const core = computeCampaignCoverage(battles, campaignRoutes, campaign); return { ...core, atlasLink: core.link ? atlasHref(core.link) : null }; };
const allCampaignCoverage = () => campaignIndex.map(coverageOf);
const periodCoverage = (period) => { const core = computePeriodCoverage(battles, campaignRoutes, campaignIndex, period); return { ...core, atlasLink: core.link ? atlasHref(core.link) : null }; };
const allPeriodCoverage = () => periods.map(periodCoverage);
const campaignCoverage = coverageOf;
const atlasTotals = () => computeTotals(battles, campaignRoutes);

// ── Deep links ─────────────────────────────────────────────────────────────
test("the atlas link builds the documented query strings", () => {
  assert.equal(atlasHref(), "/atlas");
  assert.equal(atlasHref({ year: -264, campaign: "first-punic" }), "/atlas?year=-264&campaign=first-punic");
  assert.equal(atlasHref({ year: -260, battle: "mylae" }), "/atlas?year=-260&battle=mylae");
  assert.equal(atlasHref({ year: -216, campaign: "second-punic", battle: "cannae" }), "/atlas?year=-216&campaign=second-punic&battle=cannae");
  assert.equal(atlasHref({ location: [12.4, 37.9], zoom: 4.7 }), "/atlas?location=12.4%2C37.9&zoom=4.7");
  assert.equal(atlasHref({ layers: ["army", "battles"] }), "/atlas?layers=army%2Cbattles");
});

test("the atlas parses every link it can build", () => {
  const link = { year: -216, campaign: "second-punic", battle: "cannae", location: [16.13, 41.31], zoom: 5.4, layers: ["army", "fleet", "battles"] };
  const parsed = parseAtlasSearch(atlasHref(link).split("?")[1]);
  assert.deepEqual(parsed, link);
  // Tolerates junk rather than throwing, and ignores what it cannot use.
  assert.deepEqual(parseAtlasSearch(""), {});
  assert.deepEqual(parseAtlasSearch("?year=notanumber&zoom=-3&layers="), {});
  assert.deepEqual(parseAtlasSearch("?year=-216"), { year: -216 });
  assert.deepEqual(parseAtlasSearch("year=-216"), { year: -216 }, "a leading ? is optional");
});

test("battle links carry the battle, its year, and its campaign", () => {
  for (const slug of featuredBattleSlugs) {
    const battle = battles.find((entry) => entry.slug === slug);
    assert.ok(battle, `featured slug ${slug} must exist in the battle data`);
    const href = battleOnMapHref(battle);
    const parsed = parseAtlasSearch(href.split("?")[1]);
    assert.ok(href.startsWith(`${ATLAS_PATH}?`), `${slug} should link into the atlas`);
    assert.equal(parsed.battle, slug);
    assert.equal(parsed.year, battle.startYear, `${slug} should open in the year it was fought`);
    assert.equal(parsed.campaign, battle.war);
    assert.equal(clampTimelineYear(parsed.year), parsed.year, `${slug}'s year must be inside the timeline`);
    assert.equal(battleHref(slug), `/battles/${slug}`, "detail-page links must not change shape");
  }
});

// ── What the pages claim about coverage ────────────────────────────────────
test("no page writes the atlas's year range out by hand", async () => {
  // This test exists because one sentence on the homepage said "264 to 196 BCE"
  // and went on saying it through two extensions of the timeline — first when the
  // atlas reached back to 509, then when it ran forward past 196. It was wrong on
  // the live site for both. A range that is rendered from TIMELINE_START_YEAR and
  // TIMELINE_END_YEAR cannot drift; one that is typed into JSX always can.
  //
  // Data files are exempt: a battle's displayDate ("149–146 BCE") and a source's
  // surviving range are facts about that record, not claims about the atlas.
  const RANGE = /\d{2,4}\s*(?:to|–|-)\s*\d{2,4}\s*(?:BCE|CE)/;
  const roots = ["app", "components"];
  const offenders = [];

  async function walk(dir) {
    for (const entry of await readdir(new URL(`../${dir}/`, import.meta.url), { withFileTypes: true })) {
      if (entry.isDirectory()) {
        await walk(`${dir}/${entry.name}`);
        continue;
      }
      if (!entry.name.endsWith(".tsx") && !entry.name.endsWith(".ts")) continue;
      const path = `${dir}/${entry.name}`;
      const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
      source.split("\n").forEach((line, index) => {
        // Comments may name a range while explaining why it must not be hardcoded.
        if (/^\s*(?:\/\/|\*|\{\/\*)/.test(line)) return;
        if (RANGE.test(line)) offenders.push(`${path}:${index + 1} — ${line.trim()}`);
      });
    }
  }
  for (const root of roots) await walk(root);
  assert.deepEqual(offenders, [], "render the range from the timeline bounds instead");
});

// ── Periods ────────────────────────────────────────────────────────────────
test("periods are chronological, continuous, and honestly labelled", () => {
  for (let i = 1; i < periods.length; i += 1) {
    assert.ok(periods[i].startYear > periods[i - 1].startYear, `${periods[i].id} must follow ${periods[i - 1].id}`);
    assert.ok(periods[i].startYear <= periods[i - 1].endYear + 1, `gap between ${periods[i - 1].id} and ${periods[i].id}`);
  }
  for (const period of periods) {
    assert.ok(period.startYear < period.endYear, `${period.id}: inverted range`);
    assert.ok(period.representativeYear >= period.startYear && period.representativeYear <= period.endYear, `${period.id}: representative year outside its own range`);
    assert.ok(period.shortName.length <= 16, `${period.id}: shortName is for compact selectors`);
    assert.match(formatYearRange(period.startYear, period.endYear), /\d/);
  }
  // The atlas covers the middle Republic; everything else must not claim to be ready.
  const available = periods.filter((period) => period.status === "available");
  assert.deepEqual(available.map((period) => period.id), ["early-rome", "middle-republic"]);
});

test("period links open the atlas at a year it can show", () => {
  for (const coverage of allPeriodCoverage()) {
    if (!coverage.atlasLink) {
      assert.equal(coverage.battleCount, 0, `${coverage.period.id} has battles but no link`);
      continue;
    }
    const parsed = parseAtlasSearch(coverage.atlasLink.split("?")[1]);
    assert.equal(parsed.year, coverage.period.representativeYear);
    assert.equal(clampTimelineYear(parsed.year), parsed.year, `${coverage.period.id} links outside the timeline`);
  }
});

// ── Campaigns ──────────────────────────────────────────────────────────────
test("campaigns only claim coverage they actually have", () => {
  for (const coverage of allCampaignCoverage()) {
    const { campaign, battleCount, atlasLink } = coverage;
    if (campaign.status === "available" || campaign.status === "partial") {
      assert.ok(campaign.eraId, `${campaign.id} claims coverage but names no era`);
      assert.ok(eras.some((era) => era.id === campaign.eraId), `${campaign.id}: era ${campaign.eraId} does not exist`);
      assert.ok(battleCount > 0, `${campaign.id} claims coverage but has no mapped battles`);
      assert.ok(atlasLink, `${campaign.id} claims coverage but has no atlas link`);
    } else {
      // Planned campaigns must be inert: no era, no link, nothing to break.
      assert.equal(campaign.eraId, undefined, `${campaign.id} is ${campaign.status} but names an era`);
      assert.equal(atlasLink, null, `${campaign.id} is ${campaign.status} but links into the atlas`);
      assert.equal(battleCount, 0);
    }
    if (campaign.representativeBattle) {
      assert.ok(battles.some((battle) => battle.slug === campaign.representativeBattle), `${campaign.id}: representative battle must exist`);
    }
    assert.ok(getCampaign(campaign.id), "every campaign is retrievable by id");
    assert.ok(periods.some((period) => period.id === campaign.periodId), `${campaign.id}: unknown period ${campaign.periodId}`);
  }
});

test("campaign links open the atlas in the right war and year", () => {
  for (const { campaign, atlasLink } of allCampaignCoverage()) {
    if (!atlasLink) continue;
    const parsed = parseAtlasSearch(atlasLink.split("?")[1]);
    assert.equal(parsed.campaign, campaign.eraId);
    assert.equal(parsed.year, campaign.startYear);
    assert.equal(clampTimelineYear(parsed.year), parsed.year, `${campaign.id} links outside the timeline`);
  }
});

test("the featured campaign is the most developed one", () => {
  const featured = getCampaign(FEATURED_CAMPAIGN_ID);
  assert.ok(featured, "the featured campaign must exist");
  const coverage = campaignCoverage(featured);
  assert.equal(featured.status, "available");
  assert.ok(coverage.battleCount >= 10, "the featured campaign should be substantial");
  assert.ok(coverage.navalBattleCount > 0, "the First Punic War was decided at sea");
  // Featured, not the whole project: other campaigns must be mapped too.
  const others = allCampaignCoverage().filter((entry) => entry.campaign.id !== FEATURED_CAMPAIGN_ID && entry.battleCount > 0);
  assert.ok(others.length >= 2, "the homepage must not read as a single-war site");
});

// ── Timeline ───────────────────────────────────────────────────────────────
test("timeline milestones span Roman history and only link where mapped", () => {
  assert.ok(timelineMilestones.length >= 10, "the long view needs the whole arc");
  for (let i = 1; i < timelineMilestones.length; i += 1) {
    assert.ok(timelineMilestones[i].year > timelineMilestones[i - 1].year, "milestones must be in order");
  }
  assert.ok(timelineMilestones.some((milestone) => milestone.year < TIMELINE_START_YEAR), "history begins before the mapped range");
  assert.ok(timelineMilestones.some((milestone) => milestone.year > TIMELINE_END_YEAR), "history continues after it");
  for (const milestone of timelineMilestones) {
    const inRange = milestone.year >= TIMELINE_START_YEAR && milestone.year <= TIMELINE_END_YEAR;
    assert.equal(milestone.mapped, inRange, `${milestone.id}: mapped flag disagrees with the atlas range`);
    if (milestone.mapped) {
      const parsed = parseAtlasSearch(atlasHref({ year: milestone.year }).split("?")[1]);
      assert.equal(clampTimelineYear(parsed.year), milestone.year);
    }
  }
});

// ── Homepage composition ───────────────────────────────────────────────────
test("the exploration routes are present and resolvable", () => {
  const ids = exploreOptions.map((option) => option.id);
  assert.deepEqual(ids, ["atlas", "periods", "campaigns", "battles", "figures"]);
  for (const option of exploreOptions) {
    assert.ok(option.title && option.description && option.action, `${option.id} needs its copy`);
    if (option.target.kind === "section") {
      // Anchors must name a section the homepage actually renders.
      assert.ok(["periods", "campaigns", "battles"].includes(option.target.id), `${option.id}: unknown section`);
    }
    // A route target must be an in-site path, not an anchor or an external URL.
    if (option.target.kind === "route") assert.match(option.target.href, /^\/[a-z-]+$/, `${option.id}: bad route`);
  }
});

// ── Figures ────────────────────────────────────────────────────────────────
test("a figure only claims battles the map actually holds", () => {
  // The same rule the campaign shelf follows. A person page that listed battles
  // the atlas does not have would be the one thing this project is against.
  const slugs = new Set(battles.map((battle) => battle.slug));
  assert.ok(figures.length >= 20, "the figures section should be substantial");
  assert.equal(new Set(figures.map((figure) => figure.slug)).size, figures.length, "duplicate figure slug");
  for (const figure of figures) {
    assert.ok(periods.some((period) => period.id === figure.periodId), `${figure.slug}: unknown period`);
    assert.ok(figure.knownFor && figure.description.length > 0, `${figure.slug}: needs copy`);
    assert.ok(figure.activeFrom <= figure.activeTo, `${figure.slug}: inverted active years`);
    if (figure.bornYear !== undefined) {
      assert.ok(figure.bornYear < figure.diedYear, `${figure.slug}: born after dying`);
    }
    for (const slug of figure.battleSlugs) {
      assert.ok(slugs.has(slug), `${figure.slug}: cites unknown battle ${slug}`);
      const battle = battles.find((entry) => entry.slug === slug);
      // A person cannot fight a battle outside the years they were active.
      assert.ok(
        battle.startYear >= figure.activeFrom && battle.startYear <= figure.activeTo,
        `${figure.slug}: ${slug} (${battle.startYear}) is outside their active years`,
      );
    }
  }
});

test("a mapped figure is sourced, and a signpost claims nothing", () => {
  for (const figure of figures) {
    if (isMapped(figure)) {
      assert.ok(figure.ancientSourceIds.length >= 1, `${figure.slug}: no ancient testimony`);
      assert.ok(figure.modernSourceIds.length >= 1, `${figure.slug}: no modern scholarship`);
      assert.ok(figure.description.length >= 2, `${figure.slug}: a mapped figure needs a real account`);
      assert.ok(figure.uncertaintyNotes.length >= 1, `${figure.slug}: must say what is not settled`);
      // Every ancient text must survive for some year this person was active.
      for (const id of figure.ancientSourceIds) {
        const source = sources.find((entry) => entry.id === id);
        assert.ok(source, `${figure.slug}: unknown source ${id}`);
        assert.equal(source.kind, "ancient", `${figure.slug}: ${id} is not ancient testimony`);
        const years = [];
        for (let year = figure.activeFrom; year <= figure.activeTo; year += 1) years.push(year);
        assert.ok(
          years.some((year) => sourceCoversYear(source, year)),
          `${figure.slug}: ${id} survives for no year they were active`,
        );
      }
      for (const id of figure.modernSourceIds) {
        assert.equal(sources.find((entry) => entry.id === id)?.kind, "modern", `${figure.slug}: ${id} is not modern`);
      }
    } else {
      // A signpost points at a period the atlas has not reached. It must not carry
      // sources or caveats, because it is not making claims to support.
      const period = periods.find((entry) => entry.id === figure.periodId);
      assert.notEqual(period.status, "available", `${figure.slug}: unmapped but its period is available`);
      assert.equal(figure.ancientSourceIds.length, 0, `${figure.slug}: a signpost should cite nothing`);
      assert.equal(figure.modernSourceIds.length, 0, `${figure.slug}: a signpost should cite nothing`);
    }
  }
});

test("a lifespan reads correctly whether or not the birth is known", () => {
  assert.equal(lifespan({ bornYear: -247, diedYear: -183 }), "247–183 BCE");
  assert.equal(lifespan({ diedYear: -71 }), "died 71 BCE");
  assert.equal(lifespan({ bornYear: -63, diedYear: 14 }), "63 BCE – 14 CE");
});

test("headline totals are counted from the atlas data", () => {
  const totals = atlasTotals();
  assert.equal(totals.battles, battles.filter((battle) => battle.war).length);
  assert.equal(totals.wars, new Set(battles.map((battle) => battle.war)).size);
  assert.ok(totals.routes > 0 && totals.naval > 0 && totals.sieges > 0);
  // The ledger must agree with the per-campaign counts.
  const summed = allCampaignCoverage().reduce((total, entry) => total + entry.battleCount, 0);
  assert.equal(summed, totals.battles, "coverage table and headline totals must agree");
});

test("every mapped period reports the battles its campaigns hold", () => {
  const middle = periodCoverage(periods.find((period) => period.id === "middle-republic"));
  assert.ok(middle.battleCount > 0);
  assert.equal(middle.battleCount, middle.campaigns.reduce((total, entry) => total + entry.battleCount, 0));
  assert.ok(middle.atlasLink, "the mapped period must be enterable");
});
