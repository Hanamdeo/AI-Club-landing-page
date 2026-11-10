'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import { getAllEvents } from '@/lib/contentSelectors';
import { filterByCategory, getUniqueCategories } from '@/lib/contentHelpers';
import { audioManager } from '@/utils/audioManager';
import HolographicCard from '@/components/ui/HolographicCard';

export default function EventsPage() {
  const events = getAllEvents();
  const categories = getUniqueCategories(events, 'category');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = filterByCategory(events, selectedCategory, 'category').filter((ev) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      ev.title.toLowerCase().includes(q) ||
      ev.description.toLowerCase().includes(q) ||
      ev.venue.toLowerCase().includes(q) ||
      ev.category.toLowerCase().includes(q)
    );
  });

  return (
    <main className="relative min-h-screen bg-[#0A0E10] text-[#E6E2D8] font-sans pt-28 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-facility-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(36,191,234,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 font-mono text-[10px] text-slate-400 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#A7B7A1] transition-colors flex items-center gap-1">
            <span>FACILITY</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-[#A7B7A1] font-semibold">OPERATIONS // EVENTS</span>
        </div>

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-full bg-[#131718] border border-white/[0.1] text-[10px] font-mono tracking-widest text-[#A7B7A1] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#24BFEA] animate-pulse shadow-[0_0_8px_#24BFEA]" />
              <span>ACTIVE DISPATCHES // MITS GWALIOR</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-labeouf font-bold tracking-wider text-gradient-cyber leading-tight sm:leading-none">
              OPERATIONS BOARD
            </h1>
            <p className="text-sm sm:text-base text-[#B5B8AF] font-normal mt-3 max-w-2xl leading-relaxed">
              Flagship hackathons, low-level hardware acceleration workshops, and algorithmic code sprints organized by AI Club cohorts.
            </p>
          </div>

          {/* Telemetry Counter */}
          <div className="p-4 px-6 rounded-2xl bg-[#121617]/90 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-start md:self-auto flex items-center gap-6">
            <div>
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                VERIFIED OPERATIONS
              </span>
              <span className="text-3xl font-bold font-labeouf text-[#24BFEA] tracking-wider">
                0{events.length}
              </span>
            </div>
            <div className="h-10 w-[1px] bg-white/[0.08]" />
            <div>
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                REGISTRATION STATUS
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-signal-green mt-1">
                <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
                ACCEPTING APPS
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Live Search */}
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
                      ? 'bg-[#24BFEA]/20 text-[#24BFEA] border border-[#24BFEA]/50 shadow-[0_0_12px_rgba(36,191,234,0.3)] font-semibold'
                      : 'bg-[#121617] text-slate-400 hover:text-white border border-white/[0.08]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search operations, topics, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121617] border border-white/[0.08] focus:border-[#24BFEA]/50 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-ivory placeholder:text-slate-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((ev, index) => {
            const isFeatured = ev.featured;
            const slug = ev.slug || ev.id;

            return (
              <HolographicCard
                key={ev.id}
                index={index}
                isFeatured={isFeatured}
                className={`p-6 sm:p-7 ${
                  isFeatured ? 'solo-leveling-card-featured' : 'solo-leveling-card'
                }`}
              >
                <div>
                  {/* Top Meta Line */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#A7B7A1]">
                      {ev.category}
                    </span>

                    <span
                      className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        ev.registrationStatus === 'open'
                          ? 'bg-signal-green/15 text-signal-green border border-signal-green/30'
                          : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {ev.registrationStatus === 'open' ? 'REGISTRATION OPEN' : 'CONCLUDED'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-labeouf font-bold text-ivory group-hover:text-[#24BFEA] transition-colors leading-snug mb-3">
                    {ev.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed mb-5 line-clamp-3">
                    {ev.description}
                  </p>

                  {/* Logistics Badges */}
                  <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-white/[0.06] mb-6 text-[11px] font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#24BFEA] shrink-0" />
                      <span className="truncate">{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#A7B7A1] shrink-0" />
                      <span className="truncate">{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{ev.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: View Detail Page & Register */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <Link
                    href={`/events/${slug}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono font-semibold text-ivory hover:text-white transition-all group/btn"
                  >
                    <span>PROTOCOL DETAILS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  {ev.registrationUrl && (
                    <a
                      href={ev.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#24BFEA] hover:bg-[#38BDF8] text-[#0A0E10] text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(36,191,234,0.3)] shrink-0"
                    >
                      <span>REGISTER</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </HolographicCard>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#121617]/50 border border-white/[0.06]">
            <p className="text-sm font-mono text-slate-400">
              NO OPERATIONS FOUND MATCHING YOUR CRITERIA
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
