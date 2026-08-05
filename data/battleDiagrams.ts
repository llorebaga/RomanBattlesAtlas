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
    sourceIds: ["livy-21-30", "goldsworthy-2000"],
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
    sourceIds: ["polybius-3", "livy-21-30"],
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
    sourceIds: ["polybius-3", "goldsworthy-2000"],
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
    sourceIds: ["polybius-3", "livy-21-30"],
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
    sourceIds: ["polybius-3", "goldsworthy-2000"],
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
    sourceIds: ["polybius-3", "livy-21-30"],
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
    sourceIds: ["polybius-3", "livy-21-30", "appian-hann"],
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
  sulci: "Ancient testimony is a few lines. Date, scale, and location all await review, so any diagram would be invention.",
  "africa-invasion": "A campaign across two years, not a battle. Its stages are on the campaign map.",
  "alps-crossing": "A march of weeks over a route that is itself disputed, shown on the campaign map rather than as a battle.",
};
