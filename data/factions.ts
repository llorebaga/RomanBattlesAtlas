import type { Faction } from "@/types/history";

export interface FactionInfo {
  id: Faction;
  name: string;
  adjective: string;
  color: string;
  /** Belligerents get a validated categorical hue; context powers recede. */
  role: "belligerent" | "context";
}

// Central registry for faction display and color. Map layers, markers, sidebar
// swatches, and the legend all read colors from here, so adding a power only
// needs an entry here plus the id in the Faction union.
//
// The five belligerent hues are a validated categorical set: every pair clears
// the lightness, chroma, and normal-vision separation gates with all pairs in
// play (worst normal-vision ΔE 16.3). Two pairs land in the 6–8 CVD band, which
// is why territory zones also carry direct name labels on the map — color is
// never the only cue. Do not re-tint these individually; re-validate the set.
//
// The Seleucids and Ptolemies never take the field in 264–196 BCE, so they are
// drawn as muted context tints rather than competing for a categorical hue.
export const factionList: FactionInfo[] = [
  { id: "rome", name: "Rome", adjective: "Roman", color: "#e34948", role: "belligerent" },
  { id: "carthage", name: "Carthage", adjective: "Carthaginian", color: "#2a78d6", role: "belligerent" },
  { id: "macedon", name: "Macedon", adjective: "Macedonian", color: "#4a3aa7", role: "belligerent" },
  { id: "numidia", name: "Numidia", adjective: "Numidian", color: "#eda100", role: "belligerent" },
  { id: "gaul", name: "Gallic peoples", adjective: "Gallic", color: "#008300", role: "belligerent" },
  { id: "seleucid", name: "Seleucid Empire", adjective: "Seleucid", color: "#8c8577", role: "context" },
  { id: "ptolemaic", name: "Ptolemaic Egypt", adjective: "Ptolemaic", color: "#6f7d86", role: "context" },
];

const byId = new Map<Faction, FactionInfo>(factionList.map((info) => [info.id, info]));

export function getFactionInfo(id: Faction): FactionInfo | undefined {
  return byId.get(id);
}

export function factionColor(id: Faction): string {
  return byId.get(id)?.color ?? "#6c6b61";
}

export function factionAdjective(id: Faction): string {
  return byId.get(id)?.adjective ?? id;
}

export function isContextPower(id: Faction): boolean {
  return byId.get(id)?.role === "context";
}

// Flattened [value, color, value, color, …] pairs for a MapLibre "match"
// expression, e.g. ["match", ["get","faction"], ...factionColorMatch, fallback].
export const factionColorMatch: string[] = factionList.flatMap((info) => [info.id, info.color]);
