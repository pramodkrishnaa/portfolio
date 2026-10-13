import CloneNav from "@/components/tech/clone/nav";
import CloneChrome from "@/components/tech/clone/chrome";
import CloneHero from "@/components/tech/clone/hero";
import CloneProblem from "@/components/tech/clone/problem";
import CloneBenefits from "@/components/tech/clone/benefits";
import CloneRepoCTA from "@/components/tech/clone/repo-cta";
import CloneShowcase from "@/components/tech/clone/showcase";
import ClonePricing from "@/components/tech/clone/pricing";
import CloneFAQ from "@/components/tech/clone/faq";
import CloneOutro from "@/components/tech/clone/outro";

export default function TechWorld() {
  return (
    <main className="bg-paper text-ink">
      <CloneNav />
      <CloneChrome />
      <CloneHero />
      <CloneProblem />
      <CloneBenefits />
      <CloneRepoCTA />
      <CloneShowcase />
      <ClonePricing />
      <CloneFAQ />
      <CloneOutro />
    </main>
  );
}
