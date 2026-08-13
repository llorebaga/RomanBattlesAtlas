import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryNavigation } from "@/components/home/PrimaryNavigation";
import { HomepageFooter } from "@/components/home/HomepageFooter";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { ConnectionTimeline } from "@/components/figures/ConnectionTimeline";
import { relations, RELATION_KINDS } from "@/data/figureRelations";
import { figures, getFigure, isMapped } from "@/data/figures";
import { battles } from "@/data/battles";
import { periods } from "@/data/periods";
import { factionColor } from "@/data/factions";
import { buildConnectionChart } from "@/lib/connectionLayout";
import { lifespan, TIMELINE_END_YEAR } from "@/lib/historicalDates";

export const metadata: Metadata = {
  title: "Connections",
  description:
    "How the figures of the Roman Campaign Atlas were related — by blood, marriage and adoption, by service, by rivalry, and on the battlefield, drawn on the timeline they lived on.",
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
  // Everyone whose life ends inside the mapped period. The five emperors are
  // left off for the same reason they carry no battles: the atlas stops at the
  // Ides of March, and a timeline running to Constantine would squeeze four
  // centuries of Republic into its first inch to make room for men it cannot
  // draw a single campaign for.
  const onChart = figures.filter((figure) => figure.diedYear <= TIMELINE_END_YEAR);

  const chart = buildConnectionChart({
    figures: onChart.map((figure) => ({
      slug: figure.slug,
      name: figure.name,
      title: figure.title,
      faction: figure.faction,
      color: factionColor(figure.faction),
      bornYear: figure.bornYear,
      diedYear: figure.diedYear,
      activeFrom: figure.activeFrom,
      activeTo: figure.activeTo,
      battleSlugs: figure.battleSlugs,
      lifespan: lifespan(figure),
      knownFor: figure.knownFor,
      mapped: isMapped(figure),
    })),
    relations,
    battles: battles.map((battle) => ({ slug: battle.slug, name: battle.name, startYear: battle.startYear })),
    bands: periods.map((period) => ({
      id: period.id,
      shortName: period.shortName,
      startYear: period.startYear,
      endYear: period.endYear,
    })),
  });

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
            beat Hannibal. Sulla learned his trade as Marius&rsquo; quaestor. Below, all of them on the timeline they
            actually lived on — Rome above the line, the powers she fought below it, and every connection drawn at the
            year it belongs to.
          </p>
        </header>

        <ConnectionTimeline chart={chart} kinds={RELATION_KINDS} />

        <section aria-labelledby="reading">
          <h2 id="reading">Reading it</h2>
          <ul className="hp-doc-list">
            <li>Each bar is one life, left to right. The solid part is the years that person mattered militarily; the pale part is the rest of it.</li>
            <li>Colour is the side they fought for, the same colour the atlas paints their territory. Sulla, Pompey and Labienus are indigo and Caesar is dark red because from 88 the map has to draw Romans fighting Romans.</li>
            <li>A line is a connection, coloured by kind and dashed where the evidence is weaker than attested. The dot on it marks the year: filled where a source gives one, open where the chart has placed it in the years the two of them overlapped.</li>
            <li>Where two people met in a battle this atlas holds, the line is anchored to that battle and the panel links to it.</li>
          </ul>
        </section>

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
