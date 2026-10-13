"use client";

import { useWorld } from "@/lib/use-world";
import { useWorldTransition } from "./world-transition";

/** ON/OFF switch: ON = work (tech world), OFF = off the clock (life world).
 *  Flipping it fires the HUD transition and routes to the other world.
 *  Inherits text color from the parent (uses currentColor). */
export default function WorldSwitch({ className = "" }: { className?: string }) {
  const world = useWorld();
  const { go } = useWorldTransition();
  const on = world === "tech"; // work mode ON

  return (
    <button
      type="button"
      onClick={() => go(on ? "/life" : "/")}
      aria-label={on ? "Switch work mode off (go to life)" : "Switch work mode on (go to tech)"}
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-55">Work</span>
      <span className="relative h-6 w-12 rounded-full border border-current/35 transition-colors group-hover:border-current/70">
        <span
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all duration-300 ease-out"
          style={{ left: on ? "calc(100% - 20px)" : "4px", background: on ? "currentColor" : "#ff2d1a" }}
        />
      </span>
      <span
        className="w-7 font-mono text-[11px] font-semibold uppercase"
        style={{ color: on ? undefined : "#ff2d1a" }}
      >
        {on ? "On" : "Off"}
      </span>
    </button>
  );
}
