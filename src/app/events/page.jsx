'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  Layers,
} from 'lucide-react';
import { getAllEvents } from '@/lib/contentSelectors';
import { filterByCategory, getUniqueCategories } from '@/lib/contentHelpers';
import { audioManager } from '@/utils/audioManager';
import HolographicCard from '@/components/ui/HolographicCard';
import RobotFace from '@/components/ui/RobotFace';

export default function EventsPage() {
  const events = getAllEvents();
  const categories = getUniqueCategories(events, 'category');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'open' | 'upcoming' | 'closed' | 'past'
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('3d-slide'); // '3d-slide' | 'grid'
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef(null);

  const statusOptions = [
    { id: 'all', label: 'All Statuses' },
    { id: 'open', label: 'Registration Open' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'closed', label: 'Registration Closed / Full' },
    { id: 'past', label: 'Past Archives' },
  ];

  const filteredEvents = filterByCategory(events, selectedCategory, 'category').filter((ev) => {
    // Status filter
    if (selectedStatus === 'open') {
      if (ev.registrationStatus !== 'open') return false;
    } else if (selectedStatus === 'upcoming') {
      if (ev.status !== 'upcoming') return false;
    } else if (selectedStatus === 'closed') {
      if (ev.registrationStatus === 'open') return false;
    } else if (selectedStatus === 'past') {
      if (ev.status !== 'past' && ev.status !== 'concluded') return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      ev.title.toLowerCase().includes(q) ||
      ev.description.toLowerCase().includes(q) ||
      ev.venue.toLowerCase().includes(q) ||
      ev.category.toLowerCase().includes(q)
    );
  });

  // Clamp activeSlideIndex when filter changes
  useEffect(() => {
    if (activeSlideIndex >= filteredEvents.length) {
      setActiveSlideIndex(Math.max(0, filteredEvents.length - 1));
    }
  }, [filteredEvents.length, activeSlideIndex]);

  // Next & Prev slide handlers for CSS 3D Slide
  const handleNextSlide = useCallback(() => {
    if (filteredEvents.length === 0) return;
    try { audioManager.playClick(); } catch {}
    setActiveSlideIndex((prev) => (prev + 1) % filteredEvents.length);
  }, [filteredEvents.length]);

  const handlePrevSlide = useCallback(() => {
    if (filteredEvents.length === 0) return;
    try { audioManager.playClick(); } catch {}
    setActiveSlideIndex((prev) => (prev - 1 + filteredEvents.length) % filteredEvents.length);
  }, [filteredEvents.length]);

  // Auto-play timer for 3D Carousel (pauses on user hover)
  useEffect(() => {
    if (viewMode !== '3d-slide' || !isAutoPlaying || filteredEvents.length <= 1) return;

    autoPlayTimerRef.current = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % filteredEvents.length);
    }, 4500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [viewMode, isAutoPlaying, filteredEvents.length]);

  // Keyboard navigation for 3D carousel
  useEffect(() => {
    if (viewMode !== '3d-slide') return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNextSlide();
      if (e.key === 'ArrowLeft') handlePrevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, handleNextSlide, handlePrevSlide]);

  return (
    <main className="relative min-h-screen bg-[#050C12] text-[#F0F6F7] font-events-body pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Grid & 3D Facility Core Blue Flare */}
      <div className="absolute inset-0 bg-facility-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(255, 255, 255,0.12)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute top-44 left-1/2 -translate-x-1/2 w-[700px] h-80 bg-[radial-gradient(circle_at_center,rgba(255, 255, 255,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation - IBM Plex Mono */}
        

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 border-b border-[rgba(255, 255, 255,0.15)] pb-6 sm:pb-8">
          <div>
            {/* Hero Heading: CS Slade 3D (White & Cyan with 3D Core Depth) */}
            <h1 className="events-hero-title">
              OPERATIONS BOARD
            </h1>
            {/* Body Description: Manrope 400 (Clean White-Slate) */}
            <p className="events-body-text text-slate-300 mt-3 max-w-2xl text-xs sm:text-sm md:text-base">
              Flagship hackathons, low-level hardware acceleration workshops, and algorithmic code sprints organized by AI Club cohorts.
            </p>
          </div>

          {/* Telemetry Counter */}
          <div className="p-3.5 sm:p-4 px-4 sm:px-6 rounded-2xl bg-[#08121A]/95 border border-[rgba(255,255,255,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.85)] w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between sm:justify-start gap-3 sm:gap-6">
            <div className="flex items-center gap-3.5">
              <RobotFace variant="neutral" size={44} className="shrink-0 drop-shadow-[0_2px_10px_rgba(85,223,255,0.25)]" />
              <div>
                <span className="block events-mono-meta text-slate-400 text-[9px] sm:text-[10px] mb-0.5 sm:mb-1">
                  VERIFIED OPERATIONS
                </span>
                <span className="text-2xl sm:text-4xl font-bold font-events-heading bg-gradient-to-r from-[#FFFFFF] via-[#E2E8F0] to-white bg-clip-text text-transparent tracking-wider leading-none">
                  0{events.length}
                </span>
              </div>
            </div>
            <div className="hidden sm:block h-10 w-[1px] bg-[rgba(255,255,255,0.15)]" />
            <div className="pt-2.5 sm:pt-0 border-t border-white/10 sm:border-t-0 flex items-center justify-between sm:block">
              <span className="block events-mono-meta text-slate-400 text-[9px] sm:text-[10px] sm:mb-1">
                REGISTRATION STATUS
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs events-mono-meta font-bold text-[#FFFFFF]">
                <span className="w-2 h-2 rounded-full bg-[#FFFFFF] animate-pulse shadow-[0_0_8px_#FFFFFF]" />
                ACCEPTING APPS
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar, View Mode Switcher & Live Search */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Pills: IBM Plex Mono */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      try { audioManager.playClick(); } catch {}
                      setSelectedCategory(cat);
                    }}
                    className={`px-3.5 py-1.5 text-xs events-mono-btn rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-gradient-to-r from-[#FFFFFF]/30 to-[#E2E8F0]/25 text-white border border-[#FFFFFF]/70 shadow-[0_0_16px_rgba(255, 255, 255,0.35)] font-bold'
                        : 'bg-[#08121A] text-slate-300 hover:text-white border border-white/[0.08] hover:border-[rgba(255, 255, 255,0.3)]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {/* View Mode Switcher: 3D Slide vs Matrix Grid */}
              <div className="flex items-center justify-center p-1 rounded-xl bg-[#08121A] border border-[rgba(255, 255, 255,0.2)]">
                <button
                  onClick={() => {
                    try { audioManager.playClick(); } catch {}
                    setViewMode('3d-slide');
                  }}
                  className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg events-mono-meta transition-all cursor-pointer flex-1 sm:flex-initial ${
                    viewMode === '3d-slide'
                      ? 'bg-[#FFFFFF]/25 text-white border border-[#FFFFFF]/60 shadow-[0_0_12px_rgba(255, 255, 255,0.3)] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Interactive CSS 3D Slide View"
                >
                  <Layers className="w-3.5 h-3.5 text-[#FFFFFF]" />
                  <span>3D SLIDE</span>
                </button>
                <button
                  onClick={() => {
                    try { audioManager.playClick(); } catch {}
                    setViewMode('grid');
                  }}
                  className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg events-mono-meta transition-all cursor-pointer flex-1 sm:flex-initial ${
                    viewMode === 'grid'
                      ? 'bg-[#FFFFFF]/25 text-white border border-[#FFFFFF]/60 shadow-[0_0_12px_rgba(255, 255, 255,0.3)] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Grid Matrix View"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-[#FFFFFF]" />
                  <span>GRID</span>
                </button>
              </div>

              {/* Search Input: IBM Plex Mono */}
              <div className="relative w-full sm:min-w-[220px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search operations, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#08121A] border border-[rgba(255, 255, 255,0.2)] text-xs events-mono-btn text-white placeholder-slate-500 focus:outline-none focus:border-[#FFFFFF] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Status Separation Pills (PRD 4.3 Requirement) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] events-mono-meta text-slate-500 uppercase tracking-widest shrink-0 mr-1">
              STATUS:
            </span>
            {statusOptions.map((st) => {
              const active = selectedStatus === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    try { audioManager.playClick(); } catch {}
                    setSelectedStatus(st.id);
                  }}
                  className={`px-3 py-1 text-[11px] events-mono-meta rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#FFFFFF]/20 text-[#FFFFFF] border border-[#FFFFFF]/50 font-semibold'
                      : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CSS 3D SLIDE VIEW                                                 */}
        {/* ================================================================= */}
        {viewMode === '3d-slide' && filteredEvents.length > 0 && (
          <div
            className="events-3d-stage"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="events-3d-track">
              {filteredEvents.map((ev, index) => {
                const total = filteredEvents.length;
                const offset = (index - activeSlideIndex + total) % total;
                const isFeatured = ev.featured;
                const slug = ev.slug || ev.id;

                let positionClass = 'slide-hidden';
                if (offset === 0) positionClass = 'slide-center';
                else if (offset === 1 || offset === -(total - 1)) positionClass = 'slide-right';
                else if (offset === total - 1 || offset === -1) positionClass = 'slide-left';
                else if (offset === 2) positionClass = 'slide-far-right';
                else if (offset === total - 2) positionClass = 'slide-far-left';

                return (
                  <div
                    key={ev.id}
                    className={`events-3d-slide ${positionClass}`}
                    onClick={() => {
                      if (offset === -1) handlePrevSlide();
                      if (offset === 1) handleNextSlide();
                    }}
                  >
                    <HolographicCard
                      index={index}
                      isFeatured={isFeatured}
                      className={`p-7 sm:p-8 bg-[#08121A]/95 ${
                        isFeatured ? 'solo-leveling-card-featured' : 'solo-leveling-card'
                      } ${offset === 0 ? 'border-[#FFFFFF]/60 ring-1 ring-[#FFFFFF]/40 shadow-[0_0_35px_rgba(255, 255, 255,0.25)]' : ''}`}
                    >
                      <div>
                        {/* Top Meta Line: IBM Plex Mono */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="events-mono-meta px-2.5 py-0.5 rounded-full bg-[#FFFFFF]/15 border border-[#FFFFFF]/35 text-[#FFFFFF] font-semibold">
                            {ev.category}
                          </span>

                          <span
                            className={`events-mono-meta px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              ev.registrationStatus === 'open'
                                ? 'bg-[#FFFFFF]/15 text-[#FFFFFF] border border-[#FFFFFF]/35 shadow-[0_0_10px_rgba(255, 255, 255,0.2)]'
                                : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            {ev.registrationStatus === 'open' ? 'REGISTRATION OPEN' : 'CONCLUDED'}
                          </span>
                        </div>

                        {/* Title: Barlow Condensed 600 */}
                        <h3 className="events-card-title text-white group-hover:text-[#FFFFFF] transition-colors mb-3">
                          {ev.title}
                        </h3>
                        {/* Body description: Manrope 400 */}
                        <p className="events-body-text text-slate-300 mb-6 line-clamp-3">
                          {ev.description}
                        </p>

                        {/* Logistics Badges: 3D Facility Blue */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[rgba(255, 255, 255,0.12)] mb-6 text-xs font-events-mono text-slate-200">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#FFFFFF] shrink-0" />
                            <span className="truncate tracking-wide">{ev.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#E2E8F0] shrink-0" />
                            <span className="truncate tracking-wide">{ev.time}</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <MapPin className="w-3.5 h-3.5 text-[#FFFFFF]/80 shrink-0" />
                            <span className="truncate tracking-wide">{ev.venue}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Actions: IBM Plex Mono Buttons */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-4 border-t border-[rgba(255, 255, 255,0.12)]">
                        <Link
                          href={`/events/${slug}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-[#FFFFFF]/15 border border-white/[0.12] hover:border-[#FFFFFF]/40 events-mono-btn text-white hover:text-[#FFFFFF] transition-all group/btn text-center"
                        >
                          <span>PROTOCOL DETAILS</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-x-1 group-hover/btn:text-[#FFFFFF] transition-all" />
                        </Link>

                        {ev.registrationUrl && (
                          <a
                            href={ev.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E2E8F0] via-[#FFFFFF] to-[#38C9E8] hover:brightness-110 text-[#050C12] events-mono-btn transition-all shadow-[0_0_22px_rgba(255, 255, 255,0.45)] shrink-0 font-black text-center"
                          >
                            <span>REGISTER</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#050C12]" />
                          </a>
                        )}
                      </div>
                    </HolographicCard>
                  </div>
                );
              })}
            </div>

            {/* 3D Slide Carousel Interactive Controls */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40 bg-[#08121A]/95 px-5 py-2.5 rounded-full border border-[rgba(255, 255, 255,0.2)] shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
              <button
                onClick={handlePrevSlide}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.05] hover:bg-[#FFFFFF]/25 hover:text-white border border-white/[0.1] transition-all cursor-pointer text-slate-300"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Slide Dots */}
              <div className="flex items-center gap-1.5 px-2">
                {filteredEvents.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      try { audioManager.playClick(); } catch {}
                      setActiveSlideIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeSlideIndex === idx
                        ? 'w-7 bg-gradient-to-r from-[#FFFFFF] to-[#E2E8F0] shadow-[0_0_10px_#FFFFFF]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.05] hover:bg-[#FFFFFF]/25 hover:text-white border border-white/[0.1] transition-all cursor-pointer text-slate-300"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="events-mono-meta text-slate-400 pl-2 border-l border-white/[0.1]">
                {String(activeSlideIndex + 1).padStart(2, '0')} // {String(filteredEvents.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* GRID MATRIX VIEW                                                  */}
        {/* ================================================================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((ev, index) => {
              const isFeatured = ev.featured;
              const slug = ev.slug || ev.id;

              return (
                <HolographicCard
                  key={ev.id}
                  index={index}
                  isFeatured={isFeatured}
                  className={`p-6 sm:p-7 bg-[#08121A]/95 ${
                    isFeatured ? 'solo-leveling-card-featured border-[#FFFFFF]/40' : 'solo-leveling-card'
                  }`}
                >
                  <div>
                    {/* Top Meta Line: IBM Plex Mono */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="events-mono-meta px-2.5 py-0.5 rounded-full bg-[#FFFFFF]/15 border border-[#FFFFFF]/35 text-[#FFFFFF] font-semibold">
                        {ev.category}
                      </span>

                      <span
                        className={`events-mono-meta px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          ev.registrationStatus === 'open'
                            ? 'bg-[#FFFFFF]/15 text-[#FFFFFF] border border-[#FFFFFF]/35 shadow-[0_0_10px_rgba(255, 255, 255,0.2)]'
                            : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {ev.registrationStatus === 'open' ? 'REGISTRATION OPEN' : 'CONCLUDED'}
                      </span>
                    </div>

                    {/* Title: Barlow Condensed 600 */}
                    <h3 className="events-card-title text-white group-hover:text-[#FFFFFF] transition-colors mb-3">
                      {ev.title}
                    </h3>
                    {/* Body description: Manrope 400 */}
                    <p className="events-body-text text-slate-300 mb-5 line-clamp-3">
                      {ev.description}
                    </p>

                    {/* Logistics Badges: 3D Facility Blue */}
                    <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-[rgba(255, 255, 255,0.12)] mb-6 text-[11px] font-events-mono text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#FFFFFF] shrink-0" />
                        <span className="truncate tracking-wide">{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#E2E8F0] shrink-0" />
                        <span className="truncate tracking-wide">{ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <MapPin className="w-3.5 h-3.5 text-[#FFFFFF]/80 shrink-0" />
                        <span className="truncate tracking-wide">{ev.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions: IBM Plex Mono Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-4 border-t border-[rgba(255, 255, 255,0.12)]">
                    <Link
                      href={`/events/${slug}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-[#FFFFFF]/15 border border-white/[0.12] hover:border-[#FFFFFF]/40 events-mono-btn text-white hover:text-[#FFFFFF] transition-all group/btn text-center"
                    >
                      <span>PROTOCOL DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-x-1 group-hover/btn:text-[#FFFFFF] transition-all" />
                    </Link>

                    {ev.registrationUrl && (
                      <a
                        href={ev.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E2E8F0] via-[#FFFFFF] to-[#38C9E8] hover:brightness-110 text-[#050C12] events-mono-btn transition-all shadow-[0_0_22px_rgba(255, 255, 255,0.45)] shrink-0 font-black text-center"
                      >
                        <span>REGISTER</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#050C12]" />
                      </a>
                    )}
                  </div>
                </HolographicCard>
              );
            })}
          </div>
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#08121A]/80 border border-white/[0.08]">
            <p className="text-sm font-events-mono text-slate-400 uppercase tracking-wider">
              NO OPERATIONS FOUND MATCHING YOUR CRITERIA
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
