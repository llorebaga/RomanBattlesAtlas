import type { Metadata } from "next";
import { HistoricalMap } from "@/components/map/HistoricalMap";

export const metadata: Metadata = {
  title: "Campaign map",
  description: "Explore Rome's wars year by year across the Mediterranean, from the First Punic War to Cynoscephalae.",
  alternates: { canonical: "/atlas" },
};

// Kept so links published before the atlas moved to /atlas keep working. Same
// component, same deep-link handling.
export default function MapPage() {
  return <HistoricalMap />;
}
