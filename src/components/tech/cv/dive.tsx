"use client";

import { useEffect, useRef, useState } from "react";
import { Vortex, HOLD_MS } from "./vortex";
import { SplitCta, GhostChip, Odometer, mono, ramp, smooth, progressOf } from "./ui";
import { ME, HERO, LEDGER } from "@/content/cv";

const DIVE_VH = 230; // scroll distance of the dive, in svh
const HOLE_VH = 90; // last part of the dive where the portal opens

/**
 * Hero + dive + ledger, one scroll-scrubbed stage (fully reversible):
 *  1. split hero: paper copy left, ink vortex right (click & hold → burst)
 *  2. the ink panel's left edge sweeps to 0 while the copy fades
 *  3. the vortex zooms (tunnel) and its core clears
 *  4. a paper circle opens from the centre: a mask hole onto the ledger,
 *     which is pinned underneath and keeps scrubbing after the hole fills.
 */
export default function Dive() {
  const wrap = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const dark = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [labelText, setLabelText] = useState("Click & hold");

  useEffect(() => {
    const cv = canvas.current!;
    const st = stage.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const v = new Vortex(cv, {
      text: ME.vortex,
      fg: "#ebebec",
      font: css.getPropertyValue("--font-geist-mono").trim() || "monospace",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    if (!reduce) v.intro(performance.now());

    // cursor label: lerped follow, shown only over the ink panel
    const pos = { x: 0, y: 0, tx: 0, ty: 0, on: false };
    let edge = 0.5; // current x (or y on portrait) split, fraction of viewport
    let portrait = false;
    const over = (e: PointerEvent) => (portrait ? e.clientY / innerHeight > edge : e.clientX / innerWidth > edge);
    const onMove = (e: PointerEvent) => {
      pos.tx = e.clientX + 14;
      pos.ty = e.clientY + 12;
      pos.on = e.pointerType !== "touch" && over(e);
    };
    const onDown = (e: PointerEvent) => {
      if (!over(e)) return;
      v.press(performance.now());
      setLabelText("Keep holding");
    };
    const onUp = () => {
      if (v.holdTime(performance.now()) < 0) return;
      v.release(performance.now());
      setLabelText("Click & hold");
    };
    const onLeave = () => { pos.on = false; onUp(); };
    st.addEventListener("pointermove", onMove);
    st.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    st.addEventListener("pointerleave", onLeave);
    const noMenu = (e: Event) => e.preventDefault();
    cv.addEventListener("contextmenu", noMenu);

    const prev = new Map<string, string>();
    const set = (el: HTMLElement, k: string, v: string) => {
      const key = el.dataset.k + k;
      if (prev.get(key) === v) return;
      prev.set(key, v);
      (el.style as unknown as Record<string, string>)[k] = v;
    };
    st.dataset.k = "st"; dark.current!.dataset.k = "dk"; copy.current!.dataset.k = "cp"; label.current!.dataset.k = "lb";
    let raf = 0;
    let last = performance.now();
    let armedShown = false;
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (onScreen) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });
    const loop = (now: number) => {
      if (!wrap.current || !dark.current || !copy.current || !label.current) return; // unmounted
      const dt = Math.min(64, now - last);
      last = now;
      portrait = innerWidth < 1024;
      const p = progressOf(wrap.current!);

      // phase 1: panel sweep + copy fade
      const a = smooth(ramp(p, 0, 0.3));
      edge = 0.5 * (1 - a);
      if (portrait) {
        const top = 0.55 * (1 - a);
        edge = top;
        set(dark.current!, "clipPath", `inset(${top * 100}% 0 0 0)`);
        v.cx = 0.5;
        v.cy = 0.5 + (1 - a) * 0.28;
      } else {
        set(dark.current!, "clipPath", `inset(0 0 0 ${edge * 100}%)`);
        v.cx = 0.75 - 0.25 * a;
        v.cy = 0.5;
      }
      v.minX = portrait ? 0 : edge * cv.width;
      v.minY = portrait ? edge * cv.height : 0;
      set(copy.current!, "opacity", String(1 - a * 0.92));
      set(copy.current!, "transform", `translateX(${-a * 2}vw)`);

      // phase 2: tunnel zoom + core clears
      const z = smooth(ramp(p, 0.22, 0.65));
      v.zoom = 1 + z * 1.8 + ramp(p, 0.6, 1) * 2.2;

      // phase 3: portal hole (mask) — a dot first, then it opens past the corners
      const holeStart = 1 - HOLE_VH / DIVE_VH;
      const c = ramp(p, holeStart - 0.05, 1);
      const W = innerWidth, H = innerHeight;
      const cx = v.cx * W, cy = v.cy * H;
      const r = c <= 0 ? 0 : 2 + Math.pow(c, 1.8) * Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) * 1.02;
      const mask = r > 0 ? `radial-gradient(circle at ${cx}px ${cy}px, transparent ${r}px, #000 ${r + 1}px)` : "none";
      set(st, "maskImage", mask);
      set(st, "webkitMaskImage", mask);
      set(st, "visibility", c >= 1 ? "hidden" : "visible");
      // the eye opens with the zoom; once the portal grows, rings hug its rim
      v.corePx = Math.max(r * 0.99, z * 0.07 * Math.hypot(W, H) * (1 - c));

      // hold threshold → label flips to RELEASE
      const ht = v.holdTime(now);
      if (ht >= HOLD_MS && !armedShown) { armedShown = true; setLabelText("Release"); }
      if (ht < 0) armedShown = false;

      if (c < 1) v.frame(now, reduce ? 0 : dt); // nothing to draw once the portal has swallowed the stage

      // label follow (lerp ~0.2/frame)
      pos.x += (pos.tx - pos.x) * 0.22;
      pos.y += (pos.ty - pos.y) * 0.22;
      const l = label.current!;
      set(l, "transform", `translate3d(${Math.round(pos.x)}px, ${Math.round(pos.y)}px, 0)`);
      set(l, "opacity", pos.on && p < holeStart ? "1" : "0");

      if (onScreen) raf = requestAnimationFrame(loop);
    };
    io.observe(wrap.current!);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      st.removeEventListener("pointermove", onMove);
      st.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      st.removeEventListener("pointerleave", onLeave);
      cv.removeEventListener("contextmenu", noMenu);
    };
  }, []);

  return (
    <>
      <section ref={wrap} id="top" className="relative z-20" style={{ height: `calc(100svh + ${DIVE_VH}svh)` }}>
        <div ref={stage} className="sticky top-0 h-svh overflow-hidden bg-paper select-none">
          {/* paper copy */}
          <div ref={copy} className="absolute inset-0 flex flex-col justify-center px-6 pb-[42svh] pt-24 text-ink will-change-transform sm:px-10 lg:w-1/2 lg:px-[5vw] lg:pb-0 lg:pt-0">
            <p className={`${mono} text-ink/55 [animation:fadeUp_.5s_.7s_both]`}>{ME.eyebrow}</p>
            <h1 className="mt-4 text-[clamp(2rem,3.1vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.03em]">
              {HERO.title.map((t, i) => (
                <span key={t} className="block" style={{ animation: `fadeUp .6s ${0.8 + i * 0.1}s both` }}>{t}</span>
              ))}
            </h1>
            <p className="mt-6 max-w-[30rem] text-[14px] leading-relaxed text-ink/60 [animation:fadeUp_.6s_1s_both]">{HERO.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 [animation:fadeUp_.6s_1.1s_both]">
              <SplitCta a="Get" b="In touch" href={`mailto:${ME.email}`} />
              <GhostChip onClick={() => window.dispatchEvent(new Event("open-readme"))}>Read me</GhostChip>
            </div>
            <div className={`${mono} absolute bottom-6 left-6 hidden items-center gap-2 text-ink/45 sm:left-10 lg:left-[5vw] lg:flex [animation:fadeUp_.6s_1.2s_both]`}>
              <span className="inline-block h-3 w-3 rounded-full border border-current" aria-hidden />
              Scroll to dive in
            </div>
          </div>

          {/* ink vortex */}
          <div ref={dark} className="absolute inset-0 bg-ink" style={{ clipPath: "inset(0 0 0 50%)" }}>
            <canvas ref={canvas} className="h-full w-full touch-pan-y" aria-label="Interactive vortex: click and hold, then release" role="img" />
            <p className={`${mono} pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-paper/40 lg:hidden`}>Touch &amp; hold</p>
          </div>

          <div
            ref={label}
            aria-hidden
            className={`${mono} pointer-events-none fixed top-0 left-0 z-50 rounded-[3px] border border-ink/20 bg-paper px-1.5 py-0.5 text-[10px] text-ink opacity-0 transition-opacity duration-150`}
          >
            {labelText}
          </div>
        </div>
      </section>
      <Ledger />
    </>
  );
}

