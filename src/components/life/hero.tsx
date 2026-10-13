import Image from "next/image";

export default function LifeHero() {
  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
      {/* cinematic backdrop — swap for a real portrait/reel later */}
      <Image
        src="https://picsum.photos/seed/pks-life-hero/1920/1080?grayscale"
        alt="Portrait backdrop"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/20" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{ background: "radial-gradient(60% 50% at 20% 100%, var(--accent), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          The other half of the résumé
        </p>
        <h1 className="mt-4 font-display text-[18vw] leading-[0.82] tracking-tight sm:text-[14vw] lg:text-[11rem]">
          PRAMOD
          <span className="block text-muted">KRISHNA</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-fg/80 sm:text-xl">
          Air-gapped clusters by day. Twelve rounds in the ring, a canvas, and open tarmac by
          night. Same person, louder.
        </p>
      </div>
    </section>
  );
}
