'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, ArrowUp, Github, Disc as Discord, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { ZONE_EXIT, CLUB_META } from '@/data/clubData';
import GlassPanel from '../GlassPanel';

/**
 * Zone 07: The Exit (Join AI Club & Future Outreach)
 * Transparent rounded architectural exit threshold interface at Z = -165.
 * Clean, human-readable typography without pseudo-code prefixes.
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
      setSubmitted(true);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between p-6 md:p-12 lg:p-16 select-none font-sans">
      <div className="w-full max-w-5xl mx-auto my-auto py-8">
        <GlassPanel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Manifesto & Contact */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-sage/15 border border-sage/40 text-xs font-medium text-sage">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Involved</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-ivory tracking-tight mb-3 drop-shadow-sm">
                  {ZONE_EXIT.motto}
                </h2>

                <p className="text-base text-ivory/80 leading-relaxed mb-6 font-normal">
                  {ZONE_EXIT.description}
                </p>

                {/* Facility Details & Affiliation */}
                <div className="p-5 rounded-2xl bg-charcoal/20 backdrop-blur-xs border border-slate-struct/35 text-xs space-y-2 mb-6">
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
                <span className="text-xs text-slate-400 block mb-3 font-medium uppercase tracking-wider">
                  Community & Socials
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={CLUB_META.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-charcoal/30 border border-slate-struct/40 hover:border-sage text-ivory/80 hover:text-sage transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={CLUB_META.socials.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-charcoal/30 border border-slate-struct/40 hover:border-sage text-ivory/80 hover:text-sage transition-all"
                    aria-label="Discord"
                  >
                    <Discord className="w-4 h-4" />
                  </a>
                  <a
                    href={CLUB_META.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-charcoal/30 border border-slate-struct/40 hover:border-sage text-ivory/80 hover:text-sage transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={CLUB_META.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-charcoal/30 border border-slate-struct/40 hover:border-sage text-ivory/80 hover:text-sage transition-all"
                    aria-label="Twitter / X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Join Application Form */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-charcoal/20 backdrop-blur-xs border border-slate-struct/35">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-sage/20 border border-sage flex items-center justify-center text-sage mb-4 shadow-sage-glow">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-ivory mb-2 tracking-tight">
                    Application Received
                  </h3>
                  <p className="text-sm text-sage max-w-xs mb-6">
                    Thank you for applying. Our team will review your application and reach out via email.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 text-xs font-semibold bg-charcoal/40 border border-slate-struct/40 hover:border-sage text-ivory rounded-xl transition-colors tracking-wide"
                  >
                    SUBMIT ANOTHER INTAKE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-struct/40 pb-3">
                    <h3 className="text-xl font-bold text-ivory tracking-tight">
                      Join the AI Club
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Become part of our research and engineering cohorts
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal/50 border border-slate-struct/50 focus:border-sage text-ivory text-sm placeholder:text-slate-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wide">
                      College Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal/50 border border-slate-struct/50 focus:border-sage text-ivory text-sm placeholder:text-slate-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wide">
                      Primary Domain of Interest
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal/50 border border-slate-struct/50 focus:border-sage text-ivory text-sm focus:outline-none transition-colors"
                    >
                      {ZONE_EXIT.formFields[2].options.map((opt, i) => (
                        <option key={i} value={opt} className="bg-graphite text-ivory">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wide">
                      GitHub / Portfolio Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal/50 border border-slate-struct/50 focus:border-sage text-ivory text-sm placeholder:text-slate-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-4 bg-sage hover:bg-sage-glow text-graphite font-semibold text-xs rounded-xl transition-all shadow-sage-glow cursor-pointer tracking-wider"
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-struct/30 text-xs text-slate-400 max-w-5xl mx-auto w-full">
        <div>{ZONE_EXIT.footerNote}</div>
        <button
          onClick={onReturnTop}
          className="flex items-center gap-2 text-sage hover:text-sage-glow transition-colors cursor-pointer pointer-events-auto font-medium"
        >
          <span>Return to Entrance</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
