import type { TerritoryPeriod } from "@/types/history";

// Zones of control for the Mediterranean powers, 509–146 BCE.
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
    id: "rome-italy", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -272, toYear: -146, certainty: "attested", labelAt: [13.0, 42.3],
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
    id: "rome-sicily-whole", polity: "rome", name: "Roman Sicily", mapLabel: "SICILY", fromYear: -212, toYear: -146, certainty: "attested", labelAt: [14.0, 37.6],
    ring: [[12.1, 38.1], [12.3, 38.5], [13.2, 38.45], [14.2, 38.4], [15.0, 38.4], [15.5, 38.35], [15.6, 37.8], [15.4, 37.1], [15.1, 36.5], [14.2, 36.4], [13.2, 36.5], [12.2, 37.3]],
  },
  {
    id: "rome-sardinia", polity: "rome", name: "Sardinia & Corsica", mapLabel: "SARDINIA", fromYear: -238, toYear: -146, certainty: "attested", labelAt: [9.1, 40.1],
    ring: [[8.3, 43.3], [9.0, 43.4], [9.7, 43.2], [9.9, 42.5], [9.6, 41.6], [10.0, 41.0], [10.0, 40.2], [9.8, 39.4], [9.4, 38.7], [8.6, 38.6], [8.1, 39.2], [8.0, 40.2], [8.2, 41.0], [8.1, 42.0], [8.2, 42.8]],
  },
  {
    // 206 onwards Rome inherits the Barcid province: the same Ebro frontier.
    id: "rome-iberia", polity: "rome", name: "Roman Iberia", mapLabel: "IBERIA", fromYear: -206, toYear: -146, certainty: "probable", labelAt: [-3.4, 38.4],
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
    id: "gaul-cisalpine", polity: "gaul", name: "Cisalpine Gauls", mapLabel: "CISALPINE GAULS", fromYear: -395, toYear: -146, certainty: "probable", labelAt: [10.0, 45.2],
    ring: [
      // The Alpine crest from the Maritime Alps round to the Carnic Alps.
      [7.4, 44.2], [7.0, 44.9], [7.1, 45.5], [7.4, 45.9], [8.4, 46.2], [9.5, 46.4], [10.6, 46.5], [11.6, 46.6], [12.6, 46.4], [13.4, 45.9],
      // Adriatic head, then the Apennine watershed back west — this line is the
      // visible Roman frontier, so it carries the detail.
      [13.2, 45.4], [12.6, 44.2], [11.9, 44.15], [11.2, 44.3], [10.5, 44.5], [9.9, 44.6], [9.3, 44.65], [8.7, 44.55], [7.9, 44.35],
    ],
  },
  {
    id: "gaul-transalpine", polity: "gaul", name: "Transalpine Gauls", mapLabel: "GAULS", fromYear: -509, toYear: -146, certainty: "speculative", labelAt: [2.0, 44.6],
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
    id: "numidia-masinissa", polity: "numidia", name: "Numidia (Masinissa)", mapLabel: "NUMIDIA", fromYear: -201, toYear: -146, certainty: "probable", labelAt: [4.4, 35.6],
    ring: [
      [-1.8, 35.4], [-1.0, 36.2], [0.2, 36.9], [1.6, 37.1], [3.0, 37.2], [4.6, 37.3], [6.0, 37.4], [7.2, 37.4],
      [7.6, 36.6], [7.5, 35.6], [7.2, 34.6], [6.0, 33.8], [4.2, 33.4], [2.4, 33.4], [0.6, 33.8], [-1.2, 34.6],
    ],
  },
  {
    // The Emporia, taken from Carthage around 162 and held detached from Numidia
    // proper — Carthaginian Byzacena still lay between them. Drawn as its own zone
    // because that is what it was: a seizure, not a frontier moving. Without it the
    // Tripolitanian shore would go blank in 161 and read as nobody's, when the
    // whole point is that it had changed hands and Carthage could not answer.
    id: "numidia-emporia", polity: "numidia", name: "The Emporia under Masinissa", mapLabel: "EMPORIA", fromYear: -161, toYear: -146, certainty: "probable", labelAt: [13.2, 32.6],
    ring: [
      [11.5, 33.0], [11.6, 32.4], [13.0, 31.8], [14.6, 31.8], [15.6, 31.7],
      [15.8, 32.5], [14.6, 32.9], [13.2, 33.2], [11.9, 33.7],
    ],
  },

  // ── Carthage ─────────────────────────────────────────────────────────────
  {
    id: "carthage-africa", polity: "carthage", name: "Carthage", mapLabel: "CARTHAGE", fromYear: -509, toYear: -162, certainty: "attested", labelAt: [9.9, 36.2],
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
    // 161–147: the Emporia gone. Masinissa spent fifty years taking Carthaginian
    // territory in the certain knowledge that the treaty of 201 forbade Carthage to
    // answer without Roman permission, and around 162 he took the Tripolitanian
    // ports — the richest thing Carthage still had outside its own hinterland.
    //
    // This zone is the whole case for the Third Punic War being drawn rather than
    // asserted. Leaving Carthage at its full extent until the year it was destroyed
    // would make the war look like a response to a rival, which is exactly what it
    // was not: the state Rome destroyed in 146 had been shrinking for fifty years
    // and was legally barred from stopping it.
    id: "carthage-reduced", polity: "carthage", name: "Carthage after the loss of the Emporia", mapLabel: "CARTHAGE", fromYear: -161, toYear: -147, certainty: "probable", labelAt: [9.9, 36.2],
    ring: [
      [7.2, 37.2], [7.1, 36.4], [7.4, 35.6], [7.8, 34.8],
      // The inland limit of Byzacena, now the south-eastern corner of the state.
      [8.8, 34.2], [9.6, 33.8], [10.4, 33.2],
      // North again along the Tunisian coast, offshore throughout.
      [11.2, 33.6], [11.4, 34.4], [11.2, 35.2], [11.4, 36.0], [11.6, 36.9], [11.0, 37.5], [10.2, 37.6], [9.2, 37.5], [8.2, 37.4],
    ],
  },
  {
    // 146: the province of Africa, on the ground Carthage held at the end and
    // inside the ditch Rome dug to mark it off from Numidia. The city itself was
    // destroyed and its site left out of the settlement entirely.
    id: "rome-africa", polity: "rome", name: "Province of Africa", mapLabel: "AFRICA", fromYear: -146, toYear: -146, certainty: "attested", labelAt: [9.9, 36.2],
    ring: [
      [7.2, 37.2], [7.1, 36.4], [7.4, 35.6], [7.8, 34.8],
      [8.8, 34.2], [9.6, 33.8], [10.4, 33.2],
      [11.2, 33.6], [11.4, 34.4], [11.2, 35.2], [11.4, 36.0], [11.6, 36.9], [11.0, 37.5], [10.2, 37.6], [9.2, 37.5], [8.2, 37.4],
    ],
  },
  {
    id: "carthage-sicily", polity: "carthage", name: "Carthaginian Sicily", mapLabel: "SICILY", fromYear: -509, toYear: -242, certainty: "attested", labelAt: [13.0, 37.8],
    ring: [[12.1, 38.1], [12.3, 38.5], [13.0, 38.4], [13.7, 38.4], [14.2, 38.3], [14.5, 38.0], [14.6, 37.5], [14.5, 37.0], [14.2, 36.6], [13.4, 36.5], [12.7, 36.6], [12.2, 37.3]],
  },
  {
    id: "carthage-sardinia", polity: "carthage", name: "Carthaginian Sardinia", mapLabel: "SARDINIA", fromYear: -509, toYear: -239, certainty: "probable",
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
    // Syracusan power swung enormously across these three centuries — Gelon after
    // Himera, Dionysius I with an empire reaching into southern Italy, Agathocles
    // again — and none of it is part of Rome's story until 264. Drawing Hiero's
    // small kingdom for 500 BCE would be an anachronism, and drawing each phase
    // would be an atlas of Sicily rather than of Roman warfare. So the earlier
    // centuries carry one zone at the habitual reach of Syracusan hegemony, graded
    // `disputed` and saying in its own note that it is not any single year's border.
    id: "syracuse-hegemony", polity: "syracuse", name: "Syracusan hegemony", mapLabel: "SYRACUSE", fromYear: -509, toYear: -265, certainty: "disputed", labelAt: [14.85, 37.25],
    ring: [[14.1, 38.1], [14.8, 38.3], [15.4, 38.35], [15.7, 37.9], [15.6, 37.1], [15.3, 36.45], [14.5, 36.45], [14.0, 36.9], [13.9, 37.6]],
  },
  {
    // 264 onwards: Hiero II's kingdom, the ally Rome dealt with and then annexed.
    id: "syracuse", polity: "syracuse", name: "Syracuse", mapLabel: "SYRACUSE", fromYear: -264, toYear: -213, certainty: "attested", labelAt: [14.95, 37.2],
    ring: [[14.4, 38.0], [14.9, 38.2], [15.4, 38.3], [15.6, 37.9], [15.5, 37.2], [15.2, 36.5], [14.6, 36.5], [14.3, 36.9], [14.2, 37.5]],
  },
  {
    // After Cynoscephalae Rome declared the Greek cities free — nominally
    // independent, under Roman oversight. Bounded by Olympus and the Pindus.
    id: "greek-states", polity: "greek", name: "Greek states", mapLabel: "GREEK STATES", fromYear: -197, toYear: -146, certainty: "probable", labelAt: [22.4, 38.6],
    ring: [
      [19.2, 40.0], [20.2, 39.9], [21.2, 39.9], [22.2, 39.9], [23.2, 40.0], [24.2, 40.2],
      [24.8, 39.4], [24.4, 38.4], [23.9, 37.4], [23.6, 36.3], [22.6, 36.2], [21.4, 36.4], [20.6, 37.4], [20.0, 38.4], [19.2, 39.2],
    ],
  },
  {
    // Antiochus' bridgehead in Greece. He landed at Demetrias in the autumn of 192
    // with about ten thousand men, wintered at Chalcis, and held Magnesia, Achaea
    // Phthiotis and Malis until Thermopylae threw him out in the spring of 191.
    //
    // Drawn over the freed Greek states, which it supersedes: he is a principal and
    // they are a minor power, so the ground reads as his. Two cautions the outline
    // cannot carry itself. It is a year-granular zone for a hold that lasted two
    // campaigning seasons at most, so 191 shows it for a year in which he was gone
    // by April. And Euboea is left out: Chalcis opened its gates to him, but a city
    // and its garrison are not a shaded province, and the island drawn solid would
    // claim far more than the sources support.
    id: "seleucid-greece", polity: "seleucid", name: "Antiochus' bridgehead in Greece", mapLabel: "ANTIOCHUS", fromYear: -192, toYear: -191, certainty: "probable", labelAt: [22.4, 39.0],
    ring: [
      [22.3, 39.5], [22.9, 39.5], [23.4, 39.3], [23.2, 39.0],
      [22.9, 38.7], [22.5, 38.6], [22.1, 38.8], [22.0, 39.2],
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
    id: "macedon-reduced", polity: "macedon", name: "Macedon", mapLabel: "MACEDON", fromYear: -197, toYear: -168, certainty: "probable", labelAt: [22.2, 41.2],
    ring: [
      [19.3, 41.4], [20.0, 42.0], [21.0, 42.3], [22.0, 42.3], [23.0, 42.0], [24.0, 41.6], [24.9, 41.4],
      [24.9, 40.7], [24.2, 40.4], [23.2, 40.2], [22.2, 40.1], [21.2, 40.1], [20.2, 40.1], [19.2, 40.3],
    ],
  },
  {
    // 167–149: the same ground, and not a kingdom. Rome abolished the monarchy and
    // cut Macedonia into four republics forbidden to trade or intermarry with one
    // another — an arrangement designed so that the country could never again be
    // assembled into an army. The outline cannot show the partition, because the
    // internal lines are known only as a list of districts; the label carries it.
    id: "macedon-republics", polity: "macedon", name: "The four Macedonian republics", mapLabel: "FOUR REPUBLICS", fromYear: -167, toYear: -149, certainty: "attested", labelAt: [22.2, 41.2],
    ring: [
      [19.3, 41.4], [20.0, 42.0], [21.0, 42.3], [22.0, 42.3], [23.0, 42.0], [24.0, 41.6], [24.9, 41.4],
      [24.9, 40.7], [24.2, 40.4], [23.2, 40.2], [22.2, 40.1], [21.2, 40.1], [20.2, 40.1], [19.2, 40.3],
    ],
  },
  {
    // 148: Andriscus showed that four republics could still be assembled into a
    // rebellion, so Rome stopped delegating. Macedonia becomes the first Roman
    // province east of the Adriatic, and its governor is given the oversight of
    // Greece as well — which is why Corinth is a Roman matter two years later.
    id: "rome-macedonia", polity: "rome", name: "Province of Macedonia", mapLabel: "MACEDONIA", fromYear: -148, toYear: -146, certainty: "attested", labelAt: [22.2, 41.2],
    ring: [
      [19.3, 41.4], [20.0, 42.0], [21.0, 42.3], [22.0, 42.3], [23.0, 42.0], [24.0, 41.6], [24.9, 41.4],
      [24.9, 40.7], [24.2, 40.4], [23.2, 40.2], [22.2, 40.1], [21.2, 40.1], [20.2, 40.1], [19.2, 40.3],
    ],
  },
  // ── The Seleucids, in three phases ────────────────────────────────────────
  //
  // One outline for the whole atlas would hide the only thing the map has to say
  // about this empire: that it filled Asia Minor for seventy years and then, in a
  // single treaty, was pushed out of it. The phases are cut at the two years that
  // did it — 200, when Rome's alliance with Attalus puts Pergamum on the map and
  // the Attalid corner has to come out of the Seleucid fill, and 188, when Apamea
  // moves the frontier back to the Taurus.
  {
    id: "seleucid", polity: "seleucid", name: "Seleucid Empire", mapLabel: "SELEUCIDS", fromYear: -264, toYear: -201, certainty: "probable", labelAt: [37.4, 36.4],
    ring: [
      // Anatolian coast and the eastern limits.
      [26.0, 40.4], [28.0, 40.6], [30.0, 41.4], [32.0, 42.2], [34.0, 42.2], [36.0, 41.6], [38.0, 40.4], [40.0, 39.0],
      [41.0, 37.0], [40.0, 35.0], [38.4, 34.5], [36.8, 34.4],
      // The southern frontier is the Eleutherus, not the Egyptian border: Coele-Syria
      // was Ptolemaic for the whole third century, and four Syrian wars were fought
      // over it before Antiochus finally took it at Panium in 200.
      [35.4, 34.7], [34.6, 35.6],
      // Then the Levantine and southern Anatolian coasts north and west, offshore.
      [34.0, 36.0], [32.0, 36.4], [30.0, 36.2], [28.0, 36.4], [26.4, 38.4],
    ],
  },
  {
    // 200–189: the same empire with the Attalid kingdom cut out of its north-west
    // corner. The line between them runs from the Aegean below Pergamum up the
    // Caicus divide — this edge is authored on both zones, and Pergamum's ring
    // deliberately overshoots it, because the Seleucids are a principal and take
    // the overlap. What a reader sees is this line, with no pale seam behind it.
    //
    // Ionia stays Seleucid: Ephesus was Antiochus' western capital and the base
    // his fleet fought the naval war from, and giving it to Pergamum here would
    // make nonsense of Corycus and Myonessus.
    id: "seleucid-west", polity: "seleucid", name: "Seleucid Empire", mapLabel: "SELEUCIDS", fromYear: -200, toYear: -189, certainty: "probable", labelAt: [37.4, 36.4],
    ring: [
      [29.2, 40.3], [30.0, 41.4], [32.0, 42.2], [34.0, 42.2], [36.0, 41.6], [38.0, 40.4], [40.0, 39.0],
      [41.0, 37.0], [40.0, 35.0], [38.0, 33.4], [36.4, 32.6], [35.0, 31.4], [34.2, 31.6],
      [34.6, 33.0], [35.4, 34.6], [34.0, 36.0], [32.0, 36.4], [30.0, 36.2], [28.4, 36.4],
      // Up the Carian and Ionian coast, offshore, keeping Miletus and Ephesus.
      [27.0, 37.0], [26.8, 37.8],
      // The Attalid frontier, inland to the Propontis.
      [26.9, 38.6], [27.8, 39.0], [29.0, 39.6],
    ],
  },
  {
    // 188: Apamea. Antiochus gives up everything north and west of the Taurus,
    // pays an indemnity in twelve annual instalments, and surrenders his elephants
    // and all but ten warships. Rome takes none of the ground itself.
    id: "seleucid-apamea", polity: "seleucid", name: "Seleucid Empire after Apamea", mapLabel: "SELEUCIDS", fromYear: -188, toYear: -146, certainty: "attested", labelAt: [37.4, 36.2],
    ring: [
      // The Taurus frontier, from the Cilician coast east along the range.
      [33.0, 36.4], [33.6, 37.0], [34.6, 37.6], [35.8, 37.9], [37.2, 37.7], [38.6, 37.5], [40.0, 37.2],
      // Eastern limit, then south-west down the Syrian flank to the Egyptian border.
      [41.0, 36.4], [40.4, 35.0], [38.6, 33.6], [36.6, 32.8], [35.2, 31.6], [34.2, 31.6],
      // Levantine coast north, offshore throughout, back to Cilicia.
      [34.6, 33.0], [35.4, 34.6], [34.6, 36.0], [33.6, 36.1],
    ],
  },

  // ── Attalid Pergamum ──────────────────────────────────────────────────────
  {
    // Pergamum enters the map in 200 rather than at its own foundation, on the
    // same rule the eastern kingdoms follow: a power is drawn from the year it
    // enters Rome's story, and Attalus I's alliance against Philip V is that year.
    // Before then it would be decoration.
    id: "pergamon", polity: "pergamon", name: "Attalid Pergamum", mapLabel: "PERGAMUM", fromYear: -200, toYear: -189, certainty: "probable", labelAt: [27.3, 39.2],
    ring: [
      // Propontis and Troad shore, offshore, then the eastern limit inland.
      [25.9, 40.4], [27.2, 40.7], [28.6, 40.5], [29.6, 40.3],
      // South past the Seleucid frontier — the overshoot is deliberate; see above.
      [29.3, 39.3], [28.0, 38.7], [26.6, 38.2],
      [26.0, 38.9], [25.8, 39.8],
    ],
  },
  {
    // Apamea handed the Seleucid west to Rome's two allies: Eumenes II took Mysia,
    // Lydia, both Phrygias, Lycaonia and Pisidia, Rhodes took Lycia and Caria south
    // of the Maeander. They are inside one outline because the map cannot honestly
    // draw the Maeander as a surveyed border, and the label says both names.
    //
    // Bithynia, Galatia, Paphlagonia, Pontus and Cappadocia are left blank. They
    // were not Antiochus' to lose and not Rome's to give, and colouring them as
    // part of the settlement would be the larger error.
    id: "pergamon-apamea", polity: "pergamon", name: "Attalid and Rhodian gains at Apamea", mapLabel: "PERGAMUM & RHODES", fromYear: -188, toYear: -146, certainty: "attested", labelAt: [29.5, 38.8],
    ring: [
      // Aegean and Propontis shore, offshore.
      [25.8, 40.4], [27.0, 40.7], [28.4, 40.6], [29.6, 40.6],
      // Northern limit against Bithynia and Paphlagonia, east to the Galatian edge.
      [30.4, 40.0], [31.4, 39.6], [32.6, 39.4],
      // Eastern limit against Galatia and Cappadocia, then south-west to the Taurus.
      [33.2, 38.6], [33.0, 37.6], [32.0, 37.0], [30.8, 36.8],
      // Round the Lycian and Carian coast, offshore, and back up the Ionian shore.
      [29.6, 36.0], [28.4, 36.0], [27.2, 36.6], [26.6, 37.4], [26.6, 38.2], [26.0, 38.9], [25.8, 39.8],
    ],
  },
  {
    // 264–201: Egypt with Coele-Syria, which is the shape that explains the third
    // century. The Ptolemies held the Levant to the Eleutherus and the Seleucids
    // spent four wars trying to take it; drawing Egypt as the Nile alone would make
    // both of those disappear.
    id: "ptolemaic", polity: "ptolemaic", name: "Ptolemaic Egypt", mapLabel: "EGYPT", fromYear: -264, toYear: -201, certainty: "probable", labelAt: [29.5, 28.0],
    ring: [
      // Cyrenaica and the Egyptian coast, every stretch pushed offshore so the
      // Nile delta shore is never left pale.
      [19.6, 31.4], [20.4, 33.2], [21.8, 33.4], [23.2, 33.0], [24.6, 32.2], [26.0, 32.0], [27.4, 31.9], [28.8, 32.0], [30.2, 32.1], [31.6, 32.1], [32.8, 31.8], [34.4, 31.5],
      // Up the Levantine coast, offshore, to the Eleutherus frontier, then east.
      [34.8, 32.6], [35.3, 33.6], [35.8, 35.0], [36.6, 35.0],
      // Back south along the desert edge of Coele-Syria, then into Sinai.
      [36.8, 33.4], [36.2, 32.2], [35.7, 31.4], [35.1, 30.6],
      // Sinai and the Red Sea flank, then the Nubian limit and the desert west.
      [34.6, 30.0], [34.0, 28.4], [33.4, 27.0], [33.0, 25.4], [32.6, 23.8], [31.0, 23.8], [29.0, 24.0], [26.6, 24.6], [24.2, 25.6], [22.0, 27.0], [20.4, 29.0],
    ],
  },
  {
    // 200 onwards: Panium. Antiochus takes Coele-Syria and Egypt is the Nile and
    // Cyrenaica again — the victory that freed him to turn west, and so the other
    // half of why the year 200 is a hinge on this map.
    id: "ptolemaic-egypt", polity: "ptolemaic", name: "Ptolemaic Egypt", mapLabel: "EGYPT", fromYear: -200, toYear: -146, certainty: "probable", labelAt: [29.5, 28.0],
    ring: [
      [19.6, 31.4], [20.4, 33.2], [21.8, 33.4], [23.2, 33.0], [24.6, 32.2], [26.0, 32.0], [27.4, 31.9], [28.8, 32.0], [30.2, 32.1], [31.6, 32.1], [32.8, 31.8], [34.4, 31.6],
      [34.6, 30.0], [34.0, 28.4], [33.4, 27.0], [33.0, 25.4], [32.6, 23.8], [31.0, 23.8], [29.0, 24.0], [26.6, 24.6], [24.2, 25.6], [22.0, 27.0], [20.4, 29.0],
    ],
  },

  // ── Italy before Rome held it, 509–265 BCE ─────────────────────────────────
  //
  // Two things make this block different from the zones above. First, the scale:
  // in 509 Rome's own territory is a patch about thirty kilometres across, and the
  // frontiers that matter are rivers and hill lines a day's march apart, not the
  // Ebro and the Alps. Second, the evidence: the extent of the Latin League or the
  // Samnite federation in the fifth century is inferred from later boundaries,
  // colony sites and language, not from anything anyone wrote down at the time. So
  // these zones carry `traditional` or `probable`, never `attested`.
  //
  // Order matters here. Rome's growing ager is authored last so that it takes any
  // ground it shares with the powers it was absorbing, and the phases are cut so
  // that Rome's zone begins in the same year the previous holder's ends — which is
  // what makes each conquest a single visible change on the map.

  // The Etruscan cities: a league of independent states rather than one polity,
  // drawn as one zone because the map cannot honestly distinguish twelve city
  // territories whose borders are unknown.
  {
    id: "etruscan-league", polity: "etruscan", name: "Etruscan cities", mapLabel: "ETRURIA", fromYear: -509, toYear: -397, certainty: "probable", labelAt: [11.6, 42.75],
    ring: [
      // Tyrrhenian coast from the Tiber mouth to the Arno, pushed offshore.
      [12.22, 41.66], [11.70, 41.95], [11.10, 42.30], [10.60, 42.85], [10.25, 43.35], [10.05, 43.75],
      // The northern limit on the Apennine flank above the Arno.
      [10.85, 43.95], [11.55, 44.00], [12.05, 43.65],
      // Then south along the Tiber, which is the frontier with Rome and Umbria.
      [12.30, 43.15], [12.35, 42.70], [12.45, 42.30], [12.52, 41.98], [12.35, 41.80],
    ],
  },
  {
    // After Veii is destroyed in 396 the southern third of Etruria is Roman. The
    // rest of the league erodes by alliance rather than conquest, which is why this
    // zone simply ends when Rome's peninsular zone begins rather than shrinking
    // again: there is no year the sources let us draw as the fall of Etruria.
    id: "etruscan-inner", polity: "etruscan", name: "Etruscan cities", mapLabel: "ETRURIA", fromYear: -396, toYear: -291, certainty: "probable", labelAt: [11.5, 43.2],
    ring: [
      [11.75, 42.10], [11.20, 42.35], [10.65, 42.85], [10.28, 43.35], [10.05, 43.75],
      [10.85, 43.95], [11.55, 44.00], [12.05, 43.65],
      [12.30, 43.15], [12.35, 42.70], [12.20, 42.40], [11.95, 42.20],
    ],
  },

  // The Latin League: Rome's own kin and its first rivals, dissolved after the
  // Latin War and replaced by the alliance system that became Roman Italy.
  {
    id: "latin-league", polity: "latin", name: "Latin League", mapLabel: "LATINS", fromYear: -509, toYear: -339, certainty: "traditional", labelAt: [12.95, 41.6],
    ring: [
      [12.20, 41.70], [12.45, 41.50], [12.75, 41.35], [13.15, 41.15],
      [13.45, 41.35], [13.60, 41.65], [13.30, 41.85], [13.00, 42.00], [12.60, 42.00], [12.40, 41.88],
    ],
  },

  // The Samnite federation of the central Apennines. Drawn inland only: the
  // Campanian plain and the bay of Naples were Etruscan, Oscan and Greek, and the
  // Samnites' reach to the sea is exactly what the wars with Rome were about.
  {
    id: "samnite-league", polity: "samnite", name: "Samnite league", mapLabel: "SAMNIUM", fromYear: -509, toYear: -291, certainty: "probable", labelAt: [14.6, 41.4],
    ring: [
      [13.85, 41.95], [14.35, 41.92], [14.90, 41.72], [15.35, 41.45], [15.40, 41.10],
      [15.00, 40.85], [14.60, 40.90], [14.35, 41.15], [14.05, 41.45], [13.80, 41.70],
    ],
  },

  // The Greek cities of the south, from Tarentum round the gulf to Rhegium. A
  // coastal arc, because that is what these states were: harbours with a
  // hinterland, not a territorial power.
  {
    id: "magna-graecia", polity: "greek", name: "Greek cities of Italy", mapLabel: "GREEK CITIES", fromYear: -509, toYear: -273, certainty: "probable", labelAt: [16.55, 39.9],
    ring: [
      [17.60, 40.60], [17.30, 40.25], [16.90, 39.95], [16.60, 39.55], [17.20, 39.00],
      [16.60, 38.65], [16.20, 38.05], [15.55, 38.02],
      [15.80, 38.55], [16.15, 39.15], [16.35, 39.85], [16.85, 40.35], [17.25, 40.55],
    ],
  },

  // ── Rome's own territory, phase by phase ──────────────────────────────────
  {
    // 509: the city, the salt flats at the Tiber mouth, and the country out to the
    // Alban hills. Rome is one Latin state among several and not the largest.
    id: "rome-ager-early", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -509, toYear: -397, certainty: "traditional", labelAt: [12.6, 41.87],
    ring: [
      [12.20, 41.70], [12.45, 41.62], [12.75, 41.70], [12.95, 41.88],
      [12.80, 42.05], [12.50, 42.05], [12.30, 41.90],
    ],
  },
  {
    // 396: the land of Veii annexed outright — the conquest that roughly doubled
    // Roman territory and is the first securely consequential event on this map.
    id: "rome-ager-veii", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -396, toYear: -339, certainty: "probable", labelAt: [12.55, 41.95],
    ring: [
      [12.15, 41.68], [12.55, 41.50], [12.95, 41.60], [13.10, 41.85],
      [12.95, 42.10], [12.60, 42.30], [12.20, 42.25], [11.95, 42.05], [12.05, 41.85],
    ],
  },
  {
    // 338: the Latin War settled and Campania held. Rome now runs from the Tiber
    // to the bay of Naples and is the largest state in Italy.
    id: "rome-latium-campania", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -338, toYear: -300, certainty: "probable", labelAt: [13.3, 41.5],
    ring: [
      [12.10, 41.70], [12.70, 41.35], [13.20, 41.15], [13.90, 41.15], [14.35, 40.95], [14.55, 40.72],
      [14.15, 40.72], [13.95, 41.05], [13.60, 41.55], [13.20, 41.90],
      [12.90, 42.15], [12.40, 42.30], [12.05, 42.10], [12.00, 41.88],
    ],
  },
  {
    // 299: Umbria and Picenum brought in on the eve of the last Samnite war, so
    // Rome reaches the Adriatic and can be attacked from two seas.
    id: "rome-central-italy", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -299, toYear: -291, certainty: "probable", labelAt: [12.9, 42.35],
    ring: [
      [12.10, 41.70], [12.70, 41.35], [13.20, 41.15], [13.90, 41.15], [14.35, 40.95], [14.55, 40.72],
      [14.15, 40.72], [13.95, 41.05], [13.75, 41.60], [14.10, 41.95], [13.90, 42.40],
      [13.85, 42.90], [13.55, 43.35], [13.20, 43.45], [12.75, 43.20], [12.35, 42.85], [12.15, 42.40],
      [12.05, 42.10], [12.00, 41.88],
    ],
  },
  {
    // 290: Samnium beaten and Etruria bound in. Everything but the Greek south and
    // the Gallic north is now Roman or Roman-allied.
    id: "rome-peninsular", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -290, toYear: -273, certainty: "probable", labelAt: [13.2, 42.1],
    ring: [
      // Tyrrhenian coast from the Arno south past Campania to Lucania.
      [10.05, 43.75], [10.60, 42.85], [11.40, 42.15], [12.20, 41.60], [13.20, 41.05], [14.30, 40.85],
      [14.90, 40.55], [15.60, 40.15], [16.20, 39.85],
      // Inland limit against the Greek cities, then north up the Apennine spine.
      [16.10, 40.35], [16.60, 40.75], [17.20, 40.80], [17.60, 40.90],
      // Adriatic coast north to the Gallic frontier.
      [16.30, 41.65], [15.30, 42.10], [14.30, 42.60], [13.60, 43.30], [13.30, 43.65],
      // The northern edge: the Apennine watershed to the Arno.
      [12.60, 43.90], [11.90, 44.00], [11.10, 43.95],
    ],
  },
];

export function territoriesForYear(year: number): TerritoryPeriod[] {
  return territories.filter((period) => year >= period.fromYear && year <= period.toYear);
}
