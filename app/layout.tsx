import type { Metadata } from "next";
import { Geist, Geist_Mono, Marcellus } from "next/font/google";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const marcellus = Marcellus({ variable: "--font-marcellus", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://roman-campaign-atlas.example"),
  title: { default: "Roman Campaign Atlas", template: "%s · Roman Campaign Atlas" },
  description: "An evidence-led interactive atlas of Roman military campaigns, beginning with the First Punic War.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Roman Campaign Atlas",
    description: "Explore the First Punic War, 264–241 BCE, through an evidence-led interactive map.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Roman Campaign Atlas map of the western Mediterranean" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable} ${marcellus.variable}`}>{children}</body></html>;
}
