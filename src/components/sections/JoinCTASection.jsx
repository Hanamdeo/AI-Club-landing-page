'use client';

import React, { useState } from 'react';
import { clubConfig } from '@/data/clubConfig';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Terminal, 
  ArrowRight, 
  Cpu, 
  Users, 
  Send 
} from 'lucide-react';

export function JoinCTASection({ isModalOpen, setIsModalOpen }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    track: 'technical',
    experience: '',
    github: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      studentId: '',
      track: 'technical',
      experience: '',
      github: '',
    });
    setIsModalOpen(false);
  };

  return (
    <section id="join-cta" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#06080C] border-t border-cyan-500/20 overflow-hidden">
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-t from-phoenix-blue/20 via-phoenix-cyan/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-phoenix-ember/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-8 z-20">
        {/* Recruitment Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-phoenix-cyan text-xs font-mono tracking-wider shadow-glow-cyan/20">
          <span className="w-2 h-2 rounded-full bg-phoenix-cyan animate-ping" />
          <span>OFFICIAL CALL // COHORT {clubConfig.cohort} LIVE</span>
        </div>

        {/* Grand Headline */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.05]">
            IGNITE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-phoenix-cyan via-white to-phoenix-ember">
              POTENTIAL
            </span>.
          </h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Step into the arena. Whether training neural models on dedicated clusters, debating algorithmic ethics, or building autonomous agents—your flight begins with PHOENIX.
          </p>
        </div>

        {/* Dual Recruitment Tracks Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto pt-4">
          <div className="p-6 rounded-xl bg-surface-100/90 border border-cyan-500/30 hover:border-phoenix-cyan transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-phoenix-cyan font-mono text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Track A // Technical & Research</span>
              </div>
              <span className="text-[10px] font-mono bg-cyan-950/60 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/40">
                Pod Auditions
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              PyTorch architecture development, custom CUDA kernel writing, RLHF process supervision, and national hackathon strike teams.
            </p>
            <div className="text-[11px] font-mono text-gray-400">
              Prerequisites: Python, Linear Algebra, Hunger to build.
            </div>
          </div>

          <div className="p-6 rounded-xl bg-surface-100/90 border border-orange-500/30 hover:border-phoenix-ember transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-phoenix-ember font-mono text-xs font-bold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Track B // Dialectic & Operations</span>
              </div>
              <span className="text-[10px] font-mono bg-orange-950/60 text-orange-300 px-2 py-0.5 rounded border border-orange-800/40">
                Open Cohort
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              Group discussion moderation, campus AI symposium logistics, technical writing, design engineering, and community building.
            </p>
            <div className="text-[11px] font-mono text-gray-400">
              Prerequisites: Critical thinking, communication, enthusiasm.
            </div>
          </div>
        </div>

        {/* Main CTA Button Trigger */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            icon={Sparkles}
            onClick={() => setIsModalOpen(true)}
            className="text-sm px-8 py-4 shadow-[0_0_30px_rgba(0,240,255,0.4)]"
          >
            Apply For Membership Now
          </Button>
          <Button
            variant="secondary"
            size="lg"
            icon={ArrowRight}
            href="#radar"
          >
            Explore Research Radar
          </Button>
        </div>

        <div className="pt-2 text-xs font-mono text-gray-500 flex items-center justify-center gap-2">
          <Flame className="w-3.5 h-3.5 text-phoenix-ember" />
          <span>Rolling admissions for Fall/Winter 2026. All collegiate years welcome.</span>
        </div>
      </div>

      {/* Interactive Application Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="PHOENIX AI CLUB // MEMBERSHIP APPLICATION"
        subtitle={`Cohort ${clubConfig.cohort} • University Verification Required`}
      >
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-display font-bold text-white">Application Dispatched!</h4>
            <p className="text-sm text-gray-300 font-sans max-w-md mx-auto leading-relaxed">
              Welcome, <strong className="text-phoenix-cyan">{formData.name}</strong>. Your membership dossier has been logged into our admissions queue. An invite to the Phoenix Discord lounge and technical onboarding schedule has been sent to <strong className="text-white">{formData.email}</strong>.
            </p>
            <div className="pt-4">
              <Button variant="primary" size="md" onClick={handleReset}>
                Done / Close Dossier
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded bg-surface-200 border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-phoenix-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1.5">
                  College / Institutional Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded bg-surface-200 border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-phoenix-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1.5">
                  Roll / Student ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2024-CS-084"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded bg-surface-200 border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-phoenix-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1.5">
                  Target Application Track *
                </label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded bg-surface-200 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-phoenix-cyan"
                >
                  <option value="technical">Track A: Technical & Research Pods</option>
                  <option value="operations">Track B: GD Dialectic & Operations</option>
                  <option value="hackathons">Track C: Competitive Hackathon Strike Team</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-300 uppercase mb-1.5">
                GitHub / Portfolio URL (Optional but encouraged)
              </label>
              <input
                type="url"
                placeholder="https://github.com/yourhandle"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded bg-surface-200 border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-phoenix-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-300 uppercase mb-1.5">
                Why do you want to join PHOENIX? (Brief) *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tell us what AI vectors excite you, what you've tinkered with, or what you want to build..."
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded bg-surface-200 border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-phoenix-cyan"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500">
                🔒 Data stored privately for club admissions only.
              </span>
              <Button variant="primary" size="md" icon={Send} type="submit">
                Transmit Application
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
}

