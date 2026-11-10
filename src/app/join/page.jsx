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
  Github,
  Linkedin,
  MapPin,
  Clock,
  Sparkles,
  AlertCircle,
  Calendar,
  Lock,
} from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';

export default function JoinPage() {
  // Configurable Recruitment Status: 'open' | 'coming-soon' | 'closed'
  const [recruitmentStatus, setRecruitmentStatus] = useState('open');

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
  const [clearanceId, setClearanceId] = useState('');

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
    const passCode = `MITS-AICLUB-${Math.floor(100000 + Math.random() * 900000)}`;
    setClearanceId(passCode);
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-[#07090A] text-white font-manrope pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-facility-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(255, 255, 255,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        

        {/* Master Page Header */}
        <div className="border-b border-[rgba(255, 255, 255,0.18)] pb-8 mb-8 sm:mb-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
      

            {/* Configurable Status Switcher (For Demo & Admin Testing) */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0C1014] border border-white/[0.08] text-[10px] font-mono">
              <span className="text-slate-500 px-1">SIMULATE:</span>
              <button
                onClick={() => setRecruitmentStatus('open')}
                className={`px-2 py-0.5 rounded cursor-pointer ${recruitmentStatus === 'open' ? 'bg-[#FFFFFF]/25 text-[#E2E8F0] font-bold' : 'text-slate-400'}`}
              >
                OPEN
              </button>
              <button
                onClick={() => setRecruitmentStatus('coming-soon')}
                className={`px-2 py-0.5 rounded cursor-pointer ${recruitmentStatus === 'coming-soon' ? 'bg-[#E2E8F0]/25 text-[#FFFFFF] font-bold' : 'text-slate-400'}`}
              >
                SOON
              </button>
              <button
                onClick={() => setRecruitmentStatus('closed')}
                className={`px-2 py-0.5 rounded cursor-pointer ${recruitmentStatus === 'closed' ? 'bg-red-500/20 text-red-400 font-bold' : 'text-slate-400'}`}
              >
                CLOSED
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#FFFFFF]/40 shadow-[0_0_30px_rgba(255, 255, 255,0.3)] shrink-0 bg-black">
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
                JOIN THE COLLECTIVE
              </h1>
              <p className="text-xs sm:text-sm font-mono text-[#FFFFFF] uppercase tracking-wider mt-1 break-words">
                PIONEERING THE AI REVOLUTION • MITS-DU GWALIOR
              </p>
              <p className="text-sm sm:text-base text-slate-300 font-manrope mt-2.5 max-w-xl leading-relaxed">
                Apply for research clearance to join AI Club at Madhav Institute of Technology & Science, or reach out through official institutional communication routes.
              </p>
            </div>
          </div>
        </div>

        {/* 1. Official Institutional Contact Routes (PRD 4.9 Requirement) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-[#0C1014]/90 border border-[rgba(255, 255, 255,0.16)] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                OFFICIAL EMAIL
              </span>
              <span className="text-xs font-mono font-semibold text-white break-all">
                {CLUB_INFO.contactEmail}
              </span>
            </div>
            <a
              href={`mailto:${CLUB_INFO.contactEmail}`}
              className="mt-3 text-[11px] font-mono text-[#FFFFFF] hover:text-white flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              <span>SEND DISPATCH</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-[#0C1014]/90 border border-[rgba(255, 255, 255,0.16)] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                CAMPUS LAB
              </span>
              <span className="text-xs font-mono font-semibold text-white">
                Dept. of CSE & AI
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">MITS Gwalior</span>
            </div>
            <span className="mt-3 text-[11px] font-mono text-[#E2E8F0] flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>PHYSICAL FACILITY</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0C1014]/90 border border-[rgba(255, 255, 255,0.16)] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                SOURCE ARCHIVE
              </span>
              <span className="text-xs font-mono font-semibold text-white">
                GitHub Collective
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">32+ Repositories</span>
            </div>
            <a
              href={CLUB_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-[11px] font-mono text-[#FFFFFF] hover:text-white flex items-center gap-1"
            >
              <Github className="w-3 h-3" />
              <span>INSPECT CODE</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-[#0C1014]/90 border border-[rgba(255, 255, 255,0.16)] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                PROFESSIONAL DESK
              </span>
              <span className="text-xs font-mono font-semibold text-white">
                LinkedIn Network
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Alumni & Researchers</span>
            </div>
            <a
              href={CLUB_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-[11px] font-mono text-[#E2E8F0] hover:text-white flex items-center gap-1"
            >
              <Linkedin className="w-3 h-3" />
              <span>CONNECT</span>
            </a>
          </div>
        </div>

        {/* 2. RECRUITMENT CONDITIONAL STATES (PRD 4.9 Requirement) */}

        {/* STATE A: RECRUITMENT CLOSED */}
        {recruitmentStatus === 'closed' && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0C1014]/95 border border-red-500/30 text-center animate-fadeIn shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 text-red-400">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-barlow-condensed font-bold uppercase text-white mb-2">
              RECRUITMENT APPLICATION WINDOW CLOSED
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-manrope max-w-lg mx-auto mb-6 leading-relaxed">
              The intake cycle for the current academic session has concluded. Open workshops, public guest lectures, and paper reading circles remain accessible to all students.
            </p>
            <div className="inline-flex items-center gap-2 p-3 px-5 rounded-xl bg-[#07090A] border border-white/[0.08] text-xs font-mono text-slate-400">
              <Mail className="w-4 h-4 text-[#FFFFFF]" />
              <span>For research collaboration queries, contact: <strong className="text-white">{CLUB_INFO.contactEmail}</strong></span>
            </div>
          </div>
        )}

        {/* STATE B: RECRUITMENT COMING SOON */}
        {recruitmentStatus === 'coming-soon' && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0C1014]/95 border border-[#E2E8F0]/30 text-center animate-fadeIn shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
            <div className="w-14 h-14 rounded-full bg-[#E2E8F0]/10 border border-[#E2E8F0]/30 flex items-center justify-center mx-auto mb-4 text-[#E2E8F0]">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-barlow-condensed font-bold uppercase text-white mb-2">
              NEXT RECRUITMENT CYCLE: COMING SOON
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-manrope max-w-lg mx-auto mb-6 leading-relaxed">
              The upcoming cohort intake will initiate with the semester orientation. Notice of clearance application deadlines will be posted across official channels once confirmed.
            </p>
            <div className="inline-block p-4 px-6 rounded-2xl bg-[#07090A] border border-[rgba(255, 255, 255,0.2)] text-xs font-mono text-[#E2E8F0]">
              <span className="block font-semibold">ESTIMATED CYCLE: AUTUMN COHORT</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Department of CSE & AI Orientation</span>
            </div>
          </div>
        )}

        {/* STATE C: RECRUITMENT OPEN */}
        {recruitmentStatus === 'open' && (
          <div>
            {submitted ? (
              /* Submission Success Clearance Card */
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0C1014]/95 border border-[rgba(255, 255, 255,0.35)] shadow-[0_8px_32px_rgba(255, 255, 255,0.2)] text-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-signal-green/20 border border-signal-green/50 flex items-center justify-center mx-auto mb-6 text-signal-green shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-xs font-mono text-signal-green uppercase tracking-widest block mb-2 font-bold">
                  APPLICATION TRANSMITTED // VERIFICATION ACTIVE
                </span>

                <h2 className="text-3xl sm:text-4xl font-barlow-condensed font-bold uppercase text-white mb-3">
                  CLEARANCE DOSSIER LOGGED FOR {formData.fullName.toUpperCase()}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 font-manrope max-w-md mx-auto mb-6 leading-relaxed">
                  Your credentials have been securely stored in the AI Club admissions database. Your unique research tracking ID is:
                </p>

                <div className="inline-block p-3 sm:p-4 px-5 sm:px-8 rounded-2xl bg-[#07090A] border border-[rgba(255,255,255,0.3)] font-mono text-lg sm:text-2xl font-bold text-[#FFFFFF] tracking-widest mb-8 shadow-inner max-w-full break-all">
                  {clearanceId}
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-400 max-w-lg mx-auto">
                  A verification confirmation dispatch has been routed to <strong>{formData.email}</strong>. Our student operations cadre will review your submitted interests.
                </div>
              </div>
            ) : (
              /* Active Intake Form */
              <form onSubmit={handleSubmit} className="p-5 sm:p-8 md:p-10 rounded-3xl bg-[#0C1014]/90 border border-[rgba(255, 255, 255,0.20)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(255, 255, 255,0.14)]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#FFFFFF]" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      RESEARCH CLEARANCE INTAKE FORM
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#E2E8F0]">
                    DEADLINE: OPEN CYCLES
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
                      className="w-full bg-[#07090A] border border-[rgba(255, 255, 255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none transition-colors"
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
                      className="w-full bg-[#07090A] border border-[rgba(255, 255, 255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none transition-colors"
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
                      className="w-full bg-[#07090A] border border-[rgba(255, 255, 255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Current Semester
                    </label>
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                      className="w-full bg-[#07090A] border border-[rgba(255, 255, 255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none transition-colors"
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
                    className="w-full bg-[#07090A] border border-[rgba(255, 255, 255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none transition-colors"
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
                    className="w-full bg-[#07090A] border border-[rgba(255, 255, 255,0.18)] focus:border-[#FFFFFF] rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Technical Curiosity Statement (Why AI Club?)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what problem or architecture you want to explore with fellow researchers..."
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    className="w-full bg-[#07090A] border border-[rgba(255, 255, 255,0.18)] focus:border-[#FFFFFF] rounded-xl p-4 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl btn-glass-cyan text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_24px_rgba(255, 255, 255,0.35)]"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>TRANSMIT CLEARANCE DOSSIER</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
