import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/siteUrl";

// Headlines: a grotesque with ink traps that stays sturdy at poster sizes.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
  display: "swap",
});

// Body copy: plain, slightly narrow, comfortable at 16–18px.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

// Only used inside the printed run sheet, where monospace is the content.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const description = `${site.role}. Automation, report streamlining, AI customer support systems and tool integrations.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: `${site.fullName} | ${site.role}`,
    template: `%s | ${site.fullName}`,
  },
  description,
  keywords: [
    "full stack developer",
    "automation engineer",
    "workflow automation",
    "AI customer support",
    "API integrations",
    "reporting dashboards",
    "Next.js developer",
  ],
  authors: [{ name: site.fullName }],
  openGraph: {
    title: `${site.fullName} | ${site.role}`,
    description,
    type: "website",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.role }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} | ${site.role}`,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
