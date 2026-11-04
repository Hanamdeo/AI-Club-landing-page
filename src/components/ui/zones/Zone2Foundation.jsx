'use client';

import React from 'react';
import { Target, Compass, Cpu, Activity } from 'lucide-react';
import { ZONE_ABOUT } from '@/data/clubData';
import GlassPanel from '../GlassPanel';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 02: The Foundation (About Us)
 * Transparent rounded architectural glass interface at Z = -15.
 * High-impact Space Grotesk display typography with transparent card styling.
 */
export default function Zone2Foundation({ onInspectRack }) {
  const handleInspect = () => {
    audioManager.playServo();
    audioManager.playBeep(1100, 0.1);
    if (onInspectRack) onInspectRack();
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-16">
      <div className="w-full max-w-6xl">
        <GlassPanel>
          {/* Section Header with Interactive Landmark Hint */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-ivory tracking-tight drop-shadow-sm">
                {ZONE_ABOUT.heading}
              </h2>
              <p className="text-base sm:text-lg text-sage/90 font-light mt-2 tracking-wide font-sans">
                {ZONE_ABOUT.subheading}
              </p>
            </div>

            {/* Interactive Node Telemetry Launcher */}
            <button
              onClick={handleInspect}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black/20 hover:bg-sage/20 border border-white/15 hover:border-sage/60 text-xs font-mono text-sage transition-all self-start sm:self-auto cursor-pointer group shadow-none pointer-events-auto"
            >
              <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
              <Cpu className="w-4 h-4 text-sage" />
              <span className="font-semibold tracking-wide uppercase">INSPECT NODE ALPHA-01</span>
              <Activity className="w-3.5 h-3.5 text-sage/60 group-hover:text-sage transition-colors" />
            </button>
          </div>

          {/* Mission & Vision Dual Transparent Rounded Glass Alcoves */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-black/15 border border-white/10 hover:border-sage/40 hover:bg-black/25 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-sage" />
                <h3 className="text-xs font-mono font-semibold tracking-wider text-sage uppercase">
                  Mission Statement
                </h3>
              </div>
              <p className="text-sm text-ivory/85 leading-relaxed font-normal font-sans">
                {ZONE_ABOUT.mission}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-black/15 border border-white/10 hover:border-sage/40 hover:bg-black/25 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-4 h-4 text-sage" />
                <h3 className="text-xs font-mono font-semibold tracking-wider text-sage uppercase">
                  Long-Horizon Vision
                </h3>
              </div>
              <p className="text-sm text-ivory/85 leading-relaxed font-normal font-sans">
                {ZONE_ABOUT.vision}
              </p>
            </div>
          </div>

          {/* 3 Core Curriculum / Focus Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {ZONE_ABOUT.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-5 rounded-xl bg-black/15 border border-white/10 hover:border-sage/40 hover:bg-black/25 transition-all"
              >
                <div className="text-[10px] font-mono text-sage/70 uppercase mb-1">
                  Pillar {pillar.code}
                </div>
                <h4 className="text-base font-display font-semibold text-ivory mb-2 tracking-tight">
                  {pillar.title}
                </h4>
                <p className="text-xs text-ivory/75 leading-relaxed font-sans font-normal">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Architectural Statistics Bar with Space Grotesk Display Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            {ZONE_ABOUT.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-sage tracking-tight num-normal">
                  {stat.value}
                </div>
                <div className="text-xs text-ivory font-semibold mt-1 tracking-tight font-sans">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
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
