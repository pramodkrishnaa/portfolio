"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export const mono = "font-mono text-[11px] uppercase tracking-[0.06em]";

/** Two dark chips side by side (GET | ACCESS), second carries a pulsing dot. */
export function SplitCta({ a = "Get", b = "Access", href, onClick, tone = "dark" }: { a?: string; b?: string; href?: string; onClick?: () => void; tone?: "dark" | "light" }) {
  const chip = `${mono} inline-flex h-8 items-center rounded-[4px] px-3 transition-colors ${
    tone === "dark" ? "bg-ink text-paper hover:bg-[#2a2a2e]" : "bg-paper text-ink hover:bg-white"
  }`;
  const Inner = (
    <>
      <span className={chip}>{a}</span>
      <span className={`${chip} relative`}>
        {b}
        <span className="dot-accent absolute -top-0.5 -right-0.5 h-1.5 w-1.5" aria-hidden />
      </span>
    </>
  );
  const cls = "btn-cta group inline-flex items-center gap-[3px]";
  return href ? (
    <a href={href} className={cls}>{Inner}</a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>{Inner}</button>
  );
}

export function GhostChip({ children, onClick, href, tone = "light" }: { children: ReactNode; onClick?: () => void; href?: string; tone?: "light" | "dark" }) {
  const cls = `${mono} btn-cta inline-flex h-8 items-center gap-2 rounded-[4px] px-3 transition-colors ${
    tone === "light" ? "bg-[#dcdcde] text-ink hover:bg-[#d0d0d3]" : "bg-[#2a2a2e] text-paper hover:bg-[#35353a]"
  }`;
  return href ? <a href={href} className={cls}>{children}</a> : <button type="button" onClick={onClick} className={cls}>{children}</button>;
}

/** Per-digit vertical odometer. Non-digits render as-is. */
export function Odometer({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden leading-none ${className}`} aria-label={value}>
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="relative inline-block h-[1em] overflow-hidden" aria-hidden>
            <span className="invisible">0</span>
            <span
              className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{ transform: `translateY(-${Number(ch) * 10}%)` }}
            >
              {"0123456789".split("").map((d) => (
                <span key={d} className="block h-[1em]">{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden>{ch}</span>
        ),
      )}
    </span>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>";

/** Text that scrambles then resolves left→right whenever `text` changes or
 *  `trigger` increments (e.g. on hover). ~30ms per character. */
export function Scramble({ text, trigger = 0, className = "" }: { text: string; trigger?: number; className?: string }) {
  const [out, setOut] = useState(text);
  const first = useRef(true);
  useEffect(() => {
    if (first.current && trigger === 0) { first.current = false; setOut(text); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOut(text); return; }
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const settled = Math.floor(frame / 1.2);
      setOut(
        text
          .split("")
          .map((c, i) => (i < settled || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (settled >= text.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [text, trigger]);
  return <span className={className}>{out}</span>;
}

/** Link whose label scrambles on hover (footer + nav). */
export function ScrambleLink({ href, children, className = "", onClick }: { href: string; children: string; className?: string; onClick?: (e: React.MouseEvent) => void }) {
  const internal = href.startsWith("/");
  const [n, setN] = useState(0);
  return (
    <a href={href} data-blob={internal ? "" : undefined} target={/^https?:/.test(href) ? "_blank" : undefined} rel={/^https?:/.test(href) ? "noreferrer" : undefined} onClick={onClick} onMouseEnter={() => setN((v) => v + 1)} className={className} aria-label={children}>
      <Scramble text={children} trigger={n} />
    </a>
  );
}

/** Scroll progress (0..1) of an element across [top hits viewport top → bottom hits viewport bottom]. */
export function progressOf(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const span = r.height - window.innerHeight;
  return Math.min(1, Math.max(0, -r.top / Math.max(1, span)));
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const ramp = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
export const smooth = (t: number) => t * t * (3 - 2 * t);
