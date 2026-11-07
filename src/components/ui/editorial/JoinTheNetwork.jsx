'use client';

import React, { useState } from 'react';
import {
  Send,
  CheckCircle,
  Github,
  Disc as Discord,
  Linkedin,
  Twitter,
  ArrowUp,
} from 'lucide-react';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 09: Join the Network
 * Student recruitment, domain selection, learning benefits, and functional cohort application.
 */
export default function JoinTheNetwork({ onReturnTop }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: CLUB_INFO.domains[0]?.name || 'Generative AI & LLMs',
    portfolio: '',
    statement: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      audioManager.playBeep(1200, 0.15);
      setSubmitted(true);
    }
  };

  const handleReturn = () => {
    audioManager.playWhoosh();
    if (onReturnTop) onReturnTop();
  };

  return (
    <section id="join-network" className="relative w-full py-20 px-6 md:px-12 lg:px-16 border-t border-white/[0.08] font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-md bg-[#131718] border border-white/[0.1] text-[10px] font-mono tracking-widest text-[#A7B7A1] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_8px_#22C55E]" />
            <span>SECTOR 09 // MEMBERSHIP INTAKE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-archivo font-black tracking-tight text-gradient-cyber leading-[0.98] drop-shadow-sm">
            JOIN THE NETWORK
          </h2>
          <p className="text-sm sm:text-base text-[#B5B8AF] font-normal mt-3 max-w-2xl leading-relaxed">
            Whether you want to optimize GPU memory pipelines, construct novel multi-modal architectures, or engineer open-source AI tooling, your curiosity belongs here.
          </p>
        </div>

        {/* Benefits & Domains Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-14">
          {/* Left Column: Why Join & Available Domains */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="relative p-5 sm:p-6 rounded-xl bg-[#141819] border border-white/[0.08] crosshair-corner">
                <h3 className="text-base sm:text-lg font-bold text-ivory mb-2 tracking-tight">
                  Why Join the AI Club?
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-ivory/70 leading-relaxed font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-ivory font-medium">Direct GPU Compute:</strong> Access compute infrastructure for reproducible student model training and evaluations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-ivory font-medium">Reproducible Research:</strong> Co-author preprints, build benchmarks, and present at peer workshops.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-ivory font-medium">Open Source Engineering:</strong> Ship production-grade tools and systems with verified benchmarks.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Available Domains Overview */}
              <div>
                <span className="text-[11px] font-mono text-ivory/50 uppercase tracking-wider block mb-2.5 font-semibold">
                  Available Research & Engineering Tracks:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CLUB_INFO.domains.map((dom) => (
                    <div
                      key={dom.id}
                      className="p-3 rounded-lg bg-[#101415] border border-white/[0.06] hover:border-white/[0.14] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-ivory">{dom.name}</span>
                        <span className="text-[9px] font-mono text-sage">{dom.badge}</span>
                      </div>
                      <p className="text-[11px] text-ivory/50 line-clamp-1">
                        {dom.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Official Communication Links */}
            <div className="pt-5 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono text-ivory/50 uppercase tracking-wider block mb-2.5 font-semibold">
                Official Channels
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={CLUB_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141819] border border-white/[0.08] hover:border-white/[0.16] text-xs font-mono text-ivory/70 hover:text-ivory transition-all btn-tactile cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={CLUB_INFO.socials.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141819] border border-white/[0.08] hover:border-white/[0.16] text-xs font-mono text-ivory/70 hover:text-ivory transition-all btn-tactile cursor-pointer"
                >
                  <Discord className="w-3.5 h-3.5" />
                  <span>Discord</span>
                </a>
                <a
                  href={CLUB_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141819] border border-white/[0.08] hover:border-white/[0.16] text-xs font-mono text-ivory/70 hover:text-ivory transition-all btn-tactile cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={CLUB_INFO.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141819] border border-white/[0.08] hover:border-white/[0.16] text-xs font-mono text-ivory/70 hover:text-ivory transition-all btn-tactile cursor-pointer"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>Twitter/X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Application Form */}
          <div className="lg:col-span-6 relative p-5 sm:p-7 rounded-xl bg-[#141819] border border-white/[0.08] crosshair-corner">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-sage/10 border border-sage/30 flex items-center justify-center mb-3.5">
                  <CheckCircle className="w-6 h-6 text-sage" />
                </div>
                <h3 className="text-xl font-bold text-ivory mb-2 tracking-tight">
                  Application Logged
                </h3>
                <p className="text-xs sm:text-sm text-ivory/70 max-w-sm mb-5 leading-relaxed">
                  Welcome to the evaluation queue, {formData.name}. Our research coordinators and review committee will inspect your dossier and dispatch onboarding credentials to {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      domain: CLUB_INFO.domains[0]?.name || '',
                      portfolio: '',
                      statement: '',
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.10] text-xs font-mono text-ivory hover:text-sage font-medium transition-all btn-tactile cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="border-b border-white/[0.06] pb-3 mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-ivory tracking-tight">
                    Candidate Dossier
                  </h3>
                  <p className="text-[11px] text-ivory/50 mt-0.5 font-mono">
                    Open to all undergraduate & graduate cohorts
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-ivory/60 mb-1 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101415] border border-white/[0.10] focus:border-sage/60 text-ivory text-xs placeholder:text-ivory/30 focus:outline-none transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-ivory/60 mb-1 uppercase tracking-wider">
                    Institution Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101415] border border-white/[0.10] focus:border-sage/60 text-ivory text-xs placeholder:text-ivory/30 focus:outline-none transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-ivory/60 mb-1 uppercase tracking-wider">
                    Primary Domain of Interest
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101415] border border-white/[0.10] focus:border-sage/60 text-ivory text-xs focus:outline-none transition-colors font-mono"
                  >
                    {CLUB_INFO.domains.map((dom) => (
                      <option key={dom.id} value={dom.name} className="bg-[#141819] text-ivory">
                        {dom.name} ({dom.badge})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-ivory/60 mb-1 uppercase tracking-wider">
                    GitHub / Portfolio Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101415] border border-white/[0.10] focus:border-sage/60 text-ivory text-xs placeholder:text-ivory/30 focus:outline-none transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-ivory/60 mb-1 uppercase tracking-wider">
                    Statement of Curiosity / Intent
                  </label>
                  <textarea
                    rows={2}
                    placeholder="What questions, models, or systems are you excited to build with the AI Club?"
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101415] border border-white/[0.10] focus:border-sage/60 text-ivory text-xs placeholder:text-ivory/30 focus:outline-none transition-colors resize-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-sage hover:bg-sage/90 text-graphite font-bold text-xs font-mono rounded-lg transition-all btn-tactile shadow-sm uppercase tracking-wider cursor-pointer"
                >
                  <span>SUBMIT APPLICATION</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer & Return Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.08] text-xs font-mono text-ivory/50">
          <div>
            AI Club • {CLUB_INFO.institution} • Department of CSE & AI
          </div>
          <button
            onClick={handleReturn}
            className="inline-flex items-center gap-2 text-sage hover:text-ivory transition-colors cursor-pointer font-medium uppercase text-xs btn-tactile"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

