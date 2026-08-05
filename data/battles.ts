import type { Battle } from "@/types/history";

const commonAncient = ["polybius-1"];
const commonModern = ["lazenby-1996", "hoyos-2015"];

const secondAncient = ["polybius-3", "livy-21-30"];
const secondModern = ["lazenby-1978", "goldsworthy-2000"];

const macedonAncient = ["polybius-18", "livy-31-33"];
const macedonModern = ["walbank-1940", "eckstein-2008"];

// ── The Republic conquers Italy, 509–265 BCE ────────────────────────────────
//
// A word about certainty in this block. The dates are Rome's own, and several are
// demonstrably wrong or duplicated within the annalistic record; the sites of most
// of these battles are unlocated; and the tactical detail in Livy for the fifth and
// fourth centuries is largely his own reconstruction. What survives reliably is
// which wars were fought, roughly when, and how they came out. That is enough to
// map, and not enough to map the way the Punic wars are mapped, so the grades here
// run through `traditional` and `disputed` rather than `attested`.
const earlyItalyAncient = ["livy-1-5", "dionysius-hal"];
const earlyItalyModern = ["cornell-1995", "forsythe-2005"];
const midItalyAncient = ["livy-6-10", "dionysius-hal"];
const midItalyModern = ["oakley-1997", "salmon-1967"];
const pyrrhicAncient = ["plutarch-pyrrhus", "appian-samnite", "livy-periochae"];
const pyrrhicModern = ["champion-2009", "cornell-1995"];

