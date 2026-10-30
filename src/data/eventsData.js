export const eventCategories = ["All", "Hackathons", "Workshops", "Tech Talks", "Past Highlights"];

export const eventsData = [
  {
    id: "hack-phoenix-2026",
    title: "PHOENIX HACK 2026: 36-Hour Autonomous AI Hackathon",
    category: "Hackathons",
    date: "Nov 14 - 16, 2026",
    time: "06:00 PM IST onwards",
    location: "Main Auditorium & Compute Lab",
    status: "Registration Open",
    spotsLeft: 24,
    tags: ["Autonomous Agents", "Multi-Modal", "$5,000 Prizes", "Hardware Grants"],
    featured: true,
    description: "Our flagship collegiate hackathon challenging 40 selected teams to build high-agency AI systems, autonomous swarms, and edge robotics solutions.",
    schedule: [
      { time: "Day 1 - 06:00 PM", title: "Keynote: Next Frontier in Embodied Reasoning" },
      { time: "Day 1 - 09:00 PM", title: "Hacking Commences + API Credit Distribution" },
      { time: "Day 2 - 02:00 PM", title: "Mid-Sprint Architecture Mentorship" },
      { time: "Day 3 - 10:00 AM", title: "Live Demos & Jury Deliberation" }
    ],
    registrationUrl: "#join-cta"
  },
  {
    id: "workshop-vllm-cuda",
    title: "Deep Dive: Writing Custom CUDA Kernels for LLM Inference",
    category: "Workshops",
    date: "Nov 04, 2026",
    time: "04:30 PM - 07:00 PM IST",
    location: "CS Lab 304 & Discord Stream",
    status: "Upcoming",
    spotsLeft: 12,
    tags: ["CUDA", "C++", "Triton", "Memory Bandwidth"],
    featured: false,
    description: "Hands-on workshop breaking down GPU memory hierarchy, shared memory bank conflicts, and writing custom fused softmax kernels.",
    schedule: [
      { time: "04:30 PM", title: "Understanding GPU Architecture & SMs" },
      { time: "05:15 PM", title: "Profiling with Nsight Compute" },
      { time: "06:00 PM", title: "Coding a Fused Kernel in Triton" }
    ],
    registrationUrl: "#join-cta"
  },
  {
    id: "talk-neurosymbolic-reasoning",
    title: "Beyond Next-Token Prediction: Neuro-Symbolic Hybrid Reasoning",
    category: "Tech Talks",
    date: "Nov 21, 2026",
    time: "05:00 PM - 06:30 PM IST",
    location: "Virtual Amphitheater",
    status: "Registration Open",
    spotsLeft: 65,
    tags: ["Neuro-Symbolic", "Formal Verification", "Keynote"],
    featured: false,
    description: "Distinguished guest lecture discussing how neural probabilistic representations merge with formal logic provers to eliminate hallucinations.",
    schedule: [
      { time: "05:00 PM", title: "Speaker Introduction & Foundations" },
      { time: "05:40 PM", title: "Lean 4 and LLM Verifier Pipelines" },
      { time: "06:10 PM", title: "Open Q&A with Club Members" }
    ],
    registrationUrl: "#join-cta"
  },
  {
    id: "past-winter-ai-camp",
    title: "Winter AI Bootcamp 2025: From Transformer Scratch to Fine-tuning",
    category: "Past Highlights",
    date: "Jan 10 - 18, 2026",
    time: "Completed",
    location: "Innovation Hub",
    status: "Completed",
    spotsLeft: 0,
    tags: ["PyTorch", "200+ Students Trained", "Open-Source Projects"],
    featured: false,
    description: "An intensive 8-day intensive hands-on bootcamp where 200+ undergraduate students built GPT-architecture models from raw NumPy and PyTorch tensors.",
    schedule: [],
    registrationUrl: "#gallery"
  }
];

