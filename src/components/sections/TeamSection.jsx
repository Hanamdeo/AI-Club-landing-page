'use client';

import React from 'react';
import { teamHierarchy } from '@/data/teamData';
import { Github, Linkedin, ShieldCheck } from 'lucide-react';

export function TeamSection() {
  const tiers = [
    { title: "01. Executive Leadership", members: teamHierarchy.executive },
    { title: "02. Faculty Advisory", members: teamHierarchy.advisory },
    { title: "03. Departmental Heads", members: teamHierarchy.departmentHeads },
    { title: "04. Specialized Leads", members: teamHierarchy.subHeads },
  ];

  return (
    <section id="team" className="relative py-28 px-6 sm:px-8 bg-[#070B11] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="text-xs font-mono tracking-widest text-phoenix-blue uppercase">
            05 // LEADERSHIP & ORGANIZATIONAL HIERARCHY
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-phoenix-blue/30 via-white/10 to-transparent" />
        </div>

        <div className="max-w-3xl mb-14 space-y-3">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            Club Leadership & <span className="text-gradient-cyan">Hierarchy</span>.
          </h2>
          <p className="text-base text-secondary font-sans leading-relaxed">
            The verified student systems architects, researchers, and faculty directors steering the official AI Club initiatives and compute resources.
          </p>
        </div>

        {/* Structured Hierarchy Tiers (PRD Section 3.8) */}
        <div className="space-y-12">
          {tiers.map((tierGroup, tierIdx) => (
            <div key={tierIdx} className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-phoenix-cyan uppercase tracking-wider font-semibold">
                  {tierGroup.title}
                </span>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tierGroup.members.map((member, memberIdx) => (
                  <div
                    key={memberIdx}
                    className="group p-6 bg-navy-deep/60 border border-white/10 hover:border-phoenix-blue/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Avatar & Specialty Tag */}
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 bg-navy-surface border border-phoenix-blue/40 flex items-center justify-center text-phoenix-cyan font-mono font-bold text-sm group-hover:border-phoenix-blue transition-colors">
                          {member.avatarBadge}
                        </div>
                        <span className="text-[10px] font-mono text-secondary bg-white/5 px-2.5 py-1 border border-white/5">
                          {member.specialty}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-display font-bold text-primary group-hover:text-phoenix-cyan transition-colors">
                          {member.name}
                        </h3>
                        <div className="text-xs font-mono text-phoenix-blue mt-0.5">
                          {member.role}
                        </div>
                        <div className="text-[11px] font-mono text-secondary/70 mt-0.5">
                          {member.department}
                        </div>
                      </div>

                      <p className="text-xs text-secondary font-sans leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    {/* Social & GitHub links */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono mt-6">
                      <div className="flex items-center gap-2">
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-secondary hover:text-primary transition-colors"
                          aria-label={`${member.name} GitHub`}
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-secondary hover:text-primary transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <span className="text-[10px] font-mono text-secondary/60">
                        {member.tier}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
