'use client';

import React from 'react';
import { ArrowDown, Cpu, Sparkles, Radio, Server, Activity } from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 01: The Arrival
 * Enterprise data centre cold aisle threshold (Z = +12.5 down to Z = 0).
 * High-impact hero typography framed by massive multi-row server rack infrastructure,
 * overhead cable raceways, and autonomous assistant BDX-01.
 */
export default function Zone1Hero({ onExploreClick }) {
  const handleEnter = () => {
    audioManager.playWhoosh();
    if (onExploreClick) onExploreClick();
  };

  return (
    <section
      id="section-arrival"
      className="relative w-full min-h-screen flex flex-col justify-between p-6 md:p-12 lg:p-16 select-none font-sans"
    >
      {/* Top Header Badge & Telemetry Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-sage sage-indicator animate-ping" />
          <span className="text-ivory font-medium tracking-wide">
            {CLUB_INFO.institution}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-sage font-mono text-[11px] font-bold">
            {CLUB_INFO.facilityCode}
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] font-mono text-slate-400">
            <Server className="w-3 h-3 text-sage" />
            <span>COLD AISLE 01 // 18.2°C NOMINAL</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-400 font-mono tracking-wider text-xs uppercase">
          <Activity className="w-3.5 h-3.5 text-sage animate-pulse" />
          <span>AUTONOMOUS CLUSTERS ONLINE</span>
        </div>
      </div>

      {/* Center Cinematic Hero Typography with Subtle Environmental Backdrop */}
      <div className="max-w-4xl my-auto py-8">
        <div className="p-6 sm:p-10 -ml-4 sm:-ml-8 rounded-3xl bg-gradient-to-r from-graphite/85 via-graphite/55 to-transparent backdrop-blur-[2px] border-l-2 border-sage/50">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-5 rounded-full bg-black/40 border border-sage/35 text-xs text-sage tracking-wide font-medium">
            <Cpu className="w-3.5 h-3.5 text-sage" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              High-Density Computing & AI Systems
            </span>
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-sans font-extrabold tracking-tight text-ivory mb-3 drop-shadow-md">
            {CLUB_INFO.name}
          </h1>

          <p className="text-2xl sm:text-3xl lg:text-4xl font-sans font-light text-sage mb-6 tracking-wide drop-shadow-sm">
            {CLUB_INFO.tagline}
          </p>

          <p className="text-base sm:text-lg text-ivory/85 max-w-2xl leading-relaxed mb-8 font-normal">
            An autonomous community of student researchers, engineers, and builders pushing the frontier of artificial intelligence, foundational models, and high-performance GPU compute.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleEnter}
              className="group flex items-center gap-3 px-8 py-4 bg-sage hover:bg-sage-glow text-graphite font-bold text-xs rounded-xl transition-all duration-300 shadow-sage-glow pointer-events-auto cursor-pointer tracking-wider uppercase font-sans"
            >
              <span>ENTER THE FACILITY</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Highlights & Scroll Cue */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-6 max-w-md">
          {CLUB_INFO.metrics.slice(0, 3).map((item, idx) => (
            <div key={idx}>
              <span className="block text-[11px] text-slate-400 tracking-wider uppercase font-mono font-medium">
                {item.label}
              </span>
              <span className="text-sm text-sage font-bold tracking-tight num-normal mt-0.5 block">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div
          onClick={handleEnter}
          className="flex items-center gap-3 text-xs text-ivory/60 hover:text-sage transition-colors cursor-pointer self-start sm:self-auto pointer-events-auto"
        >
          <span className="tracking-widest font-mono font-semibold uppercase text-[11px]">
            SCROLL TO EXPLORE RACKS
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <span className="w-1 h-2 rounded-full bg-sage animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
