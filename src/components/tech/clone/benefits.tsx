import Seam from "./seam";

const TREE = [
  { t: "> .agents", dim: true },
  { t: "> .config", dim: true },
  { t: "v app", dim: false },
  { t: "    layout.tsx", dim: false, indent: true },
  { t: "    page.tsx", dim: false, indent: true, active: true },
  { t: "  components/", dim: false },
  { t: "  content/site.ts", dim: false },
  { t: "  sitemap.ts", dim: true },
  { t: "  robots.ts", dim: true },
];

const README: Array<{ t: string; kind?: "h" | "dim" | "code" }> = [
  { t: "# portfolio (next.js)", kind: "h" },
  { t: "", },
  { t: "Personal site: systems, infrastructure, and the", kind: "dim" },
  { t: "work in between. Built to be read and forked.", kind: "dim" },
  { t: "", },
  { t: "- App Router + Server Components" },
  { t: "- One content swap-point (content/site.ts)" },
  { t: "- Smooth scroll, scroll-driven sections" },
  { t: "- Honest placeholders, never div-fakes" },
  { t: "", },
  { t: "export const metadata = {", kind: "code" },
  { t: "  title: 'Pramod Krishna Sunkara',", kind: "code" },
  { t: "  description: 'The work that ships itself.',", kind: "code" },
  { t: "}", kind: "code" },
];

/** Benefits section: ASCII-curtain seam into a black fake-IDE "this is the actual
 *  repo" mockup (file tree + README + minimap). */
export default function CloneBenefits() {
  return (
    <>
      <Seam tone="ink" />
      <section id="stack" className="relative isolate bg-ink px-6 pb-28 pt-4 text-paper sm:px-10 lg:px-16 lg:pb-40">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            Every decision already made.
            <br />
            So you can skip to the actual work.
          </h2>

          {/* IDE window */}
          <div className="mt-14 overflow-hidden rounded-md border border-paper/15 bg-[#0c0c0e] font-mono text-xs">
            {/* top bar */}
            <div className="flex items-center justify-between border-b border-paper/10 px-3 py-2 text-paper/60">
              <div className="flex gap-1">
                <span className="rounded-sm bg-paper/10 px-2 py-1 text-paper">APP</span>
                <span className="px-2 py-1">WEB</span>
              </div>
              <span className="hidden tracking-wider sm:block">THIS IS THE ACTUAL REPO.</span>
              <div className="flex gap-2">
                <span className="rounded-sm border border-paper/15 px-1.5 py-0.5">Ctrl J</span>
                <span className="rounded-sm border border-paper/15 px-1.5 py-0.5">Ctrl K</span>
              </div>
            </div>

            <div className="grid grid-cols-[9rem_1fr_2.5rem] sm:grid-cols-[12rem_1fr_3rem]">
              {/* file tree */}
              <ul className="border-r border-paper/10 py-3 text-paper/70">
                {TREE.map((n, i) => (
                  <li
                    key={i}
                    className={`truncate px-3 py-0.5 ${n.dim ? "text-paper/40" : ""} ${
                      "active" in n && n.active ? "bg-paper/10 text-paper" : ""
                    }`}
                  >
                    {n.t}
                  </li>
                ))}
              </ul>

              {/* code */}
              <div className="overflow-x-auto py-3">
                {README.map((l, i) => (
                  <div key={i} className="flex gap-4 px-3 leading-6">
                    <span className="w-5 shrink-0 select-none text-right text-paper/25">{i + 1}</span>
                    <span
                      className={
                        l.kind === "h"
                          ? "font-medium text-paper"
                          : l.kind === "dim"
                          ? "text-paper/45"
                          : l.kind === "code"
                          ? "text-paper/80"
                          : "text-paper/70"
                      }
                    >
                      {l.t || " "}
                    </span>
                  </div>
                ))}
              </div>

              {/* minimap */}
              <div className="flex flex-col gap-0.5 border-l border-paper/10 py-3 pr-2 pl-1">
                {Array.from({ length: 22 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-0.5 rounded-full bg-paper/15"
                    style={{ width: `${30 + ((i * 37) % 60)}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
