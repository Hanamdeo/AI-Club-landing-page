'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, ArrowRight, Terminal, Cpu, Radio } from 'lucide-react';
import { galleryItems } from '@/data/galleryData';
import { Button } from '@/components/ui/Button';
import { CircuitCard } from '@/components/ui/CircuitCard';

export function ClubStorySection() {
  const storyHighlights = galleryItems.slice(0, 3);

  return (
    <section id="story" className="relative py-28 px-6 sm:px-8 bg-[#050507] border-t border-[rgba(72,189,232,0.14)] overflow-hidden">
      {/* Background Cyber-Circuit Grid */}
      <div className="absolute inset-0 bg-circuit-grid opacity-50 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-circuit-cyan/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Monospace Index */}
        <div className="flex items-center gap-4 mb-14">
          <span className="text-xs font-mono tracking-widest text-circuit-cyan uppercase">
            01 // ARCHIVAL CODEX & FIELD MOMENTS
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-circuit-cyan/30 via-[rgba(72,189,232,0.14)] to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest text-text-primary">
              Moments from the <span className="text-gradient-cyan">Frontier</span>.
            </h2>
            <p className="text-base text-text-muted font-sans leading-relaxed">
              Candid field notes from late-night compute sprints, bare-metal kernel profiling sessions, and live debater dialectics.
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            icon={ArrowRight}
            href="/gallery"
          >
            View Full Archive
          </Button>
        </div>

        {/* Asymmetrical Bento Grid with Structural Hairlines and Corner Ticks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Panoramic Bento Cell (7 Cols) */}
          <div className="md:col-span-7">
            <CircuitCard className="h-full p-8 flex flex-col justify-between" withTicks={true}>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="px-2.5 py-0.5 bg-circuit-cyan/10 text-circuit-cyan border border-circuit-cyan/30 rounded-[3px] uppercase">
                    {storyHighlights[0]?.category || 'RESEARCH // FIELD LAB'}
                  </span>
                  <span className="text-text-muted">{storyHighlights[0]?.date || 'RECENT SPRINT'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-text-primary group-hover:text-circuit-cyan transition-colors">
                  {storyHighlights[0]?.title || 'Distributed Swarm Compilation'}
                </h3>
                <p className="text-sm text-text-muted font-sans leading-relaxed max-w-xl">
                  {storyHighlights[0]?.caption || 'Profiling real-time autonomous agents on cluster hardware with custom Triton CUDA memory kernels.'}
                </p>
              </div>

              {/* Bespoke Architectural Wireframe Display */}
              <div className="mt-8 relative h-48 bg-[#080B10] border border-[rgba(72,189,232,0.14)] rounded-[4px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-circuit-grid opacity-30" />
                <div className="relative z-10 flex flex-col items-center gap-2 text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-circuit-cyan/10 border border-circuit-cyan/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5 text-circuit-cyan" />
                  </div>
                  <span className="text-xs font-mono text-text-muted tracking-wider">
                    {storyHighlights[0]?.location || 'Campus Innovation Hub, Lab 402'}
                  </span>
                  <span className="text-[11px] font-mono text-circuit-cyan">
                    {storyHighlights[0]?.altText || 'Cluster telemetry snapshot'}
                  </span>
                </div>
              </div>
            </CircuitCard>
          </div>

          {/* Stacked Asymmetric Right Bento Column (5 Cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {storyHighlights.slice(1).map((item, idx) => (
              <CircuitCard
                key={item.id || idx}
                className="p-6 flex-1 flex flex-col justify-between"
                withTicks={true}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-circuit-amber uppercase font-semibold">
                      0{idx + 2} // {item.category}
                    </span>
                    <span className="text-text-muted">{item.date}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-display font-bold text-text-primary group-hover:text-circuit-cyan transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-muted font-sans leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[rgba(72,189,232,0.12)] flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-circuit-cyan" />
                    <span>{item.location}</span>
                  </span>
                  <span className="text-circuit-cyan group-hover:translate-x-1 transition-transform">
                    EXPAND →
                  </span>
                </div>
              </CircuitCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
