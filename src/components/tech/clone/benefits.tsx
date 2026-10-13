import Seam from "./seam";

const TREE = [
  { t: "> agentic-ai", dim: true },
  { t: "> llm-tuning", dim: true },
  { t: "v projects", dim: false },
  { t: "    bid-platform.bfsi", dim: false, indent: true },
  { t: "    drone-rl.ppo", dim: false, indent: true },
  { t: "  rag-pipeline/", dim: false },
  { t: "  claude-prospector/", dim: false },
  { t: "  README.md", dim: false, active: true },
];

const README: Array<{ t: string; kind?: "h" | "dim" | "code" }> = [
  { t: "# pramod krishna sunkara", kind: "h" },
  { t: "Forward Deployed Systems & Agentic AI Engineer.", kind: "dim" },
  { t: "" },
  { t: "Air-gapped LLM systems, autonomous multi-agent", kind: "dim" },
  { t: "graphs, and the sovereign cloud that runs them.", kind: "dim" },
  { t: "" },
  { t: "- Agentic AI & multi-agent supervisor graphs" },
  { t: "- LLM fine-tuning + quantized on-prem inference" },
  { t: "- Hybrid semantic RAG (94.2% precision@5)" },
  { t: "- Forward-deployed on zero-trust Kubernetes" },
  { t: "" },
  { t: "stack = [", kind: "code" },
  { t: "  'Claude Agent SDK', 'LangGraph', 'FastAPI',", kind: "code" },
  { t: "  'Qdrant', 'vLLM', 'PyTorch', 'Kubernetes',", kind: "code" },
  { t: "]", kind: "code" },
];

/** Benefits section: ASCII-curtain seam into a black fake-IDE "this is the actual
 *  repo" mockup, carrying real stack + highlights. */
export default function CloneBenefits() {
  return (
    <>
      <Seam tone="ink" />
      <section id="stack" className="relative isolate bg-ink px-6 pb-28 pt-4 text-paper sm:px-10 lg:px-16 lg:pb-40">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            Everything here is readable,
            <br />
            forkable, and real.
          </h2>

          <div className="mt-14 overflow-hidden rounded-md border border-paper/15 bg-[#0c0c0e] font-mono text-xs">
            <div className="flex items-center justify-between border-b border-paper/10 px-3 py-2 text-paper/60">
              <div className="flex gap-1">
                <span className="rounded-sm bg-paper/10 px-2 py-1 text-paper">AGENTS</span>
                <span className="px-2 py-1">INFRA</span>
              </div>
              <span className="hidden tracking-wider sm:block">THIS IS THE ACTUAL REPO.</span>
              <div className="flex gap-2">
                <span className="rounded-sm border border-paper/15 px-1.5 py-0.5">Ctrl J</span>
                <span className="rounded-sm border border-paper/15 px-1.5 py-0.5">Ctrl K</span>
              </div>
            </div>

            <div className="grid grid-cols-[9rem_1fr_2.5rem] sm:grid-cols-[12rem_1fr_3rem]">
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
                      {l.t || " "}
                    </span>
                  </div>
                ))}
              </div>

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
