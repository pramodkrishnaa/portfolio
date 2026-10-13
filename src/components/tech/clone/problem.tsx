"use client";

import { useEffect, useRef, useState } from "react";

const SHEET: Array<{ head?: string; val?: string; rows: Array<[string, string]> }> = [
  { head: "IMPACT", val: "SHIPPED", rows: [["TOKEN COST", "-40%"], ["PROPOSAL REVIEW LATENCY", "-60%"], ["MANUAL WORKLOAD", "-80%"]] },
  { head: "RETRIEVAL + CONTROL", rows: [["PRECISION@5 (HYBRID RAG)", "94.2%"], ["WAYPOINT HIT RATE (PPO)", "92%"]] },
  { head: "SOVEREIGN + SECURE", rows: [["DATA LEAKAGE", "0"], ["AIR-GAPPED", "100%"], ["SERVICE RELIABILITY", "99.8%"]] },
];

function Odometer({ to, suffix = "" }: { to: number; suffix?: string }) {
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
  return <span ref={ref}>{n}{suffix}</span>;
}

/** Problem/impact section: a giant odometer metric on the left, a monospace
 *  impact ledger on the right. Real numbers from shipped systems. Paper panel. */
export default function CloneProblem() {
  return (
    <section id="work" className="relative isolate bg-paper px-6 py-28 text-ink sm:px-10 lg:px-16 lg:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <h2 className="max-w-md text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl">
            Numbers that survived production.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/60">
            Not slideware. Metrics from systems shipped into zero-trust, air-gapped
            enterprise environments.
          </p>
          <div className="mt-14 font-medium leading-none tracking-tighter">
            <span className="block text-[26vw] lg:text-[13rem]">
              <Odometer to={94} suffix="%" />
            </span>
            <span className="mt-2 block font-mono text-xs uppercase tracking-[0.25em] text-ink/50">
              precision@5, hybrid RAG eval set
            </span>
          </div>
        </div>

        <div className="font-mono text-xs text-ink/80 lg:pt-4">
          <div className="border border-dashed border-ink/25 p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-dashed border-ink/25 pb-3 text-ink/50">
              <span>METRIC</span>
              <span>SHIPPED</span>
            </div>
            <div className="mt-4 space-y-6">
              {SHEET.map((block) => (
                <div key={block.head}>
                  <div className="flex items-center justify-between text-ink/50">
                    <span>{block.head}</span>
                    {block.val && <span>{block.val}</span>}
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
