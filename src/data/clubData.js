/**
 * AI CLUB DATA REPOSITORY
 * Centralized content source for all 7 Data Centre Facility Zones.
 * Clean, human-readable titles without developer code comment clutter.
 */

export const CLUB_META = {
  name: "AI CLUB",
  institution: "College of Engineering & Technology",
  tagline: "Where Curiosity Meets Intelligence.",
  facilityCode: "Autonomous Facility",
  status: "Online",
  contactEmail: "aiclub@college.edu",
  locationCoordinates: "Innovation & Computing Campus",
  socials: {
    github: "https://github.com/aiclub",
    discord: "https://discord.gg/aiclub",
    linkedin: "https://linkedin.com/company/aiclub",
    twitter: "https://x.com/aiclub",
  },
};

// ZONE 01: Entrance / Hero Telemetry
export const ZONE_HERO = {
  facilityId: "Facility Entrance",
  title: "AI CLUB",
  motto: "Where Curiosity Meets Intelligence.",
  description:
    "An autonomous community of student researchers, engineers, and builders pushing the frontier of artificial intelligence, machine learning, and computational systems.",
  statusIndicator: "Operational",
  metricsSummary: [
    { label: "Community", value: "450+ Members" },
    { label: "Research", value: "Active Cohorts" },
    { label: "Compute", value: "GPU Cluster" },
  ],
};

// ZONE 02: Foundation / About Us
export const ZONE_ABOUT = {
  facilityId: "Core Infrastructure",
  heading: "THE FOUNDATION",
  subheading: "Architecting the Future of Machine Intelligence",
  mission:
    "To democratize advanced artificial intelligence through rigorous research, open engineering, and hands-on systems development across undergraduate and graduate cohorts.",
  vision:
    "A self-sustaining crucible where curiosity transforms into foundational models, novel architectures, and real-world societal impact.",
  pillars: [
    {
      code: "01",
      title: "Fundamental Theory",
      desc: "Deep mathematical grounding in linear algebra, optimization, probability theory, and deep learning mechanics.",
    },
    {
      code: "02",
      title: "Systems Engineering",
      desc: "Deploying high-throughput inference engines, distributed training pipelines, and optimized edge compute nodes.",
    },
    {
      code: "03",
      title: "Open Innovation",
      desc: "Publishing reproducible benchmarks, open-source toolkits, and accessible learning resources for all students.",
    },
  ],
  stats: [
    { value: "450+", label: "Active Members", unit: "Engineers & Researchers" },
    { value: "32", label: "Shipped Projects", unit: "Open Source & Deployed" },
    { value: "14", label: "Research Papers", unit: "Preprints & Submissions" },
    { value: "4.2K", label: "Compute Hours", unit: "Cluster Utilization" },
  ],
};

// ZONE 03: Research Lab
export const ZONE_RESEARCH = {
  facilityId: "Applied Labs",
  heading: "RESEARCH LAB",
  subheading: "Investigating Novel Cognitive & Algorithmic Paradigms",
  domains: [
    {
      id: "gen-ai",
      name: "Generative AI & LLMs",
      badge: "Active Focus",
      abstract:
        "Investigating sparse attention mechanisms, context extension, parameter-efficient fine-tuning (LoRA/QLoRA), and alignment methodologies.",
      publications: [
        "Efficient Context Caching for Edge LLMs",
        "Sparse Mixture of Experts in Low-Resource Domains",
      ],
      keywords: ["Transformers", "KV Cache", "Quantization", "MoE"],
    },
    {
      id: "comp-vision",
      name: "Computer Vision & Multimodal",
      badge: "Experimental",
      abstract:
        "3D Gaussian splatting, zero-shot visual representation, autonomous perception, and cross-attention vision-language models.",
      publications: [
        "Real-Time Spatial Scene Reconstruction",
        "Multimodal Perception for Low-Visibility Drones",
      ],
      keywords: ["NeRF", "3D Gaussian Splatting", "Diffusion", "CLIP"],
    },
    {
      id: "nlp",
      name: "Natural Language Processing",
      badge: "Core Track",
      abstract:
        "Cross-lingual representation learning, low-resource vernacular reasoning, and synthetic training data curation.",
      publications: [
        "Dialectal Transfer in Indic Language Models",
        "Robustness Benchmarks for Code-Switched Syntax",
      ],
      keywords: ["Tokenization", "Morphology", "Instruction Tuning"],
    },
    {
      id: "emerging",
      name: "Emerging AI & Robotics",
      badge: "Incubating",
      abstract:
        "Embodied intelligence, reinforcement learning from physical simulations, and neuromorphic edge acceleration.",
      publications: [
        "Sim-to-Real Policy Transfer in Quadruped Locomotion",
        "Spiking Neural Implementations on Micro-controllers",
      ],
      keywords: ["RLHF", "Sim2Real", "Neuromorphic", "TinyML"],
    },
  ],
};

