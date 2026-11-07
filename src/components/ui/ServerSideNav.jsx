'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bot, ChevronRight, Terminal, Menu, X, Sparkles } from 'lucide-react';
import AudioToggle from './AudioToggle';
import { audioManager } from '@/utils/audioManager';

export const SERVER_NODE_ITEMS = [
  { id: 'hero', code: '01', label: 'Home', targetId: 'section-arrival', zProgress: 0.05 },
  { id: 'discussions', code: '02', label: 'Discussions', targetId: 'discussions', zProgress: 0.22 },
  { id: 'events', code: '03', label: 'Events', targetId: 'events', zProgress: 0.38 },
  { id: 'radar', code: '04', label: 'AI Radar', targetId: 'radar', zProgress: 0.55 },
  { id: 'projects', code: '05', label: 'Projects', targetId: 'projects', zProgress: 0.70 },
  { id: 'team', code: '06', label: 'Team', targetId: 'team', zProgress: 0.85 },
  { id: 'join', code: '07', label: 'Join', targetId: 'join-network', zProgress: 0.96 },
];

/**
 * ServerSideNav
 * Hover-activated Precision Architectural Navigation Bar docked on the side of the Data Centre.
 * Seamlessly matches the #101415 industrial data facility background aesthetic.
 *
 * Behavior:
 * - Resting state: Slim, non-obtrusive 44px dock on the left with glowing AI badge & rack status dots.
 *   Does NOT block or overlap hero titles or facility view.
 * - Hovered state: Smoothly expands into full interactive menu with section pills, BOT tracker,
 *   CLI launcher, and audio toggle.
 * - Mobile: Controlled via top-left floating toggle button.
 */
