import MediaSlot from "./media-slot";

export type Tone = {
  section: string;   // bg + base text, e.g. "bg-flame text-night"
  eyebrow: string;   // eyebrow / index color
  quote: string;     // pull-quote color
  media: string;     // media placeholder border/label accent
  soft: string;      // secondary text color
  rule: string;      // hairline / badge border color
};

export type FeatureData = {
  index: string;
  category: string;
  title: string;
  subTitle: string;
  quote: string;
  story: string[];
  badges: string[];
  media: { type: "video" | "image"; ratio: string; caption: string; fileName: string };
};

/** Full-bleed cinematic life section: giant display headline + story on one side,
 *  a tall media placeholder on the other. Loud color tone per section. */
export default function Feature({
  data,
  tone,
  reverse = false,
}: {
  data: FeatureData;
  tone: Tone;
  reverse?: boolean;
}) {
  return (
    <section className={`${tone.section} px-5 py-24 sm:px-8 sm:py-32`}>
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* MEDIA */}
        <div className={reverse ? "lg:order-2" : "lg:order-1"}>
          <MediaSlot
            type={data.media.type}
            ratio={data.media.ratio}
            caption={data.media.caption}
            fileName={data.media.fileName}
            accent={tone.media}
          />
        </div>

        {/* COPY */}
        <div className={reverse ? "lg:order-1" : "lg:order-2"}>
          <p className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] ${tone.eyebrow}`}>
            <span>{data.index}</span>
            <span className={`h-px w-8 ${tone.rule} bg-current opacity-40`} />
            {data.category}
          </p>

          <h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
            {data.title}
          </h2>
          <p className={`mt-4 text-base ${tone.soft}`}>{data.subTitle}</p>

          <blockquote className={`mt-8 border-l-2 pl-5 text-xl font-medium leading-snug ${tone.quote} ${tone.rule}`}>
            &ldquo;{data.quote}&rdquo;
          </blockquote>

          <div className={`mt-6 space-y-3 text-sm leading-relaxed ${tone.soft}`}>
            {data.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <ul className="mt-7 flex flex-wrap gap-2">
            {data.badges.map((b) => (
              <li
                key={b}
                className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${tone.rule}`}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
