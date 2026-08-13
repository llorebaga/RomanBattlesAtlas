import type { Certainty } from "@/types/history";

/**
 * How the people in this atlas were connected to each other.
 *
 * Two rules, both enforced by tests. Every endpoint must be a figure that exists
 * here, and every relation carries an evidence grade — because "Marius married
 * Caesar's aunt" and "Scipio clapped Marius on the shoulder at Numantia" are not
 * the same kind of claim, and a chart that drew them identically would be lying
 * by omission.
 *
 * The `label` reads as a sentence: "<from> <label> <to>".
 */
export type RelationKind = "family" | "service" | "rivalry" | "battlefield" | "alliance";

export interface FigureRelation {
  from: string;
  to: string;
  kind: RelationKind;
  label: string;
  note: string;
  certainty: Certainty;
  /**
   * The year to draw it at, where one year is the right answer — a wedding, a
   * campaign, a handover. Left off, the chart infers it: the battle both fought,
   * if the atlas holds one, and otherwise the middle of the years both were
   * campaigning or, failing that, both alive. Do not invent one to tidy the
   * picture; an inferred anchor is drawn as an open ring so a reader can tell.
   */
  year?: number;
}

// Title, blurb and colour together, because the chart draws the colour and the
// key names it, and those two lived in different files until they disagreed.
export const RELATION_KINDS: { kind: RelationKind; title: string; blurb: string; color: string }[] = [
  { kind: "family", title: "Blood, marriage and adoption", blurb: "Roman politics ran on families, and adoption counted as fully as birth.", color: "#8a6a2f" },
  { kind: "service", title: "Served under, or brought on", blurb: "Who learned the trade from whom — usually before falling out with them.", color: "#3f6b52" },
  { kind: "rivalry", title: "Rivals and partners", blurb: "The same pairs, in both roles, often in the same decade.", color: "#a33d33" },
  { kind: "battlefield", title: "Met in the field", blurb: "Where two people in this atlas faced each other across a battle it holds.", color: "#7b7466" },
  // Added when the roster grew past Rome's own commanders. Masinissa, Eumenes II
  // and Eudamus of Rhodes all fought on Rome's side, and there was no way to say
  // so: filed as `service` they looked like subordinates, and as `battlefield`
  // they looked like enemies. Rome's wars were won by allies often enough that
  // the chart has to be able to draw one.
  { kind: "alliance", title: "Fought on the same side", blurb: "Allies — including the ones who had been on the other side until it stopped paying.", color: "#3d6a8f" },
];

export const relationColor = (kind: string): string =>
  RELATION_KINDS.find((entry) => entry.kind === kind)?.color ?? "#7b7466";

