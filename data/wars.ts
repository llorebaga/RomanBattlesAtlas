import type { Era } from "@/types/history";

// The continuous timeline is assembled from these eras. Timeline bounds and the
// map header are derived from this list, so adding a later war (or period)
// automatically extends the scrubber without touching the map component.
export const eras: Era[] = [
  {
    id: "first-punic",
    name: "First Punic War",
    shortName: "First Punic War",
    kind: "war",
    startYear: -264,
    endYear: -241,
    blurb:
      "Rome and Carthage fight for Sicily and, unexpectedly, for command of the sea. Rome becomes a naval power for the first time.",
    mapView: { center: [12.4, 37.9], zoom: 4.7 },
    factions: ["rome", "carthage"],
  },
  {
    id: "interbellum",
    name: "Between the Punic Wars",
    shortName: "Between the wars",
    kind: "interbellum",
    startYear: -240,
    endYear: -219,
    blurb:
      "Carthage suppresses a mercenary revolt, loses Sardinia and Corsica to Rome, and rebuilds power through the Barcid conquest of Iberia.",
    mapView: { center: [7.5, 39.5], zoom: 4.1 },
    factions: ["rome", "carthage"],
  },
  {
    id: "second-punic",
    name: "Second Punic War",
    shortName: "Second Punic War",
    kind: "war",
    startYear: -218,
    endYear: -201,
    blurb:
      "Hannibal carries the war across the Alps into Italy. After years of Roman defeats, Scipio takes the fight to Iberia and Africa and wins at Zama.",
    mapView: { center: [6.5, 41], zoom: 3.9 },
    factions: ["rome", "carthage"],
  },
  {
    id: "macedonian-second",
    name: "Second Macedonian War",
    shortName: "Second Macedonian War",
    kind: "war",
    startYear: -200,
    endYear: -196,
    blurb:
      "Freed from Carthage, Rome turns east against Philip V of Macedon. The legion defeats the phalanx at Cynoscephalae, and Rome proclaims the 'freedom of the Greeks'.",
    mapView: { center: [21, 39.6], zoom: 5.1 },
    factions: ["rome", "macedon"],
  },
];

export function eraForYear(year: number): Era | undefined {
  return eras.find((era) => year >= era.startYear && year <= era.endYear);
}

export function getEra(id: string | undefined): Era | undefined {
  if (!id) return undefined;
  return eras.find((era) => era.id === id);
}

export const TIMELINE_START_YEAR = Math.min(...eras.map((era) => era.startYear));
export const TIMELINE_END_YEAR = Math.max(...eras.map((era) => era.endYear));
