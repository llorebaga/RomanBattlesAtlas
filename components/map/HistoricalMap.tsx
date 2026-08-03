"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import * as maplibregl from "maplibre-gl";
import type { GeoJSONSource, Map as MapLibreMap, Marker } from "maplibre-gl";
import { Anchor, ChevronLeft, Info, LandPlot, ListFilter, Menu, X } from "lucide-react";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { battles } from "@/data/battles"; import { campaignRoutes } from "@/data/campaigns"; import { historicalEvents } from "@/data/events";
import { territoriesForYear } from "@/data/territories";
import { factionColor, factionAdjective, getFactionInfo, factionList } from "@/data/factions";
import { battlesForYear } from "@/lib/historySelectors"; import { clampTimelineYear, TIMELINE_END_YEAR, TIMELINE_START_YEAR } from "@/lib/historicalDates"; import { interpolateRoutePosition, isRouteActive, splitRouteAtYear } from "@/lib/routeInterpolation";
import { eraForYear } from "@/data/wars";
import type { Battle, CampaignRoute, Faction } from "@/types/history";
import { BattlePanel } from "./BattlePanel"; import { MapLegend } from "./MapLegend"; import { TimelineControls } from "./TimelineControls";

type LayerFilters = { army: boolean; fleet: boolean; battles: boolean; sieges: boolean; territories: boolean };
const initialLayers: LayerFilters = { army: true, fleet: true, battles: true, sieges: true, territories: true };
const rasterStyle = { version: 8 as const, sources: { carto: { type: "raster" as const, tiles: ["https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"], tileSize: 256, attribution: "© OpenStreetMap contributors © CARTO" } }, layers: [{ id: "carto-base", type: "raster" as const, source: "carto", paint: { "raster-saturation": -0.28, "raster-contrast": -0.04 } }] };

function routeVisible(route: CampaignRoute, layers: LayerFilters, hidden: Record<string, boolean>) { return !hidden[route.faction] && layers[route.forceType]; }
function lineCollection(routes: CampaignRoute[], year: number, layers: LayerFilters, hidden: Record<string, boolean>, part: "completed" | "future") { return { type: "FeatureCollection" as const, features: routes.filter((route) => routeVisible(route, layers, hidden) && isRouteActive(route, year)).flatMap((route) => { const coordinates = splitRouteAtYear(route, year)[part]; return coordinates.length < 2 ? [] : [{ type: "Feature" as const, properties: { id: route.id, color: factionColor(route.faction), certainty: route.certainty }, geometry: { type: "LineString" as const, coordinates } }]; }) }; }
function territoryCollection(year: number, show: boolean) { if (!show) return { type: "FeatureCollection" as const, features: [] }; return { type: "FeatureCollection" as const, features: territoriesForYear(year).map((territory) => ({ type: "Feature" as const, properties: { polity: territory.polity, name: territory.name, color: factionColor(territory.polity) }, geometry: { type: "Polygon" as const, coordinates: [[...territory.ring, territory.ring[0]].map((point) => [point[0], point[1]])] } })) }; }

