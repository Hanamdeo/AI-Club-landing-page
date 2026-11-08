'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Send,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  FileText,
} from 'lucide-react';
import { audioManager } from '@/utils/audioManager';

export default function JoinPage() {
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
    'Computer Vision & 3D WebGPU',
    'Embodied AI & Robotics',
    'Operations & Competitive Hackathons',
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
    <main className="relative min-h-screen bg-[#0A0E10] text-[#E6E2D8] font-sans pt-28 pb-24 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-facility-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 font-mono text-[10px] text-slate-400 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#A7B7A1] transition-colors">
            FACILITY
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-signal-green font-semibold">RECRUITMENT // INTAKE</span>
        </div>

        {/* Master Page Header */}
        <div className="border-b border-white/[0.08] pb-8 mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-full bg-[#131718] border border-white/[0.1] text-[10px] font-mono tracking-widest text-[#A7B7A1] uppercase">
            <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse shadow-[0_0_8px_#22C55E]" />
            <span>ANNUAL COHORT RECRUITMENT CYCLE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-labeouf font-bold tracking-wider text-gradient-cyber leading-none">
            JOIN THE COLLECTIVE
          </h1>
          <p className="text-sm sm:text-base text-[#B5B8AF] font-normal mt-3 max-w-xl leading-relaxed">
            Apply for research clearance to join AI Club at Madhav Institute of Technology & Science.
          </p>
        </div>

        {submitted ? (
          /* Submission Success Clearance Card */
          <div className="p-8 sm:p-10 rounded-3xl bg-[#121617]/95 border border-signal-green/40 shadow-[0_8px_32px_rgba(34,197,94,0.2)] text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-signal-green/20 border border-signal-green/50 flex items-center justify-center mx-auto mb-6 text-signal-green shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono text-signal-green uppercase tracking-widest block mb-2 font-bold">
              APPLICATION FILED // VERIFICATION PENDING
            </span>

            <h2 className="text-2xl sm:text-3xl font-labeouf font-bold text-ivory mb-4">
              WELCOME, {formData.fullName.toUpperCase()}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-md mx-auto mb-6 leading-relaxed">
              Your application has been logged into the AI Club research database. Your clearance dossier ID is:
            </p>

            <div className="inline-block p-4 px-8 rounded-2xl bg-[#0D1011] border border-white/[0.1] font-mono text-xl sm:text-2xl font-bold text-[#24BFEA] tracking-widest mb-8 shadow-inner">
              {clearanceId}
            </div>

            <div className="text-xs font-mono text-slate-400 space-y-1 mb-8">
              <p>Domain: <span className="text-ivory font-semibold">{formData.domain}</span></p>
              <p>Email: <span className="text-ivory font-semibold">{formData.email}</span></p>
            </div>

            <div className="flex justify-center gap-4">
              <Link
                href="/"
                className="px-6 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-mono text-ivory transition-colors"
              >
                RETURN TO 3D FACILITY
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-signal-green hover:bg-[#16A34A] text-black text-xs font-mono font-bold transition-colors"
              >
                NEW APPLICATION
              </button>
            </div>
          </div>
        ) : (
          /* Intake Form */
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl bg-[#121617]/90 border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.5)] space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                  Full Name <span className="text-signal-green">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#0D1011] border border-white/[0.08] focus:border-signal-green/60 rounded-xl px-4 py-3 text-xs font-mono text-ivory placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Enrollment Number */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                  Enrollment Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 0901CS221045"
                  value={formData.enrollment}
                  onChange={(e) => setFormData({ ...formData, enrollment: e.target.value })}
                  className="w-full bg-[#0D1011] border border-white/[0.08] focus:border-signal-green/60 rounded-xl px-4 py-3 text-xs font-mono text-ivory placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                  College / Personal Email <span className="text-signal-green">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@mitsgwalior.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0D1011] border border-white/[0.08] focus:border-signal-green/60 rounded-xl px-4 py-3 text-xs font-mono text-ivory placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>

              {/* GitHub / Portfolio */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                  GitHub Profile / Portfolio URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full bg-[#0D1011] border border-white/[0.08] focus:border-signal-green/60 rounded-xl px-4 py-3 text-xs font-mono text-ivory placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Preferred Domain */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                Preferred Engineering Track / Domain
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {domains.map((dom) => (
                  <button
                    key={dom}
                    type="button"
                    onClick={() => {
                      try { audioManager.playClick(); } catch {}
                      setFormData({ ...formData, domain: dom });
                    }}
                    className={`p-3 rounded-xl text-xs font-mono text-left transition-all border ${
                      formData.domain === dom
                        ? 'bg-signal-green/15 text-signal-green border-signal-green/60 font-semibold shadow-[0_0_12px_rgba(34,197,94,0.2)]'
                        : 'bg-[#0D1011] text-slate-400 hover:text-white border-white/[0.06]'
                    }`}
                  >
                    {dom}
                  </button>
                ))}
              </div>
            </div>

            {/* Statement of Interest */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                Why do you want to join AI Club? (Projects, interests, ideas)
              </label>
              <textarea
                rows={4}
                placeholder="Mention what machine learning topics, models, or systems you want to build or research..."
                value={formData.statement}
                onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                className="w-full bg-[#0D1011] border border-white/[0.08] focus:border-signal-green/60 rounded-xl p-4 text-xs font-mono text-ivory placeholder:text-slate-600 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-signal-green hover:bg-[#16A34A] text-[#0A0E10] text-xs font-mono font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>SUBMIT CLEARANCE DOSSIER</span>
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
