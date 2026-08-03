# Roman Campaign Atlas

Roman Campaign Atlas is an evidence-led interactive historical map. The first MVP follows the First Punic War from 264 to 241 BCE, showing representative campaign routes, changing force positions, battles, sieges, and the uncertainty behind each reconstruction.

> Historical caution: the atlas is a research interface, not a claim to exact reconstruction. Routes and several coordinates are provisional and are explicitly classified as attested, probable, disputed, or speculative.

## MVP scope

- Interactive MapLibre map of the western Mediterranean at `/map`
- BCE timeline with play, pause, previous/next year, and three playback speeds
- Roman and Carthaginian army and fleet routes with elapsed and future segments
- Filters, map key, year summary, accessible event list, and responsive battle panel
- Thirteen principal First Punic War event records
- Data-driven dynamic routes at `/battles/[slug]`
- A complete Battle of Mylae account at `/battles/mylae`
- Unit tests for historical dates, route interpolation, year filtering, and data validation
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
data/                   Editable battles, routes, events, and sources
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

The reusable template gives every record a concise detail page. Rich sections are currently enabled for Mylae and can be generalized as more event records are reviewed.

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
- Only Mylae currently has the full editorial treatment.
- Monthly dating is sparse, so marker interpolation communicates campaign sequence rather than continuous measured travel.
- The CARTO basemap requires an internet connection.
- Scholarly review is still required for Sulci, Adys, Bagradas, Ecnomus, and Aegates coordinates and for fleet-strength estimates.
