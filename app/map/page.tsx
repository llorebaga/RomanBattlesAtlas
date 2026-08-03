import type { Metadata } from "next";
import { HistoricalMap } from "@/components/map/HistoricalMap";

export const metadata: Metadata = { title: "Campaign map", description: "Explore the First Punic War year by year across the western Mediterranean." };
export default function MapPage() { return <HistoricalMap />; }
