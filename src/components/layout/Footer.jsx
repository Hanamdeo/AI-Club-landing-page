'use client';

import React from 'react';
import Link from 'next/link';
import { clubConfig } from '@/data/clubConfig';
import { Github, Twitter, Linkedin, MessageSquare, Mail, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRecruitmentOpen = clubConfig.recruitment?.isOpen;

  return (
    <footer className="relative bg-[#050507] border-t border-[rgba(72,189,232,0.14)] text-text-muted overflow-hidden">
      {/* Top Hairline Circuit Cyan Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-circuit-cyan/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Identity Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="h-9 w-auto flex items-center justify-center transition-all duration-300">
                <img
                  src="/logo.png"
                  alt="AI CLUB"
                  className="h-9 w-auto object-contain transition-all duration-300 group-hover:[filter:drop-shadow(0_0_8px_rgba(72,189,232,0.35))]"
                />
              </div>
              <span className="font-display font-bold text-text-primary text-lg tracking-tight uppercase group-hover:text-circuit-cyan transition-colors">
                AI CLUB
              </span>
            </Link>

            <p className="text-sm text-text-muted max-w-sm font-sans leading-relaxed">
              Advancing artificial intelligence research through high-agency autonomous systems, low-level CUDA kernel compilation, and empirical dialectics. Constructing cyber-systems in the open.
            </p>

            <div className="text-xs font-mono text-text-muted/80 space-y-1">
              <p>📍 {clubConfig.location}</p>
              <p>🏛️ {clubConfig.college}</p>
              <p className="text-circuit-cyan">● Status: {clubConfig.status}</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={clubConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-[#0C0F14] border border-[rgba(72,189,232,0.14)] rounded-[4px] flex items-center justify-center text-text-muted hover:text-circuit-cyan hover:border-circuit-cyan transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={clubConfig.socials.discord}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-[#0C0F14] border border-[rgba(72,189,232,0.14)] rounded-[4px] flex items-center justify-center text-text-muted hover:text-circuit-cyan hover:border-circuit-cyan transition-all duration-200"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={clubConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-[#0C0F14] border border-[rgba(72,189,232,0.14)] rounded-[4px] flex items-center justify-center text-text-muted hover:text-circuit-cyan hover:border-circuit-cyan transition-all duration-200"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={clubConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-[#0C0F14] border border-[rgba(72,189,232,0.14)] rounded-[4px] flex items-center justify-center text-text-muted hover:text-circuit-cyan hover:border-circuit-cyan transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${clubConfig.email}`}
                className="w-9 h-9 bg-[#0C0F14] border border-[rgba(72,189,232,0.14)] rounded-[4px] flex items-center justify-center text-text-muted hover:text-circuit-cyan hover:border-circuit-cyan transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-text-primary font-bold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              {clubConfig.navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-circuit-cyan transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-circuit-cyan/40 group-hover:text-circuit-cyan font-mono text-xs">/</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Pillars */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-text-primary font-bold">
              Domains
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li className="hover:text-circuit-cyan transition-colors">
                Autonomous Agents & Swarms
              </li>
              <li className="hover:text-circuit-cyan transition-colors">
                Custom CUDA Kernel Profiling
              </li>
              <li className="hover:text-circuit-cyan transition-colors">
                Model Interpretability & Audit
              </li>
              <li className="hover:text-circuit-cyan transition-colors">
                Dialectics & Alignment Debates
              </li>
            </ul>
          </div>

          {/* Technical Telemetry & Node Status */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-text-primary font-bold">
              Node Telemetry
            </h4>
            <div className="p-4 bg-[#0C0F14] border border-[rgba(72,189,232,0.14)] rounded-[4px] space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">LATENCY</span>
                <span className="text-circuit-cyan">12ms // SYNC</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">CLUSTER</span>
                <span className="text-circuit-amber">48 H100 NODES</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">COHORT</span>
                <span className="text-text-primary">2026-2027</span>
              </div>
            </div>

            {isRecruitmentOpen && (
              <a
                href={clubConfig.recruitment.applicationUrl}
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2 px-3 bg-circuit-amber/10 border border-circuit-amber/40 rounded-[4px] text-circuit-amber font-mono text-xs hover:bg-circuit-amber/20 transition-colors uppercase tracking-wider"
              >
                Applications Active →
              </a>
            )}
          </div>
        </div>

        {/* Bottom Hairline Bar & Credits */}
        <div className="pt-8 border-t border-[rgba(72,189,232,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 text-text-muted">
            <span>© {new Date().getFullYear()} AI CLUB. ALL RIGHTS RESERVED.</span>
            <span>//</span>
            <span>FIRST-PRINCIPLES SYSTEMS ARCHITECTURE</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-text-muted hover:text-circuit-cyan transition-colors cursor-pointer group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
