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
export type RelationKind = "family" | "service" | "rivalry" | "battlefield";

export interface FigureRelation {
  from: string;
  to: string;
  kind: RelationKind;
  label: string;
  note: string;
  certainty: Certainty;
}

export const RELATION_KINDS: { kind: RelationKind; title: string; blurb: string }[] = [
  { kind: "family", title: "Blood, marriage and adoption", blurb: "Roman politics ran on families, and adoption counted as fully as birth." },
  { kind: "service", title: "Served under, or brought on", blurb: "Who learned the trade from whom — usually before falling out with them." },
  { kind: "rivalry", title: "Rivals and partners", blurb: "The same pairs, in both roles, often in the same decade." },
  { kind: "battlefield", title: "Met in the field", blurb: "Where two people in this atlas faced each other across a battle it holds." },
];

export const relations: FigureRelation[] = [
  // ── Family ────────────────────────────────────────────────────────────────
  {
    from: "aemilius-paullus", to: "scipio-aemilianus", kind: "family", certainty: "attested",
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
    from: "caesar", to: "pompey", kind: "family", certainty: "attested",
    label: "was the father-in-law of",
    note: "Caesar's daughter Julia married Pompey in 59, and by every account the marriage was a happy one that held the political arrangement together. She died in childbirth in 54. Crassus died at Carrhae the next year, and the two survivors had nothing left binding them.",
  },

  // ── Service ───────────────────────────────────────────────────────────────
  {
    from: "scipio-aemilianus", to: "jugurtha", kind: "service", certainty: "attested",
    label: "commanded",
    note: "Jugurtha led the Numidian cavalry at Numantia. He learned there how a Roman army worked from inside it, and — Sallust says — how much of Rome could be bought.",
  },
  {
    from: "scipio-aemilianus", to: "marius", kind: "service", certainty: "probable",
    label: "commanded",
    note: "Marius served as a young officer in the same camp. Asked at dinner who could replace him, Scipio is said to have clapped Marius on the shoulder. The story is only told because of what Marius became, which is exactly why it should be held loosely.",
  },
  {
    from: "marius", to: "sulla", kind: "service", certainty: "attested",
    label: "was the commander of",
    note: "Sulla was Marius' quaestor in Africa and took Jugurtha's surrender in person. Marius' supporters said the credit was Marius'; Sulla had a signet ring cut showing the surrender and wore it for the rest of his life. The quarrel ran thirty years and ended in civil war.",
  },
  {
    from: "sulla", to: "pompey", kind: "service", certainty: "probable",
    label: "was the patron of",
    note: "Pompey raised three legions privately at twenty-three and brought them to Sulla, who came out to meet him and greeted him as imperator before he had held any office at all.",
  },
  {
    from: "caesar", to: "labienus", kind: "service", certainty: "attested",
    label: "was the commander of",
    note: "Labienus was the senior legate in Gaul for eight years and the only subordinate Caesar trusted with an independent army. In 49 he was the one senior officer who went over to Pompey, and no source explains why.",
  },
  {
    from: "antiochus-iii", to: "hannibal", kind: "service", certainty: "attested",
    label: "gave refuge to",
    note: "Hannibal spent his exile at Antiochus' court, consulted for his name rather than his advice. The one command he was given was a fleet — and he lost it, off the Eurymedon, to the Rhodians.",
  },

  // ── Rivalry ───────────────────────────────────────────────────────────────
  {
    from: "crassus", to: "pompey", kind: "rivalry", certainty: "attested",
    label: "was the rival of",
    note: "Crassus destroyed Spartacus; Pompey, arriving from Spain in time to cut down fugitives, wrote to the Senate claiming to have ended the war. They held the consulship together in 70 and barely spoke.",
  },
  {
    from: "crassus", to: "caesar", kind: "rivalry", certainty: "probable",
    label: "financed",
    note: "Crassus covered debts large enough to stop Caesar leaving Rome for his province. The private arrangement between the three of them ran the Republic for a decade and had no legal existence at all.",
  },
  {
    from: "pompey", to: "caesar", kind: "rivalry", certainty: "attested",
    label: "was the rival of",
    note: "Allies, then father-in-law and son-in-law, then the two sides of a civil war. Pompey was murdered stepping ashore in Egypt eight weeks after Pharsalus, and Caesar is said to have wept when he was handed the head.",
  },
  {
    from: "marius", to: "sulla", kind: "rivalry", certainty: "attested",
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
    from: "flamininus", to: "hannibal", kind: "battlefield", certainty: "probable",
    label: "hunted down",
    note: "Sent in 183 to demand Hannibal's surrender from Prusias of Bithynia. Hannibal took poison rather than be handed over. Scipio Africanus died in the same year, in self-imposed exile from the city he had saved.",
  },
  {
    from: "aemilius-paullus", to: "perseus", kind: "battlefield", certainty: "attested",
    label: "defeated",
    note: "At Pydna in 168. Perseus walked in the triumph and died in Roman custody; Paullus lost both his own young sons in the same weeks, and said so publicly at the triumph.",
  },
  {
    from: "marius", to: "jugurtha", kind: "battlefield", certainty: "attested",
    label: "captured",
    note: "Handed over by his own father-in-law rather than beaten. Jugurtha walked in Marius' triumph on the first day of 104 and was starved to death in the Tullianum.",
  },
  {
    from: "sulla", to: "mithridates", kind: "battlefield", certainty: "attested",
    label: "defeated",
    note: "At Chaeronea in 86, with an army his own government had outlawed. He then made a lenient peace, because his real war was at home.",
  },
  {
    from: "pompey", to: "mithridates", kind: "battlefield", certainty: "attested",
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
];

/**
 * The curated chart.
 *
 * Not every relation above is drawn — a graph with twenty-six edges is a mess
 * rather than a picture. What is drawn is the spine: Romans along the top in
 * chronological order, the enemies they faced below them, and the family, service
 * and rivalry links arcing over the top row. Coordinates are hand-placed in a
 * 168 × 76 frame, and a test checks that no label runs outside it or collides
 * with its neighbour.
 *
 * The thing the chart is really for is the middle of it. Scipio Aemilianus,
 * Marius and Jugurtha were all in the same camp at Numantia in 134, and the two
 * clusters of this atlas — the Scipios and their Punic wars, and the men who
 * pulled the Republic apart — meet at that one node.
 */
export interface ChartNode {
  slug: string;
  label: string;
  x: number;
  y: number;
}

export const CHART_FRAME = { width: 168, height: 76, topRow: 24, bottomRow: 56 };

export const chartNodes: ChartNode[] = [
  { slug: "scipio-africanus", label: "Africanus", x: 14, y: 24 },
  { slug: "aemilius-paullus", label: "Paullus", x: 38, y: 24 },
  { slug: "scipio-aemilianus", label: "Aemilianus", x: 62, y: 24 },
  { slug: "marius", label: "Marius", x: 86, y: 24 },
  { slug: "sulla", label: "Sulla", x: 104, y: 24 },
  { slug: "crassus", label: "Crassus", x: 120, y: 24 },
  { slug: "pompey", label: "Pompey", x: 137, y: 24 },
  { slug: "caesar", label: "Caesar", x: 155, y: 24 },

  { slug: "hannibal", label: "Hannibal", x: 14, y: 56 },
  { slug: "perseus", label: "Perseus", x: 38, y: 56 },
  { slug: "jugurtha", label: "Jugurtha", x: 74, y: 56 },
  { slug: "mithridates", label: "Mithridates", x: 104, y: 56 },
  { slug: "spartacus", label: "Spartacus", x: 126, y: 56 },
  { slug: "vercingetorix", label: "Vercingetorix", x: 150, y: 56 },
];

/** How high each top-row arc rises. Longer spans go higher so they do not overlap. */
export const chartArcs: { from: string; to: string; lift: number }[] = [
  { from: "marius", to: "caesar", lift: 2 },
  { from: "scipio-africanus", to: "scipio-aemilianus", lift: 6 },
  { from: "sulla", to: "pompey", lift: 10 },
  { from: "crassus", to: "caesar", lift: 10 },
  { from: "aemilius-paullus", to: "scipio-aemilianus", lift: 15 },
  { from: "scipio-aemilianus", to: "marius", lift: 15 },
  { from: "marius", to: "sulla", lift: 17 },
  { from: "crassus", to: "pompey", lift: 17 },
  { from: "pompey", to: "caesar", lift: 17 },
];

export function relationsFor(slug: string): FigureRelation[] {
  return relations.filter((relation) => relation.from === slug || relation.to === slug);
}
