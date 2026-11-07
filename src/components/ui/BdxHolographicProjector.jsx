'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
  Minimize2,
  Sparkles,
} from 'lucide-react';
import { getBdxProjectionPayload } from '@/lib/contentSelectors';
import { audioManager } from '@/utils/audioManager';

// Dynamic import of Canvas for the floating companion robot
const CompanionCanvas = dynamic(() => import('./BdxCompanionCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-14 h-14 rounded-xl bg-[#141819] border border-white/[0.12] flex items-center justify-center">
      <span className="text-[10px] text-sage font-mono font-bold">BDX</span>
    </div>
  ),
});

const PROJECTION_MODES = [
  { key: 'EVENTS', label: 'Events' },
  { key: 'GD_SCHEDULE', label: 'Discussions' },
  { key: 'AI_NEWS', label: 'Radar' },
  { key: 'FEATURED_PROJECTS', label: 'Projects' },
  { key: 'RESEARCH_UPDATES', label: 'Research' },
  { key: 'RECRUITMENT', label: 'Intake' },
  { key: 'ANNOUNCEMENTS', label: 'Bulletins' },
];

/**
 * BdxHolographicProjector
 * Autonomous Holographic Projector companion for BDX-01.
 * Automatically synchronizes projected bulletins based on the active website section.
 * Engineered with hairline borders, JetBrains Mono telemetry, and stepped tactile feedback.
 */
