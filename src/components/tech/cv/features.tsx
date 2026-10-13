"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import AsciiFigure from "./ascii-figure";
import { mono } from "./ui";
import { CAPABILITIES } from "@/content/cv";

/** Fires once when the element enters the bottom ~15% of the viewport. */
export function useInView<T extends HTMLElement>(margin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, seen] as const;
}

/** Text that reveals top→bottom like lines being written (mask sweep). */
export function LineReveal({ show, delay = 0, children, className = "" }: { show: boolean; delay?: number; children: ReactNode; className?: string }) {
  return (
    <div className={`${className} ${show ? "line-reveal is-in" : "line-reveal"}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

const OFFSETS = ["lg:ml-0", "lg:ml-[7.5vw]", "lg:ml-[15vw]"];

export default function Features() {
  const [head, headIn] = useInView<HTMLDivElement>();
  return (
    <section id="features" className="relative bg-ink text-paper">
      <div className="relative grid grid-cols-1 lg:grid-cols-[48%_52%]">
        <div className="px-6 pt-10 pb-[30svh] sm:px-10 lg:pl-[5vw] lg:pr-0">
          <div ref={head}>
            <h2 className="text-[clamp(1.8rem,3.2vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.03em]">
              {CAPABILITIES.title.map((t, i) => (
                <span key={t} className={`block transition-all duration-500 ease-out ${headIn ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                  {t}
                </span>
              ))}
            </h2>
            <LineReveal show={headIn} delay={0.4} className="mt-6 max-w-[34rem] text-[14px] leading-relaxed text-paper/60">
              {CAPABILITIES.lead}
            </LineReveal>
          </div>

          <ol className="mt-[14svh] space-y-[13svh]">
            {CAPABILITIES.items.map(([title, body], i) => (
              <Item key={title} n={i + 1} title={title} body={body} offset={OFFSETS[i % 3]} />
            ))}
          </ol>
        </div>

        {/* sticky figure */}
        <div className="pointer-events-none absolute inset-0 lg:pointer-events-auto lg:relative">
          <div className="sticky top-0 h-svh opacity-25 lg:opacity-100">
            <AsciiFigure words={CAPABILITIES.items.map(([t]) => t)} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ n, title, body, offset }: { n: number; title: string; body: string; offset: string }) {
  const [ref, seen] = useInView<HTMLLIElement>();
  return (
    <li ref={ref} className={`relative max-w-[19rem] ${offset}`}>
      <p className={`${mono} font-semibold text-paper transition-opacity duration-500 ${seen ? "opacity-100" : "opacity-0"}`}>
        {String(n).padStart(3, "0")} / {title}
      </p>
      <LineReveal show={seen} delay={0.2} className="mt-3 text-[13.5px] leading-relaxed text-paper/60">
        {body}
      </LineReveal>
    </li>
  );
}
