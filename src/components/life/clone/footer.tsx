import { TbArrowUpRight } from "react-icons/tb";
import { PERSONAL_INFO as P } from "@/content/site";

const LINKS = [
  { label: "Email", href: `mailto:${P.email}` },
  { label: "GitHub", href: P.github },
  { label: "LinkedIn", href: P.linkedin },
];

/** Loud closing footer for the life page. */
export default function LifeFooter() {
  return (
    <footer className="bg-night px-5 py-24 text-bone sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1600px]">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-sun">Say hello</p>
        <h2 className="mt-5 font-display text-6xl leading-[0.85] tracking-tight sm:text-7xl lg:text-[9rem]">
          LET&rsquo;S MAKE
          <span className="block text-flame">SOMETHING LOUD.</span>
        </h2>

        <div className="mt-12 flex flex-wrap gap-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group inline-flex items-center gap-2 rounded-full border-2 border-bone/30 px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:border-sun hover:text-sun"
            >
              {l.label}
              <TbArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          ))}
        </div>

        <p className="mt-16 border-t border-bone/10 pt-8 font-mono text-xs text-bone/40">
          {P.name} — {P.location}. Off the clock.
        </p>
      </div>
    </footer>
  );
}
