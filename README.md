# Roman Campaign Atlas

Roman Campaign Atlas is an evidence-led interactive historical map of Roman warfare. The home page presents the whole arc, from early Rome to Late Antiquity, and opens into an atlas whose continuous timeline currently covers **509–30 BCE**: the conquest of Italy (the wars with Veii and the Latins, the Gallic sack, the three Samnite wars, and Pyrrhus), then the **First Punic War**, the interwar decades, the **Second Punic War**, the **Second Macedonian War**, the **war with Antiochus III** that carried Rome into Asia, the two wars of the 140s that ended with Carthage and Corinth destroyed in the same summer, the Spanish, Jugurthine and Cimbric wars that carry the story to Marius, and the Social War, Sulla, Spartacus, Pompey's East, **Caesar's Gallic Wars** and the civil war that ends on the Ides of March, and the fourteen years after it — Mutina, Philippi, Sextus Pompeius' Sicily, the Parthian invasion of Syria, and Actium — with campaign routes, changing frontiers, battles, sieges, **the people who fought them**, and the uncertainty behind each reconstruction.

`/figures` carries the commanders, kings and rebels one by one: dates, the battles each fought (linked to the map and graded), the account, and what the sources cannot settle. It follows the same rule as the campaign shelf — an entry may only claim battles the atlas actually holds. Five emperors are listed without any, because the mapped period ends in 30 BCE and the alternative would be writing them up as though it did not.

`/figures/connections` draws how they were related — family, service, rivalry, and who met whom in the field — on the timeline they lived on. Two rules are tested: both ends of a link must be figures the atlas already holds, and the two must have been alive at the same time. That second one exists because there are two Aemilius Paulli here, a father who died at Cannae and a son who won Pydna.

> Historical caution: the atlas is a research interface, not a claim to exact reconstruction. Routes and several coordinates are provisional and are explicitly classified as attested, probable, disputed, speculative, or — for the early Republic — traditional.

## Scope

- An editorial home page at `/` that presents the whole arc of Roman warfare and offers five ways in: the atlas, a period, a campaign, a single battle, or a person
- The interactive atlas at `/atlas` (legacy `/map` preserved), openable at any year, campaign, battle, location, or zoom through query parameters
- Supporting pages: a battle index at `/battles`, `/methodology`, and `/about`
- A single continuous BCE timeline across every era, with play, pause, previous/next year, and three playback speeds
- The map header and view follow the active era as you scrub; the theatre re-centres between wars
- Roman and Carthaginian army and fleet routes with elapsed and future segments — including Hannibal's march over the Alps and Scipio's campaigns in Iberia and Africa
- Filters, map key, year summary, accessible event list, and responsive battle panel
- A focus event covering every one of the 480 years, and a battle or campaign drawn on the map in every year from 264 — the interbellum decades and the Sicilian and Greek theatres included, not just the famous marches
- Data-driven dynamic detail pages at `/battles/[slug]`; every battle that carries a tactical diagram also carries strategic context, force estimates, and reported losses
- Unit tests for historical dates, era assignment, route interpolation, year filtering, and data validation, plus year-by-year coverage tests over the whole mapped period
- Server-render integration checks for the map and Mylae routes

## Technology

- Next.js App Router-compatible application via Vinext
- TypeScript and React
- Tailwind CSS 4 plus project-specific CSS
- The campaign atlas is inline SVG over bundled Natural Earth coastlines (no tile service); MapLibre is used only for the battle-page locator
- Lucide icons
- Node's built-in test runner
- Cloudflare/Sites-compatible build output; Vercel can also run the Next.js project

## Local development

Requirements: Node.js 22.13 or later.

```bash
npm install
npm run dev
```

Open the local URL printed by the development server. No environment variables are required for the MVP.

## Commands

```bash
npm run dev          # development server
npm run lint         # ESLint
npm test             # data and timeline tests
npm run build        # production build
npm run test:render  # server-render checks; run after build
```

## Project structure

```text
app/                    Routes (home, atlas, battles, methodology, about), layout, visual system
components/home/        Homepage sections: hero, cards, timeline, preview, coverage
components/map/         Map, timeline, legend, and event panel
components/battles/     Battle-area map, sequence, sources
data/                   Editable wars/eras, battles, routes, events, diagrams, sources
lib/                    BCE dates, route interpolation, selectors, validation, diagram label solver
types/                  Strict historical data contracts
tests/                  Unit and rendered-route integration tests
```

