/** Bold scrolling marquee band used between life sections for energy. */
export default function LifeMarquee({
  text,
  className = "bg-flame text-night",
  reverse = false,
}: {
  text: string;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={`overflow-hidden py-3 ${className}`} aria-hidden>
      <div
        className="flex w-max gap-6 whitespace-nowrap font-display text-2xl uppercase tracking-wide sm:text-3xl"
        style={{ animation: `marquee 24s linear infinite${reverse ? " reverse" : ""}` }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="flex items-center gap-6">
            {text}
            <span className="opacity-50">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
