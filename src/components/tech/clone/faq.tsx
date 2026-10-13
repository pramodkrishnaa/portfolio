import Seam from "./seam";

const FAQS: Array<[string, string]> = [
  ["What do you do?", "Forward Deployed + Agentic AI engineering: I scope ambiguous enterprise needs, architect the systems, and run what I ship."],
  ["What's your stack?", "Claude Agent SDK, LangGraph, FastAPI, Qdrant, vLLM, PyTorch, PostgreSQL, Kubernetes, and the sovereign infra around them."],
  ["Where are you based?", "Bengaluru, India. Open to remote or on-site."],
  ["Are you available?", "Yes, for senior Forward Deployed and Agentic AI roles, and scoped consulting engagements."],
  ["Can I see the code?", "Yes. I build in the open at github.com/ApexKrish and github.com/pramodkrishnaa."],
  ["How do I reach you?", "Email pramodkrishnaa29@gmail.com, or the contact button. Messages hit a real inbox, never a fake success screen."],
];

/** FAQ: "before you reach out" Q&A list on a black panel. Real answers. */
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