export const relations: FigureRelation[] = [
  // ── Family ────────────────────────────────────────────────────────────────
  {
    from: "aemilius-paullus", to: "scipio-aemilianus", kind: "family", certainty: "attested", year: -185, // the year the son who would destroy Carthage was born
    label: "was the father of",
    note: "Aemilianus was born a Paullus and given in adoption to the son of Scipio Africanus. One man therefore carried the names of the victors of both Zama and Pydna — and went on to destroy Carthage himself.",
  },
  {
    from: "scipio-africanus", to: "scipio-aemilianus", kind: "family", certainty: "attested",
    label: "was the adoptive grandfather of",
    note: "Africanus beat Hannibal in 202. His adopted grandson burned Carthage in 146. The same family name closes both ends of the war, fifty-six years apart.",
  },
  {
    from: "philip-v", to: "perseus", kind: "family", certainty: "attested",
    label: "was the father of",
    note: "Philip lost Greece at Cynoscephalae and spent twenty years quietly rebuilding what Rome had left him. Perseus inherited the rebuilt kingdom and lost all of it at Pydna.",
  },
  {
    from: "marius", to: "caesar", kind: "family", certainty: "attested",
    label: "was the uncle by marriage of",
    note: "Marius married Julia, the sister of Caesar's father. Caesar was seventeen when Marius died, was married to Cinna's daughter, and refused Sulla's order to divorce her — which nearly cost him his life and made his politics for him.",
  },
  {
    from: "caesar", to: "pompey", kind: "family", certainty: "attested", year: -59, // Julia's marriage, in the year of Caesar's first consulship
    label: "was the father-in-law of",
    note: "Caesar's daughter Julia married Pompey in 59, and by every account the marriage was a happy one that held the political arrangement together. She died in childbirth in 54. Crassus died at Carrhae the next year, and the two survivors had nothing left binding them.",
  },

  // ── Service ───────────────────────────────────────────────────────────────
  {
    from: "scipio-aemilianus", to: "jugurtha", kind: "service", certainty: "attested", year: -134, // the siege lines at Numantia
    label: "commanded",
    note: "Jugurtha led the Numidian cavalry at Numantia. He learned there how a Roman army worked from inside it, and — Sallust says — how much of Rome could be bought.",
  },
  {
    from: "scipio-aemilianus", to: "marius", kind: "service", certainty: "probable", year: -134, // the same camp, the same year
    label: "commanded",
    note: "Marius served as a young officer in the same camp. Asked at dinner who could replace him, Scipio is said to have clapped Marius on the shoulder. The story is only told because of what Marius became, which is exactly why it should be held loosely.",
  },
  {
    from: "marius", to: "sulla", kind: "service", certainty: "attested", year: -107, // Sulla joins him as quaestor for the African command
    label: "was the commander of",
    note: "Sulla was Marius' quaestor in Africa and took Jugurtha's surrender in person. Marius' supporters said the credit was Marius'; Sulla had a signet ring cut showing the surrender and wore it for the rest of his life. The quarrel ran thirty years and ended in civil war.",
  },
  {
    from: "sulla", to: "pompey", kind: "service", certainty: "probable", year: -83, // Pompey brings three private legions to Brundisium
    label: "was the patron of",
    note: "Pompey raised three legions privately at twenty-three and brought them to Sulla, who came out to meet him and greeted him as imperator before he had held any office at all.",
  },
  {
    from: "caesar", to: "labienus", kind: "service", certainty: "attested", year: -58, // the first year in Gaul
    label: "was the commander of",
    note: "Labienus was the senior legate in Gaul for eight years and the only subordinate Caesar trusted with an independent army. In 49 he was the one senior officer who went over to Pompey, and no source explains why.",
  },
  {
    from: "antiochus-iii", to: "hannibal", kind: "service", certainty: "attested", year: -195, // the year Hannibal reached the Seleucid court
    label: "gave refuge to",
    note: "Hannibal spent his exile at Antiochus' court, consulted for his name rather than his advice. The one command he was given was a fleet — and he lost it, off the Eurymedon, to the Rhodians.",
  },

  // ── Rivalry ───────────────────────────────────────────────────────────────
  {
    from: "crassus", to: "pompey", kind: "rivalry", certainty: "attested", year: -70, // the consulship they held together and barely spoke through
    label: "was the rival of",
    note: "Crassus destroyed Spartacus; Pompey, arriving from Spain in time to cut down fugitives, wrote to the Senate claiming to have ended the war. They held the consulship together in 70 and barely spoke.",
  },
  {
    from: "crassus", to: "caesar", kind: "rivalry", certainty: "probable", year: -61, // the debts covered before Caesar could leave for his province
    label: "financed",
    note: "Crassus covered debts large enough to stop Caesar leaving Rome for his province. The private arrangement between the three of them ran the Republic for a decade and had no legal existence at all.",
  },
  {
    from: "pompey", to: "caesar", kind: "rivalry", certainty: "attested", year: -48, // Pharsalus
    label: "was the rival of",
    note: "Allies, then father-in-law and son-in-law, then the two sides of a civil war. Pompey was murdered stepping ashore in Egypt eight weeks after Pharsalus, and Caesar is said to have wept when he was handed the head.",
  },
  {
    from: "marius", to: "sulla", kind: "rivalry", certainty: "attested", year: -88, // the year Sulla first marched an army on Rome
    label: "was the lifelong enemy of",
    note: "It began over who deserved credit for capturing Jugurtha and ended with both men marching armies on Rome, proscription lists, and Sulla having Marius' remains dug up and thrown in the Anio.",
  },

  // ── Met in the field ──────────────────────────────────────────────────────
  {
    from: "scipio-africanus", to: "hannibal", kind: "battlefield", certainty: "attested",
    label: "defeated",
    note: "At Zama in 202, having spent a decade studying him. The tradition that the two later met at Ephesus and discussed who the greatest generals had been is a good story that no contemporary source supports.",
  },
  {
    from: "marcellus", to: "hannibal", kind: "battlefield", certainty: "probable",
    label: "fought",
    note: "Marcellus was the commander who would give battle when Fabius would not, and the pairing became proverbial. He was killed in 208 riding into a cavalry ambush while personally scouting.",
  },
  {
    from: "flamininus", to: "philip-v", kind: "battlefield", certainty: "attested",
    label: "defeated",
    note: "At Cynoscephalae in 197, in a battle that began by accident in fog on ridges neither commander had scouted.",
  },
  {
    from: "flamininus", to: "hannibal", kind: "battlefield", certainty: "probable", year: -183, // the embassy to Prusias, and Hannibal's suicide
    label: "hunted down",
    note: "Sent in 183 to demand Hannibal's surrender from Prusias of Bithynia. Hannibal took poison rather than be handed over. Scipio Africanus died in the same year, in self-imposed exile from the city he had saved.",
  },
  {
    from: "aemilius-paullus", to: "perseus", kind: "battlefield", certainty: "attested",
    label: "defeated",
    note: "At Pydna in 168. Perseus walked in the triumph and died in Roman custody; Paullus lost both his own young sons in the same weeks, and said so publicly at the triumph.",
  },
  {
    from: "marius", to: "jugurtha", kind: "battlefield", certainty: "attested", year: -105, // the surrender, arranged by Jugurtha's own father-in-law
    label: "captured",
    note: "Handed over by his own father-in-law rather than beaten. Jugurtha walked in Marius' triumph on the first day of 104 and was starved to death in the Tullianum.",
  },
  {
    from: "sulla", to: "mithridates", kind: "battlefield", certainty: "attested",
    label: "defeated",
    note: "At Chaeronea in 86, with an army his own government had outlawed. He then made a lenient peace, because his real war was at home.",
  },
  {
    from: "pompey", to: "mithridates", kind: "battlefield", certainty: "attested", year: -63, // the king's death, cornered by his own son
    label: "finished",
    note: "Pompey took over a war Lucullus had effectively won and drove Mithridates out for good. The king, cornered by his own son, could not poison himself — a lifetime of small doses had seen to that — and had a bodyguard kill him.",
  },
  {
    from: "crassus", to: "spartacus", kind: "battlefield", certainty: "attested",
    label: "destroyed",
    note: "At the Silarius in 71. Six thousand prisoners were crucified along the road from Capua to Rome, one every forty yards for a hundred and thirty miles.",
  },
  {
    from: "caesar", to: "vercingetorix", kind: "battlefield", certainty: "attested",
    label: "defeated",
    note: "At Alesia in 52, by building two walls facing opposite ways. Vercingetorix was kept six years and executed at Caesar's triumph.",
  },
  {
    from: "caesar", to: "labienus", kind: "battlefield", certainty: "attested",
    label: "finally killed",
    note: "Labienus died at Munda in 45, fighting against the man he had served for eight years in Gaul, and was buried on the field.",
  },

  // ── Added with the wider roster ───────────────────────────────────────────
  // Family first, and the two pairs of brothers the atlas had been drawing as
  // strangers: Hannibal and Hasdrubal, and the two Scipios who took Asia.
  {
    from: "hannibal", to: "hasdrubal-barca", kind: "family", certainty: "attested", year: -218, // the year the brothers split the war between them
    label: "was the brother of",
    note: "Hamilcar's sons divided the war: Hannibal took the army to Italy, Hasdrubal held Iberia and was supposed to follow with the reinforcements. It took him eleven years to get there, and he was intercepted and killed on the Metaurus before the two ever made contact. His head was thrown into Hannibal's camp.",
  },
  {
    from: "scipio-africanus", to: "scipio-asiaticus", kind: "family", certainty: "attested", year: -190, // the consulship that took the family to Asia
    label: "was the brother of",
    note: "Lucius held the consulship of 190 and the command against Antiochus; Africanus went with him as his legate, which everyone understood to be the actual arrangement. Both were prosecuted over the indemnity within a few years, and both left public life over it.",
  },
  {
    from: "pompeius-strabo", to: "pompey", kind: "family", certainty: "attested", year: -89, // the son learning the trade in his father's camp at Asculum
    label: "was the father of",
    note: "Pompey was seventeen and in the camp at Asculum while his father reduced it. He inherited his father's clients, his father's veterans and his father's reputation for greed, and raised three private legions on the strength of the first two at twenty-three.",
  },

  // Service.
  {
    from: "antiochus-iii", to: "polyxenidas", kind: "service", certainty: "attested", year: -192, // the Rhodian exile given the Seleucid fleet
    label: "gave the fleet to",
    note: "A Rhodian exile commanding the navy of the empire his own city was fighting. He lost at Corycus, bought a season with the ambush at Panormus, and lost the sea for good at Myonessus.",
  },
  {
    from: "mithridates", to: "archelaus", kind: "service", certainty: "attested", year: -88, // the invasion of Greece
    label: "sent to take Greece",
    note: "Archelaus took Athens and most of the mainland in a season, which turned a provincial revolt into a war Rome had to send Sulla to fight. He lost two armies to him in one summer, made the peace, and later defected to Rome for having made it.",
  },
  {
    from: "caesar", to: "mark-antony", kind: "service", certainty: "attested", year: -52, // the lines at Alesia
    label: "was the commander of",
    note: "Antony held a sector of the double lines at Alesia, brought the reinforcements across the Adriatic to Dyrrhachium through a blockade, and had the left wing at Pharsalus. He was competent, and he was never afterwards judged on it.",
  },

  // Rivalry.
  {
    from: "manlius-torquatus", to: "decius-mus", kind: "rivalry", certainty: "traditional", year: -340, // the consulship they held together
    label: "was the colleague of",
    note: "The two consuls of 340, who between them broke the Latin revolt in a season. The tradition gives them the two most famous acts of Roman severity in the same campaign: Torquatus executing his own son for winning a fight against orders, and Decius riding into the enemy line to make good a vow.",
  },
  {
    from: "cato-the-elder", to: "scipio-africanus", kind: "rivalry", certainty: "attested", year: -187, // the prosecutions over the Antiochene indemnity
    label: "prosecuted",
    note: "Cato had served under him and disliked what he saw — Greek dress, Greek habits, and an army he thought indulged. He drove the attacks on the brothers' accounting for the Antiochene indemnity, and Africanus left Rome for good rather than answer them. Both men died in 183.",
  },

  // Met in the field.
  {
    from: "camillus", to: "brennus", kind: "battlefield", certainty: "traditional",
    label: "is said to have driven out",
    note: "The tradition brings Camillus back from exile to catch the Gauls as they leave with the ransom, and has him say that Rome is ransomed with iron and not gold. Polybius, who is closer to a record here, knows nothing of it. The atlas holds the Allia, which Camillus was not at — this link is what Rome remembered, drawn where the two men overlap.",
  },
  {
    from: "papirius-cursor", to: "pontius", kind: "battlefield", certainty: "disputed", year: -292, // the execution after the triumph
    label: "captured and executed",
    note: "Twenty-nine years after the Caudine Forks, a Gaius Pontius was taken, paraded in a Roman triumph and beheaded. Whether it was the same man is not certain, and the symmetry is a reason for doubt.",
  },
  {
    from: "curius-dentatus", to: "pyrrhus", kind: "battlefield", certainty: "probable",
    label: "finally beat",
    note: "At Beneventum in 275, where the elephants were driven back into his own line. Pyrrhus withdrew in good order and left Italy within months, because the one thing he could not do was replace the men he had brought from Greece.",
  },
  {
    from: "xanthippus", to: "regulus", kind: "battlefield", certainty: "attested",
    label: "destroyed",
    note: "On the Bagradas plain in 255, with the phalanx on flat ground and the elephants and cavalry on the wings — the arms Carthage was better at, used properly for the first time in the war. A few hundred Romans got away. Regulus was taken alive.",
  },
  {
    from: "hannibal", to: "flaminius", kind: "battlefield", certainty: "attested",
    label: "killed",
    note: "At Trasimene in 217, in morning mist, with the Roman column strung out along the lake road and the Carthaginian army on the slope above it. Flaminius died with about fifteen thousand of his men inside an hour.",
  },
  {
    from: "hannibal", to: "varro", kind: "battlefield", certainty: "attested",
    label: "beat",
    note: "Cannae. Varro held command on the day by the daily rotation, survived, and was met outside Rome by the senate in a body and thanked for not despairing of the Republic.",
  },
  {
    from: "scipio-africanus", to: "hasdrubal-barca", kind: "battlefield", certainty: "attested",
    label: "beat",
    note: "At Baecula in 208 — and did not stop him. Hasdrubal disengaged with his army intact and took it to Italy, which is the strongest argument that Baecula was less of a victory than the Roman tradition wanted.",
  },
  {
    from: "scipio-africanus", to: "hasdrubal-gisco", kind: "battlefield", certainty: "attested",
    label: "beat",
    note: "Twice: at Ilipa in 206, which ended Carthaginian Iberia, and at the Great Plains in 203, which ended the attempt to defend Africa away from Carthage.",
  },
  {
    from: "hannibal", to: "masinissa", kind: "battlefield", certainty: "attested",
    label: "was outflanked by",
    note: "Masinissa's cavalry drove the Carthaginian horse off the field at Zama and then came back into the rear of Hannibal's third line. It is the manoeuvre that decided the battle, and Hannibal had used it himself at Cannae fourteen years earlier.",
  },
  {
    from: "antiochus-iii", to: "eumenes-ii", kind: "battlefield", certainty: "attested",
    label: "was broken by",
    note: "At Magnesia, where Eumenes commanded the Roman right, scattered the scythed chariots with light troops before they reached the line, and charged into the confusion they made of the Seleucid left.",
  },
  {
    from: "polyxenidas", to: "eumenes-ii", kind: "battlefield", certainty: "attested",
    label: "was beaten by",
    note: "At Corycus in 191, the first fleet action of the war, where the Pergamene squadron joined the Roman line and the Seleucid fleet withdrew to Ephesus.",
  },
  {
    from: "polyxenidas", to: "eudamus", kind: "battlefield", certainty: "attested",
    label: "was beaten by",
    note: "At Myonessus in 190. The Rhodians held the flank while the Romans broke the centre, and the Seleucid fleet stopped existing as a force that could contest the crossing into Asia.",
  },
  {
    from: "hannibal", to: "eudamus", kind: "battlefield", certainty: "probable", year: -190, // the Eurymedon
    label: "was stopped at sea by",
    note: "The only naval command Hannibal was given, and the only time in this atlas he is beaten by someone who is not a Scipio. Eudamus caught the Phoenician fleet off the Eurymedon with a smaller Rhodian squadron and turned it back.",
  },
  {
    from: "scipio-aemilianus", to: "hasdrubal-boetharch", kind: "battlefield", certainty: "attested",
    label: "took the surrender of",
    note: "After three years and a street-by-street storming, the commander who had held Carthage came out alone to beg for his life while his wife cursed him from the temple roof and went into the fire with their children.",
  },
  {
    from: "hasdrubal-boetharch", to: "masinissa", kind: "battlefield", certainty: "probable",
    label: "took the field against",
    note: "In 150, which was the point of the whole thing: the treaty of 201 forbade Carthage to make war without Rome's leave, so fighting back against fifty years of Numidian encroachment was itself the breach Rome needed. He was condemned to death for it by his own government, and recalled to command when Rome demanded the city be abandoned.",
  },
  {
    from: "boiorix", to: "caepio", kind: "battlefield", certainty: "probable",
    label: "destroyed the army of",
    note: "At Arausio in 105, where two Roman armies camped separately because a proconsul of the Servilii would not put his lines beside a new man's, and were destroyed one after the other.",
  },
  {
    from: "marius", to: "boiorix", kind: "battlefield", certainty: "attested",
    label: "annihilated",
    note: "At Vercellae in 101, on open ground in high summer, with an army rebuilt around long service rather than property. Boiorix was killed on the field and the migration ended there.",
  },
  {
    from: "sulla", to: "archelaus", kind: "battlefield", certainty: "attested",
    label: "beat",
    note: "At Chaeronea in 86, on broken ground that made the Pontic numbers and the scythed chariots useless, and again at Orchomenus in the marshes the same year.",
  },
  {
    from: "surena", to: "crassus", kind: "battlefield", certainty: "attested",
    label: "destroyed",
    note: "At Carrhae in 53, with a tenth of the men — armoured lancers to stop the legions moving, horse archers to shoot into them while they stood, and a camel train of spare arrows so that they never ran out. Orodes had Surena executed within the year.",
  },
  {
    from: "pompey", to: "mark-antony", kind: "battlefield", certainty: "attested",
    label: "faced",
    note: "At Dyrrhachium, where Pompey had the better of it, and at Pharsalus a few weeks later, where Antony held Caesar's left against him and the battle was won on the other wing.",
  },
  {
    from: "caesar", to: "juba", kind: "battlefield", certainty: "attested",
    label: "destroyed",
    note: "At Thapsus in 46, where the elephants were turned by slingers and stampeded back through their own line. Juba fled, found the towns shut against him, and died in a suicide pact with Petreius. His kingdom became the province of Africa Nova.",
  },

  // Fought on the same side.
  {
    from: "scipio-africanus", to: "masinissa", kind: "alliance", certainty: "attested", year: -202, // Zama
    label: "won Africa with",
    note: "Masinissa had fought for Carthage in Iberia and changed sides when it became clear which way the war was going. He brought the cavalry Rome had never had, and was paid in the whole of Numidia — which he then spent fifty years using against Carthage with Rome's arbitration behind him.",
  },
  {
    from: "eumenes-ii", to: "scipio-asiaticus", kind: "alliance", certainty: "attested", year: -190, // Magnesia
    label: "fought beside",
    note: "Rome annexed nothing after Magnesia and gave nearly all of it to Pergamum and Rhodes. It is the clearest case in this atlas of Rome winning a war and handing the territory to somebody else — and of an ally understanding earlier than anyone that Rome could be used.",
  },
  {
    from: "eumenes-ii", to: "eudamus", kind: "alliance", certainty: "attested", year: -190, // the Aegean campaign
    label: "shared the sea with",
    note: "Pergamum and Rhodes supplied the seamanship Rome did not have, and were paid for it at Apamea — Eumenes with most of Asia Minor, Rhodes with Lycia and Caria. Within twenty years the senate had cut Rhodes' harbour revenues to a fraction and begun cooling on Pergamum too.",
  },
  {
    from: "cato-the-elder", to: "scipio-asiaticus", kind: "alliance", certainty: "attested", year: -191, // Thermopylae
    label: "served in the same army as",
    note: "Cato was a consular serving as a legate at Thermopylae and took the mountain path that turned Antiochus out of Greece. Within five years he was prosecuting the brothers he had campaigned with.",
  },

  // ── After the Ides ────────────────────────────────────────────────────────
  // The last fourteen years of the Republic are the densest part of this chart,
  // because everyone in them had already been on the other side of somebody.
  {
    from: "caesar", to: "augustus", kind: "family", certainty: "attested", year: -44, // the will read after the murder
    label: "adopted, in his will,",
    note: "The great-nephew was eighteen and at Apollonia when the news came. Antony treated the adoption as a formality and the senate treated the boy as a counterweight to be used and dropped; both were wrong about what the name was worth.",
  },
  {
    from: "caesar", to: "brutus", kind: "family", certainty: "disputed", year: -44, // the Ides
    label: "was rumoured to be the father of",
    note: "Caesar had a long affair with Servilia, Brutus' mother, and the rumour is ancient. The arithmetic makes it very unlikely — Caesar was fifteen when Brutus was born — but the story was told in antiquity and is part of why the killing was written as a parricide.",
  },
  {
    from: "cleopatra", to: "caesar", kind: "family", certainty: "disputed", year: -47, // Caesarion
    label: "had a son she named for",
    note: "Caesarion was presented as Caesar's son and Antony had him formally acknowledged as such in Alexandria in 34, which is precisely why Octavian had him killed in 30: two heirs to the same name was one too many.",
  },
  {
    from: "pompeius-strabo", to: "ventidius", kind: "rivalry", certainty: "probable", year: -89, // Asculum
    label: "destroyed the town of",
    note: "Ventidius was a small child in Asculum when Pompeius Strabo took it, and was carried through Rome in the triumph as a captive. He ended as the first Roman ever to triumph over Parthia.",
  },
  {
    from: "augustus", to: "agrippa", kind: "service", certainty: "attested", year: -37, // the fleet at Portus Julius
    label: "had every battle won for him by",
    note: "The same age, and at Apollonia together when Caesar was killed. Agrippa built two fleets, won Naulochus and Actium, and never once held a command against his friend's interest — which in this atlas makes him unique.",
  },
  {
    from: "mark-antony", to: "ventidius", kind: "service", certainty: "attested", year: -39, // the Syrian command
    label: "was the commander of",
    note: "Ventidius recovered Syria for him in two campaigning seasons while he was in Athens and Alexandria. Antony arrived in time to take over the siege that followed, and the tradition says he resented the credit.",
  },
  {
    from: "cassius", to: "brutus", kind: "rivalry", certainty: "attested", year: -44, // the conspiracy
    label: "organised the conspiracy with",
    note: "Cassius did the assembling; Brutus supplied the name of the family that had thrown out the last king. Cassius argued for killing Antony as well and was overruled, which is the decision the next two years turned on.",
  },
  {
    from: "augustus", to: "mark-antony", kind: "rivalry", certainty: "attested", year: -32, // the will, and the declaration of war
    label: "declared war on the queen of",
    note: "Seizing Antony's will from the Vestals and reading it in the senate, then declaring war on Cleopatra rather than on a Roman colleague, made every man who stayed with Antony a traitor by his own choice. It was the move that won the war.",
  },
  {
    from: "sextus-pompeius", to: "augustus", kind: "rivalry", certainty: "attested", year: -39, // the treaty of Misenum
    label: "starved Rome to make terms with",
    note: "Sicily, Sardinia and a promised consulship, agreed at Misenum in 39 because the grain fleet mattered more than the principle. The agreement lasted about a year.",
  },
  {
    from: "pompey", to: "sextus-pompeius", kind: "family", certainty: "attested", year: -48, // the flight after Pharsalus
    label: "was the father of",
    note: "The younger son survived Pharsalus, Thapsus and Munda, went to sea, and made himself the last power in the Mediterranean that was not a triumvir. His coins claimed he was restoring his father's Republic.",
  },
  {
    from: "mark-antony", to: "brutus", kind: "battlefield", certainty: "attested",
    label: "beat",
    note: "Twice at Philippi in three weeks. Antony did the fighting on both days; Brutus held the stronger position each time and gave it up each time because his own army would not sit still.",
  },
  {
    from: "mark-antony", to: "cassius", kind: "battlefield", certainty: "attested",
    label: "overran the camp of",
    note: "In the first battle, at the same hour that Brutus was overrunning Octavian's on the other wing. Neither commander could see the other half of the field, and Cassius killed himself believing all was lost.",
  },
  {
    from: "crassus", to: "cassius", kind: "service", certainty: "attested", year: -53, // Carrhae
    label: "took his quaestor to Carrhae,",
    note: "Cassius got out of the disaster alive and then held Syria against the Parthians for two years with what was left — the only man in this atlas beaten at Carrhae who kept the province afterwards.",
  },
  {
    from: "agrippa", to: "sextus-pompeius", kind: "battlefield", certainty: "attested",
    label: "destroyed the fleet of",
    note: "At Naulochus, with a grapnel shot from a catapult that cancelled the advantage of the better sailor. Sextus lost all but seventeen of three hundred ships.",
  },
  {
    from: "ventidius", to: "pacorus", kind: "battlefield", certainty: "attested",
    label: "killed",
    note: "At Gindarus, by holding high ground so the cataphract charge arrived slow and releasing slingers into it at close range. It was the answer to Carrhae, fifteen years late.",
  },
  {
    from: "agrippa", to: "mark-antony", kind: "battlefield", certainty: "attested",
    label: "blockaded and broke",
    note: "Actium was won over a summer rather than in an afternoon: Agrippa took the supply stations one by one until the fleet in the gulf was starving and short of rowers, and had to come out.",
  },
  {
    from: "augustus", to: "cleopatra", kind: "battlefield", certainty: "attested",
    label: "took Egypt from",
    note: "She outlived Antony by nine days, negotiating and then refusing to be led through Rome in a triumph. How she died is not recoverable; the asp is a later certainty rather than a contemporary one.",
  },
  {
    from: "mark-antony", to: "cleopatra", kind: "alliance", certainty: "attested", year: -41, // Tarsus
    label: "took the East with",
    note: "Summoned to Tarsus to answer for Egypt's conduct in the war, she arrived on a barge and he wintered in Alexandria instead of preparing the Parthian campaign the East had been given him to fight. Her money and her grain paid for the last eleven years of his career.",
  },
  {
    from: "augustus", to: "mark-antony", kind: "alliance", certainty: "attested", year: -43, // the triumvirate, established by law
    label: "divided the state with",
    note: "Six months after being sent to destroy him. The triumvirate was established by law in November 43, and opened with a proscription that killed perhaps three hundred senators — Cicero among them, at Antony's insistence and with Octavian's consent.",
  },
  {
    from: "sertorius", to: "pompey", kind: "battlefield", certainty: "attested",
    label: "broke the wing of",
    note: "At the Sucro in 75, where he wounded Pompey and nearly finished him before the other Roman army came up. He is said to have remarked that if the old woman had not turned up he would have whipped the boy and sent him back to Rome.",
  },
  {
    from: "marius", to: "sertorius", kind: "service", certainty: "probable", year: -102, // the Cimbric war
    label: "had serving under him",
    note: "Sertorius lost an eye against the Cimbri and is said to have gone into their camp in disguise to scout it. He took the Marian side in the civil war that followed and would not accept Sulla's settlement, which is how he ended up governing Spain against Rome.",
  },
];

export function relationsFor(slug: string): FigureRelation[] {
  return relations.filter((relation) => relation.from === slug || relation.to === slug);
}
