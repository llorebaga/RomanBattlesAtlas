# Roman Campaign Atlas

Roman Campaign Atlas is an evidence-led interactive historical map of Roman warfare. The home page presents the whole arc, from early Rome to Late Antiquity, and opens into an atlas whose continuous timeline currently covers **509–188 BCE**: the conquest of Italy (the wars with Veii and the Latins, the Gallic sack, the three Samnite wars, and Pyrrhus), then the **First Punic War**, the interwar decades, the **Second Punic War**, the **Second Macedonian War**, and the **war with Antiochus III** that carried Rome into Asia — with campaign routes, changing frontiers, battles, sieges, and the uncertainty behind each reconstruction.

> Historical caution: the atlas is a research interface, not a claim to exact reconstruction. Routes and several coordinates are provisional and are explicitly classified as attested, probable, disputed, speculative, or — for the early Republic — traditional.

## Scope

- An editorial home page at `/` that presents the whole arc of Roman warfare and offers four ways in: the atlas, a period, a campaign, or a single battle
- The interactive atlas at `/atlas` (legacy `/map` preserved), openable at any year, campaign, battle, location, or zoom through query parameters
- Supporting pages: a battle index at `/battles`, `/methodology`, and `/about`
- A single continuous BCE timeline across every era, with play, pause, previous/next year, and three playback speeds
- The map header and view follow the active era as you scrub; the theatre re-centres between wars
- Roman and Carthaginian army and fleet routes with elapsed and future segments — including Hannibal's march over the Alps and Scipio's campaigns in Iberia and Africa
- Filters, map key, year summary, accessible event list, and responsive battle panel
- A focus event covering every one of the 322 years, and a battle or campaign drawn on the map in every year from 264 — the interbellum decades and the Sicilian and Greek theatres included, not just the famous marches
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

Thirty-three battles carry stage-by-stage tactical diagrams in `data/battleDiagrams.ts`, keyed by slug and rendered by `components/battles/BattleDiagram.tsx` — 132 stages in all. They are diagrams, not pictures: no source gives unit positions, so each stage is an interpretation carrying its own certainty label, and `caveat` records what the drawing is deliberately not claiming.

The frame is abstract — 100 x 68, x rightward, y downward — never latitude and longitude. Frontages are relative; depth means something only where a source makes a point of it, such as the Roman mass at Cannae or the pike blocks at Cynoscephalae. Every stage of every diagram is rendered into the page, so the whole battle is present without JavaScript.

### Vocabulary

Units are `infantry`, `phalanx`, `skirmishers`, `cavalry`, `elephants`, `ships`, `camp`, or `works`. The last two carry the siege diagrams: a `camp` is drawn as a rectangle with its two crossing streets, and `works` as a continuous rampart hachured on its outer face — the convention a reader already knows from a survey plan, so a line of circumvallation reads as investment rather than as a formation. Terrain adds `town` and `wall` alongside the sea, river, hill, ridge, marsh, woods, and road features.

### Labels place themselves

Hand-placing labels does not survive thirty-three diagrams: move one unit and three captions collide. The data says *what* is labelled and `lib/diagramLabels.ts` decides *where*, trying the natural positions around each unit, area, or arrow and taking the first that clears the solid unit blocks, the drawn arrows, the stage caption, the faction key, and every label already placed. It is pure and deterministic, so the server and the client agree and the whole figure is in the HTML. An explicit `labelAt` in the data always wins, for the cases where the author knows something the solver does not.

### Adding one

Write the stages, cite sources the battle record already lists, and run `npm test`. The suite checks that units sit inside the frame and belong to known factions, that a naval battle is fought in ships and a land battle is not, that both sides are present while the fight lasts, that not every stage claims to be attested, and that a battle with a diagram also carries context, forces, and casualties.

A battle with no diagram must have an entry in `NO_DIAGRAM_REASON` explaining why, and a test asserts that every battle has exactly one of the two. The bar is deliberately narrow: an unlocated site or a nine-year siege is *not* a reason to refuse, because what the sources give in those cases is the shape of the action and a frame that says it is schematic can carry that honestly. What cannot be drawn is an action nobody described (Sulci) or a campaign of months that was never one action at all (the African expedition, the Alpine crossing).

## Adding a war or era

Timeline segments live in `data/wars.ts` as an `eras` list (wars and the interbellum periods between them). Each era sets its year span, a header label, and a `mapView` the map eases to when the timeline enters it. The overall scrubber bounds are derived from this list; if you add an era outside 264–201 BCE, also update `TIMELINE_START_YEAR`/`TIMELINE_END_YEAR` in `lib/historicalDates.ts` — a unit test asserts the two stay in sync. Tag each battle, route, and event with the matching `war` id.

## Adding a campaign route

Add a `CampaignRoute` to `data/campaigns.ts`. Route points must be chronological and use negative integers for BCE years. Add intermediate waypoints that follow plausible land corridors or sailing stages; never connect distant endpoints if that would imply an unrealistic path. Every point requires a certainty category and one or more source IDs.

