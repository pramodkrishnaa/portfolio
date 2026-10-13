"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>=";
const COVER = 600, HOLD = 380, REVEAL = 520;

const hash = (a: number, b: number) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/**
 * Page transition for links marked `data-blob`: an ink blob full of tiny
 * glyphs grows organically from the click (thresholded noise on a coarse
 * cell grid), holds while the route swaps, then recedes the same way.
 */
export default function BlobTransition() {
  const ref = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let busy = false;

    const run = (href: string, ox: number, oy: number) => {
      busy = true;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const W = (cv.width = innerWidth * dpr), H = (cv.height = innerHeight * dpr);
      cv.style.display = "block";
      const cell = Math.max(W / 72, 12 * dpr);
      const cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
      const maxD = Math.hypot(Math.max(ox, W - ox), Math.max(oy, H - oy));
      const font = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "monospace";
      const t0 = performance.now();
      let routed = false;

      const frame = (now: number) => {
        const t = now - t0;
        // coverage 0→1 (cover), hold at 1, 1→0 (reveal)
        const k = t < COVER ? t / COVER : t < COVER + HOLD ? 1 : Math.max(0, 1 - (t - COVER - HOLD) / REVEAL);
        if (!routed && t >= COVER) { routed = true; router.push(href); }
        ctx.clearRect(0, 0, W, H);
        ctx.font = `500 ${cell * 0.5}px ${font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const tick = Math.floor(now / 70);
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const x = i * cell, y = j * cell;
            const d = Math.hypot(x - ox, y - oy) / maxD;
            const n = d * 0.75 + hash(i, j) * 0.25 + hash((i / 4) | 0, (j / 4) | 0) * 0.12;
            if (n > k * 1.12) continue;
            ctx.fillStyle = "#131315";
            ctx.fillRect(x, y, cell + 0.5, cell + 0.5);
            if (hash(i * 3 + tick, j) < 0.55) {
              ctx.fillStyle = "rgba(235,235,236,0.55)";
              ctx.fillText(GLYPHS[(hash(i, j + tick) * GLYPHS.length) | 0], x + cell / 2, y + cell / 2);
            }
          }
        }
        if (t < COVER + HOLD + REVEAL) requestAnimationFrame(frame);
        else { cv.style.display = "none"; busy = false; }
      };
      requestAnimationFrame(frame);
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[data-blob]") as HTMLAnchorElement | null;
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      e.preventDefault();
      if (busy) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { router.push(url.pathname + url.search + url.hash); return; }
      const dpr = Math.min(devicePixelRatio || 1, 2);
      run(url.pathname + url.search + url.hash, e.clientX * dpr, e.clientY * dpr);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden h-full w-full" />;
}
