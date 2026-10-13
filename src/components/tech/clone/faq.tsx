import Seam from "./seam";

const FAQS: Array<[string, string]> = [
  ["What is this, exactly?", "A personal portfolio built like a product: real stack, real source, no borrowed template."],
  ["Can I see the code?", "Yes. Everything is readable and forkable. The content lives in one swap-point file."],
  ["What is it built with?", "Next.js App Router, React Server Components, Tailwind, and a smooth-scroll motion layer."],
  ["Does it work on mobile?", "Mobile-first, no horizontal overflow, and it honors reduced-motion everywhere."],
  ["How do I get in touch?", "Use the contact link. Messages go to a real inbox, never a fake success screen."],
  ["Is the content final?", "No. These are honest placeholders, swapped section by section as the real work lands."],
];

/** FAQ: "before you reach out" Q&A list on a black panel. */
export default function CloneFAQ() {
  return (
    <>
      <Seam tone="ink" />
      <section id="faq" className="bg-ink px-6 py-28 text-paper sm:px-10 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <h2 className="text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Before you
            <br />
            reach out
          </h2>
          <dl className="divide-y divide-paper/10 border-t border-paper/10">
            {FAQS.map(([q, a]) => (
              <div key={q} className="py-6">
                <dt className="text-lg font-medium">{q}</dt>
                <dd className="mt-2 max-w-xl text-sm leading-relaxed text-paper/55">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
