'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { eventsData, eventCategories } from '@/data/eventsData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function EventsSection({ onOpenJoinModal }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredEvents = activeTab === 'All'
    ? eventsData
    : eventsData.filter((e) => e.category === activeTab);

  return (
    <section id="events" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090C12] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-4">
            <Badge variant="cyan" icon={Calendar}>
              03 // EXPERIENCES & SPRINTS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Events & <span className="text-phoenix-cyan">Arena Sprints</span>.
            </h2>
            <p className="text-base text-gray-400 font-sans">
              From intense 36-hour autonomous agent hackathons to deep GPU memory profiling workshops.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {eventCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeTab === cat
                    ? 'bg-phoenix-cyan text-[#07090D] font-bold shadow-glow-cyan/30'
                    : 'bg-surface-100 text-gray-400 border border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`group relative rounded-xl border transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between ${
                evt.featured
                  ? 'bg-gradient-to-br from-surface-100 via-surface-200 to-surface-100 border-cyan-500/40 shadow-glow-cyan/20'
                  : 'bg-surface-100/70 border-white/10 hover:border-cyan-500/30'
              }`}
            >
              {/* Event Badge Header */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={evt.featured ? 'ember' : 'blue'}>
                      {evt.category}
                    </Badge>
                    {evt.spotsLeft > 0 && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {evt.spotsLeft} Seats Remaining
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-gray-400">{evt.status}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 group-hover:text-phoenix-cyan transition-colors">
                  {evt.title}
                </h3>

                <p className="text-sm text-gray-300 font-sans leading-relaxed mb-6">
                  {evt.description}
                </p>

                {/* Event Metadata (Date, Time, Location) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-surface-200/90 border border-white/5 text-xs font-mono text-gray-300 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-phoenix-cyan shrink-0" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate">{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-phoenix-ember shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>

                {/* Schedule Snapshot if available */}
                {evt.schedule && evt.schedule.length > 0 && (
                  <div className="mb-6 space-y-1.5">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      Schedule Snapshot:
                    </div>
                    {evt.schedule.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-gray-400">
                        <span className="text-phoenix-cyan">›</span>
                        <span className="text-gray-500">{item.time}:</span>
                        <span className="text-gray-300 truncate">{item.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags & Action Button */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {evt.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {evt.status === 'Completed' ? (
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Concluded</span>
                  </div>
                ) : (
                  <Button
                    variant={evt.featured ? 'ember' : 'primary'}
                    size="sm"
                    icon={ArrowRight}
                    onClick={onOpenJoinModal}
                  >
                    Register / RSVP
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
