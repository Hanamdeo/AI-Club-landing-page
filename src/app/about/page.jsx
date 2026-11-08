'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Target,
  Sparkles,
  MapPin,
  Mail,
  Github,
  Globe,
} from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { getCuratedNews } from '@/lib/contentSelectors';

export default function AboutPage() {
  const news = getCuratedNews();

  return (
    <main className="relative min-h-screen bg-[#0A0E10] text-[#E6E2D8] font-sans pt-28 pb-24 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-facility-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(36,191,234,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 font-mono text-[10px] text-slate-400 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#A7B7A1] transition-colors">
            FACILITY
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-[#A7B7A1] font-semibold">COLLECTIVE // ABOUT</span>
        </div>

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-full bg-[#131718] border border-white/[0.1] text-[10px] font-mono tracking-widest text-[#A7B7A1] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#24BFEA] animate-pulse shadow-[0_0_8px_#24BFEA]" />
              <span>FACILITY PHILOSOPHY & CHARTER</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-labeouf font-bold tracking-wider text-gradient-cyber leading-none">
              ABOUT AI CLUB
            </h1>
            <p className="text-sm sm:text-base text-[#B5B8AF] font-normal mt-3 max-w-2xl leading-relaxed">
              {CLUB_INFO.motto}
            </p>
          </div>

          <div className="p-4 px-6 rounded-2xl bg-[#121617]/90 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-start md:self-auto text-right">
            <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              CAMPUS AFFILIATION
            </span>
            <span className="text-lg font-bold font-labeouf text-ivory tracking-wide">
              {CLUB_INFO.institution}
            </span>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-8 rounded-3xl bg-[#121617]/90 border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#24BFEA] uppercase tracking-wider font-semibold">
              <Target className="w-4 h-4" />
              <span>OUR MISSION</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
              {CLUB_INFO.mission}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#121617]/90 border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#A7B7A1] uppercase tracking-wider font-semibold">
              <Compass className="w-4 h-4" />
              <span>OUR VISION</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
              {CLUB_INFO.vision}
            </p>
          </div>
        </div>

        {/* 3 Pillars of Innovation */}
        <div className="mb-14">
          <h2 className="text-2xl font-labeouf font-bold text-ivory mb-6">
            CORE ARCHITECTURAL PILLARS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLUB_INFO.pillars.map((pillar) => (
              <div
                key={pillar.code}
                className="p-6 rounded-2xl bg-[#121617]/80 border border-white/[0.08] relative overflow-hidden"
              >
                <span className="text-4xl font-labeouf font-bold text-white/[0.06] absolute top-4 right-4">
                  {pillar.code}
                </span>
                <h3 className="text-lg font-labeouf font-bold text-ivory mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Telemetry Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {CLUB_INFO.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#121617] border border-white/[0.08] text-center"
            >
              <span className="text-3xl sm:text-4xl font-bold font-labeouf text-[#24BFEA] tracking-wider block mb-1">
                {m.value}
              </span>
              <span className="text-xs font-mono font-semibold text-ivory block mb-1">
                {m.label}
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">
                {m.unit}
              </span>
            </div>
          ))}
        </div>

        {/* AI Radar: Industry Horizon & Breakthroughs */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-labeouf font-bold text-ivory">
              AI RADAR & INTELLIGENCE HORIZON
            </h2>
            <span className="text-xs font-mono text-[#A7B7A1]">CURATED SIGNALS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[#121617]/90 border border-white/[0.08] hover:border-white/[0.2] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#A7B7A1]">
                    {item.category}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">{item.date}</span>
                </div>
                <h3 className="text-base font-labeouf font-bold text-ivory mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Coordinates & Join Action */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#121617] via-[#141A1C] to-[#121617] border border-white/[0.1] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-labeouf font-bold text-ivory mb-2">
              READY TO BUILD AT THE FRONTIER?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl">
              Recruitment is open for researchers, systems engineers, vision researchers, and operations leads across all semesters.
            </p>
          </div>
          <Link
            href="/join"
            className="px-6 py-3 rounded-xl bg-[#24BFEA] hover:bg-[#38BDF8] text-[#0A0E10] text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(36,191,234,0.4)] whitespace-nowrap shrink-0"
          >
            APPLY FOR CLEARANCE ➔
          </Link>
        </div>
      </div>
    </main>
  );
}