Marching armies stay on land and fleets stay at sea, and a test judges this on the *drawn curve* rather than the waypoints, because a smoothed line bows off the coast even when every waypoint is ashore. A leg that really was a crossing by ship is marked `viaSea: true` and drawn as fine dots. Two consequences worth knowing before you fight the test: a short leg between two long ones overshoots badly, so give a near-identical pair of waypoints a nearby neighbour or merge them; and where the bundled coastline is coarse — the Isthmus of Corinth, the Sicilian east coast — the corridor that reads as land is narrower than the real one.

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
currently eleven. Every figure there is counted from the citation data rather than
written out, and a test guards against anyone hardcoding them back.

## Year-by-year coverage

The atlas is read a year at a time, so the year is the unit that has to be complete. `tests/timeline-coverage.test.mjs` holds the line on that for all 322 years of 509–188 BCE:

- every year resolves to exactly one focus event (a phase entry may cover many years, and a single-year entry inside a phase wins);
- every year from 264 has something drawn — a battle marker, a campaign route, or both; before that, every era does;
- every year has territory to colour, with Rome and Carthage always present;
- the coloured zones change hands **only** in the nineteen documented transition years, each named with the settlement, conquest or defection that caused it, and are otherwise still.

That last one runs both ways: a transition that fails to happen and a zone that quietly appears in an undocumented year both fail. The table in the test is the record of when the map is supposed to move, so add to it deliberately.

If you add an era outside 509–188 BCE, update `TIMELINE_START_YEAR`/`TIMELINE_END_YEAR` in `lib/historicalDates.ts` too — the bounds are literals there so the module stays free of runtime imports for the type-stripping test runner, and a test asserts the two stay in sync.

## Historical method and uncertainty

The atlas uses four visible categories:

- **Attested** — strong primary or archaeological support.
- **Probable** — a widely accepted reconstruction supported by multiple sources.
- **Disputed** — credible interpretations disagree.
- **Speculative** — a possible visualization included to make a route leg understandable.

Coordinates describe representative event areas, not exact unit positions. The interface does not invent dialogue, weather, precise formations, or undocumented daily movements. Primary narratives—especially Polybius—are separated from modern works in the source display.

## Deployment

### Public site

The atlas is published at <https://llorebaga.github.io/RomanBattlesAtlas/>. This private `RomanBattles` repository holds the editable source; the public `RomanBattlesAtlas` repository holds only the generated static website that GitHub Pages serves.

**Automated deploy.** Pushing to `main` triggers `.github/workflows/deploy-atlas.yml`, which runs the tests, builds the static export, and pushes `out/` to the public Atlas repository. This requires one repository secret in this repo (Settings → Secrets and variables → Actions):

- `ATLAS_DEPLOY_TOKEN` — a GitHub token (classic with `repo` scope, or a fine-grained token with contents read/write on `llorebaga/RomanBattlesAtlas`).

`build:pages` runs `build/fix-worker-imports.mjs` after the export. The bundler content-hashes MapLibre's shared worker chunk but leaves the import inside the worker pointing at the unhashed name, which 404s; the worker then fails to start and every vector source on the map silently draws nothing. The script rewrites those specifiers and exits non-zero if any import is still unresolved, so a broken map fails the build rather than shipping.

**Manual deploy** (fallback): build with `GITHUB_PAGES=true` and `GITHUB_PAGES_REPOSITORY=RomanBattlesAtlas`, add an empty `out/.nojekyll`, then publish the generated `out` directory to the deployment repository.

### Vercel

Import the GitHub repository into Vercel, accept the detected Next.js settings, and deploy. The MVP has no required secrets or proprietary map token.

### OpenAI Sites / Cloudflare

The repository includes `.openai/hosting.json` and the Vinext/Sites build configuration. Run the production build and publish the resulting validated version through Sites.

## Current limitations

- Route geometry is deliberately simplified and several legs remain provisional.
- The campaign map's basemap is deliberately apolitical: sea, land, and coastline only, drawn from bundled Natural Earth data (public domain, `data/geo/mediterranean-land.json`, regenerate with `build/make-basemap.mjs`). It carries no modern borders or place names, so every political statement on the map comes from the territory layer. Coastlines are simplified for a regional view, which is why the map caps at zoom 7.
- Battle detail pages keep a labeled modern basemap on purpose: that locator answers "where is this place today", so modern names are the point.
- Thirty-three of the forty-one battles have stage-by-stage tactical diagrams; the eight that do not carry a stated reason. Sieges and unlocated fields are drawn schematically, with the frame saying so.
- Second Punic War coordinates for the Alpine crossing, Baecula, the Great Plains, and Zama are provisional and await scholarly review.
- Monthly dating is sparse, so marker interpolation communicates campaign sequence rather than continuous measured travel.
- The campaign map needs no tile service; battle detail pages still load CARTO tiles and so require an internet connection.
- Scholarly review is still required for Sulci, Adys, Bagradas, Ecnomus, and Aegates coordinates and for fleet-strength estimates.
