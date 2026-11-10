'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Target,
  Sparkles,
  Users,
  Code2,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Layers,
  Terminal,
} from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';

export default function AboutPage() {
  const actualTracks = [
    {
      title: 'Machine Learning & Mathematical Foundations',
      tag: 'Core Track',
      desc: 'Rigorous study of linear algebra, optimization, probabilistic modeling, and classical supervised/unsupervised algorithms from scratch.',
      activities: ['Weekly math derivations', 'Numpy/PyTorch implementations', 'Paper deconstructions'],
    },
    {
      title: 'Generative AI & LLM Systems',
      tag: 'Active Track',
      desc: 'Hands-on exploration of transformer decoders, fine-tuning (LoRA/QLoRA), RAG pipelines, and agentic workflows using MCP and structured outputs.',
      activities: ['Local LLM deployment (vLLM/Ollama)', 'RAG benchmarks', 'Prompt & evaluation harnesses'],
    },
    {
      title: 'Computer Vision & Multimodal AI',
      tag: 'Active Track',
      desc: 'Real-time image classification, object detection (YOLO), segmentation, and multimodal embeddings for edge and server workloads.',
      activities: ['OpenCV & TensorRT pipelines', 'Spatial perception models', 'Camera sensor integrations'],
    },
    {
      title: 'Systems & Inference Acceleration',
      tag: 'Engineering Track',
      desc: 'Profiling low-latency model runtimes, CUDA kernel optimization, quantization (AWQ/GPTQ), and distributed training setups.',
      activities: ['GPU profiling on Triton & CUDA', 'Model compression', 'Inference latency benchmarking'],
    },
    {
      title: 'Autonomous Systems & Robotics',
      tag: 'Experimental Track',
      desc: 'Exploring ROS2 integration, SLAM, kinematics, and embodied agent simulations in physics engines.',
      activities: ['Sim2Real workflows', 'Edge robotics controllers', 'Path planning prototypes'],
    },
  ];

  const participationCriteria = [
    {
      label: 'Open to All Collegiate Students',
      desc: 'Any undergraduate or graduate student enrolled at MITS Gwalior is eligible to attend open sessions and workshops, regardless of branch or year.',
    },
    {
      label: 'Zero Gatekeeping, High Rigor',
      desc: 'Prior deep learning experience is not mandatory for general tracks; curiosity, consistency, and basic programming interest are what count.',
    },
    {
      label: 'Structured Mentorship Onboarding',
      desc: 'Beginners receive peer-assisted roadmaps and curated reading resources before moving to project work groups.',
    },
    {
      label: 'Contribute to Open Source',
      desc: 'All club prototypes, datasets, benchmarks, and reading notes are published publicly under permissive open-source licenses.',
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#07090A] text-white font-manrope pt-28 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-facility-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(85,223,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(36,191,234,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[rgba(85,223,255,0.18)] pb-8">
          <div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-barlow-condensed font-bold uppercase tracking-tight text-white leading-tight">
              ABOUT AI CLUB
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-manrope mt-3 max-w-2xl leading-relaxed">
              {CLUB_INFO.motto}
            </p>
          </div>

          <div className="p-4 px-6 rounded-2xl bg-[#0C1014]/90 border border-[rgba(85,223,255,0.22)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-start md:self-auto text-left md:text-right">
            <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              CAMPUS BASE
            </span>
            <span className="text-base sm:text-lg font-barlow-condensed font-bold text-white tracking-wide block uppercase">
              {CLUB_INFO.institution}
            </span>
            <span className="text-[10px] font-mono text-[#24BFEA]">Department of CSE & AI</span>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0C1014]/80 border border-[rgba(85,223,255,0.20)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#55DFFF] uppercase tracking-wider font-semibold">
              <Target className="w-4 h-4 text-[#55DFFF]" />
              <span>OUR MISSION</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 font-manrope leading-relaxed">
              {CLUB_INFO.mission}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0C1014]/80 border border-[rgba(85,223,255,0.20)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#24BFEA] uppercase tracking-wider font-semibold">
              <Compass className="w-4 h-4 text-[#24BFEA]" />
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
            <span className="text-xs font-mono text-[#55DFFF]">3 CORE PILLARS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLUB_INFO.pillars.map((pillar) => (
              <div
                key={pillar.code}
                className="p-6 rounded-2xl bg-[#0C1014]/85 border border-[rgba(85,223,255,0.18)] relative overflow-hidden group hover:border-[#55DFFF]/40 transition-colors"
              >
                <span className="text-4xl font-barlow-condensed font-bold text-white/[0.08] absolute top-4 right-4">
                  {pillar.code}
                </span>
                <h3 className="text-lg font-barlow-condensed font-bold uppercase text-white mb-2 group-hover:text-[#55DFFF] transition-colors">
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
            <span className="text-xs font-mono text-[#24BFEA] uppercase">VERIFIED CLUB SCOPE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {actualTracks.map((tr, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0C1014]/90 border border-[rgba(85,223,255,0.16)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[rgba(85,223,255,0.12)] text-[#55DFFF] border border-[rgba(85,223,255,0.25)] uppercase font-semibold">
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
                <div className="pt-3 border-t border-[rgba(85,223,255,0.12)]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    KEY HANDS-ON ACTIVITIES
                  </span>
                  <ul className="space-y-1">
                    {tr.activities.map((act, aIdx) => (
                      <li key={aIdx} className="text-[11px] font-manrope text-slate-300 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#55DFFF]" />
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
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#0C1014]/90 border border-[rgba(85,223,255,0.20)]">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#55DFFF] uppercase tracking-wider font-semibold">
            <Users className="w-4 h-4 text-[#55DFFF]" />
            <span>PARTICIPATION & ELIGIBILITY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-barlow-condensed font-bold uppercase text-white tracking-tight mb-4">
            WHO CAN JOIN & HOW TO PARTICIPATE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {participationCriteria.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#07090A]/70 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#24BFEA] font-semibold mb-1.5">
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
            <span className="text-[10px] font-mono text-[#55DFFF]">INTERNAL CLUB LOGS</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CLUB_INFO.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0C1014] border border-[rgba(85,223,255,0.18)] text-center"
              >
                <span className="text-3xl sm:text-4xl font-barlow-condensed font-bold text-[#55DFFF] tracking-wider block mb-1">
                  {m.value}
                </span>
                <span className="text-xs font-mono font-semibold text-white block mb-1">
                  {m.label}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  {m.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency & Disclaimer Box (PRD 4.2 Compliance) */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0C1014]/60 border border-white/[0.08] text-[11px] font-mono text-slate-400 mb-14 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#24BFEA] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Student Collective Transparency Notice:</strong> AI Club is a student-founded and student-led academic technical initiative at Madhav Institute of Technology & Science, Gwalior. Club activities, project repositories, and research reading circles reflect peer-led student initiatives. Third-party brand names or model citations (e.g., PyTorch, CUDA, Anthropic, OpenAI) are references to open technology tools and do not imply institutional endorsement.
          </p>
        </div>

        {/* Bottom Call to Action */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0C1014] via-[#141A20] to-[#0C1014] border border-[rgba(85,223,255,0.25)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          <div>
            <h3 className="text-2xl sm:text-3xl font-barlow-condensed font-bold uppercase text-white tracking-tight mb-2">
              MEET THE STUDENT LEADS & MENTORS
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-manrope max-w-xl">
              Discover the student coordinators, technical domain leads, and faculty advisors directing the club operations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/team"
              className="px-5 py-2.5 rounded-xl btn-glass-cyan text-xs font-mono font-bold transition-all whitespace-nowrap"
            >
              VIEW TEAM CADRE ➔
            </Link>
            <Link
              href="/join"
              className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-xs font-mono text-white transition-all whitespace-nowrap"
            >
              MEMBERSHIP INTAKE
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
