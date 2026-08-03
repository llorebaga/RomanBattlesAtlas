import type { Faction } from "@/types/history";

export interface FactionInfo {
  id: Faction;
  name: string;
  adjective: string;
  color: string;
}

// Central registry for faction display and color. Map layers, markers, sidebar
// swatches, and the legend all read colors from here, so adding a power only
// needs an entry here plus the id in the Faction union.
export const factionList: FactionInfo[] = [
  { id: "rome", name: "Rome", adjective: "Roman", color: "#a94d3e" },
  { id: "carthage", name: "Carthage", adjective: "Carthaginian", color: "#2d7480" },
  { id: "macedon", name: "Macedon", adjective: "Macedonian", color: "#6b5ca5" },
  { id: "seleucid", name: "Seleucid Empire", adjective: "Seleucid", color: "#c0872e" },
  { id: "ptolemaic", name: "Ptolemaic Egypt", adjective: "Ptolemaic", color: "#3f8f6b" },
  { id: "numidia", name: "Numidia", adjective: "Numidian", color: "#b0703a" },
  { id: "gaul", name: "Gallic peoples", adjective: "Gallic", color: "#7f8a4a" },
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

// Flattened [value, color, value, color, …] pairs for a MapLibre "match"
// expression, e.g. ["match", ["get","faction"], ...factionColorMatch, fallback].
export const factionColorMatch: string[] = factionList.flatMap((info) => [info.id, info.color]);
