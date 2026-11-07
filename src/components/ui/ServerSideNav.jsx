'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Bot, ChevronRight, ChevronLeft, Terminal, Menu, X, Sparkles } from 'lucide-react';
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
 * Precision Architectural Navigation Bar docked on the side of the Data Centre.
 * Seamlessly matches the #101415 industrial data facility background aesthetic.
 * Integrates brand telemetry, pill navigation matching the header aesthetic,
 * live robot location tracking, procedural audio toggle, and CLI terminal launcher.
 */
export default function ServerSideNav({
  activeNavId = 'hero',
  scrollProgress = 0,
  scrollProgressRef,
  onNavigateToSection,
  onToggleTerminal,
  isEditorialMode = false,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeRobotNodeId, setActiveRobotNodeId] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

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

      {/* Main Server Side Navigation Bar */}
      <aside
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 select-none font-sans pointer-events-auto transition-all duration-300 ${
          mobileOpen
            ? 'flex flex-col opacity-100'
            : 'hidden md:flex flex-col'
        }`}
        aria-label="Facility Data Server Navigation"
      >
        <div
          className={`flex flex-col gap-1 p-2 rounded-2xl bg-[#101415]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 ${
            collapsed ? 'w-auto' : 'w-[200px]'
          }`}
        >
          {/* 1. Header Brand Node (Matches Header Screenshot) */}
          <div className="flex items-center justify-between px-2 py-1.5 border-b border-white/[0.06] mb-0.5">
            <button
              onClick={() => handleClick('section-arrival', 'hero')}
              className="flex items-center gap-2 text-left group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-md bg-[#161B1C] border border-sage/40 flex items-center justify-center font-mono shrink-0 transition-colors group-hover:border-sage">
                <span className="text-[10px] text-sage font-bold">AI</span>
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-ivory tracking-wider group-hover:text-sage transition-colors leading-tight">
                    AI CLUB
                  </span>
                  <span className="text-[8px] font-mono text-sage/80 tracking-tight">
                    {isEditorialMode ? 'EDITORIAL ARCHIVE' : 'IMMERSIVE 3D'}
                  </span>
                </div>
              )}
            </button>

            {/* Collapse / Expand Control */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-ivory/40 hover:text-sage transition-colors p-1 rounded-md hover:bg-white/[0.04] hidden md:flex items-center justify-center"
              title={collapsed ? 'Expand Server Nodes' : 'Collapse Server Nodes'}
            >
              {collapsed ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* 2. Interactive Navigation Pills (Matches Header Screenshot) */}
          {!collapsed && (
            <div className="flex flex-col gap-1 py-0.5">
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
                    <div className="flex items-center gap-2">
                      {/* Active / Robot Indicator Dot */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          isActiveSection
                            ? 'bg-sage shadow-[0_0_8px_#A2B29F]'
                            : isRobotHere
                            ? 'bg-signal-green animate-pulse'
                            : 'bg-white/20 group-hover:bg-white/40'
                        }`}
                      />
                      <span className="text-[11px] tracking-wide">{item.label}</span>
                    </div>

                    {/* Proximity Badge or Chevron */}
                    {isRobotHere ? (
                      <span
                        className="flex items-center gap-1 text-[8px] font-mono text-sage bg-sage/15 px-1.5 py-0.5 rounded-full animate-pulse"
                        title="Robot currently stationed at this server rack"
                      >
                        <Bot className="w-2.5 h-2.5" />
                        <span className="text-[8px]">BOT</span>
                      </span>
                    ) : (
                      <ChevronRight className="w-3 h-3 text-ivory/30 group-hover:text-sage group-hover:translate-x-0.5 transition-all" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* 3. Action Controls: Terminal CLI & Procedural Audio Toggle */}
          {!collapsed && (
            <div className="flex items-center justify-between pt-1.5 px-1 border-t border-white/[0.06] mt-0.5">
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
          )}

          {/* Collapsed State Quick Icons */}
          {collapsed && (
            <div className="flex flex-col items-center gap-2 py-1">
              <button
                onClick={() => setCollapsed(false)}
                className="p-1.5 rounded-lg text-sage hover:bg-white/[0.06] transition-colors"
                title="Expand Navigation"
              >
                <Bot className="w-4 h-4 text-sage animate-pulse" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
