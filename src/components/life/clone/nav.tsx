"use client";

import { TbArrowRight } from "react-icons/tb";
import { useWorldTransition } from "@/components/site/world-transition";

/** Minimal life nav: wordmark + a single bold toggle back to the tech world,
 *  routed through the signature curtain transition. */
export default function LifeNav() {
  const { go } = useWorldTransition();
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8">
        <span className="pointer-events-auto font-display text-xl tracking-wide text-bone mix-blend-difference">
          PKS
        </span>
        <button
          type="button"
          onClick={() => go("/")}
          className="group pointer-events-auto inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-night transition-transform hover:scale-[1.03] active:translate-y-px"
        >
          To tech
          <TbArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden />
        </button>
      </div>
    </header>
  );
}
