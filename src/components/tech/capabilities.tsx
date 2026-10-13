import Section from "@/components/site/section";
import Reveal from "@/components/reveal";
import SpotlightCard from "./spotlight-card";
import { TECHNICAL_DISCIPLINES as D } from "@/content/site";

export default function Capabilities() {
  return (
    <Section id="stack" className="py-28">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">01 / Stack</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Eight disciplines, one throughline: shipping autonomous systems into hard
            environments.
          </h2>
        </div>
        <span className="font-mono text-sm text-dim">[ {D.length} areas ]</span>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2">
        {D.map((d, i) => (
          <SpotlightCard key={d.id} className="bg-bg transition-colors hover:bg-bg-elev">
            <Reveal delay={(i % 2) * 0.05} className="relative flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-accent">{d.categoryNumber}</span>
                <h3 className="text-xl font-medium tracking-tight">{d.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{d.tagline}</p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {d.tools.slice(0, 5).map((t) => (
                  <li
                    key={t.name}
                    className="rounded-sm border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {t.name}
                  </li>
                ))}
                {d.tools.length > 5 && (
                  <li className="px-1 py-0.5 font-mono text-[11px] text-dim">+{d.tools.length - 5}</li>
                )}
              </ul>
            </Reveal>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
}
