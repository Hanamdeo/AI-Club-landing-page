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
    <section id="events" className="relative w-full py-24 px-6 md:px-12 lg:px-16 border-t border-white/10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-sage/10 border border-sage/30 text-xs font-mono text-sage uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 05 // Live Operations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-ivory tracking-tight">
              THE OPERATIONS BOARD
            </h2>
            <p className="text-base sm:text-lg text-sage/90 font-light mt-2 max-w-2xl">
              Flagship hackathons, systems engineering workshops, and competitive challenges organized by the AI Club cohorts.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="p-3 px-5 rounded-2xl bg-black/40 border border-white/10 text-right self-start md:self-auto">
            <span className="block text-[11px] font-mono text-slate-400 uppercase">
              Total Operations Scheduled
            </span>
            <span className="text-2xl font-bold text-sage num-normal">
              {events.length} Events
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                audioManager.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sage/20 border border-sage text-sage shadow-sage-glow'
                  : 'bg-black/20 border border-white/10 text-ivory/70 hover:border-white/20 hover:text-ivory'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Operational Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => {
            const isRegistered = registeredIds.includes(event.id);

            return (
              <div
                key={event.id}
                className="rounded-2xl bg-charcoal/40 border border-white/10 p-6 sm:p-7 hover:border-sage/40 hover:bg-charcoal/60 transition-all flex flex-col justify-between shadow-glass-panel"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-black/40 border border-white/10 text-ivory/80 font-medium">
                      {event.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {event.featured && (
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sage/20 border border-sage/40 text-sage font-semibold uppercase">
                          Featured
                        </span>
                      )}
                      <span
                        className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${
                          event.registrationStatus === 'open'
                            ? 'bg-sage/20 border-sage/40 text-sage'
                            : 'bg-black/40 border-white/10 text-slate-400'
                        }`}
                      >
                        {event.registrationStatus === 'open' ? 'Reg Open' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-ivory mb-2 leading-snug tracking-tight">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-ivory/80 leading-relaxed mb-4 line-clamp-3 font-normal">
                    {event.description}
                  </p>

                  {/* Logistics Details */}
                  <div className="space-y-2 text-xs text-slate-300 mb-5 font-mono bg-black/25 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-sage" />
                      <span>{event.date}</span>
                      <span className="text-slate-500">•</span>
                      <Clock className="w-3.5 h-3.5 text-sage" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-sage" />
                      <span>{event.venue}</span>
                    </div>
                    {event.seats && (
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-sage" />
                        <span>Capacity: {event.seats}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions: Inspect Details & Register */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <button
                    onClick={() => handleOpenModal(event)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-black/30 hover:bg-white/10 border border-white/10 text-xs text-ivory font-medium transition-all cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-sage" />
                    <span>View Dossier</span>
                  </button>

                  <button
                    onClick={() => handleRegister(event.id, event.registrationUrl)}
                    disabled={event.registrationStatus !== 'open'}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer tracking-wider uppercase ${
                      isRegistered
                        ? 'bg-sage/20 border border-sage text-sage cursor-default'
                        : event.registrationStatus === 'open'
                        ? 'bg-sage hover:bg-sage-glow text-graphite shadow-sage-glow'
                        : 'bg-black/30 border border-white/10 text-slate-500 cursor-not-allowed'
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

