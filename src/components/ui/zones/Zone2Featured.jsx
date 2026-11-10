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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-none font-sans safe-viewport-card custom-scrollbar">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative shadow-[0_16px_48px_rgba(0,0,0,0.65)]">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-white/[0.12] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 02 // FEATURED DEPLOYMENTS & EVENTS
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="tracking-tight uppercase">
              CLUSTER DISPATCH • REGISTRATION ACTIVE
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Featured Activities & Hackathons
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 font-sans max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            High-throughput 36-hour code sprints, low-latency CUDA GPU acceleration workshops, and weekly paper deconstructions.
          </p>
        </div>

        {/* Featured Events Frosted Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6">
          {ZONE_OPERATIONS.events.slice(0, 2).map((ev) => {
            const isRegistered = registeredEvents.includes(ev.id);

            return (
              <div
                key={ev.id}
                className="group relative rounded-xl p-5 sm:p-6 glass-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.10] text-slate-200 border border-white/20 uppercase tracking-wider font-semibold">
                      {ev.type}
                    </span>
                    <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-white" />
                      <span>{ev.date}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-slate-100 transition-colors mb-2 leading-snug drop-shadow-sm">
                    {ev.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-200 font-sans leading-relaxed mb-4">
                    {ev.description}
                  </p>
                </div>

                {/* Venue & Action Footer */}
                <div className="pt-3 border-t border-white/[0.10] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300 truncate font-medium">
                    <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                    <span className="truncate">{ev.venue}</span>
                  </div>

                  <button
                    onClick={() => handleRegister(ev.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 btn-tactile pointer-events-auto ${
                      isRegistered
                        ? 'bg-white/20 text-white border border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.25)]'
                        : 'bg-white/[0.08] hover:bg-white/[0.18] text-white border border-white/20 hover:border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
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
            className="flex items-center gap-2 text-xs font-mono text-slate-200 hover:text-white transition-colors group pointer-events-auto"
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
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.18] text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/20 btn-tactile pointer-events-auto"
            >
              <span>DESCEND TO COMMUNITY AISLE</span>
              <ArrowDown className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
