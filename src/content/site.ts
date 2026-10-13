export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string[];
}

export interface TechDiscipline {
  id: string;
  title: string;
  categoryNumber: string;
  tagline: string;
  description: string;
  tools: { name: string; icon: string; category: string }[];
  proofOfWork: {
    label: string;
    description: string;
    metric: string;
    videoOrImageSlot: {
      type: 'video' | 'image';
      targetFileName: string;
      caption: string;
      dimensions: string;
    };
  };
  link?: { label: string; url: string };
}

export interface PersonalExhibition {
  id: string;
  title: string;
  subTitle: string;
  category: 'SPORT' | 'ART' | 'MOTORCYCLES' | 'SUMMITS' | 'ADOBE' | 'TRAVEL';
  quote: string;
  story: string[];
  metricsOrBadges: string[];
  mediaSlot: {
    type: 'video' | 'image';
    targetFileName: string;
    aspectRatio: string;
    dimensions: string;
    placeholderNote: string;
  };
}

export const PERSONAL_INFO = {
  name: "PRAMOD KRISHNA SUNKARA",
  shortName: "PKS",
  tagline: "AI Researcher & Agentic Systems Engineer",
  subTagline: "22-year-old AI researcher and agentic AI team lead. Agent evals, RL fine-tuning, MCP security and air-gapped LLM systems, from paper to production.",
  location: "Bengaluru, India (Remote / On-site)",
  availability: "Available for Senior FDE & Agentic AI Roles",
  email: "pramodkrishnaa29@gmail.com",
  phone: "+91-9849475775",
  github: "https://github.com/ApexKrish",
  githubAlt: "https://github.com/pramodkrishnaa",
  linkedin: "https://linkedin.com/in/ffskrishna",
  credentials: [
    "Claude Certified Architect – Foundations",
    "LangChain Certified Agent Engineer",
    "HCL UnO Orchestration",
    "UiPath RPA Developer Associate"
  ],
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "GITAM University (2025)",
    cgpa: "7.1",
    honors: [
      "All India Inter-University Boxer (Heavyweight Finalist)",
      "Head of Operations, GITAM Sports Committee",
      "NVIDIA AI Summit Delegate (2024)",
      "Ethics of AI Student Researcher (University of Helsinki)"
    ]
  }
};

/* ==========================================================================
   TECHNICAL DISCIPLINES (BUENA DEV AESTHETIC)
   ========================================================================== */