export function HistoricalMap() {
  const mapContainer = useRef<HTMLDivElement>(null); const mapRef = useRef<MapLibreMap | null>(null); const forceMarkers = useRef<Marker[]>([]); const battleMarkers = useRef<Marker[]>([]); const previousEraRef = useRef<string | undefined>(undefined);
  const [mapReady, setMapReady] = useState(false); const [year, setYear] = useState(TIMELINE_START_YEAR); const [playing, setPlaying] = useState(false); const [speed, setSpeed] = useState(1200); const [layers, setLayers] = useState(initialLayers); const [hiddenFactions, setHiddenFactions] = useState<Record<string, boolean>>({}); const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null); const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeBattles = useMemo(() => battlesForYear(battles, year).filter((battle) => battle.kind === "siege" ? layers.sieges : layers.battles), [year, layers.battles, layers.sieges]); const selectedEvent = historicalEvents.find((event) => event.year === year);
  const currentEra = eraForYear(year);
  const eraFactions: Faction[] = currentEra?.factions ?? ["rome"];
  const powers = useMemo(() => { const ids = new Set(territoriesForYear(year).map((territory) => territory.polity)); return factionList.filter((info) => ids.has(info.id)); }, [year]);
  useEffect(() => { if (!playing) return; const timer = window.setInterval(() => setYear((current) => { if (current >= TIMELINE_END_YEAR) { setPlaying(false); return TIMELINE_END_YEAR; } return current + 1; }), speed); return () => window.clearInterval(timer); }, [playing, speed]);
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    const map = new maplibregl.Map({ container: mapContainer.current, style: rasterStyle, center: [12.2, 38], zoom: 4.4, minZoom: 3.2, maxZoom: 9, attributionControl: false });
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right"); map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
    map.on("load", () => {
      map.addSource("territories", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({ id: "territory-fill", type: "fill", source: "territories", paint: { "fill-color": ["get", "color"], "fill-opacity": 0.17 } });
      map.addLayer({ id: "territory-outline", type: "line", source: "territories", paint: { "line-color": ["get", "color"], "line-width": 1.1, "line-opacity": 0.5 } });
      map.addSource("routes-future", { type: "geojson", data: { type: "FeatureCollection", features: [] } }); map.addSource("routes-completed", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({ id: "routes-future", type: "line", source: "routes-future", paint: { "line-color": ["get", "color"], "line-width": 2.2, "line-opacity": 0.3, "line-dasharray": [1.5, 2.2] } });
      map.addLayer({ id: "routes-completed", type: "line", source: "routes-completed", paint: { "line-color": ["get", "color"], "line-width": 3.2, "line-opacity": 0.88 } });
      setMapReady(true);
    });
    mapRef.current = map; return () => { map.remove(); mapRef.current = null; };
  }, []);
  const selectBattle = (battle: Battle) => { setSelectedBattle(battle); mapRef.current?.easeTo({ center: battle.coordinates, zoom: Math.max(mapRef.current.getZoom(), 5.4), duration: 700 }); };
  const selectBattleRef = useRef(selectBattle); useEffect(() => { selectBattleRef.current = selectBattle; });
  useEffect(() => { const map = mapRef.current; if (!mapReady || !map || !currentEra) return; if (previousEraRef.current === currentEra.id) return; previousEraRef.current = currentEra.id; if (selectedBattle) return; map.easeTo({ center: currentEra.mapView.center, zoom: currentEra.mapView.zoom, duration: 1100 }); }, [currentEra, mapReady, selectedBattle]);
  useEffect(() => {
    const map = mapRef.current; if (!mapReady || !map) return;
    (map.getSource("territories") as GeoJSONSource)?.setData(territoryCollection(year, layers.territories));
    (map.getSource("routes-completed") as GeoJSONSource)?.setData(lineCollection(campaignRoutes, year, layers, hiddenFactions, "completed")); (map.getSource("routes-future") as GeoJSONSource)?.setData(lineCollection(campaignRoutes, year, layers, hiddenFactions, "future"));
    forceMarkers.current.forEach((marker) => marker.remove()); forceMarkers.current = campaignRoutes.filter((route) => routeVisible(route, layers, hiddenFactions)).flatMap((route) => { const position = interpolateRoutePosition(route, year); if (!position) return []; const element = document.createElement("button"); element.className = `force-marker ${route.forceType}`; element.style.background = factionColor(route.faction); element.textContent = route.forceType === "army" ? "▲" : "◆"; element.setAttribute("aria-label", `${factionAdjective(route.faction)} ${route.forceType}: ${route.name}`); element.title = `${route.name} — ${route.certainty} reconstruction`; return [new maplibregl.Marker({ element, anchor: "center" }).setLngLat(position).addTo(map)]; });
    battleMarkers.current.forEach((marker) => marker.remove()); battleMarkers.current = activeBattles.map((battle) => { const element = document.createElement("button"); element.className = `battle-marker ${battle.kind} ${battle.major ? "major" : "secondary"}`; element.textContent = battle.kind === "naval" ? "≋" : battle.kind === "siege" ? "◎" : battle.kind === "campaign" ? "↟" : "⚔"; element.setAttribute("aria-label", `${battle.name}, ${battle.displayDate}. Open summary.`); element.title = `${battle.name} · ${battle.displayDate}`; element.addEventListener("click", () => selectBattleRef.current(battle)); return new maplibregl.Marker({ element, anchor: "center" }).setLngLat(battle.coordinates).addTo(map); });
  }, [activeBattles, layers, hiddenFactions, mapReady, year]);
  function updateYear(value: number) { const nextYear = clampTimelineYear(value); setYear(nextYear); setPlaying(false); if (selectedBattle && (nextYear < selectedBattle.startYear || nextYear > selectedBattle.endYear)) setSelectedBattle(null); }
  const layerItems: { key: keyof LayerFilters; label: string; icon: React.ReactNode }[] = [{ key: "army", label: "Land campaigns", icon: <LandPlot size={15} /> }, { key: "fleet", label: "Naval campaigns", icon: <Anchor size={15} /> }, { key: "battles", label: "Battles", icon: <span>⚔</span> }, { key: "sieges", label: "Sieges", icon: <span>◎</span> }, { key: "territories", label: "Territory control", icon: <span className="territory-swatch" aria-hidden="true" /> }];
  return <main className="atlas-shell">
    <header className="atlas-header"><div className="atlas-brand"><Link href="/" aria-label="Roman Campaign Atlas home"><span className="brand-mark">R</span><span><strong>ROMAN CAMPAIGN ATLAS</strong><small>{currentEra ? `${currentEra.shortName} · ${Math.abs(currentEra.startYear)}–${Math.abs(currentEra.endYear)} BCE` : "Roman military history"}</small></span></Link></div><div className="header-note"><Info size={15} /><span>Evidence-led reconstruction</span></div><button className="mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle map filters">{sidebarOpen ? <X /> : <Menu />}</button></header>
    <div className="atlas-workspace"><aside className={`atlas-sidebar ${sidebarOpen ? "open" : ""}`}><div className="sidebar-heading"><span>CAMPAIGN LAYERS</span><ListFilter size={16} /></div>
      <div className="filter-list">
        {eraFactions.map((id) => { const info = getFactionInfo(id); return <label key={id} className="filter-row"><span className="filter-label"><span className="faction-swatch" style={{ background: info?.color }} />{info?.adjective ?? id} forces</span><input type="checkbox" checked={!hiddenFactions[id]} onChange={() => setHiddenFactions((current) => ({ ...current, [id]: !current[id] }))} /><span className="toggle" aria-hidden="true" /></label>; })}
        <div className="filter-divider" aria-hidden="true" />
        {layerItems.map((item) => <label key={item.key} className="filter-row"><span className="filter-label">{item.icon}{item.label}</span><input type="checkbox" checked={layers[item.key]} onChange={() => setLayers((current) => ({ ...current, [item.key]: !current[item.key] }))} /><span className="toggle" aria-hidden="true" /></label>)}
      </div>
      <div className="year-events"><p className="eyebrow">YEAR IN FOCUS</p><h2>{selectedEvent?.title ?? "Campaign developments"}</h2><p>{selectedEvent?.summary ?? "The surviving sources record no major set-piece event for this year."}</p>{selectedEvent && <EvidenceBadge certainty={selectedEvent.certainty} />}</div>
      {layers.territories && powers.length > 0 && <div className="powers-list"><div className="active-list-title"><span>Powers on the map</span><span>{powers.length}</span></div><div className="powers-grid">{powers.map((info) => <span key={info.id} className="power-chip"><span className="faction-swatch" style={{ background: info.color }} />{info.name}</span>)}</div></div>}
      <div className="active-list"><div className="active-list-title"><span>Visible events</span><span>{activeBattles.length}</span></div>{activeBattles.length ? activeBattles.map((battle) => <button key={battle.id} onClick={() => { selectBattle(battle); setSidebarOpen(false); }}><span className={`mini-kind ${battle.kind}`}>{battle.kind === "naval" ? "≋" : battle.kind === "siege" ? "◎" : "⚔"}</span><span><strong>{battle.name}</strong><small>{battle.location}</small></span><ChevronLeft size={15} className="event-arrow" /></button>) : <p className="empty-state">No battle marker is active. Campaign routes may still be visible.</p>}</div>
      <p className="reconstruction-disclaimer">Ancient evidence is incomplete. Territory zones, positions, and routes are schematic reconstructions, not surveyed borders or exact tracks.</p></aside>
      <section className="map-stage" aria-label={`Interactive map — ${currentEra ? currentEra.name : "Roman military campaigns"}`}><div ref={mapContainer} className="map-canvas" />{!mapReady && <div className="map-loading" role="status"><span />Loading the Mediterranean…</div>}<div className="map-caption"><span>THE MEDITERRANEAN WORLD</span><small>Schematic territories & routes · modern basemap</small></div><MapLegend powers={powers} />{selectedBattle && <BattlePanel battle={selectedBattle} onClose={() => setSelectedBattle(null)} />}</section></div>
    <TimelineControls year={year} playing={playing} speed={speed} onYearChange={updateYear} onPlayingChange={(value) => { if (value && year === TIMELINE_END_YEAR) setYear(TIMELINE_START_YEAR); setPlaying(value); }} onSpeedChange={setSpeed} />
  </main>;
}
