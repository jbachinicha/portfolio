import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { HireHero } from "@/components/HireHero";
import { Metrics } from "@/components/Metrics";
import { Pillars } from "@/components/Pillars";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { site } from "@/content/site";
import { ogImagePath } from "@/lib/ogImage";

const title = "Hire a Workflow Automation Developer";
const description = `${site.fullName}, ${site.role}. Process automation, report streamlining, AI customer support systems and tool integrations for small teams.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hire/" },
  openGraph: {
    title: `${title} | ${site.fullName}`,
    siteName: site.fullName,
    description,
    type: "website",
    url: "/hire/",
    images: [{ url: ogImagePath, width: 1200, height: 630, alt: site.role }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.fullName}`,
    description,
    images: [ogImagePath],
  },
};

export default function Hire() {
  return (
    <>
      <Nav variant="hire" />
      <main>
        <HireHero />
        <SectionDivider from="primary" to="paper" shape="wave" layered />
        <Metrics />
        <SectionDivider from="paper" to="sheet" shape="curve" />
        <Pillars />
        <Process />
        <SectionDivider from="sheet" to="paper" shape="slant" />
        <Projects />
        <SectionDivider from="paper" to="primary" shape="triangle" />
        <Contact
          title="Tell me the task nobody wants to do"
          lead="Send me the workflow: the spreadsheet, the inbox, the report, the ticket queue. I will tell you honestly whether it is worth automating, and what it would take."
          subject="Project inquiry"
        />
      </main>
      <Footer />
    </>
  );
}
