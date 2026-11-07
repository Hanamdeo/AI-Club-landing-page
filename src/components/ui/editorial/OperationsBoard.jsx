'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Info,
  X,
  UserCheck,
} from 'lucide-react';
import { getAllEvents } from '@/lib/contentSelectors';
import { filterByCategory, getUniqueCategories } from '@/lib/contentHelpers';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 05: The Operations Board
 * Live flight-board displaying upcoming workshops, hackathons, competitions, and technical sessions.
 * Features category filtering, registration links, and an interactive event detail inspection modal.
 */
export default function OperationsBoard() {
  const events = getAllEvents();
  const categories = getUniqueCategories(events, 'category');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEventModal, setSelectedEventModal] = useState(null);
  const [registeredIds, setRegisteredIds] = useState([]);

  const filteredEvents = filterByCategory(events, selectedCategory, 'category');

  const handleRegister = (id, url) => {
    audioManager.playClick();
    if (!registeredIds.includes(id)) {
      setRegisteredIds((prev) => [...prev, id]);
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenModal = (ev) => {
    audioManager.playClick();
    setSelectedEventModal(ev);
  };

  return (
    <section id="events" className="relative w-full py-20 sm:py-24 px-6 md:px-12 lg:px-16 border-t border-white/[0.08] font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 rounded-md bg-[#15191A] border border-white/[0.08] text-[11px] font-mono text-sage uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" />
              <span>Live Operations & Events</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-ivory tracking-tight">
              THE OPERATIONS BOARD
            </h2>
            <p className="text-sm sm:text-base text-sage/90 font-light mt-2 max-w-2xl">
              Flagship hackathons, systems engineering workshops, and competitive challenges organized by AI Club cohorts.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="p-3 px-4 rounded-xl bg-[#141819] border border-white/[0.08] text-right self-start md:self-auto">
            <span className="block text-[10px] font-mono text-slate-400 uppercase font-medium">
              Operations Scheduled
            </span>
            <span className="text-xl font-bold text-sage num-normal font-mono tnum">
              {events.length} Events
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                audioManager.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all cursor-pointer btn-tactile ${
                selectedCategory === cat
                  ? 'bg-[#1B2122] border border-sage/60 text-sage font-semibold'
                  : 'bg-[#141819] border border-white/[0.08] text-ivory/70 hover:border-white/[0.16] hover:text-ivory'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Operational Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredEvents.map((event) => {
            const isRegistered = registeredIds.includes(event.id);

            return (
              <div
                key={event.id}
                className="rounded-xl bg-[#141819] border border-white/[0.08] hover:border-white/[0.16] p-6 transition-all flex flex-col justify-between card-lift crosshair-corner"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#1B2122] border border-white/[0.08] text-ivory/80 font-medium">
                      {event.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {event.featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sage/15 border border-sage/30 text-sage font-semibold uppercase">
                          Featured
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                          event.registrationStatus === 'open'
                            ? 'bg-sage/15 border-sage/30 text-sage'
                            : 'bg-black/30 border-white/[0.08] text-slate-400'
                        }`}
                      >
                        {event.registrationStatus === 'open' ? 'Reg Open' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-ivory mb-2 leading-snug tracking-tight">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ivory/75 leading-relaxed mb-4 line-clamp-2 font-normal">
                    {event.description}
                  </p>

                  {/* Logistics Details */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-5 font-mono bg-[#101415] p-3 rounded-lg border border-white/[0.05]">
                    <div className="flex items-center gap-2 truncate">
                      <Calendar className="w-3.5 h-3.5 text-sage shrink-0" />
                      <span className="truncate">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <Clock className="w-3.5 h-3.5 text-sage shrink-0" />
                      <span className="truncate">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-3.5 h-3.5 text-sage shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                    {event.seats && (
                      <div className="flex items-center gap-2 truncate">
                        <Users className="w-3.5 h-3.5 text-sage shrink-0" />
                        <span className="truncate">Seats: {event.seats}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions: Inspect Details & Register */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center gap-3">
                  <button
                    onClick={() => handleOpenModal(event)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#101415] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.16] text-xs text-ivory font-medium transition-all cursor-pointer btn-tactile"
                  >
                    <Info className="w-3.5 h-3.5 text-sage" />
                    <span>View Dossier</span>
                  </button>

                  <button
                    onClick={() => handleRegister(event.id, event.registrationUrl)}
                    disabled={event.registrationStatus !== 'open'}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer tracking-wider uppercase btn-tactile ${
                      isRegistered
                        ? 'bg-sage/20 border border-sage/50 text-sage cursor-default'
                        : event.registrationStatus === 'open'
                        ? 'bg-sage hover:bg-sage-glow text-graphite shadow-tactile active:shadow-tactile-active font-bold'
                        : 'bg-black/30 border border-white/[0.08] text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                        <span>Registered</span>
                      </>
                    ) : (
                      <>
                        <span>REGISTER</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Inspection Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite/80 backdrop-blur-md animate-fade-in">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl bg-[#141819] border border-sage/40 shadow-2xl p-6 sm:p-8 text-ivory relative"
          >
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-ivory hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block px-2.5 py-1 rounded bg-sage/15 border border-sage/30 text-sage font-mono text-[11px] uppercase mb-3">
              {selectedEventModal.category}
            </div>

            <h3 className="text-2xl font-bold text-ivory mb-2 tracking-tight">
              {selectedEventModal.title}
            </h3>

            <p className="text-sm text-ivory/80 leading-relaxed mb-5 font-normal">
              {selectedEventModal.description}
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 font-mono bg-black/30 p-4 rounded-xl border border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sage" />
                <span>
                  Date: <span className="text-ivory font-bold">{selectedEventModal.date}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sage" />
                <span>Time: {selectedEventModal.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sage" />
                <span>Venue: {selectedEventModal.venue}</span>
              </div>
              {selectedEventModal.coordinator && (
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-sage" />
                  <span>Lead Coordinator: {selectedEventModal.coordinator}</span>
                </div>
              )}
              {selectedEventModal.prerequisites && (
                <div className="pt-2 border-t border-white/10 text-slate-400">
                  <span className="text-sage font-bold block mb-0.5">Prerequisites:</span>
                  {selectedEventModal.prerequisites}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-ivory hover:bg-white/5 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleRegister(selectedEventModal.id, selectedEventModal.registrationUrl);
                  setSelectedEventModal(null);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sage hover:bg-sage-glow text-graphite font-bold text-xs shadow-sage-glow transition-all uppercase"
              >
                <span>Proceed to Form</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

