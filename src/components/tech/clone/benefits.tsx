"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbShieldLock, TbPlugConnected, TbTargetArrow } from "react-icons/tb";
import Seam from "./seam";

const TABS = [
  {
    id: "architecture.ts",
    code: `export const system = defineSystem({
  runtime: "Air-gapped Kubernetes",
  serving: ["vLLM", "quantized GGUF / AWQ"],
  agents: {
    sdk: "Claude Agent SDK + LangGraph",
    retrieval: "Qdrant hybrid (BM25 + dense)",
    guardrails: ["RBAC", "context caching"],
  },
  observability: ["Prometheus", "Grafana", "Loki"],
})`,
  },
  {
    id: "metrics.groq",
    code: `*[_type == "deployment" && shipped == true] | order(impact desc) {
  name,
  precisionAt5,     // 94.2% on technical docs
  proposalLatency,  // -60% review time
  waypointRate,     // 92% sim-to-real
  tokenCost,        // -40%
  reliability,      // 99.8% uptime
}`,
  },
  {
    id: "schema.sql",
    code: `create table bids (
  id          uuid primary key,
  reviewer_id uuid references users(id),
  document    jsonb not null
);

-- row-level security: reviewers see only assigned bids
create policy bid_access on bids
  using (reviewer_id = current_user_id());`,
  },
];

const TELEMETRY = [
  { icon: TbShieldLock, label: "AIR-GAPPED" },
  { icon: TbPlugConnected, label: "MCP READY" },
  { icon: TbTargetArrow, label: "94.2% P@5" },
];

/** Benefits section: ASCII-curtain seam into an interactive multi-tab code
 *  window (tab-switch crossfade + telemetry strip), carrying the real stack. */
export default function CloneBenefits() {
  const [active, setActive] = useState(TABS[0].id);
  const code = TABS.find((t) => t.id === active)?.code ?? "";

  return (
    <>
      <Seam tone="ink" />
      <section id="stack" className="relative isolate bg-ink px-6 pb-28 pt-4 text-paper sm:px-10 lg:px-16 lg:pb-40">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            Every decision already made.
            <br />
            So you can skip to the actual work.
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 overflow-hidden rounded-xl border border-paper/12 bg-[#0c0c0e] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* window header */}
            <div className="flex items-center justify-between border-b border-paper/10 bg-paper/[0.03] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-paper/50" />
              </div>
              <span className="hidden font-mono text-[11px] uppercase tracking-wider text-paper/45 sm:block">
                this is the actual repo.
              </span>
              <div className="flex items-center gap-1 rounded-lg border border-paper/5 bg-black/40 p-1">
                {TABS.map((t) => {
                  const isActive = t.id === active;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActive(t.id)}
                      className={`relative rounded-md px-3 py-1 font-mono text-[11px] transition-colors ${
                        isActive ? "text-paper" : "text-paper/40 hover:text-paper/70"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeCodeTab"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-md border border-paper/10 bg-paper/10"
                        />
                      )}
                      <span className="relative z-10">{t.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* code body */}
            <div className="min-h-[260px] overflow-x-auto p-6">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                  className="font-mono text-[13px] leading-[1.6] text-paper/70 lg:text-sm"
                >
                  <code>{code}</code>
                </motion.pre>
              </AnimatePresence>
            </div>

            {/* telemetry footer */}
            <div className="grid grid-cols-3 border-t border-paper/10 bg-paper/[0.02] px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-paper/45">
              {TELEMETRY.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-paper/80" aria-hidden />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
