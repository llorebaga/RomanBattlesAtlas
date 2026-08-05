import type { HistoricalSource } from "@/types/history";

export const sources: HistoricalSource[] = [
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