## Deep links into the atlas

Every entry point on the home page goes through `lib/atlasLinks.ts`, so the atlas is addressed in one vocabulary:

```text
/atlas                                                  the atlas as it opens
/atlas?year=-264&campaign=first-punic                   a campaign, at its first year
/atlas?year=-260&battle=mylae                           a battle, selected, panel open
/atlas?year=-216&campaign=second-punic&battle=cannae     both
/atlas?year=-197&location=22.55,39.42&zoom=5.4          an explicit view
/atlas?layers=army,fleet,battles                        only these layers enabled
```

`year` is clamped to the timeline; a missing year falls back to the battle's, then the campaign's first year. Unknown or malformed parameters are ignored rather than throwing, and each link is an ordinary navigation, so the browser back button returns to where the visitor came from. `parseAtlasSearch` and `atlasHref` are covered by `tests/homepage.test.mjs`.

## Adding a battle

1. Add a typed `Battle` record to `data/battles.ts`.
2. Use a representative coordinate, uncertainty radius, confidence category, and uncertainty note.
3. Reference source IDs from `data/sources.ts`.
4. Add a year summary in `data/events.ts` when appropriate.
5. Link neighboring slugs if the event belongs in the sequential detail navigation.
6. Run `npm test` and visit `/battles/<slug>`.

The reusable template gives every record a concise detail page. Any battle that carries `context`, `forces`, `moments`, or `casualties` automatically renders the richer multi-section layout; Mylae additionally keeps a bespoke illustrated treatment. A test requires every diagrammed battle to carry context, forces, and casualties, so the pages do not drift into looking half-finished next to each other. `moments` is the fallback sequence for a battle with no diagram — where a diagram exists it wins, so do not author both.

## Battle diagrams

Sixty-seven battles carry stage-by-stage tactical diagrams in `data/battleDiagrams.ts`, keyed by slug and rendered by `components/battles/BattleDiagram.tsx` — 266 stages in all. They are diagrams, not pictures: no source gives unit positions, so each stage is an interpretation carrying its own certainty label, and `caveat` records what the drawing is deliberately not claiming.

The frame is abstract — 100 x 68, x rightward, y downward — never latitude and longitude. Frontages are relative; depth means something only where a source makes a point of it, such as the Roman mass at Cannae or the pike blocks at Cynoscephalae. Every stage of every diagram is rendered into the page, so the whole battle is present without JavaScript.

### Vocabulary

Units are `infantry`, `phalanx`, `skirmishers`, `cavalry`, `elephants`, `ships`, `camp`, or `works`. The last two carry the siege diagrams: a `camp` is drawn as a rectangle with its two crossing streets, and `works` as a continuous rampart hachured on its outer face — the convention a reader already knows from a survey plan, so a line of circumvallation reads as investment rather than as a formation. Terrain adds `town` and `wall` alongside the sea, river, hill, ridge, marsh, woods, and road features.

### Labels place themselves

Hand-placing labels does not survive sixty-seven diagrams: move one unit and three captions collide. The data says *what* is labelled and `lib/diagramLabels.ts` decides *where*, trying the natural positions around each unit, area, or arrow and taking the first that clears the solid unit blocks, the drawn arrows, the stage caption, the faction key, and every label already placed. It is pure and deterministic, so the server and the client agree and the whole figure is in the HTML. An explicit `labelAt` in the data always wins, for the cases where the author knows something the solver does not.

### Adding one

Write the stages, cite sources the battle record already lists, and run `npm test`. The suite checks that units sit inside the frame and belong to known factions, that a naval battle is fought in ships and a land battle is not, that both sides are present while the fight lasts, that not every stage claims to be attested, and that a battle with a diagram also carries context, forces, and casualties.

A battle with no diagram must have an entry in `NO_DIAGRAM_REASON` explaining why, and a test asserts that every battle has exactly one of the two. The bar is deliberately narrow: an unlocated site or a nine-year siege is *not* a reason to refuse, because what the sources give in those cases is the shape of the action and a frame that says it is schematic can carry that honestly. What cannot be drawn is an action nobody described (Sulci) or a campaign of months that was never one action at all (the African expedition, the Alpine crossing).

## The connections chart

