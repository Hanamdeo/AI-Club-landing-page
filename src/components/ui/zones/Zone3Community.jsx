'use client';

import React from 'react';
import Link from 'next/link';
import { Users, ArrowRight, ArrowDown, MessageSquare, BookOpen, ShieldCheck, Cpu } from 'lucide-react';
import { ZONE_TEAM, ZONE_OPERATIONS } from '@/data/clubData';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 03: Community Zone
 * Collaborative aisle & interactive display.
 * Content revealed: Group discussions, workshops and club culture.
 */
export default function Zone3Community({ onNextZone }) {
  // Weekly Discussion / Workshop Topics
  const discussions = [
    {
      topic: 'Latent Chain-of-Thought & Test-Time Search',
      time: 'Thursdays 18:00',
      venue: 'Computing Lab 02',
      badge: 'Active Debate',
      attendees: '45+ Researchers',
    },
    {
      topic: 'Sparse Attention & Sub-Millisecond KV Caches',
      time: 'Saturdays 14:00',
      venue: 'Systems Server Room',
      badge: 'Systems Deep Dive',
      attendees: '30+ Builders',
    },
    {
      topic: 'Agentic Tool-Use Protocols (MCP & Sandboxing)',
      time: 'Bi-Weekly Wednesdays',
      venue: 'Innovation Hub',
      badge: 'Architecture Track',
      attendees: '60+ Members',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="relative bg-[#0D1214]/85 backdrop-blur-xl border border-white/[0.1] rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] corner-reticle">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-white/[0.08] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-sage">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse shadow-[0_0_8px_rgba(162,178,159,0.5)]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 03 // COMMUNITY AISLE & COLLABORATIVE COMMONS
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Users className="w-3 h-3 text-signal-green" />
            <span className="tracking-tight uppercase">
              450+ ACTIVE STUDENT MEMBERS • 6 WORKING GROUPS
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient-cyber tracking-tight mb-2">
            Discussions, Workshops & Culture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-2xl leading-relaxed">
            Where research preprints meet practical deployment. Peer-to-peer reading circles, architectural debates, and open-source contributions.
          </p>
        </div>

        {/* Discussions & Community Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left Column: Weekly Reading Circles & Discussions */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-1">
              <MessageSquare className="w-3 h-3 text-sage" />
              <span>WEEKLY DISCUSSIONS & WORKING GROUPS</span>
            </div>

            {discussions.map((d, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-black/25 border border-white/[0.08] hover:border-sage/40 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sage/15 text-sage border border-sage/30">
                    {d.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {d.time}
                  </span>
                </div>
                <h4 className="text-sm font-display font-bold text-ivory mb-1">
                  {d.topic}
                </h4>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{d.venue}</span>
                  <span className="text-slate-400">{d.attendees}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Student Leadership & Mentors Cadre */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-black/20 border border-white/[0.08]">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-signal-green" />
                <span>LEADERSHIP CADRE</span>
              </div>

              <div className="space-y-3 mb-4">
                {ZONE_TEAM.members.slice(0, 3).map((m, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black/30 border border-white/[0.1] flex items-center justify-center text-xs font-mono font-bold text-sage shrink-0">
                      {m.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-display font-bold text-ivory truncate">
                        {m.name}
                      </div>
                      <div className="text-[10px] font-sans text-slate-400 truncate">
                        {m.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06]">
              <Link
                href="/team"
                onClick={() => audioManager.playClick()}
                className="flex items-center justify-between text-xs font-mono text-sage hover:text-white transition-colors group"
              >
                <span>VIEW COMPLETE 6-MEMBER TEAM</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-slate-400">
            DISCUSSIONS OPEN TO ALL COLLEGIATE STUDENTS
          </span>

          {onNextZone && (
            <button
              onClick={() => {
                audioManager.playWhoosh();
                onNextZone();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>DESCEND TO RESEARCH ZONE</span>
              <ArrowDown className="w-3.5 h-3.5 text-sage" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
