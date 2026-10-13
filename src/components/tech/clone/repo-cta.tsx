import { TbArrowRight } from "react-icons/tb";
import Seam from "./seam";

/** Short paper CTA band between the two black panels, keeping the alternation. */
export default function CloneRepoCTA() {
  return (
    <>
      <Seam tone="paper" />
      <section className="bg-paper px-6 py-24 text-ink sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            This is the actual repo. Not a landing page about one.
          </h2>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-wider text-paper transition-transform active:translate-y-px"
          >
            Get access
            <TbArrowRight aria-hidden />
          </a>
        </div>
      </section>
    </>
  );
}
