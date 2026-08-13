import type { Era } from "@/types/history";

// The continuous timeline is assembled from these eras. Timeline bounds and the
// map header are derived from this list, so adding a later war (or period)
// automatically extends the scrubber without touching the map component.
export const eras: Era[] = [
  // ── The Republic conquers Italy, 509–265 BCE ───────────────────────────────
  // The segments are contiguous so that every year on the scrubber belongs to
  // one. They are named for what the period was about rather than for a war,
  // because for much of the fifth century the fighting was annual raiding with no
  // war to name. The regal period before 509 is deliberately not here: see the
  // methodology page on why the atlas does not map foundation myth.
  {
    id: "early-republic",
    name: "The Republic's first wars",
    shortName: "Early Republic",
    kind: "war",
    startYear: -509,
    endYear: -450,
    blurb:
      "A city of a few thousand fights for its own hinterland: against the last king's Etruscan backers, against the Latin cities it would later lead, and against the Volsci and Aequi coming down off the hills. Almost everything here is the annalistic tradition rather than record.",
    mapView: { center: [12.9, 41.8], zoom: 6.6 },
    factions: ["rome", "etruscan", "latin"],
  },
  {
    id: "veientine-wars",
    name: "The wars with Veii",
    shortName: "Veii",
    kind: "war",
    startYear: -449,
    endYear: -391,
    blurb:
      "Rome's nearest rival was an Etruscan city fifteen kilometres away. Three wars and a ten-year siege end with Veii destroyed and its land annexed — the first conquest that made Rome substantially larger than its neighbours.",
    mapView: { center: [12.5, 42.1], zoom: 6.8 },
    factions: ["rome", "etruscan"],
  },
  {
    id: "gallic-crisis",
    name: "The Gallic catastrophe and recovery",
    shortName: "Gallic Crisis",
    kind: "war",
    startYear: -390,
    endYear: -350,
    blurb:
      "A Senonian war band destroys a Roman army at the Allia and sacks the city itself. The generation after rebuilds the walls, holds Latium together, and turns a humiliation into the reason Rome never again fought without reserves.",
    mapView: { center: [12.6, 42.2], zoom: 6.4 },
    factions: ["rome", "gaul", "etruscan"],
  },
  {
    id: "latin-samnite-first",
    name: "The Latin and first Samnite wars",
    shortName: "Latium",
    kind: "war",
    startYear: -349,
    endYear: -327,
    blurb:
      "Rome reaches Campania, meets the Samnites for the first time, and then has to fight its own Latin allies for the leadership of Latium. The settlement of 338 replaces the League with a system of unequal alliances that becomes the template for Roman Italy.",
    mapView: { center: [13.7, 41.4], zoom: 6.2 },
    factions: ["rome", "latin", "samnite"],
  },
  {
    id: "samnite-second",
    name: "The Second Samnite War",
    shortName: "Second Samnite War",
    kind: "war",
    startYear: -326,
    endYear: -305,
    blurb:
      "Twenty years in the Apennines against the one Italian power of comparable weight. Rome is trapped and made to surrender at the Caudine Forks, then rebuilds, builds the Via Appia, and grinds Samnium down.",
    mapView: { center: [14.4, 41.3], zoom: 6.2 },
    factions: ["rome", "samnite"],
  },
  {
    id: "samnite-third",
    name: "The Third Samnite War",
    shortName: "Third Samnite War",
    kind: "war",
    startYear: -304,
    endYear: -291,
    blurb:
      "Samnites, Etruscans, Umbrians and Gauls combine against Rome and are beaten at Sentinum, the largest battle fought in Italy before Cannae. Within a decade Rome holds the peninsula from the Po to Lucania.",
    mapView: { center: [13.5, 42.2], zoom: 6.0 },
    factions: ["rome", "samnite", "etruscan", "gaul"],
  },
  {
    id: "pyrrhic-war",
    name: "The Pyrrhic War",
    shortName: "Pyrrhic War",
    kind: "war",
    startYear: -290,
    endYear: -272,
    blurb:
      "Tarentum calls in Pyrrhus of Epirus, the best professional soldier of the age. He beats Rome twice with pikes and elephants, cannot convert either win into a peace, crosses to Sicily against Carthage, and finally goes home. Rome's first war against a Hellenistic army.",
    mapView: { center: [15.6, 40.2], zoom: 5.6 },
    factions: ["rome", "epirote", "samnite"],
  },
  {
    id: "italian-unification",
    name: "The completion of Italy",
    shortName: "Italy Completed",
    kind: "interbellum",
    startYear: -271,
    endYear: -265,
    blurb:
      "The last independent cities of the south and of Etruria are brought in, a Roman garrison that had seized Rhegium is destroyed by its own state, and the peninsula is a single military system. The year after this, Rome crosses to Sicily.",
    mapView: { center: [14.2, 41.2], zoom: 5.8 },
    factions: ["rome", "etruscan"],
  },

  {
    id: "first-punic",
    name: "First Punic War",
    shortName: "First Punic War",
    kind: "war",
    startYear: -264,
    endYear: -241,
    blurb:
      "Rome and Carthage fight for Sicily and, unexpectedly, for command of the sea. Rome becomes a naval power for the first time.",
    mapView: { center: [12.4, 37.9], zoom: 4.7 },
    factions: ["rome", "carthage"],
  },
  {
    id: "interbellum",
    name: "Between the Punic Wars",
    shortName: "Between the wars",
    kind: "interbellum",
    startYear: -240,
    endYear: -219,
    blurb:
      "Carthage suppresses a mercenary revolt, loses Sardinia and Corsica to Rome, and rebuilds power through the Barcid conquest of Iberia.",
    mapView: { center: [7.5, 39.5], zoom: 4.1 },
    factions: ["rome", "carthage"],
  },
  {
    id: "second-punic",
    name: "Second Punic War",
    shortName: "Second Punic War",
    kind: "war",
    startYear: -218,
    endYear: -201,
    blurb:
      "Hannibal carries the war across the Alps into Italy. After years of Roman defeats, Scipio takes the fight to Iberia and Africa and wins at Zama.",
    mapView: { center: [6.5, 41], zoom: 3.9 },
    factions: ["rome", "carthage"],
  },
  {
    id: "macedonian-second",
    name: "Second Macedonian War",
    shortName: "Second Macedonian War",
    kind: "war",
    startYear: -200,
    endYear: -196,
    blurb:
      "Freed from Carthage, Rome turns east against Philip V of Macedon. The legion defeats the phalanx at Cynoscephalae, and Rome proclaims the 'freedom of the Greeks'.",
    mapView: { center: [21, 39.6], zoom: 5.1 },
    factions: ["rome", "macedon"],
  },
  {
    id: "greek-settlement",
    name: "The uneasy peace in Greece",
    shortName: "Uneasy peace",
    kind: "interbellum",
    startYear: -195,
    endYear: -193,
    blurb:
      "Rome has declared the Greeks free and now has to decide what that means. Flamininus makes war on Nabis of Sparta, withdraws every Roman garrison from Greece, and sails home — leaving an Aetolia that thinks it was cheated of its share and an Antiochus III who has spent the same years taking back Asia Minor and Thrace. Three years of embassies settle nothing.",
    mapView: { center: [24.0, 39.4], zoom: 4.6 },
    factions: ["rome", "seleucid"],
  },
  {
    id: "seleucid-war",
    name: "The war with Antiochus III",
    shortName: "Antiochene War",
    kind: "war",
    startYear: -192,
    endYear: -188,
    blurb:
      "Invited into Greece by the Aetolians, Antiochus III lands at Demetrias with too small an army and is thrown out of Europe at Thermopylae within a year. Rome then does what it had never done before: crosses into Asia, breaks the largest army it had ever faced at Magnesia, and takes no territory at all — the Seleucid empire is pushed behind the Taurus and its spoils handed to Pergamum and Rhodes.",
    mapView: { center: [26.5, 38.6], zoom: 4.4 },
    factions: ["rome", "seleucid", "pergamon"],
  },
  {
    id: "western-wars",
    name: "The wars nobody counted",
    shortName: "Liguria & Spain",
    kind: "interbellum",
    startYear: -187,
    endYear: -172,
    blurb:
      "Fifteen years in which Rome is at war every single year and none of it has a name. Consular armies grind through Liguria and Istria; praetors fight an annual campaign in both Spanish provinces that nobody at Rome thinks worth a triumph. Meanwhile Philip V rebuilds Macedon's revenues and army, and his son Perseus inherits both.",
    mapView: { center: [4.0, 42.0], zoom: 4.2 },
    factions: ["rome"],
  },
  {
    id: "macedonian-third",
    name: "The Third Macedonian War",
    shortName: "Third Macedonian",
    kind: "war",
    startYear: -171,
    endYear: -168,
    blurb:
      "Rome declares war on Perseus and then spends three years being outmanoeuvred by him — beaten in the opening cavalry action at Callinicus and stalled on the Elpeus line. Aemilius Paullus is sent out in 168 and ends it in an hour at Pydna. The Antigonid kingdom, three centuries old, is abolished.",
    mapView: { center: [22.6, 40.2], zoom: 5.2 },
    factions: ["rome", "macedon"],
  },
  {
    id: "after-pydna",
    name: "After Pydna",
    shortName: "After Pydna",
    kind: "interbellum",
    startYear: -167,
    endYear: -150,
    blurb:
      "Rome has no rival left and no province to show for it. Macedon is cut into four republics forbidden to trade with one another, Epirus is sacked and seventy towns enslaved, a thousand Achaeans — Polybius among them — are deported to Italy without charge. The fighting that continues is in Spain, where it gets worse every year and where in 150 a Roman commander massacres a Lusitanian people who had already surrendered.",
    mapView: { center: [10.0, 40.0], zoom: 3.6 },
    factions: ["rome", "macedon"],
  },
  {
    id: "punic-third",
    name: "The Third Punic War and the year 146",
    shortName: "Third Punic War",
    kind: "war",
    startYear: -149,
    endYear: -146,
    blurb:
      "Carthage, disarmed for fifty years and finally provoked into defending itself against Masinissa, is ordered to abandon its city and refuses. Three years of siege end with the place stormed street by street and razed. In the same summer, at the other end of the Mediterranean, Corinth is sacked and the Achaean League dissolved — and Rome, which had annexed nothing after Magnesia, now takes provinces in Africa and Macedonia.",
    mapView: { center: [15.0, 38.0], zoom: 3.8 },
    factions: ["rome", "carthage"],
  },
  {
    id: "iberian-wars",
    name: "The wars in Spain",
    shortName: "Spain",
    kind: "war",
    startYear: -145,
    endYear: -133,
    blurb:
      "The wars Rome could not finish. Viriathus held Lusitania for eight years against a succession of consular armies and was killed by three of his own men, bribed; Numantia, a hill town of eight thousand, beat four Roman armies and forced one to surrender before Scipio Aemilianus starved it out with a wall. Neither war produced a battle Rome could point to, and both were fought about whether Roman commanders had to keep the terms they signed.",
    mapView: { center: [-4.0, 40.5], zoom: 5.0 },
    factions: ["rome", "iberian"],
  },
  {
    id: "gracchan-crisis",
    name: "The Gracchi, and an empire acquired by will",
    shortName: "The Gracchi",
    kind: "interbellum",
    startYear: -132,
    endYear: -114,
    blurb:
      "Rome acquires Asia because a king leaves it to her in his will, fights three years to take possession of the bequest, and conquers southern Gaul to secure the road to Spain. At home the same years kill two tribunes in the street over who gets the land the wars produced. Nothing in this stretch is a war Rome declared on a rival; all of it is the cost of holding what it already had.",
    mapView: { center: [12.0, 40.0], zoom: 3.6 },
    factions: ["rome"],
  },
  {
    id: "jugurthine-war",
    name: "Jugurtha, and the Cimbri in the north",
    shortName: "Jugurtha",
    kind: "war",
    startYear: -113,
    endYear: -105,
    blurb:
      "Two wars at once, and Rome losing both. In Africa a Numidian prince who had learned the Roman army from inside it fought a war of movement no consular army could pin down, and bought every settlement that threatened to end it. In the north a migrating people destroyed one Roman army after another, ending at Arausio with the worst defeat since Cannae. Both years produced the same conclusion at Rome: the nobility could not do this, and Marius could.",
    mapView: { center: [5.0, 40.0], zoom: 3.6 },
    factions: ["rome", "numidia", "cimbri"],
  },
  {
    id: "cimbric-war",
    name: "Marius and the Cimbri",
    shortName: "The Cimbri",
    kind: "war",
    startYear: -104,
    endYear: -100,
    blurb:
      "Marius held the consulship five years running — illegally, and because nobody else was trusted to do it — rebuilt the army around long service and a standard rather than a property qualification, and then destroyed the Teutones at Aquae Sextiae and the Cimbri at Vercellae in successive summers. The migration that had beaten five Roman armies was annihilated, and the army that did it belonged to its general.",
    mapView: { center: [6.5, 44.5], zoom: 4.6 },
    factions: ["rome", "cimbri"],
  },
  {
    id: "marian-aftermath",
    name: "After the Cimbri",
    shortName: "Aftermath",
    kind: "interbellum",
    startYear: -99,
    endYear: -92,
    blurb:
      "Marius is six times consul and has nothing left to command. The veterans of the Cimbric war want land and the Senate will not vote it; the Italian allies who supplied half the army want citizenship and are refused it twice. Nothing is fought in these years and everything that follows is decided in them.",
    mapView: { center: [12.5, 42.0], zoom: 5.2 },
    factions: ["rome"],
  },
  {
    id: "social-war",
    name: "The Social War",
    shortName: "Social War",
    kind: "war",
    startYear: -91,
    endYear: -88,
    blurb:
      "The Italian allies who had fought every war on this map alongside Rome, and were still not citizens, set up their own state with its own capital and coinage and beat Roman armies for two years. Rome won it by conceding the thing the war was about — citizenship for everyone who had not taken up arms, and then for almost everyone else. It ends with Sulla marching an army on Rome itself, which no Roman had done.",
    mapView: { center: [14.0, 42.0], zoom: 5.4 },
    factions: ["rome", "populares", "optimates"],
  },
  {
    id: "sulla-mithridates",
    name: "Mithridates, and Sulla's return",
    shortName: "Sulla",
    kind: "war",
    startYear: -87,
    endYear: -81,
    blurb:
      "Mithridates of Pontus overruns the province of Asia and has eighty thousand Romans and Italians in it killed in a single coordinated day, then takes Greece. Sulla beats him at Chaeronea and Orchomenus with an army the government at Rome has declared outlaw, makes peace on lenient terms so he can come home, and fights his way back into Italy. The proscriptions that follow are the first time Rome kills its own citizens from a published list.",
    mapView: { center: [20.0, 39.5], zoom: 4.4 },
    factions: ["rome", "pontus", "optimates", "populares"],
  },
  {
    id: "sertorius-and-spartacus",
    name: "Sertorius and Spartacus",
    shortName: "Sertorius",
    kind: "war",
    startYear: -80,
    endYear: -72,
    blurb:
      "A Marian officer who would not accept the settlement held Spain for eight years with a Roman army, a Roman-style senate of exiles, and Spanish allies who preferred him to Rome — and was murdered at dinner by his own second. In the same years seventy escaped gladiators became an army of tens of thousands that beat consular forces twice and marched the length of Italy.",
    mapView: { center: [2.0, 40.0], zoom: 4.2 },
    factions: ["rome", "populares"],
  },
  {
    id: "pompey-east",
    name: "Pompey, the pirates, and the East",
    shortName: "Pompey",
    kind: "war",
    startYear: -71,
    endYear: -63,
    blurb:
      "Crassus destroys Spartacus and Pompey takes the credit. Pompey is then given the Mediterranean and clears it of piracy in a single season, takes over the war against Mithridates, and spends four years redrawing the East: Pontus, Cilicia, Syria and Judaea annexed or made client, the Seleucid dynasty ended by administrative decision. Rome's eastern frontier becomes Parthia's.",
    mapView: { center: [32.0, 37.0], zoom: 4.2 },
    factions: ["rome", "pontus"],
  },
  {
    id: "caesars-rise",
    name: "The years of the three men",
    shortName: "Triumvirate",
    kind: "interbellum",
    startYear: -62,
    endYear: -59,
    blurb:
      "Catiline is destroyed at Pistoria and the Senate discovers it has no answer to Pompey's veterans, Crassus' money, or Caesar's debts except to obstruct all three. So the three of them agree privately to stop obstructing each other, and Caesar's consulship in 59 delivers what each of them wanted — including a five-year command in Gaul.",
    mapView: { center: [12.5, 42.0], zoom: 5.0 },
    factions: ["rome"],
  },
  {
    id: "gallic-wars",
    name: "The Gallic Wars",
    shortName: "Gaul",
    kind: "war",
    startYear: -58,
    endYear: -50,
    blurb:
      "Eight years in which Caesar conquered a country the size of Italy and France together, crossed the Rhine twice and the Channel twice, and wrote the account of it himself in dispatches sent home each winter. It ends at Alesia, where he besieged a fortified hilltop and a relieving army at the same time by building two walls, one facing each way — and it ends with him holding an army of eleven legions that answered to him.",
    mapView: { center: [3.5, 47.0], zoom: 4.6 },
    factions: ["rome", "gaul", "parthia"],
  },
  {
    id: "caesars-civil-war",
    name: "Caesar's civil war",
    shortName: "Civil War",
    kind: "war",
    startYear: -49,
    endYear: -44,
    blurb:
      "Ordered to give up his command and stand trial, Caesar crossed the Rubicon with one legion and took Italy in two months without a battle. Four years took him to Greece, Egypt, Pontus, Africa and Spain, and left nobody able to oppose him. He was made dictator for life and killed five months later by sixty men who believed that would restore the Republic.",
    mapView: { center: [14.0, 40.0], zoom: 3.8 },
    factions: ["rome", "populares", "optimates"],
  },

  // ── After the Ides, 44–30 BCE ──────────────────────────────────────────────
  // The killing of Caesar did not restore the Republic; it started the last and
  // longest of its civil wars. These four eras carry it to the end, and the
  // atlas stops where the Republic actually stops — not at the Ides, which
  // settled nothing, but at Alexandria, after which there is one man, one army
  // and no rival left to draw.
  {
    id: "mutina-war",
    name: "The war of Mutina",
    shortName: "Mutina",
    kind: "war",
    startYear: -43,
    endYear: -43,
    blurb:
      "Nobody had planned for what to do the day after. Antony took the army and went for Cisalpine Gaul; the senate, with Cicero speaking, declared him a public enemy and sent both consuls and Caesar's nineteen-year-old heir against him. Antony was beaten at Forum Gallorum and again outside Mutina, and both consuls died — which left the boy with the only intact army in Italy and no one above him. Within six months he had marched on Rome, taken the consulship at nineteen, and made terms with the man he had just been sent to destroy.",
    mapView: { center: [11.5, 44.3], zoom: 5.6 },
    factions: ["rome", "optimates", "populares"],
  },
  {
    id: "philippi-war",
    name: "The triumvirate and Philippi",
    shortName: "Philippi",
    kind: "war",
    startYear: -42,
    endYear: -41,
    blurb:
      "Antony, Octavian and Lepidus divided the state between them by law, and opened with a proscription that killed perhaps three hundred senators and two thousand equites — Cicero among them, his head and hands nailed to the rostra he had spoken from. Then they took nineteen legions across to Macedonia after the men who had killed Caesar. Philippi was fought twice on the same ground in three weeks; Cassius killed himself after the first on a false report, Brutus after the second, and the Republic had no one left to command an army for it.",
    mapView: { center: [23.6, 40.4], zoom: 5.0 },
    factions: ["rome", "optimates", "populares"],
  },
  {
    id: "sextus-war",
    name: "Perusia, Parthia and the war at sea",
    shortName: "Sextus Pompeius",
    kind: "war",
    startYear: -40,
    endYear: -36,
    blurb:
      "The victors turned on each other almost at once: Octavian starved his colleague's brother out of Perusia in the winter of 41, and the two sides were pulled back from war by their own armies at Brundisium. Meanwhile Pompey's surviving son held Sicily with a fleet and cut the grain off from Rome, and a Parthian army with a Roman renegade at its head overran Syria and Judaea. Ventidius drove the Parthians out and killed Pacorus on the anniversary of Carrhae; Agrippa built a new navy in a lake and destroyed Sextus at Naulochus.",
    mapView: { center: [22.0, 37.0], zoom: 3.6 },
    factions: ["rome", "optimates", "populares", "parthia"],
  },
  {
    id: "actium-war",
    name: "Antony, Cleopatra and Actium",
    shortName: "Actium",
    kind: "war",
    startYear: -35,
    endYear: -30,
    blurb:
      "Antony had the East, the better army and Egypt's money; Octavian had Italy, Agrippa, and the argument. The propaganda war was won first — a will read aloud in the senate, an oath of allegiance taken by the whole of Italy, and a declaration of war against a foreign queen rather than a Roman colleague. At Actium the fleet was blockaded into a battle it fought to escape rather than to win, and Antony's army surrendered without one. A year later Alexandria fell, Egypt became a province, and the Republic was over.",
    mapView: { center: [24.0, 35.0], zoom: 3.9 },
    factions: ["rome", "optimates", "populares", "ptolemaic"],
  },
];

export function eraForYear(year: number): Era | undefined {
  return eras.find((era) => year >= era.startYear && year <= era.endYear);
}

export function getEra(id: string | undefined): Era | undefined {
  if (!id) return undefined;
  return eras.find((era) => era.id === id);
}

export const TIMELINE_START_YEAR = Math.min(...eras.map((era) => era.startYear));
export const TIMELINE_END_YEAR = Math.max(...eras.map((era) => era.endYear));
