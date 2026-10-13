"use client";

import { useEffect, useRef, useState } from "react";

const SHEET: Array<{ day?: string; hrs?: string; rows: Array<[string, string]> }> = [
  { day: "DAY 01", hrs: "~8 HRS", rows: [["PROJECT SCAFFOLD + CONFIG", "~5"], ["DESIGN TOKENS, AGAIN", "~3"]] },
  { day: "DAY 02", hrs: "~8 HRS", rows: [["AUTH + SESSION PLUMBING", "~4"], ["FORMS + VALIDATION", "~3"], ["SPAM GUARD", "~1"]] },
  { day: "DAY 03", hrs: "~8 HRS", rows: [["SEO, OG, SITEMAPS", "~2"], ["THE SAME 12 COMPONENTS", "~2"], ["REDIRECTS, ANALYTICS", "~2"], ["LINT, PRETTIER, HOOKS", "~1"], ["BASIC AUTH FOR STAGING", "~1"]] },
  { day: "EVERY PROMPT", rows: [["THE AGENT REDESIGNS IT", "∞"]] },
];

function Odometer({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(eased * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>~{n}</span>;
}

/** Problem section: giant odometer total on the left, monospace estimate sheet
 *  on the right. Off-white panel. */
export default function CloneProblem() {
  return (
    <section id="work" className="relative isolate bg-paper px-6 py-28 text-ink sm:px-10 lg:px-16 lg:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
        {/* left */}
        <div>
          <h2 className="max-w-md text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl">
            The part nobody quotes for. Every single time.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/60">
            This is the work that disappears into estimates. Days gone before the
            real thing even starts.
          </p>
          <div className="mt-14 font-medium leading-none tracking-tighter">
            <span className="block text-[26vw] lg:text-[13rem]">
              <Odometer to={24} />
            </span>
            <span className="mt-2 block font-mono text-xs uppercase tracking-[0.25em] text-ink/50">
              hours, before line one
            </span>
          </div>
        </div>

        {/* right — estimate sheet */}
        <div className="font-mono text-xs text-ink/80 lg:pt-4">
          <div className="border border-dashed border-ink/25 p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-dashed border-ink/25 pb-3 text-ink/50">
              <span>ESTIMATE</span>
              <span>NEVER QUOTED</span>
            </div>
            <div className="mt-4 space-y-6">
              {SHEET.map((block) => (
                <div key={block.day}>
                  <div className="flex items-center justify-between text-ink/50">
                    <span>{block.day}</span>
                    {block.hrs && <span>{block.hrs}</span>}
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {block.rows.map(([label, val]) => (
                      <li key={label} className="flex items-end">
                        <span>{label}</span>
                        <span className="mx-2 flex-1 translate-y-[-3px] border-b border-dotted border-ink/30" />
                        <span>{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
