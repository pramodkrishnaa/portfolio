/**
 * Concentric text-ring vortex engine (canvas 2D, no React).
 *
 * Geometry: rings grow geometrically from a tiny core; glyph size scales with
 * radius so the field reads as a tunnel. Rings alternate direction.
 * Interaction: hold → spin up + glyph dropout; release (after HOLD_MS) → glyphs
 * burst outward along spirals, then spring back. `intro()` starts fully burst
 * and re-forms (used on page entry).
 * Scroll: `zoom` scales every ring radius (the dive); `clearCore` empties the
 * centre into a dark disc around the portal.
 */
export const HOLD_MS = 900;

type Opts = { text: string; fg: string; font: string };

const hash = (a: number, b: number) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

export class Vortex {
  zoom = 1;
  corePx = 0; // CSS px radius around the centre left empty (the eye / portal rim)
  cx = 0.75; // centre, as fraction of canvas width/height
  cy = 0.5;
  minX = 0; // device px; glyphs left of this are clipped by the panel, skip them
  minY = 0;
  private ctx: CanvasRenderingContext2D;
  private o: Opts;
  private phrase: string;
  private angle = 0;
  private spin = 1;
  private holding = false;
  private holdStart = 0;
  private burstAt = -1e9; // time the current burst started
  private burstPeak = 0; // 1 = fully exploded at t=0 (intro)
  private stars: { x: number; y: number; r: number; a: number }[];
  private sprites = new Map<string, HTMLCanvasElement>();

  /** Pre-rendered glyph bitmap (drawImage is far cheaper than fillText). */
  private sprite(ch: string, size: number) {
    const key = ch + size;
    let c = this.sprites.get(key);
    if (!c) {
      c = document.createElement("canvas");
      c.width = Math.ceil(size * 0.8) + 2;
      c.height = Math.ceil(size * 1.2) + 2;
      const x = c.getContext("2d")!;
      x.font = `500 ${size}px ${this.o.font}`;
      x.fillStyle = this.o.fg;
      x.textAlign = "center";
      x.textBaseline = "middle";
      x.fillText(ch, c.width / 2, c.height / 2);
      this.sprites.set(key, c);
    }
    return c;
  }

  constructor(private canvas: HTMLCanvasElement, o: Opts) {
    this.ctx = canvas.getContext("2d")!;
    this.o = o;
    this.phrase = (o.text + "   ").toUpperCase();
    // sprites rendered before the web font loads would bake in the fallback
    document.fonts?.ready.then(() => this.sprites.clear());
    this.stars = Array.from({ length: 220 }, (_, i) => ({
      x: hash(i, 1), y: hash(i, 2), r: hash(i, 3) * 0.8 + 0.4, a: hash(i, 4) * 0.35 + 0.08,
    }));
  }

  /** ms the pointer has been held, or -1 when idle */
  holdTime(now: number) {
    return this.holding ? now - this.holdStart : -1;
  }
  press(now: number) {
    this.holding = true;
    this.holdStart = now;
  }
  /** returns true if the release fired a burst */
  release(now: number) {
    const armed = this.holding && now - this.holdStart >= HOLD_MS;
    this.holding = false;
    if (armed) {
      this.burstAt = now;
      this.burstPeak = 0;
    }
    return armed;
  }
  intro(now: number) {
    this.burstAt = now;
    this.burstPeak = 1;
  }

  /** 0 = rings formed, 1 = fully scattered */
  private burst(now: number) {
    const t = (now - this.burstAt) / 1000;
    if (this.burstPeak === 1) {
      // intro: start scattered, re-form over ~1s
      if (t > 1) return 0;
      return 1 - easeOutBack(Math.min(1, t / 1));
    }
    if (t < 0 || t > 1.35) return 0;
    if (t < 0.55) return easeOutCubic(t / 0.55); // fling out
    return Math.max(0, 1 - easeOutBack((t - 0.55) / 0.8)); // spring back
  }

