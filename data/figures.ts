import type { Certainty, Faction } from "@/types/history";

/**
 * A person the atlas can say something about.
 *
 * The rule that governs this file is the same one that governs the campaign
 * shelf: an entry may only claim battles the map actually holds. A figure with
 * `battleSlugs` is someone you can follow onto the map; a figure without them is
 * a signpost to a period the atlas has not reached, and says so on the page
 * rather than implying depth that is not there.
 *
 * That is why there are five emperors here and no detail behind them. The
 * mapped period ends in 44 BCE, four decades before the first of them held
 * power. Listing them without battles is honest; writing them up as though the
 * atlas covered their wars would not be.
 */
export interface HistoricalFigure {
  id: string;
  slug: string;
  name: string;
  /** The full Roman name, where the short one is a convention. */
  fullName?: string;
  title: string;
  faction: Faction;
  bornYear?: number;
  diedYear: number;
  /**
   * How well the dates are fixed. `traditional` for the early Republic, where
   * they come from the annalists and not from a record.
   */
  lifeCertainty: Certainty;
  /** The years they mattered militarily. Must bracket every battle listed below. */
  activeFrom: number;
  activeTo: number;
  periodId: string;
  /** One line: what this person is on the map for. */
  knownFor: string;
  description: string[];
  /** Battles in this atlas they fought in. Empty means the atlas has not reached them. */
  battleSlugs: string[];
  ancientSourceIds: string[];
  modernSourceIds: string[];
  /** What the sources cannot settle about them. */
  uncertaintyNotes: string[];
}

