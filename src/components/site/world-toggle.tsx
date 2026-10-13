"use client";

import { TbArrowRight } from "react-icons/tb";
import { useWorld } from "@/lib/use-world";
import { useWorldTransition } from "./world-transition";

/** Routes to the opposite world through the signature curtain transition. */
export default function WorldToggle({ className = "" }: { className?: string }) {
  const world = useWorld();
  const { go } = useWorldTransition();
  const to = world === "tech" ? "/life" : "/";
  const label = world === "tech" ? "Life" : "Tech";

  return (
    <button
      type="button"
      onClick={() => go(to)}
      className={`group inline-flex items-center gap-2 rounded-sm border border-line px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-fg ${className}`}
    >
      <span className="text-dim">to</span>
      <span className="text-fg">{label}</span>
      <TbArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden />
    </button>
  );
}