function Ledger() {
  const ref = useRef<HTMLElement>(null);
  const [q, setQ] = useState(0);
  const rows = LEDGER.days.flatMap((d) => d.rows);
  const total = rows.length + 1; // + the "every prompt" row

  useEffect(() => {
    let raf = 0, visible = false;
    const tick = () => {
      if (!ref.current || !visible) return;
      setQ(Math.round(progressOf(ref.current) * 400) / 400);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    if (ref.current) io.observe(ref.current);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  // active row steps with scroll; the bar clears after the last row
  const step = Math.floor(ramp(q, 0.08, 0.86) * (total + 0.999));
  const active = step >= total + 0 ? -1 : step;
  const hours = rows.slice(0, Math.min(rows.length, Math.max(0, active < 0 ? rows.length : active + 1))).reduce((s, [, h]) => s + h, 0);

  let idx = -1;
  return (
    <section
      ref={ref}
      id="work"
      className="relative z-10 h-[320svh] bg-paper text-ink"
      style={{ marginTop: `calc(-100svh - ${HOLE_VH}svh)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-6 pt-24 pb-8 sm:px-10 lg:flex-row lg:gap-[6vw] lg:px-[5vw] lg:pt-[18svh] lg:pb-[6svh]">
        <div className="flex flex-col justify-between lg:w-[44%]">
          <div>
            <h2 className="text-[clamp(1.8rem,3.4vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.03em]">
              {LEDGER.title.map((t) => <span key={t} className="block">{t}</span>)}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/55">{LEDGER.lead}</p>
          </div>
          <div className="mt-6">
            <div className="text-[clamp(5rem,17vw,15rem)] font-medium leading-[0.85] tracking-[-0.06em]">
              ~<Odometer value={String(hours).padStart(2, "0")} />
            </div>
            <p className={`${mono} mt-3 flex items-center gap-2 text-ink/55`}>
              {LEDGER.caption}
              <span className="rounded-[3px] bg-ink/10 px-1.5 py-0.5 text-ink/70">{LEDGER.badge}</span>
            </p>
          </div>
        </div>

        <div className="relative mt-8 min-h-0 flex-1 lg:mt-0">
          <div
            className={`${mono} h-full overflow-hidden border-x border-t border-dashed border-ink/25 text-[10.5px] sm:text-[11px]`}
          >
            <div className="transition-transform duration-300 ease-out" style={{ transform: `translateY(-${ramp(q, 0.2, 0.9) * 22}%)` }}>
              <div className="flex justify-between border-b border-dashed border-ink/25 px-4 py-3 text-ink/50">
                <span>Estimate</span>
                <span>Never quoted</span>
              </div>
              {LEDGER.days.map((d) => (
                <div key={d.day} className="px-2 pt-4">
                  <Row label={d.day} value={`~${d.rows.reduce((s, [, h]) => s + h, 0)} hrs`} dim />
                  {d.rows.map(([label, h]) => {
                    idx++;
                    return <Row key={label} label={label} value={`−${h}`} on={idx === active} />;
                  })}
                </div>
              ))}
              <div className="px-2 pt-5 pb-6">
                <Row label={LEDGER.footer[0]} value="" dim />
                <Row label={LEDGER.footer[1]} value="∞" on={active === rows.length} />
              </div>
            </div>
          </div>
          {/* progress rail */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-ink/70">
            <span className="absolute -top-[3px] h-[7px] w-6 bg-ink" style={{ left: `calc(${ramp(q, 0.08, 0.86) * 100}% - ${ramp(q, 0.08, 0.86) * 24}px)` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, on, dim }: { label: string; value: string; on?: boolean; dim?: boolean }) {
  return (
    <div className={`flex items-end gap-2 px-2 py-[5px] ${on ? "bg-ink text-paper" : dim ? "text-ink/45" : "text-ink/85"}`}>
      <span className="shrink-0">{label}</span>
      <span className={`mb-[3px] flex-1 border-b border-dotted ${on ? "border-paper/40" : "border-ink/30"}`} />
      <span className="shrink-0">{value}</span>
    </div>
  );
}
