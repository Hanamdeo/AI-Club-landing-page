'use client';

import React from 'react';
import { galleryItems } from '@/data/galleryData';
import { Camera, Calendar, ArrowUpRight } from 'lucide-react';

export function GallerySection() {
  const featuredItem = galleryItems[0];
  const secondaryItems = galleryItems.slice(1, 3);
  const remainingItems = galleryItems.slice(3);

  return (
    <section id="gallery" className="relative py-32 px-6 sm:px-8 bg-[#070B11] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-phoenix-blue uppercase">
            05 // VISUAL CHRONICLES & ARCHIVES
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-phoenix-blue/30 via-white/10 to-transparent" />
        </div>

        <div className="max-w-3xl mb-12 space-y-3">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            Laboratory <span className="text-gradient-cyan">Archives</span>.
          </h2>
          <p className="text-base text-secondary font-sans leading-relaxed">
            Documented moments from our compute workstations, 36-hour hackathons, robotics field tests, and dialectic sessions.
          </p>
        </div>

        {/* Magazine-Style Asymmetric Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Featured Large Chronicle Panel (7 Cols) */}
          <div className="lg:col-span-7 group relative bg-navy-deep/80 border border-white/10 p-8 flex flex-col justify-between overflow-hidden min-h-[380px]">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-secondary">
                <span className="text-phoenix-blue uppercase">FEATURED RECORD // #{featuredItem.id}</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-phoenix-blue" />
                  {featuredItem.date}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary group-hover:text-phoenix-cyan transition-colors">
                {featuredItem.title}
              </h3>
              <p className="text-sm text-secondary font-sans max-w-xl leading-relaxed">
                {featuredItem.caption}
              </p>
            </div>

            {/* Graphic Abstract Visual Architecture */}
            <div className="h-44 w-full bg-gradient-to-r from-navy-surface via-[#0C1B2E] to-background border border-white/5 flex items-center justify-center relative mt-6 overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              <div className="relative z-10 flex items-center gap-3 text-xs font-mono text-phoenix-cyan">
                <Camera className="w-5 h-5 text-phoenix-blue" />
                <span>ARCHIVAL DOCUMENTATION // {featuredItem.category}</span>
              </div>
            </div>
          </div>

          {/* Two Stacked Secondary Panels (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {secondaryItems.map((item) => (
              <div
                key={item.id}
                className="group p-6 bg-navy-deep/60 border border-white/10 flex-1 flex flex-col justify-between hover:border-phoenix-blue/40 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-secondary">
                    <span className="text-phoenix-cyan uppercase">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="text-lg font-display font-bold text-primary group-hover:text-phoenix-cyan transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-secondary font-sans leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-secondary mt-4">
                  <span>● VERIFIED LAB RECORD</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining Archive Rows (Clean Architectural Strip) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {remainingItems.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-navy-deep/40 border border-white/5 space-y-3 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-secondary">
                <span className="text-phoenix-blue uppercase">{item.category}</span>
                <span>{item.date}</span>
              </div>
              <h5 className="text-base font-display font-bold text-primary leading-snug">
                {item.title}
              </h5>
              <p className="text-xs text-secondary font-sans leading-relaxed">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
