'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, UserPlus, Terminal, Cpu } from 'lucide-react';
import { clubConfig } from '@/data/clubConfig';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  const isRecruitmentOpen = clubConfig.recruitment?.isOpen;

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 overflow-hidden bg-[#050507]"
    >
      {/* Background Cyber-Circuit Grid with Radial Mask */}
      <div className="absolute inset-0 bg-circuit-grid pointer-events-none" />

      {/* Ambient Depth Nodes */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-circuit-cyan/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-circuit-amber/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[74vh]">
          {/* Left Column: Bold Editorial Headline, Mission & Actions */}
          <div className="lg:col-span-7 z-20 space-y-8">
            {/* Campus Node & Recruitment Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0C0F14] border border-[rgba(72,189,232,0.18)] rounded-[4px] text-[11px] font-mono tracking-widest uppercase text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-circuit-cyan animate-pulse" />
                <span>{clubConfig.college ? clubConfig.college.split('&')[0].trim() : 'AI CLUB RESEARCH'} // COHORT {clubConfig.cohort || '2026-2027'}</span>
              </div>

              {isRecruitmentOpen && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-circuit-amber/10 border border-circuit-amber/40 rounded-[4px] text-[10px] font-mono uppercase tracking-wider text-circuit-amber">
                  <span className="w-1.5 h-1.5 rounded-full bg-circuit-amber animate-ping" />
                  <span>{clubConfig.recruitment?.badge || 'Applications Active'}</span>
                </div>
              )}
            </div>

            {/* Main Editorial Headline with tight letter-spacing (-0.03em) */}
            <div className="space-y-1">
              <h1 className="font-display text-5xl sm:text-7xl xl:text-8xl font-bold tracking-tightest text-text-primary leading-[0.95]">
                INTELLIGENCE.<br />
                <span className="text-gradient-cyan">IMAGINATION.</span><br />
                <span className="relative inline-flex items-center">
                  IGNITED.
                  <span className="text-circuit-amber ml-2 text-3xl sm:text-5xl font-light">✦</span>
                </span>
              </h1>
            </div>

            {/* Editorial Mission Statement */}
            <p className="text-base sm:text-lg text-text-muted max-w-xl font-sans leading-relaxed font-normal">
              A student-led collegiate research collective bridging foundational deep learning theory, custom CUDA compiler kernels, and autonomous agent swarms. We construct systems that expand human agency.
            </p>

            {/* Action CTAs with spring physics hover states */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={Sparkles}
                href="/events"
              >
                Explore Sprints
              </Button>

              {isRecruitmentOpen ? (
                <Button
                  variant="secondary"
                  size="lg"
                  icon={UserPlus}
                  href={clubConfig.recruitment?.applicationUrl || '/events'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply to Join
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  icon={ArrowRight}
                  href="#about"
                >
                  About The Lab
                </Button>
              )}
            </div>

            {/* Asymmetrical Bento Telemetry Bar with Exposed Hairlines and Corner Ticks */}
            <div className="pt-8 mt-2 border-t border-[rgba(72,189,232,0.14)] grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
              {/* Corner tick at telemetry boundary */}
              <span className="absolute -top-1.5 -left-1 font-mono text-[10px] text-circuit-cyan/40 pointer-events-none">+</span>
              <span className="absolute -top-1.5 -right-1 font-mono text-[10px] text-circuit-amber/40 pointer-events-none">+</span>

              {clubConfig.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#0C0F14]/60 border border-[rgba(72,189,232,0.12)] rounded-[4px] space-y-1 hover:border-circuit-cyan/40 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-display font-bold text-text-primary tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Breathing Room Target for the 3D Phoenix & Circuit HUD */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] lg:min-h-[580px] pointer-events-none">
            {/* Ambient Radial Depth Frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-circuit-cyan/[0.08] blur-3xl" />
              <div className="w-48 h-48 rounded-full bg-circuit-amber/[0.06] blur-2xl" />
            </div>

            {/* Technical Circuit Coordinate Reticle */}
            <div className="absolute top-4 right-4 text-[10px] font-mono text-text-muted/40 hidden sm:flex items-center gap-2 border border-[rgba(72,189,232,0.12)] px-2.5 py-1 bg-[#0C0F14]/70 rounded-[3px]">
              <span className="w-1.5 h-1.5 rounded-full bg-circuit-cyan animate-pulse" />
              <span>+ 40.7128° N, 74.0060° W // NODE: AI-CLUB-CORE</span>
            </div>

            <div className="absolute bottom-6 left-4 text-[10px] font-mono text-text-muted/40 hidden sm:block">
              // TELEMETRY: 2.4 TFLOPS // CLUSTER SYNC
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
