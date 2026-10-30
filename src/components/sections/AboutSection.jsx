'use client';

import React from 'react';
import { Cpu, Atom, MessagesSquare, Trophy, ShieldCheck, Zap } from 'lucide-react';
import { clubPillars } from '@/data/teamData';
import { Badge } from '@/components/ui/Badge';

const iconMap = {
  Cpu: Cpu,
  Atom: Atom,
  MessagesSquare: MessagesSquare,
  Trophy: Trophy,
};

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#080B10]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <Badge variant="cyan">
            01 // CORE ARCHITECTURE & ETHOS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Beyond the Algorithm. <br />
            Where Human Curiosity Meets <span className="text-phoenix-cyan">Machine Intelligence</span>.
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-sans leading-relaxed">
            We are not a passive lecture series. PHOENIX operates like a distributed research collective and collegiate skunkworks. We reject surface-level prompt wrappers in favor of first-principles understanding: neural architecture dissection, custom kernel optimization, and empirical alignment.
          </p>
        </div>

        {/* Four Foundational Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon] || Zap;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-lg bg-surface-100/70 border border-white/5 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-glow-cyan/20 flex flex-col justify-between"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-phoenix-cyan/5 rounded-full blur-2xl group-hover:bg-phoenix-cyan/15 transition-all" />

                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-50 border border-cyan-500/20 flex items-center justify-center text-phoenix-cyan mb-6 group-hover:scale-105 group-hover:border-phoenix-cyan transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-phoenix-cyan transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span className="text-phoenix-cyan">{pillar.metric}</span>
                  <span className="text-gray-600">0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Club Code of Engineering Standards */}
        <div className="mt-12 p-6 sm:p-8 rounded-lg bg-gradient-to-r from-surface-200 via-surface-100 to-surface-200 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-phoenix-cyan uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Our Operating Principle</span>
            </div>
            <p className="text-sm sm:text-base text-gray-200 font-sans">
              "Build in the open, verify every metric, and never pretend a black-box model is magic when you can inspect the weights."
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="px-3 py-1.5 rounded bg-black/40 border border-cyan-500/30 text-xs font-mono text-phoenix-cyan">
              OPEN SOURCE // VERIFIABLE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

