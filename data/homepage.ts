// Editorial choices for the homepage, kept as data so the page stays declarative
// and the choices are reviewable in one place.

export interface ExploreOption {
  id: string;
  title: string;
  description: string;
  action: string;
  /** Resolved by the page: an atlas link, an anchor below, or another route. */
  target: { kind: "atlas" } | { kind: "section"; id: string } | { kind: "route"; href: string };
  /** Roman numeral shown instead of a stock icon. */
  numeral: string;
}

export const exploreOptions: ExploreOption[] = [
  {
    id: "atlas",
    title: "Open the Atlas",
    description: "Move through Roman history year by year and watch armies, fleets, campaigns, and battles appear across the map.",
    action: "Open map",
    target: { kind: "atlas" },
    numeral: "I",
  },
  {
    id: "periods",
    title: "Explore by Period",
    description: "Begin with the Republic, the age of civil wars, the Imperial expansion, or the Late Roman world.",
    action: "Browse periods",
    target: { kind: "section", id: "periods" },
    numeral: "II",
  },
  {
    id: "campaigns",
    title: "Explore by Campaign",
    description: "Follow complete wars and military expeditions from their causes to their consequences.",
    action: "Browse campaigns",
    target: { kind: "section", id: "campaigns" },
    numeral: "III",
  },
  {
    id: "battles",
    title: "Explore by Battle",
    description: "Discover land battles, naval engagements, sieges, ambushes, and disputed battlefields.",
    action: "Browse battles",
    target: { kind: "section", id: "battles" },
    numeral: "IV",
  },
  {
    id: "figures",
    title: "Explore by Person",
    description: "The commanders, kings and rebels behind the campaigns — with their dates, the battles they fought, and what the sources cannot settle about them.",
    action: "Browse figures",
    target: { kind: "route", href: "/figures" },
    numeral: "V",
  },
];

// Curated for the battle section: the two decisive naval actions of the first
// war, the catastrophe and the revenge of the second, and the eastern turn.
// Every slug must exist in data/battles.ts — a test enforces it.
export const featuredBattleSlugs = ["mylae", "cape-ecnomus", "cannae", "zama", "cynoscephalae", "aegates"];
