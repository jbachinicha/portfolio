import { Backdrop } from "@/components/Backdrop";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ToolStrip } from "@/components/ToolStrip";
import { Metrics } from "@/components/Metrics";
import { Pillars } from "@/components/Pillars";
import { StackSection } from "@/components/StackSection";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <ToolStrip />
        <Metrics />
        <Pillars />
        <StackSection />
        <Process />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
