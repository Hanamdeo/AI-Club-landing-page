'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code,
  Github,
  ExternalLink,
  ChevronRight,
  Cpu,
  Layers,
  Search,
  Sparkles,
} from 'lucide-react';
import { getAllProjects } from '@/lib/contentSelectors';
import { audioManager } from '@/utils/audioManager';

export default function ProjectsPage() {
  const projects = getAllProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');

  const allTechs = ['All', 'Rust', 'CUDA', 'WebGPU', 'PyTorch', 'vLLM', 'FastAPI'];

  const filteredProjects = projects.filter((p) => {
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
    <main className="relative min-h-screen bg-[#0A0E10] text-[#E6E2D8] font-sans pt-28 pb-24 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-facility-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(36,191,234,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 font-mono text-[10px] text-slate-400 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#A7B7A1] transition-colors">
            FACILITY
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-[#A7B7A1] font-semibold">ENGINEERING // PROJECTS</span>
        </div>

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-full bg-[#131718] border border-white/[0.1] text-[10px] font-mono tracking-widest text-[#A7B7A1] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#24BFEA] animate-pulse shadow-[0_0_8px_#24BFEA]" />
              <span>SHIPPED SYSTEMS & OPEN MODELS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-labeouf font-bold tracking-wider text-gradient-cyber leading-none">
              PROJECT ARCHIVE
            </h1>
            <p className="text-sm sm:text-base text-[#B5B8AF] font-normal mt-3 max-w-2xl leading-relaxed">
              Open-source model serving engines, real-time spatial renderers, and verified benchmarks engineered by AI Club students.
            </p>
          </div>

          <div className="p-4 px-6 rounded-2xl bg-[#121617]/90 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-start md:self-auto text-right">
            <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              SHIPPED REPOSITORIES
            </span>
            <span className="text-3xl font-bold font-labeouf text-[#24BFEA] tracking-wider">
              {projects.length} Systems
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => {
                  try { audioManager.playClick(); } catch {}
                  setSelectedTech(tech);
                }}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  selectedTech === tech
                    ? 'bg-[#24BFEA]/20 text-[#24BFEA] border border-[#24BFEA]/50 shadow-[0_0_12px_rgba(36,191,234,0.3)] font-semibold'
                    : 'bg-[#121617] text-slate-400 hover:text-white border border-white/[0.08]'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121617] border border-white/[0.08] focus:border-[#24BFEA]/50 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-ivory placeholder:text-slate-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl p-7 bg-[#121617]/90 border border-white/[0.08] hover:border-[#24BFEA]/40 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#A7B7A1]">
                    {proj.category}
                  </span>
                  <span className="text-[9px] font-mono text-signal-green px-2 py-0.5 rounded-full bg-signal-green/15 border border-signal-green/30">
                    {proj.status}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-labeouf font-bold text-ivory mb-3">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                  {proj.description}
                </p>

                {/* Benchmarks Matrix */}
                {proj.benchmarks && proj.benchmarks.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0D1011] border border-white/[0.04] mb-6 text-center">
                    {proj.benchmarks.map((b, idx) => (
                      <div key={idx} className="p-1">
                        <span className="block text-[8px] font-mono text-slate-500 uppercase">
                          {b.metric}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#24BFEA]">
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
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-slate-400 border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-slate-500 truncate">
                  By {proj.contributors.join(', ')}
                </span>

                <div className="flex items-center gap-2">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-ivory transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>CODE</span>
                    </a>
                  )}
                  {proj.liveDemo && (
                    <a
                      href={proj.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24BFEA] hover:bg-[#38BDF8] text-xs font-mono text-[#0A0E10] font-bold transition-colors"
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
