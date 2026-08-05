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
  { id: "republic", year: -509, label: "The Republic begins", note: "Kings give way to annual magistrates and a citizen army.", mapped: false },
  { id: "first-punic", year: -264, label: "First Punic War", note: "Rome crosses to Sicily and builds a fleet.", mapped: true, focus: { location: [12.4, 37.9], zoom: 4.7 } },
  { id: "cannae", year: -216, label: "Cannae", note: "Hannibal destroys the largest army Rome had ever fielded.", mapped: true, focus: { location: [16.1, 41.3], zoom: 5.4 } },
  { id: "zama", year: -202, label: "Zama", note: "Scipio defeats Hannibal in Africa and ends the war.", mapped: true, focus: { location: [9.55, 36.05], zoom: 5.2 } },
  { id: "cynoscephalae", year: -197, label: "Cynoscephalae", note: "The legion breaks the Macedonian phalanx.", mapped: true, focus: { location: [22.55, 39.42], zoom: 5.4 } },
  { id: "carthage-destroyed", year: -146, label: "Carthage destroyed", note: "Carthage and Corinth are sacked in the same year.", mapped: false },
  { id: "caesar-civil-war", year: -49, label: "Caesar's civil war", note: "The Rubicon, Pharsalus, and the end of the Republic in practice.", mapped: false },
  { id: "augustus", year: -27, label: "Augustus takes power", note: "A standing professional army under one commander.", mapped: false },
  { id: "trajan", year: 117, label: "Greatest extent", note: "The empire at its largest, under Trajan.", mapped: false },
  { id: "crisis", year: 260, label: "Crisis of the Third Century", note: "Invasion and usurpation on every frontier.", mapped: false },
  { id: "adrianople", year: 378, label: "Adrianople", note: "An eastern field army destroyed and an emperor killed.", mapped: false },
  { id: "west-ends", year: 476, label: "End of the western empire", note: "The last western emperor is deposed.", mapped: false },
];
