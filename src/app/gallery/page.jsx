'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
  X,
  Calendar,
  Tag,
  ExternalLink,
  Sparkles,
  Maximize2,
} from 'lucide-react';
import { audioManager } from '@/utils/audioManager';

export const GALLERY_ITEMS = [
  {
    id: 'gal-001',
    title: 'HACK_AI 36-Hour National Code Sprint',
    category: 'Hackathons',
    date: '2026-11-16',
    caption: 'Student teams prototyping autonomous multi-agent tool harnesses in the main compute auditorium.',
    eventSlug: 'hack-ai-national-hackathon',
    eventTitle: 'HACK_AI 36-Hour Hackathon',
    alt: 'Participants working on laptops in a dimly lit auditorium with holographic display boards in the background',
    gradient: 'from-[#FFFFFF]/40 via-[#E2E8F0]/20 to-[#07090A]',
  },
  {
    id: 'gal-002',
    title: 'CUDA TensorRT Kernel Optimization Lab',
    category: 'Workshops',
    date: '2026-10-24',
    caption: 'Hardware-level profiling on workstation GPUs analyzing warp divergence and shared memory bank conflicts.',
    eventSlug: 'cuda-kernel-optimization-workshop',
    eventTitle: 'CUDA Kernel Optimization Workshop',
    alt: 'Students analyzing GPU profiling waterfall flame charts and Triton code',
    gradient: 'from-[#E2E8F0]/35 via-[#E2E8F0]/20 to-[#07090A]',
  },
  {
    id: 'gal-003',
    title: 'Adversarial Paper Reading Circle: Reasoning Verifiers',
    category: 'Paper Circles',
    date: '2026-10-18',
    caption: 'Deconstructing test-time search algorithms and Monte Carlo Tree Search in seminar room 102.',
    eventSlug: 'hack-ai-national-hackathon',
    eventTitle: 'Weekly Reading Group',
    alt: 'Whiteboard filled with attention math matrices and step-by-step reasoning diagrams',
    gradient: 'from-[#38C9E8]/35 via-[#FFFFFF]/20 to-[#07090A]',
  },
  {
    id: 'gal-004',
    title: 'Autonomous Quadruped Robot Embodiment Test',
    category: 'Hardware Labs',
    date: '2026-09-30',
    caption: 'Testing ROS2 micro-controllers and SLAM depth cameras on student-assembled companion chassis.',
    eventSlug: 'hack-ai-national-hackathon',
    eventTitle: 'Robotics Lab Trials',
    alt: 'Robotics testing bench with robotic chassis, LIDAR sensor nodes, and telemetry monitors',
    gradient: 'from-[#E2E8F0]/40 via-[#E2E8F0]/25 to-[#07090A]',
  },
  {
    id: 'gal-005',
    title: 'Agentic Tool Protocol Architecture Showcase',
    category: 'Demonstrations',
    date: '2026-09-12',
    caption: 'Live public demonstration of Model Context Protocol (MCP) servers connected to sandboxed execution kernels.',
    eventSlug: 'agentic-ai-protocol-symposium',
    eventTitle: 'Agentic Protocol Symposium',
    alt: 'Interactive presentation screen showing multi-agent routing graphs and sandbox terminal',
    gradient: 'from-[#FFFFFF]/30 via-[#FFFFFF]/25 to-[#07090A]',
  },
  {
    id: 'gal-006',
    title: 'Model Distillation & Quantization Benchmarks',
    category: 'Workshops',
    date: '2026-08-28',
    caption: 'Benchmarking 4-bit AWQ and GPTQ quantized model checkpoints on consumer laptops.',
    eventSlug: 'cuda-kernel-optimization-workshop',
    eventTitle: 'Model Distillation Session',
    alt: 'Terminal displaying tokens per second benchmarks comparing FP16 vs INT4 performance',
    gradient: 'from-[#FFFFFF]/30 via-[#E2E8F0]/30 to-[#07090A]',
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Hackathons', 'Workshops', 'Paper Circles', 'Hardware Labs', 'Demonstrations'];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = useCallback(() => {
    if (filteredItems.length === 0) return;
    try { audioManager.playClick(); } catch {}
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  }, [filteredItems.length]);

  const handleNext = useCallback(() => {
    if (filteredItems.length === 0) return;
    try { audioManager.playClick(); } catch {}
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  }, [filteredItems.length]);

  const closeLightbox = useCallback(() => {
    try { audioManager.playClick(); } catch {}
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, handlePrev, handleNext]);

  return (
    <main className="relative min-h-screen bg-[#07090A] text-white font-manrope pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-facility-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(255, 255, 255,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
       

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 border-b border-[rgba(255, 255, 255,0.18)] pb-8">
          <div>
           
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-barlow-condensed font-bold uppercase tracking-tight text-white leading-tight">
              EVENT GALLERY
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-manrope mt-3 max-w-2xl leading-relaxed">
              Approved photographs, hardware lab snapshots, and hackathon highlights from AI Club technical operations.
            </p>
          </div>

          <div className="p-4 px-6 rounded-2xl bg-[#0C1014]/90 border border-[rgba(255, 255, 255,0.22)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-start md:self-auto text-left md:text-right w-full sm:w-auto">
            <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              CONFIRMED RECORDS
            </span>
            <span className="text-3xl font-barlow-condensed font-bold text-[#FFFFFF] tracking-wider block">
              {GALLERY_ITEMS.length} ARCHIVES
            </span>
            <span className="text-[10px] font-mono text-[#E2E8F0]">Approved Visual Logs</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  try { audioManager.playClick(); } catch {}
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[rgba(255, 255, 255,0.2)] text-white border border-[#FFFFFF] shadow-[0_0_12px_rgba(255, 255, 255,0.3)] font-semibold'
                    : 'bg-[#0C1014] text-slate-400 hover:text-white border border-[rgba(255, 255, 255,0.14)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                try { audioManager.playClick(); } catch {}
                setLightboxIndex(index);
              }}
              className="group cursor-pointer rounded-2xl bg-[#0C1014]/90 border border-[rgba(255, 255, 255,0.18)] hover:border-[#FFFFFF]/50 overflow-hidden transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              {/* Visual Frame */}
              <div className={`relative h-48 w-full bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between overflow-hidden`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#07090A]/80 border border-white/[0.1] text-[#E2E8F0]">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#07090A]/80 border border-white/[0.15] flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-[#FFFFFF] transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-slate-300 flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3 h-3 text-[#FFFFFF]" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-lg font-barlow-condensed font-bold uppercase text-white leading-tight drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Caption & Event Link */}
              <div className="p-4 pt-3 flex flex-col justify-between flex-grow">
                <p className="text-xs text-slate-300 font-manrope leading-relaxed mb-3">
                  {item.caption}
                </p>

                <div className="pt-2 border-t border-[rgba(255, 255, 255,0.12)] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="truncate">{item.eventTitle}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#FFFFFF] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ACCESSIBLE LIGHTBOX MODAL (PRD 4.5 Compliance) */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={closeLightbox} />

            <div className="relative z-10 max-w-4xl w-full bg-[#0C1014] border border-[rgba(255, 255, 255,0.3)] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255, 255, 255,0.25)]">
              {/* Top Modal Controls */}
              <div className="flex items-center justify-between p-4 px-6 border-b border-[rgba(255, 255, 255,0.18)] bg-[#07090A]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[rgba(255, 255, 255,0.15)] text-[#FFFFFF] border border-[rgba(255, 255, 255,0.3)] font-semibold">
                    {activeItem.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {lightboxIndex + 1} of {filteredItems.length}
                  </span>
                </div>

                <button
                  onClick={closeLightbox}
                  className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.15] text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Lightbox [Esc]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Visual Display */}
              <div className={`relative h-64 sm:h-96 w-full bg-gradient-to-br ${activeItem.gradient} p-8 flex items-center justify-center text-center`}>
                <div className="max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/[0.15] flex items-center justify-center mx-auto mb-4 text-[#FFFFFF] shadow-lg">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-barlow-condensed font-bold uppercase text-white mb-2 leading-tight">
                    {activeItem.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 font-manrope">
                    {activeItem.alt}
                  </p>
                </div>

                {/* Left / Right Nav Controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#FFFFFF] border border-white/[0.2] text-white transition-all cursor-pointer shadow-lg"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#FFFFFF] border border-white/[0.2] text-white transition-all cursor-pointer shadow-lg"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Footer Info */}
              <div className="p-6 bg-[#07090A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E2E8F0] mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#FFFFFF]" />
                    <span>Recorded: {activeItem.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-manrope max-w-xl">
                    {activeItem.caption}
                  </p>
                </div>

                <Link
                  href={`/events/${activeItem.eventSlug}`}
                  onClick={closeLightbox}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-glass-cyan text-xs font-mono font-bold transition-all shrink-0 self-start sm:self-auto"
                >
                  <span>VIEW ASSOCIATED EVENT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
