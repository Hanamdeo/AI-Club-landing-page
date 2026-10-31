'use client';

import React from 'react';
import { teamHierarchy } from '@/data/teamData';
import { Github, Linkedin, ShieldCheck } from 'lucide-react';
import { CircuitCard } from '@/components/ui/CircuitCard';

export function TeamSection() {
  const tiers = [
    { title: "01. Executive Leadership", members: teamHierarchy.executive },
    { title: "02. Faculty Advisory", members: teamHierarchy.advisory },
    { title: "03. Departmental Heads", members: teamHierarchy.departmentHeads },
    { title: "04. Specialized Leads", members: teamHierarchy.subHeads },
  ];

  return (
    <section id="team" className="relative py-28 px-6 sm:px-8 bg-[#050507] border-t border-[rgba(72,189,232,0.14)]">
      {/* Background Cyber-Circuit Grid */}
      <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="text-xs font-mono tracking-widest text-circuit-cyan uppercase">
            05 // LEADERSHIP & ORGANIZATIONAL HIERARCHY
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-circuit-cyan/30 via-[rgba(72,189,232,0.14)] to-transparent" />
        </div>

        <div className="max-w-3xl mb-14 space-y-3">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tightest text-text-primary">
            Club Leadership & <span className="text-gradient-cyan">Hierarchy</span>.
          </h2>
          <p className="text-base text-text-muted font-sans leading-relaxed">
            The verified student systems architects, researchers, and faculty directors steering official AI Club initiatives and compute resources.
          </p>
        </div>

        {/* Structured Hierarchy Tiers */}
        <div className="space-y-12">
          {tiers.map((tierGroup, tierIdx) => (
            <div key={tierIdx} className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-circuit-amber uppercase tracking-wider font-semibold">
                  {tierGroup.title}
                </span>
                <div className="h-[1px] flex-1 bg-[rgba(72,189,232,0.14)]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tierGroup.members.map((member, memberIdx) => (
                  <CircuitCard
                    key={memberIdx}
                    className="p-6 flex flex-col justify-between"
                    withTicks={true}
                  >
                    <div className="space-y-4">
                      {/* Avatar & Specialty Tag */}
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 bg-[#080B10] border border-circuit-cyan/35 rounded-[4px] flex items-center justify-center text-circuit-cyan font-mono font-bold text-sm group-hover:border-circuit-cyan group-hover:shadow-[0_0_12px_rgba(72,189,232,0.3)] transition-all">
                          {member.avatarBadge}
                        </div>
                        <span className="text-[10px] font-mono text-text-muted bg-[#080B10] px-2.5 py-1 border border-[rgba(72,189,232,0.12)] rounded-[3px]">
                          {member.specialty}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-display font-bold text-text-primary group-hover:text-circuit-cyan transition-colors">
                          {member.name}
                        </h3>
                        <div className="text-xs font-mono text-circuit-amber mt-0.5">
                          {member.role}
                        </div>
                        <div className="text-[11px] font-mono text-text-muted mt-0.5">
                          {member.department}
                        </div>
                      </div>

                      <p className="text-xs text-text-muted font-sans leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    {/* Social & GitHub links */}
                    <div className="pt-4 border-t border-[rgba(72,189,232,0.12)] flex items-center justify-between text-xs font-mono mt-6">
                      <div className="flex items-center gap-2">
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 text-text-muted hover:text-circuit-cyan transition-colors"
                            aria-label={`${member.name} GitHub`}
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 text-text-muted hover:text-circuit-cyan transition-colors"
                            aria-label={`${member.name} LinkedIn`}
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <span className="text-[10px] font-mono text-circuit-cyan/70 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-circuit-cyan" />
                        <span>VERIFIED</span>
                      </span>
                    </div>
                  </CircuitCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
