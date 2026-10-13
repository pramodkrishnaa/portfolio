"use client";

import { useEffect, useRef, useState } from "react";
import { SHOWCASE } from "@/content/cv";
import { mono, Scramble } from "./ui";
import { useInView } from "./features";

type P = (typeof SHOWCASE.projects)[number];
const RAMP = " .,:;-=+*#%@";

/** Image → shimmering ASCII scanlines on canvas. The halftone is rendered
 *  once into a cached bitmap; each frame blits it (building in top→bottom on
 *  first view) and adds a sparse shimmer + the odd jittered row, CRT-style. */
function ScanAscii({ src, seen }: { src: string; seen: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const font = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "monospace";
    const rows = 64, cols = Math.round(rows * 2.9);
    let lum: Float32Array | null = null;
    let cache: HTMLCanvasElement | null = null;
    let raf = 0, visible = false, born = 0;

    const bake = () => {
      if (!lum || !cv.width) return;
      const W = cv.width, H = cv.height, ch = H / rows, cw = W / cols;
      cache = document.createElement("canvas");
      cache.width = W; cache.height = H;
      const g = cache.getContext("2d")!;
      g.font = `500 ${ch * 1.05}px ${font}`;
      g.textBaseline = "top";
      g.fillStyle = "#ebebec";
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          const v = lum[y * cols + x];
          const ci = Math.round(Math.pow(v, 0.8) * (RAMP.length - 1));
          if (ci === 0) continue;
          g.globalAlpha = 0.25 + v * 0.75;
          g.fillText(RAMP[ci], x * cw, y * ch);
        }
    };
    const resize = () => { cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr; bake(); };
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    const img = new Image();
    img.onload = () => {
      const s = document.createElement("canvas");
      s.width = cols; s.height = rows;
      const g = s.getContext("2d")!;
      // cells are ~1.8x taller than wide, so map the (16:10) image onto the grid directly
      g.drawImage(img, 0, 0, cols, rows);
      const d = g.getImageData(0, 0, cols, rows).data;
      lum = new Float32Array(cols * rows);
      for (let k = 0; k < cols * rows; k++) lum[k] = (d[k * 4] * 0.3 + d[k * 4 + 1] * 0.59 + d[k * 4 + 2] * 0.11) / 255;
      bake();
    };
    img.src = src;

    const draw = (now: number) => {
      if (!cache || !lum) return;
      const W = cv.width, H = cv.height, ch = H / rows, cw = W / cols;
      ctx.clearRect(0, 0, W, H);
      const built = reduce ? rows : Math.min(rows, ((now - born) / 650) * rows);
      const bh = Math.round(built * ch);
      if (bh > 0) ctx.drawImage(cache, 0, 0, W, bh, 0, 0, W, bh);
      if (reduce || built < rows) return;
      const tick = Math.floor(now / 80);
      // one jittered scan row
      const jy = (tick * 7) % rows, off = ((tick % 3) - 1) * cw;
      ctx.clearRect(0, jy * ch, W, ch);
      ctx.drawImage(cache, 0, jy * ch, W, ch, off, jy * ch, W, ch);
      // sparse shimmer
      ctx.font = `500 ${ch * 1.05}px ${font}`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "#ebebec";
      for (let k = 0; k < 90; k++) {
        const x = (k * 131 + tick * 53) % cols, y = (k * 71 + tick * 29) % rows;
        const v = Math.min(1, lum[y * cols + x] + 0.3);
        if (v < 0.35) continue;
        ctx.globalAlpha = v;
        ctx.fillText(RAMP[Math.round(v * (RAMP.length - 1))], x * cw, y * ch);
      }
      ctx.globalAlpha = 1;
    };
    const loop = (now: number) => { draw(now); if (visible && !reduce) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(cv);
    born = performance.now();
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, [src, seen]);
  return <canvas ref={ref} className={`h-full w-full ${seen ? "" : "invisible"}`} aria-hidden />;
}

function Card({ p, onEnter }: { p: P; onEnter: (p: P | null) => void }) {
  const [ref, seen] = useInView<HTMLElement>("0px 0px -8% 0px");
  return (
    <article ref={ref} className="group" onPointerEnter={() => onEnter(p)}>
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0f]">
        <div className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-0">
          <ScanAscii src={p.img} seen={seen} />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.img} alt={`${p.name}: ${p.impact}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </div>
      <p className={`${mono} mt-3 text-paper`}>{p.name}</p>
    </article>
  );
}

/** Info card that follows the cursor with a little lag; values scramble in. */
function InfoCard({ p }: { p: P | null }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const pos = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    const move = (e: PointerEvent) => { pos.tx = e.clientX + 22; pos.ty = e.clientY + 18; };
    const loop = () => {
      if (Math.abs(pos.tx - pos.x) + Math.abs(pos.ty - pos.y) < 0.3) { raf = requestAnimationFrame(loop); return; }
      pos.x += (pos.tx - pos.x) * 0.18;
      pos.y += (pos.ty - pos.y) * 0.18;
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className={`${mono} pointer-events-none fixed top-0 left-0 z-40 hidden w-[min(24rem,40vw)] rounded-md border border-paper/10 bg-[#151517]/95 p-3 text-[10px] text-paper/45 transition-opacity duration-150 lg:block ${p ? "opacity-100" : "opacity-0"}`}
    >
      {p && (
        <div className="space-y-1.5">
          <Field k="Year" v={p.year} />
          <Field k="Role" v={p.role} />
          <Field k="Impact" v={p.impact} />
        </div>
      )}
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  const long = v.length > 26;
  return (
    <div className="flex justify-between gap-4">
      <span>{k}</span>
      <span className="relative min-w-0 flex-1 overflow-hidden text-right text-paper">
        {long ? (
          <span className="inline-block animate-[marquee_9s_linear_infinite] whitespace-nowrap">{v} · {v} ·&nbsp;</span>
        ) : (
          <Scramble text={v} trigger={1} />
        )}
      </span>
    </div>
  );
}

export default function Showcase() {
  const [hover, setHover] = useState<P | null>(null);
  return (
    <section id="showcase" className="relative bg-ink px-6 pt-10 pb-28 text-paper sm:px-10 lg:px-[5vw]">
      <h2 className="text-[clamp(1.6rem,2.3vw,2.3rem)] font-medium tracking-[-0.02em]">{SHOWCASE.title}</h2>
      <p className="mt-4 max-w-[38rem] text-[14px] leading-relaxed text-paper/55">{SHOWCASE.lead}</p>
      <div className="mt-14 grid grid-cols-1 gap-x-[1vw] gap-y-[8svh] md:grid-cols-2" onPointerLeave={() => setHover(null)}>
        {SHOWCASE.projects.map((p) => (
          <Card key={p.name} p={p} onEnter={setHover} />
        ))}
      </div>
      <InfoCard p={hover} />
    </section>
  );
}
