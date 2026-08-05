import { factionColor } from "@/data/factions";
import type { DiagramArrow, DiagramStage, DiagramTerrain, DiagramUnit } from "@/types/history";

// One stage of a battle, as SVG. Pure and server-renderable: the first stage of
// every diagram is in the HTML, so the reader sees the battle before any
// JavaScript arrives, and the stepper only swaps which stage is shown.

const VIEW = { width: 100, height: 68 };

function Terrain({ feature }: { feature: DiagramTerrain }) {
  const { kind, points, at, size, label } = feature;
  const path = points?.map((point) => `${point[0]} ${point[1]}`).join("L");

  if (kind === "sea" || kind === "marsh" || kind === "woods") {
    const fill = kind === "sea" ? "var(--bd-sea)" : kind === "marsh" ? "var(--bd-marsh)" : "var(--bd-woods)";
    return <path d={`M${path}Z`} fill={fill} opacity={kind === "woods" ? 0.55 : 0.8} />;
  }
  if (kind === "river") {
    return <path d={`M${path}`} fill="none" stroke="var(--bd-river)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />;
  }
  if (kind === "coast") {
    return <path d={`M${path}`} fill="none" stroke="var(--bd-coast)" strokeWidth={0.7} strokeDasharray="2 1.4" />;
  }
  if (kind === "hill" || kind === "ridge") {
    // A filled outline plus an inner dashed contour reads as high ground without
    // pretending to be surveyed relief.
    const centre = points?.length
      ? points.reduce((sum, point) => [sum[0] + point[0] / points.length, sum[1] + point[1] / points.length] as [number, number], [0, 0] as [number, number])
      : [50, 34];
    return (
      <g opacity={0.85}>
        <path d={`M${path}Z`} fill="var(--bd-hill)" stroke="var(--bd-contour)" strokeWidth={0.4} />
        <path
          d={`M${path}Z`}
          fill="none"
          stroke="var(--bd-contour)"
          strokeWidth={0.3}
          strokeDasharray="1.4 1"
          transform={`translate(${centre[0]} ${centre[1]}) scale(0.9) translate(${-centre[0]} ${-centre[1]})`}
        />
      </g>
    );
  }
  if (kind === "wall") {
    return <path d={`M${path}`} fill="none" stroke="var(--bd-works)" strokeWidth={1.1} strokeLinecap="square" />;
  }
  if (kind === "road") {
    return <path d={`M${path}`} fill="none" stroke="var(--bd-road)" strokeWidth={0.6} strokeDasharray="3 2" />;
  }
  // town
  const [x, y] = at ?? [0, 0];
  const [w, h] = size ?? [6, 4];
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} fill="var(--bd-town)" stroke="var(--bd-works)" strokeWidth={0.4} />
      {label && <text x={x} y={y + h / 2 + 2.6} className="bd-terrain-label" textAnchor="middle">{label}</text>}
    </g>
  );
}

