import Link from "next/link";
import { ArrowRight, Compass, Map, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="home-page">
      <nav className="home-nav"><span className="brand-mark">R</span><strong>ROMAN CAMPAIGN ATLAS</strong><span>AN EVIDENCE-LED HISTORICAL ATLAS</span></nav>
      <section className="home-hero">
        <div className="home-copy"><p className="eyebrow">VOLUME I · FIRST PUNIC WAR</p><h1>Follow a republic<br />across the sea.</h1><p>Explore twenty-four years of campaigns, fleets, sieges, and battles across the western Mediterranean—without mistaking reconstruction for certainty.</p><Link href="/map" className="home-cta">Open the campaign map <ArrowRight size={18} /></Link><div className="home-stats"><div><strong>24</strong><span>campaign years</span></div><div><strong>13</strong><span>principal events</span></div><div><strong>4</strong><span>evidence levels</span></div></div></div>
        <div className="home-visual" aria-hidden="true"><div className="med-orbit orbit-one" /><div className="med-orbit orbit-two" /><div className="med-orbit orbit-three" /><div className="home-compass"><Compass size={74} strokeWidth={0.7} /><span>264</span><small>BCE</small></div><span className="place-label sicily">SICILY</span><span className="place-label carthage">CARTHAGE</span><span className="place-label rome">ROME</span><i className="route-line route-a" /><i className="route-line route-b" /></div>
      </section>
      <section className="home-principles"><div><Map /><h2>Geographic</h2><p>A real modern basemap anchors every historical overlay.</p></div><div><ShieldCheck /><h2>Transparent</h2><p>Every route and location carries an evidence classification.</p></div><div><span className="principle-year">−260</span><h2>Chronological</h2><p>Move through the conflict one campaign year at a time.</p></div></section>
    </main>
  );
}
