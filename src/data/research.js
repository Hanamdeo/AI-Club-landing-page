/**
 * research.js
 * Centralized Single Source of Truth for Intelligence Core research tracks, publications, and compute.
 */

export const RESEARCH_TRACKS = [
  {
    id: "gen-ai",
    title: "Generative AI & LLM Inference Optimization",
    lead: "Rhea Sen",
    focus: "Sparse attention mechanisms, test-time compute, KV cache compression, parameter-efficient fine-tuning (LoRA/QLoRA), and agent verification loops.",
    publications: [
      "Efficient Context Caching for Edge LLMs (Preprint 2026)",
      "Sparse Mixture-of-Experts in Constrained Hardware Domains (ICML Workshop)",
    ],
    technologies: ["vLLM", "FlashAttention", "Triton", "DeepSeekMoE", "PyTorch"],
    clusterAllocation: "8x NVIDIA H100 80GB SXM5",
  },
  {
    id: "comp-vision",
    title: "Computer Vision & 3D Spatial Perception",
    lead: "Karan Patel",
    focus: "3D Gaussian splatting, real-time radiance field rendering, zero-shot visual representation, and vision-language navigation for autonomous robotics.",
    publications: [
      "Real-Time Spatial Scene Reconstruction via WebGPU Splats (IEEE Access)",
      "Multimodal Perception for Low-Visibility Autonomous Quadrotors (IROS)",
    ],
    technologies: ["WebGPU", "Three.js", "Nerfstudio", "Gaussian Splatting", "CUDA"],
    clusterAllocation: "12x NVIDIA RTX 4090 24GB",
  },
  {
    id: "nlp",
    title: "Natural Language Processing & Vernacular Alignment",
    lead: "Devika Nair",
    focus: "Cross-lingual representation learning, low-resource vernacular reasoning, tokenization efficiency for agglutinative scripts, and synthetic data curation.",
    publications: [
      "Dialectal Transfer in Indic Language Models (EMNLP Findings)",
      "Robustness Benchmarks for Code-Switched Technical Discourse",
    ],
    technologies: ["Hugging Face", "Tokenizers", "vLLM", "Unsloth"],
    clusterAllocation: "Shared Multi-Node Workstation",
  },
  {
    id: "embodied-robotics",
    title: "Embodied AI & Neuromorphic Locomotion",
    lead: "Aarav Sharma & Karan Patel",
    focus: "Sim-to-real policy transfer, bipedal and quadruped dynamic balance, reinforcement learning from physical priors, and BDX-01 autonomous sensory loop.",
    publications: [
      "Sim-to-Real Policy Transfer in Bipedal Locomotion with Latency Compensation",
      "Sub-Milliwatt Spiking Neural Implementations on Microcontrollers",
    ],
    technologies: ["Isaac Gym", "MuJoCo", "TensorFlow Lite Micro", "ROS 2"],
    clusterAllocation: "Robotics Sandbox & Edge Rig",
  },
];

export const COMPUTE_SPECS = {
  accelerators: "8x NVIDIA H100 80GB SXM5 (NVLink 900 GB/s) + 12x RTX 4090",
  hostProcessors: "Dual AMD EPYC 9654 (192 Cores, 384 Threads @ 3.55 GHz)",
  memory: "1.5 TB DDR5-4800 ECC Registered",
  interconnect: "NVIDIA Quantum-2 InfiniBand 400 Gb/s Low-Latency Fabric",
  storage: "120 TB NVMe PCIe Gen5 ZFS RAID-10 Scratch Storage",
  cooling: "Direct-to-Chip Fluorochemical Liquid Closed-Loop",
};

