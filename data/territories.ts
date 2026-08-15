import type { Coordinates, TerritoryPeriod } from "@/types/history";

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
// ── Frontiers, authored once ──────────────────────────────────────────────────
//
// A zone used to carry its own copy of every edge, at five or six points for a
// thousand kilometres of country. Two things went wrong with that. The lines read
// as ruled — a frontier crossing Spain in four straight chords looks surveyed and
// looks wrong, and no river or mountain range on this map is straight. And an edge
// two powers share had to be authored twice, so the Ebro existed three times and
// the Taurus twice, each copy free to drift from the others and each needing its
// own overshoot hack to stop a hairline of nobody's colour opening along the seam.
//
// So the features are authored here instead, once each, densely enough to follow
// the thing they are named after — roughly a point every twenty to thirty
// kilometres — and zones are composed out of stretches of them. Two powers that
// meet on the Ebro are now drawn on the same points, so the seam cannot open at
// all, and correcting a river corrects every zone that claims it.
//
// Only edges that cross land need this. Fills are clipped to the coastline, so a
// ring's offshore stretches draw nothing: they stay coarse on purpose, and are
// pushed well out to sea so no pale strip is ever left along a shore.
type Line = Coordinates[];
const rev = (line: Line): Line => [...line].reverse();
function nearestIndex(line: Line, at: Coordinates): number {
  let best = 0;
  let bestDistance = Infinity;
  for (let i = 0; i < line.length; i += 1) {
    const distance = (line[i][0] - at[0]) ** 2 + (line[i][1] - at[1]) ** 2;
    if (distance < bestDistance) { bestDistance = distance; best = i; }
  }
  return best;
}
/**
 * The stretch of a feature between two places, so a ring names geography rather
 * than array indices and stays correct when the feature gains detail. Endpoints
 * are matched to the nearest authored point, and the stretch comes back running
 * in the direction asked for.
 */
function stretch(line: Line, from: Coordinates, to: Coordinates): Line {
  const a = nearestIndex(line, from);
  const b = nearestIndex(line, to);
  return a <= b ? line.slice(a, b + 1) : rev(line.slice(b, a + 1));
}

// ── Iberia ────────────────────────────────────────────────────────────────────
// Anchors, so the compositions below read as places.
const CREUS: Coordinates = [3.40, 42.30];          // Cap de Creus, where the Pyrenees meet the sea
const GIBRALTAR: Coordinates = [-5.60, 35.95];     // the strait
const GUADIANA: Coordinates = [-7.60, 36.90];      // the Atlantic mouth of the Guadiana
const DOURO_MOUTH: Coordinates = [-8.95, 41.10];
const BISCAY: Coordinates = [-1.95, 43.55];        // the Basque shore
const RONCESVALLES: Coordinates = [-1.35, 43.05];  // the western Pyrenean pass
const LOGRONO: Coordinates = [-2.48, 42.46];       // the Ebro at the Rioja
const EBRO_MOUTH: Coordinates = [0.87, 40.72];
const EBRO_SEA: Coordinates = [1.00, 40.75];       // offshore of the delta
const ALICANTE_SEA: Coordinates = [-0.45, 38.25];

// The Pyrenean crest, east to west. The frontier of Iberia with Gaul for the whole
// atlas, and shared by every zone on both sides of it.
const PYRENEES: Line = [
  [3.40, 42.30], [3.21, 42.43], [2.86, 42.42], [2.52, 42.40], [2.18, 42.48], [1.86, 42.57],
  [1.58, 42.62], [1.29, 42.68], [1.00, 42.72], [0.72, 42.72], [0.44, 42.74], [0.15, 42.78],
  [-0.15, 42.83], [-0.45, 42.88], [-0.75, 42.92], [-1.05, 42.98], [-1.35, 43.05], [-1.62, 43.19],
  [-1.95, 43.55],
];

// The Ebro, traced from the delta upstream past Zaragoza to the Rioja and on to
// its head in the Cantabrian mountains. The Barcid limit of 226 and the line
// Roman Spain was divided on.
const EBRO: Line = [
  [0.87, 40.72], [0.66, 40.78], [0.44, 40.85], [0.28, 41.00], [0.10, 41.10], [-0.10, 41.20],
  [-0.32, 41.32], [-0.55, 41.45], [-0.78, 41.58], [-0.98, 41.68], [-1.22, 41.80], [-1.48, 41.92],
  [-1.75, 42.06], [-2.02, 42.20], [-2.25, 42.35], [-2.48, 42.46], [-2.75, 42.55], [-3.05, 42.65],
  [-3.35, 42.75], [-3.65, 42.85], [-3.95, 42.95], [-4.13, 43.00],
];

// The inland limit of the two Spains, and of the Barcid province Rome inherited:
// from the western Pyrenees down to the Ebro at the Rioja, south-east along the
// Iberian System, then south-west along the Sierra Morena to the Atlantic. Behind
// it lie Celtiberia, the Meseta and Lusitania, which stayed their own until the
// two wars that ended in 139 and 133.
const SPAIN_INLAND_LIMIT: Line = [
  [-1.35, 43.05], [-1.60, 42.85], [-1.85, 42.68], [-2.15, 42.55], [-2.48, 42.46],
  [-2.30, 42.10], [-2.15, 41.75], [-2.05, 41.40], [-1.95, 41.05], [-1.85, 40.75], [-1.85, 40.45],
  [-2.05, 40.20], [-2.35, 40.00], [-2.70, 39.85], [-3.05, 39.72], [-3.45, 39.60], [-3.85, 39.45],
  [-4.25, 39.30], [-4.65, 39.12], [-5.05, 38.95], [-5.45, 38.78], [-5.85, 38.62], [-6.25, 38.45],
  [-6.60, 38.25], [-6.95, 38.02], [-7.25, 37.75], [-7.50, 37.45], [-7.60, 36.90],
];

// Hamilcar's narrower base, 237–229: the Guadalquivir and the south-eastern coast,
// before Hasdrubal carried the province up to the Ebro.
const BARCID_SOUTH_LIMIT: Line = [
  [-7.60, 36.90], [-7.45, 37.35], [-7.20, 37.75], [-6.85, 38.00], [-6.45, 38.20], [-6.05, 38.35],
  [-5.65, 38.50], [-5.25, 38.60], [-4.85, 38.68], [-4.45, 38.72], [-4.05, 38.75], [-3.65, 38.75],
  [-3.25, 38.70], [-2.85, 38.60], [-2.45, 38.48], [-2.05, 38.35], [-1.65, 38.22], [-1.25, 38.12],
  [-0.45, 38.25],
];

// The southern limit of the unconquered north-west, from the mouth of the Douro
// north-east along the Cantabrian front to the Basque shore. Everything beyond it
// is Cantabrian, Asturian and Callaecian to the end of the atlas: Augustus does
// not finish that war until 19, a decade after this map closes.
const SPAIN_NORTHWEST_LIMIT: Line = [
  [-8.95, 41.10], [-8.60, 41.08], [-8.25, 41.06], [-7.90, 41.08], [-7.55, 41.14], [-7.20, 41.24],
  [-6.90, 41.36], [-6.60, 41.50], [-6.32, 41.66], [-6.05, 41.84], [-5.78, 42.02], [-5.48, 42.20],
  [-5.15, 42.34], [-4.80, 42.46], [-4.45, 42.56], [-4.10, 42.66], [-3.75, 42.76], [-3.40, 42.86],
  [-3.05, 42.96], [-2.70, 43.08], [-2.35, 43.24], [-1.95, 43.55],
];

