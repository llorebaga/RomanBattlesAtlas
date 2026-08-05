import type { Metadata } from "next";
import { Geist, Geist_Mono, Marcellus } from "next/font/google";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const marcellus = Marcellus({ variable: "--font-marcellus", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://llorebaga.github.io/RomanBattlesAtlas"),
  title: { default: "Roman Campaign Atlas — Interactive Map of Roman Wars and Battles", template: "%s · Roman Campaign Atlas" },
  description:
    "Explore Roman campaigns, battles, armies, fleets, and changing frontiers through an interactive historical map grounded in ancient evidence and modern scholarship.",
  applicationName: "Roman Campaign Atlas",
  keywords: ["Roman history", "Roman army", "Punic Wars", "historical atlas", "interactive map", "ancient warfare", "Hannibal", "Roman Republic"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    siteName: "Roman Campaign Atlas",
    type: "website",
    title: "Roman Campaign Atlas — Interactive Map of Roman Wars and Battles",
    description: "An evidence-led interactive atlas of Roman campaigns, battles, fleets, and changing frontiers.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Roman Campaign Atlas map of the Mediterranean" }],
  },
  twitter: { card: "summary_large_image", title: "Roman Campaign Atlas", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable} ${marcellus.variable}`}>{children}</body></html>;
}
