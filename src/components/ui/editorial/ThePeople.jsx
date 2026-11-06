'use client';

import React, { useState } from 'react';
import {
  Users,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import { getTeamMembers } from '@/lib/contentSelectors';
import { audioManager } from '@/utils/audioManager';

const ROLE_TABS = [
  { key: 'all', label: 'All People' },
  { key: 'lead', label: 'Leadership' },
  { key: 'core', label: 'Research Leads' },
  { key: 'faculty', label: 'Faculty' },
  { key: 'contributor', label: 'Contributors' },
];

/**
 * Section 08: The People
 * Real student researchers, domain leads, and faculty advisors directing the AI Club.
 */
export default function ThePeople() {
  const members = getTeamMembers();
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredMembers =
    selectedRole === 'all'
      ? members
      : members.filter((m) => m.category === selectedRole);

  return (
    <section id="team" className="relative w-full py-24 px-6 md:px-12 lg:px-16 border-t border-white/10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-sage/10 border border-sage/30 text-xs font-mono text-sage uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Section 08 // The Collective</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-ivory tracking-tight">
              THE PEOPLE
            </h2>
            <p className="text-base sm:text-lg text-sage/90 font-light mt-2 max-w-2xl">
              Student researchers, domain architects, and academic mentors driving all community research and computing initiatives.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-black/40 px-4 py-2 rounded-xl border border-white/10 self-start md:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-sage" />
            <span>Verified Student & Faculty Cohort</span>
          </div>
        </div>

        {/* Filter Role Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
          {ROLE_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                audioManager.playClick();
                setSelectedRole(tab.key);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedRole === tab.key
                  ? 'bg-sage/20 border border-sage text-sage shadow-sage-glow font-semibold'
                  : 'bg-black/20 border border-white/10 text-ivory/70 hover:border-white/20 hover:text-ivory'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl bg-charcoal/40 border border-white/10 p-6 hover:border-sage/40 hover:bg-charcoal/60 transition-all flex flex-col justify-between shadow-glass-panel"
            >
              <div>
                {/* Initials Avatar Plate */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#121617] border border-sage/40 flex items-center justify-center font-mono font-bold text-sage text-base shadow-inner">
                    {member.initials}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-slate-400 uppercase">
                    {member.category}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-ivory mb-1 tracking-tight">
                  {member.name}
                </h3>

                {/* Role */}
                <div className="text-xs text-sage font-medium mb-1">
                  {member.role}
                </div>

                {/* Department */}
                <div className="text-[11px] text-slate-400 font-mono mb-3">
                  {member.department}
                </div>

                {/* Domain Tag */}
                <div className="inline-block px-2 py-0.5 rounded bg-black/40 border border-white/5 text-[10px] font-mono text-slate-300 mb-3">
                  {member.domain}
                </div>

                {/* Bio */}
                <p className="text-xs text-ivory/70 leading-relaxed font-normal mb-5 line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-slate-400">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-black/30 hover:bg-white/10 hover:text-ivory transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-black/30 hover:bg-white/10 hover:text-ivory transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-1.5 rounded-lg bg-black/30 hover:bg-white/10 hover:text-ivory transition-colors"
                    title="Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

