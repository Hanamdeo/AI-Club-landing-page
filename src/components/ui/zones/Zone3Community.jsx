'use client';

import React from 'react';
import Link from 'next/link';
import { Users, ArrowRight, ArrowDown, MessageSquare, ShieldCheck } from 'lucide-react';
import { ZONE_TEAM } from '@/data/clubData';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 03: Community Zone
 * Collaborative aisle & open HUD architecture.
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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-none font-sans safe-viewport-card custom-scrollbar">
      <div className="glass-panel p-6 sm:p-8 rounded-xl relative">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-[rgba(150,230,255,0.16)] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-[#55DFFF]">
            <span className="w-2 h-2 rounded-full bg-[#55DFFF] animate-pulse shadow-[0_0_8px_rgba(85,223,255,0.7)]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 03 // COMMUNITY AISLE & COLLABORATIVE COMMONS
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#B8C7D4]">
            <Users className="w-3.5 h-3.5 text-[#55DFFF]" />
            <span className="tracking-tight uppercase">
              450+ ACTIVE STUDENT MEMBERS • 6 WORKING GROUPS
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-fluid-h2 font-display font-bold text-white tracking-tight mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
            Discussions, Workshops & Culture
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(240,247,255,0.92)] font-sans max-w-2xl leading-[1.65] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Where research preprints meet practical deployment. Peer-to-peer reading circles, architectural debates, and open-source contributions.
          </p>
        </div>

        {/* Discussions & Community Open Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
          {/* Left Column: Weekly Reading Circles & Discussions */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="text-[10px] font-mono text-[#B8C7D4] uppercase tracking-widest flex items-center gap-2 mb-0.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#55DFFF]" />
              <span>WEEKLY DISCUSSIONS & WORKING GROUPS</span>
            </div>

            <div className="space-y-3">
              {discussions.map((d, i) => (
                <div
                  key={i}
                  className="glass-card p-3.5 sm:p-4 border-l-2 border-l-[#55DFFF] hover:border-l-[#55DFFF]"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[rgba(85,223,255,0.10)] text-[#55DFFF] border border-[rgba(85,223,255,0.25)] font-semibold">
                      {d.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[#B8C7D4]">
                      {d.time}
                    </span>
                  </div>
                  <h4 className="text-sm font-display font-bold text-white mb-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    {d.topic}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#B8C7D4]">
                    <span>{d.venue}</span>
                    <span className="text-[#55DFFF] font-semibold">{d.attendees}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Student Leadership & Mentors Cadre */}
          <div className="lg:col-span-5 flex flex-col justify-between border-t border-[rgba(150,230,255,0.16)] lg:border-t-0 lg:border-l-2 border-[rgba(150,230,255,0.16)] pt-4 lg:pt-0 pl-0 lg:pl-6 py-1">
            <div>
              <div className="text-[10px] font-mono text-[#B8C7D4] uppercase tracking-widest flex items-center gap-2 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#55DFFF]" />
                <span>LEADERSHIP CADRE</span>
              </div>

              <div className="space-y-3 mb-5">
                {ZONE_TEAM.members.slice(0, 3).map((m, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg glass-card">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(85,223,255,0.10)] border border-[rgba(85,223,255,0.25)] flex items-center justify-center text-xs font-mono font-bold text-[#55DFFF] shrink-0">
                      {m.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-display font-bold text-white truncate drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                        {m.name}
                      </div>
                      <div className="text-[10px] font-sans text-[#B8C7D4] truncate">
                        {m.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[rgba(150,230,255,0.14)]">
              <Link
                href="/team"
                onClick={() => audioManager.playClick()}
                className="flex items-center justify-between text-xs font-mono text-[#55DFFF] hover:text-white transition-colors group"
              >
                <span className="font-semibold">VIEW COMPLETE 6-MEMBER TEAM</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-[rgba(150,230,255,0.16)] flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-[#B8C7D4]">
            DISCUSSIONS OPEN TO ALL COLLEGIATE STUDENTS
          </span>

          {onNextZone && (
            <button
              onClick={() => {
                audioManager.playWhoosh();
                onNextZone();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card hover:border-[#55DFFF]/50 text-xs font-mono text-[#B8C7D4] hover:text-white transition-all cursor-pointer btn-tactile"
            >
              <span>DESCEND TO RESEARCH ZONE</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#55DFFF]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
