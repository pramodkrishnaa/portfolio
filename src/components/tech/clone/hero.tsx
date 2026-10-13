import { TbArrowRight, TbChevronDown } from "react-icons/tb";
import RadialVortex from "../radial-vortex";

/**
 * Split hero modelled on contentarchitecture.dev: off-white (paper) copy column
 * on the left, black (ink) column on the right carrying the concentric text
 * vortex. Placeholder copy; vortex words are brand texture, not meaningful.
 */
export default function CloneHero() {
  return (
    <section className="relative grid min-h-svh grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
      {/* LEFT — paper copy */}
      <div className="relative z-10 flex flex-col justify-center bg-paper px-6 py-28 text-ink sm:px-10 lg:px-16 lg:py-0">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/55">
          Portfolio of Pramod Krishna Sunkara.
        </p>

        <h1 className="mt-7 max-w-xl text-5xl font-medium leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
          The work that
          <br />
          ships itself.
        </h1>

        <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70">
          Frontend, systems, infrastructure, and the glue between them. Years of
          decisions, committed. Everything here is built to be read, forked, and
          shipped without a meeting.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {/* segmented filled button: GET | ACCESS */}
          <div className="inline-flex overflow-hidden rounded-sm bg-ink text-paper">
            <span className="px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider">
              Get
            </span>
            <a
              href="#contact"
              className="flex items-center gap-2 border-l border-paper/20 px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider transition-opacity hover:opacity-80"
            >
              Access
              <span className="h-1.5 w-1.5 rounded-full bg-paper" aria-hidden />
            </a>
          </div>
          <a
            href="#showcase"
            className="inline-flex items-center gap-2 rounded-sm border border-ink/25 px-5 py-3 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-ink"
          >
            Watch reel
            <TbArrowRight aria-hidden />
          </a>
        </div>

        {/* scroll cue */}
        <div className="mt-16 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40 lg:flex">
          <TbChevronDown className="animate-[scrollCue_1.8s_ease-in-out_infinite]" aria-hidden />
          Scroll to dive
        </div>
      </div>

      {/* RIGHT — ink vortex */}
      <div className="relative min-h-[60svh] overflow-hidden bg-ink lg:min-h-svh">
        <RadialVortex words={["LOREM IPSUM DOLOR SIT AMET"]} className="absolute inset-0" />
        {/* seam shadow where the two panels meet */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper/15 to-transparent lg:from-ink/0"
          aria-hidden
        />
      </div>
    </section>
  );
}
