"use client";
// The atlas map is drawn as inline SVG rather than through a WebGL map library.
// For a schematic historical atlas that is the better fit: no tile service, no
// web worker, no bundler interop for the geometry, every mark styleable, and the
// exact same output can be generated offline (build/preview-territories.mjs) and
// inspected, so the rendering is verifiable instead of hopeful.
import { useEffect, useMemo, useRef, useState } from "react";
import { territoriesForYear } from "@/data/territories";
import { factionColor, factionAdjective, isContextPower } from "@/data/factions";
import { landPolygons } from "@/data/geo/mediterranean-land";
import { interpolateRoutePosition, isRouteActive, splitRouteAtYear } from "@/lib/routeInterpolation";
import { MAP_SCALE as SCALE, projectPoint, smoothClosedPath } from "@/lib/mapGeometry";
import { campaignRoutes } from "@/data/campaigns";
import type { Battle, Coordinates, Era } from "@/types/history";

export type MapLayers = { army: boolean; fleet: boolean; battles: boolean; sieges: boolean; territories: boolean };

const project = (point: Coordinates | number[]): [number, number] => projectPoint(point);
const pathFor = (rings: number[][][]) => rings.map((ring) => `M${ring.map((p) => { const [x, y] = project(p); return `${x.toFixed(1)} ${y.toFixed(1)}`; }).join("L")}Z`).join("");
const polylineFor = (points: number[][]) => points.map((p) => { const [x, y] = project(p); return `${x.toFixed(1)},${y.toFixed(1)}`; }).join(" ");
const MIN_VIEW_WIDTH = 90;
const MAX_VIEW_WIDTH = 3000;
const clampWidth = (width: number) => Math.min(Math.max(width, MIN_VIEW_WIDTH), MAX_VIEW_WIDTH);

// Each land polygon keeps its own path so holes (inland seas) render correctly.
const LAND_PATHS = landPolygons.map((rings) => pathFor(rings));

