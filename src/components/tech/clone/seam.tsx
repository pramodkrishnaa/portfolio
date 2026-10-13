"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/.:-+*#";
const WORDS = "THE WORK SHIPS ITSELF SYSTEMS DEPLOYED PRODUCTION INFRASTRUCTURE ".split(" ");

/** ASCII-character "curtain" band used as a seam between paper and ink panels.
 *  Scattered monospace glyphs that flicker, dissolving one panel into the next.
 *  Decorative only; generated on the client to avoid hydration drift. */
export default function Seam({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const [cells, setCells] = useState<Array<{ ch: string; op: number; flick: boolean }>>([]);
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

  const base = tone === "ink" ? "bg-ink text-paper" : "bg-paper text-ink";
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative h-28 overflow-hidden ${base} font-mono text-[10px] leading-[1.1] tracking-wider sm:h-36 sm:text-xs`}
    >
      <div className="flex flex-wrap gap-x-3 gap-y-1 p-3 opacity-80">
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
      {/* fade the band into the destination panel */}
      <div
        className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent ${tone === "ink" ? "to-ink" : "to-paper"}`}
      />
    </div>
  );
}
