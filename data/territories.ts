import type { TerritoryPeriod } from "@/types/history";

// SCHEMATIC control zones — deliberately coarse outlines meant to convey the
// shape of the Mediterranean state system and how it shifts, NOT surveyed
// borders. Ancient frontiers were fuzzy, contested, and often a matter of
// hegemony rather than administration. A period is drawn while
// fromYear <= year <= toYear; a hand-over is modelled by ending one polity's
// period and starting the successor's the next year.
export const territories: TerritoryPeriod[] = [
  // --- Rome: peninsular Italy, then Sicily, Sardinia/Corsica, Iberia ---
  {
    id: "rome-italy", polity: "rome", name: "Rome", fromYear: -264, toYear: -196, certainty: "attested", labelAt: [13.2, 42.0],
    ring: [[10.2, 44.0], [12.5, 44.1], [13.8, 42.8], [16.1, 41.9], [18.5, 40.1], [16.0, 38.9], [15.6, 38.0], [12.9, 40.2], [11.0, 42.6], [10.0, 43.5]],
  },
  {
    id: "rome-sicily", polity: "rome", name: "Roman Sicily", fromYear: -241, toYear: -196, certainty: "attested", labelAt: [14.1, 37.5],
    ring: [[12.4, 38.0], [13.7, 38.2], [15.2, 38.3], [15.6, 38.1], [15.1, 36.9], [13.9, 37.1], [12.5, 37.6]],
  },
  {
    id: "rome-sardinia", polity: "rome", name: "Sardinia & Corsica", fromYear: -238, toYear: -196, certainty: "attested", labelAt: [9.0, 40.4],
    ring: [[8.5, 43.0], [9.5, 42.6], [9.6, 41.0], [9.6, 39.0], [8.6, 38.9], [8.2, 40.5], [8.3, 42.2]],
  },
  {
    id: "rome-iberia", polity: "rome", name: "Roman Iberia", fromYear: -206, toYear: -196, certainty: "probable", labelAt: [-3.5, 38.2],
    ring: [[-7.0, 37.0], [-2.0, 36.7], [0.7, 40.6], [-1.5, 40.2], [-4.5, 38.5], [-6.8, 37.8]],
  },

  // --- Carthage: Africa core, plus the possessions it loses one by one ---
  {
    id: "carthage-africa", polity: "carthage", name: "Carthage", fromYear: -264, toYear: -196, certainty: "attested", labelAt: [9.6, 36.1],
    ring: [[7.5, 37.2], [10.4, 37.3], [11.4, 36.9], [11.0, 35.6], [10.0, 34.0], [8.0, 34.5], [6.5, 35.8]],
  },
  {
    id: "carthage-sicily", polity: "carthage", name: "Carthaginian Sicily", fromYear: -264, toYear: -242, certainty: "attested", labelAt: [13.2, 37.7],
    ring: [[12.4, 38.0], [14.3, 38.1], [14.0, 37.0], [12.5, 37.6]],
  },
  {
    id: "carthage-sardinia", polity: "carthage", name: "Carthaginian Sardinia", fromYear: -264, toYear: -239, certainty: "probable", labelAt: [8.9, 40.2],
    ring: [[8.5, 41.3], [9.6, 41.0], [9.6, 39.0], [8.6, 38.9], [8.2, 40.5]],
  },
  {
    id: "carthage-iberia", polity: "carthage", name: "Barcid Iberia", fromYear: -237, toYear: -207, certainty: "probable", labelAt: [-3.5, 38.2],
    ring: [[-7.0, 37.0], [-2.0, 36.7], [0.7, 40.6], [-1.5, 40.2], [-4.5, 38.5], [-6.8, 37.8]],
  },

  // --- Gauls: Cisalpine (Po valley) and Transalpine (schematic, static) ---
  {
    id: "gaul-cisalpine", polity: "gaul", name: "Cisalpine Gauls", fromYear: -264, toYear: -196, certainty: "probable", labelAt: [9.4, 45.2],
    ring: [[7.0, 45.6], [11.5, 45.9], [12.5, 45.2], [10.5, 44.6], [8.0, 44.5], [7.0, 45.0]],
  },
  {
    id: "gaul-transalpine", polity: "gaul", name: "Transalpine Gauls", fromYear: -264, toYear: -196, certainty: "speculative", labelAt: [2.4, 44.4],
    ring: [[-1.0, 43.3], [4.8, 43.4], [7.5, 44.0], [7.0, 45.6], [2.0, 45.5], [-1.0, 44.5]],
  },

  // --- Numidia: interior kingdom behind Carthage, enlarged after Zama ---
  {
    id: "numidia-early", polity: "numidia", name: "Numidian kingdoms", fromYear: -264, toYear: -202, certainty: "probable", labelAt: [4.3, 35.2],
    ring: [[2.0, 36.0], [6.5, 36.2], [7.5, 35.0], [6.0, 34.0], [2.5, 34.5], [1.0, 35.2]],
  },
  {
    id: "numidia-masinissa", polity: "numidia", name: "Numidia (Masinissa)", fromYear: -201, toYear: -196, certainty: "probable", labelAt: [5.0, 35.4],
    ring: [[1.0, 36.2], [7.5, 36.6], [9.0, 35.3], [7.0, 33.8], [2.0, 34.2], [0.5, 35.4]],
  },

  // --- Eastern Hellenistic powers (coarse; mostly at the map's east edge) ---
  {
    id: "macedon-greece", polity: "macedon", name: "Macedon & allies", fromYear: -264, toYear: -198, certainty: "probable", labelAt: [22.0, 40.1],
    ring: [[19.3, 41.9], [23.5, 41.4], [24.2, 40.0], [23.0, 37.5], [21.5, 37.0], [20.5, 38.6], [19.6, 40.2]],
  },
  {
    id: "macedon-reduced", polity: "macedon", name: "Macedon", fromYear: -197, toYear: -196, certainty: "probable", labelAt: [21.8, 40.9],
    ring: [[19.5, 41.9], [23.5, 41.3], [24.0, 40.4], [22.2, 39.9], [20.4, 40.2]],
  },
  {
    id: "seleucid", polity: "seleucid", name: "Seleucid Empire", fromYear: -264, toYear: -196, certainty: "probable", labelAt: [34.0, 36.0],
    ring: [[26.0, 40.0], [30.0, 38.0], [36.0, 37.0], [40.0, 35.0], [38.0, 32.0], [35.0, 31.0], [30.0, 36.0], [27.0, 38.0]],
  },
  {
    id: "ptolemaic", polity: "ptolemaic", name: "Ptolemaic Egypt", fromYear: -264, toYear: -196, certainty: "probable", labelAt: [29.0, 28.5],
    ring: [[20.0, 32.2], [27.0, 31.4], [32.0, 31.3], [34.0, 31.0], [33.0, 24.0], [27.0, 24.0], [22.0, 26.0], [19.0, 31.0]],
  },
];

export function territoriesForYear(year: number): TerritoryPeriod[] {
  return territories.filter((period) => year >= period.fromYear && year <= period.toYear);
}
