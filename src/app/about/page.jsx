'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  Target,
  Sparkles,
  Users,
  Cpu,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';
import RobotFace from '@/components/ui/RobotFace';

export default function AboutPage() {
  // Explicitly curated actual technical tracks maintained by AI Club (PRD 4.2 compliance)
  const actualTracks = [
    {
      title: "Generative AI & LLM Systems",
      desc: "Prompt engineering frameworks, local fine-tuning (LoRA), retrieval-augmented generation (RAG), and evaluation pipelines.",
      tag: "LLM INFERENCE",
      activities: ["Weekly paper reviews", "Local model hosting workshops", "Hackathon sprint teams"]
    },
    {
      title: "Computer Vision & Spatial Media",
      desc: "Edge inference with YOLO, 3D spatial neural representations, and visual feature extractors for autonomous robotics.",
      tag: "PERCEPTION",
      activities: ["Robotics visual SLAM builds", "Image dataset curation", "Model quantization benchmarks"]
    },
    {
      title: "Core Machine Learning Mechanics",
      desc: "Foundational mathematics, gradient descent mechanics, convex optimization, and mathematical proofs for loss convergence.",
      tag: "THEORY & MATH",
      activities: ["Math study circles", "NumPy from scratch tutorials", "Algorithmic problem-solving"]
    },
    {
      title: "Open Source AI & Reproducibility",
      desc: "Contributing to community repositories, benchmark verification, documentation sprints, and reproducible ML workflows.",
      tag: "ENGINEERING",
      activities: ["GitHub collaborative pull-requests", "Docker packaging sessions", "Open model benchmarking"]
    },
    {
      title: "Applied AI Ethics & Governance",
      desc: "Bias mitigation, dual-use risk evaluation, open weights policy discussions, and algorithmic auditing principles.",
      tag: "ETHICS & POLICY",
      activities: ["Structured debates", "Policy whitepaper summaries", "Ethics audit case studies"]
    },
    {
      title: "Hardware Acceleration & Edge AI",
      desc: "CUDA kernel basics, WebGPU in-browser neural execution, TinyML on microcontrollers, and memory bandwidth optimization.",
      tag: "HARDWARE & SYSTEMS",
      activities: ["Microcontroller flashing labs", "In-browser WebGPU demos", "GPU memory profiling"]
    }
  ];

  const participationCriteria = [
    { label: "Enrolled MITS Students", desc: "Open to all branches and years who have a demonstrable curiosity for machine learning and computer systems." },
    { label: "Self-Driven Learning", desc: "Members are expected to complete prerequisites independently and actively participate in team study sessions." },
    { label: "Open-Source Mindset", desc: "All core tools, projects, and learning outputs produced by cohorts are licensed under permissive open-source terms." },
    { label: "Collaborative Respect", desc: "Strict adherence to our anti-harassment policy, fostering an inclusive environment for learners at all initial skill levels." }
  ];

  return (
    <main className="relative min-h-screen bg-[#07090A] text-white font-manrope pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Ambience - clean neutral */}
      <div className="absolute inset-0 bg-facility-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 border-b border-white/10 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.8)] shrink-0 bg-black">
              <Image
                src="/logo.png"
                alt="AI Club Official Emblem"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-barlow-condensed font-bold uppercase tracking-tight text-white leading-tight">
                ABOUT AI CLUB
              </h1>
              {/* Place 1: Subtle blue accent in header tagline */}
              <p className="text-xs sm:text-sm font-mono text-[#55DFFF] uppercase tracking-wider mt-1">
                PIONEERING THE AI REVOLUTION • MITS-DU GWALIOR
              </p>
              <p className="text-sm sm:text-base text-slate-300 font-manrope mt-2 max-w-2xl leading-relaxed">
                {CLUB_INFO.motto}
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 px-4 sm:px-6 rounded-2xl bg-[#0C1014]/90 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-stretch sm:self-start md:self-auto flex items-center gap-3.5 sm:gap-4 text-left w-full sm:w-auto">
            <RobotFace variant="friendly" size={44} className="shrink-0 drop-shadow-[0_2px_10px_rgba(85,223,255,0.25)]" />
            <div className="min-w-0 flex-1">
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                CAMPUS BASE
              </span>
              <span className="text-sm sm:text-base md:text-lg font-barlow-condensed font-bold text-white tracking-wide block uppercase break-words">
                {CLUB_INFO.institution}
              </span>
              <span className="text-[10px] font-mono text-slate-400 block truncate">Department of CSE & AI</span>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards - Black & White Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl bg-[#0C1014]/80 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-white uppercase tracking-wider font-semibold">
              <Target className="w-4 h-4 text-slate-300" />
              <span>OUR MISSION</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 font-manrope leading-relaxed">
              {CLUB_INFO.mission}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0C1014]/80 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-white uppercase tracking-wider font-semibold">
              <Compass className="w-4 h-4 text-slate-300" />
              <span>OUR VISION</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 font-manrope leading-relaxed">
              {CLUB_INFO.vision}
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-barlow-condensed font-bold uppercase text-white tracking-tight">
              ARCHITECTURAL FOUNDATIONS
            </h2>
            <span className="text-xs font-mono text-slate-400">3 CORE PILLARS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLUB_INFO.pillars.map((pillar) => (
              <div
                key={pillar.code}
                className="p-6 rounded-2xl bg-[#0C1014]/85 border border-white/10 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              >
                {/* Place 2: Number in Signature Shade of Blue (No hover animation) */}
                <span className="text-4xl font-barlow-condensed font-bold text-[#55DFFF]/45 absolute top-4 right-4 select-none">
                  {pillar.code}
                </span>
                <h3 className="text-lg font-barlow-condensed font-bold uppercase text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-300 font-manrope leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Actually Do (Actual Club Activities & Tracks) */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-barlow-condensed font-bold uppercase text-white tracking-tight">
                ACTIVE FOCUS TRACKS & WORKING GROUPS
              </h2>
              <p className="text-xs font-manrope text-slate-400 mt-1">
                Specific technical domains currently maintained by active student groups.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase">VERIFIED CLUB SCOPE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {actualTracks.map((tr, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0C1014]/90 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-white border border-white/10 uppercase font-semibold">
                      {tr.tag}
                    </span>
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <h3 className="text-base font-barlow-condensed font-bold uppercase text-white mb-2 leading-snug">
                    {tr.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-manrope leading-relaxed mb-4">
                    {tr.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/[0.08]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    KEY HANDS-ON ACTIVITIES
                  </span>
                  <ul className="space-y-1">
                    {tr.activities.map((act, aIdx) => (
                      <li key={aIdx} className="text-[11px] font-manrope text-slate-300 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who Can Participate & Membership Criteria */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#0C1014]/90 border border-white/10">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-white uppercase tracking-wider font-semibold">
            <Users className="w-4 h-4 text-slate-300" />
            <span>PARTICIPATION & ELIGIBILITY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-barlow-condensed font-bold uppercase text-white tracking-tight mb-4">
            WHO CAN JOIN & HOW TO PARTICIPATE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {participationCriteria.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#07090A]/70 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-signal-green" />
                  <span>{item.label}</span>
                </div>
                <p className="text-xs text-slate-300 font-manrope leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Telemetry Matrix */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              CONFIRMED ACTIVITY METRICS
            </span>
            <span className="text-[10px] font-mono text-slate-400">INTERNAL CLUB LOGS</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CLUB_INFO.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0C1014] border border-white/10 text-center"
              >
                <span className="text-3xl sm:text-4xl font-barlow-condensed font-bold text-white tracking-wider block mb-1">
                  {m.value}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-300 block mb-1">
                  {m.label}
                </span>
                <span className="text-[10px] text-slate-500 font-mono block">
                  {m.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency & Disclaimer Box (PRD 4.2 Compliance) */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0C1014]/60 border border-white/[0.08] text-[11px] font-mono text-slate-400 mb-14 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Student Collective Transparency Notice:</strong> AI Club is a student-founded and student-led academic technical initiative at Madhav Institute of Technology & Science, Gwalior. Club activities, project repositories, and research reading circles reflect peer-led student initiatives. Third-party brand names or model citations (e.g., PyTorch, CUDA, Anthropic, OpenAI) are references to open technology tools and do not imply institutional endorsement.
          </p>
        </div>

        {/* Bottom Call to Action - Place 3: Subtle Blue Accent on the Primary Button */}
        <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-[#0C1014] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)] text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 min-w-0">
            <RobotFace variant="analytical" size={48} className="shrink-0 drop-shadow-[0_2px_12px_rgba(85,223,255,0.25)]" />
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-barlow-condensed font-bold uppercase text-white tracking-tight mb-2 break-words">
                MEET THE STUDENT LEADS & MENTORS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-manrope max-w-xl">
                Discover the student coordinators, technical domain leads, and faculty advisors directing the club operations.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full md:w-auto">
            <Link
              href="/team"
              className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#55DFFF] to-[#24BFEA] text-black font-bold text-xs font-mono shadow-[0_0_14px_rgba(85,223,255,0.3)] hover:brightness-110 transition-all whitespace-nowrap"
            >
              VIEW TEAM CADRE ➔
            </Link>
            <Link
              href="/join"
              className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-xs font-mono text-white transition-all whitespace-nowrap"
            >
              MEMBERSHIP INTAKE
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