  frame(now: number, dt: number) {
    if (document.documentElement.dataset.motion === "off") dt = 0;
    const { ctx, canvas } = this;
    const W = canvas.width;
    const H = canvas.height;
    const dpr = W / Math.max(1, canvas.clientWidth);
    const held = this.holding ? Math.min(1, (now - this.holdStart) / HOLD_MS) : 0;
    // spin eases toward target: 1x idle, up to 3.5x while held
    const target = 1 + held * 2.5;
    this.spin += (target - this.spin) * Math.min(1, dt / 250);
    this.angle += dt * 0.00012 * this.spin;

    const b = this.burst(now);
    const cx = this.cx * W;
    const cy = this.cy * H;
    // only the unclipped region matters: farthest visible corner from the centre
    const diag = Math.hypot(Math.max(cx - this.minX, W - cx, 0), Math.max(cy - this.minY, H - cy, 0));
    ctx.clearRect(0, 0, W, H);

    // starfield
    ctx.fillStyle = this.o.fg;
    for (const s of this.stars) {
      ctx.globalAlpha = s.a;
      ctx.fillRect(s.x * W, s.y * H, s.r * dpr, s.r * dpr);
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const core = this.corePx * dpr;
    const L = this.phrase.length;
    let r = 16 * dpr * this.zoom;
    for (let i = 0; i < 60; i++) {
      // rings pack by glyph size: spacing grows with radius → tunnel
      const size = Math.max(4.5 * dpr, Math.min(19 * dpr * this.zoom, (r / this.zoom) * 0.04 * this.zoom + 2 * dpr));
      if (i > 0) r += Math.max(size * 2.15, 12 * dpr * this.zoom);
      if (r < core) continue;
      if (r > diag * 1.1) break;
      const px = Math.min(96, Math.round(size));
      const step = size * 0.78;
      const count = Math.max(6, Math.floor((2 * Math.PI * r) / step));
      const dir = i % 2 ? -1 : 1;
      const rot = this.angle * dir * (1.6 - Math.min(1, i / 30)) + i * 0.7;
      const outer = Math.min(1, i / 22);
      // fade glyphs that sit right at the cleared core edge
      const coreFade = core > 0 ? Math.min(1, (r - core) / (size * 3)) : 1;
      ctx.globalAlpha = (0.35 + outer * 0.62) * coreFade;
      for (let j = 0; j < count; j++) {
        const ch = this.phrase[(j + i * 7) % L];
        if (ch === " ") continue;
        // static decay + extra dropout while held, mostly on outer rings
        const drop = 0.035 + held * outer * 0.35;
        if (hash(i * 131 + j, held > 0 ? Math.floor(now / 90) : 0) < drop) continue;
        let a = rot + (j / count) * Math.PI * 2;
        let rr = r;
        if (b > 0) {
          const k = hash(i, j);
          rr = r + b * (180 + k * 900) * dpr;
          a += b * (0.6 + k * 1.4) * dir;
        }
        const ca = Math.cos(a), sa = Math.sin(a);
        const x = cx + ca * rr;
        const y = cy + sa * rr;
        if (x < this.minX - 50 || y < this.minY - 50 || x > W + 50 || y > H + 50) continue;
        // tangent rotation (a + 90°) reuses the same trig unless scattered
        let cs = -sa, sn = ca;
        if (b > 0) { const rotA = a + Math.PI / 2 + b * hash(j, i) * 3; cs = Math.cos(rotA); sn = Math.sin(rotA); }
        const sp = this.sprite(ch, px);
        ctx.setTransform(cs, sn, -sn, cs, x, y);
        ctx.drawImage(sp, -sp.width / 2, -sp.height / 2);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // faint guide circles show through while scattered
      if (b > 0.3) {
        ctx.globalAlpha = 0.08 * b;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = this.o.fg;
        ctx.lineWidth = dpr * 0.6;
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }
}
