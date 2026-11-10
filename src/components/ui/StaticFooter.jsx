'use client';

import React from 'react';
import Link from 'next/link';
import {
  Instagram,
  
  Linkedin,
  Globe,
  ArrowUp,
  Sparkles,
  Terminal,
  Radio,
} from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';

/**
 * StaticFooter
 * Minimalist, high-aesthetic architectural footer inspired by modern editorial design.
 * Features an organic wave curve boundary, 3-column layout with vertical dividers,
 * focused navigation (ABOUT, BLOG, GD, REGISTER -> /events), and vertical social stack,
 * strictly themed with the 3D Facility Core palette (Obsidian, Cyan, Stark White).
 */
export default function StaticFooter({ onOpenTerminal }) {
  const scrollToTop = () => {
    try {
      audioManager.playWhoosh();
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Middle column links requested by user
  const navLinks = [
    { label: 'ABOUT', href: '/about', note: 'Charter & Cadre' },
    { label: 'BLOG', href: '/blog', note: 'Research Papers' },
    { label: 'GD', href: '/research', note: 'Discussion Archive' },
    { label: 'REGISTER', href: '/events', note: 'Upcoming Operations' },
  ];

  // Right column vertical social stack matching reference
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    
  ];

  return (
    <footer className="relative w-full bg-[#050C12] text-[#F0F6F7] font-manrope z-20 select-none overflow-hidden">
      {/* ============================================================== */}
      {/* 1. ORGANIC WAVE TRANSITION (Reference match with Cyan theme)     */}
      {/* ============================================================== */}
      <div className="relative w-full overflow-hidden leading-none pointer-events-none -mb-[1px]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-18 md:h-24 preserve-3d"
          preserveAspectRatio="none"
        >
          {/* Base organic curve fill */}
          <path
            d="M0,45 C280,120 520,110 820,50 C1120,-10 1310,80 1440,35 L1440,120 L0,120 Z"
            fill="#050C12"
          />
          {/* Glowing cyan contour line */}
          <path
            d="M0,45 C280,120 520,110 820,50 C1120,-10 1310,80 1440,35"
            stroke="rgba(85,223,255,0.4)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* 2. BACKGROUND AMBIENCE & GRID                                  */}
      {/* ============================================================== */}
      <div className="absolute inset-0 bg-facility-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(85,223,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* ============================================================== */}
      {/* 3. MAIN 3-COLUMN EDITORIAL DECK                                */}
      {/* ============================================================== */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-0 items-start">
          
          {/* ------------------------------------------------------------ */}
          {/* COLUMN 1: BRAND IDENTITY & ACTION BUTTON                     */}
          {/* ------------------------------------------------------------ */}
          <div className="md:col-span-6 lg:col-span-5 md:pr-10 lg:pr-14 space-y-6">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B1E2E] to-[#050C12] border border-[#55DFFF]/40 flex items-center justify-center shadow-[0_0_20px_rgba(85,223,255,0.25)] shrink-0">
                <Sparkles className="w-5 h-5 text-[#55DFFF]" />
              </div>
              <div>
                <h3 className="font-3d-slade text-2xl sm:text-3xl tracking-wider uppercase leading-none">
                  AI CLUB
                </h3>
                <span className="font-mono text-[11px] font-bold text-[#55DFFF] tracking-wider uppercase">
                  MITS GWALIOR
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Collegiate Artificial Intelligence and machine learning research collective.
              Bridging foundational theory, distributed systems engineering, and open student innovation.
            </p>

            {/* Rectangular Bordered Action Button (Matching reference box CTA) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/join"
                className="font-3d-slade-subtle inline-flex items-center justify-center px-7 py-3 border-2 border-[#55DFFF] text-white hover:text-[#050C12] hover:bg-[#55DFFF] text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(85,223,255,0.2)] hover:shadow-[0_0_30px_rgba(85,223,255,0.6)] cursor-pointer active:scale-95"
              >
                CONTACT US
              </Link>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* COLUMN 2: CLEAN DIRECTORY LINKS (ABOUT, BLOG, GD, REGISTER)  */}
          {/* ------------------------------------------------------------ */}
          <div className="md:col-span-4 lg:col-span-4 md:border-l md:border-[rgba(85,223,255,0.22)] md:pl-10 lg:pl-16 flex flex-col justify-center space-y-6 sm:space-y-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center justify-between py-1 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#55DFFF] transition-all group-hover:shadow-[0_0_8px_#55DFFF]" />
                  <span className="font-3d-slade-subtle text-xl sm:text-2xl tracking-wider uppercase text-white group-hover:text-[#55DFFF] transition-all">
                    {link.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors uppercase tracking-wider">
                  {link.note}
                </span>
              </Link>
            ))}
          </div>

          {/* ------------------------------------------------------------ */}
          {/* COLUMN 3: VERTICAL SOCIAL STACK (Matching reference icons)   */}
          {/* ------------------------------------------------------------ */}
          <div className="md:col-span-2 lg:col-span-3 md:border-l md:border-[rgba(85,223,255,0.22)] md:pl-10 lg:pl-16 flex md:flex-col flex-row items-center md:items-start justify-start gap-6 sm:gap-7">
            {socialLinks.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all"
                  aria-label={s.label}
                  title={s.label}
                >
                  <div className="w-9 h-9 rounded-lg bg-[rgba(85,223,255,0.05)] group-hover:bg-[#55DFFF]/15 border border-[rgba(85,223,255,0.18)] group-hover:border-[#55DFFF] flex items-center justify-center transition-all shadow-sm group-hover:shadow-[0_0_14px_rgba(85,223,255,0.35)]">
                    <IconComp className="w-4 h-4 text-slate-300 group-hover:text-[#55DFFF] transition-colors" />
                  </div>
                  <span className="text-xs font-mono font-medium tracking-wide text-slate-400 group-hover:text-[#55DFFF] hidden lg:inline">
                    {s.label}
                  </span>
                </a>
              );
            })}
          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. SUBTLE BOTTOM COPYRIGHT & TELEMETRY BAR                     */}
      {/* ============================================================== */}
      <div className="relative border-t border-[rgba(85,223,255,0.12)] bg-[#04080D]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          {/* <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} AI CLUB • MITS GWALIOR.</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">26.2307° N, 78.2250° E</span>
          </div> */}

          <div className="flex items-center gap-4">
            <span className="text-[10px] text-slate-500">AUTONOMOUS RESEARCH NODE</span>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 text-slate-400 hover:text-[#55DFFF] transition-colors font-bold uppercase tracking-wider text-[10px] cursor-pointer"
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
