// Renders the territory layer to a standalone SVG so the zones can be reviewed
// without a browser: same data and palette the map uses, plain equirectangular
// projection. Run: node --experimental-strip-types build/preview-territories.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { territoriesForYear } from "../data/territories.ts";
import { factionColor, isContextPower } from "../data/factions.ts";
import { eraForYear } from "../data/wars.ts";

const land = JSON.parse(readFileSync(new URL("../data/geo/mediterranean-land.json", import.meta.url), "utf8"));

const YEARS = [-264, -241, -218, -201, -197];
const BOUNDS = { west: -10, east: 30, south: 29, north: 47 };
const W = 720;
const H = Math.round((W * (BOUNDS.north - BOUNDS.south)) / (BOUNDS.east - BOUNDS.west));
const x = (lng) => ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * W;
const y = (lat) => ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * H;

// The same bundled land the map draws, as SVG paths (sea is the backdrop).
const landPaths = land.features[0].geometry.coordinates.map((rings) => {
  const d = rings.map((ring) => `M${ring.map((p) => `${x(p[0]).toFixed(1)} ${y(p[1]).toFixed(1)}`).join("L")}Z`).join("");
  return `<path d="${d}" fill="#f3eee1" stroke="#b9ae96" stroke-width="0.9" fill-rule="evenodd" />`;
}).join("");

const panels = YEARS.map((year) => {
  const era = eraForYear(year);
  const zones = territoriesForYear(year)
    .slice()
    .sort((a, b) => Number(isContextPower(b.polity)) - Number(isContextPower(a.polity)));
  const shapes = zones.map((zone) => {
    const context = isContextPower(zone.polity);
    const color = factionColor(zone.polity);
    const points = zone.ring.map((p) => `${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join(" ");
    return `    <polygon points="${points}" fill="${color}" fill-opacity="${context ? 0.16 : 0.42}" stroke="${color}" stroke-opacity="${context ? 0.45 : 0.95}" stroke-width="${context ? 1 : 2}" stroke-linejoin="round" />`;
  }).join("\n");
  const labels = zones.filter((zone) => zone.labelAt).map((zone) => {
    const color = factionColor(zone.polity);
    const context = isContextPower(zone.polity);
    return `    <text x="${x(zone.labelAt[0]).toFixed(1)}" y="${y(zone.labelAt[1]).toFixed(1)}" fill="${color}" fill-opacity="${context ? 0.72 : 1}" font-family="system-ui,sans-serif" font-size="9" font-weight="700" letter-spacing="1.2" text-anchor="middle" paint-order="stroke" stroke="#f8f5ed" stroke-width="3">${zone.name.toUpperCase()}</text>`;
  }).join("\n");
  return `<section>
  <h2>${Math.abs(year)} BCE — ${era ? era.name : "—"}</h2>
  <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Territory zones in ${Math.abs(year)} BCE">
    <rect width="${W}" height="${H}" fill="#d7e5e9" />
    <g>${landPaths}</g>
${shapes}
${labels}
  </svg>
</section>`;
}).join("\n");

writeFileSync(new URL("../territory-preview.html", import.meta.url), `<!doctype html>
<meta charset="utf-8"><title>Territory layer preview</title>
<style>
  body { margin: 0; padding: 28px; background: #f4f0e6; font-family: system-ui, sans-serif; color: #20231f; }
  h1 { font-size: 1.2rem; letter-spacing: .04em; }
  p.note { max-width: 720px; font-size: .82rem; color: #6c6b61; line-height: 1.5; }
  section { margin: 26px 0; }
  h2 { font-size: .78rem; letter-spacing: .12em; text-transform: uppercase; color: #704923; margin-bottom: 8px; }
  svg { border: 1px solid #cfc6b4; background: #eef2f3; display: block; }
</style>
<h1>Territory layer — shape &amp; color preview</h1>
<p class="note">A faithful preview of the map: the bundled apolitical basemap (sea, land, coastline only &mdash; no modern borders or names) with the same territory polygons, palette, and opacities the live map draws. Shapes are deliberately schematic zones of control, not surveyed borders. Faded zones are non-belligerent context powers.</p>
${panels}
`, "utf8");
console.log("wrote territory-preview.html");
