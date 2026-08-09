import type { BattleDiagram } from "@/types/history";

// Stage-by-stage tactical diagrams, keyed by battle slug.
//
// AUTHORING RULES — these are the difference between a diagram and a fabrication:
//
// 1. Only battles whose sources actually support a tactical reconstruction get a
//    diagram. Polybius and Livy describe the shape of the action at Cannae,
//    Cynoscephalae, Zama and the rest; they say almost nothing about Sulci. A
//    battle with no reconstruction gets no diagram rather than an invented one.
// 2. Every stage carries its own certainty. The opening deployment is usually the
//    best attested part; the exact geometry of a collapse rarely is.
// 3. `caveat` records what the diagram is NOT claiming — the bank of a river, the
//    real frontage, whether a manoeuvre was ordered or improvised.
// 4. Frontages are relative, not measured. Depth is meaningful only where a source
//    makes a point of it (the Roman mass at Cannae, the pike blocks in Macedon).
//
// The frame is 100 × 68, x rightward, y downward.
export const battleDiagrams: Record<string, BattleDiagram> = {
  // ── The conquest of Italy ────────────────────────────────────────────────
  // These carry a further caution the Punic diagrams do not need. For the fifth and
  // fourth centuries the shape of the action is often Livy's reconstruction rather
  // than a report, so a stage here graded `traditional` is saying: this is how Rome
  // remembered the battle going, not how it can be shown to have gone.
  veii: {
    scaleNote: "The plateau of Veii and the Roman lines around it. The city site is securely known and excavated; where the siege works ran is not, and the frame stands for ten years of operations.",
    orientation: "The Tiber lies to the east, Rome twelve miles downstream.",
    sourceIds: ["livy-1-5", "plutarch-camillus"],
    terrain: [
      { id: "plateau", kind: "hill", points: [[24, 16], [70, 14], [76, 34], [68, 46], [28, 46], [18, 32]], label: "the plateau", labelAt: [50, 52] },
      { id: "city", kind: "town", at: [48, 30], size: [30, 14], label: "Veii" },
      { id: "ravine", kind: "river", points: [[14, 12], [22, 30], [18, 48], [24, 62]], label: "the Cremera", labelAt: [10, 56] },
    ],
    stages: [
      {
        id: "invest",
        title: "Rome invests the city",
        description: "Veii stands on a plateau of about the same size as Rome's own, defended on most sides by ravines. Rome cannot storm it and settles down to shut it in — and then does something Roman armies had not done before: it stays through the winter instead of going home for the harvest.",
        certainty: "probable",
        units: [
          { id: "rom-works", faction: "rome", kind: "works", at: [48, 30], size: [70, 42] },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [88, 30], size: [16, 14], label: "winter camp" },
          { id: "etr-gar", faction: "etruscan", kind: "infantry", at: [48, 20], size: [22, 3], label: "the city holds" },
        ],
        caveat: "The tradition dates army pay to this siege, because a force kept in the field all year has to be fed; whether the reform belongs here is argued.",
      },
      {
        id: "blockade",
        title: "Ten years, and no help from Etruria",
        description: "The other Etruscan cities do not come. Veii had quarrelled with the league and is left to fight alone, which is the strategic fact of the whole war — Rome is besieging one city, not a nation.",
        certainty: "traditional",
        units: [
          { id: "rom-works", faction: "rome", kind: "works", at: [48, 30], size: [70, 42] },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [88, 30], size: [16, 14] },
          { id: "etr-gar", faction: "etruscan", kind: "infantry", at: [48, 20], size: [20, 3], label: "no relief comes" },
        ],
        caveat: "The ten-year length is a literary echo of the siege of Troy and is not independently supported.",
      },
      {
        id: "tunnel",
        title: "A tunnel driven under the citadel",
        description: "On the tradition, Roman engineers cut a gallery through the soft tufa into the citadel itself while an assault drew the defence to the walls. The tufa around Veii really is riddled with drainage cuniculi, which is at least why the story would have been imaginable.",
        certainty: "traditional",
        units: [
          { id: "rom-works", faction: "rome", kind: "works", at: [48, 30], size: [70, 42] },
          { id: "rom-assault", faction: "rome", kind: "infantry", at: [76, 30], size: [10, 16], label: "assault on the wall" },
          { id: "rom-mine", faction: "rome", kind: "works", at: [34, 40], size: [14, 2.4], label: "the gallery" },
          { id: "etr-gar", faction: "etruscan", kind: "infantry", at: [56, 20], size: [18, 3], label: "drawn to the walls" },
        ],
        arrows: [
          { id: "a1", from: [72, 30], to: [62, 30], faction: "rome", kind: "attack" },
          { id: "a2", from: [34, 38], to: [40, 32], faction: "rome", kind: "move" },
        ],
        caveat: "The tunnel is a folk-tale motif that attaches to several ancient sieges. It is how Rome remembered taking Veii, not evidence of how Veii fell.",
      },
      {
        id: "taken",
        title: "The city taken, and kept",
        description: "Veii is stormed, its people sold, and the site never reoccupied — the archaeology agrees that occupation ends about now. What matters more is what Rome does with the land: it annexes it outright instead of leaving a beaten neighbour in place, and roughly doubles in size.",
        certainty: "probable",
        units: [
          { id: "rom-in", faction: "rome", kind: "infantry", at: [48, 30], size: [26, 4], label: "the city taken" },
          { id: "etr-gar", faction: "etruscan", kind: "infantry", at: [48, 20], size: [14, 3], routed: true },
        ],
      },
    ],
  },

  allia: {
    scaleNote: "The ground where the Allia joins the Tiber, about eleven miles above Rome. Neither the stream nor the bank the Romans stood on is securely identified.",
    orientation: "The Tiber runs south past the Roman right; Rome lies downstream.",
    sourceIds: ["livy-1-5", "polybius-2"],
    terrain: [
      { id: "tiber", kind: "river", points: [[16, 4], [12, 24], [16, 44], [12, 64]], label: "the Tiber", labelAt: [7, 36] },
      { id: "allia", kind: "river", points: [[16, 34], [40, 32], [66, 34], [94, 32]], label: "the Allia", labelAt: [80, 40] },
      { id: "heights", kind: "hill", points: [[62, 44], [88, 42], [94, 56], [64, 58]], label: "the heights", labelAt: [78, 62] },
    ],
    stages: [
      {
        id: "deploy",
        title: "A hurried army, badly placed",
        description: "Rome meets the Senones on ground of the Gauls' choosing. The line is stretched thin to avoid being outflanked, and the reserve is put out on a hill on the right instead of behind the centre — which means the centre has nothing behind it at all.",
        certainty: "traditional",
        units: [
          { id: "gaul-line", faction: "gaul", kind: "infantry", at: [52, 16], size: [56, 5], label: "the Senones" },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [46, 40], size: [48, 4], label: "the line, stretched thin" },
          { id: "rom-reserve", faction: "rome", kind: "infantry", at: [78, 50], size: [16, 4], label: "the reserve, out on a hill" },
        ],
        caveat: "The deployment is Livy's explanation of a defeat rather than a report of one; what is agreed is that the army was beaten quickly and with little fighting.",
      },
      {
        id: "charge",
        title: "The charge falls on the weak flank",
        description: "The Gauls come on in one mass and strike where the Roman line is thinnest. There is no depth to absorb it and no reserve within reach.",
        certainty: "traditional",
        units: [
          { id: "gaul-line", faction: "gaul", kind: "infantry", at: [52, 24], size: [56, 5] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [46, 40], size: [48, 4] },
          { id: "rom-reserve", faction: "rome", kind: "infantry", at: [78, 50], size: [16, 4] },
        ],
        arrows: [
          { id: "a1", from: [40, 28], to: [40, 36], faction: "gaul", kind: "attack" },
          { id: "a2", from: [64, 28], to: [64, 36], faction: "gaul", kind: "attack" },
        ],
      },
      {
        id: "rolls-up",
        title: "The line rolls up from the flank",
        description: "Once the flank goes the rest of the line has both a beaten wing and an open side. It breaks without being fought through.",
        certainty: "traditional",
        units: [
          { id: "gaul-line", faction: "gaul", kind: "infantry", at: [50, 32], size: [56, 5] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [42, 42], size: [36, 4], routed: true, label: "breaks" },
          { id: "rom-reserve", faction: "rome", kind: "infantry", at: [78, 50], size: [16, 4], routed: true, label: "cut off on the hill" },
        ],
        arrows: [{ id: "a1", from: [30, 36], to: [26, 42], faction: "gaul", kind: "attack" }],
      },
      {
        id: "rout",
        title: "The rout goes to Veii, not to Rome",
        description: "Many drown crossing the Tiber and most of the survivors make for Veii, which is nearer and still walled. Rome is left without an army to hold it, and the Gauls walk in a few days later.",
        certainty: "probable",
        units: [
          { id: "gaul-line", faction: "gaul", kind: "infantry", at: [50, 34], size: [50, 5], label: "the road to Rome is open" },
          { id: "rom-flee", faction: "rome", kind: "infantry", at: [26, 48], size: [22, 4], routed: true, label: "across the river to Veii" },
        ],
        arrows: [{ id: "a1", from: [24, 46], to: [12, 52], faction: "rome", kind: "retreat" }],
        caveat: "That the survivors ran to Veii rather than to Rome is the detail that explains how the city came to be undefended, and it is the part of the account that reads least like invention.",
      },
    ],
  },

  "caudine-forks": {
    scaleNote: "A closed valley with a narrow entrance and a narrower exit. The identification with the pass between Arpaia and Montesarchio is the usual one and is not agreed.",
    orientation: "Rome came from the west, making for Luceria in Apulia to the east.",
    sourceIds: ["livy-6-10"],
    terrain: [
      { id: "north", kind: "ridge", points: [[6, 6], [40, 3], [74, 7], [96, 5], [96, 22], [70, 25], [36, 22], [6, 24]], label: "wooded hills", labelAt: [18, 12] },
      { id: "south", kind: "ridge", points: [[6, 46], [38, 49], [72, 45], [96, 48], [96, 62], [70, 60], [34, 63], [6, 60]], label: "and hills again", labelAt: [50, 55] },
      { id: "road", kind: "road", points: [[2, 36], [30, 34], [60, 36], [98, 34]], label: "the road to Luceria", labelAt: [26, 42] },
    ],
    stages: [
      {
        id: "enters",
        title: "The army takes the short road",
        description: "Samnite agents dressed as shepherds report that Luceria is under siege and about to fall. Two consular armies hurry east through the hills to save it rather than taking the long way round, and enter the valley in column of march.",
        certainty: "probable",
        units: [
          { id: "rom-col", faction: "rome", kind: "infantry", at: [30, 34], size: [34, 4], label: "two consular armies" },
          { id: "sam-far", faction: "samnite", kind: "works", at: [80, 34], size: [3, 14] },
        ],
        arrows: [{ id: "a1", from: [48, 34], to: [70, 34], faction: "rome", kind: "move" }],
        caveat: "The false shepherds are Livy's; that Rome was deceived into taking the pass is agreed, how is not.",
      },
      {
        id: "far-gate",
        title: "The far gate is found blocked",
        description: "The head of the column reaches the eastern exit and finds it walled and held. There is no way through and no room to form a line to force it.",
        certainty: "probable",
        units: [
          { id: "rom-col", faction: "rome", kind: "infantry", at: [46, 34], size: [34, 4] },
          { id: "sam-far", faction: "samnite", kind: "works", at: [80, 34], size: [3, 14], label: "barricaded" },
          { id: "sam-hill", faction: "samnite", kind: "infantry", at: [58, 18], size: [26, 3], label: "on the slopes above" },
        ],
        arrows: [{ id: "a1", from: [66, 34], to: [76, 34], faction: "rome", kind: "attack" }],
      },
      {
        id: "near-gate",
        title: "And the way back is closed behind",
        description: "The army turns to go back and finds the western entrance blocked too, with Samnites on both slopes. Nothing can be attacked and nothing can be defended: the position is not a battlefield, it is a container.",
        certainty: "probable",
        units: [
          { id: "rom-col", faction: "rome", kind: "infantry", at: [50, 34], size: [30, 4], label: "trapped" },
          { id: "sam-far", faction: "samnite", kind: "works", at: [80, 34], size: [3, 14] },
          { id: "sam-near", faction: "samnite", kind: "works", at: [18, 34], size: [3, 14] },
          { id: "sam-hill", faction: "samnite", kind: "infantry", at: [56, 18], size: [30, 3] },
          { id: "sam-hill2", faction: "samnite", kind: "infantry", at: [56, 50], size: [30, 3] },
        ],
      },
      {
        id: "surrender",
        title: "Surrender, and the yoke",
        description: "The consuls come to terms. The whole force is disarmed and passes under a yoke of spears, six hundred knights are kept as hostages, and Rome undertakes to leave Samnium. Almost nobody is killed — which is why Rome could fight again within a year, and why the sources record the disgrace rather than the loss.",
        certainty: "probable",
        units: [
          { id: "rom-col", faction: "rome", kind: "infantry", at: [50, 34], size: [26, 4], routed: true, label: "disarmed" },
          { id: "sam-hill", faction: "samnite", kind: "infantry", at: [56, 20], size: [30, 3] },
          { id: "sam-hill2", faction: "samnite", kind: "infantry", at: [56, 48], size: [30, 3] },
        ],
        arrows: [{ id: "a1", from: [36, 34], to: [16, 34], faction: "rome", kind: "retreat", label: "marched out under the yoke" }],
        caveat: "Whether Rome legally repudiated the peace afterwards or simply broke it was argued in antiquity and still is. Livy's revenge victory the following year is generally rejected.",
      },
    ],
  },

  sentinum: {
    scaleNote: "Relative frontages on open ground below Sentinum. The largest battle fought in Italy before Cannae; the field within the valley is not located.",
    sourceIds: ["livy-6-10"],
    terrain: [
      { id: "ground", kind: "hill", points: [[6, 8], [40, 5], [72, 9], [94, 7], [92, 16], [60, 18], [28, 15], [6, 17]], label: "the hills below Sentinum", labelAt: [50, 24] },
    ],
    stages: [
      {
        id: "deploy",
        title: "Two wings, two different enemies",
        description: "The coalition has already been split before the battle: Roman raids into Etruria drew the Etruscan and Umbrian contingents home, so what stands here is Samnite and Gallic. Fabius takes the right against the Samnites, Decius the left against the Gauls.",
        certainty: "probable",
        units: [
          { id: "sam-line", faction: "samnite", kind: "infantry", at: [70, 32], size: [30, 4], label: "Samnites" },
          { id: "gaul-line", faction: "gaul", kind: "infantry", at: [28, 32], size: [30, 5], label: "Gauls" },
          { id: "gaul-chariots", faction: "gaul", kind: "cavalry", at: [28, 26], size: [16, 3], label: "chariots" },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [70, 46], size: [30, 4], label: "Fabius" },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [28, 46], size: [30, 4], label: "Decius" },
          { id: "rom-lcav", faction: "rome", kind: "cavalry", at: [10, 42], size: [12, 3] },
        ],
        caveat: "Detaching the Etruscans and Umbrians before the battle is the strategic move the whole campaign turns on, and it is better attested than anything that happened on the field.",
      },
      {
        id: "chariots",
        title: "The chariots break the Roman left",
        description: "Decius attacks hard on the left and his cavalry is scattered by Gallic chariots — a weapon Roman troops had not faced. The left begins to give way.",
        certainty: "traditional",
        units: [
          { id: "sam-line", faction: "samnite", kind: "infantry", at: [70, 34], size: [30, 4] },
          { id: "gaul-line", faction: "gaul", kind: "infantry", at: [28, 34], size: [30, 5] },
          { id: "gaul-chariots", faction: "gaul", kind: "cavalry", at: [16, 40], size: [16, 3] },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [70, 44], size: [30, 4] },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [30, 46], size: [28, 4], routed: true, label: "gives way" },
          { id: "rom-lcav", faction: "rome", kind: "cavalry", at: [8, 50], size: [12, 3], routed: true },
        ],
        arrows: [{ id: "a1", from: [18, 37], to: [12, 46], faction: "gaul", kind: "attack" }],
      },
      {
        id: "devotio",
        title: "Decius devotes himself",
        description: "With his wing breaking, the consul calls on the state priest to pronounce the formula that consigns him and the enemy together to the gods of the underworld, and rides into the Gallic line to die. His father had done the same at Vesuvius sixty years before.",
        certainty: "traditional",
        units: [
          { id: "gaul-line", faction: "gaul", kind: "infantry", at: [28, 34], size: [30, 5] },
          { id: "sam-line", faction: "samnite", kind: "infantry", at: [70, 34], size: [30, 4] },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [30, 48], size: [28, 4], label: "the left steadies" },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [70, 42], size: [30, 4] },
        ],
        arrows: [{ id: "a1", from: [30, 44], to: [30, 38], faction: "rome", kind: "attack", label: "the consul rides in" }],
        caveat: "A devotio in the family for the second and possibly third time is the kind of thing a family tradition produces. What it explains — why a breaking wing held — is exactly what such a story is for.",
      },
      {
        id: "won",
        title: "Fabius wins on the right and takes the camp",
        description: "Fabius has fought a deliberately slow action all day; now he commits his reserves, breaks the Samnites, and sends a force round to their camp. Caught between that and the steadied left, the coalition army is destroyed and never re-formed.",
        certainty: "probable",
        units: [
          { id: "sam-line", faction: "samnite", kind: "infantry", at: [66, 34], size: [26, 4], routed: true, label: "broken" },
          { id: "gaul-line", faction: "gaul", kind: "infantry", at: [28, 34], size: [26, 5], routed: true },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [66, 42], size: [30, 4] },
          { id: "rom-flank", faction: "rome", kind: "infantry", at: [90, 28], size: [14, 4], label: "round to the camp" },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [30, 46], size: [28, 4] },
        ],
        arrows: [
          { id: "a1", from: [66, 41], to: [66, 36], faction: "rome", kind: "attack" },
          { id: "a2", from: [88, 34], to: [80, 30], faction: "rome", kind: "attack" },
        ],
      },
    ],
  },

  heraclea: {
    scaleNote: "The crossing of the Siris near Heraclea. Relative frontages only: Rome's first battle against a Hellenistic army, and the first against elephants.",
    orientation: "Rome came from the north bank; Pyrrhus held the south.",
    sourceIds: ["plutarch-pyrrhus"],
    terrain: [
      { id: "siris", kind: "river", points: [[0, 32], [28, 34], [58, 31], [100, 33]], label: "the Siris", labelAt: [80, 26] },
    ],
    stages: [
      {
        id: "crossing",
        title: "Rome forces the crossing",
        description: "Laevinus puts his army over the river rather than wait to be attacked. Pyrrhus' cavalry rides down to contest the crossing and cannot hold it, and the two infantry lines come together on the south bank.",
        certainty: "probable",
        units: [
          { id: "epi-cav", faction: "epirote", kind: "cavalry", at: [50, 26], size: [22, 3.5], label: "Thessalian horse" },
          { id: "epi-phalanx", faction: "epirote", kind: "phalanx", at: [50, 16], size: [34, 6], label: "the pike phalanx" },
          { id: "epi-eles", faction: "epirote", kind: "elephants", at: [82, 14], size: [14, 3], label: "twenty elephants" },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [44, 44], size: [36, 4], label: "the legions cross" },
          { id: "rom-cav", faction: "rome", kind: "cavalry", at: [14, 44], size: [12, 3] },
        ],
        arrows: [{ id: "a1", from: [44, 40], to: [44, 32], faction: "rome", kind: "attack" }],
      },
      {
        id: "grind",
        title: "Pike against sword, and neither breaks",
        description: "The phalanx and the legions push at each other repeatedly without a decision — closer than either side expected, and the thing that made Rome's later wars in the east thinkable.",
        certainty: "probable",
        units: [
          { id: "epi-phalanx", faction: "epirote", kind: "phalanx", at: [50, 24], size: [34, 6] },
          { id: "epi-eles", faction: "epirote", kind: "elephants", at: [82, 16], size: [14, 3] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [48, 36], size: [36, 4] },
          { id: "rom-cav", faction: "rome", kind: "cavalry", at: [14, 40], size: [12, 3] },
        ],
        arrows: [
          { id: "a1", from: [48, 33], to: [48, 29], faction: "rome", kind: "attack" },
          { id: "a2", from: [56, 28], to: [56, 32], faction: "epirote", kind: "attack" },
        ],
        caveat: "Plutarch reports seven charges and counter-charges, which is a way of saying the infantry fight was indecisive rather than a count.",
      },
      {
        id: "elephants",
        title: "The elephants go in",
        description: "Pyrrhus sends the elephants against the Roman cavalry. The horses will not face them, the wing goes, and the Epirote cavalry rides into the flank of an infantry line that is still locked to its front.",
        certainty: "probable",
        units: [
          { id: "epi-phalanx", faction: "epirote", kind: "phalanx", at: [50, 26], size: [34, 6] },
          { id: "epi-eles", faction: "epirote", kind: "elephants", at: [22, 34], size: [16, 3], label: "against the horse" },
          { id: "epi-cav", faction: "epirote", kind: "cavalry", at: [26, 24], size: [16, 3.5] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [54, 38], size: [34, 4] },
          { id: "rom-cav", faction: "rome", kind: "cavalry", at: [14, 46], size: [12, 3], routed: true, label: "will not face them" },
        ],
        arrows: [
          { id: "a1", from: [22, 37], to: [16, 43], faction: "epirote", kind: "attack" },
          { id: "a2", from: [30, 27], to: [40, 36], faction: "epirote", kind: "attack", bow: 4 },
        ],
      },
      {
        id: "withdraw",
        title: "Rome falls back over the river",
        description: "The legions break off and recross the Siris. Pyrrhus has won and has lost men he cannot replace in Italy — and Rome, which has lost more, simply raises another army. That asymmetry is the whole war.",
        certainty: "probable",
        units: [
          { id: "epi-phalanx", faction: "epirote", kind: "phalanx", at: [50, 28], size: [34, 6], label: "holds the field" },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [56, 42], size: [30, 4], routed: true, label: "back over the river" },
        ],
        arrows: [{ id: "a1", from: [50, 44], to: [30, 50], faction: "rome", kind: "retreat" }],
        caveat: "The casualty figures come through two ancient traditions that differ by a factor of two; Plutarch reports both without deciding.",
      },
    ],
  },

  asculum: {
    scaleNote: "Broken ground by a river, and the open plain beyond it. Plutarch preserves a one-day and a two-day version of this battle and does not choose between them.",
    sourceIds: ["plutarch-pyrrhus"],
    terrain: [
      { id: "river", kind: "river", points: [[0, 44], [26, 46], [56, 43], [100, 45]], label: "the river", labelAt: [14, 50] },
      { id: "rough", kind: "woods", points: [[14, 22], [46, 20], [52, 38], [16, 40]], label: "broken, wooded ground", labelAt: [22, 15] },
    ],
    stages: [
      {
        id: "chooses-ground",
        title: "Rome picks ground a phalanx cannot use",
        description: "Having learned at Heraclea what open country costs, the consuls take a position in broken wooded ground by the river where a pike block cannot keep its line and elephants cannot be brought to bear.",
        certainty: "probable",
        units: [
          { id: "epi-phalanx", faction: "epirote", kind: "phalanx", at: [56, 14], size: [36, 6], label: "the phalanx" },
          { id: "epi-eles", faction: "epirote", kind: "elephants", at: [86, 20], size: [14, 3], label: "nineteen elephants" },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [30, 30], size: [26, 4], label: "in the rough ground" },
          { id: "rom-carts", faction: "rome", kind: "works", at: [30, 38], size: [24, 2.4], label: "anti-elephant carts" },
        ],
        caveat: "The spiked and fire-carrying carts are described only in the later tradition; that Rome had prepared something against the elephants is agreed.",
      },
      {
        id: "phalanx-stalls",
        title: "The pikes cannot close",
        description: "In among the trees and gullies the phalanx loses its front and the fight becomes a series of separate scuffles, which is exactly what Rome wants. The first day goes to the Romans, or to nobody.",
        certainty: "disputed",
        units: [
          { id: "epi-phalanx", faction: "epirote", kind: "phalanx", at: [52, 22], size: [36, 6], label: "front broken up" },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [32, 30], size: [26, 4] },
          { id: "rom-carts", faction: "rome", kind: "works", at: [32, 38], size: [24, 2.4] },
        ],
        arrows: [{ id: "a1", from: [46, 26], to: [40, 29], faction: "epirote", kind: "attack" }],
        caveat: "Whether there was a first day at all is one of the two versions Plutarch gives.",
      },
      {
        id: "open-ground",
        title: "Pyrrhus shifts the battle onto the plain",
        description: "He manoeuvres to draw the Romans out of the rough ground onto level country, where the phalanx can form properly and the elephants can be used. On that ground the result is not in doubt.",
        certainty: "disputed",
        units: [
          { id: "epi-phalanx", faction: "epirote", kind: "phalanx", at: [56, 26], size: [38, 6], label: "formed on the level" },
          { id: "epi-eles", faction: "epirote", kind: "elephants", at: [84, 30], size: [16, 3] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [56, 40], size: [32, 4], label: "drawn onto the plain" },
        ],
        arrows: [{ id: "a1", from: [56, 36], to: [56, 31], faction: "rome", kind: "attack" }],
      },
      {
        id: "pyrrhic",
        title: "A victory he cannot afford",
        description: "The elephants break the Roman line and the legions withdraw to their camp in order. Pyrrhus holds the field and his casualty list is full of the officers and Greek veterans he brought with him — men no Italian recruit can replace, and no recruit at all can take a place in a phalanx.",
        certainty: "probable",
        units: [
          { id: "epi-phalanx", faction: "epirote", kind: "phalanx", at: [56, 28], size: [36, 6] },
          { id: "epi-eles", faction: "epirote", kind: "elephants", at: [56, 36], size: [18, 3], label: "decide it again" },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [56, 46], size: [28, 4], routed: true, label: "back to camp" },
        ],
        arrows: [{ id: "a1", from: [56, 39], to: [56, 43], faction: "epirote", kind: "attack" }],
        caveat: "The remark that another such victory would finish him is reported by Plutarch two centuries later, not by any contemporary.",
      },
    ],
  },

  beneventum: {
    scaleNote: "A Roman camp in wooded hill country near Malventum, and the night march that was meant to surprise it. The site is not located and even the outcome is reported differently.",
    sourceIds: ["plutarch-pyrrhus"],
    terrain: [
      { id: "hills", kind: "hill", points: [[8, 8], [44, 4], [78, 9], [96, 6], [94, 26], [62, 30], [30, 26], [8, 28]], label: "wooded hills", labelAt: [50, 17] },
    ],
    stages: [
      {
        id: "night-march",
        title: "A night march over the hills",
        description: "Back from three years in Sicily with a smaller army and fewer friends, Pyrrhus tries to end the war with a surprise: a night approach over wooded high ground to fall on a Roman camp before dawn.",
        certainty: "probable",
        units: [
          { id: "epi-col", faction: "epirote", kind: "infantry", at: [30, 14], size: [22, 4], label: "by night, over the hills" },
          { id: "epi-eles", faction: "epirote", kind: "elephants", at: [16, 22], size: [12, 3] },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [66, 46], size: [24, 14], label: "the Roman camp" },
        ],
        arrows: [{ id: "a1", from: [40, 16], to: [56, 34], faction: "epirote", kind: "move", bow: 5 }],
      },
      {
        id: "lost",
        title: "Lost in the woods, and seen in daylight",
        description: "The guides fail, the columns lose the way and each other, and the force comes down out of the trees strung out and visible in full daylight. Whatever advantage a night attack had is gone.",
        certainty: "probable",
        units: [
          { id: "epi-col", faction: "epirote", kind: "infantry", at: [44, 24], size: [20, 4], routed: true, label: "strung out" },
          { id: "epi-eles", faction: "epirote", kind: "elephants", at: [26, 26], size: [12, 3] },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [66, 46], size: [24, 14] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [64, 34], size: [28, 4], label: "forms outside the camp" },
        ],
        caveat: "That the march went wrong is agreed; the detail of failed guides is Plutarch's.",
      },
      {
        id: "attack",
        title: "The attack goes in anyway",
        description: "Pyrrhus attacks a formed Roman army in front of its own camp instead of a sleeping one inside it. The elephants go in with the infantry, as they had at Heraclea and Asculum.",
        certainty: "probable",
        units: [
          { id: "epi-col", faction: "epirote", kind: "infantry", at: [52, 28], size: [26, 4] },
          { id: "epi-eles", faction: "epirote", kind: "elephants", at: [52, 34], size: [16, 3], label: "the elephants lead" },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [60, 42], size: [30, 4] },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [66, 54], size: [24, 12] },
        ],
        arrows: [{ id: "a1", from: [54, 37], to: [58, 39], faction: "epirote", kind: "attack" }],
      },
      {
        id: "driven-back",
        title: "The elephants are turned back into their own line",
        description: "Missiles from the camp's works panic the elephants, which go back through the troops behind them. The day ends with Pyrrhus checked and some of the animals captured and shown at Rome. He sails for Epirus, and the professional army of the Hellenistic world has been beaten by a militia that could replace its losses.",
        certainty: "disputed",
        units: [
          { id: "epi-col", faction: "epirote", kind: "infantry", at: [50, 26], size: [24, 4], routed: true, label: "disordered from behind" },
          { id: "epi-eles", faction: "epirote", kind: "elephants", at: [50, 32], size: [16, 3], routed: true, label: "turned back" },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [60, 42], size: [30, 4], label: "holds" },
        ],
        arrows: [{ id: "a1", from: [56, 39], to: [52, 35], faction: "rome", kind: "missile" }],
        caveat: "Some accounts make the day a draw rather than a Roman victory. What all of them agree on is what happened next: Pyrrhus left Italy for good.",
      },
    ],
  },

  // ── First Punic War ──────────────────────────────────────────────────────
  messana: {
    scaleNote: "The ground around Messana and the strait behind it. The sources give a sequence of confrontations, not a battlefield, so this is drawn as a situation rather than a line of battle.",
    orientation: "The strait of Messana lies east, Italy beyond it.",
    sourceIds: ["polybius-1", "lazenby-1996"],
    terrain: [
      { id: "strait", kind: "sea", points: [[84, 0], [100, 0], [100, 68], [84, 68]], label: "the strait", labelAt: [92, 40] },
      { id: "shore", kind: "coast", points: [[84, 0], [82, 18], [85, 38], [82, 68]] },
      { id: "messana", kind: "town", at: [70, 34], size: [18, 12], label: "Messana" },
    ],
    stages: [
      {
        id: "besieged",
        title: "Messana is blockaded by both powers at once",
        description: "The Mamertines hold the city, having appealed to Carthage and to Rome in turn. Hiero of Syracuse camps on one side, a Carthaginian force under Hanno on the other, and the consul Appius Claudius waits at Rhegium across the strait.",
        certainty: "probable",
        units: [
          { id: "car-camp", faction: "carthage", kind: "camp", at: [62, 12], size: [18, 10], label: "Hanno" },
          { id: "syr-camp", faction: "syracuse", kind: "camp", at: [60, 56], size: [18, 10], label: "Hiero of Syracuse" },
          { id: "rom-army", faction: "rome", kind: "infantry", at: [94, 50], size: [10, 3.5], label: "at Rhegium" },
        ],
        caveat: "The two besieging camps are placed on either side of the city for legibility; no source records where they stood.",
      },
      {
        id: "crossing",
        title: "The consul crosses the strait",
        description: "Appius Claudius ferries his legions over the strait — by night, in the tradition — evading the Carthaginian squadron and getting into Messana. A local quarrel has become a war between the two great powers of the western Mediterranean.",
        certainty: "attested",
        units: [
          { id: "car-camp", faction: "carthage", kind: "camp", at: [62, 12], size: [18, 10] },
          { id: "syr-camp", faction: "syracuse", kind: "camp", at: [60, 56], size: [18, 10] },
          { id: "rom-army", faction: "rome", kind: "infantry", at: [72, 46], size: [16, 4], label: "into the city" },
        ],
        arrows: [{ id: "a1", from: [94, 46], to: [78, 44], faction: "rome", kind: "move", bow: -5, label: "over the strait" }],
      },
      {
        id: "sorties",
        title: "Each besieger is fought separately",
        description: "From inside Messana the consul attacks the two armies one at a time rather than both together. Neither ally comes to the other's help, and the alliance between Carthage and Syracuse achieves nothing.",
        certainty: "disputed",
        units: [
          { id: "car-camp", faction: "carthage", kind: "camp", at: [62, 12], size: [18, 10] },
          { id: "syr-camp", faction: "syracuse", kind: "camp", at: [60, 56], size: [18, 10] },
          { id: "rom-army", faction: "rome", kind: "infantry", at: [70, 34], size: [16, 4], label: "the consul's army" },
        ],
        arrows: [
          { id: "a1", from: [64, 40], to: [60, 50], faction: "rome", kind: "attack", label: "first" },
          { id: "a2", from: [64, 28], to: [62, 18], faction: "rome", kind: "attack", label: "then" },
        ],
        caveat: "Polybius, Diodorus and the later epitomes disagree on the order, the scale, and even whether both actions were fought; this stage shows the shape they share.",
      },
      {
        id: "lifted",
        title: "Both armies withdraw and the siege is lifted",
        description: "Hiero falls back on Syracuse and Hanno on the Carthaginian ports in the west. Rome holds Messana, keeps a foothold in Sicily, and in the following year Hiero changes sides.",
        certainty: "probable",
        units: [
          { id: "car-camp", faction: "carthage", kind: "camp", at: [56, 8], size: [16, 9], routed: true },
          { id: "syr-camp", faction: "syracuse", kind: "camp", at: [54, 60], size: [16, 9], routed: true, label: "to Syracuse" },
          { id: "rom-army", faction: "rome", kind: "infantry", at: [70, 34], size: [16, 4], label: "Rome holds Messana" },
        ],
        arrows: [
          { id: "a1", from: [50, 56], to: [34, 62], faction: "syracuse", kind: "retreat" },
          { id: "a2", from: [50, 10], to: [30, 8], faction: "carthage", kind: "retreat", label: "to the western ports" },
        ],
      },
    ],
  },

  agrigentum: {
    scaleNote: "The investment of Akragas and the relief battle fought outside the Roman lines. The circuit of the works and the position of the camps are schematic — Polybius records that they existed, not where they ran.",
    orientation: "The city stands on its ridge; the relief army came up from the country to the south.",
    sourceIds: ["polybius-1", "lazenby-1996", "hoyos-2015"],
    terrain: [
      { id: "akragas", kind: "town", at: [50, 20], size: [24, 10], label: "Akragas" },
    ],
    stages: [
      {
        id: "invest",
        title: "Rome shuts the city in",
        description: "Two consular armies camp on either side of Akragas and join their camps with a ditch and rampart, sealing the city and the very large population that has taken refuge in it. Rome is now conducting a siege, not defending Messana.",
        certainty: "attested",
        units: [
          { id: "rom-works", faction: "rome", kind: "works", at: [50, 20], size: [56, 26] },
          { id: "rom-camp-w", faction: "rome", kind: "camp", at: [12, 20], size: [15, 12] },
          { id: "rom-camp-e", faction: "rome", kind: "camp", at: [88, 20], size: [15, 12] },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [50, 12], size: [18, 3], label: "garrison and refugees" },
        ],
        caveat: "The lines are drawn as a closed ring because that was their purpose; their actual course is unrecorded.",
      },
      {
        id: "besiegers-besieged",
        title: "The besiegers are themselves cut off",
        description: "Hanno lands a relief army with elephants, seizes the place where the Roman supplies are collected, and camps within sight of the lines. Numidian horse ride down the Roman foraging parties, and for months the army outside the walls is as hungry as the city inside them.",
        certainty: "probable",
        units: [
          { id: "rom-works", faction: "rome", kind: "works", at: [50, 20], size: [56, 26] },
          { id: "rom-camp-w", faction: "rome", kind: "camp", at: [12, 20], size: [15, 12] },
          { id: "rom-camp-e", faction: "rome", kind: "camp", at: [88, 20], size: [15, 12] },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [50, 12], size: [18, 3] },
          { id: "car-relief", faction: "carthage", kind: "infantry", at: [50, 50], size: [32, 4], label: "Hanno's relief army" },
          { id: "car-cav", faction: "carthage", kind: "cavalry", at: [80, 44], size: [12, 3], label: "Numidian horse" },
        ],
        arrows: [{ id: "a1", from: [76, 46], to: [64, 40], faction: "carthage", kind: "attack", bow: 4, label: "supply route cut" }],
        caveat: "The Roman supply base — Herbessus in Polybius — has no agreed site and is not drawn.",
      },
      {
        id: "relief-battle",
        title: "The relief battle",
        description: "With both armies starving, the Romans come out of their lines and offer battle. Hanno puts his hired troops in the front rank and keeps the elephants and his best men behind them.",
        certainty: "probable",
        units: [
          { id: "rom-works", faction: "rome", kind: "works", at: [50, 20], size: [56, 26] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [50, 40], size: [34, 4], label: "the legions come out" },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [50, 12], size: [18, 3] },
          { id: "car-line", faction: "carthage", kind: "infantry", at: [50, 50], size: [34, 4], label: "hired troops in front" },
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [46, 58], size: [24, 3] },
        ],
        arrows: [{ id: "a1", from: [50, 45], to: [50, 51], faction: "rome", kind: "attack" }],
      },
      {
        id: "garrison-slips-out",
        title: "The front rank breaks and the garrison slips away",
        description: "The mercenaries give way and are driven back through their own elephants and camp. But Hannibal Gisco leads the garrison out of Akragas by night through the Roman lines, so Rome takes the city without taking the army in it — and sells its people into slavery, which costs Rome Sicilian goodwill for years.",
        certainty: "attested",
        units: [
          { id: "rom-works", faction: "rome", kind: "works", at: [50, 20], size: [56, 26] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [50, 40], size: [34, 4] },
          { id: "car-line", faction: "carthage", kind: "infantry", at: [50, 50], size: [30, 4], routed: true, label: "broken" },
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [46, 58], size: [22, 3], routed: true, label: "driven back" },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [50, 12], size: [16, 3], routed: true, label: "the garrison escapes by night" },
        ],
        arrows: [
          { id: "a1", from: [42, 10], to: [16, 6], faction: "carthage", kind: "retreat" },
          { id: "a2", from: [50, 45], to: [50, 51], faction: "rome", kind: "attack" },
        ],
        caveat: "Whether the escape was a failure of the Roman watch or a deliberate exchange of city for army is not recoverable.",
      },
    ],
  },

  mylae: {
    scaleNote: "Schematic fleet frontages off the north-eastern Sicilian coast; no source preserves a ship-by-ship track.",
    orientation: "The Sicilian shore lies to the south.",
    sourceIds: ["polybius-1", "zonaras-8"],
    terrain: [
      { id: "sea", kind: "sea", points: [[0, 0], [100, 0], [100, 54], [0, 54]] },
      { id: "shore", kind: "coast", points: [[0, 54], [26, 56], [54, 55], [80, 57], [100, 56]] },
      { id: "mylae", kind: "town", at: [40, 61], size: [9, 4], label: "Mylae" },
    ],
    stages: [
      {
        id: "approach",
        title: "The fleets make contact",
        description: "The Carthaginian van comes on in loose order, expecting to outmanoeuvre crews new to the sea. The Roman line waits with boarding bridges raised.",
        certainty: "probable",
        units: [
          { id: "car-van", faction: "carthage", kind: "ships", at: [50, 16], size: [46, 4], label: "Carthaginian van" },
          { id: "car-rear", faction: "carthage", kind: "ships", at: [50, 8], size: [30, 4] },
          { id: "rom-line", faction: "rome", kind: "ships", at: [50, 38], size: [44, 4], label: "Roman line" },
        ],
        arrows: [{ id: "a1", from: [50, 21], to: [50, 32], faction: "carthage", kind: "move", label: "advance" }],
        caveat: "Fleet totals are literary estimates; the diagram shows relative frontage only.",
      },
      {
        id: "corvus",
        title: "Boarding bridges come down",
        description: "The leading Carthaginian ships are grappled and held. Close action becomes an infantry fight fought across coupled hulls, where Rome has the advantage.",
        certainty: "attested",
        units: [
          { id: "car-van", faction: "carthage", kind: "ships", at: [50, 26], size: [40, 4], label: "grappled" },
          { id: "car-rear", faction: "carthage", kind: "ships", at: [50, 9], size: [30, 4] },
          { id: "rom-line", faction: "rome", kind: "ships", at: [50, 33], size: [44, 4] },
        ],
        arrows: [{ id: "a1", from: [50, 32], to: [50, 27], faction: "rome", kind: "attack", label: "boarding" }],
        caveat: "The construction and handling of the corvus are debated; only its effect is attested.",
      },
      {
        id: "flanks",
        title: "The following ships try the flanks",
        description: "Carthaginian vessels astern work round the Roman wings to attack from the side and rear, and are caught in the same boarding actions as they close.",
        certainty: "probable",
        units: [
          { id: "car-van", faction: "carthage", kind: "ships", at: [50, 26], size: [40, 4], routed: true },
          { id: "car-left", faction: "carthage", kind: "ships", at: [16, 34], size: [16, 4] },
          { id: "car-right", faction: "carthage", kind: "ships", at: [84, 34], size: [16, 4] },
          { id: "rom-line", faction: "rome", kind: "ships", at: [50, 33], size: [44, 4] },
        ],
        arrows: [
          { id: "a1", from: [18, 30], to: [32, 32], faction: "carthage", kind: "attack", bow: -4 },
          { id: "a2", from: [82, 30], to: [68, 32], faction: "carthage", kind: "attack", bow: 4 },
        ],
      },
      {
        id: "withdrawal",
        title: "Carthage breaks off",
        description: "With about fifty ships taken or sunk, the survivors use their speed to disengage. Rome holds the water and Duilius is granted a triumph.",
        certainty: "attested",
        units: [
          { id: "car-remnant", faction: "carthage", kind: "ships", at: [50, 8], size: [26, 4], routed: true, label: "withdrawing" },
          { id: "rom-line", faction: "rome", kind: "ships", at: [50, 30], size: [46, 4], label: "Rome holds the field" },
        ],
        arrows: [{ id: "a1", from: [50, 18], to: [50, 5], faction: "carthage", kind: "retreat" }],
      },
    ],
  },

  tyndaris: {
    scaleNote: "Relative frontages in the water off Tyndaris. What the sources describe is a command failure rather than a fleet manoeuvre, so the diagram shows the order of the squadrons, not a track.",
    orientation: "The northern Sicilian shore lies south.",
    sourceIds: ["polybius-1", "lazenby-1996"],
    terrain: [
      { id: "sea", kind: "sea", points: [[0, 0], [100, 0], [100, 56], [0, 56]] },
      { id: "shore", kind: "coast", points: [[0, 56], [30, 58], [58, 56], [86, 58], [100, 57]] },
      { id: "tyndaris", kind: "town", at: [46, 62], size: [11, 4], label: "Tyndaris" },
    ],
    stages: [
      {
        id: "sighted",
        title: "A Carthaginian fleet passes in loose order",
        description: "From the shore at Tyndaris the consul Gaius Atilius Regulus sees the Carthaginian fleet sailing by without formation, and puts out to take the chance.",
        certainty: "probable",
        units: [
          { id: "car-loose", faction: "carthage", kind: "ships", at: [58, 18], size: [42, 4], label: "sailing without order" },
          { id: "rom-main", faction: "rome", kind: "ships", at: [30, 44], size: [40, 4], label: "the Roman fleet" },
        ],
        arrows: [{ id: "a1", from: [30, 40], to: [40, 26], faction: "rome", kind: "move" }],
      },
      {
        id: "ahead",
        title: "The consul gets ahead of his own line",
        description: "Regulus sails first with ten ships and outruns the rest of the fleet, which has not finished forming. His squadron is alone and unsupported before the enemy.",
        certainty: "attested",
        units: [
          { id: "car-loose", faction: "carthage", kind: "ships", at: [58, 18], size: [42, 4] },
          { id: "rom-van", faction: "rome", kind: "ships", at: [52, 30], size: [11, 4], label: "the consul, with ten" },
          { id: "rom-main", faction: "rome", kind: "ships", at: [26, 46], size: [38, 4], label: "the rest still astern" },
        ],
        arrows: [{ id: "a1", from: [44, 38], to: [52, 26], faction: "rome", kind: "move" }],
        caveat: "Why the consul went on ahead is not explained: eagerness, a signal misread, or a squadron that was simply readier than the rest.",
      },
      {
        id: "cut-off",
        title: "The ten are surrounded",
        description: "The Carthaginians turn on the isolated squadron and close on it from both sides. Nine of the ten are sunk or taken; the consul's own ship escapes only because it is fast and well handled.",
        certainty: "probable",
        units: [
          { id: "car-left", faction: "carthage", kind: "ships", at: [42, 22], size: [22, 4] },
          { id: "car-right", faction: "carthage", kind: "ships", at: [72, 22], size: [20, 4] },
          { id: "rom-van", faction: "rome", kind: "ships", at: [56, 30], size: [11, 4], routed: true, label: "nine lost" },
          { id: "rom-main", faction: "rome", kind: "ships", at: [26, 46], size: [38, 4] },
        ],
        arrows: [
          { id: "a1", from: [46, 26], to: [52, 29], faction: "carthage", kind: "attack", bow: -3 },
          { id: "a2", from: [70, 26], to: [61, 29], faction: "carthage", kind: "attack", bow: 3 },
        ],
      },
      {
        id: "main-fleet",
        title: "The main fleet comes up formed",
        description: "The Roman body arrives in order, and the advantage reverses: eight Carthaginian ships are sunk and ten taken, and the rest withdraw to the Lipari islands. Neither side has changed the strategic position.",
        certainty: "probable",
        units: [
          { id: "rom-line", faction: "rome", kind: "ships", at: [44, 38], size: [46, 4], label: "formed line" },
          { id: "car-lost", faction: "carthage", kind: "ships", at: [56, 24], size: [24, 4], routed: true, label: "eight sunk, ten taken" },
          { id: "car-away", faction: "carthage", kind: "ships", at: [86, 10], size: [16, 4], routed: true, label: "to Lipara" },
        ],
        arrows: [
          { id: "a1", from: [44, 34], to: [52, 28], faction: "rome", kind: "attack" },
          { id: "a2", from: [76, 20], to: [92, 8], faction: "carthage", kind: "retreat" },
        ],
        caveat: "Modern accounts call the day a small Roman success, a draw, or a Roman check; the ship totals come through Polybius alone.",
      },
    ],
  },

  "cape-ecnomus": {
    scaleNote: "The four Roman squadrons and the Carthaginian line, drawn as relative frontages off southern Sicily.",
    orientation: "Sicily lies to the north; Africa beyond the frame to the south.",
    sourceIds: ["polybius-1", "rankov-2011"],
    terrain: [
      { id: "sea", kind: "sea", points: [[0, 8], [100, 8], [100, 68], [0, 68]] },
      { id: "shore", kind: "coast", points: [[0, 9], [30, 7], [62, 9], [100, 8]] },
    ],
    stages: [
      {
        id: "wedge",
        title: "Rome advances in a wedge",
        description: "Two consular squadrons form the point, a third tows the transports behind, and a fourth guards the rear. Carthage extends a long line to overlap it.",
        certainty: "probable",
        units: [
          { id: "car-line", faction: "carthage", kind: "ships", at: [50, 44], size: [80, 4], label: "Carthaginian line" },
          { id: "rom-1", faction: "rome", kind: "ships", at: [42, 22], size: [20, 4], label: "I" },
          { id: "rom-2", faction: "rome", kind: "ships", at: [58, 22], size: [20, 4], label: "II" },
          { id: "rom-3", faction: "rome", kind: "ships", at: [50, 15], size: [30, 4], label: "III, with transports" },
          { id: "rom-4", faction: "rome", kind: "ships", at: [50, 10], size: [26, 4], label: "IV" },
        ],
        arrows: [{ id: "a1", from: [50, 27], to: [50, 38], faction: "rome", kind: "move" }],
        caveat: "The wedge is Polybius' description; its precise geometry is a modern reading.",
      },
      {
        id: "centre-gives",
        title: "The Carthaginian centre withdraws",
        description: "The centre falls back to draw the Roman point forward and open a gap between it and the transports — a deliberate opening, not a rout.",
        certainty: "probable",
        units: [
          { id: "car-centre", faction: "carthage", kind: "ships", at: [50, 52], size: [36, 4], label: "centre falls back" },
          { id: "car-left", faction: "carthage", kind: "ships", at: [14, 42], size: [22, 4] },
          { id: "car-right", faction: "carthage", kind: "ships", at: [86, 42], size: [22, 4] },
          { id: "rom-1", faction: "rome", kind: "ships", at: [42, 32], size: [20, 4] },
          { id: "rom-2", faction: "rome", kind: "ships", at: [58, 32], size: [20, 4] },
          { id: "rom-3", faction: "rome", kind: "ships", at: [50, 15], size: [30, 4] },
          { id: "rom-4", faction: "rome", kind: "ships", at: [50, 10], size: [26, 4] },
        ],
        arrows: [
          { id: "a1", from: [50, 46], to: [50, 56], faction: "carthage", kind: "retreat", label: "feigned" },
          { id: "a2", from: [50, 34], to: [50, 44], faction: "rome", kind: "move", label: "pursues" },
        ],
      },
      {
        id: "three-fights",
        title: "The battle splits in three",
        description: "The Carthaginian wings turn inward against the transports and the rear guard. The action becomes three separate engagements fought at once.",
        certainty: "attested",
        units: [
          { id: "car-centre", faction: "carthage", kind: "ships", at: [50, 54], size: [30, 4] },
          { id: "car-left", faction: "carthage", kind: "ships", at: [22, 26], size: [22, 4] },
          { id: "car-right", faction: "carthage", kind: "ships", at: [78, 26], size: [22, 4] },
          { id: "rom-1", faction: "rome", kind: "ships", at: [46, 44], size: [20, 4] },
          { id: "rom-2", faction: "rome", kind: "ships", at: [58, 46], size: [20, 4] },
          { id: "rom-3", faction: "rome", kind: "ships", at: [44, 16], size: [26, 4], label: "transports" },
          { id: "rom-4", faction: "rome", kind: "ships", at: [66, 13], size: [24, 4] },
        ],
        arrows: [
          { id: "a1", from: [24, 30], to: [40, 17], faction: "carthage", kind: "attack", bow: -5 },
          { id: "a2", from: [76, 30], to: [66, 17], faction: "carthage", kind: "attack", bow: 4 },
        ],
      },
      {
        id: "won",
        title: "The squadrons win in turn",
        description: "The leading squadrons break the centre, then turn back to relieve the transports and rear guard. The way to Africa is open.",
        certainty: "probable",
        units: [
          { id: "car-remnant", faction: "carthage", kind: "ships", at: [50, 58], size: [24, 4], routed: true },
          { id: "car-left", faction: "carthage", kind: "ships", at: [20, 24], size: [18, 4], routed: true },
          { id: "rom-1", faction: "rome", kind: "ships", at: [48, 40], size: [22, 4] },
          { id: "rom-2", faction: "rome", kind: "ships", at: [62, 30], size: [20, 4] },
          { id: "rom-3", faction: "rome", kind: "ships", at: [44, 16], size: [26, 4] },
        ],
        arrows: [{ id: "a1", from: [56, 38], to: [46, 22], faction: "rome", kind: "attack", bow: 6, label: "turns back" }],
        caveat: "Ancient totals for ships and men are probably inflated.",
      },
    ],
  },

  adys: {
    scaleNote: "A hill and the ground below it. Adys has no accepted modern location, so the frame stands for the shape of the action Polybius describes and nothing more.",
    sourceIds: ["polybius-1", "lazenby-1996"],
    terrain: [
      { id: "height", kind: "hill", points: [[24, 8], [76, 6], [82, 26], [72, 34], [28, 34], [18, 26]], label: "the hill above Adys", labelAt: [66, 46] },
    ],
    stages: [
      {
        id: "on-the-hill",
        title: "Carthage camps on a hill",
        description: "Regulus advances on Adys, and the Carthaginian commanders take up a position on high ground close by. It is a safe camp and a bad choice: on that ground their cavalry and elephants — the arms that beat Roman armies in the open — can do nothing at all.",
        certainty: "attested",
        units: [
          { id: "car-camp", faction: "carthage", kind: "camp", at: [50, 16], size: [24, 10], label: "camp on the height" },
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [50, 26], size: [18, 3], label: "elephants, useless here" },
          { id: "car-cav", faction: "carthage", kind: "cavalry", at: [74, 22], size: [10, 3] },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [50, 54], size: [24, 10], label: "Roman camp" },
        ],
        caveat: "The hill is the shape of the account, not a located feature; the ancient toponym has no agreed modern identification.",
      },
      {
        id: "two-columns",
        title: "Two columns climb at dawn",
        description: "Rather than wait to be attacked on the plain, Regulus divides his army and sends it up the hill from two sides at once, so that a defender who turns to meet one column exposes himself to the other.",
        certainty: "probable",
        units: [
          { id: "car-camp", faction: "carthage", kind: "camp", at: [50, 16], size: [24, 10] },
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [50, 26], size: [18, 3] },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [22, 40], size: [16, 4], label: "one legion" },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [78, 40], size: [16, 4], label: "the other" },
        ],
        arrows: [
          { id: "a1", from: [22, 36], to: [30, 28], faction: "rome", kind: "attack", bow: -4 },
          { id: "a2", from: [78, 36], to: [70, 28], faction: "rome", kind: "attack", bow: 4 },
        ],
        caveat: "Polybius reports an attack from two sides; whether it was one plan or two commanders acting separately is not recoverable.",
      },
      {
        id: "charge-downhill",
        title: "The mercenaries charge, and follow too far",
        description: "The hired troops come out against the first legion and drive it back down the slope. In pursuing they leave the ground that made them safe, and the second column reaches the crest behind them.",
        certainty: "probable",
        units: [
          { id: "car-merc", faction: "carthage", kind: "infantry", at: [30, 34], size: [20, 4], label: "charges out" },
          { id: "car-camp", faction: "carthage", kind: "camp", at: [56, 14], size: [20, 9] },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [22, 48], size: [16, 4], routed: true, label: "driven back" },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [78, 34], size: [16, 4] },
        ],
        arrows: [
          { id: "a1", from: [28, 38], to: [24, 44], faction: "carthage", kind: "attack" },
          { id: "a2", from: [76, 31], to: [62, 22], faction: "rome", kind: "move", bow: 5, label: "gains the crest" },
        ],
      },
      {
        id: "broken",
        title: "Taken in the rear, the army breaks",
        description: "The second column comes down on the pursuers' rear and the whole Carthaginian force gives way. Only the cavalry and the elephants get off cleanly — on the plain nothing the Romans have can catch them, which is the lesson Xanthippus will apply on the Bagradas.",
        certainty: "attested",
        units: [
          { id: "car-merc", faction: "carthage", kind: "infantry", at: [30, 40], size: [20, 4], routed: true, label: "caught front and rear" },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [24, 50], size: [16, 4] },
          { id: "rom-flank", faction: "rome", kind: "infantry", at: [48, 30], size: [18, 4], label: "down on their rear" },
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [84, 14], size: [12, 3], routed: true, label: "get away" },
        ],
        arrows: [
          { id: "a1", from: [44, 34], to: [36, 37], faction: "rome", kind: "attack" },
          { id: "a2", from: [25, 47.5], to: [28, 42.5], faction: "rome", kind: "attack" },
          { id: "a3", from: [80, 18], to: [96, 10], faction: "carthage", kind: "retreat" },
        ],
      },
    ],
  },

  bagradas: {
    scaleNote: "Open ground on the lower Bagradas plain; the battlefield itself has never been fixed.",
    sourceIds: ["polybius-1", "hoyos-2015"],
    terrain: [
      { id: "river", kind: "river", points: [[0, 12], [30, 15], [62, 11], [100, 14]], label: "Bagradas" },
      { id: "plain", kind: "woods", points: [[0, 60], [100, 60], [100, 68], [0, 68]] },
    ],
    stages: [
      {
        id: "deploy",
        title: "Xanthippus deploys for open ground",
        description: "Elephants in front of the centre, Libyan and mercenary foot behind, cavalry massed on both wings — a deployment built to use the plain.",
        certainty: "probable",
        units: [
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [50, 30], size: [34, 3], label: "elephants" },
          { id: "car-foot", faction: "carthage", kind: "infantry", at: [50, 22], size: [34, 4] },
          { id: "car-lc", faction: "carthage", kind: "cavalry", at: [18, 26], size: [12, 3] },
          { id: "car-rc", faction: "carthage", kind: "cavalry", at: [82, 26], size: [12, 3] },
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [50, 46], size: [30, 5], label: "legions, deepened" },
          { id: "rom-lc", faction: "rome", kind: "cavalry", at: [26, 50], size: [8, 3] },
          { id: "rom-rc", faction: "rome", kind: "cavalry", at: [74, 50], size: [8, 3] },
        ],
        caveat: "Regulus is said to have narrowed and deepened his front against the elephants; the exact array is inferred.",
      },
      {
        id: "elephants",
        title: "The elephants go in",
        description: "The charge stalls the deep Roman centre and disorders it, while the Roman cavalry, badly outnumbered, is driven from both wings.",
        certainty: "probable",
        units: [
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [50, 40], size: [34, 3] },
          { id: "car-foot", faction: "carthage", kind: "infantry", at: [50, 26], size: [34, 4] },
          { id: "car-lc", faction: "carthage", kind: "cavalry", at: [24, 42], size: [12, 3] },
          { id: "car-rc", faction: "carthage", kind: "cavalry", at: [76, 42], size: [12, 3] },
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [50, 47], size: [28, 5] },
          { id: "rom-lc", faction: "rome", kind: "cavalry", at: [18, 56], size: [8, 3], routed: true },
          { id: "rom-rc", faction: "rome", kind: "cavalry", at: [82, 56], size: [8, 3], routed: true },
        ],
        arrows: [
          { id: "a1", from: [50, 34], to: [50, 43], faction: "carthage", kind: "attack" },
          { id: "a2", from: [26, 45], to: [20, 54], faction: "carthage", kind: "attack" },
          { id: "a3", from: [74, 45], to: [80, 54], faction: "carthage", kind: "attack" },
        ],
      },
      {
        id: "surrounded",
        title: "The wings close",
        description: "With its own cavalry gone, the Roman infantry is enveloped by horse from both flanks while the Libyan foot holds it in front.",
        certainty: "probable",
        units: [
          { id: "car-foot", faction: "carthage", kind: "infantry", at: [50, 38], size: [34, 4] },
          { id: "car-lc", faction: "carthage", kind: "cavalry", at: [30, 54], size: [12, 3] },
          { id: "car-rc", faction: "carthage", kind: "cavalry", at: [70, 54], size: [12, 3] },
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [50, 47], size: [24, 5] },
        ],
        arrows: [
          { id: "a1", from: [34, 52], to: [44, 48], faction: "carthage", kind: "attack", bow: -3 },
          { id: "a2", from: [66, 52], to: [56, 48], faction: "carthage", kind: "attack", bow: 3 },
        ],
      },
      {
        id: "destroyed",
        title: "The army is destroyed",
        description: "Only a small body cuts its way out to Aspis. Regulus is taken prisoner and Rome's African expedition is over.",
        certainty: "attested",
        units: [
          { id: "car-foot", faction: "carthage", kind: "infantry", at: [50, 40], size: [34, 4] },
          { id: "rom-remnant", faction: "rome", kind: "infantry", at: [70, 56], size: [10, 3], routed: true, label: "breaks out" },
        ],
        arrows: [{ id: "a1", from: [66, 54], to: [88, 62], faction: "rome", kind: "retreat", label: "to Aspis" }],
        caveat: "Casualty figures come through the literary tradition and are not independently verifiable.",
      },
    ],
  },

  panormus: {
    scaleNote: "The ground before Panormus, with the town wall and the ditch Metellus used.",
    orientation: "The city and its wall stand to the north.",
    sourceIds: ["polybius-1", "lazenby-1996"],
    terrain: [
      { id: "town", kind: "town", at: [50, 10], size: [22, 8], label: "Panormus" },
      { id: "wall", kind: "wall", points: [[30, 15], [70, 15]] },
      { id: "ditch", kind: "river", points: [[16, 30], [50, 32], [84, 30]], label: "ditch" },
    ],
    stages: [
      {
        id: "provoke",
        title: "Skirmishers draw the elephants on",
        description: "Metellus keeps his legions behind the wall and sends light troops beyond the ditch to shoot at the elephants and pull them forward.",
        certainty: "probable",
        units: [
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [50, 52], size: [40, 3], label: "elephants" },
          { id: "car-foot", faction: "carthage", kind: "infantry", at: [50, 60], size: [34, 4] },
          { id: "rom-skirm", faction: "rome", kind: "skirmishers", at: [50, 40], size: [30, 3], label: "velites" },
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [50, 20], size: [30, 4], label: "legions, in reserve" },
        ],
        arrows: [{ id: "a1", from: [50, 44], to: [50, 48], faction: "rome", kind: "missile", label: "missiles" }],
      },
      {
        id: "ditch",
        title: "The elephants crowd into the ditch",
        description: "Goaded and wounded, the animals press forward into the ditch where the skirmishers shelter and lose all order.",
        certainty: "probable",
        units: [
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [50, 34], size: [40, 3], routed: true },
          { id: "car-foot", faction: "carthage", kind: "infantry", at: [50, 58], size: [34, 4] },
          { id: "rom-skirm", faction: "rome", kind: "skirmishers", at: [50, 30], size: [30, 3] },
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [50, 20], size: [30, 4] },
        ],
        arrows: [{ id: "a1", from: [50, 44], to: [50, 36], faction: "carthage", kind: "move" }],
        caveat: "The use of the ditch is reconstructed from a literary account of the tactic, not from the ground.",
      },
      {
        id: "sally",
        title: "The legions come out",
        description: "With the elephants milling in front of their own line, Metellus brings the legions out through the gates against the exposed Carthaginian flank.",
        certainty: "attested",
        units: [
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [50, 34], size: [40, 3], routed: true },
          { id: "car-foot", faction: "carthage", kind: "infantry", at: [50, 58], size: [34, 4] },
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [40, 34], size: [26, 4] },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [74, 40], size: [18, 4] },
        ],
        arrows: [
          { id: "a1", from: [40, 28], to: [42, 40], faction: "rome", kind: "attack" },
          { id: "a2", from: [76, 30], to: [70, 50], faction: "rome", kind: "attack", bow: 6, label: "flank" },
        ],
        caveat: "That Metellus timed the sortie to the elephants' disorder is the point of the account, but no source says how the signal was given.",
      },
      {
        id: "captured",
        title: "The elephants are taken",
        description: "The Carthaginian line breaks. A large number of elephants is captured and paraded at Rome, and their terror as a weapon is broken with them.",
        certainty: "attested",
        units: [
          { id: "car-foot", faction: "carthage", kind: "infantry", at: [50, 62], size: [26, 4], routed: true },
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [50, 34], size: [34, 3], routed: true, label: "captured" },
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [50, 26], size: [34, 4] },
        ],
      },
    ],
  },

  lilybaeum: {
    scaleNote: "Nine years of operations at Lilybaeum, reduced to the four things that decided them. The lines are schematic: this is a siege whose separate actions the sources report without locating.",
    orientation: "The sea and the harbour lie west; the Roman lines faced the city from the landward side.",
    sourceIds: ["polybius-1", "lazenby-1996"],
    terrain: [
      { id: "sea", kind: "sea", points: [[0, 0], [30, 0], [28, 68], [0, 68]], label: "open sea", labelAt: [13, 62] },
      { id: "coast", kind: "coast", points: [[30, 0], [27, 18], [31, 36], [28, 54], [30, 68]] },
      { id: "city", kind: "town", at: [38, 34], size: [14, 22], label: "Lilybaeum" },
    ],
    stages: [
      {
        id: "invest",
        title: "Rome invests the city by land and sea",
        description: "Both consuls bring their armies up to Lilybaeum, entrench a line facing the landward wall, and bring siege engines against it. The fleet closes the harbour mouth. Everything depends on whether the sea can really be shut.",
        certainty: "probable",
        units: [
          { id: "rom-works", faction: "rome", kind: "works", at: [50, 34], size: [3, 46] },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [72, 34], size: [20, 20], label: "Roman camps" },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [14, 18], size: [22, 4], label: "the fleet closes the port" },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [44, 34], size: [3.5, 18], label: "Himilco's garrison" },
        ],
        caveat: "The siege ran from 250 to 241 and contained many operations; the line and camps stand for all of them.",
      },
      {
        id: "runners",
        title: "The harbour is never quite closed",
        description: "Rome tries to block the channel by sinking loaded hulls in it, and the sea and the shoals undo the work. Blockade-runners under a captain Polybius calls Hannibal the Rhodian sail in and out in daylight, so the city is never short of news or supplies.",
        certainty: "attested",
        units: [
          { id: "rom-works", faction: "rome", kind: "works", at: [50, 34], size: [3, 46] },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [72, 34], size: [20, 20] },
          { id: "rom-mole", faction: "rome", kind: "works", at: [21, 30], size: [12, 2], label: "the channel will not stay blocked" },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [14, 12], size: [20, 4] },
          { id: "car-runner", faction: "carthage", kind: "ships", at: [13, 46], size: [14, 4], label: "runners get in" },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [44, 34], size: [3.5, 18] },
        ],
        arrows: [{ id: "a1", from: [15, 42], to: [30, 36], faction: "carthage", kind: "move", bow: -4 }],
      },
      {
        id: "sortie",
        title: "A night sortie burns the works",
        description: "The mercenaries in the garrison come out against the sheds and towers and set them alight. A wind carries the fire along the whole line and the works burn out. Rome does not try to storm Lilybaeum again.",
        certainty: "probable",
        units: [
          { id: "rom-works", faction: "rome", kind: "works", at: [50, 34], size: [3, 46], routed: true, label: "the works burn" },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [72, 34], size: [20, 20] },
          { id: "car-sortie", faction: "carthage", kind: "infantry", at: [46, 34], size: [4, 22], label: "night sortie" },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [40, 18], size: [3.5, 8] },
        ],
        arrows: [{ id: "a1", from: [42, 48], to: [52, 48], faction: "carthage", kind: "attack", label: "fires the sheds" }],
        caveat: "The wind that spread the fire is Polybius' explanation of the outcome, not an independently recorded fact.",
      },
      {
        id: "blockade",
        title: "A blockade until the peace",
        description: "Rome settles for containment. Lilybaeum is still Carthaginian nine years later — it passes to Rome in 241 by the treaty that ends the war, not by assault. The city was never taken; the sea around it was.",
        certainty: "attested",
        units: [
          { id: "rom-works", faction: "rome", kind: "works", at: [50, 34], size: [3, 42] },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [72, 34], size: [20, 20] },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [14, 16], size: [24, 4], label: "the blockade holds" },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [44, 34], size: [3.5, 18], label: "holds out to 241" },
        ],
      },
    ],
  },

  drepana: {
    scaleNote: "The harbour approaches at Drepana; ship positions are impossible to recover in detail.",
    orientation: "The harbour and town lie east, the open sea west.",
    sourceIds: ["polybius-1", "lazenby-1996"],
    terrain: [
      { id: "sea", kind: "sea", points: [[0, 0], [72, 0], [72, 68], [0, 68]] },
      { id: "land", kind: "town", at: [88, 30], size: [16, 10], label: "Drepana" },
      { id: "coast", kind: "coast", points: [[72, 0], [70, 20], [74, 44], [70, 68]] },
    ],
    stages: [
      {
        id: "surprise",
        title: "Rome enters the harbour mouth",
        description: "Pulcher runs in at dawn hoping to catch the Carthaginian fleet at its moorings, his ships strung out in a long column through the approaches.",
        certainty: "probable",
        units: [
          { id: "rom-col", faction: "rome", kind: "ships", at: [40, 34], size: [46, 4], facing: 90, label: "Roman column" },
          { id: "car-moor", faction: "carthage", kind: "ships", at: [78, 44], size: [18, 4] },
        ],
        arrows: [{ id: "a1", from: [30, 30], to: [64, 34], faction: "rome", kind: "move" }],
      },
      {
        id: "adherbal-out",
        title: "Adherbal puts to sea instead",
        description: "Rather than be trapped, the Carthaginian fleet slips out by the far channel and forms in open water, ready and in order.",
        certainty: "attested",
        units: [
          { id: "rom-col", faction: "rome", kind: "ships", at: [46, 34], size: [46, 4], facing: 90 },
          { id: "car-line", faction: "carthage", kind: "ships", at: [26, 12], size: [40, 4], label: "forms at sea" },
        ],
        arrows: [{ id: "a1", from: [78, 50], to: [30, 16], faction: "carthage", kind: "move", bow: 14, label: "out by the channel" }],
        caveat: "Which channel Adherbal used, and whether the Roman column could have been recalled in time, are both modern reconstructions.",
      },
      {
        id: "trapped",
        title: "The Roman line is caught against the shore",
        description: "Reversing under pressure, the Roman ships lose cohesion with the land close behind them and no room to manoeuvre.",
        certainty: "probable",
        units: [
          { id: "rom-line", faction: "rome", kind: "ships", at: [56, 34], size: [40, 4], facing: 90 },
          { id: "car-line", faction: "carthage", kind: "ships", at: [34, 22], size: [44, 4] },
        ],
        arrows: [
          { id: "a1", from: [36, 28], to: [50, 34], faction: "carthage", kind: "attack" },
          { id: "a2", from: [58, 40], to: [66, 46], faction: "rome", kind: "retreat" },
        ],
        caveat: "Published tactical diagrams of this battle are modern interpretations of a brief account.",
      },
      {
        id: "defeat",
        title: "Rome's worst defeat at sea",
        description: "Ninety-three ships are lost. Pulcher escapes with the remainder, and Rome does not risk a major fleet again for years.",
        certainty: "attested",
        units: [
          { id: "rom-lost", faction: "rome", kind: "ships", at: [58, 38], size: [34, 4], routed: true, label: "taken" },
          { id: "rom-escape", faction: "rome", kind: "ships", at: [24, 58], size: [16, 4], routed: true },
          { id: "car-line", faction: "carthage", kind: "ships", at: [38, 24], size: [44, 4] },
        ],
        arrows: [{ id: "a1", from: [40, 52], to: [16, 62], faction: "rome", kind: "retreat", label: "escapes" }],
      },
    ],
  },

  aegates: {
    scaleNote: "The interception west of the Aegates; underwater finds continue to refine the battle zone.",
    orientation: "The islands lie east, toward Sicily.",
    sourceIds: ["polybius-1", "hoyos-2015"],
    terrain: [
      { id: "sea", kind: "sea", points: [[0, 0], [100, 0], [100, 68], [0, 68]] },
      { id: "isle1", kind: "hill", points: [[80, 30], [88, 28], [90, 36], [82, 38]], label: "Aegates" },
      { id: "isle2", kind: "hill", points: [[86, 46], [93, 45], [94, 51], [87, 52]] },
    ],
    stages: [
      {
        id: "convoy",
        title: "A convoy runs for Sicily",
        description: "Hanno's fleet sails heavily laden with supplies for the garrisons, counting on a following wind to carry it through.",
        certainty: "attested",
        units: [
          { id: "car-convoy", faction: "carthage", kind: "ships", at: [30, 22], size: [42, 4], label: "laden convoy" },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [56, 50], size: [40, 4], label: "Roman fleet" },
        ],
        arrows: [{ id: "a1", from: [50, 22], to: [76, 30], faction: "carthage", kind: "move", label: "for Sicily" }],
        caveat: "The convoy's size and whether it carried troops as well as supplies are reported inconsistently.",
      },
      {
        id: "intercept",
        title: "Catulus intercepts",
        description: "The rebuilt Roman fleet, trained and unencumbered, works up to windward and forces the convoy to fight before it can reach harbour.",
        certainty: "probable",
        units: [
          { id: "car-convoy", faction: "carthage", kind: "ships", at: [46, 26], size: [42, 4] },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [46, 42], size: [44, 4] },
        ],
        arrows: [{ id: "a1", from: [46, 38], to: [46, 31], faction: "rome", kind: "attack" }],
        caveat: "Whether Carthage lightened ship before contact is disputed.",
      },
      {
        id: "decided",
        title: "Weight tells against Carthage",
        description: "Loaded hulls handle badly against light, well-worked ships. Fifty are sunk and seventy taken; the rest run for home.",
        certainty: "attested",
        units: [
          { id: "car-lost", faction: "carthage", kind: "ships", at: [46, 28], size: [34, 4], routed: true, label: "sunk or taken" },
          { id: "car-escape", faction: "carthage", kind: "ships", at: [12, 16], size: [14, 4], routed: true },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [46, 40], size: [44, 4] },
        ],
        arrows: [{ id: "a1", from: [24, 22], to: [6, 12], faction: "carthage", kind: "retreat" }],
      },
      {
        id: "peace",
        title: "The war ends",
        description: "With the sea lost and Sicily unsupplied, Carthage authorises Hamilcar to make terms. The war closes after twenty-three years.",
        certainty: "attested",
        units: [{ id: "rom-fleet", faction: "rome", kind: "ships", at: [50, 34], size: [50, 4], label: "Rome commands the sea" }],
      },
    ],
  },

  // ── Second Punic War ─────────────────────────────────────────────────────
  saguntum: {
    scaleNote: "The town on its ridge and the sector Hannibal attacked. This was not a ring of works but a concentrated assault on one stretch of wall, and that is what the frame shows.",
    sourceIds: ["polybius-3", "livy-21-30"],
    terrain: [
      { id: "ridge", kind: "hill", points: [[28, 10], [72, 8], [78, 26], [22, 26]], label: "the ridge", labelAt: [88, 22] },
      { id: "town", kind: "town", at: [50, 17], size: [24, 10], label: "Saguntum" },
    ],
    stages: [
      {
        id: "one-weak-sector",
        title: "The one place where the ground was level",
        description: "Saguntum stands on a ridge and cannot be stormed from most sides. Hannibal brings his whole effort against the single stretch where the ground outside the wall is flat enough to bring up sheds, rams and towers.",
        certainty: "probable",
        units: [
          { id: "ib-def", faction: "iberian", kind: "infantry", at: [40, 11], size: [24, 2.6], label: "Saguntine defenders" },
          { id: "car-rams", faction: "carthage", kind: "works", at: [34, 28], size: [24, 2], label: "sheds, rams and towers" },
          { id: "car-main", faction: "carthage", kind: "infantry", at: [34, 40], size: [28, 4], label: "the whole weight of the attack" },
          { id: "car-camp", faction: "carthage", kind: "camp", at: [82, 48], size: [18, 12] },
        ],
        arrows: [{ id: "a1", from: [34, 36], to: [34, 31], faction: "carthage", kind: "attack" }],
        caveat: "Only one attackable sector is described; which side of the circuit it lay on is not recorded, and the rest is inferred from the site.",
      },
      {
        id: "breach-and-sally",
        title: "A breach, a counter-attack, and a wounded general",
        description: "A stretch of wall comes down, and before the assault can go in the Saguntines come out through the gap and fight in the open. Hannibal is wounded in the thigh and the attack is called off for days while he recovers.",
        certainty: "attested",
        units: [
          { id: "ib-def", faction: "iberian", kind: "infantry", at: [40, 11], size: [22, 2.6] },
          { id: "ib-sally", faction: "iberian", kind: "infantry", at: [30, 30], size: [16, 3], label: "the defenders come out" },
          { id: "car-rams", faction: "carthage", kind: "works", at: [40, 34], size: [22, 2], routed: true, label: "works driven back" },
          { id: "car-main", faction: "carthage", kind: "infantry", at: [40, 44], size: [26, 4], routed: true, label: "Hannibal wounded" },
          { id: "car-camp", faction: "carthage", kind: "camp", at: [82, 48], size: [18, 12] },
        ],
        arrows: [
          { id: "a1", from: [28, 33], to: [28, 39], faction: "iberian", kind: "attack" },
          { id: "a2", from: [48, 40], to: [48, 47], faction: "carthage", kind: "retreat" },
        ],
        caveat: "The falarica that wounded Hannibal is Livy's detail; the number and order of the assaults is compressed in both accounts.",
      },
      {
        id: "terrace-and-tower",
        title: "A terrace raised to the wall, and a moving tower",
        description: "The siege is resumed as engineering rather than assault: mines under the wall, a bank built up to the height of the parapet, and a tower rolled forward to clear the defenders off it. The wall is taken in sections.",
        certainty: "probable",
        units: [
          { id: "ib-def", faction: "iberian", kind: "infantry", at: [40, 11], size: [20, 2.6], label: "wall breached in places" },
          { id: "car-terrace", faction: "carthage", kind: "works", at: [38, 25], size: [30, 2.2] },
          { id: "car-tower", faction: "carthage", kind: "works", at: [66, 30], size: [6, 4], label: "tower" },
          { id: "car-main", faction: "carthage", kind: "infantry", at: [40, 40], size: [28, 4], label: "the assault renewed" },
          { id: "car-camp", faction: "carthage", kind: "camp", at: [82, 48], size: [18, 12] },
        ],
        arrows: [{ id: "a1", from: [40, 36], to: [40, 28], faction: "carthage", kind: "attack" }],
        caveat: "Mines, a raised bank and a movable tower are all reported; how they were arranged against the wall is not.",
      },
      {
        id: "stormed",
        title: "The city is stormed, and the war begins",
        description: "After months the inner town falls and the defenders who are left destroy their own property rather than surrender it. Rome, which sent embassies but no army, demands Hannibal's surrender, is refused, and declares war.",
        certainty: "attested",
        units: [
          { id: "ib-def", faction: "iberian", kind: "infantry", at: [40, 11], size: [16, 2.6], routed: true, label: "the last defence" },
          { id: "car-in", faction: "carthage", kind: "infantry", at: [40, 17], size: [18, 3], label: "inside the walls" },
          { id: "car-main", faction: "carthage", kind: "infantry", at: [40, 34], size: [24, 4] },
          { id: "car-camp", faction: "carthage", kind: "camp", at: [82, 48], size: [18, 12] },
        ],
        arrows: [{ id: "a1", from: [40, 30], to: [40, 21], faction: "carthage", kind: "attack" }],
        caveat: "Livy gives eight months, Polybius does not give a length; whether Saguntum lay inside or outside the Ebro understanding is itself disputed.",
      },
    ],
  },

  ticinus: {
    scaleNote: "A cavalry action on open ground north of the Po. The site is not fixed; the frame shows the order of the two forces, which is what the accounts actually preserve.",
    sourceIds: ["polybius-3", "livy-21-30"],
    terrain: [
      { id: "river", kind: "river", points: [[0, 64], [30, 66], [62, 63], [100, 65]], label: "the Ticinus, bridged behind them", labelAt: [58, 60] },
    ],
    stages: [
      {
        id: "advance-guards",
        title: "Two advance guards meet on the plain",
        description: "Each commander comes forward to see the other. Scipio puts his javelin-men in front of his cavalry; Hannibal keeps his close-order horse in the centre with the Numidians on the wings, and does not screen them at all.",
        certainty: "probable",
        units: [
          { id: "car-heavy", faction: "carthage", kind: "cavalry", at: [50, 18], size: [24, 3.5], label: "close-order horse" },
          { id: "car-numl", faction: "carthage", kind: "cavalry", at: [18, 22], size: [12, 3], label: "Numidians" },
          { id: "car-numr", faction: "carthage", kind: "cavalry", at: [82, 22], size: [12, 3] },
          { id: "rom-vel", faction: "rome", kind: "skirmishers", at: [50, 38], size: [30, 3], label: "javelin-men in front" },
          { id: "rom-cav", faction: "rome", kind: "cavalry", at: [50, 48], size: [22, 3.5], label: "Roman and allied horse" },
        ],
        arrows: [{ id: "a1", from: [50, 22], to: [50, 32], faction: "carthage", kind: "move" }],
        caveat: "The engagement is not located more closely than the country between the Ticinus and the Po.",
      },
      {
        id: "ridden-down",
        title: "The javelin-men are ridden over",
        description: "Hannibal charges home before the light troops can throw more than once. They are trampled and run back through their own cavalry, which has to fight with its formation already broken open.",
        certainty: "attested",
        units: [
          { id: "car-heavy", faction: "carthage", kind: "cavalry", at: [50, 30], size: [24, 3.5] },
          { id: "car-numl", faction: "carthage", kind: "cavalry", at: [16, 26], size: [12, 3] },
          { id: "car-numr", faction: "carthage", kind: "cavalry", at: [84, 26], size: [12, 3] },
          { id: "rom-vel", faction: "rome", kind: "skirmishers", at: [50, 40], size: [26, 3], routed: true, label: "trampled" },
          { id: "rom-cav", faction: "rome", kind: "cavalry", at: [50, 50], size: [22, 3.5] },
        ],
        arrows: [
          { id: "a1", from: [50, 34], to: [50, 38], faction: "carthage", kind: "attack" },
          { id: "a2", from: [40, 44], to: [34, 52], faction: "rome", kind: "retreat", label: "back through the horse" },
        ],
      },
      {
        id: "melee",
        title: "A standing fight, and a ride round the wings",
        description: "The two bodies of horse lock together so closely that many men dismount and fight on foot. While the centre is held there, the Numidians ride round both wings unopposed.",
        certainty: "probable",
        units: [
          { id: "car-heavy", faction: "carthage", kind: "cavalry", at: [50, 38], size: [24, 3.5], label: "locked in the centre" },
          { id: "rom-cav", faction: "rome", kind: "cavalry", at: [50, 44], size: [22, 3.5] },
          { id: "car-numl", faction: "carthage", kind: "cavalry", at: [14, 36], size: [12, 3] },
          { id: "car-numr", faction: "carthage", kind: "cavalry", at: [86, 36], size: [12, 3] },
        ],
        arrows: [
          { id: "a1", from: [14, 40], to: [34, 52], faction: "carthage", kind: "move", bow: -6, label: "round the wing" },
          { id: "a2", from: [86, 40], to: [66, 52], faction: "carthage", kind: "move", bow: 6 },
        ],
      },
      {
        id: "rear",
        title: "Into the rear; the consul is wounded",
        description: "The Numidians cut up the fugitives and come in behind the Roman line. Scipio is wounded, the Romans break off, and within days they abandon the north bank of the Po altogether. Nothing decisive has happened, and everything about the campaign has been settled.",
        certainty: "probable",
        units: [
          { id: "car-heavy", faction: "carthage", kind: "cavalry", at: [50, 34], size: [24, 3.5] },
          { id: "car-num", faction: "carthage", kind: "cavalry", at: [50, 54], size: [26, 3], label: "in the Roman rear" },
          { id: "rom-cav", faction: "rome", kind: "cavalry", at: [50, 44], size: [20, 3.5], routed: true, label: "breaks off" },
        ],
        arrows: [
          { id: "a1", from: [50, 51], to: [50, 47], faction: "carthage", kind: "attack" },
          { id: "a2", from: [62, 46], to: [86, 58], faction: "rome", kind: "retreat", label: "back over the river" },
        ],
        caveat: "The story of the seventeen-year-old Scipio rescuing his father is a later tradition, and Polybius records an alternative.",
      },
    ],
  },

  trebia: {
    scaleNote: "The ground west of Placentia either side of the Trebia; which bank held the main action is disputed.",
    sourceIds: ["polybius-3", "livy-21-30"],
    terrain: [
      { id: "river", kind: "river", points: [[50, 0], [46, 20], [52, 42], [48, 68]], label: "Trebia" },
      { id: "cover", kind: "woods", points: [[62, 40], [80, 38], [84, 52], [64, 54]], label: "watercourse", labelAt: [89, 46] },
    ],
    stages: [
      {
        id: "provoked",
        title: "The Romans are drawn across the river",
        description: "Numidian horse skirmish and withdraw, provoking Sempronius into crossing the cold Trebia with troops who have not eaten.",
        certainty: "probable",
        units: [
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [30, 34], size: [26, 4], label: "legions crossing" },
          { id: "car-num", faction: "carthage", kind: "cavalry", at: [58, 30], size: [10, 3], label: "Numidians" },
          { id: "car-main", faction: "carthage", kind: "infantry", at: [70, 20], size: [30, 4] },
        ],
        arrows: [
          { id: "a1", from: [34, 34], to: [52, 34], faction: "rome", kind: "move", label: "fords" },
          { id: "a2", from: [56, 32], to: [64, 26], faction: "carthage", kind: "retreat" },
        ],
        caveat: "That Sempronius was provoked rather than simply confident is Polybius' reading of a decision the man himself never explained.",
      },
      {
        id: "lines",
        title: "The lines meet on the far bank",
        description: "Hannibal's Gallic and Iberian foot hold the centre with cavalry and elephants on the wings; Mago's picked force lies hidden in a watercourse to the flank.",
        certainty: "probable",
        units: [
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [58, 38], size: [30, 4] },
          { id: "rom-cav", faction: "rome", kind: "cavalry", at: [40, 42], size: [8, 3] },
          { id: "car-foot", faction: "carthage", kind: "infantry", at: [62, 24], size: [30, 4] },
          { id: "car-cav", faction: "carthage", kind: "cavalry", at: [40, 22], size: [12, 3] },
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [82, 24], size: [12, 3] },
          { id: "car-ambush", faction: "carthage", kind: "infantry", at: [72, 46], size: [14, 3], label: "Mago, concealed" },
        ],
        caveat: "The ambush party is attested; its exact position is not.",
      },
      {
        id: "ambush",
        title: "Mago strikes the rear",
        description: "As the infantry lines grip, the concealed force rises against the Roman rear while the cavalry sweeps the wings clear.",
        certainty: "attested",
        units: [
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [58, 36], size: [30, 4] },
          { id: "rom-cav", faction: "rome", kind: "cavalry", at: [34, 48], size: [8, 3], routed: true },
          { id: "car-foot", faction: "carthage", kind: "infantry", at: [60, 26], size: [30, 4] },
          { id: "car-cav", faction: "carthage", kind: "cavalry", at: [38, 30], size: [12, 3] },
          { id: "car-ambush", faction: "carthage", kind: "infantry", at: [66, 44], size: [16, 3] },
        ],
        arrows: [
          { id: "a1", from: [66, 42], to: [60, 38], faction: "carthage", kind: "attack", label: "rear" },
          { id: "a2", from: [40, 33], to: [36, 44], faction: "carthage", kind: "attack" },
        ],
      },
      {
        id: "breakout",
        title: "The centre cuts its way out",
        description: "About ten thousand Romans force their way straight through the Punic centre and reach Placentia. The rest of the army is broken against the river.",
        certainty: "probable",
        units: [
          { id: "rom-core", faction: "rome", kind: "infantry", at: [56, 26], size: [16, 4], label: "breaks through" },
          { id: "rom-rest", faction: "rome", kind: "infantry", at: [58, 42], size: [22, 4], routed: true },
          { id: "car-foot", faction: "carthage", kind: "infantry", at: [74, 26], size: [20, 4] },
          { id: "car-ambush", faction: "carthage", kind: "infantry", at: [64, 44], size: [16, 3] },
        ],
        arrows: [{ id: "a1", from: [56, 22], to: [50, 8], faction: "rome", kind: "retreat", label: "to Placentia" }],
      },
    ],
  },

  trasimene: {
    scaleNote: "The defile between the hills and the lake shore near Tuoro; the killing ground is read from the terrain.",
    orientation: "The lake lies south, the hills north.",
    sourceIds: ["polybius-3", "livy-21-30"],
    terrain: [
      { id: "lake", kind: "sea", points: [[0, 48], [100, 44], [100, 68], [0, 68]], label: "Lake Trasimene" },
      { id: "hills", kind: "hill", points: [[6, 6], [40, 4], [72, 8], [96, 6], [96, 26], [60, 24], [24, 26], [6, 24]], label: "the heights", labelAt: [15, 13] },
      { id: "road", kind: "road", points: [[2, 38], [30, 36], [62, 34], [98, 32]] },
    ],
    stages: [
      {
        id: "column",
        title: "The Roman column enters the defile",
        description: "Flaminius marches east along the shore road in morning mist, without scouting the heights, strung out between the hills and the water.",
        certainty: "attested",
        units: [
          { id: "rom-van", faction: "rome", kind: "infantry", at: [74, 34], size: [16, 3] },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [48, 35], size: [22, 3], label: "column of march" },
          { id: "rom-rear", faction: "rome", kind: "infantry", at: [20, 37], size: [16, 3] },
          { id: "car-hills", faction: "carthage", kind: "infantry", at: [50, 18], size: [40, 3], label: "waiting on the heights" },
          { id: "car-block", faction: "carthage", kind: "infantry", at: [88, 26], size: [12, 3], label: "blocks the exit" },
        ],
        arrows: [{ id: "a1", from: [14, 37], to: [70, 34], faction: "rome", kind: "move", label: "line of march" }],
        caveat: "The length of the column and how far it had entered the defile are inferred from the ground, not reported.",
      },
      {
        id: "sprung",
        title: "The trap is sprung",
        description: "The Carthaginian line charges downhill along the whole length of the column at once. The Romans are attacked before they can form a line at all.",
        certainty: "attested",
        units: [
          { id: "rom-van", faction: "rome", kind: "infantry", at: [74, 34], size: [16, 3] },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [48, 35], size: [22, 3] },
          { id: "rom-rear", faction: "rome", kind: "infantry", at: [20, 37], size: [16, 3] },
          { id: "car-left", faction: "carthage", kind: "infantry", at: [26, 26], size: [16, 3] },
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 26], size: [18, 3] },
          { id: "car-right", faction: "carthage", kind: "cavalry", at: [76, 26], size: [14, 3] },
          { id: "car-block", faction: "carthage", kind: "infantry", at: [90, 28], size: [12, 3] },
        ],
        arrows: [
          { id: "a1", from: [26, 29], to: [22, 34], faction: "carthage", kind: "attack" },
          { id: "a2", from: [50, 29], to: [48, 33], faction: "carthage", kind: "attack" },
          { id: "a3", from: [76, 28], to: [74, 33], faction: "carthage", kind: "attack" },
        ],
        caveat: "The frontage of the attack follows the terrain; no source gives unit positions.",
      },
      {
        id: "pressed",
        title: "Pressed into the water",
        description: "With the hills held and the exits blocked, whole sections are forced back into the shallows. Flaminius is killed in the fighting.",
        certainty: "probable",
        units: [
          { id: "rom-water", faction: "rome", kind: "infantry", at: [44, 44], size: [26, 3], routed: true, label: "driven into the lake" },
          { id: "rom-van", faction: "rome", kind: "infantry", at: [76, 36], size: [14, 3], routed: true },
          { id: "car-line", faction: "carthage", kind: "infantry", at: [46, 30], size: [46, 3] },
          { id: "car-block", faction: "carthage", kind: "infantry", at: [90, 28], size: [12, 3] },
        ],
        arrows: [{ id: "a1", from: [46, 34], to: [44, 42], faction: "carthage", kind: "attack" }],
      },
      {
        id: "breakout",
        title: "Only the van escapes",
        description: "About six thousand of the vanguard break through and are taken the next day. One of the largest ambushes in ancient warfare is complete.",
        certainty: "probable",
        units: [
          { id: "rom-out", faction: "rome", kind: "infantry", at: [90, 36], size: [12, 3], routed: true, label: "breaks out" },
          { id: "car-line", faction: "carthage", kind: "infantry", at: [46, 30], size: [46, 3] },
        ],
        arrows: [{ id: "a1", from: [92, 33], to: [98, 26], faction: "rome", kind: "retreat" }],
      },
    ],
  },

  cannae: {
    scaleNote: "Relative frontages on the Aufidus plain. Whether the line stood on the left or right bank is disputed.",
    orientation: "The Aufidus runs along one flank; the sea lies beyond it.",
    sourceIds: ["polybius-3", "livy-21-30", "goldsworthy-2000"],
    terrain: [
      { id: "river", kind: "river", points: [[0, 10], [34, 13], [68, 9], [100, 12]], label: "Aufidus" },
    ],
    stages: [
      {
        id: "deploy",
        title: "A deep Roman mass against a crescent",
        description: "Rome packs an unusually deep infantry line to punch straight through. Hannibal answers with Gallic and Iberian foot bowed forward in the centre, African veterans on the wings, and all his cavalry on the flanks.",
        certainty: "attested",
        units: [
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 34], size: [30, 4], label: "Gauls and Iberians" },
          { id: "car-lwing", faction: "carthage", kind: "infantry", at: [26, 26], size: [12, 4], label: "Africans" },
          { id: "car-rwing", faction: "carthage", kind: "infantry", at: [74, 26], size: [12, 4], label: "Africans" },
          { id: "car-lcav", faction: "carthage", kind: "cavalry", at: [12, 20], size: [12, 3], label: "heavy horse" },
          { id: "car-rcav", faction: "carthage", kind: "cavalry", at: [88, 22], size: [12, 3], label: "Numidians" },
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [50, 50], size: [34, 8], label: "legions, deep" },
          { id: "rom-lcav", faction: "rome", kind: "cavalry", at: [16, 46], size: [10, 3] },
          { id: "rom-rcav", faction: "rome", kind: "cavalry", at: [84, 46], size: [10, 3] },
        ],
        caveat: "Army sizes are debated; the diagram shows proportion, not numbers.",
      },
      {
        id: "advance",
        title: "The centre yields on purpose",
        description: "Under the weight of the Roman advance the Punic centre gives ground in order, drawing the legions forward into a deepening pocket.",
        certainty: "probable",
        units: [
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 26], size: [30, 4], label: "falls back in order" },
          { id: "car-lwing", faction: "carthage", kind: "infantry", at: [28, 28], size: [12, 4] },
          { id: "car-rwing", faction: "carthage", kind: "infantry", at: [72, 28], size: [12, 4] },
          { id: "car-lcav", faction: "carthage", kind: "cavalry", at: [14, 34], size: [12, 3] },
          { id: "car-rcav", faction: "carthage", kind: "cavalry", at: [86, 34], size: [12, 3] },
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [50, 40], size: [30, 8] },
          { id: "rom-lcav", faction: "rome", kind: "cavalry", at: [16, 46], size: [10, 3], routed: true },
          { id: "rom-rcav", faction: "rome", kind: "cavalry", at: [84, 46], size: [10, 3], routed: true },
        ],
        arrows: [
          { id: "a1", from: [50, 44], to: [50, 32], faction: "rome", kind: "attack", label: "drives in" },
          { id: "a2", from: [16, 38], to: [16, 44], faction: "carthage", kind: "attack" },
          { id: "a3", from: [86, 38], to: [86, 44], faction: "carthage", kind: "attack" },
        ],
      },
      {
        id: "wings-turn",
        title: "The African wings turn inward",
        description: "The veterans on either wing, until now unengaged, wheel inward against the flanks of the Roman column as it presses past them.",
        certainty: "attested",
        units: [
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 24], size: [30, 4] },
          { id: "car-lwing", faction: "carthage", kind: "infantry", at: [32, 36], size: [4, 14], facing: 0, label: "wheels in" },
          { id: "car-rwing", faction: "carthage", kind: "infantry", at: [68, 36], size: [4, 14], facing: 0, label: "wheels in" },
          { id: "car-cav", faction: "carthage", kind: "cavalry", at: [50, 58], size: [16, 3], label: "returning horse" },
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [50, 38], size: [26, 10] },
        ],
        arrows: [
          { id: "a1", from: [35, 36], to: [42, 37], faction: "carthage", kind: "attack" },
          { id: "a2", from: [65, 36], to: [58, 37], faction: "carthage", kind: "attack" },
          { id: "a3", from: [50, 54], to: [50, 46], faction: "carthage", kind: "attack", label: "into the rear" },
        ],
      },
      {
        id: "encircled",
        title: "The ring closes",
        description: "Attacked on all four sides, the Roman mass loses the space to use its weapons. The encirclement, not the fighting, decides the day.",
        certainty: "attested",
        units: [
          { id: "car-n", faction: "carthage", kind: "infantry", at: [50, 26], size: [26, 4] },
          { id: "car-w", faction: "carthage", kind: "infantry", at: [34, 38], size: [4, 16] },
          { id: "car-e", faction: "carthage", kind: "infantry", at: [66, 38], size: [4, 16] },
          { id: "car-s", faction: "carthage", kind: "cavalry", at: [50, 50], size: [24, 3] },
          { id: "rom-foot", faction: "rome", kind: "infantry", at: [50, 38], size: [22, 8], routed: true, label: "surrounded" },
        ],
        caveat: "The very high casualty figures are literary and cannot be verified.",
      },
    ],
  },

  syracuse: {
    scaleNote: "The city, its harbour and the Epipolae plateau behind it, schematically. The wall circuit ran some 27 km; the frame shows the two faces Rome attacked and not the whole of it.",
    orientation: "The harbour and open sea lie south and east; the Epipolae plateau rises inland to the west.",
    sourceIds: ["polybius-8", "livy-21-30"],
    terrain: [
      { id: "sea", kind: "sea", points: [[0, 50], [100, 50], [100, 68], [0, 68]], label: "the harbour", labelAt: [20, 64] },
      { id: "coast", kind: "coast", points: [[0, 50], [30, 52], [60, 49], [100, 51]] },
      { id: "plateau", kind: "ridge", points: [[4, 12], [52, 8], [60, 26], [8, 30]], label: "the Epipolae plateau", labelAt: [16, 28] },
      { id: "city", kind: "town", at: [78, 36], size: [24, 16], label: "Achradina" },
    ],
    stages: [
      {
        id: "assault",
        title: "An assault by land and sea at once",
        description: "Marcellus attacks the landward wall on the plateau with the army, and the sea wall with the fleet — ships lashed in pairs carrying hinged ladders. Both faces are attacked on the same day so that neither can be reinforced from the other.",
        certainty: "attested",
        units: [
          { id: "rom-land", faction: "rome", kind: "infantry", at: [26, 40], size: [26, 4], label: "against the plateau wall" },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [66, 58], size: [36, 4], label: "ladder-ships on the sea wall" },
          { id: "syr-def", faction: "syracuse", kind: "infantry", at: [30, 16], size: [24, 3], label: "Syracusan defence" },
          { id: "syr-sea", faction: "syracuse", kind: "infantry", at: [78, 46], size: [22, 3] },
        ],
        arrows: [
          { id: "a1", from: [26, 36], to: [26, 30], faction: "rome", kind: "attack" },
          { id: "a2", from: [66, 54], to: [71, 49], faction: "rome", kind: "attack" },
        ],
      },
      {
        id: "engines",
        title: "Archimedes' engines stop both attacks",
        description: "The wall has been fitted, over years, with catapults sized for every range, so that ships and columns are under fire from the moment they come within reach and never get a lull. Cranes on the sea wall drop weights through hulls or lift them by the bow. Rome abandons the assault entirely.",
        certainty: "attested",
        units: [
          { id: "syr-engines", faction: "syracuse", kind: "works", at: [30, 22], size: [30, 3], label: "engines on the wall" },
          { id: "syr-cranes", faction: "syracuse", kind: "works", at: [78, 45], size: [22, 3], label: "cranes over the water" },
          { id: "rom-land", faction: "rome", kind: "infantry", at: [26, 44], size: [24, 4], routed: true, label: "driven back" },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [66, 60], size: [34, 4], routed: true, label: "the ships stand off" },
        ],
        arrows: [
          { id: "a1", from: [30, 26], to: [28, 40], faction: "syracuse", kind: "missile" },
          { id: "a2", from: [78, 47], to: [72, 56], faction: "syracuse", kind: "missile" },
        ],
        caveat: "Polybius describes the machines in technical detail and they are plausible; no example survives, and the burning mirrors of the later tradition are not in him.",
      },
      {
        id: "blockade",
        title: "Two years of blockade, and one night on the wall",
        description: "Rome settles down to starve the city instead. A Carthaginian army and fleet arrive to relieve it and achieve nothing; disease in the low ground kills more men on both sides than the fighting has. Then a Roman party notices a stretch of wall low enough to scale, and goes over it at night.",
        certainty: "probable",
        units: [
          { id: "rom-camp", faction: "rome", kind: "camp", at: [24, 42], size: [22, 10], label: "Roman camp" },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [66, 60], size: [34, 4], label: "blockade" },
          { id: "rom-scale", faction: "rome", kind: "infantry", at: [42, 12], size: [14, 3], label: "over the wall by night" },
          { id: "syr-def", faction: "syracuse", kind: "infantry", at: [20, 16], size: [16, 3] },
          { id: "car-relief", faction: "carthage", kind: "infantry", at: [8, 42], size: [14, 4], label: "Himilco" },
        ],
        arrows: [{ id: "a1", from: [32, 34], to: [42, 16], faction: "rome", kind: "move", bow: -6 }],
        caveat: "The festival and the drunken watch that let the party over are Livy's; the plague, which both sources give, is the better-attested cause of the collapse.",
      },
      {
        id: "falls",
        title: "The city falls piece by piece",
        description: "The plateau is taken, the fort at its western tip surrenders, and Achradina is finally opened from inside. Syracuse is sacked. Archimedes is killed in the streets — in every version against Marcellus' orders, which tells you how the sack was remembered at Rome.",
        certainty: "attested",
        units: [
          { id: "rom-plateau", faction: "rome", kind: "infantry", at: [30, 18], size: [28, 4], label: "Epipolae taken" },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [66, 60], size: [34, 4] },
          { id: "syr-city", faction: "syracuse", kind: "infantry", at: [78, 34], size: [20, 3], routed: true, label: "Achradina opened from inside" },
        ],
        arrows: [{ id: "a1", from: [46, 22], to: [66, 32], faction: "rome", kind: "attack", bow: 5 }],
      },
    ],
  },

  capua: {
    scaleNote: "The double lines around Capua, drawn as a ring because that was their function. Their actual circuit is not located, and the frame stands for the whole plain of Campania around the city.",
    sourceIds: ["polybius-9", "livy-21-30"],
    terrain: [
      { id: "capua", kind: "town", at: [50, 30], size: [22, 10], label: "Capua" },
    ],
    stages: [
      {
        id: "double-lines",
        title: "Two lines, facing opposite ways",
        description: "Rome does not storm Capua. It builds a ditch and rampart facing the city to keep the garrison in, and a second facing outward to keep a relieving army out, with the camps between them. The siege is a piece of engineering designed to make relief impossible.",
        certainty: "attested",
        units: [
          { id: "rom-outer", faction: "rome", kind: "works", at: [50, 30], size: [58, 40], label: "outer line, facing out" },
          { id: "rom-inner", faction: "rome", kind: "works", at: [50, 30], size: [40, 26], label: "inner line, facing the city" },
          { id: "rom-camp-w", faction: "rome", kind: "camp", at: [25, 30], size: [7, 16] },
          { id: "rom-camp-e", faction: "rome", kind: "camp", at: [75, 30], size: [7, 16] },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [50, 26], size: [18, 3], label: "the garrison" },
        ],
        caveat: "Capua's own citizens and a Punic detachment held the city together; the diagram cannot separate them, and shows the defence in Hannibal's colour.",
      },
      {
        id: "relief-fails",
        title: "Relief outside, sortie inside — both fail",
        description: "Hannibal attacks the outer line while the garrison attacks the inner one on the same day. Neither breaks through. The lines do exactly what they were built to do.",
        certainty: "probable",
        units: [
          { id: "rom-outer", faction: "rome", kind: "works", at: [50, 30], size: [58, 40] },
          { id: "rom-inner", faction: "rome", kind: "works", at: [50, 30], size: [40, 26] },
          { id: "rom-camp-w", faction: "rome", kind: "camp", at: [25, 30], size: [7, 16] },
          { id: "rom-camp-e", faction: "rome", kind: "camp", at: [75, 30], size: [7, 16] },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [50, 26], size: [18, 3] },
          { id: "car-relief", faction: "carthage", kind: "infantry", at: [50, 60], size: [34, 4], label: "Hannibal's relief" },
        ],
        arrows: [
          { id: "a1", from: [40, 24], to: [40, 19], faction: "carthage", kind: "attack", label: "sortie" },
          { id: "a2", from: [50, 56], to: [50, 52], faction: "carthage", kind: "attack" },
        ],
        caveat: "That the two attacks were coordinated on one day is Livy's arrangement of the material.",
      },
      {
        id: "march-on-rome",
        title: "Hannibal marches on Rome; the lines do not move",
        description: "Unable to break in, Hannibal marches north to Rome itself to force the besiegers to follow him. They do not. Rome sends a detachment to man its walls and the army at Capua stays exactly where it is — the moment the war's balance visibly changes.",
        certainty: "attested",
        units: [
          { id: "rom-outer", faction: "rome", kind: "works", at: [50, 30], size: [58, 40] },
          { id: "rom-inner", faction: "rome", kind: "works", at: [50, 30], size: [40, 26] },
          { id: "rom-camp-w", faction: "rome", kind: "camp", at: [25, 30], size: [7, 16] },
          { id: "rom-camp-e", faction: "rome", kind: "camp", at: [75, 30], size: [7, 16] },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [50, 26], size: [18, 3] },
          { id: "car-march", faction: "carthage", kind: "infantry", at: [11, 12], size: [16, 4], label: "toward Rome" },
        ],
        arrows: [{ id: "a1", from: [40, 16], to: [22, 13], faction: "carthage", kind: "move" }],
        caveat: "How close Hannibal came to the city, and whether he ever meant to assault it, are told differently in different sources.",
      },
      {
        id: "surrender",
        title: "Capua surrenders",
        description: "With no prospect of relief the city gives in. Its ruling council is put to death, its people sold or dispersed, and Capua loses its own government for good. The message to every other Italian community that had gone over to Hannibal is the point of the punishment.",
        certainty: "attested",
        units: [
          { id: "rom-outer", faction: "rome", kind: "works", at: [50, 30], size: [58, 40] },
          { id: "rom-inner", faction: "rome", kind: "works", at: [50, 30], size: [40, 26] },
          { id: "rom-camp-w", faction: "rome", kind: "camp", at: [25, 30], size: [7, 16] },
          { id: "rom-camp-e", faction: "rome", kind: "camp", at: [75, 30], size: [7, 16] },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [50, 26], size: [16, 3], routed: true, label: "surrenders" },
        ],
        arrows: [{ id: "a1", from: [50, 18], to: [50, 23], faction: "rome", kind: "move", label: "the city is entered" }],
      },
    ],
  },

  "new-carthage": {
    scaleNote: "The peninsula, the harbour and the lagoon behind it, with the isthmus by which the city was joined to the mainland. Proportions are schematic; the depth of the lagoon is the disputed part of the story.",
    orientation: "The harbour lies south of the city, the lagoon north, the isthmus east.",
    sourceIds: ["polybius-10", "livy-21-30"],
    terrain: [
      { id: "lagoon", kind: "sea", points: [[0, 0], [72, 0], [72, 22], [0, 22]], label: "the shallow lagoon" },
      { id: "harbour", kind: "sea", points: [[0, 46], [72, 46], [72, 68], [0, 68]], label: "the harbour" },
      { id: "city", kind: "town", at: [32, 34], size: [44, 16], label: "New Carthage", labelAt: [22, 44] },
    ],
    stages: [
      {
        id: "blockade",
        title: "Blockaded from the land and the water",
        description: "Scipio marches on the Barcid capital while the three Carthaginian field armies are far away, camps across the isthmus, and has Laelius bring the fleet into the harbour. Mago has a garrison of a thousand and arms for the townspeople.",
        certainty: "attested",
        units: [
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [30, 58], size: [40, 4], label: "Laelius' fleet in the harbour" },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [84, 52], size: [20, 14], label: "Scipio's camp" },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [54, 34], size: [3.5, 15], label: "garrison on the isthmus wall" },
        ],
        caveat: "The garrison's strength comes from Livy alone, and a thousand men for a city of this circuit is remarkably few.",
      },
      {
        id: "isthmus-assault",
        title: "A heavy assault on the isthmus draws the defence",
        description: "The attack goes in against the wall on the neck, where the city expects it. Mago arms the townspeople and sends them out through the gate; they are driven back inside, and the whole defence is now concentrated on that side.",
        certainty: "attested",
        units: [
          { id: "rom-assault", faction: "rome", kind: "infantry", at: [66, 34], size: [12, 16], label: "the assault continues" },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [30, 58], size: [40, 4] },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [84, 52], size: [20, 14] },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [54, 34], size: [3.5, 15] },
          { id: "car-sally", faction: "carthage", kind: "infantry", at: [58, 43], size: [14, 3] },
        ],
        arrows: [
          { id: "a1", from: [78, 34], to: [58, 34], faction: "rome", kind: "attack" },
          { id: "a2", from: [56, 43], to: [68, 41], faction: "carthage", kind: "move", bow: -3 },
        ],
      },
      {
        id: "lagoon",
        title: "A party wades the lagoon",
        description: "Scipio sends five hundred men with ladders through the lagoon on the north side, which has fallen shallow enough to cross. The northern wall is low and, because every defender is at the isthmus, unmanned.",
        certainty: "probable",
        units: [
          { id: "rom-lagoon", faction: "rome", kind: "infantry", at: [26, 14], size: [20, 3], label: "wading the lagoon" },
          { id: "rom-assault", faction: "rome", kind: "infantry", at: [66, 34], size: [12, 16], label: "the assault continues" },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [30, 58], size: [40, 4] },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [54, 34], size: [3.5, 15] },
        ],
        arrows: [
          { id: "a1", from: [8, 8], to: [22, 13], faction: "rome", kind: "move" },
          { id: "a2", from: [26, 18], to: [26, 24], faction: "rome", kind: "attack", label: "up the northern wall" },
        ],
        caveat: "Whether the water fell by tide, by wind, or through a channel to the sea is disputed; Scipio's own account credited Neptune, and Polybius was sceptical of it.",
      },
      {
        id: "carried",
        title: "The wall is carried from behind",
        description: "The wading party gets onto the north wall, works along it to the isthmus gate, and opens it from the inside. The city falls in a single day, and with it Carthage's Iberian treasury, arsenal, dockyard and the hostages that held the Spanish tribes to their allegiance.",
        certainty: "attested",
        units: [
          { id: "rom-in", faction: "rome", kind: "infantry", at: [30, 34], size: [24, 3], label: "into the city" },
          { id: "rom-assault", faction: "rome", kind: "infantry", at: [66, 34], size: [12, 16] },
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [30, 58], size: [40, 4] },
          { id: "car-gar", faction: "carthage", kind: "infantry", at: [54, 34], size: [3.5, 12], routed: true, label: "taken from the rear" },
        ],
        arrows: [
          { id: "a1", from: [30, 26], to: [34, 32], faction: "rome", kind: "attack" },
          { id: "a2", from: [76, 34], to: [60, 34], faction: "rome", kind: "attack" },
        ],
      },
    ],
  },

  baecula: {
    scaleNote: "A camp on a terraced height with a river behind it. Several sites on the upper Guadalquivir have been proposed and none is agreed, so the frame follows Polybius' description of the ground rather than any of them.",
    sourceIds: ["polybius-10", "goldsworthy-2000"],
    terrain: [
      { id: "river", kind: "river", points: [[0, 6], [30, 8], [64, 5], [100, 7]], label: "a river at his back", labelAt: [50, 12] },
      // Drawn as nested contours, the way a hill is drawn on a map: the terrace is
      // the lower shelf and the level top sits inside it. Two separate bands side by
      // side read as two different features, which is not what Polybius describes.
      { id: "terrace", kind: "ridge", points: [[7, 16], [50, 14], [93, 16], [96, 45], [50, 47], [4, 45]], label: "the terrace", labelAt: [64, 46] },
      { id: "top", kind: "hill", points: [[22, 20], [50, 18], [78, 20], [81, 34], [50, 36], [19, 34]], label: "the level top", labelAt: [30, 32] },
    ],
    stages: [
      {
        id: "strong-position",
        title: "A hill that cannot be attacked in front",
        description: "Hasdrubal Barca camps on a height with a level top, a river behind him, and a terrace in front whose edge is steep. Anything coming straight up has to climb the lip of the terrace under missiles. Scipio spends two days looking at it.",
        certainty: "probable",
        units: [
          { id: "car-camp", faction: "carthage", kind: "camp", at: [50, 27], size: [26, 10], label: "camp on the height" },
          { id: "car-out", faction: "carthage", kind: "infantry", at: [50, 41], size: [30, 3.5], label: "outposts on the terrace" },
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [28, 27], size: [11, 3] },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [50, 58], size: [32, 4], label: "Scipio's army" },
        ],
        caveat: "The battlefield's identification is contested; only the shape of the ground is drawn.",
      },
      {
        id: "pin-the-front",
        title: "Light troops pin the front",
        description: "Scipio sends his skirmishers and some picked infantry directly at the terrace. Their job is not to win but to fix the outposts in place and hold Hasdrubal's attention on the centre.",
        certainty: "probable",
        units: [
          { id: "car-camp", faction: "carthage", kind: "camp", at: [50, 27], size: [26, 10] },
          { id: "car-out", faction: "carthage", kind: "infantry", at: [50, 41], size: [30, 3.5] },
          { id: "rom-skirm", faction: "rome", kind: "skirmishers", at: [50, 52], size: [28, 3], label: "straight up the lip" },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [50, 62], size: [32, 4] },
        ],
        arrows: [{ id: "a1", from: [50, 50], to: [50, 44], faction: "rome", kind: "attack" }],
      },
      {
        id: "two-columns",
        title: "Two columns climb the flanks",
        description: "Scipio takes half the army round the left and Laelius the other half round the right, up the flanks of the terrace where it is not held. Hasdrubal is still bringing his men out of camp when they arrive on both his wings at once.",
        certainty: "attested",
        units: [
          { id: "car-camp", faction: "carthage", kind: "camp", at: [50, 27], size: [26, 10], label: "still forming up" },
          { id: "car-out", faction: "carthage", kind: "infantry", at: [50, 41], size: [26, 3.5] },
          { id: "rom-skirm", faction: "rome", kind: "skirmishers", at: [50, 52], size: [24, 3] },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [12, 41], size: [15, 4], label: "Scipio" },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [88, 41], size: [15, 4], label: "Laelius" },
        ],
        arrows: [
          { id: "a1", from: [12, 56], to: [12, 37], faction: "rome", kind: "attack", bow: -4 },
          { id: "a2", from: [88, 56], to: [88, 37], faction: "rome", kind: "attack", bow: 4 },
        ],
      },
      {
        id: "escapes",
        title: "Beaten, and not stopped",
        description: "The position is carried and the Carthaginian army driven off the height. But Hasdrubal does not stay to be destroyed: he takes his treasure, his elephants and a large part of his force away northward, and marches for the Alps and Italy. Rome has won the field and failed at the object.",
        certainty: "attested",
        units: [
          { id: "car-out", faction: "carthage", kind: "infantry", at: [50, 40], size: [24, 3.5], routed: true },
          { id: "car-away", faction: "carthage", kind: "infantry", at: [74, 11], size: [18, 4], routed: true, label: "away with the treasure" },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [22, 40], size: [16, 4] },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [78, 40], size: [16, 4] },
        ],
        arrows: [
          { id: "a1", from: [25, 40], to: [37, 40], faction: "rome", kind: "attack" },
          { id: "a2", from: [75, 40], to: [63, 40], faction: "rome", kind: "attack" },
          { id: "a3", from: [70, 13], to: [92, 7], faction: "carthage", kind: "retreat", label: "for Italy" },
        ],
        caveat: "How much of the army got away, and whether Scipio could have prevented it, are both argued.",
      },
    ],
  },

  metaurus: {
    scaleNote: "The action along the Metaurus; the field has never been securely located.",
    sourceIds: ["polybius-11", "livy-21-30"],
    terrain: [
      { id: "river", kind: "river", points: [[0, 14], [32, 17], [66, 13], [100, 16]], label: "Metaurus" },
      { id: "ravine", kind: "marsh", points: [[8, 30], [24, 28], [26, 44], [10, 46]], label: "broken ground" },
    ],
    stages: [
      {
        id: "joined",
        title: "Two consular armies join in secret",
        description: "Nero slips away from watching Hannibal in the south and marches north to reinforce Livius. Hasdrubal faces both consuls without knowing it.",
        certainty: "attested",
        units: [
          { id: "rom-livius", faction: "rome", kind: "infantry", at: [56, 46], size: [26, 4], label: "Livius" },
          { id: "rom-nero", faction: "rome", kind: "infantry", at: [82, 46], size: [18, 4], label: "Nero" },
          { id: "car-line", faction: "carthage", kind: "infantry", at: [58, 30], size: [34, 4], label: "Hasdrubal" },
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [58, 36], size: [14, 3] },
        ],
        arrows: [{ id: "a1", from: [92, 52], to: [84, 48], faction: "rome", kind: "move", label: "forced march" }],
        caveat: "How Nero's force was chosen and how the two camps were combined without Hasdrubal noticing are not described.",
      },
      {
        id: "stalled",
        title: "The Roman left is stalled",
        description: "On the left the ground is broken and the lines cannot close. The fighting locks on the right while the left stands idle.",
        certainty: "probable",
        units: [
          { id: "rom-left", faction: "rome", kind: "infantry", at: [26, 44], size: [16, 4], label: "cannot close" },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [66, 40], size: [26, 4] },
          { id: "car-left", faction: "carthage", kind: "infantry", at: [30, 30], size: [14, 4], label: "Gauls" },
          { id: "car-right", faction: "carthage", kind: "infantry", at: [66, 32], size: [26, 4], label: "Iberians" },
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [66, 37], size: [14, 3] },
        ],
        arrows: [{ id: "a1", from: [78, 39], to: [78, 33], faction: "rome", kind: "attack" }],
      },
      {
        id: "march-around",
        title: "Nero marches behind his own line",
        description: "Rather than wait, Nero takes troops from the idle right, marches them behind the army, and falls on the exposed Carthaginian left flank.",
        certainty: "attested",
        units: [
          { id: "rom-left", faction: "rome", kind: "infantry", at: [26, 44], size: [16, 4] },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [70, 40], size: [20, 4] },
          { id: "rom-flank", faction: "rome", kind: "infantry", at: [36, 26], size: [16, 4], label: "Nero's flanking force" },
          { id: "car-left", faction: "carthage", kind: "infantry", at: [30, 32], size: [14, 4] },
          { id: "car-right", faction: "carthage", kind: "infantry", at: [66, 32], size: [24, 4] },
        ],
        arrows: [{ id: "a1", from: [78, 46], to: [40, 28], faction: "rome", kind: "attack", bow: 12, label: "behind the line" }],
        caveat: "The manoeuvre is attested; its route across the field is not recorded.",
      },
      {
        id: "destroyed",
        title: "Hasdrubal's army is destroyed",
        description: "Caught front and flank, the Carthaginian line collapses. Hasdrubal rides into the fighting and is killed; the reinforcement Hannibal awaited never comes.",
        certainty: "attested",
        units: [
          { id: "car-remnant", faction: "carthage", kind: "infantry", at: [48, 32], size: [24, 4], routed: true },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [66, 38], size: [22, 4] },
          { id: "rom-flank", faction: "rome", kind: "infantry", at: [34, 30], size: [16, 4] },
        ],
        arrows: [
          { id: "a1", from: [36, 32], to: [44, 32], faction: "rome", kind: "attack" },
          { id: "a2", from: [64, 36], to: [56, 34], faction: "rome", kind: "attack" },
        ],
      },
    ],
  },

  ilipa: {
    scaleNote: "Scipio's reversed array on the lower Guadalquivir; the reconstruction rests on Polybius.",
    sourceIds: ["polybius-11", "goldsworthy-2000"],
    terrain: [
      { id: "hills", kind: "hill", points: [[20, 6], [80, 6], [82, 18], [18, 18]], label: "high ground" },
    ],
    stages: [
      {
        id: "usual",
        title: "Days of the expected order",
        description: "For several days both armies form with their best troops in the centre. Scipio lets Hasdrubal Gisco grow used to seeing the Romans deployed that way.",
        certainty: "probable",
        units: [
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 28], size: [26, 4], label: "Africans" },
          { id: "car-wings", faction: "carthage", kind: "infantry", at: [24, 28], size: [14, 4], label: "Iberians" },
          { id: "car-wings2", faction: "carthage", kind: "infantry", at: [76, 28], size: [14, 4] },
          { id: "rom-centre", faction: "rome", kind: "infantry", at: [50, 46], size: [26, 4], label: "legions" },
          { id: "rom-wings", faction: "rome", kind: "infantry", at: [24, 46], size: [14, 4], label: "Iberian allies" },
          { id: "rom-wings2", faction: "rome", kind: "infantry", at: [76, 46], size: [14, 4] },
        ],
        caveat: "How many days the armies faced each other in the conventional order is given differently by Polybius and Livy.",
      },
      {
        id: "reversed",
        title: "Scipio reverses his line",
        description: "On the day of battle the Roman legions form on the wings and the Iberian allies in the centre. Hasdrubal has already deployed and cannot change.",
        certainty: "attested",
        units: [
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 28], size: [26, 4], label: "Africans" },
          { id: "car-wings", faction: "carthage", kind: "infantry", at: [24, 28], size: [14, 4] },
          { id: "car-wings2", faction: "carthage", kind: "infantry", at: [76, 28], size: [14, 4] },
          { id: "rom-centre", faction: "rome", kind: "infantry", at: [50, 48], size: [24, 4], label: "allies hold the centre" },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [22, 46], size: [16, 4], label: "legions" },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [78, 46], size: [16, 4], label: "legions" },
        ],
        caveat: "The reversal is the point of the account; the exact frontages are not given.",
      },
      {
        id: "wings-advance",
        title: "The wings advance, the centre holds",
        description: "The legions on both wings press forward while the centre deliberately holds back, so the best Carthaginian troops are left fighting nobody.",
        certainty: "probable",
        units: [
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 30], size: [26, 4], label: "unengaged" },
          { id: "car-wings", faction: "carthage", kind: "infantry", at: [24, 32], size: [14, 4] },
          { id: "car-wings2", faction: "carthage", kind: "infantry", at: [76, 32], size: [14, 4] },
          { id: "rom-centre", faction: "rome", kind: "infantry", at: [50, 48], size: [24, 4] },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [22, 38], size: [16, 4] },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [78, 38], size: [16, 4] },
        ],
        arrows: [
          { id: "a1", from: [22, 42], to: [22, 36], faction: "rome", kind: "attack" },
          { id: "a2", from: [78, 42], to: [78, 36], faction: "rome", kind: "attack" },
        ],
      },
      {
        id: "enveloped",
        title: "The wings wrap the line",
        description: "Both Carthaginian wings are broken and the legions close inward on the African centre. The army breaks; Carthaginian power in Iberia ends.",
        certainty: "probable",
        units: [
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 30], size: [24, 4], routed: true },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [30, 32], size: [14, 4] },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [70, 32], size: [14, 4] },
          { id: "rom-centre", faction: "rome", kind: "infantry", at: [50, 44], size: [24, 4] },
        ],
        arrows: [
          { id: "a1", from: [34, 32], to: [42, 31], faction: "rome", kind: "attack" },
          { id: "a2", from: [66, 32], to: [58, 31], faction: "rome", kind: "attack" },
        ],
      },
    ],
  },

  "great-plains": {
    scaleNote: "Relative frontages on open ground in the upper Bagradas valley. The district called the Great Plains is only broadly placed, and the diagram claims proportion, not position.",
    sourceIds: ["polybius-14", "livy-21-30"],
    terrain: [
      { id: "river", kind: "river", points: [[0, 8], [32, 10], [66, 7], [100, 9]], label: "the upper Bagradas", labelAt: [50, 14] },
    ],
    stages: [
      {
        id: "deploy",
        title: "A scratch army against a practised one",
        description: "Days after burning their camps, Scipio finds Hasdrubal Gisco and Syphax reassembled on open ground with a body of newly hired Celtiberians in the centre. Scipio forms in the standard three lines with cavalry on both wings — Italian on one, Masinissa's Numidians on the other.",
        certainty: "probable",
        units: [
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 26], size: [26, 5], label: "Celtiberian mercenaries" },
          { id: "car-lcav", faction: "carthage", kind: "cavalry", at: [20, 22], size: [12, 3], label: "Carthaginian horse" },
          { id: "car-rcav", faction: "carthage", kind: "cavalry", at: [80, 22], size: [12, 3], label: "Syphax's Numidians" },
          { id: "rom-1", faction: "rome", kind: "infantry", at: [50, 42], size: [30, 3], label: "the legions in three lines" },
          { id: "rom-2", faction: "rome", kind: "infantry", at: [50, 48], size: [30, 3] },
          { id: "rom-3", faction: "rome", kind: "infantry", at: [50, 54], size: [30, 3] },
          { id: "rom-lcav", faction: "rome", kind: "cavalry", at: [18, 44], size: [12, 3] },
          { id: "rom-rcav", faction: "rome", kind: "cavalry", at: [82, 44], size: [12, 3], label: "Masinissa" },
        ],
        caveat: "Allied Numidians fought on both sides; each is drawn in the colour of the power it served, and named.",
      },
      {
        id: "wings-go",
        title: "Both wings collapse at the first shock",
        description: "The cavalry on either flank gives way almost at once and is pursued off the field. The Celtiberians in the centre are left with no wings and, as foreigners in Africa with nowhere to run to, no possibility of surrender either.",
        certainty: "attested",
        units: [
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 26], size: [26, 5], label: "left alone" },
          { id: "car-lcav", faction: "carthage", kind: "cavalry", at: [12, 14], size: [12, 3], routed: true },
          { id: "car-rcav", faction: "carthage", kind: "cavalry", at: [88, 14], size: [12, 3], routed: true },
          { id: "rom-1", faction: "rome", kind: "infantry", at: [50, 42], size: [30, 3] },
          { id: "rom-2", faction: "rome", kind: "infantry", at: [50, 48], size: [30, 3] },
          { id: "rom-3", faction: "rome", kind: "infantry", at: [50, 54], size: [30, 3] },
          { id: "rom-lcav", faction: "rome", kind: "cavalry", at: [20, 28], size: [12, 3] },
          { id: "rom-rcav", faction: "rome", kind: "cavalry", at: [80, 28], size: [12, 3] },
        ],
        arrows: [
          { id: "a1", from: [20, 32], to: [14, 18], faction: "rome", kind: "attack", bow: -3 },
          { id: "a2", from: [80, 32], to: [86, 18], faction: "rome", kind: "attack", bow: 3 },
        ],
      },
      {
        id: "lines-march-out",
        title: "The second and third lines march out",
        description: "Instead of feeding his reserves forward, Scipio leaves the first line to hold the mercenaries and marches the other two sideways out of the formation, one to each flank. It is a manoeuvre a legion of maniples can perform in the middle of a battle and a phalanx cannot.",
        certainty: "attested",
        units: [
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 28], size: [26, 5] },
          { id: "rom-1", faction: "rome", kind: "infantry", at: [50, 38], size: [26, 3], label: "the first line holds them" },
          { id: "rom-2", faction: "rome", kind: "infantry", at: [50, 52], size: [22, 3] },
          { id: "rom-flank-l", faction: "rome", kind: "infantry", at: [26, 46], size: [12, 3], label: "out to the left" },
          { id: "rom-flank-r", faction: "rome", kind: "infantry", at: [74, 46], size: [12, 3], label: "and the right" },
        ],
        arrows: [
          { id: "a1", from: [40, 51], to: [28, 48], faction: "rome", kind: "move", bow: -3 },
          { id: "a2", from: [60, 51], to: [72, 48], faction: "rome", kind: "move", bow: 3 },
        ],
      },
      {
        id: "surrounded",
        title: "Attacked on three sides at once",
        description: "The two flanking lines wheel inward while the first line holds the front. The Celtiberians are destroyed almost to a man. Carthage now has no field army, and within days the government opens negotiations and sends for Hannibal.",
        certainty: "probable",
        units: [
          { id: "car-centre", faction: "carthage", kind: "infantry", at: [50, 30], size: [24, 5], routed: true, label: "cut off" },
          { id: "rom-1", faction: "rome", kind: "infantry", at: [50, 40], size: [24, 3] },
          { id: "rom-l", faction: "rome", kind: "infantry", at: [30, 28], size: [4, 14], label: "wheels in" },
          { id: "rom-r", faction: "rome", kind: "infantry", at: [70, 28], size: [4, 14] },
        ],
        arrows: [
          { id: "a1", from: [33, 28], to: [39, 29], faction: "rome", kind: "attack" },
          { id: "a2", from: [67, 28], to: [61, 29], faction: "rome", kind: "attack" },
          { id: "a3", from: [50, 38], to: [50, 34], faction: "rome", kind: "attack" },
        ],
        caveat: "Whether the mercenaries were fully surrounded or pressed on three sides is a reading of a compressed account, which also runs this battle together with the burning of the camps a few days earlier.",
      },
    ],
  },

  zama: {
    scaleNote: "Relative frontages on open inland ground; the site itself has never been securely identified.",
    sourceIds: ["polybius-15", "livy-21-30", "appian-hann"],
    terrain: [],
    stages: [
      {
        id: "deploy",
        title: "Lanes cut through the Roman line",
        description: "Hannibal fronts his army with elephants and forms three infantry lines, his veterans last. Scipio forms his maniples in columns with lanes left open between them.",
        certainty: "attested",
        units: [
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [50, 22], size: [44, 3], label: "elephants" },
          { id: "car-1", faction: "carthage", kind: "infantry", at: [50, 28], size: [34, 3], label: "mercenaries" },
          { id: "car-2", faction: "carthage", kind: "infantry", at: [50, 33], size: [34, 3], label: "citizen levies" },
          { id: "car-3", faction: "carthage", kind: "infantry", at: [50, 40], size: [34, 4], label: "veterans of Italy" },
          { id: "car-lcav", faction: "carthage", kind: "cavalry", at: [16, 28], size: [10, 3] },
          { id: "car-rcav", faction: "carthage", kind: "cavalry", at: [84, 28], size: [10, 3] },
          { id: "rom-1", faction: "rome", kind: "infantry", at: [38, 50], size: [8, 3] },
          { id: "rom-2", faction: "rome", kind: "infantry", at: [50, 50], size: [8, 3] },
          { id: "rom-3", faction: "rome", kind: "infantry", at: [62, 50], size: [8, 3] },
          { id: "rom-back", faction: "rome", kind: "infantry", at: [50, 56], size: [30, 3] },
          { id: "rom-lcav", faction: "rome", kind: "cavalry", at: [16, 54], size: [10, 3], label: "Masinissa" },
          { id: "rom-rcav", faction: "rome", kind: "cavalry", at: [84, 54], size: [10, 3] },
        ],
        caveat: "The lanes are the heart of the account; their spacing is a modern reconstruction.",
      },
      {
        id: "elephants",
        title: "The elephant charge is channelled",
        description: "Trumpets and open lanes let the elephants pass through the Roman formation instead of breaking it. Several turn back through Hannibal's own cavalry.",
        certainty: "probable",
        units: [
          { id: "car-eles", faction: "carthage", kind: "elephants", at: [50, 46], size: [40, 3], routed: true },
          { id: "car-1", faction: "carthage", kind: "infantry", at: [50, 30], size: [34, 3] },
          { id: "car-3", faction: "carthage", kind: "infantry", at: [50, 40], size: [34, 4] },
          { id: "car-lcav", faction: "carthage", kind: "cavalry", at: [16, 30], size: [10, 3], routed: true },
          { id: "rom-1", faction: "rome", kind: "infantry", at: [38, 52], size: [8, 3] },
          { id: "rom-2", faction: "rome", kind: "infantry", at: [50, 52], size: [8, 3] },
          { id: "rom-3", faction: "rome", kind: "infantry", at: [62, 52], size: [8, 3] },
          { id: "rom-lcav", faction: "rome", kind: "cavalry", at: [18, 56], size: [10, 3] },
          { id: "rom-rcav", faction: "rome", kind: "cavalry", at: [84, 56], size: [10, 3] },
        ],
        arrows: [
          { id: "a1", from: [44, 44], to: [44, 50], faction: "carthage", kind: "move" },
          { id: "a2", from: [56, 44], to: [56, 50], faction: "carthage", kind: "move" },
        ],
      },
      {
        id: "cavalry-gone",
        title: "The cavalry is driven off the field",
        description: "Masinissa's Numidians and the Roman horse chase the Carthaginian cavalry away — and keep going, leaving the infantry to fight it out alone.",
        certainty: "attested",
        units: [
          { id: "car-1", faction: "carthage", kind: "infantry", at: [50, 32], size: [34, 3] },
          { id: "car-3", faction: "carthage", kind: "infantry", at: [50, 40], size: [34, 4] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [50, 50], size: [36, 4], label: "single line formed" },
        ],
        arrows: [
          { id: "a1", from: [14, 40], to: [4, 18], faction: "rome", kind: "move", label: "pursuit leaves the field" },
          { id: "a2", from: [86, 40], to: [96, 18], faction: "rome", kind: "move" },
        ],
        caveat: "Whether the cavalry pursuit was a lapse of discipline or Scipio's intention is the central argument about this battle.",
      },
      {
        id: "rear",
        title: "The horsemen return behind Hannibal",
        description: "The infantry fight grinds until the returning cavalry arrives in the Carthaginian rear. Caught front and back, Hannibal's veterans are broken and the war ends.",
        certainty: "attested",
        units: [
          { id: "car-3", faction: "carthage", kind: "infantry", at: [50, 36], size: [34, 4], routed: true, label: "veterans" },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [50, 46], size: [36, 4] },
          { id: "rom-cav", faction: "rome", kind: "cavalry", at: [50, 20], size: [22, 3], label: "returning horse" },
        ],
        arrows: [
          { id: "a1", from: [50, 24], to: [50, 32], faction: "rome", kind: "attack", label: "into the rear" },
          { id: "a2", from: [50, 43], to: [50, 39], faction: "rome", kind: "attack" },
        ],
      },
    ],
  },

  // ── Second Macedonian War ────────────────────────────────────────────────
  aous: {
    scaleNote: "The gorge of the Aoös: the river between two walls of mountain, with Philip's works across it. The point where the passage was actually forced is not known.",
    orientation: "Flamininus came up the gorge from the west; Macedonia lay east, beyond Philip's camp.",
    sourceIds: ["livy-31-33", "walbank-1940"],
    terrain: [
      { id: "north", kind: "ridge", points: [[0, 3], [30, 1], [62, 5], [100, 2], [100, 17], [66, 19], [32, 17], [0, 19]], label: "the mountain above", labelAt: [46, 16] },
      { id: "river", kind: "river", points: [[0, 30], [28, 32], [58, 29], [100, 31]], label: "the Aoös" },
      { id: "south", kind: "ridge", points: [[0, 46], [32, 48], [64, 45], [100, 48], [100, 62], [66, 60], [30, 62], [0, 60]], label: "cliffs on the far bank", labelAt: [26, 55] },
    ],
    stages: [
      {
        id: "blocked",
        title: "The gorge is blocked and neither army can move",
        description: "Philip entrenches across the narrowest point of the gorge, with artillery on the slopes above and posts on the heights. Flamininus camps opposite and stays there for forty days while talks fail. There is no way past and no way round that anyone can see.",
        certainty: "attested",
        units: [
          { id: "mac-works", faction: "macedon", kind: "works", at: [54, 32], size: [3, 24] },
          { id: "mac-line", faction: "macedon", kind: "infantry", at: [60, 32], size: [4.5, 20], label: "Philip holds the pass" },
          { id: "mac-posts", faction: "macedon", kind: "skirmishers", at: [50, 12], size: [12, 3], label: "posts on the heights" },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [20, 32], size: [20, 12], label: "the Roman camp" },
        ],
        caveat: "The gorge is known; the point at which the line was forced is debated.",
      },
      {
        id: "guide",
        title: "A local offers a way over the mountain",
        description: "A shepherd from the country round about is brought to Flamininus and says he can lead troops over the heights to the ground behind Philip's position. Four thousand foot and three hundred horse set out by night, without knowing whether they are walking into a trap.",
        certainty: "probable",
        units: [
          { id: "mac-works", faction: "macedon", kind: "works", at: [54, 32], size: [3, 24] },
          { id: "mac-line", faction: "macedon", kind: "infantry", at: [60, 32], size: [4.5, 20] },
          { id: "mac-posts", faction: "macedon", kind: "skirmishers", at: [50, 12], size: [12, 3] },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [20, 32], size: [20, 12] },
          { id: "rom-flank", faction: "rome", kind: "infantry", at: [28, 8], size: [16, 3.5], label: "four thousand, by night" },
        ],
        arrows: [{ id: "a1", from: [24, 25], to: [28, 12], faction: "rome", kind: "move", bow: -4 }],
        caveat: "The guide is Livy's, offered without corroboration, and the sort of detail a triumphal narrative attracts.",
      },
      {
        id: "frontal",
        title: "A frontal attack while the column climbs",
        description: "On the third day Flamininus attacks the works in front and keeps attacking, to hold Philip's whole attention forward. Behind and above, the flanking force reaches the ridge and signals with smoke that it is in position.",
        certainty: "probable",
        units: [
          { id: "mac-works", faction: "macedon", kind: "works", at: [54, 32], size: [3, 24] },
          { id: "mac-line", faction: "macedon", kind: "infantry", at: [60, 32], size: [4.5, 20] },
          { id: "rom-attack", faction: "rome", kind: "infantry", at: [42, 32], size: [8, 20], label: "attacks the works" },
          { id: "rom-flank", faction: "rome", kind: "infantry", at: [68, 8], size: [16, 3.5], label: "signals from the ridge" },
        ],
        arrows: [{ id: "a1", from: [47, 32], to: [52, 32], faction: "rome", kind: "attack" }],
      },
      {
        id: "broken",
        title: "Seen in their rear, the Macedonians break",
        description: "When the Macedonians look up and see Romans on the heights behind them, the line goes. Philip gets away with heavy losses into Thessaly, burning the country as he goes, and the southern approach to Macedonia is open.",
        certainty: "attested",
        units: [
          { id: "mac-line", faction: "macedon", kind: "infantry", at: [60, 32], size: [4.5, 18], routed: true, label: "the line goes" },
          { id: "mac-away", faction: "macedon", kind: "infantry", at: [88, 24], size: [14, 3.5], routed: true, label: "into Thessaly" },
          { id: "rom-attack", faction: "rome", kind: "infantry", at: [50, 32], size: [8, 20] },
          { id: "rom-flank", faction: "rome", kind: "infantry", at: [68, 10], size: [16, 3.5] },
        ],
        arrows: [
          { id: "a1", from: [54, 32], to: [58, 32], faction: "rome", kind: "attack" },
          { id: "a2", from: [68, 14], to: [63, 24], faction: "rome", kind: "attack" },
          { id: "a3", from: [76, 28], to: [96, 22], faction: "macedon", kind: "retreat" },
        ],
      },
    ],
  },

  cynoscephalae: {
    scaleNote: "The ridges called the Dog's Heads, between Pherae and Scotussa; the hills are not securely identified.",
    orientation: "The ridge line runs across the frame.",
    sourceIds: ["polybius-18", "livy-31-33"],
    terrain: [
      { id: "ridge", kind: "ridge", points: [[8, 22], [34, 16], [58, 20], [82, 15], [94, 22], [70, 32], [40, 30], [14, 32]], label: "the Dog's Heads", labelAt: [84, 10] },
    ],
    stages: [
      {
        id: "fog",
        title: "Advance guards collide in fog",
        description: "Neither commander intends to fight here. Screening forces meet on the wet heights and both armies are fed into the action piecemeal.",
        certainty: "attested",
        units: [
          { id: "mac-screen", faction: "macedon", kind: "skirmishers", at: [50, 24], size: [16, 3] },
          { id: "rom-screen", faction: "rome", kind: "skirmishers", at: [50, 36], size: [16, 3] },
          { id: "mac-main", faction: "macedon", kind: "phalanx", at: [50, 12], size: [26, 5] },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [50, 48], size: [30, 4] },
        ],
        arrows: [
          { id: "a1", from: [50, 33], to: [50, 28], faction: "rome", kind: "attack" },
          { id: "a2", from: [50, 20], to: [50, 24], faction: "macedon", kind: "attack" },
        ],
      },
      {
        id: "right-wins",
        title: "Philip's right drives downhill",
        description: "The Macedonian right, formed on the high ground and doubled in depth, pushes the Roman left back down the slope. On that ground the pike wins.",
        certainty: "probable",
        units: [
          { id: "mac-right", faction: "macedon", kind: "phalanx", at: [34, 24], size: [24, 6], label: "phalanx, doubled" },
          { id: "mac-left", faction: "macedon", kind: "phalanx", at: [72, 18], size: [22, 5], label: "still forming" },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [32, 40], size: [24, 4], routed: true },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [72, 40], size: [24, 4] },
          { id: "rom-eles", faction: "rome", kind: "elephants", at: [80, 34], size: [10, 3] },
        ],
        arrows: [{ id: "a1", from: [34, 30], to: [34, 37], faction: "macedon", kind: "attack", label: "drives back" }],
        caveat: "The depth of Philip's right is given as doubled, which is a claim about the formation rather than a count of ranks.",
      },
      {
        id: "left-caught",
        title: "The Macedonian left is caught unformed",
        description: "Flamininus leads his own right, with the elephants, against the Macedonian left before it can complete its formation, and breaks it.",
        certainty: "probable",
        units: [
          { id: "mac-right", faction: "macedon", kind: "phalanx", at: [30, 28], size: [24, 6] },
          { id: "mac-left", faction: "macedon", kind: "phalanx", at: [72, 20], size: [20, 4], routed: true, label: "broken" },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [28, 42], size: [24, 4] },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [72, 30], size: [24, 4] },
          { id: "rom-eles", faction: "rome", kind: "elephants", at: [76, 26], size: [10, 3] },
        ],
        arrows: [{ id: "a1", from: [72, 34], to: [72, 25], faction: "rome", kind: "attack" }],
      },
      {
        id: "tribune",
        title: "A tribune turns on the phalanx's rear",
        description: "An unnamed tribune takes twenty maniples from the victorious right and wheels them into the rear of the advancing phalanx. Out of formation and unable to face about, it is destroyed.",
        certainty: "attested",
        units: [
          { id: "mac-right", faction: "macedon", kind: "phalanx", at: [34, 34], size: [24, 6], routed: true, label: "taken in the rear" },
          { id: "rom-left", faction: "rome", kind: "infantry", at: [34, 46], size: [24, 4] },
          { id: "rom-maniples", faction: "rome", kind: "infantry", at: [34, 22], size: [18, 3], label: "twenty maniples" },
          { id: "rom-right", faction: "rome", kind: "infantry", at: [72, 30], size: [22, 4] },
        ],
        arrows: [
          { id: "a1", from: [62, 26], to: [40, 22], faction: "rome", kind: "attack", bow: -6, label: "wheels across" },
          { id: "a2", from: [34, 26], to: [34, 31], faction: "rome", kind: "attack" },
        ],
        caveat: "The manoeuvre is credited to an unnamed officer acting on his own initiative.",
      },
    ],
  },

  // ── The war with Antiochus III ───────────────────────────────────────────
  // Livy's fourth decade describes these actions in more tactical detail than
  // anything else in the atlas, and the detail is not evenly trustworthy. The
  // shape of each battle — who was on which wing, what broke first — is Polybian
  // and can be drawn. The frontages are not recoverable, and at Magnesia the two
  // surviving orders of battle disagree about where several contingents stood.
  thermopylae: {
    scaleNote: "The narrows at Thermopylae and the mountain above them, perhaps four kilometres of front. The ancient shoreline ran where the sea is drawn here; it is now several kilometres further out.",
    orientation: "The Malian Gulf is north, at the top; Callidromus rises to the south. The Romans come from the west, at the left.",
    sourceIds: ["livy-34-37", "polybius-20", "plutarch-cato"],
    terrain: [
      { id: "gulf", kind: "sea", points: [[0, 0], [100, 0], [100, 15], [0, 15]], label: "the Malian Gulf", labelAt: [16, 8] },
      { id: "callidromus", kind: "hill", points: [[0, 44], [22, 40], [46, 42], [70, 39], [100, 43], [100, 68], [0, 68]], label: "Callidromus", labelAt: [76, 58] },
      { id: "pass", kind: "road", points: [[0, 28], [100, 28]], label: "the pass" },
      { id: "rampart", kind: "wall", points: [[56, 17], [56, 39]], label: "double rampart", labelAt: [64, 20] },
    ],
    stages: [
      {
        id: "held",
        title: "The pass is fortified, and the paths are watched",
        description: "Antiochus blocks the narrows with a double rampart and a ditch, and — unlike Leonidas — posts Aetolians on the mountain tracks that turn the position. On paper the pass cannot be forced.",
        certainty: "attested",
        units: [
          { id: "sel-phalanx", faction: "seleucid", kind: "phalanx", at: [50, 28], size: [6, 16], label: "behind the rampart", labelAt: [42, 12] },
          { id: "sel-light", faction: "seleucid", kind: "skirmishers", at: [60, 28], size: [4, 14] },
          { id: "aet-heights", faction: "seleucid", kind: "infantry", at: [52, 48], size: [16, 4], label: "Aetolians on the heights" },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [26, 28], size: [8, 18] },
        ],
      },
      {
        id: "frontal",
        title: "The frontal attack is checked",
        description: "Glabrio attacks the rampart head-on. Pikes behind a wall in a defile are close to unshiftable, and the assault gains nothing.",
        certainty: "probable",
        units: [
          { id: "sel-phalanx", faction: "seleucid", kind: "phalanx", at: [50, 28], size: [6, 16] },
          { id: "sel-light", faction: "seleucid", kind: "skirmishers", at: [60, 28], size: [4, 14] },
          { id: "aet-heights", faction: "seleucid", kind: "infantry", at: [52, 48], size: [16, 4], label: "Aetolians on the heights" },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [36, 28], size: [8, 18] },
        ],
        arrows: [{ id: "a1", from: [41, 28], to: [46, 28], faction: "rome", kind: "attack", label: "checked" }],
        caveat: "How many days or attempts this took is not clearly reported; the diagram compresses it into one stage.",
      },
      {
        id: "callidromus",
        title: "Cato climbs Callidromus in the dark",
        description: "A column goes over the mountain by night on the same paths that turned the pass in 480, and comes down on the Aetolian outposts before they can send word to the rampart below.",
        certainty: "attested",
        units: [
          { id: "sel-phalanx", faction: "seleucid", kind: "phalanx", at: [50, 28], size: [6, 16] },
          { id: "aet-heights", faction: "seleucid", kind: "infantry", at: [52, 48], size: [16, 4], routed: true, label: "surprised" },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [36, 28], size: [8, 18] },
          { id: "rom-cato", faction: "rome", kind: "infantry", at: [40, 54], size: [10, 3], label: "Cato's column" },
        ],
        arrows: [{ id: "a1", from: [16, 58], to: [46, 50], faction: "rome", kind: "move", bow: 5, label: "over the mountain by night" }],
        caveat: "The route over the mountain is not securely traced, and Cato's share of the credit comes through a tradition in which he was his own witness.",
      },
      {
        id: "collapse",
        title: "Taken from behind, the line breaks",
        description: "Roman troops appear on the slope above and behind the camp. The rampart is abandoned, and the retreat through the defile becomes a rout. Antiochus reaches Chalcis with a few hundred men.",
        certainty: "attested",
        units: [
          { id: "sel-phalanx", faction: "seleucid", kind: "phalanx", at: [58, 28], size: [6, 14], routed: true, label: "broken" },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [42, 28], size: [8, 18] },
          { id: "rom-cato", faction: "rome", kind: "infantry", at: [56, 44], size: [10, 3] },
        ],
        arrows: [
          { id: "a1", from: [56, 40], to: [58, 34], faction: "rome", kind: "attack" },
          { id: "a2", from: [47, 28], to: [53, 28], faction: "rome", kind: "attack" },
          { id: "a3", from: [66, 26], to: [88, 24], faction: "seleucid", kind: "retreat", label: "flight east" },
        ],
      },
    ],
  },

  corycus: {
    scaleNote: "Open water off the Erythraean peninsula. A fleet action covers far more sea than any frame can hold; this is the shape of the engagement, not its extent.",
    orientation: "The Ionian coast lies east, at the right; Ephesus is beyond it to the south-east.",
    sourceIds: ["livy-34-37"],
    terrain: [
      { id: "sea", kind: "sea", points: [[0, 0], [100, 0], [100, 68], [0, 68]] },
      { id: "cape", kind: "coast", points: [[86, 12], [100, 10], [100, 58], [88, 54], [84, 34]], label: "Cape Corycus", labelAt: [92, 34] },
    ],
    stages: [
      {
        id: "junction",
        title: "Eumenes joins before the fleets meet",
        description: "The Pergamene squadron comes down to the Romans off Phocaea. Polyxenidas' chance was to catch the two separately, and it passes.",
        certainty: "probable",
        units: [
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [26, 34], size: [14, 10], label: "Livius, 81 decked ships" },
          { id: "per-fleet", faction: "pergamon", kind: "ships", at: [30, 16], size: [10, 5], label: "Eumenes, 24 ships" },
          { id: "sel-fleet", faction: "seleucid", kind: "ships", at: [66, 34], size: [14, 12], label: "Polyxenidas" },
        ],
        arrows: [{ id: "a1", from: [30, 21], to: [28, 29], faction: "pergamon", kind: "move", label: "joins" }],
      },
      {
        id: "melee",
        title: "The heavier ships close and grapple",
        description: "The allied line drives in to board rather than to manoeuvre — the fight the slower, heavier Roman ships want, and the one the Seleucid fleet is least suited to.",
        certainty: "probable",
        units: [
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [40, 36], size: [16, 10] },
          { id: "per-fleet", faction: "pergamon", kind: "ships", at: [42, 20], size: [10, 5] },
          { id: "sel-fleet", faction: "seleucid", kind: "ships", at: [60, 30], size: [14, 12] },
        ],
        arrows: [
          { id: "a1", from: [48, 34], to: [54, 32], faction: "rome", kind: "attack" },
          { id: "a2", from: [47, 21], to: [55, 24], faction: "pergamon", kind: "attack" },
        ],
        caveat: "No source gives the order of the ships in either line; the wings here stand for the two allied contingents, not for a known formation.",
      },
      {
        id: "flight",
        title: "Back into Ephesus",
        description: "Polyxenidas breaks off with what he has left — about a quarter of his decked ships gone — and shuts himself in the harbour. The allies do not force it.",
        certainty: "attested",
        units: [
          { id: "rom-fleet", faction: "rome", kind: "ships", at: [46, 34], size: [16, 10] },
          { id: "per-fleet", faction: "pergamon", kind: "ships", at: [48, 20], size: [10, 5] },
          { id: "sel-fleet", faction: "seleucid", kind: "ships", at: [72, 42], size: [12, 8], routed: true, label: "23 ships lost" },
        ],
        arrows: [{ id: "a1", from: [74, 48], to: [84, 58], faction: "seleucid", kind: "retreat", label: "to Ephesus" }],
      },
    ],
  },

  eurymedon: {
    scaleNote: "Open water off the Pamphylian coast near Side. The location is given only as a district, and the frame is schematic throughout.",
    orientation: "The Pamphylian shore is south, at the bottom; the Rhodians come from the west.",
    sourceIds: ["livy-34-37", "appian-syrian"],
    terrain: [
      { id: "sea", kind: "sea", points: [[0, 0], [100, 0], [100, 68], [0, 68]] },
      { id: "shore", kind: "coast", points: [[0, 58], [40, 56], [72, 59], [100, 57], [100, 68], [0, 68]], label: "the Pamphylian shore", labelAt: [50, 64] },
    ],
    stages: [
      {
        id: "lines",
        title: "The squadrons form",
        description: "Eudamus intercepts a fleet raised in Phoenicia and Cilicia and heading west to join Polyxenidas. Hannibal has the larger squadron and takes the seaward wing himself.",
        certainty: "probable",
        units: [
          { id: "rho-line", faction: "greek", kind: "ships", at: [30, 30], size: [10, 22], label: "Eudamus, 36 ships", labelAt: [16, 30] },
          { id: "sel-right", faction: "seleucid", kind: "ships", at: [64, 20], size: [10, 12], label: "Hannibal" },
          { id: "sel-left", faction: "seleucid", kind: "ships", at: [64, 42], size: [10, 12] },
        ],
      },
      {
        id: "press",
        title: "Hannibal's wing drives the Rhodian left back",
        description: "The one part of the day that goes as he intends: weight of numbers on the seaward flank pushes the Rhodian left in towards the shore.",
        certainty: "probable",
        units: [
          { id: "rho-left", faction: "greek", kind: "ships", at: [38, 44], size: [8, 10], routed: true, label: "pressed" },
          { id: "rho-right", faction: "greek", kind: "ships", at: [34, 22], size: [8, 12] },
          { id: "sel-right", faction: "seleucid", kind: "ships", at: [56, 20], size: [10, 12], label: "Hannibal" },
          { id: "sel-left", faction: "seleucid", kind: "ships", at: [54, 44], size: [10, 12] },
        ],
        arrows: [{ id: "a1", from: [48, 44], to: [42, 46], faction: "seleucid", kind: "attack", label: "drives in" }],
      },
      {
        id: "seamanship",
        title: "The Rhodians work round the flank",
        description: "Handier ships and better crews tell. The Rhodian right gets outside the Phoenician line and takes it from the beam, and the squadron turns back east. It never reaches the Aegean.",
        certainty: "probable",
        units: [
          { id: "rho-right", faction: "greek", kind: "ships", at: [56, 12], size: [10, 8] },
          { id: "rho-left", faction: "greek", kind: "ships", at: [42, 44], size: [8, 10] },
          { id: "sel-fleet", faction: "seleucid", kind: "ships", at: [64, 30], size: [12, 16], routed: true, label: "turned back" },
        ],
        arrows: [
          { id: "a1", from: [46, 18], to: [60, 20], faction: "greek", kind: "attack", bow: -5, label: "round the flank" },
          { id: "a2", from: [74, 32], to: [90, 34], faction: "seleucid", kind: "retreat", label: "east" },
        ],
        caveat: "Livy's account is short and its interest is in Hannibal's defeat rather than in the manoeuvre; the flanking movement is the shape the narrative implies, not one it describes.",
      },
    ],
  },

  myonessus: {
    scaleNote: "Open water between Teos and Samos. The cape names a locality; the action ranged well beyond it.",
    orientation: "The Ionian coast lies north, at the top; Ephesus is south-east.",
    sourceIds: ["livy-34-37", "polybius-21"],
    terrain: [
      { id: "sea", kind: "sea", points: [[0, 0], [100, 0], [100, 68], [0, 68]] },
      { id: "coast", kind: "coast", points: [[0, 0], [100, 0], [100, 12], [64, 15], [28, 13], [0, 10]], label: "the Ionian coast", labelAt: [50, 6] },
    ],
    stages: [
      {
        id: "out",
        title: "Polyxenidas accepts battle",
        description: "With 89 decked ships against 80, the Seleucid admiral has a real numerical advantage for the first and last time, and comes out to use it.",
        certainty: "attested",
        units: [
          { id: "rom-line", faction: "rome", kind: "ships", at: [40, 44], size: [22, 8], label: "Regillus, 58 Roman ships" },
          { id: "rho-line", faction: "greek", kind: "ships", at: [66, 44], size: [12, 8], label: "Eudamus, 22 Rhodian" },
          { id: "sel-line", faction: "seleucid", kind: "ships", at: [52, 26], size: [34, 9], label: "Polyxenidas, 89 ships" },
        ],
        arrows: [{ id: "a1", from: [52, 32], to: [52, 38], faction: "seleucid", kind: "attack" }],
      },
      {
        id: "flank",
        title: "The Rhodians turn the seaward flank",
        description: "The Roman centre holds the Seleucid line in place while the faster Rhodian squadron on the right works round its end.",
        certainty: "probable",
        units: [
          { id: "rom-line", faction: "rome", kind: "ships", at: [40, 40], size: [22, 8] },
          { id: "rho-line", faction: "greek", kind: "ships", at: [76, 32], size: [12, 8] },
          { id: "sel-line", faction: "seleucid", kind: "ships", at: [50, 28], size: [34, 9] },
        ],
        arrows: [
          { id: "a1", from: [66, 42], to: [78, 30], faction: "greek", kind: "attack", bow: -6, label: "round the end" },
          { id: "a2", from: [42, 36], to: [42, 32], faction: "rome", kind: "attack" },
        ],
      },
      {
        id: "fire",
        title: "Fire ahead of the bows",
        description: "Rhodian ships carry fire-pots slung ahead of the bow on poles. An enemy that sheers away rather than accept the ram presents its flank instead, which is the point of the weapon.",
        certainty: "probable",
        units: [
          { id: "rho-line", faction: "greek", kind: "ships", at: [74, 30], size: [12, 8], label: "fire-pots" },
          { id: "sel-left", faction: "seleucid", kind: "ships", at: [58, 26], size: [16, 9], routed: true },
          { id: "rom-line", faction: "rome", kind: "ships", at: [38, 38], size: [22, 8] },
        ],
        arrows: [{ id: "a1", from: [70, 28], to: [64, 26], faction: "greek", kind: "missile", label: "fire" }],
        caveat: "The fire-pots are described as Rhodian practice in general rather than at Myonnesus specifically; how much they decided here is inference.",
      },
      {
        id: "broken",
        title: "Half the fleet lost, and the Hellespont open",
        description: "Some 42 ships are taken, sunk or burnt. The remnant runs for Ephesus and stays there. Antiochus abandons the Hellespont without contesting it, and the consular army crosses into Asia.",
        certainty: "attested",
        units: [
          { id: "rom-line", faction: "rome", kind: "ships", at: [42, 34], size: [22, 8] },
          { id: "rho-line", faction: "greek", kind: "ships", at: [70, 28], size: [12, 8] },
          { id: "sel-rest", faction: "seleucid", kind: "ships", at: [40, 20], size: [14, 7], routed: true, label: "42 ships lost" },
        ],
        arrows: [{ id: "a1", from: [46, 18], to: [76, 14], faction: "seleucid", kind: "retreat", label: "to Ephesus" }],
      },
    ],
  },

  magnesia: {
    scaleNote: "The plain between the Phrygius and the Hermus, perhaps five kilometres of front. The field has never been located, and the two surviving orders of battle cannot be reconciled — this follows Livy where they differ.",
    orientation: "The river Phrygius covers the Roman left, at the left of the frame. Mount Sipylus is behind the Seleucid position.",
    sourceIds: ["livy-34-37", "appian-syrian", "polybius-21"],
    terrain: [
      { id: "river", kind: "river", points: [[10, 4], [12, 20], [9, 38], [11, 58], [8, 68]], label: "the Phrygius", labelAt: [4, 44] },
      { id: "camp", kind: "town", at: [50, 62], size: [16, 5], label: "Roman camp" },
    ],
    stages: [
      {
        id: "array",
        title: "The armies form",
        description: "Antiochus draws up a phalanx of sixteen thousand in ten blocks thirty-two deep, with elephants standing in the gaps between them, cataphracts on both wings, and scythed chariots in front of his left. Rome puts four legions in the centre, Eumenes with the allied horse on the right, and almost nothing on the left, which the river covers.",
        certainty: "probable",
        units: [
          { id: "sel-phal-a", faction: "seleucid", kind: "phalanx", at: [42, 22], size: [9, 9], label: "phalanx, ten blocks", labelAt: [50, 8] },
          { id: "sel-phal-b", faction: "seleucid", kind: "phalanx", at: [53, 22], size: [9, 9] },
          { id: "sel-phal-c", faction: "seleucid", kind: "phalanx", at: [64, 22], size: [9, 9] },
          { id: "sel-eles", faction: "seleucid", kind: "elephants", at: [47.5, 22], size: [2, 9] },
          { id: "sel-right", faction: "seleucid", kind: "cavalry", at: [26, 22], size: [12, 6], label: "Antiochus, cataphracts" },
          { id: "sel-left", faction: "seleucid", kind: "cavalry", at: [80, 22], size: [12, 6], label: "Seleucus" },
          { id: "sel-chariots", faction: "seleucid", kind: "cavalry", at: [82, 32], size: [12, 3], label: "scythed chariots" },
          { id: "rom-left", faction: "rome", kind: "cavalry", at: [22, 46], size: [8, 4], label: "left, on the river", labelAt: [16, 54] },
          { id: "rom-legions", faction: "rome", kind: "infantry", at: [52, 46], size: [36, 6], label: "four legions" },
          { id: "rom-right", faction: "pergamon", kind: "cavalry", at: [82, 46], size: [12, 5], label: "Eumenes" },
          { id: "rom-eles", faction: "rome", kind: "elephants", at: [52, 56], size: [8, 3], label: "16 elephants, in reserve" },
        ],
        caveat: "Frontages are relative. The depth of the pike blocks is the one measurement a source insists on, and it is drawn as a claim about the formation rather than a count of ranks.",
      },
      {
        id: "chariots",
        title: "The chariots are broken before contact",
        description: "Eumenes sends archers and slingers forward against the scythed chariots rather than waiting to receive them. The teams panic, turn, and career back through the cavalry drawn up behind.",
        certainty: "attested",
        units: [
          { id: "sel-left", faction: "seleucid", kind: "cavalry", at: [80, 24], size: [12, 6] },
          { id: "sel-chariots", faction: "seleucid", kind: "cavalry", at: [82, 32], size: [12, 3], routed: true, label: "driven back into their own line" },
          { id: "rom-skirm", faction: "pergamon", kind: "skirmishers", at: [82, 40], size: [12, 3], label: "archers and slingers" },
          { id: "rom-right", faction: "pergamon", kind: "cavalry", at: [90, 46], size: [10, 5] },
          { id: "rom-legions", faction: "rome", kind: "infantry", at: [52, 46], size: [36, 6] },
          { id: "sel-phal-b", faction: "seleucid", kind: "phalanx", at: [53, 22], size: [28, 9], label: "phalanx, still unengaged" },
          { id: "sel-right", faction: "seleucid", kind: "cavalry", at: [26, 22], size: [12, 6], label: "Antiochus" },
          { id: "rom-left", faction: "rome", kind: "cavalry", at: [22, 46], size: [8, 4] },
        ],
        arrows: [
          { id: "a1", from: [82, 37], to: [82, 34], faction: "pergamon", kind: "missile" },
          { id: "a2", from: [82, 30], to: [80, 27], faction: "seleucid", kind: "retreat" },
        ],
      },
      {
        id: "wings",
        title: "Both wings win, in opposite directions",
        description: "With its own chariots through it, the Seleucid left is charged before it can re-form and driven off the field. At the same moment Antiochus breaks the Roman left on the river and pursues it all the way to the camp — where a tribune rallies the line and stops him at the rampart.",
        certainty: "probable",
        units: [
          { id: "sel-left", faction: "seleucid", kind: "cavalry", at: [86, 18], size: [12, 5], routed: true, label: "swept away" },
          { id: "rom-right", faction: "pergamon", kind: "cavalry", at: [80, 34], size: [12, 5], label: "Eumenes" },
          { id: "sel-phal-b", faction: "seleucid", kind: "phalanx", at: [53, 22], size: [28, 9] },
          { id: "rom-legions", faction: "rome", kind: "infantry", at: [52, 44], size: [36, 6] },
          { id: "rom-left", faction: "rome", kind: "cavalry", at: [30, 56], size: [8, 4], routed: true },
          { id: "sel-right", faction: "seleucid", kind: "cavalry", at: [36, 50], size: [12, 6], label: "Antiochus, too far forward" },
        ],
        arrows: [
          { id: "a1", from: [82, 30], to: [86, 22], faction: "pergamon", kind: "attack" },
          { id: "a2", from: [26, 30], to: [40, 54], faction: "seleucid", kind: "attack", bow: 6, label: "to the camp" },
        ],
        caveat: "How far Antiochus pursued, and whether he could have turned back sooner, is the one judgement every ancient account makes and none can support.",
      },
      {
        id: "phalanx",
        title: "The phalanx is left standing alone",
        description: "Unbeaten and abandoned by both wings, the pike blocks close into a square and begin to retire in good order — a formation nothing in the Roman line can break into. Then the elephants standing in the gaps are wounded by missiles, panic, and open the square from the inside.",
        certainty: "attested",
        units: [
          { id: "sel-square", faction: "seleucid", kind: "phalanx", at: [53, 26], size: [22, 12], label: "closed into a square" },
          { id: "sel-eles", faction: "seleucid", kind: "elephants", at: [53, 26], size: [6, 4], routed: true, label: "panicked" },
          { id: "rom-legions", faction: "rome", kind: "infantry", at: [53, 44], size: [36, 6] },
          { id: "rom-right", faction: "pergamon", kind: "cavalry", at: [80, 32], size: [12, 5] },
          { id: "rom-skirm", faction: "rome", kind: "skirmishers", at: [53, 38], size: [24, 3], label: "missiles" },
        ],
        arrows: [
          { id: "a1", from: [53, 36], to: [53, 32], faction: "rome", kind: "missile" },
          { id: "a2", from: [76, 30], to: [66, 28], faction: "pergamon", kind: "attack" },
        ],
        caveat: "That the elephants broke the square is stated; the rest of the collapse is not described, and the diagram stops where the sources do.",
      },
    ],
  },

  // ── The Third Macedonian War and the Third Punic War ─────────────────────
  callinicus: {
    scaleNote: "Open ground between the two camps outside Larissa, perhaps three kilometres across. The hill Livy names has never been located, so the frame is orientation only.",
    orientation: "The Roman camp lies south, at the bottom; Perseus' to the north.",
    sourceIds: ["livy-39-45", "polybius-27-30"],
    terrain: [
      { id: "hill", kind: "hill", points: [[38, 20], [58, 17], [70, 24], [56, 32], [40, 30]], label: "Callinicus", labelAt: [54, 12] },
      { id: "rom-camp", kind: "town", at: [50, 60], size: [22, 5], label: "Roman camp" },
    ],
    stages: [
      {
        id: "screens",
        title: "The cavalry screens meet",
        description: "Both armies have their horse and light foot out in front of the camps. The contact grows out of that rather than from a decision by either king or consul.",
        certainty: "probable",
        units: [
          { id: "mac-horse", faction: "macedon", kind: "cavalry", at: [50, 26], size: [28, 5], label: "Perseus' horse" },
          { id: "mac-light", faction: "macedon", kind: "skirmishers", at: [50, 33], size: [22, 3], label: "Cretan archers" },
          { id: "rom-horse", faction: "rome", kind: "cavalry", at: [50, 44], size: [28, 5] },
          { id: "rom-light", faction: "rome", kind: "skirmishers", at: [50, 38], size: [22, 3] },
        ],
        arrows: [{ id: "a1", from: [50, 36], to: [50, 34], faction: "rome", kind: "attack" }],
      },
      {
        id: "flank-goes",
        title: "The allied horse gives way",
        description: "The Thessalian and Aetolian cavalry on the Roman flank breaks first, and the line it was holding is uncovered.",
        certainty: "probable",
        units: [
          { id: "mac-horse", faction: "macedon", kind: "cavalry", at: [46, 28], size: [28, 5] },
          { id: "mac-thracian", faction: "macedon", kind: "cavalry", at: [76, 28], size: [14, 4], label: "Cotys' Thracians" },
          { id: "rom-horse", faction: "rome", kind: "cavalry", at: [44, 42], size: [24, 5] },
          { id: "rom-allies", faction: "rome", kind: "cavalry", at: [74, 44], size: [14, 4], routed: true, label: "allied horse" },
        ],
        arrows: [{ id: "a1", from: [76, 33], to: [76, 40], faction: "macedon", kind: "attack" }],
        caveat: "Livy blames the allied contingents for the collapse, which is what a Roman account of a Roman defeat tends to do.",
      },
      {
        id: "rolled-up",
        title: "The Sacred Squadron rolls up the line",
        description: "Perseus' heavy horse takes the Roman cavalry in the flank it has just uncovered and rides down the light infantry supporting it.",
        certainty: "probable",
        units: [
          { id: "mac-horse", faction: "macedon", kind: "cavalry", at: [56, 36], size: [30, 5], label: "the Sacred Squadron" },
          { id: "rom-horse", faction: "rome", kind: "cavalry", at: [40, 46], size: [24, 5], routed: true },
          { id: "rom-light", faction: "rome", kind: "skirmishers", at: [40, 52], size: [20, 3], routed: true },
        ],
        arrows: [{ id: "a1", from: [66, 40], to: [46, 44], faction: "macedon", kind: "attack", bow: 4 }],
      },
      {
        id: "not-followed",
        title: "Perseus does not follow it up",
        description: "The consular army gets back inside its camp intact. Perseus halts, and offers peace on the terms he had been refused before the battle.",
        certainty: "attested",
        units: [
          { id: "mac-horse", faction: "macedon", kind: "cavalry", at: [50, 40], size: [30, 5] },
          { id: "rom-army", faction: "rome", kind: "infantry", at: [50, 56], size: [26, 4], label: "back in camp" },
        ],
        arrows: [{ id: "a1", from: [50, 48], to: [50, 52], faction: "rome", kind: "retreat" }],
      },
    ],
  },

  pydna: {
    scaleNote: "The coastal plain below Pydna between the mountain and the sea, perhaps four kilometres of front. The line of the Leucus is used to fix the position; the frontages are reconstructed.",
    orientation: "The sea is east, at the right; Mount Olocrus rises to the west. The Romans face north.",
    sourceIds: ["livy-39-45", "plutarch-aemilius", "polybius-27-30"],
    terrain: [
      { id: "sea", kind: "sea", points: [[88, 0], [100, 0], [100, 68], [88, 68]], label: "the sea", labelAt: [94, 60] },
      { id: "hills", kind: "hill", points: [[0, 0], [14, 0], [16, 30], [12, 52], [0, 62]], label: "Olocrus", labelAt: [6, 34] },
      { id: "leucus", kind: "river", points: [[10, 34], [30, 36], [52, 35], [74, 37], [88, 36]], label: "the Leucus", labelAt: [30, 42] },
    ],
    stages: [
      {
        id: "arrayed",
        title: "Both armies form, and neither attacks",
        description: "Perseus has abandoned the Elpeus line rather than be cut off and drawn up on the plain. The two armies face each other for a day without engaging.",
        certainty: "attested",
        units: [
          { id: "mac-phal-a", faction: "macedon", kind: "phalanx", at: [40, 22], size: [24, 8], label: "the phalanx, two corps", labelAt: [40, 8] },
          { id: "mac-phal-b", faction: "macedon", kind: "phalanx", at: [66, 22], size: [24, 8] },
          { id: "mac-horse", faction: "macedon", kind: "cavalry", at: [82, 24], size: [12, 4], label: "Perseus" },
          { id: "rom-legions", faction: "rome", kind: "infantry", at: [52, 50], size: [40, 6], label: "two legions" },
          { id: "rom-eles", faction: "rome", kind: "elephants", at: [82, 50], size: [10, 4], label: "22 elephants" },
        ],
      },
      {
        id: "accident",
        title: "A loose animal starts it",
        description: "Skirmishing over a stray pack animal near the stream pulls both lines forward before either commander has ordered anything.",
        certainty: "probable",
        units: [
          { id: "mac-light", faction: "macedon", kind: "skirmishers", at: [52, 32], size: [18, 3] },
          { id: "rom-light", faction: "rome", kind: "skirmishers", at: [52, 40], size: [18, 3] },
          { id: "mac-phal-a", faction: "macedon", kind: "phalanx", at: [40, 22], size: [24, 8] },
          { id: "mac-phal-b", faction: "macedon", kind: "phalanx", at: [66, 22], size: [24, 8] },
          { id: "rom-legions", faction: "rome", kind: "infantry", at: [52, 50], size: [40, 6] },
        ],
        arrows: [
          { id: "a1", from: [52, 38], to: [52, 35], faction: "rome", kind: "attack" },
          { id: "a2", from: [52, 30], to: [52, 33], faction: "macedon", kind: "attack" },
        ],
        caveat: "The animal appears in more than one account and is exactly the kind of detail invented to explain a battle nobody chose to fight.",
      },
      {
        id: "phalanx-advances",
        title: "The phalanx drives the legions back",
        description: "On level ground the pike front is irresistible. The legions give way in front of it, and Paullus says afterwards that the sight was the most frightening thing he had seen.",
        certainty: "attested",
        units: [
          { id: "mac-phal-a", faction: "macedon", kind: "phalanx", at: [40, 32], size: [24, 8] },
          { id: "mac-phal-b", faction: "macedon", kind: "phalanx", at: [66, 32], size: [24, 8] },
          { id: "rom-legions", faction: "rome", kind: "infantry", at: [52, 52], size: [40, 6], routed: true, label: "pushed back" },
        ],
        arrows: [{ id: "a1", from: [52, 40], to: [52, 47], faction: "macedon", kind: "attack", label: "irresistible in front" }],
      },
      {
        id: "gaps",
        title: "The ground opens the front",
        description: "Advancing over uneven ground and pushing a line that is giving way unevenly, the pike front loses its continuity. Gaps appear along it — and a phalanx is only a wall while it is continuous.",
        certainty: "attested",
        units: [
          { id: "mac-a", faction: "macedon", kind: "phalanx", at: [30, 38], size: [16, 8] },
          { id: "mac-b", faction: "macedon", kind: "phalanx", at: [52, 40], size: [16, 8] },
          { id: "mac-c", faction: "macedon", kind: "phalanx", at: [74, 38], size: [16, 8] },
          { id: "rom-legions", faction: "rome", kind: "infantry", at: [52, 54], size: [40, 5] },
        ],
        caveat: "That the front broke up is stated by every account; where the gaps were is not, and the three blocks here stand for a process rather than a formation.",
      },
      {
        id: "maniples",
        title: "Maniples into the gaps",
        description: "Paullus breaks his line into its parts and orders them into the gaps individually. Inside the pike line the sarissa is useless and the gladius is not, and the phalanx is destroyed from within.",
        certainty: "attested",
        units: [
          { id: "mac-a", faction: "macedon", kind: "phalanx", at: [30, 38], size: [16, 8], routed: true },
          { id: "mac-b", faction: "macedon", kind: "phalanx", at: [52, 40], size: [16, 8], routed: true },
          { id: "mac-c", faction: "macedon", kind: "phalanx", at: [74, 38], size: [16, 8], routed: true },
          { id: "rom-man-1", faction: "rome", kind: "infantry", at: [41, 46], size: [7, 3] },
          { id: "rom-man-2", faction: "rome", kind: "infantry", at: [63, 46], size: [7, 3] },
          { id: "rom-man-3", faction: "rome", kind: "infantry", at: [86, 44], size: [7, 3] },
          { id: "rom-eles", faction: "rome", kind: "elephants", at: [86, 52], size: [10, 4] },
        ],
        arrows: [
          { id: "a1", from: [41, 44], to: [41, 41], faction: "rome", kind: "attack" },
          { id: "a2", from: [63, 44], to: [63, 42], faction: "rome", kind: "attack" },
        ],
      },
    ],
  },

  carthage: {
    scaleNote: "The peninsula of Carthage, its triple landward wall, the two harbours and the Byrsa hill. The circuit and the harbours are archaeologically established; the siege lines are schematic.",
    orientation: "The gulf of Tunis is east, at the right; the isthmus and the landward wall face west.",
    sourceIds: ["appian-hann", "polybius-36-39"],
    terrain: [
      { id: "sea", kind: "sea", points: [[70, 0], [100, 0], [100, 68], [70, 68]], label: "the gulf", labelAt: [88, 8] },
      { id: "wall", kind: "wall", points: [[34, 8], [33, 26], [34, 44], [36, 60]], label: "the triple wall", labelAt: [22, 34] },
      { id: "byrsa", kind: "hill", points: [[52, 24], [62, 22], [66, 32], [58, 38], [50, 34]], label: "the Byrsa", labelAt: [58, 17] },
      { id: "harbours", kind: "town", at: [62, 50], size: [12, 10], label: "the harbours" },
    ],
    stages: [
      {
        id: "disarmed",
        title: "Disarmed, and then told to move",
        description: "Carthage hands over three hundred hostages and its entire arsenal — Appian counts two hundred thousand sets of armour — and is then ordered to abandon the site and rebuild inland. It refuses, and starts making weapons with nothing.",
        certainty: "attested",
        units: [
          { id: "pun-city", faction: "carthage", kind: "works", at: [52, 34], size: [30, 40], label: "the city rearms" },
          { id: "rom-army", faction: "rome", kind: "infantry", at: [16, 34], size: [10, 24], label: "consular army" },
        ],
        arrows: [{ id: "a1", from: [22, 34], to: [30, 34], faction: "rome", kind: "move" }],
      },
      {
        id: "assaults",
        title: "Two years of assaults achieve nothing",
        description: "The landward wall is triple and the approach across the isthmus is narrow. Attacks on it fail, and the besiegers lose more than the besieged.",
        certainty: "probable",
        units: [
          { id: "pun-wall", faction: "carthage", kind: "works", at: [40, 34], size: [12, 44], label: "the wall holds" },
          { id: "rom-a", faction: "rome", kind: "infantry", at: [20, 20], size: [10, 8], routed: true },
          { id: "rom-b", faction: "rome", kind: "infantry", at: [20, 48], size: [10, 8], routed: true },
          { id: "pun-field", faction: "carthage", kind: "cavalry", at: [12, 62], size: [12, 4], label: "Hasdrubal, in the field" },
        ],
        arrows: [
          { id: "a1", from: [26, 20], to: [33, 22], faction: "rome", kind: "attack" },
          { id: "a2", from: [26, 48], to: [33, 46], faction: "rome", kind: "attack" },
        ],
      },
      {
        id: "mole",
        title: "Scipio seals the harbour",
        description: "A mole is built across the harbour mouth. The Carthaginians cut a new channel through to open water and get a fleet out, but the city is now cut off from supply and goes into the winter without food.",
        certainty: "attested",
        units: [
          { id: "rom-mole", faction: "rome", kind: "works", at: [78, 54], size: [16, 4], label: "the mole" },
          { id: "rom-ships", faction: "rome", kind: "ships", at: [86, 44], size: [10, 8] },
          { id: "pun-ships", faction: "carthage", kind: "ships", at: [72, 40], size: [8, 6], label: "the new channel" },
          { id: "rom-lines", faction: "rome", kind: "works", at: [26, 34], size: [6, 46], label: "lines across the isthmus" },
          { id: "pun-city", faction: "carthage", kind: "works", at: [52, 32], size: [26, 34] },
        ],
        arrows: [{ id: "a1", from: [72, 46], to: [76, 50], faction: "rome", kind: "move" }],
        caveat: "The mole and the cut channel are both described; their exact line on the ground is not recoverable from the harbour remains.",
      },
      {
        id: "streets",
        title: "Six days from the harbour to the Byrsa",
        description: "The final assault goes in through the harbour quarter and fights uphill house by house, burning and demolishing as it advances. The citadel surrenders on the sixth day.",
        certainty: "attested",
        units: [
          { id: "rom-assault", faction: "rome", kind: "infantry", at: [66, 46], size: [14, 6] },
          { id: "pun-byrsa", faction: "carthage", kind: "works", at: [58, 30], size: [14, 12], label: "the Byrsa" },
          { id: "pun-street", faction: "carthage", kind: "infantry", at: [62, 40], size: [10, 4], routed: true },
        ],
        arrows: [{ id: "a1", from: [64, 42], to: [59, 36], faction: "rome", kind: "attack", label: "uphill, house by house" }],
      },
    ],
  },

  nepheris: {
    scaleNote: "The fortified camp at Nepheris in the hills above the Oued Miliane, perhaps two kilometres across. The site is not securely identified and the frame is schematic throughout.",
    orientation: "Broken hill country; Carthage lies to the north-west.",
    sourceIds: ["appian-hann", "polybius-36-39"],
    terrain: [
      { id: "hills", kind: "hill", points: [[6, 12], [34, 6], [66, 10], [92, 8], [94, 56], [60, 62], [24, 58], [8, 48]], label: "broken hill country", labelAt: [50, 64] },
      { id: "camp", kind: "town", at: [52, 28], size: [22, 12], label: "the Carthaginian camp" },
    ],
    stages: [
      {
        id: "pinned",
        title: "The camp attacked in front",
        description: "Scipio goes at the entrenchments frontally — which is what a position like this is built to resist, and what a Roman army had already failed against here in 149.",
        certainty: "probable",
        units: [
          { id: "pun-camp", faction: "carthage", kind: "works", at: [52, 28], size: [24, 12], label: "entrenched" },
          { id: "rom-front", faction: "rome", kind: "infantry", at: [52, 46], size: [26, 5] },
        ],
        arrows: [{ id: "a1", from: [52, 43], to: [52, 36], faction: "rome", kind: "attack" }],
      },
      {
        id: "round",
        title: "A detachment works round behind",
        description: "While the defenders are committed to the front, a force goes round through the broken ground with Gulussa's Numidian horse to come at the camp from the rear.",
        certainty: "probable",
        units: [
          { id: "pun-camp", faction: "carthage", kind: "works", at: [52, 28], size: [24, 12] },
          { id: "rom-front", faction: "rome", kind: "infantry", at: [52, 44], size: [26, 5] },
          { id: "rom-flank", faction: "rome", kind: "infantry", at: [80, 24], size: [12, 4] },
          { id: "num-horse", faction: "numidia", kind: "cavalry", at: [82, 34], size: [12, 4], label: "Gulussa" },
        ],
        arrows: [{ id: "a1", from: [76, 42], to: [78, 28], faction: "rome", kind: "move", bow: -6, label: "round the flank" }],
      },
      {
        id: "destroyed",
        title: "The last field army destroyed",
        description: "Attacked front and rear, the camp falls and the town with it. Nothing outside the walls can relieve Carthage now, and the city has a winter of blockade in front of it.",
        certainty: "attested",
        units: [
          { id: "pun-camp", faction: "carthage", kind: "works", at: [52, 28], size: [24, 12], routed: true, label: "overrun" },
          { id: "rom-front", faction: "rome", kind: "infantry", at: [52, 42], size: [26, 5] },
          { id: "rom-flank", faction: "rome", kind: "infantry", at: [58, 16], size: [12, 4] },
        ],
        arrows: [
          { id: "a1", from: [52, 39], to: [52, 34], faction: "rome", kind: "attack" },
          { id: "a2", from: [58, 20], to: [55, 24], faction: "rome", kind: "attack" },
        ],
      },
    ],
  },

  // ── Spain, Jugurtha and the Cimbri ───────────────────────────────────────
  // Four of these six are drawn from a single source each — Sallust for the
  // Muthul, Plutarch for the two Marian battles — and one, Arausio, from summaries
  // that say only that both armies were destroyed. The stages are graded
  // accordingly, and Arausio's are deliberately the coarsest in the atlas.
  numantia: {
    scaleNote: "The hill of Numantia and the nine kilometres of wall around it. Uniquely in this atlas the siege works are not schematic — Schulten excavated the camps and the circumvallation, and their positions are known.",
    orientation: "The Douro and its tributary enclose the hill on the north and east.",
    sourceIds: ["appian-iberica"],
    terrain: [
      { id: "hill", kind: "hill", points: [[42, 26], [58, 24], [64, 34], [56, 44], [42, 42], [36, 34]], label: "Numantia", labelAt: [50, 17] },
      { id: "river", kind: "river", points: [[20, 16], [40, 20], [62, 18], [80, 24]], label: "the Douro", labelAt: [76, 16] },
      { id: "wall", kind: "wall", points: [[26, 20], [70, 16], [80, 34], [70, 52], [30, 54], [20, 36], [26, 20]], label: "the circumvallation", labelAt: [50, 62] },
    ],
    stages: [
      {
        id: "cleared",
        title: "The army made into an army again",
        description: "Scipio arrives to find a camp with more traders and camp followers than soldiers, expels them, and drills what is left. He does not attack.",
        certainty: "attested",
        units: [
          { id: "town", faction: "iberian", kind: "works", at: [50, 34], size: [20, 14], label: "Numantia" },
          { id: "rom", faction: "rome", kind: "infantry", at: [50, 60], size: [26, 4] },
        ],
      },
      {
        id: "invested",
        title: "Seven camps and a wall",
        description: "A continuous line is built round the town and the river is blocked with booms. The siege is now a question of supply rather than of assault.",
        certainty: "attested",
        units: [
          { id: "town", faction: "iberian", kind: "works", at: [50, 34], size: [20, 14] },
          { id: "c1", faction: "rome", kind: "camp", at: [24, 26], size: [8, 5] },
          { id: "c2", faction: "rome", kind: "camp", at: [72, 24], size: [8, 5] },
          { id: "c3", faction: "rome", kind: "camp", at: [76, 44], size: [8, 5] },
          { id: "c4", faction: "rome", kind: "camp", at: [50, 56], size: [8, 5] },
          { id: "c5", faction: "rome", kind: "camp", at: [22, 44], size: [8, 5] },
        ],
        caveat: "Seven camps are attested; five are drawn, because the frame cannot hold seven legibly and the point is the ring, not the count.",
      },
      {
        id: "breakout",
        title: "A breakout that finds no one",
        description: "Rhetogenes gets a few men through the line to appeal to the other Celtiberian towns for help. None of them will move against Rome.",
        certainty: "probable",
        units: [
          { id: "town", faction: "iberian", kind: "works", at: [50, 34], size: [20, 14] },
          { id: "party", faction: "iberian", kind: "cavalry", at: [72, 52], size: [6, 3], label: "Rhetogenes" },
          { id: "c3", faction: "rome", kind: "camp", at: [76, 44], size: [8, 5] },
          { id: "c4", faction: "rome", kind: "camp", at: [50, 56], size: [8, 5] },
        ],
        arrows: [{ id: "a1", from: [62, 44], to: [76, 56], faction: "iberian", kind: "move", label: "out through the line" }],
      },
      {
        id: "starved",
        title: "Eight months",
        description: "The town starves and surrenders. It is razed, and its territory divided among Rome's Spanish allies.",
        certainty: "attested",
        units: [
          { id: "town", faction: "iberian", kind: "works", at: [50, 34], size: [20, 14], routed: true, label: "surrendered" },
          { id: "rom", faction: "rome", kind: "infantry", at: [50, 52], size: [22, 4] },
        ],
        arrows: [{ id: "a1", from: [50, 49], to: [50, 43], faction: "rome", kind: "move" }],
      },
    ],
  },

  noreia: {
    scaleNote: "A valley in the eastern Alps. Noreia has never been located, so this frame stands for the shape of an ambush that went wrong and for nothing on the ground.",
    orientation: "The Cimbric column is moving south-west, from left to right.",
    sourceIds: ["livy-periochae-54-70"],
    terrain: [
      { id: "slopes", kind: "hill", points: [[0, 6], [40, 2], [80, 6], [100, 4], [100, 22], [60, 26], [20, 22], [0, 24]], label: "the high ground", labelAt: [50, 14] },
      { id: "road", kind: "road", points: [[4, 40], [30, 42], [60, 41], [96, 43]], label: "the line of march" },
    ],
    stages: [
      {
        id: "guided",
        title: "Guides, and an ambush behind them",
        description: "The Cimbri agree to leave Noric territory and accept Roman guides. Carbo has already put his army on the ground the guides are leading them to.",
        certainty: "probable",
        units: [
          { id: "cim-column", faction: "cimbri", kind: "infantry", at: [26, 42], size: [26, 4], label: "the column, on the march" },
          { id: "rom-hidden", faction: "rome", kind: "infantry", at: [60, 20], size: [22, 4], label: "Carbo, in position" },
        ],
        arrows: [{ id: "a1", from: [40, 42], to: [58, 42], faction: "cimbri", kind: "move" }],
      },
      {
        id: "sprung",
        title: "Sprung early, or seen coming",
        description: "The attack goes in against a column that is not surprised. The sources say only that the Cimbri learned of the treachery; how is not recorded.",
        certainty: "disputed",
        units: [
          { id: "cim-column", faction: "cimbri", kind: "infantry", at: [52, 40], size: [26, 5] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [56, 26], size: [22, 4] },
        ],
        arrows: [{ id: "a1", from: [56, 30], to: [54, 36], faction: "rome", kind: "attack" }],
        caveat: "Whether the ambush was discovered, mistimed, or simply beaten is not recoverable — no narrative source survives.",
      },
      {
        id: "destroyed",
        title: "The army destroyed",
        description: "The Roman line breaks and the army is cut to pieces. A storm is credited with ending the pursuit, which is either a real memory of Alpine weather or an explanation of why there were survivors at all.",
        certainty: "probable",
        units: [
          { id: "cim-column", faction: "cimbri", kind: "infantry", at: [50, 32], size: [30, 6] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [58, 20], size: [22, 4], routed: true, label: "destroyed" },
        ],
        arrows: [{ id: "a1", from: [52, 28], to: [56, 24], faction: "cimbri", kind: "attack" }],
      },
    ],
  },

  muthul: {
    scaleNote: "A ridge above the road down to the river Muthul, perhaps ten kilometres of front. Sallust describes the ground in detail and names nothing that can be found today.",
    orientation: "The river lies south, at the bottom; the Roman column is marching towards it.",
    sourceIds: ["sallust-jugurtha"],
    terrain: [
      { id: "ridge", kind: "ridge", points: [[4, 18], [30, 14], [60, 16], [88, 13], [96, 22], [60, 26], [30, 24], [6, 28]], label: "the ridge", labelAt: [50, 8] },
      { id: "river", kind: "river", points: [[0, 60], [30, 62], [64, 61], [100, 63]], label: "the Muthul", labelAt: [16, 66] },
    ],
    stages: [
      {
        id: "strung-out",
        title: "The column marches down to water",
        description: "Metellus' army descends towards the river in march order. Jugurtha has put his army along the ridge above and behind it, and has been there since before the Romans arrived.",
        certainty: "probable",
        units: [
          { id: "num-ridge", faction: "numidia", kind: "cavalry", at: [50, 22], size: [40, 4], label: "Jugurtha, on the ridge" },
          { id: "rom-van", faction: "rome", kind: "infantry", at: [34, 46], size: [14, 4], label: "Rutilius, sent ahead" },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [62, 38], size: [18, 4], label: "the main body" },
        ],
        arrows: [{ id: "a1", from: [40, 46], to: [34, 54], faction: "rome", kind: "move", label: "to the river" }],
      },
      {
        id: "come-down",
        title: "Attacked while it cannot form a line",
        description: "The Numidians come down on an army split between its vanguard and its main body, in country that lets cavalry get behind either.",
        certainty: "probable",
        units: [
          { id: "num-a", faction: "numidia", kind: "cavalry", at: [36, 30], size: [18, 4] },
          { id: "num-b", faction: "numidia", kind: "cavalry", at: [70, 28], size: [18, 4] },
          { id: "rom-van", faction: "rome", kind: "infantry", at: [30, 50], size: [14, 4] },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [64, 40], size: [18, 4] },
        ],
        arrows: [
          { id: "a1", from: [70, 32], to: [66, 37], faction: "numidia", kind: "attack" },
          { id: "a2", from: [36, 34], to: [32, 46], faction: "numidia", kind: "attack" },
        ],
        caveat: "Sallust's Numidians disperse and re-form repeatedly rather than holding a line; the blocks here are positions in a sequence, not a formation.",
      },
      {
        id: "water-held",
        title: "The water is held",
        description: "Rutilius' detachment reaches the river and keeps it. In this country that is the whole battle: an army that cannot drink cannot stay.",
        certainty: "probable",
        units: [
          { id: "rom-van", faction: "rome", kind: "infantry", at: [30, 54], size: [16, 4], label: "on the river" },
          { id: "num-b", faction: "numidia", kind: "cavalry", at: [66, 30], size: [18, 4] },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [64, 40], size: [18, 4] },
        ],
        arrows: [{ id: "a1", from: [64, 36], to: [66, 34], faction: "rome", kind: "attack" }],
      },
      {
        id: "withdraws",
        title: "A field held, and an army that walks away",
        description: "The Romans clear the ridge and camp on the ground, which makes it a victory. Jugurtha's army disperses and re-forms elsewhere, undamaged, and the war goes on for three more years.",
        certainty: "probable",
        units: [
          { id: "rom-line", faction: "rome", kind: "infantry", at: [50, 30], size: [30, 4], label: "on the ridge" },
          { id: "num-away", faction: "numidia", kind: "cavalry", at: [84, 16], size: [16, 4], label: "withdrawn intact" },
        ],
        arrows: [{ id: "a1", from: [74, 20], to: [88, 12], faction: "numidia", kind: "retreat" }],
      },
    ],
  },

  arausio: {
    scaleNote: "The Rhône near Arausio. The field is unlocated, and this frame claims only the one thing the sources are clear about: two Roman armies camped apart with the river behind them.",
    orientation: "The Rhône runs down the frame; the Cimbri come from the north.",
    sourceIds: ["livy-periochae-54-70", "plutarch-marius"],
    terrain: [
      { id: "rhone", kind: "river", points: [[50, 0], [46, 18], [52, 38], [48, 58], [54, 68]], label: "the Rhône", labelAt: [58, 60] },
    ],
    stages: [
      {
        id: "apart",
        title: "Two armies that will not combine",
        description: "Caepio is a proconsul and a patrician; Mallius is the consul and a new man. Caepio will not camp with him, and puts the river between them.",
        certainty: "attested",
        units: [
          { id: "caepio", faction: "rome", kind: "infantry", at: [26, 30], size: [20, 5], label: "Caepio" },
          { id: "mallius", faction: "rome", kind: "infantry", at: [74, 34], size: [20, 5], label: "Mallius (consul)" },
          { id: "cimbri", faction: "cimbri", kind: "infantry", at: [50, 10], size: [30, 5], label: "the Cimbri" },
        ],
      },
      {
        id: "alone",
        title: "Caepio attacks first, alone",
        description: "Mallius has opened negotiations. To prevent a settlement that would be the consul's credit rather than his own, Caepio goes in with his own army.",
        certainty: "probable",
        units: [
          { id: "caepio", faction: "rome", kind: "infantry", at: [30, 22], size: [20, 5], label: "Caepio, alone" },
          { id: "mallius", faction: "rome", kind: "infantry", at: [74, 34], size: [20, 5] },
          { id: "cimbri", faction: "cimbri", kind: "infantry", at: [48, 12], size: [32, 5] },
        ],
        arrows: [{ id: "a1", from: [32, 19], to: [40, 15], faction: "rome", kind: "attack" }],
        caveat: "The motive is supplied by sources hostile to Caepio. That the two armies fought separately is not in doubt; why is a Roman explanation of a Roman disaster.",
      },
      {
        id: "in-detail",
        title: "Destroyed one after the other",
        description: "Caepio's camp is overrun. The Cimbri then turn on Mallius, whose army has the Rhône at its back and nowhere to go.",
        certainty: "probable",
        units: [
          { id: "caepio", faction: "rome", kind: "infantry", at: [30, 20], size: [18, 5], routed: true },
          { id: "cimbri", faction: "cimbri", kind: "infantry", at: [56, 20], size: [34, 6] },
          { id: "mallius", faction: "rome", kind: "infantry", at: [76, 36], size: [20, 5], routed: true },
        ],
        arrows: [{ id: "a1", from: [64, 24], to: [74, 31], faction: "cimbri", kind: "attack" }],
      },
      {
        id: "open",
        title: "Italy left open, and not taken",
        description: "Nothing organised remains between the Cimbri and Italy. They turn west into Spain instead — a decision no source explains, and the three years it buys are the reason Rome survives.",
        certainty: "attested",
        units: [
          { id: "cimbri", faction: "cimbri", kind: "infantry", at: [46, 30], size: [34, 6] },
          { id: "rome-none", faction: "rome", kind: "infantry", at: [82, 48], size: [10, 3], routed: true, label: "survivors" },
        ],
        arrows: [{ id: "a1", from: [32, 32], to: [10, 38], faction: "cimbri", kind: "move", label: "west, into Spain" }],
      },
    ],
  },

  "aquae-sextiae": {
    scaleNote: "Hill country near Aquae Sextiae, perhaps three kilometres of front. The town is certain; which valley the action was fought in is argued over.",
    orientation: "The Teutones are moving along the road below; the Romans hold the slope above it.",
    sourceIds: ["plutarch-marius"],
    terrain: [
      { id: "slope", kind: "hill", points: [[0, 10], [30, 6], [64, 9], [100, 6], [100, 30], [64, 34], [30, 31], [0, 34]], label: "the slope", labelAt: [50, 20] },
      { id: "road", kind: "road", points: [[2, 46], [34, 48], [68, 47], [98, 49]], label: "the road into Italy" },
      { id: "woods", kind: "woods", points: [[6, 58], [26, 56], [30, 66], [8, 68]], label: "woods", labelAt: [18, 63] },
    ],
    stages: [
      {
        id: "past",
        title: "Six days of watching them go by",
        description: "The migration files past the fortified camp. Marius keeps his men behind the rampart and makes them look at it — his answer to an army that had been frightened of these people for eleven years.",
        certainty: "probable",
        units: [
          { id: "teu", faction: "cimbri", kind: "infantry", at: [50, 46], size: [40, 5], label: "the Teutones, marching" },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [50, 22], size: [16, 6], label: "the Roman camp" },
        ],
        arrows: [{ id: "a1", from: [70, 46], to: [92, 47], faction: "cimbri", kind: "move" }],
      },
      {
        id: "ambrones",
        title: "The Ambrones caught at the water",
        description: "A first action at a watercourse: the Ambrones, strung out crossing, are attacked by troops already formed and driven back on their own wagons.",
        certainty: "probable",
        units: [
          { id: "amb", faction: "cimbri", kind: "infantry", at: [40, 46], size: [20, 5], routed: true, label: "the Ambrones" },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [44, 32], size: [22, 4] },
          { id: "teu", faction: "cimbri", kind: "infantry", at: [78, 46], size: [22, 5] },
        ],
        arrows: [{ id: "a1", from: [44, 36], to: [42, 42], faction: "rome", kind: "attack" }],
      },
      {
        id: "hidden",
        title: "Three thousand men put behind them",
        description: "Marcellus takes a detachment into the woods behind the enemy line of march during the night, with orders to wait until the main lines are engaged.",
        certainty: "attested",
        units: [
          { id: "teu", faction: "cimbri", kind: "infantry", at: [52, 44], size: [36, 5] },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [52, 30], size: [30, 4] },
          { id: "rom-hidden", faction: "rome", kind: "infantry", at: [18, 60], size: [12, 3], label: "Marcellus, concealed" },
        ],
        arrows: [{ id: "a1", from: [30, 60], to: [44, 52], faction: "rome", kind: "move", bow: -4 }],
        caveat: "A detachment held out of sight through a night and most of a day is the hardest claim in this diagram, and it rests on Plutarch alone.",
      },
      {
        id: "both-sides",
        title: "Front and rear at once",
        description: "The Roman line comes down the slope into a formed enemy; at the moment of contact the concealed force attacks the rear. The Teutones cease to exist as a people.",
        certainty: "probable",
        units: [
          { id: "teu", faction: "cimbri", kind: "infantry", at: [52, 44], size: [36, 6], routed: true, label: "broken" },
          { id: "rom-line", faction: "rome", kind: "infantry", at: [52, 34], size: [30, 4] },
          { id: "rom-hidden", faction: "rome", kind: "infantry", at: [52, 58], size: [14, 3] },
        ],
        arrows: [
          { id: "a1", from: [52, 38], to: [52, 41], faction: "rome", kind: "attack" },
          { id: "a2", from: [52, 55], to: [52, 48], faction: "rome", kind: "attack" },
        ],
      },
    ],
  },

  vercellae: {
    scaleNote: "The Raudian plain, open ground in the Po valley. The site is not identified; what the frame claims is a flat field, a chosen hour, and the direction the Cimbri were made to face.",
    orientation: "The Cimbri face east into the morning sun and the dust; the Romans come from the west.",
    sourceIds: ["plutarch-marius"],
    terrain: [
      { id: "wagons", kind: "town", at: [88, 34], size: [10, 26], label: "the wagon laager" },
    ],
    stages: [
      {
        id: "joined",
        title: "Two Roman armies, this time combined",
        description: "Marius brings his veterans over from Gaul to Catulus, whose army the Cimbri had already pushed back. The contrast with Arausio four years earlier is the whole point.",
        certainty: "attested",
        units: [
          { id: "cim", faction: "cimbri", kind: "infantry", at: [68, 34], size: [16, 26], label: "the Cimbri" },
          { id: "marius", faction: "rome", kind: "infantry", at: [28, 24], size: [14, 14], label: "Marius' wing" },
          { id: "catulus", faction: "rome", kind: "infantry", at: [28, 46], size: [14, 14], label: "Catulus' centre" },
        ],
      },
      {
        id: "hour",
        title: "The hour and the facing chosen",
        description: "Battle is offered at midday in high summer, on open ground, with the Cimbri facing east into the sun and into the dust their own advance raises.",
        certainty: "probable",
        units: [
          { id: "cim", faction: "cimbri", kind: "infantry", at: [64, 34], size: [16, 28] },
          { id: "marius", faction: "rome", kind: "infantry", at: [36, 22], size: [14, 14] },
          { id: "catulus", faction: "rome", kind: "infantry", at: [36, 46], size: [14, 14] },
        ],
        arrows: [{ id: "a1", from: [44, 34], to: [54, 34], faction: "rome", kind: "attack", label: "into the dust" }],
        caveat: "Heat, dust and the facing are given by the sources as decisive. They are also exactly what a victorious army's account would emphasise about an enemy from the north.",
      },
      {
        id: "envelop",
        title: "The wings close",
        description: "Marius' wings come round a line that is already blinded and overheating in armour it is not used to. The fighting is over quickly.",
        certainty: "probable",
        units: [
          { id: "cim", faction: "cimbri", kind: "infantry", at: [66, 34], size: [14, 24], routed: true },
          { id: "marius", faction: "rome", kind: "infantry", at: [54, 16], size: [16, 6] },
          { id: "catulus", faction: "rome", kind: "infantry", at: [50, 34], size: [12, 14] },
          { id: "wing2", faction: "rome", kind: "infantry", at: [54, 52], size: [16, 6] },
        ],
        arrows: [
          { id: "a1", from: [58, 20], to: [64, 26], faction: "rome", kind: "attack" },
          { id: "a2", from: [58, 48], to: [64, 42], faction: "rome", kind: "attack" },
        ],
      },
      {
        id: "wagons",
        title: "The wagon line",
        description: "The pursuit reaches the laager, where the women kill their children and themselves rather than be taken. The Cimbri end here as a people, and the argument over whose wing deserved the credit begins immediately.",
        certainty: "probable",
        units: [
          { id: "cim", faction: "cimbri", kind: "infantry", at: [76, 34], size: [10, 18], routed: true },
          { id: "rom", faction: "rome", kind: "infantry", at: [58, 34], size: [16, 22] },
        ],
        arrows: [{ id: "a1", from: [68, 34], to: [80, 34], faction: "rome", kind: "attack" }],
      },
    ],
  },

  // ── The Social War to the Ides of March ──────────────────────────────────
  // From 58 these are drawn from a commander's own account of his own campaigns,
  // which is a new problem for this atlas. Caesar is the best tactical witness in
  // the whole file and the most interested party in it: where a stage rests on
  // his cleverness alone, the caveat says so.
  chaeronea: {
    scaleNote: "The plain below Chaeronea, a few kilometres across, with the Roman flanks dug in against ground that suited cavalry.",
    orientation: "The hills of Boeotia lie north; Sulla faces east towards the Pontic camp.",
    sourceIds: ["plutarch-sulla"],
    terrain: [
      { id: "hills", kind: "hill", points: [[0, 4], [26, 2], [56, 6], [84, 3], [100, 6], [100, 18], [60, 20], [24, 17], [0, 20]], label: "the Boeotian hills", labelAt: [50, 11] },
      { id: "ditch-n", kind: "works", at: [24, 26], size: [16, 3], label: "ditches" },
      { id: "ditch-s", kind: "works", at: [24, 52], size: [16, 3] },
    ],
    stages: [
      {
        id: "dug-in",
        title: "Flanks dug in against a cavalry army",
        description: "Outnumbered and far weaker in horse, Sulla entrenches both flanks so the Pontic cavalry cannot get round them. The battle becomes one of frontage rather than of numbers.",
        certainty: "probable",
        units: [
          { id: "rom-line", faction: "rome", kind: "infantry", at: [30, 39], size: [10, 22], label: "Sulla" },
          { id: "pon-line", faction: "pontus", kind: "infantry", at: [66, 39], size: [12, 34], label: "Archelaus" },
          { id: "pon-horse", faction: "pontus", kind: "cavalry", at: [54, 16], size: [14, 5] },
          { id: "pon-char", faction: "pontus", kind: "cavalry", at: [52, 39], size: [8, 12], label: "scythed chariots" },
        ],
      },
      {
        id: "chariots",
        title: "The chariots broken before contact",
        description: "Light troops and rows of stakes take the scythed chariots at a distance. They turn back into the line that sent them, as they had at Magnesia a century before.",
        certainty: "probable",
        units: [
          { id: "rom-line", faction: "rome", kind: "infantry", at: [32, 39], size: [10, 22] },
          { id: "rom-light", faction: "rome", kind: "skirmishers", at: [40, 39], size: [4, 18] },
          { id: "pon-char", faction: "pontus", kind: "cavalry", at: [52, 39], size: [8, 12], routed: true, label: "turned back" },
          { id: "pon-line", faction: "pontus", kind: "infantry", at: [68, 39], size: [12, 34] },
        ],
        arrows: [{ id: "a1", from: [44, 39], to: [48, 39], faction: "rome", kind: "missile" }],
      },
      {
        id: "pressed",
        title: "The centre nearly gives",
        description: "Weight of numbers tells where the line is thinnest. Plutarch has Sulla ride to the front himself and ask his men what they intend to tell Rome about where they left their general.",
        certainty: "probable",
        units: [
          { id: "rom-line", faction: "rome", kind: "infantry", at: [30, 39], size: [10, 22], routed: true },
          { id: "pon-line", faction: "pontus", kind: "infantry", at: [50, 39], size: [14, 34] },
        ],
        arrows: [{ id: "a1", from: [42, 39], to: [37, 39], faction: "pontus", kind: "attack" }],
      },
      {
        id: "camp",
        title: "Broken against their own camp",
        description: "The Pontic army gives way and runs for a camp whose gates cannot take it. Most of the loss happens there rather than in the fighting.",
        certainty: "probable",
        units: [
          { id: "rom-line", faction: "rome", kind: "infantry", at: [44, 39], size: [12, 26] },
          { id: "pon-line", faction: "pontus", kind: "infantry", at: [70, 39], size: [12, 30], routed: true },
          { id: "pon-camp", faction: "pontus", kind: "camp", at: [88, 39], size: [10, 12] },
        ],
        arrows: [{ id: "a1", from: [54, 39], to: [62, 39], faction: "rome", kind: "attack" }],
      },
    ],
  },

  "colline-gate": {
    scaleNote: "The ground outside the north-eastern wall of Rome, perhaps two kilometres of front. All of it is under the modern city and none of it can be examined.",
    orientation: "The Servian wall and the gate run down the left of the frame; the armies face east away from it.",
    sourceIds: ["plutarch-sulla", "appian-civil"],
    terrain: [
      { id: "wall", kind: "wall", points: [[16, 4], [14, 24], [15, 44], [13, 64]], label: "the Servian wall", labelAt: [7, 34] },
      { id: "gate", kind: "town", at: [15, 34], size: [6, 6], label: "Colline Gate" },
    ],
    stages: [
      {
        id: "night",
        title: "Battle joined in the afternoon, fought through the night",
        description: "An unusual and badly recorded engagement: it begins late and continues in darkness, which is much of why the accounts cannot agree about what happened on which wing.",
        certainty: "probable",
        units: [
          { id: "sul-left", faction: "optimates", kind: "infantry", at: [40, 22], size: [20, 6], label: "Sulla, left" },
          { id: "sul-right", faction: "optimates", kind: "infantry", at: [40, 48], size: [20, 6], label: "Crassus, right" },
          { id: "mar-right", faction: "populares", kind: "infantry", at: [70, 22], size: [20, 6], label: "Telesinus" },
          { id: "mar-left", faction: "populares", kind: "infantry", at: [70, 48], size: [20, 6] },
        ],
        caveat: "Which side stood where is inferred. The sources agree only that Sulla commanded on one wing and Crassus on the other, and that the outcomes differed.",
      },
      {
        id: "left-broken",
        title: "Sulla's wing is broken",
        description: "The left gives way and is driven back on the gate itself, with men trying to get inside the walls. Sulla is nearly killed rallying it and, Plutarch says, took out a small gold figure of Apollo and prayed in front of the troops.",
        certainty: "probable",
        units: [
          { id: "sul-left", faction: "optimates", kind: "infantry", at: [28, 22], size: [18, 6], routed: true, label: "driven back" },
          { id: "mar-right", faction: "populares", kind: "infantry", at: [56, 22], size: [22, 6] },
          { id: "sul-right", faction: "optimates", kind: "infantry", at: [44, 48], size: [20, 6] },
          { id: "mar-left", faction: "populares", kind: "infantry", at: [70, 48], size: [20, 6] },
        ],
        arrows: [{ id: "a1", from: [46, 22], to: [38, 22], faction: "populares", kind: "attack" }],
      },
      {
        id: "right-wins",
        title: "Crassus wins the other wing",
        description: "On the right Crassus breaks through, pursues, and sends a message to Sulla asking for supper for his troops — which is how Sulla learns the battle is won.",
        certainty: "attested",
        units: [
          { id: "sul-right", faction: "optimates", kind: "infantry", at: [62, 48], size: [22, 6], label: "Crassus" },
          { id: "mar-left", faction: "populares", kind: "infantry", at: [84, 48], size: [16, 6], routed: true },
          { id: "sul-left", faction: "optimates", kind: "infantry", at: [30, 24], size: [18, 6] },
        ],
        arrows: [{ id: "a1", from: [74, 48], to: [82, 48], faction: "optimates", kind: "attack" }],
      },
      {
        id: "lists",
        title: "The prisoners, and the lists",
        description: "Several thousand prisoners are executed within earshot of a Senate meeting Sulla is addressing. The proscription lists follow: to be named is to be outlawed, killed, and to have one's estate sold at auction.",
        certainty: "attested",
        units: [
          { id: "sul", faction: "optimates", kind: "infantry", at: [50, 40], size: [30, 8], label: "Rome taken" },
        ],
      },
    ],
  },

  bibracte: {
    scaleNote: "A hillside a few miles from Bibracte, with the Roman baggage on the summit behind three lines of legionaries. The town is excavated; the field is not located.",
    orientation: "The Helvetii attack uphill from the bottom of the frame.",
    sourceIds: ["caesar-bg"],
    terrain: [
      { id: "slope", kind: "hill", points: [[6, 8], [40, 4], [72, 7], [96, 5], [98, 30], [64, 34], [30, 31], [4, 34]], label: "the slope", labelAt: [50, 18] },
    ],
    stages: [
      {
        id: "three-lines",
        title: "Three lines on the slope, baggage above",
        description: "Caesar puts four veteran legions in three lines on the hillside, two newly raised ones and the baggage on the summit behind them, and waits to be attacked uphill.",
        certainty: "attested",
        units: [
          { id: "rom-1", faction: "rome", kind: "infantry", at: [50, 26], size: [34, 4] },
          { id: "rom-2", faction: "rome", kind: "infantry", at: [50, 20], size: [34, 4] },
          { id: "rom-3", faction: "rome", kind: "infantry", at: [50, 14], size: [34, 4], label: "third line" },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [50, 6], size: [16, 4], label: "baggage" },
          { id: "hel", faction: "gaul", kind: "infantry", at: [50, 46], size: [40, 6], label: "the Helvetii" },
        ],
        arrows: [{ id: "a1", from: [50, 42], to: [50, 32], faction: "gaul", kind: "attack", label: "uphill" }],
      },
      {
        id: "pila",
        title: "Javelins into a shield wall",
        description: "Pila thrown downhill pin overlapping shields together. Men who cannot free them have to fight without them, or throw them away.",
        certainty: "probable",
        units: [
          { id: "rom-1", faction: "rome", kind: "infantry", at: [50, 28], size: [34, 4] },
          { id: "rom-2", faction: "rome", kind: "infantry", at: [50, 20], size: [34, 4] },
          { id: "hel", faction: "gaul", kind: "infantry", at: [50, 40], size: [38, 6] },
        ],
        arrows: [{ id: "a1", from: [50, 32], to: [50, 36], faction: "rome", kind: "missile" }],
      },
      {
        id: "rear",
        title: "Attacked in the rear as they give ground",
        description: "As the Helvetii fall back, a fresh contingent — the Boii and Tulingi — arrives on the exposed Roman flank and rear. The third line turns about to meet it while the first two go on with the battle in front.",
        certainty: "attested",
        units: [
          { id: "rom-1", faction: "rome", kind: "infantry", at: [46, 30], size: [30, 4] },
          { id: "rom-3", faction: "rome", kind: "infantry", at: [78, 18], size: [18, 4], facing: 90, label: "third line, faced about" },
          { id: "hel", faction: "gaul", kind: "infantry", at: [46, 44], size: [32, 6] },
          { id: "boii", faction: "gaul", kind: "infantry", at: [88, 30], size: [16, 5], label: "Boii and Tulingi" },
        ],
        arrows: [
          { id: "a1", from: [86, 26], to: [82, 22], faction: "gaul", kind: "attack" },
          { id: "a2", from: [78, 22], to: [80, 26], faction: "rome", kind: "attack" },
        ],
        caveat: "That the army fought in two directions at once is Caesar's claim about his own dispositions, and the neatest possible account of a crisis.",
      },
      {
        id: "wagons",
        title: "The fighting ends at the wagons",
        description: "Driven back on their own laager, where the families are, the Helvetii fight on into the night from between the carts.",
        certainty: "probable",
        units: [
          { id: "rom", faction: "rome", kind: "infantry", at: [50, 34], size: [34, 5] },
          { id: "hel-wagons", faction: "gaul", kind: "camp", at: [50, 54], size: [22, 6], label: "the wagon laager" },
          { id: "hel", faction: "gaul", kind: "infantry", at: [50, 46], size: [24, 4], routed: true },
        ],
        arrows: [{ id: "a1", from: [50, 38], to: [50, 43], faction: "rome", kind: "attack" }],
      },
    ],
  },

  sabis: {
    scaleNote: "A river valley with woods on the far bank and a half-built camp on the near one. The river is named and the site is disputed between the Sambre and the Selle.",
    orientation: "The Nervii come out of the woods at the top and across the river; the legions are digging on the near slope.",
    sourceIds: ["caesar-bg"],
    terrain: [
      { id: "woods", kind: "woods", points: [[4, 2], [46, 0], [90, 3], [96, 16], [50, 18], [6, 15]], label: "woods", labelAt: [50, 9] },
      { id: "river", kind: "river", points: [[0, 26], [30, 28], [62, 27], [100, 29]], label: "the Sabis", labelAt: [12, 33] },
    ],
    stages: [
      {
        id: "digging",
        title: "Caught with the tools out",
        description: "The leading legions are marking out camp with their shields cased when the Nervii come out of the woods at a run, cross the river and are on them before the line can form.",
        certainty: "attested",
        units: [
          { id: "nerv", faction: "gaul", kind: "infantry", at: [50, 20], size: [44, 5], label: "the Nervii" },
          { id: "rom-work", faction: "rome", kind: "works", at: [50, 44], size: [40, 5], label: "camp being built" },
          { id: "rom-9", faction: "rome", kind: "infantry", at: [20, 38], size: [14, 4] },
          { id: "rom-12", faction: "rome", kind: "infantry", at: [56, 38], size: [14, 4] },
        ],
        arrows: [{ id: "a1", from: [50, 25], to: [50, 33], faction: "gaul", kind: "attack" }],
      },
      {
        id: "no-line",
        title: "No line, no orders",
        description: "Legions form where they stand, under whichever standard is nearest, and fight separate battles. Caesar writes that there was time to do only what the moment itself demanded.",
        certainty: "probable",
        units: [
          { id: "nerv-l", faction: "gaul", kind: "infantry", at: [24, 26], size: [22, 5] },
          { id: "nerv-c", faction: "gaul", kind: "infantry", at: [56, 28], size: [22, 5] },
          { id: "rom-9", faction: "rome", kind: "infantry", at: [18, 40], size: [14, 4] },
          { id: "rom-12", faction: "rome", kind: "infantry", at: [52, 42], size: [14, 4], routed: true },
          { id: "rom-7", faction: "rome", kind: "infantry", at: [72, 42], size: [14, 4] },
        ],
        arrows: [
          { id: "a1", from: [56, 33], to: [54, 38], faction: "gaul", kind: "attack" },
          { id: "a2", from: [24, 31], to: [20, 36], faction: "gaul", kind: "attack" },
        ],
      },
      {
        id: "shield",
        title: "The commander in the fighting line",
        description: "With the twelfth legion crowded together and its centurions down, Caesar takes a shield from a man in the rear ranks and goes forward into the front line himself.",
        certainty: "attested",
        units: [
          { id: "nerv-c", faction: "gaul", kind: "infantry", at: [54, 30], size: [24, 5] },
          { id: "rom-12", faction: "rome", kind: "infantry", at: [52, 42], size: [12, 5], label: "the twelfth" },
          { id: "rom-7", faction: "rome", kind: "infantry", at: [70, 42], size: [14, 4] },
          { id: "caesar", faction: "rome", kind: "infantry", at: [52, 36], size: [6, 2], label: "Caesar" },
        ],
        arrows: [{ id: "a1", from: [52, 39], to: [52, 35], faction: "rome", kind: "move" }],
      },
      {
        id: "tenth-back",
        title: "The tenth legion comes back across",
        description: "Labienus has taken the Nervian camp on the far bank. Seeing the crisis behind him, he sends the tenth legion back over the river at a run into the Nervian rear, and the battle turns.",
        certainty: "attested",
        units: [
          { id: "nerv-c", faction: "gaul", kind: "infantry", at: [52, 32], size: [24, 5], routed: true },
          { id: "rom-10", faction: "rome", kind: "infantry", at: [52, 16], size: [16, 4], label: "the tenth" },
          { id: "rom-12", faction: "rome", kind: "infantry", at: [52, 44], size: [14, 4] },
        ],
        arrows: [
          { id: "a1", from: [52, 20], to: [52, 28], faction: "rome", kind: "attack" },
          { id: "a2", from: [52, 41], to: [52, 36], faction: "rome", kind: "attack" },
        ],
      },
    ],
  },

  carrhae: {
    scaleNote: "Open desert south of Carrhae. There is no terrain to draw and that is the whole point of the battle — no water, no cover, and nothing to anchor a flank on.",
    orientation: "Schematic. The Parthians ride round the Roman square continuously; no fixed facing survives.",
    sourceIds: ["plutarch-crassus"],
    terrain: [],
    stages: [
      {
        id: "square",
        title: "The legions close into a square",
        description: "Crassus forms a hollow square, twelve cohorts on each side with cavalry between — a formation that cannot be flanked and cannot reach anything either.",
        certainty: "attested",
        units: [
          { id: "rom-n", faction: "rome", kind: "infantry", at: [50, 24], size: [24, 4] },
          { id: "rom-s", faction: "rome", kind: "infantry", at: [50, 48], size: [24, 4] },
          { id: "rom-w", faction: "rome", kind: "infantry", at: [36, 36], size: [4, 20] },
          { id: "rom-e", faction: "rome", kind: "infantry", at: [64, 36], size: [4, 20] },
          { id: "par", faction: "parthia", kind: "cavalry", at: [50, 8], size: [30, 4], label: "horse archers" },
        ],
        arrows: [{ id: "a1", from: [50, 12], to: [50, 20], faction: "parthia", kind: "missile" }],
      },
      {
        id: "arrows",
        title: "Arrows that do not run out",
        description: "The Parthians ride round the square shooting into it and never close. Surena has brought a train of camels loaded with spare shafts, so the one thing the Romans are counting on — that the quivers will empty — does not happen.",
        certainty: "attested",
        units: [
          { id: "rom-sq", faction: "rome", kind: "infantry", at: [50, 36], size: [26, 22], label: "the square" },
          { id: "par-n", faction: "parthia", kind: "cavalry", at: [50, 10], size: [26, 4] },
          { id: "par-e", faction: "parthia", kind: "cavalry", at: [82, 36], size: [4, 20] },
          { id: "par-s", faction: "parthia", kind: "cavalry", at: [50, 62], size: [26, 4] },
          { id: "par-w", faction: "parthia", kind: "cavalry", at: [18, 36], size: [4, 20] },
        ],
        arrows: [
          { id: "a1", from: [50, 14], to: [50, 22], faction: "parthia", kind: "missile" },
          { id: "a2", from: [78, 36], to: [66, 36], faction: "parthia", kind: "missile" },
          { id: "a3", from: [50, 58], to: [50, 50], faction: "parthia", kind: "missile" },
        ],
      },
      {
        id: "publius",
        title: "The cavalry drawn off and destroyed",
        description: "Publius Crassus takes the horse and the best of the light troops after a feigned retreat, is surrounded out of sight of the army, and dies. His head is brought back on a spear and shown to the line.",
        certainty: "attested",
        units: [
          { id: "rom-sq", faction: "rome", kind: "infantry", at: [46, 38], size: [24, 20] },
          { id: "pub", faction: "rome", kind: "cavalry", at: [86, 20], size: [10, 4], routed: true, label: "Publius" },
          { id: "par", faction: "parthia", kind: "cavalry", at: [76, 12], size: [20, 4] },
        ],
        arrows: [{ id: "a1", from: [62, 32], to: [82, 22], faction: "rome", kind: "attack", bow: -4, label: "drawn off" }],
      },
      {
        id: "night",
        title: "Away by night, and killed under a truce",
        description: "The remnant gets to Carrhae in the dark, leaving its wounded behind. Crassus is drawn into a parley the next day and killed there; about ten thousand prisoners are deported to the far east of the Parthian empire and never heard of again.",
        certainty: "probable",
        units: [
          { id: "rom-rest", faction: "rome", kind: "infantry", at: [30, 40], size: [16, 6], routed: true, label: "the remnant" },
          { id: "par", faction: "parthia", kind: "cavalry", at: [62, 30], size: [24, 5] },
        ],
        arrows: [{ id: "a1", from: [26, 36], to: [14, 28], faction: "rome", kind: "retreat", label: "to Carrhae" }],
      },
    ],
  },

  gergovia: {
    scaleNote: "The plateau of Gergovia with the town on top and the Roman camps below it. The plateau is the accepted site and the camps have been excavated; the course of the assault is reconstructed.",
    orientation: "The town is on the summit; the Romans come up from the camps at the bottom.",
    sourceIds: ["caesar-bg"],
    terrain: [
      { id: "plateau", kind: "hill", points: [[26, 8], [72, 6], [82, 20], [74, 32], [30, 34], [20, 20]], label: "the plateau", labelAt: [50, 20] },
      { id: "wall", kind: "wall", points: [[28, 30], [50, 33], [74, 30]], label: "the wall below the town" },
    ],
    stages: [
      {
        id: "feint",
        title: "A feint that works too well",
        description: "Caesar moves a legion visibly along the far side to draw the Gauls off, and takes the camps below the town almost unopposed. The objective was those camps and nothing more.",
        certainty: "attested",
        units: [
          { id: "gal-town", faction: "gaul", kind: "works", at: [50, 18], size: [30, 14], label: "Gergovia" },
          { id: "gal-moved", faction: "gaul", kind: "infantry", at: [84, 26], size: [12, 4], label: "drawn off" },
          { id: "rom-main", faction: "rome", kind: "infantry", at: [46, 54], size: [26, 5] },
          { id: "rom-feint", faction: "rome", kind: "infantry", at: [84, 48], size: [12, 4] },
        ],
        arrows: [{ id: "a1", from: [84, 44], to: [84, 32], faction: "rome", kind: "move", label: "the feint" }],
      },
      {
        id: "past-orders",
        title: "Past the objective and up to the walls",
        description: "The recall is sounded and either not heard or not heeded. The legions take the camps and keep climbing towards the town itself, strung out on a slope with no formation left.",
        certainty: "attested",
        units: [
          { id: "gal-town", faction: "gaul", kind: "works", at: [50, 18], size: [30, 14] },
          { id: "rom-a", faction: "rome", kind: "infantry", at: [38, 38], size: [12, 4] },
          { id: "rom-b", faction: "rome", kind: "infantry", at: [56, 36], size: [12, 4] },
          { id: "rom-c", faction: "rome", kind: "infantry", at: [46, 46], size: [12, 4] },
        ],
        arrows: [{ id: "a1", from: [46, 42], to: [48, 34], faction: "rome", kind: "attack", label: "up to the wall" }],
        caveat: "That the troops exceeded their orders is Caesar's explanation of his own defeat, and it is the only one that survives.",
      },
      {
        id: "driven-off",
        title: "Driven back down the slope",
        description: "The Gauls come back from the far side onto men who are above their supports and out of order, and push them off the hill. Forty-six centurions are killed.",
        certainty: "probable",
        units: [
          { id: "gal", faction: "gaul", kind: "infantry", at: [50, 28], size: [34, 5] },
          { id: "rom-a", faction: "rome", kind: "infantry", at: [40, 44], size: [14, 4], routed: true },
          { id: "rom-b", faction: "rome", kind: "infantry", at: [60, 46], size: [14, 4], routed: true },
        ],
        arrows: [{ id: "a1", from: [50, 33], to: [50, 40], faction: "gaul", kind: "attack" }],
      },
      {
        id: "aedui",
        title: "And then the Aedui change sides",
        description: "Within weeks Rome's oldest allies in Gaul join Vercingetorix. For the first time Caesar faces the whole country, and has to fight his way back to his own province.",
        certainty: "attested",
        units: [
          { id: "gal", faction: "gaul", kind: "infantry", at: [50, 24], size: [40, 6], label: "Gaul united" },
          { id: "rom", faction: "rome", kind: "infantry", at: [50, 52], size: [24, 5], routed: true },
        ],
        arrows: [{ id: "a1", from: [50, 56], to: [50, 64], faction: "rome", kind: "retreat" }],
      },
    ],
  },

  alesia: {
    scaleNote: "The oppidum on its hill, eighteen kilometres of works facing in and twenty-one facing out. Unusually in this atlas the geometry is evidence: both lines have been traced on the ground.",
    orientation: "Alesia sits in the centre; the relief army comes from outside the outer ring.",
    sourceIds: ["caesar-bg"],
    terrain: [
      { id: "inner", kind: "wall", points: [[36, 22], [64, 22], [72, 34], [64, 48], [36, 48], [28, 34], [36, 22]], label: "circumvallation", labelAt: [50, 54] },
      { id: "outer", kind: "wall", points: [[18, 8], [82, 8], [94, 34], [82, 60], [18, 60], [6, 34], [18, 8]], label: "contravallation", labelAt: [50, 66] },
    ],
    stages: [
      {
        id: "two-walls",
        title: "Two walls, facing opposite ways",
        description: "Caesar rings the hill to keep eighty thousand men in, then rings his own siege lines to keep a relief army out — ditches, a flooded trench, buried spikes, towers, and a garrison living between the two.",
        certainty: "attested",
        units: [
          { id: "gal-town", faction: "gaul", kind: "works", at: [50, 34], size: [18, 12], label: "Vercingetorix, inside" },
          { id: "rom-lines", faction: "rome", kind: "works", at: [50, 34], size: [40, 26], label: "the Roman lines" },
        ],
      },
      {
        id: "expelled",
        title: "The non-combatants sent out, and refused",
        description: "To save food the Mandubii expel their women, children and old people from the town. Caesar will not let them through the lines and will not let them back. They starve between the walls in sight of both armies.",
        certainty: "attested",
        units: [
          { id: "gal-town", faction: "gaul", kind: "works", at: [50, 34], size: [16, 10] },
          { id: "gal-civ", faction: "gaul", kind: "skirmishers", at: [50, 46], size: [14, 3], routed: true, label: "the Mandubii" },
          { id: "rom-lines", faction: "rome", kind: "works", at: [50, 34], size: [40, 26] },
        ],
        caveat: "Caesar records the decision in a sentence and offers no justification for it. The diagram does not either.",
      },
      {
        id: "both-ways",
        title: "Attacked from both sides at once",
        description: "The relief army reaches the outer wall and attacks it at the moment the besieged attack the inner one. Caesar's men fight facing in and facing out along the same works.",
        certainty: "attested",
        units: [
          { id: "gal-town", faction: "gaul", kind: "infantry", at: [50, 34], size: [16, 8] },
          { id: "rom-lines", faction: "rome", kind: "works", at: [50, 34], size: [40, 26] },
          { id: "gal-relief", faction: "gaul", kind: "infantry", at: [50, 66], size: [46, 4], label: "the relief army" },
        ],
        arrows: [
          { id: "a1", from: [50, 62], to: [50, 54], faction: "gaul", kind: "attack" },
          { id: "a2", from: [50, 40], to: [50, 46], faction: "gaul", kind: "attack" },
        ],
      },
      {
        id: "weak-point",
        title: "The camp on ground that could not be enclosed",
        description: "Sixty thousand picked men attack a camp on a slope the works could not properly take in. Caesar feeds in reserves under Labienus and finally takes the last cavalry round the outside himself, appearing behind the attackers.",
        certainty: "probable",
        units: [
          { id: "gal-attack", faction: "gaul", kind: "infantry", at: [26, 14], size: [22, 5], label: "60,000 picked men" },
          { id: "rom-camp", faction: "rome", kind: "camp", at: [30, 26], size: [12, 5], label: "the weak camp" },
          { id: "rom-res", faction: "rome", kind: "infantry", at: [50, 30], size: [16, 4], label: "reserves" },
          { id: "rom-horse", faction: "rome", kind: "cavalry", at: [10, 30], size: [10, 4], label: "Caesar" },
        ],
        arrows: [
          { id: "a1", from: [28, 19], to: [30, 23], faction: "gaul", kind: "attack" },
          { id: "a2", from: [12, 26], to: [20, 16], faction: "rome", kind: "attack", bow: -5, label: "round the outside" },
        ],
      },
      {
        id: "surrender",
        title: "Surrender",
        description: "The relief army disperses in the night. The next day Vercingetorix rides out, circles Caesar once, and lays down his arms. He is kept six years and then executed at Caesar's triumph.",
        certainty: "attested",
        units: [
          { id: "rom-lines", faction: "rome", kind: "works", at: [50, 34], size: [40, 26] },
          { id: "gal-town", faction: "gaul", kind: "infantry", at: [50, 34], size: [16, 8], routed: true, label: "surrendered" },
        ],
      },
    ],
  },

  dyrrhachium: {
    scaleNote: "Over twenty kilometres of lines along a coastal ridge south of Dyrrhachium, compressed into one frame. The course of the works is not established on the ground.",
    orientation: "The sea is west, at the left; Pompey's army is penned against it.",
    sourceIds: ["caesar-bc"],
    terrain: [
      { id: "sea", kind: "sea", points: [[0, 0], [16, 0], [14, 34], [16, 68], [0, 68]], label: "the sea", labelAt: [7, 34] },
      { id: "lines", kind: "wall", points: [[46, 4], [42, 22], [44, 40], [40, 62]], label: "Caesar's lines", labelAt: [56, 12] },
    ],
    stages: [
      {
        id: "penned",
        title: "The smaller army besieges the larger",
        description: "Caesar builds lines to pen Pompey against the coast. Pompey is supplied by sea and has the cavalry; Caesar has the ground and no food, and his men are making bread out of roots.",
        certainty: "attested",
        units: [
          { id: "pom", faction: "optimates", kind: "infantry", at: [28, 34], size: [16, 40], label: "Pompey, supplied by sea" },
          { id: "cae", faction: "populares", kind: "infantry", at: [58, 34], size: [12, 44], label: "Caesar, on short rations" },
        ],
      },
      {
        id: "deserters",
        title: "Two deserters",
        description: "Allobrogian cavalry officers go over to Pompey and tell him where the double line at the southern end is unfinished. It is the only place the works can be forced.",
        certainty: "probable",
        units: [
          { id: "pom", faction: "optimates", kind: "infantry", at: [28, 34], size: [16, 40] },
          { id: "cae", faction: "populares", kind: "infantry", at: [58, 34], size: [12, 44] },
          { id: "gap", faction: "populares", kind: "works", at: [44, 58], size: [8, 6], label: "the unfinished end" },
        ],
        arrows: [{ id: "a1", from: [36, 56], to: [42, 58], faction: "optimates", kind: "move" }],
      },
      {
        id: "broken",
        title: "The southern end taken",
        description: "Pompey attacks the gap by land and from the sea at the same point and carries the works. Caesar's counter-attack goes in over ground nobody has scouted and comes apart in it.",
        certainty: "probable",
        units: [
          { id: "pom-attack", faction: "optimates", kind: "infantry", at: [40, 58], size: [18, 5] },
          { id: "cae-counter", faction: "populares", kind: "infantry", at: [60, 56], size: [16, 5], routed: true },
          { id: "cae", faction: "populares", kind: "infantry", at: [58, 26], size: [12, 28] },
        ],
        arrows: [{ id: "a1", from: [48, 58], to: [56, 57], faction: "optimates", kind: "attack" }],
      },
      {
        id: "not-pursued",
        title: "The army runs, and is not followed",
        description: "Caesar's veterans break — the only time they do. Pompey halts, suspecting a trap. Caesar said afterwards that the enemy would have won the war that day if their commander had known how to win.",
        certainty: "attested",
        units: [
          { id: "cae", faction: "populares", kind: "infantry", at: [66, 40], size: [16, 20], routed: true },
          { id: "pom", faction: "optimates", kind: "infantry", at: [38, 40], size: [16, 24] },
        ],
        arrows: [{ id: "a1", from: [74, 40], to: [88, 34], faction: "populares", kind: "retreat", label: "inland to Thessaly" }],
      },
    ],
  },

  pharsalus: {
    scaleNote: "The plain of the Enipeus, perhaps four kilometres of front. Which bank the armies stood on is unresolved, which would reverse this whole frame.",
    orientation: "The river anchors Pompey's left; all his cavalry is on the other wing, facing Caesar's right.",
    sourceIds: ["caesar-bc"],
    terrain: [
      { id: "river", kind: "river", points: [[0, 58], [30, 60], [64, 59], [100, 61]], label: "the Enipeus", labelAt: [16, 65] },
    ],
    stages: [
      {
        id: "array",
        title: "Pompey's plan, and the fourth line",
        description: "Pompey masses all seven thousand horse on one wing to turn Caesar's flank and roll the line up from behind. Caesar, outnumbered two to one, quietly takes six cohorts out of his third line and posts them obliquely behind his own cavalry, out of sight.",
        certainty: "attested",
        units: [
          { id: "pom-line", faction: "optimates", kind: "infantry", at: [52, 24], size: [56, 6], label: "110 cohorts" },
          { id: "pom-horse", faction: "optimates", kind: "cavalry", at: [86, 32], size: [18, 5], label: "7,000 horse" },
          { id: "cae-line", faction: "populares", kind: "infantry", at: [52, 44], size: [40, 6], label: "80 cohorts" },
          { id: "cae-horse", faction: "populares", kind: "cavalry", at: [80, 42], size: [10, 4] },
          { id: "cae-fourth", faction: "populares", kind: "infantry", at: [84, 52], size: [14, 4], label: "six cohorts, hidden" },
        ],
      },
      {
        id: "charge",
        title: "The cavalry charge succeeds",
        description: "Pompey's horse drive Caesar's off the field exactly as intended and swing inwards to take the legions from behind. Up to this point the plan is working perfectly.",
        certainty: "probable",
        units: [
          { id: "pom-horse", faction: "optimates", kind: "cavalry", at: [80, 40], size: [20, 5] },
          { id: "cae-horse", faction: "populares", kind: "cavalry", at: [94, 48], size: [8, 4], routed: true },
          { id: "cae-line", faction: "populares", kind: "infantry", at: [50, 44], size: [40, 6] },
          { id: "pom-line", faction: "optimates", kind: "infantry", at: [50, 26], size: [54, 6] },
          { id: "cae-fourth", faction: "populares", kind: "infantry", at: [84, 54], size: [14, 4] },
        ],
        arrows: [{ id: "a1", from: [80, 44], to: [74, 48], faction: "optimates", kind: "attack" }],
      },
      {
        id: "faces",
        title: "Javelins in the face",
        description: "The hidden cohorts come out at the cavalry with orders not to throw their pila but to use them upwards, at the face. Caesar notes that they were young men of good family, and that they broke and did not come back.",
        certainty: "attested",
        units: [
          { id: "cae-fourth", faction: "populares", kind: "infantry", at: [82, 48], size: [16, 4], label: "six cohorts" },
          { id: "pom-horse", faction: "optimates", kind: "cavalry", at: [82, 36], size: [20, 5], routed: true },
          { id: "cae-line", faction: "populares", kind: "infantry", at: [50, 44], size: [40, 6] },
          { id: "pom-line", faction: "optimates", kind: "infantry", at: [50, 26], size: [54, 6] },
        ],
        arrows: [{ id: "a1", from: [82, 45], to: [82, 40], faction: "populares", kind: "attack" }],
        caveat: "The order about aiming at the face is Caesar's account of his own instruction, and has no independent witness.",
      },
      {
        id: "rolled",
        title: "The flank rolled up, and the third line in fresh",
        description: "With the cavalry gone, the same cohorts take Pompey's uncovered left in the rear while Caesar's third line — untouched all day — goes in at the front. Pompey rides to his camp and sits in his tent.",
        certainty: "attested",
        units: [
          { id: "pom-line", faction: "optimates", kind: "infantry", at: [46, 28], size: [50, 6], routed: true },
          { id: "cae-line", faction: "populares", kind: "infantry", at: [46, 40], size: [40, 5] },
          { id: "cae-fourth", faction: "populares", kind: "infantry", at: [80, 32], size: [16, 4] },
        ],
        arrows: [
          { id: "a1", from: [46, 37], to: [46, 32], faction: "populares", kind: "attack" },
          { id: "a2", from: [74, 32], to: [64, 30], faction: "populares", kind: "attack" },
        ],
      },
    ],
  },

  thapsus: {
    scaleNote: "The ground between the town and the coastal lagoon, with the senatorial army drawn up outside Caesar's siege lines. The town is identified; the lines are not.",
    orientation: "The sea and the town lie east, at the right; the relieving army comes from the west.",
    sourceIds: ["appian-civil", "dio-36-44"],
    terrain: [
      { id: "sea", kind: "sea", points: [[86, 0], [100, 0], [100, 68], [86, 68]], label: "the sea", labelAt: [93, 10] },
      { id: "town", kind: "town", at: [80, 34], size: [10, 12], label: "Thapsus" },
    ],
    stages: [
      {
        id: "siege",
        title: "A siege laid to force a battle",
        description: "Caesar invests Thapsus because taking it matters far less than making the enemy come out to relieve it. Metellus Scipio and Juba oblige.",
        certainty: "probable",
        units: [
          { id: "cae-lines", faction: "populares", kind: "works", at: [66, 34], size: [8, 30], label: "siege lines" },
          { id: "opt", faction: "optimates", kind: "infantry", at: [34, 30], size: [26, 6], label: "Metellus Scipio" },
          { id: "num", faction: "numidia", kind: "cavalry", at: [34, 46], size: [20, 5], label: "Juba" },
          { id: "eles", faction: "optimates", kind: "elephants", at: [46, 16], size: [16, 5], label: "60 elephants" },
        ],
      },
      {
        id: "unordered",
        title: "The army starts without him",
        description: "Drawn up and waiting while Caesar hesitates, a trumpeter on the right sounds the advance and the veterans go forward. He can either follow them or lose control of them.",
        certainty: "probable",
        units: [
          { id: "cae-line", faction: "populares", kind: "infantry", at: [58, 34], size: [14, 30] },
          { id: "opt", faction: "optimates", kind: "infantry", at: [32, 30], size: [26, 6] },
          { id: "eles", faction: "optimates", kind: "elephants", at: [44, 16], size: [16, 5] },
        ],
        arrows: [{ id: "a1", from: [50, 34], to: [42, 32], faction: "populares", kind: "attack", label: "unordered" }],
      },
      {
        id: "elephants",
        title: "The elephants turned back",
        description: "Slingers and archers trained for exactly this shoot the elephants at close range. They turn and go back through the Numidian left, which is behind them.",
        certainty: "probable",
        units: [
          { id: "cae-light", faction: "populares", kind: "skirmishers", at: [52, 18], size: [14, 3] },
          { id: "eles", faction: "optimates", kind: "elephants", at: [40, 16], size: [16, 5], routed: true },
          { id: "num", faction: "numidia", kind: "cavalry", at: [28, 22], size: [18, 5], routed: true },
          { id: "cae-line", faction: "populares", kind: "infantry", at: [54, 38], size: [14, 26] },
        ],
        arrows: [
          { id: "a1", from: [48, 18], to: [44, 17], faction: "populares", kind: "missile" },
          { id: "a2", from: [36, 18], to: [30, 20], faction: "optimates", kind: "retreat" },
        ],
      },
      {
        id: "no-quarter",
        title: "The surrender is not accepted",
        description: "The line breaks and the killing goes on after men have thrown down their arms — the sharpest exception in the war to Caesar's policy of clemency, reported by an officer on his own staff. At Utica, Cato kills himself rather than be pardoned.",
        certainty: "probable",
        units: [
          { id: "cae-line", faction: "populares", kind: "infantry", at: [48, 34], size: [16, 28] },
          { id: "opt", faction: "optimates", kind: "infantry", at: [26, 32], size: [22, 6], routed: true },
        ],
        arrows: [{ id: "a1", from: [40, 34], to: [32, 33], faction: "populares", kind: "attack" }],
      },
    ],
  },

  munda: {
    scaleNote: "A slope somewhere in southern Baetica, with the Pompeians above and Caesar attacking uphill. Munda has never been located and the frame claims only the shape of the day.",
    orientation: "The Pompeians hold the high ground; Caesar comes up from the plain below.",
    sourceIds: ["appian-civil", "plutarch-caesar"],
    terrain: [
      { id: "slope", kind: "hill", points: [[2, 6], [36, 3], [70, 6], [98, 4], [98, 26], [66, 30], [32, 27], [2, 30]], label: "the slope", labelAt: [50, 16] },
    ],
    stages: [
      {
        id: "uphill",
        title: "Uphill, and neither line moves",
        description: "The Pompeians hold the slope and will not come down; Caesar's veterans go up at them. Two armies of the same quality lock and stay locked for most of the day.",
        certainty: "probable",
        units: [
          { id: "pom", faction: "optimates", kind: "infantry", at: [50, 26], size: [46, 6], label: "13 legions" },
          { id: "cae", faction: "populares", kind: "infantry", at: [50, 44], size: [38, 6], label: "8 legions" },
        ],
        arrows: [{ id: "a1", from: [50, 40], to: [50, 33], faction: "populares", kind: "attack", label: "uphill" }],
      },
      {
        id: "on-foot",
        title: "The commander on foot in the front rank",
        description: "With the line giving, Caesar dismounts, takes a shield and goes into the fighting line — the second time in this atlas he does it. He is said to have thought about killing himself if the day went wrong.",
        certainty: "probable",
        units: [
          { id: "pom", faction: "optimates", kind: "infantry", at: [50, 28], size: [46, 6] },
          { id: "cae", faction: "populares", kind: "infantry", at: [50, 40], size: [38, 6] },
          { id: "caesar", faction: "populares", kind: "infantry", at: [50, 34], size: [6, 2], label: "Caesar" },
        ],
        arrows: [{ id: "a1", from: [50, 37], to: [50, 33], faction: "populares", kind: "move" }],
      },
      {
        id: "cavalry",
        title: "The Mauretanian horse decide it",
        description: "Bogud's cavalry works round towards the Pompeian camp. A legion pulled back to face them is taken for a retreat by the rest of the line, and the line goes.",
        certainty: "probable",
        units: [
          { id: "pom", faction: "optimates", kind: "infantry", at: [46, 28], size: [40, 6], routed: true },
          { id: "pom-det", faction: "optimates", kind: "infantry", at: [82, 20], size: [12, 4], label: "pulled back" },
          { id: "cae", faction: "populares", kind: "infantry", at: [46, 40], size: [38, 6] },
          { id: "bogud", faction: "populares", kind: "cavalry", at: [88, 40], size: [12, 4], label: "Bogud" },
        ],
        arrows: [{ id: "a1", from: [88, 36], to: [86, 26], faction: "populares", kind: "attack" }],
      },
      {
        id: "labienus",
        title: "Labienus dead on the field",
        description: "Caesar's best officer through eight years in Gaul is killed fighting against him and is buried where he fell. Caesar goes home to be made dictator for life, and has eleven months to live.",
        certainty: "attested",
        units: [
          { id: "cae", faction: "populares", kind: "infantry", at: [50, 34], size: [40, 6] },
          { id: "pom", faction: "optimates", kind: "infantry", at: [50, 20], size: [30, 5], routed: true },
        ],
        arrows: [{ id: "a1", from: [50, 31], to: [50, 25], faction: "populares", kind: "attack" }],
      },
    ],
  },
};

