// Renders the map's layers to standalone SVG so the atlas can be reviewed
// without a browser — the same projection, geometry, palette, and opacities the
// live map uses, so what this shows is what ships. Rasterise the output to look
// at it. Run: node --experimental-strip-types build/preview-territories.mjs
import { writeFileSync } from "node:fs";
import { territoriesForYear } from "../data/territories.ts";
import { factionColor, factionRole, roleRank, TERRITORY_LAYERS } from "../data/factions.ts";
import { eraForYear } from "../data/wars.ts";
import { landPolygons } from "../data/geo/mediterranean-land.ts";
import { campaignRoutes } from "../data/campaigns.ts";
import { isRouteActive } from "../lib/routeInterpolation.ts";
import { MAP_SCALE, projectPoint, smoothClosedPath, sampleOpenCurve } from "../lib/mapGeometry.ts";

// The default set spans the three wars. Pass years as arguments (positive or
// negative, BCE either way) to review a particular transition — the years a zone
// changes hands are the ones worth looking at.
const DEFAULT_YEARS = [-264, -241, -218, -201, -197];
const requested = process.argv.slice(2).map(Number).filter(Number.isFinite);
const YEARS = requested.length ? requested.map((year) => -Math.abs(year)) : DEFAULT_YEARS;
// Window in degrees, converted to the map's projected units.
const BOUNDS = { west: -11, east: 31, south: 28, north: 48 };
const VIEW = {
  x: BOUNDS.west * MAP_SCALE,
  y: -BOUNDS.north * MAP_SCALE,
  width: (BOUNDS.east - BOUNDS.west) * MAP_SCALE,
  height: (BOUNDS.north - BOUNDS.south) * MAP_SCALE,
};
const W = 1100;
const H = Math.round((W * VIEW.height) / VIEW.width);
// Line weights in the live map scale with the visible width; mirror that here.
const strokeScale = VIEW.width / 1000;
const xmlText = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const straightPath = (rings) => rings.map((ring) => `M${ring.map((p) => { const [x, y] = projectPoint(p); return `${x.toFixed(1)} ${y.toFixed(1)}`; }).join("L")}Z`).join("");

const landPathData = landPolygons.map((rings) => straightPath(rings));
const landPaths = landPathData.map((d) => `<path d="${d}" fill="#f3eee1" stroke="#b9ae96" stroke-width="${(0.9 * strokeScale).toFixed(2)}" fill-rule="evenodd" />`).join("");
const landClip = landPathData.map((d) => `<path d="${d}" clip-rule="evenodd" />`).join("");

