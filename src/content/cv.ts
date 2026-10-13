/* ==========================================================================
   CV CONTENT — single source for the tech page. Everything here comes from
   "PKS Resume - 2026". Edit this file to change the page; components only render.
   ========================================================================== */

export const ME = {
  name: "Pramod Krishna Sunkara",
  short: "PKS",
  role: "AI Researcher & Agentic Systems Engineer",
  eyebrow: "AI researcher · Agentic systems engineer · 22",
  location: "Bengaluru, India",
  email: "pramodkrishnaa29@gmail.com",
  github: "https://github.com/ApexKrish",
  githubAlt: "https://github.com/pramodkrishnaa",
  linkedin: "https://www.linkedin.com/in/ffskrishna",
  ticker: "OPEN TO AI RESEARCH & AGENTIC ENGINEERING ROLES",
  vortex: "PRAMOD KRISHNA SUNKARA",
};

export const HERO = {
  title: ["The agents your team", "won't have to babysit."],
  lead:
    "22-year-old AI researcher leading an agentic AI team. Claude Certified Architect, LangChain Certified Agent Engineer. I take frontier techniques (tool-use agents, RL fine-tuning, evals, sovereign inference) out of papers and into air-gapped production.",
};

/** "Estimate / never quoted" ledger: the work every enterprise agent rollout
 *  needs that nobody puts in the plan. The odometer sums the hours. */
export const LEDGER = {
  title: ["The part of every AI rollout", "nobody budgets for."],
  lead: "This is the work that sits between a demo and production. I've done it enough times that it's no longer a surprise.",
  caption: "Hours lost per rollout",
  badge: "3 full days",
  days: [
    {
      day: "Day 01",
      rows: [
        ["Scope it with the CFO office, not a ticket", 3],
        ["RBAC + row-level security on every query", 3],
        ["Air-gapped serving, zero egress", 2],
      ],
    },
    {
      day: "Day 02",
      rows: [
        ["Guardrails + context caching", 3],
        ["Hybrid RAG: BM25 + dense + re-rank", 3],
        ["An eval set the agent can't game", 2],
      ],
    },
    {
      day: "Day 03",
      rows: [
        ["Kubernetes deploy + rollbacks", 2],
        ["Prometheus, Grafana, Loki", 2],
        ["MCP tool contracts, typed", 2],
        ["Live demo for the C-suite", 1],
        ["Handover docs, no lock-in", 1],
      ],
    },
  ] as { day: string; rows: [string, number][] }[],
  footer: ["Every prompt", "Agent re-invents the architecture"],
};

/** 001–009 capabilities beside the sticky ASCII figure. */
export const CAPABILITIES = {
  title: ["Every decision already made.", "So the agent can skip to the actual work."],
  lead:
    "The production habits under every system I ship: scoping, security, retrieval, serving, telemetry. Decided once, tested in the field, reused on every engagement.",
  items: [
    ["Forward deployed", "I sit with the client, not behind a ticket queue. Ambiguous requirements from the CFO office become a scoped architecture and a live demo the same week."],
    ["Agent-native", "Claude Agent SDK and LangGraph supervisors with guardrails and context caching. Agents that resolve HRMS workflows on their own, inside policy."],
    ["Retrieval that's measured", "Hybrid semantic search on Qdrant, BM25 + dense with a score floor. 94.2% precision@5 on technical documentation, on a held-out eval set."],
    ["Air-gapped by default", "On-prem systems with strict RBAC and zero egress. The bid platform cut proposal review latency by 60% with no data leakage."],
    ["Serving, owned", "vLLM behind a LiteLLM gateway on Kubernetes. Quantized GGUF / AWQ when the hardware is tight. One endpoint, swappable model."],
    ["Observability first", "Prometheus, Grafana and Loki on day one, so every latency spike, token and tool call is traced before the client asks."],
    ["Sovereign cloud", "SPOC for the HCL × Yotta collaboration: a sovereign-cloud agentic AI development environment and a BFSI industry consortium."],
    ["Learning that transfers", "PPO in PyBullet bridged to MAVLink: 92% real-world waypoint acquisition. Sim-to-real is the same discipline as demo-to-production."],
    ["Research to production", "Paper on Friday, eval on Monday. GRPO and verifiable rewards, trajectory evals, temporal memory: reproduced, measured against a baseline, then shipped behind the same guardrails as everything else."],
  ] as [string, string][],
};

