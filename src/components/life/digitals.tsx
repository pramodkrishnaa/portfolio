import Reveal from "@/components/reveal";
import { PERSONAL_INFO as P } from "@/content/site";

const facts: [string, string][] = [
  ["Ring", "All-India Inter-University Heavyweight Finalist"],
  ["Ops", "Head of Operations, GITAM Sports Committee"],
  ["Stage", "NVIDIA AI Summit Delegate · IMC live demos"],
  ["Research", "Ethics of AI, University of Helsinki"],
  ["Degree", `${P.education.degree}, ${P.education.institution}`],
  ["Craft", "5+ years Premiere Pro, After Effects, color grading"],
];

export default function Digitals() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">The file</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl">
          THE PART THAT DOESN&apos;T FIT ON A CV
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
        {facts.map(([k, v], i) => (
          <Reveal key={k} delay={(i % 2) * 0.05} className="bg-bg p-7 sm:p-9">
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{k}</dt>
            <dd className="mt-3 text-xl leading-snug text-fg">{v}</dd>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8 flex flex-wrap gap-2">
        {P.credentials.map((c) => (
          <span
            key={c}
            className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted"
          >
            {c}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