// The coasts. Held offshore throughout and therefore never drawn — the clip stops
// every fill at the real coastline — but carried round each headland so that no
// chord cuts a peninsula off from the country it belongs to.
const IBERIA_COAST_MED: Line = [
  [3.40, 42.30], [3.15, 41.95], [2.70, 41.65], [2.20, 41.35], [1.75, 41.15], [1.30, 41.00],
  [1.00, 40.75], [0.75, 40.45], [0.45, 40.15], [0.30, 39.75], [0.35, 39.30], [0.15, 38.90],
  [-0.15, 38.60], [-0.45, 38.25], [-0.65, 37.85], [-0.95, 37.45], [-1.35, 37.25], [-1.80, 36.95],
  [-2.20, 36.65], [-2.80, 36.55], [-3.50, 36.55], [-4.20, 36.45], [-4.90, 36.30], [-5.60, 35.95],
];
const IBERIA_COAST_ATLANTIC: Line = [
  [-5.60, 35.95], [-6.05, 35.90], [-6.60, 36.35], [-7.10, 36.75], [-7.60, 36.90], [-8.20, 36.90],
  [-8.80, 36.90], [-9.15, 37.15], [-9.20, 37.60], [-9.20, 38.10], [-9.45, 38.60], [-9.60, 39.10],
  [-9.55, 39.60], [-9.35, 40.10], [-9.10, 40.60], [-8.95, 41.10], [-8.95, 41.60], [-9.05, 42.10],
  [-9.40, 42.60], [-9.35, 43.10], [-8.80, 43.60], [-8.10, 43.85], [-7.40, 43.90], [-6.70, 43.85],
  [-6.00, 43.80], [-5.30, 43.75], [-4.60, 43.70], [-3.90, 43.65], [-3.20, 43.60], [-2.50, 43.55],
  [-1.95, 43.55],
];

// ── Gaul, the Alps and the Apennines ──────────────────────────────────────────
const ALPS_VAR: Coordinates = [7.40, 43.90];       // where the Alps meet the sea
const ALPS_GENEVA: Coordinates = [6.60, 46.10];    // the western flank turns east
const RUBICON: Coordinates = [12.50, 44.14];       // the Adriatic end of the watershed
const APENNINE_MAGRA: Coordinates = [9.70, 44.45]; // where Rome's Italy leaves off and Liguria begins
const PYRENEES_ARIEGE: Coordinates = [0.44, 42.74];

// The Alpine arc: north up the western flank from the sea at the Var to the Léman,
// then east along the crest to the Carnic Alps at the head of the Adriatic. The
// Gallic zones part on it, Italy stops at it, and the province of Narbonensis ends
// on it — all of them now on the same points.
const ALPS: Line = [
  [7.40, 43.90], [7.20, 44.15], [7.00, 44.40], [6.85, 44.65], [6.75, 44.90], [6.65, 45.15],
  [6.70, 45.40], [6.75, 45.65], [6.80, 45.90], [6.60, 46.10],
  [7.00, 46.20], [7.40, 46.25], [7.80, 46.30], [8.20, 46.35], [8.60, 46.40], [9.00, 46.45],
  [9.40, 46.50], [9.80, 46.55], [10.20, 46.60], [10.60, 46.68], [11.00, 46.76], [11.40, 46.84],
  [11.80, 46.80], [12.20, 46.72], [12.60, 46.64], [13.00, 46.56], [13.40, 46.48],
];

// The Rhine, from the mouths upstream past Koblenz, Mainz and Strasbourg to Basel.
// Caesar bridged it twice and did not stay, which is exactly why Gaul stops here.
const RHINE: Line = [
  [4.40, 51.95], [4.90, 51.90], [5.40, 51.85], [5.90, 51.80], [6.15, 51.70], [6.45, 51.66],
  [6.70, 51.45], [6.78, 51.23], [6.90, 51.05], [6.98, 50.92], [7.08, 50.72], [7.25, 50.55],
  [7.60, 50.36], [7.90, 50.20],
  [8.15, 50.05], [8.30, 49.85], [8.36, 49.63], [8.43, 49.32], [8.42, 49.00], [8.20, 48.80],
  [7.95, 48.65], [7.75, 48.58], [7.65, 48.30], [7.58, 48.03], [7.55, 47.80], [7.59, 47.56],
];

// The Jura, closing Gaul's eastern side between the Rhine at Basel and the Alps
// at the Léman.
const JURA: Line = [
  [7.59, 47.56], [7.30, 47.45], [7.00, 47.34], [6.72, 47.20], [6.46, 47.02], [6.22, 46.82],
  [6.02, 46.62], [5.94, 46.42], [6.12, 46.24], [6.60, 46.10],
];

// The Apennine watershed, from the Ligurian junction with the Alps east to the
// Adriatic at the Rubicon. Rome's northern limit and the Cisalpine zone's southern
// one: one line, so the frontier of Italy is a single edge rather than two.
const APENNINES: Line = [
  [7.90, 44.35], [8.20, 44.30], [8.50, 44.35], [8.80, 44.45], [9.10, 44.50], [9.40, 44.50],
  [9.70, 44.45], [10.00, 44.40], [10.30, 44.30], [10.60, 44.25], [10.90, 44.20], [11.20, 44.15],
  [11.50, 44.10], [11.80, 44.05], [12.10, 44.05], [12.30, 44.08], [12.50, 44.14],
];

// Gaul's seaward edges, all held well offshore and therefore never drawn — but
// carried round Armorica, the Gironde and the Rhône delta, so no chord cuts a
// headland off from the country behind it.
const GAUL_COAST_MED: Line = [
  [3.40, 42.30], [3.10, 42.60], [3.20, 42.95], [3.55, 43.15], [4.00, 43.25], [4.50, 43.20],
  [4.90, 43.10], [5.30, 43.05], [5.70, 42.95], [6.20, 42.95], [6.70, 43.00], [7.10, 43.30],
  [7.40, 43.90],
];
const GAUL_COAST_ATLANTIC: Line = [
  [-1.95, 43.55], [-1.80, 44.80], [-2.40, 46.20], [-3.40, 47.40], [-5.20, 48.30], [-3.40, 49.00],
  [-1.60, 49.60], [0.40, 50.00], [2.00, 50.60], [3.40, 51.40], [4.40, 51.95],
];

// The northern limit of the province of 121, from the Pyrenees round the Cévennes
// to the Alps. Not a feature anybody could walk to — it is where Roman
// administration stopped, not where Gaul did — but it is the line the two zones
// part on, so it is drawn as carefully as if it were.
const NARBO_ALPS: Coordinates = [6.25, 45.10];     // where the province limit meets the Alps
const NARBONENSIS_LIMIT: Line = [
  [0.44, 42.74], [0.55, 43.05], [0.70, 43.35], [0.95, 43.65], [1.25, 43.90], [1.60, 44.10],
  [2.00, 44.25], [2.40, 44.40], [2.80, 44.50], [3.20, 44.60], [3.60, 44.70], [4.00, 44.85],
  [4.35, 45.05], [4.70, 45.25], [5.10, 45.35], [5.50, 45.35], [5.90, 45.25], [6.25, 45.10],
  [6.60, 44.85], [6.90, 44.55], [7.15, 44.20], [7.40, 43.90],
];

// Free Gaul once the province exists: the same Atlantic, Channel, Rhine and Alpine
// edges as before, with the province's limit for a southern one. Authored once and
// used twice, because the ground Caesar takes in 50 is exactly the ground that was
// Gallic in 51 — if the two rings ever drifted apart, the conquest would show as a
// strip of country changing shape rather than changing hands.
const GAUL_OUTSIDE_THE_PROVINCE: Line = [
  ...GAUL_COAST_ATLANTIC,
  ...RHINE,
  ...JURA,
  ...stretch(ALPS, ALPS_GENEVA, [6.65, 45.15]),
  ...stretch(NARBONENSIS_LIMIT, NARBO_ALPS, PYRENEES_ARIEGE),
  ...stretch(PYRENEES, PYRENEES_ARIEGE, BISCAY),
];

