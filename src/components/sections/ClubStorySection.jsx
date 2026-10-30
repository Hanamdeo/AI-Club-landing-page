'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, ArrowRight, Sparkles } from 'lucide-react';
import { galleryItems } from '@/data/galleryData';
import { Button } from '@/components/ui/Button';

export function ClubStorySection() {
  // Take selected visual highlights across different club tracks
  const storyHighlights = galleryItems.slice(0, 3);

  return (
    <section id="story" className="relative py-28 px-6 sm:px-8 bg-[#05070B] border-t border-white/10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-phoenix-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header (PRD Section 3.4) */}
        <div className="flex items-center gap-4 mb-14">
          <span className="text-xs font-mono tracking-widest text-phoenix-cyan uppercase">
            01 // VISUAL STORYTELLING & CULTURE
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-phoenix-cyan/30 via-white/10 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-primary">
              Moments from the <span className="text-gradient-cyan">Frontier</span>.
            </h2>
            <p className="text-base text-secondary font-sans leading-relaxed">
              Candid glimpses from late-night compute sprints, bare-metal kernel profiling sessions, and live debater cross-examinations.
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            icon={ArrowRight}
            href="/gallery"
          >
            View All Images
          </Button>
        </div>

        {/* Visual Storytelling Grid with Staggered Compositions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Panoramic Moment (7 Cols) */}
          <div className="md:col-span-7 group relative bg-navy-deep/70 border border-white/10 p-8 flex flex-col justify-between overflow-hidden min-h-[380px] hover:border-phoenix-blue/40 transition-all duration-300">
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between text-xs font-mono text-secondary">
                <span className="px-2 py-0.5 bg-phoenix-blue/10 text-phoenix-cyan border border-phoenix-blue/30 uppercase">
                  {storyHighlights[0].category}
                </span>
                <span>{storyHighlights[0].date}</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-primary group-hover:text-phoenix-cyan transition-colors">
                {storyHighlights[0].title}
              </h3>
              <p className="text-sm text-secondary font-sans leading-relaxed max-w-xl">
                {storyHighlights[0].caption}
              </p>
            </div>

            {/* Stylized Archival Wireframe Display */}
            <div className="mt-8 relative h-48 bg-gradient-to-tr from-navy-surface via-[#0A1424] to-[#05070B] border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-25" />
              <div className="relative z-10 flex flex-col items-center gap-2 text-center p-4">
                <Camera className="w-6 h-6 text-phoenix-cyan group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono text-secondary tracking-wider">
                  {storyHighlights[0].location}
                </span>
                <span className="text-[11px] font-mono text-phoenix-blue">
                  {storyHighlights[0].altText}
                </span>
              </div>
            </div>
          </div>

          {/* Stacked Right Column (5 Cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {storyHighlights.slice(1).map((item) => (
              <div
                key={item.id}
                className="group p-6 bg-navy-deep/50 border border-white/10 flex-1 flex flex-col justify-between hover:border-phoenix-blue/40 transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-secondary">
                    <span className="text-phoenix-blue uppercase">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="text-lg font-display font-bold text-primary group-hover:text-phoenix-cyan transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-secondary font-sans leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-secondary/80 mt-4">
                  <span>📍 {item.location}</span>
                  <Link
                    href="/gallery"
                    className="text-phoenix-cyan hover:underline flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

