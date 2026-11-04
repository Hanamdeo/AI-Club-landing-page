'use client';

import React from 'react';
import { Github, Linkedin, Shield } from 'lucide-react';
import { ZONE_TEAM } from '@/data/clubData';
import GlassPanel from '../GlassPanel';

/**
 * Zone 06: Community Hub (Team & Leadership)
 * Transparent rounded collaborative engineering lounge interface at Z = -135.
 * High-impact Space Grotesk display typography with transparent card styling.
 */
export default function Zone6Community() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-16">
      <div className="w-full max-w-6xl">
        <GlassPanel>
          {/* Section Header */}
          <div className="mb-6 border-b border-white/10 pb-5">
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-ivory tracking-tight drop-shadow-sm">
              {ZONE_TEAM.heading}
            </h2>
            <p className="text-base sm:text-lg text-sage/90 font-light mt-1.5 tracking-wide font-sans">
              {ZONE_TEAM.subheading}
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {ZONE_TEAM.members.map((member, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-black/15 border border-white/10 hover:border-sage/40 hover:bg-black/25 transition-all flex items-start gap-4"
              >
                {/* Monogram Avatar Badge */}
                <div className="w-12 h-12 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center text-sm font-mono font-bold text-sage shrink-0">
                  {member.initials}
                </div>

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-display font-bold text-ivory truncate tracking-tight">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono font-medium text-sage/90 truncate mt-0.5">
                    {member.role}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-1 font-sans">
                    {member.domain}
                  </div>

                  {/* Social Handles */}
                  <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-white/10">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-sage transition-colors"
                        aria-label="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-sage transition-colors"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Transparency Notice */}
          <div className="p-3.5 rounded-xl bg-black/15 border border-white/10 flex items-center gap-2.5 text-xs text-slate-300 font-sans">
            <Shield className="w-4 h-4 text-sage shrink-0" />
            <span>{ZONE_TEAM.notice}</span>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
