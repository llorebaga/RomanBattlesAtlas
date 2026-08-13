import type { Battle } from "@/types/history";

const commonAncient = ["polybius-1"];
const commonModern = ["lazenby-1996", "hoyos-2015"];

const secondAncient = ["polybius-3", "livy-21-30"];
const secondModern = ["lazenby-1978", "goldsworthy-2000"];

const macedonAncient = ["polybius-18", "livy-31-33"];
const macedonModern = ["walbank-1940", "eckstein-2008"];

// The Antiochene war has the best narrative evidence in the atlas and the worst
// numbers. Livy's fourth decade runs continuously through it and is largely
// Polybius in Latin, but Polybius' own books for these years survive as excerpts,
// so where Livy's annalistic source takes over — which is exactly where the
// figures are — there is nothing left to check him against. Hence `probable` for
// the shape of every action here and `disputed` for almost every total.
const seleucidAncient = ["livy-34-37", "appian-syrian"];
const seleucidModern = ["grainger-2002", "eckstein-2008"];

// The last two wars of the middle Republic sit on opposite sides of the break in
// the evidence. Livy's fifth decade covers the Macedonian war in full and is the
// best narrative in the atlas; for the Third Punic War he is lost, and Carthage
// falls in Appian's much later compilation and in the fragments of Polybius, who
// was standing next to the man who ordered it.
const thirdMacedonAncient = ["livy-39-45", "polybius-27-30"];
const thirdMacedonModern = ["gruen-1984", "eckstein-2008"];
const thirdPunicAncient = ["appian-hann", "polybius-36-39"];
const thirdPunicModern = ["astin-1967", "hoyos-2015"];

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
const pyrrhicAncient = ["plutarch-pyrrhus", "dionysius-hal", "appian-samnite", "livy-periochae"];
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
      { side: "The Latin League", estimate: "Not preserved; the Latin commander Mamilius was killed", certainty: "traditional", note: "The commanders seeking each other out personally may be a real memory of aristocratic Latin warfare, or a later writer's idea of it." },
      { side: "Rome", estimate: "Not preserved, and described as heavy for a victory", certainty: "traditional", note: "The dictator is said to have vowed a temple to Castor during the fighting, which the tradition offers as the measure of how close it was." },
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
    ancientSourceIds: ["livy-1-5", "polybius-2", "diodorus-14", "plutarch-camillus"], modernSourceIds: earlyItalyModern,
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
      { side: "The Latin League", estimate: "Reported as very heavy; organised resistance in the field ended", certainty: "traditional", note: "Livy gives no figure, which for a battle he calls decisive suggests his sources gave him none either." },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed", note: "Rome was fighting troops armed and drilled as its own, so a cheap victory is unlikely on the face of it." },
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
      { side: "The Samnite league", estimate: "Livy reports over 20,000 killed or captured across the two actions", certainty: "disputed", note: "A total of that size for a single Samnite levy is hard to reconcile with the population of the region." },
      { side: "Rome", estimate: "Not reliably preserved", certainty: "disputed", note: "Livy is detailed about the Samnite oath and silent about Roman losses, which is the shape of a triumphal source." },
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
    belligerents: ["Rome", "Epirus and its Italian allies"], commanders: [{ faction: "rome", names: ["Publius Decius Mus (the grandson)", "Publius Sulpicius Saverrio"], certainty: "probable" }, { faction: "epirote", names: ["Pyrrhus of Epirus"], certainty: "attested" }], result: "Epirote victory, at a cost he could not afford",
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
    ancientSourceIds: ["polybius-1", "diodorus-23"], modernSourceIds: commonModern, uncertaintyNotes: ["The sequence and geography of the relief battle remain reconstructed; Polybius gives the outcome and almost nothing of the ground.", "The Roman supply base Polybius calls Herbessus has no agreed site, so the campaign that starved the besiegers cannot be plotted.", "Diodorus gives 25,000 inhabitants sold and Polybius no figure at all — the disparity is typical of the two traditions for this war.", "How Hannibal Gisco brought a garrison out through two consular armies is not explained by any source, and the silence may be covering a negotiated withdrawal."], previousSlug: "messana", nextSlug: "mylae"
  },
  {
    id: "mylae", slug: "mylae", name: "Battle of Mylae", kind: "naval", startYear: -260, endYear: -260, displayDate: "260 BCE", location: "Waters off Mylae (modern Milazzo), Sicily", coordinates: [15.23, 38.29], uncertainty: { radiusKm: 18, certainty: "probable", note: "The general coastal setting is accepted; the precise battle area is unknown." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Duilius"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal Gisco"], certainty: "attested" }], result: "Roman victory", summary: "Rome won its first major naval victory after converting boarding skill into an advantage at sea, traditionally associated with the corvus boarding bridge.", significance: "Mylae proved that Carthaginian seamanship did not make naval resistance futile and changed the strategic possibilities of the war.",
    context: "Rome had no fleet in 264 and had built one from nothing in a year — Polybius says the ships were copied from a captured Carthaginian vessel and the crews drilled on benches set up ashore before there were hulls to put them in. The first squadron to put to sea was lost almost immediately at the Lipari Islands, along with the consul who commanded it. Duilius took over a navy that had proved it could not out-sail Carthage, and stopped trying to: the fleet was fitted with boarding bridges that turned a sea fight into an infantry action across coupled hulls, which is the one kind of fighting Rome was certain to win. Mylae is the first test of that decision.",
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
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Sulpicius Paterculus"], certainty: "probable" }, { faction: "carthage", names: ["Hannibal Gisco"], certainty: "probable" }], result: "Roman victory", summary: "A poorly documented Roman naval success off Sardinia.", significance: "The action widened the maritime theater beyond Sicily.",
    context: "This record exists to show what the bottom of the evidence looks like. Sulci is known from a few lines in Zonaras, a twelfth-century Byzantine monk epitomising Cassius Dio, whose own books for this period are lost — so the chain from the event to the page is: something happened off Sardinia, an annalist recorded it, Dio used the annalist, Zonaras summarised Dio, and the summary survives. Almost every other page here rests on a historian writing within a few generations of the events, whose text we still have. This one does not, and the difference is why it carries no diagram and no figures.", ancientSourceIds: ["zonaras-8"], modernSourceIds: commonModern, uncertaintyNotes: ["The action is known from a few lines of a late epitome of a lost history — three removes from anyone who saw it.", "The date is given as 258 by convention; neither the year nor the season is secure.", "The location off south-western Sardinia is inferred from the place name alone.", "No figures survive for either fleet, and whether this was a fleet action or a raid on shipping cannot be determined."], previousSlug: "mylae", nextSlug: "tyndaris"
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
    ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Modern summaries call the day a small Roman success, a draw, and a Roman check; the ancient account supports all three readings.", "The Carthaginian commander is not named in any surviving source.", "Only the ten ships of the consul's advance squadron are counted; no total is given for either fleet.", "Whether the consul was censured for going ahead of his line, as the later tradition implies, is not stated by Polybius."], previousSlug: "sulci", nextSlug: "cape-ecnomus"
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
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Marcus Atilius Regulus"], certainty: "attested" }, { faction: "carthage", names: ["Multiple commanders"], certainty: "probable" }], result: "Initial Roman gains; eventual Roman defeat",
    context: "Rome had won at sea and could not win in Sicily, so it tried to end the war by threatening Carthage directly — the strategy Scipio would use successfully fifty years later. The landing worked: Regulus beat a Carthaginian army at Adys, took Tunis, and Carthage opened negotiations. What followed is the lesson of the campaign. Rome sent most of the fleet and half the army home for the winter, leaving a force too small to besiege the city and too large to feed off the country; Carthage hired a Spartan professional and destroyed it in the field. Then the returning fleet was wrecked in a storm.", summary: "Roman forces landed near Aspis and campaigned inland before the expedition collapsed in 255 BCE.", significance: "The campaign came close to forcing terms but ultimately exposed the hazards of sustaining an army overseas.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Campaign routes and several place identifications are disputed; Aspis, Adys and the Bagradas field are all placed by argument rather than evidence.", "Polybius gives the size of the landing force only indirectly, through the fleet that carried it.", "Whether the senate ordered the fleet and half the army home, or Regulus agreed to it, is not stated — and it is the decision the campaign turned on.", "The terms Carthage offered and Regulus refused are reported only in later, moralising versions of the story."], previousSlug: "cape-ecnomus", nextSlug: "adys"
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
      { side: "Carthage", estimate: "The mercenary infantry cut up; the cavalry and elephants escaped without loss", certainty: "probable", note: "That the arms which could not be used on the hill were also the arms that survived it is the whole point of the battle." },
      { side: "Rome", estimate: "Not preserved; one of the two columns was driven back downhill before the action turned", certainty: "disputed", note: "A conspicuous silence for a victory won by attacking uphill against a formed enemy." },
    ],
    ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Adys has no agreed modern identification; the traditional placement near Uthina rests on the name alone.", "The two-column attack is Polybius' account of the shape of the action, not a report of orders given.", "Neither side's strength is recorded, so the frequently repeated claim that Regulus was outnumbered has no basis in the sources.", "Roman losses are not preserved, which for a victory won by attacking uphill is a conspicuous silence."], previousSlug: "africa-invasion", nextSlug: "bagradas"
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
    ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["The use of the ditch is reconstructed from a literary description of the tactic, not from the ground at Panormus.", "The number of elephants is given as 60, 100, 130 and 142 by different sources; the figure paraded at Rome and the figure engaged are probably being confused.", "Polybius has ten taken with their drivers in the action and the rest rounded up loose afterwards, which does not fit the triumphal totals.", "Roman losses are not recorded, and by the design of the action were probably slight — but that is an inference, not a report."], previousSlug: "bagradas", nextSlug: "lilybaeum"
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
      { side: "Rome", estimate: "Not separable from the wider war; the siege works were destroyed by fire at least once", certainty: "disputed", note: "Rome lost more men and ships to storms and to Drepana during these nine years than to the garrison in front of it." },
      { side: "Carthage", estimate: "The city was never stormed and the garrison surrendered by treaty in 241", certainty: "attested", note: "The garrison marched out under terms after nine years — the only Carthaginian force in Sicily to end the war undefeated in the field." },
    ],
    ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Nine years of operations are compressed into four stages; the sources report the separate actions without dating or locating most of them.", "The Roman lines and camps are not located, and the harbour has silted and shifted since antiquity.", "Hannibal the Rhodian's blockade-running is described in unusual detail by Polybius and corroborated by nothing else.", "The wind that spread the fire through the siege works is Polybius' explanation of the outcome rather than an independently recorded fact.", "No source gives the garrison's strength; the figure of ten thousand mercenaries is a modern estimate."], previousSlug: "panormus", nextSlug: "drepana"
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
    belligerents: ["Carthage", "Alpine Gallic peoples"], commanders: [{ faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "The army reaches Italy after heavy losses",
    context: "The march was not an adventure but the only way to fight Rome on Rome's ground. Carthage had lost command of the sea in the first war and could not ship an army to Italy; Hannibal therefore had to walk from Iberia, which meant crossing the Pyrenees, the Rhône against opposition, and the Alps in autumn with elephants. Polybius walked part of the route himself and is scathing about writers who made the crossing miraculous, insisting Hannibal had guides and knew where he was going. The cost was still enormous: the army that came down into the Po valley was perhaps half the one that left the Ebro.", summary: "Hannibal led a mixed army, with elephants, over the Alps into the Po valley in late 218, absorbing severe losses to weather, terrain, and hostile tribes.", significance: "The march carried the war into Italy itself and made Hannibal a direct threat to Rome for over a decade.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The identity of the pass (Traversette, Clapier, Mont Cenis, and others) is unresolved.", "Ancient casualty and elephant figures are literary estimates.", "The plotted point represents the crossing, not one location."], previousSlug: "saguntum", nextSlug: "ticinus"
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
    context: "Two years of Fabian delay had kept Rome in the war and made Fabius unpopular: avoiding battle looked like cowardice to an electorate that had never lost a war of attrition. So Rome raised an exceptionally large army — the tradition says eight legions with their allies, twice the normal consular force — and sent both consuls out together with instructions to force a decision. That decision is what Hannibal wanted. He had chosen open ground on the Aufidus where his cavalry could work, and he was outnumbered in infantry by nearly two to one, which is the condition his plan required. Polybius' narrative, written from Roman informants a generation later, underlies every reconstruction of what followed.",
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
    context: "Hannibal had been recalled from Italy after sixteen years to defend a city he had not seen since childhood, with an army assembled out of his Italian veterans, fresh citizen levies and hired troops who had never fought together. Scipio had the opposite: a force he had trained himself, and — decisively — the Numidian cavalry. Masinissa had been Carthage's ally at the start of the war and was now Rome's, which reversed the one advantage that had won Cannae. The battle is often read as the two greatest commanders of the age meeting at last, and that is true, but the meeting was settled before it began by which of them had the better horse.",
    forces: [
      { side: "Rome", estimate: "Roman and Italian legions with strong allied Numidian cavalry", certainty: "probable", note: "Exact totals are uncertain." },
      { side: "Carthage", estimate: "A mixed army of mercenaries, citizen levies, Hannibal’s veterans, and war elephants", certainty: "probable", note: "The veteran core is emphasized in the sources." },
    ],
    casualties: [
      { side: "Carthage", estimate: "Very heavy losses reported; Polybius gives 20,000 dead and as many taken", certainty: "disputed", note: "Hannibal escaped the field and reached Hadrumetum, which the figures have to be consistent with." },
      { side: "Rome", estimate: "Substantially lighter losses reported, around 1,500 to 2,500", certainty: "disputed", note: "A ratio of ten to one is what a pursuit produces, not a battle; the infantry fight is described as long and even." },
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
    context: "Two years of manoeuvring in Thessaly had produced nothing, and neither commander intended to fight on the day they did: screening forces met in fog on a line of ridges neither had scouted, and both armies were fed in piecemeal to support them. That accident is what makes the battle the classic test of the two systems, because neither side got to choose its ground. The phalanx was the dominant infantry formation of the Hellenistic world and had beaten everything it met for a century and a half — on level ground, in one line, with its flanks secure. The Dog's Heads offered none of those things. Polybius, who had commanded Achaean troops himself, uses the day to explain why.",
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

const seleucidWar: Battle[] = [
  {
    id: "thermopylae", slug: "thermopylae", name: "Battle of Thermopylae", kind: "land", startYear: -191, endYear: -191, displayDate: "April 191 BCE", location: "The pass of Thermopylae, Malis", coordinates: [22.54, 38.8], uncertainty: { radiusKm: 6, certainty: "probable", note: "The pass is one of the securely known battlefields of antiquity, and the ground has changed more than almost any other: the Malian Gulf has silted up, and the defile that was a strip between cliff and surf now lies several kilometres inland. The marker is the ancient narrows, not the modern ones." }, major: true,
    belligerents: ["Roman Republic, with Macedon and the Achaeans", "Seleucid Empire and the Aetolian League"],
    commanders: [
      { faction: "rome", names: ["Manius Acilius Glabrio (consul)", "Marcus Porcius Cato (legate)"], certainty: "attested" },
      { faction: "seleucid", names: ["Antiochus III"], certainty: "attested" },
    ],
    result: "Decisive Roman victory",
    summary: "Antiochus fortified the pass and posted Aetolians on the heights above it; Cato climbed Callidromus in the dark, came down behind them, and the Seleucid position collapsed from the rear. Antiochus reached Chalcis with a few hundred men and was out of Europe within days.",
    significance: "The war Antiochus came to Greece to fight was over in a single morning, six months after he landed. What remained was not a contest for Greece but the question Rome had never yet faced: whether to follow a Hellenistic king into Asia.",
    context: "Antiochus had crossed with about ten thousand men on the Aetolian promise that Greece would rise for him. Almost none of it did — Philip V, whom Rome had beaten five years earlier, came in on Rome's side instead, and the Achaeans declared against him. That left him holding a bridgehead with an army too small to fight for it, in front of a pass whose lesson every Greek knew by heart. He fortified the narrows with a double rampart, and he did not repeat Leonidas' mistake: he put two thousand Aetolians on the mountain paths over Callidromus. The battle turned on whether troops posted to watch a path would actually watch it.",
    forces: [
      { side: "Rome", estimate: "Two legions with allied contingents, perhaps 20,000 in all; two detachments of about 2,000 each sent over the mountain", certainty: "probable", note: "Livy gives the flanking columns precisely and the main body not at all — the usual shape of these figures." },
      { side: "Seleucid Empire", estimate: "About 10,000 foot and 500 horse behind the rampart, with 2,000 Aetolians holding the paths above", certainty: "probable", note: "The force Antiochus brought to Europe was small by his own standards. He had left the bulk of the royal army in Asia, expecting a political war rather than a battle." },
    ],
    casualties: [
      { side: "Seleucid Empire", estimate: "Livy reports the army destroyed almost entire; Antiochus escaped with about 500 men", certainty: "disputed", note: "‘Destroyed almost entire’ is a formula. What is not in doubt is that the army ceased to exist as a force in Europe — no Seleucid unit fought in Greece again." },
      { side: "Rome", estimate: "Reported as light; no figure survives that is worth repeating", certainty: "disputed" },
    ],
    moments: [
      { title: "The rampart holds", description: "Glabrio attacks the narrows frontally and is held: the position is as strong as its reputation, and pikes behind a wall in a defile are very hard to shift.", certainty: "probable" },
      { title: "Cato climbs Callidromus", description: "In darkness, Cato takes a column over the mountain by the paths that turned the pass in 480.", certainty: "attested" },
      { title: "The Aetolian outposts are surprised", description: "The watch on the heights is broken before it can send warning down to the rampart.", certainty: "probable" },
      { title: "Collapse from the rear", description: "Roman troops appear on the slope above and behind the Seleucid camp; the line breaks and the retreat becomes a rout in the defile.", certainty: "attested" },
    ],
    ancientSourceIds: ["livy-34-37", "polybius-20", "appian-syrian", "plutarch-cato"], modernSourceIds: seleucidModern,
    uncertaintyNotes: [
      "The coastline has moved: the ancient defile cannot be walked today, and reconstructions of its width rest on geology rather than on the sources.",
      "Cato's night march is told through Plutarch in a tradition that goes back to Cato's own account of himself, and his share of the credit cannot be independently checked.",
      "Casualty figures on both sides are literary.",
    ],
    nextSlug: "corycus",
  },
  {
    id: "corycus", slug: "corycus", name: "Battle of Cape Corycus", kind: "naval", startYear: -191, endYear: -191, displayDate: "September 191 BCE", location: "Off Cape Corycus, the Erythraean peninsula, Ionia", coordinates: [26.45, 38.19], uncertainty: { radiusKm: 18, certainty: "probable", note: "The cape is known; a fleet action fought along a coast covers far more water than a point can show." }, major: false,
    belligerents: ["Roman Republic, Pergamum and Carthage", "Seleucid Empire"],
    commanders: [
      { faction: "rome", names: ["Gaius Livius Salinator (praetor)"], certainty: "attested" },
      { faction: "pergamon", names: ["Eumenes II"], certainty: "attested" },
      { faction: "seleucid", names: ["Polyxenidas"], certainty: "attested" },
    ],
    result: "Roman and Pergamene victory",
    summary: "The first fleet action of the war. Livius' Roman squadron, joined by Eumenes off Phocaea, caught Polyxenidas at sea and drove him back into Ephesus with the loss of about a quarter of his decked ships.",
    significance: "Command of the Aegean was the precondition for everything that followed: without it no Roman army could cross to Asia. Corycus did not settle the naval war, but it established that the Seleucid fleet could not win it in open battle, and it pushed Polyxenidas into the ambushes and stratagems he spent the next year attempting instead.",
    context: "Antiochus' admiral was Polyxenidas, a Rhodian exile — which mattered, because it meant the Seleucid fleet was commanded by someone who understood the one navy in the Aegean that could out-sail Rome, and who was fighting his own city. The Roman squadron was slower and heavier than his, and its crews were new. What it had was allies: twenty-four Pergamene ships under Eumenes in person, and a contingent sent by Carthage under the terms of the peace of 201 — the defeated enemy of the last war rowing on Rome's flank in this one.",
    forces: [
      { side: "Rome, Pergamum and Carthage", estimate: "About 81 decked Roman ships, joined by 24 Pergamene; a small Carthaginian squadron among them", certainty: "probable" },
      { side: "Seleucid Empire", estimate: "About 70 decked ships and 130 lighter craft", certainty: "probable", note: "The lighter vessels are counted in the totals and did little in the action; the decked ships are what fought." },
    ],
    casualties: [
      { side: "Seleucid Empire", estimate: "About 23 decked ships lost — some 13 sunk or burnt and 10 taken", certainty: "disputed" },
      { side: "Rome and allies", estimate: "One ship taken, reported as the Carthaginian", certainty: "disputed", note: "A suspiciously tidy detail, and the kind a Roman source would find worth recording." },
    ],
    moments: [
      { title: "Joined off Phocaea", description: "Eumenes brings the Pergamene squadron down to the Roman fleet before Polyxenidas can engage either separately.", certainty: "probable" },
      { title: "The lines meet", description: "The heavier allied ships close and grapple rather than manoeuvre, which is the fight they want and not the one the Seleucids do.", certainty: "probable" },
      { title: "Flight to Ephesus", description: "Polyxenidas disengages with his remaining ships and shuts himself in the harbour; the allies do not force it.", certainty: "attested" },
    ],
    ancientSourceIds: seleucidAncient, modernSourceIds: seleucidModern,
    uncertaintyNotes: [
      "Ship-by-ship narratives of ancient fleet actions are reconstructions; only the outcome and the rough tallies survive.",
      "The totals come through Livy, whose naval numbers are less inflated than his land ones but not independent of them.",
    ],
    previousSlug: "thermopylae", nextSlug: "eurymedon",
  },
  {
    id: "eurymedon", slug: "eurymedon", name: "Battle of the Eurymedon", kind: "naval", startYear: -190, endYear: -190, displayDate: "summer 190 BCE", location: "Off Side, at the mouth of the Eurymedon, Pamphylia", coordinates: [30.99, 36.76], uncertainty: { radiusKm: 25, certainty: "disputed", note: "Sources place the action off the Pamphylian coast near Side; the exact water is not fixed." }, major: false,
    belligerents: ["Rhodes", "Seleucid Empire"],
    commanders: [
      { faction: "greek", names: ["Eudamus of Rhodes"], certainty: "attested" },
      { faction: "seleucid", names: ["Hannibal"], certainty: "attested" },
    ],
    result: "Rhodian victory",
    summary: "A Rhodian squadron intercepted the fleet Hannibal had raised in Phoenicia and Cilicia and was bringing west to join Polyxenidas, and turned it back — the only naval command of Hannibal's life, and a defeat.",
    significance: "The strategic point is what did not happen next. Had the Phoenician squadron reached the Aegean, Polyxenidas would have fought Myonessus with half as many ships again. It never arrived, and the sea was lost in consequence.",
    context: "Hannibal had been an exile at Antiochus' court since 195, consulted for his name and largely ignored for his advice. What he was finally given was the job of bringing the Phoenician and Cilician ships round to the Aegean — a task requiring seamanship he had never had and crews he had never commanded, against the best sailors in the Mediterranean. The Rhodians who met him were fighting the fleet action they had been built for.",
    forces: [
      { side: "Rhodes", estimate: "About 36 ships under Eudamus", certainty: "probable" },
      { side: "Seleucid Empire", estimate: "About 47 decked ships raised in Phoenicia and Cilicia", certainty: "probable", note: "Larger than the Rhodian squadron, and worse handled — which is the whole account of the battle." },
    ],
    casualties: [
      { side: "Seleucid Empire", estimate: "Ships disabled and the squadron turned back; no reliable count", certainty: "disputed", note: "Livy's interest is in the reversal rather than the tally, and the figures he gives are thin even by his standards." },
      { side: "Rhodes", estimate: "The left wing was roughly handled before the day turned; no figure survives", certainty: "disputed" },
    ],
    moments: [
      { title: "Hannibal's right presses", description: "The Seleucid right, which Hannibal commands in person, drives the Rhodian left back — the one part of the day that goes as he intends.", certainty: "probable" },
      { title: "Rhodian seamanship tells", description: "Eudamus' ships work round the heavier, less handy Phoenicians and take them from the flank.", certainty: "probable" },
      { title: "Turned back east", description: "The squadron breaks off and retires; it never reaches the Aegean, and Polyxenidas fights the rest of the war without it.", certainty: "attested" },
    ],
    ancientSourceIds: ["livy-34-37", "appian-syrian", "polybius-21"], modernSourceIds: seleucidModern,
    uncertaintyNotes: [
      "The site is given only as the Pamphylian coast near Side.",
      "Hannibal's personal role is emphasised by sources writing about Hannibal; how much of the squadron he actually directed is not recoverable.",
      "No dependable casualty figures survive for either side.",
    ],
    previousSlug: "corycus", nextSlug: "myonessus",
  },
  {
    id: "myonessus", slug: "myonessus", name: "Battle of Myonnesus", kind: "naval", startYear: -190, endYear: -190, displayDate: "September 190 BCE", location: "Off Cape Myonnesus, between Teos and Lebedos, Ionia", coordinates: [26.86, 38.06], uncertainty: { radiusKm: 20, certainty: "probable", note: "The promontory is identified; the action ranged along the coast between Teos and Samos." }, major: true,
    belligerents: ["Roman Republic and Rhodes", "Seleucid Empire"],
    commanders: [
      { faction: "rome", names: ["Lucius Aemilius Regillus (praetor)"], certainty: "attested" },
      { faction: "greek", names: ["Eudamus of Rhodes"], certainty: "attested" },
      { faction: "seleucid", names: ["Polyxenidas"], certainty: "attested" },
    ],
    result: "Decisive Roman and Rhodian victory",
    summary: "Polyxenidas came out to fight with a slight advantage in numbers and lost roughly half his fleet. The Seleucid navy did not put to sea again, and the Hellespont was left open.",
    significance: "This is the battle that made Magnesia possible. With the Aegean cleared, the consular army crossed into Asia unopposed — the first Roman army ever to do so — and Antiochus, who had spent the summer fortifying the Hellespont, abandoned the crossing without contesting it.",
    context: "Antiochus' whole strategy after Thermopylae rested on the sea. Asia was defensible if Rome could not reach it, and the Hellespont was the gate. Polyxenidas had already shown at Panormus that he could win by stratagem — he destroyed a Rhodian squadron there by feigning treachery — but stratagem does not clear a sea. At some point he had to beat the combined fleet in open water, and at Myonnesus he tried. The Rhodian contingent carried fire-pots slung ahead of the bows on poles, a weapon designed to make a heavier enemy sheer away from the ram rather than accept it.",
    forces: [
      { side: "Rome and Rhodes", estimate: "About 58 Roman and 22 Rhodian decked ships, 80 in all", certainty: "probable" },
      { side: "Seleucid Empire", estimate: "About 89 decked ships", certainty: "probable", note: "A real numerical advantage, and the last one Antiochus had anywhere." },
    ],
    casualties: [
      { side: "Seleucid Empire", estimate: "About 42 ships lost — some 29 captured and 13 sunk or burnt", certainty: "disputed" },
      { side: "Rome and Rhodes", estimate: "Two or three ships lost", certainty: "disputed", note: "A ratio steep enough to be worth doubting, though the strategic result is not in question: the fleet never sailed again." },
    ],
    moments: [
      { title: "Polyxenidas comes out", description: "With more decked ships than the allies, the Seleucid admiral accepts the open battle he has been avoiding.", certainty: "attested" },
      { title: "The Rhodian right turns the line", description: "The Rhodian squadron, faster and better handled, works round the Seleucid flank while the Roman centre holds it.", certainty: "probable" },
      { title: "Fire ahead of the bows", description: "Rhodian fire-pots slung on poles keep enemy ships from closing to ram; ships that sheer off present a flank.", certainty: "probable" },
      { title: "The Hellespont opens", description: "The remnant runs for Ephesus. Antiochus withdraws his garrisons from the straits without a fight, and the army crosses.", certainty: "attested" },
    ],
    ancientSourceIds: ["livy-34-37", "polybius-21", "appian-syrian"], modernSourceIds: seleucidModern,
    uncertaintyNotes: [
      "The action ranged over open water; the cape names a locality rather than a field.",
      "The loss ratio is reported by sources hostile to Antiochus and is steeper than most ancient fleet actions.",
      "The Rhodian fire-pots are described in general terms, and how decisive they were at Myonnesus specifically is an inference.",
    ],
    previousSlug: "eurymedon", nextSlug: "magnesia",
  },
  {
    id: "magnesia", slug: "magnesia", name: "Battle of Magnesia", kind: "land", startYear: -190, endYear: -190, displayDate: "December 190 BCE", location: "The plain of the Hermus below Magnesia ad Sipylum (Manisa)", coordinates: [27.43, 38.61], uncertainty: { radiusKm: 22, certainty: "disputed", note: "The armies are placed on the plain between the Phrygius and the Hermus below Mount Sipylus; the field itself has never been fixed, and the two ancient accounts cannot be reconciled into a single map." }, major: true,
    belligerents: ["Roman Republic and Pergamum", "Seleucid Empire"],
    commanders: [
      { faction: "rome", names: ["Lucius Cornelius Scipio Asiaticus (consul)", "Gnaeus Domitius Ahenobarbus"], certainty: "attested" },
      { faction: "pergamon", names: ["Eumenes II"], certainty: "attested" },
      { faction: "seleucid", names: ["Antiochus III", "Seleucus", "Antipater"], certainty: "attested" },
    ],
    result: "Decisive Roman victory",
    summary: "The first Roman army to fight in Asia destroyed the largest army Rome had yet faced. Eumenes broke the scythed chariots before contact and rolled up the Seleucid left; Antiochus won his own charge on the right and rode it too far; the phalanx, unbeaten in the centre, was left standing alone and was broken up by its own elephants.",
    significance: "Magnesia ended the Seleucid empire as a Mediterranean power and left no state between Rome and the eastern kingdoms that could fight it. What Rome did with the victory mattered as much: it annexed nothing, imposed an indemnity, and handed the ground to Pergamum and Rhodes — hegemony without administration, which is how Rome ran the East for the next fifty years.",
    context: "Scipio Africanus, the victor of Zama, came to Asia as his brother's legate — the consul was Lucius, and everyone understood who the soldier was. He then fell ill and was absent from the battle, so the campaign's decisions belong to Lucius and to Gnaeus Domitius. Antiochus had every reason not to fight: he had lost the sea, his best troops were unbeaten, and winter was coming. He fought anyway, with an army assembled from the whole extent of his empire — Median cataphracts, Galatian foot, Cappadocians, Arab camel-archers, Cretan slingers, and a phalanx of sixteen thousand men drawn up in ten blocks thirty-two deep with elephants standing in the gaps between them. It was the most heterogeneous force any Roman army ever met, and its parts had never manoeuvred together.",
    forces: [
      { side: "Rome and Pergamum", estimate: "About 30,000: two Roman and two Latin legions, Pergamene and Achaean contingents, and 16 elephants kept in reserve", certainty: "probable", note: "The elephants were African and smaller than Antiochus' Indian ones; the Romans deliberately kept them out of the line." },
      { side: "Seleucid Empire", estimate: "Reported as 60,000 foot and 12,000 horse, with 54 elephants and scythed chariots", certainty: "disputed", note: "Livy and Appian agree on figures that Bar-Kochva's reconstruction of Seleucid establishment strengths cannot support. The phalanx of 16,000 is credible; the total is the number a Roman tradition needed the largest army in the world to be." },
    ],
    casualties: [
      { side: "Seleucid Empire", estimate: "Livy reports 50,000 foot and 3,000 horse killed, and 15 elephants taken", certainty: "disputed" },
      { side: "Rome and Pergamum", estimate: "Livy reports 300 foot, 24 horse and 25 Pergamenes", certainty: "disputed", note: "The pair of figures is the clearest example in the atlas of a casualty tradition that is arithmetic rather than evidence. The rout was real and one-sided; these numbers are not a measurement of it." },
    ],
    moments: [
      { title: "Chariots broken before contact", description: "Eumenes sends archers and slingers against the scythed chariots on the Seleucid left; the teams panic and career back through the cavalry drawn up behind them.", certainty: "attested" },
      { title: "The Seleucid left rolled up", description: "With its own chariots through it, the left is charged before it can re-form and driven off the field.", certainty: "probable" },
      { title: "Antiochus rides too far", description: "On the right the king breaks the Roman left with his cataphracts and pursues it to the camp, where a tribune rallies the line — and by the time he turns back the battle behind him is lost.", certainty: "probable" },
      { title: "The phalanx is left standing", description: "Unbroken and abandoned by both wings, the pike blocks close into a square and retire in good order until their own elephants, wounded and driven back into them, break the formation open.", certainty: "attested" },
    ],
    ancientSourceIds: ["livy-34-37", "polybius-21", "appian-syrian"], modernSourceIds: ["bar-kochva-1976", "grainger-2002"],
    uncertaintyNotes: [
      "The battlefield has never been located; the placement below Sipylus is inference from the line of march.",
      "Livy and Appian give orders of battle that differ in the placement of several contingents and cannot both be right.",
      "The Seleucid total is not credible as reported, and the Roman casualty figure is not credible at all.",
      "Scipio Africanus was present in the camp but ill, and the ancient accounts differ on how much of the plan was his.",
    ],
    previousSlug: "myonessus",
  },
];

const thirdMacedonianWar: Battle[] = [
  {
    id: "callinicus", slug: "callinicus", name: "Battle of Callinicus", kind: "land", startYear: -171, endYear: -171, displayDate: "171 BCE", location: "The hill called Callinicus, outside Larissa in Thessaly", coordinates: [22.42, 39.66], uncertainty: { radiusKm: 12, certainty: "disputed", note: "Livy places the action about a mile from the Roman camp near Larissa; the hill has not been identified on the ground." }, major: false,
    belligerents: ["Roman Republic and allies", "Macedon and Thracian allies"],
    commanders: [
      { faction: "rome", names: ["Publius Licinius Crassus (consul)"], certainty: "attested" },
      { faction: "macedon", names: ["Perseus", "Cotys of the Odrysae"], certainty: "attested" },
    ],
    result: "Macedonian victory",
    summary: "The opening engagement of the war was a cavalry and light-infantry action outside Larissa, and Perseus won it decisively — routing the Roman horse and driving the consul's army back on its camp.",
    significance: "Perseus followed the victory by offering peace on the same terms he had been refused before it, and Rome refused again. That refusal, made from a position of defeat, is the moment the war stopped being negotiable: the Senate would not treat with a Macedonian king who had beaten a Roman army, and three more years of stalemate followed.",
    context: "Rome had declared war expecting the pattern of 197 to repeat — a short campaign, a decisive battle, terms dictated. Instead the consul of 171 arrived in Thessaly with an army that had been raised in a hurry and a cavalry arm markedly inferior to Perseus', who had Thessalian and Thracian horse and the Macedonian Sacred Squadron. Both sides had their cavalry out in front of the camps; the action grew out of that contact rather than being sought. What makes it worth drawing is what did not follow. Perseus had the beaten army in front of him and did not press.",
    forces: [
      { side: "Rome", estimate: "About 4,000 horse and an equal number of light infantry, screening a consular army", certainty: "probable", note: "The Roman cavalry included Aetolian and Thessalian contingents, whose flight Livy blames for the collapse." },
      { side: "Macedon", estimate: "Perseus' cavalry with Cretan archers and Thracian horse, the whole about 4,500", certainty: "probable" },
    ],
    casualties: [
      { side: "Rome", estimate: "Livy reports about 2,000 foot and 200 horse lost, with 600 captured", certainty: "disputed" },
      { side: "Macedon", estimate: "Livy reports 20 horse and 40 foot — a figure kept because a lopsided defeat was worth recording honestly for once", certainty: "disputed", note: "Roman sources had no reason to inflate their own losses, which is exactly why this pair is more believable than most in the atlas." },
    ],
    moments: [
      { title: "Cavalry screens meet", description: "The two mounted arms come into contact in front of the camps; neither commander has chosen the ground.", certainty: "probable" },
      { title: "The allied horse gives way", description: "The Thessalian and Aetolian cavalry on the Roman flank breaks first, uncovering the line.", certainty: "probable" },
      { title: "The Sacred Squadron drives in", description: "Perseus' heavy horse rolls up the Roman cavalry and rides down the light infantry supporting it.", certainty: "probable" },
      { title: "Perseus does not follow", description: "The Roman army reaches its camp intact. Perseus offers terms instead of attacking, and is refused.", certainty: "attested" },
    ],
    ancientSourceIds: thirdMacedonAncient, modernSourceIds: thirdMacedonModern,
    uncertaintyNotes: [
      "The hill is named by Livy and has never been located.",
      "The casualty figures are one-sided in Macedon's favour, which is unusual enough in a Roman source to be worth noting rather than discounting.",
      "Whether Perseus could have destroyed the consular army by pressing on is the judgement every later account makes and none can support.",
    ],
    nextSlug: "pydna",
  },
  {
    id: "pydna", slug: "pydna", name: "Battle of Pydna", kind: "land", startYear: -168, endYear: -168, displayDate: "22 June 168 BCE", location: "The plain below Pydna, on the Leucus, in Pieria", coordinates: [22.62, 40.36], uncertainty: { radiusKm: 12, certainty: "probable", note: "The action is placed on the coastal plain between Mount Olocrus and the sea; the line of the Leucus stream is used to fix it, and the exact frontage is reconstructed." }, major: true,
    belligerents: ["Roman Republic and allies", "Macedon"],
    commanders: [
      { faction: "rome", names: ["Lucius Aemilius Paullus (consul)", "Publius Cornelius Scipio Nasica"], certainty: "attested" },
      { faction: "macedon", names: ["Perseus"], certainty: "attested" },
    ],
    result: "Decisive Roman victory",
    summary: "Neither side intended to fight that afternoon. The phalanx advanced and drove the legions back until the broken ground of the plain opened gaps in its front; Paullus fed maniples into the gaps, and an unbeaten formation was destroyed from inside in about an hour.",
    significance: "Pydna abolished the Antigonid kingdom and, with it, the last power that could put a Hellenistic royal army in the field against Rome. It is also the battle after which Rome stopped pretending the Greek east could govern itself: Macedon was cut into four republics, and when that failed it became a province. The tactical lesson is the one Cynoscephalae had already taught and Pydna made undeniable — the phalanx is unbeatable frontally and cannot survive a broken line.",
    context: "Perseus had held the Elpeus line all summer and could not be attacked in it. Paullus sent Scipio Nasica with a column over the Olympus range to turn the position, and Perseus, warned, pulled back to the plain below Pydna and drew up there. Both armies then spent a day facing each other without engaging. What started the battle, in every account we have, was an accident involving a pack animal that got loose near the stream between the lines — which is worth stating plainly, because the largest infantry battle of the Hellenistic age began without either commander deciding on it.",
    forces: [
      { side: "Rome", estimate: "About 29,000: two legions with Italian and Greek allies, and 22 elephants on the right", certainty: "probable" },
      { side: "Macedon", estimate: "About 44,000, of which some 21,000 were phalangites in two corps with the guard on the flank", certainty: "probable", note: "The largest force Macedon ever put in the field, and the last." },
    ],
    casualties: [
      { side: "Macedon", estimate: "Reported as about 20,000 killed and 11,000 taken", certainty: "disputed" },
      { side: "Rome", estimate: "Reported as 80 to 100 dead", certainty: "disputed", note: "Plutarch attributes the lower figure to Nasica, who was there. Even allowing for a rout, a ratio of this order says more about how a broken phalanx died than about how the fighting went while it held." },
    ],
    moments: [
      { title: "The Elpeus line is turned", description: "Nasica takes a column over the mountain by night; Perseus abandons the position rather than be cut off, and forms up on the plain.", certainty: "attested" },
      { title: "A loose animal starts it", description: "Skirmishing over a stray pack animal near the stream pulls both lines forward before either commander has ordered an attack.", certainty: "probable" },
      { title: "The phalanx drives the legions back", description: "On level ground the pike front is irresistible; Paullus later said the sight of it was the most frightening thing he had seen.", certainty: "attested" },
      { title: "The ground opens the front", description: "Advancing over uneven ground the pike line loses its continuity and gaps appear along it.", certainty: "attested" },
      { title: "Maniples into the gaps", description: "Paullus breaks his line into its parts and sends them into the gaps, where the pike is useless and the sword is not.", certainty: "attested" },
    ],
    ancientSourceIds: ["livy-39-45", "polybius-27-30", "plutarch-aemilius"], modernSourceIds: thirdMacedonModern,
    uncertaintyNotes: [
      "The exact field is placed from the Leucus and the coastline rather than from any surviving marker.",
      "The Roman casualty figure is not credible as a measure of the fighting, only of the pursuit.",
      "The story of the loose animal appears in more than one source but is exactly the kind of detail a tradition invents to explain an unplanned battle.",
      "Livy's account of the battle itself is damaged in the manuscript, so the fullest narrative is Plutarch's.",
    ],
    previousSlug: "callinicus",
  },
];

const thirdPunicWar: Battle[] = [
  {
    id: "carthage", slug: "carthage", name: "Siege of Carthage", kind: "siege", startYear: -149, endYear: -146, displayDate: "149–146 BCE", location: "Carthage, on the gulf of Tunis", coordinates: [10.323, 36.853], uncertainty: { radiusKm: 5, certainty: "attested", note: "The city, its triple landward wall, the Byrsa citadel and the two harbours are archaeologically established; where individual assaults went in is not." }, major: true,
    belligerents: ["Roman Republic and Numidia", "Carthage"],
    commanders: [
      { faction: "rome", names: ["Manius Manilius", "Lucius Marcius Censorinus", "Publius Cornelius Scipio Aemilianus (from 147)"], certainty: "attested" },
      { faction: "carthage", names: ["Hasdrubal the Boetharch"], certainty: "attested" },
    ],
    result: "Carthage stormed and destroyed",
    summary: "Rome demanded that Carthage abandon its site and settle inland; the city refused, rearmed behind walls it had been disarmed inside, and held for three years. Scipio Aemilianus sealed the harbour, starved it through a winter, and took it street by street over six days in the spring of 146.",
    significance: "The end of the power Rome had fought for over a century, and the beginning of the province of Africa. It is also the clearest case in the atlas of a war fought because a state could be destroyed rather than because it was dangerous: Carthage had been disarmed since 201 and its offence was defending itself against a Numidian king Rome had encouraged. What the siege demonstrated militarily is that a Hellenistic-scale fortification could not be stormed, only enclosed — the city fell to a mole across its harbour mouth and a winter without food.",
    context: "The treaty of 201 forbade Carthage to make war without Roman consent, and Masinissa spent fifty years taking Carthaginian territory in the knowledge that any response would breach it. In 151 the last indemnity payment was made and Carthage, legally free of its debt, finally fought back — and lost to Masinissa as well. Rome declared war on the breach. The city then did everything asked of it: three hundred children of the leading families handed over as hostages, and every weapon in the arsenal surrendered — two hundred thousand sets of armour and two thousand catapults, by Appian's count. Only then was the final demand made, that the population abandon the site and rebuild ten miles from the sea. A city whose wealth was its harbour understood what that meant, and rearmed with nothing.",
    forces: [
      { side: "Rome", estimate: "A consular army of about 40,000 to 50,000, with a fleet, and Numidian cavalry", certainty: "probable" },
      { side: "Carthage", estimate: "The citizen body of a city of several hundred thousand, rearmed from scratch, with Hasdrubal's field army outside", certainty: "disputed", note: "Appian describes the whole population making weapons, including women cutting their hair for catapult cord — a detail that is either a real memory of the improvisation or the standard literary image of a city at bay." },
    ],
    casualties: [
      { side: "Carthage", estimate: "The city destroyed; Appian reports 50,000 surviving to be sold into slavery", certainty: "disputed", note: "The figure implies a death toll in the hundreds of thousands, which no ancient source is in a position to have counted." },
      { side: "Rome", estimate: "Heavy in the first two years of failed assaults; no usable figures survive", certainty: "disputed" },
    ],
    moments: [
      { title: "Disarmed, then told to move", description: "Carthage surrenders its hostages and its entire arsenal, and is then ordered to abandon the site. It refuses and begins making weapons.", certainty: "attested" },
      { title: "Two years of failed assaults", description: "The landward wall is triple and the ground in front of it narrow. Roman attacks on it achieve nothing and the besiegers suffer more than the besieged.", certainty: "probable" },
      { title: "The harbour sealed", description: "Scipio builds a mole across the harbour mouth. The Carthaginians cut a new channel and get a fleet out, but the city is cut off from supply.", certainty: "attested" },
      { title: "Six days in the streets", description: "The final assault goes in from the harbour quarter and fights uphill to the Byrsa house by house, burning as it goes.", certainty: "attested" },
      { title: "The Byrsa surrenders", description: "The citadel gives in; Hasdrubal surrenders in person, and his wife kills herself and their children in the burning temple rather than do the same.", certainty: "probable" },
    ],
    ancientSourceIds: ["appian-hann", "polybius-36-39", "livy-periochae-46-53"], modernSourceIds: thirdPunicModern,
    uncertaintyNotes: [
      "Polybius was present at the fall and his account of it survives only in fragments; the connected narrative is Appian's, written nearly three centuries later.",
      "The Roman decision to destroy the city rather than accept its surrender is reported without an explanation that satisfies anyone.",
      "The story that the site was ploughed and sown with salt is a modern invention and appears in no ancient source.",
      "Population and casualty figures are literary throughout.",
    ],
    nextSlug: "nepheris",
  },
  {
    id: "nepheris", slug: "nepheris", name: "Battle of Nepheris", kind: "land", startYear: -147, endYear: -147, displayDate: "winter 147/146 BCE", location: "Nepheris, in the hills south-east of Tunis", coordinates: [10.25, 36.6], uncertainty: { radiusKm: 20, certainty: "disputed", note: "Nepheris is placed in the hills above the Oued Miliane on the strength of the ancient itineraries; the site is not securely identified." }, major: false,
    belligerents: ["Roman Republic and Numidia", "Carthage"],
    commanders: [
      { faction: "rome", names: ["Publius Cornelius Scipio Aemilianus"], certainty: "attested" },
      { faction: "carthage", names: ["Diogenes"], certainty: "probable" },
    ],
    result: "Roman victory",
    summary: "Scipio destroyed the last Carthaginian force in the field, entrenched in a fortified camp at Nepheris, by pinning it frontally and sending a detachment round to attack from behind. With it went any prospect of the city being relieved.",
    significance: "Nepheris is why Carthage fell in 146 rather than holding on. A besieged city with a field army outside is a blockade that can be broken; without one it is only a question of how long the food lasts. The town had already beaten off a Roman attack in 149, and taking it in a single winter operation is the clearest demonstration of the difference Scipio's command made.",
    context: "The Carthaginian position at Nepheris had been the standing embarrassment of the war: a fortified camp in broken hill country a day's march from the city, which had wrecked one Roman army in 149 and supplied and encouraged Carthage ever since. Scipio dealt with it in the winter of 147/146, while the city itself was already sealed — the point being that he could now afford to detach a force at all, which his predecessors, unable to close the blockade, could not.",
    forces: [
      { side: "Rome", estimate: "A detachment of the besieging army with Numidian cavalry under Gulussa", certainty: "probable" },
      { side: "Carthage", estimate: "The last field force, reported as some tens of thousands in and around the camp", certainty: "disputed" },
    ],
    casualties: [
      { side: "Carthage", estimate: "Appian reports the force annihilated, with 70,000 killed and 10,000 captured", certainty: "disputed", note: "A figure larger than any plausible Carthaginian field army at this date, and one of the least credible in the atlas." },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
    ],
    moments: [
      { title: "The camp pinned in front", description: "Scipio attacks the entrenchments frontally, which is what the position is built to resist.", certainty: "probable" },
      { title: "A detachment sent round", description: "A force works round the broken ground to come at the camp from the rear while the defenders are committed.", certainty: "probable" },
      { title: "The last field army destroyed", description: "The camp falls, and with it the town. Nothing outside the walls can relieve Carthage now.", certainty: "attested" },
    ],
    ancientSourceIds: thirdPunicAncient, modernSourceIds: thirdPunicModern,
    uncertaintyNotes: [
      "The site is fixed only by the itineraries and remains debated.",
      "Appian's numbers cannot be reconciled with any credible estimate of Carthaginian manpower in 147.",
      "There were two actions at Nepheris — a Roman defeat in 149 and this victory — and the sources sometimes blur them.",
    ],
    previousSlug: "carthage",
  },
];

// Spain, Jugurtha and the Cimbri. The thinnest evidence since the fifth century
// with one exception: Sallust wrote a monograph on the Jugurthine War, and Plutarch
// a life of Marius. Everything outside those two texts is a paragraph a year.
const marianAncient = ["livy-periochae-54-70", "plutarch-marius"];
const marianModern = ["sampson-2010", "harris-1979"];

const MARIAN_BATTLE_ERA: Record<string, string> = {
  numantia: "iberian-wars",
  muthul: "jugurthine-war",
  noreia: "cimbric-war",
  arausio: "cimbric-war",
  "aquae-sextiae": "cimbric-war",
  vercellae: "cimbric-war",
};

const marianWars: Battle[] = [
  {
    id: "numantia", slug: "numantia", name: "Siege of Numantia", kind: "siege", startYear: -134, endYear: -133, displayDate: "134–133 BCE", location: "Numantia, on the upper Douro in Celtiberia", coordinates: [-2.44, 41.81], uncertainty: { radiusKm: 3, certainty: "attested", note: "The hill is securely identified and the Roman circumvallation and camps were excavated by Schulten in the early twentieth century — the best-preserved Roman siege works of the Republic." }, major: true,
    belligerents: ["Roman Republic", "Numantia and the Celtiberians"],
    commanders: [
      { faction: "rome", names: ["Publius Cornelius Scipio Aemilianus"], certainty: "attested" },
      { faction: "iberian", names: ["Rhetogenes", "Avarus"], certainty: "probable" },
    ],
    result: "Numantia starved out and destroyed",
    summary: "A hill town of perhaps eight thousand people had beaten four Roman armies and forced one to surrender. Scipio Aemilianus refused to fight it at all: he rebuilt the army's discipline, ringed the place with nine kilometres of wall and seven camps, and waited eight months.",
    significance: "Numantia ended twenty years of Roman failure in Spain and set the shape of Roman siegecraft for the rest of the Republic — the answer to a position that cannot be stormed is to make it a problem of supply. It also made the reputation that let Scipio be sent anywhere, and produced the excavated siege lines that are the best physical evidence for how a Republican army built.",
    context: "The Spanish wars had become a scandal at Rome. Commanders signed treaties to extract their armies and the Senate repudiated them; one consular army of twenty thousand had been surrounded and surrendered, saved only by terms its quaestor negotiated — Tiberius Gracchus, whose treatment over that treaty pushed him towards the tribunate that killed him. Scipio was sent by special dispensation, found an army with camp followers outnumbering soldiers, expelled them, and then declined battle entirely. The wall is the argument: he had concluded that the problem was not that Numantia was hard to beat but that Roman armies in Spain kept giving it the chance.",
    forces: [
      { side: "Rome", estimate: "About 60,000, including allied and Numidian contingents — Jugurtha commanded the Numidian cavalry", certainty: "probable", note: "Wildly disproportionate to the target, which is the point: the siege was designed to make fighting unnecessary." },
      { side: "Numantia", estimate: "Perhaps 8,000 people, of whom the fighting men were far fewer", certainty: "disputed" },
    ],
    casualties: [
      { side: "Numantia", estimate: "The population destroyed; the survivors sold and the town razed", certainty: "probable", note: "The tradition that most of the inhabitants killed themselves rather than surrender is preserved by Appian and is the kind of ending Roman accounts of Spanish sieges reliably supply." },
      { side: "Rome", estimate: "Light — the point of the method was that there was almost no fighting", certainty: "probable" },
    ],
    moments: [
      { title: "The army cleared out", description: "Scipio expels the traders, prostitutes and baggage that had accumulated round the camp, and drills what is left.", certainty: "attested" },
      { title: "Nine kilometres of wall", description: "Seven camps linked by a continuous circumvallation, with the river blocked by booms — the excavated line is still traceable.", certainty: "attested" },
      { title: "A breakout that finds nothing", description: "Rhetogenes gets out with a few men to appeal to other Celtiberian towns; none will move against Rome.", certainty: "probable" },
      { title: "Eight months", description: "The town starves, and surrenders.", certainty: "attested" },
    ],
    ancientSourceIds: ["appian-iberica", "livy-periochae-54-70"], modernSourceIds: ["astin-1967", "richardson-1986"],
    uncertaintyNotes: [
      "Numbers on both sides come through Appian and are hard to reconcile with the size of the site.",
      "The mass-suicide tradition is a topos of Roman writing about Spanish sieges and cannot be checked.",
      "Schulten's excavation fixed the siege works but his reconstruction of the campaign has been substantially revised.",
    ],
  },
  {
    id: "noreia", slug: "noreia", name: "Battle of Noreia", kind: "land", startYear: -113, endYear: -113, displayDate: "113 BCE", location: "Noreia, in the eastern Alps (site unidentified)", coordinates: [14.9, 46.9], uncertainty: { radiusKm: 60, certainty: "disputed", note: "Noreia was the chief town of the Norican kingdom and has never been located; the marker stands for a district in the eastern Alps, not a field." }, major: false,
    belligerents: ["Roman Republic", "Cimbri and Teutones"],
    commanders: [
      { faction: "rome", names: ["Gnaeus Papirius Carbo (consul)"], certainty: "attested" },
      { faction: "cimbri", names: ["Not recorded"], certainty: "disputed" },
    ],
    result: "Cimbric victory",
    summary: "The first meeting between Rome and the migrating peoples out of the north. Carbo tried to ambush a column that had already agreed to withdraw, and had his army destroyed.",
    significance: "Noreia begins thirteen years in which the Cimbri and Teutones beat five Roman armies, and it establishes the pattern: Rome's problem was not that these peoples were unbeatable but that consular armies kept attacking them badly. It is also the first entry in the case that made Marius' career possible.",
    context: "The Cimbri had come south into the territory of the Taurisci, who were Roman allies. Carbo confronted them; they offered to leave, and he gave them guides — who led them into a position where he had set an ambush. The ambush went wrong. Nothing about the account is flattering to Rome, and it survives because later writers used it to explain how a war that should never have happened began.",
    forces: [
      { side: "Rome", estimate: "A consular army, so perhaps 20,000 to 30,000", certainty: "speculative", note: "No figure survives; this is the standard establishment for the year and nothing more." },
      { side: "Cimbri and Teutones", estimate: "A migrating people with its fighting men, families and wagons", certainty: "disputed" },
    ],
    casualties: [
      { side: "Rome", estimate: "The army destroyed; the summaries say only that it was cut to pieces", certainty: "disputed", note: "A storm is credited with breaking off the pursuit and saving the survivors, which may be a real memory of weather in the Alps or a face-saving explanation of why anyone got away." },
      { side: "Cimbri and Teutones", estimate: "Not recorded", certainty: "disputed" },
    ],
    moments: [
      { title: "An offer to withdraw", description: "The Cimbri agree to leave Noric territory and accept Roman guides.", certainty: "probable" },
      { title: "The ambush set", description: "Carbo positions his army to attack the column while it is on the march and expecting nothing.", certainty: "probable" },
      { title: "The ambush fails", description: "The attack is discovered or mistimed; the Cimbri turn on the Roman line and break it.", certainty: "disputed" },
    ],
    ancientSourceIds: ["livy-periochae-54-70"], modernSourceIds: marianModern,
    uncertaintyNotes: [
      "Noreia has never been located and the battle site is unknown.",
      "Everything about the action comes from summaries and later notices; there is no narrative source.",
      "The treachery Carbo is charged with is reported by writers with an interest in the nobility's incompetence.",
    ],
    nextSlug: "arausio",
  },
  {
    id: "muthul", slug: "muthul", name: "Battle of the Muthul", kind: "land", startYear: -108, endYear: -108, displayDate: "108 BCE", location: "The river Muthul, in the Numidian interior (unidentified)", coordinates: [8.6, 35.9], uncertainty: { radiusKm: 70, certainty: "disputed", note: "Sallust describes the ground carefully and names no place that can be identified; the river has never been fixed, and the marker is a guess at the district." }, major: false,
    belligerents: ["Roman Republic", "Numidia"],
    commanders: [
      { faction: "rome", names: ["Quintus Caecilius Metellus (consul)", "Gaius Marius (legate)", "Publius Rutilius Rufus (legate)"], certainty: "attested" },
      { faction: "numidia", names: ["Jugurtha", "Bomilcar"], certainty: "attested" },
    ],
    result: "Roman victory, without effect",
    summary: "Jugurtha put his army along a ridge above the only road to water and waited for the Roman column to string out beneath it. Metellus' army fought its way clear and held the field — and the Numidians withdrew intact, which is what they had come to do.",
    significance: "The clearest illustration in the atlas of a victory that decides nothing. Jugurtha's war was not about holding ground; it was about never being caught, and about outlasting a Roman political system that changed commanders annually. The Muthul is the battle Rome won and then had to go on fighting for three more years — and it is where Marius, as legate, learned the war he would later be given.",
    context: "Sallust's account of this campaign is the fullest narrative of any battle in this stretch, and it is a set piece in a book arguing that the Roman nobility had become incapable. Metellus is his exception — genuinely able, genuinely incorruptible — which makes the fact that even Metellus could not finish the war the whole point. The Numidian army was built for this: light cavalry and mobile infantry that could disperse under pressure and re-form somewhere else, in country where a Roman army had to march to water.",
    forces: [
      { side: "Rome", estimate: "A consular army of about 30,000 with allied cavalry", certainty: "probable" },
      { side: "Numidia", estimate: "Numidian cavalry and light infantry, with elephants; no dependable total", certainty: "disputed", note: "Sallust gives an impression of great numbers without a figure, which for once may be honesty rather than rhetoric." },
    ],
    casualties: [
      { side: "Numidia", estimate: "Not recorded; the army withdrew in order", certainty: "disputed" },
      { side: "Rome", estimate: "Not recorded, and heavier than a victory implies", certainty: "disputed" },
    ],
    moments: [
      { title: "The column strung out", description: "The Roman army marches down towards water with the Numidians on the high ground above and in front of it.", certainty: "probable" },
      { title: "Attacked while divided", description: "Jugurtha comes down on the head and flank of a force that cannot form a single line.", certainty: "probable" },
      { title: "Rutilius takes the river", description: "The detachment sent ahead to secure the water holds it, which is what keeps the army alive.", certainty: "probable" },
      { title: "A field held, and nothing gained", description: "The Romans clear the ridge and camp on the ground. Jugurtha's army disperses and re-forms, undamaged.", certainty: "probable" },
    ],
    ancientSourceIds: ["sallust-jugurtha", "livy-periochae-54-70"], modernSourceIds: marianModern,
    uncertaintyNotes: [
      "The river Muthul has never been identified and the battlefield is unlocated.",
      "The entire tactical account is Sallust's, in a monograph written forty years later to make a political argument.",
      "No casualty figures survive for either side.",
    ],
  },
  {
    id: "arausio", slug: "arausio", name: "Battle of Arausio", kind: "land", startYear: -105, endYear: -105, displayDate: "6 October 105 BCE", location: "Near Arausio (Orange), on the Rhône", coordinates: [4.81, 44.14], uncertainty: { radiusKm: 20, certainty: "disputed", note: "The town is known and the river fixes the general position; the field itself is not identified." }, major: true,
    belligerents: ["Roman Republic", "Cimbri and Teutones"],
    commanders: [
      { faction: "rome", names: ["Gnaeus Mallius Maximus (consul)", "Quintus Servilius Caepio (proconsul)"], certainty: "attested" },
      { faction: "cimbri", names: ["Boiorix"], certainty: "probable" },
    ],
    result: "Catastrophic Roman defeat",
    summary: "Two Roman armies camped separately on the Rhône because their commanders would not serve together — one a consul, the other a patrician who would not take orders from a new man. The Cimbri destroyed them one after the other against the river.",
    significance: "The worst Roman defeat since Cannae, and unlike Cannae it was not inflicted by a great general — it was produced by two Romans refusing to combine. It emptied Italy of trained men, and the reaction to it broke the constitution: Marius was elected consul in absence and then re-elected annually until the war was over, which no law allowed. Arausio is why the Roman army stopped being a militia of property-owners.",
    context: "Caepio was a proconsul and a patrician; Mallius was the consul and a novus homo. Caepio refused to camp with him, refused to accept his authority, and — when Mallius opened negotiations with the Cimbri — attacked on his own to prevent a settlement he would get no credit for. The two armies were on opposite banks. What followed was less a battle than the destruction of two separate armies in sequence, with the river behind each of them. Caepio was later stripped of his citizenship, which by Roman standards is an admission of how bad it was.",
    forces: [
      { side: "Rome", estimate: "Reported as 80,000 soldiers with camp followers, in two armies that never combined", certainty: "disputed", note: "Almost certainly the largest force Rome had put in the field, and the figure is exactly the kind that grows to match the scale of a disaster." },
      { side: "Cimbri and Teutones", estimate: "Not recorded", certainty: "disputed" },
    ],
    casualties: [
      { side: "Rome", estimate: "Reported as 80,000 soldiers and 40,000 servants and camp followers killed", certainty: "disputed", note: "The number is transmitted through Livy's summaries and repeated by later writers. It should be read as 'both armies ceased to exist', which is not in doubt, rather than as a count." },
      { side: "Cimbri and Teutones", estimate: "Not recorded", certainty: "disputed" },
    ],
    moments: [
      { title: "Two camps, two commanders", description: "Caepio will not serve under a consul he considers his social inferior, and camps separately across the river.", certainty: "attested" },
      { title: "Caepio attacks alone", description: "To forestall a negotiated settlement that would be Mallius' credit, Caepio goes in with his own army first.", certainty: "probable" },
      { title: "Destroyed in detail", description: "Caepio's camp is overrun; the Cimbri then turn on Mallius, whose army has the Rhône at its back.", certainty: "probable" },
      { title: "Italy left open", description: "Nothing organised remains between the Cimbri and Italy — and they go to Spain instead, which buys Rome three years.", certainty: "attested" },
    ],
    ancientSourceIds: marianAncient, modernSourceIds: marianModern,
    uncertaintyNotes: [
      "The field has not been located.",
      "The casualty figure is a literary total and cannot be treated as a count.",
      "Why the Cimbri turned away from an open road into Italy is not explained by any source.",
    ],
    previousSlug: "noreia", nextSlug: "aquae-sextiae",
  },
  {
    id: "aquae-sextiae", slug: "aquae-sextiae", name: "Battle of Aquae Sextiae", kind: "land", startYear: -102, endYear: -102, displayDate: "102 BCE", location: "Near Aquae Sextiae (Aix-en-Provence)", coordinates: [5.45, 43.53], uncertainty: { radiusKm: 15, certainty: "disputed", note: "The town is certain and the action is placed in the hills near it; the specific valley is argued over and not fixed." }, major: true,
    belligerents: ["Roman Republic", "Teutones and Ambrones"],
    commanders: [
      { faction: "rome", names: ["Gaius Marius (consul)", "Claudius Marcellus (legate)"], certainty: "attested" },
      { faction: "cimbri", names: ["Teutobod"], certainty: "probable" },
    ],
    result: "Decisive Roman victory",
    summary: "Marius let the Teutones file past his fortified camp for six days without being drawn out, then followed them, took a position above their line of march, and destroyed them over two days — with a detachment of three thousand hidden behind them that came out of the woods at the moment the lines met.",
    significance: "The first half of the answer to thirteen years of defeat, and a demonstration of what the rebuilt army could do: a general who could refuse battle for two years, choose his ground, and hold a concealed force in position through a day's fighting had troops of a kind Rome had not previously had. It is also where the political bill starts running — these were long-service soldiers with no property, and what they were owed at the end was land Marius could not give them.",
    context: "Marius had spent two years declining to fight while his men dug a canal and got used to marching under their own baggage. The migration had by then split: the Teutones and Ambrones were to enter Italy by the coast road and the Cimbri through the Alpine passes, which meant Marius could deal with them one at a time. When the Teutones passed his camp they mocked the Romans by asking whether they had any messages for their wives. The account is Plutarch's and reads as a set piece; the six days are probably real, because they are exactly how long it takes a migration with wagons to pass a fixed point.",
    forces: [
      { side: "Rome", estimate: "Two legions with allies, perhaps 30,000 to 40,000, and a concealed detachment of 3,000", certainty: "probable" },
      { side: "Teutones and Ambrones", estimate: "Reported in the hundreds of thousands including families", certainty: "disputed", note: "Migration totals in the sources are not counts. The fighting strength is unrecoverable." },
    ],
    casualties: [
      { side: "Teutones and Ambrones", estimate: "Reported as 100,000 or more killed and captured, and the people destroyed as a people", certainty: "disputed", note: "That the Teutones ceased to exist is not in doubt; the number is literary. Plutarch adds that the field was still fertile years later, which is a topos." },
      { side: "Rome", estimate: "Not preserved; reported as light", certainty: "disputed" },
    ],
    moments: [
      { title: "Six days of marching past", description: "The migration files past the Roman camp. Marius keeps his men behind the rampart and makes them watch.", certainty: "probable" },
      { title: "The Ambrones at the river", description: "A first action at a watercourse where the Ambrones, caught crossing, are broken by troops already formed.", certainty: "probable" },
      { title: "Ground chosen above the road", description: "Marius takes a position on the slope, forcing an attack uphill against a formed line.", certainty: "probable" },
      { title: "Marcellus out of the woods", description: "Three thousand men concealed behind the enemy since the previous night attack the rear as the lines meet in front.", certainty: "attested" },
    ],
    ancientSourceIds: marianAncient, modernSourceIds: marianModern,
    uncertaintyNotes: [
      "The exact site near Aix is disputed between several valleys.",
      "Numbers for the migration are literary and should not be read as counts.",
      "The narrative is Plutarch's, in a life, and its best details are the ones a biographer would most want to be true.",
    ],
    previousSlug: "arausio", nextSlug: "vercellae",
  },
  {
    id: "vercellae", slug: "vercellae", name: "Battle of Vercellae", kind: "land", startYear: -101, endYear: -101, displayDate: "30 July 101 BCE", location: "The Raudian plain, in the Po valley near Vercellae", coordinates: [8.42, 45.32], uncertainty: { radiusKm: 40, certainty: "disputed", note: "The 'Raudian plain' is named by the sources and not identified; proposals range across the western Po valley, and the marker is the traditional one near Vercellae." }, major: true,
    belligerents: ["Roman Republic", "Cimbri"],
    commanders: [
      { faction: "rome", names: ["Gaius Marius (consul)", "Quintus Lutatius Catulus (proconsul)", "Lucius Cornelius Sulla (legate)"], certainty: "attested" },
      { faction: "cimbri", names: ["Boiorix"], certainty: "attested" },
    ],
    result: "Decisive Roman victory; the Cimbri destroyed",
    summary: "The Cimbri had crossed the Alps and pushed Catulus' army out of the way. Marius brought his own veterans over from Gaul, joined him, and fought on ground and at an hour of his choosing — with the sun and the dust blowing into the Cimbric line.",
    significance: "The end of the migration and of the war that had run since 113. It also settles the shape of the next fifty years of Roman politics: the army that won it was Marius' rather than Rome's, its veterans had to be paid in land the Senate would not vote, and the quarrel over who deserved the credit — Marius, Catulus, or Catulus' legate Sulla — is the first move in a rivalry that ends with a Roman army marching on Rome.",
    context: "The two halves of the migration had failed to arrive together: the Teutones were already destroyed when the Cimbri came down into Italy expecting to meet them. Marius chose the day and the direction. The sources agree that the heat and the dust ruined the Cimbri, who had come from the north and were fighting in a Po valley high summer at midday, facing east into the sun. Catulus' account of the battle, which Plutarch used, naturally gave Catulus' wing the decisive share; Marius' supporters said otherwise. The disagreement is itself the historically important thing.",
    forces: [
      { side: "Rome", estimate: "About 52,000 in two armies combined — Marius' veterans from Gaul and Catulus' from the Alps", certainty: "probable" },
      { side: "Cimbri", estimate: "Reported in six figures with families and wagons behind the line", certainty: "disputed" },
    ],
    casualties: [
      { side: "Cimbri", estimate: "Reported as 120,000 killed and 60,000 captured; the people ceased to exist", certainty: "disputed", note: "The women are said to have killed their children and themselves at the wagon line rather than be enslaved. That the Cimbri were annihilated is certain; the figures are not." },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
    ],
    moments: [
      { title: "Two armies joined", description: "Marius brings his Gallic veterans across to Catulus, whose army the Cimbri had already pushed back over the Adige.", certainty: "attested" },
      { title: "The hour and the facing chosen", description: "Marius takes the field at midday in high summer with the Cimbri facing into the sun and the dust.", certainty: "probable" },
      { title: "The wings envelop", description: "Marius' wings close on a line already blinded and overheating; the fighting is decided quickly.", certainty: "probable" },
      { title: "The wagon line", description: "The pursuit reaches the laager, where the non-combatants are killed or take their own lives.", certainty: "probable" },
      { title: "The quarrel over the credit", description: "Catulus and Sulla claim the decisive share; Marius' partisans deny it. The dispute outlives all of them.", certainty: "attested" },
    ],
    ancientSourceIds: marianAncient, modernSourceIds: marianModern,
    uncertaintyNotes: [
      "The Raudian plain has never been identified; proposals span the western Po valley.",
      "The battle narrative descends partly from Catulus' own memoir, which had a case to make.",
      "Casualty and migration figures are literary throughout.",
    ],
    previousSlug: "aquae-sextiae",
  },
];

// The Social War to the Ides of March. The evidence improves and changes kind:
// from 58 the atlas has a commander writing up his own campaigns each winter, and
// has to handle a source that is simultaneously the best witness available and a
// dispatch composed to keep its author in command.
const caesarAncient = ["caesar-bg", "plutarch-caesar"];
const caesarModern = ["goldsworthy-2006", "gelzer-1968"];
const civilAncient = ["caesar-bc", "appian-civil", "plutarch-caesar"];
const civilModern = ["goldsworthy-2006", "seager-2002"];

const CAESARIAN_BATTLE_ERA: Record<string, string> = {
  "asculum-picenum": "social-war",
  chaeronea: "sulla-mithridates",
  "colline-gate": "sulla-mithridates",
  silarius: "pompey-east",
  bibracte: "gallic-wars",
  sabis: "gallic-wars",
  carrhae: "gallic-wars",
  gergovia: "gallic-wars",
  alesia: "gallic-wars",
  dyrrhachium: "caesars-civil-war",
  pharsalus: "caesars-civil-war",
  thapsus: "caesars-civil-war",
  munda: "caesars-civil-war",
};

const caesarianWars: Battle[] = [
  {
    id: "asculum-picenum", slug: "asculum-picenum", name: "Siege of Asculum Picenum", kind: "siege", startYear: -89, endYear: -89, displayDate: "89 BCE", location: "Asculum Picenum (Ascoli Piceno), in Picenum", coordinates: [13.58, 42.85], uncertainty: { radiusKm: 4, certainty: "probable", note: "The town is certain; the siege works are not located." }, major: true,
    belligerents: ["Roman Republic", "The Italian confederation"],
    commanders: [
      { faction: "rome", names: ["Gnaeus Pompeius Strabo"], certainty: "attested" },
      { faction: "samnite", names: ["Judacilius"], certainty: "probable" },
    ],
    result: "Roman victory; the town taken and its leaders executed",
    summary: "The town where the revolt had begun with the massacre of a Roman praetor and every Roman in it was besieged for a year and stormed. Its magistrates were executed, its population driven out, and its property sold.",
    significance: "Asculum ended the northern half of the Social War, but the war was actually won by legislation: Rome offered citizenship first to every allied community that had not revolted and then to almost everyone else, and the confederation dissolved because most of its members had got what they were fighting for. It is the clearest case in the atlas of a war decided by conceding its cause — and the reason that within a generation the army that fought Rome's civil wars was an Italian army.",
    context: "The allies had furnished more than half of every army in this atlas since the Samnite wars and were still not citizens. When the tribune Drusus was assassinated in 91 while trying to enfranchise them, they stopped asking: they set up a federal state called Italia, with a capital at Corfinium, its own senate of five hundred and its own coinage — some of it showing the Italian bull goring the Roman wolf. Asculum is where it started, and Pompeius Strabo — the father of Pompey the Great — spent a year reducing it while his son learned the trade in the camp.",
    forces: [
      { side: "Rome", estimate: "A consular army with Picentine levies; no dependable figure", certainty: "disputed" },
      { side: "The Italian confederation", estimate: "The town's own population and a relieving force beaten off outside it", certainty: "disputed" },
    ],
    casualties: [
      { side: "The Italian confederation", estimate: "The leaders executed and the population expelled; no count survives", certainty: "disputed" },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
    ],
    moments: [
      { title: "How it began", description: "In 91 the town killed the Roman praetor sent to it and every Roman inside the walls. There was no going back from that for either side.", certainty: "probable" },
      { title: "A year of investment", description: "Strabo rings the town and beats off the field army that comes to relieve it.", certainty: "probable" },
      { title: "The town taken", description: "Asculum is stormed, its magistrates executed and its people driven out.", certainty: "attested" },
      { title: "Won by a law", description: "Citizenship is offered to the allies who did not revolt, then widened again. The confederation comes apart as its members accept it.", certainty: "attested" },
    ],
    ancientSourceIds: ["appian-civil"], modernSourceIds: ["harris-1979", "seager-2002"],
    uncertaintyNotes: [
      "Almost no tactical detail survives for any action of the Social War.",
      "Appian is the only continuous narrative and is writing three centuries later.",
      "The atlas draws the Italian side in the Samnite colour: the Samnites were its hard core and fought on to the Colline Gate, but the confederation was a coalition of many peoples and the label is a convenience.",
    ],
  },
  {
    id: "chaeronea", slug: "chaeronea", name: "Battle of Chaeronea", kind: "land", startYear: -86, endYear: -86, displayDate: "86 BCE", location: "The plain below Chaeronea, in Boeotia", coordinates: [22.85, 38.49], uncertainty: { radiusKm: 10, certainty: "probable", note: "The town and the plain are known; the Roman position is reconstructed from Plutarch's description of the ground." }, major: true,
    belligerents: ["Roman Republic", "Pontus"],
    commanders: [
      { faction: "rome", names: ["Lucius Cornelius Sulla"], certainty: "attested" },
      { faction: "pontus", names: ["Archelaus"], certainty: "attested" },
    ],
    result: "Decisive Roman victory",
    summary: "Sulla, outnumbered perhaps three to one and cut off from home by a government that had declared him an outlaw, beat a Pontic army on the same plain where Philip II had beaten Greece — by fortifying his flanks with ditches so the enemy cavalry could not use its numbers.",
    significance: "Chaeronea saved the Roman position in Greece and made Sulla's return to Italy possible: an army that has won like this will follow its general anywhere, including home. It is also the first battle in the atlas fought by a Roman commander who had been formally outlawed by his own government, and whose soldiers knew it and did not care — which is the Marian settlement working exactly as its critics feared.",
    context: "Mithridates had taken the province of Asia and had eighty thousand Romans and Italians in it killed on a single coordinated day, then crossed into Greece. Sulla arrived with five legions, no fleet, no money — he melted down the treasures of Delphi and Olympia — and no government behind him: Cinna and Marius had taken Rome and declared him a public enemy. He besieged and sacked Athens, then met Archelaus in Boeotia. The Pontic army had scythed chariots and a great superiority in cavalry, and needed open ground; Sulla's answer was to dig.",
    forces: [
      { side: "Rome", estimate: "About 15,000 foot and 1,500 horse", certainty: "probable" },
      { side: "Pontus", estimate: "Reported as 120,000; perhaps 40,000 in reality, with chariots and much stronger cavalry", certainty: "disputed", note: "Plutarch's total is not credible. What is not in doubt is that Sulla was heavily outnumbered and far weaker in horse." },
    ],
    casualties: [
      { side: "Pontus", estimate: "Plutarch reports all but 10,000 of the army lost", certainty: "disputed" },
      { side: "Rome", estimate: "Plutarch reports 12 men, and later found two more", certainty: "disputed", note: "Among the least believable figures in the atlas, and preserved here because it shows what the tradition around Sulla was prepared to say." },
    ],
    moments: [
      { title: "Ditches on both flanks", description: "Sulla entrenches his flanks so the Pontic cavalry cannot get round them, converting a battle of numbers into a battle of frontage.", certainty: "probable" },
      { title: "The chariots broken early", description: "Light troops and stakes take the scythed chariots before contact; they turn back into their own line, as at Magnesia a century before.", certainty: "probable" },
      { title: "The line pushed back", description: "Weight of numbers tells in the centre until Sulla rides along the front himself to hold it.", certainty: "probable" },
      { title: "The camp taken", description: "The Pontic army breaks against its own camp gates and is destroyed in the crush.", certainty: "probable" },
    ],
    ancientSourceIds: ["plutarch-sulla", "appian-civil"], modernSourceIds: ["seager-2002", "harris-1979"],
    uncertaintyNotes: [
      "Both armies' numbers come through Plutarch and are not usable as counts.",
      "The Roman casualty figure is a literary flourish rather than a report.",
      "The exact line of Sulla's entrenchments on the plain is reconstructed, not known.",
    ],
    nextSlug: "colline-gate",
  },
  {
    id: "colline-gate", slug: "colline-gate", name: "Battle of the Colline Gate", kind: "land", startYear: -82, endYear: -82, displayDate: "1 November 82 BCE", location: "Outside the Colline Gate, at the north-eastern wall of Rome", coordinates: [12.503, 41.906], uncertainty: { radiusKm: 3, certainty: "probable", note: "The gate's position on the Servian wall is known; the ground the fighting covered is now entirely built over." }, major: true,
    belligerents: ["Sulla and the senatorial cause", "The Marian government and its Samnite allies"],
    commanders: [
      { faction: "optimates", names: ["Lucius Cornelius Sulla", "Marcus Licinius Crassus"], certainty: "attested" },
      { faction: "populares", names: ["Pontius Telesinus", "Gaius Marius the Younger"], certainty: "attested" },
    ],
    result: "Sullan victory; Rome taken",
    summary: "The last Marian army, reinforced by Samnites who understood exactly what a Sullan victory meant for them, fought through a night in front of the walls of Rome. Sulla's own left was broken and he was nearly killed; Crassus won on the right and the battle with it.",
    significance: "The end of the first civil war and the beginning of the practice that ends the Republic: a Roman army settling who governs Rome. What followed was worse than the battle — Sulla published lists of names, and to be on one was to be outlawed, killed, and to have one's estate auctioned. The proscriptions made several fortunes, Crassus' among them, and established that political defeat could now be fatal.",
    context: "This is the first battle in the atlas fought by Romans against Romans, and the atlas has to draw it with two Roman colours because a single one would make it unreadable. The labels are conveniences: Sulla's side is drawn as the senatorial cause and his opponents as the popular one, but men moved between them and neither was a party. The Samnite contingent matters more than the labels do — Telesinus is said to have told his men that the wolves that preyed on Italian liberty would never go while the wood that sheltered them stood, and that Rome had to be destroyed. Sulla's reprisals afterwards fell hardest on Samnium.",
    forces: [
      { side: "Sulla and the senatorial cause", estimate: "Perhaps 40,000, with Crassus commanding the right", certainty: "disputed" },
      { side: "The Marian government and its Samnite allies", estimate: "A comparable force; the Samnite contingent reported at 40,000 alone", certainty: "disputed" },
    ],
    casualties: [
      { side: "The Marian government and its Samnite allies", estimate: "Reported as 50,000 dead across both sides; several thousand prisoners were executed afterwards in earshot of a Senate meeting", certainty: "disputed", note: "The mass execution of prisoners is reported by more than one source and is not the kind of detail a friendly tradition invents." },
      { side: "Sulla and the senatorial cause", estimate: "Heavy on the left, which broke; no figure survives", certainty: "disputed" },
    ],
    moments: [
      { title: "A night action outside the walls", description: "The fighting begins in the afternoon and runs on through the night — unusual, and part of why the accounts disagree about what happened where.", certainty: "probable" },
      { title: "Sulla's left broken", description: "The left wing gives way and is driven back against the gate; Sulla is nearly killed rallying it.", certainty: "probable" },
      { title: "Crassus wins the right", description: "On the other wing Crassus breaks through and pursues, and sends to Sulla for supper — the message that tells Sulla he has won.", certainty: "attested" },
      { title: "The lists", description: "Prisoners are executed en masse, and the proscription lists go up. Political defeat is now fatal, and profitable to somebody.", certainty: "attested" },
    ],
    ancientSourceIds: ["plutarch-sulla", "appian-civil", "plutarch-crassus"], modernSourceIds: ["seager-2002", "goldsworthy-2006"],
    uncertaintyNotes: [
      "The ground is under modern Rome and nothing of the field can be examined.",
      "The accounts disagree about which wing did what, partly because much of it was fought in darkness.",
      "All figures are literary; the scale of the proscriptions that followed is better attested than the battle.",
    ],
    previousSlug: "chaeronea",
  },
  {
    id: "silarius", slug: "silarius", name: "Battle of the Silarius", kind: "land", startYear: -71, endYear: -71, displayDate: "71 BCE", location: "Near the river Silarus (Sele), in Lucania", coordinates: [15.1, 40.5], uncertainty: { radiusKm: 35, certainty: "disputed", note: "The sources place the final battle in Lucania near the Silarus; no site is identified." }, major: true,
    belligerents: ["Roman Republic", "Spartacus' army"],
    commanders: [
      { faction: "rome", names: ["Marcus Licinius Crassus"], certainty: "attested" },
      { faction: "servile", names: ["Spartacus"], certainty: "attested" },
    ],
    result: "Roman victory; the slave army destroyed",
    summary: "Seventy escaped gladiators had become an army of tens of thousands that beat two consular armies and marched the length of Italy twice. Crassus cornered what was left of it in Lucania and destroyed it. Spartacus was killed in the fighting and his body was never found.",
    significance: "The last and largest of the three slave wars, and the one that shows what the Republic's Italy had become: a countryside worked by chained labour on estates whose owners lived in Rome, and which could produce an army of that size from its own workforce. Crassus crucified six thousand prisoners along the Appian Way from Capua to Rome — one every forty yards for a hundred and thirty miles — and the point of that was not deterrence of slaves alone.",
    context: "The war had already destroyed the reputations of several commanders when Crassus took it on and revived decimation to make his own troops afraid of him rather than of Spartacus. What the sources cannot explain is the strategy of the other side: the army reached the Alps in 72 with the road out of Italy open and turned back south. Whether Spartacus could not hold his followers to a plan, or never had one beyond survival, is the central unanswerable question of the war — and every ancient account, written by men who owned slaves, has a reason to prefer the answer that he had no plan.",
    forces: [
      { side: "Rome", estimate: "Eight to ten legions under Crassus, with Pompey's army approaching from Spain", certainty: "probable" },
      { side: "Spartacus' army", estimate: "Reported in the tens of thousands, already reduced by the defection of a large contingent that was destroyed separately", certainty: "disputed" },
    ],
    casualties: [
      { side: "Spartacus' army", estimate: "The army destroyed; 6,000 prisoners crucified along the Appian Way", certainty: "probable", note: "The crucifixions are attested and specific, which is unusual — they were meant to be seen and remembered." },
      { side: "Rome", estimate: "Not preserved", certainty: "disputed" },
    ],
    moments: [
      { title: "Penned in the toe of Italy", description: "Crassus digs a ditch and rampart across the peninsula to trap the army in Bruttium; Spartacus breaks out through it in a snowstorm.", certainty: "probable" },
      { title: "The army splits", description: "A large contingent separates and is destroyed on its own, which is what makes the final battle winnable.", certainty: "probable" },
      { title: "Brought to battle", description: "Cornered in Lucania and unable to avoid an engagement, the slave army fights a pitched battle on Roman terms for the first time.", certainty: "probable" },
      { title: "The Appian Way", description: "Six thousand prisoners are crucified along the road from Capua to Rome. Pompey, arriving late, cuts down fugitives and writes to the Senate claiming he ended the war.", certainty: "attested" },
    ],
    ancientSourceIds: ["plutarch-crassus", "appian-civil"], modernSourceIds: ["seager-2002", "harris-1979"],
    uncertaintyNotes: [
      "The battlefield is not located.",
      "Every surviving account was written by a member of the class the revolt threatened.",
      "Why the army turned back from the Alps in 72 is not explained by any source.",
    ],
  },
  {
    id: "bibracte", slug: "bibracte", name: "Battle of Bibracte", kind: "land", startYear: -58, endYear: -58, displayDate: "58 BCE", location: "Near Bibracte (Mont Beuvray), in Aeduan territory", coordinates: [4.04, 46.92], uncertainty: { radiusKm: 25, certainty: "disputed", note: "Bibracte itself is securely identified and excavated; Caesar says the battle was fought some miles from it and the field is not fixed." }, major: true,
    belligerents: ["Roman Republic", "The Helvetii"],
    commanders: [
      { faction: "rome", names: ["Gaius Julius Caesar"], certainty: "attested" },
      { faction: "gaul", names: ["Divico"], certainty: "probable" },
    ],
    result: "Decisive Roman victory",
    summary: "An entire people on the move — with its wagons, families and stores — was brought to battle against a hillside and destroyed. Caesar drew up on a slope with his legions in three lines and his baggage behind them on the summit, and let the Helvetii come uphill.",
    significance: "The first battle of the Gallic wars and the one that set the terms of all of them: Caesar had no instruction from Rome to fight the Helvetii, found a reason, and won a victory large enough that nobody in Rome would ask about the reason. It also establishes the pattern of the commentaries — a campaign explained as a response to a threat, in a book written by the man who chose to respond.",
    context: "The Helvetii had decided to leave their homeland in what is now Switzerland and settle in western Gaul, and they burned their own towns behind them so nobody could turn back. Their route lay through the Roman province or through Aeduan territory; Caesar refused the first and then treated the second as an attack on Rome's allies. He had one legion in the province when the migration began and four more within weeks, three of them raised on his own authority. Everything about the campaign is legally doubtful and militarily decisive, which is the Gallic wars in miniature.",
    forces: [
      { side: "Rome", estimate: "Six legions, perhaps 30,000 legionaries with Gallic auxiliary cavalry", certainty: "probable" },
      { side: "The Helvetii", estimate: "Caesar reports a census tablet in Greek found in their camp giving 368,000 people, of whom 92,000 were fighting men", certainty: "disputed", note: "The tablet is one of the most quoted figures in ancient history and one of the least checkable. It is also exactly the sort of document that makes a migration sound like an invasion." },
    ],
    casualties: [
      { side: "The Helvetii", estimate: "Caesar reports 130,000 survivors of 368,000, sent home to rebuild the towns they had burned", certainty: "disputed" },
      { side: "Rome", estimate: "Not given — Caesar rarely gives his own", certainty: "disputed", note: "The silence is consistent and deliberate throughout the commentaries." },
    ],
    moments: [
      { title: "Uphill against three lines", description: "Caesar forms four veteran legions in three lines on the slope with two new ones and the baggage above; the Helvetii attack uphill.", certainty: "attested" },
      { title: "Pila into a shield wall", description: "Javelins pin overlapping shields together and make them unusable, and the Gauls have to fight without them.", certainty: "probable" },
      { title: "Attacked in the rear", description: "As the Helvetii give ground, a fresh contingent arrives on the Roman flank and rear and the third line has to turn about to meet it.", certainty: "attested" },
      { title: "The wagon laager", description: "The fighting ends at the wagons, where the non-combatants are, and goes on into the night.", certainty: "probable" },
    ],
    ancientSourceIds: caesarAncient, modernSourceIds: caesarModern,
    uncertaintyNotes: [
      "The field is not located; only Bibracte itself is.",
      "Every figure comes from Caesar, reporting to the body deciding whether to extend his command.",
      "Archaeology at Helvetian sites has not supported abandonment on the scale Caesar describes.",
    ],
    nextSlug: "sabis",
  },
  {
    id: "sabis", slug: "sabis", name: "Battle of the Sabis", kind: "land", startYear: -57, endYear: -57, displayDate: "57 BCE", location: "On the river Sabis in Belgic territory — the Sambre or the Selle", coordinates: [3.9, 50.2], uncertainty: { radiusKm: 45, certainty: "disputed", note: "Caesar names the river Sabis and the site has been argued over for centuries; the Selle near Saulzoir now has better support than the traditional Sambre." }, major: true,
    belligerents: ["Roman Republic", "The Nervii and Belgic allies"],
    commanders: [
      { faction: "rome", names: ["Gaius Julius Caesar", "Titus Labienus"], certainty: "attested" },
      { faction: "gaul", names: ["Boduognatus"], certainty: "probable" },
    ],
    result: "Roman victory, very nearly a disaster",
    summary: "The Nervii attacked out of woods across a river while the legions were unarmed and building camp. The Roman army fought the battle with no line, no orders and no commander's plan — Caesar took a shield from a man in the ranks and fought in the front line himself.",
    significance: "The most dangerous moment of the Gallic wars, and the best evidence in the atlas for what the Republican army could do when its command structure had ceased to function. What saved it was not generalship but the training of individual legions and the initiative of officers who could see one part of the field. Rome voted fifteen days of public thanksgiving — the longest ever granted, and a measure of how the war was being sold at home.",
    context: "Caesar had turned north against the Belgic peoples, whom he describes as the bravest in Gaul because they were furthest from the traders who brought in the goods that made men soft. The Nervii had prepared for exactly this campaign: they had no cavalry, so they had spent years cutting and interweaving hedges to make their country impassable to horse, and they waited in cover until the Roman column was strung out and the leading legions were digging. The account is Caesar's, and it is unusually candid about how close he came to losing everything — which is itself a rhetorical choice.",
    forces: [
      { side: "Rome", estimate: "Eight legions, of which two were still on the march when the attack came", certainty: "probable" },
      { side: "The Nervii and Belgic allies", estimate: "Caesar reports 60,000 Nervii with Atrebates and Viromandui", certainty: "disputed" },
    ],
    casualties: [
      { side: "The Nervii and Belgic allies", estimate: "Caesar reports the Nervii reduced from 60,000 fighting men to 500, and their council from 600 to 3", certainty: "disputed", note: "He then accepts their surrender and restores them, which is hard to reconcile with annihilation — and they are fighting again by 54." },
      { side: "Rome", estimate: "Not given; heavy in the legions caught unformed", certainty: "disputed" },
    ],
    moments: [
      { title: "Attacked while building", description: "The Nervii come out of the woods and across the river at a run, into an army that has its tools out and its shields cased.", certainty: "attested" },
      { title: "No line, no orders", description: "Legions form where they stand, under whichever standard is nearest. Caesar says he had time to do only what the moment demanded.", certainty: "attested" },
      { title: "The commander in the ranks", description: "Caesar takes a shield from a soldier in the rear and goes forward into the fighting line on the endangered wing.", certainty: "attested" },
      { title: "The tenth legion turns back", description: "Labienus, having taken the enemy camp across the river, sees the crisis and sends the tenth legion back at a run into the Nervian rear.", certainty: "attested" },
    ],
    ancientSourceIds: caesarAncient, modernSourceIds: caesarModern,
    uncertaintyNotes: [
      "The river and the site are disputed; the traditional Sambre identification is now doubted.",
      "The annihilation figures cannot be reconciled with the Nervii fighting again three years later.",
      "The narrative's candour about near-disaster is a deliberate effect, not an accident of reporting.",
    ],
    previousSlug: "bibracte", nextSlug: "gergovia",
  },
  {
    id: "carrhae", slug: "carrhae", name: "Battle of Carrhae", kind: "land", startYear: -53, endYear: -53, displayDate: "53 BCE", location: "Near Carrhae (Harran), in northern Mesopotamia", coordinates: [39.03, 36.86], uncertainty: { radiusKm: 30, certainty: "disputed", note: "The town is known; the battle was fought in open country south of it and the site is not fixed." }, major: true,
    belligerents: ["Roman Republic", "Parthia"],
    commanders: [
      { faction: "rome", names: ["Marcus Licinius Crassus", "Publius Crassus"], certainty: "attested" },
      { faction: "parthia", names: ["Surena"], certainty: "attested" },
    ],
    result: "Catastrophic Roman defeat",
    summary: "Seven legions marched into open desert against an army of horse archers and heavy cavalry that never closed and never ran out of arrows — Surena had brought a camel train of spare shafts. The legions formed square, could not reach the enemy, and were shot to pieces over a day and a night.",
    significance: "The worst Roman defeat since Arausio and the one that mattered most politically: it killed Crassus, and with him the only thing balancing Caesar against Pompey. Militarily it is the clearest demonstration in the atlas of what the legion could not do — against mobile missile cavalry in open country with no water and no cavalry of its own, discipline and heavy infantry were not an answer. The captured standards were not recovered for thirty years.",
    context: "There was no war to fight. Crassus wanted a military reputation to set beside Pompey's and Caesar's, and Parthia was available; the invasion had no provocation and the tribunes cursed him publicly as he left. He then made every avoidable error — took the desert route on the advice of an Arab chief who was working for the other side, refused to follow the Euphrates where his flank would be covered, and let his son take the cavalry off after a feigned retreat. Publius' head was brought back to the army on a spear.",
    forces: [
      { side: "Rome", estimate: "Seven legions, about 35,000 foot, with 4,000 cavalry and 4,000 light troops", certainty: "probable" },
      { side: "Parthia", estimate: "About 9,000 horse archers and 1,000 cataphracts, with a camel train carrying spare arrows", certainty: "probable", note: "The disparity is the point: a force a quarter the size destroyed the army because the Romans could not make it fight." },
    ],
    casualties: [
      { side: "Rome", estimate: "About 20,000 killed and 10,000 taken; the survivors got out under Cassius", certainty: "probable", note: "The prisoners were settled on the far eastern frontier of the Parthian empire and are not heard of again." },
      { side: "Parthia", estimate: "Very light", certainty: "probable" },
    ],
    moments: [
      { title: "Into the desert", description: "Crassus leaves the Euphrates on local advice and marches into open country with no water and no flank cover.", certainty: "probable" },
      { title: "The square, and the arrows that do not stop", description: "The legions close up into a hollow square, which makes them a better target. The Parthians ride round it shooting, resupplied from the camel train.", certainty: "attested" },
      { title: "Publius drawn off", description: "The cavalry pursues a feigned retreat, is surrounded and destroyed, and its commander's head is displayed to the army.", certainty: "attested" },
      { title: "Killed under a truce", description: "The remnant retreats to Carrhae by night; Crassus is drawn into a parley and killed there.", certainty: "probable" },
    ],
    ancientSourceIds: ["plutarch-crassus", "dio-36-44"], modernSourceIds: ["seager-2002", "goldsworthy-2006"],
    uncertaintyNotes: [
      "The site south of Carrhae is not identified.",
      "Plutarch's account is shaped to make Crassus' greed the cause of everything that happened.",
      "The fate of the ten thousand prisoners is unknown beyond their deportation east.",
    ],
  },
  {
    id: "gergovia", slug: "gergovia", name: "Battle of Gergovia", kind: "land", startYear: -52, endYear: -52, displayDate: "52 BCE", location: "The plateau of Gergovia, above the Allier in Arvernian country", coordinates: [3.12, 45.72], uncertainty: { radiusKm: 6, certainty: "probable", note: "The plateau south of Clermont-Ferrand is the accepted site and Roman camps have been excavated below it." }, major: true,
    belligerents: ["Roman Republic", "The Gallic coalition"],
    commanders: [
      { faction: "rome", names: ["Gaius Julius Caesar"], certainty: "attested" },
      { faction: "gaul", names: ["Vercingetorix"], certainty: "attested" },
    ],
    result: "Gallic victory",
    summary: "Caesar attacked a fortified hill town he had already decided he could not take, intending a limited raid on one camp. The legions went past their orders, kept climbing to the walls, and were driven back down with the loss of forty-six centurions.",
    significance: "The only unambiguous defeat Caesar suffered in Gaul, and its consequences were immediate: the Aedui, Rome's oldest allies in the country, went over to Vercingetorix, and for the first time the whole of Gaul was against him. It is also the clearest evidence that his army's aggression was a liability as well as an asset — the commentaries blame the soldiers' eagerness, which is both plausible and exactly what a commander would write.",
    context: "Vercingetorix had understood something no previous Gallic leader had: Caesar's army was invincible in battle and entirely dependent on supply, so the way to beat it was to burn the country and refuse to fight. He had already forced Caesar to abandon one siege. At Gergovia the Gauls held a plateau with the town on top, and Caesar admits in the commentaries that he had given up on taking it and was manoeuvring to withdraw without looking beaten. The attack that followed was meant to be a feint.",
    forces: [
      { side: "Rome", estimate: "Six legions, with the Aeduan contingent already wavering", certainty: "probable" },
      { side: "The Gallic coalition", estimate: "The Arverni and allies holding the plateau and the wall below it", certainty: "disputed" },
    ],
    casualties: [
      { side: "Rome", estimate: "Caesar reports nearly 700 legionaries and 46 centurions killed", certainty: "probable", note: "One of the very few occasions he gives his own losses, and the centurion count says what the bare total does not — this fell on the men who led from the front." },
      { side: "The Gallic coalition", estimate: "Not recorded", certainty: "disputed" },
    ],
    moments: [
      { title: "A feint that succeeds", description: "Caesar moves a legion visibly to draw the Gauls to the far side of the plateau, and takes the camps below the town almost unopposed.", certainty: "attested" },
      { title: "Past the objective", description: "The recall is sounded and not heard, or not heeded. The legions keep going up to the wall of the town itself.", certainty: "attested" },
      { title: "Driven off the slope", description: "The Gauls return from the other side and come down on troops strung out on a hillside with no formation.", certainty: "probable" },
      { title: "The Aedui change sides", description: "Within weeks Rome's oldest allies in Gaul join the coalition, and Caesar is left facing the whole country.", certainty: "attested" },
    ],
    ancientSourceIds: caesarAncient, modernSourceIds: caesarModern,
    uncertaintyNotes: [
      "That the defeat was caused by indiscipline rather than by Caesar's plan is Caesar's own explanation.",
      "Gallic numbers and losses are not given at all.",
      "The excavated camps fix the Roman positions; the course of the assault up the slope is reconstructed.",
    ],
    previousSlug: "sabis", nextSlug: "alesia",
  },
  {
    id: "alesia", slug: "alesia", name: "Siege of Alesia", kind: "siege", startYear: -52, endYear: -52, displayDate: "52 BCE", location: "The oppidum of Alesia (Alise-Sainte-Reine), in Burgundy", coordinates: [4.5, 47.54], uncertainty: { radiusKm: 4, certainty: "attested", note: "The site was disputed for centuries and is now settled: Napoleon III's excavations and modern aerial survey have traced both lines of Roman works on the ground at Alise-Sainte-Reine." }, major: true,
    belligerents: ["Roman Republic", "The Gallic coalition"],
    commanders: [
      { faction: "rome", names: ["Gaius Julius Caesar", "Titus Labienus", "Mark Antony"], certainty: "attested" },
      { faction: "gaul", names: ["Vercingetorix", "Commius"], certainty: "attested" },
    ],
    result: "Decisive Roman victory; Gaul surrenders",
    summary: "Caesar penned Vercingetorix's army in a hilltop town behind eighteen kilometres of siege works, and then — knowing a relief army was coming — built a second line of twenty-one kilometres facing outwards and fought both at once. He was outnumbered on both sides of his own wall.",
    significance: "The end of Gallic independence and the most complete siege operation the ancient world records. Its lasting significance is not tactical but political: it left Caesar with eleven legions who had done this, and who were his. Eight years later they crossed the Rubicon. Alesia is where the Republic's last war of conquest and its last civil war meet.",
    context: "Vercingetorix's strategy had been working — burn the country, refuse battle, starve the legions out — and it broke down when he let his cavalry be beaten in the open and withdrew into Alesia with eighty thousand men. That was the one mistake Caesar needed. Trapping an army in a fortress only works if nobody relieves it, and the whole of Gaul was raising one; Caesar's answer was to build a second wall the other way round and fight facing both directions. The works are the most thoroughly excavated Roman siege in existence: ditches, a flooded trench, lilies, spurs and towers, all of it traced on the ground.",
    forces: [
      { side: "Rome", estimate: "Ten to twelve legions, perhaps 50,000 men, with German auxiliary cavalry", certainty: "probable" },
      { side: "The Gallic coalition", estimate: "Caesar reports 80,000 inside Alesia and a relief army of a quarter of a million", certainty: "disputed", note: "The relief figure is not credible and the internal one is questionable. The strategic situation — besieged and besieger both outnumbered — is not in doubt." },
    ],
    casualties: [
      { side: "The Gallic coalition", estimate: "The relief army dispersed, the besieged army surrendered entire; Vercingetorix handed over and later executed in Rome", certainty: "attested", note: "The non-combatants expelled from the town and refused passage through the Roman lines starved between the walls. Caesar records the decision without comment." },
      { side: "Rome", estimate: "Not given", certainty: "disputed" },
    ],
    moments: [
      { title: "Two walls, facing opposite ways", description: "Eighteen kilometres of circumvallation facing in, twenty-one of contravallation facing out, with ditches, towers and traps between.", certainty: "attested" },
      { title: "The town's non-combatants expelled", description: "To save food, the Mandubii send out their women, children and old people. Caesar will not let them through, and they die between the lines.", certainty: "attested" },
      { title: "The relief army arrives", description: "A coalition force reaches the outer wall and attacks it while the besieged attack the inner one at the same moment.", certainty: "attested" },
      { title: "The weak point at the north-west", description: "A camp on ground that could not be enclosed is attacked by 60,000 picked men; Caesar feeds in reserves and finally leads the last cavalry round behind them himself.", certainty: "attested" },
      { title: "Surrender", description: "The relief army disperses overnight. Vercingetorix rides out and lays his arms at Caesar's feet; Gaul is finished.", certainty: "attested" },
    ],
    ancientSourceIds: caesarAncient, modernSourceIds: caesarModern,
    uncertaintyNotes: [
      "The site is settled and the works are excavated — unusually for this atlas, the geometry is evidence rather than reconstruction.",
      "The relief army's reported size is not credible and is the single most doubted figure in the commentaries.",
      "Everything about the course of the fighting comes from the man who won it.",
    ],
    previousSlug: "gergovia",
  },
  {
    id: "dyrrhachium", slug: "dyrrhachium", name: "Battle of Dyrrhachium", kind: "land", startYear: -48, endYear: -48, displayDate: "July 48 BCE", location: "The lines south of Dyrrhachium (Durrës), on the Illyrian coast", coordinates: [19.5, 41.25], uncertainty: { radiusKm: 15, certainty: "disputed", note: "The town is known and the lines ran south of it along the coast; their course is not established on the ground." }, major: false,
    belligerents: ["Caesar", "Pompey and the Senate"],
    commanders: [
      { faction: "populares", names: ["Gaius Julius Caesar", "Mark Antony"], certainty: "attested" },
      { faction: "optimates", names: ["Gnaeus Pompeius Magnus", "Titus Labienus"], certainty: "attested" },
    ],
    result: "Pompeian victory",
    summary: "Caesar tried to besiege a larger and better-supplied army against the sea, building lines round it for over twenty kilometres. Pompey broke out at the southern end, rolled up the works, and Caesar's army ran.",
    significance: "The moment the civil war could have ended the other way. Caesar wrote afterwards that the enemy would have finished the war that day if their commander had known how to win — and Pompey, who had the beaten army in front of him, did not pursue. It is also the only time Caesar's veterans broke and ran, and he had to abandon the whole strategy and march inland, which is how Pharsalus came to be fought at all.",
    context: "Caesar had crossed the Adriatic in winter with half his force, evading a fleet that outnumbered him completely, and then could not get the other half over for months. He was outnumbered roughly two to one, cut off from supply by sea, and his men were eating bread made from roots. The decision to besiege a larger army in that position was a gamble on Pompey's caution, and it very nearly worked: the Pompeians were penned against the coast and running out of water and fodder. Then two deserters told Pompey exactly where the lines were weakest.",
    forces: [
      { side: "Caesar", estimate: "About 22,000 in the lines, on short rations", certainty: "probable" },
      { side: "Pompey and the Senate", estimate: "Perhaps 45,000, supplied by sea and much stronger in cavalry", certainty: "probable" },
    ],
    casualties: [
      { side: "Caesar", estimate: "Caesar reports 960 legionaries and 32 tribunes and centurions lost, and 32 standards taken", certainty: "probable", note: "He gives his own losses here, which he almost never does — the candour is part of the argument that the defeat was not decisive." },
      { side: "Pompey and the Senate", estimate: "Light", certainty: "disputed" },
    ],
    moments: [
      { title: "Lines against the sea", description: "Caesar builds over twenty kilometres of works to pen a larger army against the coast, and is himself short of everything.", certainty: "attested" },
      { title: "Two deserters", description: "Allobrogian cavalry officers desert and tell Pompey where the double line is unfinished.", certainty: "probable" },
      { title: "The southern end broken", description: "An attack by land and from the sea at the same point takes the works; Caesar's counter-attack goes wrong in ground nobody has scouted.", certainty: "probable" },
      { title: "The army runs, and is not pursued", description: "Caesar's troops break. Pompey halts, suspecting a trap, and Caesar gets away to Thessaly.", certainty: "attested" },
    ],
    ancientSourceIds: civilAncient, modernSourceIds: civilModern,
    uncertaintyNotes: [
      "The line of the siege works has not been established on the ground.",
      "Both principal accounts descend from Caesar, including on the question of why Pompey did not pursue.",
      "Casualty figures for the Pompeian side are not given by anyone.",
    ],
    nextSlug: "pharsalus",
  },
  {
    id: "pharsalus", slug: "pharsalus", name: "Battle of Pharsalus", kind: "land", startYear: -48, endYear: -48, displayDate: "9 August 48 BCE", location: "The plain of Pharsalus, on the Enipeus in Thessaly", coordinates: [22.38, 39.29], uncertainty: { radiusKm: 18, certainty: "disputed", note: "The battle is placed on the Enipeus near Pharsalus; which bank, and therefore which way the armies faced, has been argued for a century." }, major: true,
    belligerents: ["Caesar", "Pompey and the Senate"],
    commanders: [
      { faction: "populares", names: ["Gaius Julius Caesar", "Mark Antony", "Publius Sulla"], certainty: "attested" },
      { faction: "optimates", names: ["Gnaeus Pompeius Magnus", "Titus Labienus"], certainty: "attested" },
    ],
    result: "Decisive Caesarian victory",
    summary: "Pompey's plan was to turn Caesar's right with a cavalry arm seven times larger. Caesar saw it coming, hid six cohorts behind his own cavalry, and sent them into the horsemen's faces with their javelins used as thrusting spears. The cavalry broke, the flank they had uncovered was rolled up, and the war was decided in an afternoon.",
    significance: "The battle that ended the Republic as a functioning system, though nobody could have said so on the day. Pompey escaped to Egypt and was murdered stepping ashore; the senatorial cause fought on for three more years in Africa and Spain without ever again having the advantage. What Pharsalus demonstrates militarily is that a smaller army of long-service veterans commanded by one man beat a larger one commanded by a committee of senators who overruled their general into fighting.",
    context: "Pompey did not want this battle. His plan — supply superiority, cavalry superiority, and time — was working, and Caesar's army was the one starving. What forced him was his own side: the senators in his camp were already arguing about who would get which priesthood after the victory and accused him of prolonging the war to keep his command. He drew up with his left on the river and every one of his 7,000 cavalry on the other wing, intending to turn the flank and roll Caesar's line up from behind. It was the correct plan against any army that had not guessed it.",
    forces: [
      { side: "Caesar", estimate: "About 22,000 in eighty cohorts, with 1,000 cavalry", certainty: "probable" },
      { side: "Pompey and the Senate", estimate: "About 45,000 in one hundred and ten cohorts, with 7,000 cavalry", certainty: "probable", note: "Caesar's own figures, and unusually plausible: he had reason to state the odds accurately." },
    ],
    casualties: [
      { side: "Pompey and the Senate", estimate: "Caesar reports 15,000 killed and 24,000 surrendered", certainty: "disputed", note: "The surrender total is more interesting than the deaths: most of the army was pardoned and much of it enlisted, which is how Caesar fought the next three years." },
      { side: "Caesar", estimate: "Caesar reports 200 legionaries and 30 centurions", certainty: "disputed" },
    ],
    moments: [
      { title: "A fourth line, hidden", description: "Caesar takes six cohorts out of his third line and posts them obliquely behind his cavalry, out of sight, with orders not to throw their javelins.", certainty: "attested" },
      { title: "The cavalry charge succeeds", description: "Pompey's 7,000 horse drive Caesar's 1,000 off the field, exactly as intended, and swing in to take the legions from behind.", certainty: "attested" },
      { title: "Javelins in the face", description: "The hidden cohorts come out at them and use their pila as thrusting weapons aimed at the face. The cavalry — young men of good family, Caesar notes — break and do not come back.", certainty: "attested" },
      { title: "The flank rolled up", description: "With the cavalry gone, the same cohorts take Pompey's exposed left wing in the rear while the third line goes in fresh at the front.", certainty: "attested" },
      { title: "Pompey leaves", description: "Pompey rides to his camp, sits in his tent, and then leaves when the works are stormed. He is dead within two months.", certainty: "attested" },
    ],
    ancientSourceIds: civilAncient, modernSourceIds: civilModern,
    uncertaintyNotes: [
      "Which bank of the Enipeus the armies stood on is unresolved, which reverses the whole map of the battle.",
      "The tactic of the hidden cohorts is Caesar's own account of his own cleverness and has no independent witness.",
      "The casualty figures are his as well, and the disparity is not credible.",
    ],
    previousSlug: "dyrrhachium", nextSlug: "thapsus",
  },
  {
    id: "thapsus", slug: "thapsus", name: "Battle of Thapsus", kind: "land", startYear: -46, endYear: -46, displayDate: "6 April 46 BCE", location: "Outside Thapsus, on the Byzacene coast", coordinates: [11.04, 35.63], uncertainty: { radiusKm: 12, certainty: "probable", note: "The town is identified; the lines outside it are not fixed." }, major: true,
    belligerents: ["Caesar", "The senatorial cause and Numidia"],
    commanders: [
      { faction: "populares", names: ["Gaius Julius Caesar"], certainty: "attested" },
      { faction: "optimates", names: ["Quintus Caecilius Metellus Scipio", "Marcus Petreius"], certainty: "attested" },
      { faction: "numidia", names: ["Juba I"], certainty: "attested" },
    ],
    result: "Decisive Caesarian victory",
    summary: "The senatorial cause reassembled in Africa with a Numidian king, sixty elephants and fourteen legions. Caesar besieged Thapsus to force a battle; when it came his veterans started it themselves, without waiting for the order, and it was over in a few hours.",
    significance: "Thapsus destroyed the last coherent senatorial army and produced the death that mattered more than the battle: Cato killed himself at Utica rather than accept a pardon, which was the only weapon left against a man whose entire political method was clemency. A living Cato would have been a pardoned man; a dead one became the argument that killed Caesar two years later.",
    context: "After Pharsalus, Caesar had spent a year in Egypt and Asia while the survivors rebuilt in the one province they could hold. Juba of Numidia brought them cavalry, elephants and money, which also made the cause look like a foreign war to Italian opinion — something Caesar exploited. The battle itself is the least characteristic of his career: he did not order it. His army, drawn up and waiting while he hesitated, took a trumpeter's signal on the right and went forward, and he could either follow them or lose control of them.",
    forces: [
      { side: "Caesar", estimate: "Eight to ten legions with archers and slingers trained against elephants", certainty: "probable" },
      { side: "The senatorial cause and Numidia", estimate: "Perhaps fourteen legions with Numidian cavalry and about sixty elephants", certainty: "disputed" },
    ],
    casualties: [
      { side: "The senatorial cause and Numidia", estimate: "Reported at 10,000; the surrender was not accepted and much of the army was killed after it had given up", certainty: "disputed", note: "The massacre of men trying to surrender is reported by the author of the African War, who was on Caesar's side, and is the sharpest exception to Caesar's policy of clemency." },
      { side: "Caesar", estimate: "Reported at 50", certainty: "disputed" },
    ],
    moments: [
      { title: "A siege to force a battle", description: "Caesar invests Thapsus because taking the town matters less than making the enemy come to relieve it.", certainty: "probable" },
      { title: "The army starts without him", description: "A trumpeter on the right sounds the advance, the veterans go forward, and Caesar has to ride after his own line.", certainty: "probable" },
      { title: "The elephants turned", description: "Slingers and archers shoot the elephants at close range; they turn back through the Numidian left.", certainty: "probable" },
      { title: "No quarter", description: "The enemy army breaks and the surrender is not accepted. Cato, at Utica, kills himself rather than be pardoned.", certainty: "attested" },
    ],
    ancientSourceIds: ["appian-civil", "plutarch-caesar", "dio-36-44"], modernSourceIds: civilModern,
    uncertaintyNotes: [
      "The main narrative is the anonymous African War, written by an officer on Caesar's staff.",
      "Casualty figures on both sides are not usable.",
      "Whether Caesar lost control of his army or later found it convenient to say so cannot be settled.",
    ],
    previousSlug: "pharsalus", nextSlug: "munda",
  },
  {
    id: "munda", slug: "munda", name: "Battle of Munda", kind: "land", startYear: -45, endYear: -45, displayDate: "17 March 45 BCE", location: "Near Munda, in southern Baetica", coordinates: [-4.9, 37.35], uncertainty: { radiusKm: 40, certainty: "disputed", note: "Munda has never been securely located; sites near Osuna and Montilla are both proposed and the battle's ground is unknown." }, major: true,
    belligerents: ["Caesar", "The Pompeian cause in Spain"],
    commanders: [
      { faction: "populares", names: ["Gaius Julius Caesar"], certainty: "attested" },
      { faction: "optimates", names: ["Gnaeus Pompeius the Younger", "Titus Labienus"], certainty: "attested" },
    ],
    result: "Caesarian victory",
    summary: "The last battle of the civil war and the hardest of Caesar's life. Two veteran armies fought uphill and downhill on the same slope for most of a day with neither giving way, and Caesar said afterwards that he had often fought for victory but at Munda he had fought for his life.",
    significance: "Munda ended organised resistance and left nobody able to oppose him. He returned to Rome, was made dictator for life, and was killed eleven months later — which is the real significance of the battle: it removed every external check and left only the internal one, and sixty senators supplied that with daggers. Labienus, who had been Caesar's best officer through eight years in Gaul, died on the field fighting against him.",
    context: "Spain had been Pompeian ground since the 70s and had been badly governed by Caesar's men since. Pompey's sons raised thirteen legions there, many of them Roman settlers and veterans rather than provincials, and this time there was no question of an army of inferior quality. The fighting is the only occasion in the commentaries where the account admits the line came close to breaking and the commander went into it on foot — Caesar is said to have thought about killing himself if it went wrong.",
    forces: [
      { side: "Caesar", estimate: "Eight legions with Mauretanian cavalry, about 40,000", certainty: "probable" },
      { side: "The Pompeian cause in Spain", estimate: "Thirteen legions, about 70,000, though many below strength", certainty: "disputed" },
    ],
    casualties: [
      { side: "The Pompeian cause in Spain", estimate: "Reported at about 30,000, with Labienus among the dead", certainty: "disputed" },
      { side: "Caesar", estimate: "Reported at about 1,000 — far higher than any of his other victories", certainty: "disputed", note: "Even a literary figure this high says something true: this was not a rout, it was a fight between two armies of the same quality." },
    ],
    moments: [
      { title: "Uphill, and neither side moves", description: "The Pompeians hold the slope and will not come down; Caesar's veterans attack it and the fighting locks for hours.", certainty: "probable" },
      { title: "The commander on foot in the line", description: "With the line wavering, Caesar dismounts, takes a shield and goes into the front rank — the second time in the atlas he does this.", certainty: "probable" },
      { title: "The cavalry decides it", description: "Mauretanian horse under Bogud work round towards the Pompeian camp; a legion pulled back to face them is mistaken for a retreat and the line goes.", certainty: "probable" },
      { title: "Labienus dead", description: "Caesar's best officer from the Gallic wars is killed fighting against him, and is buried on the field.", certainty: "attested" },
    ],
    ancientSourceIds: ["appian-civil", "plutarch-caesar", "dio-36-44"], modernSourceIds: ["goldsworthy-2006", "gelzer-1968"],
    uncertaintyNotes: [
      "Munda's location is genuinely unknown; the marker is a best guess among several proposals.",
      "The principal narrative is the anonymous Spanish War, the crudest of the Caesarian continuations.",
      "The casualty figures are not usable, though the Roman total being unusually high is itself informative.",
    ],
    previousSlug: "thapsus",
  },
];

export const battles: Battle[] = [
  // Tagged by hand rather than derived from data/wars.ts: this module is in the
  // test import graph, which can only resolve "@/" aliases as type imports.
  ...earlyRepublic.map((battle) => ({ ...battle, war: EARLY_BATTLE_ERA[battle.slug] })),
  ...firstPunicWar.map((battle) => ({ ...battle, war: "first-punic" })),
  ...secondPunicWar.map((battle) => ({ ...battle, war: "second-punic" })),
  ...macedonianWar.map((battle) => ({ ...battle, war: "macedonian-second" })),
  ...seleucidWar.map((battle) => ({ ...battle, war: "seleucid-war" })),
  ...thirdMacedonianWar.map((battle) => ({ ...battle, war: "macedonian-third" })),
  ...thirdPunicWar.map((battle) => ({ ...battle, war: "punic-third" })),
  // Noreia and Arausio fall inside the Jugurthine era but belong to the Cimbric
  // war: the two ran concurrently, and the era can only name one of them per year.
  ...marianWars.map((battle) => ({ ...battle, war: MARIAN_BATTLE_ERA[battle.slug] })),
  // Carrhae falls inside the Gallic years and is not a Gallic battle; it is filed
  // there because an era owns a stretch of the timeline, not a theatre.
  ...caesarianWars.map((battle) => ({ ...battle, war: CAESARIAN_BATTLE_ERA[battle.slug] })),
];

export function getBattle(slug: string): Battle | undefined {
  return battles.find((battle) => battle.slug === slug);
}
