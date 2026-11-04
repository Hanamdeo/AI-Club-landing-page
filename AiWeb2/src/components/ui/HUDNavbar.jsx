'use client';

import React from 'react';
import { Terminal } from 'lucide-react';
import { FACILITY_ZONES } from '@/data/clubData';
import AudioToggle from './AudioToggle';
import { audioManager } from '@/utils/audioManager';

/**
 * HUDNavbar
 * Minimal, non-intrusive floating navigation bar.
 * Clean, elegant transparent capsule with Space Grotesk typography.
 */
export default function HUDNavbar({ activeZoneIndex = 0, onNavigate, onToggleTerminal }) {
  const handleNavClick = (idx) => {
    audioManager.playClick();
    if (onNavigate) onNavigate(idx);
  };

  const handleTerminalClick = () => {
    audioManager.playClick();
    if (onToggleTerminal) onToggleTerminal();
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none select-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2 rounded-full bg-black/25 backdrop-blur-xs border border-white/10 shadow-glass-panel max-w-5xl w-full">
        {/* Brand Node */}
        <button
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-2.5 text-xs font-sans font-bold text-ivory hover:text-sage transition-colors cursor-pointer shrink-0"
        >
          <div className="w-6 h-6 rounded-md bg-white/5 border border-sage/40 flex items-center justify-center font-sans">
            <span className="text-[10px] text-sage font-bold">AI</span>
          </div>
          <span className="hidden xs:inline tracking-wider font-bold">AI CLUB</span>
        </button>

        {/* Minimal Rounded Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {FACILITY_ZONES.map((zone, idx) => {
            const isActive = activeZoneIndex === idx;

            return (
              <button
                key={zone.id}
                onClick={() => handleNavClick(idx)}
                className={`relative px-2.5 sm:px-3 py-1 text-xs font-sans rounded-full transition-all cursor-pointer font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-sage bg-black/40 border border-sage/50 shadow-sage-glow'
                    : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
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

        {/* Action Controls: Terminal CLI & Sound Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* CLI Terminal Launcher */}
          <button
            onClick={handleTerminalClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-sans font-medium bg-black/30 border border-white/10 text-sage hover:border-sage/60 hover:bg-sage/10 transition-all cursor-pointer"
            title="Launch Interactive Terminal CLI [~]"
          >
            <Terminal className="w-3.5 h-3.5 text-sage" />
            <span className="hidden md:inline text-[11px] tracking-wider font-semibold">CLI</span>
          </button>

          {/* Procedural Audio Ambience Toggle */}
          <AudioToggle />
        </div>
      </nav>
    </header>
  );
}
