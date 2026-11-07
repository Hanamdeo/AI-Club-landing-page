'use client';

import React, { useCallback } from 'react';
import { Target, Compass, Cpu, Activity, Server, ExternalLink } from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { RESEARCH_TRACKS } from '@/data/research';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 02: The Intelligence Core
 * Architectural computing core at Z = -15 in the corridor.
 * Redesigned into an open, asymmetric dual-bay layout:
 * - Left Bay: Clean, high-contrast mission, research tracks, and verified statistics.
 * - Right Bay: Clear negative space framing the interactive 3D server rack node
 *   with an attached hardware telemetry inspection dossier.
 */
export default function Zone2Foundation({ onInspectRack }) {
  const handleInspect = useCallback(() => {
    audioManager.playServo();
    audioManager.playBeep(1100, 0.1);
    if (onInspectRack) onInspectRack();
  }, [onInspectRack]);

  return (
    <section
      id="intelligence-core"
      className="relative w-full min-h-screen flex items-center justify-between p-6 sm:p-10 md:p-14 lg:p-16 select-none font-sans"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ============================================================== */}
        {/* LEFT BAY: Clean Editorial Dossier (Cols 1-7)                   */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 flex flex-col justify-center pointer-events-auto">
          {/* Section Marker */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 rounded-md bg-[#15191A] border border-white/[0.08] text-[11px] font-mono text-sage uppercase tracking-wider w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <span>Sector 02 // Core Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ivory tracking-tight mb-2 leading-[1.05]">
            THE INTELLIGENCE CORE
          </h2>

          <p className="text-sm sm:text-base text-sage font-light mb-6 tracking-tight">
            Foundational Machine Learning, Novel Architectures & Distributed Systems
          </p>

          {/* Mission & Vision: Slim Architectural Panels with Hairline Borders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 sm:p-5 rounded-xl bg-[#15191A]/85 backdrop-blur-md border border-white/[0.08] crosshair-corner">
              <div className="flex items-center gap-2 mb-2 text-sage">
                <Target className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono font-semibold tracking-wider uppercase">
                  Mission Statement
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-normal">
                {CLUB_INFO.mission}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#15191A]/85 backdrop-blur-md border border-white/[0.08] crosshair-corner">
              <div className="flex items-center gap-2 mb-2 text-sage">
                <Compass className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono font-semibold tracking-wider uppercase">
                  Long-Horizon Vision
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-normal">
                {CLUB_INFO.vision}
              </p>
            </div>
          </div>

          {/* Core Research Domains: 4-Column Technical Tags */}
          <div className="mb-6">
            <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-2 font-semibold">
              // ACTIVE RESEARCH DOMAINS:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {RESEARCH_TRACKS.slice(0, 4).map((track) => (
                <div
                  key={track.id}
                  className="p-3 rounded-lg bg-[#15191A]/70 border border-white/[0.06] hover:border-white/[0.14] transition-colors"
                >
                  <div className="text-[9px] font-mono text-sage uppercase font-semibold mb-0.5">
                    {track.clusterAllocation}
                  </div>
                  <h4 className="text-xs font-bold text-ivory tracking-tight line-clamp-1">
                    {track.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Membership & Cluster Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.08]">
            {CLUB_INFO.metrics.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-mono font-bold text-sage tracking-tight tnum num-normal">
                  {stat.value}
                </span>
                <span className="text-xs text-ivory font-semibold mt-0.5 tracking-tight">
                  {stat.label}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {stat.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT BAY: Open Viewport framing 3D Node + Hardware Dossier     */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center pointer-events-auto">
          {/* Hardware Diagnostic Node Card (Frames 3D Server Node) */}
          <div className="w-full max-w-sm p-5 rounded-xl bg-[#0D1011]/80 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)] crosshair-corner">
            {/* Top Node Status Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-3 border-b border-white/[0.06]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-green" />
                <span>NODE_02 // ONLINE</span>
              </span>
              <span className="text-sage font-semibold">42U SXM5</span>
            </div>

            {/* Diagnostic Details */}
            <div className="py-3.5 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-500 text-[11px]">ARCHITECTURE</span>
                <span className="text-ivory font-semibold text-[11px]">HIGH-DENSITY COMPUTE</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-500 text-[11px]">COOLING LOOP</span>
                <span className="text-sage text-[11px]">IN-ROW LIQUID // NOMINAL</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-500 text-[11px]">INTERCONNECT</span>
                <span className="text-ivory text-[11px]">NVLINK 4.0 FULL MESH</span>
              </div>
            </div>

            {/* Interactive Server Blade Inspection Trigger */}
            <button
              onClick={handleInspect}
              className="w-full mt-2 flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg bg-[#15191A] hover:bg-white/[0.06] border border-white/[0.12] hover:border-sage/50 text-xs font-mono font-semibold text-sage transition-all cursor-pointer btn-tactile"
            >
              <Cpu className="w-3.5 h-3.5 text-sage" />
              <span>INSPECT SERVER BLADE [↗]</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
