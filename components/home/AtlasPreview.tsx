"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { battles } from "@/data/battles";
import { periods } from "@/data/periods";
import { atlasHref } from "@/lib/atlasLinks";
import { HomeMap, type HomeMapPoint } from "./HomeMap";

// A demonstration, not a second atlas: the same coastline and battle coordinates,
// no timeline, no layer engine, no territory geometry. Switching period only
// filters points already in memory, so nothing new is fetched.
const PREVIEW_PERIODS = ["middle-republic", "late-republic", "augustan", "high-empire", "late-empire"];

export function AtlasPreview() {
  const [activeId, setActiveId] = useState("middle-republic");
  const shown = periods.filter((period) => PREVIEW_PERIODS.includes(period.id));
  const active = shown.find((period) => period.id === activeId) ?? shown[0];

  // A filter over a few dozen records; the compiler memoizes the component for us.
  const points: HomeMapPoint[] = battles
    .filter((battle) => battle.startYear >= active.startYear && battle.startYear <= active.endYear)
    .map((battle, index) => ({ id: battle.id, coordinates: battle.coordinates, kind: battle.kind, order: index }));

  return (
    <div className="hp-preview">
      <div className="hp-preview-controls" role="group" aria-label="Choose a period to preview">
        {shown.map((period) => (
          <button
            key={period.id}
            type="button"
            className={period.id === active.id ? "is-active" : ""}
            aria-pressed={period.id === active.id}
            onClick={() => setActiveId(period.id)}
          >
            {period.shortName}
          </button>
        ))}
      </div>

      <div className="hp-preview-figure">
        <HomeMap title={`Battle sites mapped for the ${active.shortName} period`} points={points} />
        {points.length === 0 && (
          <p className="hp-preview-empty" role="status">
            No battles are mapped for this period yet. {active.name} is {active.status === "planned" ? "planned" : "in progress"}.
          </p>
        )}
      </div>

      <div className="hp-preview-footer">
        <p aria-live="polite">
          <strong>{active.name}</strong>
          <span>{points.length > 0 ? `${points.length} battle${points.length === 1 ? "" : "s"} mapped` : "Nothing mapped yet"}</span>
        </p>
        <Link
          href={atlasHref(points.length > 0 ? { year: active.representativeYear, ...(active.focus ? { location: active.focus.location, zoom: active.focus.zoom } : {}) } : {})}
          className="hp-button hp-button-primary"
        >
          Open the full atlas <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