// ZONE 04: Operations Centre / Events
export const ZONE_OPERATIONS = {
  facilityId: "Operations",
  heading: "OPERATIONS CENTRE",
  subheading: "Live Hackathons, Technical Workshops & Group Discussions",
  events: [
    {
      id: "ev-01",
      title: "HACK_AI: 36-Hour National Hackathon",
      type: "Competition",
      date: "Nov 14 - 16, 2026",
      status: "Registration Open",
      venue: "Main Auditorium & Computing Cluster",
      description:
        "Annual flagship hackathon bringing together 300+ students to build autonomous agents, multi-agent frameworks, and assistive technologies.",
      seats: "240 / 300 Filled",
      badgeColor: "sage",
    },
    {
      id: "ev-02",
      title: "CUDA & TensorRT Acceleration Workshop",
      type: "Workshop",
      date: "Nov 22, 2026",
      status: "Seats Remaining",
      venue: "Advanced Compute Lab 04",
      description:
        "Hands-on kernel optimization, memory coalescing, and deploying low-latency model inference on workstation GPUs.",
      seats: "45 / 60 Filled",
      badgeColor: "ivory",
    },
    {
      id: "ev-03",
      title: "Paper Reading: Reasoning in Large Models",
      type: "Discussion",
      date: "Weekly Thursdays",
      status: "Ongoing",
      venue: "Seminar Room 102",
      description:
        "Deconstructing recent preprints on chain-of-thought verification, search algorithms, and latent reasoning spaces.",
      seats: "Open to All",
      badgeColor: "slate",
    },
    {
      id: "ev-04",
      title: "Agentic AI & Tool-Use Symposium",
      type: "Symposium",
      date: "Dec 05, 2026",
      status: "Upcoming",
      venue: "Innovation Centre Theatre",
      description:
        "Keynote talks by industry research scientists on recursive self-refinement, MCP protocols, and sandbox execution safety.",
      seats: "Announcing Soon",
      badgeColor: "sage",
    },
  ],
};

// ZONE 05: Project Archive / Projects Showcase
export const ZONE_PROJECTS = {
  facilityId: "Project Archive",
  heading: "PROJECT ARCHIVE",
  subheading: "Production Systems, Experimental Proofs & Open-Source Tools",
  projects: [
    {
      id: "proj-01",
      title: "AuraKV: Sub-Millisecond KV Cache Server",
      category: "Systems & Infrastructure",
      description:
        "High-performance distributed key-value cache layer written in Rust and C++ to minimize time-to-first-token in serving LLMs.",
      techStack: ["Rust", "CUDA", "vLLM", "gRPC"],
      metrics: "3.2x Throughput Gain",
      github: "https://github.com/aiclub/aurakv",
      liveDemo: null,
      state: "Stable",
    },
    {
      id: "proj-02",
      title: "OmniSplat: Interactive Neural Radiance Explorer",
      category: "Computer Vision",
      description:
        "Browser-based 3D Gaussian Splatting visualizer that runs real-time 60fps photorealistic scenes on standard consumer hardware via WebGPU.",
      techStack: ["WebGPU", "Three.js", "PyTorch", "WGSL"],
      metrics: "60 FPS Web Render",
      github: "https://github.com/aiclub/omnisplat",
      liveDemo: "https://omnisplat.demo",
      state: "Active",
    },
    {
      id: "proj-03",
      title: "NeuroDoc: Multi-Agent Clinical Record Synthesis",
      category: "Generative AI",
      description:
        "HIPAA-compliant multi-agent workflow that cross-verifies drug-drug interactions and flags diagnostic oversights against medical ontologies.",
      techStack: ["Python", "FastAPI", "LangGraph", "ChromaDB"],
      metrics: "94.8% F1 Score",
      github: "https://github.com/aiclub/neurodoc",
      liveDemo: null,
      state: "Prototype",
    },
    {
      id: "proj-04",
      title: "EdgeSense: Micro-Watt TinyML Sound Classifier",
      category: "Embedded AI",
      description:
        "8-bit quantized convolutional network running on ARM Cortex-M4 microcontrollers for industrial acoustic anomaly detection.",
      techStack: ["C++", "TensorFlow Lite Micro", "ARM CMSIS"],
      metrics: "< 14 mW Power Draw",
      github: "https://github.com/aiclub/edgesense",
      liveDemo: null,
      state: "Deployed",
    },
  ],
};