const panels = YEARS.map((year) => {
  const era = eraForYear(year);
  const zones = territoriesForYear(year);
  // Opacity per layer, exactly as the map does it, so overlaps do not darken.
  const shapes = TERRITORY_LAYERS.map(({ roles, opacity }) => {
    const paths = zones.filter((zone) => roles.includes(factionRole(zone.polity)))
      .slice().sort((a, b) => roleRank(a.polity) - roleRank(b.polity))
      .map((zone) => `      <path d="${smoothClosedPath(zone.ring)}" fill="${factionColor(zone.polity)}" />`).join("\n");
    return paths ? `    <g opacity="${opacity}">\n${paths}\n    </g>` : "";
  }).filter(Boolean).join("\n");
  // Same per-leg styling the map uses: marched vs shipped, elapsed vs ahead.
  const legTime = (p) => p.year + ((p.month ?? 1) - 1) / 12;
  const routes = campaignRoutes.filter((route) => isRouteActive(route, year)).map((route) => {
    const color = factionColor(route.faction);
    const ordered = [...route.points].sort((a, b) => legTime(a) - legTime(b));
    const samples = sampleOpenCurve(ordered.map((p) => p.coordinates));
    const runs = [];
    for (const { point, leg, t } of samples) {
      const sea = Boolean(ordered[leg + 1]?.viaSea);
      const start = legTime(ordered[leg]);
      const end = legTime(ordered[leg + 1] ?? ordered[leg]);
      const elapsed = start + (end - start) * t <= year;
      const last = runs[runs.length - 1];
      if (last && last.sea === sea && last.elapsed === elapsed) last.points.push(point);
      else runs.push({ points: last ? [last.points[last.points.length - 1], point] : [point], sea, elapsed });
    }
    return runs.filter((run) => run.points.length >= 2).map((run) => {
      const d = `M${run.points.map((p) => { const [x, y] = projectPoint(p); return `${x.toFixed(1)} ${y.toFixed(1)}`; }).join("L")}`;
      const dash = run.sea
        ? ` stroke-dasharray="${(0.9 * strokeScale).toFixed(2)} ${(2.4 * strokeScale).toFixed(2)}"`
        : run.elapsed ? "" : ` stroke-dasharray="${(3.4 * strokeScale).toFixed(2)} ${(4.8 * strokeScale).toFixed(2)}"`;
      const opacity = run.elapsed ? (run.sea ? 0.75 : 0.9) : 0.3;
      return `    <path d="${d}" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${((run.sea ? 1.9 : 3.2) * strokeScale).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round"${dash} />`;
    }).join("\n");
  }).join("\n");
  const labels = zones.filter((zone) => zone.labelAt).map((zone) => {
    const color = factionColor(zone.polity);
    const context = factionRole(zone.polity) === "context";
    const [x, y] = projectPoint(zone.labelAt);
    return `    <text x="${x.toFixed(1)}" y="${y.toFixed(1)}" fill="${color}" fill-opacity="${context ? 0.75 : 1}" font-family="system-ui,sans-serif" font-size="${(7.4 * strokeScale).toFixed(2)}" font-weight="700" letter-spacing="${(0.9 * strokeScale).toFixed(2)}" text-anchor="middle" paint-order="stroke" stroke="#f8f5ed" stroke-width="${(2.6 * strokeScale).toFixed(2)}">${xmlText((zone.mapLabel ?? zone.name).toUpperCase())}</text>`;
  }).join("\n");
  return `<section>
  <h2>${Math.abs(year)} BCE — ${era ? era.name : "—"}</h2>
  <svg viewBox="${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}" width="${W}" height="${H}" role="img" aria-label="The Mediterranean in ${Math.abs(year)} BCE">
    <defs><clipPath id="land-clip-${Math.abs(year)}">${landClip}</clipPath></defs>
    <rect x="${VIEW.x}" y="${VIEW.y}" width="${VIEW.width}" height="${VIEW.height}" fill="#d7e5e9" />
    <g>${landPaths}</g>
    <g clip-path="url(#land-clip-${Math.abs(year)})">
${shapes}
    </g>
${routes}
${labels}
  </svg>
</section>`;
}).join("\n");

writeFileSync(new URL("../territory-preview.html", import.meta.url), `<!doctype html>
<meta charset="utf-8"><title>Atlas map preview</title>
<style>
  body { margin: 0; padding: 28px; background: #f4f0e6; font-family: system-ui, sans-serif; color: #20231f; }
  h1 { font-size: 1.2rem; letter-spacing: .04em; }
  p.note { max-width: 860px; font-size: .82rem; color: #6c6b61; line-height: 1.5; }
  section { margin: 26px 0; }
  h2 { font-size: .78rem; letter-spacing: .12em; text-transform: uppercase; color: #704923; margin-bottom: 8px; }
  svg { border: 1px solid #cfc6b4; display: block; max-width: 100%; height: auto; }
</style>
<h1>Atlas map — preview</h1>
<p class="note">The same projection, geometry, palette, and opacities the live map draws: an apolitical basemap (sea, land, coastline only &mdash; no modern borders or names), territory colour clipped to the coastline, and campaign routes. Territory boundaries are smoothed curves through hand-authored points; they are schematic zones of control, not surveyed borders. Faded zones are powers that took no part in these wars.</p>
${panels}
`, "utf8");
console.log("wrote territory-preview.html");