export const TECHNICAL_DISCIPLINES: TechDiscipline[] = [
  {
    id: "agentic-ai",
    title: "Agentic AI & Multi-Agent Systems",
    categoryNumber: "01",
    tagline: "Stateful agent loops, autonomous tool use, and multi-agent supervisor graphs.",
    description: "Architecting autonomous systems that don't just prompt-and-pray. Designing cyclic state machines with Claude Agent SDK and LangGraph with context caching, guardrails, and deterministic fallbacks.",
    tools: [
      { name: "Claude Agent SDK", icon: "⚡", category: "Framework" },
      { name: "LangGraph", icon: "🕸️", category: "Orchestration" },
      { name: "LangChain", icon: "🦜", category: "Core" },
      { name: "Model Context Protocol (MCP)", icon: "🔌", category: "Protocol" },
      { name: "ReAct Pattern", icon: "🔄", category: "Reasoning" },
      { name: "Context Caching", icon: "💾", category: "Optimization" },
      { name: "Security Guardrails", icon: "🛡️", category: "Safety" }
    ],
    proofOfWork: {
      label: "Autonomous Enterprise AI Workforce @ QuadGen",
      description: "Deployed conversational and task-oriented multi-agent workforce autonomously resolving enterprise HRMS workflows with live tool access and context caching.",
      metric: "40% Token Cost Reduction • 99.8% Reliability",
      videoOrImageSlot: {
        type: "video",
        targetFileName: "agentic-ai-loop.mp4",
        caption: "Multi-Agent State Graph Execution & Tool Use Video Loop",
        dimensions: "1920 × 1080 (16:9)"
      }
    },
    link: { label: "Explore Agent Architecture", url: "https://github.com/ApexKrish" }
  },
  {
    id: "llm-tuning",
    title: "LLM Fine-Tuning & Quantization",
    categoryNumber: "02",
    tagline: "Domain-specific model training, PPO alignment, and local quantized inference.",
    description: "Bridging frontier models with specialized on-premise execution. Fine-tuning models on domain technical corpora, reinforcement learning with PPO, and hosting 4-bit / 8-bit quantized models in air-gapped clusters.",
    tools: [
      { name: "PPO (RL)", icon: "🎯", category: "Alignment" },
      { name: "PyTorch", icon: "🔥", category: "Training" },
      { name: "vLLM", icon: "⚡", category: "Serving" },
      { name: "Ollama", icon: "🦙", category: "Local" },
      { name: "GGUF / AWQ", icon: "📦", category: "Quantization" },
      { name: "Hugging Face", icon: "🤗", category: "Models" }
    ],
    proofOfWork: {
      label: "Reinforcement Learning Flight Policy via PPO",
      description: "Trained continuous control flight policies in PyBullet physics simulator using Proximal Policy Optimization (PPO), mapping model predictions directly to hardware over serial MAVLink protocols.",
      metric: "92% Real-World Waypoint Hit Rate",
      videoOrImageSlot: {
        type: "video",
        targetFileName: "ppo-flight-training.mp4",
        caption: "PyBullet PPO Reinforcement Learning Simulation & Telemetry Loop",
        dimensions: "1920 × 1080 (16:9)"
      }
    },
    link: { label: "View PPO Project on GitHub", url: "https://github.com/pramodkrishnaa/Drone-Navigation-Project" }
  },
  {
    id: "fullstack-systems",
    title: "Full-Stack Development & Distributed APIs",
    categoryNumber: "03",
    tagline: "High-throughput asynchronous backends, real-time protocols, and reactive UIs.",
    description: "Building production systems from end to end: async Python microservices with FastAPI, PostgreSQL relational models with strict row-level security, WebSockets, and modern TypeScript frontends.",
    tools: [
      { name: "Python", icon: "🐍", category: "Backend" },
      { name: "FastAPI", icon: "🚀", category: "API" },
      { name: "PostgreSQL", icon: "🐘", category: "Database" },
      { name: "TypeScript", icon: "🔷", category: "Frontend" },
      { name: "Next.js", icon: "▲", category: "Framework" },
      { name: "RESTful APIs", icon: "🔗", category: "Protocols" },
      { name: "WebSockets", icon: "📡", category: "Realtime" }
    ],
    proofOfWork: {
      label: "Air-Gapped Bid Management Platform (BFSI)",
      description: "Scoped requirements with the CFO office, then architected and shipped on-premise bid management system with role-based access control, eliminating financial data leakage.",
      metric: "-60% Proposal Review Latency",
      videoOrImageSlot: {
        type: "video",
        targetFileName: "bid-platform-walkthrough.mp4",
        caption: "FastAPI & PostgreSQL Air-Gapped Bid Management UI Demo",
        dimensions: "1920 × 1080 (16:9)"
      }
    }
  },
  {
    id: "rag-vectors",
    title: "Hybrid Semantic RAG & Vector Retrieval",
    categoryNumber: "04",
    tagline: "Dense + sparse search evaluated scientifically against precision@k metrics.",
    description: "Moving far past naive chunking. Engineering production vector search architectures combining BM25 exact lexical matching with dense embedding vectors on Qdrant, filtered by granular metadata and re-ranked dynamically.",
    tools: [
      { name: "Qdrant", icon: "🎯", category: "Vector DB" },
      { name: "Hybrid Search (BM25 + Dense)", icon: "🔍", category: "Search" },
      { name: "Cross-Encoder Re-rankers", icon: "📊", category: "Ranking" },
      { name: "LangSmith Tracing", icon: "🔬", category: "Telemetry" },
      { name: "Precision@k Evals", icon: "📐", category: "Metrics" }
    ],
    proofOfWork: {
      label: "Enterprise Documentation RAG Pipeline",
      description: "Architected hybrid search retrieval over thousands of dense technical enterprise documents with custom eval sets measuring retrieval fidelity.",
      metric: "94.2% Precision@5 on Eval Set",
      videoOrImageSlot: {
        type: "image",
        targetFileName: "rag-precision-curve.png",
        caption: "Qdrant Hybrid Search Retrieval Precision Curve & Latency Profile",
        dimensions: "1600 × 1000 (16:10)"
      }
    }
  },
  {
    id: "automations-rpa",
    title: "Automations, RPA & Enterprise OCR",
    categoryNumber: "05",
    tagline: "Resilient state machines processing unstructured documents into verified ERP records.",
    description: "Certified UiPath RPA Developer Associate. Architecting fault-tolerant Robotic Enterprise Framework (REFramework) bots and intelligent OCR pipelines that interface with SAP ERP systems and legacy software without breaking.",
    tools: [
      { name: "UiPath (REFramework)", icon: "🤖", category: "RPA" },
      { name: "OCR Engines (Tesseract)", icon: "📄", category: "Vision" },
      { name: "SAP ERP Automation", icon: "💼", category: "Enterprise" },
      { name: "Regex & Data Normalization", icon: "⚙️", category: "Data" },
      { name: "Queue Orchestration", icon: "🗂️", category: "Reliability" }
    ],
    proofOfWork: {
      label: "Invoice Processing & SAP Entry Pipeline",
      description: "End-to-end data pipeline using UiPath and OCR to extract financial vendor invoice details from multi-layout PDFs and automate SAP ERP journal entries.",
      metric: "80% Reduction in Manual Workload",
      videoOrImageSlot: {
        type: "image",
        targetFileName: "uipath-invoice-flow.png",
        caption: "UiPath REFramework State Machine Flowchart & SAP Integration",
        dimensions: "1600 × 1000 (16:10)"
      }
    },
    link: { label: "View Invoice Automation Repo", url: "https://github.com/pramodkrishnaa/Invoice-Processing-Automation" }
  },
  {
    id: "fde-airgapped",
    title: "Forward Deployed Engineering (FDE) & Sovereign Cloud",
    categoryNumber: "06",
    tagline: "Deploying production LLMs into zero-trust, completely air-gapped on-premise environments.",
    description: "Forward Deployed Engineers don't just write code — we scope ambiguous enterprise requirements directly with C-suite stakeholders, architect secure sovereign clusters, write clean Python, and run what we ship on Kubernetes with 24/7 telemetry.",
    tools: [
      { name: "Kubernetes (K8s)", icon: "☸️", category: "Infra" },
      { name: "Docker", icon: "🐳", category: "Containers" },
      { name: "Yotta Sovereign Cloud", icon: "☁️", category: "Cloud" },
      { name: "Prometheus", icon: "🔥", category: "Monitoring" },
      { name: "Grafana", icon: "📈", category: "Dashboards" },
      { name: "Loki", icon: "📜", category: "Logs" },
      { name: "CMMI Level 3 Practice", icon: "🎖️", category: "Standards" }
    ],
    proofOfWork: {
      label: "BFSI Sovereign Cloud Consortium Architecture",
      description: "Acted as Single Point of Contact (SPOC) collaborating with HCL and Yotta to architect the Sovereign Cloud Agentic AI Development Environment, establishing a strategic BFSI industry consortium.",
      metric: "Zero Data Leakage • 100% Air-Gapped",
      videoOrImageSlot: {
        type: "image",
        targetFileName: "sovereign-consortium-topology.png",
        caption: "Sovereign Cloud & Air-Gapped K8s Architecture Diagram",
        dimensions: "1920 × 1080 (16:9)"
      }
    }
  },
  {
    id: "business-dev",
    title: "Business Development, Sales & GTM Strategy",
    categoryNumber: "07",
    tagline: "Translating ambiguous client needs into commercial contracts and scaled acquisition funnels.",
    description: "Co-founded commercial operations at GenSync Media. Led high-stakes technical sales discovery, mapping messy enterprise requirements into concrete technical roadmaps and UI/UX systems. Cut client turnaround from 48 hours to under 3 hours.",
    tools: [
      { name: "C-Suite Technical Discovery", icon: "👔", category: "Sales" },
      { name: "GTM Architecture", icon: "🧭", category: "Strategy" },
      { name: "Funnel Automation", icon: "⚡", category: "Growth" },
      { name: "Stakeholder Management", icon: "🤝", category: "Leadership" },
      { name: "UI/UX Design Systems", icon: "🎨", category: "Design" }
    ],
    proofOfWork: {
      label: "GenSync Media Commercial Scaling",
      description: "Automated the entire client-acquisition funnel and digital advisory workflows across enterprise brand clients.",
      metric: "Lead Turnaround Cut from 48h to <3h",
      videoOrImageSlot: {
        type: "image",
        targetFileName: "gensync-growth-funnel.png",
        caption: "Automated Enterprise Acquisition Funnel & Discovery Systems",
        dimensions: "1600 × 1000 (16:10)"
      }
    }
  },
  {
    id: "open-source",
    title: "Open Source Contributions & GitHub Hub",
    categoryNumber: "08",
    tagline: "Shipping publicly on the same tools used daily — Claude Code plugins and open agent forks.",
    description: "Active open-source builder. Authored claude-prospector (an installable Claude Code plugin with 3 agent skills), forked and self-hosted Nous Research Hermes Agent with MCP integration, and published continuous robotics navigation repositories.",
    tools: [
      { name: "claude-prospector", icon: "⭐", category: "Plugin" },
      { name: "Hermes Agent", icon: "🧠", category: "Agent Loop" },
      { name: "Drone RL Navigation", icon: "🚁", category: "Robotics" },
      { name: "GitHub CLI & Actions", icon: "🐙", category: "CI/CD" }
    ],
    proofOfWork: {
      label: "claude-prospector: Claude Code Plugin",
      description: "Designed a Claude Code plugin with three agent skills (lead-scout, proposal, copy) sharing a user config file, featuring deterministic ranking and zero hallucination by design.",
      metric: "MIT Licensed • 2-Command Install",
      videoOrImageSlot: {
        type: "video",
        targetFileName: "claude-prospector-demo.mp4",
        caption: "Claude Code CLI Plugin In Action: Sourcing, Ranking & Copy Generation",
        dimensions: "1920 × 1080 (16:9)"
      }
    },
    link: { label: "Visit GitHub (@ApexKrish / @pramodkrishnaa)", url: "https://github.com/ApexKrish" }
  }
];