// ── Africa ────────────────────────────────────────────────────────────────────
const MULUCHA_SEA: Coordinates = [-2.10, 35.40];   // the Mauretanian frontier at the coast
const THABRACA_SEA: Coordinates = [8.60, 37.30];   // where the Carthaginian frontier meets the sea
const GABES_SEA: Coordinates = [10.85, 33.65];     // the Lesser Syrtis
const SIRTE_SEA: Coordinates = [16.30, 31.55];     // the far end of the Emporia
const FOSSA_CHOTTS: Coordinates = [9.58, 35.42];   // where the frontier meets the Numidian landward limit

// The African shore, from the Mulucha round to the Syrtes. Offshore throughout —
// but carried into the Gulf of Gabès and round Cap Bon, so no chord swallows
// Djerba or cuts the Cape off from its own hinterland.
const AFRICA_COAST: Line = [
  [-2.10, 35.40], [-1.40, 35.85], [-0.70, 36.10], [0.10, 36.60], [0.90, 36.95], [1.70, 37.05],
  [2.50, 37.10], [3.10, 37.05], [3.90, 37.05], [4.70, 37.05], [5.30, 37.10], [5.90, 37.15],
  [6.50, 37.20], [7.20, 37.20], [7.90, 37.25], [8.60, 37.30], [9.20, 37.45], [9.90, 37.60],
  [10.40, 37.40], [10.90, 37.05], [11.25, 36.60], [11.35, 36.10], [11.25, 35.60], [11.25, 35.10],
  [11.20, 34.60], [11.10, 34.10], [10.85, 33.65], [11.15, 33.35], [11.70, 33.20], [12.30, 33.05],
  [12.90, 33.05], [13.50, 32.98], [14.10, 32.88], [14.70, 32.68], [15.30, 32.48], [15.90, 32.00],
  [16.30, 31.55],
];

// The Fossa Regia: the ditch Rome dug in 146 to mark the province off from
// Numidia, running from Thabraca on the north coast to Thaenae on the Lesser
// Syrtis. It is used for the Punic frontier before 146 as well, because the ditch
// was dug along what Carthage still held — which is also why Hippo Regius sits
// on the Numidian side of it, as its name says it should.
const FOSSA_REGIA: Line = [
  [8.72, 37.15], [8.78, 36.85], [8.85, 36.55], [8.98, 36.25], [9.15, 35.95], [9.35, 35.68],
  [9.58, 35.42], [9.82, 35.18], [10.08, 34.98], [10.35, 34.80], [10.62, 34.65], [10.45, 34.30],
  [10.30, 34.10], [10.20, 33.95],
];

// Numidia's landward limit: the Moulouya up from the sea, then the Saharan Atlas
// east along the edge of the desert to the chotts, where it meets the Carthaginian
// frontier. Jugurtha's war was fought by never being where a Roman army could
// reach water, which is what this line is the edge of.
const NUMIDIA_LANDWARD: Line = [
  [-2.10, 35.40], [-1.85, 35.10], [-1.60, 34.85], [-1.40, 34.65], [-1.30, 34.55], [-0.85, 34.35],
  [-0.40, 34.20], [0.05, 34.05], [0.50, 33.90], [0.95, 33.80], [1.40, 33.72], [1.85, 33.66],
  [2.30, 33.62], [2.75, 33.60], [3.20, 33.60], [3.65, 33.62], [4.10, 33.66], [4.55, 33.72],
  [5.00, 33.80], [5.45, 33.90], [5.90, 34.00], [6.35, 34.10], [6.80, 34.20], [7.25, 34.28],
  [7.70, 34.30], [8.15, 34.25], [8.60, 34.15], [8.95, 34.45], [9.25, 34.80], [9.45, 35.10],
  [9.58, 35.42],
];

// The pre-desert behind the Tripolitanian emporia, from the Lesser Syrtis east to
// the Syrtes. Lepcis, Oea and Sabratha were rich because the desert came up
// behind them, not in spite of it.
const TRIPOLITANIAN_LIMIT: Line = [
  [10.20, 33.95], [10.45, 33.60], [10.85, 33.25], [11.35, 32.95], [11.85, 32.70], [12.35, 32.50],
  [12.85, 32.35], [13.35, 32.20], [13.85, 32.05], [14.35, 31.90], [14.85, 31.78], [15.35, 31.68],
  [15.90, 31.60], [16.30, 31.55],
];

// The Numidian kingdom, coast and landward limit: one outline, used by every phase
// of it and by the province that annexed it. What changes between the phases is
// who is in it and what they have taken from Carthage in the east — the Emporia,
// which are drawn separately because that is how Masinissa held them.
const NUMIDIA_RING: Line = [
  ...stretch(AFRICA_COAST, MULUCHA_SEA, THABRACA_SEA),
  ...stretch(FOSSA_REGIA, [8.72, 37.15], FOSSA_CHOTTS),
  ...rev(NUMIDIA_LANDWARD),
];
// The Emporia: a detached strip, drawn from the Lesser Syrtis to the Syrtes.
const EMPORIA_RING: Line = [
  ...stretch(AFRICA_COAST, GABES_SEA, SIRTE_SEA),
  ...rev(TRIPOLITANIAN_LIMIT),
];
// Carthage without them: the chora inside the ditch, from Thabraca to the Lesser
// Syrtis. This is the province of Africa's outline too, and the shape of the state
// Rome destroyed — which had been shrinking for fifty years by then.
const CARTHAGE_CHORA: Line = [
  ...stretch(AFRICA_COAST, THABRACA_SEA, GABES_SEA),
  ...rev(FOSSA_REGIA),
];

// ── The East ──────────────────────────────────────────────────────────────────
const TAURUS_SEA: Coordinates = [32.90, 36.05];      // the range comes down to the rough coast
const EUPHRATES_TAURUS: Coordinates = [38.60, 37.55]; // where the range meets the river
const AMANUS: Coordinates = [36.15, 37.90];          // the Syrian gates, Cilicia's eastern corner
const ISSUS_SEA: Coordinates = [35.80, 36.60];
const GAZA_SEA: Coordinates = [34.30, 31.70];
const ELEUTHERUS: Coordinates = [35.55, 34.60];      // the Ptolemaic–Seleucid frontier in Syria
const EUPHRATES_SOUTH: Coordinates = [41.40, 34.55];
const RAPHIA: Coordinates = [34.40, 31.30];

// The Taurus. Apamea moved the Seleucid frontier back to it in 188 and Pompey's
// province of Cilicia was drawn against it in 64, so it is the most consequential
// mountain line in the eastern half of the atlas.
const TAURUS: Line = [
  [32.90, 36.05], [33.20, 36.55], [33.55, 36.90], [33.95, 37.15], [34.35, 37.35], [34.80, 37.55],
  [35.25, 37.70], [35.70, 37.85], [36.15, 37.90], [36.60, 37.88], [37.05, 37.82], [37.50, 37.75],
  [37.95, 37.68], [38.30, 37.62], [38.60, 37.55],
];

// The Euphrates, from the Taurus down past Zeugma and Dura to the edge of the
// frame. From 63 it is the frontier of two empires, and in 53 Crassus crosses it
// and loses seven legions in a week.
const EUPHRATES: Line = [
  [38.60, 37.55], [38.30, 37.20], [38.00, 36.90], [38.20, 36.60], [38.60, 36.30], [39.00, 36.00],
  [39.40, 35.75], [39.80, 35.50], [40.20, 35.30], [40.60, 35.05], [41.00, 34.80], [41.40, 34.55],
  [41.80, 34.30], [42.20, 34.00], [42.60, 33.70], [43.00, 33.40], [43.40, 33.00], [43.70, 32.50],
  [43.90, 32.00], [44.00, 31.40], [44.00, 30.60], [44.00, 30.00],
];

