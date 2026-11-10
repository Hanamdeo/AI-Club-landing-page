'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle, ChevronUp, ArrowUpRight, Github, Disc as Discord, Linkedin, Twitter, Compass, ShieldCheck, Calendar, BookOpen, Code, Users } from 'lucide-react';
import { ZONE_EXIT, CLUB_META } from '@/data/clubData';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 06: Discovery / Exit Zone
 * Final landmark and navigation hub (Projection Chamber).
 * Content revealed: Join the club, explore pages and contact links.
 */
export default function Zone6Discovery({ onReturnTop }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: ZONE_EXIT.formFields[2].options[0],
    portfolio: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      audioManager.playBeep(1200, 0.15);
      setSubmitted(true);
    }
  };

  const directoryPortals = [
    { label: 'Operations & Events', desc: 'Hackathons & code sprints', href: '/events', icon: Calendar, color: '#55DFFF' },
    { label: 'Research Commons', desc: '4 active reading tracks', href: '/research', icon: BookOpen, color: '#55DFFF' },
    { label: 'Project Archive', desc: '32 shipped repositories', href: '/projects', icon: Code, color: '#55DFFF' },
    { label: 'Leadership Cadre', desc: 'Student leads & mentors', href: '/team', icon: Users, color: '#55DFFF' },
    { label: 'Foundational Charter', desc: 'Three innovation pillars', href: '/about', icon: Compass, color: '#55DFFF' },
    { label: 'Clearance Portal', desc: 'Full intake application', href: '/join', icon: ShieldCheck, color: '#22C55E' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-none font-sans safe-viewport-card custom-scrollbar">
      <div className="glass-panel p-6 sm:p-8 rounded-xl relative">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-[rgba(150,230,255,0.16)] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-[#55DFFF]">
            <span className="w-2 h-2 rounded-full bg-[#55DFFF] animate-pulse shadow-[0_0_8px_#55DFFF]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 06 // FINAL LANDMARK • DISCOVERY & INTAKE HUB
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#B8C7D4]">
            <span className="tracking-tight uppercase">
              FACILITY TERMINAL // ALL ARCHIVES ACCESSIBLE
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-fluid-h2 font-display font-bold text-white tracking-tight mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
            The Future Is Built Together
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(240,247,255,0.92)] font-sans max-w-2xl leading-[1.65] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Apply for research clearance, join working groups, or explore dedicated facility branches across the collective.
          </p>
        </div>

        {/* Main Grid: Left Clearance Form & Right Hub Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
          {/* Left Column: Quick Clearance Application */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="glass-card p-5 sm:p-6">
              <div className="text-[10px] font-mono text-[#55DFFF] uppercase tracking-widest flex items-center gap-2 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#55DFFF]" />
                <span>MEMBERSHIP INTAKE PROTOCOL</span>
              </div>

              {submitted ? (
                <div className="py-6 border-l-2 border-signal-green pl-4 my-4">
                  <CheckCircle className="w-8 h-8 text-signal-green mb-2" />
                  <div className="text-base font-display font-bold text-white mb-1">
                    Clearance Dispatch Logged
                  </div>
                  <p className="text-xs text-[rgba(240,247,255,0.92)] font-sans">
                    Welcome to AI Club. A coordinator will verify your intake credentials shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-[#B8C7D4] uppercase tracking-wider block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-3 py-2 rounded-lg bg-[rgba(5,12,18,0.50)] border border-[rgba(150,230,255,0.20)] text-xs font-mono text-white placeholder-[#B8C7D4]/50 focus:outline-none focus:border-[#55DFFF] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#B8C7D4] uppercase tracking-wider block mb-1">
                      Institutional Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@mitsgwl.ac.in"
                      className="w-full px-3 py-2 rounded-lg bg-[rgba(5,12,18,0.50)] border border-[rgba(150,230,255,0.20)] text-xs font-mono text-white placeholder-[#B8C7D4]/50 focus:outline-none focus:border-[#55DFFF] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#B8C7D4] uppercase tracking-wider block mb-1">
                      Primary Focus Domain
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[rgba(5,12,18,0.50)] border border-[rgba(150,230,255,0.20)] text-xs font-mono text-white focus:outline-none focus:border-[#55DFFF] transition-colors"
                    >
                      {ZONE_EXIT.formFields[2].options.map((opt, i) => (
                        <option key={i} value={opt} className="bg-[#050C12] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 px-4 rounded-xl btn-glass-cyan font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 btn-tactile"
                  >
                    <Send className="w-3.5 h-3.5 text-[#55DFFF]" />
                    <span>TRANSMIT CLEARANCE APPLICATION</span>
                  </button>
                </form>
              )}
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-[rgba(150,230,255,0.14)] mt-4 flex items-center justify-between text-xs text-[#B8C7D4]">
              <span className="font-mono text-[10px]">FACILITY CHANNELS:</span>
              <div className="flex items-center gap-4">
                <a href={CLUB_META.socials.github} target="_blank" rel="noreferrer" className="hover:text-[#55DFFF] transition-colors" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href={CLUB_META.socials.discord} target="_blank" rel="noreferrer" className="hover:text-[#55DFFF] transition-colors" aria-label="Discord">
                  <Discord className="w-4 h-4" />
                </a>
                <a href={CLUB_META.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#55DFFF] transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={CLUB_META.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-[#55DFFF] transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Navigation Hub Directory */}
          <div className="lg:col-span-6 border-t border-[rgba(150,230,255,0.16)] lg:border-t-0 lg:border-l-2 border-[rgba(150,230,255,0.16)] pt-6 lg:pt-0 pl-0 lg:pl-6 py-1 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#B8C7D4] uppercase tracking-widest flex items-center gap-2 mb-3">
                <Compass className="w-3.5 h-3.5 text-[#55DFFF]" />
                <span>EXPLORE DEDICATED FACILITY HUBS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {directoryPortals.map((portal, idx) => {
                  const Icon = portal.icon;
                  return (
                    <Link
                      key={idx}
                      href={portal.href}
                      onClick={() => audioManager.playClick()}
                      className="group p-3 rounded-lg glass-card hover:border-[#55DFFF]/50 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Icon className="w-4 h-4 text-[#55DFFF]" />
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#B8C7D4] group-hover:text-[#55DFFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <div>
                        <div className="text-xs font-display font-bold text-white group-hover:text-[#55DFFF] transition-colors">
                          {portal.label}
                        </div>
                        <div className="text-[10px] font-sans text-[#B8C7D4]">
                          {portal.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Institution credit */}
            <div className="pt-3 border-t border-[rgba(150,230,255,0.14)] mt-4 text-[10px] font-mono text-[#B8C7D4]">
              DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING • MITS GWALIOR
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar: Return to Top */}
        <div className="pt-4 border-t border-[rgba(150,230,255,0.16)] flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-[#B8C7D4]">
            {CLUB_META.tagline}
          </span>

          {onReturnTop && (
            <button
              onClick={() => {
                audioManager.playWhoosh();
                onReturnTop();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card hover:border-[#55DFFF]/50 text-xs font-mono text-[#B8C7D4] hover:text-white transition-all cursor-pointer btn-tactile"
            >
              <span>RETURN TO CORRIDOR ENTRANCE</span>
              <ChevronUp className="w-3.5 h-3.5 text-[#55DFFF]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