// ZONE 06: Community Hub / Core Team
export const ZONE_TEAM = {
  facilityId: "Community",
  heading: "COMMUNITY HUB",
  subheading: "Leadership, Domain Leads & Faculty Mentorship",
  notice: "Real student members and coordinators drive all club initiatives.",
  members: [
    {
      name: "Aarav Sharma",
      role: "Club Lead & Systems Researcher",
      domain: "Distributed ML & Infrastructure",
      initials: "AS",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Rhea Sen",
      role: "Head of Research",
      domain: "Generative AI & Attention Mechanisms",
      initials: "RS",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Karan Patel",
      role: "Lead, Computer Vision",
      domain: "3D Perception & Robotics",
      initials: "KP",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Ananya Iyer",
      role: "Lead, Operations & Hackathons",
      domain: "Community & Competitive Events",
      initials: "AI",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Dr. Vikram Seth",
      role: "Faculty Advisor",
      domain: "Department of Computer Science & AI",
      initials: "VS",
      github: null,
      linkedin: "https://linkedin.com",
    },
    {
      name: "Devika Nair",
      role: "Lead, NLP & Semantics",
      domain: "Multilingual Language Models",
      initials: "DN",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  ],
};

// ZONE 07: The Exit / Join Experience
export const ZONE_EXIT = {
  facilityId: "Join Us",
  heading: "THE EXIT",
  motto: "The Future Is Built Together.",
  description:
    "Whether you are interested in researching novel architectures, optimizing GPU runtimes, or organizing major hackathons, there is a place for you in our community.",
  formFields: [
    { label: "Full Name", placeholder: "e.g., Alex Mercer", type: "text" },
    { label: "Institution Email", placeholder: "student@college.edu", type: "email" },
    {
      label: "Primary Domain",
      type: "select",
      options: [
        "Generative AI & LLMs",
        "Computer Vision & 3D",
        "Systems & Compute Optimization",
        "NLP & Computational Linguistics",
        "Operations & Hackathon Management",
      ],
    },
    { label: "GitHub / Portfolio", placeholder: "https://github.com/username", type: "url" },
  ],
  footerNote: "AI Club • Department of Computer Science & Engineering",
  copyright: "© 2026 AI Club. All rights reserved.",
};

// Zone Navigation Index for HUD & Camera Telemetry
export const FACILITY_ZONES = [
  { id: "hero", label: "Entrance", z: 10, indexStr: "01" },
  { id: "about", label: "Foundation", z: -15, indexStr: "02" },
  { id: "research", label: "Research", z: -45, indexStr: "03" },
  { id: "operations", label: "Events", z: -75, indexStr: "04" },
  { id: "projects", label: "Projects", z: -105, indexStr: "05" },
  { id: "team", label: "Team", z: -135, indexStr: "06" },
  { id: "exit", label: "Join", z: -165, indexStr: "07" },
];
