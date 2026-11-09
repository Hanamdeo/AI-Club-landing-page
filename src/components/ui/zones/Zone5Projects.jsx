'use client';

import React from 'react';
import Link from 'next/link';
import { Code, ArrowRight, ArrowDown, BarChart3, Github, ExternalLink, Cpu } from 'lucide-react';
import { ZONE_PROJECTS } from '@/data/clubData';
import { audioManager } from '@/utils/audioManager';

/**
 * Zone 05: Projects Zone
 * Project showcase displays.
 * Content revealed: Student projects and builds.
 */
export default function Zone5Projects({ onNextZone }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="relative bg-[#0D1214]/85 backdrop-blur-xl border border-white/[0.1] rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] corner-reticle">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-white/[0.08] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-sage">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse shadow-[0_0_8px_rgba(162,178,159,0.5)]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 05 // PROJECT ARCHIVE & HARDWARE BUILDS
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Code className="w-3 h-3 text-[#24BFEA]" />
            <span className="tracking-tight uppercase">
              32 SHIPPED REPOSITORIES • OPEN BENCHMARKS
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient-cyber tracking-tight mb-2">
            Student Projects & Builds
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-2xl leading-relaxed">
            Engineered systems designed, profiled, and benchmarked by undergraduate and graduate students across autonomous computing labs.
          </p>
        </div>

        {/* Project Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {ZONE_PROJECTS.projects.map((proj) => (
            <div
              key={proj.id}
              className="group relative p-5 sm:p-6 rounded-xl bg-black/25 border border-white/[0.08] hover:border-sage/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-mono font-semibold text-sage tracking-wider uppercase">
                    {proj.category}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-black/40 border border-white/[0.08] text-slate-400 font-medium">
                    {proj.state}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold text-ivory group-hover:text-sage transition-colors mb-2 tracking-tight">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-400 font-sans leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Benchmark / Metric Highlight */}
                <div className="flex items-center gap-2 px-3 py-1.5 mb-4 rounded-lg bg-black/30 border border-white/[0.06] text-xs font-mono font-semibold text-sage">
                  <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                  <span>{proj.metrics}</span>
                </div>
              </div>

              {/* Tech Stack & Links Footer */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {proj.techStack.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
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
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-sage hover:text-white transition-colors"
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
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects"
            onClick={() => audioManager.playClick()}
            className="flex items-center gap-2 text-xs font-mono text-[#24BFEA] hover:text-white transition-colors group"
          >
            <span>INSPECT ALL 32 SHIPPED REPOSITORIES</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {onNextZone && (
            <button
              onClick={() => {
                audioManager.playWhoosh();
                onNextZone();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>DESCEND TO DISCOVERY HUB</span>
              <ArrowDown className="w-3.5 h-3.5 text-sage" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
