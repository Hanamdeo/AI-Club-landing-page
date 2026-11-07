/**
 * projects.js
 * Centralized Single Source of Truth for Section 07: PROJECT ARCHIVE.
 * Student research implementations, open-source repositories, and verified benchmarks.
 */

export const PROJECTS = [
  {
    id: "proj-01",
    title: "AuraKV: Sub-Millisecond Distributed KV Cache Engine",
    description: "High-throughput asynchronous key-value cache middleware written in Rust and CUDA, reducing Time-To-First-Token (TTFT) by eliminating redundant prefix recalculations across concurrent batch queries.",
    category: "ML Systems & Infrastructure",
    contributors: ["Aarav Sharma", "Karan Patel", "MITS Systems Group"],
    technologies: ["Rust", "CUDA", "vLLM", "gRPC", "Triton"],
    github: "https://github.com/aiclub-mits/aurakv",
    liveDemo: null,
    featured: true,
    status: "Stable Production",
    benchmarks: [
      { metric: "TTFT Reduction", value: "3.2x faster" },
      { metric: "Memory Overhead", value: "< 4.5% GPU VRAM" },
      { metric: "Throughput", value: "1,840 tokens/sec" },
    ],
  },
  {
    id: "proj-02",
    title: "OmniSplat: Interactive Neural Radiance Explorer in WebGPU",
    description: "Browser-native 3D Gaussian Splatting and radiance field renderer running real-time 60 FPS photorealistic scene reconstruction directly on standard client hardware without server-side rendering.",
    category: "Computer Vision & 3D",
    contributors: ["Karan Patel", "Rhea Sen", "Ananya Iyer"],
    technologies: ["WebGPU", "Three.js", "PyTorch", "WGSL", "TypeScript"],
    github: "https://github.com/aiclub-mits/omnisplat",
    liveDemo: "https://omnisplat.aiclub.mitsgwalior.in",
    featured: true,
    status: "Active Research",
    benchmarks: [
      { metric: "Framerate", value: "60 FPS @ 1440p" },
      { metric: "Initialization", value: "< 850ms load" },
      { metric: "VRAM Footprint", value: "480 MB" },
    ],
  },
  {
    id: "proj-03",
    title: "NeuroDoc: Multi-Agent Clinical Record Synthesis & Verification",
    description: "Privacy-preserving multi-agent clinical diagnostic workflow that cross-verifies pharmaceutical interactions and flags ICD-10 diagnostic oversights against verified medical ontologies using local LLMs.",
    category: "Generative AI & Healthcare",
    contributors: ["Rhea Sen", "Devika Nair", "Dr. Vikram Seth"],
    technologies: ["Python", "FastAPI", "LangGraph", "ChromaDB", "Llama-3"],
    github: "https://github.com/aiclub-mits/neurodoc",
    liveDemo: null,
    featured: false,
    status: "Clinical Prototype",
    benchmarks: [
      { metric: "F1 Score", value: "94.8% on MIMIC-IV" },
      { metric: "Hallucination Rate", value: "< 0.4%" },
    ],
  },
  {
    id: "proj-04",
    title: "EdgeSense: Micro-Watt TinyML Sound Classifier for Industrial Safety",
    description: "INT8-quantized convolutional neural architecture deployed directly to ARM Cortex-M4 and ESP32 microcontrollers for sub-millisecond acoustic bearing anomaly classification.",
    category: "Embedded & Edge AI",
    contributors: ["Aarav Sharma", "Faculty Engineering Group"],
    technologies: ["C++", "TensorFlow Lite Micro", "ARM CMSIS-NN", "PlatformIO"],
    github: "https://github.com/aiclub-mits/edgesense",
    liveDemo: null,
    featured: false,
    status: "Hardware Deployed",
    benchmarks: [
      { metric: "Power Draw", value: "13.4 mW continuous" },
      { metric: "Inference Latency", value: "11.2 ms" },
      { metric: "Flash Size", value: "84 KB" },
    ],
  },
  {
    id: "proj-05",
    title: "IndicDialect: Vernacular Adaptation & Tokenizer Optimization",
    description: "Custom BPE tokenizer and instruction-tuned adapter weights specialized for code-switched Hindi-English and vernacular technical instruction following.",
    category: "Natural Language Processing",
    contributors: ["Devika Nair", "Rhea Sen"],
    technologies: ["Hugging Face", "PyTorch", "LoRA", "SentencePiece"],
    github: "https://github.com/aiclub-mits/indic-dialect",
    liveDemo: "https://huggingface.co/aiclub-mits/indic-dialect-7b",
    featured: false,
    status: "Model Released",
    benchmarks: [
      { metric: "Token Compression", value: "+38% efficiency" },
      { metric: "Hindi MMLU", value: "68.4% Acc" },
    ],
  },
];

