import type { TerritoryPeriod } from "@/types/history";

// Zones of control for the Mediterranean powers, 509–44 BCE.
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
//
// 3. A MINOR POWER MAY BE DRAWN AS AN ENVELOPE RATHER THAN A FRONTIER. Because a
//    principal always takes the overlap, a zone for peoples rather than a state —
//    the Iberians, the Noricans — can be carried right across the ground the
//    provinces later hold. What a reader sees is then exactly the country no
//    province claimed, with no seam and no pale thread between the two, and the
//    map never has to guess at a border nobody recorded. Zones drawn this way say
//    so in a `note`, because an outline that is not a claim has to admit it.
export const territories: TerritoryPeriod[] = [
  // ── Rome ──────────────────────────────────────────────────────────────────
  {
    id: "rome-italy", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -272, toYear: -30, certainty: "attested", labelAt: [13.0, 42.3],
    ring: [
      // Northern limit, carried a little past the watershed: the Cisalpine zone
      // is drawn after Rome and takes the overlap, so the visible frontier is the
      // watershed itself and no unclaimed strip is left between them.
      [8.6, 44.75], [9.2, 44.85], [9.9, 44.8], [10.6, 44.7], [11.3, 44.5], [12.0, 44.35], [12.6, 44.4],
      // Adriatic coast, held just offshore.
      [13.2, 43.8], [13.9, 43.0], [14.6, 42.4], [15.4, 42.1], [16.2, 41.8], [17.0, 41.4], [17.9, 41.0], [18.7, 40.4],
      // Around the heel and the Gulf of Taranto, then the Ionian coast. The bite
      // the gulf takes out of the ring is kept shallow: cut deeper, it reached
      // past the shore into the Sila, and Hannibal's recall in 202 handed that
      // ground to nobody.
      [18.2, 39.8], [17.4, 39.9], [16.6, 39.4], [17.4, 39.0], [17.2, 38.4], [16.3, 37.8],
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
    id: "rome-sicily-whole", polity: "rome", name: "Roman Sicily", mapLabel: "SICILY", fromYear: -212, toYear: -30, certainty: "attested", labelAt: [14.0, 37.6],
    ring: [[12.1, 38.1], [12.3, 38.5], [13.2, 38.45], [14.2, 38.4], [15.0, 38.4], [15.5, 38.35], [15.6, 37.8], [15.4, 37.1], [15.1, 36.5], [14.2, 36.4], [13.2, 36.5], [12.2, 37.3]],
  },
  {
    id: "rome-sardinia", polity: "rome", name: "Sardinia & Corsica", mapLabel: "SARDINIA", fromYear: -238, toYear: -30, certainty: "attested", labelAt: [9.1, 40.1],
    ring: [[8.3, 43.3], [9.0, 43.4], [9.7, 43.2], [9.9, 42.5], [9.6, 41.6], [10.0, 41.0], [10.0, 40.2], [9.8, 39.4], [9.4, 38.7], [8.6, 38.6], [8.1, 39.2], [8.0, 40.2], [8.2, 41.0], [8.1, 42.0], [8.2, 42.8]],
  },
  {
    // 218: the other end of the war Hannibal started. While he marched for Italy,
    // Gnaeus Scipio landed at Emporiae and took the country between the Pyrenees
    // and the Ebro — ground the Ebro treaty had expressly left outside the Barcid
    // province, which is why Rome could take it and call the war defensive.
    //
    // It was blank on this map for the whole atlas, and it is the one stretch of
    // Spain that cannot be: every Roman army in the peninsula came ashore here.
    // The campaign data walks armies through Tarraco in 209 and 178 and Caesar
    // fights Afranius at Ilerda in 49, all of it on ground coloured for nobody.
    //
    // The southern edge is carried a little past the Ebro, so Barcid Iberia — drawn
    // later — takes the overlap and the river itself stays the visible frontier.
    id: "rome-iberia-north", polity: "rome", name: "Roman Iberia north of the Ebro", mapLabel: "IBERIA", fromYear: -218, toYear: -207, certainty: "probable", labelAt: [1.3, 41.8],
    ring: [
      // The coast from the Ebro mouth to Cap de Creus, held offshore.
      [0.9, 40.6], [1.6, 41.0], [2.4, 41.4], [3.4, 42.45],
      // The Pyrenean frontier, carried just north of the crest so the Gallic zone
      // takes the overlap instead of a pale thread being left along the range.
      [2.4, 42.6], [1.4, 42.7], [0.4, 42.8], [-0.6, 43.0],
      // Back to the Ebro and down it, held a little south of the river.
      [-1.3, 42.3], [-1.7, 41.95], [-0.95, 41.5], [-0.05, 41.1], [0.45, 40.7],
    ],
  },
  {
    // 206: Rome inherits the Barcid province and keeps what it took north of the
    // Ebro. Together they are the two Spains — Citerior along the east coast and up
    // the Ebro, Ulterior in the Guadalquivir. The interior belongs to neither:
    // Celtiberia, the northern Meseta and Lusitania stayed independent, and the
    // atlas fights there for seventy years before that changes.
    id: "rome-iberia", polity: "rome", name: "The two Spains", mapLabel: "IBERIA", fromYear: -206, toYear: -134, certainty: "probable", labelAt: [-3.4, 38.4],
    ring: [
      // Up the Mediterranean coast, offshore, past the Ebro delta to Cap de Creus.
      [-7.6, 36.6], [-6.2, 36.0], [-4.6, 36.4], [-2.8, 36.5], [-1.4, 37.2], [-0.5, 38.1], [0.1, 38.9], [0.3, 39.8], [0.9, 40.5], [1.6, 41.0], [2.4, 41.4], [3.4, 42.45],
      // The Pyrenean frontier west to the head of the Ebro, north of the crest.
      [2.4, 42.6], [1.4, 42.7], [0.4, 42.8], [-0.6, 43.0], [-1.7, 43.25], [-2.45, 42.47],
      // Then southwest along the Iberian System. This is the line the Celtiberian
      // wars were fought on: it turns away here rather than sweeping over the
      // plateau behind it, which nobody in Rome governed until Numantia fell.
      [-2.4, 41.5], [-2.9, 40.7], [-3.6, 40.0], [-4.8, 39.4], [-6.0, 38.6], [-7.0, 38.0], [-7.6, 37.4],
    ],
  },
  {
    // 133: Numantia. The two Spanish wars end within six years of each other —
    // Viriathus murdered in 139, Numantia starved out in 133 — and the provinces
    // stop being coastal strips with a war behind them. Holding the same Ebro
    // envelope to the end of the atlas was the largest error left on this map: it
    // showed Sertorius holding a Roman army for eight years in country the map
    // said was not Roman, and Caesar campaigning to the Atlantic across a blank.
    //
    // The north-west is deliberately not included. Brutus reached Gallaecia in 137
    // and Caesar the Atlantic coast in 60, but the Cantabri and Astures were not
    // held: Augustus needed ten years and eight legions to finish that, and he
    // finished it in 19, a decade after this atlas closes.
    id: "rome-iberia-interior", polity: "rome", name: "Roman Iberia", mapLabel: "IBERIA", fromYear: -133, toYear: -30, certainty: "probable", labelAt: [-3.6, 39.6],
    ring: [
      // The southern and eastern coasts, offshore, round to Cap de Creus.
      [-7.6, 36.6], [-6.2, 36.0], [-4.6, 36.4], [-2.8, 36.5], [-1.4, 37.2], [-0.5, 38.1], [0.1, 38.9], [0.3, 39.8], [0.9, 40.5], [1.6, 41.0], [2.4, 41.4], [3.4, 42.45],
      // The Pyrenean frontier west, carried just north of the crest.
      [2.4, 42.6], [1.4, 42.7], [0.4, 42.8], [-0.6, 43.0], [-1.7, 43.25],
      // The Cantabrian frontier: the southern limit of the unconquered north-west.
      [-2.6, 43.1], [-3.8, 42.9], [-5.0, 42.5], [-6.2, 42.0], [-7.4, 41.4], [-8.4, 41.0],
      // Down the Atlantic coast of Lusitania and round Cape St Vincent, offshore.
      [-9.4, 40.4], [-9.7, 39.2], [-9.6, 38.0], [-9.2, 37.0], [-8.4, 36.7],
    ],
  },

  // ── Gauls: the two zones part along the Alpine arc ────────────────────────
  {
    id: "gaul-cisalpine", polity: "gaul", name: "Cisalpine Gauls", mapLabel: "CISALPINE GAULS", fromYear: -395, toYear: -30, certainty: "probable", labelAt: [10.0, 45.2],
    ring: [
      // The Alpine crest from the Maritime Alps round to the Carnic Alps, carried
      // a little west of the crest so it overlaps the Transalpine zone rather than
      // abutting it. Authored separately, the two lines left a pale crack running
      // the length of the Alps — between two zones of the same colour, which made
      // it read as a rendering fault rather than a frontier.
      [7.2, 44.2], [6.3, 44.9], [6.3, 45.5], [6.2, 46.05], [8.4, 46.2], [9.5, 46.4], [10.6, 46.5], [11.6, 46.6], [12.6, 46.4], [13.4, 45.9],
      // Adriatic head, then the Apennine watershed back west — this line is the
      // visible Roman frontier, so it carries the detail.
      [13.2, 45.4], [12.6, 44.2], [11.9, 44.15], [11.2, 44.3], [10.5, 44.5], [9.9, 44.6], [9.3, 44.65], [8.7, 44.55], [7.9, 44.35],
    ],
  },
  {
    // The Celtic peoples of the eastern Alps — the Taurisci, and the kingdom Roman
    // writers call Noricum. Drawn for the whole atlas because nothing in the atlas
    // changes who held it: Noricum was Rome's ally and its iron supplier throughout,
    // and was not annexed until 16 BCE, after this map closes. It is here because
    // the Cimbri came through it in 113 and destroyed a consular army at Noreia,
    // which the map was showing happening in no country at all.
    id: "gaul-noricum", polity: "gaul", name: "Noricans and Taurisci", mapLabel: "NORICUM", fromYear: -509, toYear: -30, certainty: "speculative", labelAt: [14.4, 46.9],
    note: "A people and a trading partner, not a mapped state. What is known of the Norican kingdom's extent comes from where its iron and coinage turn up and from where Roman armies met it; this outline is the eastern Alps and their northern valleys — the ground Noreia was fought on — and no edge of it was ever surveyed or agreed.",
    ring: [
      // Carried west into the Cisalpine zone so the two cannot leave a crack, then
      // along the northern limit of the Alpine valleys.
      [12.6, 46.3], [13.0, 46.9], [13.8, 47.3], [14.8, 47.6], [15.8, 47.5],
      // The eastern and southern limits, back to the Carnic Alps.
      [16.0, 46.9], [15.4, 46.4], [14.4, 46.2], [13.4, 46.1],
    ],
  },
  {
    // The Senones, who held the Adriatic coast from the Rubicon down to the Aesis
    // and came through it to sack Rome in 390 — the atlas draws that invasion, and
    // drew its first leg on nobody's ground. Their country was annexed outright in
    // 283 after Rome beat them at Lake Vadimon, which is why this zone ends where
    // the peninsular Roman one begins rather than running on like the other Gallic
    // zones.
    id: "gaul-senones", polity: "gaul", name: "The Senones", mapLabel: "SENONES", fromYear: -509, toYear: -284, certainty: "probable", labelAt: [12.9, 43.8],
    ring: [
      // North into the Cisalpine zone so the two share an edge, then down the coast
      // to the Aesis, held offshore.
      [12.2, 44.4], [12.9, 44.3], [13.4, 43.9], [13.8, 43.5],
      // Back inland along the Apennine flank.
      [13.3, 43.3], [12.7, 43.6], [12.3, 44.0],
    ],
  },
  {
    id: "gaul-transalpine", polity: "gaul", name: "Transalpine Gauls", mapLabel: "GAULS", fromYear: -509, toYear: -122, certainty: "speculative", labelAt: [2.0, 44.6],
    note: "The Pyrenees, the Alps, the Rhine and the sea are real limits. Gaul is drawn to them because that is as far as the atlas has evidence of Roman warfare — Caesar fought the Belgae on the Sambre and bridged the Rhine twice — and no further, because where Celtic settlement ended beyond the river is not something this map has any business claiming.",
    ring: [
      // Pyrenean frontier, from the Mediterranean to the Bay of Biscay.
      [3.4, 42.3], [2.4, 42.35], [1.4, 42.5], [0.4, 42.6], [-0.6, 42.8], [-1.6, 43.1], [-2.0, 43.6],
      // Atlantic seaboard, held offshore, round Armorica to the Channel. The
      // northern limit used to stop at about 46.8° — a line drawn when the atlas
      // ended in 100 BCE and had no business north of it. Caesar's campaigns are
      // fought over the ground above it: Bibracte, Alesia and the Sabis all sat
      // outside the zone, so the map showed a Roman siege on nobody's country in
      // a year it also said Gaul was Roman.
      [-1.8, 44.8], [-2.4, 46.2], [-3.4, 47.4], [-5.2, 48.3], [-3.4, 49.0], [-1.6, 49.6], [0.4, 50.0], [2.0, 50.6],
      // The Channel and the Rhine mouths, then the river upstream. Held offshore
      // and kept south of the Straits, so no part of Britain is coloured.
      [3.4, 51.4], [5.0, 51.9], [6.4, 51.7], [6.6, 50.6], [7.4, 50.0], [8.2, 49.0], [7.8, 48.2], [7.6, 47.5],
      // Down the western flank of the Alps to the Mediterranean, stopping on the
      // Var — the limit the province of 121 inherits. Carried further east, the
      // conquest of southern Gaul showed as the Ligurian coast going blank.
      [6.9, 46.4], [6.6, 45.6], [6.8, 45.0], [7.0, 44.5], [7.4, 43.9],
      // Gulf of Lion, held offshore so no coastal strip is left pale.
      [6.4, 43.2], [5.2, 43.0], [4.2, 43.1], [3.2, 42.8],
    ],
  },
  {
    // 121 onwards: the Mediterranean coast is Roman, and free Gaul begins north of
    // it. The southern edge here is the frontier of the new province rather than a
    // real feature — nobody drew a line across the Cévennes, and the two zones part
    // where Roman administration stopped rather than where Gaul did.
    id: "gaul-transalpine-reduced", polity: "gaul", name: "Transalpine Gauls", mapLabel: "GAULS", fromYear: -121, toYear: -51, certainty: "speculative", labelAt: [1.6, 45.4],
    note: "The northern, western and eastern limits are the same edges as before — the Atlantic, the Channel, the Rhine and the Alps. What is new is the southern one, and it is an administrative line drawn from the province's known extent, not a frontier anybody in Gaul would have recognised.",
    ring: [
      [-2.0, 43.6],
      [-1.8, 44.8], [-2.4, 46.2], [-3.4, 47.4], [-5.2, 48.3], [-3.4, 49.0], [-1.6, 49.6], [0.4, 50.0], [2.0, 50.6],
      [3.4, 51.4], [5.0, 51.9], [6.4, 51.7], [6.6, 50.6], [7.4, 50.0], [8.2, 49.0], [7.8, 48.2], [7.6, 47.5],
      [6.9, 46.4], [6.6, 45.6], [6.8, 45.0],
      // The limit of the new province, west to where it meets the Pyrenean
      // frontier, and then that frontier itself. Aquitania was not in the
      // province and did not stop being Gallic: running the administrative line
      // all the way to the Atlantic left the ground between it and the Pyrenees
      // uncoloured, which claimed a hole where free Gaul was.
      [5.4, 45.0], [4.2, 44.7], [2.8, 44.3], [1.4, 43.9], [0.9, 43.4],
      [0.4, 42.6], [-0.6, 42.8], [-1.6, 43.1],
    ],
  },
  {
    // Gallia Transalpina, the province that will be called Narbonensis. Rome took
    // the coast of southern Gaul largely to secure the land route to the Spanish
    // provinces it already had, and the road it built there carried every army to
    // Spain for the next century. It is also the ground the Cimbri walked over, and
    // Arausio is fought inside it.
    //
    // Drawn after the Gallic zones so the province takes the overlap: Rome is a
    // principal and this is the seam a reader actually sees.
    id: "rome-narbonensis", polity: "rome", name: "Gallia Transalpina", mapLabel: "NARBONENSIS", fromYear: -121, toYear: -30, certainty: "probable", labelAt: [4.2, 43.8],
    ring: [
      // The Pyrenean frontier with Spain, then north up the western edge.
      [3.4, 42.3], [2.4, 42.35], [1.4, 42.5], [0.4, 42.6],
      [0.6, 43.4], [1.2, 44.0], [2.6, 44.5], [4.0, 44.9], [4.8, 45.4],
      // The eastern limit at the Alps, then back to the sea, held offshore.
      [6.0, 45.2], [6.8, 44.6], [7.4, 43.9], [6.4, 43.2], [5.2, 43.0], [4.2, 43.1], [3.2, 42.8],
    ],
  },

  // ── The head of the Adriatic and Illyricum ────────────────────────────────
  //
  // The eastern shore of the Adriatic was blank for the whole atlas, and the atlas
  // fights three separate wars on it: the Istrian war of 178–177, Caesar's command
  // in Illyricum from 59, and Octavian's Dalmatian campaigns. Every one of them had
  // route waypoints standing on ground the map coloured for nobody.
  {
    // 181: Aquileia, a Latin colony planted at the head of the gulf to hold the
    // pass the Gauls and the Histri came through, and the base the Istrian war was
    // fought from two years later. Rome kept Istria after 177 and attached it to
    // Italy, so this runs to the end of the atlas.
    id: "rome-istria", polity: "rome", name: "Aquileia and Istria", mapLabel: "ISTRIA", fromYear: -181, toYear: -30, certainty: "probable", labelAt: [13.9, 45.3],
    ring: [
      // The head of the gulf, carried west into the Cisalpine zone so the seam
      // between them is not left pale, then east past Tergeste.
      [12.7, 45.5], [12.9, 46.0], [13.8, 46.1], [14.6, 45.8],
      // The eastern side of the peninsula and back up its coast, held offshore.
      [14.8, 45.2], [14.4, 44.6], [13.7, 44.5], [13.2, 44.9], [13.0, 45.3],
    ],
  },
  {
    // 59: Illyricum. Caesar's five-year command was Gaul and Illyricum together,
    // and the Illyrian half is the part nobody remembers, because he never went
    // there. It was a province all the same, and it is the shore every army bound
    // for Macedonia and Greece came ashore on — Apollonia in 200, 191 and 171,
    // Dyrrhachium in 48.
    id: "rome-illyricum", polity: "rome", name: "Illyricum", mapLabel: "ILLYRICUM", fromYear: -59, toYear: -34, certainty: "probable", labelAt: [17.6, 43.4],
    note: "A coast rather than a country. Rome had held the Illyrian seaboard through allied and tributary communities since the Illyrian wars, and Caesar was given it as a province in 59, but the interior behind the Dinaric wall was neither garrisoned nor governed — the peoples there were still raiding Italy a generation later. The inland edge is the limit of Roman reach, not a line anyone drew at the time.",
    ring: [
      // The seaboard north from the Macedonian frontier, held offshore. The southern
      // end overlaps the province of Macedonia, which is Roman too, so the two
      // cannot leave a gap between them.
      [19.4, 41.5], [19.0, 42.1], [18.2, 42.5], [17.0, 42.9], [15.8, 43.7], [14.6, 44.5], [14.3, 45.1],
      // The inland limit along the Dinaric range, back south.
      [15.4, 45.3], [16.4, 44.4], [17.6, 43.6], [18.8, 42.9], [19.8, 42.3], [20.2, 41.7],
    ],
  },
  {
    // 33: after Octavian. Three campaigning seasons up the coast and into the
    // interior against the Iapodes, the Pannonii and the Delmatae — the war that
    // took Siscia and reached the Sava. It secured a frontier that needed securing,
    // and it also kept an army in the field within reach of Italy under a commander
    // who needed to be seen to have fought, which was probably the point.
    id: "rome-illyricum-dalmatia", polity: "rome", name: "Illyricum after the Dalmatian campaigns", mapLabel: "ILLYRICUM", fromYear: -33, toYear: -30, certainty: "probable", labelAt: [17.6, 44.1],
    ring: [
      [19.4, 41.5], [19.0, 42.1], [18.2, 42.5], [17.0, 42.9], [15.8, 43.7], [14.6, 44.5], [14.3, 45.1],
      // The interior, out to the Sava country the campaigns of 35–33 reached.
      [15.4, 45.8], [16.8, 45.7], [18.0, 45.1], [19.0, 44.3], [19.6, 43.2], [20.0, 42.4], [20.2, 41.7],
    ],
  },

  // ── The islands ───────────────────────────────────────────────────────────
  //
  // Sicily, Sardinia and Corsica were always drawn. These four were not, and three
  // of them were provinces: an atlas that colours Macedonia and Asia and leaves
  // Crete and Cyprus white is not making a claim about evidence, it is simply
  // missing them.
  {
    // Punic Malta, taken by the consul Sempronius in the first weeks of the Second
    // Punic War and held by Rome from then on.
    id: "carthage-melita", polity: "carthage", name: "Carthaginian Melita", mapLabel: "MELITA", fromYear: -509, toYear: -219, certainty: "probable", labelAt: [14.44, 35.9],
    // Malta and Gozo, held close: the pair lies on a diagonal, and a rounder ring
    // round both would enclose far more sea than island.
    ring: [[14.13, 36.04], [14.20, 36.12], [14.34, 36.11], [14.41, 36.02], [14.52, 36.00], [14.63, 35.92], [14.59, 35.79], [14.45, 35.75], [14.33, 35.82], [14.29, 35.96]],
  },
  {
    id: "rome-melita", polity: "rome", name: "Melita", mapLabel: "MELITA", fromYear: -218, toYear: -30, certainty: "attested", labelAt: [14.44, 35.9],
    // Malta and Gozo, held close: the pair lies on a diagonal, and a rounder ring
    // round both would enclose far more sea than island.
    ring: [[14.13, 36.04], [14.20, 36.12], [14.34, 36.11], [14.41, 36.02], [14.52, 36.00], [14.63, 35.92], [14.59, 35.79], [14.45, 35.75], [14.33, 35.82], [14.29, 35.96]],
  },
  {
    // 122: the Balearics, taken by Metellus for suppressing piracy that was
    // interfering with the sea road to Spain — the same reason Rome took southern
    // Gaul the year before. The islanders' slingers had served Carthage at Cannae.
    id: "rome-balearics", polity: "rome", name: "The Balearic islands", mapLabel: "BALEARES", fromYear: -122, toYear: -30, certainty: "attested", labelAt: [2.9, 39.6],
    ring: [
      [2.2, 39.4], [2.6, 40.0], [3.4, 40.0], [3.9, 40.2], [4.4, 40.2], [4.4, 39.8], [3.5, 39.2], [2.6, 39.2],
    ],
  },
  {
    // 67: Crete, after a three-year war against the island's cities for harbouring
    // the pirates Pompey was clearing out of the eastern sea. Before that it was a
    // country of independent cities, which is left uncoloured on the same rule the
    // Anatolian kingdoms are: Rome fought it, and did not hold it.
    id: "rome-crete", polity: "rome", name: "Crete", mapLabel: "CRETE", fromYear: -67, toYear: -30, certainty: "attested", labelAt: [24.9, 35.2],
    ring: [
      [23.3, 35.3], [23.4, 35.8], [24.6, 36.0], [25.8, 35.9], [26.6, 35.6], [26.4, 35.0], [25.2, 34.7], [24.0, 34.7], [23.3, 34.9],
    ],
  },
  {
    // Ptolemaic Cyprus: the one part of the empire outside Egypt and Cyrenaica that
    // the dynasty never lost, and often the appanage of a second king. Drawn with
    // Egypt because it is the same state, and leaving it out made the Ptolemaic zone
    // contradict itself.
    id: "ptolemaic-cyprus", polity: "ptolemaic", name: "Ptolemaic Cyprus", mapLabel: "CYPRUS", fromYear: -264, toYear: -59, certainty: "probable", labelAt: [33.2, 35.0],
    ring: [
      [32.0, 34.9], [32.2, 35.5], [33.2, 35.9], [34.2, 35.9], [34.9, 35.8], [34.5, 35.0], [33.4, 34.4], [32.4, 34.4],
    ],
  },
  {
    // 58: annexed by a law of Clodius, for no better reason than that the treasury
    // wanted the money and Cato could be got out of Rome by being sent to fetch it.
    // No war, no campaign, and the only province in the atlas acquired as an errand.
    id: "rome-cyprus", polity: "rome", name: "Cyprus", mapLabel: "CYPRUS", fromYear: -58, toYear: -30, certainty: "attested", labelAt: [33.2, 35.0],
    ring: [
      [32.0, 34.9], [32.2, 35.5], [33.2, 35.9], [34.2, 35.9], [34.9, 35.8], [34.5, 35.0], [33.4, 34.4], [32.4, 34.4],
    ],
  },

  // ── The peoples of Iberia ─────────────────────────────────────────────────
  //
  // Rome and Carthage fought in Spain for two hundred years, and for most of that
  // time most of Spain belonged to neither. The atlas used to say so by leaving it
  // white, and white is a different claim: here it read as ground outside the
  // story, the way Germania and the Sahara are outside it. But this is where
  // Numantia was starved out, where Viriathus beat or evaded eight commanders in
  // a row, and where Sertorius held a Roman army for eight years — all of it in
  // this atlas already, drawn on land it coloured for nobody.
  //
  // Both zones are envelopes, not frontiers, and they are drawn as one colour for
  // dozens of peoples because no source lets anyone draw the lines between them.
  // The principals are painted after a minor power, so they take every acre they
  // hold: what a reader sees in this colour is exactly the ground no province
  // claimed, and there is no seam between the two.
  {
    id: "iberia-free", polity: "iberian", name: "Iberian, Celtiberian and Lusitanian peoples", mapLabel: "IBERIANS", fromYear: -509, toYear: -134, certainty: "speculative", labelAt: [-5.2, 41.1],
    note: "Not a polity, and no line on it is a border. Dozens of independent peoples held this ground — Celtiberians, Lusitanians, Vaccaei, Vettones, Cantabri, Turdetani and more — warring with each other as often as with anyone else, and nothing survives that would let the map divide them. The outline covers the whole peninsula so that the Barcid and Roman provinces drawn over it show where those authorities actually reached; what is left in this colour is simply the ground that was nobody's but its own.",
    ring: [
      // The Cantabrian coast west from the Basque country, offshore.
      [-1.4, 43.5], [-3.0, 43.7], [-4.8, 43.8], [-6.6, 43.9], [-8.2, 43.9], [-9.4, 43.2],
      // The Atlantic seaboard south to Cape St Vincent, offshore throughout.
      [-9.4, 42.0], [-9.6, 40.6], [-9.8, 39.2], [-9.6, 37.8], [-9.0, 36.9],
      // The southern and eastern coasts, offshore. Everything from here round to
      // the Pyrenees is ground a principal takes as soon as it holds any of it, so
      // carrying the envelope over all of it costs nothing and guarantees that no
      // pale strip is ever left on a coast of the peninsula.
      [-7.4, 36.4], [-6.0, 35.8], [-4.4, 36.2], [-2.6, 36.3], [-1.2, 37.1], [-0.3, 38.1], [0.4, 39.6], [1.2, 40.8], [2.6, 41.5], [3.4, 42.45],
      // The Pyrenean frontier west, carried just north of the crest so the Gallic
      // zone takes the overlap rather than a thread being left between them.
      [2.4, 42.6], [1.4, 42.7], [0.4, 42.8], [-0.6, 43.0],
    ],
  },
  {
    // 133 onwards: what is left when the provinces reach the plateau. The Cantabri,
    // Astures and Callaeci were raided, beaten and triumphed over repeatedly and
    // still not held, and the atlas ends before the war that finally held them. So
    // the north-west stays theirs to the last frame.
    //
    // The inland edge runs well south of the frontier the province draws, so Rome
    // takes the overlap and the visible line is the Roman one.
    id: "iberia-northwest", polity: "iberian", name: "Cantabri, Astures and Callaeci", mapLabel: "CANTABRI & CALLAECI", fromYear: -133, toYear: -30, certainty: "probable", labelAt: [-6.4, 42.9],
    ring: [
      // The Atlantic and Cantabrian coasts, offshore, from the Minho round to the
      // Basque country.
      [-9.2, 41.8], [-9.4, 43.2], [-8.2, 43.9], [-6.6, 43.9], [-4.8, 43.8], [-3.0, 43.7], [-1.4, 43.5],
      // The inland limit, carried south into the province's ground.
      [-2.0, 42.8], [-3.2, 42.5], [-4.4, 42.0], [-5.6, 41.6], [-6.8, 41.0], [-8.0, 40.6],
    ],
  },

  // ── Numidia ──────────────────────────────────────────────────────────────
  {
    id: "numidia-early", polity: "numidia", name: "Numidian kingdoms", mapLabel: "NUMIDIA", fromYear: -264, toYear: -202, certainty: "probable", labelAt: [4.4, 35.6],
    ring: [
      // Mediterranean coast, offshore, from the Mulucha to the Carthaginian line.
      [-1.2, 35.6], [-0.4, 36.2], [0.6, 36.9], [1.8, 37.1], [3.0, 37.2], [4.4, 37.3], [5.6, 37.3], [6.6, 37.4],
      // Thabraca frontier with Carthage, then the Saharan limit westward. The
      // frontier is carried east of the line Carthage authors, so the two zones
      // overlap: Carthage is drawn later and takes the contested ground, which
      // makes its line the visible one instead of leaving a pale strip between
      // two powers that were nowhere near this far apart.
      [7.6, 36.7], [7.7, 35.8], [7.9, 34.9], [5.4, 34.0], [3.8, 33.6], [2.2, 33.6], [0.6, 34.2], [-0.8, 34.8],
    ],
  },
  {
    // Enlarged by Rome after Zama at Carthage's expense.
    id: "numidia-masinissa", polity: "numidia", name: "Numidia (Masinissa)", mapLabel: "NUMIDIA", fromYear: -201, toYear: -149, certainty: "probable", labelAt: [4.4, 35.6],
    ring: [
      [-1.8, 35.4], [-1.0, 36.2], [0.2, 36.9], [1.6, 37.1], [3.0, 37.2], [4.6, 37.3], [6.0, 37.4], [7.2, 37.4],
      [7.8, 36.6], [7.9, 35.6], [8.4, 34.6], [6.0, 33.8], [4.2, 33.4], [2.4, 33.4], [0.6, 33.8], [-1.2, 34.6],
    ],
  },
  {
    // Masinissa died in 148 after sixty years on the throne, and the zone stops
    // carrying his name with him. The ground does not change: what changes is who
    // is in it — Micipsa, then a disputed succession between his sons and his
    // adopted nephew Jugurtha, who had learned the Roman army from inside it at
    // Numantia and spent the next seven years proving Rome could not catch him.
    id: "numidia-kingdom", polity: "numidia", name: "Numidia", mapLabel: "NUMIDIA", fromYear: -148, toYear: -47, certainty: "probable", labelAt: [4.4, 35.6],
    ring: [
      [-1.8, 35.4], [-1.0, 36.2], [0.2, 36.9], [1.6, 37.1], [3.0, 37.2], [4.6, 37.3], [6.0, 37.4], [7.2, 37.4],
      // The south-eastern corner reaches the pre-desert. Jugurtha's war was fought
      // by never being where a Roman army could reach water, and the corner as cut
      // left the campaign's deepest march outside the kingdom it was fought in.
      [7.8, 36.6], [7.9, 35.6], [8.7, 34.1], [6.0, 33.8], [4.2, 33.4], [2.4, 33.4], [0.6, 33.8], [-1.2, 34.6],
    ],
  },
  {
    // The Emporia, taken from Carthage around 162 and held detached from Numidia
    // proper — Carthaginian Byzacena still lay between them. Drawn as its own zone
    // because that is what it was: a seizure, not a frontier moving. Without it the
    // Tripolitanian shore would go blank in 161 and read as nobody's, when the
    // whole point is that it had changed hands and Carthage could not answer.
    // The western end runs back past the Byzacene frontier Carthage keeps, so the
    // two abut instead of leaving the shore of the lesser Syrtis belonging to
    // neither. Carthage — and after 146 the province of Africa — is drawn later
    // and takes the overlap, so the visible line is the one authored there.
    id: "numidia-emporia", polity: "numidia", name: "The Emporia under Masinissa", mapLabel: "EMPORIA", fromYear: -161, toYear: -47, certainty: "probable", labelAt: [13.2, 32.6],
    ring: [
      [9.8, 33.7], [10.4, 32.95], [11.6, 32.4], [13.0, 31.8], [14.6, 31.8], [15.6, 31.7],
      [15.8, 32.5], [14.6, 32.9], [13.2, 33.2], [10.8, 34.1],
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
    id: "rome-africa", polity: "rome", name: "Province of Africa", mapLabel: "AFRICA", fromYear: -146, toYear: -30, certainty: "attested", labelAt: [9.9, 36.2],
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
      // The western edge is the one the province keeps in 228 and Rome inherits in
      // 206. Drawn wider here, Hasdrubal's expansion to the Ebro showed on the map
      // as Barcid Iberia losing the Algarve in the same year.
      [-2.0, 38.8], [-3.4, 39.0], [-4.8, 38.8], [-6.2, 38.4], [-7.0, 38.0], [-7.6, 37.4],
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
    // Held inside the Roman ring it is drawn over, so that Hannibal's recall in
    // 202 gives the ground back to Rome rather than to nobody.
    ring: [[16.0, 40.0], [16.6, 39.7], [17.0, 39.2], [16.9, 38.7], [16.2, 38.2], [15.7, 38.7], [15.8, 39.4]],
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
    note: "Not any single year's border. Syracusan power swung enormously across these two and a half centuries — Gelon, Dionysius I with an empire reaching into southern Italy, Agathocles — and this is one outline at its habitual reach, drawn because none of it is part of Rome's story until 264.",
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
    id: "greek-states", polity: "greek", name: "Greek states", mapLabel: "GREEK STATES", fromYear: -197, toYear: -30, certainty: "probable", labelAt: [22.4, 38.6],
    ring: [
      // The northern edge is carried a little past Olympus and the Macedonian
      // frontier rather than stopping short of it. Macedon is a principal and the
      // freed states a minor power, so the principal takes the overlap and its
      // line is what a reader sees; authored to stop short instead, the two left
      // an unclaimed thread the width of the frontier running across Greece.
      [19.2, 40.5], [20.2, 40.3], [21.2, 40.3], [22.2, 40.3], [23.2, 40.4], [24.2, 40.6],
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
    id: "rome-macedonia", polity: "rome", name: "Province of Macedonia", mapLabel: "MACEDONIA", fromYear: -148, toYear: -30, certainty: "attested", labelAt: [22.2, 41.2],
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
      // Anatolian coast and the eastern limits. The Propontis shore stops short of
      // Bithynia, which was an independent kingdom throughout and is not Seleucid
      // to lose: drawn over it, the alliance with Attalus in 200 showed as the
      // shore of the Propontis going blank rather than changing hands.
      [26.0, 40.4], [28.0, 40.5], [29.5, 40.3], [30.2, 41.2], [32.0, 42.2], [34.0, 42.2], [36.0, 41.6], [38.0, 40.4], [40.0, 39.0],
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
    id: "seleucid-apamea", polity: "seleucid", name: "Seleucid Empire after Apamea", mapLabel: "SELEUCIDS", fromYear: -188, toYear: -64, certainty: "attested", labelAt: [37.4, 36.2],
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
    id: "pergamon-apamea", polity: "pergamon", name: "Attalid and Rhodian gains at Apamea", mapLabel: "PERGAMUM & RHODES", fromYear: -188, toYear: -130, certainty: "attested", labelAt: [29.5, 38.8],
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
    // The province of Asia, 129. Attalus III left his kingdom to the Roman people in
    // his will in 133; Aristonicus refused to be inherited and it took three
    // campaigns and a dead consul to take possession. It is the richest thing Rome
    // governs and the first province acquired without a war to acquire it — and its
    // taxes are farmed out at auction to Roman companies, which is the arrangement
    // that will make Mithridates welcome here in a generation.
    //
    // Smaller than the Attalid inheritance: the eastern districts were given away to
    // client kings and Rhodes' old share had been detached long before.
    id: "rome-asia", polity: "rome", name: "Province of Asia", mapLabel: "ASIA", fromYear: -129, toYear: -89, certainty: "attested", labelAt: [28.5, 38.6],
    ring: [
      [25.8, 40.4], [27.0, 40.7], [28.4, 40.6], [29.6, 40.6],
      [30.4, 40.0], [31.0, 39.4], [31.2, 38.6],
      [30.6, 37.6], [29.8, 37.0], [29.0, 36.6],
      [28.4, 36.0], [27.2, 36.6], [26.6, 37.4], [26.6, 38.2], [26.0, 38.9], [25.8, 39.8],
    ],
  },
  {
    // 88–85: Asia overrun. Mithridates took the province in a season and then had
    // every Roman and Italian in it killed on a single coordinated day — eighty
    // thousand people, by the lowest ancient figure. The province is drawn as his
    // because for four years it was, and because the massacre is the reason Sulla's
    // peace terms in 85 were thought scandalously lenient.
    id: "pontus-asia", polity: "pontus", name: "Asia under Mithridates", mapLabel: "MITHRIDATES", fromYear: -88, toYear: -85, certainty: "attested", labelAt: [28.5, 38.6],
    ring: [
      [25.8, 40.4], [27.0, 40.7], [28.4, 40.6], [29.6, 40.6],
      [30.4, 40.0], [31.0, 39.4], [31.2, 38.6],
      [30.6, 37.6], [29.8, 37.0], [29.0, 36.6],
      [28.4, 36.0], [27.2, 36.6], [26.6, 37.4], [26.6, 38.2], [26.0, 38.9], [25.8, 39.8],
    ],
  },
  {
    // 84 onwards: the province restored, and made to pay for the four years it was
    // not Roman. Sulla fined it twenty thousand talents, which the cities borrowed
    // from Roman financiers at rates that had them still paying in Caesar's day.
    id: "rome-asia-restored", polity: "rome", name: "Province of Asia", mapLabel: "ASIA", fromYear: -84, toYear: -30, certainty: "attested", labelAt: [28.5, 38.6],
    ring: [
      [25.8, 40.4], [27.0, 40.7], [28.4, 40.6], [29.6, 40.6],
      [30.4, 40.0], [31.0, 39.4], [31.2, 38.6],
      [30.6, 37.6], [29.8, 37.0], [29.0, 36.6],
      [28.4, 36.0], [27.2, 36.6], [26.6, 37.4], [26.6, 38.2], [26.0, 38.9], [25.8, 39.8],
    ],
  },
  {
    // Pontus proper: the Black Sea kingdom Mithridates ruled for over fifty years
    // and fought Rome from for nearly thirty. Drawn from 88, when he becomes Rome's
    // problem, on the same rule every eastern power on this map follows.
    id: "pontus-kingdom", polity: "pontus", name: "Pontus under Mithridates", mapLabel: "PONTUS", fromYear: -88, toYear: -64, certainty: "probable", labelAt: [36.5, 40.6],
    ring: [
      // The Black Sea coast, held offshore, from Paphlagonia east to Colchis.
      [33.6, 42.4], [35.2, 42.6], [36.8, 42.4], [38.4, 41.8], [39.8, 41.6],
      // The inland limit along the Anatolian plateau, back west.
      [40.4, 40.6], [39.4, 39.8], [37.8, 39.6], [36.2, 39.8], [34.8, 40.2], [33.8, 41.0],
    ],
  },
  {
    // 63: Pompey annexes the kingdom he did not conquer — Lucullus had beaten
    // Mithridates and been recalled — and joins it to Bithynia, which Rome had also
    // been left in a will. The Black Sea coast is Roman from here to the Empire.
    id: "rome-pontus", polity: "rome", name: "Bithynia and Pontus", mapLabel: "PONTUS", fromYear: -63, toYear: -30, certainty: "attested", labelAt: [36.5, 40.6],
    ring: [
      [33.6, 42.4], [35.2, 42.6], [36.8, 42.4], [38.4, 41.8], [39.8, 41.6],
      [40.4, 40.6], [39.4, 39.8], [37.8, 39.6], [36.2, 39.8], [34.8, 40.2], [33.8, 41.0],
    ],
  },
  {
    // 63: Syria. Pompey ended the Seleucid dynasty by deciding it was not worth
    // restoring — the last king was simply told the settlement did not include him —
    // and organised the kingdom as a province. It is the least violent annexation in
    // the atlas and the end of one of Alexander's successor states.
    id: "rome-syria", polity: "rome", name: "Province of Syria", mapLabel: "SYRIA", fromYear: -63, toYear: -30, certainty: "attested", labelAt: [37.0, 35.4],
    // The frontier is the Seleucid one, because that is what Pompey took: a
    // kingdom reorganised as a province, not a conquest with its own limits.
    // Drawn smaller than the kingdom it replaced, it opened a band of blank
    // ground along the whole northern and eastern edge in 63 — the map losing
    // territory in the year Rome gained it. Parthia is drawn after this and
    // takes the overlap beyond the Euphrates, which is where the frontier
    // actually was.
    ring: [
      [35.8, 37.9], [37.2, 37.7], [38.6, 37.5], [40.0, 37.2],
      [41.0, 36.4], [40.4, 35.0], [39.8, 33.4], [36.6, 32.8], [35.2, 31.6], [34.2, 31.6],
      [34.6, 33.0], [35.4, 34.6], [35.6, 36.2],
    ],
  },
  {
    // Cilicia, the other half of the same settlement. Rome had held a command of
    // that name against the pirates since 102, but it was Pompey's reorganisation
    // in 64 that made it a territory: the plain behind the Taurus, the ports of
    // the rough coast, and the passes into Syria. Cicero governed it in 51 and
    // hated every month of it.
    //
    // Drawn as its own zone rather than folded into Syria because that is what it
    // was — two provinces, two governors — and because the alternative was the
    // shape the map had before: Antiochus' Cilicia in 64 and nobody's in 63.
    id: "rome-cilicia", polity: "rome", name: "Province of Cilicia", mapLabel: "CILICIA", fromYear: -63, toYear: -30, certainty: "attested", labelAt: [34.4, 36.9],
    ring: [
      // The Taurus, from the rough coast east to the Amanus and the Syrian gates.
      [33.0, 36.4], [33.6, 37.0], [34.6, 37.6], [35.8, 37.9],
      [36.4, 37.0], [36.2, 36.2],
      // Back west along the coast, held offshore throughout.
      [35.4, 35.9], [34.6, 36.0], [33.6, 36.1],
    ],
  },
  {
    // Parthia enters the map when Rome's frontier reaches it, which is the rule the
    // Seleucids and Ptolemies entered on. From 63 the two empires face each other
    // across the Euphrates; ten years later Crassus crosses it and loses seven
    // legions in a week. Only the western edge of the empire is drawn — the rest of
    // it lies beyond this map, which is itself worth knowing.
    //
    // Armenia is the one power the atlas fights and does not colour. Tigranes held
    // Syria from 83 to 69 and was beaten at Tigranocerta by Lucullus, who is drawn
    // marching there over blank ground — so this is a real omission, not a
    // judgement. Fixing it costs a tenth categorical hue in a year that already
    // draws seven, and the palette note in `data/factions.ts` says what that
    // requires: re-validating the whole set, not tinting one more entry.
    id: "parthia", polity: "parthia", name: "Parthia", mapLabel: "PARTHIA", fromYear: -63, toYear: -30, certainty: "probable", labelAt: [42.0, 34.6],
    ring: [
      [40.4, 37.4], [42.0, 37.6], [43.8, 37.2], [44.0, 30.0],
      [42.4, 30.4], [40.6, 32.0], [39.6, 33.6], [39.8, 35.4],
    ],
  },
  {
    // 50: Gaul. Eight years of campaigning, and the atlas draws it in one step
    // because that is how the conquest resolved — there was no partial Roman Gaul
    // to show. The northern and western limits are the same schematic edges the
    // Gallic zones have always carried; what has changed is who holds the ground.
    id: "rome-gaul", polity: "rome", name: "Gaul", mapLabel: "GAUL", fromYear: -50, toYear: -30, certainty: "attested", labelAt: [1.6, 45.4],
    ring: [
      [-2.0, 43.6],
      [-1.8, 44.8], [-2.4, 46.2], [-3.4, 47.4], [-5.2, 48.3], [-3.4, 49.0], [-1.6, 49.6], [0.4, 50.0], [2.0, 50.6],
      [3.4, 51.4], [5.0, 51.9], [6.4, 51.7], [6.6, 50.6], [7.4, 50.0], [8.2, 49.0], [7.8, 48.2], [7.6, 47.5],
      [6.9, 46.4], [6.6, 45.6], [6.8, 45.0],
      [5.4, 45.0], [4.2, 44.7], [2.8, 44.3], [1.4, 43.9], [0.9, 43.4],
      [0.4, 42.6], [-0.6, 42.8], [-1.6, 43.1],
    ],
  },
  {
    // 46: Africa Nova. Juba backed the losing side at Thapsus and his kingdom was
    // annexed for it — the last of the North African powers on this map to go, a
    // century after Carthage and by the same mechanism: choosing wrongly in a Roman
    // quarrel. The Emporia go with it.
    id: "rome-africa-nova", polity: "rome", name: "Africa Nova", mapLabel: "AFRICA NOVA", fromYear: -46, toYear: -30, certainty: "attested", labelAt: [4.4, 35.6],
    // The same outline as the kingdom, corner for corner — including the
    // south-eastern reach into the pre-desert, or annexing Juba's kingdom would
    // hand that strip to nobody in the year Rome took the whole of it.
    ring: [
      [-1.8, 35.4], [-1.0, 36.2], [0.2, 36.9], [1.6, 37.1], [3.0, 37.2], [4.6, 37.3], [6.0, 37.4], [7.2, 37.4],
      [7.8, 36.6], [7.9, 35.6], [8.7, 34.1], [6.0, 33.8], [4.2, 33.4], [2.4, 33.4], [0.6, 33.8], [-1.2, 34.6],
    ],
  },
  {
    // The Emporia go with the kingdom, and have to be drawn doing it. Africa Nova
    // is Numidia proper, and Byzacena lies between the two, so annexing Juba's
    // kingdom in one zone left the Tripolitanian shore — Roman ground from the
    // same settlement — blank from 46. It is the same detached strip Masinissa
    // took in 162, changing hands again by the same mechanism.
    id: "rome-emporia", polity: "rome", name: "The Emporia", mapLabel: "EMPORIA", fromYear: -46, toYear: -30, certainty: "probable", labelAt: [13.2, 32.6],
    ring: [
      [9.8, 33.7], [10.4, 32.95], [11.6, 32.4], [13.0, 31.8], [14.6, 31.8], [15.6, 31.7],
      [15.8, 32.5], [14.6, 32.9], [13.2, 33.2], [10.8, 34.1],
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
      // Back south along the desert edge of Coele-Syria, then into Sinai. This
      // line is authored identically on the Seleucid zone that takes the ground
      // at Panium, so the handover in 200 moves it from one power to the other
      // and leaves nothing behind: drawn further out, Egypt was claiming Edom and
      // the Negev, and 200 opened a blank wedge there that never closed again.
      [36.4, 32.6], [35.0, 31.4], [34.6, 31.6],
      // Sinai and the Red Sea flank, then the Nubian limit and the desert west.
      [34.6, 30.0], [34.0, 28.4], [33.4, 27.0], [33.0, 25.4], [32.6, 23.8], [31.0, 23.8], [29.0, 24.0], [26.6, 24.6], [24.2, 25.6], [22.0, 27.0], [20.4, 29.0],
    ],
  },
  {
    // 200 onwards: Panium. Antiochus takes Coele-Syria and Egypt is the Nile and
    // Cyrenaica again — the victory that freed him to turn west, and so the other
    // half of why the year 200 is a hinge on this map.
    id: "ptolemaic-egypt", polity: "ptolemaic", name: "Ptolemaic Egypt", mapLabel: "EGYPT", fromYear: -200, toYear: -31, certainty: "probable", labelAt: [29.5, 28.0],
    ring: [
      [19.6, 31.4], [20.4, 33.2], [21.8, 33.4], [23.2, 33.0], [24.6, 32.2], [26.0, 32.0], [27.4, 31.9], [28.8, 32.0], [30.2, 32.1], [31.6, 32.1], [32.8, 31.8], [34.6, 31.6],
      // The Sinai edge is the one the earlier zone also uses, so losing Coele-Syria
      // in 200 moves exactly that province and nothing else.
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
      // Down the Tiber as before. Rome's own zone is drawn after this one and
      // takes the overlap, so the visible frontier is Rome's line; authored to
      // stop short of it instead, the annexation of Veii's land in 396 left a
      // wedge on the right bank belonging to neither.
      [12.30, 43.15], [12.35, 42.70], [12.45, 42.40], [12.20, 42.15],
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
      [17.60, 40.70], [17.30, 40.25], [16.90, 39.95], [16.60, 39.55], [17.20, 39.00],
      [16.60, 38.65], [16.20, 38.05], [15.55, 38.02],
      [15.80, 38.55], [16.15, 39.15], [16.35, 39.85],
      // The inland edge is carried up over the Tarentine isthmus. Drawn tighter, as
      // it was, the arc's own neck excluded Tarentum — the largest Greek city in
      // Italy, the one that called Pyrrhus in, and the place the atlas puts him
      // ashore. He was landing on nobody's ground.
      [16.80, 40.45], [17.15, 40.65],
    ],
  },
  {
    // And the other coast. Magna Graecia ringed both seas — Cumae was the oldest
    // Greek city in Italy, Neapolis gave the region its name for the rest of
    // antiquity, and Poseidonia and Velia stood between them and the toe. Drawn as
    // the gulf arc alone, the atlas left half of Greek Italy uncoloured, including
    // the two cities a reader is most likely to look for.
    id: "magna-graecia-tyrrhenian", polity: "greek", name: "Greek cities of the Tyrrhenian coast", mapLabel: "GREEK CITIES", fromYear: -509, toYear: -273, certainty: "probable", labelAt: [14.30, 40.83],
    ring: [
      // The seaward edge, offshore, from the bay of Naples south past Palinuro to
      // the Gulf of Policastro.
      [13.95, 40.98], [14.30, 40.55], [14.90, 40.35], [15.10, 40.00], [15.55, 39.80],
      // Back north along the inland edge, kept to the coastal plains — the country
      // behind them was Campanian and Lucanian, and is not claimed here.
      [15.90, 40.02], [15.55, 40.28], [15.20, 40.42], [14.90, 40.72], [14.50, 40.90], [14.10, 40.98],
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
      // The inland edge of Campania, carried round the north of Capua. Drawn on the
      // coast instead, as it was, the lobe excluded the largest city in it: Capua
      // came over in 338 and is the whole reason Rome held Campania at all, and the
      // Samnite wars are fought from it. The line stays just west of the Samnite
      // zone's own edge, so the frontier the two wars were about is still visible.
      [14.50, 40.95], [14.30, 41.12], [14.00, 41.30], [13.70, 41.50], [13.20, 41.90],
      [12.90, 42.15], [12.40, 42.30], [12.05, 42.10], [12.00, 41.88],
    ],
  },
  {
    // 299: Umbria and Picenum brought in on the eve of the last Samnite war, so
    // Rome reaches the Adriatic and can be attacked from two seas.
    id: "rome-central-italy", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -299, toYear: -291, certainty: "probable", labelAt: [12.9, 42.35],
    ring: [
      [12.10, 41.70], [12.70, 41.35], [13.20, 41.15], [13.90, 41.15], [14.35, 40.95], [14.55, 40.72],
      // Campania round the north of Capua, as in the previous phase.
      [14.50, 40.95], [14.30, 41.12], [14.00, 41.30], [13.75, 41.60], [14.10, 41.95], [13.90, 42.40],
      // Up through Picenum. The Umbrian corner is carried north to the Sentine
      // valley: Sentinum was fought in 295 on ground annexed four years earlier,
      // and the corner as drawn stopped just short of it, so the largest battle of
      // the Samnite wars took place outside every zone on the map.
      [13.85, 42.90], [13.55, 43.35], [13.10, 43.50], [12.70, 43.45], [12.35, 42.85], [12.15, 42.40],
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
      // The northern edge: the Apennine watershed to the Arno, carried past the
      // Etruscan zone it replaces in 290 so no strip of the upper Arno is left
      // between them.
      [12.60, 43.90], [11.90, 44.00], [10.80, 44.00],
    ],
  },

  // ── After the Ides, 44–30 BCE ─────────────────────────────────────────────
  //
  // Three changes, and only three. The triumvirs divided the Roman world between
  // them twice over and none of it is drawn, for the reason the civil-war
  // factions have never held ground here: control of Roman provinces in those
  // years turned on which governor had changed sides that month, and shading
  // Italy for one triumvir would claim a frontier nobody could have walked to.
  // What is drawn is the ground that genuinely stopped being Rome's.
  {
    // Sextus Pompeius held Sicily for six years with a fleet, and used it to cut
    // the grain off from Rome whenever the city's politics needed pressure. This
    // is the exception to the rule that the civil-war factions hold no territory,
    // and it earns the exception by lasting: a stable island under one man for
    // six years is a frontier, not a front line that moved by the month. Drawn
    // over the Roman province, which it supersedes.
    id: "sextus-sicily", polity: "optimates", name: "Sicily under Sextus Pompeius", mapLabel: "SEXTUS POMPEIUS", fromYear: -42, toYear: -37, certainty: "attested", labelAt: [14.0, 37.6],
    ring: [[12.1, 38.1], [12.3, 38.5], [13.2, 38.45], [14.2, 38.4], [15.0, 38.4], [15.5, 38.35], [15.6, 37.8], [15.4, 37.1], [15.1, 36.5], [14.2, 36.4], [13.2, 36.5], [12.2, 37.3]],
  },
  {
    // 40–39: the deepest Parthian penetration into Roman territory there ever
    // was. A Parthian army with a Roman renegade at its head — Quintus Labienus,
    // son of the Labienus who died at Munda, styling himself Parthicus on his own
    // coins — took Syria and Judaea and held them for two campaigning seasons.
    // Ventidius cleared them out in 39 and killed Pacorus at Gindarus in 38.
    //
    // Drawn over the province, which it supersedes: for those two years Syria was
    // not Roman ground, and a map that showed it Roman throughout would make
    // Gindarus look like a frontier skirmish instead of a recovery.
    id: "parthia-syria", polity: "parthia", name: "Syria under Parthian occupation", mapLabel: "PARTHIAN SYRIA", fromYear: -40, toYear: -39, certainty: "probable", labelAt: [36.4, 34.2],
    // Held inside the province it overlays on every edge, so that clearing the
    // Parthians out in 38 gives Syria back to Rome rather than to nobody.
    ring: [
      [35.9, 36.9], [37.2, 36.8], [38.6, 36.4],
      [38.2, 34.6], [36.4, 32.9], [35.2, 31.9], [34.6, 31.9],
      [34.9, 33.0], [35.5, 34.6], [35.6, 36.0],
    ],
  },
  {
    // 30: Egypt. Not a province like the others — Octavian took it as a personal
    // possession, governed by a prefect of his own choosing, and forbade senators
    // to set foot in it without permission. The grain and the treasure of the
    // richest country in the Mediterranean paid off every legion in the empire,
    // which is the practical reason the civil wars stopped.
    //
    // It is the last change on this map, and the end of the atlas: the last of
    // Alexander's successor kingdoms, gone three centuries after his death.
    id: "rome-egypt", polity: "rome", name: "Egypt", mapLabel: "EGYPT", fromYear: -30, toYear: -30, certainty: "attested", labelAt: [29.5, 28.0],
    ring: [
      [19.6, 31.4], [20.4, 33.2], [21.8, 33.4], [23.2, 33.0], [24.6, 32.2], [26.0, 32.0], [27.4, 31.9], [28.8, 32.0], [30.2, 32.1], [31.6, 32.1], [32.8, 31.8], [34.6, 31.6],
      [34.6, 30.0], [34.0, 28.4], [33.4, 27.0], [33.0, 25.4], [32.6, 23.8], [31.0, 23.8], [29.0, 24.0], [26.6, 24.6], [24.2, 25.6], [22.0, 27.0], [20.4, 29.0],
    ],
  },
];

export function territoriesForYear(year: number): TerritoryPeriod[] {
  return territories.filter((period) => year >= period.fromYear && year <= period.toYear);
}
