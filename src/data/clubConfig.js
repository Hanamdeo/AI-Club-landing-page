export const clubConfig = {
  name: "PHOENIX AI LAB",
  shortName: "Phoenix AI",
  tagline: "INTELLIGENCE. IMAGINATION. IGNITED.",
  college: "Department of Artificial Intelligence & Computer Science",
  campus: "Main Innovation Complex, Room 402",
  established: 2024,
  location: "Campus Innovation Hub, Lab 402",
  email: "contact@phoenix-aiclub.edu",
  cohort: "2026-2027",
  status: "LAB ONLINE // COHORT ACTIVE",

  // Conditional Recruitment System (PRD Section 9 & FR-12)
  recruitment: {
    isOpen: true, // Toggle to false to cleanly hide Join CTA across site
    title: "Fall 2026 Cohort Recruitment Open",
    badge: "Applications Active",
    role: "Junior Researchers, Kernel Developers & Event Leads",
    applicationUrl: "https://forms.gle/phoenix-ai-recruitment-2026",
    deadline: "November 25, 2026",
    notice: "Applications are reviewed on a rolling basis across technical, design, and operations tracks.",
  },

  // Telemetry Statistics (PRD Section 3.3)
  stats: [
    { label: "Active Members", value: "320+", change: "+45% this academic cycle" },
    { label: "Open Preprints & Papers", value: "14", change: "Published in open access" },
    { label: "GPU Hours Logged", value: "48,000", change: "Campus cluster compute" },
    { label: "National Podiums", value: "18", change: "Collegiate hackathons" },
  ],

  // Official Socials & Links (PRD Section 3.9 & FR-13)
  socials: {
    github: "https://github.com/phoenix-aiclub",
    discord: "https://discord.gg/phoenix-ai",
    twitter: "https://x.com/phoenix_ai_lab",
    linkedin: "https://linkedin.com/company/phoenix-aiclub",
    youtube: "https://youtube.com/@phoenix_ai_lab",
  },

  // 4 Primary Public Routes (PRD Section 2)
  navLinks: [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "GD Archive", href: "/gd-archive" },
    { name: "Gallery", href: "/gallery" },
  ],

  // Developer Credits (PRD Section 3.9)
  developerCredits: {
    team: "Phoenix AI Lab Web Engineering Core",
    githubUrl: "https://github.com/phoenix-aiclub/aiclub-website",
  },
};
