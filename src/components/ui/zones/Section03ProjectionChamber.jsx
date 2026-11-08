'use client';

import React, { useCallback } from 'react';
import { ArrowDown, Radio, Activity, Sparkles, Terminal } from 'lucide-react';
import { getUpcomingEvents } from '@/lib/contentSelectors';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 03: The Projection Chamber (Volumetric Emitter Screen)
 * Positioned in-world at Z = -35.0, where BDX-01 is mounted on the circular pedestal.
 * Frames the short transmission content as a live volumetric projection beam.
 * Seamlessly introduces the deliberate architectural transition into the Central Archival Repository.
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
          <span className="w-2 h-2 rounded-full bg-signal-green ring-2 ring-signal-green/20 animate-pulse" />
          <span className="font-mono text-ivory tracking-widest text-[11px] uppercase font-bold">
            SECTOR 03 // VOLUMETRIC PROJECTION CHAMBER
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-sage">
          <Radio className="w-3.5 h-3.5 text-sage" />
          <span>PEDESTAL EMITTER: BDX-01 • Z: -35.0m</span>
        </div>
      </div>

      {/* Main Chamber Interface: Volumetric Emitter Screen */}
      <div className="max-w-xl my-auto py-8 pointer-events-auto">
        <div className="volumetric-screen corner-reticle p-6 sm:p-8 rounded-2xl relative overflow-hidden">
          {/* Volumetric Emitter Status Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-[10px] font-mono">
            <div className="inline-flex items-center gap-2 text-sage">
              <span className="w-2 h-2 rounded-full bg-[#24BFEA] animate-pulse shadow-[0_0_8px_#24BFEA]" />
              <span className="font-bold tracking-wider uppercase">VOLUMETRIC ARRAY ONLINE</span>
            </div>
            <span className="text-slate-400 text-[9px] uppercase tracking-wider font-mono">
              APERTURE: 14.8 GHz
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-gradient-cyber tracking-tight mb-3 leading-[1.05]">
            THE PROJECTION CHAMBER
          </h2>

          <p className="text-sm sm:text-base text-[#B5B8AF] leading-relaxed mb-6 font-normal">
            BDX-01 has reached its terminal pedestal at the end of the computing corridor. Its volumetric emitter projects live dispatches, student research briefings, and operational logs into ambient space.
          </p>

          {/* Featured Transmission Card: Intercepted Holographic Transmission */}
          {featuredEvent && (
            <div className="p-4 rounded-xl bg-[#141819]/90 border border-sage/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)] mb-6">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                <span className="text-[#24BFEA] font-bold tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#24BFEA] animate-pulse" />
                  INTERCEPTED BROADCAST
                </span>
                <span className="uppercase text-[9px] px-2 py-0.5 rounded bg-white/[0.06] text-[#E6E2D8] font-mono">
                  {featuredEvent.category}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-space font-bold text-[#F2EFE8] tracking-tight mb-1">
                {featuredEvent.title}
              </h3>

              <p className="text-xs text-[#B5B8AF] leading-relaxed line-clamp-2 mb-2.5 font-normal">
                {featuredEvent.description}
              </p>

              <div className="text-[11px] font-mono text-[#A7B7A1] tnum flex items-center gap-2">
                <span>{featuredEvent.date}</span>
                <span>•</span>
                <span>{featuredEvent.venue}</span>
              </div>
            </div>
          )}

          {/* Deliberate Transition Button into Central Archival Repository */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={handleTransition}
              className="group flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-[#A7B7A1] to-[#B6C4B4] hover:from-[#B6C4B4] hover:to-[#C8D6C6] text-[#141819] font-display font-bold text-xs rounded-lg transition-all cursor-pointer tracking-wider uppercase btn-tactile shadow-[0_4px_20px_rgba(167,183,161,0.35)] active:shadow-tactile-active"
            >
              <span>ACCESS CENTRAL ARCHIVE</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 text-[#141819]" />
            </button>

            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
              [DOCKING WITH CENTRAL INTEL COMMONS]
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Sequence Progress Indicators in Floating Frosted Dock */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:px-6 rounded-xl bg-[#121618]/75 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] corner-reticle text-xs text-slate-400 font-mono pointer-events-auto">
        <div className="flex items-center gap-6 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-[#A7B7A1] font-bold">01</span>
            <span>ARRIVAL</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-[#A7B7A1] font-bold">02</span>
            <span>CORE</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#F2EFE8] font-semibold">
            <span className="text-[#24BFEA] font-bold">03</span>
            <span className="underline decoration-[#24BFEA] underline-offset-4 font-bold text-[#F2EFE8]">CHAMBER</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] text-sage">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-green" />
          <span>TERMINAL CORRIDOR ENDPOINT</span>
        </div>
      </div>
    </section>
  );
}