/* ==========================================================================
   PERSONAL EXHIBITIONS (JASON BERGH MAXIMALIST AESTHETIC)
   ========================================================================== */
export const PERSONAL_EXHIBITIONS: PersonalExhibition[] = [
  {
    id: "boxing-ring",
    title: "THE SWEET SCIENCE // 12 ROUNDS",
    subTitle: "Heavyweight Finalist — All India Inter-University Championship",
    category: "SPORT",
    quote: "In the ring, you cannot simulate resilience. You take the hit, adjust your stance, and deliver with precision. It is the exact same calm needed when debugging an air-gapped cluster at 3 AM.",
    story: [
      "Heavyweight boxing is not about violence; it is about absolute mental clarity under violent conditions.",
      "Managing your stamina over grueling championship rounds taught me how to keep my heart rate low when the pressure spikes. When you step into the ring, external noise disappears.",
      "As Head of Operations for the GITAM Sports Committee, I led collegiate tournament logistics, athlete training camps, and cross-university sporting operations, embedding relentless discipline into everything I build."
    ],
    metricsOrBadges: [
      "All India Inter-University Heavyweight Finalist",
      "Head of Operations — GITAM Sports Committee",
      "Daily Sparring & 12-Round High-Intensity Conditioning"
    ],
    mediaSlot: {
      type: "video",
      targetFileName: "boxing-ring-reel.mp4",
      aspectRatio: "4:5",
      dimensions: "1080 × 1350 (Cinematic Vertical / Square)",
      placeholderNote: "Heavyweight boxing sparring, hand wrap routine, ring entrance or championship action reel."
    }
  },
  {
    id: "art-typography",
    title: "CANVAS, BRAND SYSTEMS & TYPOGRAPHY",
    subTitle: "GenSync Media Founding Member & Visual Director",
    category: "ART",
    quote: "Engineering without aesthetic intentionality is just machine instructions. Great design is felt before it is understood.",
    story: [
      "Obsessed with Swiss typographic grids, high-contrast monochrome design, and visceral editorial art direction.",
      "At GenSync Media, I crafted digital branding systems that made software feel premium and irresistible. We merged commercial strategy with editorial aesthetics.",
      "From editorial cover layouts to motion design in web interfaces, every line-height, letter-spacing, and micro-interaction is tuned for maximum emotional impact."
    ],
    metricsOrBadges: [
      "GenSync Media Founding Member",
      "Enterprise Branding & UI/UX Systems",
      "Swiss Grid & Monument Grotesk Typography Obsession"
    ],
    mediaSlot: {
      type: "video",
      targetFileName: "art-branding-reel.mp4",
      aspectRatio: "16:9",
      dimensions: "1920 × 1080 (Widescreen)",
      placeholderNote: "Video reel of branding guidelines, graphic design spreads, typography posters, and UI animations."
    }
  },
  {
    id: "motorcycles-speed",
    title: "HIGH-OCTANE MACHINES & MOTORCYCLES",
    subTitle: "Two Wheels, Open Tarmac & Mechanical Focus",
    category: "MOTORCYCLES",
    quote: "On a motorcycle, there is no multitasking. You are totally present with the machine, the asphalt, and the physics of the curve.",
    story: [
      "My passion for hardware and machines doesn't stop at drones and microprocessors. I live for motorcycles — the sound of combustion, throttle response, and the engineering behind apex cornering.",
      "Riding long distances through sweeping mountain roads provides a sensory reset that sharpens my focus. You respect the machine, understand its torque limits, and flow with the road."
    ],
    metricsOrBadges: [
      "High-Displacement Motorcycles",
      "Track Day & Highway Endurance Enthusiast",
      "Mechanical Tuning & Throttle Discipline"
    ],
    mediaSlot: {
      type: "video",
      targetFileName: "motorcycles-highway-reel.mp4",
      aspectRatio: "16:9",
      dimensions: "1920 × 1080 (Widescreen)",
      placeholderNote: "Cinematic footage of motorcycle riding, exhaust note, highway curves, or garage mechanics."
    }
  },
  {
    id: "summits-conferences",
    title: "SUMMITS, STAGES & AI ETHICS",
    subTitle: "NVIDIA AI Summit, IMC & University of Helsinki",
    category: "SUMMITS",
    quote: "You have to walk the halls with the people building the frontier compute to understand where the world is heading.",
    story: [
      "Invited delegate at the NVIDIA AI Summit (2024), engaging with researchers pushing sovereign compute and Blackwell GPU clusters.",
      "Represented QuadGen's agentic AI architectures live on stage at the India Mobile Congress (IMC), demonstrating real multi-agent workflows to enterprise leaders.",
      "Selected as an Ethics of AI Student Researcher with the University of Helsinki, exploring autonomous decision boundaries, moral agency in LLMs, and ethical safeguards."
    ],
    metricsOrBadges: [
      "NVIDIA AI Summit Delegate (2024)",
      "India Mobile Congress (IMC) Live Architectures",
      "Ethics of AI Researcher (University of Helsinki)"
    ],
    mediaSlot: {
      type: "image",
      targetFileName: "summits-delegation-photo.jpg",
      aspectRatio: "4:3",
      dimensions: "1600 × 1200",
      placeholderNote: "Photos at the NVIDIA AI Summit, India Mobile Congress stage demo, or Helsinki certificate."
    }
  },
  {
    id: "adobe-creative-suite",
    title: "ADOBE CREATIVE SUITE & POST-PRODUCTION",
    subTitle: "Premiere Pro, After Effects, Photoshop & Color Grading",
    category: "ADOBE",
    quote: "Cutting a timeline is just like refactoring code: remove every frame that doesn't advance the narrative.",
    story: [
      "Over 5+ years of hands-on experience in video editing, motion design, and digital color grading.",
      "Proficient in Adobe Premiere Pro, After Effects, Photoshop, Lightroom, and Figma. I compose audio beats to video cuts, composite visual effects, and balance luminance curves to craft cinematic visuals."
    ],
    metricsOrBadges: [
      "Adobe Premiere Pro & After Effects",
      "Color Grading (DaVinci & Lumetri)",
      "Motion Graphics & Keyframe Animation"
    ],
    mediaSlot: {
      type: "video",
      targetFileName: "editing-suite-timelapse.mp4",
      aspectRatio: "16:9",
      dimensions: "1920 × 1080",
      placeholderNote: "Screen recording / timelapse of Adobe Premiere timeline editing, keyframing, and color grading."
    }
  },
  {
    id: "travel-expeditions",
    title: "EXPEDITIONS, ROADS & PERSPECTIVE",
    subTitle: "Wandering with a Camera & Curious Mind",
    category: "TRAVEL",
    quote: "Travel strips away your assumptions. It reminds you how big the world is and how much remains to be built.",
    story: [
      "Documenting journeys across diverse landscapes, cultures, and backroads. Photography has always been my medium to slow time down and capture human energy.",
      "Whether navigating rugged high-altitude terrains or bustling night markets, travel fuels my appetite for solving real-world problems for real people."
    ],
    metricsOrBadges: [
      "Documentary & Street Photography",
      "High-Altitude Expeditions",
      "Cross-Country Rides"
    ],
    mediaSlot: {
      type: "image",
      targetFileName: "travel-expedition-photo.jpg",
      aspectRatio: "16:9",
      dimensions: "1920 × 1080",
      placeholderNote: "High-contrast travel photography, mountain pass expedition, or street portrait."
    }
  }
];

