"use client";

import { useEffect, useRef, useState } from "react";
import { mono } from "./ui";

const SHAPES = ["sphere", "torus", "knot"] as const;

/**
 * Real-time ASCII render of a lit 3D form, written in the section's own words.
 * Per character cell: ray-march the SDF, Lambert-shade it, map brightness to
 * glyph alpha. Light follows the pointer; CLICK morphs to the next shape.
 * Glyphs shimmer (random substitution) the way the source's ASCII art does.
 */
export default function AsciiFigure({ words, className = "" }: { words: string[]; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const shapeRef = useRef(0);
  const morph = useRef({ from: 0, to: 0, t: 1 });
  const [shape, setShape] = useState(0);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const font = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "monospace";
    const text = words.join(" · ").toUpperCase().replace(/\s+/g, " ");
    const light = { x: -0.5, y: -0.6, tx: -0.5, ty: -0.6 };
    let raf = 0;
    let visible = false;

    const resize = () => {
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    // signed distance fields, unit scale
    const sdf = (k: number, x: number, y: number, z: number) => {
      if (k === 0) return Math.hypot(x, y, z) - 1;
      if (k === 1) {
        const q = Math.hypot(x, z) - 0.85;
        return Math.hypot(q, y) - 0.38;
      }
      // twisted torus "knot-ish"
      const a = Math.atan2(z, x);
      const q = Math.hypot(x, z) - 0.8;
      const yy = y - 0.25 * Math.sin(3 * a);
      return Math.hypot(q, yy) - 0.28;
    };

    const draw = (now: number) => {
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);
      const cw = 7 * dpr, chh = 12 * dpr;
      const cols = Math.floor(W / cw), rows = Math.floor(H / chh);
      ctx.font = `500 ${9.5 * dpr}px ${font}`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "#ebebec";

      light.x += (light.tx - light.x) * 0.06;
      light.y += (light.ty - light.y) * 0.06;
      const ln = Math.hypot(light.x, light.y, 0.8);
      const L = [light.x / ln, light.y / ln, 0.8 / ln];
      const m = morph.current;
      m.t = Math.min(1, m.t + 0.02);
      const mt = m.t * m.t * (3 - 2 * m.t);
      const ang = reduce ? 0.6 : now * 0.00025;
      const ca = Math.cos(ang), sa = Math.sin(ang);
      const tilt = 0.5, ct = Math.cos(tilt), st = Math.sin(tilt);
      const scale = Math.min(cols * (cw / chh) * 0.47, rows * 0.45); // radius in rows; cells are ~1.7x taller than wide
      const cxc = cols * 0.52, cyc = rows * 0.52;
      const tick = Math.floor(now / 70);
      const eps = 0.01;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const px = ((i - cxc) * (cw / chh)) / scale;
          const py = (j - cyc) / scale;
          if (px * px + py * py > 2.2) continue;
          // orthographic ray along z, march
          let z = -2, d = 0, hit = false;
          let x = 0, y = 0, zz = 0;
          for (let s = 0; s < 22; s++) {
            // rotate sample into object space (Y spin, then X tilt)
            const rx = px * ca - z * sa, rz = px * sa + z * ca;
            const ry = py * ct - rz * st, rz2 = py * st + rz * ct;
            x = rx; y = ry; zz = rz2;
            d = sdf(m.from, x, y, zz) * (1 - mt) + sdf(m.to, x, y, zz) * mt;
            if (d < 0.01) { hit = true; break; }
            z += d;
            if (z > 2) break;
          }
          if (!hit) continue;
          const f = (a: number, b: number, c: number) => sdf(m.from, a, b, c) * (1 - mt) + sdf(m.to, a, b, c) * mt;
          let nx = f(x + eps, y, zz) - f(x - eps, y, zz);
          let ny = f(x, y + eps, zz) - f(x, y - eps, zz);
          let nz = f(x, y, zz + eps) - f(x, y, zz - eps);
          const nl = Math.hypot(nx, ny, nz) || 1;
          nx /= nl; ny /= nl; nz /= nl;
          // back to view space approx (normal rotates with object; good enough for shading)
          const vx = nx * ca + nz * sa;
          const vz0 = -nx * sa + nz * ca;
          const vy = ny * ct + vz0 * st;
          const vz = -ny * st + vz0 * ct;
          const lum = Math.max(0, vx * L[0] + vy * L[1] - vz * L[2]);
          const b = 0.16 + lum * 0.84; // ambient keeps the dark side legible
          const idx = (j * cols + i) % text.length;
          let ch = text[idx];
          if (!reduce && ((i * 73856093) ^ (j * 19349663) ^ tick) % 23 === 0) ch = text[(idx + tick) % text.length];
          if (ch === " ") continue;
          ctx.globalAlpha = b;
          ctx.fillText(ch, i * cw, j * chh);
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
      else draw(performance.now());
    });
    io.observe(cv);
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      light.tx = ((e.clientX - r.left) / r.width - 0.5) * 2.2;
      light.ty = ((e.clientY - r.top) / r.height - 0.5) * 2.2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [words]);

  const next = () => {
    const n = (shapeRef.current + 1) % SHAPES.length;
    morph.current = { from: shapeRef.current, to: n, t: 0 };
    shapeRef.current = n;
    setShape(n);
  };

  return (
    <div className={`relative ${className}`}>
      <canvas ref={ref} className="h-full w-full cursor-pointer" onClick={next} aria-hidden />
      <button
        type="button"
        onClick={next}
        className={`${mono} absolute top-[22%] left-[4%] rounded-[3px] bg-paper px-1.5 py-0.5 text-[10px] text-ink transition-transform hover:scale-105`}
        aria-label={`Morph the figure (now ${SHAPES[shape]})`}
      >
        Click
      </button>
    </div>
  );
}
