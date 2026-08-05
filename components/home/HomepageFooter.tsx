import Link from "next/link";
import { ATLAS_PATH } from "@/lib/atlasLinks";

export function HomepageFooter() {
  return (
    <footer className="hp-footer">
      <div className="hp-footer-inner">
        <div className="hp-footer-about">
          <p className="hp-footer-brand"><span className="brand-mark" aria-hidden="true">R</span>Roman Campaign Atlas</p>
          <p>An evidence-led interactive map of the wars, campaigns, and changing frontiers of Roman history.</p>
        </div>

        <nav className="hp-footer-links" aria-label="Footer">
          <div>
            <h2>Explore</h2>
            <Link href={ATLAS_PATH}>Atlas</Link>
            <Link href="/#campaigns">Campaigns</Link>
            <Link href="/battles">Battles</Link>
          </div>
          <div>
            <h2>The project</h2>
            <Link href="/methodology">Methodology</Link>
            <Link href="/about">About</Link>
            <a href="https://github.com/llorebaga/RomanBattlesAtlas">Source on GitHub</a>
          </div>
        </nav>

        <div className="hp-footer-credits">
          <p>
            Coastlines from <a href="https://www.naturalearthdata.com/">Natural Earth</a> (public domain). Historical
            content follows Polybius and Livy alongside modern scholarship, cited on each battle page.
          </p>
          <p className="hp-footer-legal">Reconstructions are labelled by evidence level and are not claims of exact certainty.</p>
        </div>
      </div>
    </footer>
  );
}
