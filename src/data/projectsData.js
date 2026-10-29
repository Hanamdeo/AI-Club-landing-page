export const projectCategories = [
  "All Projects",
  "LLMs & Agents",
  "Computer Vision",
  "Embodied Robotics",
  "AI Systems & Compilers"
];

export const projectsData = [
  {
    id: "medvision-x",
    title: "MedVision-X: Multimodal Clinical Diagnostic Agent",
    category: "Computer Vision",
    badge: "Best Paper @ Campus Research Expo",
    description: "Real-time multimodal transformer fine-tuned on anonymized 3D CT/MRI scans with explainable grad-CAM heatmaps for pulmonary nodule localization.",
    metrics: {
      latency: "18ms inference",
      accuracy: "97.8% AUC",
      dataset: "42,000 CT volumes",
      status: "Production Demo",
    },
    tags: ["PyTorch", "Vision Transformer", "TensorRT", "FastAPI", "Three.js"],
    githubUrl: "https://github.com/phoenix-aiclub/medvision-x",
    demoUrl: "https://medvision-x.phoenix.edu",
    lead: "Aarav Sharma & Priya Patel",
    stars: 142,
    architectureDetails: "Hierarchical Vision Transformer with dual cross-attention decoder. Accelerated via FP16 TensorRT inference pipelines running on local RTX 4090 workstation nodes."
  },
  {
    id: "campus-agent-swarm",
    title: "CampusAgent: Autonomous Student Workflow Swarm",
    category: "LLMs & Agents",
    badge: "Grand Prize - National Hackathon 2026",
    description: "Hierarchical multi-agent framework coordinating course registration, research syllabus summarization, peer study grouping, and assignment debugging.",
    metrics: {
      latency: "240ms reasoning loop",
      accuracy: "99.1% tool execution",
      dataset: "12 Campus APIs",
      status: "Live Campus Beta",
    },
    tags: ["LangGraph", "Llama-3-70B", "FastMCP", "Vector DB", "Redis"],
    githubUrl: "https://github.com/phoenix-aiclub/campus-agent-swarm",
    demoUrl: "https://agent.phoenix.edu",
    lead: "Tanuj Verma & Rohan Kulkarni",
    stars: 310,
    architectureDetails: "Plan-and-solve agent architecture orchestrated with LangGraph and Redis event queues. Features zero-shot tool invocation with sandboxed Python code execution."
  },
  {
    id: "neural-synth-audio",
    title: "NeuralSynth: Low-Latency Neuro-Acoustic Synthesizer",
    category: "AI Systems & Compilers",
    badge: "Featured on Hacker News",
    description: "Real-time neural audio synthesis engine compiling PyTorch diffusion models to bare-metal WebAssembly and WebGPU for sub-5ms browser audio synthesis.",
    metrics: {
      latency: "4.2ms buffer",
      accuracy: "48kHz 24-bit Hi-Res",
      dataset: "AudioSet + Custom Frequencies",
      status: "Open Source NPM",
    },
    tags: ["WebGPU", "C++20", "WebAssembly", "Diffusers", "ONNX Runtime"],
    githubUrl: "https://github.com/phoenix-aiclub/neural-synth",
    demoUrl: "https://synth.phoenix.edu",
    lead: "Kavya Menon",
    stars: 520,
    architectureDetails: "Custom WGSL compute kernels executing 1D depthwise convolutions directly on browser GPUs, achieving zero audio dropouts during polyphonic synthesis."
  },
  {
    id: "embodied-rover-v3",
    title: "Aegis Rover: Visual SLAM & Neuromorphic Obstacle Avoidance",
    category: "Embodied Robotics",
    badge: "Inter-Collegiate Robotics Gold",
    description: "Custom four-wheel rover running edge visual-inertial SLAM paired with an event-based neuromorphic camera for dynamic high-speed collision avoidance.",
    metrics: {
      latency: "120 FPS tracking",
      accuracy: "0.8cm spatial drift",
      dataset: "Event-based ROS2 Bag",
      status: "Hardware Field Tested",
    },
    tags: ["ROS2 Humble", "Jetson Orin Nano", "OpenCV", "Event Cameras", "YOLOv10"],
    githubUrl: "https://github.com/phoenix-aiclub/aegis-rover",
    demoUrl: "https://rover.phoenix.edu",
    lead: "Siddharth Jain & Team Robotics",
    stars: 88,
    architectureDetails: "Hybrid stereo vision + event-camera fusion running on NVIDIA Jetson Orin Nano with hardware-accelerated TensorRT INT8 quantization."
  },
  {
    id: "speculative-decoder",
    title: "HyperDraft: Speculative Decoding Engine for Edge LLMs",
    category: "AI Systems & Compilers",
    badge: "Research Pod #03",
    description: "Novel draft-verification algorithm achieving 2.6x speedup on quantized local SLMs (1.5B - 8B) running on consumer Apple Silicon and CUDA laptops.",
    metrics: {
      latency: "2.6x Speedup",
      accuracy: "100% Exact Output Match",
      dataset: "HumanEval / GSM8K",
      status: "Preprint Under Review",
    },
    tags: ["CUDA", "vLLM", "C++", "PyTorch", "FlashAttention-3"],
    githubUrl: "https://github.com/phoenix-aiclub/hyperdraft",
    demoUrl: "https://hyperdraft.phoenix.edu",
    lead: "Vikramaditya Sen",
    stars: 275,
    architectureDetails: "Tree-based speculative verification with asynchronous KV-cache memory pooling, avoiding duplicate token recomputations across candidate branches."
  },
  {
    id: "neuro-symbolic-prover",
    title: "AxiomAI: Neuro-Symbolic Mathematical Theorem Prover",
    category: "LLMs & Agents",
    badge: "Faculty Collaboration Pod",
    description: "Synthesizing deep reinforcement learning search heuristics with Lean 4 interactive theorem provers to verify undergraduate linear algebra and topology lemmas.",
    metrics: {
      latency: "1.2s per proof step",
      accuracy: "84.2% miniF2F Benchmark",
      dataset: "Lean Mathlib4",
      status: "Academic Release",
    },
    tags: ["Lean 4", "Deep RL", "Monte Carlo Tree Search", "HuggingFace"],
    githubUrl: "https://github.com/phoenix-aiclub/axiom-ai",
    demoUrl: "https://axiom.phoenix.edu",
    lead: "Ananya Deshmukh",
    stars: 195,
    architectureDetails: "MCTS guided by a lightweight 3B policy network coupled with Lean 4's REPL socket interface for formal deductive validation."
  }
];
