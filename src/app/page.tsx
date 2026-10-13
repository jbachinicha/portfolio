import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ToolStrip } from "@/components/ToolStrip";
import { Work } from "@/components/Work";
import { StackSection } from "@/components/StackSection";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <Nav variant="portfolio" />
      <main>
        <Hero />
        <SectionDivider from="primary" to="paper" shape="wave" layered />
        <ToolStrip />
        <SectionDivider from="paper" to="sheet" shape="curve" />
        <Work />
        <SectionDivider from="sheet" to="paper" shape="slant" />
        <StackSection />
        <SectionDivider from="paper" to="sheet" shape="wave" flip />
        <About />
        <SectionDivider from="sheet" to="primary" shape="triangle" />
        <Contact
          title="Say hello"
          lead="A role, a project, or a question about something you saw here: send me a note. For paid projects, there is a page on how I work with clients."
          subject="Hello from your portfolio"
          titleClassName="max-w-[10ch]"
        />
      </main>
      <Footer />
    </>
  );
}
