import Link from "next/link";
import { TbBrandGithub, TbArrowUpRight } from "react-icons/tb";
import Section from "@/components/site/section";
import Reveal from "@/components/reveal";
import { PERSONAL_INFO as P } from "@/content/site";

const REPOS = [
  {
    name: "claude-prospector",
    url: "https://github.com/pramodkrishnaa/claude-prospector",
    desc: "A Claude Code plugin with three agent skills that share one config. Deterministic ranking, zero hallucination by design.",
    tag: "MIT · Claude Code plugin",
  },
  {
    name: "Drone-Navigation-Project",
    url: "https://github.com/pramodkrishnaa/Drone-Navigation-Project",
    desc: "PPO flight-control policies trained in PyBullet, bridged to real hardware over MAVLink serial telemetry.",
    tag: "PyTorch · Reinforcement Learning",
  },
  {
    name: "Invoice-Processing-Automation",
    url: "https://github.com/pramodkrishnaa/Invoice-Processing-Automation",
    desc: "UiPath REFramework + OCR pipeline extracting invoice data from multi-layout PDFs into SAP journal entries.",
    tag: "UiPath · OCR",
  },
];

export default function OpenSource() {
  return (
    <Section className="py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            I ship in public on the same tools I use daily.
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Plugins, agent forks, and robotics repos. Two accounts, one builder.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={P.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-sm text-fg transition-colors hover:border-accent"
            >
              <TbBrandGithub aria-hidden /> @ApexKrish
            </Link>
            <Link
              href={P.githubAlt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-sm text-fg transition-colors hover:border-accent"
            >
              <TbBrandGithub aria-hidden /> @pramodkrishnaa
            </Link>
          </div>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {REPOS.map((r, i) => (
            <li key={r.name}>
              <Reveal delay={i * 0.05}>
                <Link
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 py-6 transition-colors hover:bg-bg-elev/40"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-base text-fg">{r.name}</span>
                    <TbArrowUpRight
                      className="shrink-0 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-muted">{r.desc}</p>
                  <span className="font-mono text-[11px] text-dim">{r.tag}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