`/figures/connections` used to be fourteen names hand-placed on two rows in the data file, with a test to stop them colliding. That works until you add a fifteenth, and it could not say *when* anything happened: Sulla and Hannibal sat the same distance apart as Sulla and Pompey.

It is now computed from the dates by `lib/connectionLayout.ts`, which is pure and takes its data as arguments — the same shape as `lib/coverageCore.ts`, so the test runner can load it without resolving the `@/` alias. Time runs left to right on the atlas's own scale, each person is the span of their life with the years they campaigned picked out solid inside it, Rome is packed into lanes above the axis and every other power below it, and lanes are assigned by greedy first-fit — where "occupied" includes the name written above the bar, because Spartacus is two years long and nine characters wide.

A relation is drawn at the year it belongs to, and where that year comes from is visible in the mark:

- an authored `year` on the relation wins, for the cases where one year is the right answer — a wedding, a handover, a surrender;
- failing that, for a battlefield meeting, the **latest** battle both fought that the atlas holds. Latest, not earliest, because Caesar and Labienus share three: the first makes them commander and legate, the last makes them enemies;
- failing that, the middle of the years both were campaigning, or of the years both were alive. These are the only inferred anchors, and they draw as an **open** ring rather than a filled dot so a reader can tell.

The line across the middle separates Rome from every other power, **not** Rome from her enemies. Masinissa, Eumenes II and Eudamus of Rhodes are all below it and all three fought on Rome's side, which is also why `alliance` exists as a kind of link: filed as `service` an ally looks like a subordinate, and as `battlefield` it looks like an enemy.

Everything positional is computed on the server, so the whole graph is in the HTML and the page works without JavaScript; the client component only adds the dimming, the filters and the panel. Four tests cover it: that everyone inside the mapped period is on it and nobody outside is, that no two entries in a lane collide and nothing leaves the frame, that every line starts and ends on the two bars it joins, and that no relation is anchored to a year one of the two was not alive for.

Who is on it is decided by one rule: anyone with a battle the atlas holds. That draws the line in the right place on its own — the five emperors have no battles and drop out, so the axis is not stretched to Constantine for men it cannot show a campaign for. A death-year cutoff was the obvious alternative and it was wrong, because Antony outlived the Ides by fourteen years and fought three of the battles here.

The roster is built from the battle records rather than curated by hand: `data/battles.ts` names a commander for every side of every action, and a person belongs here when the atlas can put them somewhere. That is sixty-four figures, sixty of them on the chart, joined by eighty connections. Where the same name covers different men it is left alone — there are three Publii Decii Mus and at least three Carthaginians called Hasdrubal in these battles, and conflating them to make the graph denser would be the one thing this atlas is against.

## Adding a war or era

Timeline segments live in `data/wars.ts` as an `eras` list (wars and the interbellum periods between them). Each era sets its year span, a header label, and a `mapView` the map eases to when the timeline enters it. The overall scrubber bounds are derived from this list; if you add an era outside 509–30 BCE, also update `TIMELINE_START_YEAR`/`TIMELINE_END_YEAR` in `lib/historicalDates.ts` — a unit test asserts the two stay in sync. Tag each battle, route, and event with the matching `war` id.

## Adding a campaign route

Add a `CampaignRoute` to `data/campaigns.ts`. Route points must be chronological and use negative integers for BCE years. Add intermediate waypoints that follow plausible land corridors or sailing stages; never connect distant endpoints if that would imply an unrealistic path. Every point requires a certainty category and one or more source IDs.

Marching armies stay on land and fleets stay at sea, and a test judges this on the *drawn curve* rather than the waypoints, because a smoothed line bows off the coast even when every waypoint is ashore. A leg that really was a crossing by ship is marked `viaSea: true` and drawn as fine dots. Two consequences worth knowing before you fight the test: a short leg between two long ones overshoots badly, so give a near-identical pair of waypoints a nearby neighbour or merge them; and where the bundled coastline is coarse — the Isthmus of Corinth, the Sicilian east coast — the corridor that reads as land is narrower than the real one.

## Where the atlas stops, and why it is 30 and not 44

It used to stop at the Ides of March, on the reasoning that what follows is a different constitution. That was the wrong line, and the map showed it: the Republic does not end when Caesar is killed, because the killing settled nothing. Nobody had planned past it. Within a year the senate's own armies had made a nineteen-year-old the only man in Italy with troops; within two, three men had divided the state by law and killed Cicero for it; and the wars ran another fourteen years.

