import { EvidenceBadge } from "@/components/EvidenceBadge";
import type { FactionInfo } from "@/data/factions";

export function MapLegend({ powers }: { powers: FactionInfo[] }) {
  return (
    <details className="map-legend" open>
      <summary>Map key</summary>
      {powers.length > 0 && (
        <div className="legend-powers" aria-label="Powers on the map">
          {powers.map((info) => (
            <span key={info.id}><i className="legend-territory" style={{ background: info.color }} /> {info.name}</span>
          ))}
        </div>
      )}
      <div className="legend-grid">
        <span><i className="legend-force" style={{ color: "#55564f" }}>▲</i> Army</span><span><i className="legend-force" style={{ color: "#55564f" }}>◆</i> Fleet</span>
        <span><i className="legend-battle" style={{ color: "#3a3f39" }}>⚔</i> Land battle</span><span><i className="legend-battle naval">≋</i> Naval battle</span>
        <span><i className="legend-battle siege">◎</i> Siege</span><span><i className="legend-battle" style={{ color: "#6b5940" }}>↟</i> Campaign</span>
      </div>
      <div className="legend-evidence" aria-label="Historical certainty key"><EvidenceBadge certainty="attested" /><EvidenceBadge certainty="probable" /><EvidenceBadge certainty="disputed" /><EvidenceBadge certainty="speculative" /></div>
      <p>Shaded areas are schematic zones of control, not surveyed borders. Marker color shows the power; solid routes are elapsed stages, dashed routes later stages.</p>
    </details>
  );
}
