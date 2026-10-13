"use client";

import { useEffect, useRef } from "react";

const NOISE = "#%&*+/<>=?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/** Dim full-bleed texture of repeated phrases whose characters randomly
 *  corrupt and recover (~8fps). Decorative background for dark sections. */
export default function GlyphRain({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const font = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "monospace";
    const line = phrases.map((p) => p.toUpperCase()).join(" · ") + " · ";
    let id = 0, visible = false;
    const draw = () => {
      const W = (cv.width = cv.clientWidth * dpr);
      const H = (cv.height = cv.clientHeight * dpr);
      const fs = 10 * dpr, lh = 22 * dpr;
      ctx.font = `500 ${fs}px ${font}`;
      ctx.fillStyle = "#ebebec";
      ctx.globalAlpha = 0.045;
      const rows = Math.ceil(H / lh);
      const perRow = Math.ceil(W / (fs * 0.62)) + 2;
      for (let r = 0; r < rows; r++) {
        const off = (r * 37) % line.length;
        let s = "";
        for (let i = 0; i < perRow; i++) {
          const c = line[(off + i) % line.length];
          s += !reduce && c !== " " && Math.random() < 0.025 ? NOISE[(Math.random() * NOISE.length) | 0] : c;
        }
        ctx.fillText(s, -((r * 13) % 40) * dpr, r * lh + lh * 0.7);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      clearInterval(id);
      if (visible) { draw(); if (!reduce) id = window.setInterval(draw, 125); }
    });
    io.observe(cv);
    return () => { clearInterval(id); io.disconnect(); };
  }, [phrases]);
  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
