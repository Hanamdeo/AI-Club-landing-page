'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Radio,
  ChevronRight,
  ExternalLink,
  Calendar,
  Search,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Tag,
  Building,
} from 'lucide-react';
import { AI_NEWS } from '@/data/aiNews';
import { audioManager } from '@/utils/audioManager';

export default function DailyAiNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Model Release', 'Systems Research', 'Developer Tools', 'Agent Protocols', 'Frontier Reasoning'];

  const filteredNews = AI_NEWS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="relative min-h-screen bg-[#07090A] text-white font-manrope pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-facility-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(85,223,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
       

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 border-b border-[rgba(85,223,255,0.18)] pb-8">
          <div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-barlow-condensed font-bold uppercase tracking-tight text-white leading-tight">
              DAILY AI NEWS & RADAR
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-manrope mt-3 max-w-2xl leading-relaxed">
              Curated frontier publications, systems releases, and open protocol announcements verified by AI Club student research editors.
            </p>
          </div>

          <div className="p-4 px-6 rounded-2xl bg-[#0C1014]/90 border border-[rgba(85,223,255,0.22)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-start md:self-auto text-left md:text-right w-full sm:w-auto">
            <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              CURATED DISPATCHES
            </span>
            <span className="text-3xl font-barlow-condensed font-bold text-[#55DFFF] tracking-wider block">
              0{AI_NEWS.length} VERIFIED
            </span>
            <span className="text-[10px] font-mono text-[#24BFEA]">No Synthetic Noise</span>
          </div>
        </div>

        {/* Editorial Policy Transparency Banner (PRD 4.8 Compliance) */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0C1014]/70 border border-white/[0.08] text-[11px] font-mono text-slate-300 mb-8 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#24BFEA] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Curated Verification Policy:</strong> All news dispatches link directly to original primary reports, preprints, or official announcements. Entries undergo human editorial review by club coordinators before publication. This feed does not publish unreviewed auto-generated text.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    try { audioManager.playClick(); } catch {}
                    setSelectedCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[rgba(85,223,255,0.2)] text-white border border-[#55DFFF] shadow-[0_0_12px_rgba(85,223,255,0.3)] font-semibold'
                      : 'bg-[#0C1014] text-slate-400 hover:text-white border border-[rgba(85,223,255,0.14)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-auto sm:min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news, topics, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0C1014] border border-[rgba(85,223,255,0.2)] focus:border-[#55DFFF] rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* News Feed Grid */}
        <div className="space-y-6 mb-14">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-7 md:p-8 rounded-2xl bg-[#0C1014]/90 border border-[rgba(85,223,255,0.18)] hover:border-[#55DFFF]/40 transition-colors shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[rgba(85,223,255,0.1)] border border-[rgba(85,223,255,0.25)] text-[#55DFFF] font-semibold uppercase">
                      {item.category}
                    </span>
                    {item.impactLevel && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#24BFEA]/15 text-[#55DFFF] border border-[#24BFEA]/30 font-semibold uppercase">
                        {item.impactLevel} Impact
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#24BFEA]" />
                      <span>Published: {item.date}</span>
                    </span>
                    <span>•</span>
                    <span className="text-signal-green flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Reviewed</span>
                    </span>
                  </div>
                </div>

                {/* Headline */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <h2 className="text-2xl sm:text-3xl font-barlow-condensed font-bold uppercase text-white group-hover:text-[#55DFFF] transition-colors mb-3 tracking-tight">
                    {item.headline}
                  </h2>
                </a>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 font-manrope leading-relaxed mb-6">
                  {item.summary}
                </p>

                {/* Tags */}
                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Publisher & External Link */}
              <div className="pt-4 border-t border-[rgba(85,223,255,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Building className="w-3.5 h-3.5 text-[#55DFFF]" />
                  <span>Publisher / Source: <strong className="text-white">{item.source}</strong></span>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl btn-glass-cyan text-xs font-mono font-bold transition-all shrink-0 self-start sm:self-auto"
                >
                  <span>OFFICIAL SOURCE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
