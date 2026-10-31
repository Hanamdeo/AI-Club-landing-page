'use client';

import React from 'react';
import { FACILITY_ZONES } from '@/data/clubData';

/**
 * HUDNavbar
 * Minimal, non-intrusive floating navigation bar.
 * Clean, elegant capsule without developer pseudo-code clutter.
 */
export default function HUDNavbar({ activeZoneIndex = 0, onNavigate }) {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none select-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full bg-charcoal/35 backdrop-blur-md border border-slate-struct/50 shadow-glass-panel max-w-4xl w-full">
        {/* Brand Node */}
        <button
          onClick={() => onNavigate(0)}
          className="flex items-center gap-2.5 text-xs font-sans font-bold text-ivory hover:text-sage transition-colors cursor-pointer"
        >
          <div className="w-6 h-6 rounded-md bg-slate-struct/40 border border-sage/40 flex items-center justify-center">
            <span className="text-[10px] text-sage font-bold">AI</span>
          </div>
          <span className="tracking-wider font-semibold">AI CLUB</span>
        </button>

        {/* Minimal Rounded Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {FACILITY_ZONES.map((zone, idx) => {
            const isActive = activeZoneIndex === idx;

            return (
              <button
                key={zone.id}
                onClick={() => onNavigate(idx)}
                className={`relative px-3 py-1 text-xs font-sans rounded-full transition-all cursor-pointer font-medium ${
                  isActive
                    ? 'text-sage bg-charcoal/70 border border-sage/50 shadow-sage-glow'
                    : 'text-ivory/70 hover:text-ivory hover:bg-charcoal/30'
                }`}
              >
                <span>{zone.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-sage rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
