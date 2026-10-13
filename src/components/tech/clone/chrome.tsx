"use client";

import { useEffect, useRef, useState } from "react";
import { TbPlayerPlayFilled, TbPlus, TbX } from "react-icons/tb";

/** Persistent floating chrome: fixed reel thumbnail (top-right), fixed CTA
 *  (bottom-right), a dismissable newsletter card (bottom-left), and a custom
 *  cursor dot. Mirrors the contentarchitecture.dev floating UI. */
export default function CloneChrome() {
  const [showCard, setShowCard] = useState(true);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = dot.current;
    if (!el) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    loop();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      {/* reel thumbnail, top-right */}
      <div className="group fixed top-5 right-5 z-40 hidden aspect-video w-36 overflow-hidden rounded-sm border border-ink/15 bg-ink/80 lg:block">
        <div className="flex h-full w-full items-center justify-center text-paper/70">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
            <TbPlayerPlayFilled aria-hidden /> Reel
          </span>
        </div>
        <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(240,237,230,0.04)_3px)]" aria-hidden />
      </div>

      {/* CTA, bottom-right */}
      <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-1">
        <span className="rounded-sm bg-ink/85 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-paper/80">
          Learn more
        </span>
        <a
          href="#contact"
          aria-label="Contact"
          className="flex h-11 w-11 items-center justify-center rounded-sm bg-ink text-paper transition-transform hover:scale-105 active:translate-y-px"
        >
          <TbPlus aria-hidden />
        </a>
      </div>

      {/* newsletter card, bottom-left */}
      {showCard && (
        <div className="fixed bottom-5 left-5 z-40 hidden w-[min(92vw,30rem)] rounded-md border border-paper/10 bg-ink p-5 text-paper shadow-2xl sm:block">
          <button
            onClick={() => setShowCard(false)}
            aria-label="Dismiss"
            className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-sm border border-paper/15 text-paper/70 transition-colors hover:text-paper"
          >
            <TbX aria-hidden />
          </button>
          <p className="pr-8 text-lg font-medium">Not in a hurry? Stay close.</p>
          <p className="mt-1 text-sm text-paper/60">
            One short note when something new ships. Nothing else, unsubscribe anytime.
          </p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-sm border border-paper/15 bg-paper/5 px-3 py-2 font-mono text-sm text-paper placeholder:text-paper/40 focus:border-paper/40 focus:outline-none"
            />
            <button className="shrink-0 rounded-sm bg-paper px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-ink">
              Subscribe
            </button>
          </form>
        </div>
      )}

      {/* custom cursor */}
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-3 w-3 rounded-full bg-paper mix-blend-difference will-change-transform lg:block"
        aria-hidden
      />
    </>
  );
}
