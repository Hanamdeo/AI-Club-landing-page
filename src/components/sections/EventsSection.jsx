'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight, ArrowUpRight, Flame, Sparkles, Terminal } from 'lucide-react';
import { upcomingEvents, pastEvents } from '@/data/eventsData';
import { Button } from '@/components/ui/Button';
import { CircuitCard } from '@/components/ui/CircuitCard';

export function EventsSection() {
  const featuredEvent = upcomingEvents.find((e) => e.featured) || upcomingEvents[0];
  const nextEvent = upcomingEvents.find((e) => e.id !== featuredEvent.id);
  const pastHighlight = pastEvents[0];

  return (
    <section id="events" className="relative py-28 px-6 sm:px-8 bg-[#050507] border-t border-[rgba(72,189,232,0.14)]">
      {/* Background Cyber-Circuit Grid */}
      <div className="absolute inset-0 bg-circuit-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="text-xs font-mono tracking-widest text-circuit-cyan uppercase">
            03 // ARENA CALENDAR & COMPUTE SPRINTS
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-circuit-cyan/30 via-[rgba(72,189,232,0.14)] to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest text-text-primary">
              Upcoming Sprints & <span className="text-gradient-cyan">Hackathons</span>.
            </h2>
            <p className="text-base text-text-muted font-sans leading-relaxed">
              From 36-hour autonomous agent endurance hacking to bare-metal GPU memory profiling masterclasses.
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            icon={ArrowRight}
            href="/events"
          >
            View All Events
          </Button>
        </div>

        {/* Featured Flagship Event: Panoramic Bento Stage */}
        {featuredEvent && (
          <CircuitCard className="p-8 sm:p-10 mb-8" withTicks={true} spotlightColor="rgba(72, 189, 232, 0.35)">
            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-circuit-cyan text-[#050507] font-bold rounded-[3px]">
                    FLAGSHIP SPRINT
                  </span>
                  <span className="text-xs font-mono text-circuit-cyan flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-circuit-cyan animate-pulse" />
                    {featuredEvent.spotsLeft} Team Slots Available
                  </span>
                </div>
                <span className="text-xs font-mono text-circuit-amber px-2.5 py-1 bg-circuit-amber/10 border border-circuit-amber/30 rounded-[3px]">
                  {featuredEvent.status}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold text-text-primary max-w-3xl leading-snug tracking-tight">
                {featuredEvent.title}
              </h3>

              <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed max-w-2xl">
                {featuredEvent.description}
              </p>

              {/* Event Metadata Ribbon */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[rgba(72,189,232,0.14)] text-xs font-mono text-text-primary max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-circuit-cyan" />
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-circuit-cyan" />
                  <span>{featuredEvent.time}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-circuit-amber" />
                  <span>{featuredEvent.venue}</span>
                </div>
              </div>

              {/* Registration CTA with spring physics sweep */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowUpRight}
                  href={featuredEvent.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Squad
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  href="/events"
                >
                  Inspect Full Rules
                </Button>
              </div>
            </div>
          </CircuitCard>
        )}

        {/* Secondary Asymmetric Sprints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nextEvent && (
            <CircuitCard className="p-6 flex flex-col justify-between" withTicks={true}>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-circuit-amber uppercase">
                    NEXT SPRINT // {nextEvent.category}
                  </span>
                  <span className="text-text-muted">{nextEvent.date}</span>
                </div>
                <h4 className="text-xl font-display font-bold text-text-primary group-hover:text-circuit-cyan transition-colors">
                  {nextEvent.title}
                </h4>
                <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed">
                  {nextEvent.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[rgba(72,189,232,0.12)] flex items-center justify-between">
                <span className="text-xs font-mono text-text-muted">{nextEvent.venue}</span>
                <Link
                  href="/events"
                  className="text-xs font-mono text-circuit-cyan hover:underline flex items-center gap-1 group/link"
                >
                  <span>DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </CircuitCard>
          )}

          {pastHighlight && (
            <CircuitCard className="p-6 flex flex-col justify-between" withTicks={true}>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-text-muted uppercase">
                    ARCHIVED RECORD // {pastHighlight.category}
                  </span>
                  <span className="text-circuit-cyan">COMPLETED</span>
                </div>
                <h4 className="text-xl font-display font-bold text-text-primary group-hover:text-circuit-cyan transition-colors">
                  {pastHighlight.title}
                </h4>
                <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed">
                  {pastHighlight.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[rgba(72,189,232,0.12)] flex items-center justify-between">
                <span className="text-xs font-mono text-circuit-amber">
                  Winner: {pastHighlight.winner || 'Team NeuroKernel'}
                </span>
                <Link
                  href="/events"
                  className="text-xs font-mono text-circuit-cyan hover:underline flex items-center gap-1 group/link"
                >
                  <span>POST-MORTEM</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </CircuitCard>
          )}
        </div>
      </div>
    </section>
  );
}
