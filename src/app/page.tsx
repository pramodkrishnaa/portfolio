import Nav from "@/components/site/nav";
import Footer from "@/components/site/footer";
import Hero from "@/components/tech/hero";
import Capabilities from "@/components/tech/capabilities";
import Work from "@/components/tech/work";
import OpenSource from "@/components/tech/open-source";
import Writing from "@/components/tech/writing";
import Contact from "@/components/tech/contact";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export default function TechWorld() {
  return (
    <main>
      <Nav links={navLinks} />
      <Hero />
      <Capabilities />
      <Work />
      <OpenSource />
      <Writing />
      <Contact />
      <Footer />
    </main>
  );
}
