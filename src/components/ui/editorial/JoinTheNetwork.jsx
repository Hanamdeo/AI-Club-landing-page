'use client';

import React, { useState } from 'react';
import {
  Send,
  CheckCircle,
  Github,
  Disc as Discord,
  Linkedin,
  Twitter,
  Sparkles,
  ArrowUp,
  Cpu,
  Layers,
  BookOpen,
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
    <section id="join-network" className="relative w-full py-24 px-6 md:px-12 lg:px-16 border-t border-white/10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-sage/15 border border-sage/40 text-xs font-mono font-semibold text-sage uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 09 // Cohort Intake</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-ivory tracking-tight">
            JOIN THE NETWORK
          </h2>
          <p className="text-base sm:text-lg text-sage/90 font-light mt-2 max-w-2xl">
            Whether you want to optimize GPU memory pipelines, construct novel multi-modal architectures, or manage national hackathons, your curiosity belongs here.
          </p>
        </div>

        {/* Benefits & Domains Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Why Join & Available Domains */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-charcoal/40 border border-white/10 shadow-glass-panel">
                <h3 className="text-lg font-bold text-ivory mb-2 tracking-tight">
                  Why Join the AI Club?
                </h3>
                <ul className="space-y-2.5 text-xs text-ivory/80 leading-relaxed font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-ivory">Direct GPU Compute:</strong> Access our 8x H100 SXM5 & RTX 4090 cluster for reproducible student model training.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-ivory">Reproducible Research:</strong> Co-author preprints, build benchmarks, and submit papers to top workshops.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-ivory">Open Engineering:</strong> Ship production-grade open source tools and libraries with verified benchmarks.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Available Domains Overview */}
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                  Available Research & Engineering Tracks:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CLUB_INFO.domains.map((dom) => (
                    <div
                      key={dom.id}
                      className="p-3.5 rounded-xl bg-black/25 border border-white/10 hover:border-sage/40 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-ivory">{dom.name}</span>
                        <span className="text-[9px] font-mono text-sage">{dom.badge}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {dom.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Official Communication Links */}
            <div className="pt-6 border-t border-white/10 mt-6">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                Official Channels
              </span>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={CLUB_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/25 border border-white/10 hover:border-sage/40 text-xs text-ivory/80 hover:text-sage transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={CLUB_INFO.socials.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/25 border border-white/10 hover:border-sage/40 text-xs text-ivory/80 hover:text-sage transition-all"
                >
                  <Discord className="w-3.5 h-3.5" />
                  <span>Discord</span>
                </a>
                <a
                  href={CLUB_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/25 border border-white/10 hover:border-sage/40 text-xs text-ivory/80 hover:text-sage transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={CLUB_INFO.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/25 border border-white/10 hover:border-sage/40 text-xs text-ivory/80 hover:text-sage transition-all"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>Twitter/X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Application Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-charcoal/40 border border-white/10 shadow-glass-panel">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-sage" />
                </div>
                <h3 className="text-2xl font-bold text-ivory mb-2 tracking-tight">
                  Application Logged
                </h3>
                <p className="text-sm text-ivory/80 max-w-sm mb-6 leading-relaxed">
                  Welcome to the evaluation queue, {formData.name}. Our research coordinators and admissions committee will review your dossier and dispatch onboarding credentials to {formData.email}.
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
                  className="px-5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-ivory hover:text-sage font-medium transition-all"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-white/10 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-ivory tracking-tight">
                    Candidate Dossier
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">
                    Open to all undergraduate & graduate cohorts
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/15 focus:border-sage text-ivory text-sm placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                    Institution Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/15 focus:border-sage text-ivory text-sm placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                    Primary Domain of Interest
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/15 focus:border-sage text-ivory text-sm focus:outline-none transition-colors"
                  >
                    {CLUB_INFO.domains.map((dom) => (
                      <option key={dom.id} value={dom.name} className="bg-graphite text-ivory">
                        {dom.name} ({dom.badge})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                    GitHub / Portfolio Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/15 focus:border-sage text-ivory text-sm placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                    Statement of Curiosity / Intent
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What questions, models, or systems are you excited to build with the AI Club?"
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/15 focus:border-sage text-ivory text-sm placeholder:text-slate-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-4 bg-sage hover:bg-sage-glow text-graphite font-bold text-xs rounded-xl transition-all shadow-sage-glow cursor-pointer tracking-wider uppercase"
                >
                  <span>SUBMIT APPLICATION</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer & Return Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-slate-400">
          <div>
            AI Club • {CLUB_INFO.institution} • Department of CSE & AI
          </div>
          <button
            onClick={handleReturn}
            className="flex items-center gap-2 text-sage hover:text-sage-glow transition-colors cursor-pointer font-semibold uppercase text-xs"
          >
            <span>Return to Facility Entrance</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