export default function ServerSideNav({
  activeNavId = 'hero',
  scrollProgress = 0,
  scrollProgressRef,
  onNavigateToSection,
  onToggleTerminal,
  isEditorialMode = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeRobotNodeId, setActiveRobotNodeId] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const leaveTimerRef = useRef(null);

  // Synchronize robot location along the cold aisle via shared scroll ref
  useEffect(() => {
    let animId;
    const checkRobotPos = () => {
      const sp = scrollProgressRef?.current !== undefined ? scrollProgressRef.current : scrollProgress;
      const activeIdx = SERVER_NODE_ITEMS.reduce((closestIdx, item, idx) => {
        const currentDiff = Math.abs(sp - item.zProgress);
        const closestDiff = Math.abs(sp - SERVER_NODE_ITEMS[closestIdx].zProgress);
        return currentDiff < closestDiff ? idx : closestIdx;
      }, 0);
      const closestId = SERVER_NODE_ITEMS[activeIdx]?.id || 'hero';
      setActiveRobotNodeId((prev) => (prev !== closestId ? closestId : prev));
      animId = requestAnimationFrame(checkRobotPos);
    };
    animId = requestAnimationFrame(checkRobotPos);
    return () => cancelAnimationFrame(animId);
  }, [scrollProgressRef, scrollProgress]);

  // Clean debounce for hover exit to prevent accidental flickers
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

  const handleClick = useCallback(
    (targetId, navId) => {
      audioManager.playClick();
      setMobileOpen(false);
      if (onNavigateToSection) {
        onNavigateToSection(targetId, navId);
      }
    },
    [onNavigateToSection]
  );

  const handleTerminal = useCallback(() => {
    audioManager.playClick();
    if (onToggleTerminal) onToggleTerminal();
  }, [onToggleTerminal]);

  const isExpanded = isHovered || mobileOpen;

  return (
    <>
      {/* Mobile Floating Quick-Toggle Button (Visible on screens < 768px) */}
      <div className="fixed top-4 left-4 z-50 md:hidden pointer-events-auto">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#101415]/90 backdrop-blur-xl border border-white/[0.08] text-ivory text-xs font-sans shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
          aria-label="Toggle Facility Navigation"
        >
          <div className="w-5 h-5 rounded bg-[#161B1C] border border-sage/40 flex items-center justify-center font-mono text-[9px] text-sage font-bold">
            AI
          </div>
          <span className="font-semibold text-[11px] tracking-wide text-ivory">NAVIGATION</span>
          {mobileOpen ? <X className="w-3.5 h-3.5 text-sage" /> : <Menu className="w-3.5 h-3.5 text-sage" />}
        </button>
      </div>

      {/* Main Server Side Navigation Bar (Hover-activated on desktop) */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 select-none font-sans pointer-events-auto transition-all duration-300 ${
          mobileOpen
            ? 'flex flex-col opacity-100'
            : 'hidden md:flex flex-col'
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
            <button
              onClick={() => handleClick('section-arrival', 'hero')}
              className="flex items-center gap-2 text-left group cursor-pointer w-full overflow-hidden"
            >
              <div className="w-6 h-6 rounded-md bg-[#161B1C] border border-sage/40 flex items-center justify-center font-mono shrink-0 transition-colors group-hover:border-sage shadow-[0_0_10px_rgba(162,178,159,0.2)]">
                <span className="text-[10px] text-sage font-bold">AI</span>
              </div>
              {isExpanded && (
                <div className="flex flex-col min-w-0 transition-opacity duration-200">
                  <span className="text-[11px] font-bold text-ivory tracking-wider group-hover:text-sage transition-colors leading-tight truncate">
                    AI CLUB
                  </span>
                  <span className="text-[8px] font-mono text-sage/80 tracking-tight truncate">
                    {isEditorialMode ? 'EDITORIAL ARCHIVE' : 'IMMERSIVE 3D'}
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Interactive Navigation Pills (Expanded Mode) */}
          {isExpanded ? (
            <div className="flex flex-col gap-1 py-1 animate-fadeIn">
              {SERVER_NODE_ITEMS.map((item) => {
                const isActiveSection = activeNavId === item.id;
                const isRobotHere = !isEditorialMode && activeRobotNodeId === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleClick(item.targetId, item.id)}
                    className={`group relative flex items-center justify-between gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                      isActiveSection
                        ? 'text-sage bg-[#161B1C] border border-sage/60 shadow-sage-glow font-semibold'
                        : isRobotHere
                        ? 'text-ivory bg-[#141819] border border-sage/35 hover:border-sage/60 font-medium'
                        : 'text-ivory/70 hover:text-ivory bg-transparent hover:bg-white/[0.04] border border-transparent font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Active / Robot Indicator Dot */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                          isActiveSection
                            ? 'bg-sage shadow-[0_0_8px_#A2B29F]'
                            : isRobotHere
                            ? 'bg-signal-green animate-pulse'
                            : 'bg-white/20 group-hover:bg-white/40'
                        }`}
                      />
                      <span className="text-[11px] tracking-wide truncate">{item.label}</span>
                    </div>

                    {/* Proximity Badge or Chevron */}
                    {isRobotHere ? (
                      <span
                        className="flex items-center gap-1 text-[8px] font-mono text-sage bg-sage/15 px-1.5 py-0.5 rounded-full shrink-0 animate-pulse"
                        title="Robot currently stationed at this server rack"
                      >
                        <Bot className="w-2.5 h-2.5" />
                        <span className="text-[8px]">BOT</span>
                      </span>
                    ) : (
                      <ChevronRight className="w-3 h-3 text-ivory/30 group-hover:text-sage group-hover:translate-x-0.5 transition-all shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            /* Collapsed Resting State: Minimalist Sleek Server Dots */
            <div className="flex flex-col items-center gap-2.5 py-3.5 my-0.5 cursor-pointer" title="Hover to expand navigation">
              {SERVER_NODE_ITEMS.map((item) => {
                const isActiveSection = activeNavId === item.id;
                const isRobotHere = !isEditorialMode && activeRobotNodeId === item.id;

                return (
                  <div
                    key={item.id}
                    className="relative flex items-center justify-center group"
                  >
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        isActiveSection
                          ? 'w-2 h-2 bg-sage shadow-[0_0_10px_#A2B29F]'
                          : isRobotHere
                          ? 'w-2 h-2 bg-signal-green animate-pulse shadow-[0_0_8px_#22C55E]'
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
