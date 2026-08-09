import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryNavigation } from "@/components/home/PrimaryNavigation";
import { HomepageFooter } from "@/components/home/HomepageFooter";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { ConnectionChart } from "@/components/figures/ConnectionChart";
import { relations, RELATION_KINDS } from "@/data/figureRelations";
import { getFigure, isMapped } from "@/data/figures";
import { lifespan } from "@/lib/historicalDates";

export const metadata: Metadata = {
  title: "Connections",
  description:
    "How the figures of the Roman Campaign Atlas were related — by blood, marriage and adoption, by service, by rivalry, and on the battlefield.",
  alternates: { canonical: "/figures/connections" },
};

/** A name that links when the atlas has a page for the person, and does not when it has none. */
function FigureName({ slug }: { slug: string }) {
  const figure = getFigure(slug);
  if (!figure) return <strong>{slug}</strong>;
  const label = <strong>{figure.name}</strong>;
  return isMapped(figure) ? <Link href={`/figures/${figure.slug}`}>{label}</Link> : label;
}

export default function ConnectionsPage() {
  return (
    <>
      <PrimaryNavigation />
      <main className="hp hp-doc" id="main">
        <header className="hp-doc-head">
          <p className="hp-eyebrow">Figures</p>
          <h1>How they were connected</h1>
          <p className="hp-hero-lede">
            The Republic was run by a few dozen families for four centuries, and it shows. Marius married Caesar&rsquo;s
            aunt. The man who burned Carthage was the son of the victor of Pydna and the adopted grandson of the man who
            beat Hannibal. Sulla learned his trade as Marius&rsquo; quaestor. Every link below is between two people this
            atlas already holds, and each one carries its evidence grade — because a marriage in the record and an
            anecdote told at dinner are not the same kind of fact.
          </p>
        </header>

        <ConnectionChart />

        {RELATION_KINDS.map(({ kind, title, blurb }) => {
          const entries = relations.filter((relation) => relation.kind === kind);
          if (entries.length === 0) return null;
          return (
            <section key={kind} aria-labelledby={`kind-${kind}`}>
              <h2 id={`kind-${kind}`}>
                {title} <span className="hp-years">{entries.length}</span>
              </h2>
              <p>{blurb}</p>
              <ul className="relation-list">
                {entries.map((relation) => {
                  const from = getFigure(relation.from);
                  const to = getFigure(relation.to);
                  return (
                    <li key={`${relation.from}-${relation.to}-${relation.label}`}>
                      <p className="relation-claim">
                        <FigureName slug={relation.from} /> {relation.label} <FigureName slug={relation.to} />
                        <EvidenceBadge certainty={relation.certainty} compact />
                      </p>
                      {from && to && (
                        <p className="relation-dates">
                          {lifespan(from)} · {lifespan(to)}
                        </p>
                      )}
                      <p>{relation.note}</p>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        <p className="hp-section-more">
          <Link href="/figures" className="hp-card-action">All figures</Link> ·{" "}
          <Link href="/" className="hp-card-action">Back to the atlas home</Link>
        </p>
      </main>
      <HomepageFooter />
    </>
  );
}
