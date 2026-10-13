"use client";

import { useState } from "react";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import Seam from "./seam";

const QUOTES = [
  { q: "They shipped our platform rebuild weeks ahead of schedule, and six months in it still hasn't needed a babysitter.", name: "A. REDDY", role: "CTO, PLATFORM CO" },
  { q: "We were handed a system we actually understand and can extend ourselves. That is rarer than it should be.", name: "J. MENON", role: "HEAD OF ENGINEERING" },
  { q: "Fastest path from whiteboard to production we have ever had. No fighting the setup, just building.", name: "S. IYER", role: "FOUNDER" },
];

/** Showcase: rotating testimonial quotes with author + slide counter and
 *  prev/next. Black panel, faint scattered mono-text background. */
export default function CloneShowcase() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + QUOTES.length) % QUOTES.length);
  const cur = QUOTES[i];

  return (
    <>
      <Seam tone="ink" />
      <section id="showcase" className="relative isolate overflow-hidden bg-ink px-6 py-28 text-paper sm:px-10 lg:px-16 lg:py-40">
        {/* faint scattered background text */}
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden font-mono text-[10px] uppercase leading-5 tracking-widest text-paper/[0.04]">
          {Array.from({ length: 40 }).map((_, r) => (
            <div key={r} className="whitespace-nowrap">
              {"THE WORK THAT GETS REMEMBERED / SHIPPED / PRODUCTION / ".repeat(6)}
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-paper/45">
            The work that gets remembered.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
            <blockquote key={i} className="animate-[fadeIn_0.5s_ease] text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.6rem]">
              &ldquo;{cur.q}&rdquo;
            </blockquote>
            <div className="flex items-end">
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-full border border-paper/25" aria-hidden />
                <div className="font-mono text-xs">
                  <div className="text-paper">{cur.name}</div>
                  <div className="text-paper/50">{cur.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* controls */}
          <div className="mt-16 flex items-center gap-6 font-mono text-sm">
            <button onClick={() => go(-1)} aria-label="Previous" className="flex h-9 w-9 items-center justify-center rounded-sm border border-paper/20 transition-colors hover:border-paper">
              <TbArrowLeft aria-hidden />
            </button>
            <span className="tabular-nums text-paper/70">
              {String(i + 1).padStart(2, "0")} <span className="text-paper/30">/ {String(QUOTES.length).padStart(2, "0")}</span>
            </span>
            <button onClick={() => go(1)} aria-label="Next" className="flex h-9 w-9 items-center justify-center rounded-sm border border-paper/20 transition-colors hover:border-paper">
              <TbArrowRight aria-hidden />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
