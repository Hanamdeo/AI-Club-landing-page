'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  ChevronRight,
  Send,
  CheckCircle2,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Calendar,
  Lock,
} from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';

export default function JoinPage() {
  const recruitmentStatus = CLUB_INFO.recruitment?.status || 'opening-soon';

  const [formData, setFormData] = useState({
    fullName: '',
    enrollment: '',
    email: '',
    branch: 'Computer Science & Engineering',
    semester: '3rd Semester',
    domain: 'Generative AI & LLMs',
    github: '',
    statement: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const domains = [
    'Generative AI & LLMs',
    'ML Systems & CUDA Acceleration',
    'Computer Vision & Multimodal Perception',
    'Autonomous Robotics & Embodied AI',
    'Research Reading Circles & Operations',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    try { audioManager.playSuccess(); } catch {}
    
    // Form pre-fills an official interest email to the club intake inbox
    const subject = encodeURIComponent(`AI Club Cohort Interest - ${formData.fullName} (${formData.branch}, ${formData.semester})`);
    const body = encodeURIComponent(
      `Candidate: ${formData.fullName}\nEmail: ${formData.email}\nBranch: ${formData.branch}\nSemester: ${formData.semester}\nFocus Domain: ${formData.domain}\nGitHub / Portfolio: ${formData.github}\nStatement: ${formData.statement}\n`
    );
    window.location.href = `mailto:${CLUB_INFO.contactEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-[#07090A] text-white font-manrope pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-facility-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Master Page Header */}
        <div className="border-b border-[rgba(255,255,255,0.18)] pb-8 mb-8 sm:mb-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                FACILITY
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-[#FFFFFF] font-semibold">MEMBERSHIP INTAKE</span>
            </div>

            {/* Live Official Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/20 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#FFFFFF] animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="text-white font-semibold">
                STATUS: {CLUB_INFO.recruitment?.statusLabel?.toUpperCase() || 'INTAKE OPENING SOON'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#FFFFFF]/40 shadow-[0_0_30px_rgba(255,255,255,0.3)] shrink-0 bg-black">
              <Image
                src="/logo.png"
                alt="AI Club Official Emblem"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-barlow-condensed font-bold uppercase tracking-tight text-white leading-tight break-words">
                JOIN THE AI CLUB
              </h1>
              <p className="text-sm sm:text-base font-space text-slate-300 tracking-tight mt-1">
                Student Research Cohort & Engineering Cadre • {CLUB_INFO.institution}
              </p>
            </div>
          </div>
        </div>

        {/* 1. Facility Clearance Protocol Notice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 sm:mb-10">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0C1014]/80 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-white" />
              <span>FACILITY CAMPUS</span>
            </div>
            <p className="text-xs font-mono text-white font-semibold">
              {CLUB_INFO.locationCoordinates}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              Department of CSE & AI, MITS Gwalior
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0C1014]/80 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              <Clock className="w-4 h-4 text-white" />
              <span>COHORT CADENCE</span>
            </div>
            <p className="text-xs font-mono text-white font-semibold">
              {CLUB_INFO.recruitment?.nextCycle || '2026 Academic Cohort'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              Weekly paper circles & collaborative lab builds
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0C1014]/80 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-white" />
              <span>COORDINATOR INBOX</span>
            </div>
            <p className="text-xs font-mono text-white font-semibold truncate">
              {CLUB_INFO.contactEmail}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              Official correspondence & intake verification
            </p>
          </div>
        </div>

        {/* 2. RECRUITMENT CONDITIONAL STATES */}
        {recruitmentStatus === 'closed' ? (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0C1014]/95 border border-red-500/30 text-center animate-fadeIn shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 text-red-400">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-barlow-condensed font-bold uppercase text-white mb-2">
              RECRUITMENT APPLICATION WINDOW CONCLUDED
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-manrope max-w-lg mx-auto mb-6 leading-relaxed">
              The intake cycle for the current academic session has concluded. Open workshops, public guest lectures, and paper reading circles remain open to all enrolled students.
            </p>
            <div className="inline-flex items-center gap-2 p-3 px-5 rounded-xl bg-[#07090A] border border-white/[0.08] text-xs font-mono text-slate-400">
              <Mail className="w-4 h-4 text-[#FFFFFF]" />
              <span>For research inquiries, reach us at: <strong className="text-white">{CLUB_INFO.contactEmail}</strong></span>
            </div>
          </div>
        ) : recruitmentStatus === 'opening-soon' ? (
          /* STATE B: RECRUITMENT OPENING SOON */
          <div className="space-y-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0C1014]/95 border border-white/20 text-center animate-fadeIn shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
              <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 text-white">
                <Calendar className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-barlow-condensed font-bold uppercase text-white mb-2">
                NEXT COHORT INTAKE: OPENING SOON
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-manrope max-w-lg mx-auto mb-6 leading-relaxed">
                Applications for the {CLUB_INFO.recruitment?.nextCycle || 'upcoming session'} will open shortly across campus channels. You can submit your candidate profile below to express preliminary interest directly to the club leadership cadre.
              </p>
              <div className="inline-block p-4 px-6 rounded-2xl bg-[#07090A] border border-[rgba(255,255,255,0.2)] text-xs font-mono text-white">
                <span className="block font-semibold">FORMAL ADMISSIONS: DATES ANNOUNCING SHORTLY</span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Department of CSE & AI • MITS Gwalior</span>
              </div>
            </div>

            {/* Interest Registration Form */}
            {submitted ? (
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0C1014]/95 border border-[rgba(255,255,255,0.35)] shadow-[0_8px_32px_rgba(255,255,255,0.15)] text-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-white/20 border border-white/40 flex items-center justify-center mx-auto mb-6 text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-xs font-mono text-slate-300 uppercase tracking-widest block mb-2 font-bold">
                  INTEREST REGISTERED // INBOX PREPARED
                </span>

                <h2 className="text-3xl sm:text-4xl font-barlow-condensed font-bold uppercase text-white mb-3">
                  CANDIDATE DOSSIER PREPARED FOR {formData.fullName.toUpperCase()}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 font-manrope max-w-md mx-auto mb-6 leading-relaxed">
                  Your interest summary has been prepared for dispatch to <strong>{CLUB_INFO.contactEmail}</strong>. You will be notified at <strong>{formData.email}</strong> when the formal admission round commences.
                </p>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-400 max-w-lg mx-auto">
                  Direct questions to the operations team at <strong>{CLUB_INFO.contactEmail}</strong> or visit the Innovation Annex during lab hours.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 sm:p-8 md:p-10 rounded-3xl bg-[#0C1014]/90 border border-[rgba(255,255,255,0.20)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.14)]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#FFFFFF]" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      REGISTER INTAKE INTEREST
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300">
                    DIRECT TO {CLUB_INFO.contactEmail}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#07090A] border border-[rgba(255,255,255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Institutional Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@mitsgwl.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#07090A] border border-[rgba(255,255,255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Department / Engineering Branch
                    </label>
                    <input
                      type="text"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full bg-[#07090A] border border-[rgba(255,255,255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Current Semester
                    </label>
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                      className="w-full bg-[#07090A] border border-[rgba(255,255,255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none transition-colors"
                    >
                      <option value="1st Semester">1st Semester (Freshman)</option>
                      <option value="2nd Semester">2nd Semester</option>
                      <option value="3rd Semester">3rd Semester (Sophomore)</option>
                      <option value="4th Semester">4th Semester</option>
                      <option value="5th Semester">5th Semester (Junior)</option>
                      <option value="6th Semester">6th Semester</option>
                      <option value="7th Semester">7th Semester (Senior)</option>
                      <option value="8th Semester">8th Semester</option>
                      <option value="Postgraduate">Postgraduate / M.Tech / Ph.D.</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Primary Technical Domain of Interest
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full bg-[#07090A] border border-[rgba(255,255,255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none transition-colors"
                  >
                    {domains.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    GitHub Profile or Portfolio Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/your-username"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full bg-[#07090A] border border-[rgba(255,255,255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Technical Background & Motivation Statement
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share any past projects, ML frameworks you have explored, or why you want to build with AI Club..."
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    className="w-full bg-[#07090A] border border-[rgba(255,255,255,0.18)] focus:border-[#FFFFFF] rounded-xl p-4 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-slate-200 text-[#07090A] font-barlow-condensed font-bold text-base tracking-wider uppercase transition-all shadow-[0_0_24px_rgba(255,255,255,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#07090A]" />
                    <span>REGISTER CANDIDATE PROFILE</span>
                  </button>
                  <p className="text-[11px] font-mono text-slate-400 text-center mt-2.5">
                    Transmits candidate interest details to {CLUB_INFO.contactEmail}
                  </p>
                </div>
              </form>
            )}
          </div>
        ) : null}
      </div>
    </main>
  );
}
