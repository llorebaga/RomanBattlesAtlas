import type { CampaignRoute, Coordinates } from "@/types/history";

function pointTime(year: number, month = 1): number {
  return year + (month - 1) / 12;
}

export function isRouteActive(route: CampaignRoute, year: number): boolean {
  return year >= route.startYear && year <= route.endYear;
}

export function interpolateRoutePosition(route: CampaignRoute, year: number): Coordinates | null {
  if (!isRouteActive(route, year) || route.points.length === 0) return null;
  const points = [...route.points].sort((a, b) => pointTime(a.year, a.month) - pointTime(b.year, b.month));
  if (year <= pointTime(points[0].year, points[0].month)) return points[0].coordinates;
  const last = points.at(-1)!;
  if (year >= pointTime(last.year, last.month)) return last.coordinates;

  for (let index = 0; index < points.length - 1; index += 1) {
    const start = points[index];
    const end = points[index + 1];
    const startTime = pointTime(start.year, start.month);
    const endTime = pointTime(end.year, end.month);
    if (year >= startTime && year <= endTime) {
      const ratio = (year - startTime) / (endTime - startTime || 1);
      return [
        start.coordinates[0] + (end.coordinates[0] - start.coordinates[0]) * ratio,
        start.coordinates[1] + (end.coordinates[1] - start.coordinates[1]) * ratio,
      ];
    }
  }
  return null;
}

export function splitRouteAtYear(route: CampaignRoute, year: number): {
  completed: Coordinates[];
  future: Coordinates[];
} {
  const points = [...route.points].sort((a, b) => pointTime(a.year, a.month) - pointTime(b.year, b.month));
  const position = interpolateRoutePosition(route, year);
  if (!position) return { completed: [], future: [] };
  const completed = points.filter((point) => pointTime(point.year, point.month) <= year).map((point) => point.coordinates);
  const future = points.filter((point) => pointTime(point.year, point.month) > year).map((point) => point.coordinates);
  if (completed.length === 0 || completed.at(-1)![0] !== position[0] || completed.at(-1)![1] !== position[1]) completed.push(position);
  if (future.length === 0 || future[0][0] !== position[0] || future[0][1] !== position[1]) future.unshift(position);
  return { completed, future };
}
