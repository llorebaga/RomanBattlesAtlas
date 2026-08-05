import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatYearRange } from "@/data/periods";
import type { PeriodCoverage } from "@/lib/coverage";
import { StatusBadge } from "./StatusBadge";

export function HistoricalPeriodCard({ coverage }: { coverage: PeriodCoverage }) {
  const { period, atlasLink, battleCount } = coverage;
  const openLabel = `Explore from ${Math.abs(period.representativeYear)} ${period.representativeYear < 0 ? "BCE" : "CE"}`;

  return (
    <article className={`hp-period-card ${atlasLink ? "" : "is-planned"}`}>
      <header>
        <h3>{period.name}</h3>
        <p className="hp-years">{formatYearRange(period.startYear, period.endYear)}</p>
      </header>
      <p className="hp-period-note">{period.description}</p>
      <footer>
        <StatusBadge status={period.status} />
        {atlasLink ? (
          <Link href={atlasLink} className="hp-card-action">
            {openLabel} <ArrowRight size={15} aria-hidden="true" />
          </Link>
        ) : (
          // No link at all rather than one that leads nowhere.
          <span className="hp-card-note">Not yet mapped</span>
        )}
      </footer>
      {battleCount > 0 && <p className="hp-card-meta">{battleCount} battle{battleCount === 1 ? "" : "s"} on the map</p>}
    </article>
  );
}