So the timeline now runs to 30 BCE — Actium, then Alexandria, then Egypt annexed. That is where there is one man, one army, and nobody left in a position to fight anybody, which is the only definition of the end of the Republic the map can actually draw.

Three things change hands on the map in those fourteen years, and none of them is the triumvirs dividing the Roman world. That was done twice on paper and is not drawable: control of Roman provinces in those years turned on which governor had changed sides that month, and shading Italy for one triumvir would claim a frontier nobody could have walked to. What is drawn is the ground that genuinely stopped being Rome's — **Sextus Pompeius' Sicily** for six years, the **Parthian occupation of Syria** in 40–39, and **Egypt** at the end.

Sextus is the single exception to the rule that the civil-war factions hold no territory, and it earns the exception by lasting. An island held by one man with a fleet for six years, used to starve Rome at will, is a frontier. Nothing else in those wars stayed still long enough to draw.

## Early Rome, and why it is graded differently

The atlas maps the Republic from **509 BCE**. The regal period before that is not mapped at all: the wars of Romulus and his successors are foundation myth, and drawing them would put the first invented thing on the map. It is covered in prose on `/methodology` instead.

For everything the Punic wars rest on there is Polybius, writing within living memory. For the early Republic there is nothing of the kind — Livy and Dionysius were writing four and five centuries later from annalistic material already shaped by families with reputations to protect. Three consequences run through the data:

- **A fifth evidence grade.** `traditional` marks a different *kind* of claim, not merely a weaker one: `speculative` says the atlas reconstructed something to make a real sequence followable, while `traditional` says this is what Rome remembered about itself. It renders with a double border rather than as a rank below `speculative`.
- **Events may span a phase.** `HistoricalEvent.toYear` lets one entry cover "the Volsci and Aequi come down off the hills, 492–483", and the year-in-focus panel prints the span. Every year stays covered and no year is padded out to fill the scrubber. `eventForYear` in `lib/historySelectors.ts` resolves a single-year entry ahead of a phase that merely contains it, so authoring a specific year *narrows* the panel rather than colliding with it.
- **Battle-level coverage is not promised before 264.** The fifth-century wars were annual raiding whose geography is unrecoverable, so the every-year-has-a-marker guarantee is scoped to 264 onwards. Before that the guarantee is per era: no era may draw nothing at all, and every year still has territory.

Hues are also reused across periods. Nine belligerents cannot share five separable colours, but the atlas only ever draws one year at a time and the powers of archaic Italy were finished before Carthage and Macedon appear — so Samnium takes Macedon's indigo and the Latin League takes Numidia's amber. `tests/territory-render.test.mjs` enforces the rule that makes this legitimate: **two factions sharing a colour must never hold territory in the same year.** Etruria and Epirus needed hues of their own, because Carthage held Africa throughout and Pyrrhus ruled Syracuse.

## Citations are checked against what survives

Every ancient source in `data/sources.ts` declares the years it actually survives
for, and a test asserts that nothing — battle, diagram, or route waypoint — is ever
cited outside them. Modern scholarship carries no range and is exempt.

This is not bookkeeping. It found sixty wrong citations on its first run:

- The Pyrrhic battles cited Livy. Livy wrote that war in books 12–14 and **those
  books are lost**; what survives is the Periochae, a paragraph per book. Heraclea,
  Asculum, Beneventum and Tarentum now cite Plutarch, Appian's Samnite fragments and
  the Periochae.
- Seven Second Punic battles cited Polybius' Book 3, which **stops at Cannae**.
  Polybius survives complete only to Book 5; after that it is fragments distributed
  by book, so Capua is Book 9, New Carthage and Baecula Book 10, the Metaurus and
  Ilipa Book 11, the Great Plains Book 14, Zama Book 15.
- The Illyrian and Cisalpine wars and Barcid Iberia cited Book 1 or Book 3 where
  the material is in Book 2.

A source may declare several ranges, because a narrative can double back: Polybius'
Book 2 is about 237–220 BCE but pauses to recount the Gallic sack of 390, and that
is why it is a legitimate citation for both. Where a text survives only in
fragments, or only complete to a certain year, the range says so — Dionysius is
complete to 443 BCE and fragments thereafter — and the battle page prints it under
the citation, so a reader can see how much weight it bears.

