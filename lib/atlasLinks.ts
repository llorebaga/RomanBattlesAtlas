// Deep links into the atlas.
//
// The homepage, period cards, campaign cards, battle cards, and timeline all
// enter the map through one vocabulary, so there is a single place to change how
// the atlas is addressed. Kept free of runtime "@/" imports (type-only is fine)
// so the type-stripping test runner can load it directly.
import type { Coordinates } from "@/types/history";

export const ATLAS_PATH = "/atlas";

export interface AtlasDeepLink {
  /** Campaign year, negative for BCE. Clamped to the timeline by the atlas. */
  year?: number;
  /** Era/campaign id, e.g. "first-punic". */
  campaign?: string;
  /** Battle slug; the atlas selects it and opens its panel. */
  battle?: string;
  /** Map centre, [longitude, latitude]. */
  location?: Coordinates;
  /** Larger is closer. Matches the atlas's own zoom scale. */
  zoom?: number;
  /** Layer keys to enable; anything omitted is switched off. */
  layers?: string[];
}

// Written in a fixed order so links are stable and diffable.
const ORDER: (keyof AtlasDeepLink)[] = ["year", "campaign", "battle", "location", "zoom", "layers"];

export function atlasSearchParams(link: AtlasDeepLink): URLSearchParams {
  const params = new URLSearchParams();
  for (const key of ORDER) {
    const value = link[key];
    if (value === undefined || value === null) continue;
    if (key === "location") {
      const [lng, lat] = value as Coordinates;
      if (Number.isFinite(lng) && Number.isFinite(lat)) params.set("location", `${lng},${lat}`);
    } else if (key === "layers") {
      const layers = (value as string[]).filter(Boolean);
      if (layers.length) params.set("layers", layers.join(","));
    } else {
      params.set(key, String(value));
    }
  }
  return params;
}

export function atlasHref(link: AtlasDeepLink = {}): string {
  const query = atlasSearchParams(link).toString();
  return query ? `${ATLAS_PATH}?${query}` : ATLAS_PATH;
}

export function parseAtlasSearch(search: string | URLSearchParams): AtlasDeepLink {
  const params = typeof search === "string" ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search) : search;
  const link: AtlasDeepLink = {};

  const year = Number(params.get("year"));
  if (params.has("year") && Number.isFinite(year)) link.year = Math.round(year);

  const campaign = params.get("campaign");
  if (campaign) link.campaign = campaign;

  const battle = params.get("battle");
  if (battle) link.battle = battle;

  const location = params.get("location");
  if (location) {
    const [lng, lat] = location.split(",").map(Number);
    if (Number.isFinite(lng) && Number.isFinite(lat)) link.location = [lng, lat];
  }

  const zoom = Number(params.get("zoom"));
  if (params.has("zoom") && Number.isFinite(zoom) && zoom > 0) link.zoom = zoom;

  const layers = params.get("layers");
  if (layers) {
    const list = layers.split(",").map((entry) => entry.trim()).filter(Boolean);
    if (list.length) link.layers = list;
  }

  return link;
}

/** A battle's canonical detail page. Unchanged from the original scheme. */
export function battleHref(slug: string): string {
  return `/battles/${slug}`;
}

/** "View on map": the battle, in its own year, with its campaign in context. */
export function battleOnMapHref(battle: { slug: string; startYear: number; coordinates?: Coordinates; war?: string }): string {
  return atlasHref({ year: battle.startYear, campaign: battle.war, battle: battle.slug });
}