export default function BdxHolographicProjector({
  activeSection = 'hero',
  onNavigateSection,
}) {
  const [currentMode, setCurrentMode] = useState('EVENTS');
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  // Sync mode with active website section
  useEffect(() => {
    switch (activeSection) {
      case 'discussions':
        setCurrentMode('GD_SCHEDULE');
        setCurrentIndex(0);
        break;
      case 'events':
      case 'operations':
        setCurrentMode('EVENTS');
        setCurrentIndex(0);
        break;
      case 'radar':
        setCurrentMode('AI_NEWS');
        setCurrentIndex(0);
        break;
      case 'projects':
        setCurrentMode('FEATURED_PROJECTS');
        setCurrentIndex(0);
        break;
      case 'about':
      case 'research':
        setCurrentMode('RESEARCH_UPDATES');
        setCurrentIndex(0);
        break;
      case 'join':
        setCurrentMode('RECRUITMENT');
        setCurrentIndex(0);
        break;
      case 'chamber':
        setCurrentMode('EVENTS');
        setCurrentIndex(0);
        break;
      default:
        break;
    }
  }, [activeSection]);

  // Fetch projection payload from centralized selectors
  const payload = getBdxProjectionPayload(currentMode, 5);
  const items = payload.items || [];
  const currentItem = items[currentIndex] || items[0] || null;

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    audioManager.playBeep(1200, 0.04);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    audioManager.playBeep(1000, 0.04);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleModeChange = useCallback((modeKey) => {
    audioManager.playClick();
    setCurrentMode(modeKey);
    setCurrentIndex(0);
  }, []);

  const toggleOpen = useCallback(() => {
    audioManager.playChirp();
    setIsOpen((prev) => !prev);
    setIsMinimized(false);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none font-sans pointer-events-none">
      <div className="relative flex flex-col items-end pointer-events-auto">
        {/* ============================================================== */}
        {/* 1. HOLOGRAPHIC PROJECTION INTERFACE SURFACE                     */}
        {/* ============================================================== */}
        {isOpen && !isMinimized && (
          <div className="relative mb-3 w-[calc(100vw-2.5rem)] sm:w-[390px] max-w-[420px] rounded-xl bg-[#0D1011]/95 backdrop-blur-md border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-in text-ivory crosshair-corner">
            {/* Top Hologram Header Bar */}
            <div className="relative flex items-center justify-between px-3.5 py-2.5 bg-[#15191A] border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage ring-2 ring-sage/20" />
                <span className="text-[10px] font-mono tracking-widest text-sage uppercase font-bold">
                  BDX-01 COMPANION DISPATCH
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 rounded text-slate-400 hover:text-ivory hover:bg-white/[0.06] transition-colors btn-tactile"
                  title="Minimize Projector"
                  aria-label="Minimize"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-ivory hover:bg-white/[0.06] transition-colors btn-tactile"
                  title="Close Projector"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mode Selector Pill Scroller */}
            <div className="relative flex items-center gap-1 px-3 py-1.5 bg-[#0D1011] border-b border-white/[0.06] overflow-x-auto no-scrollbar">
              {PROJECTION_MODES.map((m) => {
                const isActive = currentMode === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => handleModeChange(m.key)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-sans font-medium whitespace-nowrap transition-all cursor-pointer btn-tactile ${
                      isActive
                        ? 'bg-white/[0.08] border border-sage/40 text-sage font-semibold'
                        : 'bg-transparent border border-transparent text-ivory/60 hover:text-ivory hover:bg-white/[0.03]'
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            {/* Projected Card Content Viewport */}
            <div className="relative p-4">
              {currentItem ? (
                <div>
                  {/* Badge & Item Counter */}
                  <div className="flex items-center justify-between text-[10px] mb-2 font-mono">
                    <span className="px-2 py-0.5 rounded bg-[#15191A] border border-white/[0.08] text-sage font-semibold uppercase">
                      {currentItem.tag || payload.badge}
                    </span>
                    <span className="text-slate-400 tnum">
                      {String(currentIndex + 1).padStart(2, '0')} /{' '}
                      {String(items.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm sm:text-base font-display font-bold text-ivory leading-snug tracking-tight mb-1 line-clamp-2">
                    {currentItem.title}
                  </h4>

                  {/* Subtitle / Timestamp */}
                  <div className="text-[11px] text-sage font-medium mb-2 font-mono tnum">
                    {currentItem.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-ivory/75 leading-relaxed mb-3 line-clamp-3 font-normal">
                    {currentItem.description}
                  </p>

                  {/* Detail Metric / Venue / Note */}
                  {currentItem.detail && (
                    <div className="p-2 rounded-md bg-[#15191A] border border-white/[0.06] text-[11px] text-slate-300 font-mono mb-3">
                      {currentItem.detail}
                    </div>
                  )}

                  {/* Bottom Actions Bar */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.08] gap-2">
                    {/* Navigation Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePrev}
                        disabled={items.length <= 1}
                        className="p-1.5 rounded-md bg-[#15191A] border border-white/[0.08] text-ivory hover:border-sage hover:text-sage disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer btn-tactile"
                        title="Previous item"
                        aria-label="Previous bulletin"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={items.length <= 1}
                        className="p-1.5 rounded-md bg-[#15191A] border border-white/[0.08] text-ivory hover:border-sage hover:text-sage disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer btn-tactile"
                        title="Next item"
                        aria-label="Next bulletin"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Direct Action Link */}
                    {currentItem.actionUrl && (
                      <a
                        href={currentItem.actionUrl}
                        target={currentItem.actionUrl.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-sage hover:bg-sage-glow text-graphite font-semibold text-[11px] transition-colors uppercase tracking-wider cursor-pointer btn-tactile shadow-tactile active:shadow-tactile-active"
                      >
                        <span>{currentItem.actionLabel || 'Inspect'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-400 font-mono">
                  No active bulletins in this stream.
                </div>
              )}
            </div>

            {/* Bottom Telemetry Status Line */}
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#15191A] border-t border-white/[0.06] text-[9px] font-mono text-slate-500">
              <span>FEED: LIVE UPDATES</span>
              <span className="text-sage">STATUS: ACTIVE</span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. DOCKED BDX-01 INTERACTIVE COMPANION POD                     */}
        {/* ============================================================== */}
        <div className="flex items-center gap-2">
          {/* Hologram Launch Button / Status Pill */}
          <button
            onClick={toggleOpen}
            className={`group flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0D1011]/90 backdrop-blur-md border transition-all cursor-pointer btn-tactile shadow-[0_4px_16px_rgba(0,0,0,0.4)] ${
              isOpen && !isMinimized
                ? 'border-sage/50 text-sage'
                : 'border-white/[0.12] text-ivory/80 hover:border-sage/40 hover:text-ivory'
            }`}
            aria-label="Toggle BDX-01 Hologram"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-sage" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono tracking-wider font-bold text-sage leading-tight">
                BDX-01
              </span>
              <span className="text-[9px] text-slate-400 font-medium">
                {isOpen && !isMinimized ? 'Hologram Online' : 'Tap to Project'}
              </span>
            </div>

            <Sparkles className="w-3.5 h-3.5 text-sage group-hover:rotate-12 transition-transform" />
          </button>

          {/* 3D Mini Robot Model Companion Window */}
          <div
            onClick={toggleOpen}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0D1011] border border-white/[0.14] overflow-hidden cursor-pointer hover:border-sage transition-all flex items-center justify-center relative shrink-0 btn-tactile shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            title="BDX-01 Companion (Click to interact & chirp)"
          >
            <CompanionCanvas isProjecting={isOpen && !isMinimized} />
          </div>
        </div>
      </div>
    </div>
  );
}
