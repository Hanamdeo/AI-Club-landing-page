'use client';

import React from 'react';
import { Archive, Github, ExternalLink, BarChart3 } from 'lucide-react';
import { ZONE_PROJECTS } from '@/data/clubData';
import GlassPanel from '../GlassPanel';

/**
 * Zone 05: Project Archive (Student Projects & Open-Source)
 * Transparent rounded project showcase interface at Z = -105.
 * Clean, human-readable typography without pseudo-code prefixes.
 */
export default function Zone5Archive() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-16">
      <div className="w-full max-w-6xl">
        <GlassPanel>
          {/* Section Header */}
          <div className="mb-6 border-b border-slate-struct/30 pb-5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-ivory tracking-tight drop-shadow-sm font-sans">
              {ZONE_PROJECTS.heading}
            </h2>
            <p className="text-base sm:text-lg text-sage/90 font-light mt-1.5 tracking-wide">
              {ZONE_PROJECTS.subheading}
            </p>
          </div>

          {/* Project Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ZONE_PROJECTS.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-2xl bg-charcoal/20 backdrop-blur-xs border border-slate-struct/35 hover:border-sage/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-sage tracking-wide uppercase">
                      {proj.category}
                    </span>
                    <span className="px-3 py-0.5 text-[11px] rounded-full bg-charcoal/40 border border-slate-struct/40 text-ivory/80 font-medium">
                      {proj.state}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-ivory mb-2 tracking-tight">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-ivory/80 leading-relaxed mb-4 font-normal">
                    {proj.description}
                  </p>

                  {/* Benchmark / Metric Highlight with Normal Numbers */}
                  <div className="flex items-center gap-2 px-3.5 py-2 mb-4 rounded-xl bg-charcoal/30 border border-slate-struct/30 text-xs font-semibold text-sage num-normal">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>{proj.metrics}</span>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-[11px] font-medium rounded-full bg-charcoal/40 border border-slate-struct/30 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Action Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-struct/35">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-ivory/80 hover:text-sage transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}

                  {proj.liveDemo && (
                    <a
                      href={proj.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage hover:text-sage-glow transition-colors ml-auto"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Preview</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
