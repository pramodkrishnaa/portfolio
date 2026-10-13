import Nav from "@/components/site/nav";
import Footer from "@/components/site/footer";
import LightboxProvider from "@/components/life/lightbox";
import LifeHero from "@/components/life/hero";
import Marquee from "@/components/life/marquee";
import Lookbook from "@/components/life/lookbook";
import Digitals from "@/components/life/digitals";
import Booking from "@/components/life/booking";

export const metadata = {
  title: "Life",
  description: "Boxing, art, motorcycles, summits and film. The other half of the résumé.",
};

const navLinks = [
  { label: "Lookbook", href: "#lookbook" },
  { label: "The File", href: "#file" },
  { label: "Hello", href: "#booking" },
];

export default function LifeWorld() {
  return (
    <LightboxProvider>
      <main>
        <Nav links={navLinks} />
        <LifeHero />
        <Marquee />
        <div id="lookbook">
          <Lookbook />
        </div>
        <div id="file">
          <Digitals />
        </div>
        <Booking />
        <Footer />
      </main>
    </LightboxProvider>
  );
}
