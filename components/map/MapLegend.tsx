import { EvidenceBadge } from "@/components/EvidenceBadge";

export function MapLegend() {
  return (
    <details className="map-legend" open>
      <summary>Map key</summary>
      <div className="legend-grid">
        <span><i className="legend-force roman">▲</i> Roman army</span><span><i className="legend-force carthage">▲</i> Carthaginian army</span>
        <span><i className="legend-force fleet">◆</i> Fleet</span><span><i className="legend-battle">⚔</i> Land battle</span>
        <span><i className="legend-battle naval">≋</i> Naval battle</span><span><i className="legend-battle siege">◎</i> Siege</span>
      </div>
      <div className="legend-evidence" aria-label="Historical certainty key"><EvidenceBadge certainty="attested" /><EvidenceBadge certainty="probable" /><EvidenceBadge certainty="disputed" /><EvidenceBadge certainty="speculative" /></div>
      <p>Solid routes show elapsed campaign stages; dashed routes show later stages. Lines are schematic reconstructions.</p>
    </details>
  );
}
