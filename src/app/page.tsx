import Chrome from "@/components/tech/cv/chrome";
import ReadmeDrawer from "@/components/tech/cv/readme-drawer";
import Dive from "@/components/tech/cv/dive";
import SkylineSeam from "@/components/tech/cv/skyline-seam";
import Features from "@/components/tech/cv/features";
import Repo from "@/components/tech/cv/repo";
import Showcase from "@/components/tech/cv/showcase";
import Testimonials from "@/components/tech/cv/testimonials";
import Hire from "@/components/tech/cv/hire";
import Faq from "@/components/tech/cv/faq";
import Outro, { Footer } from "@/components/tech/cv/outro";

export default function TechWorld() {
  return (
    <main className="bg-paper text-ink">
      <Chrome />
      <ReadmeDrawer />
      <Dive />
      <SkylineSeam from="paper" to="ink" />
      <Features />
      <SkylineSeam from="ink" to="paper" />
      <Repo />
      <SkylineSeam from="paper" to="ink" />
      <Showcase />
      <Testimonials />
      <SkylineSeam from="ink" to="paper" />
      <Hire />
      <SkylineSeam from="paper" to="ink" />
      <Faq />
      <Outro />
      <Footer />
    </main>
  );
}
