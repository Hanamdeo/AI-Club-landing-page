'use client';

import React, { useState } from 'react';
import { Radio, FileText, ChevronRight, Tag } from 'lucide-react';
import { ZONE_RESEARCH } from '@/data/clubData';
import GlassPanel from '../GlassPanel';

/**
 * Zone 03: Research Lab
 * Features a transparent rounded AI Research Radar display at Z = -45.
 * High-impact Space Grotesk display typography with transparent card styling.
 */
export default function Zone3Research() {
  const [activeTab, setActiveTab] = useState(ZONE_RESEARCH.domains[0].id);

  const currentDomain =
    ZONE_RESEARCH.domains.find((d) => d.id === activeTab) ||
    ZONE_RESEARCH.domains[0];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-16">
      <div className="w-full max-w-6xl">
        <GlassPanel>
          {/* Section Header */}
          <div className="mb-6 border-b border-white/10 pb-5">
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-ivory tracking-tight drop-shadow-sm">
              {ZONE_RESEARCH.heading}
            </h2>
            <p className="text-base sm:text-lg text-sage/90 font-light mt-1.5 tracking-wide font-sans">
              {ZONE_RESEARCH.subheading}
            </p>
          </div>

          {/* Research Radar Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Radar Selector Pillars */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              <span className="text-xs text-slate-400 tracking-wide font-sans font-medium uppercase flex items-center gap-2 mb-1">
                <Radio className="w-3.5 h-3.5 text-sage animate-pulse" />
                <span>Research Domains</span>
              </span>

              {ZONE_RESEARCH.domains.map((domain) => {
                const isSelected = domain.id === activeTab;
                return (
                  <button
                    key={domain.id}
                    onClick={() => setActiveTab(domain.id)}
                    className={`flex items-center justify-between p-4 text-left rounded-xl transition-all duration-200 border cursor-pointer ${
                      isSelected
                        ? 'bg-sage/20 border-sage text-ivory shadow-sage-glow'
                        : 'bg-black/15 border-white/10 text-ivory/80 hover:border-white/20 hover:bg-black/25 hover:text-ivory'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-sans font-bold tracking-tight">
                        {domain.name}
                      </div>
                      <div className="text-xs font-sans font-medium text-sage/80 mt-0.5">
                        {domain.badge}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-sage translate-x-1' : 'text-slate-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Laboratory Dossier */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-black/15 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="text-xs font-sans font-semibold text-sage uppercase tracking-wider">
                    {currentDomain.name}
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-sage/20 text-sage border border-sage/40 font-sans font-medium">
                    {currentDomain.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-sans font-bold text-ivory mb-3 tracking-tight">
                  {currentDomain.name}
                </h3>

                <p className="text-sm text-ivory/80 leading-relaxed mb-6 font-normal font-sans">
                  {currentDomain.abstract}
                </p>

                {/* Focus Keywords / Tags */}
                <div className="mb-6">
                  <span className="text-xs text-slate-400 block mb-2 font-sans font-medium uppercase tracking-wider">
                    Core Taxonomy
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentDomain.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-sans font-medium rounded-full bg-black/25 border border-white/10 text-ivory/80"
                      >
                        <Tag className="w-3 h-3 text-sage/70" />
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Publications / Preprints List */}
                <div>
                  <span className="text-xs text-slate-400 block mb-2 font-sans font-medium uppercase tracking-wider">
                    Recent Lab Publications & Preprints
                  </span>
                  <div className="space-y-2.5">
                    {currentDomain.publications.map((pub, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-xs text-ivory/85 bg-black/20 p-3 rounded-xl border border-white/10 font-medium font-sans"
                      >
                        <FileText className="w-4 h-4 text-sage shrink-0" />
                        <span>{pub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-sans font-medium text-slate-400">
                Open student research and peer-reviewed work
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
