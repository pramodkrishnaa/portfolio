import Link from "next/link";
import { TbArrowUpRight } from "react-icons/tb";
import Section from "@/components/site/section";
import Reveal from "@/components/reveal";
import MediaSlot from "@/components/site/media-slot";
import { TECHNICAL_DISCIPLINES as D } from "@/content/site";

const FEATURED = ["agentic-ai", "llm-tuning", "fullstack-systems", "fde-airgapped"];
const items = FEATURED.map((id) => D.find((d) => d.id === id)!).filter(Boolean);

export default function Work() {
  return (
    <Section id="work" className="py-28">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Selected work</h2>
        <span className="font-mono text-sm text-dim">Proof, not promises</span>
      </div>

      <div className="mt-16 flex flex-col gap-24">
        {items.map((d) => {
          const pow = d.proofOfWork;
          return (
            <Reveal key={d.id} className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              <MediaSlot
                file={pow.videoOrImageSlot.targetFileName}
                caption={pow.videoOrImageSlot.caption}
                kind={pow.videoOrImageSlot.type}
                aspect={pow.videoOrImageSlot.type === "image" ? "16:10" : "16:9"}
              />

              <div>
                <span className="font-mono text-sm text-accent">{d.categoryNumber}</span>
                <h3 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                  {pow.label}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-muted">{pow.description}</p>

                <p className="mt-6 inline-flex rounded border border-line bg-bg-elev px-3 py-1.5 font-mono text-xs text-fg">
                  {pow.metric}
                </p>

                {d.link && (
                  <div className="mt-6">
                    <Link
                      href={d.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
                    >
                      {d.link.label}
                      <TbArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
