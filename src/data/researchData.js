export const researchRadarData = {
  sectionTitle: "AI Research Radar // Active Vectors",
  sectionSubtitle: "Exploring frontier architectures across multi-agent swarms, physical embodiment, neuromorphic systems, and test-time reasoning.",
  nodes: [
    {
      id: "radar-genai",
      title: "Generative Reasoning & Test-Time Search",
      tag: "CORE VECTOR",
      quadrant: "North-East",
      confidence: "High Velocity",
      description: "Scaling test-time inference compute via tree-of-thought verification, process reward models (PRM), and Monte Carlo Tree Search.",
      papersStudied: 18,
      leadResearcher: "Aarav Sharma",
      activeWork: "Drafting an inference-time verification pipeline for algorithmic synthesis."
    },
    {
      id: "radar-agents",
      title: "Autonomous Agent Protocols & Swarms",
      tag: "ACTIVE PROTOCOL",
      quadrant: "North-West",
      confidence: "Rapid Prototyping",
      description: "FastMCP integration, multi-agent consensus protocols, sandboxed runtime environments, and self-correcting execution loops.",
      papersStudied: 24,
      leadResearcher: "Tanuj Verma",
      activeWork: "CampusAgent multi-agent coordination benchmark under high concurrency."
    },
    {
      id: "radar-vision",
      title: "Embodied Vision-Language-Action (VLA)",
      tag: "HARDWARE LAB",
      quadrant: "South-West",
      confidence: "Experimental",
      description: "Direct end-to-end mapping from video streams to robotic joint kinematics, real-time spatial depth perception, and event camera fusion.",
      papersStudied: 12,
      leadResearcher: "Priya Patel",
      activeWork: "Stereo-depth SLAM calibration on low-power NVIDIA Jetson platforms."
    },
    {
      id: "radar-systems",
      title: "Kernel Engineering & Low-Precision Quantization",
      tag: "SYSTEMS LAB",
      quadrant: "South-East",
      confidence: "High Impact",
      description: "FP8 / INT4 GEMM acceleration, fused attention kernels in Triton, and speculative decoding for low-power edge silicon.",
      papersStudied: 15,
      leadResearcher: "Kavya Menon",
      activeWork: "Compiling custom WebGPU compute kernels for client-side transformer decoding."
    }
  ]
};

