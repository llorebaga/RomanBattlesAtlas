import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { campaignRoutes } from "@/data/campaigns";
import { atlasHref } from "@/lib/atlasLinks";
import { battles } from "@/data/battles";
import { atlasTotals } from "@/lib/coverage";
import { HomeMap, type HomeMapPoint, type HomeMapRoute } from "./HomeMap";

// One march, drawing itself: Hannibal from New Carthage over the Pyrenees, the
// Rhône and the Alps into Apulia. A single line across two-thirds of the frame
// reads better behind a headline than three competing ones did, and it is the
// journey most people already half-know.
//
// The two marks are its ends and nothing else. Earlier versions carried five, of
// which three sat on no line at all — which is the same mismatch, just quieter.
const HERO_ROUTE_ID = "hannibal-march-to-italy";
// Cannae appears as the line reaches it, so the march arrives somewhere rather
// than the destination being there all along waiting for it.
const HERO_MARKS: { slug: string; delaySeconds: number }[] = [
  { slug: "new-carthage", delaySeconds: 0.45 },
  { slug: "cannae", delaySeconds: 2.75 },
];
const HERO_POINTS: HomeMapPoint[] = HERO_MARKS.flatMap(({ slug, delaySeconds }, order) => {
  const battle = battles.find((entry) => entry.slug === slug);
  return battle ? [{ id: battle.id, coordinates: battle.coordinates, kind: battle.kind, order, delaySeconds }] : [];
});

// Taken from the campaign data rather than redrawn: the atlas's route is
// geographically corrected (marches follow land, fleets stay at sea), and the hero
// must not contradict it with a line of its own that cuts across the water.
const HERO_ROUTES: HomeMapRoute[] = (() => {
  const route = campaignRoutes.find((entry) => entry.id === HERO_ROUTE_ID);
  if (!route) return [];
  return [{
    id: route.id,
    color: "var(--hp-roman-red)",
    points: route.points.map((point) => ({ coordinates: point.coordinates, viaSea: point.viaSea })),
  }];
})();

export function HomepageHero() {
  const totals = atlasTotals();

  return (
    <section className="hp-hero" aria-labelledby="hp-hero-title">
      <div className="hp-hero-visual" aria-hidden="true">
        <HomeMap
          title="Hannibal’s march from New Carthage into Italy, drawn across the Mediterranean world"
          bounds={{ west: -11, east: 31, south: 30, north: 48 }}
          points={HERO_POINTS}
          routes={HERO_ROUTES}
          animate
        />
        <div className="hp-hero-scrim" />
      </div>

      <div className="hp-hero-content">
        <p className="hp-eyebrow">From early Rome to Late Antiquity</p>
        <h1 id="hp-hero-title" className="hp-hero-title">Explore the wars<br />that shaped Rome</h1>
        <p className="hp-hero-lede">
          Follow Roman armies and fleets across centuries. Discover campaigns, battles, commanders, and changing
          frontiers through an interactive historical atlas grounded in ancient evidence and modern scholarship.
        </p>
        <div className="hp-hero-actions">
          <Link href={atlasHref()} className="hp-button hp-button-primary hp-button-lg">
            Open the Interactive Atlas <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/#periods" className="hp-button hp-button-ghost hp-button-lg">Choose a Period</Link>
        </div>
        <dl className="hp-hero-stats">
          <div><dt>Mapped battles</dt><dd>{totals.battles}</dd></div>
          <div><dt>Campaigns</dt><dd>{totals.wars}</dd></div>
          <div><dt>Force routes</dt><dd>{totals.routes}</dd></div>
          <div><dt>Evidence levels</dt><dd>4</dd></div>
        </dl>
      </div>
    </section>
  );
}