function viewBoxFor(era: Era | undefined, fallbackCenter: Coordinates = [12.2, 38]) {
  const center = era?.mapView.center ?? fallbackCenter;
  const zoom = era?.mapView.zoom ?? 4.4;
  // Degrees visible shrinks as zoom grows, matching the previous map's framing.
  const spanDegrees = 360 / Math.pow(2, zoom);
  const width = clampWidth(spanDegrees * SCALE * 1.6);
  const height = width * 0.62;
  const [cx, cy] = project(center);
  return { x: cx - width / 2, y: cy - height / 2, width, height };
}
const DEFAULT_VIEW_WIDTH = viewBoxFor(undefined).width;

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
  const dragState = useRef<{ clientX: number; clientY: number; view: typeof view } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number | null>(null);
  // Handlers read the live view from a ref so a drag or wheel gesture is never
  // computed against a stale render.
  const viewRef = useRef(view);
  viewRef.current = view;
  useEffect(() => () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); }, []);

  // Follow the timeline: when the era changes, fly to its theatre. The "last
  // seen" markers are refs, not state — an effect may write a ref, and this
  // never needs to trigger a render of its own.
  const lastEraRef = useRef(era?.id);
  const lastSelectedRef = useRef<string | null>(null);
  const eraId = era?.id;
  const selectedId = selectedBattle?.id ?? null;
  useEffect(() => {
    if (eraId === lastEraRef.current) return;
    lastEraRef.current = eraId;
    if (selectedId) return;
    flyTo(viewBoxFor(era), 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eraId]);
  useEffect(() => {
    if (selectedId === lastSelectedRef.current) return;
    lastSelectedRef.current = selectedId;
    if (!selectedBattle) return;
    const [cx, cy] = project(selectedBattle.coordinates);
    const current = viewRef.current;
    flyTo({ ...current, x: cx - current.width / 2, y: cy - current.height / 2 }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const zones = useMemo(() => {
    if (!layers.territories) return [];
    return territoriesForYear(year)
      .slice()
      .sort((a, b) => Number(isContextPower(b.polity)) - Number(isContextPower(a.polity)));
  }, [year, layers.territories]);

  const routes = useMemo(() => campaignRoutes.filter((route) => !hiddenFactions[route.faction] && layers[route.forceType] && isRouteActive(route, year)), [hiddenFactions, layers, year]);
  const forces = useMemo(() => campaignRoutes.filter((route) => !hiddenFactions[route.faction] && layers[route.forceType]).flatMap((route) => { const position = interpolateRoutePosition(route, year); return position ? [{ route, position }] : []; }), [hiddenFactions, layers, year]);

  // Zoom about a focus point so the spot under the cursor stays put.
  function zoomAbout(factor: number, focusX?: number, focusY?: number) {
    setView((current) => {
      const width = clampWidth(current.width * factor);
      const ratio = width / current.width;
      const height = current.height * ratio;
      const fx = focusX ?? current.x + current.width / 2;
      const fy = focusY ?? current.y + current.height / 2;
      return { x: fx - (fx - current.x) * ratio, y: fy - (fy - current.y) * ratio, width, height };
    });
  }

  // Eased flight for button zooms and era changes, so the view moves the way a
  // map should rather than jumping.
  function flyTo(target: { x: number; y: number; width: number; height: number }, duration = 420) {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const start = viewRef.current;
    const startedAt = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setView({
        x: start.x + (target.x - start.x) * eased,
        y: start.y + (target.y - start.y) * eased,
        width: start.width + (target.width - start.width) * eased,
        height: start.height + (target.height - start.height) * eased,
      });
      if (t < 1) animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
  }

  function zoomFromCentre(factor: number) {
    const current = viewRef.current;
    const width = clampWidth(current.width * factor);
    const ratio = width / current.width;
    const height = current.height * ratio;
    const cx = current.x + current.width / 2;
    const cy = current.y + current.height / 2;
    flyTo({ x: cx - width / 2, y: cy - height / 2, width, height }, 300);
  }

  function clientToVirtual(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const current = viewRef.current;
    return { x: current.x + ((clientX - rect.left) / rect.width) * current.width, y: current.y + ((clientY - rect.top) / rect.height) * current.height };
  }

  const strokeScale = view.width / 1000; // keep line weights visually stable while zooming
  const zoomFactor = DEFAULT_VIEW_WIDTH / view.width;

  return (
    <div className="atlas-svg-wrap">
      <svg
        ref={svgRef}
        className="atlas-svg"
        viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`}
        role="img"
        aria-label={`Map of the Mediterranean in ${Math.abs(year)} BCE`}
        onPointerDown={(event) => {
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          dragState.current = { clientX: event.clientX, clientY: event.clientY, view: viewRef.current };
          event.currentTarget.setPointerCapture?.(event.pointerId);
        }}
        onPointerMove={(event) => {
          const start = dragState.current; if (!start) return;
          const svg = svgRef.current; if (!svg) return;
          const rect = svg.getBoundingClientRect();
          // Drag the map with the pointer: one screen pixel moves one screen pixel.
          const dx = ((event.clientX - start.clientX) / rect.width) * start.view.width;
          const dy = ((event.clientY - start.clientY) / rect.height) * start.view.height;
          setView({ ...start.view, x: start.view.x - dx, y: start.view.y - dy });
        }}
        onPointerUp={(event) => { dragState.current = null; event.currentTarget.releasePointerCapture?.(event.pointerId); }}
        onPointerCancel={() => { dragState.current = null; }}
        onDoubleClick={(event) => { const point = clientToVirtual(event.clientX, event.clientY); if (!point) return; const current = viewRef.current; const width = clampWidth(current.width * 0.55); const ratio = width / current.width; flyTo({ x: point.x - (point.x - current.x) * ratio, y: point.y - (point.y - current.y) * ratio, width, height: current.height * ratio }, 350); }}
        onWheel={(event) => {
          event.preventDefault();
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          const point = clientToVirtual(event.clientX, event.clientY);
          // Continuous, pixel-proportional zoom instead of coarse steps.
          const factor = Math.exp(event.deltaY * 0.0018);
          zoomAbout(factor, point?.x, point?.y);
        }}
      >
        <defs>
          {/* Territory colour is clipped to the land so a polity's fill stops at
              the coastline instead of bleeding across open sea. The zones stay
              coarse schematic claims; the coast does the precise drawing. */}
          <clipPath id="atlas-land-clip">
            {LAND_PATHS.map((d, index) => <path key={index} d={d} clipRule="evenodd" />)}
          </clipPath>
        </defs>
        <rect x={view.x - 10} y={view.y - 10} width={view.width + 20} height={view.height + 20} fill="var(--map-sea, #d7e5e9)" />
        <g className="atlas-land">
          {LAND_PATHS.map((d, index) => <path key={index} d={d} fillRule="evenodd" fill="var(--map-land, #f3eee1)" stroke="var(--map-coast, #b9ae96)" strokeWidth={0.9 * strokeScale} />)}
        </g>
        <g className="atlas-territories" clipPath="url(#atlas-land-clip)">
          {zones.map((zone) => {
            const context = isContextPower(zone.polity);
            const color = factionColor(zone.polity);
            // Fill carries the meaning; the outline is only a faint inland hint
            // so the coastline stays the crisp edge and the crude envelope edges
            // do not read as borders.
            return <path key={zone.id} d={smoothClosedPath(zone.ring)} fill={color} fillOpacity={context ? 0.22 : 0.52} stroke={color} strokeOpacity={context ? 0.25 : 0.4} strokeWidth={(context ? 0.8 : 1.2) * strokeScale} strokeLinejoin="round" />;
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
            return <text key={`${zone.id}-label`} x={x} y={y} fill={factionColor(zone.polity)} fillOpacity={context ? 0.75 : 1} fontSize={7.4 * strokeScale} fontWeight={700} letterSpacing={0.9 * strokeScale} textAnchor="middle" paintOrder="stroke" stroke="var(--map-label-halo, #f8f5ed)" strokeWidth={2.6 * strokeScale}>{(zone.mapLabel ?? zone.name).toUpperCase()}</text>;
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
        <button type="button" onClick={() => zoomFromCentre(0.66)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => zoomFromCentre(1.5)} aria-label="Zoom out">−</button>
        <button type="button" onClick={() => flyTo(viewBoxFor(era), 450)} aria-label="Reset view">⌖</button>
      </div>
      <span className="atlas-scale-note">{zoomFactor.toFixed(1)}× · land: Natural Earth (public domain)</span>
    </div>
  );
}
