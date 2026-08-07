import type { Coordinates } from "@/types/history";

export interface TimelineMilestone {
  id: string;
  year: number;
  label: string;
  note: string;
  /** True when the atlas can actually open at this moment. */
  mapped: boolean;
  focus?: { location: Coordinates; zoom: number };
}

// A coarse spine for the whole of Roman military history — deliberately not the
// atlas's year-by-year scrubber. Milestones inside the mapped range open the map;
// the rest are signposts to periods still to come, and say so.
export const timelineMilestones: TimelineMilestone[] = [
  { id: "foundation", year: -753, label: "Foundation of Rome", note: "The traditional date, remembered rather than recorded.", mapped: false },
  { id: "republic", year: -509, label: "The Republic begins", note: "Kings give way to annual magistrates and a citizen army, and the atlas opens here.", mapped: true, focus: { location: [12.9, 41.8], zoom: 6.6 } },
  { id: "veii", year: -396, label: "Veii destroyed", note: "Rome annexes its nearest rival and roughly doubles in size.", mapped: true, focus: { location: [12.5, 42.05], zoom: 6.8 } },
  { id: "allia", year: -390, label: "The Gauls sack Rome", note: "The only time the city fell to a foreign enemy before the fifth century CE.", mapped: true, focus: { location: [12.6, 42.1], zoom: 6.4 } },
  { id: "latin-settlement", year: -338, label: "The settlement of Latium", note: "The Latin League is dissolved and replaced by the alliance system that became Roman Italy.", mapped: true, focus: { location: [13.2, 41.5], zoom: 6.2 } },
  { id: "sentinum", year: -295, label: "Sentinum", note: "The Italian coalition against Rome is broken.", mapped: true, focus: { location: [12.86, 43.42], zoom: 6.0 } },
  { id: "pyrrhus", year: -280, label: "Pyrrhus lands in Italy", note: "Rome meets a Hellenistic army for the first time.", mapped: true, focus: { location: [16.4, 40.3], zoom: 5.8 } },
  { id: "first-punic", year: -264, label: "First Punic War", note: "Rome crosses to Sicily and builds a fleet.", mapped: true, focus: { location: [12.4, 37.9], zoom: 4.7 } },
  { id: "cannae", year: -216, label: "Cannae", note: "Hannibal destroys the largest army Rome had ever fielded.", mapped: true, focus: { location: [16.1, 41.3], zoom: 5.4 } },
  { id: "zama", year: -202, label: "Zama", note: "Scipio defeats Hannibal in Africa and ends the war.", mapped: true, focus: { location: [9.55, 36.05], zoom: 5.2 } },
  { id: "cynoscephalae", year: -197, label: "Cynoscephalae", note: "The legion breaks the Macedonian phalanx.", mapped: true, focus: { location: [22.55, 39.42], zoom: 5.4 } },
  { id: "magnesia", year: -190, label: "Magnesia", note: "Rome campaigns in Asia for the first time, breaks the largest army it had ever faced, and annexes none of it.", mapped: true, focus: { location: [27.43, 38.61], zoom: 5.2 } },
  { id: "pydna", year: -168, label: "Pydna", note: "The phalanx is destroyed for the last time, and the Macedonian kingdom with it.", mapped: true, focus: { location: [22.62, 40.36], zoom: 5.6 } },
  { id: "carthage-destroyed", year: -146, label: "Carthage destroyed", note: "Carthage and Corinth are sacked in the same summer, and Rome takes provinces in Africa and Macedonia.", mapped: true, focus: { location: [10.32, 36.85], zoom: 5.4 } },
  { id: "vercellae", year: -101, label: "Vercellae", note: "Marius destroys the Cimbri with an army enlisted for pay rather than raised by property — and loyal to him.", mapped: true, focus: { location: [8.42, 45.32], zoom: 5.0 } },
  { id: "caesar-civil-war", year: -49, label: "Caesar's civil war", note: "The Rubicon, Pharsalus, and the end of the Republic in practice.", mapped: false },
  { id: "augustus", year: -27, label: "Augustus takes power", note: "A standing professional army under one commander.", mapped: false },
  { id: "trajan", year: 117, label: "Greatest extent", note: "The empire at its largest, under Trajan.", mapped: false },
  { id: "crisis", year: 260, label: "Crisis of the Third Century", note: "Invasion and usurpation on every frontier.", mapped: false },
  { id: "adrianople", year: 378, label: "Adrianople", note: "An eastern field army destroyed and an emperor killed.", mapped: false },
  { id: "west-ends", year: 476, label: "End of the western empire", note: "The last western emperor is deposed.", mapped: false },
];
