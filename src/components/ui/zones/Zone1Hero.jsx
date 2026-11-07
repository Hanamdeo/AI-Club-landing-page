'use client';

import React, { useCallback } from 'react';
import { ArrowDown, Cpu, Server, Activity } from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 01: The Arrival (Hero Experience)
 * Cold aisle threshold of the high-density computing facility (Z = +12.5 down to Z = 0).
 * Frames the authentic 3D data-centre architecture with Swiss engineering precision.
 * Features Geist Sans display typography (-0.035em tracking), JetBrains Mono telemetry,
 * architectural hairline boundaries, and tactile stepped interactions.
 */
export default function Zone1Hero({ onExploreClick }) {
  const handleEnter = useCallback(() => {
    audioManager.playWhoosh();
    if (onExploreClick) onExploreClick();
  }, [onExploreClick]);

  return (
    <section
      id="section-arrival"
      className="relative w-full h-[100svh] max-h-screen overflow-hidden flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-16 pt-20 sm:pt-24 pb-6 sm:pb-8 select-none font-sans"
    >
      {/* Top Header Telemetry Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span className="w-2 h-2 rounded-full bg-signal-green ring-2 ring-signal-green/20" />
          <span className="text-ivory font-medium tracking-tight text-xs">
            {CLUB_INFO.institution}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-sage font-mono text-[11px] font-semibold tracking-wider">
            {CLUB_INFO.facilityCode}
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#15191A] border border-white/[0.08] text-[10px] font-mono text-slate-400">
            <Server className="w-3 h-3 text-sage" />
            <span>COLD AISLE // 18.2°C NOMINAL</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-400 font-mono tracking-wider text-[11px] uppercase">
          <Activity className="w-3.5 h-3.5 text-sage" />
          <span>SXM5 CLUSTER // ONLINE</span>
        </div>
      </div>

      {/* Center Cinematic Hero Content (Restrained Architectural Frame) */}
      <div className="max-w-2xl my-auto py-2 sm:py-4 pointer-events-auto">
        <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0D1011]/60 backdrop-blur-[2px] border border-white/[0.08] crosshair-corner">
          {/* Track Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-md bg-[#15191A] border border-white/[0.08] text-xs text-sage font-medium">
            <Cpu className="w-3.5 h-3.5 text-sage shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Autonomous Systems & Foundational AI
            </span>
          </div>

          {/* Master Display Heading with Geist Sans & tight -0.035em tracking */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-ivory mb-2.5 leading-[0.95]">
            {CLUB_INFO.name}
          </h1>

          {/* Subtitle / Tagline */}
          <p className="text-lg sm:text-xl lg:text-2xl font-sans font-light text-sage mb-4 tracking-tight">
            {CLUB_INFO.tagline}
          </p>

          {/* Description Prose */}
          <p className="text-xs sm:text-sm text-ivory/80 max-w-lg leading-relaxed mb-6 font-normal">
            An autonomous collegiate research collective advancing machine intelligence, foundation models, and high-performance computing infrastructure at Madhav Institute of Technology & Science.
          </p>

          {/* Primary Action Button: Stepped Tactile Interaction */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleEnter}
              className="group flex items-center gap-3 px-5 py-3 bg-sage hover:bg-sage-glow text-graphite font-bold text-xs rounded-lg transition-colors cursor-pointer tracking-wider uppercase font-sans btn-tactile shadow-tactile active:shadow-tactile-active"
            >
              <span>ENTER FACILITY</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <span className="hidden sm:inline-block font-mono text-[11px] text-slate-500 uppercase tracking-wider">
              [PRESS ↓ OR SCROLL]
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Highlights & Scroll Cue */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-3 border-t border-white/[0.08]">
        {/* Verified Performance Metrics */}
        <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-md">
          {CLUB_INFO.metrics.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono font-medium">
                {item.label}
              </span>
              <span className="text-base sm:text-lg text-sage font-bold tracking-tight num-normal font-mono tnum mt-0.5">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={handleEnter}
          className="flex items-center gap-2.5 text-xs text-ivory/60 hover:text-sage transition-colors cursor-pointer self-start sm:self-auto pointer-events-auto btn-tactile font-mono"
        >
          <span className="tracking-widest uppercase text-[10px] font-medium">
            SCROLL TO ADVANCE RACKS
          </span>
          <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
            <span className="w-1 h-1.5 rounded-full bg-sage animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