export function getBattleDiagram(slug: string): BattleDiagram | undefined {
  return battleDiagrams[slug];
}

// Battles that deliberately have no diagram, with the reason.
//
// An unlocated site or a long siege is not on its own a reason to refuse: what the
// sources give in those cases is the shape of the action, and a frame that says it
// is schematic can carry that honestly. What cannot be drawn is an action nobody
// described, or a campaign of months that was never one action at all.
export const NO_DIAGRAM_REASON: Record<string, string> = {
  // For the early Republic the bar bites harder than elsewhere. An unlocated site is
  // still no reason to refuse — the Caudine Forks and Sentinum are drawn. What cannot
  // be drawn is a battle whose tactical account is demonstrably the historian's own
  // reconstruction, written four centuries later on the assumption that early Rome
  // fought the way late Rome did.
  "lake-regillus": "The battle is remembered for Castor and Pollux fighting in the Roman line, and its tactical detail is a duel between commanders in the manner of epic. There is a war here and an outcome; there is no action to draw.",
  vesuvius: "Veseris is unlocated and Livy's account of the fighting is built on the manipular legion of his own day, which did not yet exist. What survives is the devotio of Decius — a religious act, not a manoeuvre.",
  trifanum: "Livy passes over the battle in a sentence, which for a decisive engagement means his sources had nothing. Its consequences are on the map; the battle is not.",
  aquilonia: "The account is remarkable for the Samnite oath-taking and silent about the battle. Drawing the fighting would mean inventing the one part the source does not supply.",
  tarentum: "Decided by negotiation rather than assault: the Epirote garrison bargained its own withdrawal and the city then came to terms. There was no action to draw.",
  sulci: "Ancient testimony is a few lines. Date, scale, and location all await review, so any diagram would be invention.",
  "africa-invasion": "A campaign across two years, not a battle. Its stages are on the campaign map.",
  "alps-crossing": "A march of weeks over a route that is itself disputed, shown on the campaign map rather than as a battle.",
  "asculum-picenum": "A year-long investment of a town whose siege works have never been located, in a war for which almost no tactical detail survives at all. Appian gives the outcome and the reprisals and nothing that could be drawn.",
  silarius: "What survives of the last battle is its ending — Spartacus killing his own horse so he could not run, and dying somewhere in the press — not its shape. The site is unlocated and no source describes a formation. Drawing one would supply the part every account leaves out.",
};
