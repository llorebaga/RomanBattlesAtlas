export const WAR_START_YEAR = -264;
export const WAR_END_YEAR = -241;

export function formatHistoricalYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year > 0) return `${year} CE`;
  return "1 BCE / 1 CE";
}

export function clampTimelineYear(year: number): number {
  return Math.min(WAR_END_YEAR, Math.max(WAR_START_YEAR, Math.round(year)));
}

export function yearProgress(year: number): number {
  return (clampTimelineYear(year) - WAR_START_YEAR) / (WAR_END_YEAR - WAR_START_YEAR);
}
