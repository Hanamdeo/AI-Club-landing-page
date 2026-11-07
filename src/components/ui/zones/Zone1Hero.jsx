'use client';

import React, { useCallback } from 'react';
import { ArrowDown, Cpu, Sparkles, Activity } from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 01: The Arrival (Refined Hero Experience)
 * Balanced Two-Column Architectural Composition:
 * - Left Side (~52%): Compact translucent charcoal panel (#171B19, border #343B35)
 *   - Master AI CLUB heading in Archivo ExtraBold (#E9E7DD)
 *   - Tagline: "Where Curiosity Meets Intelligence." (#A7B7A1)
 *   - Readable description with controlled line width (#B5B8AF, Inter)
 *   - "EXPLORE FACILITY" tactile CTA button
 * - Right Side (~48%): Dedicated negative space framing the floating NEX-01 companion
 * - Bottom Horizontal Strip: Independent performance telemetry (450+ Members, 32 Projects, 14 Papers)
 *   and Scroll To Explore cue, with zero overlap across all screen sizes.
 */
export default function Zone1Hero({ onExploreClick }) {
  const handleEnter = useCallback(() => {
    audioManager.playWhoosh();
    if (onExploreClick) onExploreClick();
  }, [onExploreClick]);

  return (
    <section
      id="section-arrival"
      className="relative w-full min-h-[100svh] flex flex-col justify-between px-6 sm:px-10 md:px-12 lg:px-16 pt-24 sm:pt-28 pb-6 sm:pb-8 select-none font-sans"
    >
      {/* ============================================================== */}
      {/* MASTER TWO-COLUMN HERO COMPOSITION                              */}
      {/* ============================================================== */}
      <div className="w-full my-auto py-2 sm:py-4 pointer-events-none">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* ========================================================== */}
          {/* LEFT SIDE: ~52% WIDTH COMPACT EDITORIAL CONTENT PANEL      */}
          {/* ========================================================== */}
          <div className="w-full lg:w-[52%] max-w-[560px] xl:max-w-[620px] pointer-events-auto">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#141819]/85 backdrop-blur-md border border-white/[0.1] shadow-[0_12px_40px_rgba(0,0,0,0.55)] crosshair-corner">
              {/* Telemetry Sector Badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3.5 rounded-md bg-[#181D1E] border border-white/[0.08] text-[10px] font-mono tracking-widest text-[#A7B7A1] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#24BFEA] animate-pulse shadow-[0_0_8px_#24BFEA]" />
                <span>SECTOR 01 // THE ARRIVAL</span>
              </div>

              {/* Master Display Heading with Archivo ExtraBold & Metallic Gradient */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-archivo font-black tracking-tight text-gradient-cyber mb-2 leading-[0.94] drop-shadow-sm">
                {CLUB_INFO.name}
              </h1>

              {/* Tagline Below Heading with Space Grotesk */}
              <p className="text-lg sm:text-xl lg:text-2xl font-space font-medium text-[#B6C4B4] mb-4 tracking-tight">
                {CLUB_INFO.tagline}
              </p>

              {/* Controlled-Width Description Prose */}
              <p className="text-xs sm:text-sm text-[#B5B8AF] max-w-[480px] leading-relaxed mb-6 font-normal">
                An autonomous collegiate research collective advancing machine intelligence, foundation models, and high-performance computing infrastructure at Madhav Institute of Technology & Science.
              </p>

              {/* Tactile Action Button */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleEnter}
                  className="group flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-[#A7B7A1] to-[#B6C4B4] hover:from-[#B6C4B4] hover:to-[#C8D6C6] text-[#141819] font-archivo font-extrabold text-xs rounded-lg transition-all cursor-pointer tracking-wider uppercase btn-tactile shadow-[0_4px_20px_rgba(167,183,161,0.35)] active:shadow-tactile-active"
                >
                  <span>EXPLORE FACILITY</span>
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 text-[#141819]" />
                </button>

                <span className="hidden sm:inline-block font-mono text-[11px] text-[#A7B7A1]/80 uppercase tracking-wider">
                  [PRESS ↓ OR SCROLL]
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT SIDE: ~48% DEDICATED VISUAL SPACE FOR NEX-01         */}
          {/* Unobstructed negative space allowing full robot visibility  */}
          {/* ========================================================== */}
          <div className="w-full lg:w-[48%] pointer-events-none" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* SEAMLESS BOTTOM HORIZONTAL STRIP: TELEMETRY DOCK & EXPLORE HUD */}
      {/* Smooth atmospheric gradient fade, eliminating harsh cutoffs    */}
      {/* ============================================================== */}
      <div className="relative z-30 w-full pt-8 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4 pointer-events-auto">
        {/* Mobile Telemetry Sector Badge */}
        <div className="flex items-center gap-2 md:hidden font-mono text-xs text-[#A7B7A1]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#24BFEA] animate-pulse shadow-[0_0_8px_#24BFEA]" />
          <span>SECTOR 01: THE ARRIVAL</span>
        </div>

        {/* 3 Required Verified Statistics in Frosted Floating Telemetry Dock */}
        {/* Padded left to never collide with DepthTelemetry on desktop */}
        <div className="flex items-center gap-5 sm:gap-7 md:gap-9 px-4 sm:px-6 py-2.5 rounded-xl bg-[#121618]/70 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] crosshair-corner md:ml-32 lg:ml-40">
          {/* Metric 1 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#24BFEA] animate-pulse shadow-[0_0_6px_#24BFEA]" />
              <span className="text-[10px] text-[#A7B7A1] tracking-[0.14em] uppercase font-mono font-medium">
                Verified Members
              </span>
            </div>
            <span className="text-base sm:text-lg text-[#F2EFE8] font-bold font-mono tracking-tight tnum mt-0.5">
              450+
            </span>
          </div>

          <div className="w-[1px] h-7 bg-white/[0.08] hidden sm:block" />

          {/* Metric 2 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_6px_#22C55E]" />
              <span className="text-[10px] text-[#A7B7A1] tracking-[0.14em] uppercase font-mono font-medium">
                Shipped Projects
              </span>
            </div>
            <span className="text-base sm:text-lg text-[#F2EFE8] font-bold font-mono tracking-tight tnum mt-0.5">
              32
            </span>
          </div>

          <div className="w-[1px] h-7 bg-white/[0.08] hidden sm:block" />

          {/* Metric 3 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A7B7A1] animate-pulse shadow-[0_0_6px_#A7B7A1]" />
              <span className="text-[10px] text-[#A7B7A1] tracking-[0.14em] uppercase font-mono font-medium">
                Research Papers
              </span>
            </div>
            <span className="text-base sm:text-lg text-[#F2EFE8] font-bold font-mono tracking-tight tnum mt-0.5">
              14
            </span>
          </div>
        </div>

        {/* Scroll To Explore Indicator Cue: Seamless Frosted Capsule */}
        {/* Padded right to prevent collision with BdxHolographicProjector button */}
        <div className="flex items-center sm:pr-24 md:pr-28">
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
      </div>
    </section>
  );
}
