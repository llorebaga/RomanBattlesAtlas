import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info, MapPin } from "lucide-react";
import { PrimaryNavigation } from "@/components/home/PrimaryNavigation";
import { HomepageFooter } from "@/components/home/HomepageFooter";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { SourceList } from "@/components/battles/SourceList";
import { figures, getFigure, isMapped } from "@/data/figures";
import { relationColor, relationsFor } from "@/data/figureRelations";
import { battles } from "@/data/battles";
import type { Battle } from "@/types/history";
import { getPeriod } from "@/data/periods";
import { factionColor, getFactionInfo } from "@/data/factions";
import { atlasHref } from "@/lib/atlasLinks";
import { formatHistoricalYear, lifespan } from "@/lib/historicalDates";

// Only the mapped figures get a page. A signpost has nothing behind it to show,
// and generating an empty page for one would be the thing this atlas avoids.
export function generateStaticParams() {
  return figures.filter(isMapped).map((figure) => ({ slug: figure.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const figure = getFigure((await params).slug);
  return figure ? { title: figure.name, description: figure.knownFor } : {};
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const figure = getFigure((await params).slug);
  if (!figure || !isMapped(figure)) notFound();

  // In the order the atlas meets them, not the order they were listed.
  const fought = figure.battleSlugs
    .map((slug) => battles.find((battle) => battle.slug === slug))
    .filter((battle): battle is Battle => Boolean(battle))
    .sort((a, b) => a.startYear - b.startYear);
  const period = getPeriod(figure.periodId);
  // Their own corner of the connections chart, in the order the atlas records it.
  const connections = relationsFor(figure.slug);

  return (
    <>
      <PrimaryNavigation />
      <main className="hp hp-doc" id="main">
        <header className="hp-doc-head">
          <p className="hp-eyebrow">
            <span className="power-swatch figure-swatch" aria-hidden="true" style={{ background: factionColor(figure.faction) }} />
            {getFactionInfo(figure.faction)?.name ?? "Rome"}
          </p>
          <h1>{figure.name}</h1>
          <p className="figure-meta">
            {figure.fullName && figure.fullName !== figure.name ? <>{figure.fullName} · </> : null}
            {figure.title} · {lifespan(figure)} <EvidenceBadge certainty={figure.lifeCertainty} compact />
          </p>
          <p className="hp-hero-lede">{figure.knownFor}</p>
        </header>

        <section aria-labelledby="account">
          <h2 id="account">The account</h2>
          {figure.description.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
        </section>

        <section aria-labelledby="battles">
          <h2 id="battles">
            Battles on this map <span className="hp-years">{fought.length}</span>
          </h2>
          <ul className="figure-battles">
            {fought.map((battle) => (
              <li key={battle.slug}>
                <Link href={`/battles/${battle.slug}`}>
                  <strong>{battle.name}</strong>
                  <span className="figure-battle-meta">
                    {battle.displayDate} · <MapPin size={13} aria-hidden="true" /> {battle.location}
                  </span>
                  <span>{battle.result}</span>
                </Link>
                <Link
                  className="hp-card-action"
                  href={atlasHref({ year: battle.startYear, campaign: battle.war, battle: battle.slug })}
                >
                  Open the atlas in {formatHistoricalYear(battle.startYear)}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {connections.length > 0 && (
          <section aria-labelledby="connections">
            <h2 id="connections">
              Connected to <span className="hp-years">{connections.length}</span>
            </h2>
            <ul className="figure-connections">
              {connections.map((relation) => {
                const outgoing = relation.from === figure.slug;
                const other = getFigure(outgoing ? relation.to : relation.from);
                if (!other) return null;
                const name = isMapped(other)
                  ? <Link href={`/figures/${other.slug}`}><strong>{other.name}</strong></Link>
                  : <strong>{other.name}</strong>;
                return (
                  <li key={`${relation.from}-${relation.to}-${relation.kind}`}>
                    <p className="relation-claim">
                      <i className="ct-dot" aria-hidden="true" style={{ background: relationColor(relation.kind) }} />
                      {outgoing ? <>{relation.label} {name}</> : <>{name} {relation.label} them</>}
                      <EvidenceBadge certainty={relation.certainty} compact />
                    </p>
                    <p>{relation.note}</p>
                  </li>
                );
              })}
            </ul>
            <p className="hp-section-more">
              <Link href="/figures/connections" className="hp-card-action">See all of them on the timeline</Link>
            </p>
          </section>
        )}

        {figure.uncertaintyNotes.length > 0 && (
          <section aria-labelledby="uncertain">
            <h2 id="uncertain">What remains uncertain</h2>
            <ul className="figure-caveats">
              {figure.uncertaintyNotes.map((note) => (
                <li key={note}><Info size={15} aria-hidden="true" /> {note}</li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="sources">
          <h2 id="sources">Sources</h2>
          <SourceList title="Ancient testimony" ids={figure.ancientSourceIds} />
          <SourceList title="Modern scholarship" ids={figure.modernSourceIds} />
        </section>

        <p className="hp-section-more">
          <Link href="/figures" className="hp-card-action"><ArrowLeft size={15} aria-hidden="true" /> All figures</Link>
          {period ? <> · <Link href="/#periods" className="hp-card-action">{period.name}</Link></> : null}
        </p>
      </main>
      <HomepageFooter />
    </>
  );
}