const earlyRepublic: Battle[] = [
  {
    id: "lake-regillus", slug: "lake-regillus", name: "Battle of Lake Regillus", kind: "land", startYear: -496, endYear: -496, displayDate: "496 BCE (traditional)", location: "Lake Regillus, the Alban hills (site unidentified)", coordinates: [12.72, 41.78], uncertainty: { radiusKm: 14, certainty: "disputed", note: "The lake was a crater basin somewhere in the Alban hills and has never been identified; the drained Pantano Secco is the usual guess." }, major: true,
    belligerents: ["Rome", "The Latin League"], commanders: [{ faction: "rome", names: ["Aulus Postumius Albus (dictator)"], certainty: "traditional" }, { faction: "latin", names: ["Octavius Mamilius of Tusculum"], certainty: "traditional" }], result: "Roman victory",
    summary: "Rome defeated a Latin army in the war over who should lead Latium after the expulsion of the kings, in a battle the tradition remembered mainly for the gods who were said to have fought in it.",
    significance: "The victory led to the treaty of Cassius three years later, which made Rome the leading partner in the Latin alliance rather than one city among equals — the foundation everything Roman built on for the next two centuries.",
    context: "With the Tarquins expelled and in exile among the Latins, the question was whether a Rome without kings still held the primacy in Latium that the kings had won. Both sides had reason to want it settled. What the tradition preserves is a battle fought mostly by aristocratic cavalry, in which the commanders sought each other out personally — which may be a genuine memory of how early Latin war was fought, or a later writer's idea of it.",
    forces: [
      { side: "Rome", estimate: "The citizen levy with its aristocratic cavalry, under a dictator", certainty: "traditional", note: "No figure survives. Rome at this date could probably field a few thousand men." },
      { side: "The Latin League", estimate: "A combined force of the Latin cities, with Tarquinian exiles and Roman deserters", certainty: "traditional" },
    ],
    casualties: [
      { side: "The Latin League", estimate: "Not preserved; the Latin commander was killed", certainty: "traditional" },
      { side: "Rome", estimate: "Not preserved, and described as heavy for a victory", certainty: "traditional" },
    ],
    ancientSourceIds: earlyItalyAncient, modernSourceIds: earlyItalyModern,
    uncertaintyNotes: ["The lake has never been located.", "Castor and Pollux were said to have fought in the Roman line and to have brought the news to Rome themselves; the temple of Castor in the Forum was held to commemorate it.", "The battle may be a doublet of the later Latin War, retrojected to explain the treaty of 493."],
    nextSlug: "veii",
  },
  {
    id: "veii", slug: "veii", name: "Siege of Veii", kind: "siege", startYear: -406, endYear: -396, displayDate: "406–396 BCE (traditional)", location: "Veii, on the Cremera plateau twelve miles north of Rome", coordinates: [12.386, 42.031], uncertainty: { radiusKm: 3, certainty: "attested", note: "The city site is securely identified and extensively excavated; the Roman siege works are not." }, major: true,
    belligerents: ["Rome", "Veii"], commanders: [{ faction: "rome", names: ["Marcus Furius Camillus (dictator)"], certainty: "traditional" }, { faction: "etruscan", names: ["Unknown"], certainty: "disputed" }], result: "Roman capture and destruction of the city",
    summary: "Rome besieged its nearest rival, an Etruscan city on a plateau twelve miles away, and after a siege the tradition made ten years long took it, sold its people, and annexed its land.",
    significance: "The first conquest that made Rome substantially larger than any neighbour. The annexation of Veientine territory roughly doubled Roman land, and Rome kept it rather than leaving a defeated ally in place — the pattern of everything that followed.",
    context: "Veii sat on a plateau of about the same size as Rome's own, controlled the Tiber crossing at Fidenae and the trade in salt from the coast, and had fought Rome intermittently for a century. The tradition gives the siege ten years in open imitation of Troy, and attaches to it two changes that are probably real and probably later: pay for soldiers, which an army that cannot go home for the harvest requires, and a winter camp. The city fell, on the tradition, when a tunnel was driven into the citadel — a story that also attaches to other sieges and that the tufa around Veii, riddled with drainage cuniculi, would certainly have made imaginable.",
    forces: [
      { side: "Rome", estimate: "The citizen levy maintained in the field year-round, reportedly for the first time with pay", certainty: "traditional", note: "The introduction of the stipendium is dated to this siege and may belong to it." },
      { side: "Veii", estimate: "The city's own forces; the rest of the Etruscan league did not intervene in strength", certainty: "probable", note: "Veii's isolation from the other Etruscan cities is the strategic fact of the war." },
    ],
    casualties: [
      { side: "Veii", estimate: "The population killed or sold and the city never reoccupied", certainty: "probable", note: "The archaeology confirms that occupation ends at about this date." },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
    ],
    ancientSourceIds: ["livy-1-5", "plutarch-camillus", "dionysius-hal"], modernSourceIds: earlyItalyModern,
    uncertaintyNotes: ["The ten-year length is a literary echo of Troy and is not independently supported.", "The tunnel into the citadel is a folk-tale motif found in several ancient siege narratives.", "Camillus' role has been enlarged by a family tradition that made him a second founder of Rome."],
    previousSlug: "lake-regillus", nextSlug: "allia",
  },
  {
    id: "allia", slug: "allia", name: "Battle of the Allia", kind: "land", startYear: -390, endYear: -390, displayDate: "390 BCE (Roman reckoning; 387/6 in the Greek)", location: "The Allia stream, about eleven miles north of Rome", coordinates: [12.62, 42.08], uncertainty: { radiusKm: 16, certainty: "disputed", note: "The Allia is usually identified with a small tributary on the Tiber's left bank, but the identification and the bank are both argued." }, major: true,
    belligerents: ["Rome", "The Senones"], commanders: [{ faction: "rome", names: ["Quintus Sulpicius Longus"], certainty: "traditional" }, { faction: "gaul", names: ["Brennus"], certainty: "traditional" }], result: "Catastrophic Roman defeat; Rome sacked",
    summary: "A Gallic war band destroyed a Roman army eleven miles from the city and then took Rome itself, holding everything but the Capitol until it was bought off.",
    significance: "The only time before the fifth century CE that Rome fell to a foreign enemy. It cost Rome its records, gave it a lasting dread of Gauls, and — because the recovery took barely a decade — became the event Romans cited to prove that Rome could not be finished by one defeat.",
    context: "The Senones had settled the Adriatic coast a generation earlier and moved inland against Clusium, which appealed to Rome. Roman envoys, on the tradition, joined the fighting instead of mediating, and the Gauls came south. The Romans met them in the open with an army the sources say was hastily raised and badly deployed, with the weight on a wing that could be turned. Everything after the battle is remembered in vignettes — the geese on the Capitol, the senators awaiting death in their doorways, the sword thrown onto the scales — which is what happens when the records themselves have burned.",
    forces: [
      { side: "Rome", estimate: "Reportedly a large levy, hurriedly raised; figures in the tradition are not usable", certainty: "traditional", note: "Diodorus gives 24,000, Livy no total. The complaint in the sources is about deployment, not numbers." },
      { side: "The Senones", estimate: "A migrating war band, numbers unrecoverable", certainty: "disputed" },
    ],
    casualties: [
      { side: "Rome", estimate: "The army broken with little fighting; many drowned in the Tiber and the survivors fled to Veii rather than to Rome", certainty: "traditional", note: "That the survivors made for Veii, not the city, is the detail that explains how Rome came to be undefended." },
      { side: "The Senones", estimate: "Slight, and the band later accepted a ransom in gold to withdraw", certainty: "traditional" },
    ],
    ancientSourceIds: ["livy-1-5", "polybius-2", "plutarch-camillus"], modernSourceIds: earlyItalyModern,
    uncertaintyNotes: ["Roman and Greek chronologies for the sack differ by three or four years.", "How much of the city was actually destroyed is disputed; the archaeological destruction layer is thinner than the literary account implies.", "Whether the Capitol truly held out, or the story exists to soften the defeat, has been questioned since antiquity."],
    previousSlug: "veii", nextSlug: "vesuvius",
  },
  {
    id: "vesuvius", slug: "vesuvius", name: "Battle of Vesuvius", kind: "land", startYear: -340, endYear: -340, displayDate: "340 BCE", location: "Near Veseris, at the foot of Vesuvius (site unidentified)", coordinates: [14.35, 41.0], uncertainty: { radiusKm: 30, certainty: "disputed", note: "Veseris is named as a river or place near Vesuvius and has never been identified." }, major: true,
    belligerents: ["Rome and the Samnites", "The Latin League and the Campanians"], commanders: [{ faction: "rome", names: ["Publius Decius Mus", "Titus Manlius Torquatus"], certainty: "probable" }, { faction: "latin", names: ["Unknown"], certainty: "disputed" }], result: "Roman victory",
    summary: "Rome defeated its own Latin and Campanian allies, who had demanded equality in the alliance and gone to war when refused. The consul Decius Mus was said to have devoted himself and the enemy to the gods of the underworld and ridden alone into the Latin line.",
    significance: "The first battle of the war that ended the Latin League. Because the two sides were armed and drilled alike, it was also the point at which Roman writers began to describe war as decided by discipline rather than by advantage.",
    context: "The Latin cities had fought beside Rome for a century and a half and wanted the standing that went with it: shared magistracies, a real say in where the armies went. Rome refused, and the alliance broke. The awkwardness of the war — Romans against Latins who fought in the same formations with the same weapons — shapes everything the sources say about it, including the two famous stories attached to this battle: Manlius executing his own son for leaving the ranks to fight, and Decius' devotio.",
    forces: [
      { side: "Rome", estimate: "Two consular armies, with Samnite allies", certainty: "probable", note: "Rome and Samnium were briefly on the same side, which is why the war could be fought at all." },
      { side: "The Latin League", estimate: "The Latin cities with Campanian contingents, similarly armed and organised", certainty: "probable" },
    ],
    casualties: [
      { side: "The Latin League", estimate: "Heavy; the wing Decius charged is said to have given way first", certainty: "traditional" },
      { side: "Rome", estimate: "Heavy, and the consul Decius killed", certainty: "traditional", note: "Whether the devotio is historical or a rite retrojected onto his death is argued; the family produced a second and possibly a third." },
    ],
    ancientSourceIds: midItalyAncient, modernSourceIds: [...midItalyModern, "cornell-1995"],
    uncertaintyNotes: ["Veseris is unlocated.", "The devotio of Decius, repeated by his son at Sentinum and possibly his grandson, looks like a family tradition shaped over generations.", "Livy's tactical detail for this battle is his own reconstruction."],
    previousSlug: "allia", nextSlug: "trifanum",
  },
  {
    id: "trifanum", slug: "trifanum", name: "Battle of Trifanum", kind: "land", startYear: -340, endYear: -340, displayDate: "340 BCE", location: "Trifanum, between Sinuessa and Minturnae (site unidentified)", coordinates: [13.85, 41.22], uncertainty: { radiusKm: 16, certainty: "disputed", note: "Placed on the coast road between Sinuessa and Minturnae; the exact site is unknown." }, major: false,
    belligerents: ["Rome", "The Latin League and the Campanians"], commanders: [{ faction: "rome", names: ["Titus Manlius Torquatus"], certainty: "probable" }, { faction: "latin", names: ["Unknown"], certainty: "disputed" }], result: "Decisive Roman victory",
    summary: "Weeks after Vesuvius, the Latin and Campanian armies were broken in a second pitched battle on the coast road, which ended organised resistance in the field and left Rome free to dictate the settlement of Latium.",
    significance: "Trifanum decided the Latin War in its first season. What followed — the dissolution of the League and its replacement by separate, unequal treaties — was the constitutional invention on which Roman Italy was built.",
    context: "Within weeks of Vesuvius the Latins and Campanians put another army into the field on the coast road south of Latium. Livy passes over the battle quickly, which for a decisive engagement usually means his sources had little to say. Its consequence is what matters: within a year Rome was legislating for cities that had been its equals, annexing some outright with citizenship, tying others to Rome alone and forbidding them to deal with one another.",
    forces: [
      { side: "Rome", estimate: "A consular army under Manlius Torquatus", certainty: "probable" },
      { side: "The Latin League", estimate: "The remaining Latin and Campanian levies", certainty: "probable", note: "No totals survive for either side." },
    ],
    casualties: [
      { side: "The Latin League", estimate: "Reported as very heavy; organised resistance ended", certainty: "traditional" },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
    ],
    ancientSourceIds: midItalyAncient, modernSourceIds: midItalyModern,
    uncertaintyNotes: ["The site is unidentified.", "Livy's account is brief and may compress more than one action.", "Livy places Trifanum in the same year as Vesuvius, weeks after it; some modern accounts put it in 339, which would make the war a two-season affair."],
    previousSlug: "vesuvius", nextSlug: "caudine-forks",
  },
  {
    id: "caudine-forks", slug: "caudine-forks", name: "The Caudine Forks", kind: "land", startYear: -321, endYear: -321, displayDate: "321 BCE", location: "A defile in the Caudine hills east of Capua (identification argued)", coordinates: [14.64, 41.06], uncertainty: { radiusKm: 12, certainty: "disputed", note: "Usually placed in the valley between Arpaia and Montesarchio, but no identification is agreed." }, major: true,
    belligerents: ["Rome", "The Samnite league"], commanders: [{ faction: "rome", names: ["Titus Veturius Calvinus", "Spurius Postumius Albinus"], certainty: "probable" }, { faction: "samnite", names: ["Gaius Pontius"], certainty: "probable" }], result: "Roman surrender without a battle",
    summary: "Two consular armies marched into a closed valley on false information, found both exits held, and surrendered. The whole force passed under the yoke and Rome accepted terms it later repudiated.",
    significance: "The most complete Roman capitulation before Cannae, and the one the Romans found hardest to write about. It also produced the clearest case of Rome disowning an agreement its own commanders had sworn to.",
    context: "Rome was trying to reach Luceria in Apulia and took the short road through the hills. Samnite agents, disguised as shepherds, reported that Luceria was under siege — so the army hurried. The valley it entered had a narrow entrance and a narrower exit, and Pontius had blocked and manned both. There was nothing to fight: no line could be formed and no way out could be forced. What the sources dwell on is the humiliation of the terms and the senate's later argument that a sworn agreement not ratified at Rome bound only the men who swore it.",
    forces: [
      { side: "Rome", estimate: "Two consular armies — on the usual reckoning some 20,000 men", certainty: "disputed", note: "The figure is inferred from the establishment, not reported." },
      { side: "The Samnite league", estimate: "A Samnite army holding both ends of the defile and the slopes above it", certainty: "probable" },
    ],
    casualties: [
      { side: "Rome", estimate: "Almost none killed; the entire force surrendered and passed under the yoke, and six hundred knights were kept as hostages", certainty: "probable", note: "The army was released, which is why Rome could resume the war so quickly — and why the disgrace, rather than the loss, is what the sources record." },
      { side: "The Samnite league", estimate: "None", certainty: "probable" },
    ],
    ancientSourceIds: midItalyAncient, modernSourceIds: midItalyModern,
    uncertaintyNotes: ["The defile has not been securely identified.", "Whether Rome legally repudiated the peace or simply broke it was argued in antiquity and is still argued.", "Livy's claim that Rome won a revenge victory the following year and sent the Samnites under the yoke in turn is generally rejected as annalistic compensation."],
    previousSlug: "trifanum", nextSlug: "sentinum",
  },
  {
    id: "sentinum", slug: "sentinum", name: "Battle of Sentinum", kind: "land", startYear: -295, endYear: -295, displayDate: "295 BCE", location: "Near Sentinum, Umbria (modern Sassoferrato)", coordinates: [12.86, 43.42], uncertainty: { radiusKm: 10, certainty: "probable", note: "The town is securely located; the battlefield in the valley below it is not." }, major: true,
    belligerents: ["Rome", "Samnites, Senones, Etruscans and Umbrians"], commanders: [{ faction: "rome", names: ["Quintus Fabius Maximus Rullianus", "Publius Decius Mus (the son)"], certainty: "probable" }, { faction: "samnite", names: ["Gellius Egnatius"], certainty: "probable" }, { faction: "gaul", names: ["Unknown"], certainty: "disputed" }], result: "Decisive Roman victory",
    summary: "Rome defeated a coalition of Samnites and Gauls in Umbria — the largest battle fought in Italy before Cannae — after the second Decius Mus devoted himself as his father had at Vesuvius.",
    significance: "Sentinum ended the only serious attempt to combine the peoples of Italy against Rome. Within five years Samnium had submitted, and the coalition was never re-formed.",
    context: "The Third Samnite War was the one in which Rome's enemies finally coordinated: Samnium, the Etruscan cities, the Umbrians and the Senonian Gauls agreed to attack together. Rome's answer was to detach part of the coalition before the battle — Roman forces raided Etruria to draw the Etruscan and Umbrian contingents home — so that the army it met at Sentinum was Samnite and Gallic only. On the field, Fabius on the right fought a deliberately slow, holding action against the Samnites; Decius on the left attacked the Gauls, whose chariots broke his cavalry, and when his wing began to give way he devoted himself and rode into them.",
    forces: [
      { side: "Rome", estimate: "Four legions with allies, perhaps 36,000–40,000", certainty: "disputed", note: "Livy's figures for the coalition are far larger and are not credible." },
      { side: "Samnites and Gauls", estimate: "A combined Samnite and Senonian army of comparable or greater size", certainty: "disputed", note: "The Etruscan and Umbrian contingents had been drawn away before the battle." },
    ],
    casualties: [
      { side: "Samnites and Gauls", estimate: "Livy reports 25,000 killed and 8,000 captured; the Samnite commander was killed", certainty: "disputed" },
      { side: "Rome", estimate: "Livy reports 8,700, including the consul Decius", certainty: "disputed", note: "Heavy for a Roman victory, and concentrated on the wing that broke before the devotio." },
    ],
    ancientSourceIds: midItalyAncient, modernSourceIds: [...midItalyModern, "cornell-1995"],
    uncertaintyNotes: ["The battlefield is not securely located within the Sentinum valley.", "The second devotio, repeating his father's at Vesuvius, may owe as much to family tradition as to what happened.", "Livy's totals for the coalition are inflated."],
    previousSlug: "caudine-forks", nextSlug: "aquilonia",
  },
  {
    id: "aquilonia", slug: "aquilonia", name: "Battle of Aquilonia", kind: "land", startYear: -293, endYear: -293, displayDate: "293 BCE", location: "Aquilonia, in Samnium (site unidentified)", coordinates: [15.05, 41.35], uncertainty: { radiusKm: 26, certainty: "disputed", note: "Neither Aquilonia nor the neighbouring Cominium has been located with confidence." }, major: false,
    belligerents: ["Rome", "The Samnite league"], commanders: [{ faction: "rome", names: ["Lucius Papirius Cursor"], certainty: "probable" }, { faction: "samnite", names: ["Unknown"], certainty: "disputed" }], result: "Roman victory",
    summary: "Rome destroyed a Samnite army raised under an oath sworn in a linen-hung enclosure, in the campaign that effectively ended Samnite resistance.",
    significance: "The last substantial Samnite field army. Two years later Samnium submitted, and Rome held the Apennines.",
    context: "Livy's account of this battle is remarkable for its detail about the Samnite side: a levy summoned under a religious oath administered inside an enclosure hung with linen, with men who refused cut down on the spot. Whether he had a genuine Samnite tradition, an antiquarian source, or a free hand is unresolved — the passage is unusually specific and unusually unverifiable. The battle itself was fought alongside a simultaneous Roman attack on nearby Cominium, so that neither Samnite force could support the other.",
    forces: [
      { side: "Rome", estimate: "A consular army, with a second operating against Cominium", certainty: "probable", note: "The two-pronged attack is the tactical point of the campaign." },
      { side: "The Samnite league", estimate: "A levy raised under oath, the 'Linen Legion' of Livy's account", certainty: "traditional" },
    ],
    casualties: [
      { side: "The Samnite league", estimate: "Livy reports over 20,000 killed or captured across the two actions", certainty: "disputed" },
      { side: "Rome", estimate: "Not reliably preserved", certainty: "disputed" },
    ],
    ancientSourceIds: ["livy-6-10"], modernSourceIds: midItalyModern,
    uncertaintyNotes: ["Aquilonia and Cominium are both unlocated.", "The ritual of the Linen Legion is either a rare glimpse of Samnite practice or a literary invention; the question is open.", "Casualty totals are Livy's and are probably inflated."],
    previousSlug: "sentinum", nextSlug: "heraclea",
  },
  {
    id: "heraclea", slug: "heraclea", name: "Battle of Heraclea", kind: "land", startYear: -280, endYear: -280, displayDate: "280 BCE", location: "Near Heraclea on the Siris, Lucania (modern Policoro)", coordinates: [16.68, 40.18], uncertainty: { radiusKm: 14, certainty: "probable", note: "The battle is fixed to the crossing of the Siris near Heraclea; the field itself is not surveyed." }, major: true,
    belligerents: ["Rome", "Epirus, Tarentum and their allies"], commanders: [{ faction: "rome", names: ["Publius Valerius Laevinus"], certainty: "probable" }, { faction: "epirote", names: ["Pyrrhus of Epirus"], certainty: "attested" }], result: "Epirote victory",
    summary: "Rome's first battle against a Hellenistic army. Pyrrhus held the Romans at the river crossing with his cavalry, ground them with the pike phalanx, and broke them with elephants they had never seen before.",
    significance: "The first time Roman infantry met the Macedonian-style phalanx, and the first time it met elephants. Rome lost, and then did the thing that decided the war: raised another army.",
    context: "Tarentum, unwilling to face Rome with its own levy, hired the ablest professional soldier in the Greek world. Pyrrhus arrived with about 25,000 men and twenty elephants — a proper Hellenistic combined-arms army of pike phalanx, Thessalian heavy cavalry and light troops. He met Laevinus at the Siris, where the fighting turned on the crossing. The infantry contest was closer than either side expected; what ended it was the elephants, against which Roman cavalry horses would not stand. Pyrrhus won and then found he had no way to make Rome talk.",
    forces: [
      { side: "Epirus", estimate: "About 25,000 foot and horse with twenty elephants", certainty: "probable", note: "Plutarch's figures for the expedition; the elephant count is the firmest number in the account." },
      { side: "Rome", estimate: "A consular army of comparable size", certainty: "disputed", note: "No reliable total survives." },
    ],
    casualties: [
      { side: "Rome", estimate: "Reported between 7,000 and 15,000 depending on the source", certainty: "disputed", note: "Dionysius and Hieronymus gave different figures, and Plutarch reports both." },
      { side: "Epirus", estimate: "Reported between 4,000 and 11,000 — heavy for the winner", certainty: "disputed", note: "The losses fell on troops Pyrrhus could not replace in Italy, which is the pattern of the whole war." },
    ],
    ancientSourceIds: pyrrhicAncient, modernSourceIds: pyrrhicModern,
    uncertaintyNotes: ["The casualty figures come through two ancient traditions that disagree by a factor of two.", "Whether the Roman line was broken by the elephants or by the cavalry they panicked is not clear in the sources.", "The story that Pyrrhus, surveying the Roman dead, remarked on their discipline is the kind of anecdote the tradition attaches to admired enemies."],
    previousSlug: "aquilonia", nextSlug: "asculum",
  },
  {
    id: "asculum", slug: "asculum", name: "Battle of Asculum", kind: "land", startYear: -279, endYear: -279, displayDate: "279 BCE", location: "Near Asculum in Apulia (modern Ascoli Satriano)", coordinates: [15.56, 41.2], uncertainty: { radiusKm: 16, certainty: "disputed", note: "The town is known; whether the fighting was on the broken ground by the river or on the plain beyond is the substance of the two accounts." }, major: true,
    belligerents: ["Rome", "Epirus and its Italian allies"], commanders: [{ faction: "rome", names: ["Publius Decius Mus", "Publius Sulpicius Saverrio"], certainty: "probable" }, { faction: "epirote", names: ["Pyrrhus of Epirus"], certainty: "attested" }], result: "Epirote victory, at a cost he could not afford",
    summary: "Pyrrhus beat Rome a second time, over two days and on ground the Romans had chosen to blunt his phalanx. The losses among his own veterans and officers gave the language a phrase for a victory that ruins the winner.",
    significance: "The battle that showed the war was unwinnable for Pyrrhus. Rome could replace an army; he could not replace the men he had brought from Greece, and no Italian recruit could take a place in the phalanx.",
    context: "Rome had learned from Heraclea. The consuls took a position in broken, wooded ground by the river where a pike phalanx could not keep its formation and elephants could not be brought to bear, and they had built anti-elephant devices — carts with spikes and braziers — into their line. Plutarch preserves two accounts: one in which the first day was fought on that ground to Rome's advantage and the second on the open plain to Pyrrhus', and one in which it was a single day's battle. Either way the elephants decided it again, and either way Pyrrhus' casualty list was full of names he needed.",
    forces: [
      { side: "Epirus", estimate: "About 40,000 with Italian allies and nineteen elephants", certainty: "disputed", note: "Larger than at Heraclea because of Samnite, Lucanian and Tarentine contingents." },
      { side: "Rome", estimate: "Four legions with allies, of comparable strength", certainty: "disputed" },
    ],
    casualties: [
      { side: "Rome", estimate: "Reported at about 6,000", certainty: "disputed" },
      { side: "Epirus", estimate: "Reported at about 3,500, including a high proportion of his officers and Greek veterans", certainty: "disputed", note: "The remark attributed to him — that another such victory would finish him — is the origin of the phrase, whether or not he said it." },
    ],
    ancientSourceIds: pyrrhicAncient, modernSourceIds: pyrrhicModern,
    uncertaintyNotes: ["Plutarch reports a one-day and a two-day version of the battle and does not decide between them.", "The Roman anti-elephant carts are described only in the later tradition.", "The famous remark is reported by Plutarch, not by any contemporary."],
    previousSlug: "heraclea", nextSlug: "beneventum",
  },
  {
    id: "beneventum", slug: "beneventum", name: "Battle of Beneventum", kind: "land", startYear: -275, endYear: -275, displayDate: "275 BCE", location: "Near Malventum, Samnium — renamed Beneventum afterwards", coordinates: [14.78, 41.13], uncertainty: { radiusKm: 22, certainty: "disputed", note: "The town is known; the battle site near it is not, and even the outcome is reported differently." }, major: true,
    belligerents: ["Rome", "Epirus and its Italian allies"], commanders: [{ faction: "rome", names: ["Manius Curius Dentatus"], certainty: "probable" }, { faction: "epirote", names: ["Pyrrhus of Epirus"], certainty: "attested" }], result: "Roman success; Pyrrhus withdraws from Italy",
    summary: "Back from Sicily and weaker than when he left, Pyrrhus attempted a night march to surprise a Roman camp, arrived in daylight and disordered, and was fought to a standstill. He returned to Epirus and the war ended.",
    significance: "The end of the first war Rome fought against a Hellenistic power, and the point at which the Greek world had to take Rome seriously. Rome had beaten a professional army by outlasting it.",
    context: "Pyrrhus had spent three years in Sicily against Carthage, taken most of the island, failed at Lilybaeum and lost the goodwill of the Greek cities. He came back to Italy with a diminished army to find Rome stronger and his Italian allies exhausted. The plan at Beneventum was a night approach over wooded hills to fall on a Roman camp before dawn; the columns lost their way, the guides failed, and the force arrived in daylight strung out and visible. In the fighting the elephants — his one arm Rome still feared — were driven back into his own line.",
    forces: [
      { side: "Epirus", estimate: "A reduced army with a small elephant corps", certainty: "disputed", note: "No reliable total; the Sicilian expedition and the Italian garrisons had cost him heavily." },
      { side: "Rome", estimate: "A consular army in a fortified camp", certainty: "probable" },
    ],
    casualties: [
      { side: "Epirus", estimate: "Not reliably preserved; elephants were captured and shown at Rome", certainty: "disputed", note: "Some accounts make the day a draw rather than a defeat, but all agree on what followed." },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
    ],
    ancientSourceIds: pyrrhicAncient, modernSourceIds: pyrrhicModern,
    uncertaintyNotes: ["The sources disagree on whether this was a Roman victory or an indecisive action.", "The site near Beneventum is unlocated.", "The renaming of Malventum to Beneventum is usually connected with the colony of 268 rather than with the battle."],
    previousSlug: "asculum", nextSlug: "tarentum",
  },
  {
    id: "tarentum", slug: "tarentum", name: "Siege of Tarentum", kind: "siege", startYear: -272, endYear: -272, displayDate: "272 BCE", location: "Tarentum (Taranto), on the gulf", coordinates: [17.24, 40.47], uncertainty: { radiusKm: 5, certainty: "attested", note: "The city and its harbour are securely known; the Roman lines are not located." }, major: true,
    belligerents: ["Rome", "Tarentum and its Epirote garrison"], commanders: [{ faction: "rome", names: ["Lucius Papirius Cursor"], certainty: "probable" }, { faction: "epirote", names: ["Milo (garrison commander)"], certainty: "probable" }], result: "Tarentum surrenders",
    summary: "With Pyrrhus gone, Rome besieged the greatest Greek city in Italy. Its Epirote garrison came to terms and marched out, and the city surrendered its walls and its fleet.",
    significance: "The last independent power in peninsular Italy. With Tarentum in, Rome held the whole peninsula and had a war fleet — and the year after next it would cross to Sicily.",
    context: "Tarentum had begun the war by hiring Pyrrhus and ended it holding a garrison it had not asked to keep. Rome invested the city by land while a fleet — Carthaginian, on one account, which would make it the first joint operation of the two powers — appeared offshore. The garrison commander negotiated his own withdrawal to Epirus, and the city, left to itself, accepted terms. Its walls came down, its ships were handed over, and it kept its laws.",
    forces: [
      { side: "Rome", estimate: "A consular army investing the city by land", certainty: "probable" },
      { side: "Tarentum", estimate: "The city levy and an Epirote garrison holding the citadel", certainty: "probable", note: "The garrison's interests and the city's had diverged, which is what decided the siege." },
    ],
    casualties: [
      { side: "Tarentum", estimate: "The city surrendered on terms; its walls were demolished and its fleet handed over", certainty: "probable", note: "It kept its own laws, and the harshness came later, after it defected to Hannibal." },
      { side: "Rome", estimate: "Not preserved; the siege was decided by negotiation rather than assault", certainty: "probable" },
    ],
    ancientSourceIds: ["plutarch-pyrrhus", "livy-periochae", "zonaras-8"], modernSourceIds: pyrrhicModern,
    uncertaintyNotes: ["Livy's narrative for these years survives only in summary, so the detail is thin.", "Whether a Carthaginian fleet took part, and on whose invitation, is disputed.", "The Roman siege works are not located."],
    previousSlug: "beneventum", nextSlug: "messana",
  },
];

