'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight, ArrowUpRight, Flame, Sparkles } from 'lucide-react';
import { upcomingEvents, pastEvents } from '@/data/eventsData';
import { Button } from '@/components/ui/Button';

export function EventsSection() {
  const featuredEvent = upcomingEvents.find((e) => e.featured) || upcomingEvents[0];
  const nextEvent = upcomingEvents.find((e) => e.id !== featuredEvent.id);
  const pastHighlight = pastEvents[0];

  return (
    <section id="events" className="relative py-28 px-6 sm:px-8 bg-[#070B11] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="text-xs font-mono tracking-widest text-phoenix-blue uppercase">
            03 // ARENA CALENDAR & SPRINTS
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-phoenix-blue/30 via-white/10 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-primary">
              Upcoming Sprints & <span className="text-gradient-cyan">Hackathons</span>.
            </h2>
            <p className="text-base text-secondary font-sans leading-relaxed">
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

        {/* Featured Flagship Event: Panoramic Stage (PRD Section 3.6) */}
        {featuredEvent && (
          <div className="relative p-8 sm:p-10 bg-gradient-to-br from-navy-deep via-[#0A121E] to-[#070B11] border border-phoenix-blue/30 mb-8 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-phoenix-blue/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-phoenix-blue text-white font-semibold">
                    FLAGSHIP SPRINT
                  </span>
                  <span className="text-xs font-mono text-phoenix-cyan">
                    ● {featuredEvent.spotsLeft} Team Slots Available
                  </span>
                </div>
                <span className="text-xs font-mono text-secondary px-2.5 py-1 bg-white/5 border border-white/10">
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
                  <span>{featuredEvent.venue}</span>
                </div>
              </div>

              {/* Registration CTA */}
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
                <Link
                  href="/events"
                  className="text-xs font-mono text-secondary hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>See Full Schedule & Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Two-Column Preview: Next Workshop + Past Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Next Upcoming Session */}
          {nextEvent && (
            <div className="p-6 bg-navy-deep/60 border border-white/10 flex flex-col justify-between hover:border-phoenix-blue/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-phoenix-cyan uppercase">{nextEvent.category}</span>
                  <span className="text-secondary">{nextEvent.date}</span>
                </div>
                <h4 className="text-xl font-display font-bold text-primary">
                  {nextEvent.title}
                </h4>
                <p className="text-sm text-secondary font-sans leading-relaxed">
                  {nextEvent.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono mt-6">
                <span className="text-secondary">{nextEvent.format}</span>
                <Link
                  href="/events"
                  className="text-phoenix-cyan hover:underline flex items-center gap-1"
                >
                  <span>Event Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Past Event Highlight Card */}
          {pastHighlight && (
            <div className="p-6 bg-navy-deep/40 border border-white/5 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-phoenix-orange uppercase">PAST HIGHLIGHT</span>
                  <span className="text-secondary">{pastHighlight.date}</span>
                </div>
                <h4 className="text-xl font-display font-bold text-primary">
                  {pastHighlight.title}
                </h4>
                <p className="text-sm text-secondary font-sans leading-relaxed">
                  {pastHighlight.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono mt-6">
                <span className="text-secondary">{pastHighlight.highlights[0]}</span>
                <Link
                  href="/events"
                  className="text-phoenix-orange hover:underline flex items-center gap-1"
                >
                  <span>Archive & Repos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
