'use client';

import React from 'react';
import { ArrowDown, Radio, Sparkles, Layers, Terminal } from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { getUpcomingEvents, getUpcomingDiscussions } from '@/lib/contentSelectors';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 03: The Projection Chamber
 * Final immersive section and cinematic transition threshold into the editorial website.
 * Features sequence telemetry, holographic projection alignment with BDX-01, and the transition call-to-action.
 */
export default function Section03ProjectionChamber({ onTransitionToEditorial }) {
  const featuredEvent = getUpcomingEvents()[0];
  const featuredGD = getUpcomingDiscussions()[0];

  const handleTransition = () => {
    audioManager.playWhoosh();
    if (onTransitionToEditorial) onTransitionToEditorial();
  };

  return (
    <section
      id="section-chamber"
      className="relative w-full min-h-screen flex flex-col justify-between p-6 md:p-12 lg:p-16 select-none font-sans"
    >
      {/* Top Chamber Header & Telemetry */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-sage animate-ping" />
          <span className="font-mono text-ivory tracking-widest text-[11px] uppercase font-bold">
            SECTION 03 // THE PROJECTION CHAMBER
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-sage">
          <Radio className="w-3.5 h-3.5 text-sage animate-pulse" />
          <span>BDX-01 DOCKED • HOLOGRAPHIC ARRAY ONLINE</span>
        </div>
      </div>

      {/* Main Chamber Interface Overlay */}
      <div className="max-w-xl my-auto py-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-sage/15 border border-sage/40 text-xs font-semibold text-sage uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hologram Active</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-sans font-bold text-ivory tracking-tight mb-4 drop-shadow-md">
          THE PROJECTION CHAMBER
        </h2>

        <p className="text-base sm:text-lg text-ivory/80 leading-relaxed mb-6 font-normal">
          BDX-01 has reached its projection pedestal. Its holographic emitter projects the club&apos;s latest live dispatches, research tracks, and upcoming operations directly into physical space.
        </p>

        {/* Live Holographic Featured Briefing Card */}
        <div className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-sage/40 shadow-sage-glow mb-8 pointer-events-auto">
          <div className="flex items-center justify-between text-[11px] font-mono mb-2">
            <span className="text-sage font-bold tracking-wider">// FEATURED TRANSMISSION</span>
            <span className="text-slate-400">BEAM_CH_01</span>
          </div>

          {featuredEvent && (
            <div className="mb-3">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-sage/20 text-sage font-mono font-semibold uppercase mb-1">
                {featuredEvent.category}
              </span>
              <h3 className="text-lg font-bold text-ivory leading-snug">
                {featuredEvent.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {featuredEvent.description}
              </p>
              <div className="text-[11px] font-mono text-sage mt-2">
                {featuredEvent.date} • {featuredEvent.venue}
              </div>
            </div>
          )}
        </div>

        {/* Cinematic Transition Button into Editorial Website */}
        <button
          onClick={handleTransition}
          className="group flex items-center gap-3 px-8 py-4 bg-sage hover:bg-sage-glow text-graphite font-bold text-xs rounded-xl transition-all duration-300 shadow-sage-glow pointer-events-auto cursor-pointer tracking-wider uppercase font-sans"
        >
          <span>ENTER EDITORIAL ARCHIVE</span>
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
        </button>
      </div>

      {/* Bottom Sequence Progress Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-white/10 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sage font-bold">01.</span>
            <span>ARRIVAL</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sage font-bold">02.</span>
            <span>INTELLIGENCE CORE</span>
          </div>
          <div className="flex items-center gap-2 text-ivory">
            <span className="text-sage font-bold">03.</span>
            <span className="underline decoration-sage underline-offset-4">PROJECTION CHAMBER</span>
          </div>
        </div>

        <div
          onClick={handleTransition}
          className="flex items-center gap-2 text-ivory/70 hover:text-sage transition-colors cursor-pointer pointer-events-auto"
        >
          <span>CONTINUE TO EDITORIAL SECTIONS</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

