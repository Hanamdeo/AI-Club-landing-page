'use client';

import React from 'react';
import { teamMembers } from '@/data/teamData';
import { Badge } from '@/components/ui/Badge';
import { Users, Github, Linkedin, Shield } from 'lucide-react';

export function TeamSection() {
  return (
    <section id="team" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#080B10] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <Badge variant="cyan" icon={Users}>
            07 // OPERATING CORPS & MENTORS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Leadership & <span className="text-phoenix-cyan">Research Council</span>.
          </h2>
          <p className="text-base text-gray-400 font-sans leading-relaxed">
            The student researchers, systems architects, and faculty mentors guiding the AI Club.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-surface-100/70 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Avatar Badge & Specialty */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-50 border border-cyan-500/30 flex items-center justify-center text-phoenix-cyan font-mono font-bold text-sm group-hover:scale-105 group-hover:border-phoenix-cyan transition-all shadow-glow-cyan/10">
                    {member.avatarBadge}
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 bg-surface-200/80 px-2 py-0.5 rounded border border-white/5">
                    {member.specialty}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-phoenix-cyan transition-colors mb-1">
                  {member.name}
                </h3>
                <div className="text-xs font-mono text-phoenix-cyan mb-3">
                  {member.role}
                </div>

                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
                <div className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>Verified Mentor</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

