export type Faction =
  | "rome"
  | "carthage"
  | "macedon"
  | "seleucid"
  | "ptolemaic"
  | "numidia"
  | "gaul"
  | "syracuse"
  | "greek"
  | "pergamon"
  | "cimbri"
  | "iberian"
  // The powers of Italy before Rome held it.
  | "etruscan"
  | "latin"
  | "samnite"
  | "epirote";
export type ForceType = "army" | "fleet";
/**
 * How well a claim is supported, strongest first.
 *
 * `traditional` is not simply the weakest of the others: it marks a different kind
 * of claim. The Roman annalistic tradition supplies names, dates and outcomes for
 * the early Republic that no contemporary record stands behind — Livy and Dionysius
 * were writing four centuries later from material that had already been shaped by
 * family pride and Greek literary models. Recording those as `speculative` would
 * imply a modern reconstruction of something real; `traditional` says instead that
 * this is what Rome remembered, reported as memory rather than as evidence.
 */
export type Certainty = "attested" | "probable" | "disputed" | "speculative" | "traditional";
export type BattleKind = "land" | "naval" | "siege" | "campaign";

export type Coordinates = [longitude: number, latitude: number];

export interface GeographicUncertainty {
  radiusKm: number;
  note: string;
  certainty: Certainty;
}

export interface HistoricalSource {
  id: string;
  kind: "ancient" | "modern";
  citation: string;
  note?: string;
  /**
   * The years this text actually covers — for an ancient source, the years it
   * *survives* for.
   *
   * This is not decoration. Livy wrote the Pyrrhic War in books 12–14 and those
   * books are lost; Polybius' Book 3 stops at Cannae and Zama is in Book 15. A
   * citation outside these ranges sends a reader to a text that does not discuss
   * the event, or does not exist. A test asserts every citation falls inside one
   * of its source's ranges.
   *
   * Several ranges are allowed because a narrative can double back: Polybius'
   * Book 2 is about 237–220 BCE but pauses to recount the Gallic sack of 390.
   * Modern works carry no range and are exempt.
   */
  covers?: { fromYear: number; toYear: number; note?: string }[];
}

export interface CampaignRoutePoint {
  year: number;
  month?: number;
  label: string;
  coordinates: Coordinates;
  certainty: Certainty;
  sourceIds: string[];
  /**
   * True when the leg ARRIVING at this point was made by sea — an army ferried
   * across a strait or shipped to another shore. The map draws those legs as a
   * fine dotted line, so a march is never shown walking over open water.
   */
  viaSea?: boolean;
}

export interface CampaignRoute {
  id: string;
  name: string;
  faction: Faction;
  forceType: ForceType;
  startYear: number;
  endYear: number;
  points: CampaignRoutePoint[];
  description: string;
  certainty: Certainty;
  war?: string;
}

export interface Era {
  id: string;
  name: string;
  shortName: string;
  kind: "war" | "interbellum";
  startYear: number;
  endYear: number;
  blurb: string;
  mapView: { center: Coordinates; zoom: number };
  // Belligerent powers whose army/fleet routes appear in the sidebar for this
  // era, Rome first. Drives the dynamic faction toggles.
  factions: Faction[];
}

// A schematic control zone for one polity, valid across a year range. Territory
// changes hands by ending one period and beginning another; several periods can
// be active at once (e.g. Rome holding Italy, Sicily, and Iberia).
export interface TerritoryPeriod {
  id: string;
  polity: Faction;
  name: string;
  fromYear: number;
  toYear: number;
  certainty: Certainty;
  ring: Coordinates[];
  labelAt?: Coordinates;
  /** Short name for the map itself; colour and legend carry the polity. */
  mapLabel?: string;
  /**
   * What this outline is not claiming.
   *
   * Required on any zone graded `disputed` or `speculative`, and enforced by a
   * test. A grade on its own tells a reader that the shape is uncertain but not
   * how — whether the frontier is guessed, the date approximate, or the whole
   * outline a composite of two centuries that never existed in any single year.
   * The map surfaces this on the zone itself, so the caveat travels with the
   * shape instead of living in a source comment nobody reads.
   */
  note?: string;
}

export interface BattleMoment {
  title: string;
  description: string;
  certainty: Certainty;
}