// The desert edge of Syria, from the Euphrates south-west to the Negev: the
// landward limit of everything the Seleucids and then Rome governed from Antioch.
const SYRIA_DESERT_LIMIT: Line = [
  [41.40, 34.55], [41.00, 34.30], [40.60, 34.05], [40.20, 33.78], [39.80, 33.50], [39.40, 33.25],
  [39.00, 33.00], [38.60, 32.80], [38.20, 32.60], [37.80, 32.40], [37.40, 32.20], [37.00, 32.02],
  [36.60, 31.85], [36.25, 31.68], [35.90, 31.50], [35.60, 31.30], [35.30, 31.10], [34.85, 31.18],
  [34.40, 31.30],
];

// The Levantine and Cilician shores, offshore throughout.
const LEVANT_COAST: Line = [
  [34.30, 31.70], [34.60, 32.20], [34.70, 32.80], [34.90, 33.40], [35.20, 33.90], [35.40, 34.30],
  [35.55, 34.60], [35.60, 35.10], [35.70, 35.70], [35.75, 36.20], [35.80, 36.60],
];
// Offshore of the real shore, which here runs well south of the cities: Tarsus is
// twenty kilometres inland, so a line drawn through it would leave the capital of
// Cilicia in the sea.
const CILICIA_COAST: Line = [
  [35.80, 36.60], [35.40, 36.55], [34.80, 36.50], [34.20, 36.45], [33.70, 36.20], [33.20, 36.05],
  [32.90, 36.00], [32.30, 36.20], [31.70, 36.30], [31.10, 36.20], [30.50, 36.10], [29.90, 35.95],
];

// ── Egypt ─────────────────────────────────────────────────────────────────────

// The southern edge of what the Ptolemies actually held: the Cyrenaican jebel and
// its desert, then the line of the western oases — Siwa, Bahariya, Farafra, Dakhla
// and Kharga — down to the First Cataract. Drawn as a single sweep across the
// Libyan Desert instead, it claimed a thousand kilometres of open sand as a
// province, which is the one thing everybody agrees it was not.
const EGYPT_DESERT_LIMIT: Line = [
  [18.90, 30.60], [19.30, 30.30], [19.70, 30.05], [20.10, 29.90], [20.50, 29.75], [20.90, 29.65],
  [21.30, 29.55], [21.70, 29.50], [22.10, 29.48], [22.50, 29.48], [22.90, 29.52], [23.30, 29.60],
  [23.70, 29.72], [24.10, 29.82], [24.50, 29.90], [24.90, 29.92], [25.15, 29.60], [25.35, 29.20],
  [25.45, 28.80], [25.60, 28.40], [25.85, 28.00], [26.15, 27.60], [26.50, 27.20], [26.85, 26.80],
  [27.20, 26.40], [27.55, 26.00], [27.90, 25.60], [28.25, 25.20], [28.65, 24.85], [29.10, 24.55],
  [29.60, 24.30], [30.10, 24.10], [30.70, 23.95], [31.30, 23.87], [31.95, 23.85], [32.60, 23.85],
];

// The Red Sea flank, from the cataract north to the head of the gulf and Sinai.
const EGYPT_RED_SEA: Line = [
  [32.60, 23.85], [32.90, 24.20], [33.10, 24.70], [33.30, 25.20], [33.50, 25.70], [33.70, 26.20],
  [33.90, 26.70], [34.05, 27.20], [34.20, 27.70], [34.30, 28.20], [34.40, 28.70], [34.50, 29.20],
  [34.60, 29.70], [34.68, 30.20], [34.72, 30.60], [34.62, 31.00], [34.40, 31.30],
];

// The African and Egyptian shore from the Syrtes round Cyrenaica and the delta to
// the Sinai, offshore throughout so the delta is never left pale.
const EGYPT_COAST: Line = [
  [18.90, 30.60], [19.20, 31.00], [19.50, 31.50], [19.80, 32.00], [20.00, 32.45], [20.50, 32.90],
  [21.00, 33.10], [21.60, 33.20], [22.20, 33.20], [22.80, 33.10], [23.40, 32.80], [24.00, 32.45],
  [24.60, 32.20], [25.20, 32.00], [25.80, 31.80], [26.40, 31.70], [27.00, 31.65], [27.60, 31.62],
  [28.20, 31.62], [28.80, 31.65], [29.40, 31.70], [30.00, 31.75], [30.60, 31.80], [31.20, 31.85],
  [31.80, 31.80], [32.40, 31.65], [33.00, 31.55], [33.60, 31.50], [34.30, 31.70],
];

// ── The eastern Adriatic ──────────────────────────────────────────────────────

// The Dalmatian and Liburnian shore, offshore, and the Dinaric wall behind it.
// Caesar's province was the first of these and Octavian's campaigns took the
// second: the coast Rome had held since the Illyrian wars, and the interior it had
// not, whose peoples were still raiding Italy a century later.
const DALMATIAN_COAST: Line = [
  [19.40, 41.50], [19.20, 41.80], [19.00, 42.10], [18.60, 42.30], [18.20, 42.50], [17.60, 42.70],
  [17.00, 42.90], [16.40, 43.30], [15.80, 43.70], [15.20, 44.10], [14.60, 44.50], [14.30, 45.10],
];
const DINARIC_LIMIT: Line = [
  [15.40, 45.30], [15.80, 44.95], [16.20, 44.65], [16.60, 44.35], [17.00, 44.05], [17.40, 43.78],
  [17.80, 43.50], [18.20, 43.25], [18.60, 43.00], [19.00, 42.75], [19.40, 42.50], [19.80, 42.25],
  [20.05, 41.95], [20.20, 41.70],
];
const SAVA_LIMIT: Line = [
  [15.40, 45.80], [15.90, 45.82], [16.40, 45.78], [16.90, 45.70], [17.40, 45.50], [17.90, 45.25],
  [18.35, 44.95], [18.75, 44.60], [19.05, 44.20], [19.30, 43.75], [19.55, 43.25], [19.75, 42.80],
  [19.95, 42.35], [20.20, 41.70],
];

// ── Anatolia ──────────────────────────────────────────────────────────────────
//
// These limits are not rivers or ranges. They are the edges of kingdoms and
// provinces in a peninsula full of client states, and nobody surveyed them. They
// are drawn at the same density as the physical frontiers all the same: a line
// nobody could walk to still should not look like one somebody ruled with a
// straight-edge, and following the plateau's own edges is the closest thing to
// honest that is available.

// The inland limit of Pontus, along the southern flank of the Pontic ranges, and
// its western frontier with Paphlagonia.
const PONTIC_LIMIT: Line = [
  [40.40, 40.60], [40.05, 40.35], [39.70, 40.10], [39.35, 39.92], [39.00, 39.80], [38.60, 39.70],
  [38.20, 39.62], [37.80, 39.60], [37.40, 39.62], [37.00, 39.68], [36.60, 39.74], [36.20, 39.80],
  [35.80, 39.90], [35.40, 40.00], [35.00, 40.12], [34.60, 40.28], [34.20, 40.48], [33.90, 40.72],
  [33.80, 41.00], [33.70, 41.35], [33.65, 41.70], [33.62, 42.05], [33.60, 42.40],
];
const PONTUS_COAST: Line = [
  [33.60, 42.40], [34.20, 42.50], [34.80, 42.58], [35.40, 42.60], [36.00, 42.55], [36.60, 42.45],
  [37.20, 42.25], [37.80, 42.00], [38.40, 41.80], [39.00, 41.68], [39.60, 41.60], [40.10, 41.60],
  [40.40, 40.60],
];

// The eastern limit of the Attalid and Rhodian inheritance of 188, against
// Bithynia, Galatia and Cappadocia, and south to the Taurus.
const PERGAMON_EAST: Line = [
  [29.60, 40.60], [30.05, 40.30], [30.45, 40.02], [30.85, 39.80], [31.25, 39.62], [31.65, 39.50],
  [32.05, 39.45], [32.45, 39.42], [32.75, 39.20], [32.95, 38.90], [33.10, 38.60], [33.10, 38.25],
  [33.00, 37.90], [32.80, 37.55], [32.50, 37.25], [32.15, 37.05], [31.75, 36.90], [31.35, 36.85],
  [30.90, 36.85],
];

