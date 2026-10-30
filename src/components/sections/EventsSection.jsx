'use client';

import React from 'react';
import { Calendar, Clock, MapPin, ArrowUpRight, Trophy, Zap, CheckCircle2 } from 'lucide-react';
import { eventsData } from '@/data/eventsData';
import { Button } from '@/components/ui/Button';

export function EventsSection() {
  const featuredEvent = eventsData.find((e) => e.featured) || eventsData[0];
  const upcomingEvents = eventsData.filter((e) => e.id !== featuredEvent.id);

  return (
    <section id="events" className="relative py-32 px-6 sm:px-8 bg-[#070B11] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-phoenix-blue uppercase">
            03 // ARENA CALENDAR & SPRINTS
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-phoenix-blue/30 via-white/10 to-transparent" />
        </div>

        <div className="max-w-3xl mb-12 space-y-3">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            Upcoming Sprints & <span className="text-gradient-cyan">Hackathons</span>.
          </h2>
          <p className="text-base text-secondary font-sans leading-relaxed">
            From 36-hour autonomous agent endurance hacking to bare-metal GPU memory profiling masterclasses.
          </p>
        </div>

        {/* Featured Flagship Event: Prominent Panoramic Stage (NOT an ordinary card) */}
        <div className="relative p-8 sm:p-12 bg-gradient-to-br from-navy-deep via-[#0A121E] to-[#070B11] border border-phoenix-blue/30 mb-16 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-phoenix-blue/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-phoenix-blue text-white font-semibold">
                  FLAGSHIP HACKATHON
                </span>
                <span className="text-xs font-mono text-phoenix-cyan">
                  ● {featuredEvent.spotsLeft} Team Slots Available
                </span>
              </div>
              <span className="text-xs font-mono text-secondary">
                {featuredEvent.status}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-display font-bold text-primary max-w-3xl leading-snug">
              {featuredEvent.title}
            </h3>

            <p className="text-base text-secondary font-sans leading-relaxed max-w-2xl">
              {featuredEvent.description}
            </p>

            {/* Event Metadata Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-mono text-primary max-w-2xl">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-phoenix-blue" />
                <span>{featuredEvent.date}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-phoenix-cyan" />
                <span>{featuredEvent.time}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-phoenix-orange" />
                <span>{featuredEvent.location}</span>
              </div>
            </div>

            {/* Schedule Highlights */}
            {featuredEvent.schedule && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4">
                {featuredEvent.schedule.map((slot, i) => (
                  <div key={i} className="p-3 bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-phoenix-cyan block uppercase">
                      {slot.time}
                    </span>
                    <span className="text-xs font-sans text-secondary line-clamp-1">
                      {slot.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 flex items-center gap-4">
              <Button
                variant="primary"
                size="md"
                icon={ArrowUpRight}
                href="https://discord.gg/phoenix-ai"
                target="_blank"
              >
                Apply As A Hackathon Team
              </Button>
            </div>
          </div>
        </div>

        {/* Clean Chronological Timeline List (NOT repetitive cards) */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-secondary font-semibold pb-2 border-b border-white/10">
            Sprint & Workshop Schedule
          </div>

          <div className="divide-y divide-white/5">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="group py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.01] transition-colors"
              >
                {/* Date & Track */}
                <div className="flex items-start md:items-center gap-6 md:w-1/3">
                  <div className="w-24 shrink-0 text-left">
                    <span className="text-xs font-mono text-phoenix-blue uppercase block">
                      {evt.date.split(',')[0]}
                    </span>
                    <span className="text-[10px] font-mono text-secondary">
                      {evt.category}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-primary group-hover:text-phoenix-cyan transition-colors">
                      {evt.title}
                    </h4>
                  </div>
                </div>

                {/* Logistics */}
                <div className="flex items-center gap-6 text-xs font-mono text-secondary md:w-1/3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-secondary/60" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-secondary/60" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>

                {/* Status & Link */}
                <div className="flex items-center justify-end gap-4 md:w-1/4">
                  {evt.status === 'Completed' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary/60">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Concluded</span>
                    </span>
                  ) : (
                    <a
                      href="https://discord.gg/phoenix-ai"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-display uppercase tracking-wider text-phoenix-cyan hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>RSVP / Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
