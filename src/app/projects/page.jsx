'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code,
  Github,
  ExternalLink,
  ChevronRight,
  Layers,
  Search,
  CheckCircle2,
  Archive,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { getAllProjects } from '@/lib/contentSelectors';
import { audioManager } from '@/utils/audioManager';

export default function ProjectsPage() {
  const projects = getAllProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [selectedState, setSelectedState] = useState('all'); // 'all' | 'published' | 'archived' | 'draft'

  const allTechs = ['All', 'Rust', 'CUDA', 'WebGPU', 'PyTorch', 'vLLM', 'FastAPI'];
  const stateFilters = [
    { id: 'all', label: 'All Projects' },
    { id: 'published', label: 'Published & Live' },
    { id: 'archived', label: 'Archived Builds' },
    { id: 'draft', label: 'In Lab (Beta)' },
  ];

  const filteredProjects = projects.filter((p) => {
    // State Filter
    if (selectedState === 'published') {
      if (p.status?.toLowerCase() !== 'production' && p.status?.toLowerCase() !== 'active' && p.status?.toLowerCase() !== 'published') return false;
    } else if (selectedState === 'archived') {
      if (p.status?.toLowerCase() !== 'archived') return false;
    } else if (selectedState === 'draft') {
      if (p.status?.toLowerCase() !== 'beta' && p.status?.toLowerCase() !== 'draft' && p.status?.toLowerCase() !== 'in development') return false;
    }

    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTech =
      selectedTech === 'All' || p.technologies.some((t) => t.toLowerCase() === selectedTech.toLowerCase());

    return matchesSearch && matchesTech;
  });

  return (
    <main className="relative min-h-screen bg-[#050C12] text-[#F0F6F7] font-events-body pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Grid & 3D Facility Blue Flare */}
      <div className="absolute inset-0 bg-facility-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(85,223,255,0.12)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute top-44 left-1/2 -translate-x-1/2 w-[700px] h-80 bg-[radial-gradient(circle_at_center,rgba(36,191,234,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 border-b border-[rgba(85,223,255,0.15)] pb-6 sm:pb-8">
          <div>
            {/* Kicker Eyebrow Badge in 3D Slade / LaBeouf */}
            <div className="font-3d-slade font-labeouf text-xs sm:text-sm text-[#55DFFF] tracking-widest uppercase mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#55DFFF]" />
              <span>LAB ARCHITECTURE & REPOSITORIES</span>
            </div>
            {/* Hero Heading: CS Slade 3D (White & Cyan with 3D Core Depth) */}
            <h1 className="events-hero-title">
              PROJECT ARCHIVE
            </h1>
            {/* Body Description: Manrope 400 (Clean White-Slate) */}
            <p className="events-body-text text-slate-300 mt-3 max-w-2xl text-xs sm:text-sm md:text-base">
              Open-source model serving engines, real-time spatial renderers, and verified benchmarks engineered by AI Club student cohorts.
            </p>
          </div>

          {/* Telemetry Counter */}
          <div className="p-4 px-5 sm:px-6 rounded-2xl bg-[#08121A]/95 border border-[rgba(85,223,255,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.85)] self-stretch sm:self-start md:self-auto flex items-center justify-between sm:justify-start gap-4 sm:gap-6">
            <div>
              <span className="block font-3d-slade font-labeouf text-[11px] tracking-wider text-slate-400 mb-1">
                SHIPPED REPOSITORIES
              </span>
              <span className="text-3xl sm:text-4xl font-bold font-events-heading bg-gradient-to-r from-[#55DFFF] via-[#24BFEA] to-white bg-clip-text text-transparent tracking-wider leading-none">
                0{projects.length}
              </span>
            </div>
            <div className="h-10 w-[1px] bg-[rgba(85,223,255,0.15)]" />
            <div>
              <span className="block font-3d-slade font-labeouf text-[11px] tracking-wider text-slate-400 mb-1">
                ACCESS CLEARANCE
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs events-mono-meta font-bold text-[#55DFFF] mt-1">
                <span className="w-2 h-2 rounded-full bg-[#55DFFF] animate-pulse shadow-[0_0_8px_#55DFFF]" />
                100% OPEN SOURCE
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar: Publication State & Technology Stack */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Tech Stack Pills: IBM Plex Mono */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => {
                    try { audioManager.playClick(); } catch {}
                    setSelectedTech(tech);
                  }}
                  className={`px-3.5 py-1.5 text-xs events-mono-btn rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    selectedTech === tech
                      ? 'bg-gradient-to-r from-[#55DFFF]/30 to-[#24BFEA]/25 text-white border border-[#55DFFF]/70 shadow-[0_0_16px_rgba(85,223,255,0.35)] font-bold'
                      : 'bg-[#08121A] text-slate-300 hover:text-white border border-white/[0.08] hover:border-[rgba(85,223,255,0.3)]'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>

            {/* Search Input: IBM Plex Mono */}
            <div className="relative w-full sm:w-auto sm:min-w-[240px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#08121A] border border-[rgba(85,223,255,0.2)] text-xs events-mono-btn text-white placeholder-slate-500 focus:outline-none focus:border-[#55DFFF] transition-colors"
              />
            </div>
          </div>

          {/* Publication State Filters (PRD 4.6 Requirement) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] events-mono-meta text-slate-500 uppercase tracking-widest shrink-0 mr-1">
              STATUS:
            </span>
            {stateFilters.map((st) => {
              const active = selectedState === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    try { audioManager.playClick(); } catch {}
                    setSelectedState(st.id);
                  }}
                  className={`px-3 py-1 text-[11px] events-mono-meta rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#FFFFFF]/20 text-[#FFFFFF] border border-[#FFFFFF]/50 font-semibold'
                      : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="p-5 sm:p-7 rounded-2xl bg-[#08121A]/95 border border-[rgba(85,223,255,0.18)] hover:border-[#55DFFF]/50 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.65)] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="events-mono-meta px-2.5 py-0.5 rounded-full bg-[#55DFFF]/15 border border-[#55DFFF]/35 text-[#55DFFF] font-semibold">
                    {proj.category}
                  </span>
                  <span className="events-mono-meta px-2.5 py-0.5 rounded-full bg-signal-green/15 border border-signal-green/35 text-signal-green font-semibold uppercase">
                    {proj.status || 'Published'}
                  </span>
                </div>

                <h3 className="font-3d-slade font-labeouf text-xl sm:text-2xl text-white group-hover:text-[#55DFFF] transition-colors mb-3 tracking-wide">
                  {proj.title}
                </h3>

                {/* Problem Statement (PRD 4.6 requirement) */}
                <div className="mb-3.5 p-3 sm:p-3.5 rounded-xl bg-[#050C12]/90 border border-white/[0.06]">
                  <span className="block font-barlow-condensed font-bold text-[11px] sm:text-xs tracking-wider text-[#24BFEA] mb-1 uppercase">
                    THE PROBLEM
                  </span>
                  <p className="text-slate-300 text-xs sm:text-[12.5px] leading-relaxed">
                    {proj.problem || `Overcoming latency, memory bottlenecks, and lack of reproducible open implementations in ${proj.category}.`}
                  </p>
                </div>

                {/* Short Explanation */}
                <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed mb-5">
                  {proj.description}
                </p>

                {/* Benchmarks Matrix */}
                {proj.benchmarks && proj.benchmarks.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#050C12] border border-[rgba(85,223,255,0.14)] mb-5 text-center">
                    {proj.benchmarks.map((b, idx) => (
                      <div key={idx} className="p-1">
                        <span className="block events-mono-meta text-slate-400 mb-0.5">
                          {b.metric}
                        </span>
                        <span className="text-xs font-events-mono font-bold text-[#55DFFF]">
                          {b.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.technologies.map((t) => (
                    <span
                      key={t}
                      className="events-mono-meta px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links & Approved Contributors */}
              <div className="pt-4 border-t border-[rgba(85,223,255,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="events-mono-meta text-slate-400 truncate text-[10px]">
                  Contributors: <strong className="text-white">{proj.contributors.join(', ')}</strong>
                </span>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="events-mono-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-[#55DFFF]/15 text-white hover:text-[#55DFFF] transition-all border border-white/[0.12] hover:border-[#55DFFF]/40"
                      title="Verified GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5 text-[#55DFFF]" />
                      <span className="font-3d-slade font-labeouf text-xs tracking-wider">CODE</span>
                    </a>
                  )}
                  {proj.liveDemo && (
                    <a
                      href={proj.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="events-mono-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#24BFEA] via-[#55DFFF] to-[#38C9E8] hover:brightness-110 text-[#050C12] font-black transition-all shadow-[0_0_18px_rgba(85,223,255,0.35)]"
                      title="Live Interactive Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#050C12]" />
                      <span className="font-3d-slade font-labeouf text-xs tracking-wider">DEMO</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
