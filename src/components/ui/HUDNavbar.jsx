'use client';

import React, { useState } from 'react';
import { Terminal, Menu, X, Radio, Sparkles } from 'lucide-react';
import AudioToggle from './AudioToggle';
import { audioManager } from '@/utils/audioManager';

export const NAV_LINKS = [
  { id: 'hero', label: 'Home', targetId: 'section-arrival' },
  { id: 'discussions', label: 'Discussions', targetId: 'discussions' },
  { id: 'events', label: 'Events', targetId: 'events' },
  { id: 'radar', label: 'AI Radar', targetId: 'radar' },
  { id: 'projects', label: 'Projects', targetId: 'projects' },
  { id: 'team', label: 'Team', targetId: 'team' },
  { id: 'join', label: 'Join', targetId: 'join-network' },
];

/**
 * HUDNavbar
 * Minimal, responsive floating navigation bar with active section indicator,
 * mobile drawer navigation, CLI launcher, and procedural audio toggle.
 */
export default function HUDNavbar({
  activeNavId = 'hero',
  onNavigateToSection,
  onToggleTerminal,
  isEditorialMode = false,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (targetId, navId) => {
    audioManager.playClick();
    setMobileMenuOpen(false);
    if (onNavigateToSection) onNavigateToSection(targetId, navId);
  };

  const handleTerminalClick = () => {
    audioManager.playClick();
    if (onToggleTerminal) onToggleTerminal();
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none select-none font-sans">
      <nav className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-glass-panel max-w-5xl w-full">
        {/* Brand Node */}
        <button
          onClick={() => handleNavClick('section-arrival', 'hero')}
          className="flex items-center gap-2.5 text-xs font-bold text-ivory hover:text-sage transition-colors cursor-pointer shrink-0"
        >
          <div className="w-6 h-6 rounded-md bg-white/5 border border-sage/40 flex items-center justify-center font-mono">
            <span className="text-[10px] text-sage font-bold">AI</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="hidden xs:inline tracking-wider font-bold text-xs">AI CLUB</span>
            <span className="hidden md:inline text-[9px] font-mono text-sage/80 -mt-1">
              {isEditorialMode ? 'EDITORIAL ARCHIVE' : 'IMMERSIVE 3D'}
            </span>
          </div>
        </button>

        {/* Desktop Rounded Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {NAV_LINKS.map((link) => {
            const isActive = activeNavId === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.targetId, link.id)}
                className={`relative px-3 py-1 text-xs rounded-full transition-all cursor-pointer font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-sage bg-black/60 border border-sage/50 shadow-sage-glow'
                    : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-sage rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls: CLI Launcher, Audio Toggle & Mobile Menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* CLI Terminal Launcher */}
          <button
            onClick={handleTerminalClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-black/40 border border-white/10 text-sage hover:border-sage/60 hover:bg-sage/10 transition-all cursor-pointer font-mono"
            title="Launch Interactive Terminal CLI [~]"
          >
            <Terminal className="w-3.5 h-3.5 text-sage" />
            <span className="hidden md:inline text-[11px] tracking-wider font-semibold">CLI</span>
          </button>

          {/* Procedural Audio Ambience Toggle */}
          <AudioToggle />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-1.5 rounded-full bg-white/5 border border-white/10 text-ivory hover:text-sage transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 p-4 rounded-2xl bg-[#141819]/95 backdrop-blur-xl border border-white/15 shadow-2xl pointer-events-auto flex flex-col gap-2 animate-fade-in lg:hidden">
          <div className="text-[10px] font-mono uppercase text-sage font-bold px-2 mb-1">
            // FACILITY DIRECTORY:
          </div>
          {NAV_LINKS.map((link) => {
            const isActive = activeNavId === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.targetId, link.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                  isActive
                    ? 'bg-sage/20 border border-sage/40 text-sage'
                    : 'text-ivory/80 hover:bg-white/5 hover:text-ivory'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sage" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
