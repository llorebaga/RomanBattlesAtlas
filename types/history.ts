export type Faction =
  | "rome"
  | "carthage"
  | "macedon"
  | "seleucid"
  | "ptolemaic"
  | "numidia"
  | "gaul";
export type ForceType = "army" | "fleet";
export type Certainty = "attested" | "probable" | "disputed" | "speculative";
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
}

export interface CampaignRoutePoint {
  year: number;
  month?: number;
  label: string;
  coordinates: Coordinates;
  certainty: Certainty;
  sourceIds: string[];
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
}

export interface BattleMoment {
  title: string;
  description: string;
  certainty: Certainty;
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
  title: string;
  summary: string;
  certainty: Certainty;
  battleSlug?: string;
  war?: string;
}
