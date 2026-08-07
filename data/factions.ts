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
// The five hues of the Punic and Macedonian wars are a validated categorical set:
// every pair clears the lightness, chroma, and normal-vision separation gates with
// all pairs in play (worst normal-vision ΔE 16.3). Two pairs land in the 6–8 CVD
// band, which is why territory zones also carry direct name labels on the map —
// color is never the only cue. Do not re-tint these individually; re-validate the set.
//
// From 192 a sixth can appear beside them, because the Seleucids become a
// belligerent while Rome, Carthage, Macedon, Numidia and the Gauls are all still on
// the map. That costs nothing: the magenta they take was sited for Etruria against
// exactly these five, in the widest gap the set leaves. Adding a genuinely new hue
// to a year that already draws six would not be so cheap — check the co-occurring
// set before trying.
//
// Ptolemaic Egypt never takes the field anywhere in the mapped period, so it is
// drawn as a muted context tint rather than competing for a categorical hue. The
// Seleucids were in that class until the atlas reached 192: from Thermopylae to
// Magnesia they are a principal, and `context` means "never fought here".
//
// ── Hues are reused across periods that never meet ────────────────────────────
// Extending the atlas back to 509 BCE brought in four more belligerents, and ten
// categorical hues cannot stay separable — least of all under colour-vision
// deficiency. But the atlas only ever draws one year at a time, and the powers of
// archaic Italy were finished long before Carthage and Macedon appear: the
// Etruscan league is gone by 264, and Rome met Pyrrhus and Hannibal a lifetime
// apart. So a hue is scoped to the period that uses it. The rule this rests on is
// enforced by a test: two factions sharing a colour must never hold territory in
// the same year. Before reusing a hue, check that.
export const factionList: FactionInfo[] = [
  { id: "rome", name: "Rome", adjective: "Roman", color: "#e34948", role: "belligerent" },
  { id: "carthage", name: "Carthage", adjective: "Carthaginian", color: "#2a78d6", role: "belligerent" },
  { id: "macedon", name: "Macedon", adjective: "Macedonian", color: "#4a3aa7", role: "belligerent" },
  { id: "numidia", name: "Numidia", adjective: "Numidian", color: "#eda100", role: "belligerent" },
  { id: "gaul", name: "Gallic peoples", adjective: "Gallic", color: "#008300", role: "belligerent" },
  // Antiochus III takes Etruria's magenta. The last Etruscan zone ends in 291 and
  // the Seleucids do not appear on the map until 264, so the two never share a
  // year. The pair this hue was chosen against is Macedon's indigo, which is
  // exactly the neighbour it has here — magenta is the lighter of the two, and the
  // Aegean separates them.
  //
  // Promoting the Seleucids repaints them for 264–193 as well, when they were
  // scenery. That is the honest direction: the role describes the faction across
  // the whole atlas, and an empire Rome fought at Magnesia was never really
  // background — it was a power the map had not yet reached.
  { id: "seleucid", name: "Seleucid Empire", adjective: "Seleucid", color: "#a9538c", role: "belligerent" },
  { id: "ptolemaic", name: "Ptolemaic Egypt", adjective: "Ptolemaic", color: "#6f7d86", role: "context" },
  // Third parties in the theatre rather than principals: Hiero's Syracuse held
  // south-eastern Sicily as an independent ally until 212, and the Greek states
  // were declared free in 196. They explain ground that would otherwise read as
  // an unclaimed hole, so they carry real colour — teal and olive-gold, both far
  // from the five principal hues — at a lower strength.
  { id: "syracuse", name: "Syracuse", adjective: "Syracusan", color: "#0f7d86", role: "minor" },
  { id: "greek", name: "Greek states", adjective: "Greek", color: "#9a8f4a", role: "minor" },
  // Attalid Pergamum takes Syracuse's teal: Syracuse is off the map from 212, and
  // Pergamum does not enter it until 200. Eumenes II led the decisive cavalry
  // charge at Magnesia and took most of Anatolia at Apamea, which is more than a
  // minor power usually does — but Pergamum fought as Rome's ally rather than as a
  // principal, and colouring it as one would put a sixth belligerent hue on a
  // validated set of five. It sits a step back instead, like Hiero's Syracuse.
  { id: "pergamon", name: "Attalid Pergamum", adjective: "Pergamene", color: "#0f7d86", role: "minor" },
  // Saguntum fought Hannibal on its own account, with Rome an ally that never
  // arrived. Colouring its defenders Roman would claim a Roman garrison that was
  // not there, and calling them Greek would take Livy's foundation legend for
  // fact. Iberian peoples who fought as somebody's mercenaries or allies keep
  // their employer's colour and are named in the label; this hue is for the
  // occasions when they were a belligerent in their own right.
  { id: "iberian", name: "Iberian peoples", adjective: "Iberian", color: "#a05a3c", role: "minor" },

  // ── The powers of Italy, 509–265 BCE ───────────────────────────────────────
  // Each takes a hue already validated against Rome's red, borrowed from a power
  // that had left the stage before this one reached it. The reuse is deliberate
  // and tested: none of these ever shares a year with the faction it borrows from.
  //
  // Etruria cannot borrow: Carthage held Africa and western Sicily throughout this
  // period too, and Etruria shares the map with Rome, Samnium, the Latins and the
  // Gauls as well. So this is the one genuinely new hue, placed in the widest gap
  // the co-occurring set leaves — a muted magenta around 320°, where red (25°),
  // amber (45°), green (120°), blue (215°) and indigo (272°) are all far away. It
  // is lighter than the indigo it sits nearest, which is the pair to watch.
  { id: "etruscan", name: "Etruscan cities", adjective: "Etruscan", color: "#a9538c", role: "belligerent" },
  // Samnium takes Macedon's indigo. The last Samnite war ends in 290; Rome does
  // not meet Macedon in the field until 200.
  { id: "samnite", name: "Samnite league", adjective: "Samnite", color: "#4a3aa7", role: "belligerent" },
  // The Latin League takes Numidia's amber, and is dissolved in 338.
  { id: "latin", name: "Latin League", adjective: "Latin", color: "#eda100", role: "belligerent" },
  // Pyrrhus cannot borrow Syracuse's teal, which was the obvious candidate: he
  // ruled Syracuse himself in 278–276, so the two are on the map together. A dark
  // maroon instead — the same hue family as Rome's red but half its lightness,
  // which is legible here because Epirote forces appear as routes and battle
  // diagrams rather than as a territory fill abutting Rome's.
  { id: "epirote", name: "Epirus under Pyrrhus", adjective: "Epirote", color: "#7d2b3a", role: "belligerent" },
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
