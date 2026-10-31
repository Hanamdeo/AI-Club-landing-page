'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Users, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { ZONE_OPERATIONS } from '@/data/clubData';
import GlassPanel from '../GlassPanel';

/**
 * Zone 04: Operations Centre (Events & Competitions)
 * Transparent rounded operational flight-board interface at Z = -75.
 * Clean, human-readable typography without pseudo-code prefixes.
 */
export default function Zone4Operations() {
  const [registeredIds, setRegisteredIds] = useState([]);

  const handleRegister = (id) => {
    if (!registeredIds.includes(id)) {
      setRegisteredIds((prev) => [...prev, id]);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-16">
      <div className="w-full max-w-6xl">
        <GlassPanel>
          {/* Section Header */}
          <div className="mb-6 border-b border-slate-struct/30 pb-5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-ivory tracking-tight drop-shadow-sm font-sans">
              {ZONE_OPERATIONS.heading}
            </h2>
            <p className="text-base sm:text-lg text-sage/90 font-light mt-1.5 tracking-wide">
              {ZONE_OPERATIONS.subheading}
            </p>
          </div>

          {/* Operational Events Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ZONE_OPERATIONS.events.map((event) => {
              const isRegistered = registeredIds.includes(event.id);

              return (
                <div
                  key={event.id}
                  className="p-6 rounded-2xl bg-charcoal/20 backdrop-blur-xs border border-slate-struct/35 hover:border-slate-struct/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Event Type & Status Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-medium uppercase px-3 py-1 rounded-full bg-charcoal/40 border border-slate-struct/40 text-ivory/80 tracking-wide">
                        {event.type}
                      </span>
                      <span
                        className={`text-[11px] font-medium px-3 py-1 rounded-full border ${
                          event.status === 'REGISTRATION OPEN'
                            ? 'bg-sage/20 border-sage/40 text-sage'
                            : 'bg-charcoal/40 border-slate-struct/40 text-slate-400'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-ivory mb-2 tracking-tight">
                      {event.title}
                    </h3>

                    <p className="text-sm text-ivory/80 leading-relaxed mb-4 font-normal">
                      {event.description}
                    </p>

                    {/* Metadata Details with Normal Numbers */}
                    <div className="space-y-2 text-xs text-slate-300 mb-5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-sage" />
                        <span className="num-normal font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-sage" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-sage" />
                        <span className="num-normal">{event.seats}</span>
                      </div>
                    </div>
                  </div>

                  {/* Register / Action Button */}
                  <div className="pt-3 border-t border-slate-struct/35">
                    <button
                      onClick={() => handleRegister(event.id)}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer tracking-wider ${
                        isRegistered
                          ? 'bg-sage/20 border border-sage text-sage cursor-default'
                          : 'bg-charcoal/40 hover:bg-slate-struct/60 border border-slate-struct/40 text-ivory'
                      }`}
                    >
                      {isRegistered ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                          <span>Registration Confirmed</span>
                        </>
                      ) : (
                        <>
                          <span>REGISTER FOR EVENT</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
