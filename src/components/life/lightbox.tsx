"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TbX, TbChevronLeft, TbChevronRight } from "react-icons/tb";

type Img = { src: string; alt: string };
type Ctx = { open: (images: Img[], index: number) => void };

const LightboxContext = createContext<Ctx | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within <LightboxProvider>");
  return ctx;
}

export default function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<Img[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const open = (imgs: Img[], i: number) => {
    setImages(imgs);
    setIndex(i);
  };
  const close = () => setIndex(null);
  const step = (dir: number) =>
    setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length));

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length]);

  const current = index === null ? null : images[index];

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm sm:p-10"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <TbX size={20} aria-hidden />
            </button>

            {images.length > 1 && (
              <>
                <NavButton side="left" onClick={(e) => { e.stopPropagation(); step(-1); }} />
                <NavButton side="right" onClick={(e) => { e.stopPropagation(); step(1); }} />
              </>
            )}

            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-lg object-contain"
              initial={reduce ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-white/60">
              {index! + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
}) {
  const Icon = side === "left" ? TbChevronLeft : TbChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 ${side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"} flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white`}
    >
      <Icon size={24} aria-hidden />
    </button>
  );
}
