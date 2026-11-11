'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Code, ArrowRight, ArrowDown, BarChart3, Github, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 05: Projects Zone
 * Open architectural HUD project showcase.
 * Content revealed: Student projects and builds.
 */
export default function Zone5Projects({ onNextZone }) {
  const featuredProjects = useMemo(() => PROJECTS.slice(0, 4), []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-text font-sans safe-viewport-card custom-scrollbar pointer-events-auto">
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
              5 FEATURED BUILDS • 32 SHIPPED REPOSITORIES
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
          {featuredProjects.map((proj) => {
            const primaryBenchmark = proj.benchmarks?.[0];

            return (
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
                      {proj.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-slate-100 transition-colors mb-2 leading-snug drop-shadow-sm">
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-200 font-sans leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.08] text-slate-300 border border-white/10 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benchmark Metric & Action Links Footer */}
                <div className="pt-3 border-t border-white/[0.10] flex items-center justify-between gap-3">
                  {primaryBenchmark ? (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-white font-medium">
                      <BarChart3 className="w-3.5 h-3.5 text-white" />
                      <span>{primaryBenchmark.value}</span>
                    </div>
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center gap-2">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.18] text-white border border-white/20 hover:border-white/50 transition-all pointer-events-auto"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {proj.liveDemo && (
                      <a
                        href={proj.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.18] text-white border border-white/20 hover:border-white/50 transition-all pointer-events-auto"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-white/[0.12] flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects"
            onClick={() => audioManager.playClick()}
            className="flex items-center gap-2 text-xs font-mono text-slate-200 hover:text-white transition-colors group pointer-events-auto"
          >
            <span className="font-semibold">EXPLORE ALL SHIPPED REPOSITORIES</span>
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
              <span>DESCEND TO INTAKE & DISCOVERY</span>
              <ArrowDown className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
