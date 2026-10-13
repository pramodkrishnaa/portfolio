"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/.:-+*#";
const WORDS = "THE WORK SHIPS ITSELF SYSTEMS DEPLOYED PRODUCTION INFRASTRUCTURE ".split(" ");

/** ASCII-character "curtain" seam between paper and ink panels. The glyph field
 *  dissolves as you scroll through it (scrubbed), handing one panel to the next.
 *  Decorative only; generated on the client to avoid hydration drift. */
export default function Seam({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const [cells, setCells] = useState<Array<{ ch: string; op: number; flick: boolean }>>([]);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const n = 420;
    const out = Array.from({ length: n }, () => {
      const useWord = Math.random() < 0.08;
      return {
        ch: useWord ? WORDS[Math.floor(Math.random() * WORDS.length)] : CHARS[Math.floor(Math.random() * CHARS.length)],
        op: Math.random() * 0.35 + 0.04,
        flick: Math.random() < 0.15,
      };
    });
    setCells(out);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        // dissolve toward the middle of the pass, densest when entering
        el.style.setProperty("--seam-reveal", String(self.progress));
      },
    });
    return () => st.kill();
  }, [cells.length]);

  const base = tone === "ink" ? "bg-ink text-paper" : "bg-paper text-ink";
  return (
    <div
      ref={wrap}
      aria-hidden
      style={{ ["--seam-reveal" as string]: 0 }}
      className={`seam pointer-events-none relative h-28 overflow-hidden ${base} font-mono text-[10px] leading-[1.1] tracking-wider sm:h-36 sm:text-xs`}
    >
      <div className="seam-cells flex flex-wrap gap-x-3 gap-y-1 p-3">
        {cells.map((c, i) => (
          <span
            key={i}
            style={{ opacity: c.op }}
            className={c.flick ? "animate-[seamFlicker_2.4s_ease-in-out_infinite]" : undefined}
          >
            {c.ch}
          </span>
        ))}
      </div>
      <div
        className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent ${tone === "ink" ? "to-ink" : "to-paper"}`}
      />
    </div>
  );
}