// The province of Asia is smaller: the eastern districts went to client kings and
// Rhodes' old share had been detached long before.
const ASIA_EAST: Line = [
  [29.60, 40.60], [30.05, 40.28], [30.40, 39.98], [30.70, 39.68], [30.95, 39.35], [31.10, 39.00],
  [31.20, 38.65], [31.15, 38.30], [31.00, 37.95], [30.75, 37.65], [30.45, 37.35], [30.10, 37.05],
  [29.70, 36.80], [29.20, 36.60],
];

// The Aegean and Anatolian shores those three are bounded by, offshore.
const AEGEAN_COAST: Line = [
  [25.80, 40.40], [26.40, 40.55], [27.00, 40.70], [27.70, 40.70], [28.40, 40.62], [29.00, 40.60],
  [29.60, 40.60],
];
const CARIAN_COAST: Line = [
  [25.80, 39.80], [26.00, 38.90], [26.30, 38.20], [26.60, 37.60], [26.90, 37.05], [27.30, 36.65],
  [27.90, 36.35], [28.50, 36.10], [29.20, 36.00], [29.90, 35.95],
];

// The Seleucid limits before Apamea: the northern edge across Anatolia to the
// Black Sea shore, then south-east down the Armenian flank to the Euphrates
// country, and the Eleutherus frontier with Ptolemaic Coele-Syria.
const SELEUCID_NORTH: Line = [
  [30.20, 41.20], [30.90, 41.50], [31.60, 41.80], [32.30, 42.05], [33.00, 42.18], [33.70, 42.22],
  [34.40, 42.22], [35.10, 42.15], [35.80, 41.95], [36.50, 41.70], [37.20, 41.35], [37.90, 40.95],
  [38.60, 40.50], [39.30, 40.00], [39.90, 39.45], [40.35, 38.85], [40.70, 38.20], [40.95, 37.55],
  [41.00, 37.00], [40.75, 36.40], [40.45, 35.80], [40.10, 35.20], [39.70, 34.80],
];
const ELEUTHERUS_FRONTIER: Line = [
  [39.70, 34.80], [39.20, 34.75], [38.70, 34.70], [38.20, 34.65], [37.70, 34.62], [37.20, 34.60],
  [36.70, 34.55], [36.20, 34.55], [35.75, 34.58], [35.55, 34.60],
];

// ── Macedon and Greece ────────────────────────────────────────────────────────

// The northern frontier of Macedon, along the Illyrian and Thracian highlands from
// the Adriatic to the Nestos. Held by the kingdom, by the four republics that
// replaced it and by the province that replaced them: one line for all three, so
// two settlements that changed who governed Macedonia do not also make it a
// slightly different shape each time.
const MACEDON_NORTH: Line = [
  [19.30, 41.40], [19.60, 41.70], [19.95, 42.00], [20.35, 42.20], [20.80, 42.32], [21.25, 42.35],
  [21.70, 42.35], [22.15, 42.28], [22.60, 42.15], [23.05, 42.00], [23.50, 41.85], [23.95, 41.68],
  [24.40, 41.52], [24.90, 41.40],
];

// The southern frontier after Cynoscephalae: Olympus, the Cambunian range and the
// Pindus, from the Aegean west to the Adriatic. Macedon and the freed Greek states
// are drawn on it from both sides, so the line Flamininus declared at the Isthmian
// games is a single edge on the map.
const MACEDON_SOUTH: Line = [
  [24.90, 40.70], [24.55, 40.55], [24.20, 40.42], [23.80, 40.32], [23.40, 40.25], [23.00, 40.20],
  [22.60, 40.15], [22.20, 40.12], [21.80, 40.10], [21.40, 40.10], [21.00, 40.12], [20.60, 40.15],
  [20.20, 40.20], [19.80, 40.25], [19.40, 40.28], [19.20, 40.30],
];

// The Greek seaboard, offshore, from Epirus round the Peloponnese to the Aegean —
// carried round Acarnania, the two gulfs and the three fingers of Chalcidice, so
// no chord cuts a promontory off from the mainland behind it.
const GREECE_COAST: Line = [
  [19.20, 40.30], [19.10, 39.80], [19.30, 39.30], [20.00, 38.60], [20.40, 38.10], [20.70, 37.60],
  [21.10, 37.10], [21.30, 36.60], [21.90, 36.25], [22.60, 36.20], [23.20, 36.20], [23.80, 36.35],
  [24.10, 36.90], [24.00, 37.40], [23.90, 37.90], [24.10, 38.40], [24.40, 38.90], [24.60, 39.40],
  [24.70, 39.90], [24.80, 40.30], [24.90, 40.70],
];

