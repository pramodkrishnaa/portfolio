"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Full-screen HUD boot/power-down overlay used by the world switch.
 *  `dir`: "off" = entering the life world (loud, flame accent);
 *         "on"  = re-engaging the tech world (mono accent).
 *  `stage`: "boot" plays the sequence; "reveal" powers down to expose the page. */
export default function HudTransition({
  stage,
  dir,
}: {
  stage: "boot" | "reveal";
  dir: "off" | "on";
}) {
  const accent = dir === "off" ? "#ff2d1a" : "#eaeaec";
  const title = dir === "off" ? "OFF THE CLOCK" : "WORK MODE";
  const lines =
    dir === "off"
      ? ["> DISENGAGING WORK MODE", "> NEURAL HANDSHAKE ........ OK", "> DRIFT SYNC ............. 100%", "> ENTERING  //  OFF THE CLOCK"]
      : ["> RE-ENGAGING WORK MODE", "> SECURE CHANNEL ......... OK", "> SYSTEMS ............... ONLINE", "> ENTERING  //  WORK MODE"];

  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (stage !== "boot") return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  const ring = (cls: string, inset: string, dashed: boolean, op: number) => (
    <div
      className={`absolute rounded-full ${cls}`}
      style={{
        inset,
        borderWidth: 1,
        borderStyle: dashed ? "dashed" : "solid",
        borderColor: accent,
        opacity: op,
      }}
    />
  );

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: stage === "reveal" ? 0 : 1, scale: stage === "reveal" ? 1.08 : 1 }}
      transition={{ duration: stage === "reveal" ? 0.5 : 0.18, ease: "easeInOut" }}
      className="pointer-events-none fixed inset-0 z-[95] overflow-hidden bg-black"
    >
      {/* scan line */}
      <div
        className="absolute inset-x-0 h-24 [animation:hudScan_1.4s_linear_infinite]"
        style={{ background: `linear-gradient(to bottom, transparent, ${accent}22, transparent)` }}
      />

      {/* corner brackets */}
      {[
        "left-6 top-6 border-l-2 border-t-2",
        "right-6 top-6 border-r-2 border-t-2",
        "left-6 bottom-6 border-l-2 border-b-2",
        "right-6 bottom-6 border-r-2 border-b-2",
      ].map((c) => (
        <div key={c} className={`absolute h-10 w-10 ${c}`} style={{ borderColor: accent, opacity: 0.7 }} />
      ))}

      {/* centered reticle */}
      <div className="absolute left-1/2 top-1/2 h-[min(64vmin,560px)] w-[min(64vmin,560px)] -translate-x-1/2 -translate-y-1/2 [animation:hudFlicker_2.2s_steps(1)_infinite]">
        <div className="absolute inset-0 [animation:hudSpin_9s_linear_infinite]">{ring("", "0", true, 0.55)}</div>
        <div className="absolute inset-[9%] [animation:hudSpinRev_6s_linear_infinite]">{ring("", "0", false, 0.3)}</div>
        <div className="absolute inset-[20%] [animation:hudSpin_14s_linear_infinite]">{ring("", "0", true, 0.4)}</div>
        {ring("", "32%", false, 0.25)}
        {/* crosshair */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: accent, opacity: 0.25 }} />
        <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2" style={{ background: accent, opacity: 0.25 }} />
        {/* center readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center font-mono" style={{ color: accent }}>
          <span className="text-6xl font-semibold tabular-nums tracking-tight sm:text-7xl">{String(pct).padStart(3, "0")}</span>
          <span className="mt-2 text-[11px] uppercase tracking-[0.4em] opacity-70">sync</span>
        </div>
      </div>

      {/* big title */}
      <div className="absolute inset-x-0 bottom-28 text-center">
        <motion.p
          key={title}
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.12em" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-4xl uppercase sm:text-6xl"
          style={{ color: accent }}
        >
          {title}
        </motion.p>
      </div>

      {/* boot readout */}
      <div className="absolute bottom-10 left-8 font-mono text-[11px] uppercase tracking-wider" style={{ color: accent }}>
        {lines.map((l, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.85, x: 0 }}
            transition={{ duration: 0.25, delay: 0.15 + i * 0.28 }}
          >
            {l}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
