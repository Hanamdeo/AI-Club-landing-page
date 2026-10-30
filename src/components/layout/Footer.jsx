'use client';

import React from 'react';
import { clubConfig } from '@/data/clubConfig';
import { Github, Twitter, Linkedin, MessageSquare, Mail, Terminal, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040608] border-t border-white/10 text-secondary overflow-hidden">
      {/* Top Hairline Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-phoenix-blue/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Identity Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-navy-surface border border-phoenix-blue/40 flex items-center justify-center">
                <span className="font-mono text-phoenix-cyan text-xs font-bold">PX</span>
              </div>
              <span className="font-display font-bold text-primary text-lg tracking-wider">
                {clubConfig.name}
              </span>
            </div>

            <p className="text-sm text-secondary max-w-sm font-sans leading-relaxed">
              Advancing artificial intelligence research through autonomous agents, low-level compilation, and critical dialectic. Building the future in the open.
            </p>

            <div className="text-xs font-mono text-secondary/80 space-y-1">
              <p>📍 {clubConfig.location}</p>
              <p>🏛️ {clubConfig.college}</p>
              <p className="text-phoenix-blue">● Status: {clubConfig.status}</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={clubConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-navy-deep border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-phoenix-blue/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={clubConfig.socials.discord}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-navy-deep border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-phoenix-blue/50 transition-colors"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={clubConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-navy-deep border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-phoenix-blue/50 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={clubConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-navy-deep border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-phoenix-blue/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${clubConfig.email}`}
                className="w-9 h-9 bg-navy-deep border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-phoenix-blue/50 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-5 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-phoenix-blue" />
              Index
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              <li><a href="#about" className="hover:text-phoenix-cyan transition-colors">01. Ethos & Pillars</a></li>
              <li><a href="#radar" className="hover:text-phoenix-cyan transition-colors">02. Research Radar</a></li>
              <li><a href="#events" className="hover:text-phoenix-cyan transition-colors">03. Arena Sprints</a></li>
              <li><a href="#gd-room" className="hover:text-phoenix-cyan transition-colors">04. The Dialectic</a></li>
              <li><a href="#gallery" className="hover:text-phoenix-cyan transition-colors">05. Visual Chronicles</a></li>
              <li><a href="#blog" className="hover:text-phoenix-cyan transition-colors">06. Dispatches</a></li>
              <li><a href="#team" className="hover:text-phoenix-cyan transition-colors">07. Research Council</a></li>
            </ul>
          </div>

          {/* Research Focus Areas Column */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-5">
              Focus Vectors
            </h4>
            <ul className="space-y-3 text-xs font-mono text-secondary">
              <li>• Test-Time Inference Search</li>
              <li>• Autonomous Agent Protocols</li>
              <li>• Embodied VLA Robotics</li>
              <li>• Bare-Metal WebGPU & Triton</li>
              <li>• Neuro-Symbolic Verification</li>
            </ul>
          </div>

          {/* Telemetry Specs & Back to top Column */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Telemetry
              </h4>
              <div className="p-4 bg-navy-deep/60 border border-white/5 space-y-2 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span className="text-secondary/60">Node Release:</span>
                  <span className="text-primary">v5.0.0-phx</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary/60">3D Asset:</span>
                  <span className="text-phoenix-cyan">Anatomical GLB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary/60">Render Core:</span>
                  <span className="text-emerald-400">R3F / Three.js</span>
                </div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-8 inline-flex items-center gap-2 text-xs font-mono text-secondary hover:text-phoenix-cyan transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Return to Apex [Top]</span>
            </button>
          </div>
        </div>

        {/* Bottom Legal & ASCII Crest */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-secondary/60">
          <p>© {new Date().getFullYear()} {clubConfig.name}. Designed & Built by Student Researchers.</p>
          <div className="flex items-center gap-3">
            <span className="text-phoenix-blue">▲</span>
            <span>INTELLIGENCE. IMAGINATION. IGNITED.</span>
            <span className="text-phoenix-orange">▲</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
