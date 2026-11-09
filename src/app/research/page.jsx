'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Cpu,
  Layers,
  ChevronRight,
  Sparkles,
  Server,
  FileText,
  User,
} from 'lucide-react';
import { RESEARCH_TRACKS, COMPUTE_SPECS } from '@/data/research';
import { getAllDiscussions } from '@/lib/contentSelectors';
import { audioManager } from '@/utils/audioManager';

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState('tracks'); // 'tracks' | 'discussions'
  const discussions = getAllDiscussions();

  return (
    <main className="relative min-h-screen bg-[#0A0E10] text-[#E6E2D8] font-sans pt-28 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-facility-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(36,191,234,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 font-mono text-[10px] text-slate-400 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#A7B7A1] transition-colors">
            FACILITY
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-[#A7B7A1] font-semibold">RESEARCH & DISCUSSIONS</span>
        </div>

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-full bg-[#131718] border border-white/[0.1] text-[10px] font-mono tracking-widest text-[#A7B7A1] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#24BFEA] animate-pulse shadow-[0_0_8px_#24BFEA]" />
              <span>LABORATORY TRACKS & READING CIRCLES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-labeouf font-bold tracking-wider text-gradient-cyber leading-tight sm:leading-none">
              RESEARCH COMMONS
            </h1>
            <p className="text-sm sm:text-base text-[#B5B8AF] font-normal mt-3 max-w-2xl leading-relaxed">
              Foundational research tracks, peer-reviewed preprints, compute allocations, and weekly adversarial reading circles.
            </p>
          </div>

          {/* Navigation Toggle Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#121617] border border-white/[0.08] self-start md:self-auto">
            <button
              onClick={() => {
                try { audioManager.playClick(); } catch {}
                setActiveTab('tracks');
              }}
              className={`px-4 py-2 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                activeTab === 'tracks'
                  ? 'bg-[#24BFEA] text-[#0A0E10] font-bold shadow-[0_0_12px_rgba(36,191,234,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              RESEARCH TRACKS
            </button>
            <button
              onClick={() => {
                try { audioManager.playClick(); } catch {}
                setActiveTab('discussions');
              }}
              className={`px-4 py-2 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                activeTab === 'discussions'
                  ? 'bg-[#24BFEA] text-[#0A0E10] font-bold shadow-[0_0_12px_rgba(36,191,234,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DISCUSSION CIRCLES
            </button>
          </div>
        </div>

        {/* TAB 1: RESEARCH TRACKS & COMPUTE ALLOCATION */}
        {activeTab === 'tracks' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESEARCH_TRACKS.map((track) => (
                <div
                  key={track.id}
                  className="rounded-2xl p-7 bg-[#121617]/90 border border-white/[0.08] hover:border-[#24BFEA]/50 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#A7B7A1]">
                        LEAD: {track.lead}
                      </span>
                      <span className="text-[10px] font-mono text-[#24BFEA] flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>ACTIVE LAB</span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-labeouf font-bold text-ivory mb-3">
                      {track.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                      {track.focus}
                    </p>

                    {/* Preprints / Publications */}
                    <div className="mb-6 space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                        PUBLICATIONS & PREPRINTS
                      </span>
                      {track.publications.map((pub, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs font-mono text-slate-300 bg-[#0D1011] p-2.5 rounded-lg border border-white/[0.04]"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#A7B7A1] shrink-0 mt-0.5" />
                          <span className="leading-snug">{pub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hardware Allocation Line */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#A7B7A1]">
                    <span className="text-[10px] text-slate-400">HARDWARE ALLOCATION:</span>
                    <span className="font-semibold text-ivory">{track.clusterAllocation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DISCUSSION ROOMS & READING CIRCLES */}
        {activeTab === 'discussions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {discussions.map((gd) => (
              <div
                key={gd.id}
                className="rounded-2xl p-6 sm:p-7 bg-[#121617]/90 border border-white/[0.08] hover:border-white/[0.2] transition-all shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#A7B7A1]">
                      {gd.category}
                    </span>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-signal-green/15 text-signal-green border border-signal-green/30">
                      {gd.status}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-labeouf font-bold text-ivory mb-3">
                    {gd.topic}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {gd.description}
                  </p>

                  <div className="p-3 rounded-xl bg-[#0D1011] border border-white/[0.04] space-y-1.5 text-xs font-mono text-slate-300 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#24BFEA]" />
                      <span>{gd.date} • {gd.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{gd.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#A7B7A1]" />
                      <span>Moderator: {gd.moderator}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400">
                  <span className="text-[10px] text-slate-500 block mb-1">REQUIRED READING:</span>
                  <span className="text-ivory font-medium">{gd.readingMaterial || 'Paper preprint link in Discord channel'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
