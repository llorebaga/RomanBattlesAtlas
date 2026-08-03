# Roman Campaign Atlas

Roman Campaign Atlas is an evidence-led interactive historical map of Rome's wars. A single continuous timeline runs from 264 BCE onward, currently spanning the **First Punic War** (264–241), the interwar decades, and the **Second Punic War** (218–201), showing representative campaign routes, changing force positions, battles, sieges, and the uncertainty behind each reconstruction. The interactive map is the site's home page.

> Historical caution: the atlas is a research interface, not a claim to exact reconstruction. Routes and several coordinates are provisional and are explicitly classified as attested, probable, disputed, or speculative.

## Scope

- Interactive MapLibre map of the western Mediterranean as the home page (`/`, also served at `/map`)
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
- MapLibre GL JS with the public CARTO Voyager basemap (no token required)
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
app/                    Routes, layout, and global visual system
components/map/         Map, timeline, legend, and event panel
components/battles/     Battle-area map, sequence, sources
data/                   Editable wars/eras, battles, routes, events, and sources
lib/                    BCE dates, route interpolation, selectors, validation
types/                  Strict historical data contracts
tests/                  Unit and rendered-route integration tests
```

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

### Public preview

The current atlas is published at <https://llorebaga.github.io/RomanBattlesAtlas/>. The editable source remains in the private `RomanBattles` repository; the public `RomanBattlesAtlas` repository contains only the generated static website.

For a new preview, build with `GITHUB_PAGES=true` and `GITHUB_PAGES_REPOSITORY=RomanBattlesAtlas`, then publish the generated `out` directory to the deployment repository.

### Vercel

Import the GitHub repository into Vercel, accept the detected Next.js settings, and deploy. The MVP has no required secrets or proprietary map token.

### OpenAI Sites / Cloudflare

The repository includes `.openai/hosting.json` and the Vinext/Sites build configuration. Run the production build and publish the resulting validated version through Sites.

## Current limitations

- Route geometry is deliberately simplified and several legs remain provisional.
- Basemap labels and boundaries are modern; they provide geographic orientation, not an ancient political map.
- Only Mylae currently has the fully illustrated bespoke treatment; other major battles use the shared rich layout.
- Second Punic War coordinates for the Alpine crossing, Baecula, the Great Plains, and Zama are provisional and await scholarly review.
- Monthly dating is sparse, so marker interpolation communicates campaign sequence rather than continuous measured travel.
- The CARTO basemap requires an internet connection.
- Scholarly review is still required for Sulci, Adys, Bagradas, Ecnomus, and Aegates coordinates and for fleet-strength estimates.
