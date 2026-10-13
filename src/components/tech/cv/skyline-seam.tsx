"use client";

import { useEffect, useRef } from "react";

const PAPER = "#ebebec";
const INK = "#131315";
const WORDS = [
  "AGENTS.MD", "MCP", "RBAC", "QDRANT", "VLLM", "K8S", "LANGGRAPH", "FASTAPI", "LOKI",
  "PPO", "RAG", "EVALS", "SHIPPED", "AIR-GAPPED", "GUARDRAILS", "P@5", "LLMS.TXT", "OCR",
];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.:/-+*#";

// Cheap deterministic hash -> [0,1)
const hash = (a: number, b: number) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
// 1D value noise, smooth
const noise = (x: number, seed: number) => {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i, seed) * (1 - u) + hash(i + 1, seed) * u;
};

/**
 * ASCII "skyline" seam between a light and a dark section: a band whose ragged
 * character-cell horizon scrolls with the page 1:1 (shape fixed), with words
 * riding the edge and dithered cells flickering on both sides.
 */
export default function SkylineSeam({ from = "paper", to = "ink" }: { from?: "paper" | "ink"; to?: "paper" | "ink" }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = from === "paper" ? PAPER : INK;
    const bot = to === "paper" ? PAPER : INK;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "monospace";

    let raf = 0;
    let visible = false;

    const resize = () => {
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    const draw = (now: number) => {
      const W = cv.width;
      const H = cv.height;

      const cw = 9 * dpr;
      const ch = 13 * dpr;
      const cols = Math.ceil(W / cw);
      const rows = Math.ceil(H / ch);
      const tick = reduce ? 0 : Math.floor(now / 110); // flicker cadence
      const amp = rows * 0.16;

      ctx.fillStyle = top;
      ctx.fillRect(0, 0, W, H);

      // height (in rows) of the incoming colour, per column: the horizon sits
      // mid-band and moves with the page 1:1; only the glyphs animate
      const level = rows * 0.5;
      const heights: number[] = new Array(cols);
      for (let c = 0; c < cols; c++) {
        const n = noise(c * 0.07, 3) * 0.65 + noise(c * 0.23, 7) * 0.35;
        const spike = hash(c, 41) < 0.06 ? 2 : 0;
        heights[c] = Math.round(level + (n - 0.5) * amp * 2 + spike);
      }

      ctx.fillStyle = bot;
      for (let c = 0; c < cols; c++) {
        const h = Math.max(0, heights[c]);
        if (h > 0) ctx.fillRect(c * cw, H - h * ch, cw + 1, h * ch);
      }

      // dither: stray incoming cells above the edge, stray outgoing cells below
      for (let c = 0; c < cols; c++) {
        const edge = rows - heights[c];
        for (let k = 1; k <= 6; k++) {
          const above = edge - k;
          if (above >= 0 && hash(c * 13 + k, tick) < 0.22 / k) {
            ctx.fillStyle = bot;
            ctx.fillRect(c * cw, above * ch, cw, ch);
          }
          const below = edge + k;
          if (below < rows && hash(c * 17 + k, tick + 5) < 0.12 / k) {
            ctx.fillStyle = top;
            ctx.fillRect(c * cw, below * ch, cw, ch);
          }
        }
      }

      // glyphs + words riding the horizon
      ctx.font = `500 ${8 * dpr}px ${mono}`;
      ctx.textBaseline = "top";
      for (let c = 0; c < cols; c += 1) {
        const edge = rows - heights[c];
        const hw = hash(c, 99);
        if (hw < 0.06) {
          const word = WORDS[Math.floor(hash(c, 5) * WORDS.length)];
          const lift = 1 + Math.floor(hash(c, 11) * 7);
          ctx.fillStyle = bot;
          ctx.globalAlpha = 0.85;
          ctx.fillText(word, c * cw, (edge - lift) * ch + 2 * dpr);
          ctx.fillStyle = top;
          ctx.fillText(WORDS[(c * 7) % WORDS.length], c * cw, (edge + 1 + Math.floor(hash(c, 12) * 4)) * ch + 2 * dpr);
        } else if (hash(c, tick) < 0.12) {
          const g = GLYPHS[Math.floor(hash(c, tick + 1) * GLYPHS.length)];
          const lift = Math.floor(hash(c, tick + 2) * 10) - 2;
          ctx.fillStyle = lift > 0 ? bot : top;
          ctx.globalAlpha = 0.6;
          ctx.fillText(g, c * cw + 2 * dpr, (edge - lift) * ch + 2 * dpr);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(el);
    if (reduce) draw(0);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [from, to]);

  return (
    <div ref={wrap} aria-hidden className={`relative -my-px h-[55svh] ${from === "paper" ? "bg-paper" : "bg-ink"}`}>
      <canvas ref={canvas} className="block h-full w-full" />
    </div>
  );
}
