import { TbArrowRight, TbArrowDown } from "react-icons/tb";
import { PERSONAL_INFO as P } from "@/content/site";
import RadialVortex from "./radial-vortex";
import ShellButton from "./shell-button";

const ticker = "AVAILABLE FOR SENIOR FDE & AGENTIC AI ROLES";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16">
      {/* generative centerpiece */}
      <div className="pointer-events-none absolute inset-0">
        <RadialVortex />
      </div>
      {/* legibility scrim over the left where the copy sits */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent lg:to-bg/10"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {P.availability}
        </p>

        <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
          Pramod Krishna
          <span className="block text-muted">Sunkara</span>
        </h1>

        <p className="mt-7 max-w-md font-mono text-sm leading-relaxed text-muted">
          I build air-gapped LLM systems, autonomous multi-agent graphs, and the on-prem
          infrastructure that runs them in production.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${P.email}`}
            className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-accent-ink transition-transform active:translate-y-px"
          >
            Get in touch
            <TbArrowRight aria-hidden />
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-sm border border-line-strong px-5 py-3 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-accent"
          >
            View work
            <TbArrowDown aria-hidden />
          </a>
          <ShellButton />
        </div>
      </div>

      {/* ticker strip, pinned to the hero base */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-line bg-bg/70 py-2.5 backdrop-blur-sm">
        <div className="flex w-max animate-[marquee_26s_linear_infinite] gap-6 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6">
              {ticker}
              <span className="text-accent">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
