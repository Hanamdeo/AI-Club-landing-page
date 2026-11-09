'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, ArrowDown, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { ZONE_OPERATIONS } from '@/data/clubData';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 02: Featured Zone
 * Architectural HUD display floating in the cold aisle.
 * Content revealed: Featured events and upcoming activities.
 */
export default function Zone2Featured({ onNextZone }) {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const handleRegister = (id) => {
    audioManager.playBeep(1100, 0.12);
    setRegisteredEvents((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-none font-sans">
      <div className="relative py-4 sm:py-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-white/[0.12] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-sage">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse shadow-[0_0_8px_rgba(162,178,159,0.7)]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 02 // FEATURED DEPLOYMENTS & EVENTS
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-[#24BFEA]" />
            <span className="tracking-tight uppercase">
              CLUSTER DISPATCH • REGISTRATION ACTIVE
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient-cyber tracking-tight mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Featured Activities & Hackathons
          </h2>
          <p className="text-xs sm:text-sm text-[#D1D5DB] font-sans max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            High-throughput 36-hour code sprints, low-latency CUDA GPU acceleration workshops, and weekly paper deconstructions.
          </p>
        </div>

        {/* Featured Events Open Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
          {ZONE_OPERATIONS.events.slice(0, 2).map((ev) => {
            const isRegistered = registeredEvents.includes(ev.id);

            return (
              <div
                key={ev.id}
                className="group relative border-l-2 border-sage/40 hover:border-[#24BFEA] pl-5 py-3 transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Date */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.08] text-sage border border-white/[0.1] uppercase tracking-wider">
                      {ev.type}
                    </span>
                    <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#24BFEA]" />
                      <span>{ev.date}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-ivory group-hover:text-sage transition-colors mb-2 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {ev.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#CBD5E1] font-sans leading-relaxed mb-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    {ev.description}
                  </p>
                </div>

                {/* Venue & Action Footer */}
                <div className="pt-3 border-t border-white/[0.1] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300 truncate">
                    <MapPin className="w-3.5 h-3.5 text-sage shrink-0" />
                    <span className="truncate">{ev.venue}</span>
                  </div>

                  <button
                    onClick={() => handleRegister(ev.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 btn-tactile ${
                      isRegistered
                        ? 'bg-signal-green/20 text-signal-green border border-signal-green/40 shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                        : 'bg-white/[0.08] hover:bg-sage/20 text-ivory hover:text-sage border border-white/[0.15] hover:border-sage/50 shadow-[0_2px_8px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-signal-green" />
                        <span>REGISTERED</span>
                      </>
                    ) : (
                      <span>REGISTER NOW</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-white/[0.12] flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/events"
            onClick={() => audioManager.playClick()}
            className="flex items-center gap-2 text-xs font-mono text-[#24BFEA] hover:text-white transition-colors group drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          >
            <span className="font-semibold">VIEW ALL OPERATIONS IN FLIGHT-BOARD</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {onNextZone && (
            <button
              onClick={() => {
                audioManager.playWhoosh();
                onNextZone();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/[0.1] btn-tactile"
            >
              <span>DESCEND TO COMMUNITY AISLE</span>
              <ArrowDown className="w-3.5 h-3.5 text-sage" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
