"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Anchor, ChevronLeft, Info, LandPlot, ListFilter, Menu, X } from "lucide-react";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { battles } from "@/data/battles"; import { historicalEvents } from "@/data/events";
import { territoriesForYear } from "@/data/territories";
import { getFactionInfo, factionList } from "@/data/factions";
import { battlesForYear } from "@/lib/historySelectors"; import { clampTimelineYear, TIMELINE_END_YEAR, TIMELINE_START_YEAR } from "@/lib/historicalDates";
import { eraForYear } from "@/data/wars";
import type { Battle, Faction } from "@/types/history";
import { AtlasMap, type MapLayers } from "./AtlasMap";
import { BattlePanel } from "./BattlePanel"; import { MapLegend } from "./MapLegend"; import { TimelineControls } from "./TimelineControls";
import { usePlaybackYear } from "./usePlaybackYear";

const initialLayers: MapLayers = { army: true, fleet: true, battles: true, sieges: true, territories: true };

export function HistoricalMap() {
  const { year, setYear, playing, setPlaying, speed, setSpeed } = usePlaybackYear();
  const [layers, setLayers] = useState(initialLayers);
  const [hiddenFactions, setHiddenFactions] = useState<Record<string, boolean>>({});
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeBattles = useMemo(() => battlesForYear(battles, year).filter((battle) => (battle.kind === "siege" ? layers.sieges : layers.battles)), [year, layers.battles, layers.sieges]);
  const selectedEvent = historicalEvents.find((event) => event.year === year);
  const currentEra = eraForYear(year);
  const eraFactions: Faction[] = currentEra?.factions ?? ["rome"];
  const powers = useMemo(() => { const ids = new Set(territoriesForYear(year).map((territory) => territory.polity)); return factionList.filter((info) => ids.has(info.id)); }, [year]);

  function updateYear(value: number) {
    const nextYear = clampTimelineYear(value);
    setYear(nextYear);
    setPlaying(false);
    if (selectedBattle && (nextYear < selectedBattle.startYear || nextYear > selectedBattle.endYear)) setSelectedBattle(null);
  }

  const layerItems: { key: keyof MapLayers; label: string; icon: React.ReactNode }[] = [
    { key: "army", label: "Land campaigns", icon: <LandPlot size={15} /> },
    { key: "fleet", label: "Naval campaigns", icon: <Anchor size={15} /> },
    { key: "battles", label: "Battles", icon: <span>⚔</span> },
    { key: "sieges", label: "Sieges", icon: <span>◎</span> },
    { key: "territories", label: "Territory control", icon: <span className="territory-swatch" aria-hidden="true" /> },
  ];

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
      <div className="active-list"><div className="active-list-title"><span>Visible events</span><span>{activeBattles.length}</span></div>{activeBattles.length ? activeBattles.map((battle) => <button key={battle.id} onClick={() => { setSelectedBattle(battle); setSidebarOpen(false); }}><span className={`mini-kind ${battle.kind}`}>{battle.kind === "naval" ? "≋" : battle.kind === "siege" ? "◎" : "⚔"}</span><span><strong>{battle.name}</strong><small>{battle.location}</small></span><ChevronLeft size={15} className="event-arrow" /></button>) : <p className="empty-state">No battle marker is active. Campaign routes may still be visible.</p>}</div>
      <p className="reconstruction-disclaimer">Ancient evidence is incomplete. Territory zones, positions, and routes are schematic reconstructions, not surveyed borders or exact tracks.</p></aside>
      <section className="map-stage" aria-label={`Interactive map — ${currentEra ? currentEra.name : "Roman military campaigns"}`}>
        <AtlasMap year={year} era={currentEra} layers={layers} hiddenFactions={hiddenFactions} activeBattles={activeBattles} selectedBattle={selectedBattle} onSelectBattle={setSelectedBattle} />
        <div className="map-caption"><span>THE MEDITERRANEAN WORLD</span><small>Schematic territories &amp; routes · no modern borders</small></div>
        <MapLegend powers={powers} />
        {selectedBattle && <BattlePanel battle={selectedBattle} onClose={() => setSelectedBattle(null)} />}
      </section></div>
    <TimelineControls year={year} playing={playing} speed={speed} onYearChange={updateYear} onPlayingChange={(value) => { if (value && year === TIMELINE_END_YEAR) setYear(TIMELINE_START_YEAR); setPlaying(value); }} onSpeedChange={setSpeed} />
  </main>;
}
