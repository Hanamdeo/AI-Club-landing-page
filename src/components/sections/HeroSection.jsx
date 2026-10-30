'use client';

import React from 'react';
import { ArrowRight, Flame, Sparkles, Terminal, Activity } from 'lucide-react';
import { clubConfig } from '@/data/clubConfig';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-phoenix-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/6 w-64 h-64 bg-phoenix-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
          {/* Left Column: Editorial Headline & Mission */}
          <div className="lg:col-span-7 z-20 space-y-6 sm:space-y-8">
            {/* Top Node Status Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan" icon={Terminal}>
                CAMPUS NODE // {clubConfig.cohort}
              </Badge>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 border border-white/10 px-2.5 py-1 rounded-full bg-surface-100/60">
                <Activity className="w-3 h-3 text-phoenix-cyan animate-pulse" />
                <span>320+ Members Active</span>
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
                INTELLIGENCE. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-phoenix-cyan via-white to-blue-400">
                  IMAGINATION.
                </span> <br />
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-phoenix-cyan via-blue-500 to-phoenix-ember">
                  IGNITED.
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-phoenix-cyan via-transparent to-phoenix-ember opacity-60" />
                </span>
              </h1>
            </div>

            {/* Mission Statement Description */}
            <p className="text-base sm:text-lg text-gray-300 max-w-xl font-sans leading-relaxed">
              We are the premier artificial intelligence lab of {clubConfig.college}. Bridging cutting-edge deep learning theory, bare-metal GPU computing, and autonomous agents to build software that defines the next decade.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={Sparkles}
                href="#about"
              >
                Explore The Club
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={ArrowRight}
                href="#events"
              >
                Discover Our Events
              </Button>
            </div>

            {/* Stats Bar Ribbon */}
            <div className="pt-6 sm:pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {clubConfig.stats.map((stat, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono text-gray-400">
                    {stat.label}
                  </div>
                  <div className="text-[9px] font-mono text-phoenix-cyan/80">
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dedicated 3D Phoenix Target Area */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] lg:min-h-[550px] pointer-events-none">
            {/* The 3D Phoenix canvas renders over this in fixed coordinates. On mobile/fallback: */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Radial target rings */}
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-cyan-500/10 pointer-events-none" />
              <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-blue-500/15 pointer-events-none" />
              <div className="absolute w-40 h-40 rounded-full border border-dashed border-phoenix-cyan/20 animate-spin pointer-events-none duration-[40s]" />
              
              {/* Technical telemetry corner markers */}
              <div className="absolute top-4 left-4 text-[9px] font-mono text-cyan-400/40">
                LOC: PHOENIX_APEX // R3F_CORE
              </div>
              <div className="absolute bottom-4 right-4 text-[9px] font-mono text-gray-600">
                FOV: 45° // COBALT_EMISSIVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

