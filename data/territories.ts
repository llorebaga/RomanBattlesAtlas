import type { TerritoryPeriod } from "@/types/history";

// Zones of control for the Mediterranean powers, 264–196 BCE.
//
// These are schematic — ancient authority was layered and often a matter of
// hegemony rather than administration — but they are not arbitrary. Two rules
// govern how each ring is authored:
//
// 1. INLAND FRONTIERS FOLLOW REAL FEATURES, point by point. The line between
//    Barcid and free Iberia is the Ebro itself, traced upstream from the delta.
//    Rome's northern limit is the Apennine watershed to the Rubicon. The Gallic
//    zones part along the Alpine arc, Macedon along Olympus and the Nestos,
//    Carthage and Numidia along the Thabraca frontier. Those are the only edges a
//    reader ever sees, so they carry the detail.
// 2. COASTAL EDGES OVERSHOOT INTO THE SEA. Every fill is clipped to the coastline,
//    so pushing a ring offshore costs nothing and guarantees no pale strip is left
//    along a shore — the Nile delta and the Gulf of Lion were exactly that.
//
// Zones may overlap: opacity is applied once per layer, and within a layer a
// later zone wins, so a principal takes ground contested with a minor power.
export const territories: TerritoryPeriod[] = [
  // ── Rome ──────────────────────────────────────────────────────────────────
  {
    id: "rome-italy", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -264, toYear: -196, certainty: "attested", labelAt: [13.0, 42.3],
    ring: [
      // Northern limit, carried a little past the watershed: the Cisalpine zone
      // is drawn after Rome and takes the overlap, so the visible frontier is the
      // watershed itself and no unclaimed strip is left between them.
      [8.6, 44.75], [9.2, 44.85], [9.9, 44.8], [10.6, 44.7], [11.3, 44.5], [12.0, 44.35], [12.6, 44.4],
      // Adriatic coast, held just offshore.
      [13.2, 43.8], [13.9, 43.0], [14.6, 42.4], [15.4, 42.1], [16.2, 41.8], [17.0, 41.4], [17.9, 41.0], [18.7, 40.4],
      // Around the heel and the Gulf of Taranto, then the Ionian coast.
      [18.2, 39.8], [17.4, 39.9], [16.7, 39.6], [17.4, 39.0], [17.2, 38.4], [16.3, 37.8],
      // Tyrrhenian coast back north, offshore throughout.
      [15.6, 38.0], [15.4, 38.3], [15.9, 38.75], [15.4, 39.5], [15.0, 40.1], [14.2, 40.4], [13.5, 40.8], [12.6, 41.1], [11.7, 41.9], [10.7, 42.5], [9.9, 43.3], [9.0, 43.9],
    ],
  },
  {
    // 241–212: the former Carthaginian west and centre, up to the Syracusan
    // frontier along the Himera. 211 onwards: the whole island.
    id: "rome-sicily", polity: "rome", name: "Roman Sicily", mapLabel: "SICILY", fromYear: -241, toYear: -213, certainty: "attested", labelAt: [13.4, 37.6],
    ring: [[12.1, 38.1], [12.3, 38.5], [13.0, 38.4], [13.7, 38.4], [14.3, 38.35], [14.6, 38.1], [14.7, 37.6], [14.6, 37.1], [14.3, 36.6], [13.5, 36.5], [12.7, 36.6], [12.2, 37.3]],
  },
  {
    id: "rome-sicily-whole", polity: "rome", name: "Roman Sicily", mapLabel: "SICILY", fromYear: -212, toYear: -196, certainty: "attested", labelAt: [14.0, 37.6],
    ring: [[12.1, 38.1], [12.3, 38.5], [13.2, 38.45], [14.2, 38.4], [15.0, 38.4], [15.5, 38.35], [15.6, 37.8], [15.4, 37.1], [15.1, 36.5], [14.2, 36.4], [13.2, 36.5], [12.2, 37.3]],
  },
  {
    id: "rome-sardinia", polity: "rome", name: "Sardinia & Corsica", mapLabel: "SARDINIA", fromYear: -238, toYear: -196, certainty: "attested", labelAt: [9.1, 40.1],
    ring: [[8.3, 43.3], [9.0, 43.4], [9.7, 43.2], [9.9, 42.5], [9.6, 41.6], [10.0, 41.0], [10.0, 40.2], [9.8, 39.4], [9.4, 38.7], [8.6, 38.6], [8.1, 39.2], [8.0, 40.2], [8.2, 41.0], [8.1, 42.0], [8.2, 42.8]],
  },
  {
    // 206 onwards Rome inherits the Barcid province: the same Ebro frontier.
    id: "rome-iberia", polity: "rome", name: "Roman Iberia", mapLabel: "IBERIA", fromYear: -206, toYear: -196, certainty: "probable", labelAt: [-3.4, 38.4],
    ring: [
      // Up the Mediterranean coast, offshore, to the Ebro delta.
      [-7.6, 36.6], [-6.2, 36.0], [-4.6, 36.4], [-2.8, 36.5], [-1.4, 37.2], [-0.5, 38.1], [0.1, 38.9], [0.3, 39.8], [0.9, 40.5], [1.1, 40.9],
      // The Ebro, traced upstream from the delta: the agreed limit.
      [0.52, 40.81], [0.3, 41.2], [-0.03, 41.25], [-0.88, 41.65], [-1.6, 42.06], [-2.45, 42.47],
      // Then southwest along the Iberian System. Celtiberia, the northern Meseta
      // and Lusitania stayed independent, so the frontier turns away here rather
      // than sweeping over them.
      [-2.4, 41.5], [-2.9, 40.7], [-3.6, 40.0], [-4.8, 39.4], [-6.0, 38.6], [-7.0, 38.0], [-7.6, 37.4],
    ],
  },

  // ── Gauls: the two zones part along the Alpine arc ────────────────────────
  {
    id: "gaul-cisalpine", polity: "gaul", name: "Cisalpine Gauls", mapLabel: "CISALPINE GAULS", fromYear: -264, toYear: -196, certainty: "probable", labelAt: [10.0, 45.2],
    ring: [
      // The Alpine crest from the Maritime Alps round to the Carnic Alps.
      [7.4, 44.2], [7.0, 44.9], [7.1, 45.5], [7.4, 45.9], [8.4, 46.2], [9.5, 46.4], [10.6, 46.5], [11.6, 46.6], [12.6, 46.4], [13.4, 45.9],
      // Adriatic head, then the Apennine watershed back west — this line is the
      // visible Roman frontier, so it carries the detail.
      [13.2, 45.4], [12.6, 44.2], [11.9, 44.15], [11.2, 44.3], [10.5, 44.5], [9.9, 44.6], [9.3, 44.65], [8.7, 44.55], [7.9, 44.35],
    ],
  },
  {
    id: "gaul-transalpine", polity: "gaul", name: "Transalpine Gauls", mapLabel: "GAULS", fromYear: -264, toYear: -196, certainty: "speculative", labelAt: [2.0, 44.6],
    ring: [
      // Pyrenean frontier, from the Mediterranean to the Bay of Biscay.
      [3.4, 42.3], [2.4, 42.35], [1.4, 42.5], [0.4, 42.6], [-0.6, 42.8], [-1.6, 43.1], [-2.0, 43.6],
      // Atlantic seaboard, offshore, and a schematic northern limit.
      [-1.6, 44.6], [-1.4, 45.6], [-1.0, 46.3], [0.0, 46.6], [1.4, 46.8], [2.8, 46.9], [4.2, 46.8],
      // Down the western flank of the Alps to the Mediterranean.
      [5.4, 46.4], [6.2, 46.2], [6.6, 45.6], [6.8, 45.0], [7.1, 44.4], [7.6, 43.9],
      // Gulf of Lion, held offshore so no coastal strip is left pale.
      [6.4, 43.2], [5.2, 43.0], [4.2, 43.1], [3.2, 42.8],
    ],
  },

  // ── Numidia ──────────────────────────────────────────────────────────────
  {
    id: "numidia-early", polity: "numidia", name: "Numidian kingdoms", mapLabel: "NUMIDIA", fromYear: -264, toYear: -202, certainty: "probable", labelAt: [4.4, 35.6],
    ring: [
      // Mediterranean coast, offshore, from the Mulucha to the Carthaginian line.
      [-1.2, 35.6], [-0.4, 36.2], [0.6, 36.9], [1.8, 37.1], [3.0, 37.2], [4.4, 37.3], [5.6, 37.3], [6.6, 37.4],
      // Thabraca frontier with Carthage, then the Saharan limit westward.
      [7.4, 36.7], [7.3, 35.8], [6.9, 34.8], [5.4, 34.0], [3.8, 33.6], [2.2, 33.6], [0.6, 34.2], [-0.8, 34.8],
    ],
  },
  {
    // Enlarged by Rome after Zama at Carthage's expense.
    id: "numidia-masinissa", polity: "numidia", name: "Numidia (Masinissa)", mapLabel: "NUMIDIA", fromYear: -201, toYear: -196, certainty: "probable", labelAt: [4.4, 35.6],
    ring: [
      [-1.8, 35.4], [-1.0, 36.2], [0.2, 36.9], [1.6, 37.1], [3.0, 37.2], [4.6, 37.3], [6.0, 37.4], [7.2, 37.4],
      [7.6, 36.6], [7.5, 35.6], [7.2, 34.6], [6.0, 33.8], [4.2, 33.4], [2.4, 33.4], [0.6, 33.8], [-1.2, 34.6],
    ],
  },

  // ── Carthage ─────────────────────────────────────────────────────────────
  {
    id: "carthage-africa", polity: "carthage", name: "Carthage", mapLabel: "CARTHAGE", fromYear: -264, toYear: -196, certainty: "attested", labelAt: [9.9, 36.2],
    ring: [
      // Thabraca frontier with Numidia.
      [7.2, 37.2], [7.1, 36.4], [7.4, 35.6], [7.8, 34.8],
      // Inland limit of Byzacena, then east along the pre-desert to the
      // Tripolitanian emporia — Lepcis, Oea and Sabratha were Carthaginian, and
      // leaving that shore blank was simply an omission.
      [8.8, 34.2], [9.6, 33.8], [10.4, 33.0], [11.6, 32.4], [13.0, 31.8], [14.6, 31.8], [15.6, 31.7],
      // Back west along the Syrtic and Tunisian coast, held offshore throughout.
      [15.8, 32.5], [14.6, 32.9], [13.2, 33.2], [11.9, 33.7], [11.4, 34.4], [11.2, 35.2], [11.4, 36.0], [11.6, 36.9], [11.0, 37.5], [10.2, 37.6], [9.2, 37.5], [8.2, 37.4],
    ],
  },
  {
    id: "carthage-sicily", polity: "carthage", name: "Carthaginian Sicily", mapLabel: "SICILY", fromYear: -264, toYear: -242, certainty: "attested", labelAt: [13.0, 37.8],
    ring: [[12.1, 38.1], [12.3, 38.5], [13.0, 38.4], [13.7, 38.4], [14.2, 38.3], [14.5, 38.0], [14.6, 37.5], [14.5, 37.0], [14.2, 36.6], [13.4, 36.5], [12.7, 36.6], [12.2, 37.3]],
  },
  {
    id: "carthage-sardinia", polity: "carthage", name: "Carthaginian Sardinia", mapLabel: "SARDINIA", fromYear: -264, toYear: -239, certainty: "probable",
    // Sardinia only: Corsica, to the north, was never Carthaginian.
    ring: [[8.0, 41.1], [8.6, 41.2], [9.3, 41.2], [9.9, 41.0], [10.0, 40.2], [9.8, 39.4], [9.4, 38.7], [8.6, 38.6], [8.1, 39.2], [8.0, 40.2]],
    labelAt: [9.1, 40.0],
  },
  {
    // 237–229: Hamilcar's base is the south — Gades, the Guadalquivir, and its
    // silver. Carthaginian authority does not yet reach the Ebro.
    id: "carthage-iberia-south", polity: "carthage", name: "Barcid Iberia", mapLabel: "IBERIA", fromYear: -237, toYear: -229, certainty: "probable", labelAt: [-4.6, 37.6],
    ring: [
      [-7.6, 36.6], [-6.2, 36.0], [-4.6, 36.4], [-2.8, 36.5], [-1.6, 37.4], [-1.0, 38.2],
      [-2.0, 38.8], [-3.4, 39.0], [-4.8, 38.8], [-6.2, 38.4], [-7.2, 38.0], [-7.8, 37.4],
    ],
  },
  {
    // 228–219: Hasdrubal founds New Carthage and extends up the eastern coast; the
    // treaty of 226 names the Ebro as the limit of that expansion.
    id: "carthage-iberia", polity: "carthage", name: "Barcid Iberia", mapLabel: "IBERIA", fromYear: -228, toYear: -207, certainty: "probable", labelAt: [-3.4, 38.4],
    ring: [
      [-7.6, 36.6], [-6.2, 36.0], [-4.6, 36.4], [-2.8, 36.5], [-1.4, 37.2], [-0.5, 38.1], [0.1, 38.9], [0.3, 39.8], [0.9, 40.5], [1.1, 40.9],
      // The Ebro itself, upstream from the delta: the agreed limit.
      [0.52, 40.81], [0.3, 41.2], [-0.03, 41.25], [-0.88, 41.65], [-1.6, 42.06], [-2.45, 42.47],
      // Southwest along the Iberian System, leaving Celtiberia and Lusitania free.
      [-2.4, 41.5], [-2.9, 40.7], [-3.6, 40.0], [-4.8, 39.4], [-6.0, 38.6], [-7.0, 38.0], [-7.6, 37.4],
    ],
  },
  {
    // After Cannae much of the Italian south went over to Hannibal: Capua, the
    // Bruttians, most of Lucania and Samnium, and in 212 Tarentum. Showing Rome
    // in undisturbed possession of Italy through these years would be the single
    // largest error on the map. Drawn over the Roman zone, which it supersedes.
    id: "carthage-italy", polity: "carthage", name: "Hannibal's Italian allies", mapLabel: "ALLIED TO HANNIBAL", fromYear: -216, toYear: -212, certainty: "probable", labelAt: [16.0, 40.4],
    ring: [
      [14.0, 41.3], [15.2, 41.5], [16.4, 41.4], [17.6, 41.0], [18.6, 40.5], [18.0, 39.9],
      [17.2, 39.4], [16.9, 38.8], [16.2, 38.3], [15.7, 38.8], [16.0, 39.6], [15.0, 40.2], [14.0, 40.6],
    ],
  },
  {
    // 211–208: Capua is retaken and punished, but Tarentum and the far south hold.
    id: "carthage-italy-reduced", polity: "carthage", name: "Hannibal's Italian allies", mapLabel: "ALLIED TO HANNIBAL", fromYear: -211, toYear: -208, certainty: "probable", labelAt: [16.4, 40.2],
    ring: [
      [15.6, 40.6], [16.6, 40.8], [17.5, 40.6], [18.2, 40.2], [17.4, 39.5], [16.9, 38.8],
      [16.2, 38.3], [15.7, 38.8], [16.0, 39.6], [15.4, 40.1],
    ],
  },
  {
    // 207–203: after Tarentum falls Hannibal holds only Bruttium, and holds it to
    // the end.
    id: "carthage-bruttium", polity: "carthage", name: "Hannibal in Bruttium", mapLabel: "BRUTTIUM", fromYear: -207, toYear: -203, certainty: "probable", labelAt: [16.4, 39.3],
    ring: [[16.0, 40.0], [16.8, 39.9], [17.3, 39.3], [16.9, 38.7], [16.2, 38.2], [15.7, 38.7], [15.8, 39.4]],
  },

  // ── Third parties in the theatre ──────────────────────────────────────────
  {
    // Hiero II's kingdom: Carthage's ally in 264, Rome's from 263, taken in 212.
    // Its frontier with the Roman province ran near the Himera.
    id: "syracuse", polity: "syracuse", name: "Syracuse", mapLabel: "SYRACUSE", fromYear: -264, toYear: -213, certainty: "attested", labelAt: [14.95, 37.2],
    ring: [[14.4, 38.0], [14.9, 38.2], [15.4, 38.3], [15.6, 37.9], [15.5, 37.2], [15.2, 36.5], [14.6, 36.5], [14.3, 36.9], [14.2, 37.5]],
  },
  {
    // After Cynoscephalae Rome declared the Greek cities free — nominally
    // independent, under Roman oversight. Bounded by Olympus and the Pindus.
    id: "greek-states", polity: "greek", name: "Greek states", mapLabel: "GREEK STATES", fromYear: -197, toYear: -196, certainty: "probable", labelAt: [22.4, 38.6],
    ring: [
      [19.2, 40.0], [20.2, 39.9], [21.2, 39.9], [22.2, 39.9], [23.2, 40.0], [24.2, 40.2],
      [24.8, 39.4], [24.4, 38.4], [23.9, 37.4], [23.6, 36.3], [22.6, 36.2], [21.4, 36.4], [20.6, 37.4], [20.0, 38.4], [19.2, 39.2],
    ],
  },

  // ── Eastern Hellenistic powers ───────────────────────────────────────────
  {
    id: "macedon-greece", polity: "macedon", name: "Macedon & allies", mapLabel: "MACEDON", fromYear: -264, toYear: -198, certainty: "probable", labelAt: [22.2, 40.6],
    ring: [
      // Northern frontier along the Illyrian and Thracian highlands.
      [19.3, 41.4], [20.0, 42.0], [21.0, 42.3], [22.0, 42.3], [23.0, 42.0], [24.0, 41.6], [24.9, 41.4],
      // Aegean coast, offshore, then south past Olympus into Greece.
      [24.9, 40.6], [24.4, 40.2], [24.4, 39.2], [24.2, 38.3], [23.8, 37.3], [23.6, 36.3],
      [22.6, 36.2], [21.4, 36.4], [20.6, 37.4], [20.0, 38.4], [19.4, 39.4], [19.1, 40.4],
    ],
  },
  {
    // Reduced to Macedonia proper after 197: Greece is free, the coast retained.
    id: "macedon-reduced", polity: "macedon", name: "Macedon", mapLabel: "MACEDON", fromYear: -197, toYear: -196, certainty: "probable", labelAt: [22.2, 41.2],
    ring: [
      [19.3, 41.4], [20.0, 42.0], [21.0, 42.3], [22.0, 42.3], [23.0, 42.0], [24.0, 41.6], [24.9, 41.4],
      [24.9, 40.7], [24.2, 40.4], [23.2, 40.2], [22.2, 40.1], [21.2, 40.1], [20.2, 40.1], [19.2, 40.3],
    ],
  },
  {
    id: "seleucid", polity: "seleucid", name: "Seleucid Empire", mapLabel: "SELEUCIDS", fromYear: -264, toYear: -196, certainty: "probable", labelAt: [37.4, 36.4],
    ring: [
      // Anatolian and Levantine coasts, offshore, then the inland limits.
      [26.0, 40.4], [28.0, 40.6], [30.0, 41.4], [32.0, 42.2], [34.0, 42.2], [36.0, 41.6], [38.0, 40.4], [40.0, 39.0],
      [41.0, 37.0], [40.0, 35.0], [38.0, 33.4], [36.4, 32.6], [35.0, 31.4], [34.2, 31.6],
      [34.6, 33.0], [35.4, 34.6], [34.0, 36.0], [32.0, 36.4], [30.0, 36.2], [28.0, 36.4], [26.4, 38.4],
    ],
  },
  {
    id: "ptolemaic", polity: "ptolemaic", name: "Ptolemaic Egypt", mapLabel: "EGYPT", fromYear: -264, toYear: -196, certainty: "probable", labelAt: [29.5, 28.0],
    ring: [
      // Cyrenaica and the Egyptian coast, every stretch pushed offshore so the
      // Nile delta shore is never left pale.
      [19.6, 31.4], [20.4, 33.2], [21.8, 33.4], [23.2, 33.0], [24.6, 32.2], [26.0, 32.0], [27.4, 31.9], [28.8, 32.0], [30.2, 32.1], [31.6, 32.1], [32.8, 31.8], [34.4, 31.6],
      // Sinai and the Red Sea flank, then the Nubian limit and the desert west.
      [34.6, 30.0], [34.0, 28.4], [33.4, 27.0], [33.0, 25.4], [32.6, 23.8], [31.0, 23.8], [29.0, 24.0], [26.6, 24.6], [24.2, 25.6], [22.0, 27.0], [20.4, 29.0],
    ],
  },
];

export function territoriesForYear(year: number): TerritoryPeriod[] {
  return territories.filter((period) => year >= period.fromYear && year <= period.toYear);
}
