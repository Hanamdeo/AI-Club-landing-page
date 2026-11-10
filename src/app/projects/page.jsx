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
import RobotFace from '@/components/ui/RobotFace';

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
    <main className="relative min-h-screen bg-[#07090A] text-white font-manrope pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-facility-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-barlow-condensed font-bold uppercase tracking-tight text-white leading-tight">
              PROJECT ARCHIVE
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-manrope mt-3 max-w-2xl leading-relaxed">
              Open-source model serving engines, real-time spatial renderers, and verified benchmarks engineered by AI Club student cohorts.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="p-4 px-6 rounded-2xl bg-[#0C1014]/90 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-start md:self-auto flex items-center gap-4 text-left w-full sm:w-auto">
            <RobotFace variant="curious" size={50} className="shrink-0 drop-shadow-[0_2px_10px_rgba(85,223,255,0.25)]" />
            <div>
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                SHIPPED REPOSITORIES
              </span>
              {/* Place 1: Blue accent on counter */}
              <span className="text-3xl font-barlow-condensed font-bold text-[#55DFFF] tracking-wider block">
                0{projects.length} SYSTEMS
              </span>
              <span className="text-[10px] font-mono text-slate-400">100% Open Access</span>
            </div>
          </div>
        </div>

        {/* Filter Bar: Publication State & Technology Stack */}
        <div className="flex flex-col gap-3 mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Tech Stack Pills - Place 2: Active pill has subtle blue gradient */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {allTechs.map((tech) => {
                const active = selectedTech === tech;
                return (
                  <button
                    key={tech}
                    onClick={() => {
                      try { audioManager.playClick(); } catch {}
                      setSelectedTech(tech);
                    }}
                    className={`px-4 py-2 text-xs font-mono rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-gradient-to-r from-[#55DFFF] to-[#24BFEA] text-black font-bold shadow-[0_0_14px_rgba(85,223,255,0.3)]'
                        : 'bg-[#0C1014] text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-auto sm:min-w-[240px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0C1014] border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>

          {/* Publication State Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest shrink-0 mr-1">
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
                  className={`px-3 py-1 text-[11px] font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-white/15 text-white border border-white/30 font-semibold'
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
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-5 sm:p-7 rounded-2xl bg-[#0C1014]/90 border border-white/10 hover:border-white/20 transition-colors shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.06] text-white border border-white/10 font-semibold uppercase">
                    {proj.category}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-signal-green/15 border border-signal-green/35 text-signal-green font-semibold uppercase">
                    {proj.status || 'Published'}
                  </span>
                </div>

                <div className="flex items-start gap-3.5 mb-2">
                  {idx === 0 && (
                    <RobotFace variant="focused" size={44} className="shrink-0 mt-0.5 drop-shadow-[0_2px_8px_rgba(85,223,255,0.2)]" />
                  )}
                  <h3 className="text-xl sm:text-2xl font-barlow-condensed font-bold uppercase text-white tracking-tight flex-1">
                    {proj.title}
                  </h3>
                </div>

                {/* Problem Statement */}
                <div className="mb-3.5 p-3.5 rounded-xl bg-[#07090A]/80 border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1 font-semibold">
                    THE PROBLEM
                  </span>
                  <p className="text-xs text-slate-300 font-manrope leading-relaxed">
                    {proj.problem || `Overcoming latency, memory bottlenecks, and lack of reproducible open implementations in ${proj.category}.`}
                  </p>
                </div>

                {/* Short Explanation */}
                <p className="text-xs sm:text-sm text-slate-300 font-manrope leading-relaxed mb-5">
                  {proj.description}
                </p>

                {/* Benchmarks Matrix */}
                {proj.benchmarks && proj.benchmarks.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#07090A] border border-white/10 mb-5 text-center">
                    {proj.benchmarks.map((b, idx) => (
                      <div key={idx} className="p-1">
                        <span className="block text-[9px] font-mono text-slate-400 uppercase mb-0.5">
                          {b.metric}
                        </span>
                        <span className="text-xs font-mono font-bold text-white">
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
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links & Approved Contributors */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-slate-400 truncate">
                  Contributors: <strong className="text-white">{proj.contributors.join(', ')}</strong>
                </span>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-200 hover:text-white transition-colors"
                      title="Verified GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5 text-slate-300" />
                      <span>CODE</span>
                    </a>
                  )}
                  {proj.liveDemo && (
                    <a
                      href={proj.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#55DFFF] to-[#24BFEA] text-black font-bold text-xs font-mono shadow-[0_0_14px_rgba(85,223,255,0.3)] hover:brightness-110 transition-all"
                      title="Live Interactive Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>DEMO</span>
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
