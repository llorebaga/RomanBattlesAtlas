import type { Battle, CampaignRoute, HistoricalEvent } from "@/types/history";

export function battlesForYear(battles: Battle[], year: number): Battle[] {
  return battles.filter((battle) => year >= battle.startYear && year <= battle.endYear);
}

export function eventCoversYear(event: HistoricalEvent, year: number): boolean {
  return year >= event.year && year <= (event.toYear ?? event.year);
}

/**
 * The entry the year-in-focus panel shows. An event for the single year always wins
 * over a phase that merely contains it, so authoring a specific year inside a span
 * — the battle in the middle of a long war — narrows the panel rather than
 * colliding with it.
 */
export function eventForYear(events: HistoricalEvent[], year: number): HistoricalEvent | undefined {
  return events.find((event) => event.year === year && event.toYear === undefined)
    ?? events.find((event) => eventCoversYear(event, year));
}

/** Inclusive span of years an event stands for, for display and for coverage checks. */
export function eventYears(event: HistoricalEvent): number[] {
  const years: number[] = [];
  for (let year = event.year; year <= (event.toYear ?? event.year); year += 1) years.push(year);
  return years;
}

export function activeCampaigns(routes: CampaignRoute[], year: number): CampaignRoute[] {
  return routes.filter((route) => year >= route.startYear && year <= route.endYear);
}

export function validateHistoricalData(battles: Battle[], routes: CampaignRoute[]): string[] {
  const issues: string[] = [];
  const slugs = new Set<string>();
  for (const battle of battles) {
    if (slugs.has(battle.slug)) issues.push(`Duplicate battle slug: ${battle.slug}`);
    slugs.add(battle.slug);
    if (battle.startYear > battle.endYear) issues.push(`${battle.name}: startYear follows endYear`);
    if (battle.uncertainty.radiusKm < 0) issues.push(`${battle.name}: invalid uncertainty radius`);
  }
  for (const route of routes) {
    if (route.points.length < 2) issues.push(`${route.name}: routes require at least two points`);
    if (route.startYear > route.endYear) issues.push(`${route.name}: startYear follows endYear`);
    for (let i = 1; i < route.points.length; i += 1) {
      if (route.points[i].year < route.points[i - 1].year) issues.push(`${route.name}: points are not chronological`);
    }
  }
  return issues;
}
