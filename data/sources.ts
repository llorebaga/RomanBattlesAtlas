import type { HistoricalSource } from "@/types/history";

// Every ancient source carries the years it survives for, and a test asserts that
// nothing is ever cited outside them. That check earns its keep: it caught the
// Pyrrhic battles citing Livy, whose books on that war are lost, and the later
// Second Punic battles citing Polybius' Book 3, which stops at Cannae.
//
// Where a text survives only in fragments the note says so, because "Polybius
// covers Baecula" and "a fragment of Polybius mentions Baecula" are different
// claims about how much weight the citation can bear.
export const sources: HistoricalSource[] = [
  // ── Early Rome ─────────────────────────────────────────────────────────────
  // Everything here was written four to five centuries after the events, from
  // annalistic material already shaped by the families whose ancestors appear in
  // it. The modern works are cited alongside because for this period the
  // scholarship on how far the tradition can be trusted is not optional
  // background — it is the evidence.
  {
    id: "livy-1-5", kind: "ancient", citation: "Livy, Ab Urbe Condita, Books 1–5",
    note: "The foundation to the Gallic sack. The fullest narrative that survives and the least reliable part of Livy: he is working from annalists who themselves had little to work from, and he says so.",
    covers: [{ fromYear: -753, toYear: -386 }],
  },
  {
    id: "livy-6-10", kind: "ancient", citation: "Livy, Ab Urbe Condita, Books 6–10",
    note: "389 to 293 BCE, covering the Latin and Samnite wars. Better founded than the first pentad, but the battle narratives are still built on the assumption that early Rome fought the way late Rome did.",
    covers: [{ fromYear: -389, toYear: -293 }],
  },
  {
    id: "livy-periochae", kind: "ancient", citation: "Livy, Periochae (the ancient summaries of the lost books)",
    note: "Books 11–20 covered 292–219 BCE and are lost; what survives is a paragraph-long summary of each. It fixes years, consuls and outcomes and almost nothing else — which is why the Pyrrhic War is reconstructed mainly from Plutarch.",
    covers: [{ fromYear: -292, toYear: -220 }],
  },
  {
    id: "dionysius-hal", kind: "ancient", citation: "Dionysius of Halicarnassus, Roman Antiquities",
    note: "A Greek history of early Rome written at Rome under Augustus, independent of Livy in places though drawing on the same annalists. Books 1–10 survive complete, to 443 BCE; everything after that — including the Samnite and Pyrrhic wars — is fragments.",
    covers: [{ fromYear: -753, toYear: -443, note: "surviving complete" }, { fromYear: -442, toYear: -264, note: "fragments only" }],
  },
  {
    id: "plutarch-camillus", kind: "ancient", citation: "Plutarch, Life of Camillus",
    note: "The Veientine war and the Gallic sack, in a life built to make Camillus a second founder of Rome.",
    covers: [{ fromYear: -406, toYear: -365 }],
  },
  {
    id: "plutarch-pyrrhus", kind: "ancient", citation: "Plutarch, Life of Pyrrhus",
    note: "The fullest surviving account of the Pyrrhic War, drawing at second hand on Pyrrhus' own memoirs and on Hieronymus of Cardia. With Livy's books lost, this is the narrative the war rests on.",
    covers: [{ fromYear: -319, toYear: -272 }],
  },
  {
    id: "appian-samnite", kind: "ancient", citation: "Appian, Roman History: The Samnite Wars (fragments)",
    note: "Fragments covering the Samnite and Pyrrhic wars, including the embassy of Cineas and the negotiations Rome refused.",
    covers: [{ fromYear: -343, toYear: -272 }],
  },
  { id: "cornell-1995", kind: "modern", citation: "T. J. Cornell, The Beginnings of Rome (1995)", note: "The standard case for taking a controlled amount of the early tradition seriously." },
  { id: "forsythe-2005", kind: "modern", citation: "Gary Forsythe, A Critical History of Early Rome (2005)", note: "The sceptical counterweight: much of what Livy reports for the fifth century is reconstruction rather than record." },
  { id: "salmon-1967", kind: "modern", citation: "E. T. Salmon, Samnium and the Samnites (1967)" },
  { id: "oakley-1997", kind: "modern", citation: "S. P. Oakley, A Commentary on Livy Books VI–X (1997–2005)" },
  { id: "champion-2009", kind: "modern", citation: "Jeff Champion, Pyrrhus of Epirus (2009)" },

  // ── First Punic War ────────────────────────────────────────────────────────
  {
    id: "polybius-1", kind: "ancient", citation: "Polybius, Histories, Book 1",
    note: "Principal surviving narrative of the First Punic War and the Mercenary War that followed it; composed well after the events and not free from interpretive problems.",
    covers: [
      { fromYear: -288, toYear: -265, note: "the retrospective on the Mamertines at Messana and the Roman garrison at Rhegium" },
      { fromYear: -264, toYear: -237 },
    ],
  },
  {
    id: "diodorus-14", kind: "ancient", citation: "Diodorus Siculus, Library of History, Book 14",
    note: "A Sicilian Greek writing in the first century BCE from earlier Greek historians. His account of the Gallic sack is independent of the Roman annalistic tradition and dates it differently, which is why the year of the Allia has two answers.",
    covers: [{ fromYear: -404, toYear: -387 }],
  },
  { id: "diodorus-23", kind: "ancient", citation: "Diodorus Siculus, Library of History, Book 23 (fragments)", note: "Fragments of an account of the First Punic War independent of Polybius, preserving different figures in places.", covers: [{ fromYear: -264, toYear: -251 }] },
  {
    id: "zonaras-8", kind: "ancient", citation: "Zonaras, Epitome of Histories, Book 8",
    note: "A twelfth-century epitome of Cassius Dio's lost early books. It preserves material found nowhere else — the Pyrrhic War, Sulci — at the cost of being three removes from any eyewitness.",
    covers: [{ fromYear: -280, toYear: -201 }],
  },
  { id: "lazenby-1996", kind: "modern", citation: "J. F. Lazenby, The First Punic War (1996)" },
  { id: "hoyos-2015", kind: "modern", citation: "Dexter Hoyos, Mastering the West: Rome and Carthage at War (2015)" },
  { id: "rankov-2011", kind: "modern", citation: "Boris Rankov, “A War of Phases,” in A Companion to the Punic Wars (2011)" },

  // ── Between the wars, and the Second Punic War ─────────────────────────────
  // Polybius survives complete only to Book 5. From Book 6 on it is fragments,
  // and the fragments are distributed by book — which is why the later battles of
  // this war cite the specific book that preserves them rather than Book 3.
  {
    id: "polybius-2", kind: "ancient", citation: "Polybius, Histories, Book 2",
    note: "The years between the wars: Barcid Iberia, the Illyrian wars, and Rome's Gallic war in the Po valley. It also pauses to recount the Gallic invasion and sack of Rome, which is why it is cited for 390 as well.",
    covers: [
      { fromYear: -390, toYear: -386, note: "the retrospective on the Gallic invasion" },
      { fromYear: -237, toYear: -220 },
    ],
  },
  {
    id: "polybius-3", kind: "ancient", citation: "Polybius, Histories, Book 3",
    note: "The causes of the Second Punic War, the march to Italy, and the campaigns through Cannae — where the book ends. It opens with Hannibal's accession in 221.",
    covers: [{ fromYear: -221, toYear: -216 }],
  },
  { id: "polybius-8", kind: "ancient", citation: "Polybius, Histories, Book 8 (fragments)", note: "Preserves the fullest technical account of the defence of Syracuse and Archimedes' engines.", covers: [{ fromYear: -213, toYear: -211 }] },
  { id: "polybius-9", kind: "ancient", citation: "Polybius, Histories, Book 9 (fragments)", note: "The siege of Capua and Hannibal's march on Rome, with Polybius' own assessment of the strategy.", covers: [{ fromYear: -212, toYear: -211 }] },
  { id: "polybius-10", kind: "ancient", citation: "Polybius, Histories, Book 10 (fragments)", note: "Scipio's capture of New Carthage and the battle at Baecula, including the appraisal of Scipio's character on which much of his reputation rests.", covers: [{ fromYear: -210, toYear: -207 }] },
  { id: "polybius-11", kind: "ancient", citation: "Polybius, Histories, Book 11 (fragments)", note: "The Metaurus and the reversed array at Ilipa — the fullest surviving account of the manoeuvre.", covers: [{ fromYear: -207, toYear: -206 }] },
  { id: "polybius-14", kind: "ancient", citation: "Polybius, Histories, Book 14 (fragments)", note: "The burning of the Carthaginian and Numidian camps and the battle of the Great Plains.", covers: [{ fromYear: -204, toYear: -203 }] },
  { id: "polybius-15", kind: "ancient", citation: "Polybius, Histories, Book 15 (fragments)", note: "Zama and the peace terms, including the deployment of both armies.", covers: [{ fromYear: -202, toYear: -201 }] },
  {
    id: "livy-21-30", kind: "ancient", citation: "Livy, Ab Urbe Condita, Books 21–30 (the third decade)",
    note: "Detailed but later, rhetorically shaped, and consistently pro-Roman. Where it follows Polybius it is useful; where it does not, its figures are often inflated. Book 21 opens with the background from 221.",
    covers: [{ fromYear: -221, toYear: -201 }],
  },
  { id: "appian-hann", kind: "ancient", citation: "Appian, Roman History: The Hannibalic War & The Punic Wars", note: "Later compilation preserving otherwise lost material, and prone to dramatic invention where it does not.", covers: [{ fromYear: -218, toYear: -201 }] },
  { id: "lazenby-1978", kind: "modern", citation: "J. F. Lazenby, Hannibal’s War (1978)" },
  { id: "goldsworthy-2000", kind: "modern", citation: "Adrian Goldsworthy, The Fall of Carthage (2000)" },

  // ── Second Macedonian War ──────────────────────────────────────────────────
  { id: "polybius-18", kind: "ancient", citation: "Polybius, Histories, Book 18", note: "Principal account of Cynoscephalae and the settlement with Macedon, including the comparison of legion and phalanx.", covers: [{ fromYear: -198, toYear: -196 }] },
  { id: "livy-31-33", kind: "ancient", citation: "Livy, Ab Urbe Condita, Books 31–33", note: "The fullest surviving narrative of the Second Macedonian War, largely following Polybius but pro-Roman where it departs from him.", covers: [{ fromYear: -201, toYear: -196 }] },
  { id: "walbank-1940", kind: "modern", citation: "F. W. Walbank, Philip V of Macedon (1940)" },
  { id: "eckstein-2008", kind: "modern", citation: "Arthur M. Eckstein, Rome Enters the Greek East (2008)" },

  // ── The war with Antiochus III, 192–188 BCE ────────────────────────────────
  // The evidence here is better than for any earlier war in the atlas and worse
  // than it looks. Livy's fourth decade is continuous, detailed and largely
  // transcribed from Polybius — but Polybius' own books for these years survive
  // only in excerpts, so where Livy departs from him there is often nothing left
  // to check him against. Magnesia is the sharpest case: the fullest order of
  // battle we have for a Seleucid army comes from a Roman annalistic tradition
  // with every reason to make it enormous.
  {
    id: "polybius-20", kind: "ancient", citation: "Polybius, Histories, Book 20 (fragments)",
    note: "Antiochus' winter at Chalcis, the Aetolian decision that brought him to Greece, and the fighting at Thermopylae. Preserved as excerpts, so it corroborates Livy in places rather than running alongside him.",
    covers: [{ fromYear: -192, toYear: -189 }],
  },
  {
    id: "polybius-21", kind: "ancient", citation: "Polybius, Histories, Book 21 (fragments)",
    note: "The naval war off Ionia, the crossing to Asia, Magnesia, and the terms imposed at Apamea — for which Polybius preserves clauses Livy abbreviates. Excerpts again, and thinnest exactly where the battle narrative would be.",
    covers: [{ fromYear: -190, toYear: -188 }],
  },
  {
    id: "livy-34-37", kind: "ancient", citation: "Livy, Ab Urbe Condita, Books 34–37",
    note: "The war with Nabis, the years of embassies, and then the Antiochene war from Thermopylae to Magnesia. The fullest surviving narrative, following Polybius closely for the campaigns and an annalistic source for the Roman politics — and for the figures.",
    covers: [{ fromYear: -195, toYear: -189 }],
  },
  {
    id: "livy-38", kind: "ancient", citation: "Livy, Ab Urbe Condita, Book 38",
    note: "The Aetolian settlement, Manlius Vulso's march against the Galatians, and the text of the peace of Apamea. The Galatian campaign is reported with unusual candour about plunder as a motive.",
    covers: [{ fromYear: -189, toYear: -187 }],
  },
  {
    id: "appian-syrian", kind: "ancient", citation: "Appian, Roman History: The Syrian War",
    note: "A continuous account of the war independent of Livy in places, and the second witness for the deployment at Magnesia. Later, compressed, and willing to supply a speech where a source gave him none.",
    covers: [{ fromYear: -192, toYear: -188 }],
  },
  {
    id: "plutarch-cato", kind: "ancient", citation: "Plutarch, Life of Cato the Elder",
    note: "The night march over Callidromus that turned the Thermopylae position, told as Cato's own claim about himself — Plutarch is drawing on a tradition in which Cato was his own best witness.",
    covers: [{ fromYear: -234, toYear: -149 }],
  },
  { id: "grainger-2002", kind: "modern", citation: "John D. Grainger, The Roman War of Antiochos the Great (2002)" },
  { id: "bar-kochva-1976", kind: "modern", citation: "Bezalel Bar-Kochva, The Seleucid Army (1976)", note: "The standard reconstruction of how a Seleucid army was actually organised, and the case for cutting the reported totals at Magnesia down." },
];

export function sourcesByIds(ids: string[]): HistoricalSource[] {
  return ids.map((id) => sources.find((source) => source.id === id)).filter((source): source is HistoricalSource => Boolean(source));
}

/** True when the source survives for, and discusses, the given year. */
export function sourceCoversYear(source: HistoricalSource, year: number): boolean {
  if (!source.covers?.length) return true; // modern scholarship is not year-bounded
  return source.covers.some((range) => year >= range.fromYear && year <= range.toYear);
}
