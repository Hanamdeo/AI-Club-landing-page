'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { gdRoomData, gdCategories } from '@/data/gdData';
import { Button } from '@/components/ui/Button';
import {
  Scale,
  ShieldAlert,
  Check,
  Search,
  BookOpen,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Info,
} from 'lucide-react';

export default function GDArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(gdRoomData.discussions[0]?.id || null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter discussions
  const filteredDiscussions = gdRoomData.discussions.filter((d) => {
    const matchesCategory =
      selectedCategory === 'All' || d.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      searchQuery === '' ||
      d.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-background text-white flex flex-col selection:bg-phoenix-orange selection:text-white">
      {/* Global Navbar */}
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* A. GD Page Header (PRD Section 5.2 A) */}
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-phoenix-orange uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-phoenix-orange animate-pulse" />
              <span>THE DIALECTIC ROOM // TECHNICAL & PHILOSOPHICAL ARCHIVE</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-primary">
              The GD <span className="text-gradient-flame">Archive</span>.
            </h1>

            <p className="text-base sm:text-lg text-secondary font-sans leading-relaxed">
              {gdRoomData.subtitle}
            </p>

            <div className="p-4 bg-navy-deep/60 border-l-2 border-phoenix-orange space-y-2 text-xs font-mono">
              <div className="text-primary font-bold">Discussion Format & Cadence:</div>
              <div className="text-secondary leading-relaxed">
                {gdRoomData.formatExplanation} — Held {gdRoomData.cadence} at {gdRoomData.venue}.
              </div>
            </div>
          </div>

          {/* Rules of the Dialectic Arena */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-black/40 border border-white/10">
            {gdRoomData.rules.map((rule, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="text-[10px] font-mono text-phoenix-orange uppercase tracking-wider font-bold">
                  Rule 0{idx + 1}
                </span>
                <p className="text-xs text-secondary font-sans leading-snug">
                  {rule}
                </p>
              </div>
            ))}
          </div>

          {/* Discovery & Search Bar (PRD Section 5.2 D) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, questions, or codes (e.g. GD-41)..."
                className="w-full bg-navy-deep/70 border border-white/10 pl-10 pr-4 py-2.5 text-xs font-mono text-primary placeholder-secondary/50 focus:outline-none focus:border-phoenix-orange transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {gdCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-phoenix-orange/20 border-phoenix-orange text-phoenix-orange font-bold'
                      : 'border-white/10 text-secondary hover:text-primary hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* B & C. Discussion Listing & Detailed Entries (PRD Section 5.2 B & C) */}
          <div className="space-y-6">
            {filteredDiscussions.length === 0 ? (
              <div className="p-16 bg-navy-deep/30 border border-white/10 text-center space-y-3">
                <Info className="w-10 h-10 text-secondary mx-auto" />
                <h3 className="text-xl font-display font-bold text-primary">
                  No Discussions Found
                </h3>
                <p className="text-sm text-secondary font-sans">
                  Try broadening your search query or selecting a different category filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-xs font-mono text-phoenix-orange underline cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredDiscussions.map((entry) => {
                const isExpanded = expandedId === entry.id;

                return (
                  <div
                    key={entry.id}
                    className={`border transition-all duration-300 ${
                      isExpanded
                        ? 'bg-navy-deep/80 border-phoenix-orange/50 shadow-2xl'
                        : 'bg-navy-deep/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Collapsed Header Bar */}
                    <div
                      onClick={() => toggleExpand(entry.id)}
                      className="p-6 sm:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                          <span className="px-2.5 py-0.5 bg-phoenix-orange/20 text-phoenix-orange border border-phoenix-orange/40 font-bold">
                            {entry.code}
                          </span>
                          <span className="text-secondary">{entry.date}</span>
                          <span className="text-secondary/50">•</span>
                          <span className="text-phoenix-cyan uppercase">{entry.category}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-display font-bold text-primary hover:text-phoenix-orange transition-colors">
                          {entry.topic}
                        </h3>

                        <p className="text-sm text-secondary font-sans max-w-3xl leading-relaxed">
                          {entry.summary}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-xs font-mono text-secondary flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {entry.attendees} Debaters
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Detailed Entry (PRD Section 5.2 C) */}
                    {isExpanded && (
                      <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-white/10 space-y-8 animate-fadeIn">
                        {/* Background & Context */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono uppercase tracking-widest text-secondary font-semibold">
                            Background & Inquiry Context
                          </h4>
                          <p className="text-sm font-sans text-secondary leading-relaxed max-w-4xl">
                            {entry.background}
                          </p>
                        </div>

                        {/* Dialectic Two-Column Confrontation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Thesis (Pro Arguments) */}
                          <div className="p-6 bg-black/40 border-t-2 border-phoenix-blue space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-phoenix-blue uppercase tracking-widest font-bold">
                              <Scale className="w-4 h-4" />
                              <span>Thesis & Supporting Perspectives</span>
                            </div>
                            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-secondary">
                              {entry.proArguments.map((arg, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                  <Check className="w-4 h-4 text-phoenix-cyan shrink-0 mt-0.5" />
                                  <span>{arg}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Antithesis (Con Arguments) */}
                          <div className="p-6 bg-black/40 border-t-2 border-phoenix-orange space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-phoenix-orange uppercase tracking-widest font-bold">
                              <ShieldAlert className="w-4 h-4" />
                              <span>Antithesis & Opposing Critiques</span>
                            </div>
                            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-secondary">
                              {entry.conArguments.map((arg, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                  <span className="text-phoenix-orange font-bold text-sm shrink-0">✕</span>
                                  <span>{arg}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Documented Outcome & Takeaways (PRD Section 5.2 C) */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                          {/* Key Takeaways */}
                          <div className="md:col-span-6 space-y-3 p-5 bg-navy-surface/40 border border-white/5">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-phoenix-cyan font-bold">
                              Key Takeaways & Empirical Insights
                            </h4>
                            <ul className="space-y-2 text-xs font-sans text-secondary">
                              {entry.takeaways.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-phoenix-cyan font-mono font-bold">0{idx + 1}.</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Outcome / Consensus Status */}
                          <div className="md:col-span-6 space-y-3 p-5 bg-navy-surface/40 border border-white/5">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-phoenix-orange font-bold">
                              Documented Outcome & Nuance
                            </h4>
                            <p className="text-xs font-sans text-primary leading-relaxed italic">
                              "{entry.outcome}"
                            </p>
                          </div>
                        </div>

                        {/* Evidence, Sources & Further Reading */}
                        <div className="pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                          <div className="space-y-2">
                            <span className="text-secondary/70 uppercase">Citations & Benchmarks Audited:</span>
                            <ul className="space-y-1 text-secondary">
                              {entry.evidence.map((src, i) => (
                                <li key={i}>• {src}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <span className="text-secondary/70 uppercase">Further Reading & Papers:</span>
                            <div className="flex flex-wrap gap-3">
                              {entry.furtherReading.map((reading, i) => (
                                <a
                                  key={i}
                                  href={reading.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-phoenix-cyan hover:underline flex items-center gap-1"
                                >
                                  <span>{reading.title}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

