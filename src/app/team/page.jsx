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
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { TEAM_MEMBERS } from '@/data/team';
import { audioManager } from '@/utils/audioManager';

export default function TeamPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Cadre' },
    { id: 'faculty', label: 'Faculty Advisors' },
    { id: 'lead', label: 'Student Leads' },
    { id: 'domain-lead', label: 'Domain Specialists' },
  ];

  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    if (selectedFilter === 'all') return true;
    return m.category === selectedFilter;
  });

  return (
    <main className="relative min-h-screen bg-[#07090A] text-white font-manrope pt-28 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Ambience */}
      <div className="absolute inset-0 bg-facility-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(85,223,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(36,191,234,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[rgba(85,223,255,0.18)] pb-8">
          <div>
           
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-barlow-condensed font-bold uppercase tracking-tight text-white leading-tight">
              THE PEOPLE
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-manrope mt-3 max-w-2xl leading-relaxed">
              Approved faculty mentors, student coordinators, and technical domain specialists directing machine intelligence initiatives at MITS Gwalior.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="p-4 px-6 rounded-2xl bg-[#0C1014]/90 border border-[rgba(85,223,255,0.22)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-start md:self-auto text-left md:text-right">
            <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              CONFIRMED MEMBERS
            </span>
            <span className="text-3xl font-barlow-condensed font-bold text-[#55DFFF] tracking-wider block">
              {TEAM_MEMBERS.length} RESEARCHERS
            </span>
            <span className="text-[10px] font-mono text-[#24BFEA]">Verified Academic Cadre</span>
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
                    ? 'bg-[rgba(85,223,255,0.18)] text-white border border-[#55DFFF] shadow-[0_0_12px_rgba(85,223,255,0.35)] font-semibold'
                    : 'bg-[#0C1014] text-slate-400 hover:text-white border border-[rgba(85,223,255,0.14)]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredMembers.map((member) => {
            const isFaculty = member.category === 'faculty';

            return (
              <div
                key={member.id}
                className={`rounded-2xl p-6 bg-[#0C1014]/90 border transition-all duration-300 flex flex-col justify-between ${
                  isFaculty
                    ? 'border-[#55DFFF]/45 shadow-[0_4px_24px_rgba(85,223,255,0.15)]'
                    : 'border-[rgba(85,223,255,0.18)] hover:border-[#55DFFF]/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                }`}
              >
                <div>
                  {/* Top Avatar & Domain Badge */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#12161A] border border-[rgba(85,223,255,0.3)] flex items-center justify-center font-barlow-condensed text-2xl font-bold text-[#55DFFF] shadow-[0_0_12px_rgba(85,223,255,0.2)]">
                      {member.initials}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[rgba(85,223,255,0.1)] border border-[rgba(85,223,255,0.25)] text-[#24BFEA] font-semibold">
                        {member.domain}
                      </span>
                      {isFaculty && (
                        <span className="text-[9px] font-mono text-signal-green flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>FACULTY ADVISOR</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-xl sm:text-2xl font-barlow-condensed font-bold uppercase text-white mb-1 tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono font-medium text-[#55DFFF] mb-1">
                    {member.role}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mb-4">
                    {member.department}
                  </p>

                  {/* Bio */}
                  <p className="text-xs text-slate-300 font-manrope leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Social Channels */}
                <div className="flex items-center gap-2 pt-4 border-t border-[rgba(85,223,255,0.14)]">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.04] hover:bg-[rgba(85,223,255,0.2)] text-slate-400 hover:text-white transition-colors"
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
                      className="p-2 rounded-lg bg-white/[0.04] hover:bg-[rgba(85,223,255,0.2)] text-slate-400 hover:text-white transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg bg-white/[0.04] hover:bg-[rgba(85,223,255,0.2)] text-slate-400 hover:text-white transition-colors"
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

        {/* Verification Note (PRD 4.2 Compliance) */}
        <div className="p-4 rounded-xl bg-[#0C1014]/70 border border-white/[0.08] text-[11px] font-mono text-slate-400 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-signal-green shrink-0" />
            <span>All leadership roles and faculty advisor appointments have been officially confirmed and documented.</span>
          </div>
          <Link href="/about" className="text-[#55DFFF] hover:text-white flex items-center gap-1 shrink-0">
            <span>ABOUT CHARTER</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </main>
  );
}
