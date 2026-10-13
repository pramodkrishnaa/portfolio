"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TbX } from "react-icons/tb";
import { useWorld } from "@/lib/use-world";
import { useWorldTransition } from "./world-transition";
import { PERSONAL_INFO as P, TECHNICAL_DISCIPLINES as D, BLOG_POSTS } from "@/content/site";

type Line = { kind: "cmd" | "out"; text: string };

const HELP = [
  "available commands:",
  "  help      this list",
  "  whoami    the short version",
  "  stack     disciplines i work across",
  "  work      selected proof of work",
  "  writing   recent essays",
  "  social    where to find me",
  "  life      cross into the personal world",
  "  tech      back to the technical world",
  "  clear     wipe the screen",
];

export default function CommandLayer() {
  const world = useWorld();
  const { go } = useWorldTransition();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "pks shell · type 'help' to start" },
  ]);
  const history = useRef<string[]>([]);
  const hIndex = useRef<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // global hotkeys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t.tagName === "INPUT" || t.tagName === "TEXTAREA";
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (!typing && e.key.toLowerCase() === "p" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        go(world === "tech" ? "/life" : "/");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [world, go]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    history.current.unshift(raw);
    hIndex.current = -1;
    const out: string[] = [];
    switch (cmd) {
      case "help": out.push(...HELP); break;
      case "whoami": out.push(P.name, P.tagline, P.location); break;
      case "stack": out.push(...D.map((d) => `${d.categoryNumber}  ${d.title}`)); break;
      case "work":
        out.push(...D.slice(0, 4).map((d) => `· ${d.proofOfWork.label} — ${d.proofOfWork.metric}`));
        break;
      case "writing": out.push(...BLOG_POSTS.map((b) => `· ${b.title}`)); break;
      case "social": out.push(`github   ${P.github}`, `linkedin ${P.linkedin}`, `email    ${P.email}`); break;
      case "clear": setLines([]); return;
      case "life": setOpen(false); go("/life"); return;
      case "tech": setOpen(false); go("/"); return;
      default: out.push(`command not found: ${cmd}. try 'help'.`);
    }
    setLines((l) => [...l, { kind: "cmd", text: raw }, ...out.map((t) => ({ kind: "out" as const, text: t }))]);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIndex.current < history.current.length - 1) setInput(history.current[++hIndex.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIndex.current > 0) setInput(history.current[--hIndex.current]);
      else { hIndex.current = -1; setInput(""); }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command terminal"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-line-strong bg-bg-elev shadow-2xl"
            initial={reduce ? false : { y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: -16, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-mono text-xs text-dim">pks@portfolio ~ %</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close terminal"
                className="flex h-7 w-7 items-center justify-center rounded text-dim transition-colors hover:bg-bg-raise hover:text-fg"
              >
                <TbX size={15} aria-hidden />
              </button>
            </div>

            <div ref={bodyRef} className="max-h-[50vh] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
              {lines.map((l, i) => (
                <p key={i} className={l.kind === "cmd" ? "text-fg" : "whitespace-pre-wrap text-muted"}>
                  {l.kind === "cmd" ? <span className="text-accent">❯ </span> : null}
                  {l.text}
                </p>
              ))}
              <div className="mt-1 flex items-center gap-2">
                <span className="text-accent">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onInputKey}
                  aria-label="Terminal input"
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 bg-transparent font-mono text-[13px] text-fg outline-none"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
