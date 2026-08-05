import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PrimaryNavigation } from "@/components/home/PrimaryNavigation";
import { HomepageFooter } from "@/components/home/HomepageFooter";
import { EvidenceLegend } from "@/components/home/EvidenceLegend";
import { sources } from "@/data/sources";
import { atlasHref } from "@/lib/atlasLinks";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How Roman Campaign Atlas separates attested evidence from probable, disputed, and speculative reconstruction, and how it marks the annalistic tradition of early Rome.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  const ancient = sources.filter((source) => source.kind === "ancient");
  const modern = sources.filter((source) => source.kind === "modern");

  return (
    <>
      <PrimaryNavigation />
      <main className="hp hp-doc" id="main">
        <header className="hp-doc-head">
          <p className="hp-eyebrow">Methodology</p>
          <h1>History without false certainty</h1>
          <p className="hp-hero-lede">
            Ancient evidence is incomplete. Rather than smoothing that over, the atlas labels every route, coordinate,
            and force estimate with how well it is supported — so you always know whether you are looking at a fact or
            a reconstruction.
          </p>
        </header>

        <section aria-labelledby="levels">
          <h2 id="levels">The five grades</h2>
          <EvidenceLegend />
        </section>

        <section aria-labelledby="early-rome">
          <h2 id="early-rome">Early Rome, and why it is graded differently</h2>
          <p>
            For the Punic and Macedonian wars there is Polybius, writing within living memory of some of it and with
            access to people who were there. For the early Republic there is nothing of the kind. Livy and Dionysius of
            Halicarnassus were writing in the age of Augustus about events four and five centuries earlier, from
            annalistic material that had already passed through the hands of families with reputations to protect and
            of Greek historians with literary models to satisfy. Rome&rsquo;s own records had been thin to begin with,
            and the tradition itself held that much of what existed was lost when the Gauls burned the city.
          </p>
          <p>
            So the atlas maps the Republic from 509 BCE, and marks that material <strong>traditional</strong> rather
            than fitting it into the four grades of evidence. The distinction matters: <em>speculative</em> says the
            atlas has reconstructed something to make a real sequence followable, while <em>traditional</em> says this
            is what Rome remembered about itself. Battles from these centuries keep their traditional dates because
            those dates are how the events are referred to, not because the year is secure — several are demonstrably
            duplicated within the annalistic record, and the sceptical view that a good deal of the fifth century is
            reconstruction rather than history is a serious one.
          </p>
          <p>
            The regal period before 509 is not mapped at all. The wars of Romulus and his successors are foundation
            myth, and drawing them would put the first invented thing on the map.
          </p>
        </section>

        <section aria-labelledby="what-we-do-not-do">
          <h2 id="what-we-do-not-do">What the atlas does not do</h2>
          <ul className="hp-doc-list">
            <li>It does not invent dialogue, weather, precise formations, or undocumented daily movements.</li>
            <li>It does not present a battle coordinate as a surveyed position. Markers are representative areas, with an uncertainty radius.</li>
            <li>It does not draw a march it cannot justify: route waypoints are campaign stages, and each carries its own certainty and sources.</li>
            <li>It does not show ancient frontiers as surveyed lines. Territory zones are schematic areas of control, clipped to the coastline.</li>
            <li>It does not treat literary numbers as audited records. Force and casualty figures are given as ranges, attributed, and labelled.</li>
          </ul>
        </section>

        <section aria-labelledby="borders">
          <h2 id="borders">Frontiers and territory</h2>
          <p>
            Where a frontier is known to have followed a real feature, the map follows that feature: the Ebro for the
            treaty limit in Iberia, the Apennine watershed for Rome&rsquo;s northern edge, the Alpine crest between the
            Gallic peoples. Land held by independent peoples is left uncoloured on purpose — the Celtiberian interior,
            Liguria, Gaul beyond the Loire — because colouring it would be the error.
          </p>
        </section>

        <section aria-labelledby="sources">
          <h2 id="sources">Sources</h2>
          <p>Primary narratives are kept separate from modern scholarship throughout the atlas.</p>
          <div className="hp-doc-columns">
            <div>
              <h3>Ancient testimony</h3>
              <ul className="hp-doc-list">{ancient.map((source) => <li key={source.id}>{source.citation}{source.note ? ` — ${source.note}` : ""}</li>)}</ul>
            </div>
            <div>
              <h3>Modern studies</h3>
              <ul className="hp-doc-list">{modern.map((source) => <li key={source.id}>{source.citation}</li>)}</ul>
            </div>
          </div>
        </section>

        <p className="hp-section-more">
          <Link href={atlasHref()} className="hp-card-action">See it applied in the atlas <ArrowRight size={15} aria-hidden="true" /></Link>
        </p>
      </main>
      <HomepageFooter />
    </>
  );
}
