import { landPolygons } from "@/data/geo/mediterranean-land";
import { projectPoint, smoothOpenPath } from "@/lib/mapGeometry";
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

export interface HomeMapRoute {
  id: string;
  points: Coordinates[];
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
            <path
              key={route.id}
              d={smoothOpenPath(route.points)}
              fill="none"
              stroke={route.color}
              strokeWidth={2.4 * scale}
              strokeLinecap="round"
              strokeDasharray={`${3 * scale} ${4 * scale}`}
              style={animate ? { animationDelay: `${0.3 + index * 0.45}s` } : undefined}
            />
          ))}
        </g>
      )}
      {points.length > 0 && (
        <g className="hp-map-points">
          {points.map((point, index) => {
            const [x, y] = projectPoint(point.coordinates);
            const radius = (point.kind === "campaign" ? 4.6 : 5.4) * scale;
            return (
              <g key={point.id} style={animate ? { animationDelay: `${0.5 + (point.order ?? index) * 0.22}s` } : undefined}>
                <circle cx={x} cy={y} r={radius * 2.1} fill="var(--hp-mark)" opacity={0.16} />
                <circle cx={x} cy={y} r={radius} fill="var(--hp-mark)" stroke="var(--hp-parchment)" strokeWidth={1.1 * scale} />
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}
