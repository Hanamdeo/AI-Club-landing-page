'use client';

import React from 'react';
import { gdRoomData } from '@/data/gdData';
import { Button } from '@/components/ui/Button';
import { Scale, ShieldAlert, Sparkles, Check, ArrowUpRight } from 'lucide-react';

export function GDRoomSection() {
  return (
    <section id="gd-room" className="relative py-32 px-6 sm:px-8 bg-[#05070B] border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-phoenix-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-phoenix-orange uppercase">
            04 // THE DIALECTIC ARENA & DEBATES
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-phoenix-orange/30 via-white/10 to-transparent" />
        </div>

        <div className="max-w-3xl mb-12 space-y-3">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            Critical Inquiries & <span className="text-gradient-flame">Debate</span>.
          </h2>
          <p className="text-base text-secondary font-sans leading-relaxed">
            {gdRoomData.subtitle}
          </p>
        </div>

        {/* Featured Dialectic Duel Stage */}
        <div className="relative p-8 sm:p-12 bg-navy-deep/80 border border-white/10 mb-16">
          {/* Dialectic Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider bg-phoenix-orange/20 text-phoenix-orange font-bold border border-phoenix-orange/40">
                {gdRoomData.upcomingTopic.code}
              </span>
              <span className="text-xs font-mono text-secondary">
                {gdRoomData.upcomingTopic.date} • {gdRoomData.venue}
              </span>
            </div>
            <span className="text-xs font-mono text-phoenix-cyan">
              ● {gdRoomData.upcomingTopic.status}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary mb-4 leading-snug max-w-4xl">
            {gdRoomData.upcomingTopic.topic}
          </h3>

          <p className="text-base text-secondary font-sans leading-relaxed mb-10 max-w-4xl">
            {gdRoomData.upcomingTopic.abstract}
          </p>

          {/* Dialectic Two-Column Confrontation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* The Thesis Box (Electric Blue) */}
            <div className="p-6 bg-background/80 border-t-2 border-phoenix-blue space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-phoenix-blue uppercase tracking-widest font-bold">
                <Scale className="w-4 h-4" />
                <span>Thesis // Case for Open Proliferation</span>
              </div>
              <ul className="space-y-3 text-sm font-sans text-secondary">
                {gdRoomData.upcomingTopic.proKeyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-phoenix-cyan shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Antithesis Box (Flame Orange) */}
            <div className="p-6 bg-background/80 border-t-2 border-phoenix-orange space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-phoenix-orange uppercase tracking-widest font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>Antithesis // Case for Frontier Containment</span>
              </div>
              <ul className="space-y-3 text-sm font-sans text-secondary">
                {gdRoomData.upcomingTopic.conKeyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-phoenix-orange shrink-0 mt-2" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div className="text-xs font-mono text-secondary">
              Moderated by: <strong className="text-primary">{gdRoomData.upcomingTopic.moderator}</strong>
            </div>
            <Button
              variant="orange"
              size="md"
              icon={Sparkles}
              href="https://discord.gg/phoenix-ai"
              target="_blank"
            >
              Attend Dialectic / Claim Debater Seat
            </Button>
          </div>
        </div>

        {/* Previous Debates Consensus Log (Clean Minimal Rows) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-secondary font-semibold pb-2 border-b border-white/10">
            <span>Recent Dialectic Consensus Log</span>
            <span>Cadence: {gdRoomData.meetingCadence}</span>
          </div>

          <div className="divide-y divide-white/5">
            {gdRoomData.pastDiscussions.map((past) => (
              <div
                key={past.code}
                className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="md:w-1/4">
                  <span className="text-xs font-mono text-phoenix-orange font-bold uppercase block">
                    {past.code} // {past.date}
                  </span>
                  <span className="text-[10px] font-mono text-secondary">
                    {past.attendees} Participating Debaters
                  </span>
                </div>

                <div className="md:w-3/4 space-y-1">
                  <h4 className="text-base font-display font-bold text-primary">
                    {past.topic}
                  </h4>
                  <p className="text-sm text-secondary font-sans leading-relaxed">
                    <strong className="text-phoenix-cyan font-mono text-xs">Verdict: </strong>
                    {past.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
