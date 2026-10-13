import { TbArrowRight } from "react-icons/tb";
import RadialVortex from "../radial-vortex";
import Seam from "./seam";

const EMAIL = "pramodkrishnaa29@gmail.com";

/** Outro: the concentric vortex returns behind a final CTA, then a footer. */
export default function CloneOutro() {
  return (
    <>
      <Seam tone="ink" />
      <section id="contact" className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-ink px-6 py-28 text-paper sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <RadialVortex words={["PRAMOD KRISHNA SUNKARA"]} className="absolute inset-0" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" aria-hidden />

        <div className="relative mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-paper/45">Let&rsquo;s talk</p>
          <h2 className="mt-5 max-w-2xl text-5xl font-medium leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Build something
            <br />
            that ships.
          </h2>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-10 inline-flex items-center gap-2 rounded-sm bg-paper px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-wider text-ink transition-transform active:translate-y-px"
          >
            {EMAIL}
            <TbArrowRight aria-hidden />
          </a>
        </div>
      </section>

      <footer className="bg-ink px-6 py-10 text-paper sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-paper/10 pt-8 font-mono text-xs text-paper/50 sm:flex-row sm:items-center">
          <span>PRAMOD KRISHNA SUNKARA — The work that ships itself.</span>
          <div className="flex gap-5">
            <a href="https://github.com/ApexKrish" className="transition-colors hover:text-paper">GITHUB</a>
            <a href="https://www.linkedin.com/in/ffskrishna" className="transition-colors hover:text-paper">LINKEDIN</a>
            <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-paper">EMAIL</a>
          </div>
        </div>
      </footer>
    </>
  );
}
