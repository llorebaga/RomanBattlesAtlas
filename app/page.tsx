import type { Metadata } from "next";
import { HistoricalMap } from "@/components/map/HistoricalMap";

export const metadata: Metadata = {
  title: "Campaign map",
  description: "An evidence-led interactive map of Rome's wars, from the First Punic War through Hannibal's war and Zama.",
};

export default function Home() {
  return <HistoricalMap />;
}
