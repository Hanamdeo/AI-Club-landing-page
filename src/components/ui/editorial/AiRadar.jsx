'use client';

import React, { useState } from 'react';
import {
  Radar,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Building,
  Tag,
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
    <section id="radar" className="relative w-full py-24 px-6 md:px-12 lg:px-16 border-t border-white/10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-sage/10 border border-sage/30 text-xs font-mono text-sage uppercase tracking-wider">
              <Radar className="w-3.5 h-3.5 text-sage animate-spin" />
              <span>Section 06 // Global Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-ivory tracking-tight">
              AI RADAR
            </h2>
            <p className="text-base sm:text-lg text-sage/90 font-light mt-2 max-w-2xl">
              Curated frontier intelligence tracking verified model releases, hardware-aware systems breakthroughs, and open agent protocols.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-sage bg-black/40 px-4 py-2 rounded-xl border border-white/10 self-start md:self-auto">
            <Radio className="w-3.5 h-3.5 animate-pulse text-sage" />
            <span>RADAR FEED: 6 DISPATCHES ACTIVE</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                audioManager.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sage/20 border border-sage text-sage shadow-sage-glow'
                  : 'bg-black/20 border border-white/10 text-ivory/70 hover:border-white/20 hover:text-ivory'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Radar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-charcoal/40 border border-white/10 p-6 hover:border-sage/40 hover:bg-charcoal/60 transition-all flex flex-col justify-between shadow-glass-panel group"
            >
              <div>
                {/* Header Tag & Impact Level */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-black/40 border border-white/10 text-sage font-medium">
                    {item.category}
                  </span>
                  {item.impactLevel && (
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                        item.impactLevel === 'Critical'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-sage/20 text-sage border border-sage/30'
                      }`}
                    >
                      {item.impactLevel} Impact
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h3 className="text-lg font-bold text-ivory mb-2.5 leading-snug tracking-tight group-hover:text-sage transition-colors">
                  {item.headline}
                </h3>

                {/* Summary */}
                <p className="text-xs text-ivory/80 leading-relaxed mb-4 font-normal">
                  {item.summary}
                </p>

                {/* Tags */}
                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 border border-white/5 text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Source & External Link Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                <div className="text-slate-400 truncate max-w-[170px]" title={item.source}>
                  {item.source}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sage hover:text-sage-glow hover:underline transition-colors shrink-0"
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

