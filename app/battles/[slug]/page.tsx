import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Info, MapPin, ShipWheel, Shield, Swords } from "lucide-react";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { BattleAreaMap } from "@/components/battles/BattleAreaMap";
import { BattleTimeline } from "@/components/battles/BattleTimeline";
import { SourceList } from "@/components/battles/SourceList";
import { battles, getBattle } from "@/data/battles";
import { getEra } from "@/data/wars";
import { factionColor } from "@/data/factions";
import { atlasHref } from "@/lib/atlasLinks";

export function generateStaticParams() { return battles.map((battle) => ({ slug: battle.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const battle = getBattle((await params).slug);
  return battle ? { title: battle.name, description: battle.summary } : {};
}

export default async function BattlePage({ params }: { params: Promise<{ slug: string }> }) {
  const battle = getBattle((await params).slug);
  if (!battle) notFound();
  const isMylae = battle.slug === "mylae";
  const hasRich = !isMylae && Boolean(battle.context || battle.forces || battle.moments || battle.casualties);
  const eraName = getEra(battle.war)?.name ?? "Roman campaigns";
  const uncertaintyNumber = isMylae ? "08" : hasRich ? "06" : "02";
  const sourcesNumber = isMylae ? "09" : hasRich ? "07" : "03";

  return (
    <main className="battle-page">
      <nav className="detail-nav"><Link href={atlasHref({ year: battle.startYear, campaign: battle.war, battle: battle.slug })}><ArrowLeft size={16} /> Campaign map</Link><Link href="/" className="detail-brand">ROMAN CAMPAIGN ATLAS</Link><span>{eraName.toUpperCase()}</span></nav>
      <header className="battle-hero">
        <div className="hero-gridline" aria-hidden="true" />
        <div className="battle-hero-content">
          <div className="battle-hero-kicker"><span>{battle.kind === "naval" ? "Naval engagement" : battle.kind}</span><span>{eraName}</span></div>
          <h1>{battle.name}</h1>
          <div className="battle-hero-meta"><span>{battle.displayDate}</span><span><MapPin size={16} />{battle.location}</span><EvidenceBadge certainty={battle.uncertainty.certainty} /></div>
          <p>{battle.summary}</p>
        </div>
        <div className="hero-seal" aria-hidden="true"><span>{battle.kind === "naval" ? "≋" : "⚔"}</span><small>{Math.abs(battle.startYear)}</small></div>
      </header>
      <div className="battle-content">
        <aside className="battle-rail">
          <div className="rail-block"><span className="eyebrow">BELLIGERENTS</span>{battle.belligerents.map((name, index) => { const enemy = battle.commanders.find((group) => group.faction !== "rome")?.faction ?? "carthage"; const dotColor = factionColor(index === 0 ? "rome" : enemy); return <p key={name}><i style={{ background: dotColor }} />{name}</p>; })}</div>
          <div className="rail-block"><span className="eyebrow">COMMANDERS</span>{battle.commanders.map((group) => <div key={group.faction}><strong>{group.names.join(", ")}</strong><EvidenceBadge certainty={group.certainty} /></div>)}</div>
          <div className="rail-block"><span className="eyebrow">OUTCOME</span><strong>{battle.result}</strong><p>{battle.significance}</p></div>
        </aside>
        <article className="battle-article">
          {isMylae ? <>
            <section><span className="section-number">01</span><div><p className="eyebrow">STRATEGIC CONTEXT</p><h2>A land power learns to fight at sea</h2><p className="lede">{battle.context}</p><p>Mylae should not be read as proof that a single device instantly solved naval warfare. It is better understood as one episode in a larger Roman effort to make its land-war strengths usable aboard ships, while accepting enormous material and human risk.</p></div></section>
            <section className="wide-section"><span className="section-number">02</span><div><p className="eyebrow">THE BATTLE AREA</p><h2>Off the north-eastern Sicilian coast</h2><p>The marker below is a representative offshore location. No surviving source allows an exact fleet track or formation to be plotted.</p><BattleAreaMap battle={battle} /><p className="map-source-note"><Info size={15} /> Geographic uncertainty: approximately {battle.uncertainty.radiusKm} km. {battle.uncertainty.note}</p></div></section>
            <section><span className="section-number">03</span><div><p className="eyebrow">ESTIMATED FORCES</p><h2>Large fleets, uncertain totals</h2><div className="force-estimates">{battle.forces?.map((force) => <div key={force.side}><span className={force.side === "Rome" ? "force-icon rome" : "force-icon carthage"}><ShipWheel size={20} /></span><h3>{force.side}</h3><strong>{force.estimate}</strong><EvidenceBadge certainty={force.certainty} /><p>{force.note}</p></div>)}</div></div></section>
            <section className="wide-section"><span className="section-number">04</span><div><p className="eyebrow">SEQUENCE</p><h2>Critical moments</h2><BattleTimeline moments={battle.moments ?? []} /></div></section>
            <section className="wide-section"><span className="section-number">05</span><div><p className="eyebrow">VISUAL RECONSTRUCTION</p><h2>Scenes awaiting evidence-led illustration</h2><div className="scene-grid">{[["Contact", "The two fleets approach off Mylae", "Wide maritime context"], ["The corvus", "A boarding bridge is deployed", "Mechanism remains debated"], ["Close action", "Marines fight across coupled hulls", "No exact unit positions survive"]].map(([label, title, note], index) => <div className="scene-card" key={label}><div className="scene-art"><span>0{index + 1}</span><ShipWheel size={34} /></div><small>{label}</small><h3>{title}</h3><p>{note}</p></div>)}</div></div></section>
            <section><span className="section-number">06</span><div><p className="eyebrow">WHY IT MATTERED</p><h2>A strategic horizon opened</h2><div className="importance-grid"><div><Shield size={22} /><h3>Operational confidence</h3><p>Rome demonstrated that it could contest coastal sea lanes and protect operations in Sicily.</p></div><div><Swords size={22} /><h3>Boarding as adaptation</h3><p>The victory showed how Roman infantry practice could be transferred to naval combat—at least in favorable circumstances.</p></div><div><ShipWheel size={22} /><h3>Not a final solution</h3><p>Later storms and defeats underline that a single success did not erase Carthage’s naval experience.</p></div></div></div></section>
            <section><span className="section-number">07</span><div><p className="eyebrow">LOSSES</p><h2>Reported, not audited</h2><div className="casualty-table">{battle.casualties?.map((item) => <div key={item.side}><strong>{item.side}</strong><span>{item.estimate}</span><EvidenceBadge certainty={item.certainty} /><small>{item.note}</small></div>)}</div></div></section>
          </> : hasRich ? <>
            <section><span className="section-number">01</span><div><p className="eyebrow">EVENT OVERVIEW</p><h2>{battle.significance}</h2><p className="lede">{battle.summary}</p>{battle.context && <p>{battle.context}</p>}</div></section>
            <section className="wide-section"><span className="section-number">02</span><div><p className="eyebrow">THE BATTLE AREA</p><h2>{battle.location}</h2><p>The marker below is a representative location. Surviving sources rarely allow an exact battle line to be plotted.</p><BattleAreaMap battle={battle} /><p className="map-source-note"><Info size={15} /> Geographic uncertainty: approximately {battle.uncertainty.radiusKm} km. {battle.uncertainty.note}</p></div></section>
            {battle.forces && <section><span className="section-number">03</span><div><p className="eyebrow">ESTIMATED FORCES</p><h2>Reported strengths, uncertain totals</h2><div className="force-estimates">{battle.forces.map((force) => <div key={force.side}><span className={force.side === "Rome" ? "force-icon rome" : "force-icon carthage"}><Swords size={20} /></span><h3>{force.side}</h3><strong>{force.estimate}</strong><EvidenceBadge certainty={force.certainty} />{force.note && <p>{force.note}</p>}</div>)}</div></div></section>}
            {battle.moments && <section className="wide-section"><span className="section-number">04</span><div><p className="eyebrow">SEQUENCE</p><h2>Critical moments</h2><BattleTimeline moments={battle.moments} /></div></section>}
            {battle.casualties && <section><span className="section-number">05</span><div><p className="eyebrow">LOSSES</p><h2>Reported, not audited</h2><div className="casualty-table">{battle.casualties.map((item) => <div key={item.side}><strong>{item.side}</strong><span>{item.estimate}</span><EvidenceBadge certainty={item.certainty} />{item.note && <small>{item.note}</small>}</div>)}</div></div></section>}
          </> : <section><span className="section-number">01</span><div><p className="eyebrow">EVENT OVERVIEW</p><h2>{battle.significance}</h2><p className="lede">{battle.summary}</p><BattleAreaMap battle={battle} /></div></section>}
          <section className="uncertainty-section"><span className="section-number">{uncertaintyNumber}</span><div><p className="eyebrow">EVIDENCE REGISTER</p><h2>What remains uncertain</h2><ul>{battle.uncertaintyNotes.map((note) => <li key={note}>{note}</li>)}</ul><p className="method-note">This page separates surviving testimony from modern reconstruction. It does not invent precise tracks, dialogue, weather, or unit positions.</p></div></section>
          <section className="sources-section"><span className="section-number">{sourcesNumber}</span><div><p className="eyebrow">FURTHER READING</p><h2>Sources</h2><div className="sources-grid"><SourceList title="Ancient testimony" ids={battle.ancientSourceIds} /><SourceList title="Modern studies" ids={battle.modernSourceIds} /></div></div></section>
        </article>
      </div>
      <nav className="neighbor-events" aria-label="Neighboring events">
        {battle.previousSlug ? <Link href={`/battles/${battle.previousSlug}`}><ArrowLeft size={17} /><span><small>Previous event</small>{getBattle(battle.previousSlug)?.name}</span></Link> : <span />}
        <Link href={atlasHref({ year: battle.startYear, campaign: battle.war, battle: battle.slug })} className="back-map">Return to campaign map</Link>
        {battle.nextSlug ? <Link href={`/battles/${battle.nextSlug}`}><span><small>Next event</small>{getBattle(battle.nextSlug)?.name}</span><ArrowRight size={17} /></Link> : <span />}
      </nav>
    </main>
  );
}
