import type { HistoricalSource } from "@/types/history";

export const sources: HistoricalSource[] = [
  { id: "polybius-1", kind: "ancient", citation: "Polybius, Histories, Book 1", note: "Principal surviving narrative; composed well after many events and not free from interpretive problems." },
  { id: "diodorus-23", kind: "ancient", citation: "Diodorus Siculus, Library of History, Book 23 (fragments)" },
  { id: "zonaras-8", kind: "ancient", citation: "Zonaras, Epitome of Histories, Book 8", note: "Late epitome preserving material from earlier authors." },
  { id: "lazenby-1996", kind: "modern", citation: "J. F. Lazenby, The First Punic War (1996)" },
  { id: "hoyos-2015", kind: "modern", citation: "Dexter Hoyos, Mastering the West: Rome and Carthage at War (2015)" },
  { id: "rankov-2011", kind: "modern", citation: "Boris Rankov, “A War of Phases,” in A Companion to the Punic Wars (2011)" },
];

export function sourcesByIds(ids: string[]): HistoricalSource[] {
  return ids.map((id) => sources.find((source) => source.id === id)).filter((source): source is HistoricalSource => Boolean(source));
}
