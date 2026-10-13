"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { REPO, ME } from "@/content/cv";
import { mono, progressOf, ramp, smooth } from "./ui";

const SCRUB_VH = 380;

type Line = { kind: "cmd" | "out"; text: string };

/**
 * The CV as a repository, in a fake IDE. The window rises in with the page,
 * expands to full-bleed once pinned, then page scroll scrubs the open file.
 * At the end it shrinks back to a card and leaves with the page.
 * File tree is clickable; the terminal accepts real commands.
 */
export default function Repo() {
  const wrap = useRef<HTMLElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const editor = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState("README.md");
  const [edition, setEdition] = useState<"human" | "agent">("human");
  const [open, setOpen] = useState<Record<string, boolean>>({ research: true, experience: true });
  const [term, setTerm] = useState<Line[]>([
    { kind: "cmd", text: `hire --role "ai-research"   # replies within a day` },
  ]);
  const [input, setInput] = useState("");

  const body = edition === "agent" ? REPO.files["llms.txt"] : REPO.files[file] ?? "";
  const lines = useMemo(() => body.split("\n"), [body]);

  useEffect(() => {
    let raf = 0, visible = false;
    const root = document.documentElement;
    const loop = () => {
      if (!wrap.current || !win.current || !editor.current || !visible) return; // unmounted / off-screen
      const p = progressOf(wrap.current);
      const pinned = wrap.current!.getBoundingClientRect().top <= 0 && p < 1;
      const grow = smooth(ramp(p, 0, 0.1)) * (1 - smooth(ramp(p, 0.9, 1)));
      const inset = (1 - grow) * 5.5; // vw
      const top = (1 - grow) * 14; // svh
      const w = win.current!;
      w.style.left = w.style.right = `${inset}vw`;
      w.style.top = `${top}svh`;
      w.style.bottom = `${(1 - grow) * 6}svh`;
      w.style.borderRadius = `${(1 - grow) * 10}px`;
      root.dataset.chrome = pinned && grow > 0.6 ? "hidden" : "";
      // scrub the editor
      const ed = editor.current!;
      const s = ramp(p, 0.1, 0.88);
      const max = ed.scrollHeight - ed.clientHeight;
      ed.scrollTop = s * max;
      if (thumb.current) thumb.current.style.top = `${s * 85}%`;
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
      else root.dataset.chrome = "";
    });
    io.observe(wrap.current!);
    return () => { cancelAnimationFrame(raf); io.disconnect(); root.dataset.chrome = ""; };
  }, []);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const [c, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");
    const all = Object.keys(REPO.files);
    let out: string[] = [];
    switch (c) {
      case "help": out = ["ls · cat <file> · open github|linkedin · whoami · hire · clear"]; break;
      case "ls": out = [REPO.tree.map((d) => (d.dir ? `${d.dir}/` : d.files.join("  "))).join("  ")]; break;
      case "tree": out = REPO.tree.flatMap((d) => (d.dir ? [`${d.dir}/`, ...d.files.map((f) => `  ${f}`)] : d.files)); break;
      case "cat": {
        const f = all.find((k) => k.toLowerCase() === arg.split("/").pop()?.toLowerCase());
        if (f) { setEdition("human"); setFile(f); out = [`opened ${f}`]; } else out = [`cat: ${arg || "?"}: no such file`];
        break;
      }
      case "whoami": out = [`${ME.name.toLowerCase()} — ${ME.role.toLowerCase()}, ${ME.location}`]; break;
      case "open":
        if (/git/i.test(arg)) window.open(ME.github, "_blank", "noopener");
        else if (/link/i.test(arg)) window.open(ME.linkedin, "_blank", "noopener");
        out = [arg ? `opening ${arg}…` : "open: github | linkedin"];
        break;
      case "hire": case "email": window.location.href = `mailto:${ME.email}`; out = [`composing mail to ${ME.email}…`]; break;
      case "clear": setTerm([]); return;
      case "sudo": out = ["nice try. permission granted only after a coffee chat."]; break;
      default: out = [`${c}: command not found. try: help`];
    }
    setTerm((t) => [...t.slice(-6), { kind: "cmd", text: cmd }, ...out.map((text) => ({ kind: "out" as const, text }))]);
  };

  return (
    <section ref={wrap} id="the-cv" className="relative bg-paper" style={{ height: `calc(100svh + ${SCRUB_VH}svh)` }}>
      <div className="sticky top-0 h-svh">
        <div
          ref={win}
          className="absolute flex flex-col overflow-hidden border border-paper/10 bg-[#161618] text-paper shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
          style={{ left: "5.5vw", right: "5.5vw", top: "14svh", bottom: "6svh", borderRadius: 10 }}
        >
          {/* title bar */}
          <div className={`${mono} flex items-center justify-between gap-3 border-b border-paper/10 bg-[#1c1c1f] px-3 py-2 text-[10px]`}>
            <div className="flex overflow-hidden rounded-[4px] border border-paper/10">
              {(["human", "agent"] as const).map((e) => (
                <button key={e} type="button" onClick={() => setEdition(e)} className={`px-2 py-1 transition-colors ${edition === e ? "bg-paper text-ink" : "text-paper/50 hover:text-paper"}`}>
                  {e === "human" ? "For humans" : "For agents"}
                </button>
              ))}
            </div>
            <span className="hidden tracking-[0.2em] text-paper/40 sm:block">{REPO.label}</span>
            <span className="hidden items-center gap-2 text-paper/40 md:flex">
              <span className="rounded-[3px] border border-paper/15 px-1.5 py-0.5">Tree ⌘⇧E</span>
              <span className="rounded-[3px] border border-paper/15 px-1.5 py-0.5">Search ⌘K</span>
            </span>
          </div>

          <div className="flex min-h-0 flex-1">
            {/* file tree */}
            <nav aria-label="CV files" className={`${mono} hidden w-[17%] min-w-[11rem] shrink-0 overflow-y-auto border-r border-paper/10 py-2 text-[10.5px] md:block`} data-lenis-prevent>
              {REPO.tree.map((d) => (
                <div key={d.dir || "root"}>
                  {d.dir && (
                    <button type="button" onClick={() => setOpen((o) => ({ ...o, [d.dir]: !o[d.dir] }))} className="flex w-full items-center gap-1.5 px-3 py-[3px] text-left text-paper/70 hover:text-paper">
                      <span className="w-2 text-paper/40">{open[d.dir] ? "▾" : "▸"}</span>▣ {d.dir}
                    </button>
                  )}
                  {(!d.dir || open[d.dir]) &&
                    d.files.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => { setEdition("human"); setFile(f); }}
                        className={`flex w-full items-center gap-1.5 py-[3px] pr-2 text-left transition-colors ${d.dir ? "pl-8" : "pl-5"} ${file === f && edition === "human" ? "bg-paper/10 text-paper" : "text-paper/50 hover:text-paper"}`}
                      >
                        ▤ {f}
                      </button>
                    ))}
                </div>
              ))}
            </nav>

            {/* editor */}
            <div className="relative flex min-w-0 flex-1 flex-col">
              <div className={`${mono} flex border-b border-paper/10 text-[10px]`}>
                <span className="border-r border-paper/10 bg-[#1f1f22] px-3 py-1.5 text-paper/80">{edition === "agent" ? "llms.txt" : file}</span>
              </div>
              <div ref={editor} className="relative min-h-0 flex-1 overflow-hidden font-mono text-[12px] leading-[1.75] sm:text-[12.5px]">
                <pre className="py-3">
                  {lines.map((l, i) => (
                    <div key={i} className="flex">
                      <span className="w-12 shrink-0 pr-4 text-right text-paper/25 select-none">{i + 1}</span>
                      <code className={`whitespace-pre-wrap pr-16 ${/^#/.test(l) ? "font-semibold text-paper" : /^- |^\d\./.test(l) ? "text-paper/75" : /^>|result:/.test(l) ? "text-paper" : "text-paper/60"}`}>
                        {l || " "}
                      </code>
                    </div>
                  ))}
                  <div className="h-[40svh]" />
                </pre>
              </div>
              {/* minimap */}
              <div className="pointer-events-none absolute top-8 right-2 bottom-2 hidden w-14 sm:block" aria-hidden>
                {lines.slice(0, 90).map((l, i) => (
                  <div key={i} className="mb-[2px] h-[2px] bg-paper/15" style={{ width: `${Math.min(100, l.length * 1.4)}%` }} />
                ))}
                <div ref={thumb} className="absolute inset-x-0 h-[15%] rounded-sm bg-paper/10" />
              </div>
            </div>
          </div>

          {/* terminal */}
          <div className="border-t border-paper/10 bg-[#121214] px-4 py-2 font-mono text-[11.5px]">
            <p className={`${mono} mb-1 text-[9.5px] text-paper/35`}>Terminal</p>
            <div className="max-h-28 overflow-y-auto" data-lenis-prevent>
              {term.map((l, i) => (
                <p key={i} className={l.kind === "cmd" ? "text-paper/85" : "text-paper/50"}>
                  {l.kind === "cmd" && <span className="text-paper/40">~/pramod-krishna-cv &gt; </span>}
                  {l.text}
                </p>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); run(input); setInput(""); }} className="flex items-center">
              <span className="text-paper/40">~/pramod-krishna-cv &gt;&nbsp;</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="try: help, ls, cat quadgen.md, open github, hire"
                aria-label="Terminal command"
                className="min-w-0 flex-1 bg-transparent text-paper outline-none placeholder:text-paper/25"
              />
            </form>
          </div>

          {/* status bar */}
          <div className={`${mono} flex justify-between border-t border-paper/10 bg-[#1c1c1f] px-3 py-1 text-[9.5px] text-paper/40`}>
            <span>⎇ {REPO.branch} · ● updated today</span>
            <span>⌥ {REPO.commits} commits</span>
          </div>
        </div>
      </div>
    </section>
  );
}
