// The scrubber spans the full sequence of eras defined in data/wars.ts.
// These bounds are kept as literals so this module stays free of runtime
// imports (the type-stripping test runner cannot resolve the "@/" alias in a
// value import). data/wars.ts derives the same values from the era list, and
// tests/history.test.mjs asserts the two stay in sync — update both together
// when adding an era outside 509–44 BCE.
export const TIMELINE_START_YEAR = -509;
export const TIMELINE_END_YEAR = -44;

// Retained aliases so existing imports keep working.
export const WAR_START_YEAR = TIMELINE_START_YEAR;
export const WAR_END_YEAR = TIMELINE_END_YEAR;

export function formatHistoricalYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year > 0) return `${year} CE`;
  return "1 BCE / 1 CE";
}

export function clampTimelineYear(year: number): number {
  return Math.min(TIMELINE_END_YEAR, Math.max(TIMELINE_START_YEAR, Math.round(year)));
}

export function yearProgress(year: number): number {
  return (clampTimelineYear(year) - TIMELINE_START_YEAR) / (TIMELINE_END_YEAR - TIMELINE_START_YEAR);
}
