"use client";

import { useEffect, useRef, useState } from "react";
import WorldSwitch from "@/components/site/world-switch";
import { ME, REPO, HERO, CAPABILITIES, SHOWCASE } from "@/content/cv";
import { Mark } from "./outro";
import { mono, Scramble } from "./ui";

const LINKS: { label: string; id: string; spy: string[]; dot?: boolean; href?: string }[] = [
  { label: "Work", id: "work", spy: ["work", "features"] },
  { label: "The CV", id: "the-cv", spy: ["the-cv"] },
  { label: "Showcase", id: "showcase", spy: ["showcase"] },
  { label: "Hire", id: "hire", spy: ["hire"], dot: true },
  { label: "FAQ", id: "faq", spy: ["faq"] },
  { label: "Blog", id: "", spy: [], href: "/blog" },
];

const goTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { duration: 0.9 });
  else el.scrollIntoView({ behavior: "smooth" });
};

/** Which section is under the viewport's upper third. */
function useSpy() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = LINKS.flatMap((l) => l.spy);
    let raf = 0;
    const tick = () => {
      const y = innerHeight * 0.35;
      let cur = "";
      for (const id of ids) {
        const r = document.getElementById(id)?.getBoundingClientRect();
        if (r && r.top <= y && r.bottom > y) cur = id;
      }
      setActive(cur);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return active;
}

export default function Chrome() {
  const active = useSpy();
  const [panel, setPanel] = useState(false);
  return (
    <>
      <Nav active={active} />
      <Minimap onOpen={() => setPanel(true)} />
      {panel && <RecruiterPanel onClose={() => setPanel(false)} />}
      <LearnMore />
    </>
  );
}

