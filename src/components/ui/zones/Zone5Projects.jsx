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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 select-none font-sans">
      <div className="glass-panel p-6 sm:p-8 rounded-xl relative">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-5 border-b border-[rgba(150,230,255,0.16)] text-[10px] font-mono">
          <div className="flex items-center gap-2 text-[#55DFFF]">
            <span className="w-2 h-2 rounded-full bg-[#55DFFF] animate-pulse shadow-[0_0_8px_rgba(85,223,255,0.7)]" />
            <span className="font-bold tracking-widest uppercase">
              ZONE 05 // PROJECT ARCHIVE & HARDWARE BUILDS
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#B8C7D4]">
            <Code className="w-3.5 h-3.5 text-[#55DFFF]" />
            <span className="tracking-tight uppercase">
              32 SHIPPED REPOSITORIES • OPEN BENCHMARKS
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
            Student Projects & Builds
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(240,247,255,0.92)] font-sans max-w-2xl leading-[1.65] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Engineered systems designed, profiled, and benchmarked by undergraduate and graduate students across autonomous computing labs.
          </p>
        </div>

        {/* Project Showcase Open Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
          {ZONE_PROJECTS.projects.map((proj) => (
            <div
              key={proj.id}
              className="group relative glass-card p-5 sm:p-6 border-l-2 border-l-[#55DFFF] hover:border-l-[#55DFFF] flex flex-col justify-between"
            >
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-semibold text-[#55DFFF] tracking-wider uppercase">
                    {proj.category}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[rgba(85,223,255,0.08)] text-[#B8C7D4] border border-[rgba(150,230,255,0.16)]">
                    {proj.state}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-[#55DFFF] transition-colors mb-2 tracking-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[rgba(240,247,255,0.92)] font-sans leading-[1.65] mb-3.5">
                  {proj.description}
                </p>

                {/* Benchmark / Metric Highlight */}
                <div className="flex items-center gap-2 py-1 mb-3 text-xs font-mono font-semibold text-[#55DFFF]">
                  <BarChart3 className="w-3.5 h-3.5 text-[#55DFFF] shrink-0" />
                  <span>{proj.metrics}</span>
                </div>
              </div>

              {/* Tech Stack & Links Footer */}
              <div className="pt-3 border-t border-[rgba(150,230,255,0.14)] flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-[rgba(85,223,255,0.08)] text-[#B8C7D4] border border-[rgba(150,230,255,0.16)]"
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
                      className="p-1.5 rounded-lg bg-[rgba(5,12,18,0.50)] hover:bg-[rgba(85,223,255,0.15)] border border-[rgba(150,230,255,0.20)] text-[#B8C7D4] hover:text-[#55DFFF] transition-colors"
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
                      className="p-1.5 rounded-lg bg-[rgba(5,12,18,0.50)] hover:bg-[rgba(85,223,255,0.15)] border border-[rgba(150,230,255,0.20)] text-[#55DFFF] hover:text-white transition-colors"
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
        <div className="pt-4 border-t border-[rgba(150,230,255,0.16)] flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects"
            onClick={() => audioManager.playClick()}
            className="flex items-center gap-2 text-xs font-mono text-[#55DFFF] hover:text-white transition-colors group"
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
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card hover:border-[#55DFFF]/50 text-xs font-mono text-[#B8C7D4] hover:text-white transition-all cursor-pointer btn-tactile"
            >
              <span>DESCEND TO DISCOVERY HUB</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#55DFFF]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
