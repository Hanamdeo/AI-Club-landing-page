/**
 * announcements.js
 * Centralized Single Source of Truth for Club Dispatches, Recruitment Cycles & Urgent Updates.
 */

export const ANNOUNCEMENTS = [
  {
    id: "ann-001",
    title: "Fall 2026 Research Cohort & Engineering Recruitment Live",
    content: "Applications are now open for student researchers, systems engineers, and operations leads. Priority evaluation window closes Nov 20, 2026.",
    date: "2026-11-01",
    expiresAt: "2026-11-25",
    urgency: "high",
    actionText: "Apply to Cohort",
    actionLink: "#join-network",
    featured: true,
    status: "active",
  },
  {
    id: "ann-002",
    title: "Cluster Upgrade Complete: Hopper SXM5 Nodes Online",
    content: "Accelerator Pod 01 has been upgraded with NVIDIA Quantum-2 InfiniBand networking. All research cohorts can now submit batch training jobs.",
    date: "2026-10-25",
    expiresAt: "2026-11-30",
    urgency: "normal",
    actionText: "View Specs",
    actionLink: "#intelligence-core",
    featured: false,
    status: "active",
  },
];

