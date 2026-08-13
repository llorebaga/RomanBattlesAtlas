import { EvidenceBadge } from "@/components/EvidenceBadge";
import { territoryFillOpacity, type FactionInfo } from "@/data/factions";

export function MapLegend({ powers }: { powers: FactionInfo[] }) {
  return (
    <details className="map-legend" open>
      <summary>Map key</summary>
      {powers.length > 0 && (
        <div className="legend-powers" aria-label="Powers on the map">
          {powers.map((info) => (
            <span key={info.id} className={info.role === "context" ? "context" : undefined}><i className="power-swatch" style={{ background: info.color, opacity: territoryFillOpacity(info.id) }} /> {info.name}</span>
          ))}
        </div>
      )}
      <div className="legend-grid">
        <span><i className="legend-force" style={{ color: "#55564f" }}>▲</i> Army</span><span><i className="legend-force" style={{ color: "#55564f" }}>◆</i> Fleet</span>
        <span><i className="legend-battle" style={{ color: "#3a3f39" }}>⚔</i> Land battle</span><span><i className="legend-battle naval">≋</i> Naval battle</span>
        <span><i className="legend-battle siege">◎</i> Siege</span><span><i className="legend-battle" style={{ color: "#6b5940" }}>↟</i> Campaign</span>
      </div>
      <div className="legend-routes" aria-label="Route key">
        <span><svg viewBox="0 0 34 6" aria-hidden="true"><line x1="1" y1="3" x2="33" y2="3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg> Marched</span>
        <span><svg viewBox="0 0 34 6" aria-hidden="true"><line x1="1" y1="3" x2="33" y2="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="0.9 2.4" /></svg> Shipped</span>
        <span><svg viewBox="0 0 34 6" aria-hidden="true"><line x1="1" y1="3" x2="33" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3.4 4.8" opacity="0.5" /></svg> Still ahead</span>
      </div>
      <div className="legend-evidence" aria-label="Historical certainty key"><EvidenceBadge certainty="attested" /><EvidenceBadge certainty="probable" /><EvidenceBadge certainty="disputed" /><EvidenceBadge certainty="speculative" /><EvidenceBadge certainty="traditional" /></div>
      <p>Shaded areas are schematic zones of control clipped to the coastline, not surveyed borders; each is labeled on the map. Faded powers took no part in these wars. Marching routes follow land; dotted stretches are legs the troops crossed by ship.</p>
    </details>
  );
}