/* ==========================================================================
   BLOG / ARCHITECTURE ESSAYS
   ========================================================================== */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "air-gapped-llm-architecture-bfsi",
    title: "Architecting Air-Gapped LLM Deployments for Sovereign Banking",
    subtitle: "How to ship production agents inside zero-trust perimeter firewalls without leaking a single byte.",
    date: "March 2026",
    readTime: "7 min read",
    category: "Architecture",
    tags: ["Air-Gapped", "Kubernetes", "BFSI", "Security", "FastAPI"],
    excerpt: "Most AI tutorials assume you can ping the OpenAI API anytime. In sovereign BFSI environments, there is zero internet access. Here is how we scoped, containerized, and deployed an on-premise system with strict RBAC.",
    content: [
      "When building for BFSI (Banking, Financial Services, and Insurance) and sovereign clouds, the word 'cloud' takes on a completely different meaning.",
      "Every single component—from model weights to tokenizers to PostgreSQL databases—must live inside air-gapped Kubernetes clusters with zero egress to the public internet.",
      "1. Sealed Container Registries: All Docker images are scanned against CVE vulnerabilities and mirrored to on-premise Harbor registries.",
      "2. Strict RBAC at the API & Database Layer: We utilized FastAPI with JWT claims mapped to Active Directory groups, enforcing row-level security in PostgreSQL so proposal reviewers could only access their assigned bidding documents.",
      "3. Local Model Quantization: By deploying quantized weights using vLLM on dedicated sovereign compute (Yotta), we cut proposal review latency by 60% while guaranteeing zero data leakage."
    ]
  },
  {
    id: "post-2",
    slug: "sim-to-real-ppo-drone-flight",
    title: "From PyBullet to MAVLink: Overcoming Sim-to-Real in Drone Flight",
    subtitle: "Training flight-control policies with PPO and bridging the reality gap over serial telemetry.",
    date: "February 2026",
    readTime: "9 min read",
    category: "Robotics & RL",
    tags: ["PPO", "PyBullet", "MAVLink", "Reinforcement Learning", "Hardware"],
    excerpt: "A policy that hits 100% of waypoints in simulation often crashes in 2 seconds in real flight. Here is how domain randomization and serial telemetry bridges closed the sim-to-real gap to reach 92% waypoint acquisition.",
    content: [
      "The 'reality gap' is the graveyard of reinforcement learning policies.",
      "In PyBullet, physics calculations are deterministic and instantaneous. In the real world, motor esc response is non-linear, sensors have latency, and gusts of wind disrupt flight dynamics.",
      "We tackled this by injecting aggressive domain randomization during training: randomizing mass, propeller thrust efficiency, and sensor noise every episode.",
      "The neural network was then deployed as a lightweight Python daemon communicating with the flight controller over MAVLink serial packets at 50Hz, successfully achieving a 92% real-world waypoint hit rate."
    ]
  },
  {
    id: "post-3",
    slug: "why-precision-at-5-matters-in-rag",
    title: "Why Precision@5 Matters: Benchmarking Hybrid Vector Search",
    subtitle: "Why naive cosine similarity fails on dense technical documentation and how Qdrant hybrid search fixes it.",
    date: "January 2026",
    readTime: "6 min read",
    category: "LLM Systems",
    tags: ["RAG", "Qdrant", "Hybrid Search", "LangSmith", "Evaluation"],
    excerpt: "Measuring RAG quality by 'vibe checks' is dangerous. How we built evaluation sets measuring precision@k and achieved 94.2% precision@5 on enterprise documentation.",
    content: [
      "If you build RAG by chunking documents into 500 characters and querying cosine similarity, you will hallucinate when users ask about exact model numbers or error codes.",
      "Dense embeddings understand semantics, but fail on exact technical identifiers (e.g., 'RFC-4122 v4 UUID').",
      "By combining BM25 sparse keyword indices with dense vector embeddings on Qdrant, and running a cross-encoder re-ranker on top 20 candidates, we pushed our evaluation precision@5 to 94.2%."
    ]
  },
  {
    id: "post-4",
    slug: "12-rounds-in-the-ring-and-production-code",
    title: "12 Rounds in the Ring: What Heavyweight Boxing Taught Me About Production Resiliency",
    subtitle: "The cognitive crossover between taking hits in the ring and root-cause debugging under high pressure.",
    date: "December 2025",
    readTime: "5 min read",
    category: "Philosophy",
    tags: ["Boxing", "Mindset", "Leadership", "Resilience", "Discipline"],
    excerpt: "Panic is the first thing that gets you knocked out in boxing. It is also the exact thing that causes engineers to make fatal mistakes during live production outages.",
    content: [
      "When a 200lb fighter is throwing combinations at your chin, your nervous system wants to panic.",
      "If you panic, your vision narrows, your breathing becomes shallow, and you get caught. You learn to breathe, keep your chin tucked, and look directly at your opponent's chest to anticipate movement.",
      "When a production service crashes during a high-stakes executive demonstration, the exact same principle applies. Breathe, isolate the variables, check the logs, and execute with precision."
    ]
  }
];
