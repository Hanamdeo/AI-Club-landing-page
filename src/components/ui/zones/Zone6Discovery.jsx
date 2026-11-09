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
    { label: 'Operations & Events', desc: 'Hackathons & code sprints', href: '/events', icon: Calendar, color: '#24BFEA' },
    { label: 'Research Commons', desc: '4 active reading tracks', href: '/research', icon: BookOpen, color: '#22C55E' },
    { label: 'Project Archive', desc: '32 shipped repositories', href: '/projects', icon: Code, color: '#A7B7A1' },
    { label: 'Leadership Cadre', desc: 'Student leads & mentors', href: '/team', icon: Users, color: '#F0F6F7' },
    { label: 'Foundational Charter', desc: 'Three innovation pillars', href: '/about', icon: Compass, color: '#A7B7A1' },
    { label: 'Clearance Portal', desc: 'Full intake application', href: '/join', icon: ShieldCheck, color: '#22C55E' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-none font-sans safe-viewport-card custom-scrollbar">
      <div className="relative py-4 sm:py-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-white/[0.12] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-sage">
            <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse shadow-[0_0_8px_#22C55E]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 06 // FINAL LANDMARK • DISCOVERY & INTAKE HUB
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="tracking-tight uppercase">
              FACILITY TERMINAL // ALL ARCHIVES ACCESSIBLE
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-fluid-h2 font-display font-bold text-gradient-cyber tracking-tight mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            The Future Is Built Together
          </h2>
          <p className="text-xs sm:text-sm text-[#D1D5DB] font-sans max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Apply for research clearance, join working groups, or explore dedicated facility branches across the collective.
          </p>
        </div>

        {/* Main Grid: Left Clearance Form & Right Hub Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
          {/* Left Column: Quick Clearance Application */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-sage uppercase tracking-widest flex items-center gap-2 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-signal-green" />
                <span>MEMBERSHIP INTAKE PROTOCOL</span>
              </div>

              {submitted ? (
                <div className="py-6 border-l-2 border-signal-green pl-4 my-4">
                  <CheckCircle className="w-8 h-8 text-signal-green mb-2" />
                  <div className="text-base font-display font-bold text-ivory mb-1">
                    Clearance Dispatch Logged
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    Welcome to AI Club. A coordinator will verify your intake credentials shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.15] text-xs font-mono text-ivory placeholder-slate-500 focus:outline-none focus:border-sage transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block mb-1">
                      Institutional Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@mitsgwl.ac.in"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.15] text-xs font-mono text-ivory placeholder-slate-500 focus:outline-none focus:border-sage transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block mb-1">
                      Primary Focus Domain
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.15] text-xs font-mono text-ivory focus:outline-none focus:border-sage transition-colors"
                    >
                      {ZONE_EXIT.formFields[2].options.map((opt, i) => (
                        <option key={i} value={opt} className="bg-[#121617] text-ivory">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-sage to-[#B6C4B4] hover:from-[#B6C4B4] hover:to-[#C8D6C6] text-[#141819] font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(167,183,161,0.3)] btn-tactile"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>TRANSMIT CLEARANCE APPLICATION</span>
                  </button>
                </form>
              )}
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-white/[0.1] mt-4 flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono text-[10px]">FACILITY CHANNELS:</span>
              <div className="flex items-center gap-4">
                <a href={CLUB_META.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href={CLUB_META.socials.discord} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Discord">
                  <Discord className="w-4 h-4" />
                </a>
                <a href={CLUB_META.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={CLUB_META.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Navigation Hub Directory */}
          <div className="lg:col-span-6 border-l-2 border-white/[0.12] pl-6 py-1 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-3">
                <Compass className="w-3.5 h-3.5 text-[#24BFEA]" />
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
                      className="group p-2.5 rounded-lg border-l-2 border-white/[0.15] hover:border-sage hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className="w-4 h-4" style={{ color: portal.color }} />
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <div>
                        <div className="text-xs font-display font-bold text-ivory group-hover:text-sage transition-colors">
                          {portal.label}
                        </div>
                        <div className="text-[10px] font-sans text-slate-400">
                          {portal.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Institution credit */}
            <div className="pt-3 border-t border-white/[0.08] mt-4 text-[10px] font-mono text-slate-400">
              DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING • MITS GWALIOR
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar: Return to Top */}
        <div className="pt-4 border-t border-white/[0.12] flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-slate-400">
            {CLUB_META.tagline}
          </span>

          {onReturnTop && (
            <button
              onClick={() => {
                audioManager.playWhoosh();
                onReturnTop();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/[0.1] btn-tactile"
            >
              <span>RETURN TO CORRIDOR ENTRANCE</span>
              <ChevronUp className="w-3.5 h-3.5 text-sage" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
