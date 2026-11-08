'use client';

import React, { useCallback } from 'react';
import { Target, Compass, Cpu, Server, Activity, ArrowRight } from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { RESEARCH_TRACKS } from '@/data/research';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 02: The Intelligence Core (In-Environment Server Rack Displays)
 * Presented as rack-mounted hardware displays and blade telemetry docked into the computing aisle:
 * - Left Bay: Chassis 01 & Chassis 02 Server Display Consoles (Mission, Vision, Modular AI Blades).
 * - Right Bay: Hardware Diagnostics Console framing the physical 3D compute blade.
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
        {/* LEFT BAY: RACK-MOUNTED SERVER CONSOLES (Cols 1-7)              */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 flex flex-col justify-center pointer-events-auto">
          {/* Section Marker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-md bg-[#131718] border border-white/[0.08] text-[10px] font-mono text-[#A7B7A1] uppercase tracking-widest w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse shadow-[0_0_8px_rgba(162,178,159,0.5)]" />
            <span>SECTOR 02 // INTELLIGENCE CORE • RACK 42U-A</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-gradient-cyber tracking-tight mb-2 leading-[1.05]">
            THE INTELLIGENCE CORE
          </h2>

          <p className="text-sm sm:text-base font-space font-medium text-[#B6C4B4] mb-6 tracking-tight">
            Foundational Machine Learning, Novel Architectures & Distributed Systems
          </p>

          {/* Mission & Vision: Rack-Mounted Server Display Bezels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Chassis 01: Mission */}
            <div className="server-rack-console corner-reticle p-4 sm:p-5 rounded-xl">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/[0.06] text-[9px] font-mono">
                <span className="flex items-center gap-1.5 text-sage font-bold uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5" />
                  CHASSIS 01 // MISSION
                </span>
                <span className="text-[#22C55E] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  ACTIVE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ivory/85 leading-relaxed font-normal">
                {CLUB_INFO.mission}
              </p>
            </div>

            {/* Chassis 02: Vision */}
            <div className="server-rack-console corner-reticle p-4 sm:p-5 rounded-xl">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/[0.06] text-[9px] font-mono">
                <span className="flex items-center gap-1.5 text-sage font-bold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  CHASSIS 02 // VISION
                </span>
                <span className="text-[#24BFEA] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#24BFEA]" />
                  SYNCED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ivory/85 leading-relaxed font-normal">
                {CLUB_INFO.vision}
              </p>
            </div>
          </div>

          {/* Core Research Domains: Modular Server Blades (Hot-Swappable AI Trays) */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-2 font-semibold">
              <span>ACTIVE RESEARCH BLADES</span>
              <span className="text-sage text-[9px]">4/4 BAYS OCCUPIED</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {RESEARCH_TRACKS.slice(0, 4).map((track, i) => (
                <div
                  key={track.id}
                  className="p-3 rounded-lg bg-[#141819]/80 border border-white/[0.08] hover:border-sage/40 transition-all card-lift cursor-default"
                >
                  <div className="flex items-center justify-between text-[8px] font-mono text-sage uppercase font-bold mb-1">
                    <span>BAY 0{i + 1}</span>
                    <span className="w-1 h-1 rounded-full bg-signal-green" />
                  </div>
                  <h4 className="text-xs font-bold text-ivory tracking-tight line-clamp-1 mb-0.5">
                    {track.title}
                  </h4>
                  <div className="text-[9px] font-mono text-slate-400 truncate">
                    {track.clusterAllocation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Membership & Cluster Metrics in Floor-Docked Bar */}
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
        {/* RIGHT BAY: Hardware Diagnostics Console Framing 3D Server Node */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center pointer-events-auto">
          <div className="w-full max-w-sm p-5 rounded-xl server-rack-console corner-reticle shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
            {/* Top Node Status Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-3 border-b border-white/[0.06]">
              <span className="flex items-center gap-1.5 text-ivory">
                <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
                <span className="font-bold">COMPUTE NODE 42U</span>
              </span>
              <span className="text-sage text-[9px] uppercase font-semibold">NODE_STATUS: NOMINAL</span>
            </div>

            {/* Diagnostic Details */}
            <div className="py-3.5 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400 text-[11px]">ARCHITECTURE</span>
                <span className="text-ivory font-semibold text-[11px]">DISTRIBUTED GPU FABRIC</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400 text-[11px]">COOLING PLENUM</span>
                <span className="text-sage text-[11px]">IN-ROW PRECISION CRAH</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400 text-[11px]">CLUSTER BANDWIDTH</span>
                <span className="text-ivory text-[11px]">800 Gb/s RDMA RoCEv2</span>
              </div>
            </div>

            {/* Interactive Server Blade Inspection Trigger */}
            <button
              onClick={handleInspect}
              className="w-full mt-2 flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg bg-[#15191A] hover:bg-white/[0.06] border border-white/[0.12] hover:border-sage/50 text-xs font-mono font-semibold text-sage transition-all cursor-pointer btn-tactile group"
            >
              <Cpu className="w-3.5 h-3.5 text-sage group-hover:scale-110 transition-transform" />
              <span>INSPECT HARDWARE BLADE</span>
              <ArrowRight className="w-3 h-3 text-sage group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
