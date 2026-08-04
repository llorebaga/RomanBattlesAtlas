import type { TerritoryPeriod } from "@/types/history";

// SCHEMATIC control zones — deliberately coarse outlines meant to convey the
// shape of the Mediterranean state system and how it shifts, NOT surveyed
// borders. Ancient frontiers were fuzzy, contested, and often a matter of
// hegemony rather than administration. A period is drawn while
// fromYear <= year <= toYear; a hand-over is modelled by ending one polity's
// period and starting the successor's the next year.
//
// Two rules make these read well on the map:
//
// 1. Rings deliberately OVERSHOOT the coast and OVERLAP their neighbours. The
//    map clips every fill to the coastline, so overshooting means no unclaimed
//    white sliver is left along a shore, and overlapping means no gap opens
//    between two powers. Opacity is applied once per layer, so overlaps do not
//    darken — the zone drawn later simply wins the contested ground.
// 2. Order therefore matters. Zones appear in draw order, so a power listed
//    later takes the overlap: the Gauls hold the Po plain over Rome's envelope,
//    and Carthage holds its core over Numidia's.
export const territories: TerritoryPeriod[] = [
  // --- Rome: peninsular Italy, then Sicily, Sardinia/Corsica, Iberia ---
  {
    id: "rome-italy", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -264, toYear: -196, certainty: "attested", labelAt: [13.0, 42.3],
    ring: [[9.5, 44.5], [13.2, 45.0], [14.8, 42.8], [16.4, 42.0], [17.6, 41.2], [19.0, 40.4], [18.2, 39.6], [17.2, 38.6], [15.4, 37.5], [14.6, 39.6], [13.2, 40.6], [11.6, 41.8], [10.0, 42.8], [9.3, 43.8]],
  },
  {
    id: "rome-sicily", polity: "rome", name: "Roman Sicily", mapLabel: "SICILY", fromYear: -241, toYear: -196, certainty: "attested", labelAt: [14.2, 37.6],
    ring: [[12.1, 38.7], [15.9, 38.7], [16.1, 36.4], [12.1, 36.9]],
  },
  {
    id: "rome-sardinia", polity: "rome", name: "Sardinia & Corsica", mapLabel: "SARDINIA", fromYear: -238, toYear: -196, certainty: "attested", labelAt: [9.1, 40.1],
    ring: [[8.0, 43.3], [9.8, 43.3], [10.0, 40.8], [10.0, 38.6], [8.0, 38.6]],
  },
  {
    id: "rome-iberia", polity: "rome", name: "Roman Iberia", mapLabel: "IBERIA", fromYear: -206, toYear: -196, certainty: "probable", labelAt: [-3.8, 38.1],
    ring: [[-7.8, 36.6], [-1.4, 36.3], [1.6, 41.4], [-1.6, 41.8], [-4.4, 39.6], [-7.0, 38.6], [-8.0, 37.6]],
  },

  // --- Gauls: Cisalpine (Po valley) and Transalpine. Listed after Rome so the
  // Po plain reads as Gallic rather than Roman in this period. ---
  {
    id: "gaul-cisalpine", polity: "gaul", name: "Cisalpine Gauls", mapLabel: "CISALPINE GAULS", fromYear: -264, toYear: -196, certainty: "probable", labelAt: [10.0, 45.3],
    ring: [[7.0, 46.2], [12.2, 46.3], [13.2, 45.6], [11.0, 44.2], [8.4, 44.0], [6.8, 45.0]],
  },
  {
    id: "gaul-transalpine", polity: "gaul", name: "Transalpine Gauls", mapLabel: "GAULS", fromYear: -264, toYear: -196, certainty: "speculative", labelAt: [2.0, 44.8],
    ring: [[-2.0, 43.0], [3.4, 42.2], [5.2, 43.0], [7.8, 43.6], [7.6, 46.0], [1.6, 46.6], [-1.8, 45.6]],
  },

  // --- Numidia: interior kingdom behind Carthage, enlarged after Zama. Listed
  // before Carthage so the Carthaginian core wins the shared frontier. ---
  {
    id: "numidia-early", polity: "numidia", name: "Numidian kingdoms", mapLabel: "NUMIDIA", fromYear: -264, toYear: -202, certainty: "probable", labelAt: [4.2, 35.6],
    ring: [[0.4, 37.0], [7.6, 37.2], [8.2, 35.0], [6.0, 33.4], [2.0, 33.8], [-0.6, 35.4]],
  },
  {
    id: "numidia-masinissa", polity: "numidia", name: "Numidia (Masinissa)", mapLabel: "NUMIDIA", fromYear: -201, toYear: -196, certainty: "probable", labelAt: [4.0, 35.6],
    ring: [[-0.8, 37.0], [8.0, 37.4], [8.8, 35.0], [6.6, 33.2], [1.6, 33.6], [-1.2, 35.4]],
  },

  // --- Carthage: Africa core, plus the possessions it loses one by one ---
  {
    id: "carthage-africa", polity: "carthage", name: "Carthage", mapLabel: "CARTHAGE", fromYear: -264, toYear: -196, certainty: "attested", labelAt: [10.0, 36.3],
    ring: [[7.4, 37.6], [10.6, 37.8], [11.6, 36.8], [11.4, 35.0], [10.4, 33.4], [8.4, 33.8], [7.0, 35.4], [7.0, 37.0]],
  },
  {
    id: "carthage-sicily", polity: "carthage", name: "Carthaginian Sicily", mapLabel: "SICILY", fromYear: -264, toYear: -242, certainty: "attested", labelAt: [13.0, 37.9],
    ring: [[12.1, 38.7], [14.8, 38.7], [14.6, 36.5], [12.1, 36.9]],
  },
  {
    id: "carthage-sardinia", polity: "carthage", name: "Carthaginian Sardinia", mapLabel: "SARDINIA", fromYear: -264, toYear: -239, certainty: "probable", labelAt: [9.1, 40.0],
    // Held below 41.15 so the curve cannot reach Corsica, which Carthage did not hold.
    ring: [[7.9, 41.15], [10.0, 41.15], [10.0, 38.6], [7.9, 38.6]],
  },
  {
    id: "carthage-iberia", polity: "carthage", name: "Barcid Iberia", mapLabel: "IBERIA", fromYear: -237, toYear: -207, certainty: "probable", labelAt: [-3.8, 38.1],
    ring: [[-7.8, 36.6], [-1.4, 36.3], [1.6, 41.4], [-1.6, 41.8], [-4.4, 39.6], [-7.0, 38.6], [-8.0, 37.6]],
  },

  // --- Eastern Hellenistic powers ---
  {
    id: "macedon-greece", polity: "macedon", name: "Macedon & allies", mapLabel: "MACEDON", fromYear: -264, toYear: -198, certainty: "probable", labelAt: [22.0, 40.4],
    ring: [[19.2, 42.4], [24.0, 41.7], [24.9, 40.2], [24.4, 38.2], [23.8, 36.2], [21.4, 36.4], [20.2, 38.4], [19.0, 40.3]],
  },
  {
    id: "macedon-reduced", polity: "macedon", name: "Macedon", mapLabel: "MACEDON", fromYear: -197, toYear: -196, certainty: "probable", labelAt: [21.9, 41.0],
    ring: [[19.6, 42.4], [24.0, 41.7], [24.7, 40.2], [22.0, 39.6], [20.2, 40.4]],
  },
  {
    id: "seleucid", polity: "seleucid", name: "Seleucid Empire", mapLabel: "SELEUCIDS", fromYear: -264, toYear: -196, certainty: "probable", labelAt: [37.4, 36.4],
    ring: [[26.0, 40.0], [30.0, 38.0], [36.0, 37.0], [40.0, 35.0], [38.0, 32.0], [35.0, 31.0], [30.0, 36.0], [27.0, 38.0]],
  },
  {
    id: "ptolemaic", polity: "ptolemaic", name: "Ptolemaic Egypt", mapLabel: "EGYPT", fromYear: -264, toYear: -196, certainty: "probable", labelAt: [29.0, 28.5],
    ring: [[20.0, 32.2], [27.0, 31.4], [32.0, 31.3], [34.0, 31.0], [33.0, 24.0], [27.0, 24.0], [22.0, 26.0], [19.0, 31.0]],
  },
];

export function territoriesForYear(year: number): TerritoryPeriod[] {
  return territories.filter((period) => year >= period.fromYear && year <= period.toYear);
}
