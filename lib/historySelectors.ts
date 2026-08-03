import type { Battle, CampaignRoute } from "@/types/history";

export function battlesForYear(battles: Battle[], year: number): Battle[] {
  return battles.filter((battle) => year >= battle.startYear && year <= battle.endYear);
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
