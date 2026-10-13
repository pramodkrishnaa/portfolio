"use client";

import { useEffect, useState } from "react";
import { TESTIMONIALS } from "@/content/cv";
import GlyphRain from "./glyph-rain";
import { useInView } from "./features";
import { mono, Scramble } from "./ui";

const RAIN = [
  "Shipped, not prototyped", "Real clients real deadlines", "Agents in production", "Evals before vibes",
  "What teams say after launch", "Research to production", "The work that gets remembered", "Air-gapped by default",
];

/** Types a string at ~45 chars/s once `go` is true; keeps typing even after
 *  its slide leaves the active position. */
function useTypewriter(text: string, go: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go || n >= text.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(text.length); return; }
    const t = setTimeout(() => setN((v) => v + 1), 18 + Math.random() * 12);
    return () => clearTimeout(t);
  }, [go, n, text.length]);
  return { shown: text.slice(0, n), done: n >= text.length };
}

function Slide({ t, go }: { t: (typeof TESTIMONIALS)[number]; go: boolean }) {
  const q = `“${t.quote}”`;
  const { shown, done } = useTypewriter(q, go);
  return (
    <figure className="relative flex h-[min(58svh,32rem)] w-[var(--slide)] shrink-0 flex-col justify-between rounded-[6px] border border-paper/10 bg-[#202023] p-[clamp(1.25rem,3vw,2.5rem)]">
      <blockquote className="text-[clamp(1.35rem,2.6vw,2.6rem)] leading-[1.12] tracking-[-0.02em] text-paper" aria-label={q}>
        <span aria-hidden>{shown}</span>
        <span aria-hidden className={`ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.12em] bg-paper ${done ? "animate-[caret_1s_steps(1)_infinite]" : ""}`} />
      </blockquote>
      <figcaption className={`flex items-center gap-3 transition-opacity duration-300 ${shown.length > q.length * 0.6 ? "opacity-100" : "opacity-0"}`}>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 font-mono text-[11px] text-paper/70" aria-hidden>
          {t.who.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </span>
        <span>
          <span className={`${mono} block font-semibold text-paper`}><Scramble text={t.who} trigger={go ? 1 : 0} /></span>
          <span className={`${mono} block text-paper/40`}>{t.tag}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [started, setStarted] = useState<number[]>([]);
  const [ref, seen] = useInView<HTMLDivElement>();
  const n = TESTIMONIALS.length;
  useEffect(() => { if (seen) setStarted((s) => (s.includes(i) ? s : [...s, i])); }, [seen, i]);

  return (
    <section aria-roledescription="carousel" aria-label="What people say" className="relative overflow-hidden bg-ink py-24 text-paper">
      <GlyphRain phrases={RAIN} />
      <div ref={ref} className="relative">
        <div
          className="flex gap-[1.5vw] px-6 [--slide:86vw] lg:[--slide:54vw] transition-transform duration-300 ease-out sm:px-10 lg:pl-[5vw]"
          style={{ transform: `translateX(calc(${-i} * (var(--slide) + 1.5vw)))` }}
        >
          {TESTIMONIALS.map((t, k) => (
            <Slide key={k} t={t} go={started.includes(k)} />
          ))}
        </div>
        <div className={`${mono} mt-10 flex items-center justify-center gap-5`}>
          <button type="button" onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} className="text-paper disabled:text-paper/25" aria-label="Previous">[&lt;]</button>
          <span aria-live="polite"><span className="text-paper">{String(i + 1).padStart(2, "0")}</span> <span className="text-paper/40">/ {String(n).padStart(2, "0")}</span></span>
          <button type="button" onClick={() => setI((v) => Math.min(n - 1, v + 1))} disabled={i === n - 1} className="text-paper disabled:text-paper/25" aria-label="Next">[&gt;]</button>
        </div>
      </div>
    </section>
  );
}
