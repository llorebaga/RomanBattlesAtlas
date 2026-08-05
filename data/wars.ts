import type { Era } from "@/types/history";

// The continuous timeline is assembled from these eras. Timeline bounds and the
// map header are derived from this list, so adding a later war (or period)
// automatically extends the scrubber without touching the map component.
export const eras: Era[] = [
  // ── The Republic conquers Italy, 509–265 BCE ───────────────────────────────
  // The segments are contiguous so that every year on the scrubber belongs to
  // one. They are named for what the period was about rather than for a war,
  // because for much of the fifth century the fighting was annual raiding with no
  // war to name. The regal period before 509 is deliberately not here: see the
  // methodology page on why the atlas does not map foundation myth.
  {
    id: "early-republic",
    name: "The Republic's first wars",
    shortName: "Early Republic",
    kind: "war",
    startYear: -509,
    endYear: -450,
    blurb:
      "A city of a few thousand fights for its own hinterland: against the last king's Etruscan backers, against the Latin cities it would later lead, and against the Volsci and Aequi coming down off the hills. Almost everything here is the annalistic tradition rather than record.",
    mapView: { center: [12.9, 41.8], zoom: 6.6 },
    factions: ["rome", "etruscan", "latin"],
  },
  {
    id: "veientine-wars",
    name: "The wars with Veii",
    shortName: "Veii",
    kind: "war",
    startYear: -449,
    endYear: -391,
    blurb:
      "Rome's nearest rival was an Etruscan city fifteen kilometres away. Three wars and a ten-year siege end with Veii destroyed and its land annexed — the first conquest that made Rome substantially larger than its neighbours.",
    mapView: { center: [12.5, 42.1], zoom: 6.8 },
    factions: ["rome", "etruscan"],
  },
  {
    id: "gallic-crisis",
    name: "The Gallic catastrophe and recovery",
    shortName: "Gallic Crisis",
    kind: "war",
    startYear: -390,
    endYear: -350,
    blurb:
      "A Senonian war band destroys a Roman army at the Allia and sacks the city itself. The generation after rebuilds the walls, holds Latium together, and turns a humiliation into the reason Rome never again fought without reserves.",
    mapView: { center: [12.6, 42.2], zoom: 6.4 },
    factions: ["rome", "gaul", "etruscan"],
  },
  {
    id: "latin-samnite-first",
    name: "The Latin and first Samnite wars",
    shortName: "Latium",
    kind: "war",
    startYear: -349,
    endYear: -327,
    blurb:
      "Rome reaches Campania, meets the Samnites for the first time, and then has to fight its own Latin allies for the leadership of Latium. The settlement of 338 replaces the League with a system of unequal alliances that becomes the template for Roman Italy.",
    mapView: { center: [13.7, 41.4], zoom: 6.2 },
    factions: ["rome", "latin", "samnite"],
  },
  {
    id: "samnite-second",
    name: "The Second Samnite War",
    shortName: "Second Samnite War",
    kind: "war",
    startYear: -326,
    endYear: -305,
    blurb:
      "Twenty years in the Apennines against the one Italian power of comparable weight. Rome is trapped and made to surrender at the Caudine Forks, then rebuilds, builds the Via Appia, and grinds Samnium down.",
    mapView: { center: [14.4, 41.3], zoom: 6.2 },
    factions: ["rome", "samnite"],
  },
  {
    id: "samnite-third",
    name: "The Third Samnite War",
    shortName: "Third Samnite War",
    kind: "war",
    startYear: -304,
    endYear: -291,
    blurb:
      "Samnites, Etruscans, Umbrians and Gauls combine against Rome and are beaten at Sentinum, the largest battle fought in Italy before Cannae. Within a decade Rome holds the peninsula from the Po to Lucania.",
    mapView: { center: [13.5, 42.2], zoom: 6.0 },
    factions: ["rome", "samnite", "etruscan", "gaul"],
  },
  {
    id: "pyrrhic-war",
    name: "The Pyrrhic War",
    shortName: "Pyrrhic War",
    kind: "war",
    startYear: -290,
    endYear: -272,
    blurb:
      "Tarentum calls in Pyrrhus of Epirus, the best professional soldier of the age. He beats Rome twice with pikes and elephants, cannot convert either win into a peace, crosses to Sicily against Carthage, and finally goes home. Rome's first war against a Hellenistic army.",
    mapView: { center: [15.6, 40.2], zoom: 5.6 },
    factions: ["rome", "epirote", "samnite"],
  },
  {
    id: "italian-unification",
    name: "The completion of Italy",
    shortName: "Italy Completed",
    kind: "interbellum",
    startYear: -271,
    endYear: -265,
    blurb:
      "The last independent cities of the south and of Etruria are brought in, a Roman garrison that had seized Rhegium is destroyed by its own state, and the peninsula is a single military system. The year after this, Rome crosses to Sicily.",
    mapView: { center: [14.2, 41.2], zoom: 5.8 },
    factions: ["rome", "etruscan"],
  },

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
