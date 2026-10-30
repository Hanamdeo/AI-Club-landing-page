'use client';

import React from 'react';
import Link from 'next/link';
import { gdRoomData } from '@/data/gdData';
import { Button } from '@/components/ui/Button';
import { Scale, ShieldAlert, Check, ArrowRight, ArrowUpRight, MessagesSquare } from 'lucide-react';

export function GDRoomSection() {
  const currentSession = gdRoomData.upcomingSession;
  const recentDiscussions = gdRoomData.discussions.slice(1, 3);

  return (
    <section id="gd-room" className="relative py-28 px-6 sm:px-8 bg-[#05070B] border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-phoenix-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="text-xs font-mono tracking-widest text-phoenix-orange uppercase">
            04 // THE DIALECTIC ROOM & GD PREVIEW
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-phoenix-orange/30 via-white/10 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-primary">
              Critical Inquiries & <span className="text-gradient-flame">Debate</span>.
            </h2>
            <p className="text-base text-secondary font-sans leading-relaxed">
              {gdRoomData.subtitle}
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

        {/* Featured Dialectic Duel Stage (PRD Section 3.7) */}
        {currentSession && (
          <div className="relative p-8 sm:p-10 bg-navy-deep/80 border border-white/10 mb-10">
            {/* Dialectic Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider bg-phoenix-orange/20 text-phoenix-orange font-bold border border-phoenix-orange/40">
                  {currentSession.code}
                </span>
                <span className="text-xs font-mono text-secondary">
                  {currentSession.date} • {currentSession.category}
                </span>
              </div>
              <span className="text-xs font-mono text-phoenix-cyan">
                ● {currentSession.status}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary mb-4 leading-snug max-w-4xl">
              {currentSession.topic}
            </h3>

            <p className="text-base text-secondary font-sans leading-relaxed mb-8 max-w-4xl">
              {currentSession.abstract}
            </p>

            {/* Dialectic Two-Column Confrontation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Thesis */}
              <div className="p-6 bg-background/80 border-t-2 border-phoenix-blue space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-phoenix-blue uppercase tracking-widest font-bold">
                  <Scale className="w-4 h-4" />
                  <span>Thesis // Open Proliferation</span>
                </div>
                <ul className="space-y-2.5 text-sm font-sans text-secondary">
                  {currentSession.proKeyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-phoenix-cyan shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Antithesis */}
              <div className="p-6 bg-background/80 border-t-2 border-phoenix-orange space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-phoenix-orange uppercase tracking-widest font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Antithesis // Containment & Gating</span>
                </div>
                <ul className="space-y-2.5 text-sm font-sans text-secondary">
                  {currentSession.conKeyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-phoenix-orange font-bold text-sm shrink-0">✕</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Link to GD Archive */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-secondary">
                Moderated by {currentSession.moderators.join(' & ')}
              </span>
              <Link
                href="/gd-archive"
                className="text-xs font-mono text-phoenix-cyan hover:underline flex items-center gap-1.5 font-bold"
              >
                <span>Read Full Literature & Citations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Selected Past Discussion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentDiscussions.map((d) => (
            <div
              key={d.id}
              className="p-6 bg-navy-deep/50 border border-white/10 flex flex-col justify-between hover:border-phoenix-orange/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-secondary">
                  <span className="text-phoenix-orange font-bold">{d.code}</span>
                  <span>{d.date}</span>
                </div>
                <h4 className="text-lg font-display font-bold text-primary">
                  {d.topic}
                </h4>
                <p className="text-xs text-secondary font-sans leading-relaxed">
                  {d.summary}
                </p>
                <div className="p-3 bg-black/40 border border-white/5 text-xs font-sans text-primary/90 italic">
                  "{d.outcome}"
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono mt-4">
                <span className="text-secondary">{d.attendees} Debaters</span>
                <Link
                  href="/gd-archive"
                  className="text-phoenix-orange hover:underline flex items-center gap-1"
                >
                  <span>View Arguments & Papers</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
