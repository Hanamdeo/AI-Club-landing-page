'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Terminal, Menu, X } from 'lucide-react';
import AudioToggle from './AudioToggle';
import { audioManager } from '@/utils/audioManager';

export const NAV_LINKS = [
  { id: 'home', label: 'Facility 3D', href: '/' },
  { id: 'events', label: 'Events', href: '/events' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'research', label: 'Research & GD', href: '/research' },
  { id: 'gallery', label: 'Gallery', href: '/gallery' },
  { id: 'team', label: 'Team', href: '/team' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'join', label: 'Join', href: '/join' },
];

/**
 * HUDNavbar
 * Precision architectural floating HUD navbar.
 * Synthesizes Swiss engineering restraint with high-density developer telemetry.
 * Provides instant 0ms tactile navigation with background prefetching and progress cues.
 */
export default function HUDNavbar({ onToggleTerminal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigatingId, setNavigatingId] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  // Reset routing indicator on route completion
  React.useEffect(() => {
    setNavigatingId(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLinkClick = (e, link) => {
    try {
      audioManager.playClick();
    } catch {}

    // Close mobile drawer immediately with zero artificial delay
    setMobileMenuOpen(false);

    // If clicking current active route, scroll to top smoothly
    if (link.href === pathname) {
      if (e) e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Trigger instant top progress bar for 0ms visual tactile feedback
    setNavigatingId(link.id);
    window.dispatchEvent(new CustomEvent('route-navigate-start'));
  };

  const getIsActive = (link) => {
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
      <nav className="pointer-events-auto flex items-center justify-between gap-3 px-3.5 sm:px-5 py-2 rounded-xl bg-[#050C12]/60 backdrop-blur-[8px] border border-[rgba(255,255,255,0.10)] shadow-[0_8px_32px_rgba(0,0,0,0.25)] max-w-5xl w-full transition-all duration-200">
        {/* Brand Node: Architectural Identification Pill */}
        <Link
          href="/"
          prefetch={true}
          onClick={(e) => handleLinkClick(e, { id: 'home', href: '/' })}
          className="flex items-center gap-2.5 text-xs text-white hover:text-[#FFFFFF] transition-colors cursor-pointer shrink-0 group btn-tactile"
          aria-label="AI Club Facility Root"
        >

          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-[#55DFFF]/60 flex items-center justify-center shrink-0 transition-colors bg-black shadow-[0_0_10px_rgba(85,223,255,0.2)]">
            <Image
              src="/logo.png"
              alt="AI Club Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col text-left justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm sm:text-[15px] tracking-wider text-white group-hover:text-[#FFFFFF] transition-colors uppercase leading-none">
                AI CLUB
              </span>
              <span className="w-2 h-2 rounded-full bg-signal-green shadow-[0_0_8px_#22C55E]" title="Systems Nominal" />
            </div>
            <span className="text-[8px] sm:text-[8.5px] font-mono text-[#8E9FA8] tracking-[0.16em] uppercase mt-1 leading-none font-medium">
              MITS GWALIOR
            </span>
          </div>
        </Link>

        {/* Desktop Technical Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {NAV_LINKS.map((link) => {
            const isActive = getIsActive(link);
            const isNavigating = navigatingId === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                prefetch={true}
                onClick={(e) => handleLinkClick(e, link)}
                className={`relative px-3 py-1 text-xs rounded-md transition-all cursor-pointer font-medium whitespace-nowrap btn-tactile ${
                  isNavigating
                    ? 'text-signal-green bg-white/[0.08] border border-signal-green/40 font-semibold'
                    : isActive
                    ? 'text-[#FFFFFF] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.20)] font-semibold shadow-[0_0_12px_rgba(255,255,255,0.08)]'
                    : 'text-[#B8C7D4] hover:text-white hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[1px] bg-[#FFFFFF]" />
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#08121A]/70 border border-[rgba(255,255,255,0.10)] text-[#FFFFFF] hover:border-[#FFFFFF]/50 hover:bg-[rgba(255,255,255,0.08)] transition-all cursor-pointer font-mono btn-tactile"
            title="Launch Interactive Terminal CLI [~]"
          >
            <Terminal className="w-3.5 h-3.5 text-[#FFFFFF]" />
            <span className="hidden md:inline text-[11px] tracking-wider font-semibold">CLI</span>
            <span className="hidden lg:inline text-[9px] text-[#B8C7D4] font-mono">[~]</span>
          </button>

          {/* Procedural Audio Ambience Toggle */}
          <AudioToggle />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-1.5 rounded-lg bg-[#08121A]/70 border border-[rgba(255,255,255,0.10)] text-white hover:text-[#FFFFFF] transition-colors cursor-pointer btn-tactile"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 p-4 rounded-xl bg-[#050C12]/90 backdrop-blur-[12px] border border-[rgba(255,255,255,0.15)] shadow-2xl pointer-events-auto flex flex-col gap-1.5 animate-fade-in lg:hidden font-sans max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#B8C7D4] px-2 py-1 mb-1 border-b border-[rgba(255,255,255,0.08)]">
            <span>FACILITY DIRECTORY</span>
            <span className="text-[#FFFFFF] font-bold">ROUTES</span>
          </div>
          {NAV_LINKS.map((link) => {
            const isActive = getIsActive(link);
            const isNavigating = navigatingId === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                prefetch={true}
                onClick={(e) => handleLinkClick(e, link)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium text-left transition-all btn-tactile ${
                  isNavigating
                    ? 'bg-signal-green/15 border border-signal-green/50 text-signal-green font-bold shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                    : isActive
                    ? 'bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.20)] text-[#FFFFFF] font-semibold shadow-[0_0_12px_rgba(255,255,255,0.08)]'
                    : 'text-[#B8C7D4] hover:bg-white/[0.04] hover:text-white border border-transparent'
                }`}
              >
                <span>{link.label}</span>
                {isNavigating ? (
                  <span className="text-[10px] font-mono text-signal-green uppercase tracking-wider animate-pulse font-bold">
                    ROUTING...
                  </span>
                ) : isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF] shadow-[0_0_6px_#FFFFFF]" />
                ) : null}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
