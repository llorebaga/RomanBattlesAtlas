import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PrimaryNavigation } from "@/components/home/PrimaryNavigation";
import { HomepageFooter } from "@/components/home/HomepageFooter";
import { CoverageStatus } from "@/components/home/CoverageStatus";
import { atlasTotals } from "@/lib/coverage";
import { atlasHref } from "@/lib/atlasLinks";
import { TIMELINE_START_YEAR, TIMELINE_END_YEAR } from "@/lib/historicalDates";
import { formatYearRange } from "@/data/periods";

export const metadata: Metadata = {
  title: "About",
  description: "What Roman Campaign Atlas is, how it is built, and how far it currently reaches.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const totals = atlasTotals();

  return (
    <>
      <PrimaryNavigation />
      <main className="hp hp-doc" id="main">
        <header className="hp-doc-head">
          <p className="hp-eyebrow">About</p>
          <h1>An atlas of Roman warfare</h1>
          <p className="hp-hero-lede">
            Roman Campaign Atlas is an interactive, evidence-led map of the wars, campaigns, battles, armies, fleets,
            and changing frontiers that shaped Roman history. It is a research interface, not a claim to exact
            reconstruction.
          </p>
        </header>

        <section aria-labelledby="scope">
          <h2 id="scope">Scope today</h2>
          <p>
            The atlas covers {totals.wars} campaigns in detail — {totals.battles} mapped battles and sieges, of which{" "}
            {totals.naval} were fought at sea, with {totals.routes} army and fleet routes across{" "}
            {formatYearRange(TIMELINE_START_YEAR, TIMELINE_END_YEAR)}.
            The wider arc of Roman warfare, from the conquest of Italy to the end of the western empire, is laid out on
            the homepage so the gaps are visible rather than hidden.
          </p>
          <CoverageStatus />
        </section>

        <section aria-labelledby="build">
          <h2 id="build">How it is built</h2>
          <ul className="hp-doc-list">
            <li>The map is inline SVG drawn from bundled Natural Earth coastlines — no tile service, and it renders before any JavaScript runs.</li>
            <li>Every battle, route, territory zone, and event is a typed record in the repository, reviewable as data rather than buried in markup.</li>
            <li>Geometry is checked by tests: marching legs must follow land, fleets must stay at sea, and named places must be held by the right power in the right year.</li>
            <li>The basemap carries no modern borders or place names, so all political information on screen is historical.</li>
          </ul>
        </section>

        <section aria-labelledby="contributing">
          <h2 id="contributing">Corrections and additions</h2>
          <p>
            Coordinates, force estimates, and route legs for several engagements still need scholarly review, and each
            is labelled accordingly. Corrections are welcome through the repository.
          </p>
          <p className="hp-section-more">
            <a href="https://github.com/llorebaga/RomanBattlesAtlas" className="hp-card-action">Source on GitHub <ArrowRight size={15} aria-hidden="true" /></a>
          </p>
        </section>

        <p className="hp-section-more">
          <Link href={atlasHref()} className="hp-card-action">Open the atlas <ArrowRight size={15} aria-hidden="true" /></Link>
        </p>
      </main>
      <HomepageFooter />
    </>
  );
}
