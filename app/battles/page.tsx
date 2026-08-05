import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryNavigation } from "@/components/home/PrimaryNavigation";
import { HomepageFooter } from "@/components/home/HomepageFooter";
import { BattleCard } from "@/components/home/BattleCard";
import { battles } from "@/data/battles";
import { eras } from "@/data/wars";

export const metadata: Metadata = {
  title: "Battles",
  description: "Every battle, siege, and campaign mapped in the Roman Campaign Atlas, grouped by war.",
  alternates: { canonical: "/battles" },
};

export default function BattlesIndexPage() {
  // Grouped by war, in timeline order, straight from the atlas data.
  const groups = eras
    .map((era) => ({ era, entries: battles.filter((battle) => battle.war === era.id) }))
    .filter((group) => group.entries.length > 0);

  return (
    <>
      <PrimaryNavigation />
      <main className="hp hp-doc" id="main">
        <header className="hp-doc-head">
          <p className="hp-eyebrow">Battles</p>
          <h1>Every mapped engagement</h1>
          <p className="hp-hero-lede">
            {battles.length} battles, sieges, and campaign operations, grouped by war. Open a full account, or view any
            of them on the map in the year it was fought.
          </p>
        </header>

        {groups.map(({ era, entries }) => (
          <section key={era.id} aria-labelledby={`war-${era.id}`}>
            <h2 id={`war-${era.id}`}>
              {era.name} <span className="hp-years">{Math.abs(era.startYear)}–{Math.abs(era.endYear)} BCE</span>
            </h2>
            <div className="hp-battle-grid">
              {entries.map((battle) => <BattleCard key={battle.id} battle={battle} />)}
            </div>
          </section>
        ))}

        <p className="hp-section-more"><Link href="/" className="hp-card-action">Back to the atlas home</Link></p>
      </main>
      <HomepageFooter />
    </>
  );
}