When adding a source, give it a real range. When a citation fails the test, the fix
is almost always to cite the book that actually preserves the event, not to widen
the range.

`/methodology` renders this as an evidence register: every ancient text in the order
of the earliest year it can speak for, what it survives for, and how much of the
atlas leans on it — plus how many battles rest on a single ancient text, which is
currently thirteen. Every figure there is counted from the citation data rather than
written out, and a test guards against anyone hardcoding them back.

## Year-by-year coverage

The atlas is read a year at a time, so the year is the unit that has to be complete. `tests/timeline-coverage.test.mjs` holds the line on that for all 480 years of 509–30 BCE:

- every year resolves to exactly one focus event (a phase entry may cover many years, and a single-year entry inside a phase wins);
- every year from 264 has something drawn — a battle marker, a campaign route, or both; before that, every era does;
- every year has territory to colour, with Rome and Carthage always present;
- the coloured zones change hands **only** in the forty-eight documented transition years, each named with the settlement, conquest or defection that caused it, and are otherwise still;
- and no settlement leaves ground blank that was coloured the year before, unless the test says in words why that ground stopped being anybody's.

The third one runs both ways: a transition that fails to happen and a zone that quietly appears in an undocumented year both fail. The table in the test is the record of when the map is supposed to move, so add to it deliberately.

The fourth exists because the third cannot see it. A settlement is authored as two edits — one zone ends, another begins — and if the second is drawn smaller than the first, the zone *set* changes exactly as documented while a band of country quietly goes uncoloured. That is how Pompey's annexation of Syria came to shrink the map, how the Emporia vanished in the year Rome annexed them, and how Aquitania stopped being Gallic when the province of Narbonensis was created next door. Ground is only allowed to go blank where a power really was left out of a settlement — Bithynia and Cappadocia after Apamea, the eastern districts handed to client kings in 129 — and those are listed by name.

Both tests watch what *changes*, and neither could see ground that had been white since the day it was drawn. Spain was the case that showed it. The atlas besieged Numantia, hunted Viriathus across Lusitania, based army after army at Tarraco and fought Afranius at Ilerda — and coloured none of it for anybody, because Roman Iberia had been authored once, in 206, as the Barcid province with the Ebro for a frontier, and left that way to 30 BCE. Forty-three campaign waypoints and five battles stood on land the map said was nobody's. So a third audit now runs against the drawn geometry rather than against the diffs: every land battle and every marching waypoint is checked against the zones of its own year, and blank ground that the atlas itself fights on has to be argued for. What is left blank on purpose is listed in `tests/territory-render.test.mjs` with the reason — Mauretania west of the Mulucha, Thrace, Germania beyond the Rhine, Campania in the Latin War — and the reason is sometimes the palette rather than the history, which the list says out loud.

The fix that came out of it also introduced a convention worth knowing about. A zone for peoples rather than a state can be drawn as an envelope over everything they might have held, because a principal always takes the overlap: the Iberians are painted across the whole peninsula and the provinces over the top of them, so what a reader sees is exactly the country no province claimed, and the map never has to invent a border between Celtiberia and Lusitania that no source records. Zones drawn that way carry a `note` saying the outline is not a claim.

### Frontiers are authored once, along the thing they are named after

A zone used to carry its own copy of every edge, at five or six points for a thousand kilometres of country. That failed twice over. The lines read as ruled — 548 stretches of straight line crossed land, 62,000 km of it, and no river or mountain range on this map is straight. And an edge two powers shared had to be authored twice, so the Ebro existed three times and the Taurus twice, each copy free to drift and each needing an overshoot hack to stop a hairline of nobody's colour opening along the seam.

So `data/territories.ts` opens with a library of features — the Pyrenees, the Ebro, the Alps, the Rhine, the Jura, the Apennine watershed, the Fossa Regia, the Saharan Atlas, the Taurus, the Euphrates, the Dinaric wall, the line of the Egyptian oases — each authored once at roughly a point every twenty to thirty kilometres, and zones are composed out of stretches of them with `stretch(FEATURE, from, to)`, which names places rather than array indices. Two powers meeting on the Ebro are drawn on the same points, so the seam cannot open; correcting a river corrects every zone that claims it. The ruled line is down from 62,000 km to 28,000, and most of what is left is Parthia against the eastern edge of the frame, which is a clip boundary rather than a frontier and is straight because the frame is.

