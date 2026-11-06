'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
  Minimize2,
  Maximize2,
  Radio,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { getBdxProjectionPayload } from '@/lib/contentSelectors';
import { audioManager } from '@/utils/audioManager';

// Dynamic import of Canvas for the floating companion robot to ensure clean client rendering
const CompanionCanvas = dynamic(() => import('./BdxCompanionCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-16 h-16 rounded-full bg-charcoal/80 border border-sage/30 flex items-center justify-center animate-pulse">
      <span className="text-[10px] text-sage font-mono font-bold">BDX</span>
    </div>
  ),
});

const PROJECTION_MODES = [
  { key: 'EVENTS', label: 'Events' },
  { key: 'GD_SCHEDULE', label: 'GDs' },
  { key: 'AI_NEWS', label: 'Radar' },
  { key: 'FEATURED_PROJECTS', label: 'Projects' },
  { key: 'RESEARCH_UPDATES', label: 'Research' },
  { key: 'RECRUITMENT', label: 'Join' },
  { key: 'ANNOUNCEMENTS', label: 'Bulletins' },
];

/**
 * BdxHolographicProjector
 * Autonomous Holographic Projector companion for BDX-01.
 * Automatically updates its projected content based on active website section.
 * Provides interactive holographic cards, physical beam visualization, manual mode switching,
 * and responsive mobile bottom sheet adaptation.
 */
export default function BdxHolographicProjector({
  activeSection = 'hero', // 'hero' | 'about' | 'chamber' | 'discussions' | 'events' | 'radar' | 'projects' | 'team' | 'join'
  onNavigateSection,
}) {
  const [currentMode, setCurrentMode] = useState('EVENTS');
  const [isOpen, setIsOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Mobile viewport detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch projection payload from centralized selectors
  const payload = getBdxProjectionPayload(currentMode, 5);
  const items = payload.items || [];
  const currentItem = items[currentIndex] || items[0] || null;

  const handleNext = () => {
    if (items.length <= 1) return;
    audioManager.playBeep(1200, 0.04);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    if (items.length <= 1) return;
    audioManager.playBeep(1000, 0.04);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleModeChange = (modeKey) => {
    audioManager.playClick();
    setCurrentMode(modeKey);
    setCurrentIndex(0);
  };

  const toggleOpen = () => {
    audioManager.playChirp();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none font-sans pointer-events-none">
      <div className="relative flex flex-col items-end pointer-events-auto">
        {/* ============================================================== */}
        {/* 1. HOLOGRAPHIC PROJECTION INTERFACE SURFACE                     */}
        {/* ============================================================== */}
        {isOpen && !isMinimized && (
          <div className="relative mb-3.5 w-[calc(100vw-2.5rem)] sm:w-[410px] max-w-[430px] rounded-2xl bg-[#141819]/90 backdrop-blur-md border border-sage/35 shadow-2xl overflow-hidden animate-fade-in text-ivory">
            {/* Holographic Subtle Scanline & Radial Glow Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] opacity-25 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-sage/15 blur-3xl pointer-events-none" />

            {/* Top Hologram Header Bar */}
            <div className="relative flex items-center justify-between px-4 py-3 bg-[#171C1D]/90 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sage animate-ping" />
                <span className="text-[10px] font-mono tracking-widest text-sage uppercase font-bold">
                  BDX-01 // HOLOGRAM EMISSION
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 rounded text-slate-400 hover:text-ivory hover:bg-white/5 transition-colors"
                  title="Minimize"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-ivory hover:bg-white/5 transition-colors"
                  title="Close Projector"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mode Selector Pill Scroller */}
            <div className="relative flex items-center gap-1.5 px-3 py-2 bg-black/25 border-b border-white/5 overflow-x-auto no-scrollbar">
              {PROJECTION_MODES.map((m) => {
                const isActive = currentMode === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => handleModeChange(m.key)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-sans font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sage/20 border border-sage text-sage shadow-sage-glow'
                        : 'bg-white/5 border border-transparent text-ivory/60 hover:text-ivory hover:bg-white/10'
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
                    <span className="px-2 py-0.5 rounded bg-sage/15 border border-sage/30 text-sage font-semibold uppercase">
                      {currentItem.tag || payload.badge}
                    </span>
                    <span className="text-slate-400">
                      {String(currentIndex + 1).padStart(2, '0')} /{' '}
                      {String(items.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-base font-sans font-bold text-ivory leading-snug tracking-tight mb-1 line-clamp-2">
                    {currentItem.title}
                  </h4>

                  {/* Subtitle / Timestamp */}
                  <div className="text-[11px] text-sage font-medium mb-2.5">
                    {currentItem.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-ivory/80 leading-relaxed mb-3 line-clamp-3 font-normal">
                    {currentItem.description}
                  </p>

                  {/* Detail Metric / Venue / Note */}
                  {currentItem.detail && (
                    <div className="p-2 rounded-lg bg-black/30 border border-white/10 text-[11px] text-slate-300 font-mono mb-3">
                      {currentItem.detail}
                    </div>
                  )}

                  {/* Bottom Actions Bar */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-white/10 gap-2">
                    {/* Navigation Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePrev}
                        disabled={items.length <= 1}
                        className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-ivory hover:border-sage hover:text-sage disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                        title="Previous item"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={items.length <= 1}
                        className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-ivory hover:border-sage hover:text-sage disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                        title="Next item"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Direct Action Link (Forms, External Article, or Route) */}
                    {currentItem.actionUrl && (
                      <a
                        href={currentItem.actionUrl}
                        target={currentItem.actionUrl.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage hover:bg-sage-glow text-graphite font-semibold text-[11px] transition-all shadow-sage-glow uppercase tracking-wider cursor-pointer"
                      >
                        <span>{currentItem.actionLabel || 'Inspect'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-400">
                  No active bulletins in this stream.
                </div>
              )}
            </div>

            {/* Bottom Telemetry Status Line */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#111415] border-t border-white/5 text-[9px] font-mono text-slate-500">
              <span>SYNC: AUTONOMOUS_CORRIDOR</span>
              <span className="text-sage">STATUS: EMITTING</span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. DOCKED BDX-01 INTERACTIVE COMPANION POD                     */}
        {/* ============================================================== */}
        <div className="flex items-center gap-2.5">
          {/* Hologram Launch Button / Status Pill */}
          <button
            onClick={toggleOpen}
            className={`group flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#171B1C]/90 backdrop-blur-md border transition-all cursor-pointer shadow-glass-panel ${
              isOpen && !isMinimized
                ? 'border-sage/50 text-sage'
                : 'border-white/15 text-ivory/80 hover:border-sage/40 hover:text-ivory'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
              <span className="absolute w-2 h-2 rounded-full bg-sage" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono tracking-wider font-bold text-sage leading-tight">
                BDX-01
              </span>
              <span className="text-[9px] text-slate-400 font-medium">
                {isOpen && !isMinimized ? 'Projector Online' : 'Tap to Project'}
              </span>
            </div>

            <Sparkles className="w-3.5 h-3.5 text-sage group-hover:rotate-12 transition-transform" />
          </button>

          {/* 3D Mini Robot Model Companion Window */}
          <div
            onClick={toggleOpen}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#141819] border border-sage/40 shadow-sage-glow overflow-hidden cursor-pointer hover:border-sage hover:scale-105 transition-all flex items-center justify-center relative shrink-0"
            title="BDX-01 Companion (Click to interact & chirp)"
          >
            <CompanionCanvas isProjecting={isOpen && !isMinimized} />
          </div>
        </div>
      </div>
    </div>
  );
}

