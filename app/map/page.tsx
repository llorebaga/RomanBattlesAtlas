import type { Metadata } from "next";
import { HistoricalMap } from "@/components/map/HistoricalMap";

export const metadata: Metadata = { title: "Campaign map", description: "Explore Rome's wars year by year across the western Mediterranean, from the First Punic War to Zama." };
export default function MapPage() { return <HistoricalMap />; }