// Which era segment each early battle belongs to, matching data/wars.ts.
const EARLY_BATTLE_ERA: Record<string, string> = {
  "lake-regillus": "early-republic",
  veii: "veientine-wars",
  allia: "gallic-crisis",
  vesuvius: "latin-samnite-first",
  trifanum: "latin-samnite-first",
  "caudine-forks": "samnite-second",
  sentinum: "samnite-third",
  aquilonia: "samnite-third",
  heraclea: "pyrrhic-war",
  asculum: "pyrrhic-war",
  beneventum: "pyrrhic-war",
  tarentum: "italian-unification",
};

const firstPunicWar: Battle[] = [
  {
    id: "messana", slug: "messana", name: "Battle of Messana", kind: "land", startYear: -264, endYear: -264, displayDate: "264 BCE", location: "Messana, north-eastern Sicily", coordinates: [15.55, 38.19], uncertainty: { radiusKm: 8, certainty: "probable", note: "The city is secure; the exact battlefield footprint is not." }, major: true,
    belligerents: ["Roman Republic", "Carthage and Syracuse"], commanders: [{ faction: "rome", names: ["Appius Claudius Caudex"], certainty: "attested" }, { faction: "carthage", names: ["Hanno"], certainty: "probable" }], result: "Roman strategic success", summary: "Rome crossed the strait and established itself in Sicily, turning a local dispute into a long Mediterranean war.", significance: "The intervention opened the First Punic War and drew Rome into sustained overseas campaigning.",
    context: "The Mamertines were Campanian mercenaries who had seized Messana a generation earlier. Beaten by Hiero of Syracuse, they appealed to Carthage and to Rome at the same time. Carthage answered first and put a garrison in the citadel. Rome then had to decide whether to intervene on behalf of men who had done in Messana exactly what a Roman garrison had recently been executed for doing at Rhegium — and, in doing so, to face Carthage. Polybius says the senate could not bring itself to vote and the matter went to the people, who voted for war.",
    forces: [
      { side: "Rome", estimate: "Two legions under the consul Appius Claudius Caudex", certainty: "probable", note: "Rome had no fleet; the crossing depended on allied and requisitioned shipping." },
      { side: "Carthage", estimate: "A garrison in Messana and a field force under Hanno, with a squadron in the strait", certainty: "probable" },
      { side: "Syracuse", estimate: "Hiero II's army, besieging the city on its own account", certainty: "probable", note: "Carthage and Syracuse were allies of convenience and did not act together for long." },
    ],
    casualties: [
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
      { side: "Carthage", estimate: "Not preserved; the sources record withdrawal rather than losses", certainty: "disputed", note: "The Carthaginian commander in the strait was reportedly executed at home for letting the crossing happen." },
    ],
    ancientSourceIds: ["polybius-1", "diodorus-23"], modernSourceIds: commonModern, uncertaintyNotes: ["Accounts compress multiple confrontations around Messana.", "Exact troop movements shown on the atlas are schematic."], previousSlug: "tarentum", nextSlug: "agrigentum"
  },
  {
    id: "agrigentum", slug: "agrigentum", name: "Siege of Agrigentum", kind: "siege", startYear: -262, endYear: -261, displayDate: "262–261 BCE", location: "Akragas (Agrigento), southern Sicily", coordinates: [13.58, 37.31], uncertainty: { radiusKm: 6, certainty: "probable", note: "The urban location is known; siege works and field actions are not precisely located." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Lucius Postumius Megellus", "Quintus Mamilius Vitulus"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal Gisco", "Hanno"], certainty: "probable" }], result: "Roman victory", summary: "A prolonged siege and relief battle ended with Roman capture of the major Carthaginian base at Akragas.", significance: "The victory showed that Rome intended to contest control of Sicily rather than merely protect Messana.",
    context: "With Messana held and Hiero of Syracuse changed over to the Roman side, Rome stopped defending an ally and started trying to take the island. Akragas was the largest Carthaginian base in Sicily and full of people who had come in from the countryside. Both consuls came against it with their armies and stayed for the better part of a year — Rome's first long siege, and the first time it kept two armies supplied overseas through a winter. When Hanno cut the supply line the besiegers went as hungry as the besieged.",
    forces: [
      { side: "Rome", estimate: "Both consular armies, on the order of 40,000 men", certainty: "probable", note: "Inferred from the establishment of four legions with allies, not reported directly." },
      { side: "Carthage", estimate: "A garrison under Hannibal Gisco, and later a relief army under Hanno with elephants and Numidian cavalry", certainty: "probable", note: "The relief force is the first appearance of elephants against Rome in this war." },
    ],
    casualties: [
      { side: "Rome", estimate: "Heavy from disease and hunger over the winter rather than in the fighting", certainty: "disputed" },
      { side: "Carthage", estimate: "The relief army broken; the garrison escaped intact", certainty: "attested", note: "The city's people were sold into slavery — Diodorus gives 25,000 — which cost Rome Sicilian sympathy for years." },
    ],
    ancientSourceIds: ["polybius-1", "diodorus-23"], modernSourceIds: commonModern, uncertaintyNotes: ["The sequence and geography of the relief battle remain reconstructed."], previousSlug: "messana", nextSlug: "mylae"
  },
  {
    id: "mylae", slug: "mylae", name: "Battle of Mylae", kind: "naval", startYear: -260, endYear: -260, displayDate: "260 BCE", location: "Waters off Mylae (modern Milazzo), Sicily", coordinates: [15.23, 38.29], uncertainty: { radiusKm: 18, certainty: "probable", note: "The general coastal setting is accepted; the precise battle area is unknown." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Duilius"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal Gisco"], certainty: "attested" }], result: "Roman victory", summary: "Rome won its first major naval victory after converting boarding skill into an advantage at sea, traditionally associated with the corvus boarding bridge.", significance: "Mylae proved that Carthaginian seamanship did not make naval resistance futile and changed the strategic possibilities of the war.",
    context: "After the loss of the first Roman naval detachment near the Lipari Islands, the consul Gaius Duilius took command. Polybius describes a Roman fleet newly equipped for boarding against a more experienced Carthaginian force. The encounter belongs to Rome’s rapid, risky expansion into naval warfare.",
    forces: [
      { side: "Rome", estimate: "Approximately 100–120 ships in modern reconstructions", certainty: "disputed", note: "Ancient figures and the fleet’s exact composition are debated." },
      { side: "Carthage", estimate: "Approximately 120–130 ships often inferred", certainty: "disputed", note: "Not a secure order of battle." },
    ],
    casualties: [
      { side: "Rome", estimate: "Not reliably preserved", certainty: "disputed" },
      { side: "Carthage", estimate: "Polybius reports about 50 ships captured or sunk", certainty: "probable", note: "The conventional total depends on the transmitted narrative." },
    ],
    moments: [
      { title: "Fleets make contact", description: "The Carthaginian vanguard approached confidently, apparently expecting Roman crews to be vulnerable in conventional maneuver.", certainty: "probable" },
      { title: "Boarding devices deployed", description: "Roman boarding bridges fastened enemy vessels and turned close contact into infantry combat. Their exact construction and handling remain debated.", certainty: "attested" },
      { title: "Carthaginian counter-maneuver", description: "Following ships attempted attacks from the sides and stern, but more vessels were caught in boarding actions.", certainty: "probable" },
      { title: "Withdrawal", description: "The surviving Carthaginian fleet broke contact; Rome retained the field and celebrated Duilius with a triumph.", certainty: "attested" },
    ],
    ancientSourceIds: ["polybius-1", "zonaras-8"], modernSourceIds: ["lazenby-1996", "hoyos-2015", "rankov-2011"], uncertaintyNotes: ["No exact battle track survives.", "The form, universality, and later use of the corvus are debated.", "Ship totals are literary estimates, not audited fleet records.", "The map coordinate is a representative point offshore."], previousSlug: "agrigentum", nextSlug: "sulci"
  },
  {
    id: "sulci", slug: "sulci", name: "Battle of Sulci", kind: "naval", startYear: -258, endYear: -258, displayDate: "c. 258 BCE", location: "Waters near Sulci, south-west Sardinia", coordinates: [8.42, 39.08], uncertainty: { radiusKm: 35, certainty: "disputed", note: "Ancient testimony is brief and the precise location is not known." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Sulpicius Paterculus"], certainty: "probable" }, { faction: "carthage", names: ["Hannibal Gisco"], certainty: "probable" }], result: "Roman victory", summary: "A poorly documented Roman naval success off Sardinia.", significance: "The action widened the maritime theater beyond Sicily.", ancientSourceIds: ["zonaras-8"], modernSourceIds: commonModern, uncertaintyNotes: ["Date, scale, and exact location require scholarly review."], previousSlug: "mylae", nextSlug: "tyndaris"
  },
  {
    id: "tyndaris", slug: "tyndaris", name: "Battle of Tyndaris", kind: "naval", startYear: -257, endYear: -257, displayDate: "257 BCE", location: "Waters off Tyndaris, northern Sicily", coordinates: [15.05, 38.14], uncertainty: { radiusKm: 18, certainty: "probable", note: "Representative offshore point; precise positions are unknown." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Atilius Regulus"], certainty: "attested" }, { faction: "carthage", names: ["Unknown"], certainty: "disputed" }], result: "Inconclusive or limited Roman success", summary: "An improvised naval engagement in which the Roman consul’s advance squadron was nearly cut off before the main fleet arrived.", significance: "The clash illustrates the risks of command and formation in ancient fleet actions.",
    context: "Three years after Mylae, Rome had ships and captains but not yet the habit of handling a fleet as a fleet. From the shore at Tyndaris the consul saw the Carthaginians sailing past in no order, and put to sea to take the opportunity — with the ten ships that were ready, ahead of the rest. The Carthaginians, disorderly but experienced, turned on the isolated squadron and nearly destroyed it. The lesson was about formation, not courage, and Rome learned it in time for Ecnomus the following year.",
    forces: [
      { side: "Rome", estimate: "The consular fleet, with a leading squadron of ten ships", certainty: "probable", note: "The total is not given; only the ten that sailed first are counted in the account." },
      { side: "Carthage", estimate: "A fleet of unrecorded size, sailing without formation", certainty: "disputed", note: "The commander is not named in the surviving accounts." },
    ],
    casualties: [
      { side: "Rome", estimate: "Nine of the ten leading ships sunk or taken", certainty: "probable", note: "The consul's own ship escaped." },
      { side: "Carthage", estimate: "Eight ships sunk and ten captured once the main Roman body came up", certainty: "probable" },
    ],
    ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["The outcome is characterized differently in modern summaries."], previousSlug: "sulci", nextSlug: "cape-ecnomus"
  },
  {
    id: "cape-ecnomus", slug: "cape-ecnomus", name: "Battle of Cape Ecnomus", kind: "naval", startYear: -256, endYear: -256, displayDate: "256 BCE", location: "Off southern Sicily near Ecnomus", coordinates: [13.24, 37.1], uncertainty: { radiusKm: 35, certainty: "disputed", note: "The coastal association is strong, but the enormous battle’s precise position and geometry are reconstructed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Marcus Atilius Regulus", "Lucius Manlius Vulso Longus"], certainty: "attested" }, { faction: "carthage", names: ["Hamilcar", "Hanno"], certainty: "attested" }], result: "Roman victory", summary: "A vast fleet engagement cleared the way for Rome’s invasion of North Africa.", significance: "The victory projected Roman power across the sea and created the war’s most serious direct threat to Carthage.",
    context: "Rome had decided to carry the war to Africa, which meant getting an army across open sea past a fleet that intended to stop it. The Roman armada therefore sailed as a convoy — warships towing the horse transports — and adopted a wedge formation that made it hard to break into but almost impossible to manoeuvre. Carthage extended a long line to overlap and envelop it. On Polybius’ figures this was among the largest naval battles ever fought anywhere; whether his figures can be believed is another matter.",
    forces: [
      { side: "Rome", estimate: "About 330 decked warships with the transports, in Polybius", certainty: "disputed", note: "Polybius’ implied total of some 140,000 men aboard is widely thought inflated." },
      { side: "Carthage", estimate: "About 350 ships, in Polybius", certainty: "disputed", note: "No independent check on either total exists." },
    ],
    casualties: [
      { side: "Carthage", estimate: "Polybius reports about 30 ships sunk and 64 taken", certainty: "probable", note: "The ratio, rather than the absolute number, is what the tradition is confident about." },
      { side: "Rome", estimate: "About 24 ships lost", certainty: "probable", note: "The fleet remained able to continue to Africa, which the figure has to be consistent with." },
    ],
    ancientSourceIds: commonAncient, modernSourceIds: [...commonModern, "rankov-2011"], uncertaintyNotes: ["Ancient ship and personnel totals may be exaggerated.", "Published tactical diagrams are interpretations of Polybius."], previousSlug: "tyndaris", nextSlug: "africa-invasion"
  },
  {
    id: "africa-invasion", slug: "africa-invasion", name: "Roman invasion of Africa", kind: "campaign", startYear: -256, endYear: -255, displayDate: "256–255 BCE", location: "Cap Bon and Carthaginian hinterland", coordinates: [10.8, 36.75], uncertainty: { radiusKm: 70, certainty: "disputed", note: "This marker summarizes a broad campaign rather than one event site." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Marcus Atilius Regulus"], certainty: "attested" }, { faction: "carthage", names: ["Multiple commanders"], certainty: "probable" }], result: "Initial Roman gains; eventual Roman defeat", summary: "Roman forces landed near Aspis and campaigned inland before the expedition collapsed in 255 BCE.", significance: "The campaign came close to forcing terms but ultimately exposed the hazards of sustaining an army overseas.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Campaign routes and several place identifications are disputed."], previousSlug: "cape-ecnomus", nextSlug: "adys"
  },
  {
    id: "adys", slug: "adys", name: "Battle of Adys", kind: "land", startYear: -255, endYear: -255, displayDate: "255 BCE", location: "Adys, traditionally placed near Uthina, Tunisia", coordinates: [10.47, 36.55], uncertainty: { radiusKm: 35, certainty: "disputed", note: "The ancient toponym has no universally accepted modern identification." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Marcus Atilius Regulus"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal", "Bostar", "Hamilcar"], certainty: "probable" }], result: "Roman victory", summary: "Roman troops attacked a Carthaginian position in terrain that limited cavalry and elephants.", significance: "The victory brought Regulus closer to Carthage and opened negotiations.",
    context: "Regulus had landed on Cap Bon and was campaigning inland with the smaller half of the invasion force, the fleet and much of the army having gone home. The Carthaginian commanders, beaten in the open the previous autumn, took up a position on a hill instead — safe from attack, and useless, because on that ground their cavalry and their elephants could not be used at all. Adys is the mirror image of the Bagradas six months later, and the two together are the clearest paired demonstration in the war of what choice of ground decides.",
    forces: [
      { side: "Rome", estimate: "The remainder of the invasion force, roughly 15,000 foot with very little cavalry", certainty: "disputed", note: "Most of the fleet and half the army had returned to Italy after the landing." },
      { side: "Carthage", estimate: "A field army with cavalry and elephants, encamped on high ground", certainty: "probable", note: "Numbers are not given; the composition is the point." },
    ],
    casualties: [
      { side: "Carthage", estimate: "The mercenary infantry cut up; the cavalry and elephants escaped without loss", certainty: "probable" },
      { side: "Rome", estimate: "Not preserved; one of the two columns was driven back downhill before the action turned", certainty: "disputed" },
    ],
    ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["The location and tactical reconstruction remain disputed."], previousSlug: "africa-invasion", nextSlug: "bagradas"
  },
  {
    id: "bagradas", slug: "bagradas", name: "Battle of the Bagradas River", kind: "land", startYear: -255, endYear: -255, displayDate: "255 BCE", location: "Bagradas valley near Tunis", coordinates: [10.23, 36.76], uncertainty: { radiusKm: 30, certainty: "disputed", note: "Multiple sites on the lower river plain have been proposed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Marcus Atilius Regulus"], certainty: "attested" }, { faction: "carthage", names: ["Xanthippus"], certainty: "attested" }], result: "Decisive Carthaginian victory", summary: "Carthaginian cavalry, elephants, and infantry defeated Regulus’ army on open ground.", significance: "The defeat ended Rome’s African invasion and prolonged the war.",
    context: "Regulus had beaten a Carthaginian army at Adys and then offered terms so harsh that Carthage chose to fight on. It hired a Spartan officer, Xanthippus, who pointed out that Carthage had been losing on ground that suited Roman infantry and would keep losing until it fought where its cavalry and its elephants could be used. Carthage gave him the army and he took it out onto the plain. The battle is the clearest case in the war of a defeat caused by choice of ground.",
    forces: [
      { side: "Rome", estimate: "Roughly 15,000 foot and 500 horse", certainty: "disputed", note: "What was left of the expedition after garrisons and the fleet’s departure; the cavalry shortage is the significant part." },
      { side: "Carthage", estimate: "About 12,000 foot, 4,000 horse and 100 elephants, in Polybius", certainty: "probable", note: "Fewer infantry than Rome, and eight times the cavalry." },
    ],
    casualties: [
      { side: "Rome", estimate: "The army destroyed; about 2,000 reached Aspis and some 500 were taken with Regulus", certainty: "disputed", note: "Regulus died in captivity; the tradition of his torture is later and hostile." },
      { side: "Carthage", estimate: "Reported as light, concentrated in the one unit the Roman right broke", certainty: "probable" },
    ],
    ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Force and casualty numbers come through literary transmission.", "Battlefield placement is approximate."], previousSlug: "adys", nextSlug: "panormus"
  },
  {
    id: "panormus", slug: "panormus", name: "Battle of Panormus", kind: "land", startYear: -250, endYear: -250, displayDate: "250 BCE", location: "Outside Panormus (Palermo), Sicily", coordinates: [13.34, 38.1], uncertainty: { radiusKm: 12, certainty: "probable", note: "The city is secure; the battlefield’s exact extent is unknown." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Lucius Caecilius Metellus"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal"], certainty: "attested" }], result: "Roman victory", summary: "A Roman defense near Panormus repelled Carthaginian forces and captured elephants.", significance: "The result strengthened Roman control of northern Sicily and reduced the psychological impact of Carthaginian elephants.",
    context: "Since the Bagradas, Roman commanders in Sicily had avoided the open field wherever elephants were present, and the war had stalled because of it. Hasdrubal brought a large force with an elephant corps up to the country round Panormus at harvest time to provoke a battle. Metellus fought the one action of the war designed specifically to beat elephants: he kept his heavy infantry inside the walls and used the ditch in front of them as cover for light troops who could shoot at the animals and not be caught by them.",
    forces: [
      { side: "Rome", estimate: "Two legions with their light troops, inside and behind the city defences", certainty: "probable", note: "Roman strength is inferred from the consular establishment, not reported." },
      { side: "Carthage", estimate: "A field army with a large elephant corps; totals in the tradition run from 30,000 men and 60 elephants upward", certainty: "disputed", note: "The elephant numbers vary widely between sources." },
    ],
    casualties: [
      { side: "Carthage", estimate: "Heavy; the elephant corps lost entire", certainty: "probable", note: "Polybius has ten taken with their drivers in the action and the rest rounded up loose afterwards; the number later exhibited at Rome is given as anything from 100 to 142." },
      { side: "Rome", estimate: "Not preserved, and by the design of the action probably slight", certainty: "disputed" },
    ],
    ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["The detailed use of terrain and missiles is reconstructed from literary narrative."], previousSlug: "bagradas", nextSlug: "lilybaeum"
  },
  {
    id: "lilybaeum", slug: "lilybaeum", name: "Siege of Lilybaeum", kind: "siege", startYear: -250, endYear: -241, displayDate: "250–241 BCE", location: "Lilybaeum (Marsala), western Sicily", coordinates: [12.43, 37.8], uncertainty: { radiusKm: 6, certainty: "probable", note: "The city location is known; individual siege works and harbor actions are generalized." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Changing annual commands"], certainty: "attested" }, { faction: "carthage", names: ["Himilco"], certainty: "attested" }], result: "Carthage held the city until the peace settlement", summary: "Rome maintained a long, difficult siege while Carthaginian blockade-runners kept the port connected.", significance: "The stalemate made command of the surrounding sea decisive to the war’s conclusion.",
    context: "Lilybaeum was the best harbour in western Sicily and the last serious Carthaginian base on the island. Rome besieged it for nine years and never took it. That failure is the most instructive thing in the war: a city with an open port cannot be starved, so the siege was really a contest for the sea outside it, which is why the war was finally decided at the Aegates and not at any wall. Lilybaeum passed to Rome in 241 under the peace treaty, with its garrison marching out under terms.",
    forces: [
      { side: "Rome", estimate: "Both consular armies at the outset, with a fleet of some 200 ships; thereafter changing annual commands", certainty: "probable", note: "The besieging force varied greatly over nine years and no single figure describes it." },
      { side: "Carthage", estimate: "A garrison under Himilco with about 10,000 mercenaries, resupplied by sea", certainty: "probable", note: "Reinforcement by blockade-runner is what made the defence sustainable." },
    ],
    casualties: [
      { side: "Rome", estimate: "Not separable from the wider war; the siege works were destroyed by fire at least once", certainty: "disputed" },
      { side: "Carthage", estimate: "The city was never stormed and the garrison surrendered by treaty in 241", certainty: "attested" },
    ],
    ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["The nine-year siege contained many distinct operations not yet represented individually."], previousSlug: "panormus", nextSlug: "drepana"
  },
  {
    id: "drepana", slug: "drepana", name: "Battle of Drepana", kind: "naval", startYear: -249, endYear: -249, displayDate: "249 BCE", location: "Harbor approaches at Drepana (Trapani)", coordinates: [12.49, 38.03], uncertainty: { radiusKm: 12, certainty: "probable", note: "The harbor setting is secure; ship-by-ship positions are unknowable." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Claudius Pulcher"], certainty: "attested" }, { faction: "carthage", names: ["Adherbal"], certainty: "attested" }], result: "Decisive Carthaginian victory", summary: "A Roman surprise attack lost cohesion in the confined approaches, allowing Adherbal to deploy at sea and trap the fleet against the coast.", significance: "Rome’s worst naval defeat of the war delayed a return to fleet operations for years.",
    context: "The siege of Lilybaeum was going nowhere and the new consul, Publius Claudius Pulcher, decided to break the deadlock by catching the Carthaginian fleet at its moorings in Drepana. The plan required a night approach and a fleet in column arriving in order through a confined channel, which is a great deal to ask of crews that had spent the year on blockade duty. Adherbal did not stay to be trapped. The famous story that Pulcher threw the sacred chickens overboard is a later moral about impiety; Polybius blames the plan.",
    forces: [
      { side: "Rome", estimate: "Roughly 120 ships drawn from the blockade squadrons", certainty: "disputed", note: "Crews were part-trained and the fleet had been on station rather than exercising." },
      { side: "Carthage", estimate: "About 100 ships under Adherbal, and better handled", certainty: "disputed" },
    ],
    casualties: [
      { side: "Rome", estimate: "93 of about 120 ships lost", certainty: "probable", note: "The consul escaped with the remainder; the loss of trained seamen mattered more than the hulls." },
      { side: "Carthage", estimate: "Polybius records no Carthaginian ship lost", certainty: "disputed", note: "A clean result of that kind is the sort of claim a defeated tradition would not invent, but it cannot be checked." },
    ],
    ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Tactical diagrams are modern interpretations.", "Anecdotes about auspices do not establish operational causation."], previousSlug: "lilybaeum", nextSlug: "aegates"
  },
  {
    id: "aegates", slug: "aegates", name: "Battle of the Aegates Islands", kind: "naval", startYear: -241, endYear: -241, displayDate: "10 March 241 BCE (traditional)", location: "Aegates Islands, western Sicily", coordinates: [11.93, 37.97], uncertainty: { radiusKm: 22, certainty: "disputed", note: "Archaeological finds refine the battle zone, but the action’s full extent remains under study." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Lutatius Catulus", "Quintus Valerius Falto"], certainty: "attested" }, { faction: "carthage", names: ["Hanno"], certainty: "attested" }], result: "Decisive Roman victory", summary: "A rebuilt Roman fleet intercepted a Carthaginian relief convoy and won the battle that ended the war.", significance: "Carthage sought peace, evacuated Sicily, and accepted Roman terms.",
    context: "After Drepana Rome had no fleet and, officially, no money for one. The ships that fought at the Aegates were paid for by private subscription from wealthy citizens on the understanding that they would be repaid only if the war was won — a measure that says more about Roman staying power than any battle does. The new fleet was trained rather than improvised. Hanno’s task was to get supplies to Hamilcar’s army in western Sicily, so his ships sailed loaded, meaning to unload before fighting. Catulus did not let him.",
    forces: [
      { side: "Rome", estimate: "About 200 quinqueremes, newly built and worked up", certainty: "probable", note: "Funded by private loan; the crews had been exercised through the winter." },
      { side: "Carthage", estimate: "Around 250 ships, sailing laden with supplies and reinforcements", certainty: "disputed", note: "Loaded hulls handled badly, which is the tactical fact the battle turned on." },
    ],
    casualties: [
      { side: "Carthage", estimate: "Polybius reports 50 sunk and 70 captured with their crews", certainty: "probable", note: "Rams, helmets and amphorae recovered from the sea bed off Levanzo since 2010 belong to this action." },
      { side: "Rome", estimate: "Not reliably preserved; the fleet remained in being", certainty: "disputed" },
    ],
    ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["New underwater archaeology continues to change understanding of the engagement area.", "The plotted point is representative, not definitive."], previousSlug: "drepana"
  },
];

const secondPunicWar: Battle[] = [
  {
    id: "saguntum", slug: "saguntum", name: "Siege of Saguntum", kind: "siege", startYear: -219, endYear: -219, displayDate: "219 BCE", location: "Saguntum (Sagunto), eastern Iberia", coordinates: [-0.2735, 39.6766], uncertainty: { radiusKm: 5, certainty: "probable", note: "The city site is secure; individual siege works are not located." }, major: true,
    belligerents: ["Saguntum (allied to Rome)", "Carthage"], commanders: [{ faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Carthaginian capture after a months-long siege", summary: "Hannibal stormed a city allied to Rome, precipitating the Roman declaration of war.", significance: "The assault gave Rome its casus belli and opened the Second Punic War.",
    context: "Saguntum lay south of the Ebro, in the part of Iberia the treaty with Hasdrubal had left to Carthage, and had put itself under Roman protection anyway. Whether attacking it broke the treaty is the central legal question of the war's origin, and it was already disputed in antiquity. What is not disputed is what Rome did about it: it sent embassies, it did not send an army, and Saguntum held out for months and fell. Only after the city was gone did Rome demand Hannibal's surrender and, refused, declare war.",
    forces: [
      { side: "Carthage", estimate: "Hannibal's field army with a full siege train — sheds, rams, mines and a movable tower", certainty: "probable", note: "Totals are not given; Livy stresses the scale of the engineering." },
      { side: "Saguntum", estimate: "The city's own citizens and mercenaries, without Roman troops", certainty: "attested", note: "No relief force of any kind arrived." },
    ],
    casualties: [
      { side: "Saguntum", estimate: "The defenders killed or enslaved; the tradition has the survivors destroying their own property first", certainty: "disputed", note: "The mass-suicide detail belongs to a genre of siege narrative and cannot be verified." },
      { side: "Carthage", estimate: "Heavy over the whole siege; Hannibal himself was wounded in the thigh during an early assault", certainty: "probable" },
    ],
    ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The precise length and chronology of the siege are debated.", "Whether Saguntum lay inside or outside the Ebro treaty line is disputed."], nextSlug: "alps-crossing"
  },
  {
    id: "alps-crossing", slug: "alps-crossing", name: "Hannibal’s crossing of the Alps", kind: "campaign", startYear: -218, endYear: -218, displayDate: "late 218 BCE", location: "Western Alps (exact pass disputed)", coordinates: [6.95, 45.08], uncertainty: { radiusKm: 60, certainty: "disputed", note: "No proposed pass commands scholarly consensus; this marker summarizes a long route." }, major: true,
    belligerents: ["Carthage", "Alpine Gallic peoples"], commanders: [{ faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "The army reaches Italy after heavy losses", summary: "Hannibal led a mixed army, with elephants, over the Alps into the Po valley in late 218, absorbing severe losses to weather, terrain, and hostile tribes.", significance: "The march carried the war into Italy itself and made Hannibal a direct threat to Rome for over a decade.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The identity of the pass (Traversette, Clapier, Mont Cenis, and others) is unresolved.", "Ancient casualty and elephant figures are literary estimates.", "The plotted point represents the crossing, not one location."], previousSlug: "saguntum", nextSlug: "ticinus"
  },
  {
    id: "ticinus", slug: "ticinus", name: "Battle of the Ticinus", kind: "land", startYear: -218, endYear: -218, displayDate: "November 218 BCE", location: "Near the river Ticinus, north of the Po", coordinates: [8.95, 45.28], uncertainty: { radiusKm: 20, certainty: "disputed", note: "A cavalry skirmish whose exact site is not fixed." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (the elder)"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Carthaginian cavalry victory", summary: "A cavalry and light-troop clash in which the consul Scipio was wounded and Roman forces withdrew across the Po.", significance: "The first Italian engagement revealed Carthaginian superiority in cavalry and set the pattern of the campaign.",
    context: "Publius Scipio had sailed for Iberia, learned that Hannibal was already across the Rhône, sent his army on under his brother and turned back to northern Italy himself to take command of the forces there. The two commanders came forward to see each other's strength, and what looked like a reconnaissance became a fight. It was small, and it settled the shape of the war in Italy: Hannibal's cavalry was better and there was more of it, so Rome could not stand in the open plain of the Po. Its immediate effect was that the Gauls of the region decided Hannibal was worth joining.",
    forces: [
      { side: "Rome", estimate: "Roman and allied cavalry with javelin-men screening them", certainty: "probable", note: "Numbers are not given for either side; both were reconnaissance forces, not armies." },
      { side: "Carthage", estimate: "Close-order Iberian and Celtic horse in the centre with Numidians on the wings, unscreened", certainty: "probable" },
    ],
    casualties: [
      { side: "Rome", estimate: "The light troops badly cut up; the consul wounded", certainty: "attested", note: "Rome abandoned the north bank of the Po within days, which is the real measure of the result." },
      { side: "Carthage", estimate: "Not preserved, and reported as slight", certainty: "disputed" },
    ],
    ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["Sources compress the maneuvering around the Po.", "The engagement’s scale is modest and imprecisely located."], previousSlug: "alps-crossing", nextSlug: "trebia"
  },
  {
    id: "trebia", slug: "trebia", name: "Battle of the Trebia", kind: "land", startYear: -218, endYear: -218, displayDate: "December 218 BCE", location: "West of Placentia (Piacenza), by the river Trebia", coordinates: [9.66, 44.99], uncertainty: { radiusKm: 12, certainty: "probable", note: "The river setting is accepted; the battle line is reconstructed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Tiberius Sempronius Longus"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Decisive Carthaginian victory", summary: "Hannibal drew a cold, hungry Roman army across the river and broke it with a concealed flanking force under his brother Mago.", significance: "Rome’s first major defeat of the war and an early model of Hannibal’s use of terrain and ambush.",
    context: "Publius Scipio was wounded at the Ticinus, so the decision fell to his colleague Sempronius Longus, recalled from Sicily, whose year of office was nearly over and who wanted a victory in it. Hannibal, who needed the Gauls of the Po valley to commit to him and could only earn that with a win, wanted the same battle. He got it on his own terms: the Romans were provoked into fording an icy river before they had eaten, and a picked force under Mago was already hidden in a watercourse on their flank.",
    forces: [
      { side: "Rome", estimate: "Around 40,000, four legions with allied contingents and Gallic cavalry", certainty: "disputed", note: "The two consular armies had just combined; some of the Gallic horse deserted during the battle." },
      { side: "Carthage", estimate: "Around 20,000 foot and 10,000 horse, with the surviving elephants", certainty: "disputed", note: "Half the Roman numbers in infantry and far stronger in cavalry — the pattern of the whole Italian campaign." },
    ],
    casualties: [
      { side: "Rome", estimate: "Most of the army; about 10,000 cut their way out to Placentia", certainty: "disputed", note: "The breakout is the best-attested part and is why Rome still had a field force in the spring." },
      { side: "Carthage", estimate: "Light among the Africans and Iberians, heavy among the Gauls", certainty: "probable", note: "All but one of the elephants died in the following weeks of cold rather than in the battle." },
    ],
    ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The bank on which the main action was fought is debated.", "Casualty totals derive from literary narrative."], previousSlug: "ticinus", nextSlug: "trasimene"
  },
  {
    id: "trasimene", slug: "trasimene", name: "Battle of Lake Trasimene", kind: "land", startYear: -217, endYear: -217, displayDate: "June 217 BCE", location: "Northern shore of Lake Trasimene, near Tuoro", coordinates: [12.10, 43.25], uncertainty: { radiusKm: 8, certainty: "probable", note: "The lakeside defile is accepted; the exact ambush frontage is reconstructed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Flaminius"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Decisive Carthaginian victory", summary: "Hannibal ambushed the marching army of the consul Flaminius in morning mist along the lake shore, destroying it; Flaminius was killed.", significance: "One of the largest ambushes in ancient warfare; it opened the road toward Rome and led to the dictatorship of Fabius Maximus.",
    context: "Hannibal crossed the Apennines in spring, slipped past the consular army waiting at Arretium, and began burning his way through Etruria in front of it — a deliberate provocation aimed at a commander known to be politically committed to fighting. Flaminius followed hard, without waiting for his colleague and without scouting the ground ahead. Between the hills and the northern shore of the lake the road ran through a defile with one entrance and one exit. Hannibal held both, put his army along the heights in the night, and waited for the mist to come up off the water.",
    forces: [
      { side: "Rome", estimate: "Around 25,000: two legions with allied contingents, on the march in column", certainty: "disputed", note: "The formation matters more than the total — the army was never able to form a line of battle." },
      { side: "Carthage", estimate: "Around 50,000 after the Alps, the winter and the Gallic recruits", certainty: "disputed" },
    ],
    casualties: [
      { side: "Rome", estimate: "About 15,000 killed, including Flaminius; some 6,000 of the vanguard broke out and surrendered the next day", certainty: "disputed", note: "Numbers were drowned in the shallows; the figures come from Livy and Polybius and differ." },
      { side: "Carthage", estimate: "Between 1,500 and 2,500, mostly Gauls on the downhill charge", certainty: "disputed" },
    ],
    ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The precise line of the Roman column and the killing ground are reconstructed from the terrain.", "Reported Roman losses come through the literary tradition."], previousSlug: "trebia", nextSlug: "cannae"
  },
  {
    id: "cannae", slug: "cannae", name: "Battle of Cannae", kind: "land", startYear: -216, endYear: -216, displayDate: "2 August 216 BCE (traditional)", location: "Near Cannae on the Aufidus (Ofanto) river, Apulia", coordinates: [16.132, 41.306], uncertainty: { radiusKm: 10, certainty: "probable", note: "The general locality is accepted; the bank and orientation of the line remain debated." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Lucius Aemilius Paullus", "Gaius Terentius Varro"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Decisive Carthaginian victory", summary: "Hannibal enveloped a much larger Roman army with a deliberately yielding center and encircling wings, destroying it almost entirely.", significance: "Rome’s worst battlefield defeat and the classic example of double envelopment; yet Rome refused terms and the war went on.",
    context: "After Trasimene, Rome raised an exceptionally large consular army—ancient sources suggest around eight legions with their allies—and set aside Fabian caution to force a decision. Polybius’ narrative underlies most reconstructions of the encirclement.",
    forces: [
      { side: "Rome", estimate: "Around 80,000 foot and 6,000 horse in the ancient tradition", certainty: "disputed", note: "Modern estimates vary and may be lower." },
      { side: "Carthage", estimate: "Around 40,000 foot and 10,000 horse", certainty: "disputed", note: "The mix of Libyan, Iberian, Gallic, and Numidian troops is better attested than the exact totals." },
    ],
    casualties: [
      { side: "Rome", estimate: "Tens of thousands killed or captured in the sources", certainty: "disputed", note: "Polybius and Livy give differing, very high figures." },
      { side: "Carthage", estimate: "Comparatively light losses reported", certainty: "disputed" },
    ],
    moments: [
      { title: "Advancing crescent", description: "Hannibal pushed his Gallic and Iberian center forward, inviting the Roman mass to drive into it.", certainty: "attested" },
      { title: "The center yields", description: "Under pressure the center fell back in order, drawing the deep Roman formation inward.", certainty: "probable" },
      { title: "Cavalry clears the flanks", description: "Heavy and Numidian horse drove off the Roman cavalry, then returned toward the Roman rear.", certainty: "probable" },
      { title: "Encirclement", description: "African infantry on the wings turned inward while the returning cavalry closed the ring.", certainty: "attested" },
    ],
    ancientSourceIds: ["polybius-3", "livy-21-30"], modernSourceIds: ["lazenby-1978", "goldsworthy-2000"], uncertaintyNotes: ["Whether the line stood on the left or right bank of the Aufidus is disputed.", "The very high casualty figures are literary and not independently verifiable.", "Exact army sizes are debated."], previousSlug: "trasimene", nextSlug: "syracuse"
  },
  {
    id: "syracuse", slug: "syracuse", name: "Siege of Syracuse", kind: "siege", startYear: -213, endYear: -212, displayDate: "213–212 BCE", location: "Syracuse, south-eastern Sicily", coordinates: [15.293, 37.06], uncertainty: { radiusKm: 5, certainty: "probable", note: "The city, its harbours and the Epipolae wall circuit are well established archaeologically; where the Romans got over the wall is less securely placed." }, major: true,
    belligerents: ["Roman Republic", "Syracuse, with Carthaginian support"], commanders: [{ faction: "rome", names: ["Marcus Claudius Marcellus", "Appius Claudius Pulcher"], certainty: "attested" }, { faction: "syracuse", names: ["Hippocrates", "Epicydes"], certainty: "attested" }, { faction: "carthage", names: ["Himilco", "Bomilcar"], certainty: "probable" }], result: "Roman capture and sack of the city", summary: "Rome's assault on Syracuse was stopped outright by the defensive engines Archimedes had built; the city fell two years later to a night escalade, plague and betrayal rather than to force.",
    significance: "The loss of Syracuse ended the independence of the greatest Greek city of the west, closed Sicily as a Carthaginian option, and left Rome holding the whole island for the first time.",
    context: "Hiero II had been Rome's ally for fifty years. On his death in 215 his young successor Hieronymus turned to Carthage, and after his murder the anti-Roman party under Hippocrates and Epicydes took the city. Marcellus attacked in 213 with both an army against the landward wall on the Epipolae plateau and a fleet against the sea wall, carrying ladder-ships lashed in pairs. Neither got near. Archimedes had spent years fitting the circuit with catapults graded to every range and cranes that could lift a ship by the bow, and the assault was called off. What followed was two years of blockade in which disease killed more men on both sides than fighting did.",
    forces: [
      { side: "Rome", estimate: "Two legions with a fleet of sixty quinqueremes under Marcellus", certainty: "probable", note: "Livy's figures for the initial assault; the blockading force afterwards was smaller." },
      { side: "Syracuse", estimate: "The city levy and mercenaries behind a wall circuit some 27 km long, fitted with Archimedes' engines", certainty: "probable", note: "The engines, not the garrison, are what the sources treat as the defence." },
      { side: "Carthage", estimate: "A relief army under Himilco and a fleet under Bomilcar", certainty: "probable", note: "Neither ever engaged decisively; the army was destroyed by disease in the marshy ground outside the city." },
    ],
    casualties: [
      { side: "Syracuse", estimate: "The city stormed and sacked; Archimedes killed", certainty: "attested", note: "Every version has him killed against Marcellus' explicit orders, which is itself a Roman apology for the sack." },
      { side: "Rome", estimate: "Heavy from plague during the blockade rather than in the assaults", certainty: "probable" },
      { side: "Carthage", estimate: "The relief army largely destroyed by disease", certainty: "probable" },
    ],
    ancientSourceIds: ["polybius-8", "livy-21-30"], modernSourceIds: secondModern, uncertaintyNotes: ["The Roman escalade point near the Hexapylon is placed by argument from the surviving circuit, not by evidence.", "Livy's festival of Artemis and drunken watch are the kind of explanatory detail his sources supplied freely.", "The individual machines Polybius describes are technically plausible but no example survives."], previousSlug: "cannae", nextSlug: "capua"
  },
  {
    id: "capua", slug: "capua", name: "Siege of Capua", kind: "siege", startYear: -212, endYear: -211, displayDate: "212–211 BCE", location: "Capua (Santa Maria Capua Vetere), Campania", coordinates: [14.25, 41.08], uncertainty: { radiusKm: 6, certainty: "probable", note: "The city is secure; the Roman lines of circumvallation are generalized." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Quintus Fulvius Flaccus", "Appius Claudius Pulcher"], certainty: "probable" }, { faction: "carthage", names: ["Hannibal (failed relief)"], certainty: "attested" }], result: "Roman recapture of the city", summary: "Rome besieged Capua, which had defected after Cannae; Hannibal’s march toward Rome failed to draw off the besiegers, and the city fell in 211.", significance: "The fall of Capua showed that defection to Hannibal could not be protected, and the war’s momentum began to shift to Rome.",
    context: "Capua was the second city of Italy and its defection after Cannae was the worst political loss of the war. Recovering it was the test of whether Hannibal's Italian strategy could work at all: he had told the communities of the south that Rome could not protect its own and could not punish theirs. Rome answered not with a battle but with engineering — a double line of ditch and rampart, one facing the city and one facing outward — and then simply refused to be moved, even when Hannibal marched on Rome itself to make it move.",
    forces: [
      { side: "Rome", estimate: "Two proconsular armies holding the lines of circumvallation", certainty: "probable", note: "The lines, not the numbers, were the instrument; they allowed a smaller force to hold both city and relief army off." },
      { side: "Carthage", estimate: "The Capuan levy and a Punic garrison inside; Hannibal's field army outside", certainty: "probable" },
    ],
    casualties: [
      { side: "Carthage", estimate: "The city surrendered; its ruling council was executed and the population sold or dispersed", certainty: "attested", note: "Reports of how many senators died, and how many took poison first, vary." },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
    ],
    ancientSourceIds: ["polybius-9", "livy-21-30"], modernSourceIds: secondModern, uncertaintyNotes: ["The chronology of the siege and Hannibal’s demonstration against Rome is compressed in the sources.", "The scale of the reprisals against Capua is variously reported."], previousSlug: "syracuse", nextSlug: "new-carthage"
  },
  {
    id: "new-carthage", slug: "new-carthage", name: "Capture of New Carthage", kind: "siege", startYear: -209, endYear: -209, displayDate: "209 BCE", location: "Carthago Nova (Cartagena), south-eastern Iberia", coordinates: [-0.983, 37.6], uncertainty: { radiusKm: 5, certainty: "probable", note: "The harbour city is secure; the assault route across the lagoon is reconstructed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (Africanus)"], certainty: "attested" }, { faction: "carthage", names: ["Mago (garrison commander)"], certainty: "probable" }], result: "Roman assault captures the city", summary: "Scipio made a rapid march and stormed the main Carthaginian base in Iberia, reportedly exploiting shallow water in the lagoon to reach the walls.", significance: "The capture seized Carthage’s Iberian treasury, arsenal, and hostages, turning the Spanish theatre in Rome’s favour.",
    context: "Three Carthaginian armies were in Iberia and none of them was near New Carthage. Scipio, newly arrived and with no reputation, ignored all three and marched several hundred kilometres on the base itself — the treasury, the arsenal, the dockyard and the hostages by which Carthage held the loyalty of the Spanish tribes. It was a large risk taken deliberately, and it worked in a day. Releasing the hostages to their communities afterwards did more for Rome's position in Iberia than the plunder did.",
    forces: [
      { side: "Rome", estimate: "About 25,000 foot and 2,500 horse, with Laelius' fleet", certainty: "probable", note: "Livy's figures; the army was Scipio's whole field force, brought up by forced march." },
      { side: "Carthage", estimate: "A garrison of about a thousand under Mago, with some two thousand townspeople armed during the assault", certainty: "probable", note: "The city was strong and badly undermanned — the reason the plan was possible." },
    ],
    casualties: [
      { side: "Carthage", estimate: "The city taken in a single day with heavy loss among the defenders and inhabitants", certainty: "probable", note: "Mago surrendered the citadel; the craftsmen of the arsenal were kept and put to Roman work." },
      { side: "Rome", estimate: "Not preserved; reported as light for an assault on a walled city", certainty: "disputed" },
    ],
    ancientSourceIds: ["polybius-10", "livy-21-30"], modernSourceIds: secondModern, uncertaintyNotes: ["The mechanism of the lagoon crossing (wind, tide, or ford) is debated.", "The speed of the march and assault may be idealized in the tradition."], previousSlug: "capua", nextSlug: "baecula"
  },
  {
    id: "baecula", slug: "baecula", name: "Battle of Baecula", kind: "land", startYear: -208, endYear: -208, displayDate: "208 BCE", location: "Near Baecula, upper Guadalquivir (site debated)", coordinates: [-3.1, 38.03], uncertainty: { radiusKm: 30, certainty: "disputed", note: "The identification with a modern site is contested." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (Africanus)"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal Barca"], certainty: "attested" }], result: "Roman tactical victory; Hasdrubal withdraws", summary: "Scipio drove Hasdrubal Barca from a strong hill position, but much of the Carthaginian army escaped northward toward the Pyrenees and Italy.", significance: "A Roman success that nonetheless failed to stop Hasdrubal’s march to reinforce Hannibal.",
    context: "Hasdrubal Barca took a position that could not be attacked from the front: a height with a level top, a river behind it and a steep terrace in front. Scipio's answer was to attack the front anyway with light troops — not to win there, but to hold the defenders' attention — and take the rest of the army up both flanks. The manoeuvre worked and the object failed. Hasdrubal did not fight to a finish; he took his money, his elephants and a large part of his men off northward, and eighteen months later Rome had to destroy that army again at the Metaurus.",
    forces: [
      { side: "Rome", estimate: "Around 35,000 with Iberian allies", certainty: "disputed", note: "Totals are not securely given for either army." },
      { side: "Carthage", estimate: "Hasdrubal Barca's army with elephants, caught before it had fully deployed", certainty: "probable" },
    ],
    casualties: [
      { side: "Carthage", estimate: "Livy gives 8,000 dead, but a large part of the army withdrew in order", certainty: "disputed", note: "How much escaped is the substance of the modern argument about the battle." },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
    ],
    ancientSourceIds: ["polybius-10", "livy-21-30"], modernSourceIds: secondModern, uncertaintyNotes: ["The battlefield location is disputed among several Guadalquivir sites.", "How much of Hasdrubal’s force escaped is debated."], previousSlug: "new-carthage", nextSlug: "metaurus"
  },
  {
    id: "metaurus", slug: "metaurus", name: "Battle of the Metaurus", kind: "land", startYear: -207, endYear: -207, displayDate: "207 BCE", location: "Along the river Metaurus, near Fanum Fortunae (Fano)", coordinates: [12.9, 43.7], uncertainty: { radiusKm: 20, certainty: "disputed", note: "The action is fixed to the river, but the precise field is uncertain." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Claudius Nero", "Marcus Livius Salinator"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal Barca"], certainty: "attested" }], result: "Decisive Roman victory; Hasdrubal killed", summary: "Claudius Nero slipped away from facing Hannibal in the south, joined his colleague in the north, and destroyed Hasdrubal’s relieving army before it could reach Hannibal.", significance: "By ending the reinforcement Hannibal awaited, the Metaurus is often read as the strategic turning point of the war in Italy.",
    context: "Hasdrubal Barca had crossed the Alps far more easily than his brother eleven years earlier and was in the Po valley with a second army. Everything turned on whether the two brothers could join. Hasdrubal sent riders to Hannibal in the south naming a meeting place in Umbria; they were intercepted, and Nero — the consul facing Hannibal — knew the plan before Hannibal did. He took a picked force out of camp by night, leaving the rest in place so that nothing appeared to have changed, marched the length of Italy, and slipped into his colleague's camp in the dark so that Hasdrubal would not know he was there.",
    forces: [
      { side: "Rome", estimate: "Two consular armies plus a praetor's, perhaps 40,000 in all", certainty: "disputed", note: "The concentration, not the size, was the achievement; Hasdrubal detected it only from the trumpet calls and the condition of the horses." },
      { side: "Carthage", estimate: "Around 30,000 with elephants, part Iberian, part Ligurian and Gallic", certainty: "disputed" },
    ],
    casualties: [
      { side: "Carthage", estimate: "The army destroyed and Hasdrubal killed in the fighting", certainty: "attested", note: "Polybius gives around 10,000 dead; Livy's 57,000 is not credible." },
      { side: "Rome", estimate: "Reported as about 2,000 by Polybius and 8,000 by Livy", certainty: "disputed" },
    ],
    ancientSourceIds: ["polybius-11", "livy-21-30"], modernSourceIds: secondModern, uncertaintyNotes: ["The exact battlefield along the Metauro is not established.", "The dramatic account of Nero’s forced march is shaped by later tradition."], previousSlug: "baecula", nextSlug: "ilipa"
  },
  {
    id: "ilipa", slug: "ilipa", name: "Battle of Ilipa", kind: "land", startYear: -206, endYear: -206, displayDate: "206 BCE", location: "Near Ilipa, lower Guadalquivir (Alcalá del Río)", coordinates: [-5.98, 37.52], uncertainty: { radiusKm: 15, certainty: "probable", note: "The general area is accepted; the deployment is reconstructed from Polybius." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (Africanus)"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal Gisco", "Mago"], certainty: "attested" }], result: "Decisive Roman victory", summary: "Scipio reversed his usual order of battle to set his best troops on the wings and enveloped the Carthaginian army, effectively ending Carthaginian power in Iberia.", significance: "Ilipa secured the peninsula for Rome and freed Scipio to plan the invasion of Africa.",
    context: "Carthage had scraped together its last army in Iberia under Hasdrubal Gisco and Mago, and it outnumbered Scipio. More than half of Scipio's own force was Iberian, recruited from tribes that had changed sides before and could do so again; he did not intend to trust them with the decision. For several days he formed up in the conventional way, legions in the centre and allies on the wings, and let the Carthaginians see it. On the day of the battle he put the legions on the wings and the Iberians in the centre, and Hasdrubal — already deployed for the array he had been shown — could not change.",
    forces: [
      { side: "Rome", estimate: "Around 45,000 foot and 3,000 horse, more than half of them Iberian allies", certainty: "probable", note: "The proportion of allies is the reason for the reversal and is better attested than the totals." },
      { side: "Carthage", estimate: "Larger; Livy's 70,000 foot, 4,000 horse and 32 elephants is not credible", certainty: "disputed" },
    ],
    casualties: [
      { side: "Carthage", estimate: "The army broken up; Hasdrubal Gisco reached Gades with a remnant and Mago left for Italy", certainty: "probable", note: "Carthage put no further field army into Iberia." },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
    ],
    ancientSourceIds: ["polybius-11", "livy-21-30"], modernSourceIds: secondModern, uncertaintyNotes: ["The tactical reconstruction depends heavily on Polybius.", "Army sizes are debated."], previousSlug: "metaurus", nextSlug: "great-plains"
  },
  {
    id: "great-plains", slug: "great-plains", name: "Battle of the Great Plains", kind: "land", startYear: -203, endYear: -203, displayDate: "203 BCE", location: "Bagradas (Medjerda) valley, the Campi Magni, Africa", coordinates: [9.0, 36.4], uncertainty: { radiusKm: 35, certainty: "disputed", note: "The ‘Great Plains’ district is broadly placed on the upper Bagradas." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (Africanus)"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal Gisco", "Syphax"], certainty: "attested" }], result: "Decisive Roman victory", summary: "Days after burning the Carthaginian and Numidian camps, Scipio defeated the hastily reassembled army on open ground, tightening the pressure on Carthage.", significance: "The defeat pushed Carthage to recall Hannibal from Italy and to seek a decision in Africa.",
    context: "Days earlier Scipio had burned the Carthaginian and Numidian camps outside Utica during a night operation conducted under cover of peace talks. Hasdrubal Gisco and Syphax reassembled what they could and hired a body of Celtiberians to stiffen it. What happened next is the clearest demonstration in the war of what a legion of maniples could do that a phalanx could not: with the enemy wings already gone, Scipio marched his second and third lines sideways out of his own formation and round both flanks of the mercenaries, in the middle of the battle.",
    forces: [
      { side: "Rome", estimate: "The African expeditionary army in three lines, with Italian and Numidian cavalry on the wings", certainty: "probable", note: "Masinissa's Numidians fought for Rome; Syphax's for Carthage." },
      { side: "Carthage", estimate: "Around 30,000, built round newly hired Celtiberian mercenaries", certainty: "disputed", note: "A reassembled force rather than a trained army." },
    ],
    casualties: [
      { side: "Carthage", estimate: "The Celtiberians destroyed almost entirely; the cavalry escaped after breaking early", certainty: "probable", note: "Mercenaries in Africa had nowhere to run to and no expectation of quarter." },
      { side: "Rome", estimate: "Not preserved; reported as slight", certainty: "disputed" },
    ],
    ancientSourceIds: ["polybius-14", "livy-21-30"], modernSourceIds: secondModern, uncertaintyNotes: ["The exact location of the Campi Magni is not fixed.", "The sequence with the preceding ‘Battle of the Camps’ is compressed in the sources."], previousSlug: "ilipa", nextSlug: "zama"
  },
  {
    id: "zama", slug: "zama", name: "Battle of Zama", kind: "land", startYear: -202, endYear: -202, displayDate: "202 BCE", location: "Interior of modern Tunisia, near Zama (exact site disputed)", coordinates: [9.55, 36.05], uncertainty: { radiusKm: 45, certainty: "disputed", note: "No securely identified battlefield; several inland sites west of Carthage are proposed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (Africanus)", "Masinissa (allied Numidian king)"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Decisive Roman victory", summary: "Scipio defeated Hannibal in a pitched battle in which Numidian cavalry, now largely on the Roman side, proved decisive; the elephant charge was blunted and the Carthaginian line eventually enveloped.", significance: "Zama ended the Second Punic War, confined Carthage to Africa under harsh terms, and earned Scipio the name ‘Africanus’.",
    context: "The battle brought the war’s two greatest commanders together on open ground. Its most consequential feature was the reversal of the cavalry balance: Masinissa’s Numidians now fought for Rome, undoing the advantage that had won Cannae.",
    forces: [
      { side: "Rome", estimate: "Roman and Italian legions with strong allied Numidian cavalry", certainty: "probable", note: "Exact totals are uncertain." },
      { side: "Carthage", estimate: "A mixed army of mercenaries, citizen levies, Hannibal’s veterans, and war elephants", certainty: "probable", note: "The veteran core is emphasized in the sources." },
    ],
    casualties: [
      { side: "Carthage", estimate: "Very heavy losses reported", certainty: "disputed" },
      { side: "Rome", estimate: "Substantially lighter losses reported", certainty: "disputed" },
    ],
    moments: [
      { title: "Elephant charge", description: "Hannibal opened with elephants; Roman lanes and noise disrupted the charge.", certainty: "probable" },
      { title: "Infantry lines meet", description: "Successive lines of infantry ground against one another in a prolonged struggle.", certainty: "probable" },
      { title: "Cavalry returns", description: "The allied Numidian and Roman cavalry, having driven off their opponents, struck Hannibal’s rear.", certainty: "attested" },
      { title: "Envelopment", description: "Caught front and rear, the Carthaginian line collapsed.", certainty: "probable" },
    ],
    ancientSourceIds: ["polybius-15", "livy-21-30", "appian-hann"], modernSourceIds: ["lazenby-1978", "goldsworthy-2000"], uncertaintyNotes: ["The battlefield has never been securely located.", "Whether the site was Zama, Naraggara, or elsewhere is debated.", "Army sizes and casualty figures are literary."], previousSlug: "great-plains"
  },
];

const macedonianWar: Battle[] = [
  {
    id: "aous", slug: "aous", name: "Battle of the Aous", kind: "land", startYear: -198, endYear: -198, displayDate: "198 BCE", location: "The Aoös (Vjosa) gorge, Epirus", coordinates: [20.2, 40.1], uncertainty: { radiusKm: 20, certainty: "disputed", note: "The river gorge is known; the precise point of the forced passage is debated." }, major: false,
    belligerents: ["Roman Republic", "Macedon"], commanders: [{ faction: "rome", names: ["Titus Quinctius Flamininus"], certainty: "attested" }, { faction: "macedon", names: ["Philip V"], certainty: "attested" }], result: "Roman victory", summary: "Flamininus forced Philip’s fortified position blocking the Aoös gorge, compelling a Macedonian retreat into Thessaly.", significance: "The breakthrough opened Macedonia’s southern approaches and shifted the war’s momentum to Rome.",
    context: "Two years of Roman campaigning in Illyria had achieved nothing, and Philip had fortified the one gorge by which an army could pass east. Flamininus, newly arrived and thirty years old, sat in front of it for forty days and negotiated without result. The position was turned in the end not by a manoeuvre but by information: a local came into the Roman camp and said he knew a way over the mountain. Whether to trust him was the decision the campaign turned on.",
    forces: [
      { side: "Rome", estimate: "Two legions with allies; four thousand foot and three hundred horse in the flanking column", certainty: "probable", note: "The flanking detachment's size is the one figure Livy gives precisely." },
      { side: "Macedon", estimate: "Philip's army entrenched across the gorge with artillery on the slopes", certainty: "probable" },
    ],
    casualties: [
      { side: "Macedon", estimate: "Livy reports about 2,000 lost; the army got away but abandoned its position and its camp", certainty: "disputed", note: "Philip retreated through Thessaly destroying the country behind him." },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
    ],
    ancientSourceIds: macedonAncient, modernSourceIds: macedonModern, uncertaintyNotes: ["The precise point of the forced passage is debated.", "The role of a local guide is reported but hard to verify."], nextSlug: "cynoscephalae"
  },
  {
    id: "cynoscephalae", slug: "cynoscephalae", name: "Battle of Cynoscephalae", kind: "land", startYear: -197, endYear: -197, displayDate: "197 BCE", location: "The Cynoscephalae (‘Dog’s Heads’) ridges, Thessaly", coordinates: [22.55, 39.42], uncertainty: { radiusKm: 15, certainty: "disputed", note: "The hill line is placed between Pherae and Scotussa, but not securely fixed." }, major: true,
    belligerents: ["Roman Republic and allies", "Macedon"], commanders: [{ faction: "rome", names: ["Titus Quinctius Flamininus"], certainty: "attested" }, { faction: "macedon", names: ["Philip V"], certainty: "attested" }], result: "Decisive Roman victory", summary: "The Roman legions, exploiting broken ground and their flexibility, shattered Philip V’s phalanx and ended the war.", significance: "Cynoscephalae showed the manipular legion’s advantage over the phalanx on rough terrain and made Rome the arbiter of the Greek world.",
    context: "Rome and Macedon had manoeuvred inconclusively until the two armies blundered into each other in fog on the ridges called the Dog’s Heads. The battle became the classic test of the Macedonian pike phalanx against the Roman manipular legion on ground that suited the legion.",
    forces: [
      { side: "Rome", estimate: "About 26,000, with Aetolian and allied cavalry and a few war elephants", certainty: "probable", note: "Totals follow Polybius and Livy." },
      { side: "Macedon", estimate: "A comparable force built around the pike phalanx", certainty: "probable", note: "Exact numbers are uncertain." },
    ],
    casualties: [
      { side: "Macedon", estimate: "Ancient sources report about 8,000 killed and 5,000 captured", certainty: "disputed", note: "Figures come through the literary tradition." },
      { side: "Rome", estimate: "Reported as relatively light", certainty: "disputed" },
    ],
    moments: [
      { title: "Meeting in the fog", description: "Advance guards collided unexpectedly on the wet heights; both sides fed in troops piecemeal.", certainty: "attested" },
      { title: "The right phalanx charges", description: "Philip’s right, well formed on the high ground, drove the Roman left back.", certainty: "probable" },
      { title: "Broken ground opens gaps", description: "Advancing downhill, the phalanx lost cohesion and its dense front fragmented.", certainty: "probable" },
      { title: "A tribune turns the flank", description: "An unnamed tribune wheeled maniples from the victorious Roman right into the phalanx’s exposed rear.", certainty: "attested" },
    ],
    ancientSourceIds: macedonAncient, modernSourceIds: macedonModern, uncertaintyNotes: ["The exact hills of the ‘Dog’s Heads’ are not securely located.", "Casualty and strength figures are literary.", "The decisive flanking manoeuvre is credited to an unnamed tribune."], previousSlug: "aous"
  },
];

export const battles: Battle[] = [
  // Tagged by hand rather than derived from data/wars.ts: this module is in the
  // test import graph, which can only resolve "@/" aliases as type imports.
  ...earlyRepublic.map((battle) => ({ ...battle, war: EARLY_BATTLE_ERA[battle.slug] })),
  ...firstPunicWar.map((battle) => ({ ...battle, war: "first-punic" })),
  ...secondPunicWar.map((battle) => ({ ...battle, war: "second-punic" })),
  ...macedonianWar.map((battle) => ({ ...battle, war: "macedonian-second" })),
];

export function getBattle(slug: string): Battle | undefined {
  return battles.find((battle) => battle.slug === slug);
}
