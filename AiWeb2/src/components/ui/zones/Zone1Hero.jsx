'use client';

import React from 'react';
import { ArrowDown, Cpu } from 'lucide-react';
import { ZONE_HERO, CLUB_META } from '@/data/clubData';

/**
 * Zone 01: Entrance Hero
 * Pinned at facility threshold (Z = +10).
 * Clean, bold typography without developer pseudo-code clutter.
 */
export default function Zone1Hero({ onExploreClick }) {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between p-6 md:p-12 lg:p-16 select-none font-sans">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sage sage-indicator" />
          <span className="text-ivory/80 font-medium tracking-wide">
            {CLUB_META.institution}
          </span>
        </div>
        <div className="hidden sm:block text-slate-400 tracking-wider text-xs">
          Autonomous Research Lab
        </div>
      </div>

      {/* Center Cinematic Hero Typography */}
      <div className="max-w-4xl my-auto py-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-charcoal/30 backdrop-blur-xs border border-slate-struct/50 text-xs text-sage tracking-wide font-medium">
          <Cpu className="w-3.5 h-3.5 text-sage" />
          <span>Advanced AI & Computational Research</span>
        </div>

        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight text-ivory mb-4 drop-shadow-md">
          {ZONE_HERO.title}
        </h1>

        <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-sage mb-6 tracking-wide drop-shadow-sm">
          {ZONE_HERO.motto}
        </p>

        <p className="text-base sm:text-lg text-ivory/80 max-w-2xl leading-relaxed mb-8 font-normal">
          {ZONE_HERO.description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreClick}
            className="group flex items-center gap-3 px-7 py-3.5 bg-sage hover:bg-sage-glow text-graphite font-semibold text-sm rounded-xl transition-all duration-300 shadow-sage-glow pointer-events-auto cursor-pointer tracking-wide"
          >
            <span>ENTER THE FACILITY</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      </div>

      {/* Bottom Architectural Highlights & Scroll Cue */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-slate-struct/30">
        <div className="grid grid-cols-3 gap-8 max-w-md">
          {ZONE_HERO.metricsSummary.map((item, idx) => (
            <div key={idx}>
              <span className="block text-[11px] text-slate-400 tracking-wide uppercase font-medium">
                {item.label}
              </span>
              <span className="text-sm text-sage font-semibold tracking-tight num-normal mt-0.5 block">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div
          onClick={onExploreClick}
          className="flex items-center gap-3 text-xs text-ivory/60 hover:text-sage transition-colors cursor-pointer self-start sm:self-auto pointer-events-auto"
        >
          <span className="tracking-widest font-medium uppercase text-[11px]">SCROLL TO TRAVEL</span>
          <div className="w-5 h-8 rounded-full border border-slate-struct/60 flex items-start justify-center p-1">
            <span className="w-1 h-2 rounded-full bg-sage animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
