'use client';

import React from 'react';
import Link from 'next/link';
import { gdRoomData } from '@/data/gdData';
import { Button } from '@/components/ui/Button';
import { CircuitCard } from '@/components/ui/CircuitCard';
import { Scale, ShieldAlert, Check, ArrowRight, ArrowUpRight, MessagesSquare, Flame } from 'lucide-react';

export function GDRoomSection() {
  const currentSession = gdRoomData.upcomingSession;
  const recentDiscussions = gdRoomData.discussions.slice(1, 3);

  return (
    <section id="gd-room" className="relative py-28 px-6 sm:px-8 bg-[#050507] border-t border-[rgba(72,189,232,0.14)] overflow-hidden">
      {/* Background Cyber-Circuit Grid */}
      <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />

      {/* Ambient lighting in Beak Gold */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-circuit-amber/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Monospace Index */}
        <div className="flex items-center gap-4 mb-14">
          <span className="text-xs font-mono tracking-widest text-circuit-amber uppercase">
            04 // THE DIALECTIC ROOM & GD PREVIEW
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-circuit-amber/30 via-[rgba(72,189,232,0.14)] to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest text-text-primary">
              Critical Inquiries & <span className="text-gradient-flame">Debate</span>.
            </h2>
            <p className="text-base text-text-muted font-sans leading-relaxed">
              {gdRoomData.subtitle || 'Structured peer dialectics challenging synthetic intelligence alignment, compute sovereignty, and mechanistic interpretability.'}
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            icon={ArrowRight}
            href="/gd-archive"
          >
            View All Discussions
          </Button>
        </div>

        {/* Featured Dialectic Duel Stage (Bento Card with Cursor Spotlight) */}
        {currentSession && (
          <CircuitCard className="p-8 sm:p-10 mb-10" withTicks={true} spotlightColor="rgba(230, 161, 46, 0.28)">
            {/* Dialectic Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(72,189,232,0.14)] pb-6 mb-8">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider bg-circuit-amber/15 text-circuit-amber font-bold border border-circuit-amber/35 rounded-[3px]">
                  {currentSession.code}
                </span>
                <span className="text-xs font-mono text-text-muted">
                  {currentSession.date} • {currentSession.category}
                </span>
              </div>
              <span className="text-xs font-mono text-circuit-cyan flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-circuit-cyan animate-pulse" />
                {currentSession.status}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-text-primary mb-4 leading-snug max-w-4xl tracking-tight">
              {currentSession.topic}
            </h3>

            <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed mb-8 max-w-4xl">
              {currentSession.abstract}
            </p>

            {/* Dialectic Two-Column Confrontation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Thesis: Circuit Cyan */}
              <div className="p-6 bg-[#080B10] border-t-2 border-circuit-cyan rounded-[4px] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-circuit-cyan uppercase tracking-widest font-bold">
                  <Scale className="w-4 h-4" />
                  <span>Thesis // Open Proliferation</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-text-muted">
                  {currentSession.proKeyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-circuit-cyan shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Antithesis: Beak Gold / Node Copper */}
              <div className="p-6 bg-[#080B10] border-t-2 border-circuit-amber rounded-[4px] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-circuit-amber uppercase tracking-widest font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Antithesis // Containment & Gating</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-text-muted">
                  {currentSession.conKeyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-circuit-amber font-bold text-sm shrink-0 leading-none">✕</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dialectic Footer CTA */}
            <div className="pt-4 border-t border-[rgba(72,189,232,0.14)] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-text-muted">
                LIVE DEBATER CHAMBER // 12 REGISTERED ORATORS
              </span>
              <Button
                variant="primary"
                size="sm"
                icon={ArrowUpRight}
                href="/gd-archive"
              >
                Join Discourse
              </Button>
            </div>
          </CircuitCard>
        )}

        {/* Secondary Recent Discussions Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentDiscussions.map((disc) => (
            <CircuitCard key={disc.id} className="p-6 flex flex-col justify-between" withTicks={true}>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-circuit-cyan uppercase">{disc.code} // {disc.category}</span>
                  <span className="text-text-muted">{disc.date}</span>
                </div>
                <h4 className="text-lg font-display font-bold text-text-primary group-hover:text-circuit-cyan transition-colors">
                  {disc.topic}
                </h4>
                <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed">
                  {disc.abstract}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[rgba(72,189,232,0.12)] flex items-center justify-between text-xs font-mono">
                <span className="text-circuit-amber">Consensus: {disc.consensus || 'Open Question'}</span>
                <Link
                  href="/gd-archive"
                  className="text-circuit-cyan hover:underline flex items-center gap-1 group/l"
                >
                  <span>READ TRANSCRIPT</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/l:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </CircuitCard>
          ))}
        </div>
      </div>
    </section>
  );
}
