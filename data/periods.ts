import type { Coordinates } from "@/types/history";

export type CoverageStatus = "available" | "partial" | "development" | "planned";

export interface HistoricalPeriod {
  id: string;
  name: string;
  /** Two or three words, for compact selectors. */
  shortName: string;
  startYear: number;
  endYear: number;
  /** One sentence: what this period is about militarily. */
  description: string;
  /** The year the atlas opens at for this period. */
  representativeYear: number;
  status: CoverageStatus;
  /** Where the atlas should look, when the period has mapped content. */
  focus?: { location: Coordinates; zoom: number };
}

// The full arc of Roman warfare. Coverage is stated honestly: only the middle
// Republic is mapped today, and the later periods say so rather than implying
// depth the atlas does not have. Years are negative for BCE.
export const periods: HistoricalPeriod[] = [
  {
    id: "early-rome",
    name: "Early Rome and the conquest of Italy", shortName: "Early Rome",
    startYear: -509,
    endYear: -265,
    description: "A city among neighbours becomes the master of the peninsula, through Latin, Etruscan, Samnite, and Pyrrhic wars.",
    representativeYear: -280,
    status: "available",
    focus: { location: [13.6, 41.6], zoom: 5.8 },
  },
  {
    id: "middle-republic",
    name: "Middle Republic and the Punic Wars", shortName: "Republic",
    startYear: -264,
    endYear: -146,
    description: "Rome confronts Carthage for the western Mediterranean, then turns east against the Hellenistic kingdoms.",
    representativeYear: -264,
    status: "available",
    focus: { location: [12.4, 37.9], zoom: 4.7 },
  },
  {
    id: "late-republic",
    name: "Late Republic and the civil wars", shortName: "Civil Wars",
    startYear: -145,
    endYear: -31,
    description: "Conquest abroad and armies loyal to their commanders at home, from Numidia and Gaul to Pharsalus and Actium.",
    // Mapped from 145 to the Ides of March. What remains of this period is the
    // fourteen years after Caesar's death — the second triumvirate, Philippi and
    // Actium — which is a different constitution and a different atlas problem, so
    // this stays `partial`.
    representativeYear: -52,
    status: "partial",
    focus: { location: [3.5, 47.0], zoom: 4.6 },
  },
  {
    id: "augustan",
    name: "Augustan and Julio-Claudian age", shortName: "Early Empire",
    startYear: -30,
    endYear: 68,
    description: "The frontier settles on the Rhine and Danube, Germany is lost at the Teutoburg, and Britain is invaded.",
    representativeYear: -9,
    status: "planned",
  },
  {
    id: "high-empire",
    name: "High Roman Empire", shortName: "High Empire",
    startYear: 69,
    endYear: 192,
    description: "The empire reaches its greatest extent under Trajan, then holds the line through the Marcomannic wars.",
    representativeYear: 105,
    status: "planned",
  },
  {
    id: "third-century",
    name: "Crisis of the Third Century", shortName: "Third Century",
    startYear: 193,
    endYear: 284,
    description: "Invasion, usurpation, and near collapse, followed by a hard military recovery.",
    representativeYear: 260,
    status: "planned",
  },
  {
    id: "late-empire",
    name: "Late Roman Empire", shortName: "Late Empire",
    startYear: 285,
    endYear: 476,
    description: "Civil wars of the Tetrarchy, the Gothic wars, Adrianople, and the end of imperial authority in the west.",
    representativeYear: 378,
    status: "planned",
  },
];

export function getPeriod(id: string): HistoricalPeriod | undefined {
  return periods.find((period) => period.id === id);
}

/** Inclusive year range as a display string, e.g. "264–146 BCE" or "69–192 CE". */
export function formatYearRange(startYear: number, endYear: number): string {
  const era = (year: number) => (year < 0 ? "BCE" : "CE");
  const abs = (year: number) => Math.abs(year);
  if (era(startYear) === era(endYear)) return `${abs(startYear)}–${abs(endYear)} ${era(endYear)}`;
  return `${abs(startYear)} BCE – ${abs(endYear)} CE`;
}
