'use client';

import React from 'react';
import { Target, Compass } from 'lucide-react';
import { ZONE_ABOUT } from '@/data/clubData';
import GlassPanel from '../GlassPanel';

/**
 * Zone 02: The Foundation (About Us)
 * Transparent rounded architectural glass interface at Z = -15.
 * Clean, elegant typography with zero pseudo-code clutter.
 */
export default function Zone2Foundation() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-16">
      <div className="w-full max-w-6xl">
        <GlassPanel>
          {/* Section Header */}
          <div className="mb-8 border-b border-slate-struct/30 pb-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ivory tracking-tight drop-shadow-sm font-sans">
              {ZONE_ABOUT.heading}
            </h2>
            <p className="text-base sm:text-lg text-sage/90 font-light mt-2 tracking-wide">
              {ZONE_ABOUT.subheading}
            </p>
          </div>

          {/* Mission & Vision Dual Transparent Rounded Glass Alcoves */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-charcoal/20 backdrop-blur-xs border border-slate-struct/35 hover:border-slate-struct/60 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-sage" />
                <h3 className="text-sm font-semibold tracking-wider text-ivory uppercase">
                  Mission Statement
                </h3>
              </div>
              <p className="text-sm text-ivory/85 leading-relaxed font-normal">
                {ZONE_ABOUT.mission}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-charcoal/20 backdrop-blur-xs border border-slate-struct/35 hover:border-slate-struct/60 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-4 h-4 text-sage" />
                <h3 className="text-sm font-semibold tracking-wider text-ivory uppercase">
                  Long-Horizon Vision
                </h3>
              </div>
              <p className="text-sm text-ivory/85 leading-relaxed font-normal">
                {ZONE_ABOUT.vision}
              </p>
            </div>
          </div>

          {/* 3 Core Curriculum / Focus Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {ZONE_ABOUT.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-5 rounded-xl bg-charcoal/15 backdrop-blur-xs border border-slate-struct/30 hover:border-sage/40 transition-all"
              >
                <h4 className="text-base font-semibold text-ivory mb-2 tracking-tight">
                  {pillar.title}
                </h4>
                <p className="text-xs text-ivory/75 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Architectural Statistics Bar with Normal Numbers (Inter) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-struct/30">
            {ZONE_ABOUT.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sage tracking-tight num-normal">
                  {stat.value}
                </div>
                <div className="text-xs text-ivory font-medium mt-1 tracking-tight">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.unit}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
