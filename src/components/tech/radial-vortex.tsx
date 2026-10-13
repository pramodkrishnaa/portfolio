"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

type Props = {
  words?: string[];
  className?: string;
  /** Optional 0..1 scroll drive. When set, the spiral zooms into its center
   *  as the value rises (the "dive"). When omitted, a gentle scroll zoom is used. */
  driveRef?: MutableRefObject<number>;
};

/**
 * Generative concentric-ring text spiral on a canvas. Rings rotate at different
 * speeds. A scroll "drive" (0..1) zooms the whole field into its center, matching
 * the dive effect on contentarchitecture.dev. Pauses when offscreen; renders
 * static under reduced motion. No React state in the animation loop.
 */
export default function RadialVortex({
  words = ["LOREM IPSUM DOLOR SIT AMET"],
  className = "",
  driveRef,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const root = getComputedStyle(document.documentElement);
    const mono = root.getPropertyValue("--font-geist-mono").trim() || "monospace";
    const fg = root.getPropertyValue("--fg").trim() || "#ededf0";
    const phrase = (words.join("  •  ") + "  •  ").split("");

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.5 + 0.1,
    }));

    let raf = 0;
    let t = 0;
    let running = true;

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting;
        if (running && !reduce) loop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const min = Math.min(W, H);
      const cx = W * (W > H ? 0.6 : 0.5);
      const cy = H * 0.5;

      // dive: either the scroll-driven value, or a gentle fallback from scrollY
      const drive = driveRef
        ? driveRef.current
        : Math.min(window.scrollY, 600) * 0.0006;
      const zoom = 1 + drive * (driveRef ? 7 : 1);

      ctx.clearRect(0, 0, W, H);

      // starfield (also drifts outward slightly as we dive)
      for (const s of stars) {
        ctx.globalAlpha = s.a * (1 - drive * 0.6);
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      // concentric text rings
      const ringCount = min < 700 * dpr ? 7 : 10;
      for (let i = 0; i < ringCount; i++) {
        const radius = (0.07 + i * 0.1) * min * zoom;
        if (radius > min * 1.4) continue; // skip rings that have zoomed off-screen
        const fontSize = (8.5 + i * 1.7) * dpr;
        ctx.font = `500 ${fontSize}px ${mono}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const dir = i % 2 ? -1 : 1;
        const rot = t * 0.00016 * dir * (1 + i * 0.1);
        const circ = 2 * Math.PI * radius;
        const count = Math.max(10, Math.floor(circ / (fontSize * 0.6)));
        // rings fade in toward the edge, and the whole field dims as it dives
        const ringAlpha = (0.1 + (i / ringCount) * 0.7) * (1 - drive * 0.5);
        for (let j = 0; j < count; j++) {
          const ch = phrase[j % phrase.length];
          const ang = rot + (j / count) * Math.PI * 2;
          const x = cx + Math.cos(ang) * radius;
          const y = cy + Math.sin(ang) * radius;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(ang + Math.PI / 2);
          ctx.globalAlpha = ringAlpha;
          ctx.fillStyle = fg;
          ctx.fillText(ch, 0, 0);
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!running) return;
      t += 16;
      draw();
      raf = requestAnimationFrame(loop);
    };

    if (reduce) draw();
    else loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [words, driveRef]);

  return <canvas ref={ref} className={`h-full w-full ${className}`} aria-hidden />;
}
