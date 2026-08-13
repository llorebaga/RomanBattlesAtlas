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
    id: "postumius-albus", slug: "postumius-albus", name: "Aulus Postumius Albus",
    fullName: "Aulus Postumius Albus Regillensis",
    title: "Dictator, 496", faction: "rome",
    diedYear: -484, lifeCertainty: "traditional",
    activeFrom: -499, activeTo: -496, periodId: "early-rome",
    knownFor: "Commanded at Lake Regillus, the battle that settled whether Rome would have kings again.",
    description: [
      "The dictator who beat the Latins at Lake Regillus, and the earliest person in this atlas who can be given a battle at all. What the tradition says he faced was a Latin League army with the exiled Tarquins in it, fighting to put the last king back on a throne Rome had abolished fourteen years earlier — which makes the battle the moment the Republic stopped being reversible. The victory is followed within a few years by the treaty of Spurius Cassius, which turns the Latins from enemies into the alliance system Rome fought the next two centuries with.",
      "Almost none of that is secure. The date is Roman reckoning and probably wrong; the Tarquins' presence is the kind of detail a family tradition supplies; and the battle is where Castor and Pollux were said to have fought in the Roman line and then carried the news to the Forum themselves, which is a temple's founding legend rather than a report. His own cognomen, Regillensis, is taken from the battle — a Roman family naming itself after an ancestor's victory is the mechanism by which this whole period was remembered, and the reason to hold it loosely.",
    ],
    battleSlugs: ["lake-regillus"],
    ancientSourceIds: ["livy-1-5", "dionysius-hal"], modernSourceIds: ["cornell-1995", "forsythe-2005"],
    uncertaintyNotes: [
      "No death year is recorded for him. The one here is a placeholder the timeline needs in order to draw a bar at all, set at the last point the tradition still has him alive — it is not a date anybody reported.",
      "The date, the site and the command are all annalistic tradition; the lake has never been identified.",
      "The Dioscuri fighting in the Roman line is a cult legend attached to the battle, not testimony about it.",
      "Whether a dictatorship existed this early, in the form the sources describe, is argued.",
    ],
  },
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
    id: "brennus", slug: "brennus", name: "Brennus",
    title: "Chieftain of the Senones", faction: "gaul",
    diedYear: -386, lifeCertainty: "traditional",
    activeFrom: -390, activeTo: -387, periodId: "early-rome",
    knownFor: "Destroyed a Roman army at the Allia and took the city, which Rome did not forget for four centuries.",
    description: [
      "The leader of the Senones who broke a Roman army on the Allia about eleven miles north of the city and then walked into Rome behind it. The Romans had marched out to meet him without the usual precautions and were routed; the survivors fled to Veii rather than back to Rome, which left the city open. What followed — the sack, the siege of the Capitol, the geese, the thousand pounds of gold, and Brennus throwing his sword onto the scale with *vae victis* — is the most famous scene in early Roman history and the least verifiable.",
      "The consequences are firmer than the story. Rome built the wall that still carries the name of Servius, the fighting in Latium restarted from a much weaker position, and the date became a fixed point Romans reckoned from. The invasion also entered the Roman imagination permanently: the *tumultus Gallicus*, the emergency levy against a Gallic scare, is invoked again in 225 and again in 105, and the fear it names is this man's.",
    ],
    battleSlugs: ["allia"],
    ancientSourceIds: ["livy-1-5", "polybius-2", "plutarch-camillus", "diodorus-14"],
    modernSourceIds: ["cornell-1995", "forsythe-2005"],
    uncertaintyNotes: [
      "\"Brennus\" may be a title rather than a name — it resembles a Celtic word for a war-leader, and another Brennus attacks Delphi a century later.",
      "Roman reckoning puts the Allia in 390; the Greek tradition puts it in 387/6, and Polybius, who is closer to a record here than Livy is, supports the later date.",
      "Whether the Capitol held out at all is doubted; Polybius does not mention the ransom scene, and no death year is recorded for Brennus — the one here marks the withdrawal, not a report of his death.",
    ],
  },
  {
    id: "manlius-torquatus", slug: "manlius-torquatus", name: "Manlius Torquatus",
    fullName: "Titus Manlius Imperiosus Torquatus",
    title: "Consul, three times", faction: "rome",
    diedYear: -340, lifeCertainty: "traditional",
    activeFrom: -361, activeTo: -340, periodId: "early-rome",
    knownFor: "Beat the Latins at Vesuvius and Trifanum, and had his own son executed for winning a fight without orders.",
    description: [
      "Consul in 340 and the commander who, with Decius Mus, broke the Latin revolt in a single campaigning season — first at the foot of Vesuvius and then decisively at Trifanum, on the coast road between Sinuessa and Minturnae. The settlement that followed is the important part: Rome dissolved the Latin League and replaced it with a web of separate treaties, each city bound to Rome and to none of its neighbours. That arrangement is what turned a league Rome had led into a system Rome ran, and it is the template for Roman Italy.",
      "What Romans actually remembered him for is the discipline. The tradition has his son accept a challenge to single combat against orders, win it, and be executed by his father in front of the army — *Manliana imperia*, Manlian orders, became the Latin phrase for a command obeyed past the point of reason. Livy tells the story at length and is plainly uneasy about it. The cognomen Torquatus comes from a torc he was said to have stripped from a Gaul he killed in single combat as a young man, which is the same kind of family memory by a different route.",
    ],
    battleSlugs: ["vesuvius", "trifanum"],
    ancientSourceIds: ["livy-6-10"], modernSourceIds: ["cornell-1995", "oakley-1997"],
    uncertaintyNotes: [
      "The execution of his son is a moral exemplum before it is a report, and Livy tells it as one.",
      "Neither Veseris nor Trifanum has ever been located, so both battles are placed from the direction of the campaign rather than from a site.",
      "No death year is recorded; the one here is the last year he is attested in command.",
    ],
  },
  {
    id: "decius-mus", slug: "decius-mus", name: "Publius Decius Mus",
    title: "Consul, 340", faction: "rome",
    diedYear: -340, lifeCertainty: "traditional",
    activeFrom: -343, activeTo: -340, periodId: "early-rome",
    knownFor: "Devoted himself and the enemy army to the gods of the underworld, and rode into the Latin line to make it good.",
    description: [
      "Torquatus' colleague in 340, and the first of three men of the same name in this atlas to perform the *devotio*: a formal vow, spoken after a pontifex and repeated word for word, offering the commander's own life and the enemy's army together to the di manes. Having made it he rode alone into the Latin ranks and was killed, and the Roman line — on the tradition — held and won because he had. His son did the same at Sentinum in 295, and his grandson is said to have tried it against Pyrrhus at Asculum in 279.",
      "The ritual is the interesting thing, and it is better evidence than the battle. Livy reproduces the formula with the precision of a man copying a document, and the *devotio* appears in Roman religious law independently of the Decii — it is a real procedure, not a literary invention. What is much harder to believe is that one family produced three of them in three generations, at exactly the three moments a Roman audience most wanted a self-sacrifice. The Decii were plebeian nobles making a name, and this was the name they made.",
    ],
    battleSlugs: ["vesuvius"],
    ancientSourceIds: ["livy-6-10"], modernSourceIds: ["cornell-1995", "oakley-1997"],
    uncertaintyNotes: [
      "Three Decii performing the same ritual in three generations is more likely one story told three times than three events.",
      "The atlas maps only the first: the son is named at Sentinum and the grandson at Asculum, and they are different men.",
      "Veseris, where he is said to have died, has never been identified.",
    ],
  },
  {
    id: "pontius", slug: "pontius", name: "Gaius Pontius",
    title: "Samnite commander", faction: "samnite",
    diedYear: -292, lifeCertainty: "traditional",
    activeFrom: -321, activeTo: -292, periodId: "early-rome",
    knownFor: "Trapped two consular armies in a pass at the Caudine Forks and could not decide what to do with them.",
    description: [
      "The Samnite who inflicted the most complete humiliation Rome suffered before Cannae, and got nothing out of it. He drew both consular armies of 321 into a valley closed at each end, blocked the exits behind them, and had them at his mercy without a battle. The tradition then gives him a famous consultation with his father Herennius, who told him to release the Romans unharmed or kill every one of them, and that any middle course would be ruinous. He took the middle course: the army was spared, made to pass under the yoke, and sent home disarmed.",
      "Rome repudiated the terms, on the argument that the generals who swore them had no authority to bind the state, and offered to hand the men who had sworn back to the Samnites instead — an answer that tells you more about how Rome fought wars than the ambush does. Pontius is said to have been captured and executed after Aquilonia nearly thirty years later, paraded in a triumph first. Whether that is the same man is not certain, and the neatness of it is a reason for doubt.",
    ],
    battleSlugs: ["caudine-forks"],
    ancientSourceIds: ["livy-6-10", "appian-samnite"], modernSourceIds: ["salmon-1967", "oakley-1997"],
    uncertaintyNotes: [
      "The Herennius consultation is a set-piece dialogue and reads as one.",
      "Whether the Pontius executed after Aquilonia in 292 is the same man is disputed; the identification may be a later tidying.",
      "Rome's version of the repudiation is self-serving, and it is the only version that survives.",
    ],
  },
  {
    id: "fabius-rullianus", slug: "fabius-rullianus", name: "Fabius Rullianus",
    fullName: "Quintus Fabius Maximus Rullianus",
    title: "Consul, five times", faction: "rome",
    diedYear: -290, lifeCertainty: "traditional",
    activeFrom: -325, activeTo: -295, periodId: "early-rome",
    knownFor: "Won Sentinum, the largest battle fought in Italy before Cannae, against four peoples at once.",
    description: [
      "The dominant Roman commander of the Samnite wars and the man who held the line at Sentinum in 295, when the Samnites, Senones, Etruscans and Umbrians combined against Rome — the only time the peoples of Italy managed a coalition on that scale. The Etruscans and Umbrians were drawn away before the battle, which is the reason Rome could fight it at all; on the field Fabius held his own wing back and let the enemy tire, while Decius Mus on the other wing was broken by Gallic chariots and performed the family *devotio*. Within a decade of the victory Rome held the peninsula from the Po to Lucania.",
      "He is also the great-grandfather of the Fabius Maximus who refused to fight Hannibal, and the family's method is recognisably the same one twice: wear the other side out, decline the decisive moment until it is favourable, and accept being called a coward in the meantime. His own career had begun with a court-martial — as Master of Horse he fought and won against the dictator Papirius Cursor's express orders, and was very nearly executed for it.",
    ],
    battleSlugs: ["sentinum"],
    ancientSourceIds: ["livy-6-10"], modernSourceIds: ["salmon-1967", "oakley-1997"],
    uncertaintyNotes: [
      "Five consulships and a censorship make him the kind of ancestor the Fabii had every reason to enlarge, and Fabius Pictor, Rome's first historian, was one of them.",
      "The troop figures for Sentinum are annalistic and far too round to be counted.",
      "How the Etruscans and Umbrians were detached before the battle is told differently in different sources.",
    ],
  },
  {
    id: "papirius-cursor", slug: "papirius-cursor", name: "Papirius Cursor",
    fullName: "Lucius Papirius Cursor",
    title: "Consul, 293 and 272", faction: "rome",
    diedYear: -270, lifeCertainty: "traditional",
    activeFrom: -293, activeTo: -272, periodId: "early-rome",
    knownFor: "Took Aquilonia to end the Samnite wars, and Tarentum to end the Italian ones.",
    description: [
      "The son of the dictator who nearly executed Fabius Rullianus, and the commander who closed both of the wars this section of the atlas is about. At Aquilonia in 293 he broke the last Samnite field army — the one raised under the *linen legion* oath, sworn in a screened enclosure on pain of death — and the third Samnite war ended with it. Twenty-one years later he was consul again when Tarentum surrendered, and the last independent city of the south came into the Roman alliance without a siege.",
      "The two commands bracket the completion of Italy, which is why he is here rather than for anything remarkable about how he fought. The atlas draws Tarentum in 272 as the year Rome holds the whole peninsula, and the campaign shelf names him for it. Roman tradition remembered his father as the harshest disciplinarian of the age and him as a competent inheritor of the name, which may be fair or may only be what happens to a son with the same three names.",
    ],
    battleSlugs: ["aquilonia", "tarentum"],
    ancientSourceIds: ["livy-6-10", "livy-periochae"], modernSourceIds: ["salmon-1967", "oakley-1997"],
    uncertaintyNotes: [
      "Father and son share a name and the sources confuse them; the atlas takes both these commands as the son's.",
      "Livy's books covering 292 onwards are lost, so Tarentum rests on the Periochae — a paragraph per book.",
      "The linen legion and its oath are described in detail Livy cannot have had a source for.",
    ],
  },
  {
    id: "curius-dentatus", slug: "curius-dentatus", name: "Curius Dentatus",
    fullName: "Manius Curius Dentatus",
    title: "Consul, four times", faction: "rome",
    diedYear: -270, lifeCertainty: "probable",
    activeFrom: -290, activeTo: -272, periodId: "early-rome",
    knownFor: "Beat Pyrrhus at Beneventum and sent him home, then spent the spoils on an aqueduct.",
    description: [
      "The consul of 275 who fought Pyrrhus at Beneventum and ended the Italian half of his war. The battle itself was not a rout — Pyrrhus attacked at dawn after a night march that went wrong in the woods, the elephants were driven back into his own line by javelins and fire, and he withdrew in reasonable order. What mattered was that he had no more men. He left Italy within months, and Tarentum came into the Roman alliance three years later. It is the third Roman victory in this atlas that is really an exercise in outlasting somebody.",
      "Roman tradition kept him as the model of the incorruptible old Republic: the consul found cooking turnips in his own hearth by Samnite envoys who had come to bribe him, who told them he would rather rule the men who had gold than have it. That story is doing moral work and should be read as such. What is better attested is what he did with the money from the triumph — he built the Anio Vetus, Rome's second aqueduct, out of the Pyrrhic spoils, which is a more interesting fact about the Republic than the turnips.",
    ],
    battleSlugs: ["beneventum"],
    ancientSourceIds: ["plutarch-pyrrhus", "appian-samnite", "livy-periochae"],
    modernSourceIds: ["champion-2009", "cornell-1995"],
    uncertaintyNotes: [
      "Livy's books for this war are lost; Beneventum survives in Plutarch and in summaries.",
      "How decisive the battle actually was is argued — Pyrrhus withdrew in order, and his departure may owe as much to Greek affairs as to the result.",
      "The turnips and the incorruptible-consul anecdotes are exemplary literature, not testimony.",
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
    id: "duilius", slug: "duilius", name: "Gaius Duilius",
    title: "Consul, 260", faction: "rome",
    diedYear: -220, lifeCertainty: "probable",
    activeFrom: -260, activeTo: -260, periodId: "middle-republic",
    knownFor: "Won Mylae, Rome's first battle at sea, by refusing to fight it as one.",
    description: [
      "The consul who took command of a fleet Rome had built from nothing, crewed with men trained on benches set up on dry land, and beat the best navy in the western Mediterranean with it in the same year. He did it by declining the contest the Carthaginians were expecting. Instead of ramming — which needs seamanship Rome did not have — his ships carried the *corvus*, a hinged boarding bridge with a spike under the nose that dropped onto an enemy deck and pinned the two hulls together, turning a sea fight into an infantry action Rome could win. Fifty Carthaginian ships were taken or sunk off Mylae.",
      "Rome marked it in a way it had never marked anything: a column in the Forum hung with the bronze rams of the captured ships, the *columna rostrata*, and an inscription listing the count. A fragment of a later copy of that inscription survives, which makes Duilius one of the few men in this part of the atlas attested by something other than a narrative. He was granted a torchbearer and a flute-player to escort him home from dinner for the rest of his life, and as far as the record goes he never held a fleet command again.",
    ],
    battleSlugs: ["mylae"],
    ancientSourceIds: ["polybius-1"], modernSourceIds: ["lazenby-1996", "rankov-2011"],
    uncertaintyNotes: [
      "The surviving columna rostrata inscription is an imperial re-cutting, and how faithfully it reproduces the original text is argued.",
      "The corvus is described only by Polybius, and no wreck has produced one; its weight and the effect it would have on a ship's handling are both contested.",
      "No birth or death year is recorded; the death year here is a placeholder marking the last decade he could plausibly have lived into.",
    ],
  },
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
    id: "xanthippus", slug: "xanthippus", name: "Xanthippus",
    title: "Spartan mercenary commander", faction: "carthage",
    diedYear: -250, lifeCertainty: "disputed",
    activeFrom: -256, activeTo: -255, periodId: "middle-republic",
    knownFor: "Was hired by a beaten Carthage, rebuilt its army in a season, and destroyed Regulus with it.",
    description: [
      "A Spartan professional who arrived at Carthage among a batch of hired Greek officers at the moment the city was about to accept Roman terms, listened to how the recent defeats had been fought, and said publicly that Carthage had lost to its own generals rather than to Rome. He was given the army. What he changed was elementary and decisive: put the phalanx on flat ground where it could hold, use the cavalry and the elephants on the wings where Carthage's superiority in both actually counted, and stop fighting in hills that neutralised them. On the Bagradas plain in 255 he did exactly that to Regulus, and a Roman consular army was destroyed — a few hundred escaped, and the consul himself was taken alive.",
      "Then he disappears, and the manner of it is the problem. One tradition has him rewarded and sent home; another has the Carthaginians drown him at sea on the voyage out of jealousy. Polybius, the best source here, records the victory and is reticent about the aftermath. What is not in doubt is the effect: Carthage broke off negotiations, the war ran another fourteen years, and Rome learned that its infantry could be beaten by a competently handled combined-arms army on ground of its choosing.",
    ],
    battleSlugs: ["bagradas"],
    ancientSourceIds: ["polybius-1", "diodorus-23"], modernSourceIds: ["lazenby-1996", "hoyos-2015"],
    uncertaintyNotes: [
      "Whether one foreign officer really reorganised Carthage's army in a season, or whether he is a Greek historian's device for explaining a Carthaginian success, is argued.",
      "His fate is told two incompatible ways and neither is well supported; the death year here is a placeholder.",
      "Polybius' account gives him a decisive personal role, and Polybius wrote for a Greek readership.",
    ],
  },
  {
    id: "lutatius-catulus", slug: "lutatius-catulus", name: "Lutatius Catulus",
    fullName: "Gaius Lutatius Catulus",
    title: "Consul, 242", faction: "rome",
    diedYear: -221, lifeCertainty: "probable",
    activeFrom: -242, activeTo: -241, periodId: "middle-republic",
    knownFor: "Won the Aegates Islands and ended a twenty-three-year war in a single morning.",
    description: [
      "Rome had no fleet left and no money to build one, so the last one was raised on private credit — leading citizens funding a quinquereme apiece against repayment if the war was won. Catulus took it to sea in 242, blockaded Lilybaeum and Drepana through the winter, and spent the months drilling crews rather than raiding. When the Carthaginian relief fleet came in the spring of 241 it was heavy with supplies for the army in Sicily and light on trained marines, and he caught it off the Aegates in weather most commanders would have waited out. It was over in a morning.",
      "Carthage sued for peace within weeks, because the fleet had been the last thing standing between Hamilcar's army in Sicily and starvation. The terms Catulus signed were then stiffened by the senate at Rome — a pattern the atlas sees again — and the indemnity that resulted is what set off the Mercenary War, which is what let Rome take Sardinia three years later. He was wounded in the thigh before the battle and is said to have fought it from a stretcher.",
    ],
    battleSlugs: ["aegates"],
    ancientSourceIds: ["polybius-1"], modernSourceIds: ["lazenby-1996", "rankov-2011"],
    uncertaintyNotes: [
      "How much of the victory belonged to him and how much to his praetor Quintus Valerius Falto was disputed at Rome within a year, and went to arbitration.",
      "The private financing of the fleet is reported by Polybius and has no independent confirmation.",
      "No birth year is recorded and the death year here is approximate.",
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
    id: "flaminius", slug: "flaminius", name: "Gaius Flaminius",
    title: "Consul, 223 and 217", faction: "rome",
    diedYear: -217, lifeCertainty: "attested",
    activeFrom: -223, activeTo: -217, periodId: "middle-republic",
    knownFor: "Marched into the fog along Lake Trasimene and lost an army and his life inside an hour.",
    description: [
      "A politician the senate disliked before he was a general it could blame. As tribune he had pushed through the distribution of Gallic land in the Po valley against furious opposition; as censor he built the Via Flaminia and the Circus Flaminius; as consul in 223 he beat the Insubres. In 217 he took an army after Hannibal along the north shore of Lake Trasimene, in morning mist, with hills above the road and the lake below it, and without scouting the ground ahead. Hannibal had put his army along the slope in the dark. The Roman column was attacked along its whole length at once and destroyed; perhaps fifteen thousand died, Flaminius among them.",
      "Roman tradition made him the type of the reckless demagogue-general — he is said to have ignored the auspices, and Livy has him refuse to wait for omens before setting out. That reading served the senate, whose land bill he had beaten and whose caution he had rejected, and it should be read with that in mind. The strategic judgement that followed the disaster was Fabius Maximus' policy of refusing battle, which the atlas draws as the shape of the next two years.",
    ],
    battleSlugs: ["trasimene"],
    ancientSourceIds: ["polybius-3", "livy-21-30"], modernSourceIds: ["lazenby-1978", "goldsworthy-2000"],
    uncertaintyNotes: [
      "The hostile portrait descends from senatorial tradition and is not independent of the men he had fought politically.",
      "Where exactly along the northern shore the column was caught is still argued between several candidate sites.",
      "The Roman losses are given as fifteen thousand by sources with reason to make the defeat total.",
    ],
  },
  {
    id: "varro", slug: "varro", name: "Terentius Varro",
    fullName: "Gaius Terentius Varro",
    title: "Consul, 216", faction: "rome",
    diedYear: -200, lifeCertainty: "probable",
    activeFrom: -216, activeTo: -200, periodId: "middle-republic",
    knownFor: "Commanded on the day Rome lost Cannae, survived it, and was thanked by the senate for not despairing.",
    description: [
      "The consul who held command at Cannae on the day the battle was fought — the two consuls alternated daily, and it was his turn. The tradition makes him a butcher's son and a hothead who forced an engagement his colleague Aemilius Paullus opposed, and that account has been doubted for a century: he was from a family that had already reached the praetorship, and the decision to seek battle with eight legions was the senate's policy before it was his. What is certain is the outcome. The Roman infantry was enveloped and destroyed, Paullus was killed, and Varro escaped to Venusia with a few thousand men.",
      "What happened next is the reason he is in this atlas. He did not retire, was not prosecuted, and was met outside Rome by the senate in a body, who thanked him — in Livy's phrase — because he had not despaired of the Republic. He went on holding commands, in Picenum and later in Etruria, for the next fifteen years. The atlas draws Cannae as the worst day in Roman military history; the senate's response to the man who presided over it is the other half of why Rome won the war.",
    ],
    battleSlugs: ["cannae"],
    ancientSourceIds: ["polybius-3", "livy-21-30"], modernSourceIds: ["lazenby-1978", "goldsworthy-2000"],
    uncertaintyNotes: [
      "The demagogue portrait comes from a tradition friendly to the Aemilii, whose consul died there and whose descendants wrote about it.",
      "How the daily alternation of command actually worked, and whether it applied on the day, is argued.",
      "His later career is thinly recorded and the death year here is approximate.",
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

  {
    id: "hasdrubal-barca", slug: "hasdrubal-barca", name: "Hasdrubal Barca",
    title: "Carthaginian commander in Iberia", faction: "carthage",
    diedYear: -207, lifeCertainty: "attested",
    activeFrom: -218, activeTo: -207, periodId: "middle-republic",
    knownFor: "Held Iberia for eleven years, then brought a second army over the Alps and was destroyed before it reached his brother.",
    description: [
      "Hannibal's brother, left to hold Iberia when Hannibal marched for Italy, and the man whose job was to send the reinforcements that would have made the invasion work. For eight years he did the harder half of it: he kept two Roman armies out of the south, killed both Scipio brothers in 211 in a pair of coordinated actions, and held the province with troops that were always being drawn off to Africa or to Italy. Beaten at Baecula in 208 by the young Scipio, he disengaged rather than be pinned, took what was left of his army north, and did what his brother had done — over the Pyrenees, over the Alps, into Italy.",
      "He got there. What killed him was a letter. His dispatch to Hannibal naming the meeting point was intercepted, and the consul Gaius Claudius Nero took seven thousand picked men out of the lines facing Hannibal in the south, marched them two hundred and fifty miles north in a week without Hannibal noticing they had gone, and joined his colleague on the Metaurus. Hasdrubal found himself facing two consular armies instead of one. His head was cut off and thrown into Hannibal's camp, which is how Hannibal is said to have learned the war was lost.",
    ],
    battleSlugs: ["baecula", "metaurus"],
    ancientSourceIds: ["polybius-10", "polybius-11", "livy-21-30"],
    modernSourceIds: ["lazenby-1978", "hoyos-2015"],
    uncertaintyNotes: [
      "Whether Baecula was a real defeat or a successful disengagement is the central argument about his generalship, and Polybius and Livy tilt differently.",
      "The route he took over the Alps is unrecoverable, and he crossed faster than Hannibal had.",
      "The size of the army that reached Italy is given in figures that vary by a factor of two.",
    ],
  },
  {
    id: "hasdrubal-gisco", slug: "hasdrubal-gisco", name: "Hasdrubal Gisco",
    title: "Carthaginian commander", faction: "carthage",
    diedYear: -202, lifeCertainty: "probable",
    activeFrom: -214, activeTo: -202, periodId: "middle-republic",
    knownFor: "Lost Iberia at Ilipa and Africa at the Great Plains, and married his daughter to two kings in between.",
    description: [
      "The last Carthaginian commander in Iberia and the first in Africa, which means he lost the war twice in three years. At Ilipa in 206 he was out-generalled rather than outfought: Scipio spent days forming up in the same conventional order, then on the day of the battle put his Roman legions on the wings and the Spanish allies in the centre, attacked early before the Carthaginians had eaten, and closed on both flanks. Carthaginian Iberia ended with the battle. He crossed to Africa, raised a new army with Syphax, and lost that one too — first burned out of his camp in a night attack, then beaten at the Great Plains in 203.",
      "The other half of his career is diplomatic and mattered as much. His daughter Sophonisba was married to Syphax to keep the Numidian king on Carthage's side and away from Rome's — a marriage that worked long enough to cost Scipio a year, and that ended with Syphax captured, Sophonisba married to Masinissa within days, and Scipio requiring Masinissa to give her up. She took poison. Roman writers told the story as a tragedy about a Numidian; it is at least as much a story about what an alliance was worth in that war.",
    ],
    battleSlugs: ["ilipa", "great-plains"],
    ancientSourceIds: ["polybius-11", "polybius-14", "livy-21-30"],
    modernSourceIds: ["lazenby-1978", "hoyos-2015"],
    uncertaintyNotes: [
      "Several Carthaginians named Hasdrubal are active in these years and the sources do not always distinguish them cleanly.",
      "The Sophonisba episode survives in a form already shaped by Roman and later literary retelling.",
      "His end is not securely recorded; the year here is where the sources lose him.",
    ],
  },
  {
    id: "masinissa", slug: "masinissa", name: "Masinissa",
    title: "King of Numidia", faction: "numidia",
    bornYear: -238, diedYear: -148, lifeCertainty: "probable",
    activeFrom: -213, activeTo: -148, periodId: "middle-republic",
    knownFor: "Changed sides at the right moment, won a kingdom for it, and spent fifty years taking Carthage apart legally.",
    description: [
      "He fought for Carthage in Iberia first, and against it afterwards, and the switch is the hinge of the Second Punic War's ending. His cavalry on Scipio's right wing at Zama drove the Carthaginian horse off the field and then came back into the rear of Hannibal's third line, which is the manoeuvre that decided the battle. The reward was Numidia — the whole of it, including the western kingdom that had been Syphax's — held as a Roman ally.",
      "What he did with the next fifty years is the reason the atlas draws his name on a territory zone. The treaty of 201 forbade Carthage to make war without Rome's permission, and Masinissa spent half a century taking Carthaginian land in the certain knowledge that it could not answer: the Tripolitanian emporia around 162 were the richest of the seizures. Every dispute went to Rome for arbitration, and Rome found for him. When Carthage finally did fight back, in 150, it had broken the treaty and the Third Punic War followed. He died at ninety, having outlived Scipio by thirty-five years, and left his kingdom to be divided by Scipio Aemilianus.",
    ],
    battleSlugs: ["zama"],
    ancientSourceIds: ["polybius-15", "livy-21-30", "appian-hann", "livy-periochae-46-53"],
    modernSourceIds: ["hoyos-2015", "astin-1967"],
    uncertaintyNotes: [
      "His age at death — ninety, still riding and fathering children — is the kind of figure ancient sources like too much to be trusted plainly.",
      "The chronology of his encroachments on Carthaginian territory is known mostly from the Roman embassies sent to arbitrate them, so it is dated by Rome's reactions rather than by his actions.",
      "Whether he intended the Third Punic War or merely made it unavoidable is a matter of interpretation.",
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
    id: "cato-the-elder", slug: "cato-the-elder", name: "Cato the Elder",
    fullName: "Marcus Porcius Cato",
    title: "Consul 195, censor 184", faction: "rome",
    bornYear: -234, diedYear: -149, lifeCertainty: "attested",
    activeFrom: -195, activeTo: -149, periodId: "middle-republic",
    knownFor: "Turned Thermopylae by the mountain path, and spent his last years demanding Carthage be destroyed.",
    description: [
      "At Thermopylae in 191 he was a consular serving as a legate — a man who had already held the highest office taking a subordinate command, which was not unusual and in his case was decisive. Antiochus had walled the pass and posted Aetolians on the heights above it, exactly as the Persians had been met there three centuries earlier and exactly as they had got round it. Cato took a detachment over the Callidromus in the dark, came down behind the Aetolian post at first light, and the Seleucid position collapsed from the rear. Antiochus was out of Greece within days.",
      "He is in this atlas for that morning, but he shaped it at both ends. As censor he prosecuted the Scipios, which is part of why Africanus died in exile from the city he had saved. In old age he served on the embassy to Africa, came back convinced that Carthage had recovered enough to be dangerous, and — the tradition says — ended every speech in the senate on any subject with the demand that Carthage be destroyed. He died in 149, the year the siege began, and did not live to see it done.",
    ],
    battleSlugs: ["thermopylae"],
    ancientSourceIds: ["plutarch-cato", "livy-34-37"], modernSourceIds: ["gruen-1984", "harris-1979"],
    uncertaintyNotes: [
      "The *ceterum censeo* formula is not quoted in that form by any source close to him, and its exact wording is a later crystallisation.",
      "His own account of Thermopylae, in the lost Origines, is where the emphasis on his personal role ultimately comes from.",
      "Whether the fig he is said to have produced in the senate to prove Carthage's proximity is a real anecdote or a rhetorical set-piece is doubted.",
    ],
  },
  {
    id: "eumenes-ii", slug: "eumenes-ii", name: "Eumenes II",
    title: "King of Pergamum", faction: "pergamon",
    bornYear: -221, diedYear: -159, lifeCertainty: "probable",
    activeFrom: -197, activeTo: -159, periodId: "middle-republic",
    knownFor: "Led the charge that broke Antiochus' left at Magnesia, and was paid in most of Asia Minor.",
    description: [
      "The Attalid king who understood earlier than anyone else in the East that Rome could be used. He inherited a middling kingdom hemmed in by the Seleucids, argued in person before the senate for war against Antiochus, provided the fleet that fought at Corycus, and then on the field at Magnesia commanded the Roman right — where he broke up the Seleucid scythed chariots with light troops and archers before they reached the line, sent them back through their own cavalry, and charged into the confusion. The Seleucid left disintegrated and the battle went with it.",
      "At Apamea in 188 Rome annexed none of the territory it had taken and gave nearly all of it to him: Mysia, Lydia, both Phrygias, Lycaonia and Pisidia, with Rhodes taking Lycia and Caria. Pergamum went from a city-state to the largest power in Asia Minor in a single treaty. It is the clearest case in the atlas of Rome fighting a war and handing the winnings to somebody else — and within twenty years Rome had cooled on him, entertained his brother as a rival, and begun the process that ends with the kingdom left to Rome in a will.",
    ],
    battleSlugs: ["corycus", "magnesia"],
    ancientSourceIds: ["polybius-21", "livy-34-37", "appian-syrian"],
    modernSourceIds: ["gruen-1984", "eckstein-2008"],
    uncertaintyNotes: [
      "Livy's account of Magnesia is Polybius at one remove, and Polybius' own book survives only in excerpts.",
      "How much of the victory belonged to him rather than to the Scipios was already a live question in antiquity, and Pergamene sources are not neutral.",
      "His birth year is inferred from his accession rather than recorded.",
    ],
  },
  {
    id: "polyxenidas", slug: "polyxenidas", name: "Polyxenidas",
    title: "Seleucid admiral", faction: "seleucid",
    diedYear: -189, lifeCertainty: "disputed",
    activeFrom: -192, activeTo: -190, periodId: "middle-republic",
    knownFor: "Commanded Antiochus' fleet, won the one victory it had by ambush, and lost the sea at Myonessus.",
    description: [
      "A Rhodian exile commanding the navy of the empire his own city was fighting — which is a fair summary of how the Aegean worked in these years. He lost the opening fleet action off Corycus in 191 to a Roman and Pergamene squadron and withdrew to Ephesus, Antiochus' western capital and the base the whole naval war was run from. The following year he did the one thing that worked: he opened negotiations with the Rhodian commander at Panormus suggesting he would defect, and used the talks to catch the Rhodian squadron unready. Most of it was destroyed.",
      "It bought a season. At Myonessus later in 190 the combined Roman and Rhodian fleet caught him and broke the Seleucid line, and with it any chance of stopping the Roman army crossing into Asia. He got the survivors back to Ephesus and out of the record; Antiochus fought Magnesia with no fleet and lost the war three months later. Under the terms of Apamea the Seleucids were left ten warships and forbidden to sail west of the Calycadnus.",
    ],
    battleSlugs: ["corycus", "myonessus"],
    ancientSourceIds: ["livy-34-37", "appian-syrian"],
    modernSourceIds: ["grainger-2002", "bar-kochva-1976"],
    uncertaintyNotes: [
      "Everything about him comes through Roman and Rhodian accounts of the men who beat him.",
      "His fate after Myonessus is unrecorded; the year here is a placeholder marking the end of the war.",
      "The Panormus ambush is told as a story about Rhodian gullibility, which is a reason to be careful with the detail.",
    ],
  },
  {
    id: "eudamus", slug: "eudamus", name: "Eudamus of Rhodes",
    title: "Rhodian admiral", faction: "greek",
    diedYear: -189, lifeCertainty: "disputed",
    activeFrom: -190, activeTo: -190, periodId: "middle-republic",
    knownFor: "Beat Hannibal at sea off the Eurymedon, which nobody else in this atlas managed at all.",
    description: [
      "The Rhodian who fought the only naval command Hannibal was ever given, and won it. Antiochus had sent Hannibal to raise a fleet in Phoenicia and bring it up the coast to join the main force; Eudamus intercepted it off the Eurymedon in 190 with a smaller Rhodian squadron and stopped it. Rhodian seamanship did what Rhodian seamanship was famous for — better handling, better rowing, fire-pots swung out on poles ahead of the bows — and the Phoenician ships never reached the Aegean. It is the single engagement in this atlas where Hannibal is beaten by someone other than a Scipio.",
      "He was at Myonessus a few weeks later, where the Rhodian contingent again handled the flank while the Romans broke the centre. Rhodes was paid for the war with Lycia and Caria south of the Maeander at Apamea, and spent the next twenty years discovering that Rome could take it back — by 167 the senate had declared Delos a free port and cut Rhodian harbour revenues to a fraction, which is a kind of settlement the atlas cannot draw but is the sequel to these two battles.",
    ],
    battleSlugs: ["eurymedon", "myonessus"],
    ancientSourceIds: ["livy-34-37", "appian-syrian"],
    modernSourceIds: ["grainger-2002", "gruen-1984"],
    uncertaintyNotes: [
      "Whether Hannibal was really in personal command off the Eurymedon, or nominally attached to it, is argued.",
      "Livy is the only continuous account and is working from Polybius, whose book for these years survives in fragments.",
      "Nothing is recorded of him before or after the campaign; both dates here are placeholders.",
    ],
  },
  {
    id: "scipio-asiaticus", slug: "scipio-asiaticus", name: "Scipio Asiaticus",
    fullName: "Lucius Cornelius Scipio Asiaticus",
    title: "Consul, 190", faction: "rome",
    diedYear: -183, lifeCertainty: "probable",
    activeFrom: -191, activeTo: -183, periodId: "middle-republic",
    knownFor: "Held the command that won Magnesia, with his more famous brother standing beside him as a legate.",
    description: [
      "Africanus' younger brother, and the consul of 190 who was given the war against Antiochus on the open understanding that Africanus would come with him as his legate and do the fighting. It was an arrangement everyone at the time seems to have recognised for what it was. Africanus then fell ill and was absent from the field at Magnesia, so the battle that broke the largest army Rome had yet faced was fought under Lucius' command and won by Domitius Ahenobarbus on the ground. He took the name Asiaticus for it — the first Roman to be surnamed after a continent rather than a country.",
      "The brothers were prosecuted within a few years over the accounting for the indemnity, in a campaign Cato drove. Lucius was convicted, or nearly so; the tradition has Africanus tear up the account books in the senate rather than answer, and then leave Rome for good. The atlas draws Magnesia as the moment Rome could dictate to the East and annex nothing; the trials are the domestic half of the same year, and the point at which the Republic began to find its own successful generals a problem.",
    ],
    battleSlugs: ["magnesia"],
    ancientSourceIds: ["livy-34-37", "appian-syrian", "polybius-21"],
    modernSourceIds: ["grainger-2002", "eckstein-2008"],
    uncertaintyNotes: [
      "How much of the command was really his is a question the sources were already arguing about, and they are hostile to him.",
      "The details of the trials of the Scipios are irrecoverable; Livy reports several incompatible versions and says so.",
      "His birth year is unknown and the death year is approximate.",
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

  {
    id: "hasdrubal-boetharch", slug: "hasdrubal-boetharch", name: "Hasdrubal the Boetharch",
    title: "Commander of Carthage in the siege", faction: "carthage",
    diedYear: -146, lifeCertainty: "probable",
    activeFrom: -152, activeTo: -146, periodId: "middle-republic",
    knownFor: "Held Carthage for three years against a city that had ordered it to stop existing.",
    description: [
      "He had already been condemned to death once by his own government — for taking the field against Masinissa in 150, which the treaty of 201 forbade — and was recalled to command when Rome's terms turned out to be the abandonment of the city itself. Carthage had surrendered its warships and its weapons before the demand came. What he organised in the three years that followed was made from nothing: workshops turning out several hundred shields and a thousand missiles a day, women's hair for torsion springs, and a new harbour mouth cut through to get a hastily built fleet to sea.",
      "Appian's account of the end is hostile and vivid — a commander eating well while the city starved, torturing Roman prisoners on the wall where the defenders could see it, and finally coming out to Scipio Aemilianus alone to beg for his life while his wife cursed him from the temple roof and went into the fire with their children. Some of that is Roman moralising and some of it may not be. He survived, walked in the triumph, and the city he had held for three years was burned for seventeen days and its site left out of the settlement entirely.",
    ],
    battleSlugs: ["carthage"],
    ancientSourceIds: ["appian-hann", "polybius-36-39"],
    modernSourceIds: ["hoyos-2015", "astin-1967"],
    uncertaintyNotes: [
      "Appian is the fullest narrative and is written from the winners' tradition four centuries later.",
      "Polybius was standing beside Scipio at the end and his account of the siege survives only in fragments.",
      "Several Carthaginians named Hasdrubal are active in these same years, including one executed by his own side; the sources conflate them.",
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
    id: "caepio", slug: "caepio", name: "Servilius Caepio",
    fullName: "Quintus Servilius Caepio",
    title: "Consul 106, proconsul at Arausio", faction: "rome",
    diedYear: -90, lifeCertainty: "probable",
    activeFrom: -106, activeTo: -95, periodId: "late-republic",
    knownFor: "Refused to camp with a colleague he considered beneath him, and lost the worst battle since Cannae.",
    description: [
      "Arausio in 105 was not lost to the Cimbri so much as given to them. Two Roman armies were in the field on the Rhône, one under the consul Gnaeus Mallius Maximus and one under Caepio as proconsul. Mallius was a *novus homo*; Caepio was a Servilius, and would not put his camp beside the other man's or accept his authority. The two forces sat separately with the river between them, were attacked in turn, and were destroyed in turn. The reported dead — eighty thousand — would make it the costliest day in Roman history, worse than Cannae.",
      "He is also the man of the gold of Tolosa: as consul in 106 he had taken a vast treasure from the sanctuaries at Toulouse, and the convoy carrying it to Massilia was robbed on the road in circumstances nobody believed. He was stripped of his command, expelled from the senate, prosecuted, and died in exile. The direct political consequence was Marius, elected consul in absence for 104 and then re-elected four more times running, because the nobility had demonstrated in one afternoon that it could not be trusted with an army.",
    ],
    battleSlugs: ["arausio"],
    ancientSourceIds: ["livy-periochae-54-70"], modernSourceIds: ["sampson-2010", "harris-1979"],
    uncertaintyNotes: [
      "Livy's books for these years are lost; the battle survives in summaries and in later moralising accounts of the quarrel.",
      "The eighty thousand dead is a round figure from a tradition that wanted the disaster total.",
      "The gold of Tolosa and its disappearance is a scandal reported by hostile sources and cannot be checked.",
    ],
  },
  {
    id: "boiorix", slug: "boiorix", name: "Boiorix",
    title: "King of the Cimbri", faction: "cimbri",
    diedYear: -101, lifeCertainty: "probable",
    activeFrom: -105, activeTo: -101, periodId: "late-republic",
    knownFor: "Beat two Roman armies at Arausio, then walked into Marius' reformed one at Vercellae.",
    description: [
      "The named leader of a migration that had been beating Roman armies for eight years before he appears in the record. At Arausio in 105 the Cimbri destroyed both consular forces on the Rhône; the tradition has him send envoys to demand land first, which is what these peoples had asked for at every previous encounter, and be refused. After the victory the road into Italy was open and they did not take it — they turned into Spain instead, and gave Rome the three years in which Marius rebuilt the army.",
      "When they finally came south in 101 the Teutones had already been annihilated at Aquae Sextiae the summer before, though the Cimbri did not know it. At Vercellae on the Raudian plain, in high summer on open ground, they were caught by an army that was professional in a way no army they had met was: Marius and Catulus between them destroyed the migration in an afternoon. Boiorix was killed on the field. Plutarch's account of the women killing their children and then themselves in the wagon-laager behind the line is the part Romans remembered.",
    ],
    battleSlugs: ["arausio", "vercellae"],
    ancientSourceIds: ["plutarch-marius", "livy-periochae-54-70"],
    modernSourceIds: ["sampson-2010", "harris-1979"],
    uncertaintyNotes: [
      "Everything known about him comes from the accounts of the men who killed him, written centuries later.",
      "Whether the Cimbri had a single king, or Boiorix led one group among several, is not clear.",
      "Where the Cimbri and Teutones came from, and whether they were Germanic or Celtic, is still argued.",
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
    id: "pompeius-strabo", slug: "pompeius-strabo", name: "Pompeius Strabo",
    fullName: "Gnaeus Pompeius Strabo",
    title: "Consul, 89", faction: "rome",
    bornYear: -135, diedYear: -87, lifeCertainty: "probable",
    activeFrom: -90, activeTo: -87, periodId: "late-republic",
    knownFor: "Reduced Asculum to end the northern half of the Social War, and was hated by everyone who wrote about him.",
    description: [
      "Asculum was where the Social War had started, with a Roman praetor and every Roman in the town killed in a single day. Strabo spent a year investing it, beat the relief army sent to save it, and took it by starvation in 89. The magistrates were executed, the population driven out, and the property sold. He is the reason the northern half of the revolt collapsed — and the war as a whole was won not by him but by the legislation that gave the allies the citizenship they had risen for.",
      "Roman opinion of him was uniformly bad: avaricious, treacherous, and suspected of prolonging his command by negotiating with both sides during the first civil war. He died in 87, of plague or of lightning depending on which account you read, and the tradition says a crowd pulled his body from the bier. His son was in the camp at Asculum learning the trade, and would be greeted as *Magnus* by Sulla within seven years. On this atlas he is the point where two things begin: an Italy that is all citizens, and a Roman army that belongs to the man who raised it.",
    ],
    battleSlugs: ["asculum-picenum"],
    ancientSourceIds: ["appian-civil"], modernSourceIds: ["seager-2002", "harris-1979"],
    uncertaintyNotes: [
      "Livy's books for the Social War are lost, so this rests on Appian alone — one of the battles in this atlas standing on a single ancient text.",
      "The hostile character portrait descends through his son's enemies and cannot be independently checked.",
      "Whether he was negotiating with Cinna's side in 87 was already rumour rather than fact when it was written down.",
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
    id: "archelaus", slug: "archelaus", name: "Archelaus",
    title: "Mithridates' general in Greece", faction: "pontus",
    diedYear: -63, lifeCertainty: "disputed",
    activeFrom: -88, activeTo: -81, periodId: "late-republic",
    knownFor: "Took Greece for Mithridates in a season, and lost two enormous armies to Sulla in one summer.",
    description: [
      "The commander who made Mithridates' war a Roman emergency rather than a provincial one. In 88 he crossed to Greece with the Pontic fleet, took Athens and the Piraeus, and brought most of the mainland over — which meant that when Sulla arrived he had to besiege Athens through a winter before he could fight anybody. At Chaeronea in 86 Archelaus had the larger army by a wide margin, including scythed chariots, and lost it on broken ground where numbers and chariots were both useless. He rebuilt and fought again at Orchomenus the same year, in marshland, and lost that one too.",
      "The peace he then negotiated with Sulla at Dardanus was extraordinarily lenient — Mithridates gave up his conquests, paid an indemnity and kept his kingdom — because Sulla's real war was at home and he needed to be finished. Archelaus later fell under suspicion at the Pontic court for exactly that leniency and defected to Rome. His son was made high priest of Comana by Pompey. The atlas draws Chaeronea as the battle that saved Greece for Rome; from the Pontic side it is where a war that had begun with eighty thousand Romans and Italians murdered in a day started to be lost.",
    ],
    battleSlugs: ["chaeronea"],
    ancientSourceIds: ["plutarch-sulla", "appian-civil"],
    modernSourceIds: ["seager-2002", "harris-1979"],
    uncertaintyNotes: [
      "Plutarch's figures for the Pontic armies — well over a hundred thousand at Chaeronea — are not credible and come from Sulla's own memoirs.",
      "Sulla wrote the account this rests on, and he had every reason to enlarge what he had beaten.",
      "The date and manner of Archelaus' death are not recorded; the year here is a placeholder.",
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
    id: "surena", slug: "surena", name: "Surena",
    title: "Parthian commander at Carrhae", faction: "parthia",
    bornYear: -84, diedYear: -52, lifeCertainty: "probable",
    activeFrom: -54, activeTo: -52, periodId: "late-republic",
    knownFor: "Destroyed seven legions in a day with cavalry and a camel train full of arrows.",
    description: [
      "Not a name but an office — *Surena* is the title of the head of one of the great Parthian houses, whose hereditary privilege was to crown the king. He was about thirty at Carrhae and commanded perhaps a tenth of the men Crassus had. What he had instead was an answer to the legion: a thousand armoured lancers to stop it moving, nine thousand horse archers to shoot into it while it stood, and — the detail that made the difference — a train of camels carrying replacement arrows, so that the Roman assumption that archers must eventually run out simply failed.",
      "The Roman square could not close with cavalry, could not disperse without being ridden down, and could not stay where it was. Crassus' son Publius took the Gallic horse out to break the encirclement and was cut off; his head was brought back on a spear. Perhaps twenty thousand Romans died, ten thousand were taken, and the legionary standards went to Parthia and stayed there for thirty-three years. King Orodes had Surena executed within the year, on the reasonable ground that a subject who had just won that had become the more dangerous problem.",
    ],
    battleSlugs: ["carrhae"],
    ancientSourceIds: ["plutarch-crassus", "dio-36-44"],
    modernSourceIds: ["seager-2002", "harris-1979"],
    uncertaintyNotes: [
      "His personal name is not recorded — Surena is the family title, and Plutarch may have taken it for a name.",
      "Everything here is from Roman sources describing their own worst defeat in the East; there is no Parthian account.",
      "His age and the arrow-supply camels are Plutarch's details and cannot be corroborated.",
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

  {
    id: "mark-antony", slug: "mark-antony", name: "Mark Antony",
    fullName: "Marcus Antonius",
    title: "Caesar's lieutenant, consul 44", faction: "populares",
    bornYear: -83, diedYear: -30, lifeCertainty: "attested",
    activeFrom: -52, activeTo: -44, periodId: "late-republic",
    knownFor: "Held Caesar's left at Pharsalus, and after the Ides was the only man left who could hold the army.",
    description: [
      "He appears in this atlas three times and the third one decides a war. At Alesia in 52 he was one of the officers holding the double lines while the relieving army attacked from outside and Vercingetorix from inside. At Dyrrhachium in 48 he brought the reinforcements across the Adriatic that Caesar had been waiting on for months, through a blockade, and was still beaten in the siege lines. At Pharsalus a few weeks later Caesar gave him the left wing — the safe wing, resting on the river — while the battle was won on the right by the fourth line Caesar had hidden behind his cavalry.",
      "The atlas stops at the Ides of March, which is where he becomes the most important man in Rome and where his own story properly starts: the funeral speech, the alliance with Octavian and Lepidus, the proscriptions, Philippi, Egypt, and Actium fourteen years later. None of that is mapped here, for the same reason the emperors are not. What is here is the decade in which he was a competent subordinate to a better general, which is the part of his life he was never allowed to be judged on afterwards.",
    ],
    battleSlugs: ["alesia", "dyrrhachium", "pharsalus"],
    ancientSourceIds: ["caesar-bg", "caesar-bc", "plutarch-caesar", "appian-civil"],
    modernSourceIds: ["goldsworthy-2006", "seager-2002"],
    uncertaintyNotes: [
      "Two of the sources for his Gallic and civil-war service are Caesar's own dispatches, written to be read at Rome.",
      "Almost everything written about him after 44 is by the side that beat him, and colours the earlier record backwards.",
      "His role at Alesia is mentioned only in passing and his sector cannot be placed.",
    ],
  },
  {
    id: "juba", slug: "juba", name: "Juba I",
    title: "King of Numidia", faction: "numidia",
    diedYear: -46, lifeCertainty: "attested",
    activeFrom: -49, activeTo: -46, periodId: "late-republic",
    knownFor: "Backed the losing side at Thapsus, and his kingdom was annexed for it.",
    description: [
      "The last independent king of Numidia, and the reason the African campaign of Caesar's civil war was fought at all on that scale. He had a personal quarrel with Caesar going back years — Caesar was said to have pulled his beard in a Roman courtroom when Juba was a visiting prince — and he threw the kingdom behind the senatorial side, destroying Curio's army in 49 and bringing his own troops and elephants to Thapsus in 46. Caesar broke the combined force in an afternoon; the elephants were turned by slingers and stampeded back through their own line.",
      "Juba fled with Petreius and, finding the towns closed to him, the two are said to have fought a duel so that neither had to be taken alive. The kingdom became the province of Africa Nova, and on this atlas that is the last of the North African powers to go — a century after Carthage and by the same mechanism as Carthage: choosing wrongly in a Roman quarrel. His infant son was carried in Caesar's triumph, brought up in Italy, and later made a client king of Mauretania and a scholar of some note.",
    ],
    battleSlugs: ["thapsus"],
    ancientSourceIds: ["appian-civil", "dio-36-44", "plutarch-caesar"],
    modernSourceIds: ["goldsworthy-2006", "seager-2002"],
    uncertaintyNotes: [
      "The beard-pulling anecdote is the kind of personal cause later writers liked to supply for a political choice.",
      "The suicide pact with Petreius is reported in several incompatible versions.",
      "His birth year is not recorded.",
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