export const territories: TerritoryPeriod[] = [
  // ── Rome ──────────────────────────────────────────────────────────────────
  {
    id: "rome-italy", polity: "rome", name: "Rome", mapLabel: "ROME", fromYear: -272, toYear: -30, certainty: "attested", labelAt: [13.0, 42.3],
    ring: [
      // The northern limit is the Apennine watershed itself, on the same points the
      // Cisalpine zone is drawn on. Rome used to overshoot past it and let the
      // Gallic zone take the overlap; sharing the line means the frontier of Italy
      // is one edge, and it follows the range instead of crossing it in six chords.
      // It begins at the Magra rather than at the Ligurian end of the range:
      // Liguria was not Roman in 272 and is left to itself.
      ...stretch(APENNINES, APENNINE_MAGRA, RUBICON),
      // Adriatic coast, held just offshore — and passing north of Ariminum, the
      // colony that was planted in 268 to hold this end of the frontier.
      [12.85, 44.00], [13.20, 43.60], [13.60, 43.20], [13.90, 43.00], [14.30, 42.60], [14.60, 42.40], [15.00, 42.20], [15.40, 42.10], [16.20, 41.80], [16.70, 41.60], [17.00, 41.40], [17.50, 41.20], [17.90, 41.00], [18.35, 40.70], [18.70, 40.40],
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
      // Up the Ebro from the delta to the Rioja — the same points Barcid Iberia is
      // drawn on, so the two meet on the river with nothing between them.
      ...stretch(EBRO, EBRO_MOUTH, LOGRONO),
      // North to the Pyrenean pass, then east along the crest to the sea.
      ...stretch(SPAIN_INLAND_LIMIT, LOGRONO, RONCESVALLES),
      ...stretch(PYRENEES, RONCESVALLES, CREUS),
      // And back down the coast, offshore, to the delta.
      ...stretch(IBERIA_COAST_MED, CREUS, EBRO_SEA),
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
      // The Atlantic shore of the Algarve, then the whole Mediterranean coast to
      // Cap de Creus — all of it offshore, so the coastline does the drawing.
      ...stretch(IBERIA_COAST_ATLANTIC, GUADIANA, GIBRALTAR),
      ...rev(IBERIA_COAST_MED),
      // The Pyrenean crest west to the pass at Roncesvalles.
      ...stretch(PYRENEES, CREUS, RONCESVALLES),
      // Then the inland limit: down to the Ebro at the Rioja, south-east along the
      // Iberian System and south-west along the Sierra Morena. This is the line the
      // Celtiberian and Lusitanian wars were fought across, and it follows the
      // ranges rather than cutting the peninsula in four straight chords.
      ...stretch(SPAIN_INLAND_LIMIT, RONCESVALLES, GUADIANA),
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
      // Round the Atlantic from the strait to the mouth of the Douro, offshore.
      ...stretch(IBERIA_COAST_ATLANTIC, GIBRALTAR, DOURO_MOUTH),
      // The Cantabrian front north-east to the Basque shore: the southern limit of
      // the north-west, which stays its own to the last frame of the atlas.
      ...SPAIN_NORTHWEST_LIMIT,
      // The Pyrenean crest east to the sea, and the Mediterranean coast back down.
      ...rev(PYRENEES),
      ...IBERIA_COAST_MED,
    ],
  },

  // ── Gauls: the two zones part along the Alpine arc ────────────────────────
  {
    id: "gaul-cisalpine", polity: "gaul", name: "Cisalpine Gauls", mapLabel: "CISALPINE GAULS", fromYear: -395, toYear: -30, certainty: "probable", labelAt: [10.0, 45.2],
    ring: [
      // The Alpine arc, from the sea at the Var north up the western flank and east
      // along the crest to the Carnic Alps. Both Gallic zones are drawn on these
      // points now: authored separately, the two lines left a pale crack running
      // the length of the Alps — between two zones of the same colour, which read
      // as a rendering fault rather than a frontier.
      ...ALPS,
      // Down to the head of the Adriatic, then the Apennine watershed back west.
      // That watershed is the visible frontier with Rome, and Rome is drawn on the
      // same line, so the two meet exactly.
      [13.30, 45.90], [13.15, 45.45], [12.70, 44.80],
      ...rev(APENNINES),
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
      // The Pyrenean crest, from the Mediterranean to the Bay of Biscay — the same
      // points the Spanish zones are drawn on.
      ...PYRENEES,
      // Atlantic seaboard, held offshore, round Armorica to the Channel. The
      // northern limit used to stop at about 46.8° — a line drawn when the atlas
      // ended in 100 BCE and had no business north of it. Caesar's campaigns are
      // fought over the ground above it: Bibracte, Alesia and the Sabis all sat
      // outside the zone, so the map showed a Roman siege on nobody's country in
      // a year it also said Gaul was Roman.
      //
      // Held offshore and kept south of the Straits, so no part of Britain is
      // coloured.
      ...GAUL_COAST_ATLANTIC,
      // The Rhine upstream from the mouths to Basel, the Jura to the Léman, and the
      // western flank of the Alps down to the sea at the Var — the limit the
      // province of 121 inherits. Carried further east, the conquest of southern
      // Gaul showed as the Ligurian coast going blank.
      ...RHINE,
      ...JURA,
      ...stretch(ALPS, ALPS_GENEVA, ALPS_VAR),
      // Gulf of Lion, held offshore so no coastal strip is left pale.
      ...rev(GAUL_COAST_MED),
    ],
  },
  {
    // 121 onwards: the Mediterranean coast is Roman, and free Gaul begins north of
    // it. The southern edge here is the frontier of the new province rather than a
    // real feature — nobody drew a line across the Cévennes, and the two zones part
    // where Roman administration stopped rather than where Gaul did.
    id: "gaul-transalpine-reduced", polity: "gaul", name: "Transalpine Gauls", mapLabel: "GAULS", fromYear: -121, toYear: -51, certainty: "speculative", labelAt: [1.6, 45.4],
    note: "The northern, western and eastern limits are the same edges as before — the Atlantic, the Channel, the Rhine and the Alps. What is new is the southern one, and it is an administrative line drawn from the province's known extent, not a frontier anybody in Gaul would have recognised.",
    // The limit of the new province runs west only as far as the Pyrenean frontier,
    // and then that frontier takes over. Carried all the way to the Atlantic
    // instead, it left the ground between it and the Pyrenees uncoloured, which
    // claimed a hole where Aquitania was — in the province, it was not, and it did
    // not stop being Gallic.
    ring: GAUL_OUTSIDE_THE_PROVINCE,
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
      // The Pyrenean crest west from the sea, as far as the province reaches.
      ...stretch(PYRENEES, CREUS, PYRENEES_ARIEGE),
      // The province's own limit, north round the Cévennes and down the Alps to the
      // sea at the Var. Free Gaul is drawn on the same line, so the two part on one
      // edge instead of two.
      ...NARBONENSIS_LIMIT,
      // And back along the Gulf of Lion, held offshore.
      ...rev(GAUL_COAST_MED),
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
    // The seaboard north from the Macedonian frontier, held offshore, and the
    // Dinaric wall back south. The southern end runs into the province of
    // Macedonia, which is Roman too, so the two cannot leave a gap between them.
    ring: [...DALMATIAN_COAST, ...DINARIC_LIMIT],
  },
  {
    // 33: after Octavian. Three campaigning seasons up the coast and into the
    // interior against the Iapodes, the Pannonii and the Delmatae — the war that
    // took Siscia and reached the Sava. It secured a frontier that needed securing,
    // and it also kept an army in the field within reach of Italy under a commander
    // who needed to be seen to have fought, which was probably the point.
    id: "rome-illyricum-dalmatia", polity: "rome", name: "Illyricum after the Dalmatian campaigns", mapLabel: "ILLYRICUM", fromYear: -33, toYear: -30, certainty: "probable", labelAt: [17.6, 44.1],
    // The same coast, and the interior out to the Sava country the campaigns of
    // 35–33 reached.
    ring: [...DALMATIAN_COAST, ...SAVA_LIMIT],
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
    // The whole peninsula, coast and crest: the Mediterranean shore, the Atlantic
    // and Cantabrian shores, and the Pyrenees. Everything a principal holds is
    // painted over the top of it, so what stays this colour is what was nobody's.
    ring: [...IBERIA_COAST_MED, ...IBERIA_COAST_ATLANTIC, ...rev(PYRENEES)],
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
    // The Atlantic and Cantabrian coasts from the Douro round to the Basque shore,
    // and the same Cantabrian front the province is drawn on, so the two meet on
    // one line and no thread of nobody's colour can open along it.
    ring: [...stretch(IBERIA_COAST_ATLANTIC, DOURO_MOUTH, BISCAY), ...rev(SPAIN_NORTHWEST_LIMIT)],
  },

  // ── Numidia ──────────────────────────────────────────────────────────────
  {
    id: "numidia-early", polity: "numidia", name: "Numidian kingdoms", mapLabel: "NUMIDIA", fromYear: -264, toYear: -202, certainty: "probable", labelAt: [4.4, 35.6],
    // Coast, the Thabraca frontier with Carthage, and the desert edge west to the
    // Moulouya. Carthage is drawn on the same frontier, so the two now abut on one
    // line rather than overlapping and trusting the later zone to hide the seam.
    ring: NUMIDIA_RING,
  },
  {
    // Enlarged by Rome after Zama at Carthage's expense.
    id: "numidia-masinissa", polity: "numidia", name: "Numidia (Masinissa)", mapLabel: "NUMIDIA", fromYear: -201, toYear: -149, certainty: "probable", labelAt: [4.4, 35.6],
    // What Masinissa took can be drawn where it can be dated: the Emporia, seized
    // outright around 162 and held detached, have a zone of their own. His fifty
    // years of encroachment on the Carthaginian hinterland are not year-datable, so
    // the frontier here stays the ditch rather than guessing at a line per decade.
    ring: NUMIDIA_RING,
  },
  {
    // Masinissa died in 148 after sixty years on the throne, and the zone stops
    // carrying his name with him. The ground does not change: what changes is who
    // is in it — Micipsa, then a disputed succession between his sons and his
    // adopted nephew Jugurtha, who had learned the Roman army from inside it at
    // Numantia and spent the next seven years proving Rome could not catch him.
    id: "numidia-kingdom", polity: "numidia", name: "Numidia", mapLabel: "NUMIDIA", fromYear: -148, toYear: -47, certainty: "probable", labelAt: [4.4, 35.6],
    ring: NUMIDIA_RING,
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
    ring: EMPORIA_RING,
  },

  // ── Carthage ─────────────────────────────────────────────────────────────
  {
    id: "carthage-africa", polity: "carthage", name: "Carthage", mapLabel: "CARTHAGE", fromYear: -509, toYear: -162, certainty: "attested", labelAt: [9.9, 36.2],
    // The chora inside the ditch, and the Tripolitanian emporia with it: Lepcis,
    // Oea and Sabratha were Carthaginian, and leaving that shore blank was an
    // omission rather than a judgement.
    ring: [
      ...stretch(AFRICA_COAST, THABRACA_SEA, SIRTE_SEA),
      ...rev(TRIPOLITANIAN_LIMIT),
      ...rev(FOSSA_REGIA),
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
    ring: CARTHAGE_CHORA,
  },
  {
    // 146: the province of Africa, on the ground Carthage held at the end and
    // inside the ditch Rome dug to mark it off from Numidia. The city itself was
    // destroyed and its site left out of the settlement entirely.
    id: "rome-africa", polity: "rome", name: "Province of Africa", mapLabel: "AFRICA", fromYear: -146, toYear: -30, certainty: "attested", labelAt: [9.9, 36.2],
    // The ditch is the province's western frontier because that is what Rome dug
    // it to be, so the province and the kingdom beside it are drawn on one line.
    ring: CARTHAGE_CHORA,
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
      // The Atlantic shore of the Algarve and the coast round to Alicante, offshore.
      ...stretch(IBERIA_COAST_ATLANTIC, GUADIANA, GIBRALTAR),
      ...stretch(IBERIA_COAST_MED, GIBRALTAR, ALICANTE_SEA),
      // The inland limit back west along the Sierra Morena. Its western end is the
      // one the province keeps in 228 and Rome inherits in 206: drawn wider here,
      // Hasdrubal's expansion to the Ebro would show as Barcid Iberia losing the
      // Algarve in the same year.
      ...rev(BARCID_SOUTH_LIMIT),
    ],
  },
  {
    // 228–219: Hasdrubal founds New Carthage and extends up the eastern coast; the
    // treaty of 226 names the Ebro as the limit of that expansion.
    id: "carthage-iberia", polity: "carthage", name: "Barcid Iberia", mapLabel: "IBERIA", fromYear: -228, toYear: -207, certainty: "probable", labelAt: [-3.4, 38.4],
    ring: [
      // The Algarve and the whole Mediterranean coast to the Ebro delta, offshore.
      ...stretch(IBERIA_COAST_ATLANTIC, GUADIANA, GIBRALTAR),
      ...stretch(IBERIA_COAST_MED, GIBRALTAR, EBRO_SEA),
      // The Ebro itself, upstream from the delta to the Rioja: the agreed limit,
      // and the same points Rome is drawn on north of the river.
      ...stretch(EBRO, EBRO_MOUTH, LOGRONO),
      // Then south-west along the Iberian System and the Sierra Morena, leaving
      // Celtiberia, the Meseta and Lusitania free.
      ...stretch(SPAIN_INLAND_LIMIT, LOGRONO, GUADIANA),
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
      ...MACEDON_SOUTH,
      ...GREECE_COAST,
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
      ...MACEDON_NORTH,
      // Aegean coast and the whole Greek seaboard, offshore, round the Peloponnese
      // and back up to the Adriatic: before Cynoscephalae the kingdom and its allies
      // hold Greece as well, so the southern frontier of 197 is not drawn yet.
      [24.90, 41.05],
      ...rev(GREECE_COAST),
    ],
  },
  {
    // Reduced to Macedonia proper after 197: Greece is free, the coast retained.
    id: "macedon-reduced", polity: "macedon", name: "Macedon", mapLabel: "MACEDON", fromYear: -197, toYear: -168, certainty: "probable", labelAt: [22.2, 41.2],
    ring: [
      ...MACEDON_NORTH,
      [24.90, 41.05],
      ...MACEDON_SOUTH,
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
      ...MACEDON_NORTH,
      [24.90, 41.05],
      ...MACEDON_SOUTH,
    ],
  },
  {
    // 148: Andriscus showed that four republics could still be assembled into a
    // rebellion, so Rome stopped delegating. Macedonia becomes the first Roman
    // province east of the Adriatic, and its governor is given the oversight of
    // Greece as well — which is why Corinth is a Roman matter two years later.
    id: "rome-macedonia", polity: "rome", name: "Province of Macedonia", mapLabel: "MACEDONIA", fromYear: -148, toYear: -30, certainty: "attested", labelAt: [22.2, 41.2],
    ring: [
      ...MACEDON_NORTH,
      [24.90, 41.05],
      ...MACEDON_SOUTH,
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
      [26.0, 40.4], [28.0, 40.5], [29.5, 40.3],
      // North across Anatolia to the Black Sea, then down the Armenian flank.
      ...SELEUCID_NORTH,
      // The southern frontier is the Eleutherus, not the Egyptian border: Coele-Syria
      // was Ptolemaic for the whole third century, and four Syrian wars were fought
      // over it before Antiochus finally took it at Panium in 200.
      ...ELEUTHERUS_FRONTIER,
      // Then the Levantine and southern Anatolian coasts north and west, offshore.
      ...stretch(LEVANT_COAST, ELEUTHERUS, ISSUS_SEA),
      ...CILICIA_COAST,
      [28.0, 36.4], [26.4, 38.4],
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
      // The same northern and eastern limits the empire had before Panium, so the
      // year 200 moves Coele-Syria and the Attalid corner and nothing else.
      [29.2, 40.3],
      ...stretch(SELEUCID_NORTH, [30.20, 41.20], [41.00, 37.00]),
      [41.30, 36.20], [41.40, 35.40],
      // The desert edge of Syria down to the Negev — the same line the province of
      // Syria is drawn on later, and it reaches Coele-Syria because Panium gave it
      // to him. The Ptolemaic zone it takes over from ends on these points too, so
      // the handover in 200 leaves nothing behind.
      ...stretch(SYRIA_DESERT_LIMIT, EUPHRATES_SOUTH, RAPHIA),
      // Back up the Levantine coast, offshore, then west along the southern shore
      // of Anatolia.
      ...stretch(LEVANT_COAST, GAZA_SEA, ISSUS_SEA),
      ...CILICIA_COAST,
      [28.4, 36.4],
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
      // The Taurus, from the rough Cilician coast east along the range to the
      // Euphrates — the frontier the treaty put them behind.
      ...TAURUS,
      // Down the Euphrates, then south-west along the desert edge to the Negev.
      ...stretch(EUPHRATES, EUPHRATES_TAURUS, EUPHRATES_SOUTH),
      ...SYRIA_DESERT_LIMIT,
      // And back up the Levantine and Cilician coasts, offshore throughout.
      ...LEVANT_COAST,
      ...stretch(CILICIA_COAST, ISSUS_SEA, TAURUS_SEA),
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
      // Aegean and Propontis shore, offshore, then the eastern limit south against
      // Bithynia, Galatia and Cappadocia to the Taurus.
      ...AEGEAN_COAST,
      ...PERGAMON_EAST,
      // Round the Lycian and Carian coast, offshore, and back up the Ionian shore.
      ...rev(CARIAN_COAST),
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
      ...AEGEAN_COAST,
      ...ASIA_EAST,
      ...rev(stretch(CARIAN_COAST, [25.80, 39.80], [29.20, 36.00])),
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
      ...AEGEAN_COAST,
      ...ASIA_EAST,
      ...rev(stretch(CARIAN_COAST, [25.80, 39.80], [29.20, 36.00])),
    ],
  },
  {
    // 84 onwards: the province restored, and made to pay for the four years it was
    // not Roman. Sulla fined it twenty thousand talents, which the cities borrowed
    // from Roman financiers at rates that had them still paying in Caesar's day.
    id: "rome-asia-restored", polity: "rome", name: "Province of Asia", mapLabel: "ASIA", fromYear: -84, toYear: -30, certainty: "attested", labelAt: [28.5, 38.6],
    ring: [
      ...AEGEAN_COAST,
      ...ASIA_EAST,
      ...rev(stretch(CARIAN_COAST, [25.80, 39.80], [29.20, 36.00])),
    ],
  },
  {
    // Pontus proper: the Black Sea kingdom Mithridates ruled for over fifty years
    // and fought Rome from for nearly thirty. Drawn from 88, when he becomes Rome's
    // problem, on the same rule every eastern power on this map follows.
    id: "pontus-kingdom", polity: "pontus", name: "Pontus under Mithridates", mapLabel: "PONTUS", fromYear: -88, toYear: -64, certainty: "probable", labelAt: [36.5, 40.6],
    ring: [...PONTUS_COAST, ...rev(PONTIC_LIMIT)],
  },
  {
    // 63: Pompey annexes the kingdom he did not conquer — Lucullus had beaten
    // Mithridates and been recalled — and joins it to Bithynia, which Rome had also
    // been left in a will. The Black Sea coast is Roman from here to the Empire.
    id: "rome-pontus", polity: "rome", name: "Bithynia and Pontus", mapLabel: "PONTUS", fromYear: -63, toYear: -30, certainty: "attested", labelAt: [36.5, 40.6],
    ring: [...PONTUS_COAST, ...rev(PONTIC_LIMIT)],
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
    // The Seleucid frontier, because that is what Pompey took: a kingdom
    // reorganised as a province, not a conquest with limits of its own. It runs
    // from the Amanus along the Taurus to the Euphrates, down the river, and back
    // along the desert edge — Parthia is drawn after this and takes the ground
    // beyond the water, which is where the frontier actually was.
    ring: [
      ...stretch(TAURUS, AMANUS, EUPHRATES_TAURUS),
      ...stretch(EUPHRATES, EUPHRATES_TAURUS, EUPHRATES_SOUTH),
      ...SYRIA_DESERT_LIMIT,
      ...stretch(LEVANT_COAST, GAZA_SEA, ISSUS_SEA),
      [36.00, 36.90],
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
      // The Taurus, from the rough coast east to the Amanus and the Syrian gates —
      // the same range Syria is drawn against, so the two provinces meet on it.
      ...stretch(TAURUS, TAURUS_SEA, AMANUS),
      [36.35, 37.30], [36.20, 36.85],
      // Back west along the coast, held offshore throughout.
      ...stretch(CILICIA_COAST, ISSUS_SEA, TAURUS_SEA),
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
    // The western edge only: the Euphrates, on the same points Syria is drawn on,
    // so the two empires face each other across the river with nothing between
    // them. Everything east of the line is drawn to the edge of the frame and no
    // further, because the rest of the empire lies off this map — which is itself
    // worth a reader knowing.
    ring: [
      [39.60, 37.90], [40.20, 38.05], [40.80, 38.10], [41.40, 38.05], [42.00, 37.95],
      [42.60, 37.80], [43.20, 37.60], [43.90, 37.40],
      [44.00, 36.60], [44.00, 35.60], [44.00, 34.60], [44.00, 33.60], [44.00, 32.60],
      [44.00, 31.60], [44.00, 30.60], [44.00, 30.00],
      ...rev(EUPHRATES),
    ],
  },
  {
    // 50: Gaul. Eight years of campaigning, and the atlas draws it in one step
    // because that is how the conquest resolved — there was no partial Roman Gaul
    // to show. The northern and western limits are the same schematic edges the
    // Gallic zones have always carried; what has changed is who holds the ground.
    id: "rome-gaul", polity: "rome", name: "Gaul", mapLabel: "GAUL", fromYear: -50, toYear: -30, certainty: "attested", labelAt: [1.6, 45.4],
    // Exactly the ground that was Gallic the year before, so the conquest reads as
    // ground changing hands rather than a country changing shape.
    ring: GAUL_OUTSIDE_THE_PROVINCE,
  },
  {
    // 46: Africa Nova. Juba backed the losing side at Thapsus and his kingdom was
    // annexed for it — the last of the North African powers on this map to go, a
    // century after Carthage and by the same mechanism: choosing wrongly in a Roman
    // quarrel. The Emporia go with it.
    id: "rome-africa-nova", polity: "rome", name: "Africa Nova", mapLabel: "AFRICA NOVA", fromYear: -46, toYear: -30, certainty: "attested", labelAt: [4.4, 35.6],
    // Literally the kingdom's own outline: annexation should move a colour, not a
    // frontier, and a province drawn even slightly smaller than the kingdom it
    // replaced would hand the difference to nobody in the year Rome took all of it.
    ring: NUMIDIA_RING,
  },
  {
    // The Emporia go with the kingdom, and have to be drawn doing it. Africa Nova
    // is Numidia proper, and Byzacena lies between the two, so annexing Juba's
    // kingdom in one zone left the Tripolitanian shore — Roman ground from the
    // same settlement — blank from 46. It is the same detached strip Masinissa
    // took in 162, changing hands again by the same mechanism.
    id: "rome-emporia", polity: "rome", name: "The Emporia", mapLabel: "EMPORIA", fromYear: -46, toYear: -30, certainty: "probable", labelAt: [13.2, 32.6],
    ring: EMPORIA_RING,
  },
  {
    // 264–201: Egypt with Coele-Syria, which is the shape that explains the third
    // century. The Ptolemies held the Levant to the Eleutherus and the Seleucids
    // spent four wars trying to take it; drawing Egypt as the Nile alone would make
    // both of those disappear.
    id: "ptolemaic", polity: "ptolemaic", name: "Ptolemaic Egypt", mapLabel: "EGYPT", fromYear: -264, toYear: -201, certainty: "probable", labelAt: [29.5, 28.0],
    ring: [
      // Cyrenaica and the Egyptian coast, every stretch pushed offshore so the Nile
      // delta shore is never left pale.
      ...EGYPT_COAST,
      // Up the Levantine coast, offshore, to the Eleutherus — the frontier four
      // Syrian wars were fought over before Antiochus finally took it at Panium.
      ...stretch(LEVANT_COAST, GAZA_SEA, ELEUTHERUS),
      // Back south along the desert edge of Coele-Syria, on the same points the
      // Seleucid zone that takes the ground in 200 is drawn on: the handover moves
      // the province from one power to the other and leaves nothing behind.
      [36.70, 34.30], [36.75, 33.95], [36.75, 33.60], [36.65, 33.25], [36.50, 32.90],
      [36.30, 32.55], [36.10, 32.20], [35.85, 31.90], [35.60, 31.60],
      // Sinai and the Red Sea flank, the Nubian limit at the cataract, and the line
      // of the western oases back to Cyrenaica.
      ...rev(EGYPT_RED_SEA),
      ...rev(EGYPT_DESERT_LIMIT),
    ],
  },
  {
    // 200 onwards: Panium. Antiochus takes Coele-Syria and Egypt is the Nile and
    // Cyrenaica again — the victory that freed him to turn west, and so the other
    // half of why the year 200 is a hinge on this map.
    id: "ptolemaic-egypt", polity: "ptolemaic", name: "Ptolemaic Egypt", mapLabel: "EGYPT", fromYear: -200, toYear: -31, certainty: "probable", labelAt: [29.5, 28.0],
    // Cyrenaica, the coast, the Sinai flank and the oases — the same edges the
    // earlier zone carries, so losing Coele-Syria in 200 moves exactly that
    // province and nothing else.
    ring: [...EGYPT_COAST, ...rev(EGYPT_RED_SEA), ...rev(EGYPT_DESERT_LIMIT)],
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
    // The kingdom's own outline, unchanged: annexation moves a colour, not a
    // frontier.
    ring: [...EGYPT_COAST, ...rev(EGYPT_RED_SEA), ...rev(EGYPT_DESERT_LIMIT)],
  },
];

export function territoriesForYear(year: number): TerritoryPeriod[] {
  return territories.filter((period) => year >= period.fromYear && year <= period.toYear);
}
