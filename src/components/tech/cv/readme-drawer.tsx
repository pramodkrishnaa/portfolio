"use client";

import { useEffect, useRef, useState } from "react";
import { README, ME } from "@/content/cv";
import { mono, Scramble } from "./ui";

/** README drawer ("Learn more +"): slides in from the right over a dim
 *  overlay. Own scroll (page behind stays scrollable, like the source),
 *  TOC chip tracks the section in view, paragraphs stagger in. */
export default function ReadmeDrawer() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // mounted for exit animation
  const [active, setActive] = useState(README[0].id);
  const [n, setN] = useState(0);
  const body = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    const onOpen = () => { opener.current = document.activeElement; setShown(true); requestAnimationFrame(() => setOpen(true)); };
    addEventListener("open-readme", onOpen);
    return () => removeEventListener("open-readme", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => { setShown(false); (opener.current as HTMLElement | null)?.focus?.(); }, 320);
  };

  const onScroll = () => {
    const root = body.current;
    if (!root) return;
    let cur = README[0].id;
    for (const s of README) {
      const el = root.querySelector<HTMLElement>(`[data-sec="${s.id}"]`);
      if (el && el.offsetTop - root.scrollTop < root.clientHeight * 0.4) cur = s.id;
    }
    setActive(cur);
  };

  const jump = (id: string) => {
    const el = body.current?.querySelector<HTMLElement>(`[data-sec="${id}"]`);
    body.current?.scrollTo({ top: (el?.offsetTop ?? 0) - 16, behavior: "smooth" });
  };

  if (!shown) return null;
  let para = 0;
  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="false" aria-label="README: a personal note">
      <div onClick={close} className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`} aria-hidden />
      <div className={`absolute top-2 right-2 bottom-0 left-2 transition-transform duration-[350ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:left-[50vw] ${open ? "translate-x-0" : "translate-x-[105%]"}`}>
        {/* TOC chip, outside the drawer's left edge */}
        <nav aria-label="README sections" className={`${mono} absolute top-0 -left-[12.5rem] hidden w-48 rounded-[6px] bg-[#d9d9db] p-2 text-[10px] lg:block`}>
          {README.map((s) => (
            <button key={s.id} type="button" onClick={() => jump(s.id)} className={`block w-full truncate py-0.5 text-left transition-colors ${active === s.id ? "text-ink" : "text-ink/40 hover:text-ink/70"}`}>
              {s.id} / {s.title}
            </button>
          ))}
        </nav>

        <div ref={body} onScroll={onScroll} data-lenis-prevent className="relative h-full overflow-y-auto bg-[#d4d4d6] px-6 pb-24 text-ink sm:px-8">
          <div className="flex items-start justify-between pt-5">
            <div>
              <p className={`${mono} text-[12px]`}>README / {ME.name}</p>
              <p className={`${mono} mt-1 text-[10px] text-ink/50`}>A personal note</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <button ref={closeBtn} type="button" onClick={close} onMouseEnter={() => setN((v) => v + 1)} aria-label="Close README" className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-ink text-paper">✕</button>
              <span className={`${mono} rounded-[3px] bg-ink px-1.5 py-0.5 text-[9px] text-paper`}><Scramble text="Close" trigger={n} /></span>
            </div>
          </div>
          <hr className="mt-10 border-ink/15" />
          {README.map((s) => (
            <section key={s.id} data-sec={s.id} className="border-b border-ink/15 py-12">
              <h3 className={`${mono} text-[12px]`}>{s.id} / {s.title}</h3>
              {s.body.map((p) => (
                <p key={p} className="mt-5 max-w-[40rem] text-[15px] leading-[1.6] text-ink/85" style={{ animation: open ? `fadeUp .5s ${0.25 + para++ * 0.12}s both` : undefined }}>
                  {p}
                </p>
              ))}
              {s.id === "003" && (
                <>
                  <div className="mt-6 flex aspect-video items-center justify-center rounded-[6px] bg-[#1c1c1f] text-paper/50">
                    <span className={`${mono} text-[10px]`}>▶ Reel · drop /public/reel.mp4</span>
                  </div>
                  <p className="mt-5 text-[15px] text-ink/85">
                    Find me on <a className="underline" href={ME.github}>GitHub</a> and <a className="underline" href={ME.linkedin}>LinkedIn</a>. Write to <a className="underline" href={`mailto:${ME.email}`}>{ME.email}</a>.
                  </p>
                </>
              )}
            </section>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#d4d4d6] to-transparent" aria-hidden />
      </div>
    </div>
  );
}
