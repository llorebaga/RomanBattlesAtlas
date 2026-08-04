"use client";
import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import type { Map as MapLibreMap } from "maplibre-gl";
import type { Battle } from "@/types/history";

// This locator keeps modern labels on purpose — unlike the campaign atlas, its
// job is to answer "where is this place today", so the place names are the
// point. Desaturated to sit with the rest of the visual system.
const rasterStyle = { version: 8 as const, sources: { carto: { type: "raster" as const, tiles: ["https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"], tileSize: 256, attribution: "© OpenStreetMap contributors © CARTO" } }, layers: [{ id: "carto-base", type: "raster" as const, source: "carto", paint: { "raster-saturation": -0.55, "raster-contrast": -0.05 } }] };

export function BattleAreaMap({ battle }: { battle: Battle }) {
  const container = useRef<HTMLDivElement>(null); const mapRef = useRef<MapLibreMap | null>(null);
  useEffect(() => {
    if (!container.current || mapRef.current) return;
    const map = new maplibregl.Map({ container: container.current, style: rasterStyle, center: battle.coordinates, zoom: 7.2, attributionControl: false });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right"); map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
    const marker = document.createElement("div"); marker.className = `battle-marker ${battle.kind} major static-marker`; marker.textContent = battle.kind === "naval" ? "≋" : "⚔";
    new maplibregl.Marker({ element: marker }).setLngLat(battle.coordinates).addTo(map); mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [battle]);
  return <div className="battle-area-map" ref={container} aria-label={`Interactive map of the approximate ${battle.name} area`} />;
}