// ── Tactical diagrams ──────────────────────────────────────────────────────
// A battle drawn stage by stage: how it opened, how it turned, how it ended.
//
// These are diagrams, not pictures. No surviving source gives unit positions, so
// every stage is an interpretation and says so with its own certainty label. The
// frame is abstract: 0–100 on both axes, x rightward, y downward (screen space),
// never latitude and longitude — the point is the shape of the action, not a
// survey of ground.

export type DiagramUnitKind =
  | "infantry"      // legion, Libyan foot, Gallic and Iberian foot
  | "phalanx"       // pike block: deep, brittle at the flanks
  | "skirmishers"   // velites, slingers, peltasts
  | "cavalry"
  | "elephants"
  | "ships"
  | "camp"
  | "works";        // siege lines, ramparts, walls

export interface DiagramUnit {
  id: string;
  faction: Faction;
  kind: DiagramUnitKind;
  label?: string;
  /** Centre of the formation, in frame units. */
  at: [number, number];
  /** [frontage, depth] in frame units. Depth carries real meaning for a phalanx. */
  size?: [number, number];
  /** Degrees clockwise; 0 faces up the frame. */
  facing?: number;
  /** Broken or fleeing: drawn dashed and faded. */
  routed?: boolean;
  /**
   * Where the label goes, when the default place above the block is taken — most
   * often by the unit in front of it. Stacked lines of battle are the usual case:
   * their labels belong out to the side, not crammed into the gaps.
   */
  labelAt?: [number, number];
}

export interface DiagramArrow {
  id: string;
  from: [number, number];
  to: [number, number];
  faction?: Faction;
  kind?: "move" | "attack" | "retreat" | "missile";
  label?: string;
  /** Sideways bow, in frame units; positive curves clockwise. */
  bow?: number;
}

export interface DiagramTerrain {
  id: string;
  kind: "sea" | "coast" | "river" | "hill" | "ridge" | "woods" | "marsh" | "town" | "wall" | "road";
  label?: string;
  /** Outline or centreline, depending on the feature. */
  points?: [number, number][];
  at?: [number, number];
  size?: [number, number];
  /** Where the name sits, when the derived position would collide or fall outside. */
  labelAt?: [number, number];
}

export interface DiagramStage {
  id: string;
  title: string;
  description: string;
  certainty: Certainty;
  units: DiagramUnit[];
  arrows?: DiagramArrow[];
  /** What the diagram is deliberately not claiming at this stage. */
  caveat?: string;
}

export interface BattleDiagram {
  /** Roughly how much ground the frame stands for, stated plainly. */
  scaleNote: string;
  /** Which way is north, when the sources support saying so. */
  orientation?: string;
  terrain: DiagramTerrain[];
  stages: DiagramStage[];
  sourceIds?: string[];
}

export interface Battle {
  id: string;
  slug: string;
  name: string;
  kind: BattleKind;
  startYear: number;
  endYear: number;
  displayDate: string;
  location: string;
  coordinates: Coordinates;
  uncertainty: GeographicUncertainty;
  major: boolean;
  belligerents: string[];
  commanders: { faction: Faction; names: string[]; certainty: Certainty }[];
  result: string;
  summary: string;
  significance: string;
  context?: string;
  forces?: { side: string; estimate: string; certainty: Certainty; note?: string }[];
  casualties?: { side: string; estimate: string; certainty: Certainty; note?: string }[];
  moments?: BattleMoment[];
  ancientSourceIds: string[];
  modernSourceIds: string[];
  uncertaintyNotes: string[];
  previousSlug?: string;
  nextSlug?: string;
  war?: string;
}

export interface HistoricalEvent {
  id: string;
  year: number;
  /**
   * The last year this entry covers, when it stands for a phase rather than a year.
   *
   * For the Punic and Macedonian wars the sources support a year at a time. For the
   * early Republic they mostly do not: what survives is a war, a decade of raiding,
   * a stretch of annalistic notices. An event may therefore span its whole phase,
   * so that every year on the scrubber is accounted for without a single year being
   * invented to fill a gap. Omitted means the entry belongs to `year` alone.
   */
  toYear?: number;
  title: string;
  summary: string;
  certainty: Certainty;
  battleSlug?: string;
  war?: string;
}
