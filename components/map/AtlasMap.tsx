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
import { MAP_SCALE as SCALE, projectPoint, smoothClosedPath, smoothOpenPath, clampView, EXTENT_WIDTH, EXTENT_HEIGHT } from "@/lib/mapGeometry";
import { campaignRoutes } from "@/data/campaigns";
import type { Battle, Coordinates, Era } from "@/types/history";

export type MapLayers = { army: boolean; fleet: boolean; battles: boolean; sieges: boolean; territories: boolean };

const project = (point: Coordinates | number[]): [number, number] => projectPoint(point);
const pathFor = (rings: number[][][]) => rings.map((ring) => `M${ring.map((p) => { const [x, y] = project(p); return `${x.toFixed(1)} ${y.toFixed(1)}`; }).join("L")}Z`).join("");
const MIN_VIEW_WIDTH = 120; // closest zoom, in projected units (about 5° across)
const DEFAULT_ASPECT = 0.58; // used for the server render, before the pane is measured

// Each land polygon keeps its own path so holes (inland seas) render correctly.
const LAND_PATHS = landPolygons.map((rings) => pathFor(rings));

// A view is {x, y, width}; height always follows the container's aspect, so the
// viewBox matches the viewport exactly and clamping to the atlas extent holds.
function viewBoxFor(era: Era | undefined, aspect: number, fallbackCenter: Coordinates = [12.2, 38]) {
  const center = era?.mapView.center ?? fallbackCenter;
  const zoom = era?.mapView.zoom ?? 4.4;
  const spanDegrees = 360 / Math.pow(2, zoom);
  const width = spanDegrees * SCALE * 1.6;
  const [cx, cy] = project(center);
  return clampView({ x: cx - width / 2, y: cy - (width * aspect) / 2, width }, aspect, MIN_VIEW_WIDTH);
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
  const [aspect, setAspect] = useState(DEFAULT_ASPECT);
  const [view, setView] = useState(() => viewBoxFor(era, DEFAULT_ASPECT));
  const dragState = useRef<{ clientX: number; clientY: number; view: typeof view } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  // Handlers read the live view and aspect from refs so a drag or wheel gesture
  // is never computed against a stale render.
  const viewRef = useRef(view);
  viewRef.current = view;
  const aspectRef = useRef(aspect);
  aspectRef.current = aspect;
  const height = view.width * aspect;
  useEffect(() => () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); }, []);

  // Track the pane's shape so the viewBox never letterboxes: with a matching
  // aspect, "fit the whole atlas" really is the whole atlas and nothing outside
  // the extent can come into frame.
  useEffect(() => {
    const element = wrapRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box || box.width <= 0) return;
      const next = box.height / box.width;
      if (Math.abs(next - aspectRef.current) < 0.001) return;
      setAspect(next);
      setView((current) => clampView(current, next, MIN_VIEW_WIDTH));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
    flyTo(viewBoxFor(era, aspectRef.current), 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eraId]);
  useEffect(() => {
    if (selectedId === lastSelectedRef.current) return;
    lastSelectedRef.current = selectedId;
    if (!selectedBattle) return;
    const [cx, cy] = project(selectedBattle.coordinates);
    const current = viewRef.current;
    flyTo({ x: cx - current.width / 2, y: cy - (current.width * aspectRef.current) / 2, width: current.width }, 500);
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

  // Every view change goes through clampView, so no gesture can leave the atlas.
  function zoomAbout(factor: number, focusX?: number, focusY?: number) {
    setView((current) => {
      const currentAspect = aspectRef.current;
      const currentHeight = current.width * currentAspect;
      const wanted = clampView({ ...current, width: current.width * factor }, currentAspect, MIN_VIEW_WIDTH);
      const ratio = wanted.width / current.width;
      const fx = focusX ?? current.x + current.width / 2;
      const fy = focusY ?? current.y + currentHeight / 2;
      return clampView({ x: fx - (fx - current.x) * ratio, y: fy - (fy - current.y) * ratio, width: wanted.width }, currentAspect, MIN_VIEW_WIDTH);
    });
  }

  // Eased flight for button zooms and era changes, so the view moves the way a
  // map should rather than jumping.
  function flyTo(target: { x: number; y: number; width: number }, duration = 420) {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const start = viewRef.current;
    const currentAspect = aspectRef.current;
    const end = clampView(target, currentAspect, MIN_VIEW_WIDTH);
    const startedAt = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setView(clampView({
        x: start.x + (end.x - start.x) * eased,
        y: start.y + (end.y - start.y) * eased,
        width: start.width + (end.width - start.width) * eased,
      }, currentAspect, MIN_VIEW_WIDTH));
      if (t < 1) animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
  }

  function zoomFromCentre(factor: number) {
    const current = viewRef.current;
    const currentAspect = aspectRef.current;
    const cx = current.x + current.width / 2;
    const cy = current.y + (current.width * currentAspect) / 2;
    const width = current.width * factor;
    flyTo({ x: cx - width / 2, y: cy - (width * currentAspect) / 2, width }, 300);
  }

  function clientToVirtual(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const current = viewRef.current;
    return { x: current.x + ((clientX - rect.left) / rect.width) * current.width, y: current.y + ((clientY - rect.top) / rect.height) * (current.width * aspectRef.current) };
  }

  const strokeScale = view.width / 1000; // keep line weights visually stable while zooming
  const fullWidth = Math.min(EXTENT_WIDTH, EXTENT_HEIGHT / Math.max(aspect, 0.0001));
  const zoomFactor = fullWidth / view.width;

  return (
    <div className="atlas-svg-wrap" ref={wrapRef}>
      <svg
        ref={svgRef}
        className="atlas-svg"
        viewBox={`${view.x} ${view.y} ${view.width} ${height}`}
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
          const dy = ((event.clientY - start.clientY) / rect.height) * (start.view.width * aspectRef.current);
          setView(clampView({ ...start.view, x: start.view.x - dx, y: start.view.y - dy }, aspectRef.current, MIN_VIEW_WIDTH));
        }}
        onPointerUp={(event) => { dragState.current = null; event.currentTarget.releasePointerCapture?.(event.pointerId); }}
        onPointerCancel={() => { dragState.current = null; }}
        onDoubleClick={(event) => { const point = clientToVirtual(event.clientX, event.clientY); if (!point) return; const current = viewRef.current; const width = current.width * 0.55; const ratio = width / current.width; flyTo({ x: point.x - (point.x - current.x) * ratio, y: point.y - (point.y - current.y) * ratio, width }, 350); }}
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
        <rect x={view.x - 10} y={view.y - 10} width={view.width + 20} height={height + 20} fill="var(--map-sea, #d7e5e9)" />
        <g className="atlas-land">
          {LAND_PATHS.map((d, index) => <path key={index} d={d} fillRule="evenodd" fill="var(--map-land, #f3eee1)" stroke="var(--map-coast, #b9ae96)" strokeWidth={0.9 * strokeScale} />)}
        </g>
        {/* Opacity is applied once per layer, not per shape. Zones therefore
            overlap without darkening: the one drawn later simply wins the
            contested ground, which lets the envelopes overshoot coasts and each
            other so no unclaimed white sliver is left between powers. */}
        <g className="atlas-territories" clipPath="url(#atlas-land-clip)">
          <g opacity={0.22}>
            {zones.filter((zone) => isContextPower(zone.polity)).map((zone) => <path key={zone.id} d={smoothClosedPath(zone.ring)} fill={factionColor(zone.polity)} />)}
          </g>
          <g opacity={0.52}>
            {zones.filter((zone) => !isContextPower(zone.polity)).map((zone) => <path key={zone.id} d={smoothClosedPath(zone.ring)} fill={factionColor(zone.polity)} />)}
          </g>
        </g>
        <g className="atlas-routes">
          {routes.map((route) => {
            const split = splitRouteAtYear(route, year);
            const color = factionColor(route.faction);
            // Marches curve through their waypoints rather than running as ruled
            // straight legs, which looked mechanical and implied surveyed roads.
            return <g key={route.id}>
              {split.future.length >= 2 && <path d={smoothOpenPath(split.future)} fill="none" stroke={color} strokeOpacity={0.32} strokeWidth={2.2 * strokeScale} strokeDasharray={`${3.4 * strokeScale} ${4.8 * strokeScale}`} strokeLinecap="round" />}
              {split.completed.length >= 2 && <path d={smoothOpenPath(split.completed)} fill="none" stroke={color} strokeOpacity={0.9} strokeWidth={3.2 * strokeScale} strokeLinejoin="round" strokeLinecap="round" />}
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
        <button type="button" onClick={() => flyTo(viewBoxFor(era, aspectRef.current), 450)} aria-label="Reset view">⌖</button>
      </div>
      <span className="atlas-scale-note">{zoomFactor.toFixed(1)}× · land: Natural Earth (public domain)</span>
    </div>
  );
}
