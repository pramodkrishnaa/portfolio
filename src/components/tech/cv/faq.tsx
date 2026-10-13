"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ, ME } from "@/content/cv";
import GlyphRain from "./glyph-rain";
import { mono, SplitCta } from "./ui";

const RAIN = [
  "Before you hire", "Ask anything", "Research to production", "Agents evals RL", "Air-gapped by default",
  "Open to roles", "Bengaluru · worldwide", "Still unsure just email",
];

/** "Before you hire": sticky heading + sticky CTA, accordion with Q.00N rows. */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-ink text-paper">
      <GlyphRain phrases={RAIN} />
      <div className="relative grid grid-cols-1 gap-10 px-6 pt-10 pb-28 sm:px-10 lg:grid-cols-[38%_62%] lg:px-[5vw]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-between lg:py-[18svh]">
          <h2 className="text-[clamp(1.9rem,3.3vw,3.4rem)] font-medium tracking-[-0.03em]">Before you hire</h2>
          <div className="mt-6 lg:mt-0">
            <SplitCta a="Get" b="In touch" href={`mailto:${ME.email}`} tone="light" />
          </div>
        </div>
        <ol className="lg:pt-[18svh]">
          {FAQ.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <li key={q} className="border-b border-paper/12">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 py-6 text-left"
                >
                  <span className={`${mono} w-14 shrink-0 text-paper/35`}>Q.{String(i + 1).padStart(3, "0")}</span>
                  <span className={`${mono} flex-1 text-[12px] text-paper`}>{q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] border border-paper/20 font-mono text-sm text-paper/80" aria-hidden>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[44rem] pb-7 pl-[4.5rem] text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.45] text-paper/75">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