function Nav({ active }: { active: string }) {
  return (
    <header data-chrome-part="header" className="chrome-fade pointer-events-none fixed inset-x-0 top-[2.5svh] z-40 flex justify-center px-3">
      <div className="pointer-events-auto w-full max-w-[38rem] overflow-hidden rounded-[7px] border border-paper/10 bg-[#161618]/95 text-paper shadow-lg backdrop-blur-md">
        <nav aria-label="Primary" className="flex items-center gap-1 px-1.5 py-1.5">
          <button type="button" onClick={() => goTo("top")} aria-label="Back to top" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-paper/10 text-paper/80">
            <Mark className="h-4 w-4" />
          </button>
          <ul className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
            {LINKS.map((l, i) => {
              const on = l.spy.includes(active);
              const cls = `${mono} relative rounded-[4px] px-2 py-1 text-[10.5px] transition-colors ${on ? "bg-paper/15 text-paper" : "text-paper/60 hover:text-paper"}`;
              return (
                <li key={l.label} style={{ animation: `fadeUp .25s ${0.7 + i * 0.07}s both` }}>
                  {l.href ? (
                    <a href={l.href} data-blob className={cls}>{l.label}</a>
                  ) : (
                    <button type="button" onClick={() => goTo(l.id)} className={cls} aria-current={on ? "true" : undefined}>
                      {l.label}
                      {l.dot && <span className="dot-accent absolute top-0.5 right-0 h-1 w-1" aria-hidden />}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="ml-auto shrink-0 pr-1 md:ml-0">
            <WorldSwitch />
          </div>
        </nav>
        <div className="overflow-hidden bg-paper py-[3px] text-ink">
          <div className={`${mono} flex w-max animate-[marquee_32s_linear_infinite] gap-6 whitespace-nowrap text-[9.5px]`} style={{ animationDelay: "1.3s" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i}>{ME.ticker} ·</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

/** Live page minimap: section blocks + a viewport window. Hover → INSPECT. */
function Minimap({ onOpen }: { onOpen: () => void }) {
  const win = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<{ top: number; h: number; dark: boolean }[]>([]);
  useEffect(() => {
    const measure = () => {
      const H = document.documentElement.scrollHeight;
      const out = [...document.querySelectorAll<HTMLElement>("main > section, main > div, main > footer")].map((el) => {
        const r = el.getBoundingClientRect();
        const bg = getComputedStyle(el).backgroundColor;
        const lum = bg.match(/\d+/g)?.slice(0, 3).reduce((s, v) => s + +v, 0) ?? 0;
        return { top: (r.top + scrollY) / H, h: r.height / H, dark: lum < 300 };
      });
      setBlocks(out);
    };
    measure();
    const t = setTimeout(measure, 1500);
    let raf = 0;
    const tick = () => {
      const H = document.documentElement.scrollHeight;
      if (win.current) {
        win.current.style.top = `${(scrollY / H) * 100}%`;
        win.current.style.height = `${(innerHeight / H) * 100}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    addEventListener("resize", measure);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); removeEventListener("resize", measure); };
  }, []);
  return (
    <button
      type="button"
      onClick={onOpen}
      data-chrome-part="minimap"
      aria-label="Open recruiter mode"
      className="chrome-fade group fixed top-[2.5svh] right-4 z-40 hidden h-14 w-24 overflow-hidden rounded-[5px] border border-paper/15 bg-[#161618] outline-offset-2 transition-[outline] hover:outline hover:outline-1 hover:outline-paper/60 lg:block"
    >
      {blocks.map((b, i) => (
        <span key={i} className={`absolute inset-x-0 ${b.dark ? "bg-[#26262a]" : "bg-[#c9c9cc]"}`} style={{ top: `${b.top * 100}%`, height: `${b.h * 100}%` }} />
      ))}
      <span ref={win} className="absolute inset-x-0 border-y border-paper/80 bg-paper/10" />
      <span className={`${mono} absolute right-0 -bottom-0 translate-y-full rounded-[3px] bg-ink px-1.5 py-0.5 text-[9px] text-paper opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100`}>
        Inspect ↗
      </span>
    </button>
  );
}

const TOGGLES: [string, string][] = [
  ["Show readme button", "learnmore"],
  ["Show site header", "header"],
  ["Show minimap", "minimap"],
  ["Reduce motion", "motion"],
];

/** "Studio mode" → Recruiter mode: real toggles, a 30-second scan, and the
 *  markdown twin agents get. All local; resets on reload. */
function RecruiterPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"Page" | "Scan" | "SEO" | "Agents">("Page");
  const [state, setState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(TOGGLES.map(([, k]) => [k, document.documentElement.dataset[`hide${k}`] !== "1" && k !== "motion"])),
  );
  const [copied, setCopied] = useState(false);
  const [title, setTitle] = useState(() => document.title);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [onClose]);

  const flip = (k: string) => {
    const next = !state[k];
    setState((s) => ({ ...s, [k]: next }));
    const ds = document.documentElement.dataset;
    if (k === "motion") ds.motion = next ? "off" : "";
    else ds[`hide${k}`] = next ? "" : "1";
  };
  const md = REPO.files["llms.txt"];

  return (
    <div role="dialog" aria-label="Recruiter mode" className="fixed top-[calc(2.5svh+4rem)] right-4 z-50 w-[min(26rem,calc(100vw-2rem))] animate-[fadeIn_.18s_ease-out] rounded-[10px] border border-paper/15 bg-[#161618] p-4 text-paper shadow-2xl" data-lenis-prevent>
      <div className={`${mono} flex items-center justify-between text-[10px] text-paper/60`}>
        <span className="flex items-center gap-2"><span className="tracking-[-0.1em] text-paper/30">⠿</span><span className="dot-accent h-1.5 w-1.5 text-paper" />Recruiter mode</span>
        <button type="button" onClick={onClose} className="hover:text-paper">Exit ✕</button>
      </div>
      <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-paper/70">Tune the page for how you read. Everything here is local and resets on reload.</p>
      <div className={`${mono} mt-4 flex gap-1 text-[10px]`} role="tablist">
        {(["Page", "Scan", "SEO", "Agents"] as const).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} type="button" onClick={() => setTab(t)} className={`rounded-[4px] px-2 py-1 ${tab === t ? "bg-paper/15 text-paper" : "text-paper/50 hover:text-paper"}`}>{t}</button>
        ))}
      </div>
      <div className="mt-4 max-h-[55svh] overflow-y-auto pr-1">
        {tab === "Page" && (
          <ul className="space-y-3">
            {TOGGLES.map(([label, k]) => (
              <li key={k} className={`${mono} flex items-center justify-between text-[10.5px]`}>
                {label}
                <button type="button" role="switch" aria-checked={state[k]} onClick={() => flip(k)} className={`relative h-[18px] w-[34px] rounded-full transition-colors ${state[k] ? "bg-paper" : "bg-paper/20"}`}>
                  <span className={`absolute top-[3px] h-3 w-3 rounded-full transition-all ${state[k] ? "left-[19px] bg-ink" : "left-[3px] bg-paper/70"}`} />
                </button>
              </li>
            ))}
          </ul>
        )}
        {tab === "Scan" && (
          <dl className={`${mono} space-y-2 text-[10.5px]`}>
            {[
              ["Role", ME.role],
              ["Based", ME.location],
              ["Now", "Agentic AI team lead, QuadGen"],
              ["Research", "Agent evals · GRPO / RLVR · memory · MCP security"],
              ["Proof", "94.2% P@5 · −60% review latency · 92% sim-to-real"],
              ["Certified", "Claude Architect · LangChain Agent Engineer"],
              ["Contact", ME.email],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3 border-b border-paper/10 pb-2"><dt className="w-20 shrink-0 text-paper/40">{k}</dt><dd className="normal-case tracking-normal text-paper/85">{v}</dd></div>
            ))}
          </dl>
        )}
        {tab === "SEO" && (
          <div className={`${mono} space-y-3 text-[10px]`}>
            <label className="block text-paper/50">Page title
              <input value={title} onChange={(e) => { setTitle(e.target.value); document.title = e.target.value; }} className="mt-1 w-full rounded-[4px] border border-paper/15 bg-black/30 px-2 py-1.5 normal-case tracking-normal text-paper outline-none" />
            </label>
            <div className="text-paper/50">Description
              <p className="mt-1 rounded-[4px] border border-paper/15 bg-black/30 px-2 py-1.5 normal-case tracking-normal text-paper/85">{HERO.lead}</p>
            </div>
            <div className="text-paper/50">Keywords
              <p className="mt-1 normal-case tracking-normal text-paper/70">{CAPABILITIES.items.map(([t]) => t).join(" · ")} · {SHOWCASE.projects.slice(0, 4).map((p) => p.name).join(" · ")}</p>
            </div>
          </div>
        )}
        {tab === "Agents" && (
          <div className={`${mono} text-[10px]`}>
            <div className="flex items-center justify-between">
              Serve markdown to agents
              <span className="relative h-[18px] w-[34px] rounded-full bg-paper"><span className="absolute top-[3px] left-[19px] h-3 w-3 rounded-full bg-ink" /></span>
            </div>
            <pre className="mt-3 whitespace-pre-wrap rounded-[4px] border border-paper/15 bg-black/30 p-2 normal-case tracking-normal text-paper/80">{md}</pre>
            <button
              type="button"
              onClick={async () => { try { await navigator.clipboard.writeText(md); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { setCopied(false); } }}
              className="mt-3 rounded-[4px] bg-paper px-2 py-1 text-ink"
            >
              {copied ? "Copied" : "Copy as markdown"}
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 font-mono text-[10px] text-paper/35">Demo only. Nothing here leaves your browser.</p>
    </div>
  );
}

function LearnMore() {
  const [n, setN] = useState(0);
  return (
    <div data-chrome-part="learnmore" className="chrome-fade fixed right-4 bottom-4 z-40 flex flex-col items-end gap-1">
      <span className={`${mono} rounded-[3px] bg-paper px-1.5 py-0.5 text-[9.5px] text-ink shadow`}>
        <Scramble text="Learn more" trigger={n} />
      </span>
      <button
        type="button"
        onMouseEnter={() => setN((v) => v + 1)}
        onClick={() => window.dispatchEvent(new Event("open-readme"))}
        aria-label="Open README: a personal note"
        className="flex h-11 w-11 items-center justify-center rounded-[4px] bg-paper font-mono text-lg text-ink shadow transition-transform hover:scale-105 active:scale-95"
      >
        +
      </button>
    </div>
  );
}
