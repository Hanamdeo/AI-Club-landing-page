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
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#171B19]/80 backdrop-blur-md border border-[#343B35] shadow-[0_8px_32px_rgba(0,0,0,0.45)] crosshair-corner">
              {/* Master Display Heading with Archivo ExtraBold */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-archivo font-extrabold tracking-tight text-[#E9E7DD] mb-2 leading-[0.94]">
                {CLUB_INFO.name}
              </h1>

              {/* Tagline Below Heading */}
              <p className="text-lg sm:text-xl lg:text-2xl font-sans font-light text-[#A7B7A1] mb-4 tracking-tight">
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
                  className="group flex items-center gap-3 px-6 py-3.5 bg-[#A7B7A1] hover:bg-[#B6C4B4] text-[#171B19] font-archivo font-bold text-xs rounded-lg transition-all cursor-pointer tracking-wider uppercase btn-tactile shadow-tactile active:shadow-tactile-active"
                >
                  <span>EXPLORE FACILITY</span>
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 text-[#171B19]" />
                </button>

                <span className="hidden sm:inline-block font-mono text-[11px] text-[#B5B8AF]/70 uppercase tracking-wider">
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
      {/* INDEPENDENT BOTTOM HORIZONTAL STRIP: STATISTICS & HUD           */}
      {/* ============================================================== */}
      <div className="relative z-30 w-full pt-4 pb-1 border-t border-[#343B35] flex flex-col md:flex-row md:items-center justify-between gap-4 pointer-events-auto">
        {/* Mobile Telemetry Sector Badge */}
        <div className="flex items-center gap-2 md:hidden font-mono text-xs text-[#A7B7A1]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#24BFEA] animate-pulse" />
          <span>SECTOR 01: THE ARRIVAL</span>
        </div>

        {/* 3 Required Verified Statistics (Independent bottom horizontal strip) */}
        {/* Padded left to never collide with DepthTelemetry on desktop */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 md:gap-12 md:pl-36 lg:pl-44">
          {/* Metric 1 */}
          <div className="flex flex-col">
            <span className="text-[10px] text-[#B5B8AF] tracking-wider uppercase font-mono font-medium">
              Verified Members
            </span>
            <span className="text-base sm:text-lg text-[#E9E7DD] font-bold font-mono tracking-tight mt-0.5">
              450+
            </span>
          </div>

          <div className="w-[1px] h-7 bg-[#343B35] hidden sm:block" />

          {/* Metric 2 */}
          <div className="flex flex-col">
            <span className="text-[10px] text-[#B5B8AF] tracking-wider uppercase font-mono font-medium">
              Shipped Projects
            </span>
            <span className="text-base sm:text-lg text-[#E9E7DD] font-bold font-mono tracking-tight mt-0.5">
              32
            </span>
          </div>

          <div className="w-[1px] h-7 bg-[#343B35] hidden sm:block" />

          {/* Metric 3 */}
          <div className="flex flex-col">
            <span className="text-[10px] text-[#B5B8AF] tracking-wider uppercase font-mono font-medium">
              Research Papers
            </span>
            <span className="text-base sm:text-lg text-[#E9E7DD] font-bold font-mono tracking-tight mt-0.5">
              14
            </span>
          </div>
        </div>

        {/* Scroll To Explore Indicator Cue */}
        {/* Padded right to prevent collision with BdxHolographicProjector button */}
        <div className="flex items-center gap-4 sm:pr-28 md:pr-32">
          <button
            onClick={handleEnter}
            className="flex items-center gap-2.5 text-xs text-[#B5B8AF] hover:text-[#A7B7A1] transition-colors cursor-pointer font-mono"
          >
            <span className="tracking-widest uppercase text-[10px] font-medium">
              SCROLL TO EXPLORE
            </span>
            <div className="w-4 h-7 rounded-full border border-[#343B35] flex items-start justify-center p-1">
              <span className="w-1 h-1.5 rounded-full bg-[#A7B7A1] animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
