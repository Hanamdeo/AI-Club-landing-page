'use client';

import React, { useCallback } from 'react';
import { ArrowDown, Radio, Activity } from 'lucide-react';
import { getUpcomingEvents } from '@/lib/contentSelectors';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 03: The Projection Chamber
 * Final immersive section and transition threshold into the editorial archive (Z = -35.0).
 * Frames BDX-01 on its projection pedestal with authentic holographic telemetry,
 * restrained hairline framing, and stepped tactile transition button.
 */
export default function Section03ProjectionChamber({ onTransitionToEditorial }) {
  const featuredEvent = getUpcomingEvents()[0];

  const handleTransition = useCallback(() => {
    audioManager.playWhoosh();
    if (onTransitionToEditorial) onTransitionToEditorial();
  }, [onTransitionToEditorial]);

  return (
    <section
      id="section-chamber"
      className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 select-none font-sans"
    >
      {/* Top Chamber Telemetry Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.08] pb-3.5 pt-12 md:pt-14">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal-green ring-2 ring-signal-green/20" />
          <span className="font-mono text-ivory tracking-widest text-[11px] uppercase font-bold">
            SECTOR 03 // PROJECTION CHAMBER
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-sage">
          <Radio className="w-3.5 h-3.5 text-sage" />
          <span>BDX-01 DOCKED // 5.8 GHz CARRIER</span>
        </div>
      </div>

      {/* Main Chamber Interface Overlay */}
      <div className="max-w-xl my-auto py-8 pointer-events-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1011]/70 backdrop-blur-md border border-white/[0.08] crosshair-corner">
          {/* Hologram Status Pill */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 rounded-md bg-[#15191A] border border-white/[0.08] text-[11px] font-mono text-sage uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <span>Holographic Array Online</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-ivory tracking-tight mb-3 leading-[1.05]">
            THE PROJECTION CHAMBER
          </h2>

          <p className="text-sm sm:text-base text-ivory/80 leading-relaxed mb-6 font-normal">
            BDX-01 has reached its pedestal at the end of the computing corridor. Its volumetric emitter projects verified dispatches, student research briefings, and live operations directly into physical space.
          </p>

          {/* Featured Transmission Card */}
          {featuredEvent && (
            <div className="p-4 rounded-xl bg-[#15191A]/90 border border-white/[0.08] mb-6">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                <span className="text-sage font-bold tracking-wider">// LATEST DISPATCH</span>
                <span className="uppercase text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04]">
                  {featuredEvent.category}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-ivory tracking-tight mb-1">
                {featuredEvent.title}
              </h3>

              <p className="text-xs text-ivory/70 leading-relaxed line-clamp-2 mb-2.5 font-normal">
                {featuredEvent.description}
              </p>

              <div className="text-[11px] font-mono text-sage tnum">
                {featuredEvent.date} • {featuredEvent.venue}
              </div>
            </div>
          )}

          {/* Stepped Tactile Transition Button into Editorial Archive */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleTransition}
              className="group flex items-center gap-3 px-6 py-3.5 bg-sage hover:bg-sage-glow text-graphite font-bold text-xs rounded-lg transition-colors cursor-pointer tracking-wider uppercase font-sans btn-tactile shadow-tactile active:shadow-tactile-active"
            >
              <span>ENTER EDITORIAL ARCHIVE</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sequence Progress Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-white/[0.08] text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-6 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-sage font-bold">01</span>
            <span>ARRIVAL</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-sage font-bold">02</span>
            <span>CORE</span>
          </div>
          <div className="flex items-center gap-1.5 text-ivory font-semibold">
            <span className="text-sage font-bold">03</span>
            <span className="underline decoration-sage underline-offset-4">CHAMBER</span>
          </div>
        </div>

        <button
          onClick={handleTransition}
          className="flex items-center gap-2 text-ivory/70 hover:text-sage transition-colors cursor-pointer pointer-events-auto btn-tactile font-mono text-[11px]"
        >
          <span>CONTINUE TO EDITORIAL SECTIONS</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
