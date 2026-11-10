'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Instagram,
  Linkedin,
  ArrowUp,
  ArrowUpRight,
  Terminal,
} from 'lucide-react';
import { audioManager } from '@/utils/audioManager';

/**
 * StaticFooter
 * Enhanced Architectural Footer for AI Club MITS Gwalior.
 * Featuring:
 * - Fluid illuminated horizon wave transition
 * - 3D Slade typography with anaglyph chromatic depth
 * - 3-column balanced editorial structure with sleek gradient dividers
 * - Interactive direct routes: ABOUT, BLOG, GD, REGISTER -> /events
 * - Rich institutional social network with live facility telemetry
 */
export default function StaticFooter({ onOpenTerminal }) {
  const scrollToTop = () => {
    try {
      audioManager.playWhoosh();
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'ABOUT', href: '/about' },
    { label: 'BLOG', href: '/blog' },
    { label: 'GD', href: '/research' },
    { label: 'REGISTER', href: '/events' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative w-full bg-[#050C12] text-[#F0F6F7] font-manrope z-20 select-none overflow-hidden">
      {/* ============================================================== */}
      {/* 1. ILLUMINATED HORIZON WAVE TRANSITION                         */}
      {/* ============================================================== */}
      <div className="relative w-full overflow-hidden leading-none pointer-events-none -mb-[1px]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 md:h-20 preserve-3d"
          preserveAspectRatio="none"
        >
          {/* Base organic curve fill */}
          <path
            d="M0,45 C280,120 520,110 820,50 C1120,-10 1310,80 1440,35 L1440,120 L0,120 Z"
            fill="#050C12"
          />
          {/* Glowing cyan contour crest */}
          <path
            d="M0,45 C280,120 520,110 820,50 C1120,-10 1310,80 1440,35"
            stroke="url(#waveGlowGrad)"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="waveGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.2" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#E2E8F0" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ============================================================== */}
      {/* 2. ATMOSPHERIC FACILITY AMBIENCE                               */}
      {/* ============================================================== */}
      <div className="absolute inset-0 bg-facility-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(255, 255, 255,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255, 255, 255,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* ============================================================== */}
      {/* 3. MAIN 3-COLUMN EDITORIAL DECK                                */}
      {/* ============================================================== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-8 sm:pt-10 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-stretch">
          
          {/* ------------------------------------------------------------ */}
          {/* COLUMN 1: BRAND IDENTITY & INTERACTIVE CTA                   */}
          {/* ------------------------------------------------------------ */}
          <div className="md:col-span-6 lg:col-span-5 md:pr-10 lg:pr-14 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Brand Logo & 3D Title */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#FFFFFF]/40 flex items-center justify-center shadow-[0_0_24px_rgba(255, 255, 255,0.3)] shrink-0 bg-black group">
                  <Image
                    src="/logo.png"
                    alt="AI Club MITS Gwalior Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-3d-slade text-2xl sm:text-3xl md:text-4xl tracking-wider uppercase leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    AI CLUB
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-[10px] font-bold text-[#FFFFFF] tracking-wider uppercase">
                      MITS GWALIOR
                    </span>
                    <span className="text-slate-600 text-[10px]">•</span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                      EST. 2024
                    </span>
                  </div>
                </div>
              </div>

              {/* High-Readability Swiss Prose */}
              <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed max-w-md font-normal font-sans">
                Collegiate Artificial Intelligence and machine learning research collective.
                Bridging foundational theory, distributed systems engineering, and open student innovation.
              </p>
            </div>

            {/* Action Buttons: Outlined 3D CTA + Terminal CLI */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/join"
                className="font-3d-slade-subtle inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-md bg-[rgba(255, 255, 255,0.06)] hover:bg-[#FFFFFF] border-2 border-[#FFFFFF] text-white hover:text-[#050C12] text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255, 255, 255,0.22)] hover:shadow-[0_0_35px_rgba(255, 255, 255,0.65)] cursor-pointer active:scale-95"
              >
                <span>CONTACT US</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-md border border-[rgba(255, 255, 255,0.25)] hover:border-[#FFFFFF] text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-sm"
                  title="Open Interactive UNIX Terminal (~)"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#FFFFFF]" />
                  <span>TERMINAL CLI</span>
                </button>
              )}
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* COLUMN 2: CLEAN DIRECTORY LINKS (ABOUT, BLOG, GD, REGISTER)  */}
          {/* ------------------------------------------------------------ */}
          <div className="md:col-span-3 lg:col-span-3 border-t border-[rgba(255, 255, 255,0.14)] pt-6 md:border-t-0 md:pt-0 md:border-l md:border-[rgba(255, 255, 255,0.20)] md:pl-8 lg:pl-12 flex flex-col justify-center space-y-3 sm:space-y-3.5 my-auto">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center w-fit py-0.5 transition-all duration-150 hover:translate-x-1.5"
              >
                <span className="font-3d-slade text-xl sm:text-2xl tracking-wider uppercase text-white group-hover:text-[#FFFFFF] transition-colors leading-tight">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* ------------------------------------------------------------ */}
          {/* COLUMN 3: VERTICAL SOCIAL TILES (INSTAGRAM, LINKEDIN)        */}
          {/* ------------------------------------------------------------ */}
          <div className="md:col-span-3 lg:col-span-4 border-t border-[rgba(255, 255, 255,0.14)] pt-6 md:border-t-0 md:pt-0 md:border-l md:border-[rgba(255, 255, 255,0.20)] md:pl-8 lg:pl-12 flex flex-col justify-center space-y-3 my-auto">
            <div className="flex flex-col gap-2.5 max-w-xs w-full">
              {socialLinks.map((s, idx) => {
                const IconComp = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-2.5 rounded-lg bg-[rgba(255, 255, 255,0.03)] hover:bg-[rgba(255, 255, 255,0.08)] border border-[rgba(255, 255, 255,0.15)] hover:border-[#FFFFFF]/50 transition-all shadow-sm"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-[rgba(255, 255, 255,0.08)] group-hover:bg-[#FFFFFF]/20 border border-[rgba(255, 255, 255,0.2)] group-hover:border-[#FFFFFF] flex items-center justify-center transition-all">
                        <IconComp className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#FFFFFF] transition-colors" />
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-200 group-hover:text-white transition-colors">
                        {s.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FFFFFF] transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. SUBTLE BOTTOM COPYRIGHT & TELEMETRY BAR                     */}
      {/* ============================================================== */}
      <div className="relative border-t border-[rgba(255, 255, 255,0.14)] bg-[#04080D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-white font-medium">© {new Date().getFullYear()} AI CLUB</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span>MADHAV INSTITUTE OF TECHNOLOGY & SCIENCE</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] text-slate-500 hidden md:inline">AUTONOMOUS RESEARCH NODE</span>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 text-slate-400 hover:text-[#FFFFFF] transition-colors font-bold uppercase tracking-wider text-[10px] cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