function Unit({ unit }: { unit: DiagramUnit }) {
  const color = factionColor(unit.faction);
  const [x, y] = unit.at;
  const [w, h] = unit.size ?? (unit.kind === "cavalry" ? [7, 3] : unit.kind === "phalanx" ? [14, 5] : [12, 3.4]);
  const rotate = unit.facing ? `rotate(${unit.facing} ${x} ${y})` : undefined;
  const faded = unit.routed ? 0.42 : 1;

  const body = () => {
    if (unit.kind === "ships") {
      // A line of hulls rather than a block.
      const count = Math.max(2, Math.round(w / 3));
      return (
        <g>
          {Array.from({ length: count }, (_, index) => {
            const cx = x - w / 2 + (index + 0.5) * (w / count);
            return <path key={index} d={`M${cx - 1.1} ${y} Q${cx} ${y + 1.9} ${cx + 1.1} ${y} Z`} fill={color} stroke="var(--bd-edge)" strokeWidth={0.22} />;
          })}
        </g>
      );
    }
    if (unit.kind === "cavalry") {
      return <ellipse cx={x} cy={y} rx={w / 2} ry={h / 2} fill={color} stroke="var(--bd-edge)" strokeWidth={0.3} />;
    }
    if (unit.kind === "elephants") {
      const count = Math.max(2, Math.round(w / 3.4));
      return (
        <g>
          {Array.from({ length: count }, (_, index) => {
            const cx = x - w / 2 + (index + 0.5) * (w / count);
            return <circle key={index} cx={cx} cy={y} r={1.25} fill={color} stroke="var(--bd-edge)" strokeWidth={0.22} />;
          })}
        </g>
      );
    }
    if (unit.kind === "skirmishers") {
      return <rect x={x - w / 2} y={y - h / 2} width={w} height={h} fill="none" stroke={color} strokeWidth={0.6} strokeDasharray="1.6 1.1" />;
    }
    if (unit.kind === "camp" || unit.kind === "works") {
      return <rect x={x - w / 2} y={y - h / 2} width={w} height={h} fill="none" stroke={color} strokeWidth={0.55} strokeDasharray="2.2 1.2" />;
    }
    // infantry and phalanx: a solid block, phalanx marked with depth rules
    return (
      <g>
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} fill={color} stroke="var(--bd-edge)" strokeWidth={0.3} />
        {unit.kind === "phalanx" && Array.from({ length: 3 }, (_, index) => (
          <line key={index} x1={x - w / 2} y1={y - h / 2 + ((index + 1) * h) / 4} x2={x + w / 2} y2={y - h / 2 + ((index + 1) * h) / 4} stroke="var(--bd-edge)" strokeWidth={0.22} opacity={0.6} />
        ))}
      </g>
    );
  };

  return (
    <g transform={rotate} opacity={faded} className={unit.routed ? "bd-unit bd-routed" : "bd-unit"}>
      {body()}
      {unit.label && <text x={x} y={y - h / 2 - 1.5} className="bd-unit-label" textAnchor="middle">{unit.label}</text>}
    </g>
  );
}

function Arrow({ arrow }: { arrow: DiagramArrow }) {
  const [x1, y1] = arrow.from;
  const [x2, y2] = arrow.to;
  const bow = arrow.bow ?? 0;
  // Control point offset perpendicular to the chord gives a readable curve.
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const cx = midX - (dy / length) * bow;
  const cy = midY + (dx / length) * bow;
  const color = arrow.faction ? factionColor(arrow.faction) : "var(--bd-edge)";
  const dash = arrow.kind === "retreat" ? "2.4 1.6" : arrow.kind === "missile" ? "1 1.2" : undefined;
  const width = arrow.kind === "attack" ? 1 : 0.75;

  // The head is drawn rather than left to a marker: SVG markers inherit size from
  // the stroke width and cannot take the stroke's colour portably, which produced
  // heads far larger than the frame could carry.
  const tangentX = x2 - cx;
  const tangentY = y2 - cy;
  const tangent = Math.hypot(tangentX, tangentY) || 1;
  const ux = tangentX / tangent;
  const uy = tangentY / tangent;
  const head = arrow.kind === "attack" ? 2.4 : 2;
  const spread = 0.46;
  const headPath = arrow.kind === "missile"
    ? null
    : `M${x2 - ux * head - uy * head * spread} ${y2 - uy * head + ux * head * spread}L${x2} ${y2}L${x2 - ux * head + uy * head * spread} ${y2 - uy * head - ux * head * spread}`;

  return (
    <g className="bd-arrow">
      <path
        d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dash}
        strokeLinecap="round"
      />
      {headPath && <path d={headPath} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />}
      {arrow.label && <text x={cx} y={cy - 1.4} className="bd-arrow-label" textAnchor="middle">{arrow.label}</text>}
    </g>
  );
}

export function BattleDiagramFigure({ stage, terrain, title }: { stage: DiagramStage; terrain: DiagramTerrain[]; title: string }) {
  return (
    <svg className="bd-figure" viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} role="img" aria-label={`${title}: ${stage.title}. ${stage.description}`}>
      <rect width={VIEW.width} height={VIEW.height} fill="var(--bd-ground)" />
      <g className="bd-terrain">{terrain.map((feature) => <Terrain key={feature.id} feature={feature} />)}</g>
      <g className="bd-arrows">{(stage.arrows ?? []).map((arrow) => <Arrow key={arrow.id} arrow={arrow} />)}</g>
      <g className="bd-units">{stage.units.map((unit) => <Unit key={unit.id} unit={unit} />)}</g>
    </svg>
  );
}
