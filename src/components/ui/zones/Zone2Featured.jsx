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
      <div className="glass-panel p-6 sm:p-8 rounded-xl relative">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-[rgba(150,230,255,0.16)] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-[#55DFFF]">
            <span className="w-2 h-2 rounded-full bg-[#55DFFF] animate-pulse shadow-[0_0_8px_rgba(85,223,255,0.7)]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 02 // FEATURED DEPLOYMENTS & EVENTS
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#B8C7D4]">
            <Sparkles className="w-3.5 h-3.5 text-[#55DFFF]" />
            <span className="tracking-tight uppercase">
              CLUSTER DISPATCH • REGISTRATION ACTIVE
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
            Featured Activities & Hackathons
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(240,247,255,0.92)] font-sans max-w-2xl leading-[1.65] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
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
                className="group relative glass-card p-5 sm:p-6 border-l-2 border-l-[#55DFFF] hover:border-l-[#55DFFF] flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[rgba(85,223,255,0.10)] text-[#55DFFF] border border-[rgba(85,223,255,0.25)] uppercase tracking-wider font-semibold">
                      {ev.type}
                    </span>
                    <span className="text-xs font-mono text-[#B8C7D4] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#55DFFF]" />
                      <span>{ev.date}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-[#55DFFF] transition-colors mb-2 leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    {ev.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[rgba(240,247,255,0.92)] font-sans leading-[1.65] mb-4">
                    {ev.description}
                  </p>
                </div>

                {/* Venue & Action Footer */}
                <div className="pt-3 border-t border-[rgba(150,230,255,0.14)] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#B8C7D4] truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#55DFFF] shrink-0" />
                    <span className="truncate">{ev.venue}</span>
                  </div>

                  <button
                    onClick={() => handleRegister(ev.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 btn-tactile ${
                      isRegistered
                        ? 'bg-signal-green/20 text-signal-green border border-signal-green/40 shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                        : 'btn-glass-cyan shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
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
        <div className="pt-4 border-t border-[rgba(150,230,255,0.16)] flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/events"
            onClick={() => audioManager.playClick()}
            className="flex items-center gap-2 text-xs font-mono text-[#55DFFF] hover:text-white transition-colors group drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
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
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card hover:border-[#55DFFF]/50 text-xs font-mono text-[#B8C7D4] hover:text-white transition-all cursor-pointer btn-tactile"
            >
              <span>DESCEND TO COMMUNITY AISLE</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#55DFFF]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
