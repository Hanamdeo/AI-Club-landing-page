'use client';

import React from 'react';
import Link from 'next/link';
import { Code, ArrowRight, ArrowDown, BarChart3, Github, ExternalLink } from 'lucide-react';
import { ZONE_PROJECTS } from '@/data/clubData';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 05: Projects Zone
 * Open architectural HUD project showcase.
 * Content revealed: Student projects and builds.
 */
export default function Zone5Projects({ onNextZone }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-none font-sans safe-viewport-card custom-scrollbar pointer-events-auto">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative shadow-[0_16px_48px_rgba(0,0,0,0.65)]">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-white/[0.12] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 05 // PROJECT ARCHIVE & HARDWARE BUILDS
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Code className="w-3.5 h-3.5 text-white" />
            <span className="tracking-tight uppercase">
              32 SHIPPED REPOSITORIES • OPEN BENCHMARKS
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Student Projects & Builds
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 font-sans max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Engineered systems designed, profiled, and benchmarked by undergraduate and graduate students across autonomous computing labs.
          </p>
        </div>

        {/* Project Showcase Frosted Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6">
          {ZONE_PROJECTS.projects.map((proj) => (
            <div
              key={proj.id}
              className="group relative rounded-xl p-5 sm:p-6 glass-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-bold text-white tracking-wider uppercase">
                    {proj.category}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-white/[0.10] text-slate-200 border border-white/20">
                    {proj.state}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-slate-100 transition-colors mb-2 tracking-tight drop-shadow-sm">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-200 font-sans leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Benchmark / Metric Highlight */}
                <div className="flex items-center gap-2 py-1 mb-4 text-xs font-mono font-semibold text-slate-300">
                  <BarChart3 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{proj.metrics}</span>
                </div>
              </div>

              {/* Tech Stack & Links Footer */}
              <div className="pt-3 border-t border-white/[0.10] flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.08] text-slate-200 border border-white/[0.12]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0 pointer-events-auto">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.2] text-slate-200 hover:text-white transition-colors"
                      aria-label="View source code"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {proj.liveDemo && (
                    <a
                      href={proj.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.2] text-slate-200 hover:text-white transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-white/[0.12] flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects"
            onClick={() => audioManager.playClick()}
            className="flex items-center gap-2 text-xs font-mono text-slate-200 hover:text-white transition-colors group pointer-events-auto"
          >
            <span className="font-semibold">INSPECT ALL 32 SHIPPED REPOSITORIES</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {onNextZone && (
            <button
              onClick={() => {
                audioManager.playWhoosh();
                onNextZone();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.18] text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/20 btn-tactile pointer-events-auto"
            >
              <span>DESCEND TO DISCOVERY HUB</span>
              <ArrowDown className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
