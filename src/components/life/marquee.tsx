const WORDS = ["BOXING", "CANVAS", "MOTORCYCLES", "SUMMITS", "FILM CUTS", "OPEN ROAD"];

/** One kinetic marquee for the whole page. Freezes under reduced motion. */
export default function Marquee() {
  const strip = [...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden border-y border-line py-6">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 whitespace-nowrap">
        {strip.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-5xl text-muted sm:text-7xl">
            {w}
            <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
