"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbChevronDown } from "react-icons/tb";
import Seam from "./seam";

const FAQS: Array<[string, string]> = [
  ["What do you do?", "Forward Deployed + Agentic AI engineering: I scope ambiguous enterprise needs, architect the systems, and run what I ship."],
  ["What's your stack?", "Claude Agent SDK, LangGraph, FastAPI, Qdrant, vLLM, PyTorch, PostgreSQL, Kubernetes, and the sovereign infra around them."],
  ["Where are you based?", "Bengaluru, India. Open to remote or on-site."],
  ["Are you available?", "Yes, for senior Forward Deployed and Agentic AI roles, and scoped consulting engagements."],
  ["Can I see the code?", "Yes. I build in the open at github.com/ApexKrish and github.com/pramodkrishnaa."],
  ["How do I reach you?", "Email pramodkrishnaa29@gmail.com, or the contact button. Messages hit a real inbox, never a fake success screen."],
];

/** FAQ: "before you reach out" accordion on a black panel. Smooth height +
 *  rotating chevron. Real answers. */
export default function CloneFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <Seam tone="ink" />
      <section id="faq" className="bg-ink px-6 py-28 text-paper sm:px-10 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <h2 className="text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Before you
            <br />
            reach out
          </h2>

          <div className="divide-y divide-paper/10 border-y border-paper/10">
            {FAQS.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={q} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-lg font-medium tracking-tight">{q}</span>
                    <TbChevronDown
                      className={`h-5 w-5 shrink-0 text-paper/50 transition-transform duration-300 ${isOpen ? "rotate-180 text-paper" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pt-3 text-sm leading-relaxed text-paper/55">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
