'use client';

import React from 'react';
import { Target, Compass, Cpu, Activity, Sparkles, Layers, BookOpen } from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { RESEARCH_TRACKS } from '@/data/research';
import GlassPanel from '../GlassPanel';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 02: The Intelligence Core
 * Architectural computing core at Z = -15 in the corridor.
 * Presents club identity, mission, core AI domains, verified membership statistics,
 * and the interactive server rack inspection.
 */
export default function Zone2Foundation({ onInspectRack }) {
  const handleInspect = () => {
    audioManager.playServo();
    audioManager.playBeep(1100, 0.1);
    if (onInspectRack) onInspectRack();
  };

  return (
    <section
      id="intelligence-core"
      className="relative w-full min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-16 select-none font-sans"
    >
      <div className="w-full max-w-6xl">
        <GlassPanel>
          {/* Section Header with Interactive Landmark Hint */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-sage/10 border border-sage/30 text-xs font-mono text-sage uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Section 02 // Architectural Core</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-ivory tracking-tight drop-shadow-sm">
                THE INTELLIGENCE CORE
              </h2>
              <p className="text-base sm:text-lg text-sage/90 font-light mt-1 tracking-wide">
                Architecting the Future of Machine Intelligence & Distributed Systems
              </p>
            </div>

            {/* Interactive Node Telemetry Launcher */}
            <button
              onClick={handleInspect}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black/30 hover:bg-sage/20 border border-white/15 hover:border-sage text-xs font-medium text-sage transition-all self-start sm:self-auto cursor-pointer group shadow-none pointer-events-auto"
            >
              <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
              <Cpu className="w-4 h-4 text-sage" />
              <span className="font-semibold tracking-wide uppercase">INSPECT SERVER BLADE</span>
              <Activity className="w-3.5 h-3.5 text-sage/60 group-hover:text-sage transition-colors" />
            </button>
          </div>

          {/* Mission & Vision Dual Transparent Glass Alcoves */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-black/20 border border-white/10 hover:border-sage/40 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-sage" />
                <h3 className="text-xs font-mono font-semibold tracking-wider text-sage uppercase">
                  Mission Statement
                </h3>
              </div>
              <p className="text-sm text-ivory/85 leading-relaxed font-normal">
                {CLUB_INFO.mission}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/20 border border-white/10 hover:border-sage/40 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-4 h-4 text-sage" />
                <h3 className="text-xs font-mono font-semibold tracking-wider text-sage uppercase">
                  Long-Horizon Vision
                </h3>
              </div>
              <p className="text-sm text-ivory/85 leading-relaxed font-normal">
                {CLUB_INFO.vision}
              </p>
            </div>
          </div>

          {/* Core AI Research Tracks */}
          <div className="mb-8">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 font-semibold">
              // CORE RESEARCH & COGNITIVE TRACKS:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {RESEARCH_TRACKS.map((track) => (
                <div
                  key={track.id}
                  className="p-5 rounded-2xl bg-black/20 border border-white/10 hover:border-sage/40 transition-all"
                >
                  <div className="text-[10px] font-mono text-sage uppercase font-bold mb-1">
                    Lead: {track.lead}
                  </div>
                  <h4 className="text-sm font-bold text-ivory mb-2 tracking-tight">
                    {track.title}
                  </h4>
                  <p className="text-xs text-ivory/70 leading-relaxed line-clamp-3 mb-3">
                    {track.focus}
                  </p>
                  <div className="text-[10px] font-mono text-slate-400">
                    Cluster: {track.clusterAllocation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Membership & Cluster Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            {CLUB_INFO.metrics.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-sage tracking-tight num-normal">
                  {stat.value}
                </div>
                <div className="text-xs text-ivory font-semibold mt-1 tracking-tight">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  {stat.unit}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
