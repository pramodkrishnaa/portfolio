import { TbPlayerPlayFilled } from "react-icons/tb";

/** Giant helsing-style hero: full-bleed media placeholder with a loud color wash
 *  and a massive display headline. */
export default function LifeHero() {
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden bg-night text-bone">
      {/* full-bleed media placeholder */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <span
          className="absolute inset-0 opacity-[0.10] text-bone"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 12px)" }}
        />
        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-bone/40">
          <TbPlayerPlayFilled /> [ video · 16:9 ] portrait / showreel placeholder
        </span>
      </div>
      {/* loud color washes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden
        style={{ background: "radial-gradient(60% 55% at 12% 100%, var(--flame), transparent 60%)", opacity: 0.55 }} />
      <div className="pointer-events-none absolute inset-0" aria-hidden
        style={{ background: "radial-gradient(50% 45% at 95% 20%, var(--ember), transparent 55%)", opacity: 0.4 }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/60 to-transparent" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-16 sm:px-8 sm:pb-20">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-sun">
          <span className="inline-block h-2 w-2 rounded-full bg-flame" />
          The other half of the résumé
        </p>
        <h1 className="mt-5 font-display leading-[0.82] tracking-tight text-[22vw] sm:text-[18vw] lg:text-[13rem]">
          OFF THE
          <span className="block text-flame">CLOCK</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/80 sm:text-xl">
          Air-gapped clusters by day. Twelve rounds in the ring, a canvas, open tarmac, and a
          camera by night. Same person, a lot louder.
        </p>
      </div>
    </section>
  );
}
