import { TbGridDots } from "react-icons/tb";

const LINKS = ["Work", "Stack", "Showcase", "Pricing", "FAQ", "Blog"];
const TICKER = "AVAILABLE FOR SENIOR ENGINEERING ROLES";

/** Centered pill nav with a logo tile and a marquee ticker strip underneath,
 *  floating over both hero panels. */
export default function CloneNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-3xl overflow-hidden rounded-md border border-paper/15 bg-ink/90 text-paper backdrop-blur-md">
        <nav className="flex items-center gap-2 px-2 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-paper/10 text-paper">
            <TbGridDots aria-hidden />
          </span>
          <ul className="flex flex-1 items-center justify-around">
            {LINKS.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="px-2 font-mono text-xs uppercase tracking-wider text-paper/70 transition-colors hover:text-paper"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* ticker strip */}
        <div className="overflow-hidden border-t border-paper/10 py-1">
          <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                {TICKER}
                <span aria-hidden>/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
