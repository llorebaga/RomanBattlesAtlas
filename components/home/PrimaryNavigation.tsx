"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ATLAS_PATH } from "@/lib/atlasLinks";

const LINKS = [
  { href: ATLAS_PATH, label: "Atlas" },
  { href: "/#periods", label: "Periods" },
  { href: "/#campaigns", label: "Campaigns" },
  { href: "/#battles", label: "Battles" },
  { href: "/figures", label: "Figures" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

export function PrimaryNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="hp-nav">
      <div className="hp-nav-inner">
        <Link href="/" className="hp-brand" aria-label="Roman Campaign Atlas, home">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>ROMAN CAMPAIGN ATLAS</span>
        </Link>

        <nav className="hp-nav-links" aria-label="Main">
          {LINKS.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>

        <Link href={ATLAS_PATH} className="hp-button hp-button-primary hp-nav-cta">Open Atlas</Link>

        <button
          type="button"
          className="hp-nav-toggle"
          aria-expanded={open}
          aria-controls="hp-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Kept deliberately short on small screens: the seven sections and one action. */}
      <div id="hp-mobile-nav" className={`hp-nav-mobile ${open ? "open" : ""}`} hidden={!open}>
        <nav aria-label="Main, mobile">
          {LINKS.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        </nav>
        <Link href={ATLAS_PATH} className="hp-button hp-button-primary" onClick={() => setOpen(false)}>Open Atlas</Link>
      </div>
    </header>
  );
}