export const figures: HistoricalFigure[] = [
  // ── The conquest of Italy ─────────────────────────────────────────────────
  {
    id: "camillus", slug: "camillus", name: "Camillus", fullName: "Marcus Furius Camillus",
    title: "Dictator, five times", faction: "rome",
    bornYear: -446, diedYear: -365, lifeCertainty: "traditional",
    activeFrom: -406, activeTo: -367, periodId: "early-rome",
    knownFor: "Took Veii after a ten-year siege, and was remembered as the second founder of Rome.",
    description: [
      "Camillus is the first Roman commander in this atlas who is a person rather than a name in a consular list, and he may be less of a person than he looks. The tradition gives him the capture of Veii — the conquest that roughly doubled Roman territory — an exile on a corruption charge, a recall to save the city from the Gauls, and a career of five dictatorships. Modern scholarship has spent a century pulling that apart. The siege of Veii is real and archaeologically supported; the ten years are a literary echo of Troy; the recall from exile to defeat the Gauls at the moment of maximum humiliation is exactly the shape a family tradition would give it.",
      "What survives the scepticism is a genuine turning point. Rome annexed the territory of a city fifteen kilometres away and did not divide it among its neighbours, and from that point it was structurally larger than any single rival in central Italy. Whether one man did that is a different question from whether it happened.",
    ],
    battleSlugs: ["veii"],
    ancientSourceIds: ["livy-1-5", "plutarch-camillus"], modernSourceIds: ["cornell-1995", "forsythe-2005"],
    uncertaintyNotes: [
      "Every date here is annalistic and several are demonstrably reconstructed.",
      "The Furii had every reason to make their ancestor the saviour of Rome, and the tradition reads as though they did.",
    ],
  },
  {
    id: "pyrrhus", slug: "pyrrhus", name: "Pyrrhus of Epirus",
    title: "King of Epirus", faction: "epirote",
    bornYear: -319, diedYear: -272, lifeCertainty: "attested",
    activeFrom: -280, activeTo: -275, periodId: "early-rome",
    knownFor: "Beat Rome twice with pikes and elephants, and could not turn either win into a peace.",
    description: [
      "The best professional soldier of his generation, hired by Tarentum to fight a war it could not fight itself. Pyrrhus brought the Hellenistic art of war to Italy — a pike phalanx, war elephants Rome had never seen, and a commander who had learned under Alexander's successors — and beat Roman armies at Heraclea and Asculum. Both victories cost him irreplaceable troops he could not recruit locally, which is where the phrase comes from.",
      "His real discovery was political rather than tactical, and it is the discovery this whole atlas is about: Rome could lose battles indefinitely and would not negotiate. Every Hellenistic war ended when one side accepted terms. Pyrrhus won twice, offered generous terms twice, was refused twice, went to Sicily to fight Carthage instead, and eventually went home. He was killed in a street fight in Argos by a roof tile thrown by an old woman.",
    ],
    battleSlugs: ["heraclea", "asculum", "beneventum"],
    ancientSourceIds: ["plutarch-pyrrhus", "appian-samnite"], modernSourceIds: ["champion-2009", "cornell-1995"],
    uncertaintyNotes: [
      "Livy's books on this war are lost, so almost everything descends from Plutarch.",
      "Casualty figures for Heraclea and Asculum vary by a factor of three between sources.",
    ],
  },

  // ── The Punic wars ────────────────────────────────────────────────────────
  {
    id: "regulus", slug: "regulus", name: "Regulus", fullName: "Marcus Atilius Regulus",
    title: "Consul, 267 and 256 BCE", faction: "rome",
    bornYear: -307, diedYear: -250, lifeCertainty: "probable",
    activeFrom: -256, activeTo: -255, periodId: "middle-republic",
    knownFor: "Invaded Africa, refused the peace he was offered, and lost his army to a Spartan mercenary.",
    description: [
      "Regulus commanded the largest fleet action of the ancient world at Cape Ecnomus, landed in Africa, and beat a Carthaginian army at Adys. Carthage sued for peace. He demanded terms so harsh that continuing the war was the better option, and Carthage continued it — hiring a Spartan professional named Xanthippus, who looked at how a Roman army fought, put his cavalry and elephants where they would count, and destroyed Regulus at the Bagradas the following spring.",
      "What Rome did with the story afterwards is more famous than the campaign. The tradition has him sent to Rome on parole to negotiate an exchange of prisoners, arguing against it in the Senate, and returning voluntarily to Carthage to be tortured to death. It is a moral exemplum of the highest order and there is no good evidence for any of it. What is well attested is the strategic lesson: Rome learned that it could reach Africa and could not yet hold it, and did not try again for fifty years.",
    ],
    battleSlugs: ["cape-ecnomus", "africa-invasion", "adys", "bagradas"],
    ancientSourceIds: ["polybius-1"], modernSourceIds: ["lazenby-1996", "hoyos-2015"],
    uncertaintyNotes: [
      "The story of his return to Carthage under parole is a late moral tradition, not a report.",
      "Polybius is the only continuous source and wrote a century later.",
    ],
  },
  {
    id: "hannibal", slug: "hannibal", name: "Hannibal", fullName: "Hannibal Barca",
    title: "Commander in Iberia and Italy", faction: "carthage",
    bornYear: -247, diedYear: -183, lifeCertainty: "attested",
    activeFrom: -219, activeTo: -183, periodId: "middle-republic",
    knownFor: "Crossed the Alps, destroyed three Roman armies in three years, and held Italy for fifteen.",
    description: [
      "Hannibal did the thing that should have ended Rome and did not. In three campaigning seasons he destroyed a consular army at the Trebia, ambushed and annihilated another at Trasimene, and at Cannae encircled the largest force Rome had ever fielded and killed most of it in an afternoon. Southern Italy went over to him. Any Hellenistic state would have come to terms after the first of those, and the atlas draws the years after Cannae with Roman territory visibly reduced because that is what happened.",
      "Then nothing happened, for thirteen years. Rome refused to negotiate, refused a second pitched battle, raised new armies from a manpower base he could not match, and took Iberia away from him while he sat in the south of Italy unable to force a decision. He was recalled to Africa in 203 and beaten at Zama by a commander who had studied him. He spent his exile advising Antiochus III, commanded a fleet once and lost, and took poison rather than be handed over to Rome.",
    ],
    battleSlugs: ["saguntum", "alps-crossing", "trebia", "trasimene", "cannae", "zama", "eurymedon"],
    ancientSourceIds: ["polybius-3", "livy-21-30"], modernSourceIds: ["lazenby-1978", "goldsworthy-2000"],
    uncertaintyNotes: [
      "The Alpine pass he used is disputed and no proposal commands consensus.",
      "Every surviving account is Roman or written for a Roman audience; nothing Carthaginian survives.",
    ],
  },
  {
    id: "scipio-africanus", slug: "scipio-africanus", name: "Scipio Africanus",
    fullName: "Publius Cornelius Scipio Africanus",
    title: "Consul, 205 and 194 BCE", faction: "rome",
    bornYear: -236, diedYear: -183, lifeCertainty: "attested",
    activeFrom: -210, activeTo: -183, periodId: "middle-republic",
    knownFor: "Took Iberia from Carthage and beat Hannibal in Africa.",
    description: [
      "Scipio was given the Iberian command at twenty-five because nobody else wanted it — his father and uncle had both been killed there. He took New Carthage in a single assault by walking troops through a lagoon at low tide, beat Hasdrubal at Baecula, and at Ilipa reversed his own order of battle so that his best troops faced the enemy's worst. That manoeuvre, executed in contact, is the most sophisticated thing any Roman army does in this atlas.",
      "At Zama he faced Hannibal directly and won by anticipating him: he left lanes through his own formation for the elephants to run down harmlessly, and used his Numidian cavalry — Masinissa's, once Carthage's — to do to Hannibal what Hannibal's cavalry had done at Cannae. He was prosecuted for corruption a decade later, refused to answer the charge, and left Rome for good.",
    ],
    battleSlugs: ["new-carthage", "baecula", "ilipa", "great-plains", "zama"],
    ancientSourceIds: ["polybius-10", "polybius-11", "polybius-15", "livy-21-30"],
    modernSourceIds: ["lazenby-1978", "goldsworthy-2000"],
    uncertaintyNotes: [
      "Polybius knew Scipio's family personally and is not a neutral witness.",
      "The tide at New Carthage is presented as divine favour by Polybius and as local knowledge by modern accounts; the sources do not settle it.",
    ],
  },
  {
    id: "marcellus", slug: "marcellus", name: "Marcellus", fullName: "Marcus Claudius Marcellus",
    title: "Consul, five times", faction: "rome",
    bornYear: -268, diedYear: -208, lifeCertainty: "probable",
    activeFrom: -222, activeTo: -208, periodId: "middle-republic",
    knownFor: "Took Syracuse after two years, against Archimedes' engines.",
    description: [
      "Marcellus was the Roman commander who would fight when Fabius would not, and the pairing became proverbial — the sword and the shield of Rome. His siege of Syracuse is the best-documented technical problem in this atlas: a first-rate Hellenistic fortification defended by the best engineer of the ancient world, whose machines beat off a simultaneous assault by land and sea so comprehensively that the Romans gave up assaulting and settled down to blockade.",
      "The city fell after two years by escalade during a festival, and was sacked. Archimedes was killed by a soldier who did not know who he was, which every ancient account records with the same discomfort. Marcellus was killed two years later riding into an ambush while personally scouting — an unusually careless death for a commander of his experience, and one the sources report without explaining.",
    ],
    battleSlugs: ["syracuse"],
    ancientSourceIds: ["polybius-8", "livy-21-30"], modernSourceIds: ["lazenby-1978", "goldsworthy-2000"],
    uncertaintyNotes: [
      "The more elaborate of Archimedes' machines, including the burning mirrors, are later embellishments.",
      "Where the Romans got over the Epipolae wall is not securely placed.",
    ],
  },

  // ── The eastern wars ──────────────────────────────────────────────────────
  {
    id: "philip-v", slug: "philip-v", name: "Philip V", title: "King of Macedon", faction: "macedon",
    bornYear: -238, diedYear: -179, lifeCertainty: "attested",
    activeFrom: -221, activeTo: -179, periodId: "middle-republic",
    knownFor: "Lost Greece at Cynoscephalae, then spent twenty years rebuilding what Rome had left him.",
    description: [
      "Philip inherited Macedon at seventeen and spent his reign being outmanoeuvred by a power he had underestimated. He allied with Hannibal after Cannae, which achieved nothing except giving Rome a reason to come east; when Rome did come, he lost the Aoös line and then the war itself at Cynoscephalae, where the phalanx he commanded was destroyed on ground it could not hold together on.",
      "What he did afterwards is the more interesting half. Stripped of Greece and made to pay an indemnity, he spent two decades quietly rebuilding Macedon's mines, revenues and manpower under the terms Rome had imposed — all of it legal, all of it watched. He died leaving his son a kingdom stronger than the one that lost at Cynoscephalae, and a Rome that had noticed.",
    ],
    battleSlugs: ["aous", "cynoscephalae"],
    ancientSourceIds: ["polybius-18", "livy-31-33"], modernSourceIds: ["walbank-1940", "eckstein-2008"],
    uncertaintyNotes: [
      "Polybius is hostile to Philip and was writing for a Roman-dominated world.",
      "How far his rebuilding was preparation for war and how far it was ordinary government is the central unresolved question about him.",
    ],
  },
  {
    id: "flamininus", slug: "flamininus", name: "Flamininus", fullName: "Titus Quinctius Flamininus",
    title: "Consul, 198 BCE", faction: "rome",
    bornYear: -229, diedYear: -174, lifeCertainty: "attested",
    activeFrom: -198, activeTo: -194, periodId: "middle-republic",
    knownFor: "Broke the phalanx at Cynoscephalae, then declared the Greeks free and went home.",
    description: [
      "Thirty years old and philhellene, Flamininus forced the Aoös gorge on local information, beat Philip at Cynoscephalae in an accidental battle neither commander had chosen, and then did the thing nobody expected: at the Isthmian Games of 196 he had a herald proclaim the Greek cities free — no garrisons, no tribute, no governor. The crowd's reaction is one of the few moments of mass emotion the ancient sources record in detail.",
      "In 194 he withdrew every Roman soldier from Greece, including the three fortresses Philip had called the fetters of Greece, and sailed for Italy. It is the one occasion in this atlas where Rome does exactly what it said it would do — and it left the fortresses standing empty for the next army that wanted them, which arrived two years later under Antiochus III.",
    ],
    battleSlugs: ["aous", "cynoscephalae"],
    ancientSourceIds: ["polybius-18", "livy-31-33"], modernSourceIds: ["eckstein-2008", "gruen-1984"],
    uncertaintyNotes: [
      "Whether the freedom of the Greeks was policy or personal vanity is argued in the ancient sources themselves.",
      "The decisive manoeuvre at Cynoscephalae is credited to an unnamed tribune, not to him.",
    ],
  },
  {
    id: "antiochus-iii", slug: "antiochus-iii", name: "Antiochus III", title: "Seleucid king", faction: "seleucid",
    bornYear: -241, diedYear: -187, lifeCertainty: "attested",
    activeFrom: -222, activeTo: -187, periodId: "middle-republic",
    knownFor: "Rebuilt the Seleucid empire, then lost its western half to Rome in two years.",
    description: [
      "Antiochus spent twenty-five years putting the Seleucid empire back together — east to Bactria, south to Coele-Syria at Panium, west into Asia Minor and Thrace — and earned the title 'the Great' for it. Then he accepted an invitation from the Aetolians to come to Greece, crossed with about ten thousand men on the assumption that the Greeks would rise for him, and found that almost nobody did.",
      "He was thrown out of Europe at Thermopylae within a year, lost the sea at Myonnesus, and was broken at Magnesia by an army half the size of his own. Apamea took everything north and west of the Taurus, imposed the largest indemnity in ancient history, and left him needing money badly enough that he was killed two years later trying to loot a temple in Elymais.",
    ],
    battleSlugs: ["thermopylae", "magnesia"],
    ancientSourceIds: ["polybius-21", "livy-34-37", "appian-syrian"],
    modernSourceIds: ["grainger-2002", "bar-kochva-1976"],
    uncertaintyNotes: [
      "The size of his army at Magnesia is reported at figures no reconstruction of Seleucid establishment strength supports.",
      "What he expected to achieve in Greece with ten thousand men is not explained by any source.",
    ],
  },
  {
    id: "perseus", slug: "perseus", name: "Perseus", title: "Last king of Macedon", faction: "macedon",
    bornYear: -212, diedYear: -166, lifeCertainty: "attested",
    activeFrom: -179, activeTo: -168, periodId: "middle-republic",
    knownFor: "Beat Rome in the field and lost the kingdom anyway.",
    description: [
      "Perseus inherited his father's rebuilt kingdom and spent his reign doing things that were not forbidden and were read at Rome as preparation for war — cancelling debts, taking in exiles, marrying into the Seleucid house. When war came he won the opening engagement at Callinicus and immediately offered peace on the same terms he had been refused before it. Rome refused again, from a position of defeat, and that refusal is the moment the war stopped being about anything negotiable.",
      "He then held the Elpeus line for a whole season against a consular army that could not shift it, and lost everything in about an hour at Pydna when he had to fight on open ground. He was taken to Rome, walked in Aemilius Paullus' triumph, and died in custody. Macedon was abolished and cut into four republics forbidden to trade with one another.",
    ],
    battleSlugs: ["callinicus", "pydna"],
    ancientSourceIds: ["livy-39-45", "polybius-27-30"], modernSourceIds: ["gruen-1984", "eckstein-2008"],
    uncertaintyNotes: [
      "Every surviving account is written from the side that destroyed him.",
      "Whether he could have pressed his advantage after Callinicus is the judgement every source makes and none supports.",
    ],
  },
  {
    id: "aemilius-paullus", slug: "aemilius-paullus", name: "Aemilius Paullus",
    fullName: "Lucius Aemilius Paullus Macedonicus",
    title: "Consul, 182 and 168 BCE", faction: "rome",
    bornYear: -229, diedYear: -160, lifeCertainty: "attested",
    activeFrom: -182, activeTo: -167, periodId: "middle-republic",
    knownFor: "Destroyed the last Macedonian army at Pydna, in about an hour.",
    description: [
      "Sent out in 168 to finish a war that had been going badly for three years, Paullus turned the Elpeus line by sending a column over the Olympus range, forced Perseus onto open ground, and then did not attack — the battle started by accident over a stray pack animal while both armies were watering. What followed is the clearest tactical demonstration in the atlas: the phalanx drove his legions back on level ground, lost its continuity crossing broken ground, and was destroyed from inside once he broke his own line into its parts and fed them into the gaps.",
      "He is also the man who carried out the settlement, and it is worth stating plainly what that involved. Epirus, which had gone over to Perseus, was sacked to order: seventy towns destroyed and a hundred and fifty thousand people sold, as a reward for his soldiers. He is remembered as the most cultured Roman of his generation, and both things are true at once.",
    ],
    battleSlugs: ["pydna"],
    ancientSourceIds: ["plutarch-aemilius", "livy-39-45"], modernSourceIds: ["gruen-1984", "eckstein-2008"],
    uncertaintyNotes: [
      "Livy's account of the battle is damaged in the manuscript, so the fullest narrative is Plutarch's life.",
      "The story of the loose animal appears in more than one source and is exactly the detail a tradition invents to explain an unplanned battle.",
    ],
  },
  {
    id: "scipio-aemilianus", slug: "scipio-aemilianus", name: "Scipio Aemilianus",
    fullName: "Publius Cornelius Scipio Aemilianus Africanus",
    title: "Consul, 147 and 134 BCE", faction: "rome",
    bornYear: -185, diedYear: -129, lifeCertainty: "attested",
    activeFrom: -149, activeTo: -129, periodId: "middle-republic",
    knownFor: "Destroyed Carthage, and then took Numantia by refusing to fight it.",
    description: [
      "The son of Aemilius Paullus and the adopted grandson of Africanus, given the African command below the legal age because two years of siege had produced nothing. He sealed Carthage's harbour with a mole, destroyed the last field army at Nepheris, and took the city street by street over six days. Polybius, who was standing next to him, records that he wept and quoted Homer on the fall of Troy — and said that he feared the same would one day be said of Rome.",
      "Twenty years later he was sent to Spain, where four Roman armies had failed against a hill town of eight thousand people. He expelled the camp followers, rebuilt the army's discipline, and then declined battle entirely: nine kilometres of wall, seven camps, and eight months. The excavated siege works at Numantia are the best physical evidence for how a Republican army built. He died suddenly in 129, and murder was widely suspected.",
    ],
    battleSlugs: ["carthage", "nepheris", "numantia"],
    ancientSourceIds: ["appian-hann", "appian-iberica", "polybius-36-39"],
    modernSourceIds: ["astin-1967", "richardson-1986"],
    uncertaintyNotes: [
      "Polybius was his client and friend, which shapes everything favourable in the record.",
      "The Roman decision to destroy Carthage rather than accept its surrender is reported without an explanation that satisfies anyone.",
    ],
  },

  // ── The late Republic ─────────────────────────────────────────────────────
  {
    id: "jugurtha", slug: "jugurtha", name: "Jugurtha", title: "King of Numidia", faction: "numidia",
    bornYear: -160, diedYear: -104, lifeCertainty: "probable",
    activeFrom: -134, activeTo: -105, periodId: "late-republic",
    knownFor: "Fought Rome to a standstill for seven years, and bought his way out twice.",
    description: [
      "Jugurtha learned the Roman army from inside it, commanding Numidian cavalry for Scipio Aemilianus at Numantia, and drew the conclusion that Rome's weakness was not military. He took the Numidian throne by murder, and when Rome intervened he twice bought a settlement — once from a consul, once from a commission — and had a rival claimant killed inside Rome itself while under safe conduct. Sallust reports him leaving the city saying it was a place where everything was for sale.",
      "Militarily he was never caught. His war was built on dispersal and re-formation in country where a Roman army had to march to water, and even Metellus — honest, competent, and the exception in Sallust's account — could beat him at the Muthul without changing anything. He was finally handed over by his own father-in-law, walked in Marius' triumph, and was starved to death in the Tullianum.",
    ],
    battleSlugs: ["numantia", "muthul"],
    ancientSourceIds: ["sallust-jugurtha"], modernSourceIds: ["sampson-2010", "harris-1979"],
    uncertaintyNotes: [
      "Sallust's monograph is a political argument about the Roman nobility, and selects accordingly.",
      "His birth date and much of his early career are not securely fixed.",
    ],
  },
  {
    id: "marius", slug: "marius", name: "Gaius Marius", title: "Consul, seven times", faction: "rome",
    bornYear: -157, diedYear: -86, lifeCertainty: "attested",
    activeFrom: -109, activeTo: -86, periodId: "late-republic",
    knownFor: "Destroyed the Cimbri and Teutones, and rebuilt the army so it belonged to its general.",
    description: [
      "A new man from Arpinum with no consular ancestors, Marius won the consulship in 107 by telling the assembly that the nobility could not fight, took the African command from Metellus by a vote of the people over the Senate's head, and finished the Jugurthine war. Then came Arausio, where two Roman armies that would not cooperate were destroyed on the Rhône, and Marius was elected consul every year until the Cimbric war was over — which no law allowed and nobody was willing to prevent.",
      "He spent two years refusing battle and drilling, then destroyed the Teutones at Aquae Sextiae and the Cimbri at Vercellae in successive summers. The army that did it was enlisted from men with no property, served long, and had nothing to go back to — so what it was owed at discharge was land, and the only person who could get it for them was the man who had led them. Every commander after him understood this. Marius himself ended badly: seven times consul, driven out of Rome by Sulla, back at the head of a massacre, and dead seventeen days into a seventh consulship.",
    ],
    battleSlugs: ["muthul", "aquae-sextiae", "vercellae"],
    ancientSourceIds: ["plutarch-marius", "sallust-jugurtha"], modernSourceIds: ["sampson-2010", "harris-1979"],
    uncertaintyNotes: [
      "How much of the army reform was his and how much was already under way is genuinely disputed.",
      "Plutarch's life turns hostile in its second half and shapes the later career accordingly.",
    ],
  },
  {
    id: "sulla", slug: "sulla", name: "Sulla", fullName: "Lucius Cornelius Sulla Felix",
    title: "Dictator, 82–79 BCE", faction: "optimates",
    bornYear: -138, diedYear: -78, lifeCertainty: "attested",
    activeFrom: -107, activeTo: -79, periodId: "late-republic",
    knownFor: "The first Roman to march an army on Rome, and the first to publish lists of citizens to be killed.",
    description: [
      "Sulla took Jugurtha's surrender in person as Marius' quaestor, which began a quarrel that ran for thirty years. In 88, when the assembly transferred the Mithridatic command from him to Marius, he marched six legions on Rome. All but one of his officers refused to go with him; the soldiers did not, and that is the fact that matters — the army had become the general's.",
      "He then fought a foreign war as a declared public enemy, beating far larger Pontic armies at Chaeronea and Orchomenus with no fleet, no money and no government behind him, and made a lenient peace so he could bring the army home. The Colline Gate gave him Rome; the proscriptions that followed made political defeat fatal and profitable at once. He then wrote a constitution handing everything to the Senate, resigned the dictatorship, walked out of public life, and died in bed two years later — which nobody expected and nobody has satisfactorily explained.",
    ],
    battleSlugs: ["vercellae", "chaeronea", "colline-gate"],
    ancientSourceIds: ["plutarch-sulla", "appian-civil"], modernSourceIds: ["seager-2002", "harris-1979"],
    uncertaintyNotes: [
      "His own memoirs are lost but underlie much of the favourable material in Plutarch.",
      "The scale of the proscriptions is reported at figures between 500 and 9,000 names.",
    ],
  },
  {
    id: "mithridates", slug: "mithridates", name: "Mithridates VI", title: "King of Pontus", faction: "pontus",
    bornYear: -135, diedYear: -63, lifeCertainty: "attested",
    activeFrom: -88, activeTo: -63, periodId: "late-republic",
    knownFor: "Overran Roman Asia and had eighty thousand Romans and Italians killed in a single day.",
    description: [
      "Mithridates fought Rome for twenty-five years across three wars and is the only enemy in this atlas who was genuinely popular in the provinces he took. That is the meaning of the massacre of 88: the order to kill every Roman and Italian in Asia on one coordinated day was carried out by the Greek cities themselves, and it was carried out because a generation of tax-farming had made Roman rule hated. The figure of eighty thousand is the lowest ancient estimate.",
      "He was beaten by Sulla, then by Lucullus, then finally driven out for good by Pompey, and each time he came back — from Armenia, from the Crimea, raising new armies from a kingdom that kept producing them. Cornered at last by his own son's revolt, he tried to poison himself and could not: he had spent a lifetime taking small doses against exactly that risk, and had to have a bodyguard kill him.",
    ],
    battleSlugs: ["chaeronea"],
    ancientSourceIds: ["plutarch-sulla", "plutarch-lucullus"], modernSourceIds: ["seager-2002", "harris-1979"],
    uncertaintyNotes: [
      "Everything about him comes through Roman sources with an interest in his cruelty.",
      "The massacre figure is repeated rather than counted, and the true scale is unknowable.",
    ],
  },
  {
    id: "spartacus", slug: "spartacus", name: "Spartacus", title: "Leader of the slave army", faction: "servile",
    diedYear: -71, lifeCertainty: "disputed",
    activeFrom: -73, activeTo: -71, periodId: "late-republic",
    knownFor: "Turned seventy escaped gladiators into an army that beat two consuls.",
    description: [
      "A Thracian who had served in a Roman auxiliary unit, deserted, been enslaved and sent to a gladiatorial school at Capua, Spartacus broke out with about seventy others using kitchen equipment. Within two years the group had become an army of tens of thousands that destroyed the forces sent against it, beat both consuls of 72 in the field, and marched the length of Italy to the Alps.",
      "And then turned round. No source explains it, and the explanations offered — that he could not hold his followers to a plan, that he intended to attack Rome, that the Gauls and Germans among them refused to leave — are all Roman guesses. Crassus penned the army in Bruttium, it broke out, and it was destroyed in Lucania. Spartacus killed his own horse before the last battle so he could not run, and his body was never found. Six thousand prisoners were crucified along the road from Capua to Rome, one every forty yards.",
    ],
    battleSlugs: ["silarius"],
    ancientSourceIds: ["plutarch-crassus", "appian-civil"], modernSourceIds: ["seager-2002", "harris-1979"],
    uncertaintyNotes: [
      "Every surviving account was written by a member of the class the revolt threatened.",
      "His origins, his aims, and the turn back from the Alps are all unrecoverable.",
      "Even his name may be a title rather than a personal name.",
    ],
  },
  {
    id: "crassus", slug: "crassus", name: "Crassus", fullName: "Marcus Licinius Crassus",
    title: "Consul, 70 and 55 BCE", faction: "rome",
    bornYear: -115, diedYear: -53, lifeCertainty: "attested",
    activeFrom: -83, activeTo: -53, periodId: "late-republic",
    knownFor: "The richest man in Rome, who wanted a soldier's reputation and lost seven legions getting it.",
    description: [
      "Crassus won the battle that gave Sulla Rome, made a fortune out of the proscription auctions that followed, and destroyed Spartacus — and then watched Pompey, arriving late and cutting down fugitives, write to the Senate claiming to have ended the war. That resentment shaped the rest of his career. He financed Caesar, joined the private arrangement between the three of them, and took a second consulship and a Syrian command in 55 for one reason: he wanted a war of his own.",
      "There was none available, so he invented one. The invasion of Parthia had no provocation and the tribunes cursed him publicly as he left. He left the Euphrates on the advice of an Arab chief working for the other side, marched into open desert with no water and no cavalry worth the name, and lost seven legions to an army a quarter the size that never closed with him. His death removed the only counterweight between Caesar and Pompey.",
    ],
    battleSlugs: ["colline-gate", "silarius", "carrhae"],
    ancientSourceIds: ["plutarch-crassus", "dio-36-44"], modernSourceIds: ["seager-2002", "goldsworthy-2006"],
    uncertaintyNotes: [
      "Plutarch's life is built to make greed the cause of everything that happened to him.",
      "The fate of the ten thousand prisoners taken at Carrhae is unknown beyond their deportation east.",
    ],
  },
  {
    id: "pompey", slug: "pompey", name: "Pompey the Great", fullName: "Gnaeus Pompeius Magnus",
    title: "Consul, 70, 55 and 52 BCE", faction: "optimates",
    bornYear: -106, diedYear: -48, lifeCertainty: "attested",
    activeFrom: -83, activeTo: -48, periodId: "late-republic",
    knownFor: "Cleared the Mediterranean of piracy in a season and redrew the East by his own authority.",
    description: [
      "Pompey raised three legions privately at twenty-three, was greeted as imperator before he had held any office at all, and spent his career being given commands the constitution had no provision for. The pirate command of 67 — the entire Mediterranean and fifty miles inland — was the largest ever voted, and he used it to end a problem that had defeated Rome for decades in about three months, then settled the surrendered pirates on farms rather than executing them.",
      "He followed it by annexing Pontus, Cilicia and Syria, ending the Seleucid dynasty by administrative decision, and coming home with more money than the treasury had — which he then could not get ratified, because the Senate would not do favours for a man that powerful. That refusal drove him into the arrangement with Caesar and Crassus, and its collapse into the civil war. He beat Caesar at Dyrrhachium, was pushed by the senators in his own camp into fighting at Pharsalus against his own strategy, lost, and was murdered stepping ashore in Egypt.",
    ],
    battleSlugs: ["dyrrhachium", "pharsalus"],
    ancientSourceIds: ["caesar-bc", "appian-civil", "dio-36-44"],
    modernSourceIds: ["seager-2002", "goldsworthy-2006"],
    uncertaintyNotes: [
      "The fullest account of his last campaign was written by the man who beat him.",
      "Why he did not pursue after Dyrrhachium is explained only by his enemies.",
    ],
  },
  {
    id: "vercingetorix", slug: "vercingetorix", name: "Vercingetorix", title: "Chieftain of the Arverni", faction: "gaul",
    bornYear: -82, diedYear: -46, lifeCertainty: "probable",
    activeFrom: -52, activeTo: -46, periodId: "late-republic",
    knownFor: "United Gaul, beat Caesar at Gergovia, and surrendered at Alesia.",
    description: [
      "Vercingetorix is the only Gallic leader in the atlas who understood the problem correctly. Caesar's army could not be beaten in a pitched battle and was entirely dependent on supply, so the answer was to burn the country and refuse to fight — a strategy that required persuading Gallic peoples to destroy their own towns, and that was working. He forced Caesar to abandon one siege and beat him outright at Gergovia, after which the Aedui, Rome's oldest allies in Gaul, changed sides.",
      "Then he let his cavalry be beaten in the open and withdrew into Alesia with eighty thousand men, which was the one mistake Caesar needed. He surrendered after the relief army dispersed, was kept in Rome for six years, and was executed at Caesar's triumph in 46. Everything known about him comes from the commentaries of the man who defeated him.",
    ],
    battleSlugs: ["gergovia", "alesia"],
    ancientSourceIds: ["caesar-bg", "plutarch-caesar"], modernSourceIds: ["goldsworthy-2006", "gelzer-1968"],
    uncertaintyNotes: [
      "There is no Gallic source for any of this.",
      "His name may be a title — 'great king of warriors' — rather than a personal name.",
    ],
  },
  {
    id: "caesar", slug: "caesar", name: "Julius Caesar", fullName: "Gaius Julius Caesar",
    title: "Consul, dictator", faction: "populares",
    bornYear: -100, diedYear: -44, lifeCertainty: "attested",
    activeFrom: -58, activeTo: -44, periodId: "late-republic",
    knownFor: "Conquered Gaul, won the civil war, and was killed by men he had pardoned.",
    description: [
      "Caesar was forty-one and deeply in debt when he took the Gallic command, and he needed a war. He found one, then several: eight campaigning seasons that ended with a country the size of Italy and France conquered, two crossings of the Rhine, two of the Channel, and — at Alesia — a double siege that is the most complete such operation the ancient world records. He wrote it up himself each winter, in dispatches sent to the body deciding whether to extend his command, which is why he is simultaneously the best tactical witness in this atlas and the least disinterested.",
      "Ordered in 49 to give up the army and stand trial, he crossed the Rubicon with one legion and took Italy in two months without a battle, because the troops sent to stop him kept joining him. Four years took him to Greece, Egypt, Pontus, Africa and Spain. He was beaten badly once, at Dyrrhachium, and said the enemy would have won the war that day if anyone there had known how to win. He pardoned his opponents as a matter of policy, was made dictator for life, and was killed eleven months later by about sixty men, many of them pardoned, who believed that removing him would restore the Republic. It did not.",
    ],
    battleSlugs: ["bibracte", "sabis", "gergovia", "alesia", "dyrrhachium", "pharsalus", "thapsus", "munda"],
    ancientSourceIds: ["caesar-bg", "caesar-bc", "plutarch-caesar"],
    modernSourceIds: ["goldsworthy-2006", "gelzer-1968"],
    uncertaintyNotes: [
      "His own commentaries are the principal source for the campaigns they describe, and were written to justify them.",
      "The numbers of Gauls killed and enslaved are his, reported to a Senate voting on his command.",
    ],
  },
  {
    id: "labienus", slug: "labienus", name: "Labienus", fullName: "Titus Labienus",
    title: "Legate in Gaul, then Pompeian commander", faction: "optimates",
    bornYear: -100, diedYear: -45, lifeCertainty: "probable",
    activeFrom: -58, activeTo: -45, periodId: "late-republic",
    knownFor: "Caesar's best officer for eight years, and then his enemy for four.",
    description: [
      "Labienus was the senior legate in Gaul and the only subordinate Caesar routinely trusted with an independent army. He saved the day at the Sambre by sending the tenth legion back across the river into the Nervian rear, and he held northern Gaul with detached forces through years when Caesar was elsewhere. The commentaries name him more than any other officer.",
      "In 49 he went over to Pompey — the only one of Caesar's senior men to do so — and fought against him for the rest of the war, at Pharsalus, in Africa, and finally in Spain. He was killed at Munda and buried on the field. No source explains the change of side, and the explanations offered since are guesses: an old loyalty to Pompey, a Picene origin, a judgement about the constitution, or simply that he thought Caesar would lose.",
    ],
    battleSlugs: ["sabis", "pharsalus", "munda"],
    ancientSourceIds: ["caesar-bg", "caesar-bc"], modernSourceIds: ["goldsworthy-2006", "gelzer-1968"],
    uncertaintyNotes: [
      "Why he changed sides is the central unanswered question about him.",
      "Caesar's commentaries stop naming him warmly well before the break, which may or may not be significant.",
    ],
  },

  // ── Beyond the mapped period ──────────────────────────────────────────────
  // These five have no battles here because the atlas stops in 44 BCE, four
  // decades before the first of them held power. They are listed as signposts to
  // periods still to come, on the same rule the campaign shelf follows: an entry
  // may point forward, but it may not claim coverage that does not exist.
  {
    id: "augustus", slug: "augustus", name: "Augustus", fullName: "Gaius Octavius Thurinus",
    title: "First emperor", faction: "rome",
    bornYear: -63, diedYear: 14, lifeCertainty: "attested",
    activeFrom: -44, activeTo: 14, periodId: "augustan",
    knownFor: "Won the last civil war of the Republic and replaced it with something else.",
    description: [
      "Caesar's great-nephew was eighteen and at Apollonia with the army massed for the Parthian expedition when the news of the murder reached him. Fourteen years later he was the only man left standing, having outlasted Antony, Lepidus, Brutus and Cassius, and had turned an army loyal to a general into a standing professional force loyal to the state — with himself as the state. The frontier settled on the Rhine and the Danube during his reign, and stayed there.",
    ],
    battleSlugs: [], ancientSourceIds: [], modernSourceIds: [],
    uncertaintyNotes: [],
  },
  {
    id: "trajan", slug: "trajan", name: "Trajan", fullName: "Marcus Ulpius Traianus",
    title: "Emperor, 98–117 CE", faction: "rome",
    bornYear: 53, diedYear: 117, lifeCertainty: "attested",
    activeFrom: 101, activeTo: 117, periodId: "high-empire",
    knownFor: "Took the empire to its greatest extent, across the Danube and into Mesopotamia.",
    description: [
      "Two wars across the Danube annexed Dacia and paid for a building programme out of its gold; a later campaign reached the Persian Gulf. The empire was never larger, and almost all of the eastern gain was given up by his successor within a year of his death.",
    ],
    battleSlugs: [], ancientSourceIds: [], modernSourceIds: [],
    uncertaintyNotes: [],
  },
  {
    id: "marcus-aurelius", slug: "marcus-aurelius", name: "Marcus Aurelius",
    title: "Emperor, 161–180 CE", faction: "rome",
    bornYear: 121, diedYear: 180, lifeCertainty: "attested",
    activeFrom: 166, activeTo: 180, periodId: "high-empire",
    knownFor: "Spent most of his reign on the Danube holding a frontier that had started to give.",
    description: [
      "The Marcomannic wars occupied the last fourteen years of his life and were fought against Germanic and Sarmatian peoples pressing a frontier that had been quiet for a century. He wrote the Meditations in camp during them. The pressure he was containing did not stop, and the century after him is the one this atlas calls the crisis.",
    ],
    battleSlugs: [], ancientSourceIds: [], modernSourceIds: [],
    uncertaintyNotes: [],
  },
  {
    id: "aurelian", slug: "aurelian", name: "Aurelian", fullName: "Lucius Domitius Aurelianus",
    title: "Emperor, 270–275 CE", faction: "rome",
    bornYear: 214, diedYear: 275, lifeCertainty: "probable",
    activeFrom: 270, activeTo: 275, periodId: "third-century",
    knownFor: "Put the empire back together in five years, after it had split into three.",
    description: [
      "Aurelian inherited an empire that had come apart into a Gallic empire in the west and a Palmyrene one in the east, with invasions across both major frontiers. He recovered all of it in five campaigning years, walled the city of Rome for the first time in six centuries, and was murdered by his own officers on the strength of a forged document.",
    ],
    battleSlugs: [], ancientSourceIds: [], modernSourceIds: [],
    uncertaintyNotes: [],
  },
  {
    id: "constantine", slug: "constantine", name: "Constantine", fullName: "Flavius Valerius Constantinus",
    title: "Emperor, 306–337 CE", faction: "rome",
    bornYear: 272, diedYear: 337, lifeCertainty: "attested",
    activeFrom: 306, activeTo: 324, periodId: "late-empire",
    knownFor: "Ended the Tetrarchy by force and moved the empire's centre east.",
    description: [
      "Eighteen years of civil war took Constantine from the acclamation of his father's troops in Britain to sole rule at Chrysopolis, by way of the Milvian Bridge. He legalised Christianity, refounded Byzantium as his capital, and left an empire whose centre of gravity had moved permanently east of the Adriatic.",
    ],
    battleSlugs: [], ancientSourceIds: [], modernSourceIds: [],
    uncertaintyNotes: [],
  },
];

export function getFigure(slug: string): HistoricalFigure | undefined {
  return figures.find((figure) => figure.slug === slug);
}

/** True when the atlas holds battles this person fought in. */
export function isMapped(figure: HistoricalFigure): boolean {
  return figure.battleSlugs.length > 0;
}

