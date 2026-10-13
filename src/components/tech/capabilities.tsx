import Section from "@/components/site/section";
import Reveal from "@/components/reveal";
import { TECHNICAL_DISCIPLINES as D } from "@/content/site";

export default function Capabilities() {
  return (
    <Section id="stack" className="py-28">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Eight disciplines, one throughline: shipping autonomous systems into hard
          environments.
        </h2>
        <span className="font-mono text-sm text-dim">{D.length} areas</span>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
        {D.map((d, i) => (
          <Reveal
            key={d.id}
            delay={(i % 2) * 0.05}
            className="flex flex-col bg-bg p-6 transition-colors hover:bg-bg-elev sm:p-8"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm text-accent">{d.categoryNumber}</span>
              <h3 className="text-xl font-medium tracking-tight">{d.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{d.tagline}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {d.tools.slice(0, 5).map((t) => (
                <li
                  key={t.name}
                  className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                >
                  {t.name}
                </li>
              ))}
              {d.tools.length > 5 && (
                <li className="px-1 py-0.5 font-mono text-[11px] text-dim">
                  +{d.tools.length - 5}
                </li>
              )}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
