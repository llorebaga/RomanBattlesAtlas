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
import { relations, RELATION_KINDS } from "../data/figureRelations.ts";
import { factionColor } from "../data/factions.ts";
import { buildConnectionChart, CHART, sideOf, startYearOf } from "../lib/connectionLayout.ts";
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

test("the featured campaign is one the atlas can carry", () => {
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

test("every connection joins two figures the atlas holds", () => {
  const slugs = new Set(figures.map((figure) => figure.slug));
  const kinds = new Set(RELATION_KINDS.map((entry) => entry.kind));
  assert.ok(relations.length >= 20, "the connections page should be substantial");
  for (const relation of relations) {
    assert.ok(slugs.has(relation.from), `relation cites unknown figure ${relation.from}`);
    assert.ok(slugs.has(relation.to), `relation cites unknown figure ${relation.to}`);
    assert.notEqual(relation.from, relation.to, `${relation.from}: related to themselves`);
    assert.ok(kinds.has(relation.kind), `${relation.from}->${relation.to}: unknown kind ${relation.kind}`);
    assert.ok(relation.label && relation.note, `${relation.from}->${relation.to}: needs a label and a note`);
    // Two people cannot be connected if they never overlapped in life. This is the
    // check that stops a plausible-sounding link between the wrong generations —
    // there are two Aemilius Paulli in this atlas, a father and a son.
    const from = figures.find((figure) => figure.slug === relation.from);
    const to = figures.find((figure) => figure.slug === relation.to);
    const fromBorn = from.bornYear ?? from.activeFrom;
    const toBorn = to.bornYear ?? to.activeFrom;
    assert.ok(
      fromBorn <= to.diedYear && toBorn <= from.diedYear,
      `${relation.from} and ${relation.to} were never alive at the same time`,
    );
  }
  // Every relation kind advertised in the key must actually have entries, or the
  // page renders a heading over nothing.
  for (const { kind } of RELATION_KINDS) {
    assert.ok(relations.some((relation) => relation.kind === kind), `no relations of kind ${kind}`);
  }
});

// ── The connections chart ──────────────────────────────────────────────────
// Bound exactly as app/figures/connections/page.tsx binds it, so the test and
// the page are looking at the same picture.
const onChart = figures.filter((figure) => figure.diedYear <= TIMELINE_END_YEAR);
const connectionChart = () => buildConnectionChart({
  figures: onChart.map((figure) => ({
    slug: figure.slug, name: figure.name, title: figure.title, faction: figure.faction,
    color: factionColor(figure.faction), bornYear: figure.bornYear, diedYear: figure.diedYear,
    activeFrom: figure.activeFrom, activeTo: figure.activeTo, battleSlugs: figure.battleSlugs,
    lifespan: lifespan(figure), knownFor: figure.knownFor, mapped: isMapped(figure),
  })),
  relations,
  battles: battles.map((battle) => ({ slug: battle.slug, name: battle.name, startYear: battle.startYear })),
  bands: periods.map((period) => ({ id: period.id, shortName: period.shortName, startYear: period.startYear, endYear: period.endYear })),
});
const labelWidth = (name) => name.length * CHART.labelSize * CHART.charAdvance;

test("the connections chart holds everyone the mapped period does", () => {
  const chart = connectionChart();
  assert.equal(chart.entries.length, onChart.length, "every figure inside the timeline is on the chart");
  // The emperors are deliberately off it: the atlas stops at the Ides of March,
  // and stretching the axis to Constantine would flatten the Republic.
  const charted = new Set(chart.entries.map((entry) => entry.slug));
  for (const figure of figures) {
    assert.equal(charted.has(figure.slug), figure.diedYear <= TIMELINE_END_YEAR, `${figure.slug}: on the chart when it should not be, or missing`);
  }
  assert.equal(chart.edges.length, relations.length, "every relation is drawn");
  for (const entry of chart.entries) {
    assert.equal(entry.side, sideOf(entry.faction), `${entry.slug}: on the wrong side`);
    // Rome above the line, the powers she fought below it.
    assert.equal(entry.y < chart.axisY, entry.side === "rome", `${entry.slug}: drawn on the wrong side of the axis`);
  }
});

test("nothing on the connections chart overlaps or leaves the frame", () => {
  // The layout is computed rather than hand-placed now, so what has to be
  // asserted is the packing: labels inside the frame, and no two entries sharing
  // a lane close enough for their names to run together. Spartacus is the case
  // that matters — two years of life and nine characters of name.
  const chart = connectionChart();
  for (const entry of chart.entries) {
    assert.ok(entry.labelX >= 0, `${entry.slug}: name runs off the left`);
    assert.ok(entry.labelX + labelWidth(entry.name) <= chart.width, `${entry.slug}: name runs off the right`);
    assert.ok(entry.y >= 0 && entry.y + entry.height <= chart.height, `${entry.slug}: bar outside the frame`);
    assert.ok(entry.x1 >= entry.x0, `${entry.slug}: life runs backwards`);
    assert.ok(entry.activeX0 >= entry.x0 - 0.01 && entry.activeX1 <= entry.x1 + 0.01, `${entry.slug}: campaigned outside their own life`);
  }
  for (const side of ["rome", "other"]) {
    const lanes = new Map();
    for (const entry of chart.entries.filter((e) => e.side === side)) {
      if (!lanes.has(entry.lane)) lanes.set(entry.lane, []);
      lanes.get(entry.lane).push(entry);
    }
    for (const [lane, row] of lanes) {
      row.sort((a, b) => a.x0 - b.x0);
      for (let i = 1; i < row.length; i += 1) {
        const left = row[i - 1];
        const right = row[i];
        assert.equal(left.y, right.y, `${side} lane ${lane}: entries are not level`);
        const occupied = Math.max(left.x1, left.x0 + labelWidth(left.name));
        assert.ok(right.x0 >= occupied, `${left.slug} and ${right.slug} collide in ${side} lane ${lane}`);
      }
    }
  }
});

test("every connection is drawn between the two lives it joins", () => {
  // A link has to touch both people at a moment both of them were there. This is
  // the check that would catch an anchor year outside somebody's life, which is
  // how a line ends up floating in open space.
  const chart = connectionChart();
  const bySlug = new Map(chart.entries.map((entry) => [entry.slug, entry]));
  for (const edge of chart.edges) {
    const a = bySlug.get(edge.from);
    const b = bySlug.get(edge.to);
    assert.ok(a && b, `${edge.id}: an end is not on the chart`);
    const numbers = edge.path.match(/-?[\d.]+/g).map(Number);
    assert.equal(numbers.length, 8, `${edge.id}: not a single cubic`);
    const [ax, ay, , , , , bx, by] = numbers;
    assert.ok(ax >= a.x0 - 0.6 && ax <= a.x1 + 0.6, `${edge.id}: starts off ${edge.from}'s life`);
    assert.ok(bx >= b.x0 - 0.6 && bx <= b.x1 + 0.6, `${edge.id}: ends off ${edge.to}'s life`);
    // Each end leaves from the face of the bar that looks at the other person.
    const faces = (entry, y) => Math.abs(y - entry.y) < 0.05 || Math.abs(y - (entry.y + entry.height)) < 0.05;
    assert.ok(faces(a, ay) && faces(b, by), `${edge.id}: does not start and end on the bars`);
    assert.ok(
      edge.midX >= 0 && edge.midX <= chart.width && edge.midY >= 0 && edge.midY <= chart.height,
      `${edge.id}: its marker is outside the frame`,
    );
    assert.ok(edge.year >= chart.domain.from && edge.year <= chart.domain.to, `${edge.id}: anchored outside the timeline`);
  }
});

test("a connection is dated from the record, not from the drawing", () => {
  // An authored year wins; then the battle both fought, if the atlas holds one;
  // and only then the overlap of two lives — which the chart admits to by
  // drawing an open marker instead of a filled one.
  const chart = connectionChart();
  const byId = new Map(chart.edges.map((edge) => [edge.id, edge]));
  for (const relation of relations) {
    const edge = byId.get(`${relation.from}-${relation.to}-${relation.kind}`);
    assert.ok(edge, `${relation.from}->${relation.to} (${relation.kind}) is not drawn`);
    if (relation.year !== undefined) {
      assert.equal(edge.year, relation.year, `${edge.id}: ignored its authored year`);
      assert.equal(edge.datedExactly, true);
    }
    // A battle anchor may only be claimed where both really fought it.
    if (edge.battleSlug) {
      const from = figures.find((figure) => figure.slug === relation.from);
      const to = figures.find((figure) => figure.slug === relation.to);
      assert.ok(
        from.battleSlugs.includes(edge.battleSlug) && to.battleSlugs.includes(edge.battleSlug),
        `${edge.id}: anchored to ${edge.battleSlug}, which they did not both fight`,
      );
      assert.equal(relation.kind, "battlefield", `${edge.id}: only a battlefield meeting may be anchored to a battle`);
    }
    // Inferred or not, the year has to fall inside both lives, or the line is
    // drawn at a moment one of them was not alive for.
    const ends = [relation.from, relation.to].map((slug) => figures.find((figure) => figure.slug === slug));
    for (const person of ends) {
      assert.ok(
        edge.year >= startYearOf(person) && edge.year <= person.diedYear,
        `${edge.id}: ${Math.abs(edge.year)} BCE is outside ${person.slug}'s life`,
      );
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
