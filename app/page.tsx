import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { battles } from "@/data/battles";
import { exploreOptions, featuredBattleSlugs } from "@/data/homepage";
import { FEATURED_CAMPAIGN_ID, getCampaign } from "@/data/campaignIndex";
import { atlasHref } from "@/lib/atlasLinks";
import { allCampaignCoverage, allPeriodCoverage, campaignCoverage } from "@/lib/coverage";
import { PrimaryNavigation } from "@/components/home/PrimaryNavigation";
import { HomepageHero } from "@/components/home/HomepageHero";
import { ExploreOptionCard } from "@/components/home/ExploreOptionCard";
import { HistoricalPeriodCard } from "@/components/home/HistoricalPeriodCard";
import { FeaturedCampaign } from "@/components/home/FeaturedCampaign";
import { CampaignCard } from "@/components/home/CampaignCard";
import { BattleCard } from "@/components/home/BattleCard";
import { HistoricalTimeline } from "@/components/home/HistoricalTimeline";
import { AtlasPreview } from "@/components/home/AtlasPreview";
import { EvidenceLegend } from "@/components/home/EvidenceLegend";
import { CoverageStatus } from "@/components/home/CoverageStatus";
import { HomepageFooter } from "@/components/home/HomepageFooter";

export const metadata: Metadata = {
  title: "Roman Campaign Atlas — Interactive Map of Roman Wars and Battles",
  description:
    "Explore Roman campaigns, battles, armies, fleets, and changing frontiers through an interactive historical map grounded in ancient evidence and modern scholarship.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Roman Campaign Atlas — Interactive Map of Roman Wars and Battles",
    description:
      "Explore Roman campaigns, battles, armies, fleets, and changing frontiers through an interactive historical map grounded in ancient evidence and modern scholarship.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  const periodCoverage = allPeriodCoverage();
  const campaigns = allCampaignCoverage();
  const featuredEntry = getCampaign(FEATURED_CAMPAIGN_ID);
  const featured = featuredEntry ? campaignCoverage(featuredEntry) : undefined;
  const featuredBattles = featuredBattleSlugs
    .map((slug) => battles.find((battle) => battle.slug === slug))
    .filter((battle): battle is NonNullable<typeof battle> => Boolean(battle));

  return (
    <>
      <PrimaryNavigation />
      <main className="hp" id="main">
        <HomepageHero />

        <section className="hp-section" id="explore" aria-labelledby="hp-explore-title">
          <header className="hp-section-head">
            <h2 id="hp-explore-title">Choose how to explore</h2>
            <p>Four ways in. Every one of them opens the same map at the moment you asked for.</p>
          </header>
          <div className="hp-explore-grid">
            {exploreOptions.map((option) => <ExploreOptionCard key={option.id} option={option} />)}
          </div>
        </section>

        <section className="hp-section hp-section-alt" id="periods" aria-labelledby="hp-periods-title">
          <header className="hp-section-head">
            <h2 id="hp-periods-title">Explore by historical period</h2>
            <p>
              Roman warfare spans a thousand years. The middle Republic is mapped in detail; the rest of the arc is
              laid out here so you can see where the atlas is going.
            </p>
          </header>
          <div className="hp-period-grid">
            {periodCoverage.map((coverage) => <HistoricalPeriodCard key={coverage.period.id} coverage={coverage} />)}
          </div>
        </section>

        {featured && <FeaturedCampaign coverage={featured} />}

        <section className="hp-section" id="campaigns" aria-labelledby="hp-campaigns-title">
          <header className="hp-section-head">
            <h2 id="hp-campaigns-title">Campaigns</h2>
            <p>Complete wars, from their causes to their consequences. Planned campaigns are marked as such and stay inert until their data exists.</p>
          </header>
          <div className="hp-campaign-grid">
            {campaigns.map((coverage) => <CampaignCard key={coverage.campaign.id} coverage={coverage} />)}
          </div>
        </section>

        <section className="hp-section hp-section-alt" id="battles" aria-labelledby="hp-battles-title">
          <header className="hp-section-head">
            <h2 id="hp-battles-title">Decisive battles</h2>
            <p>Read the full account, or open the battle in the atlas in the year it was fought.</p>
          </header>
          <div className="hp-battle-grid">
            {featuredBattles.map((battle) => <BattleCard key={battle.id} battle={battle} />)}
          </div>
          <p className="hp-section-more">
            <Link href="/battles" className="hp-card-action">All {battles.length} mapped battles <ArrowRight size={15} aria-hidden="true" /></Link>
          </p>
        </section>

        <section className="hp-section" id="timeline" aria-labelledby="hp-timeline-title">
          <header className="hp-section-head">
            <h2 id="hp-timeline-title">A thousand years of Roman war</h2>
            <p>The long view. Select a mapped moment to open the atlas there.</p>
          </header>
          <HistoricalTimeline />
        </section>

        <section className="hp-section hp-section-alt" id="preview" aria-labelledby="hp-preview-title">
          <header className="hp-section-head">
            <h2 id="hp-preview-title">See it before you enter</h2>
            <p>A light preview of the atlas: pick a broad period and see what is mapped.</p>
          </header>
          <AtlasPreview />
        </section>

        <section className="hp-section" id="methodology" aria-labelledby="hp-method-title">
          <header className="hp-section-head">
            <h2 id="hp-method-title">History without false certainty</h2>
            <p>
              Ancient evidence is incomplete. Roman Campaign Atlas distinguishes documented facts from probable,
              disputed, and speculative reconstructions — and shows you which is which, everywhere.
            </p>
          </header>
          <EvidenceLegend />
          <p className="hp-section-more">
            <Link href="/methodology" className="hp-card-action">How the atlas handles evidence <ArrowRight size={15} aria-hidden="true" /></Link>
          </p>
        </section>

        <section className="hp-section hp-section-alt" id="coverage" aria-labelledby="hp-coverage-title">
          <header className="hp-section-head">
            <h2 id="hp-coverage-title">What is covered so far</h2>
            <p>An honest ledger. The atlas is a work in progress and says so.</p>
          </header>
          <CoverageStatus />
        </section>

        <section className="hp-closing" aria-labelledby="hp-closing-title">
          <h2 id="hp-closing-title">Enter the Roman world</h2>
          <p>Choose a year, follow a campaign, or begin with one decisive battle.</p>
          <div className="hp-hero-actions">
            <Link href={atlasHref()} className="hp-button hp-button-primary hp-button-lg">
              Open the Atlas <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href={atlasHref({ year: -264, campaign: "first-punic" })} className="hp-button hp-button-ghost hp-button-lg">
              Explore the First Punic War
            </Link>
          </div>
        </section>
      </main>
      <HomepageFooter />
    </>
  );
}
