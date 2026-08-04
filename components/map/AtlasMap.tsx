"use client";
// The atlas map is drawn as inline SVG rather than through a WebGL map library.
// For a schematic historical atlas that is the better fit: no tile service, no
// web worker, no bundler interop for the geometry, every mark styleable, and the
// exact same output can be generated offline (build/preview-territories.mjs) and
// inspected, so the rendering is verifiable instead of hopeful.
import { useMemo, useRef, useState } from "react";
import { territoriesForYear } from "@/data/territories";
import { factionColor, factionAdjective, isContextPower } from "@/data/factions";
import { landPolygons } from "@/data/geo/mediterranean-land";
import { interpolateRoutePosition, isRouteActive, splitRouteAtYear } from "@/lib/routeInterpolation";
import { campaignRoutes } from "@/data/campaigns";
import type { Battle, Coordinates, Era } from "@/types/history";

export type MapLayers = { army: boolean; fleet: boolean; battles: boolean; sieges: boolean; territories: boolean };

// Equirectangular projection onto a fixed virtual canvas. Longitude and latitude
// are linear here, which is the honest choice for a schematic atlas: no
// projection can be neutral, and this one keeps the arithmetic inspectable.
const SCALE = 24; // virtual units per degree
const project = (point: Coordinates | number[]): [number, number] => [point[0] * SCALE, -point[1] * SCALE];
const pathFor = (rings: number[][][]) => rings.map((ring) => `M${ring.map((p) => { const [x, y] = project(p); return `${x.toFixed(1)} ${y.toFixed(1)}`; }).join("L")}Z`).join("");
const polylineFor = (points: number[][]) => points.map((p) => { const [x, y] = project(p); return `${x.toFixed(1)},${y.toFixed(1)}`; }).join(" ");

// Each land polygon keeps its own path so holes (inland seas) render correctly.
const LAND_PATHS = landPolygons.map((rings) => pathFor(rings));

function viewBoxFor(era: Era | undefined, fallbackCenter: Coordinates = [12.2, 38]) {
  const center = era?.mapView.center ?? fallbackCenter;
  const zoom = era?.mapView.zoom ?? 4.4;
  // Degrees visible shrinks as zoom grows, matching the previous map's framing.
  const spanDegrees = 360 / Math.pow(2, zoom);
  const width = spanDegrees * SCALE * 1.6;
  const height = width * 0.62;
  const [cx, cy] = project(center);
  return { x: cx - width / 2, y: cy - height / 2, width, height };
}

interface Props {
  year: number;
  era: Era | undefined;
  layers: MapLayers;
  hiddenFactions: Record<string, boolean>;
  activeBattles: Battle[];
  selectedBattle: Battle | null;
  onSelectBattle: (battle: Battle) => void;
}

