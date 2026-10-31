export const gdCategories = [
  "All",
  "Open Weights & Security",
  "Model Architecture & Scaling",
  "Agent Autonomy & Alignment",
  "Hardware & Compilers",
  "AI Governance & Policy",
];

export const gdRoomData = {
  title: "The GD Archive // The Dialectic Room",
  subtitle: "Where rigorous engineering meets critical philosophical scrutiny. Bi-weekly technical and ethical inquiry sessions deconstructing frontier AI tensions without superficial hype.",
  cadence: "Alternate Thursdays @ 05:30 PM IST",
  venue: "CS Seminar Hall 2 & Phoenix Discord Voice Amphitheater",
  formatExplanation: "Sessions follow a structured dialectic format: a 10-minute literature primer, alternating thesis and antithesis perspectives grounded in empirical benchmarks and arXiv preprints, followed by open cross-examination and synthesized outcomes.",
  rules: [
    "Ground every argument in verifiable benchmarks, empirical literature, or formal proofs.",
    "Steel-man the opposing viewpoint before attempting to refute it.",
    "Dissect algorithmic trade-offs, compute constraints, and real-world failure modes rather than speculative hype.",
    "Acknowledge unresolved uncertainties and lack of consensus where empirical evidence is split.",
  ],
  
  // Featured upcoming / current discussion session
  upcomingSession: {
    id: "gd-topic-42",
    code: "GD-42",
    date: "Thursday, Nov 14, 2026",
    time: "05:30 PM - 07:00 PM IST",
    topic: "Open-Weights vs Proprietary Frontier Models: Democratization, Catastrophic Risk, and Economic Moats",
    category: "Open Weights & Security",
    moderators: ["Tanuj Verma (President)", "Dr. K. Raman (Faculty Advisor)"],
    status: "Debater Slots Open (8 / 12 Claimed)",
    abstract: "Are open-weight frontier models an indispensable defense against corporate monopoly and algorithmic censorship, or do freely accessible model weights inherently create irreversible dual-use biorisk and autonomous cyber vulnerabilities that cannot be patched post-release?",
    background: "With recent releases of 400B+ open-weight foundation models capable of agentic code execution, national security bodies and academic researchers disagree sharply on whether weights represent open science or proliferation risks.",
    thesisTitle: "Case for Unrestricted Open Weights (Democratization & Auditing)",
    proKeyPoints: [
      "Open weights prevent single-vendor capture of civilization-scale intelligence infrastructure.",
      "Global peer scrutiny uncovers alignment vulnerabilities, backdoor watermarks, and bias 10x faster than closed corporate red teams.",
      "Local compute sovereignty: Nations and researchers can run inference private to sovereign borders without external API kill-switches.",
    ],
    antithesisTitle: "Case for Controlled & Sandboxed Deployment (Containment)",
    conKeyPoints: [
      "Irreversible proliferation: once model weights publish to public mirrors, safety alignments (RLHF/DPO) can be stripped for less than $50 of fine-tuning compute.",
      "Dual-use cyber capability: autonomous agentic exploitation tools become weaponizable without server-side telemetry or rate limits.",
      "Safety governance asymmetry: responsible actors bear compliance costs while malicious actors clone unrestricted checkpoints.",
    ],
  },

  // Archive of completed discussions
  discussions: [
    {
      id: "gd-42",
      code: "GD-42",
      date: "Nov 14, 2026",
      category: "Open Weights & Security",
      topic: "Open-Weights vs Proprietary Frontier Models: Democratization, Catastrophic Risk, and Economic Moats",
      summary: "An in-depth debate on whether foundational weights should be freely published or gated behind monitored APIs.",
      background: "The debate centered on recent open-weight releases rivaling closed commercial models in math and code synthesis, raising debates on whether weight-level access democratizes research or enables unpatchable zero-day exploits.",
      proArguments: [
        "Democratization of frontier science: Academic labs without multi-million-dollar compute budgets cannot study internal representations without open weights.",
        "Auditing & Counter-Weights: Censorship, systemic bias, and hallucinations cannot be independently audited through black-box API endpoints.",
        "Anti-Monopoly: Closes economic rent-seeking barriers created by hyperscaler frontier labs.",
      ],
      conArguments: [
        "Un-censorability: Empirical research shows representation engineering and low-rank adaptation (LoRA) can neutralize safety alignment in under 100 GPU steps.",
        "Autonomous Agent Weaponization: Unrestricted local inference permits automated credential harvesting and spear-phishing loops without API monitoring.",
        "Irreversibility: You can patch a cloud API; you cannot recall 100,000 downloaded torrents of open weights.",
      ],
      evidence: [
        "LoRA Safety Erasure Benchmarks (Gao et al., 2024)",
        "Meta Llama 3 Technical Report & Community Impact Audits",
        "UK AI Safety Institute Empirical Evaluation on Cyber Capabilities",
      ],
      takeaways: [
        "Both sides acknowledged that RLHF alone is not a durable safety barrier against deliberate fine-tuning on consumer hardware.",
        "The divide lies fundamentally in whether catastrophic risk mitigations should occur at the hardware level (compute governance) or the distribution level.",
      ],
      outcome: "Nuanced Division: Consensus was reached that models under ~70B parameters should remain completely open for academic study, while next-generation multi-modal reasoning swarms above threshold compute warrant graduated access frameworks.",
      furtherReading: [
        { title: "On the Openness of Frontier Models (Stanford CRFM)", url: "https://crfm.stanford.edu" },
        { title: "The Foundation Model Transparency Index", url: "https://crfm.stanford.edu/fmti" },
      ],
      attendees: 64,
    },
    {
      id: "gd-41",
      code: "GD-41",
      date: "Oct 24, 2026",
      category: "Model Architecture & Scaling",
      topic: "Scaling Laws vs Algorithmic Breakthroughs: Has LLM Pre-training Hit Diminishing Returns?",
      summary: "Deconstructing whether continued parameter and web-token scaling remains the dominant path to AGI or if test-time reasoning compute is now the primary lever.",
      background: "With human text datasets on the public internet approaching exhaustion and synthetic data quality concerns mounting, research attention has pivoted toward inference-time computation, search trees, and process supervision.",
      proArguments: [
        "Chinchilla compute optimality and power-law scaling across tokens and compute have held predictably across four orders of magnitude.",
        "Multimodal and embodiment data (video, sensor streams, robotics) provide an untapped reservoir far larger than web text.",
      ],
      conArguments: [
        "Pre-training compute curves are hitting exponential capital and energy bottlenecks with sub-linear benchmark gains.",
        "Test-time reasoning compute (Monte Carlo Tree Search, process reward models) achieves equivalent benchmark gains for a fraction of the carbon and data cost.",
      ],
      evidence: [
        "Kaplan et al. & Chinchilla Scaling Laws Papers",
        "OpenAI o1 System Architecture & Test-time Compute Curves",
        "Epoch AI Datasets Projections and Exhaustion Timelines",
      ],
      takeaways: [
        "Pre-training continues to set the foundational world model, but the primary frontier of capability gains has shifted to reinforcement learning on reasoning trajectories.",
        "Synthetic data generation requires rigorous automated verifiers (compilers, formal math engines) to prevent mode collapse.",
      ],
      outcome: "Strong Consensus: The brute pre-training era is transitioning into an era of test-time compute scaling and formal domain verifiers.",
      furtherReading: [
        { title: "Scaling Laws for Neural Language Models", url: "https://arxiv.org/abs/2001.08361" },
        { title: "Epoch AI: Will We Run Out of Data?", url: "https://epochai.org" },
      ],
      attendees: 58,
    },
    {
      id: "gd-40",
      code: "GD-40",
      date: "Oct 10, 2026",
      category: "Agent Autonomy & Alignment",
      topic: "Agentic Autonomy & Liability: Who Is Liable When an LLM Swarm Causes Financial Loss?",
      summary: "Exploring legal personhood, operator responsibility, and cryptographic sandboxing in autonomous multi-agent tool execution.",
      background: "As multi-agent frameworks are granted API tokens, shell access, and financial wallet authorizations, catastrophic failure modes shift from hallucinations to real-world unauthorized transactions and data destruction.",
      proArguments: [
        "Deployers and operators must bear strict product liability analogous to autonomous vehicle fleets; responsibility cannot be offloaded to an algorithmic black box.",
        "Cryptographic proof-of-intent and deterministic sandboxing must be legally mandated before agents receive live financial credentials.",
      ],
      conArguments: [
        "Emergent swarms exhibit non-deterministic multi-agent equilibria where no single developer or prompt engineer could foresee compounding cascades.",
        "Excessive liability will chill open-source autonomous agent development and concentrate agentic power within state-backed corporations.",
      ],
      evidence: [
        "EU AI Act High-Risk Category Designations",
        "Autonomous Agent Sandbox Failure Case Studies (OWASP Top 10 for LLMs)",
        "Contract Law Precedents on Algorithmic Trading Accidents",
      ],
      takeaways: [
        "Stateless tool calls without verifiable guardrails and rollback snapshots are unacceptable in production environments.",
        "Insurance frameworks and tiered liquidity bounds provide a practical near-term risk ceiling.",
      ],
      outcome: "Consensus on Engineering Safeguards: Legal consensus is developing, but from an engineering perspective, verifiable deterministic sandboxing with cryptographic transaction caps is non-negotiable.",
      furtherReading: [
        { title: "OWASP Top 10 for Large Language Model Applications", url: "https://owasp.org" },
        { title: "Legal Liability and Autonomous Multi-Agent Swarms", url: "https://arxiv.org" },
      ],
      attendees: 62,
    },
    {
      id: "gd-39",
      code: "GD-39",
      date: "Sep 26, 2026",
      category: "Hardware & Compilers",
      topic: "Hardware Specialization vs General Purpose GPUs: The Future of Neuromorphic & Photonic AI Chips",
      summary: "Debating whether general GPUs and CUDA will retain their hegemony or yield to analog optical matrix multipliers and SRAM-heavy wafer-scale chips.",
      background: "The memory wall and thermal constraints are throttling traditional Von Neumann architectures running transformer workloads, driving experimental investments into optical compute and neuromorphic spikes.",
      proArguments: [
        "Silicon photonics and optical matrix-vector multipliers offer zero-latency matrix multiplication with 100x lower energy dissipation per MAC.",
        "Wafer-scale SRAM integrations eliminate DRAM memory-bandwidth bottlenecks entirely for inference.",
      ],
      conArguments: [
        "The software compiler ecosystem (CUDA, Triton, PyTorch) creates an insurmountable software moat that specialized hardware invariably fails to breach.",
        "Analog and optical compute struggle with precision degradation and conversion overheads (ADC/DAC) that limit deep multilayer backpropagation.",
      ],
      evidence: [
        "NVIDIA Blackwell Architecture Whitepaper",
        "Cerebras Wafer-Scale Engine Inference Benchmarks",
        "Nature Photonics on Integrated Optical Neural Networks",
      ],
      takeaways: [
        "Hardware is only as viable as its compiler stack. Startups fail not on silicon yield, but on lack of seamless PyTorch kernel support.",
        "Photonic interconnects will conquer rack-to-rack and chip-to-chip bandwidth before optical compute replaces silicon ALUs.",
      ],
      outcome: "Consensus: Silicon GPUs running specialized software abstractions (Triton) will maintain dominance in training; SRAM wafer-scale hardware will carve significant niches in ultra-low latency inference.",
      furtherReading: [
        { title: "The Memory Wall: Bottlenecks in Deep Learning", url: "https://arxiv.org" },
        { title: "Triton: An Intermediate Language and Compiler for Tiled Neural Networks", url: "https://triton-lang.org" },
      ],
      attendees: 49,
    },
  ],
};
