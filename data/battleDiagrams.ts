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
        arrows: [{ id: "a1", from: [50, 31], to: [50, 28], faction: "rome", kind: "attack", label: "boarding" }],
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
  trebia: {
    scaleNote: "The ground west of Placentia either side of the Trebia; which bank held the main action is disputed.",
    sourceIds: ["polybius-3", "livy-21-30"],
    terrain: [
      { id: "river", kind: "river", points: [[50, 0], [46, 20], [52, 42], [48, 68]], label: "Trebia" },
      { id: "cover", kind: "woods", points: [[62, 40], [80, 38], [84, 52], [64, 54]], label: "watercourse" },
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
      { id: "hills", kind: "hill", points: [[6, 6], [40, 4], [72, 8], [96, 6], [96, 26], [60, 24], [24, 26], [6, 24]], label: "hills" },
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
          { id: "a3", from: [76, 29], to: [74, 32], faction: "carthage", kind: "attack" },
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
        arrows: [{ id: "a1", from: [66, 37], to: [66, 34], faction: "rome", kind: "attack" }],
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
          { id: "a1", from: [44, 44], to: [44, 50], faction: "carthage", kind: "move", label: "through the lanes" },
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
  cynoscephalae: {
    scaleNote: "The ridges called the Dog's Heads, between Pherae and Scotussa; the hills are not securely identified.",
    orientation: "The ridge line runs across the frame.",
    sourceIds: ["polybius-18", "livy-31-33"],
    terrain: [
      { id: "ridge", kind: "ridge", points: [[8, 22], [34, 16], [58, 20], [82, 15], [94, 22], [70, 32], [40, 30], [14, 32]], label: "the Dog's Heads" },
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

// Battles that deliberately have no diagram, with the reason. Sieges and
// multi-year campaigns are not single actions; the rest lack any usable account.
export const NO_DIAGRAM_REASON: Record<string, string> = {
  messana: "The sources compress several confrontations around the city into one episode; no single action can be drawn.",
  agrigentum: "A months-long siege and relief battle rather than one engagement; the siege works are not located.",
  sulci: "Ancient testimony is a few lines. Date, scale, and location all await review, so any diagram would be invention.",
  tyndaris: "A confused meeting engagement whose outcome the sources characterise differently.",
  "africa-invasion": "A campaign across two years, not a battle.",
  adys: "The site is unidentified and the account too brief for a tactical reading.",
  lilybaeum: "A nine-year siege containing many separate operations.",
  saguntum: "A siege of months; the assault works are not recoverable.",
  "alps-crossing": "A march of weeks, shown on the campaign map rather than as a battle.",
  ticinus: "A cavalry skirmish whose site is not fixed.",
  capua: "A siege with lines of circumvallation that are not located in detail.",
  "new-carthage": "An assault on a city; the route across the lagoon is itself disputed.",
  baecula: "The battlefield location is contested among several sites.",
  "great-plains": "The district is only broadly placed and the account is compressed.",
  aous: "A forced passage through a gorge; the point of attack is debated.",
};
