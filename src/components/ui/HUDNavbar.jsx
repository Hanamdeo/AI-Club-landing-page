'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Menu, X } from 'lucide-react';
import AudioToggle from './AudioToggle';
import { audioManager } from '@/utils/audioManager';

export const NAV_LINKS = [
  { id: 'home', label: 'Facility 3D', href: '/' },
  { id: 'events', label: 'Events', href: '/events' },
  { id: 'research', label: 'Research', href: '/research' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'team', label: 'Team', href: '/team' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'join', label: 'Join', href: '/join' },
];

/**
 * HUDNavbar
 * Precision architectural floating HUD navbar.
 * Synthesizes Swiss engineering restraint with high-density developer telemetry.
 * Provides true client-side route navigation with visual active route indication.
 */
export default function HUDNavbar({ onToggleTerminal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHomeSection, setActiveHomeSection] = useState('entry');
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Synchronize active indicator with 3D facility zone on Home
  React.useEffect(() => {
    const handleZoneChange = (e) => {
      if (e.detail?.id) {
        setActiveHomeSection(e.detail.id);
      }
    };
    window.addEventListener('facility-zone-change', handleZoneChange);
    return () => window.removeEventListener('facility-zone-change', handleZoneChange);
  }, []);

  const handleLinkClick = (e, link) => {
    try {
      audioManager.playClick();
    } catch {}
    setMobileMenuOpen(false);

    // On the 3D home page, smoothly glide the 3D camera rather than unmounting the scene
    if (isHomePage) {
      const zoneMap = {
        home: { id: 'entry', zoneIndex: 0 },
        events: { id: 'featured', zoneIndex: 1 },
        team: { id: 'community', zoneIndex: 2 },
        research: { id: 'research', zoneIndex: 3 },
        projects: { id: 'projects', zoneIndex: 4 },
        join: { id: 'discovery', zoneIndex: 5 },
      };

      if (zoneMap[link.id]) {
        if (e) e.preventDefault();
        setActiveHomeSection(zoneMap[link.id].id);
        window.dispatchEvent(
          new CustomEvent('facility-navigate', {
            detail: zoneMap[link.id],
          })
        );
      }
    }
  };

  const getIsActive = (link) => {
    if (isHomePage) {
      if (link.id === 'home') return activeHomeSection === 'entry';
      if (link.id === 'events') return activeHomeSection === 'featured';
      if (link.id === 'team') return activeHomeSection === 'community';
      if (link.id === 'research') return activeHomeSection === 'research';
      if (link.id === 'projects') return activeHomeSection === 'projects';
      if (link.id === 'join') return activeHomeSection === 'discovery';
      return false;
    }
    return link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
  };

  const handleTerminalClick = () => {
    try {
      audioManager.playClick();
    } catch {}
    if (onToggleTerminal) onToggleTerminal();
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none select-none font-sans">
      <nav className="pointer-events-auto flex items-center justify-between gap-3 px-3.5 sm:px-5 py-2 rounded-xl bg-[#0D1011]/90 backdrop-blur-md border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)] max-w-5xl w-full transition-colors duration-200">
        {/* Brand Node: Architectural Identification Pill */}
        <Link
          href="/"
          onClick={(e) => handleLinkClick(e, { id: 'home', href: '/' })}
          className="flex items-center gap-2.5 text-xs text-ivory hover:text-sage transition-colors cursor-pointer shrink-0 group btn-tactile"
          aria-label="AI Club Facility Root"
        >
          <div className="w-6 h-6 rounded-md bg-[#15191A] border border-white/[0.12] group-hover:border-sage/50 flex items-center justify-center font-mono transition-colors">
            <span className="text-[10px] text-sage font-bold tracking-tight">AI</span>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="tracking-tight font-bold text-xs text-ivory group-hover:text-sage transition-colors">
                AI CLUB
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-signal-green shadow-[0_0_6px_#22C55E]" title="Systems Nominal" />
            </div>
            <span className="hidden sm:inline text-[9px] font-mono text-slate-400 tracking-wider uppercase -mt-0.5">
              MITS GWALIOR
            </span>
          </div>
        </Link>

        {/* Desktop Technical Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {NAV_LINKS.map((link) => {
            const isActive = getIsActive(link);

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`relative px-3 py-1 text-xs rounded-md transition-all cursor-pointer font-medium whitespace-nowrap btn-tactile ${
                  isActive
                    ? 'text-sage bg-white/[0.06] border border-sage/40 font-semibold shadow-sage-glow'
                    : 'text-ivory/70 hover:text-ivory hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[1px] bg-sage" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Controls: CLI Launcher, Audio Toggle & Mobile Menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* CLI Terminal Launcher */}
          <button
            onClick={handleTerminalClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#15191A] border border-white/[0.08] text-sage hover:border-sage/40 hover:bg-white/[0.04] transition-all cursor-pointer font-mono btn-tactile"
            title="Launch Interactive Terminal CLI [~]"
          >
            <Terminal className="w-3.5 h-3.5 text-sage" />
            <span className="hidden md:inline text-[11px] tracking-wider font-semibold">CLI</span>
            <span className="hidden lg:inline text-[9px] text-slate-500 font-mono">[~]</span>
          </button>

          {/* Procedural Audio Ambience Toggle */}
          <AudioToggle />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-1.5 rounded-lg bg-[#15191A] border border-white/[0.08] text-ivory hover:text-sage transition-colors cursor-pointer btn-tactile"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 p-4 rounded-xl bg-[#0D1011]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl pointer-events-auto flex flex-col gap-1.5 animate-fade-in lg:hidden font-sans">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 px-2 py-1 mb-1 border-b border-white/[0.06]">
            <span>FACILITY DIRECTORY</span>
            <span className="text-sage font-bold">ROUTES</span>
          </div>
          {NAV_LINKS.map((link) => {
            const isActive = getIsActive(link);
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium text-left transition-all btn-tactile ${
                  isActive
                    ? 'bg-white/[0.06] border border-sage/40 text-sage font-semibold shadow-sage-glow'
                    : 'text-ivory/80 hover:bg-white/[0.03] hover:text-ivory border border-transparent'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sage shadow-[0_0_6px_#A2B29F]" />}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
