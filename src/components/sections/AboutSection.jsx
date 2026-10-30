'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { clubPillars } from '@/data/teamData';
import { ArrowUpRight, Cpu, Atom, MessagesSquare, Trophy } from 'lucide-react';

const iconMap = {
  Cpu: Cpu,
  Atom: Atom,
  MessagesSquare: MessagesSquare,
  Trophy: Trophy,
};

export function AboutSection() {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section id="about" className="relative py-28 px-6 sm:px-8 border-t border-white/10 bg-[#070B11]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Indicator */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-phoenix-blue uppercase">
            02 // ETHOS & ARCHITECTURE
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-phoenix-blue/30 via-white/10 to-transparent" />
        </div>

        {/* Asymmetrical Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Editorial Manifesto (PRD Section 3.5) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-primary leading-[1.08]">
              Where Curiosity Meets <span className="text-gradient-cyan">First-Principles</span> Engineering.
            </h2>

            <p className="text-base text-secondary font-sans leading-relaxed">
              We operate as a distributed collegiate research collective rather than a lecture series. We reject surface-level wrappers in favor of foundational comprehension: backpropagating through raw matrix tensors, compiling custom Triton CUDA kernels, and auditing model alignment.
            </p>

            <div className="pt-4 p-6 bg-navy-deep/60 border-l-2 border-phoenix-blue space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-phoenix-cyan">
                The Phoenix Doctrine
              </span>
              <p className="text-sm font-sans text-primary italic leading-relaxed">
                "Build in the open, verify every metric, and never treat an opaque model as magic when you can inspect the weights."
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-xs font-mono text-phoenix-cyan hover:underline uppercase tracking-wider"
              >
                <span>Discover Upcoming Workshops & Sprints</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Indexed Vectors (PRD Section 3.5) */}
          <div className="lg:col-span-7 space-y-3">
            {clubPillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon] || Cpu;
              const isActive = activePillar === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActivePillar(index)}
                  className={`group p-6 transition-all duration-300 border-b border-white/10 cursor-pointer ${
                    isActive ? 'bg-navy-deep/50 border-phoenix-blue/40' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-5">
                      <span className="text-sm font-mono text-phoenix-blue font-semibold pt-0.5">
                        0{index + 1}
                      </span>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-phoenix-cyan' : 'text-secondary'}`} />
                          <h3 className={`text-xl font-display font-bold tracking-wide transition-colors ${
                            isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'
                          }`}>
                            {pillar.title}
                          </h3>
                        </div>
                        <p className="text-sm text-secondary font-sans leading-relaxed max-w-xl">
                          {pillar.description}
                        </p>
                      </div>
                    </div>

                    <span className="hidden sm:inline-block text-[11px] font-mono text-secondary/70 shrink-0 pt-1">
                      {pillar.metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
