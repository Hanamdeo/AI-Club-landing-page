'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, ArrowUp, Github, Disc as Discord, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { ZONE_EXIT, CLUB_META } from '@/data/clubData';
import GlassPanel from '../GlassPanel';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 07: The Exit (Join AI Club & Future Outreach)
 * Transparent rounded architectural exit threshold interface at Z = -165.
 * High-impact Space Grotesk display typography with transparent card styling.
 */
export default function Zone7Exit({ onReturnTop }) {
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

  const handleReturn = () => {
    audioManager.playWhoosh();
    if (onReturnTop) onReturnTop();
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between p-6 md:p-12 lg:p-16 select-none font-sans">
      <div className="w-full max-w-5xl mx-auto my-auto py-8">
        <GlassPanel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Manifesto & Contact */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-sage/15 border border-sage/40 text-xs font-mono font-medium text-sage uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Involved</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-display font-bold text-ivory tracking-tight mb-3 drop-shadow-sm">
                  {ZONE_EXIT.motto}
                </h2>

                <p className="text-base text-ivory/80 leading-relaxed mb-6 font-normal font-sans">
                  {ZONE_EXIT.description}
                </p>

                {/* Facility Details & Affiliation */}
                <div className="p-5 rounded-2xl bg-black/15 border border-white/10 text-xs space-y-2 mb-6 font-mono">
                  <div className="text-slate-400">
                    Institution: <span className="text-ivory font-medium">{CLUB_META.institution}</span>
                  </div>
                  <div className="text-slate-400">
                    Contact: <span className="text-sage font-medium">{CLUB_META.contactEmail}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <span className="text-xs text-slate-400 block mb-3 font-mono uppercase tracking-wider">
                  Official Communication Channels
                </span>
                <div className="flex flex-wrap gap-2.5 font-sans">
                  <a
                    href={CLUB_META.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/20 border border-white/10 hover:border-sage/40 hover:bg-black/30 text-xs text-ivory/80 hover:text-sage transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={CLUB_META.socials.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/20 border border-white/10 hover:border-sage/40 hover:bg-black/30 text-xs text-ivory/80 hover:text-sage transition-all"
                  >
                    <Discord className="w-3.5 h-3.5" />
                    <span>Discord</span>
                  </a>
                  <a
                    href={CLUB_META.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/20 border border-white/10 hover:border-sage/40 hover:bg-black/30 text-xs text-ivory/80 hover:text-sage transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={CLUB_META.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/20 border border-white/10 hover:border-sage/40 hover:bg-black/30 text-xs text-ivory/80 hover:text-sage transition-all"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    <span>Twitter/X</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Application Form */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-black/15 border border-white/10">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in font-sans">
                  <div className="w-14 h-14 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center mb-4">
                    <CheckCircle className="w-7 h-7 text-sage" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-ivory mb-2">
                    Application Received
                  </h3>
                  <p className="text-sm text-ivory/80 max-w-sm mb-6 leading-relaxed">
                    Welcome aboard, {formData.name}. Our admissions & domain cohort will review your dossier and dispatch onboarding credentials via email.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        domain: ZONE_EXIT.formFields[2].options[0],
                        portfolio: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-black/30 border border-white/15 text-xs text-ivory hover:text-sage font-medium transition-all"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-white/10 pb-3 mb-4">
                    <h3 className="text-lg font-display font-bold text-ivory tracking-tight">
                      Cohort Application
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-sans">
                      Open to all undergraduate & graduate researchers
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/15 focus:border-sage text-ivory text-sm placeholder:text-slate-500 focus:outline-none transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wide">
                      Institution Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/15 focus:border-sage text-ivory text-sm placeholder:text-slate-500 focus:outline-none transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wide">
                      Primary Domain of Interest
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/15 focus:border-sage text-ivory text-sm focus:outline-none transition-colors font-sans"
                    >
                      {ZONE_EXIT.formFields[2].options.map((opt, i) => (
                        <option key={i} value={opt} className="bg-graphite text-ivory">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wide">
                      GitHub / Portfolio Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/15 focus:border-sage text-ivory text-sm placeholder:text-slate-500 focus:outline-none transition-colors font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-4 bg-sage hover:bg-sage-glow text-graphite font-display font-semibold text-xs rounded-xl transition-all shadow-sage-glow cursor-pointer tracking-wider uppercase"
                  >
                    <span>SUBMIT MEMBERSHIP APPLICATION</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* Return to Entrance Button & Legal Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-slate-400 max-w-5xl mx-auto w-full">
        <div>{ZONE_EXIT.footerNote}</div>
        <button
          onClick={handleReturn}
          className="flex items-center gap-2 text-sage hover:text-sage-glow transition-colors cursor-pointer pointer-events-auto font-mono text-xs uppercase"
        >
          <span>Return to Entrance</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
