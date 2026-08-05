import type { Metadata } from "next";
import { HistoricalMap } from "@/components/map/HistoricalMap";

export const metadata: Metadata = {
  title: "Interactive atlas",
  description: "Move through Roman history year by year: campaigns, fleets, battles, and changing frontiers on one map.",
  alternates: { canonical: "/atlas" },
};

// The atlas reads its opening state from the query string — year, campaign,
// battle, location, zoom, layers — see lib/atlasLinks.ts.
export default function AtlasPage() {
  return <HistoricalMap />;
}
