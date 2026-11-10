'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  CheckCircle2,
  GitBranch,
  LayoutGrid,
  ArrowRight,
} from 'lucide-react';
import { TEAM_MEMBERS } from '@/data/team';
import TeamHierarchyTree from '@/components/ui/TeamHierarchyTree';
import CadreOrganicCard from '@/components/ui/CadreOrganicCard';
import { audioManager } from '@/utils/audioManager';
import RobotFace from '@/components/ui/RobotFace';

export default function TeamPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Cadre' },
    { id: 'lead', label: 'Leadership' },
    { id: 'core', label: 'Core Heads' },
    { id: 'coordinator', label: 'Sub-Heads & Coordinators' },
    { id: 'faculty', label: 'Faculty Advisors' },
  ];

  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    if (selectedFilter === 'all') return true;
    return m.category === selectedFilter;
  });

  return (
    <main className="relative min-h-screen bg-[#07090A] text-white font-manrope pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Ambience */}
      <div className="absolute inset-0 bg-facility-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
       

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[rgba(255,255,255,0.18)] pb-8">
          <div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-barlow-condensed font-bold uppercase tracking-tight text-white leading-tight">
              THE PEOPLE
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-manrope mt-3 max-w-2xl leading-relaxed">
              Approved faculty mentors, student leadership, core domain architects, and departmental coordinators directing machine intelligence initiatives at MITS Gwalior.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="p-3.5 sm:p-4 px-4 sm:px-6 rounded-2xl bg-[#0C1014]/90 border border-[rgba(255,255,255,0.22)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-start md:self-auto text-left md:text-right w-full sm:w-auto">
            <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              CONFIRMED MEMBERS
            </span>
            <span className="text-2xl sm:text-3xl font-barlow-condensed font-bold text-white tracking-wider block">
              {TEAM_MEMBERS.length} RESEARCHERS
            </span>
            <span className="text-[10px] font-mono text-[#E2E8F0]">Verified Academic Cadre</span>
          </div>
        </div>

        {/* View Mode Switcher: Hierarchy Tree vs Cadre Directory */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center p-1 rounded-xl bg-[#0C1014] border border-white/20 self-start">
            <button
              onClick={() => {
                try { audioManager.playClick(); } catch {}
                setViewMode('hierarchy');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                viewMode === 'hierarchy'
                  ? 'bg-white text-black font-bold shadow-[0_0_16px_rgba(255,255,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>HIERARCHY TREE</span>
            </button>
            <button
              onClick={() => {
                try { audioManager.playClick(); } catch {}
                setViewMode('grid');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-black font-bold shadow-[0_0_16px_rgba(255,255,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>CADRE DIRECTORY</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: INTERACTIVE HIERARCHY TREE                             */}
        {/* ============================================================== */}
        {viewMode === 'hierarchy' && (
          <div className="mb-14">
            <TeamHierarchyTree />
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: CADRE DIRECTORY GRID WITH FILTERS                      */}
        {/* ============================================================== */}
        {viewMode === 'grid' && (
          <div className="mb-14">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 mb-8 sm:mb-12 pb-4 border-b border-white/10 overflow-x-auto no-scrollbar">
              {categories.map((cat) => {
                const active = selectedFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      try { audioManager.playClick(); } catch {}
                      setSelectedFilter(cat.id);
                    }}
                    className={`px-4 py-2 text-xs font-mono rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#E6E2D8] text-black border border-[#E6E2D8] shadow-[0_0_16px_rgba(230,226,216,0.35)] font-bold'
                        : 'bg-[#0C1014] text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Editorial Studio Team Directory Grid (4 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 sm:gap-y-16 py-4">
              {filteredMembers.map((member, idx) => (
                <CadreOrganicCard
                  key={member.id}
                  member={member}
                  index={idx}
                />
              ))}
            </div>
          </div>
        )}

        {/* Verification Note (PRD 4.2 Compliance) */}
        <div className="p-4 rounded-xl bg-[#0C1014]/70 border border-white/[0.08] text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-signal-green shrink-0" />
            <span>All leadership roles, core heads, and sub-head appointments have been officially confirmed and documented.</span>
          </div>
          <Link href="/about" className="text-white hover:text-slate-300 flex items-center gap-1 shrink-0">
            <span>ABOUT CHARTER</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </main>
  );
}
