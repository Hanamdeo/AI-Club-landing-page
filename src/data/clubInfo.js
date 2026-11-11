/**
 * clubInfo.js
 * Central single source of truth for AI Club metadata, philosophy, and verified telemetry.
 */

export const CLUB_INFO = {
  name: "AI CLUB",
  fullName: "Artificial Intelligence & Computing Research Club",
  institution: "MITS-DU Gwalior",
  campus: "Madhav Institute of Technology & Science (Deemed to be University)",
  tagline: "Where Curiosity Meets Intelligence.",
  motto: "Pioneering the AI Revolution • Open Research & Distributed Systems.",
  logo: "/logo.png",
  facilityCode: "MITS-DU Gwalior • CSE & AI",
  status: "Operational",
  contactEmail: "aiclub@mitsgwalior.in",
  locationCoordinates: "Department of CSE & AI, Innovation Annex",
  socials: {
    github: "https://github.com/aiclub-mits",
    discord: "https://discord.gg/aiclub",
    linkedin: "https://linkedin.com/company/aiclub-mits",
    twitter: "https://x.com/aiclub_mits",
  },
  mission:
    "To democratize advanced machine intelligence through rigorous theoretical foundations, open engineering, reproducible research, and hands-on systems development across student cohorts.",
  vision:
    "An autonomous community and research crucible where curiosity transforms into foundational machine learning models, novel architectures, and real-world societal impact.",
  metrics: [
    { label: "Verified Members", value: "450+", unit: "Students & Alumni", detail: "Active researchers & builders across 6 engineering disciplines" },
    { label: "Shipped Projects", value: "32", unit: "Open Source Systems", detail: "Distributed engines, ML libraries, vision tools & robotics proofs" },
    { label: "Research Papers", value: "14", unit: "Preprints & Submissions", detail: "Focusing on sparse attention, KV cache compression & vision models" },
    { label: "Compute Cluster", value: "4.2K", unit: "GPU Hours Logged", detail: "Dedicated compute cluster for student training & inference" },
  ],
  pillars: [
    {
      code: "01",
      title: "Fundamental Theory",
      desc: "Deep mathematical grounding in linear algebra, convex optimization, probability theory, and deep learning mechanics.",
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
  domains: [
    {
      id: "gen-ai",
      name: "Generative AI & LLMs",
      badge: "Core Track",
      description: "Sparse attention mechanisms, parameter-efficient fine-tuning (LoRA/QLoRA), context extension, and alignment methodologies.",
      keywords: ["Transformers", "KV Cache", "Quantization", "MoE"],
    },
    {
      id: "vision-robotics",
      name: "Computer Vision & Embodied AI",
      badge: "Active Focus",
      description: "3D Gaussian splatting, spatial perception, multi-modal vision-language architectures, and sim-to-real robotic locomotion.",
      keywords: ["3D Gaussian Splatting", "Diffusion", "CLIP", "Embodied AI"],
    },
    {
      id: "systems-compute",
      name: "ML Systems & Edge Compute",
      badge: "Systems Lab",
      description: "CUDA kernel acceleration, TensorRT runtimes, distributed training frameworks, and sub-milliwatt micro-controller TinyML inference.",
      keywords: ["CUDA", "vLLM", "TensorRT", "TinyML"],
    },
    {
      id: "nlp-speech",
      name: "NLP & Vernacular Semantics",
      badge: "Language Lab",
      description: "Cross-lingual representation, low-resource Indic language adaptation, and synthetic data curation with formal reasoning checks.",
      keywords: ["Tokenization", "Morphology", "Instruction Tuning", "IndicNLP"],
    },
  ],
  recruitment: {
    status: "opening-soon", // "open" | "opening-soon" | "closed"
    statusLabel: "Intake Opening Soon",
    nextCycle: "Autumn/Winter 2026 Cohort",
    contactEmail: "aiclub@mitsgwalior.in",
    notice: "Membership applications for the next student cohort will open shortly. Connect with us or follow official announcements.",
  },
};

