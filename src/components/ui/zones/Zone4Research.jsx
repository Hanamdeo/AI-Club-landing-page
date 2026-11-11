'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Radio, ArrowRight, ArrowDown, BookOpen, ChevronRight, Cpu } from 'lucide-react';
import { RESEARCH_TRACKS, COMPUTE_SPECS } from '@/data/research';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 04: Research Zone
 * Open architectural HUD (Intelligence Core).
 * Content revealed: AI research, learning initiatives and resources.
 */
export default function Zone4Research({ onNextZone }) {
  const [activeTab, setActiveTab] = useState(RESEARCH_TRACKS[0].id);

  const currentTrack =
    RESEARCH_TRACKS.find((d) => d.id === activeTab) ||
    RESEARCH_TRACKS[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-text font-sans safe-viewport-card custom-scrollbar pointer-events-auto">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative shadow-[0_16px_48px_rgba(0,0,0,0.65)]">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-white/[0.12] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 04 // RESEARCH LABS & INTELLIGENCE CORE
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span className="tracking-tight uppercase">
              14 PREPRINTS & BENCHMARKS • 4 ACTIVE TRACKS
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            AI Research, Learning & Resources
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 font-sans max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Investigating novel cognitive and algorithmic paradigms through reproducible benchmarks, open preprints, and low-latency system runtimes.
          </p>
        </div>

        {/* Research Radar Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6">
          {/* Left Domain Selector Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5 mb-1 font-semibold">
              <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>ACTIVE RESEARCH TRACKS</span>
            </span>

            {RESEARCH_TRACKS.map((track) => {
              const isSelected = track.id === activeTab;
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    audioManager.playClick();
                    setActiveTab(track.id);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between group pointer-events-auto ${
                    isSelected
                      ? 'bg-white/[0.16] border-white text-white shadow-[0_0_16px_rgba(255,255,255,0.20)]'
                      : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isSelected ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/30'
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-display font-bold text-white truncate">
                        {track.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Lead: {track.lead}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-white translate-x-0.5' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                </button>
              );
            })}

            {/* Cluster Spec Telemetry Capsule */}
            <div className="p-3.5 rounded-xl border border-white/[0.10] bg-black/40 mt-1">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                <Cpu className="w-3.5 h-3.5 text-white" />
                <span>HARDWARE ACCELERATION CLUSTER</span>
              </div>
              <div className="text-xs font-mono text-white font-medium">
                {COMPUTE_SPECS.accelerators}
              </div>
            </div>
          </div>

          {/* Right Pillar: Selected Domain Deep-Dive Briefing */}
          <div className="lg:col-span-7 flex flex-col justify-between border-t border-white/[0.12] lg:border-t-0 lg:border-l lg:border-white/[0.12] pt-5 lg:pt-0 lg:pl-6 py-1">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  DOMAIN SPECIFICATION
                </span>
                <h3 className="text-xl font-display font-bold text-white drop-shadow-sm">
                  {currentTrack.title}
                </h3>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  RESEARCH FOCUS & METHODOLOGY
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  {currentTrack.focus}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  PEER-REVIEWED PREPRINTS & PUBLICATIONS
                </span>
                <ul className="space-y-2">
                  {currentTrack.publications.map((pub, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-slate-200 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.7)] mt-1.5" />
                      <span>{pub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                  STACK & COMPUTE NODES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTrack.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.08] text-slate-300 border border-white/10 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/research"
              onClick={() => audioManager.playClick()}
              className="mt-5 flex items-center justify-between text-xs font-mono text-slate-200 hover:text-white transition-colors group p-2.5 rounded-lg border border-white/[0.10] hover:border-white/30 bg-white/[0.04] pointer-events-auto"
            >
              <span className="font-semibold">VIEW ALL RESEARCH ARCHIVES & PAPERS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-white/[0.12] flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/research"
            onClick={() => audioManager.playClick()}
            className="flex items-center gap-2 text-xs font-mono text-slate-200 hover:text-white transition-colors group pointer-events-auto"
          >
            <span className="font-semibold">OPEN REPRODUCIBLE RESEARCH BENCHMARKS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {onNextZone && (
            <button
              onClick={() => {
                audioManager.playWhoosh();
                onNextZone();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.18] text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/20 btn-tactile pointer-events-auto"
            >
              <span>DESCEND TO PROJECT REPOSITORIES</span>
              <ArrowDown className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