export function AtlasMap({ year, era, layers, hiddenFactions, activeBattles, selectedBattle, onSelectBattle }: Props) {
  const [view, setView] = useState(() => viewBoxFor(era));
  const [zoomFactor, setZoomFactor] = useState(1);
  const dragState = useRef<{ x: number; y: number; view: typeof view } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  // Adjusting state while rendering, rather than in an effect, is React's
  // recommended way to react to a changed prop: it avoids a second paint.
  const [lastEraId, setLastEraId] = useState(era?.id);
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);

  // Follow the timeline: when the era changes, frame its theatre.
  if (era?.id !== lastEraId) {
    setLastEraId(era?.id);
    if (!selectedBattle) { setView(viewBoxFor(era)); setZoomFactor(1); }
  }
  // Centre on a newly selected battle without changing the zoom level.
  if (selectedBattle && selectedBattle.id !== lastSelectedId) {
    setLastSelectedId(selectedBattle.id);
    const [cx, cy] = project(selectedBattle.coordinates);
    setView((current) => ({ ...current, x: cx - current.width / 2, y: cy - current.height / 2 }));
  } else if (!selectedBattle && lastSelectedId !== null) {
    setLastSelectedId(null);
  }

  const zones = useMemo(() => {
    if (!layers.territories) return [];
    return territoriesForYear(year)
      .slice()
      .sort((a, b) => Number(isContextPower(b.polity)) - Number(isContextPower(a.polity)));
  }, [year, layers.territories]);

  const routes = useMemo(() => campaignRoutes.filter((route) => !hiddenFactions[route.faction] && layers[route.forceType] && isRouteActive(route, year)), [hiddenFactions, layers, year]);
  const forces = useMemo(() => campaignRoutes.filter((route) => !hiddenFactions[route.faction] && layers[route.forceType]).flatMap((route) => { const position = interpolateRoutePosition(route, year); return position ? [{ route, position }] : []; }), [hiddenFactions, layers, year]);

  function applyZoom(factor: number, originX?: number, originY?: number) {
    setView((current) => {
      const width = Math.min(Math.max(current.width * factor, 60), 4200);
      const height = width * (current.height / current.width);
      const focusX = originX ?? current.x + current.width / 2;
      const focusY = originY ?? current.y + current.height / 2;
      const ratio = width / current.width;
      return { x: focusX - (focusX - current.x) * ratio, y: focusY - (focusY - current.y) * ratio, width, height };
    });
    setZoomFactor((current) => current / factor);
  }

  function clientToVirtual(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return { x: view.x + ((clientX - rect.left) / rect.width) * view.width, y: view.y + ((clientY - rect.top) / rect.height) * view.height };
  }

  const strokeScale = view.width / 1000; // keep line weights visually stable while zooming

  return (
    <div className="atlas-svg-wrap">
      <svg
        ref={svgRef}
        className="atlas-svg"
        viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`}
        role="img"
        aria-label={`Map of the Mediterranean in ${Math.abs(year)} BCE`}
        onPointerDown={(event) => { const point = clientToVirtual(event.clientX, event.clientY); if (!point) return; dragState.current = { x: point.x, y: point.y, view }; (event.target as Element).setPointerCapture?.(event.pointerId); }}
        onPointerMove={(event) => {
          const start = dragState.current; if (!start) return;
          const svg = svgRef.current; if (!svg) return;
          const rect = svg.getBoundingClientRect();
          const dx = ((event.clientX - rect.left) / rect.width) * start.view.width;
          const dy = ((event.clientY - rect.top) / rect.height) * start.view.height;
          setView({ ...start.view, x: start.view.x + (start.x - start.view.x - dx), y: start.view.y + (start.y - start.view.y - dy) });
        }}
        onPointerUp={() => { dragState.current = null; }}
        onPointerLeave={() => { dragState.current = null; }}
        onWheel={(event) => { event.preventDefault(); const point = clientToVirtual(event.clientX, event.clientY); applyZoom(event.deltaY > 0 ? 1.15 : 0.87, point?.x, point?.y); }}
      >
        <rect x={view.x - 10} y={view.y - 10} width={view.width + 20} height={view.height + 20} fill="var(--map-sea, #d7e5e9)" />
        <g className="atlas-land">
          {LAND_PATHS.map((d, index) => <path key={index} d={d} fillRule="evenodd" fill="var(--map-land, #f3eee1)" stroke="var(--map-coast, #b9ae96)" strokeWidth={0.9 * strokeScale} />)}
        </g>
        <g className="atlas-territories">
          {zones.map((zone) => {
            const context = isContextPower(zone.polity);
            const color = factionColor(zone.polity);
            return <path key={zone.id} d={pathFor([[...zone.ring, zone.ring[0]]])} fill={color} fillOpacity={context ? 0.16 : 0.42} stroke={color} strokeOpacity={context ? 0.45 : 0.95} strokeWidth={(context ? 1 : 2) * strokeScale} strokeLinejoin="round" />;
          })}
        </g>
        <g className="atlas-routes">
          {routes.map((route) => {
            const split = splitRouteAtYear(route, year);
            const color = factionColor(route.faction);
            return <g key={route.id}>
              {split.future.length >= 2 && <polyline points={polylineFor(split.future)} fill="none" stroke={color} strokeOpacity={0.32} strokeWidth={2.2 * strokeScale} strokeDasharray={`${3.4 * strokeScale} ${4.8 * strokeScale}`} strokeLinecap="round" />}
              {split.completed.length >= 2 && <polyline points={polylineFor(split.completed)} fill="none" stroke={color} strokeOpacity={0.9} strokeWidth={3.2 * strokeScale} strokeLinejoin="round" strokeLinecap="round" />}
            </g>;
          })}
        </g>
        <g className="atlas-labels" aria-hidden="true">
          {zones.filter((zone) => zone.labelAt).map((zone) => {
            const [x, y] = project(zone.labelAt as Coordinates);
            const context = isContextPower(zone.polity);
            return <text key={`${zone.id}-label`} x={x} y={y} fill={factionColor(zone.polity)} fillOpacity={context ? 0.7 : 1} fontSize={9 * strokeScale} fontWeight={700} letterSpacing={1.1 * strokeScale} textAnchor="middle" paintOrder="stroke" stroke="var(--map-label-halo, #f8f5ed)" strokeWidth={3 * strokeScale}>{zone.name.toUpperCase()}</text>;
          })}
        </g>
        <g className="atlas-forces">
          {forces.map(({ route, position }) => {
            const [x, y] = project(position);
            const color = factionColor(route.faction);
            const size = 7 * strokeScale;
            return <g key={route.id} aria-label={`${factionAdjective(route.faction)} ${route.forceType}: ${route.name}`}>
              <title>{`${route.name} — ${route.certainty} reconstruction`}</title>
              {route.forceType === "army"
                ? <polygon points={`${x},${y - size} ${x + size},${y + size * 0.8} ${x - size},${y + size * 0.8}`} fill={color} stroke="var(--map-marker-edge, #fff8e9)" strokeWidth={1.4 * strokeScale} />
                : <rect x={x - size * 0.8} y={y - size * 0.8} width={size * 1.6} height={size * 1.6} transform={`rotate(45 ${x} ${y})`} fill={color} stroke="var(--map-marker-edge, #fff8e9)" strokeWidth={1.4 * strokeScale} />}
            </g>;
          })}
        </g>
        <g className="atlas-battles">
          {activeBattles.map((battle) => {
            const [x, y] = project(battle.coordinates);
            const selected = selectedBattle?.id === battle.id;
            const radius = (battle.major ? 11 : 8.5) * strokeScale;
            const symbol = battle.kind === "naval" ? "≋" : battle.kind === "siege" ? "◎" : battle.kind === "campaign" ? "↟" : "⚔";
            return <g
              key={battle.id}
              className="atlas-battle-marker"
              role="button"
              tabIndex={0}
              aria-label={`${battle.name}, ${battle.displayDate}. Open summary.`}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => onSelectBattle(battle)}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelectBattle(battle); } }}
            >
              <title>{`${battle.name} · ${battle.displayDate}`}</title>
              <circle cx={x} cy={y} r={radius} fill={battle.kind === "naval" ? "#1f6470" : battle.kind === "siege" ? "#806036" : battle.kind === "campaign" ? "#6b5940" : "#2c312d"} stroke={selected ? "#c47f33" : "var(--map-marker-edge, #fff8e9)"} strokeWidth={(selected ? 3 : 1.8) * strokeScale} />
              <text x={x} y={y + radius * 0.34} fill="#f5ead0" fontSize={radius * 0.95} textAnchor="middle" style={{ pointerEvents: "none", userSelect: "none" }}>{symbol}</text>
            </g>;
          })}
        </g>
      </svg>
      <div className="atlas-zoom" role="group" aria-label="Zoom">
        <button type="button" onClick={() => applyZoom(0.8)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => applyZoom(1.25)} aria-label="Zoom out">−</button>
        <button type="button" onClick={() => { setView(viewBoxFor(era)); setZoomFactor(1); }} aria-label="Reset view">⌖</button>
      </div>
      <span className="atlas-scale-note">{zoomFactor.toFixed(1)}× · land: Natural Earth (public domain)</span>
    </div>
  );
}
