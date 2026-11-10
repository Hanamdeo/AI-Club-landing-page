'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bot, ChevronRight, Terminal, Menu, X } from 'lucide-react';
import AudioToggle from './AudioToggle';
import { audioManager } from '@/utils/audioManager';

export const SERVER_NODE_ITEMS = [
  { id: 'entry', code: '01', label: '01 Entry', href: '/', zProgress: 0.05, zoneIndex: 0 },
  { id: 'featured', code: '02', label: '02 Featured', href: '/events', zProgress: 0.22, zoneIndex: 1 },
  { id: 'community', code: '03', label: '03 Community', href: '/team', zProgress: 0.40, zoneIndex: 2 },
  { id: 'research', code: '04', label: '04 Research', href: '/research', zProgress: 0.58, zoneIndex: 3 },
  { id: 'projects', code: '05', label: '05 Projects', href: '/projects', zProgress: 0.76, zoneIndex: 4 },
  { id: 'discovery', code: '06', label: '06 Discovery', href: '/join', zProgress: 0.94, zoneIndex: 5 },
];

/**
 * ServerSideNav
 * Hover-activated Precision Architectural Navigation Bar docked on the side of the Data Centre.
 * Seamlessly matches the #101415 industrial data facility background aesthetic.
 * Connects directly to dedicated Next.js routes and glides between 3D zones.
 */
export default function ServerSideNav({
  activeNavId = 'entry',
  scrollProgress = 0,
  scrollProgressRef,
  onNavigateToSection,
  onToggleTerminal,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const leaveTimerRef = useRef(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const activeRobotNodeId = activeNavId || 'entry';

  const handleMouseEnter = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 220);
  }, []);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const handleLinkClick = () => {
    try {
      audioManager.playClick();
    } catch {}
    setMobileOpen(false);
  };

  const handleItemClick = (e, item) => {
    try {
      audioManager.playClick();
    } catch {}
    setMobileOpen(false);
    if (isHomePage && onNavigateToSection) {
      e.preventDefault();
      onNavigateToSection(item.id, item.zProgress);
    }
  };

  const handleTerminal = useCallback(() => {
    try {
      audioManager.playClick();
    } catch {}
    if (onToggleTerminal) onToggleTerminal();
  }, [onToggleTerminal]);

  const isExpanded = isHovered || mobileOpen;

  return (
    <>
      {/* Mobile Floating Quick-Toggle Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden pointer-events-auto">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#101415]/90 backdrop-blur-xl border border-white/[0.08] text-ivory text-xs font-sans shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
          aria-label="Toggle Facility Navigation"
        >
          <div className="w-5 h-5 rounded bg-[#161B1C] border border-sage/40 flex items-center justify-center font-mono text-[9px] text-sage font-bold">
            AI
          </div>
          <span className="font-semibold text-[11px] tracking-wide text-ivory">ROUTER</span>
          {mobileOpen ? <X className="w-3.5 h-3.5 text-sage" /> : <Menu className="w-3.5 h-3.5 text-sage" />}
        </button>
      </div>

      {/* Main Server Side Navigation Bar (Hover-activated on desktop) */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 select-none font-sans pointer-events-auto transition-all duration-300 ${
          mobileOpen ? 'flex flex-col opacity-100' : 'hidden md:flex flex-col'
        }`}
        aria-label="Facility Data Server Navigation"
      >
        <div
          className={`flex flex-col rounded-2xl bg-[#101415]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out overflow-hidden ${
            isExpanded ? 'w-[210px] p-2' : 'w-[44px] p-1.5'
          }`}
        >
          {/* Header Brand Node */}
          <div className="flex items-center justify-between px-1.5 py-1.5 border-b border-white/[0.06] mb-0.5">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex items-center gap-2 text-left group cursor-pointer w-full overflow-hidden"
            >
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/30 flex items-center justify-center shrink-0 transition-colors group-hover:border-white shadow-[0_0_10px_rgba(255,255,255,0.15)] bg-black">
                <Image
                  src="/logo.png"
                  alt="AI Club Logo"
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
              {isExpanded && (
                <div className="flex flex-col min-w-0 transition-opacity duration-200">
                  <span className="text-xs sm:text-[13px] font-black text-white tracking-wider group-hover:text-slate-200 transition-colors leading-tight truncate">
                    AI CLUB
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 tracking-tight truncate">
                    {isHomePage ? '3D COLD AISLE' : 'RESEARCH PORTAL'}
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Interactive Navigation Pills (Expanded Mode) */}
          {isExpanded ? (
            <div className="flex flex-col gap-1 py-1 animate-fadeIn">
              {SERVER_NODE_ITEMS.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                const isRobotHere = isHomePage && activeRobotNodeId === item.id;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className={`group relative flex items-center justify-between gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-white bg-[#1A1E22] border border-white/50 shadow-[0_0_12px_rgba(255,255,255,0.15)] font-semibold'
                        : isRobotHere
                        ? 'text-white bg-[#141819] border border-white/30 hover:border-white/50 font-medium'
                        : 'text-slate-300 hover:text-white bg-transparent hover:bg-white/[0.06] border border-transparent font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Active Indicator Dot */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                          isActive
                            ? 'bg-white shadow-[0_0_8px_#FFFFFF]'
                            : isRobotHere
                            ? 'bg-slate-300 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                            : 'bg-white/20 group-hover:bg-white/40'
                        }`}
                      />
                      <span className="text-[11px] tracking-wide truncate">{item.label}</span>
                    </div>

                    {/* Proximity Badge or Chevron */}
                    {isRobotHere ? (
                      <span
                        className="flex items-center gap-1 text-[8px] font-mono text-white bg-white/15 px-1.5 py-0.5 rounded-full shrink-0 animate-pulse"
                        title="Robot currently stationed at this server rack"
                      >
                        <Bot className="w-2.5 h-2.5 text-white" />
                        <span className="text-[8px]">BOT</span>
                      </span>
                    ) : (
                      <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          ) : (
            /* Collapsed Resting State: Minimalist Sleek Server Dots */
            <div className="flex flex-col items-center gap-2.5 py-3.5 my-0.5 cursor-pointer" title="Hover to expand navigation">
              {SERVER_NODE_ITEMS.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                const isRobotHere = isHomePage && activeRobotNodeId === item.id;

                return (
                  <div
                    key={item.id}
                    className="relative flex items-center justify-center group"
                  >
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-2 h-2 bg-white shadow-[0_0_10px_#FFFFFF]'
                          : isRobotHere
                          ? 'w-2 h-2 bg-slate-300 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                          : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/50'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Action Controls: Terminal CLI & Procedural Audio Toggle */}
          {isExpanded ? (
            <div className="flex items-center justify-between pt-1.5 px-1 border-t border-white/[0.06] mt-0.5 animate-fadeIn">
              <button
                onClick={handleTerminal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono text-sage hover:text-ivory bg-[#161B1C] hover:bg-white/[0.06] border border-white/[0.08] hover:border-sage/40 transition-all cursor-pointer"
                title="Launch Interactive Terminal CLI [~]"
              >
                <Terminal className="w-3 h-3 text-sage" />
                <span className="font-semibold tracking-wider">CLI</span>
              </button>

              <AudioToggle />
            </div>
          ) : (
            /* Collapsed Hint Chevron */
            <div className="flex items-center justify-center pt-1.5 border-t border-white/[0.06] text-sage/50">
              <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
