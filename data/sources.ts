import type { HistoricalSource } from "@/types/history";

export const sources: HistoricalSource[] = [
  // ── Early Rome ─────────────────────────────────────────────────────────────
  // Everything here was written four to five centuries after the events, from
  // annalistic material that had already been shaped by the families whose
  // ancestors appear in it. The modern works are cited alongside because for this
  // period the scholarship on how far the tradition can be trusted is not optional
  // background — it is the evidence.
  { id: "livy-1-5", kind: "ancient", citation: "Livy, Ab Urbe Condita, Books 1–5", note: "The foundation to the Gallic sack. The fullest narrative that survives and the least reliable part of Livy: he is working from annalists who themselves had little to work from, and he says so." },
  { id: "livy-6-10", kind: "ancient", citation: "Livy, Ab Urbe Condita, Books 6–10", note: "390 to 293 BCE, covering the Latin and Samnite wars. Better founded than the first pentad, but the battle narratives are still built on the assumption that early Rome fought the way late Rome did." },
  { id: "dionysius-hal", kind: "ancient", citation: "Dionysius of Halicarnassus, Roman Antiquities", note: "A Greek history of early Rome written at Rome under Augustus. Independent of Livy in places, though drawing on the same annalistic tradition." },
  { id: "polybius-2", kind: "ancient", citation: "Polybius, Histories, Book 2", note: "Preserves the Gallic wars in Italy and the texts of the early treaties between Rome and Carthage." },
  { id: "plutarch-pyrrhus", kind: "ancient", citation: "Plutarch, Life of Pyrrhus", note: "The fullest surviving account of the Pyrrhic War, drawing at second hand on Pyrrhus' own memoirs and on Hieronymus of Cardia." },
  { id: "plutarch-camillus", kind: "ancient", citation: "Plutarch, Life of Camillus", note: "The Veientine war and the Gallic sack, in a life built to make Camillus a second founder of Rome." },
  { id: "cornell-1995", kind: "modern", citation: "T. J. Cornell, The Beginnings of Rome (1995)", note: "The standard case for taking a controlled amount of the early tradition seriously." },
  { id: "forsythe-2005", kind: "modern", citation: "Gary Forsythe, A Critical History of Early Rome (2005)", note: "The sceptical counterweight: much of what Livy reports for the fifth century is reconstruction rather than record." },
  { id: "salmon-1967", kind: "modern", citation: "E. T. Salmon, Samnium and the Samnites (1967)" },
  { id: "oakley-1997", kind: "modern", citation: "S. P. Oakley, A Commentary on Livy Books VI–X (1997–2005)" },
  { id: "champion-2009", kind: "modern", citation: "Jeff Champion, Pyrrhus of Epirus (2009)" },

  { id: "polybius-1", kind: "ancient", citation: "Polybius, Histories, Book 1", note: "Principal surviving narrative; composed well after many events and not free from interpretive problems." },
  { id: "diodorus-23", kind: "ancient", citation: "Diodorus Siculus, Library of History, Book 23 (fragments)" },
  { id: "zonaras-8", kind: "ancient", citation: "Zonaras, Epitome of Histories, Book 8", note: "Late epitome preserving material from earlier authors." },
  { id: "lazenby-1996", kind: "modern", citation: "J. F. Lazenby, The First Punic War (1996)" },
  { id: "hoyos-2015", kind: "modern", citation: "Dexter Hoyos, Mastering the West: Rome and Carthage at War (2015)" },
  { id: "rankov-2011", kind: "modern", citation: "Boris Rankov, “A War of Phases,” in A Companion to the Punic Wars (2011)" },
  { id: "polybius-3", kind: "ancient", citation: "Polybius, Histories, Book 3", note: "Principal surviving narrative of the Second Punic War through Cannae." },
  { id: "livy-21-30", kind: "ancient", citation: "Livy, Ab Urbe Condita, Books 21–30 (the third decade)", note: "Detailed but later, rhetorically shaped, and consistently pro-Roman." },
  { id: "polybius-8", kind: "ancient", citation: "Polybius, Histories, Book 8 (fragments)", note: "Preserves the fullest technical account of the defence of Syracuse and Archimedes’ engines." },
  { id: "appian-hann", kind: "ancient", citation: "Appian, Roman History: The Hannibalic War & The Punic Wars", note: "Later compilation preserving otherwise lost material." },
  { id: "lazenby-1978", kind: "modern", citation: "J. F. Lazenby, Hannibal’s War (1978)" },
  { id: "goldsworthy-2000", kind: "modern", citation: "Adrian Goldsworthy, The Fall of Carthage (2000)" },
  { id: "polybius-18", kind: "ancient", citation: "Polybius, Histories, Book 18", note: "Principal account of Cynoscephalae and the settlement with Macedon." },
  { id: "livy-31-33", kind: "ancient", citation: "Livy, Ab Urbe Condita, Books 31–33", note: "The fullest surviving narrative of the Second Macedonian War; pro-Roman." },
  { id: "walbank-1940", kind: "modern", citation: "F. W. Walbank, Philip V of Macedon (1940)" },
  { id: "eckstein-2008", kind: "modern", citation: "Arthur M. Eckstein, Rome Enters the Greek East (2008)" },
];

export function sourcesByIds(ids: string[]): HistoricalSource[] {
  return ids.map((id) => sources.find((source) => source.id === id)).filter((source): source is HistoricalSource => Boolean(source));
}
