# Roman Campaign Atlas

Roman Campaign Atlas is an evidence-led interactive historical map of Roman warfare. The home page presents the whole arc, from early Rome to Late Antiquity, and opens into an atlas whose continuous timeline currently covers 264–196 BCE in detail: the **First Punic War**, the interwar decades, the **Second Punic War**, and the **Second Macedonian War**, with campaign routes, changing frontiers, battles, sieges, and the uncertainty behind each reconstruction.

> Historical caution: the atlas is a research interface, not a claim to exact reconstruction. Routes and several coordinates are provisional and are explicitly classified as attested, probable, disputed, or speculative.

## Scope

- An editorial home page at `/` that presents the whole arc of Roman warfare and offers four ways in: the atlas, a period, a campaign, or a single battle
- The interactive atlas at `/atlas` (legacy `/map` preserved), openable at any year, campaign, battle, location, or zoom through query parameters
- Supporting pages: a battle index at `/battles`, `/methodology`, and `/about`
- A single continuous BCE timeline across every era, with play, pause, previous/next year, and three playback speeds
- The map header and view follow the active era as you scrub; the theatre re-centres between wars
- Roman and Carthaginian army and fleet routes with elapsed and future segments — including Hannibal's march over the Alps and Scipio's campaigns in Iberia and Africa
- Filters, map key, year summary, accessible event list, and responsive battle panel
- Principal event records for both Punic Wars, plus interwar context events
- Data-driven dynamic detail pages at `/battles/[slug]`, with a richer layout for events that carry force, sequence, and casualty data (e.g. Mylae, Cannae, Zama)
- Unit tests for historical dates, era assignment, route interpolation, year filtering, and data validation
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
data/                   Editable wars/eras, battles, routes, events, and sources
lib/                    BCE dates, route interpolation, selectors, validation
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

The reusable template gives every record a concise detail page. Any battle that carries `context`, `forces`, `moments`, or `casualties` automatically renders the richer multi-section layout (Mylae, Cannae, and Zama already do); Mylae additionally keeps a bespoke illustrated treatment.

## Adding a war or era

Timeline segments live in `data/wars.ts` as an `eras` list (wars and the interbellum periods between them). Each era sets its year span, a header label, and a `mapView` the map eases to when the timeline enters it. The overall scrubber bounds are derived from this list; if you add an era outside 264–201 BCE, also update `TIMELINE_START_YEAR`/`TIMELINE_END_YEAR` in `lib/historicalDates.ts` — a unit test asserts the two stay in sync. Tag each battle, route, and event with the matching `war` id.

## Adding a campaign route

Add a `CampaignRoute` to `data/campaigns.ts`. Route points must be chronological and use negative integers for BCE years. Add intermediate waypoints that follow plausible land corridors or sailing stages; never connect distant endpoints if that would imply an unrealistic path. Every point requires a certainty category and one or more source IDs.

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
- Only Mylae currently has the fully illustrated bespoke treatment; other major battles use the shared rich layout.
- Second Punic War coordinates for the Alpine crossing, Baecula, the Great Plains, and Zama are provisional and await scholarly review.
- Monthly dating is sparse, so marker interpolation communicates campaign sequence rather than continuous measured travel.
- The campaign map needs no tile service; battle detail pages still load CARTO tiles and so require an internet connection.
- Scholarly review is still required for Sulci, Adys, Bagradas, Ecnomus, and Aegates coordinates and for fleet-strength estimates.
