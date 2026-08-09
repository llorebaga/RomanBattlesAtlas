import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryNavigation } from "@/components/home/PrimaryNavigation";
import { HomepageFooter } from "@/components/home/HomepageFooter";
import { figures, isMapped } from "@/data/figures";
import { periods, formatYearRange } from "@/data/periods";
import { factionColor } from "@/data/factions";
import { lifespan } from "@/lib/historicalDates";

export const metadata: Metadata = {
  title: "Figures",
  description:
    "The commanders, kings and rebels of the Roman Campaign Atlas — with their dates, the battles they fought, and what the sources cannot settle about them.",
  alternates: { canonical: "/figures" },
};

export default function FiguresIndexPage() {
  const groups = periods
    .map((period) => ({ period, entries: figures.filter((figure) => figure.periodId === period.id) }))
    .filter((group) => group.entries.length > 0);
  const mappedCount = figures.filter(isMapped).length;

  return (
    <>
      <PrimaryNavigation />
      <main className="hp hp-doc" id="main">
        <header className="hp-doc-head">
          <p className="hp-eyebrow">Figures</p>
          <h1>The people on the map</h1>
          <p className="hp-hero-lede">
            {figures.length} commanders, kings and rebels, in the order the atlas meets them. {mappedCount} of them
            fought battles you can open on the map; the rest are signposts to periods still to come, and say so.
          </p>
        </header>

        {groups.map(({ period, entries }) => (
          <section key={period.id} aria-labelledby={`period-${period.id}`}>
            <h2 id={`period-${period.id}`}>
              {period.name} <span className="hp-years">{formatYearRange(period.startYear, period.endYear)}</span>
            </h2>
            <div className="hp-battle-grid">
              {entries.map((figure) => {
                const mapped = isMapped(figure);
                const card = (
                  <>
                    <span className="figure-swatch" aria-hidden="true" style={{ background: factionColor(figure.faction) }} />
                    <h3>{figure.name}</h3>
                    <p className="figure-meta">
                      {figure.title} · {lifespan(figure)}
                    </p>
                    <p>{figure.knownFor}</p>
                    <span className="hp-card-action">
                      {mapped ? `Read the account · ${figure.battleSlugs.length} battles` : "Not yet mapped"}
                    </span>
                  </>
                );
                return mapped ? (
                  <Link key={figure.id} href={`/figures/${figure.slug}`} className="figure-card">
                    {card}
                  </Link>
                ) : (
                  <div key={figure.id} className="figure-card is-unmapped">{card}</div>
                );
              })}
            </div>
          </section>
        ))}

        <p className="hp-section-more"><Link href="/" className="hp-card-action">Back to the atlas home</Link></p>
      </main>
      <HomepageFooter />
    </>
  );
}
