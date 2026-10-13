"use client";

import { useState } from "react";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import Seam from "./seam";

const WORK = [
  { q: "An autonomous enterprise AI workforce resolving HRMS workflows end to end, with live tool access and context caching.", name: "AUTONOMOUS AI WORKFORCE @ QUADGEN", role: "40% TOKEN COST · 99.8% RELIABILITY" },
  { q: "On-premise, fully air-gapped bid management for BFSI with role-based access control and zero data leakage.", name: "AIR-GAPPED BID PLATFORM (BFSI)", role: "-60% PROPOSAL REVIEW LATENCY" },
  { q: "Continuous-control flight policies trained with PPO in simulation, then deployed to hardware over MAVLink telemetry.", name: "RL FLIGHT POLICY (PPO)", role: "92% REAL-WORLD WAYPOINT HIT RATE" },
  { q: "Hybrid BM25 + dense retrieval over thousands of technical documents, measured scientifically against precision@k.", name: "ENTERPRISE RAG PIPELINE", role: "94.2% PRECISION@5 ON EVAL" },
];

/** Showcase: rotating real-work slides with label + metric, slide counter and
 *  prev/next. Black panel, faint scattered mono-text background. */
export default function CloneShowcase() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + WORK.length) % WORK.length);
  const cur = WORK[i];

  return (
    <>
      <Seam tone="ink" />
      <section id="showcase" className="relative isolate overflow-hidden bg-ink px-6 py-28 text-paper sm:px-10 lg:px-16 lg:py-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden font-mono text-[10px] uppercase leading-5 tracking-widest text-paper/[0.04]">
          {Array.from({ length: 40 }).map((_, r) => (
            <div key={r} className="whitespace-nowrap">
              {"THE WORK THAT GETS REMEMBERED / SHIPPED / PRODUCTION / ".repeat(6)}
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-paper/45">
            The work that gets remembered.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
            <blockquote key={i} className="animate-[fadeIn_0.5s_ease] text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.6rem]">
              {cur.q}
            </blockquote>
            <div className="flex items-end">
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-full border border-paper/25" aria-hidden />
                <div className="font-mono text-xs">
                  <div className="text-paper">{cur.name}</div>
                  <div className="text-paper/50">{cur.role}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-6 font-mono text-sm">
            <button onClick={() => go(-1)} aria-label="Previous" className="flex h-9 w-9 items-center justify-center rounded-sm border border-paper/20 transition-colors hover:border-paper">
              <TbArrowLeft aria-hidden />
            </button>
            <span className="tabular-nums text-paper/70">
              {String(i + 1).padStart(2, "0")} <span className="text-paper/30">/ {String(WORK.length).padStart(2, "0")}</span>
            </span>
            <button onClick={() => go(1)} aria-label="Next" className="flex h-9 w-9 items-center justify-center rounded-sm border border-paper/20 transition-colors hover:border-paper">
              <TbArrowRight aria-hidden />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
