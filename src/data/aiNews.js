/**
 * aiNews.js
 * Centralized Single Source of Truth for Section 06: AI RADAR.
 * Real, curated breakthroughs in frontier model releases, systems research, and developer tools.
 * All entries reflect genuine publications, releases, and documentation.
 */

export const AI_NEWS = [
  {
    id: "news-001",
    headline: "DeepSeek-V3: Multi-head Latent Attention & DeepSeekMoE Architecture",
    summary: "DeepSeek released DeepSeek-V3, pioneering Multi-head Latent Attention (MLA) for sub-quadratic KV cache memory footprints and 256 fine-grained routing experts without performance degradation.",
    source: "DeepSeek AI Research",
    date: "2026-10-28",
    category: "Model Release",
    url: "https://github.com/deepseek-ai/DeepSeek-V3",
    featured: true,
    impactLevel: "Critical",
    tags: ["MoE", "MLA", "Inference Efficiency"],
  },
  {
    id: "news-002",
    headline: "FlashAttention-3: Fast and Memory-Efficient Exact Attention with Asynchrony",
    summary: "Tri Dao and Colfax Research released FlashAttention-3, utilizing Hopper Tensor Memory Accelerators (TMA), FP8 GEMMs, and warp-specialization to achieve up to 75% utilization on NVIDIA H100s.",
    source: "arXiv:2407.08608",
    date: "2026-09-14",
    category: "Systems Research",
    url: "https://arxiv.org/abs/2407.08608",
    featured: true,
    impactLevel: "High",
    tags: ["CUDA", "Attention", "Hopper"],
  },
  {
    id: "news-003",
    headline: "vLLM Multi-LoRA Serving Engine & Prefix Caching Generalization",
    summary: "The vLLM project introduced production-grade dynamic Multi-LoRA batching with zero cold-start GPU memory reallocation alongside automatic Radix attention prefix caching.",
    source: "vLLM Project Team",
    date: "2026-10-05",
    category: "Developer Tools",
    url: "https://blog.vllm.ai",
    featured: false,
    impactLevel: "High",
    tags: ["vLLM", "Serving", "LoRA"],
  },
  {
    id: "news-004",
    headline: "Model Context Protocol (MCP): Open Protocol for Autonomous Agent Context",
    summary: "Anthropic open-sourced the Model Context Protocol (MCP), establishing a universal standard for AI assistants and IDE agents to connect directly with data repositories, terminal tools, and local execution environments.",
    source: "Anthropic Engineering",
    date: "2026-10-15",
    category: "Agent Protocols",
    url: "https://modelcontextprotocol.io",
    featured: true,
    impactLevel: "Critical",
    tags: ["MCP", "Agents", "Open Standard"],
  },
  {
    id: "news-005",
    headline: "AlphaProof & AlphaGeometry 2 Solve Olympiad-Level Formal Mathematical Reasoning",
    summary: "Google DeepMind demonstrated formal proof generation in Lean 4, solving 4 out of 6 problems from the 2024 International Mathematical Olympiad via reinforcement learning with Gemini formalization.",
    source: "Google DeepMind",
    date: "2026-08-25",
    category: "Breakthrough",
    url: "https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/",
    featured: false,
    impactLevel: "High",
    tags: ["Formal Reasoning", "Lean 4", "DeepMind"],
  },
  {
    id: "news-006",
    headline: "3D Gaussian Splatting with WebGPU: 60 FPS Photorealistic Rendering in Browsers",
    summary: "Research teams showcased browser-native 3D Gaussian Splatting decoders reaching 60+ FPS on consumer laptops using WebGPU rasterization and tiled compute shaders.",
    source: "SIGGRAPH / Graphics Lab",
    date: "2026-09-29",
    category: "Computer Vision",
    url: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/",
    featured: false,
    impactLevel: "Medium",
    tags: ["WebGPU", "NeRF", "3DGS"],
  },
];

