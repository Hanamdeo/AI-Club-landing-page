'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Mail, ChevronUp, ArrowUpRight, Github, Disc as Discord, Linkedin, Twitter, Compass, ShieldCheck, Calendar, BookOpen, Code, Users, CheckCircle2 } from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 06: Discovery / Exit Zone
 * Final landmark and navigation hub (Projection Chamber).
 * Content revealed: Join the club, explore pages and contact links.
 */
export default function Zone6Discovery({ onReturnTop }) {
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: 'Generative AI & LLMs',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      audioManager.playBeep(1200, 0.15);
      // Pre-fill email client for verified inquiry dispatch
      const subject = encodeURIComponent(`AI Club Inquiry - ${formData.name} (${formData.domain})`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nDomain: ${formData.domain}\nMessage: ${formData.message}\n`
      );
      window.location.href = `mailto:${CLUB_INFO.contactEmail}?subject=${subject}&body=${body}`;
      setInquirySent(true);
    }
  };

  const directoryPortals = [
    { label: 'Operations & Events', desc: 'Hackathons & code sprints', href: '/events', icon: Calendar },
    { label: 'Research Commons', desc: '4 active reading tracks', href: '/research', icon: BookOpen },
    { label: 'Project Archive', desc: '32 shipped repositories', href: '/projects', icon: Code },
    { label: 'Leadership Cadre', desc: 'Student leads & mentors', href: '/team', icon: Users },
    { label: 'Foundational Charter', desc: 'Three innovation pillars', href: '/about', icon: Compass },
    { label: 'Clearance Portal', desc: 'Official intake guidelines', href: '/join', icon: ShieldCheck },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-text font-sans safe-viewport-card custom-scrollbar pointer-events-auto">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative shadow-[0_16px_48px_rgba(0,0,0,0.65)]">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-white/[0.12] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_#FFFFFF]" />
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Explore AI Club & Join the Cohort
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 font-sans max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Connect with active student researchers, contribute to open distributed systems, and access advanced GPU compute infrastructure.
          </p>
        </div>

        {/* 2-Column Discovery Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6">
          {/* Left Column: Membership Intake & Direct Contact */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>MEMBERSHIP INTAKE PROTOCOL</span>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-display font-bold text-white">
                    2026 Intake Application
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.10] text-slate-300 border border-white/20">
                    OPENING SOON
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                  Applications for the upcoming student cohort will open shortly. In the interim, students can register interest or contact the executive cadre directly.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-white">
                  <Mail className="w-3.5 h-3.5 text-white" />
                  <a href={`mailto:${CLUB_INFO.contactEmail}`} className="hover:underline">
                    {CLUB_INFO.contactEmail}
                  </a>
                </div>
              </div>

              {inquirySent ? (
                <div className="py-4 border-l-2 border-white pl-4 my-2">
                  <CheckCircle2 className="w-6 h-6 text-white mb-2" />
                  <div className="text-sm font-display font-bold text-white mb-1">
                    Email Client Dispatched
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    Your inquiry has been prepared for dispatch to {CLUB_INFO.contactEmail}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 pointer-events-auto">
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
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors"
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
                      placeholder="student@mitsgwalior.in"
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block mb-1">
                      Primary Focus Domain
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="Generative AI & LLMs" className="bg-[#121617] text-white">Generative AI & LLMs</option>
                      <option value="Computer Vision & Multimodal" className="bg-[#121617] text-white">Computer Vision & Multimodal</option>
                      <option value="High-Performance Systems & CUDA" className="bg-[#121617] text-white">High-Performance Systems & CUDA</option>
                      <option value="Embodied AI & Robotics" className="bg-[#121617] text-white">Embodied AI & Robotics</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 px-4 rounded-lg bg-white hover:bg-slate-200 text-[#0A0D10] font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,255,255,0.25)] btn-tactile pointer-events-auto"
                  >
                    <Send className="w-3.5 h-3.5 text-[#0A0D10]" />
                    <span>TRANSMIT INQUIRY TO COORDINATOR</span>
                  </button>
                </form>
              )}
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-white/[0.10] mt-4 flex items-center justify-between text-xs text-slate-300 pointer-events-auto">
              <span className="font-mono text-[10px]">FACILITY CHANNELS:</span>
              <div className="flex items-center gap-4">
                <a href={CLUB_INFO.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href={CLUB_INFO.socials.discord} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Discord">
                  <Discord className="w-4 h-4" />
                </a>
                <a href={CLUB_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={CLUB_INFO.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Twitter / X">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Navigation Hub Directory */}
          <div className="lg:col-span-6 border-t border-white/[0.12] lg:border-t-0 lg:border-l lg:border-white/[0.12] pt-5 lg:pt-0 lg:pl-6 py-1 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-3 font-semibold">
                <Compass className="w-3.5 h-3.5 text-white" />
                <span>EXPLORE DEDICATED FACILITY HUBS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pointer-events-auto">
                {directoryPortals.map((portal, idx) => {
                  const Icon = portal.icon;
                  return (
                    <Link
                      key={idx}
                      href={portal.href}
                      onClick={() => audioManager.playClick()}
                      className="group p-3 rounded-xl glass-card hover:border-white/50 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-4 h-4 text-white" />
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <div>
                        <div className="text-xs font-display font-bold text-white group-hover:text-slate-100 transition-colors">
                          {portal.label}
                        </div>
                        <div className="text-[10px] font-sans text-slate-300">
                          {portal.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Institution credit */}
            <div className="pt-3 border-t border-white/[0.10] mt-4 text-[10px] font-mono text-slate-400">
              DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING • MITS-DU GWALIOR
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar: Return to Top */}
        <div className="pt-4 border-t border-white/[0.12] flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-slate-400">
            {CLUB_INFO.tagline}
          </span>

          {onReturnTop && (
            <button
              onClick={() => {
                audioManager.playWhoosh();
                onReturnTop();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.18] text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/20 btn-tactile pointer-events-auto"
            >
              <span>RETURN TO CORRIDOR ENTRANCE</span>
              <ChevronUp className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
