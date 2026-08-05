import { landPolygons } from "@/data/geo/mediterranean-land";
import { projectPoint, sampleOpenCurve } from "@/lib/mapGeometry";
import type { Coordinates } from "@/types/history";

// A still, lightweight atlas composition for the homepage: the same bundled
// coastline and projection the real map uses, so there is no second geography to
// maintain and no new image asset to download. It renders on the server, so the
// homepage shows a map before any JavaScript arrives.

export interface HomeMapPoint {
  id: string;
  coordinates: Coordinates;
  label?: string;
  kind?: "land" | "naval" | "siege" | "campaign";
  /** Order of appearance for the staggered fade-in. */
  order?: number;
}

export interface HomeMapRoutePoint {
  coordinates: Coordinates;
  /** True when the leg arriving here was made by ship, as in the atlas itself. */
  viaSea?: boolean;
}

export interface HomeMapRoute {
  id: string;
  points: HomeMapRoutePoint[];
  color: string;
}

interface Props {
  /** Window in degrees. */
  bounds?: { west: number; east: number; south: number; north: number };
  points?: HomeMapPoint[];
  routes?: HomeMapRoute[];
  /** Fades the marks in one after another. Suppressed under reduced motion. */
  animate?: boolean;
  className?: string;
  title: string;
}

const DEFAULT_BOUNDS = { west: -10, east: 30, south: 29, north: 48 };
const ringPath = (rings: number[][][]) =>
  rings.map((ring) => `M${ring.map((point) => { const [x, y] = projectPoint(point); return `${x.toFixed(1)} ${y.toFixed(1)}`; }).join("L")}Z`).join("");
const LAND = landPolygons.map((rings) => ringPath(rings));

// Splits a route into runs of consecutive samples that share a mode of travel, so a
// crossing by ship can be drawn as a ship's track and a march as a march. The
// homepage would otherwise draw Scipio sailing to Africa with the same line it uses
// for Hannibal walking over the Alps, which the atlas is at pains not to do.
function routeRuns(points: HomeMapRoutePoint[]) {
  const samples = sampleOpenCurve(points.map((point) => point.coordinates), 14);
  const runs: { points: Coordinates[]; sea: boolean }[] = [];
  for (const { point, leg } of samples) {
    const sea = Boolean(points[leg + 1]?.viaSea);
    const last = runs[runs.length - 1];
    if (last && last.sea === sea) last.points.push(point as Coordinates);
    // Repeat the joining sample so the runs meet rather than leaving a gap.
    else runs.push({ points: last ? [last.points[last.points.length - 1], point as Coordinates] : [point as Coordinates], sea });
  }
  return runs.filter((run) => run.points.length >= 2);
}

export function HomeMap({ bounds = DEFAULT_BOUNDS, points = [], routes = [], animate = false, className, title }: Props) {
  const view = {
    x: bounds.west * 24,
    y: -bounds.north * 24,
    width: (bounds.east - bounds.west) * 24,
    height: (bounds.north - bounds.south) * 24,
  };
  const scale = view.width / 1000; // keeps strokes and marks stable at any window

  return (
    <svg
      className={`hp-map ${animate ? "hp-map-animate" : ""} ${className ?? ""}`}
      viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`}
      role="img"
      aria-label={title}
    >
      <rect x={view.x} y={view.y} width={view.width} height={view.height} fill="var(--hp-sea)" />
      <g className="hp-map-land">
        {LAND.map((d, index) => (
          <path key={index} d={d} fillRule="evenodd" fill="var(--hp-land)" stroke="var(--hp-coast)" strokeWidth={0.7 * scale} />
        ))}
      </g>
      {routes.length > 0 && (
        <g className="hp-map-routes">
          {routes.map((route, index) => (
            <g key={route.id} style={animate ? { animationDelay: `${0.3 + index * 0.45}s` } : undefined}>
              {routeRuns(route.points).map((run, runIndex) => {
                const d = `M${run.points.map((point) => { const [x, y] = projectPoint(point); return `${x.toFixed(1)} ${y.toFixed(1)}`; }).join("L")}`;
                return (
                  <path
                    key={runIndex}
                    d={d}
                    fill="none"
                    stroke={route.color}
                    strokeOpacity={run.sea ? 0.72 : 0.95}
                    strokeWidth={(run.sea ? 1.7 : 2.4) * scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    // A march is a nearly solid line so it visibly joins the places it
                    // links; a sea crossing is a fine dotted track, as on the atlas.
                    strokeDasharray={run.sea ? `${0.8 * scale} ${2.6 * scale}` : `${7 * scale} ${3 * scale}`}
                  />
                );
              })}
            </g>
          ))}
        </g>
      )}
      {points.length > 0 && (
        <g className="hp-map-points">
          {/* One opacity for the whole field of haloes rather than one each: where marks
              crowd together — Sicily and the bay of Tunis in particular — per-mark
              opacity compounded into a dark smudge belonging to no single battle. The
              territory layers on the real map are painted the same way, for the same
              reason. */}
          <g className="hp-map-haloes" opacity={0.17}>
            {points.map((point) => {
              const [x, y] = projectPoint(point.coordinates);
              const radius = (point.kind === "campaign" ? 4.6 : 5.4) * scale;
              return <circle key={point.id} cx={x} cy={y} r={radius * 2.1} fill="var(--hp-mark)" />;
            })}
          </g>
          {points.map((point, index) => {
            const [x, y] = projectPoint(point.coordinates);
            const radius = (point.kind === "campaign" ? 4.6 : 5.4) * scale;
            const keyline = 1.1 * scale;
            const style = animate ? { animationDelay: `${0.5 + (point.order ?? index) * 0.22}s` } : undefined;
            // The mark says what kind of action it was, which is why some of them sit
            // out at sea. A ring reads as a fleet action, a square as a walled place.
            if (point.kind === "naval") {
              return (
                <g key={point.id} style={style}>
                  <circle cx={x} cy={y} r={radius} fill="var(--hp-parchment)" stroke="var(--hp-mark)" strokeWidth={radius * 0.62} />
                </g>
              );
            }
            if (point.kind === "siege") {
              const side = radius * 1.72;
              return (
                <g key={point.id} style={style}>
                  <rect
                    x={x - side / 2}
                    y={y - side / 2}
                    width={side}
                    height={side}
                    fill="var(--hp-mark)"
                    stroke="var(--hp-parchment)"
                    strokeWidth={keyline}
                  />
                </g>
              );
            }
            return (
              <g key={point.id} style={style}>
                <circle cx={x} cy={y} r={radius} fill="var(--hp-mark)" stroke="var(--hp-parchment)" strokeWidth={keyline} />
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}
