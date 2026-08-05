import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { campaignRoutes } from "@/data/campaigns";
import { atlasHref } from "@/lib/atlasLinks";
import { battles } from "@/data/battles";
import { atlasTotals } from "@/lib/coverage";
import { HomeMap, type HomeMapPoint, type HomeMapRoute } from "./HomeMap";

// A restrained composition: the Mediterranean, a handful of decisive places, and
// two campaign lines. Everything is drawn from the atlas's own data.
const HERO_SLUGS = ["messana", "mylae", "aegates", "cannae", "zama", "cynoscephalae", "new-carthage"];
const HERO_POINTS: HomeMapPoint[] = HERO_SLUGS.flatMap((slug, order) => {
  const battle = battles.find((entry) => entry.slug === slug);
  return battle ? [{ id: battle.id, coordinates: battle.coordinates, order }] : [];
});

// Taken from the campaign data rather than redrawn: the atlas's routes are
// geographically corrected (marches follow land), and the hero must not contradict
// them with a line of its own that cuts across the sea.
const routeById = (id: string, color: string): HomeMapRoute[] => {
  const route = campaignRoutes.find((entry) => entry.id === id);
  return route ? [{ id: route.id, color, points: route.points.map((point) => point.coordinates) }] : [];
};
const HERO_ROUTES: HomeMapRoute[] = [
  ...routeById("hannibal-march-to-italy", "var(--hp-roman-red)"),
  ...routeById("scipio-african-expedition", "var(--hp-bronze)"),
];

export function HomepageHero() {
  const totals = atlasTotals();

  return (
    <section className="hp-hero" aria-labelledby="hp-hero-title">
      <div className="hp-hero-visual" aria-hidden="true">
        <HomeMap
          title="The Mediterranean world, with decisive battles and campaign routes"
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
