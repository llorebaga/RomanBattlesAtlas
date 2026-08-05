import Link from "next/link";
import { timelineMilestones } from "@/data/timelineMilestones";
import { atlasHref } from "@/lib/atlasLinks";

const label = (year: number) => (year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`);

// A coarse spine across the whole of Roman history — not a replacement for the
// atlas's year scrubber. Mapped moments are links; the rest are plain markers, so
// nothing promises a view the atlas cannot show.
export function HistoricalTimeline() {
  return (
    <div className="hp-timeline">
      <ol className="hp-timeline-track">
        {timelineMilestones.map((milestone) => {
          const content = (
            <>
              <span className="hp-timeline-year">{label(milestone.year)}</span>
              <span className="hp-timeline-label">{milestone.label}</span>
              <span className="hp-timeline-note">{milestone.note}</span>
            </>
          );
          return (
            <li key={milestone.id} className={milestone.mapped ? "is-mapped" : "is-unmapped"}>
              <span className="hp-timeline-dot" aria-hidden="true" />
              {milestone.mapped ? (
                <Link
                  href={atlasHref({ year: milestone.year, ...(milestone.focus ? { location: milestone.focus.location, zoom: milestone.focus.zoom } : {}) })}
                  className="hp-timeline-entry"
                >
                  {content}
                  <span className="hp-timeline-cue">Open the atlas here</span>
                </Link>
              ) : (
                <div className="hp-timeline-entry">
                  {content}
                  <span className="hp-timeline-cue is-quiet">Not yet mapped</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="hp-figure-note">The atlas currently covers 264 to 196 BCE in detail. Later milestones mark where the project is going.</p>
    </div>
  );
}
