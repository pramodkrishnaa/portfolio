"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbArrowRight, TbChevronDown } from "react-icons/tb";
import RadialVortex from "../radial-vortex";
import { PERSONAL_INFO as P } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Split hero modelled on contentarchitecture.dev: paper copy column on the left,
 * black vortex column on the right. Scroll pins the hero and "dives" into the
 * vortex (scrub-zoom) while the copy fades, then releases into the next section.
 */
export default function CloneHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const driveRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => { driveRef.current = self.progress; },
        },
      });
      tl.to(copyRef.current, { autoAlpha: 0, y: -60, ease: "none" }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative grid min-h-svh grid-cols-1 overflow-hidden lg:grid-cols-[1fr_1.05fr]">
      {/* LEFT — paper copy */}
      <div ref={copyRef} className="relative z-10 flex flex-col justify-center bg-paper px-6 py-28 text-ink sm:px-10 lg:px-16 lg:py-0">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/55">
          Forward Deployed Systems · Agentic AI Engineer
        </p>

        <h1 className="mt-7 max-w-xl text-5xl font-medium leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
          The work that
          <br />
          ships itself.
        </h1>

        <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70">
          {P.subTagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="inline-flex overflow-hidden rounded-sm bg-ink text-paper">
            <span className="px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider">Get</span>
            <a
              href={`mailto:${P.email}`}
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

        <div className="mt-16 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40 lg:flex">
          <TbChevronDown className="animate-[scrollCue_1.8s_ease-in-out_infinite]" aria-hidden />
          Scroll to dive
        </div>
      </div>

      {/* RIGHT — ink vortex (scroll-driven dive) */}
      <div className="relative min-h-[60svh] overflow-hidden bg-ink lg:min-h-svh">
        <RadialVortex words={["LOREM IPSUM DOLOR SIT AMET"]} driveRef={driveRef} className="absolute inset-0" />
      </div>
    </section>
  );
}
