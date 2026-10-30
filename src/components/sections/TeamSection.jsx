'use client';

import React from 'react';
import { teamMembers } from '@/data/teamData';
import { Github, Linkedin, ShieldCheck, ArrowUpRight } from 'lucide-react';

export function TeamSection() {
  return (
    <section id="team" className="relative py-32 px-6 sm:px-8 bg-[#070B11] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-phoenix-blue uppercase">
            07 // OPERATING CORPS & COUNCIL
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-phoenix-blue/30 via-white/10 to-transparent" />
        </div>

        <div className="max-w-3xl mb-14 space-y-3">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            Leadership & <span className="text-gradient-cyan">Research Council</span>.
          </h2>
          <p className="text-base text-secondary font-sans leading-relaxed">
            The student systems architects, researchers, and faculty mentors stewarding PHOENIX AI LAB.
          </p>
        </div>

        {/* Editorial Council Directory (NOT repetitive card spam) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group p-8 bg-navy-deep/60 border border-white/10 hover:border-phoenix-blue/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Monogram Avatar & Specialty Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-navy-surface border border-phoenix-blue/40 flex items-center justify-center text-phoenix-cyan font-mono font-bold text-sm group-hover:scale-105 group-hover:border-phoenix-blue transition-all">
                    {member.avatarBadge}
                  </div>
                  <span className="text-[10px] font-mono text-secondary bg-white/5 px-2.5 py-1 border border-white/5">
                    {member.specialty}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-primary group-hover:text-phoenix-cyan transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono text-phoenix-blue mt-0.5">
                    {member.role}
                  </div>
                </div>

                <p className="text-sm text-secondary font-sans leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Verified Credential & Links */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono mt-6">
                <div className="flex items-center gap-2">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-secondary hover:text-primary transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-secondary hover:text-primary transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
                <div className="text-[10px] font-mono text-secondary flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Lead</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
