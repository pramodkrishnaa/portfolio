import LifeNav from "@/components/life/clone/nav";
import LifeHero from "@/components/life/clone/hero";
import LifeMarquee from "@/components/life/clone/marquee";
import LifeFooter from "@/components/life/clone/footer";
import Feature, { type Tone, type FeatureData } from "@/components/life/clone/feature";
import { PERSONAL_EXHIBITIONS } from "@/content/site";

export const metadata = {
  title: "Life",
  description: "Boxing, art, motorcycles, summits, film and roads. The other half of the résumé.",
};

// Loud tones, rotating color-block and dark-with-accent sections.
const FLAME: Tone = { section: "bg-flame text-night", eyebrow: "text-night/80", quote: "text-night", media: "border-night/40 text-night/70", soft: "text-night/75", rule: "border-night/40" };
const EMBER: Tone = { section: "bg-ember text-night", eyebrow: "text-night/80", quote: "text-night", media: "border-night/40 text-night/70", soft: "text-night/75", rule: "border-night/40" };
const SUN: Tone = { section: "bg-sun text-night", eyebrow: "text-night/80", quote: "text-night", media: "border-night/40 text-night/70", soft: "text-night/75", rule: "border-night/40" };
const DARK_SUN: Tone = { section: "bg-night text-bone", eyebrow: "text-sun", quote: "text-sun", media: "border-sun/40 text-sun/80", soft: "text-bone/70", rule: "border-sun/40" };
const DARK_FLAME: Tone = { section: "bg-night text-bone", eyebrow: "text-flame", quote: "text-flame", media: "border-flame/40 text-flame/80", soft: "text-bone/70", rule: "border-flame/40" };
const DARK_EMBER: Tone = { section: "bg-night text-bone", eyebrow: "text-ember", quote: "text-ember", media: "border-ember/40 text-ember/80", soft: "text-bone/70", rule: "border-ember/40" };

const TONES = [FLAME, DARK_SUN, EMBER, DARK_FLAME, SUN, DARK_EMBER];

const MARQUEES = [
  { text: "BOXING / ART / SPEED / SUMMITS / FILM / ROADS /", className: "bg-sun text-night" },
  { text: "FULL CONTACT / TWELVE ROUNDS / STAY LOUD /", className: "bg-night text-flame" },
  { text: "THROTTLE / APEX / OPEN TARMAC /", className: "bg-flame text-night", reverse: true },
  { text: "FRONTIER / STAGES / PERSPECTIVE /", className: "bg-night text-sun" },
  { text: "CUT / GRADE / COMPOSITE /", className: "bg-ember text-night", reverse: true },
];

function toFeature(ex: (typeof PERSONAL_EXHIBITIONS)[number], i: number): FeatureData {
  return {
    index: String(i + 1).padStart(2, "0"),
    category: ex.category,
    title: ex.title,
    subTitle: ex.subTitle,
    quote: ex.quote,
    story: ex.story,
    badges: ex.metricsOrBadges,
    media: {
      type: ex.mediaSlot.type,
      ratio: ex.mediaSlot.aspectRatio.replace(":", "/"),
      caption: ex.mediaSlot.placeholderNote,
      fileName: ex.mediaSlot.targetFileName,
    },
  };
}

export default function LifeWorld() {
  return (
    <main className="bg-night">
      <LifeNav />
      <LifeHero />
      <LifeMarquee text={MARQUEES[0].text} className={MARQUEES[0].className} />
      {PERSONAL_EXHIBITIONS.map((ex, i) => (
        <div key={ex.id}>
          <Feature data={toFeature(ex, i)} tone={TONES[i % TONES.length]} reverse={i % 2 === 1} />
          {i < PERSONAL_EXHIBITIONS.length - 1 && (
            <LifeMarquee
              text={MARQUEES[(i + 1) % MARQUEES.length].text}
              className={MARQUEES[(i + 1) % MARQUEES.length].className}
              reverse={MARQUEES[(i + 1) % MARQUEES.length].reverse}
            />
          )}
        </div>
      ))}
      <LifeFooter />
    </main>
  );
}
