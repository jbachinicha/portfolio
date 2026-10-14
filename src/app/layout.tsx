import type { Metadata } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Consent } from "@/components/Consent";
import { FluidCursor } from "@/components/FluidCursor";
import { site } from "@/content/site";
import { ogImagePath } from "@/lib/ogImage";
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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const facebookAppId: string = site.facebookAppId;

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
    site.fullName,
    "full stack developer",
    "automation engineer",
    "workflow automation",
    "AI customer support",
    "API integrations",
    "reporting dashboards",
    "Next.js developer",
  ],
  authors: [{ name: site.fullName }],
  // `fb:app_id`, only once an App ID is set in site.ts.
  ...(facebookAppId ? { facebook: { appId: facebookAppId } } : {}),
  // Declared by hand so the .ico (for browsers and crawlers that skip SVG) is linked too.
  // Metadata icon URLs are not prefixed with the base path, so it is added here.
  icons: {
    icon: [
      { url: `${basePath}/icon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/favicon.ico`, sizes: "48x48" },
    ],
    apple: { url: `${basePath}/apple-icon.png`, sizes: "180x180" },
  },
  openGraph: {
    title: `${site.fullName} | ${site.role}`,
    siteName: site.fullName,
    description,
    type: "website",
    url: "/",
    images: [{ url: ogImagePath, width: 1200, height: 630, alt: site.role }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} | ${site.role}`,
    description,
    images: [ogImagePath],
  },
};

// Tells search engines who the site is about, by full name. `alternateName` keeps the short form linked.
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.fullName,
    alternateName: [site.short],
    url: `${siteUrl}/`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    alternateName: site.short,
    jobTitle: site.role,
    url: `${siteUrl}/`,
    image: `${siteUrl}/og.png`,
    address: { "@type": "PostalAddress", addressCountry: "PH" },
    sameAs: site.socials.map((s) => s.href),
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Escaped so no value can close the tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <Consent />
        <FluidCursor />
        {children}
      </body>
    </html>
  );
}
