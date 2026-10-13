"use client";

import { useEffect, useRef } from "react";

type Props = {
  words?: string[];
  className?: string;
};

/**
 * Generative concentric-ring text spiral on a canvas. Rings rotate at different
 * speeds and zoom subtly with scroll. Pauses when offscreen; renders static
 * under reduced motion. No React state in the animation loop.
 */
export default function RadialVortex({
  words = ["FORWARD DEPLOYED", "AGENTIC AI", "SOVEREIGN CLOUD", "AIR-GAPPED LLMS", "MULTI-AGENT GRAPHS"],
  className = "",
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
    const accent = root.getPropertyValue("--accent").trim() || "#5b8dff";
    const phrase = (words.join("  •  ") + "  •  ").split("");

    // sparse starfield, positioned once in normalized space
    const stars = Array.from({ length: 140 }, () => ({
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
      const cx = W * (W > H ? 0.68 : 0.5);
      const cy = H * 0.5;
      const zoom = 1 + Math.min(window.scrollY, 600) * 0.0006;

      ctx.clearRect(0, 0, W, H);

      // starfield
      for (const s of stars) {
        ctx.globalAlpha = s.a;
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      // concentric text rings
      const rings = min < 700 * dpr ? 5 : 7;
      for (let i = 0; i < rings; i++) {
        const radius = (0.1 + i * 0.12) * min * zoom;
        const fontSize = (10 + i * 2.2) * dpr;
        ctx.font = `500 ${fontSize}px ${mono}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const dir = i % 2 ? -1 : 1;
        const rot = t * 0.00018 * dir * (1 + i * 0.12);
        const circ = 2 * Math.PI * radius;
        const count = Math.max(10, Math.floor(circ / (fontSize * 0.62)));
        for (let j = 0; j < count; j++) {
          const ch = phrase[j % phrase.length];
          const ang = rot + (j / count) * Math.PI * 2;
          const x = cx + Math.cos(ang) * radius;
          const y = cy + Math.sin(ang) * radius;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(ang + Math.PI / 2);
          ctx.globalAlpha = 0.12 + (i / rings) * 0.7;
          ctx.fillStyle = i === 3 ? accent : fg;
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
  }, [words]);

  return <canvas ref={ref} className={`h-full w-full ${className}`} aria-hidden />;
}
