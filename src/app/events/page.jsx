'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { upcomingEvents, pastEvents, eventCategories } from '@/data/eventsData';
import { Button } from '@/components/ui/Button';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  ArrowUpRight,
  ExternalLink,
  Trophy,
  FileText,
  Github,
  AlertCircle,
  Filter,
  CheckCircle2,
} from 'lucide-react';

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'

  // Filter upcoming events
  const filteredUpcoming = activeCategory === 'All'
    ? upcomingEvents
    : upcomingEvents.filter((e) => e.category.toLowerCase().includes(activeCategory.toLowerCase()));

  // Filter past events
  const filteredPast = activeCategory === 'All'
    ? pastEvents
    : pastEvents.filter((e) => e.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const featuredUpcoming = filteredUpcoming.find((e) => e.featured) || filteredUpcoming[0];
  const otherUpcoming = filteredUpcoming.filter((e) => e.id !== featuredUpcoming?.id);

  return (
    <div className="relative min-h-screen bg-background text-white flex flex-col selection:bg-phoenix-blue selection:text-white">
      {/* Global Navbar */}
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* A. Events Page Header (PRD Section 4.2 A) */}
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-phoenix-cyan uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-phoenix-cyan animate-pulse" />
              <span>COLLEGIATE CALENDAR // SPRINTS & ACADEMY</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-primary">
              Club Events & <span className="text-gradient-cyan">Sprints</span>.
            </h1>

            <p className="text-base sm:text-lg text-secondary font-sans leading-relaxed">
              Explore our upcoming hackathons, bare-metal systems workshops, and research seminars. We maintain a verified archive of competition outcomes, lecture slides, and open-source codebases.
            </p>
          </div>

          {/* Filtering & View Controls (PRD Section 4.2 D) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
            {/* Tab Switcher: Upcoming vs. Past */}
            <div className="inline-flex p-1 bg-navy-deep/80 border border-white/10 rounded-sm">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'upcoming'
                    ? 'bg-phoenix-blue text-white font-bold shadow-md'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                Upcoming Sprints ({filteredUpcoming.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'past'
                    ? 'bg-phoenix-blue text-white font-bold shadow-md'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                Past Event Archive ({filteredPast.length})
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-secondary mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-phoenix-cyan" />
                Category:
              </span>
              {eventCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-white/10 border-phoenix-cyan text-phoenix-cyan font-bold'
                      : 'border-white/10 text-secondary hover:text-primary hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* B. UPCOMING EVENTS TAB */}
          {activeTab === 'upcoming' && (
            <div className="space-y-12">
              {filteredUpcoming.length === 0 ? (
                /* Empty State (PRD Section 4.3) */
                <div className="p-16 bg-navy-deep/40 border border-white/10 text-center space-y-4">
                  <AlertCircle className="w-10 h-10 text-secondary mx-auto" />
                  <h3 className="text-xl font-display font-bold text-primary">
                    No Upcoming Events in this Category
                  </h3>
                  <p className="text-sm text-secondary font-sans max-w-md mx-auto">
                    There are no scheduled sprints matching "{activeCategory}". Check our past event highlights or reset category filters.
                  </p>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="mt-2 text-xs font-mono text-phoenix-cyan underline hover:text-primary cursor-pointer"
                  >
                    Reset Filter to All
                  </button>
                </div>
              ) : (
                <>
                  {/* Featured Flagship Upcoming Event Stage */}
                  {featuredUpcoming && (
                    <div className="relative p-8 sm:p-12 bg-gradient-to-br from-navy-deep via-[#0A121E] to-[#070B11] border border-phoenix-blue/40 overflow-hidden">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-phoenix-blue/10 rounded-full blur-3xl pointer-events-none" />

                      <div className="relative z-10 space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-phoenix-blue text-white font-bold">
                              FEATURED // {featuredUpcoming.category}
                            </span>
                            <span className="text-xs font-mono text-phoenix-cyan">
                              ● {featuredUpcoming.spotsLeft} Seats Available
                            </span>
                          </div>
                          <span className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 text-secondary">
                            Status: {featuredUpcoming.status}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-display font-bold text-primary max-w-4xl leading-tight">
                          {featuredUpcoming.title}
                        </h2>

                        <p className="text-base text-secondary font-sans leading-relaxed max-w-3xl">
                          {featuredUpcoming.description}
                        </p>

                        {/* Metadata Ribbons */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-mono text-primary max-w-3xl">
                          <div className="flex items-center gap-2.5">
                            <Calendar className="w-4 h-4 text-phoenix-blue" />
                            <span>{featuredUpcoming.date}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <Clock className="w-4 h-4 text-phoenix-cyan" />
                            <span>{featuredUpcoming.time}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-phoenix-orange" />
                            <span>{featuredUpcoming.venue}</span>
                          </div>
                        </div>

                        {/* Eligibility & Registration Requirements (PRD Section 4.2 B) */}
                        <div className="p-4 bg-black/40 border border-white/10 space-y-2 max-w-3xl text-xs font-mono">
                          <div className="text-phoenix-cyan">
                            <span className="font-bold">Eligibility:</span> {featuredUpcoming.eligibility}
                          </div>
                          <div className="text-secondary">
                            <span className="font-bold text-primary">Registration Deadline:</span> {featuredUpcoming.registrationDeadline}
                          </div>
                        </div>

                        {/* Schedule Timeline */}
                        {featuredUpcoming.schedule && (
                          <div className="space-y-3 pt-2">
                            <span className="text-xs font-mono text-secondary uppercase tracking-widest font-semibold">
                              Sprint Schedule Breakdown
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              {featuredUpcoming.schedule.map((slot, i) => (
                                <div key={i} className="p-3 bg-navy-surface/60 border border-white/5 space-y-1">
                                  <div className="text-[11px] font-mono text-phoenix-cyan font-semibold">
                                    {slot.time}
                                  </div>
                                  <div className="text-xs font-sans text-secondary leading-snug">
                                    {slot.title}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Link */}
                        <div className="pt-4 flex flex-wrap items-center gap-4">
                          <Button
                            variant="primary"
                            size="lg"
                            icon={ArrowUpRight}
                            href={featuredUpcoming.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Submit Registration
                          </Button>
                          <span className="text-xs font-mono text-secondary">
                            Official destination: verified Google Form
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Other Upcoming Events Grid */}
                  {otherUpcoming.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-xs font-mono tracking-widest text-secondary uppercase">
                        Other Scheduled Sessions
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherUpcoming.map((event) => (
                          <div
                            key={event.id}
                            className="group p-6 bg-navy-deep/60 border border-white/10 hover:border-phoenix-blue/40 transition-all duration-300 flex flex-col justify-between"
                          >
                            <div className="space-y-4">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="px-2 py-0.5 bg-white/5 text-phoenix-cyan border border-white/5 uppercase">
                                  {event.category}
                                </span>
                                <span className="text-secondary">{event.status}</span>
                              </div>

                              <h4 className="text-xl font-display font-bold text-primary group-hover:text-phoenix-cyan transition-colors leading-snug">
                                {event.title}
                              </h4>

                              <p className="text-xs text-secondary font-sans leading-relaxed">
                                {event.description}
                              </p>

                              <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs font-mono text-secondary">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-3.5 h-3.5 text-phoenix-blue" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-3.5 h-3.5 text-phoenix-cyan" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-3.5 h-3.5 text-phoenix-orange" />
                                  <span>{event.venue}</span>
                                </div>
                              </div>

                              <div className="p-2.5 bg-black/40 border border-white/5 text-[11px] font-mono text-secondary/80">
                                <div><span className="text-primary font-semibold">Eligibility:</span> {event.eligibility}</div>
                              </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono mt-6">
                              <span className="text-secondary">{event.format}</span>
                              <Button
                                variant="secondary"
                                size="sm"
                                icon={ArrowUpRight}
                                href={event.registrationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Register
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* C. PAST EVENTS TAB (PRD Section 4.2 C) */}
          {activeTab === 'past' && (
            <div className="space-y-8">
              {filteredPast.length === 0 ? (
                <div className="p-16 bg-navy-deep/40 border border-white/10 text-center space-y-4">
                  <AlertCircle className="w-10 h-10 text-secondary mx-auto" />
                  <h3 className="text-xl font-display font-bold text-primary">
                    No Past Records Found
                  </h3>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="mt-2 text-xs font-mono text-phoenix-cyan underline hover:text-primary cursor-pointer"
                  >
                    Reset Category Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPast.map((event) => (
                    <div
                      key={event.id}
                      className="p-8 bg-navy-deep/50 border border-white/10 hover:border-white/20 transition-all space-y-6 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="px-2.5 py-1 bg-phoenix-orange/10 text-phoenix-orange border border-phoenix-orange/30 font-semibold uppercase">
                            COMPLETED // {event.category}
                          </span>
                          <span className="text-secondary">{event.date}</span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-primary">
                          {event.title}
                        </h3>

                        <p className="text-sm text-secondary font-sans leading-relaxed">
                          {event.description}
                        </p>

                        {/* Verified Highlights */}
                        <div className="space-y-2 pt-2">
                          <span className="text-xs font-mono text-secondary uppercase tracking-wider font-semibold">
                            Key Highlights:
                          </span>
                          <ul className="space-y-1.5 text-xs font-sans text-secondary">
                            {event.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-phoenix-cyan shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Verified Results & Winners (PRD Section 4.2 C) */}
                        {event.results && (
                          <div className="p-4 bg-black/40 border border-white/5 space-y-1.5">
                            <span className="text-xs font-mono text-phoenix-orange uppercase tracking-wider flex items-center gap-1.5 font-bold">
                              <Trophy className="w-3.5 h-3.5" />
                              Podium & Verified Outcomes:
                            </span>
                            {event.results.map((res, i) => (
                              <p key={i} className="text-xs font-mono text-primary/90">
                                • {res}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Follow-up Resources & Links (PRD Section 4.2 C) */}
                      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                        <span className="text-secondary/70">📍 {event.venue}</span>
                        <div className="flex items-center gap-3">
                          {event.resources?.map((res, idx) => (
                            <a
                              key={idx}
                              href={res.url}
                              target={res.url.startsWith('http') ? '_blank' : '_self'}
                              rel="noreferrer"
                              className="text-phoenix-cyan hover:underline flex items-center gap-1"
                            >
                              <span>{res.label}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