Only edges that cross land get the detail. Fills are clipped to the coastline, so a ring's offshore stretches draw nothing and stay coarse on purpose — but they are carried round Armorica, the Gironde, the Rhône delta, Cap Bon, the Gulf of Gabès and the Gargano, because a chord across a convex coast cuts a headland off from the country behind it. `stretch()` resolves its endpoints to the nearest authored point, so adding detail to a feature never breaks a zone that was composed from it.

If you add an era outside 509–30 BCE, update `TIMELINE_START_YEAR`/`TIMELINE_END_YEAR` in `lib/historicalDates.ts` too — the bounds are literals there so the module stays free of runtime imports for the type-stripping test runner, and a test asserts the two stay in sync.

## Historical method and uncertainty

The atlas uses four visible categories:

- **Attested** — strong primary or archaeological support.
- **Probable** — a widely accepted reconstruction supported by multiple sources.
- **Disputed** — credible interpretations disagree.
- **Speculative** — a possible visualization included to make a route leg understandable.

Coordinates describe representative event areas, not exact unit positions. The interface does not invent dialogue, weather, precise formations, or undocumented daily movements. Primary narratives—especially Polybius—are separated from modern works in the source display.

## Deployment

### Public site

The atlas is published at <https://llorebaga.github.io/RomanBattlesAtlas/>. Source and published site are the same repository: `llorebaga/RomanBattlesAtlas` holds the editable source on `main`, and GitHub Pages serves the build that Actions produces from it. There is no separate source repository — the atlas was split across a private source repo and a public deployment repo until August 2026, and the two were merged into this one.

**Automated deploy.** Pushing to `main` triggers `.github/workflows/deploy-atlas.yml`, which runs the tests, builds the static export, and publishes `out/` to Pages as an artifact. Pages must be set to **GitHub Actions** as its source under Settings → Pages; the workflow's `configure-pages` step also asserts it. No repository secret is involved — the build deploys its own repository, so the built-in `GITHUB_TOKEN` suffices.

The generated site is not committed. `main` is source only, and the published files exist as a Pages artifact rather than on a branch.

`build:pages` runs `build/fix-worker-imports.mjs` after the export. The bundler content-hashes MapLibre's shared worker chunk but leaves the import inside the worker pointing at the unhashed name, which 404s; the worker then fails to start and every vector source on the map silently draws nothing. The script rewrites those specifiers and exits non-zero if any import is still unresolved, so a broken map fails the build rather than shipping.

**Manual deploy** (fallback): build with `GITHUB_PAGES=true` and `GITHUB_PAGES_REPOSITORY=RomanBattlesAtlas`, add an empty `out/.nojekyll`, then upload the generated `out` directory as the Pages artifact — or run the workflow by hand from the Actions tab, which is the same thing with fewer steps.

### Vercel

Import the GitHub repository into Vercel, accept the detected Next.js settings, and deploy. The MVP has no required secrets or proprietary map token.

### OpenAI Sites / Cloudflare

The repository includes `.openai/hosting.json` and the Vinext/Sites build configuration. Run the production build and publish the resulting validated version through Sites.

## Current limitations

- Route geometry is deliberately simplified and several legs remain provisional.
- The campaign map's basemap is deliberately apolitical: sea, land, and coastline only, drawn from bundled Natural Earth data (public domain, `data/geo/mediterranean-land.json`, regenerate with `build/make-basemap.mjs`). It carries no modern borders or place names, so every political statement on the map comes from the territory layer. Coastlines are simplified for a regional view, which is why the map caps at zoom 7.
- Battle detail pages keep a labeled modern basemap on purpose: that locator answers "where is this place today", so modern names are the point.
- Sixty-seven of the seventy-eight battles have stage-by-stage tactical diagrams; the eleven that do not carry a stated reason. Sieges and unlocated fields are drawn schematically, with the frame saying so.
- Second Punic War coordinates for the Alpine crossing, Baecula, the Great Plains, and Zama are provisional and await scholarly review.
- Monthly dating is sparse, so marker interpolation communicates campaign sequence rather than continuous measured travel.
- The campaign map needs no tile service; battle detail pages still load CARTO tiles and so require an internet connection.
- Scholarly review is still required for Sulci, Adys, Bagradas, Ecnomus, and Aegates coordinates and for fleet-strength estimates.
