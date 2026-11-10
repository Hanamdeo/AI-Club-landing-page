'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Radio, ArrowRight, ArrowDown, BookOpen, ChevronRight } from 'lucide-react';
import { ZONE_RESEARCH } from '@/data/clubData';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 04: Research Zone
 * Open architectural HUD (Intelligence Core).
 * Content revealed: AI research, learning initiatives and resources.
 */
export default function Zone4Research({ onNextZone }) {
  const [activeTab, setActiveTab] = useState(ZONE_RESEARCH.domains[0].id);

  const currentDomain =
    ZONE_RESEARCH.domains.find((d) => d.id === activeTab) ||
    ZONE_RESEARCH.domains[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-none font-sans">
      <div className="glass-panel p-6 sm:p-8 rounded-xl relative">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-[rgba(150,230,255,0.16)] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-[#55DFFF]">
            <span className="w-2 h-2 rounded-full bg-[#55DFFF] animate-pulse shadow-[0_0_8px_rgba(85,223,255,0.7)]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 04 // RESEARCH LABS & INTELLIGENCE CORE
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#B8C7D4]">
            <BookOpen className="w-3.5 h-3.5 text-[#55DFFF]" />
            <span className="tracking-tight uppercase">
              14 PREPRINTS & BENCHMARKS • 4 ACTIVE TRACKS
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
            AI Research, Learning & Resources
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(240,247,255,0.92)] font-sans max-w-2xl leading-[1.65] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Investigating novel cognitive and algorithmic paradigms through reproducible benchmarks, open preprints, and low-latency system runtimes.
          </p>
        </div>

        {/* Research Radar Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
          {/* Left Domain Selector Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <span className="text-[10px] font-mono text-[#B8C7D4] uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Radio className="w-3.5 h-3.5 text-[#55DFFF] animate-pulse" />
              <span>ACTIVE RESEARCH TRACKS</span>
            </span>

            {ZONE_RESEARCH.domains.map((domain) => {
              const isSelected = domain.id === activeTab;
              return (
                <button
                  key={domain.id}
                  onClick={() => {
                    audioManager.playClick();
                    setActiveTab(domain.id);
                  }}
                  className={`flex items-center justify-between p-3.5 text-left rounded-lg transition-all duration-200 cursor-pointer border btn-tactile ${
                    isSelected
                      ? 'bg-[rgba(85,223,255,0.15)] border-[#55DFFF] text-white shadow-[0_0_16px_rgba(85,223,255,0.25)]'
                      : 'glass-card border-[rgba(150,230,255,0.14)] text-[#B8C7D4] hover:text-white'
                  }`}
                >
                  <div>
                    <div className="text-xs sm:text-sm font-display font-bold tracking-tight text-white">
                      {domain.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#55DFFF] mt-0.5">
                      {domain.badge}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#55DFFF] translate-x-1' : 'text-[#B8C7D4]/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Detailed Laboratory Dossier */}
          <div className="lg:col-span-7 border-l-2 border-[rgba(150,230,255,0.16)] pl-6 py-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(150,230,255,0.14)] mb-3">
                <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                  {currentDomain.name}
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-[rgba(85,223,255,0.10)] text-[#55DFFF] border border-[rgba(85,223,255,0.30)]">
                  {currentDomain.badge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[rgba(240,247,255,0.92)] leading-[1.65] mb-4 font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {currentDomain.abstract}
              </p>

              {/* Core Publications */}
              <div className="mb-4">
                <span className="text-[10px] font-mono text-[#B8C7D4] uppercase tracking-widest block mb-2">
                  DISPATCHED PAPERS & PREPRINTS
                </span>
                <div className="space-y-1.5">
                  {currentDomain.publications.map((pub, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 py-1 text-xs font-mono text-white/95"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#55DFFF] shrink-0 shadow-[0_0_6px_#55DFFF]" />
                      <span className="truncate">{pub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus Keywords / Tags */}
              <div>
                <span className="text-[10px] font-mono text-[#B8C7D4] uppercase tracking-widest block mb-2">
                  CORE TAXONOMY
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentDomain.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-[rgba(85,223,255,0.08)] text-[#B8C7D4] border border-[rgba(150,230,255,0.16)]"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(150,230,255,0.14)] mt-4">
              <Link
                href="/research"
                onClick={() => audioManager.playClick()}
                className="flex items-center justify-between text-xs font-mono text-[#55DFFF] hover:text-white transition-colors group"
              >
                <span className="font-semibold">EXPLORE ALL 4 RESEARCH TRACKS & LABS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-[rgba(150,230,255,0.16)] flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-[#B8C7D4]">
            OPEN REPRODUCIBILITY • CITABLE ARTIFACTS
          </span>

          {onNextZone && (
            <button
              onClick={() => {
                audioManager.playWhoosh();
                onNextZone();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card hover:border-[#55DFFF]/50 text-xs font-mono text-[#B8C7D4] hover:text-white transition-all cursor-pointer btn-tactile"
            >
              <span>DESCEND TO PROJECTS ZONE</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#55DFFF]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
