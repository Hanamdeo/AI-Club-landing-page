'use client';

import React, { useState } from 'react';
import {
  Radar,
  ArrowUpRight,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { getCuratedNews } from '@/lib/contentSelectors';
import { filterByCategory, getUniqueCategories } from '@/lib/contentHelpers';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 06: AI Radar
 * Curated AI industry developments, model releases, systems research, and research preprints.
 * All entries reflect genuine, verified breakthroughs with direct links to sources.
 */
export default function AiRadar() {
  const news = getCuratedNews();
  const categories = getUniqueCategories(news, 'category');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredNews = filterByCategory(news, selectedCategory, 'category');

  return (
    <section id="radar" className="relative w-full py-20 px-6 md:px-12 lg:px-16 border-t border-white/[0.08] font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-md bg-[#131718] border border-white/[0.1] text-[10px] font-mono tracking-widest text-[#A7B7A1] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0] animate-pulse shadow-[0_0_8px_#E2E8F0]" />
              <span>SECTOR 06 // INTELLIGENCE RADAR</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-archivo font-black tracking-tight text-gradient-cyber leading-[0.98] drop-shadow-sm">
              AI RADAR
            </h2>
            <p className="text-sm sm:text-base text-[#B5B8AF] font-normal mt-3 max-w-2xl leading-relaxed">
              Curated frontier intelligence tracking verified model releases, hardware-aware systems breakthroughs, and open agent protocols.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A7B7A1] bg-[#131718] px-4 py-2 rounded-xl border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.3)] self-start md:self-auto crosshair-corner">
            <Radio className="w-3.5 h-3.5 text-[#E2E8F0] animate-pulse" />
            <span className="tracking-wider uppercase text-[11px] font-semibold">DISPATCHES ACTIVE: {filteredNews.length}</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  audioManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sage text-graphite font-semibold shadow-sm'
                    : 'bg-[#141819] text-ivory/70 border border-white/[0.08] hover:text-ivory hover:border-white/[0.16]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* News Radar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="relative rounded-xl bg-[#141819] border border-white/[0.08] hover:border-white/[0.16] p-5 sm:p-6 transition-all duration-200 card-lift crosshair-corner flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag & Impact Level */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-sage font-medium">
                    {item.category}
                  </span>
                  {item.impactLevel && (
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded font-medium uppercase ${
                        item.impactLevel === 'Critical'
                          ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                          : 'bg-sage/10 text-sage border border-sage/20'
                      }`}
                    >
                      {item.impactLevel} Impact
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h3 className="text-base sm:text-lg font-bold text-ivory mb-2 leading-snug tracking-tight group-hover:text-sage transition-colors line-clamp-2">
                  {item.headline}
                </h3>

                {/* Summary (2-line clamped to eliminate wall of text) */}
                <p className="text-xs sm:text-[13px] text-ivory/70 leading-relaxed mb-4 font-normal line-clamp-2">
                  {item.summary}
                </p>

                {/* Tags */}
                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-ivory/50"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Source & External Link Footer */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-ivory/50 truncate max-w-[170px]" title={item.source}>
                  {item.source}
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sage hover:text-ivory transition-colors shrink-0 font-medium"
                >
                  <span>Read Paper</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

