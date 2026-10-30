'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { clubPillars } from '@/data/teamData';
import { ArrowUpRight, Cpu, Atom, MessagesSquare, Trophy, ShieldCheck, Terminal } from 'lucide-react';
import { CircuitCard } from '@/components/ui/CircuitCard';

const iconMap = {
  Cpu: Cpu,
  Atom: Atom,
  MessagesSquare: MessagesSquare,
  Trophy: Trophy,
};

export function AboutSection() {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section id="about" className="relative py-28 px-6 sm:px-8 border-t border-[rgba(72,189,232,0.14)] bg-[#050507]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-circuit-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header Indicator with Monospace Index */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-circuit-cyan uppercase">
            02 // FIRST-PRINCIPLES ETHOS & ARCHITECTURE
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-circuit-cyan/30 via-[rgba(72,189,232,0.14)] to-transparent" />
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Manifesto Bento Cell (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <CircuitCard className="p-8 space-y-6" withTicks={true}>
              <div className="flex items-center gap-2 text-xs font-mono text-circuit-amber uppercase">
                <Terminal className="w-3.5 h-3.5" />
                <span>MANIFESTO // COLD-IRON VERIFICATION</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tightest text-text-primary leading-[1.05]">
                Where Curiosity Meets <span className="text-gradient-cyan">First-Principles</span> Engineering.
              </h2>

              <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed">
                We reject surface-level API wrappers in favor of foundational comprehension: backpropagating through raw matrix tensors, compiling custom Triton CUDA kernels, and auditing model alignment.
              </p>

              <div className="p-5 bg-[#080B10] border-l-2 border-circuit-cyan space-y-2 rounded-r-[4px]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-circuit-cyan">
                  The AI Club Engineering Doctrine
                </span>
                <p className="text-xs sm:text-sm font-sans text-text-primary italic leading-relaxed">
                  "Build in the open, verify every metric, and never treat an opaque model as magic when you can inspect the weights."
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 text-xs font-mono text-circuit-cyan hover:text-white uppercase tracking-wider group"
                >
                  <span className="group-hover:underline">Discover Upcoming Workshops & Sprints</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </CircuitCard>
          </div>

          {/* Right Column: Interactive Asymmetrical Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            {clubPillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon] || Cpu;
              const isActive = activePillar === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActivePillar(index)}
                  className={`group relative p-6 transition-all duration-300 rounded-[6px] border cursor-pointer ${
                    isActive
                      ? 'bg-[#0C0F14] border-circuit-cyan/50 shadow-[0_0_20px_-4px_rgba(72,189,232,0.25)]'
                      : 'bg-[#0C0F14]/40 border-[rgba(72,189,232,0.12)] hover:border-circuit-amber/40 hover:bg-[#0C0F14]/80'
                  }`}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className={`text-xs font-mono font-bold pt-0.5 ${isActive ? 'text-circuit-cyan' : 'text-circuit-amber'}`}>
                        0{index + 1} //
                      </span>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-circuit-cyan' : 'text-text-muted group-hover:text-circuit-amber'}`} />
                          <h3 className={`text-lg sm:text-xl font-display font-bold tracking-tight transition-colors ${
                            isActive ? 'text-text-primary' : 'text-text-muted group-hover:text-text-primary'
                          }`}>
                            {pillar.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed max-w-xl">
                          {pillar.description}
                        </p>
                      </div>
                    </div>

                    <span className="hidden sm:inline-block text-[11px] font-mono text-circuit-cyan/80 shrink-0 pt-1 border border-circuit-cyan/20 px-2 py-0.5 rounded-[3px] bg-circuit-cyan/5">
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
