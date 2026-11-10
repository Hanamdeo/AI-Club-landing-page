'use client';

import React, { useCallback } from 'react';
import { ArrowDown, Radio, Activity, Eye } from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 01: The Arrival (In-Environment Holographic Terminal)
 * Seamlessly docked into the 3D data centre perspective:
 * - Floating Volumetric Information Terminal: Framed as an active in-world HUD projection
 *   emitted by companion NEX-01.
 * - Right Side (~48%): Direct line-of-sight to companion robot and server racks.
 * - Sub-Floor Optical Telemetry Dock: Blade diagnostics (Members, Projects, Papers)
 *   and contextual navigation cues.
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
      <div className="w-full my-auto py-2 sm:py-4 pointer-events-none">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* ========================================================== */}
          {/* LEFT SIDE: IN-WORLD FLOATING HOLOGRAPHIC HUD TEXT          */}
          {/* ========================================================== */}
          <div className="w-full lg:w-[54%] max-w-[580px] xl:max-w-[640px] pointer-events-auto safe-viewport-card custom-scrollbar">
            <div className="relative py-2 sm:py-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              {/* Holographic Projection Header Telemetry */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.12] text-[10px] font-mono">
                <div className="flex items-center gap-2 text-[#A7B7A1]">
                  <span className="w-2 h-2 rounded-full bg-sage animate-pulse shadow-[0_0_8px_rgba(162,178,159,0.7)]" />
                  <span className="font-bold tracking-widest uppercase">
                    SECTOR 01 // HOLOGRAPHIC HUD
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-slate-400">
                  <Radio className="w-3 h-3 text-sage" />
                  <span className="tracking-tight text-[9px] uppercase">
                    EMITTER: NEX-01 • SYNC: 120Hz
                  </span>
                </div>
              </div>

              {/* Master Display Heading */}
              <h1 className="text-fluid-hero font-display font-black tracking-tight text-gradient-cyber mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {CLUB_INFO.name}
              </h1>

              {/* Tagline with Space Grotesk */}
              <p className="text-lg sm:text-xl lg:text-2xl font-space font-medium text-[#B6C4B4] mb-3 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {CLUB_INFO.tagline}
              </p>

              {/* Controlled-Width Description Prose */}
              <p className="text-xs sm:text-sm text-[#D1D5DB] max-w-[480px] leading-relaxed mb-6 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                An autonomous collegiate research collective advancing machine intelligence, foundation models, and high-performance computing infrastructure at Madhav Institute of Technology & Science.
              </p>

              {/* In-World Terminal Action Button & Scroll Prompt */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={handleEnter}
                  className="group flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-[#A7B7A1] to-[#B6C4B4] hover:from-[#B6C4B4] hover:to-[#C8D6C6] text-[#141819] font-display font-bold text-xs rounded-lg transition-all cursor-pointer tracking-wider uppercase btn-tactile shadow-[0_4px_20px_rgba(167,183,161,0.35)] active:shadow-tactile-active"
                >
                  <span>EXPLORE FACILITY</span>
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 text-[#141819]" />
                </button>

                <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#A7B7A1] uppercase tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
                  <span>[PRESS ↓ OR SCROLL TO NAVIGATE]</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT SIDE: Dedicated Visual Aperture for Companion NEX-01  */}
          {/* ========================================================== */}
          <div className="w-full lg:w-[46%] pointer-events-none" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* SEAMLESS BOTTOM TELEMETRY DOCK: SERVER BLADE DIAGNOSTICS       */}
      {/* ============================================================== */}
      <div className="relative z-30 w-full pt-8 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4 pointer-events-auto">
        {/* Mobile Telemetry Sector Badge */}
        <div className="flex items-center gap-2 md:hidden font-mono text-xs text-[#A7B7A1]">
          <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse shadow-[0_0_6px_rgba(162,178,159,0.5)]" />
          <span>SECTOR 01: THE ARRIVAL</span>
        </div>

        {/* 3 Verified Statistics in Floating Blade Telemetry Dock */}
        <div className="flex items-center gap-3 sm:gap-7 md:gap-9 px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#101416]/80 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] corner-reticle md:ml-12 lg:ml-16 overflow-x-auto no-scrollbar">
          {/* Blade Metric 1 */}
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse shadow-[0_0_6px_rgba(162,178,159,0.5)]" />
              <span className="text-[8px] sm:text-[9px] text-[#A7B7A1] tracking-[0.14em] uppercase font-mono font-medium">
                BLADE 01 // MEMBERS
              </span>
            </div>
            <span className="text-sm sm:text-base md:text-lg text-[#F2EFE8] font-bold font-mono tracking-tight tnum mt-0.5">
              450+
            </span>
          </div>

          <div className="w-[1px] h-7 bg-white/[0.08] hidden sm:block" />

          {/* Blade Metric 2 */}
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
              <span className="text-[8px] sm:text-[9px] text-[#A7B7A1] tracking-[0.14em] uppercase font-mono font-medium">
                BLADE 02 // PROJECTS
              </span>
            </div>
            <span className="text-sm sm:text-base md:text-lg text-[#F2EFE8] font-bold font-mono tracking-tight tnum mt-0.5">
              32
            </span>
          </div>

          <div className="w-[1px] h-7 bg-white/[0.08] hidden sm:block" />

          {/* Blade Metric 3 */}
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse shadow-[0_0_6px_rgba(162,178,159,0.5)]" />
              <span className="text-[8px] sm:text-[9px] text-[#A7B7A1] tracking-[0.14em] uppercase font-mono font-medium">
                BLADE 03 // PAPERS
              </span>
            </div>
            <span className="text-sm sm:text-base md:text-lg text-[#F2EFE8] font-bold font-mono tracking-tight tnum mt-0.5">
              14
            </span>
          </div>
        </div>

        {/* Scroll To Explore Indicator Cue: Centered Frosted Capsule (Never collides with bottom-right BDX) */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 bottom-2.5 lg:bottom-3 pointer-events-auto">
          <button
            onClick={handleEnter}
            className="group flex items-center gap-3 px-4 py-2 rounded-full bg-[#121618]/70 backdrop-blur-md border border-white/[0.08] hover:border-[#A7B7A1]/50 hover:bg-[#181E1F]/90 text-xs text-[#B5B8AF] hover:text-[#F2EFE8] transition-all cursor-pointer font-mono shadow-[0_8px_32px_rgba(0,0,0,0.4)] btn-tactile"
          >
            <span className="tracking-[0.18em] uppercase text-[10px] font-semibold">
              SCROLL TO EXPLORE
            </span>
            <div className="w-4 h-7 rounded-full border border-white/20 group-hover:border-[#A7B7A1] flex items-start justify-center p-1 transition-colors">
              <span className="w-1 h-1.5 rounded-full bg-[#24BFEA] animate-bounce shadow-[0_0_6px_#24BFEA]" />
            </div>
          </button>
        </div>

        {/* Safe Right Spacer: Reserving clearance for bottom-right fixed BDX-01 companion pod */}
        <div className="hidden md:block w-36 lg:w-56 pointer-events-none" />
      </div>
    </section>
  );
}