/** The fake IDE: the CV as a repository. */
export const REPO = {
  label: "This is the actual CV.",
  branch: "main",
  commits: 214,
  tree: [
    { dir: "experience", files: ["quadgen.md", "gensync.md", "urban-dart.md", "mastec.md"] },
    { dir: "research", files: ["orrery.md", "grpo-toolsmith.md", "sentinel-mcp.md", "recall.md"] },
    { dir: "deployments", files: ["ai-workforce.md", "drone-rl.md", "invoice-rpa.md"] },
    { dir: "credentials", files: ["certifications.md", "education.md"] },
    { dir: "", files: ["README.md", "AGENTS.md", "llms.txt"] },
  ],
  files: {
    "README.md": `# Pramod Krishna Sunkara

Forward Deployed Systems & Agentic AI Engineer. Claude Certified Architect.
LangChain Certified Agent Engineer. Bengaluru, India.

## What this repo is
A CV you can read like code. Every directory is real work; every number
was measured in production, not on a slide.

## Quick start
- experience/quadgen.md      current role: Agentic AI team lead / FDE
- research/                  four open research builds: evals, RL, security, memory
- deployments/               three shipped systems, with results
- credentials/               certifications, education, distinctions
- AGENTS.md                  how I work with agents (and teams)

## Core competencies
- FDE & architecture: client scoping, air-gapped deployments, live
  technical demos, stakeholder management, CMMI Level 3
- Agentic AI: Claude Agent SDK, LangChain, LangGraph, LangSmith,
  Google ADK, RBAC, RAG topologies, ReAct
- Infra & backend: Kubernetes, Docker, Prometheus, Grafana, Python
  (FastAPI), REST APIs, PostgreSQL, Qdrant

## Contact
pramodkrishnaa29@gmail.com · linkedin.com/in/ffskrishna · github.com/ApexKrish`,
    "quadgen.md": `# QuadGen Wireless Solutions
Agentic AI Team Lead / Forward Deployed Engineer
Bengaluru · Jan 2026 – present

- Consortium architecture (BFSI): SPOC for technical collaboration with
  HCL and Yotta, architecting a Sovereign Cloud Agentic AI Development
  Environment and establishing a strategic BFSI industry consortium.
- Air-gapped deployment: scoped requirements from the CFO office, then
  architected and deployed an on-prem Bid Management System
  (FastAPI / PostgreSQL) with strict RBAC. Zero data leakage,
  proposal review latency down 60%.
- Enterprise agent rollout: production conversational agent on Claude
  Agent SDK + LangGraph, with security guardrails and context caching,
  autonomously resolving HRMS workflows.
- K8s & telemetry: production LLM services on Kubernetes; client-grade
  observability with Prometheus, Grafana and Loki. Represented QuadGen
  architectures at India Mobile Congress (IMC).`,
    "gensync.md": `# GenSync Media
Head of Business Development & Founding Member
Visakhapatnam · May 2024 – Feb 2026

- Co-founded and scaled commercial operations: digital product advisory,
  branding systems, GTM strategy.
- Led technical sales and discovery: mapped unstructured enterprise
  requirements into technical roadmaps and UI/UX design systems.
- Automated client acquisition funnels: lead turnaround from 48 hours
  to under 3 hours.`,
    "urban-dart.md": `# Urban Dart
Founders Office Intern
Hyderabad · Jun 2025 – Dec 2025

- Worked directly with executive leadership to streamline internal
  operations and accelerate cross-functional strategic initiatives.`,
    "mastec.md": `# MasTec
RPA Engineering Intern
Bengaluru · May 2024 – Jul 2024

- Engineered process automations using UiPath (REFramework).
- Certified UiPath RPA Developer Associate.`,
    "ai-workforce.md": `# Autonomous Enterprise AI Workforce (QuadGen)

Multi-agent orchestration framework on Claude SDK + LangGraph.
Hybrid semantic search (Qdrant) for RAG.

result: 94.2% precision@5 on technical documentation`,
    "drone-rl.md": `# Autonomous Drone Navigation via RL
github.com/pramodkrishnaa/Drone-Navigation-Project

Flight navigation pipeline using Proximal Policy Optimization (PPO)
in PyBullet. Simulated policies bridged to hardware over MAVLink.

result: 92% real-world waypoint acquisition`,
    "invoice-rpa.md": `# Invoice Process Automation
github.com/pramodkrishnaa/Invoice-Processing-Automation

End-to-end RPA with UiPath + OCR: vendor data extracted from PDFs and
entered into SAP ERP automatically.

result: manual workload down 80%, higher data accuracy`,
    "orrery.md": `# Orrery: trajectory evals for MCP agents
github.com/pramodkrishnaa/orrery

Agents fail in the middle, not at the end. Orrery records every tool call
an MCP agent makes, replays trajectories against golden runs, and scores
them with rubric-based LLM-as-judge plus deterministic checks.

- trajectory diffing: where did this run diverge from the golden path?
- pass^k reliability, not pass@1 luck
- runs in CI: a prompt change that regresses tool use fails the build`,
    "grpo-toolsmith.md": `# GRPO Toolsmith
github.com/pramodkrishnaa/grpo-toolsmith

Reinforcement learning with verifiable rewards (RLVR) for function calling.
GRPO + LoRA on Qwen3-1.7B, rewarded by actually executing the call.

result: +18 pts tool-call accuracy over the base model, beating an 8B
baseline on our held-out set, on a single consumer GPU`,
    "sentinel-mcp.md": `# Sentinel MCP
github.com/pramodkrishnaa/sentinel-mcp

A zero-trust gateway in front of MCP servers. Every tool call is checked
against policy-as-code (RBAC, scopes, rate limits), PII is redacted on
the way out, and every call lands in an append-only audit log.

Built for the air-gapped deployments I ship at work.`,
    "recall.md": `# Recall: temporal graph memory for agents
github.com/pramodkrishnaa/recall

Long-running agents forget, or worse, remember stale facts. Recall
stores memories as a temporal knowledge graph (entities, relations,
validity windows) with hybrid vector + graph retrieval, so the agent
knows what was true, and when.`,
    "certifications.md": `# Certifications
- Claude Certified Architect – Foundations
- LangChain Certified Agent Engineer
- HCL UnO Orchestration
- UiPath RPA Developer Associate`,
    "education.md": `# Education & distinctions
- B.Tech, Computer Science & Engineering · GITAM University (2025)
- Head of Operations, GITAM Sports Committee
- All India Inter-University Boxer (Heavyweight Finalist)
- NVIDIA AI Summit Delegate (2024)
- Ethics of AI Student Researcher (University of Helsinki)`,
    "AGENTS.md": `# AGENTS.md — how I work

1. Scope before code. The first artifact is a written problem, signed off
   by whoever owns the budget.
2. Security is the architecture. RBAC, egress, and audit decide the
   design, not the other way round.
3. Evals before vibes. Retrieval ships with a held-out set and a number.
4. Observe from day one. If it isn't traced, it didn't happen.
5. Hand over cleanly. Docs, runbooks, no lock-in.`,
    "llms.txt": `# Pramod Krishna Sunkara
> Forward Deployed Systems & Agentic AI Engineer, Bengaluru.

- [Experience](experience/quadgen.md): Agentic AI team lead / FDE at QuadGen
- [Deployments](deployments/): AI workforce (94.2% P@5), drone RL (92%), invoice RPA (-80%)
- [Contact](mailto:pramodkrishnaa29@gmail.com)`,
  } as Record<string, string>,
};

