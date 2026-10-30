'use client';

import React from 'react';
import { gdRoomData } from '@/data/gdData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MessagesSquare, Scale, Users, Flame, Check, ShieldAlert, Sparkles } from 'lucide-react';

export function GDRoomSection() {
  return (
    <section id="gd-room" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070A0F] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-phoenix-ember/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <Badge variant="ember" icon={MessagesSquare}>
            04 // THE GD ARENA & DIALECTIC
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            The Group Discussion <span className="text-transparent bg-clip-text bg-gradient-to-r from-phoenix-ember to-orange-400">Arena</span>.
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-sans leading-relaxed">
            {gdRoomData.subtitle}
          </p>
        </div>

        {/* Featured Live Upcoming Debate Card */}
        <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-surface-100 to-surface-200 border border-orange-500/30 shadow-[0_0_40px_rgba(255,69,0,0.1)] mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-orange-500/20 text-phoenix-ember font-mono text-xs font-bold border border-orange-500/40">
                {gdRoomData.upcomingTopic.code}
              </span>
              <span className="text-xs font-mono text-gray-400">
                📅 {gdRoomData.upcomingTopic.date} • {gdRoomData.venue}
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {gdRoomData.upcomingTopic.status}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 leading-snug">
            {gdRoomData.upcomingTopic.topic}
          </h3>

          <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed mb-8 max-w-4xl">
            {gdRoomData.upcomingTopic.abstract}
          </p>

          {/* Dialectic Pro vs Con Split Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Pro Stance */}
            <div className="p-5 rounded-xl bg-surface-300/80 border border-cyan-500/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-phoenix-cyan uppercase font-bold tracking-wider">
                <Scale className="w-4 h-4" />
                <span>The Case for Open Weights & Proliferation</span>
              </div>
              <ul className="space-y-2 text-xs font-sans text-gray-300">
                {gdRoomData.upcomingTopic.proKeyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-phoenix-cyan shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Con Stance */}
            <div className="p-5 rounded-xl bg-surface-300/80 border border-orange-500/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-phoenix-ember uppercase font-bold tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>The Case for Frontier Containment & Governance</span>
              </div>
              <ul className="space-y-2 text-xs font-sans text-gray-300">
                {gdRoomData.upcomingTopic.conKeyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-phoenix-ember shrink-0 mt-1.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-gray-400">
              Moderated by: <strong className="text-white">{gdRoomData.upcomingTopic.moderator}</strong>
            </div>
            <Button
              variant="ember"
              size="md"
              icon={Sparkles}
              href="https://discord.gg/phoenix-ai"
              target="_blank"
            >
              Join Voice Lounge & Debates
            </Button>
          </div>
        </div>

        {/* Past Discussion Consensus Archive */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-mono uppercase tracking-widest text-gray-400 font-semibold">
              Recent Debate Outcomes & Consensus
            </h4>
            <span className="text-xs font-mono text-phoenix-cyan">
              Cadence: {gdRoomData.meetingCadence}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gdRoomData.pastDiscussions.map((past) => (
              <div
                key={past.code}
                className="p-5 rounded-xl bg-surface-100/60 border border-white/5 hover:border-white/15 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                  <span className="text-phoenix-ember font-bold">{past.code}</span>
                  <span>{past.date} • {past.attendees} Debaters</span>
                </div>
                <h5 className="text-sm font-display font-bold text-white leading-snug">
                  {past.topic}
                </h5>
                <p className="text-xs font-sans text-gray-400 leading-relaxed border-t border-white/5 pt-2">
                  <strong className="text-gray-300 font-mono">Consensus: </strong>
                  {past.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

