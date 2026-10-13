import { TbArrowRight, TbArrowDown } from "react-icons/tb";
import { PERSONAL_INFO as P } from "@/content/site";
import ShaderBackground from "@/components/webgl/shader-background";

/** Tech-world hero. Background slot is filled by the WebGL shader later; for now
 *  it's a grid texture + a soft accent wash. Content stays left-aligned. */
export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16">
      {/* background: static grid texture + WebGL shader when supported */}
      <div className="pointer-events-none absolute inset-0 grid-texture opacity-60" aria-hidden />
      <ShaderBackground />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[60vh] w-[60vh] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div>
          <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {P.availability}
          </p>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Pramod Krishna
            <span className="block text-muted">Sunkara</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            I build air-gapped LLM systems, autonomous multi-agent graphs, and the on-prem
            infrastructure that actually runs them in production.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${P.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-transform active:translate-y-px"
            >
              Get in touch
              <TbArrowRight aria-hidden />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-fg transition-colors hover:border-line-strong"
            >
              View work
              <TbArrowDown aria-hidden />
            </a>
          </div>
        </div>

        {/* real status panel — not a fake screenshot */}
        <dl className="hidden self-end border-t border-line pt-6 font-mono text-sm lg:block">
          {[
            ["Role", P.tagline],
            ["Based", P.location.split("(")[0].trim()],
            ["Now", "Agentic AI · FDE · Sovereign Cloud"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-b border-line py-3">
              <dt className="text-dim">{k}</dt>
              <dd className="text-right text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
