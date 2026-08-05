import type { Faction } from "@/types/history";

export interface FactionInfo {
  id: Faction;
  name: string;
  adjective: string;
  color: string;
  /**
   * belligerent — a principal of these wars, full categorical hue.
   * minor — held ground in the theatre without being a principal (Syracuse, the
   *   freed Greek states). Coloured, but a step back so it cannot be mistaken
   *   for a main combatant, and overridden where a principal claims the ground.
   * context — never took the field here; a muted tint for orientation only.
   */
  role: "belligerent" | "minor" | "context";
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
  // Third parties in the theatre rather than principals: Hiero's Syracuse held
  // south-eastern Sicily as an independent ally until 212, and the Greek states
  // were declared free in 196. They explain ground that would otherwise read as
  // an unclaimed hole, so they carry real colour — teal and olive-gold, both far
  // from the five principal hues — at a lower strength.
  { id: "syracuse", name: "Syracuse", adjective: "Syracusan", color: "#0f7d86", role: "minor" },
  { id: "greek", name: "Greek states", adjective: "Greek", color: "#9a8f4a", role: "minor" },
  // Saguntum fought Hannibal on its own account, with Rome an ally that never
  // arrived. Colouring its defenders Roman would claim a Roman garrison that was
  // not there, and calling them Greek would take Livy's foundation legend for
  // fact. Iberian peoples who fought as somebody's mercenaries or allies keep
  // their employer's colour and are named in the label; this hue is for the
  // occasions when they were a belligerent in their own right.
  { id: "iberian", name: "Iberian peoples", adjective: "Iberian", color: "#a05a3c", role: "minor" },
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

export function isMinorPower(id: Faction): boolean {
  return byId.get(id)?.role === "minor";
}

// Painting order and strength. Opacity applies once per layer, so zones within a
// layer may overlap freely — the later one simply wins. Minor powers therefore
// share the principals' layer: put them in a layer of their own and the seam
// where, say, Syracuse meets Carthage blends into a darker stripe belonging to
// neither. Within the layer minors are drawn first, so a principal takes any
// contested ground.
export const TERRITORY_LAYERS: { roles: FactionInfo["role"][]; opacity: number }[] = [
  { roles: ["context"], opacity: 0.22 },
  { roles: ["minor", "belligerent"], opacity: 0.52 },
];
const ROLE_ORDER: FactionInfo["role"][] = ["context", "minor", "belligerent"];
export const roleRank = (id: Faction) => ROLE_ORDER.indexOf(byId.get(id)?.role ?? "context");

export function factionRole(id: Faction): FactionInfo["role"] {
  return byId.get(id)?.role ?? "context";
}

// Flattened [value, color, value, color, …] pairs for a MapLibre "match"
// expression, e.g. ["match", ["get","faction"], ...factionColorMatch, fallback].
export const factionColorMatch: string[] = factionList.flatMap((info) => [info.id, info.color]);
