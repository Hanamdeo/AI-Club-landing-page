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
  Cpu,
  Sparkles,
} from 'lucide-react';
import { TEAM_MEMBERS } from '@/data/team';
import { audioManager } from '@/utils/audioManager';

export default function TeamPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Collective' },
    { id: 'faculty', label: 'Faculty Mentors' },
    { id: 'lead', label: 'Club Leadership' },
    { id: 'domain-lead', label: 'Domain Leads' },
  ];

  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    if (selectedFilter === 'all') return true;
    return m.category === selectedFilter;
  });

  return (
    <main className="relative min-h-screen bg-[#0A0E10] text-[#E6E2D8] font-sans pt-28 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-facility-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(162,178,159,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 font-mono text-[10px] text-slate-400 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#A7B7A1] transition-colors">
            FACILITY
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-[#A7B7A1] font-semibold">COLLECTIVE // THE TEAM</span>
        </div>

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-full bg-[#131718] border border-white/[0.1] text-[10px] font-mono tracking-widest text-[#A7B7A1] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_8px_#22C55E]" />
              <span>FACULTY MENTORS & STUDENT LEADERSHIP</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-labeouf font-bold tracking-wider text-gradient-cyber leading-tight sm:leading-none">
              THE PEOPLE
            </h1>
            <p className="text-sm sm:text-base text-[#B5B8AF] font-normal mt-3 max-w-2xl leading-relaxed">
              Faculty mentors, club leads, and domain researchers directing machine intelligence initiatives at MITS Gwalior.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="p-4 px-6 rounded-2xl bg-[#121617]/90 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-start md:self-auto text-right">
            <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              ACTIVE CADRE
            </span>
            <span className="text-3xl font-bold font-labeouf text-[#A7B7A1] tracking-wider">
              {TEAM_MEMBERS.length} Researchers
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-1">
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
                    ? 'bg-[#A7B7A1]/20 text-[#A7B7A1] border border-[#A7B7A1]/50 shadow-[0_0_12px_rgba(162,178,159,0.3)] font-semibold'
                    : 'bg-[#121617] text-slate-400 hover:text-white border border-white/[0.08]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => {
            const isFaculty = member.category === 'faculty';

            return (
              <div
                key={member.id}
                className={`rounded-2xl p-6 bg-[#121617]/90 border transition-all duration-300 flex flex-col justify-between ${
                  isFaculty
                    ? 'border-[#24BFEA]/40 shadow-[0_4px_24px_rgba(36,191,234,0.15)]'
                    : 'border-white/[0.08] hover:border-white/[0.2] shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                }`}
              >
                <div>
                  {/* Top Avatar & Badges */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#161B1C] border border-white/[0.12] flex items-center justify-center font-labeouf text-xl font-bold text-[#A7B7A1] shadow-[0_0_12px_rgba(162,178,159,0.2)]">
                      {member.initials}
                    </div>

                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400">
                      {member.domain}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-xl font-labeouf font-bold text-ivory mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono font-medium text-[#24BFEA] mb-2">
                    {member.role}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mb-4">
                    {member.department}
                  </p>

                  {/* Bio */}
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Social Channels */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
                      title="Institutional Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
