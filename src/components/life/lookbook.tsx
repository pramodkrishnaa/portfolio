"use client";

import Image from "next/image";
import { TbArrowsDiagonal } from "react-icons/tb";
import Reveal from "@/components/reveal";
import { useLightbox } from "./lightbox";
import { PERSONAL_EXHIBITIONS as E } from "@/content/site";

function dims(aspect: string, base = 1200) {
  const [w, h] = aspect.split(":").map(Number);
  return { w: base, h: Math.round((base * h) / w) };
}

// 4 seeded frames per exhibition so the lightbox has a gallery to navigate.
function gallery(id: string, aspect: string, title: string) {
  const { w, h } = dims(aspect, 1400);
  return Array.from({ length: 4 }, (_, i) => ({
    src: `https://picsum.photos/seed/pks-${id}-${i}/${w}/${h}`,
    alt: `${title} — frame ${i + 1}`,
  }));
}

export default function Lookbook() {
  const { open } = useLightbox();

  return (
    <div className="mx-auto max-w-[1400px] space-y-32 px-5 py-28 sm:px-8">
      {E.map((ex, i) => {
        const imgs = gallery(ex.id, ex.mediaSlot.aspectRatio, ex.title);
        const { w, h } = dims(ex.mediaSlot.aspectRatio);
        const flip = i % 2 === 1;

        return (
          <Reveal
            key={ex.id}
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <button
              type="button"
              onClick={() => open(imgs, 0)}
              className={`group relative block overflow-hidden rounded-xl border border-line ${flip ? "lg:order-2" : ""}`}
              style={{ aspectRatio: `${w} / ${h}` }}
              aria-label={`Open ${ex.title} gallery`}
            >
              <Image
                src={imgs[0].src}
                alt={imgs[0].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" aria-hidden />
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/90 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <TbArrowsDiagonal size={18} aria-hidden />
              </span>
            </button>

            <div className={flip ? "lg:order-1" : ""}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {ex.category} · {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                {ex.title}
              </h2>
              <p className="mt-5 text-lg italic leading-relaxed text-fg/85">“{ex.quote}”</p>
              <div className="mt-5 space-y-3 text-muted">
                {ex.story.map((p, j) => (
                  <p key={j} className="leading-relaxed">{p}</p>
                ))}
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {ex.metricsOrBadges.map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
