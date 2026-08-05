import type { Coordinates } from "@/types/history";
import type { CoverageStatus } from "./periods";

export interface CampaignEntry {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  /** Two sentences at most: what the war was and how it turned. */
  description: string;
  region: string;
  status: CoverageStatus;
  periodId: string;
  /** Present only when the atlas has this war's data — see lib/coverage.ts. */
  eraId?: string;
  /** A battle slug that stands for the campaign, when one is mapped. */
  representativeBattle?: string;
  /** A commander readers will recognise, for cards that have no battle yet. */
  representativeCommander?: string;
  focus?: { location: Coordinates; zoom: number };
}

// The campaign shelf. Entries with an eraId are backed by real data in
// data/wars.ts and data/battles.ts and are clickable; the rest are declared
// planned and deliberately carry no atlas link, so nothing leads nowhere.
export const campaignIndex: CampaignEntry[] = [
  {
    id: "first-punic-war",
    name: "First Punic War",
    startYear: -264,
    endYear: -241,
    description: "Rome's first war outside Italy, fought for Sicily and decided at sea. Rome built a navy from nothing and outlasted Carthage.",
    region: "Sicily, Sardinia, North Africa",
    status: "available",
    periodId: "middle-republic",
    eraId: "first-punic",
    representativeBattle: "mylae",
    representativeCommander: "Gaius Duilius",
    focus: { location: [12.4, 37.9], zoom: 4.7 },
  },
  {
    id: "second-punic-war",
    name: "Second Punic War",
    startYear: -218,
    endYear: -201,
    description: "Hannibal carried the war over the Alps into Italy and won at Cannae. Rome survived, took Iberia, and beat him at Zama.",
    region: "Iberia, Italy, North Africa",
    status: "available",
    periodId: "middle-republic",
    eraId: "second-punic",
    representativeBattle: "cannae",
    representativeCommander: "Hannibal",
    focus: { location: [6.5, 41], zoom: 3.9 },
  },
  {
    id: "second-macedonian-war",
    name: "Second Macedonian War",
    startYear: -200,
    endYear: -196,
    description: "Rome turned east against Philip V. The legion broke the phalanx at Cynoscephalae and Rome declared the Greeks free.",
    region: "Illyria, Thessaly, the Aegean",
    status: "partial",
    periodId: "middle-republic",
    eraId: "macedonian-second",
    representativeBattle: "cynoscephalae",
    representativeCommander: "Titus Quinctius Flamininus",
    focus: { location: [21, 39.6], zoom: 5.1 },
  },
  {
    id: "third-macedonian-war",
    name: "Third Macedonian War",
    startYear: -171,
    endYear: -168,
    description: "The last Antigonid war, ended at Pydna. Macedon was dismantled into republics and later annexed.",
    region: "Macedonia and Thessaly",
    status: "planned",
    periodId: "middle-republic",
    representativeCommander: "Lucius Aemilius Paullus",
  },
  {
    id: "third-punic-war",
    name: "Third Punic War",
    startYear: -149,
    endYear: -146,
    description: "A siege rather than a campaign. Carthage was stormed, destroyed, and its territory made a province.",
    region: "North Africa",
    status: "planned",
    periodId: "middle-republic",
    representativeCommander: "Scipio Aemilianus",
  },
  {
    id: "gallic-wars",
    name: "Gallic Wars",
    startYear: -58,
    endYear: -50,
    description: "Caesar's conquest of Gaul, from the Helvetii to the siege of Alesia, and the army that would march on Rome.",
    region: "Gaul, Germania, Britain",
    status: "planned",
    periodId: "late-republic",
    representativeCommander: "Julius Caesar",
  },
  {
    id: "caesars-civil-war",
    name: "Caesar's Civil War",
    startYear: -49,
    endYear: -45,
    description: "Legion against legion across the empire, from the Rubicon to Pharsalus, Alexandria, and Munda.",
    region: "Italy, Greece, Egypt, Africa, Iberia",
    status: "planned",
    periodId: "late-republic",
    representativeCommander: "Julius Caesar",
  },
  {
    id: "conquest-of-britain",
    name: "Conquest of Britain",
    startYear: 43,
    endYear: 84,
    description: "Invasion under Claudius, the Boudican revolt, and the long push north to the Caledonian highlands.",
    region: "Britain",
    status: "planned",
    periodId: "augustan",
    representativeCommander: "Agricola",
  },
  {
    id: "dacian-wars",
    name: "Trajan's Dacian Wars",
    startYear: 101,
    endYear: 106,
    description: "Two campaigns across the Danube against Decebalus, ending in the annexation of Dacia.",
    region: "Danube and Dacia",
    status: "planned",
    periodId: "high-empire",
    representativeCommander: "Trajan",
  },
  {
    id: "marcomannic-wars",
    name: "Marcomannic Wars",
    startYear: 166,
    endYear: 180,
    description: "A generation of fighting on the middle Danube against Germanic and Sarmatian peoples pressing the frontier.",
    region: "Danube frontier",
    status: "planned",
    periodId: "high-empire",
    representativeCommander: "Marcus Aurelius",
  },
  {
    id: "constantine-civil-wars",
    name: "Constantine's Civil Wars",
    startYear: 306,
    endYear: 324,
    description: "The wars that ended the Tetrarchy, from the Milvian Bridge to Chrysopolis and a single ruler again.",
    region: "Italy, the Balkans, the Bosporus",
    status: "planned",
    periodId: "late-empire",
    representativeCommander: "Constantine",
  },
  {
    id: "gothic-wars",
    name: "Gothic Wars and Adrianople",
    startYear: 376,
    endYear: 382,
    description: "Gothic groups crossed the Danube and destroyed an eastern field army at Adrianople, killing the emperor Valens.",
    region: "Thrace and the lower Danube",
    status: "planned",
    periodId: "late-empire",
    representativeCommander: "Fritigern",
  },
];

export function getCampaign(id: string): CampaignEntry | undefined {
  return campaignIndex.find((campaign) => campaign.id === id);
}

/** The campaign the homepage features as its most developed. */
export const FEATURED_CAMPAIGN_ID = "first-punic-war";
