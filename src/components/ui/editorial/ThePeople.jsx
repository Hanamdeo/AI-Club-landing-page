'use client';

import React, { useState } from 'react';
import {
  Users,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
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
    <section id="team" className="relative w-full py-20 px-6 md:px-12 lg:px-16 border-t border-white/[0.08] font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 rounded-md bg-[#15191A] border border-white/[0.08] text-[11px] font-mono text-sage uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" />
              <span>Faculty & Student Cohort</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-ivory tracking-tight">
              THE PEOPLE
            </h2>
            <p className="text-sm sm:text-base text-ivory/70 font-light mt-2 max-w-2xl leading-relaxed">
              Student researchers, domain architects, and academic mentors driving all community research and computing initiatives.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-ivory/60 bg-[#141819] px-3.5 py-2 rounded-lg border border-white/[0.08] self-start md:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-sage" />
            <span>Verified MITS Academic Cohort</span>
          </div>
        </div>

        {/* Filter Role Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {ROLE_TABS.map((tab) => {
            const isActive = selectedRole === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  audioManager.playClick();
                  setSelectedRole(tab.key);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sage text-graphite font-semibold shadow-sm'
                    : 'bg-[#141819] text-ivory/70 border border-white/[0.08] hover:text-ivory hover:border-white/[0.16]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="relative rounded-xl bg-[#141819] border border-white/[0.08] hover:border-white/[0.16] p-5 transition-all duration-200 card-lift crosshair-corner flex flex-col justify-between group"
            >
              <div>
                {/* Initials Avatar Plate */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#181E1F] border border-white/[0.10] flex items-center justify-center font-mono font-bold text-sage text-sm shadow-sm">
                    {member.initials}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-ivory/50 uppercase">
                    {member.category}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-ivory mb-1 tracking-tight group-hover:text-sage transition-colors">
                  {member.name}
                </h3>

                {/* Role */}
                <div className="text-xs text-sage font-medium mb-0.5">
                  {member.role}
                </div>

                {/* Department */}
                <div className="text-[11px] text-ivory/50 font-mono mb-2.5">
                  {member.department}
                </div>

                {/* Domain Tag */}
                <div className="inline-block px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-ivory/70 mb-3">
                  {member.domain}
                </div>

                {/* Bio (Clamped to 2 lines to prevent content overflow) */}
                <p className="text-xs text-ivory/70 leading-relaxed font-normal mb-4 line-clamp-2">
                  {member.bio}
                </p>
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2 text-ivory/50">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] hover:text-ivory border border-white/[0.06] transition-colors btn-tactile cursor-pointer"
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
                    className="p-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] hover:text-ivory border border-white/[0.06] transition-colors btn-tactile cursor-pointer"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] hover:text-ivory border border-white/[0.06] transition-colors btn-tactile cursor-pointer"
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

