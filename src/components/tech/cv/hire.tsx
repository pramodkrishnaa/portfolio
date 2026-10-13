"use client";

import { useEffect, useState } from "react";
import { HIRE, ME } from "@/content/cv";
import { useInView } from "./features";
import { mono, Odometer, SplitCta } from "./ui";

const MODES = Object.keys(HIRE.modes);

/** Counts 0 → target over ~0.9s (ease-out) whenever `key` changes after `go`. */
function useCount(target: number, go: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(target); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 900);
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    setV(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, go]);
  return v;
}

export default function Hire() {
  const [mode, setMode] = useState(MODES[0]);
  const m = HIRE.modes[mode];
  const [ref, seen] = useInView<HTMLDivElement>("0px 0px -20% 0px");
  const v = useCount(m.figure, seen);

  return (
    <section id="hire" className="bg-paper px-6 pt-10 pb-24 text-ink sm:px-10 lg:px-[5vw]">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="text-[clamp(1.9rem,3.3vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.03em]">
          {HIRE.title.map((t) => <span key={t} className="block">{t}</span>)}
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex">
            {HIRE.badges.map((b, i) => (
              <span key={b} className="-ml-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-paper bg-ink font-mono text-[10px] font-semibold text-paper first:ml-0" style={{ zIndex: 10 - i }}>
                {b}
              </span>
            ))}
          </div>
          <span className={`${mono} text-ink/55`}>{HIRE.trusted}</span>
        </div>
      </div>

      <div ref={ref} className="relative mt-10 grid grid-cols-1 overflow-hidden rounded-2xl bg-ink text-paper lg:grid-cols-[58%_42%]">
        {/* ticket notches on the divider */}
        <span className="absolute top-0 left-[58%] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper lg:block" aria-hidden />
        <span className="absolute bottom-0 left-[58%] hidden h-9 w-9 -translate-x-1/2 translate-y-1/2 rounded-full bg-paper lg:block" aria-hidden />

        <div className="flex min-h-[18rem] flex-col justify-between p-8 lg:min-h-[26rem] lg:p-12">
          <p className={`${mono} text-paper/80`}>{m.label}</p>
          <div className="mt-10 flex items-end text-[clamp(6rem,19vw,18rem)] font-medium leading-[0.8] tracking-[-0.06em]">
            <Odometer value={String(v)} className="[&_span]:duration-150" />
            <span className="mb-[0.36em] ml-2 text-[0.32em] leading-none tracking-[-0.03em] text-paper/60">{m.unit}</span>
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-dashed border-paper/20 p-8 lg:border-t-0 lg:border-l lg:p-12">
          <ol className={`${mono} text-[11.5px]`}>
            {m.items.map((it, i) => (
              <li key={it} className="flex gap-4 border-b border-paper/12 py-3.5 first:border-t">
                <span className="text-paper/35">{String(i + 1).padStart(2, "0")}</span>
                {it}
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex rounded-[6px] border border-paper/20 p-0.5" role="tablist" aria-label="Engagement mode">
              {MODES.map((k) => (
                <button key={k} role="tab" aria-selected={k === mode} type="button" onClick={() => setMode(k)} className={`${mono} rounded-[4px] px-3 py-1.5 transition-colors ${k === mode ? "bg-paper text-ink" : "text-paper/70 hover:text-paper"}`}>
                  {k}
                </button>
              ))}
            </div>
            <SplitCta a="Book" b="A call" href={`mailto:${ME.email}?subject=${encodeURIComponent(`${mode}: let's talk`)}`} tone="light" />
          </div>
        </div>
      </div>
      <p className={`${mono} mt-4 max-w-xl normal-case tracking-normal text-ink/50`}>
        {m.caption}. {HIRE.note}{" "}
        <a href={`mailto:${ME.email}`} className="border-b border-dashed border-ink/50 text-ink">Email me</a>.
      </p>
    </section>
  );
}
