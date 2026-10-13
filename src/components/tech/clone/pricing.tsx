import { TbArrowRight, TbCheck } from "react-icons/tb";
import Seam from "./seam";
import { PERSONAL_INFO as P } from "@/content/site";

const WAYS = [
  {
    name: "FULL-TIME",
    tag: "Senior roles",
    price: "Open to roles",
    features: ["Forward-deployed + Agentic AI engineering", "Scope ambiguous needs with the C-suite", "Ship on zero-trust Kubernetes", "Air-gapped, sovereign delivery"],
  },
  {
    name: "CONSULTING",
    tag: "Scoped projects",
    price: "Let's scope it",
    features: ["Architecture + build, end to end", "Agents, RAG, or air-gapped LLMs", "A system you actually own", "Handover docs, no lock-in"],
    featured: true,
  },
];

/** Engagement types, in the two-edition card layout. Paper panel. */
export default function ClonePricing() {
  return (
    <>
      <Seam tone="paper" />
      <section id="pricing" className="bg-paper px-6 py-28 text-ink sm:px-10 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            Two ways in.
            <br />
            One standard.
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-ink/15 bg-ink/15 md:grid-cols-2">
            {WAYS.map((e) => (
              <div key={e.name} className={`flex flex-col p-8 ${e.featured ? "bg-ink text-paper" : "bg-paper text-ink"}`}>
                <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-wider">
                  <span>{e.name}</span>
                  <span className={e.featured ? "text-paper/50" : "text-ink/50"}>{e.tag}</span>
                </div>
                <div className="mt-6 text-3xl font-medium tracking-tight">{e.price}</div>
                <ul className="mt-8 flex-1 space-y-2.5 text-sm">
                  {e.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <TbCheck className={`mt-0.5 shrink-0 ${e.featured ? "text-paper/70" : "text-ink/50"}`} aria-hidden />
                      <span className={e.featured ? "text-paper/85" : "text-ink/75"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:${P.email}`}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider transition-transform active:translate-y-px ${
                    e.featured ? "bg-paper text-ink" : "bg-ink text-paper"
                  }`}
                >
                  Get in touch
                  <TbArrowRight aria-hidden />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
