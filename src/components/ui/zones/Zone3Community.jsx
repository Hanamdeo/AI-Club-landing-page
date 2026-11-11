'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Users, ArrowRight, ArrowDown, MessageSquare, ShieldCheck } from 'lucide-react';
import { TEAM_MEMBERS } from '@/data/team';
import { DISCUSSIONS } from '@/data/discussions';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 03: Community Zone
 * Collaborative aisle & open HUD architecture.
 * Content revealed: Group discussions, workshops and club culture.
 */
export default function Zone3Community({ onNextZone }) {
  const activeDiscussions = useMemo(() => DISCUSSIONS.slice(0, 3), []);
  const leadershipCadre = useMemo(
    () => TEAM_MEMBERS.filter((m) => m.category === 'lead' || m.level === 'L1').slice(0, 3),
    []
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-text font-sans safe-viewport-card custom-scrollbar pointer-events-auto">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative shadow-[0_16px_48px_rgba(0,0,0,0.65)]">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-white/[0.12] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 03 // COMMUNITY AISLE & COLLABORATIVE COMMONS
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Users className="w-3.5 h-3.5 text-white" />
            <span className="tracking-tight uppercase">
              450+ ACTIVE STUDENT MEMBERS • 6 WORKING GROUPS
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Discussions, Workshops & Culture
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 font-sans max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Where research preprints meet practical deployment. Peer-to-peer reading circles, architectural debates, and open-source contributions.
          </p>
        </div>

        {/* Discussions & Community Open Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6">
          {/* Left Column: Weekly Reading Circles & Discussions */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-1 font-semibold">
              <MessageSquare className="w-3.5 h-3.5 text-white" />
              <span>WEEKLY DISCUSSIONS & WORKING GROUPS</span>
            </div>

            <div className="space-y-3">
              {activeDiscussions.map((d) => (
                <div
                  key={d.id}
                  className="rounded-xl p-4 glass-card transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.10] text-slate-200 border border-white/20 font-semibold">
                      {d.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-medium">
                      {d.time}
                    </span>
                  </div>
                  <h4 className="text-sm font-display font-bold text-white mb-1.5 drop-shadow-sm">
                    {d.topic}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span className="truncate max-w-[240px]">{d.venue}</span>
                    <span className="text-white font-semibold">{d.moderator}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Student Leadership & Mentors Cadre */}
          <div className="lg:col-span-5 flex flex-col justify-between border-t border-white/[0.12] lg:border-t-0 lg:border-l lg:border-white/[0.12] pt-5 lg:pt-0 lg:pl-6 py-1">
            <div>
              <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-4 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>LEADERSHIP CADRE</span>
              </div>

              <div className="space-y-3 mb-5">
                {leadershipCadre.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl glass-card">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.10] border border-white/20 flex items-center justify-center text-xs font-mono font-bold text-white shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                      {m.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-display font-bold text-white truncate drop-shadow-sm">
                        {m.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-300 truncate">
                        {m.role}
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 border border-white/10 px-2 py-0.5 rounded-full shrink-0">
                      {m.level}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl border border-white/[0.10] bg-black/40 text-[11px] font-mono text-slate-300">
                Weekly paper syncs every Thursday. All students welcome to present or defend preprints.
              </div>
            </div>

            <Link
              href="/team"
              onClick={() => audioManager.playClick()}
              className="mt-4 flex items-center justify-between text-xs font-mono text-slate-200 hover:text-white transition-colors group p-2.5 rounded-lg border border-white/[0.10] hover:border-white/30 bg-white/[0.04] pointer-events-auto"
            >
              <span className="font-semibold">MEET COMPLETE ROSTER</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-white/[0.12] flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/research"
            onClick={() => audioManager.playClick()}
            className="flex items-center gap-2 text-xs font-mono text-slate-200 hover:text-white transition-colors group pointer-events-auto"
          >
            <span className="font-semibold">EXPLORE ACTIVE RESEARCH COMMONS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {onNextZone && (
            <button
              onClick={() => {
                audioManager.playWhoosh();
                onNextZone();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.18] text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/20 btn-tactile pointer-events-auto"
            >
              <span>DESCEND TO RESEARCH CORE</span>
              <ArrowDown className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
