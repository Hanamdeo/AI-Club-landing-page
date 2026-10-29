'use client';

import React from 'react';
import { clubConfig } from '@/data/clubConfig';
import { Github, Twitter, Linkedin, MessageSquare, Mail, Terminal, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05070A] border-t border-cyan-500/20 text-gray-400 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-phoenix-cyan/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-surface-100 border border-cyan-500/30 flex items-center justify-center">
                <span className="font-mono text-phoenix-cyan text-xs font-bold">PX</span>
              </div>
              <span className="font-display font-extrabold text-white text-lg tracking-wider">
                {clubConfig.name}
              </span>
            </div>

            <p className="text-sm text-gray-400 max-w-sm font-sans leading-relaxed">
              Advancing human curiosity and engineering intelligence through autonomous systems, low-level compilers, applied machine learning, and critical dialectic.
            </p>

            <div className="pt-2 text-xs font-mono text-gray-500 space-y-1">
              <p>📍 {clubConfig.location}</p>
              <p>🏛️ {clubConfig.college}</p>
              <p className="text-phoenix-cyan">● Node Status: {clubConfig.status}</p>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href={clubConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded bg-surface-100 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-surface-50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={clubConfig.socials.discord}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded bg-surface-100 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-surface-50 transition-colors"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={clubConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded bg-surface-100 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-surface-50 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={clubConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded bg-surface-100 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-surface-50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${clubConfig.email}`}
                className="w-9 h-9 rounded bg-surface-100 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-surface-50 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-phoenix-cyan" />
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li><a href="#about" className="hover:text-phoenix-cyan transition-colors">01. Mission & Pillars</a></li>
              <li><a href="#radar" className="hover:text-phoenix-cyan transition-colors">02. Research Radar</a></li>
              <li><a href="#events" className="hover:text-phoenix-cyan transition-colors">03. Event Schedule</a></li>
              <li><a href="#gd-room" className="hover:text-phoenix-cyan transition-colors">04. The GD Arena</a></li>
              <li><a href="#projects" className="hover:text-phoenix-cyan transition-colors">05. Project Showcase</a></li>
              <li><a href="#gallery" className="hover:text-phoenix-cyan transition-colors">06. Visual Archives</a></li>
            </ul>
          </div>

          {/* Research & Lab */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
              Focus Areas
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-gray-400">
              <li><span className="text-gray-500">•</span> Test-Time Search & PRMs</li>
              <li><span className="text-gray-500">•</span> Autonomous Agent Protocols</li>
              <li><span className="text-gray-500">•</span> Vision SLAM & Robotics</li>
              <li><span className="text-gray-500">•</span> Bare-Metal WebGPU & Triton</li>
              <li><span className="text-gray-500">•</span> Neuro-Symbolic Verification</li>
            </ul>
          </div>

          {/* System Telemetry & Back to top */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
                Telemetry
              </h4>
              <div className="p-3 rounded bg-surface-200/50 border border-white/5 space-y-2 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-500">Node Release:</span>
                  <span className="text-gray-300">v4.2.0-phx</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">WebGL Core:</span>
                  <span className="text-emerald-400">Three.js / R3F</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Latency:</span>
                  <span className="text-phoenix-cyan">&lt; 16ms render</span>
                </div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-phoenix-cyan transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Return to Apex [Top]</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar with Phoenix ASCII signature */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>© {new Date().getFullYear()} {clubConfig.name}. Designed & Engineered by AI Club Members.</p>
          <div className="flex items-center gap-3">
            <span className="text-phoenix-cyan">▲</span>
            <span>RISE THROUGH INTELLIGENCE</span>
            <span className="text-phoenix-ember">▲</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
