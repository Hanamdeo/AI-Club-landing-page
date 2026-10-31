'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransitionWrapper } from '@/components/layout/PageTransitionWrapper';
import { gdRoomData, gdCategories } from '@/data/gdData';
import { Button } from '@/components/ui/Button';
import { CircuitCard } from '@/components/ui/CircuitCard';
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
    <div className="relative min-h-screen bg-[#050507] text-text-primary flex flex-col selection:bg-circuit-amber selection:text-[#050507]">
      {/* Background Cyber-Circuit Grid */}
      <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />

      {/* Global Navbar */}
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 sm:px-8 relative z-10">
        <PageTransitionWrapper>
          <div className="max-w-7xl mx-auto space-y-16">
            {/* Header */}
            <div className="space-y-6 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0C0F14] border border-circuit-amber/30 rounded-[4px] text-xs font-mono text-circuit-amber uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-circuit-amber animate-pulse" />
                <span>THE DIALECTIC ROOM // TECHNICAL & PHILOSOPHICAL ARCHIVE</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tightest text-text-primary">
                The GD <span className="text-gradient-flame">Archive</span>.
              </h1>

              <p className="text-base sm:text-lg text-text-muted font-sans leading-relaxed">
                {gdRoomData.subtitle}
              </p>

              <div className="p-4 bg-[#0C0F14] border-l-2 border-circuit-amber rounded-r-[4px] space-y-2 text-xs font-mono">
                <div className="text-text-primary font-bold">Discussion Format & Cadence:</div>
                <div className="text-text-muted leading-relaxed">
                  {gdRoomData.formatExplanation} — Held {gdRoomData.cadence} at {gdRoomData.venue}.
                </div>
              </div>
            </div>

            {/* Rules of the Dialectic Arena */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-[#0C0F14] border border-[rgba(72,189,232,0.14)] rounded-[6px]">
              {gdRoomData.rules.map((rule, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="text-[10px] font-mono text-circuit-amber uppercase tracking-wider font-bold">
                    Rule 0{idx + 1}
                  </span>
                  <p className="text-xs text-text-muted font-sans leading-snug">
                    {rule}
                  </p>
                </div>
              ))}
            </div>

            {/* Discovery & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[rgba(72,189,232,0.14)]">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics, inquiries, or codes (e.g. GD-41)..."
                  className="w-full bg-[#0C0F14] border border-[rgba(72,189,232,0.18)] rounded-[4px] pl-10 pr-4 py-2.5 text-xs font-mono text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-circuit-amber transition-colors"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {gdCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer rounded-[4px] ${
                      selectedCategory === cat
                        ? 'bg-circuit-amber/20 border-circuit-amber text-circuit-amber font-bold'
                        : 'border-[rgba(72,189,232,0.14)] bg-[#0C0F14] text-text-muted hover:text-text-primary hover:border-circuit-amber/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Listing & Detailed Entries */}
            <div className="space-y-6">
              {filteredDiscussions.length === 0 ? (
                <div className="p-16 bg-[#0C0F14] border border-[rgba(72,189,232,0.14)] rounded-[6px] text-center space-y-3">
                  <Info className="w-10 h-10 text-circuit-amber mx-auto" />
                  <h3 className="text-xl font-display font-bold text-text-primary">
                    No Discussions Found
                  </h3>
                  <p className="text-sm text-text-muted font-sans">
                    Try broadening your search query or selecting a different category filter.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="text-xs font-mono text-circuit-amber underline cursor-pointer hover:text-white"
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
                      className={`border rounded-[6px] transition-all duration-300 overflow-hidden ${
                        isExpanded
                          ? 'bg-[#0C0F14] border-circuit-amber/50 shadow-[0_0_30px_-5px_rgba(230,161,46,0.15)]'
                          : 'bg-[#0C0F14]/70 border-[rgba(72,189,232,0.14)] hover:border-circuit-cyan/40'
                      }`}
                    >
                      {/* Collapsed Header Bar */}
                      <div
                        onClick={() => toggleExpand(entry.id)}
                        className="p-6 sm:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                            <span className="px-2.5 py-0.5 bg-circuit-amber/20 text-circuit-amber border border-circuit-amber/40 font-bold rounded-[3px]">
                              {entry.code}
                            </span>
                            <span className="text-text-muted">{entry.date}</span>
                            <span className="text-text-muted/50">•</span>
                            <span className="text-circuit-cyan uppercase">{entry.category}</span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-display font-bold text-text-primary hover:text-circuit-amber transition-colors tracking-tight">
                            {entry.topic}
                          </h3>

                          <p className="text-sm text-text-muted font-sans max-w-3xl leading-relaxed">
                            {entry.summary}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <span className="text-xs font-mono text-text-muted flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-circuit-cyan" />
                            {entry.attendees} Debaters
                          </span>
                          <div className="w-8 h-8 rounded-full bg-[#080B10] border border-[rgba(72,189,232,0.14)] flex items-center justify-center text-text-muted">
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-circuit-amber" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Detailed Entry */}
                      {isExpanded && (
                        <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-[rgba(72,189,232,0.14)] space-y-8 animate-fadeIn">
                          {/* Background & Context */}
                          <div className="space-y-2">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted font-semibold">
                              Background & Inquiry Context
                            </h4>
                            <p className="text-sm font-sans text-text-muted leading-relaxed max-w-4xl">
                              {entry.background}
                            </p>
                          </div>

                          {/* Dialectic Two-Column Confrontation */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Thesis */}
                            <div className="p-6 bg-[#080B10] border-t-2 border-circuit-cyan rounded-[4px] space-y-4">
                              <div className="flex items-center gap-2 text-xs font-mono text-circuit-cyan uppercase tracking-widest font-bold">
                                <Scale className="w-4 h-4" />
                                <span>Thesis & Supporting Perspectives</span>
                              </div>
                              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-text-muted">
                                {entry.proArguments.map((arg, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <Check className="w-4 h-4 text-circuit-cyan shrink-0 mt-0.5" />
                                    <span>{arg}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Antithesis */}
                            <div className="p-6 bg-[#080B10] border-t-2 border-circuit-amber rounded-[4px] space-y-4">
                              <div className="flex items-center gap-2 text-xs font-mono text-circuit-amber uppercase tracking-widest font-bold">
                                <ShieldAlert className="w-4 h-4" />
                                <span>Antithesis & Opposing Critiques</span>
                              </div>
                              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-text-muted">
                                {entry.conArguments.map((arg, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="text-circuit-amber font-bold text-sm shrink-0">✕</span>
                                    <span>{arg}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Documented Outcome & Takeaways */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                            {/* Key Takeaways */}
                            <div className="md:col-span-6 space-y-3 p-5 bg-[#080B10] border border-[rgba(72,189,232,0.12)] rounded-[4px]">
                              <h4 className="text-xs font-mono uppercase tracking-widest text-circuit-cyan font-bold">
                                Key Takeaways & Empirical Insights
                              </h4>
                              <ul className="space-y-2 text-xs font-sans text-text-muted">
                                {entry.takeaways.map((point, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-circuit-cyan font-mono font-bold">0{idx + 1}.</span>
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Outcome / Consensus Status */}
                            <div className="md:col-span-6 space-y-3 p-5 bg-[#080B10] border border-[rgba(72,189,232,0.12)] rounded-[4px]">
                              <h4 className="text-xs font-mono uppercase tracking-widest text-circuit-amber font-bold">
                                Documented Outcome & Nuance
                              </h4>
                              <p className="text-xs font-sans text-text-primary leading-relaxed italic">
                                "{entry.outcome}"
                              </p>
                            </div>
                          </div>

                          {/* Evidence, Sources & Further Reading */}
                          <div className="pt-4 border-t border-[rgba(72,189,232,0.12)] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                            <div className="space-y-2">
                              <span className="text-text-muted/70 uppercase">Citations & Benchmarks Audited:</span>
                              <ul className="space-y-1 text-text-muted">
                                {entry.evidence.map((src, i) => (
                                  <li key={i}>• {src}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-2">
                              <span className="text-text-muted/70 uppercase">Further Reading & Papers:</span>
                              <div className="flex flex-wrap gap-3">
                                {entry.furtherReading.map((reading, i) => (
                                  <a
                                    key={i}
                                    href={reading.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-circuit-cyan hover:underline flex items-center gap-1"
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
        </PageTransitionWrapper>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