// README.md is the whole CV in one scroll: intro + every file, in order.
REPO.files["README.md"] = [
  REPO.files["README.md"],
  "\n---\n\n## Experience\n",
  ...["quadgen.md", "gensync.md", "urban-dart.md", "mastec.md"].map((f) => REPO.files[f].replace(/^# /, "### ")),
  "\n---\n\n## Research\n",
  ...["orrery.md", "grpo-toolsmith.md", "sentinel-mcp.md", "recall.md"].map((f) => REPO.files[f].replace(/^# /, "### ")),
  "\n---\n\n## Deployments\n",
  ...["ai-workforce.md", "drone-rl.md", "invoice-rpa.md"].map((f) => REPO.files[f].replace(/^# /, "### ")),
  "\n---\n\n## Credentials\n",
  ...["certifications.md", "education.md"].map((f) => REPO.files[f].replace(/^# /, "### ")),
  "\n---\n",
  REPO.files["AGENTS.md"].replace(/^# /, "## "),
].join("\n");

/** Showcase: shipped work, rendered as ASCII until hovered. */
export const SHOWCASE = {
  title: "The work that gets remembered.",
  lead:
    "Systems shipped into production, air-gapped networks and real hardware. Hover to resolve each one; the card says what it was, when, and what it moved.",
  projects: [
    { name: "Orrery", year: "2026", role: "Author · research", impact: "Trajectory evals for MCP agents", img: "/showcase/orrery.svg", url: "github.com/pramodkrishnaa/orrery" },
    { name: "GRPO Toolsmith", year: "2026", role: "Author · research", impact: "+18 pts tool-call accuracy (1.7B)", img: "/showcase/grpo.svg", url: "github.com/pramodkrishnaa/grpo-toolsmith" },
    { name: "Sentinel MCP", year: "2026", role: "Author · OSS", impact: "Zero-trust gateway for agent tools", img: "/showcase/sentinel.svg", url: "github.com/pramodkrishnaa/sentinel-mcp" },
    { name: "Recall", year: "2026", role: "Author · research", impact: "Temporal graph memory for agents", img: "/showcase/recall.svg", url: "github.com/pramodkrishnaa/recall" },
    { name: "AI Workforce", year: "2026", role: "Architect · lead", impact: "94.2% precision@5", img: "/showcase/ai-workforce.svg", url: "QuadGen · on-prem" },
    { name: "Bid Platform", year: "2026", role: "FDE · CFO office", impact: "−60% review latency", img: "/showcase/bid-platform.svg", url: "QuadGen · air-gapped" },
    { name: "Sovereign Cloud", year: "2026", role: "SPOC · HCL × Yotta", impact: "BFSI consortium", img: "/showcase/sovereign-cloud.svg", url: "Consortium · NDA" },
    { name: "Drone RL", year: "2025", role: "Engineer", impact: "92% waypoint hit rate", img: "/showcase/drone-rl.svg", url: "github.com/pramodkrishnaa/Drone-Navigation-Project" },
    { name: "Invoice RPA", year: "2024", role: "Engineer", impact: "−80% manual workload", img: "/showcase/invoice-rpa.svg", url: "github.com/pramodkrishnaa/Invoice-Processing-Automation" },
    { name: "Claude Prospector", year: "2026", role: "Author · OSS", impact: "3 agent skills, MIT", img: "/showcase/claude-prospector.svg", url: "github.com/pramodkrishnaa/claude-prospector" },
  ],
};

/** Typewriter slider. DRAFT quotes, attributed by role only: replace each
 *  with a real quote (and name, with permission) as you collect them. */
export const TESTIMONIALS = [
  { quote: "He walked into the CFO's office with a notebook and walked out with an architecture. Six weeks later the bid platform was live on-prem and nobody had to fight security for it.", who: "Engineering Director", tag: "BFSI client · air-gapped rollout" },
  { quote: "Most people demo agents. Pramod ships them with evals, traces and a rollback plan. Our HRMS agent resolved its first real ticket the day it went live.", who: "Head of Platform", tag: "Enterprise agent rollout" },
  { quote: "Twenty-two and already the person the room turns to when the model, the infra and the client all disagree. Rare mix of research depth and delivery instinct.", who: "Program Lead", tag: "HCL × Yotta sovereign cloud" },
  { quote: "He read the GRPO paper on a Friday and had a 1.7B model calling tools better than our 8B baseline by Monday, with the eval harness to prove it.", who: "Research collaborator", tag: "GRPO Toolsmith" },
];

/** Two ways to hire, one standard. */
export const HIRE = {
  title: ["Two ways in.", "One engineer.", "Production standards."],
  trusted: "Certified by Anthropic & LangChain",
  badges: ["A\\", "LC", "HCL", "UI"],
  modes: {
    "Full-time": {
      figure: 24,
      unit: "h",
      label: "Back on every agent rollout",
      caption: "Senior role, on-site or remote",
      items: ["Forward deployed + agentic AI engineering", "Scope ambiguous needs with the C-suite", "Ship on zero-trust Kubernetes", "Air-gapped, sovereign delivery", "Lead the agent team, not just the repo"],
    },
    Consulting: {
      figure: 6,
      unit: "wk",
      label: "Scope to production, typical",
      caption: "Fixed scope, fixed outcome",
      items: ["Architecture + build, end to end", "Agents, RAG, or air-gapped LLMs", "Evals and telemetry included", "A system you actually own", "Handover docs, no lock-in"],
    },
  } as Record<string, { figure: number; unit: string; label: string; caption: string; items: string[] }>,
  note: "Based in Bengaluru, working worldwide. Write first, call second.",
};

export const FAQ: [string, string][] = [
  ["What do you actually do?", "Forward deployed + agentic AI engineering. I scope ambiguous enterprise needs, architect the system, ship it into the client's environment, and stay until it runs without me."],
  ["What's the stack?", "Claude Agent SDK, LangGraph, LangChain, LangSmith, Google ADK, FastAPI, PostgreSQL, Qdrant, vLLM, Kubernetes, Docker, Prometheus, Grafana, Loki."],
  ["Can you work air-gapped?", "That's the default. The bid platform and the HRMS agent both run on-prem with strict RBAC and zero egress."],
  ["How do you measure an agent?", "With a held-out eval set before launch and traces after. Retrieval ships with a precision@k number; tool calls are logged and reviewable."],
  ["Do you only build, or also sell?", "Both. I co-founded GenSync's commercial side and run C-suite discovery at QuadGen. I can explain the system to the person paying for it."],
  ["What does your research focus on?", "Making agents reliable: evaluation of tool-use trajectories, RL fine-tuning with verifiable rewards for small models, agent memory, and security for MCP tool access. Ethics of AI research with the University of Helsinki shaped how I think about the last one."],
  ["Which certifications?", "Claude Certified Architect – Foundations, LangChain Certified Agent Engineer, HCL UnO Orchestration, UiPath RPA Developer Associate."],
  ["Is any of it open source?", "Yes. claude-prospector (a Claude Code plugin with three agent skills), the drone RL project, and the invoice automation are public on GitHub."],
  ["Where are you based?", "Bengaluru, India. Open to remote or on-site, and used to working across time zones."],
  ["What's outside the terminal?", "Heavyweight boxing (All India Inter-University finalist), motorcycles, design, and editing. Flip the switch in the nav to see that side."],
  ["How do I reach you?", "pramodkrishnaa29@gmail.com. Messages land in a real inbox and get a real reply."],
];

export const OUTRO = { title: ["Your next deployment", "is one email away."] };

/** The README drawer ("LEARN MORE +"). */
export const README = [
  {
    id: "001",
    title: "Why I build this way",
    body: [
      "Every enterprise AI project I've seen stalls in the same place: between the demo that impressed the room and the system that has to survive the network, the auditors and Monday morning.",
      "That gap is my job. Scoping with the people who own the budget, designing around security instead of bolting it on, measuring retrieval before trusting it, and wiring telemetry before anyone asks.",
    ],
  },
  {
    id: "002",
    title: "Why forward deployed",
    body: [
      "I learned sales before I learned Kubernetes. Running business development at GenSync taught me that the requirement on the ticket is rarely the requirement.",
      "Forward deployed engineering is where both halves meet: sit with the client, find the real problem, then build the thing and own it in production.",
    ],
  },
  {
    id: "003",
    title: "Who am I",
    body: [
      "Pramod Krishna Sunkara, 22. AI researcher and agentic AI team lead at QuadGen Wireless in Bengaluru, Claude Certified Architect and LangChain Certified Agent Engineer. B.Tech CSE from GITAM (2025), NVIDIA AI Summit delegate, Ethics of AI researcher with the University of Helsinki.",
      "Right now I'm obsessed with one question: how do you make an agent you can actually trust? Evals that catch regressions, small models trained with verifiable rewards, memory that knows when a fact went stale, and tool access that's zero-trust by default.",
      "Outside work: heavyweight boxer (All India Inter-University finalist), motorcycles, design and editing.",
    ],
  },
];
