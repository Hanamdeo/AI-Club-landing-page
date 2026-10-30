'use client';

import React from 'react';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { clubConfig } from '@/data/clubConfig';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 overflow-hidden bg-vignette"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[72vh]">
          {/* Left Column: Bold Editorial Headline, Mission & Actions */}
          <div className="lg:col-span-7 z-20 space-y-8">
            {/* Minimal Campus Node Marker */}
            <div className="inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-phoenix-blue animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-secondary">
                {clubConfig.college} // COHORT {clubConfig.cohort}
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-1">
              <h1 className="font-display text-5xl sm:text-7xl xl:text-8xl font-bold tracking-tight text-primary leading-[0.96]">
                INTELLIGENCE.<br />
                <span className="text-gradient-cyan">IMAGINATION.</span><br />
                <span className="relative inline-flex items-center">
                  IGNITED.
                  <span className="text-phoenix-orange ml-2 text-3xl sm:text-5xl font-light">✦</span>
                </span>
              </h1>
            </div>

            {/* Editorial Mission Statement */}
            <p className="text-base sm:text-lg text-secondary max-w-xl font-sans leading-relaxed font-normal">
              A student-led skunkworks bridging foundational deep learning theory, custom kernel compilation, and autonomous agent swarms. We construct systems that expand human agency.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={Sparkles}
                href="#about"
              >
                Enter The Lab
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={ArrowRight}
                href="#events"
              >
                Explore Sprints
              </Button>
            </div>

            {/* Minimal Telemetry Metrics - Clean Typography, NOT Cards */}
            <div className="pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {clubConfig.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-primary tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-secondary">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Breathing Room Target for the 3D Phoenix */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] lg:min-h-[580px] pointer-events-none">
            {/* Ambient Radial Depth Frame */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Subtle architectural framing markers */}
              <div className="absolute top-2 right-2 text-[10px] font-mono text-secondary/40 tracking-widest">
                [ PHOENIX // 01 ]
              </div>
              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-secondary/30 tracking-wider">
                + SKELETAL GLB ACTIVE +
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
