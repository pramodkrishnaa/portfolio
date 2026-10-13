"use client";

import { useEffect, useRef, useState } from "react";
import { Vortex } from "./vortex";
import { OUTRO, ME } from "@/content/cv";
import { mono, progressOf, ramp, smooth, SplitCta, ScrambleLink } from "./ui";
import SkylineSeam from "./skyline-seam";

/** Outro: glyphs gather into the vortex as it enters; a paper circle opens
 *  at the centre (scroll-scrubbed) and the CTA fades in once it settles. */
export default function Outro() {
  const wrap = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const circle = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cv = canvas.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "monospace";
    const v = new Vortex(cv, { text: ME.vortex, fg: "#ebebec", font });
    v.cx = 0.5;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    let raf = 0, last = performance.now(), entered = false, visible = false;
    const loop = (now: number) => {
      if (!wrap.current || !circle.current) return; // unmounted
      const dt = Math.min(64, now - last);
      last = now;
      const p = progressOf(wrap.current!);
      const r = smooth(ramp(p, 0.05, 0.45)) * Math.min(innerWidth * 0.17, innerHeight * 0.36);
      circle.current!.style.width = circle.current!.style.height = `${r * 2}px`;
      v.corePx = r * 1.04;
      setReady(p > 0.42);
      v.frame(now, reduce ? 0 : dt);
      if (visible) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !entered && !reduce) { entered = true; v.intro(performance.now()); }
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(wrap.current!);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, []);

  return (
    <>
      <section ref={wrap} id="contact" className="relative h-[170svh] bg-ink">
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />
          <div ref={circle} className="relative flex items-center justify-center rounded-full bg-paper text-ink" style={{ width: 0, height: 0 }}>
            <div className={`absolute flex w-[min(32rem,80vw)] flex-col items-center text-center transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
              <h2 className="text-[clamp(1.5rem,2.8vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                {OUTRO.title.map((t) => <span key={t} className="block">{t}</span>)}
              </h2>
              <div className={`mt-6 transition-opacity delay-200 duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
                <SplitCta a="Email" b="Me" href={`mailto:${ME.email}`} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <SkylineSeam from="ink" to="paper" />
    </>
  );
}

const COLS: [string, [string, string][]][] = [
  ["Resources", [["Blog", "/blog"], ["GitHub", ME.github], ["Open source", ME.githubAlt]]],
  ["Elsewhere", [["LinkedIn", ME.linkedin], ["Email", `mailto:${ME.email}`]]],
];

export function Footer() {
  return (
    <footer className="bg-paper px-6 pt-10 pb-8 text-ink sm:px-10 lg:px-[5vw]">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <Mark className="h-14 w-14" />
            <p className="font-mono text-[clamp(1.2rem,2vw,1.9rem)] uppercase leading-[1.05] tracking-[0.02em]">Pramod Krishna<br />Sunkara</p>
          </div>
          <p className="mt-6 max-w-sm text-[15px] text-ink/60">One short note when something new ships: a paper reproduction, an agent, an eval.</p>
          <form
            className="mt-5 flex max-w-md flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const email = new FormData(e.currentTarget).get("email");
              window.location.href = `mailto:${ME.email}?subject=${encodeURIComponent("Subscribe")}&body=${encodeURIComponent(`Please add ${email} to your updates.`)}`;
            }}
          >
            <input name="email" type="email" required placeholder="you@email.com" aria-label="Your email" className="h-10 min-w-0 flex-1 rounded-[6px] border border-ink/20 bg-transparent px-3 font-mono text-[13px] outline-none placeholder:text-ink/35 focus:border-ink/50" />
            <button type="submit" className="btn-cta inline-flex items-center gap-[3px]">
              <span className={`${mono} inline-flex h-10 items-center rounded-[4px] bg-ink px-3 text-paper`}>Stay</span>
              <span className={`${mono} inline-flex h-10 items-center rounded-[4px] bg-ink px-3 text-paper`}>Updated</span>
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {COLS.map(([h, links]) => (
            <div key={h}>
              <p className="text-[15px] text-ink/50">{h}</p>
              <ul className="mt-3 space-y-2">
                {links.map(([l, href]) => (
                  <li key={l}>
                    <ScrambleLink href={href} className={`${mono} text-[12px] text-ink hover:text-ink/60`}>{l}</ScrambleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={`${mono} mt-16 flex flex-col justify-between gap-2 border-t border-ink/15 pt-4 text-ink/55 sm:flex-row`}>
        <span>© {new Date().getFullYear()} Pramod Krishna Sunkara</span>
        <span>Designed &amp; built in Bengaluru · Next.js · Canvas · Lenis</span>
      </div>
    </footer>
  );
}

/** Hatched square brand mark. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2">
      <clipPath id="pks-mark"><rect width="24" height="24" /></clipPath>
      <g clipPath="url(#pks-mark)">
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M${-6 + i * 4} 24 L${6 + i * 4} 0`} />
        ))}
      </g>
      <rect x="0.6" y="0.6" width="22.8" height="22.8" />
    </svg>
  );
}
