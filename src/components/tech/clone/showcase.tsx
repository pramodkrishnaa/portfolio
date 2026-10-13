import Seam from "./seam";
import AsciiArt from "./ascii-art";

type Project = {
  emboss: string;
  label: string;
  context: string;
  explain: string;
  url: string;
};

const PROJECTS: Project[] = [
  {
    emboss: "AI WORKFORCE",
    label: "Autonomous AI Workforce",
    context: "QuadGen · multi-agent + RAG",
    explain: "Claude Agent SDK + LangGraph orchestration with Qdrant hybrid search. Guardrails and context caching resolving HRMS workflows autonomously — 94.2% precision@5 on technical docs.",
    url: "QuadGen · on-prem",
  },
  {
    emboss: "DRONE RL",
    label: "Autonomous Drone Navigation",
    context: "PPO → MAVLink",
    explain: "Flight-control policy trained in PyBullet with domain randomization, bridged sim-to-real over serial telemetry — 92% real-world waypoint acquisition.",
    url: "github.com/pramodkrishnaa/Drone-Navigation-Project",
  },
  {
    emboss: "BID PLATFORM",
    label: "Air-Gapped Bid Management",
    context: "BFSI · FastAPI / PostgreSQL",
    explain: "On-prem system scoped with the CFO office. Strict RBAC, zero egress, row-level security — cut proposal review latency by 60% with no data leakage.",
    url: "QuadGen · air-gapped",
  },
  {
    emboss: "INVOICE RPA",
    label: "Invoice Process Automation",
    context: "UiPath + OCR → SAP",
    explain: "End-to-end REFramework bot extracting vendor data from multi-layout PDFs into SAP ERP journal entries — 80% less manual work, higher accuracy.",
    url: "github.com/pramodkrishnaa/Invoice-Processing-Automation",
  },
  {
    emboss: "SOVEREIGN",
    label: "Sovereign Cloud Consortium",
    context: "HCL × Yotta · BFSI",
    explain: "Acted as SPOC architecting an air-gapped agentic-AI development environment on sovereign compute, and a strategic BFSI industry consortium.",
    url: "Consortium · under NDA",
  },
  {
    emboss: "PROSPECTOR",
    label: "Claude Prospector",
    context: "Open source · Claude Code plugin",
    explain: "Installable plugin with three agent skills (lead-scout, proposal, copy) over a shared config, deterministic ranking, zero hallucination by design. MIT licensed.",
    url: "github.com/pramodkrishnaa/claude-prospector",
  },
];

/** Showcase: real deployments rendered as ASCII-art panels, matching the
 *  contentarchitecture.dev gallery. Black panel. */
export default function CloneShowcase() {
  return (
    <>
      <Seam tone="ink" />
      <section id="showcase" className="bg-ink px-6 py-28 text-paper sm:px-10 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            The work that gets remembered.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/55">
            Real systems, shipped into production. The hard part was always the plumbing:
            air-gapped clusters, RBAC, telemetry, evals. With that handled, the effort goes
            where it shows.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <article key={p.label} className="group">
                {/* ASCII panel */}
                <div className="overflow-hidden rounded-sm border border-paper/12 bg-[#060606] p-3">
                  <AsciiArt emboss={p.emboss} seed={i + 1} />
                </div>

                {/* label + context + explanation + url */}
                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-mono text-sm uppercase tracking-wider text-paper">
                      {p.label}
                    </h3>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-paper/40">
                      {p.context}
                    </span>
                  </div>
                  <p className="max-w-prose text-sm leading-relaxed text-paper/55">{p.explain}</p>
                  <span className="mt-1 font-mono text-[11px] text-paper/35">{p.url}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
