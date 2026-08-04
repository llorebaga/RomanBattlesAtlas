import type { TerritoryPeriod } from "@/types/history";

// SCHEMATIC control zones — deliberately coarse outlines meant to convey the
// shape of the Mediterranean state system and how it shifts, NOT surveyed
// borders. Ancient frontiers were fuzzy, contested, and often a matter of
// hegemony rather than administration. A period is drawn while
// fromYear <= year <= toYear; a hand-over is modelled by ending one polity's
// period and starting the successor's the next year.
export const territories: TerritoryPeriod[] = [
  // --- Rome: peninsular Italy, then Sicily, Sardinia/Corsica, Iberia ---
  // Rings are generous envelopes traced around the intended landmass; the map
  // clips every fill to the coastline, so the coast supplies the fine outline
  // and these only need to enclose the right land.
  {
    id: "rome-italy", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -264, toYear: -196, certainty: "attested", labelAt: [13.0, 42.2],
    ring: [[10.1, 44.3], [12.6, 44.4], [14.1, 42.7], [15.5, 42.1], [16.3, 41.4], [18.6, 40.4], [18.0, 39.7], [16.4, 38.6], [15.9, 37.8], [15.4, 38.3], [16.2, 39.7], [14.2, 40.7], [12.2, 41.5], [10.9, 42.7], [10.0, 43.6]],
  },
  {
    id: "rome-sicily", polity: "rome", name: "Roman Sicily", mapLabel: "SICILY", fromYear: -241, toYear: -196, certainty: "attested", labelAt: [14.2, 37.6],
    ring: [[12.3, 38.4], [15.7, 38.5], [15.9, 36.5], [12.3, 37.2]],
  },
  {
    id: "rome-sardinia", polity: "rome", name: "Sardinia & Corsica", mapLabel: "SARDINIA", fromYear: -238, toYear: -196, certainty: "attested", labelAt: [9.1, 40.1],
    ring: [[8.4, 43.1], [9.6, 43.1], [9.9, 40.9], [9.9, 38.7], [8.2, 38.7], [8.0, 41.0]],
  },
  {
    id: "rome-iberia", polity: "rome", name: "Roman Iberia", mapLabel: "IBERIA", fromYear: -206, toYear: -196, certainty: "probable", labelAt: [-3.8, 38.1],
    ring: [[-7.4, 37.1], [-4.6, 36.6], [-2.0, 36.7], [0.9, 41.0], [-1.2, 41.4], [-4.0, 39.4], [-6.6, 38.4], [-7.6, 38.0]],
  },

  // --- Carthage: Africa core, plus the possessions it loses one by one ---
  {
    id: "carthage-africa", polity: "carthage", name: "Carthage", mapLabel: "CARTHAGE", fromYear: -264, toYear: -196, certainty: "attested", labelAt: [9.8, 36.2],
    ring: [[8.0, 37.4], [10.4, 37.5], [11.3, 36.9], [11.2, 35.4], [10.5, 33.8], [8.6, 34.2], [7.6, 35.6], [7.4, 36.9]],
  },
  {
    id: "carthage-sicily", polity: "carthage", name: "Carthaginian Sicily", mapLabel: "SICILY", fromYear: -264, toYear: -242, certainty: "attested", labelAt: [13.1, 37.8],
    ring: [[12.3, 38.4], [14.4, 38.4], [14.4, 36.7], [12.3, 37.2]],
  },
  {
    // North edge held below 41.2 so the smoothed curve cannot bleed onto
    // Corsica, which Carthage did not hold.
    id: "carthage-sardinia", polity: "carthage", name: "Carthaginian Sardinia", mapLabel: "SARDINIA", fromYear: -264, toYear: -239, certainty: "probable", labelAt: [9.1, 40.1],
    ring: [[8.0, 41.1], [9.8, 41.1], [9.9, 38.7], [8.2, 38.7]],
  },
  {
    id: "carthage-iberia", polity: "carthage", name: "Barcid Iberia", mapLabel: "IBERIA", fromYear: -237, toYear: -207, certainty: "probable", labelAt: [-3.8, 38.1],
    ring: [[-7.4, 37.1], [-4.6, 36.6], [-2.0, 36.7], [0.9, 41.0], [-1.2, 41.4], [-4.0, 39.4], [-6.6, 38.4], [-7.6, 38.0]],
  },

  // --- Gauls: Cisalpine (Po valley) and Transalpine (schematic, static) ---
  {
    // The two Gallic zones must not overlap: they share a colour, so a double
    // fill would show as a darker patch that means nothing.
    id: "gaul-cisalpine", polity: "gaul", name: "Cisalpine Gauls", mapLabel: "CISALPINE GAULS", fromYear: -264, toYear: -196, certainty: "probable", labelAt: [9.9, 45.2],
    ring: [[7.9, 46.0], [11.8, 46.1], [12.8, 45.4], [10.6, 44.5], [8.4, 44.4], [7.7, 45.2]],
  },
  {
    id: "gaul-transalpine", polity: "gaul", name: "Transalpine Gauls", mapLabel: "GAULS", fromYear: -264, toYear: -196, certainty: "speculative", labelAt: [2.0, 44.6],
    ring: [[-1.6, 43.3], [3.2, 42.4], [4.9, 43.3], [6.9, 43.9], [6.6, 45.8], [2.0, 46.2], [-1.4, 45.4]],
  },

  // --- Numidia: interior kingdom behind Carthage, enlarged after Zama ---
  {
    // Numidia stops short of the Carthaginian ring: overlapping fills would
    // blend into a colour that belongs to neither power.
    id: "numidia-early", polity: "numidia", name: "Numidian kingdoms", mapLabel: "NUMIDIA", fromYear: -264, toYear: -202, certainty: "probable", labelAt: [4.6, 35.4],
    ring: [[1.6, 36.6], [6.3, 36.8], [6.9, 35.2], [5.8, 33.8], [2.4, 34.2], [0.4, 35.2]],
  },
  {
    id: "numidia-masinissa", polity: "numidia", name: "Numidia (Masinissa)", mapLabel: "NUMIDIA", fromYear: -201, toYear: -196, certainty: "probable", labelAt: [4.4, 35.4],
    ring: [[0.4, 36.4], [7.0, 36.9], [7.3, 35.0], [6.4, 33.6], [2.0, 34.0], [-0.6, 35.2]],
  },

  // --- Eastern Hellenistic powers (coarse; mostly at the map's east edge) ---
  {
    id: "macedon-greece", polity: "macedon", name: "Macedon & allies", mapLabel: "MACEDON", fromYear: -264, toYear: -198, certainty: "probable", labelAt: [22.0, 40.4],
    ring: [[19.3, 42.2], [23.9, 41.5], [24.7, 40.2], [24.2, 38.3], [23.6, 36.4], [21.6, 36.6], [20.4, 38.4], [19.2, 40.3]],
  },
  {
    id: "macedon-reduced", polity: "macedon", name: "Macedon", mapLabel: "MACEDON", fromYear: -197, toYear: -196, certainty: "probable", labelAt: [21.9, 41.0],
    ring: [[19.6, 42.2], [23.8, 41.5], [24.4, 40.4], [22.4, 39.7], [20.4, 40.3]],
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
