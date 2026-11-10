'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
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
  const [activeRobotNodeId, setActiveRobotNodeId] = useState(activeNavId || 'entry');
  const [mobileOpen, setMobileOpen] = useState(false);
  const leaveTimerRef = useRef(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Synchronize robot location along the cold aisle via activeNavId or shared scroll ref on Home
  useEffect(() => {
    if (!isHomePage) return;
    if (activeNavId) {
      setActiveRobotNodeId(activeNavId);
    }
  }, [activeNavId, isHomePage]);

  useEffect(() => {
    if (!isHomePage) return;
    let animId;
    const checkRobotPos = () => {
      const sp = scrollProgressRef?.current !== undefined ? scrollProgressRef.current : scrollProgress;
      const activeIdx = SERVER_NODE_ITEMS.reduce((closestIdx, item, idx) => {
        const currentDiff = Math.abs(sp - item.zProgress);
        const closestDiff = Math.abs(sp - SERVER_NODE_ITEMS[closestIdx].zProgress);
        return currentDiff < closestDiff ? idx : closestIdx;
      }, 0);
      const closestId = SERVER_NODE_ITEMS[activeIdx]?.id || 'entry';
      setActiveRobotNodeId((prev) => (prev !== closestId ? closestId : prev));
      animId = requestAnimationFrame(checkRobotPos);
    };
    animId = requestAnimationFrame(checkRobotPos);
    return () => cancelAnimationFrame(animId);
  }, [scrollProgressRef, scrollProgress, isHomePage]);

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
      setActiveRobotNodeId(item.id);
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
      {/* Main Server Side Navigation Bar (Desktop Hover-activated Rail) */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="hidden md:flex flex-col fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 select-none font-sans pointer-events-auto transition-all duration-300"
        aria-label="Facility Data Server Navigation"
      >
        <div
          className={`flex flex-col rounded-2xl bg-[#050C12]/65 backdrop-blur-[8px] border border-[rgba(150,230,255,0.16)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out overflow-hidden ${
            isExpanded ? 'w-[210px] p-2' : 'w-[44px] p-1.5'
          }`}
        >
          {/* Header Brand Node */}
          <div className="flex items-center justify-between px-1.5 py-1.5 border-b border-[rgba(150,230,255,0.12)] mb-0.5">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex items-center gap-2 text-left group cursor-pointer w-full overflow-hidden"
            >
              <div className="w-6 h-6 rounded-md bg-[#08121A]/70 border border-[rgba(150,230,255,0.25)] flex items-center justify-center font-mono shrink-0 transition-colors group-hover:border-[#55DFFF] shadow-[0_0_10px_rgba(85,223,255,0.15)]">
                <span className="text-[10px] text-[#55DFFF] font-bold">AI</span>
              </div>
              {isExpanded && (
                <div className="flex flex-col min-w-0 transition-opacity duration-200">
                  <span className="text-[11px] font-bold text-white tracking-wider group-hover:text-[#55DFFF] transition-colors leading-tight truncate">
                    AI CLUB
                  </span>
                  <span className="text-[8px] font-mono text-[#55DFFF]/90 tracking-tight truncate">
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
                const isActive = isHomePage
                  ? (activeNavId === item.id || activeRobotNodeId === item.id)
                  : (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href));
                const isRobotHere = isHomePage && (activeRobotNodeId === item.id);

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className={`group relative flex items-center justify-between gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-[#55DFFF] bg-[rgba(85,223,255,0.12)] border border-[rgba(85,223,255,0.40)] shadow-[0_0_12px_rgba(85,223,255,0.2)] font-semibold'
                        : isRobotHere
                        ? 'text-white bg-[rgba(85,223,255,0.08)] border border-[rgba(85,223,255,0.25)] hover:border-[#55DFFF]/60 font-medium'
                        : 'text-[#B8C7D4] hover:text-white bg-transparent hover:bg-white/[0.04] border border-transparent font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Active Indicator Dot */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                          isActive
                            ? 'bg-[#55DFFF] shadow-[0_0_8px_#55DFFF]'
                            : isRobotHere
                            ? 'bg-signal-green animate-pulse shadow-[0_0_8px_#22C55E]'
                            : 'bg-white/20 group-hover:bg-white/40'
                        }`}
                      />
                      <span className="text-[11px] tracking-wide truncate">{item.label}</span>
                    </div>

                    {/* Proximity Badge or Chevron */}
                    {isRobotHere ? (
                      <span
                        className="flex items-center gap-1 text-[8px] font-mono text-[#55DFFF] bg-[rgba(85,223,255,0.15)] px-1.5 py-0.5 rounded-full shrink-0 animate-pulse"
                        title="Robot currently stationed at this server rack"
                      >
                        <Bot className="w-2.5 h-2.5" />
                        <span className="text-[8px]">BOT</span>
                      </span>
                    ) : (
                      <ChevronRight className="w-3 h-3 text-[#B8C7D4]/40 group-hover:text-[#55DFFF] group-hover:translate-x-0.5 transition-all shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          ) : (
            /* Collapsed Resting State: Minimalist Sleek Server Dots */
            <div className="flex flex-col items-center gap-2.5 py-3.5 my-0.5 cursor-pointer" title="Click or hover to navigate">
              {SERVER_NODE_ITEMS.map((item) => {
                const isActive = isHomePage
                  ? (activeNavId === item.id || activeRobotNodeId === item.id)
                  : (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href));
                const isRobotHere = isHomePage && (activeRobotNodeId === item.id);

                return (
                  <button
                    key={item.id}
                    onClick={(e) => handleItemClick(e, item)}
                    className="relative flex items-center justify-center group p-1 -m-1 cursor-pointer bg-transparent border-0"
                    title={item.label}
                    aria-label={item.label}
                  >
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-2 h-2 bg-[#55DFFF] shadow-[0_0_10px_#55DFFF]'
                          : isRobotHere
                          ? 'w-2 h-2 bg-signal-green animate-pulse shadow-[0_0_8px_#22C55E]'
                          : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/50'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Action Controls: Terminal CLI & Procedural Audio Toggle */}
          {isExpanded ? (
            <div className="flex items-center justify-between pt-1.5 px-1 border-t border-[rgba(150,230,255,0.12)] mt-0.5 animate-fadeIn">
              <button
                onClick={handleTerminal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono text-[#55DFFF] hover:text-white bg-[rgba(85,223,255,0.08)] hover:bg-[rgba(85,223,255,0.18)] border border-[rgba(150,230,255,0.16)] hover:border-[#55DFFF]/50 transition-all cursor-pointer"
                title="Launch Interactive Terminal CLI [~]"
              >
                <Terminal className="w-3 h-3 text-[#55DFFF]" />
                <span className="font-semibold tracking-wider">CLI</span>
              </button>

              <AudioToggle />
            </div>
          ) : (
            /* Collapsed Hint Chevron */
            <div className="flex items-center justify-center pt-1.5 border-t border-[rgba(150,230,255,0.12)] text-[#55DFFF]/50">
              <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
