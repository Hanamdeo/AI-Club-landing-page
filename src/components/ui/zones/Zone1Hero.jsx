'use client';

import React, { useCallback } from 'react';
import { ArrowDown } from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 01: The Arrival (In-Environment Holographic Terminal)
 * Docked cleanly to the left flank of the 3D data centre perspective:
 * - Floating Volumetric Information Terminal: Constrained width on the left to ensure
 *   ZERO visual overlap with the centered companion robot NEX-01.
 * - Sub-Floor Optical Telemetry Dock: Blade diagnostics (Members, Projects, Papers)
 *   in refined monochrome silver/slate.
 */
export default function Zone1Hero({ onExploreClick }) {
  const handleEnter = useCallback(() => {
    audioManager.playWhoosh();
    if (onExploreClick) onExploreClick();
  }, [onExploreClick]);

  return (
    <section
      id="section-arrival"
      className="relative w-full min-h-[100svh] flex flex-col justify-between px-4 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-28 pb-4 sm:pb-8 select-none font-sans"
    >
      {/* ============================================================== */}
      {/* MASTER TWO-COLUMN HERO COMPOSITION                              */}
      {/* ============================================================== */}
      <div className="w-full mt-auto mb-20 lg:my-auto py-2 sm:py-4 pointer-events-none">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* ========================================================== */}
          {/* LEFT SIDE: IN-WORLD FLOATING HOLOGRAPHIC HUD TEXT          */}
          {/* Compact width strictly docked left: Zero overlap with robot */}
          {/* ========================================================== */}
          <div className="w-full sm:max-w-[420px] lg:max-w-[440px] xl:max-w-[460px] mr-auto pointer-events-auto safe-viewport-card custom-scrollbar">
            <div className="glass-panel p-6 sm:p-7 md:p-8 relative">
              {/* Sector Header Tag */}
              <div className="flex items-center gap-2 mb-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                <span>SECTOR 01 // HOLOGRAPHIC HUD</span>
              </div>

              {/* Master Display Heading */}
              <h1 className="text-fluid-hero font-display font-black tracking-tight text-white mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                {CLUB_INFO.name}
              </h1>

              {/* Tagline with Space Grotesk - Monochrome Silver */}
              <p className="text-base sm:text-lg lg:text-xl font-space font-medium text-white/90 mb-3 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {CLUB_INFO.tagline}
              </p>

              {/* Controlled-Width Description Prose */}
              <p className="text-xs sm:text-sm text-slate-300 max-w-[400px] leading-[1.65] mb-6 font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                An autonomous collegiate research collective advancing machine intelligence, foundation models, and high-performance computing infrastructure at Madhav Institute of Technology & Science.
              </p>

              {/* In-World Terminal Action Button & Scroll Prompt */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={handleEnter}
                  className="group flex items-center gap-3 px-6 py-3.5 font-display font-bold text-xs rounded-xl tracking-wider uppercase btn-tactile cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all"
                >
                  <span className="text-white">EXPLORE FACILITY</span>
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 text-white" />
                </button>

                <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-slate-400 uppercase tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                  <span>[PRESS ↓ OR SCROLL TO NAVIGATE]</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT SIDE: Open Aperture for Centered Robot NEX-01        */}
          {/* ========================================================== */}
          <div className="hidden lg:block lg:w-[52%] xl:w-[56%] pointer-events-none" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* SEAMLESS BOTTOM TELEMETRY DOCK: SERVER BLADE DIAGNOSTICS       */}
      {/* ============================================================== */}
      <div className="relative z-30 w-full pt-8 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4 pointer-events-auto">
        {/* Mobile Telemetry Sector Badge */}
        <div className="flex items-center gap-2 md:hidden font-mono text-xs text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
          <span>SECTOR 01: THE ARRIVAL</span>
        </div>

        {/* 3 Verified Statistics in Floating Blade Telemetry Dock */}
        <div className="glass-panel flex items-center gap-3 sm:gap-7 md:gap-9 px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl md:ml-12 lg:ml-16 overflow-x-auto no-scrollbar">
          {/* Blade Metric 1 */}
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
              <span className="text-[8px] sm:text-[9px] text-slate-400 tracking-[0.14em] uppercase font-mono font-medium">
                BLADE 01 // MEMBERS
              </span>
            </div>
            <span className="text-sm sm:text-base md:text-lg text-white font-bold font-mono tracking-tight tnum mt-0.5">
              450+
            </span>
          </div>

          <div className="w-[1px] h-7 bg-white/10 hidden sm:block" />

          {/* Blade Metric 2 */}
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
              <span className="text-[8px] sm:text-[9px] text-slate-400 tracking-[0.14em] uppercase font-mono font-medium">
                BLADE 02 // PROJECTS
              </span>
            </div>
            <span className="text-sm sm:text-base md:text-lg text-white font-bold font-mono tracking-tight tnum mt-0.5">
              32
            </span>
          </div>

          <div className="w-[1px] h-7 bg-white/10 hidden sm:block" />

          {/* Blade Metric 3 */}
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
              <span className="text-[8px] sm:text-[9px] text-slate-400 tracking-[0.14em] uppercase font-mono font-medium">
                BLADE 03 // PAPERS
              </span>
            </div>
            <span className="text-sm sm:text-base md:text-lg text-white font-bold font-mono tracking-tight tnum mt-0.5">
              14
            </span>
          </div>
        </div>

        {/* Scroll To Explore Indicator Cue: Centered Frosted Capsule */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 bottom-2.5 lg:bottom-3 pointer-events-auto">
          <button
            onClick={handleEnter}
            className="group flex items-center gap-3 px-4 py-2 rounded-full glass-panel hover:border-white/40 text-xs text-slate-300 hover:text-white transition-all cursor-pointer font-mono btn-tactile"
          >
            <span className="tracking-[0.18em] uppercase text-[10px] font-semibold text-slate-300 group-hover:text-white">
              SCROLL TO EXPLORE
            </span>
            <div className="w-4 h-7 rounded-full border border-white/20 group-hover:border-white/50 flex items-start justify-center p-1 transition-colors">
              <span className="w-1 h-1.5 rounded-full bg-white animate-bounce shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            </div>
          </button>
        </div>

        {/* Safe Right Spacer: Reserving clearance for bottom-right fixed BDX-01 companion pod */}
        <div className="hidden md:block w-36 lg:w-56 pointer-events-none" />
      </div>
    </section>
  );
}
