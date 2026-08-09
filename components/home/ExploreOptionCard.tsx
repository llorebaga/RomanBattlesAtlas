import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ExploreOption } from "@/data/homepage";
import { atlasHref } from "@/lib/atlasLinks";

export function ExploreOptionCard({ option }: { option: ExploreOption }) {
  // Three shapes: the atlas itself, an anchor to a section further down this page,
  // or another route entirely. The last was added for /figures, which is a page
  // rather than a section because there are twenty-seven of them.
  const href = option.target.kind === "atlas"
    ? atlasHref()
    : option.target.kind === "route"
      ? option.target.href
      : `#${option.target.id}`;
  return (
    <Link href={href} className="hp-explore-card">
      <span className="hp-numeral" aria-hidden="true">{option.numeral}</span>
      <h3>{option.title}</h3>
      <p>{option.description}</p>
      <span className="hp-card-action">{option.action} <ArrowRight size={15} aria-hidden="true" /></span>
    </Link>
  );
}
