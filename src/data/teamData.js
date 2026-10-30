export const teamHierarchy = {
  executive: [
    {
      name: "Tanuj Verma",
      role: "President & AI Systems Lead",
      tier: "Executive Leadership",
      department: "AI Systems & Swarms",
      bio: "Undergraduate researcher focused on high-concurrency autonomous multi-agent coordination, distributed inference orchestration, and collegiate hackathon mentorship.",
      github: "https://github.com/phoenix-aiclub",
      linkedin: "https://linkedin.com",
      avatarBadge: "TV",
      specialty: "Agentic Systems & Distributed Ops",
    },
    {
      name: "Ananya Deshmukh",
      role: "Vice President & Operations",
      tier: "Executive Leadership",
      department: "Club Operations & Strategic Growth",
      bio: "Managing club sponsorship partnerships, hackathon logistics, inter-collegiate coordination, and cross-departmental research pod sprints.",
      github: "https://github.com/phoenix-aiclub",
      linkedin: "https://linkedin.com",
      avatarBadge: "AD",
      specialty: "Program Management & Hackathon Ops",
    },
  ],
  advisory: [
    {
      name: "Dr. K. Raman",
      role: "Faculty Advisor & Research Director",
      tier: "Faculty Advisory",
      department: "Department of Artificial Intelligence",
      bio: "Professor in Computer Science & AI with 20+ years researching neuro-symbolic reasoning, graph representation learning, and autonomous system verification.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatarBadge: "KR",
      specialty: "Formal Logic & Neuro-Symbolic AI",
    },
  ],
  departmentHeads: [
    {
      name: "Priya Patel",
      role: "Head of Computer Vision & Robotics",
      tier: "Departmental Leadership",
      department: "Vision & Spatial AI",
      bio: "Leading research on visual-inertial SLAM, depth estimation transformers, and deploying quantised edge models on NVIDIA Jetson embedded kits.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatarBadge: "PP",
      specialty: "Spatial Computing & Edge Vision",
    },
    {
      name: "Aarav Sharma",
      role: "Head of Research Pods & LLMs",
      tier: "Departmental Leadership",
      department: "Foundational Models",
      bio: "Directing student research reading pods, synthetic data curation pipelines, and process-supervised reasoning experiments with open-weights.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatarBadge: "AS",
      specialty: "Process Supervision & Reasoning",
    },
    {
      name: "Kavya Menon",
      role: "Lead Systems & Compiler Engineer",
      tier: "Departmental Leadership",
      department: "Hardware & Accelerators",
      bio: "Building custom fused CUDA and OpenAI Triton kernels, benchmarking memory bandwidth bounds, and authoring WebGPU neural shaders.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatarBadge: "KM",
      specialty: "CUDA, Triton & WebGPU",
    },
  ],
  subHeads: [
    {
      name: "Rohan Kulkarni",
      role: "Director of GD Arena & Dialectics",
      tier: "Specialized Leadership",
      department: "Dialectic Arena",
      bio: "Curating bi-weekly technical debate topics, moderating philosophical controversies, and publishing synthesized discussion outcomes.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatarBadge: "RK",
      specialty: "Technical Debate & AI Governance",
    },
    {
      name: "Devika Nair",
      role: "Lead Web Architect & Creative Core",
      tier: "Specialized Leadership",
      department: "Web & Design Engineering",
      bio: "Architecting interactive WebGL experiences, responsive design systems, and maintaining open-source club digital infrastructure.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatarBadge: "DN",
      specialty: "WebGL, Next.js & UI Architecture",
    },
  ],
};

// Flat list for generic iteration
export const teamMembers = [
  ...teamHierarchy.executive,
  ...teamHierarchy.advisory,
  ...teamHierarchy.departmentHeads,
  ...teamHierarchy.subHeads,
];

// Club Ethos Pillars for Homepage
export const clubPillars = [
  {
    title: "Rigorous Technical Workshops",
    description: "Zero fluff. We code from first principles: PyTorch backpropagation from raw matrix tensors, custom Triton CUDA kernels, and hardware edge deployment.",
    icon: "Cpu",
    metric: "24+ Masterclasses Conducted",
  },
  {
    title: "Autonomous Research Pods",
    description: "Small, highly focused squads of 3-5 students investigating arXiv preprints, reproducing breakthrough architectures, and publishing open findings.",
    icon: "Atom",
    metric: "14 Preprints & Papers",
  },
  {
    title: "The Dialectic Room // Critical Inquiry",
    description: "Intelligence without philosophical scrutiny is hazardous. We host bi-weekly debates on open-source safety, alignment economics, and compute sovereignty.",
    icon: "MessagesSquare",
    metric: "42 Debates Hosted",
  },
  {
    title: "Collegiate Hackathon Teams",
    description: "We assemble, sponsor, and mentor collegiate hackathon units to compete in national and global AI building challenges with high-agency execution.",
    icon: "Trophy",
    metric: "18 National Podiums",
  },
];
