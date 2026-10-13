import type { Metadata } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Consent } from "@/components/Consent";
import { FluidCursor } from "@/components/FluidCursor";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/siteUrl";

// Headlines: a sturdy, neutral grotesque that holds up at poster sizes.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

// Body copy: plain, slightly narrow, comfortable at 16–18px.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
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
      className={`${archivo.variable} ${instrument.variable}`}
    >
      <body className="antialiased">
        <Consent />
        <FluidCursor />
        {children}
      </body>
    </html>
  );
}
