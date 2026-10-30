'use client';

import React from 'react';
import Link from 'next/link';
import { clubConfig } from '@/data/clubConfig';
import { Github, Twitter, Linkedin, MessageSquare, Mail, Flame, ArrowUp, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRecruitmentOpen = clubConfig.recruitment?.isOpen;

  return (
    <footer className="relative bg-[#040608] border-t border-white/10 text-secondary overflow-hidden">
      {/* Top Hairline Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-phoenix-blue/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Identity Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-8 h-8 bg-navy-surface border border-phoenix-blue/40 flex items-center justify-center transition-colors group-hover:border-phoenix-blue">
                <Flame className="w-4 h-4 text-phoenix-blue group-hover:text-phoenix-cyan transition-colors" />
              </div>
              <span className="font-display font-bold text-primary text-lg tracking-wider">
                {clubConfig.name}
              </span>
            </Link>

            <p className="text-sm text-secondary max-w-sm font-sans leading-relaxed">
              Advancing artificial intelligence research through high-agency autonomous systems, low-level kernel compilation, and empirical dialectics. Building the future in the open.
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

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              {clubConfig.navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-phoenix-cyan transition-colors flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sprints & Archive Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              Activity Hubs
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link href="/events" className="hover:text-phoenix-cyan transition-colors">
                  Upcoming Sprints
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-phoenix-cyan transition-colors">
                  Past Event Highlights
                </Link>
              </li>
              <li>
                <Link href="/gd-archive" className="hover:text-phoenix-cyan transition-colors">
                  The Dialectic Room
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-phoenix-cyan transition-colors">
                  Visual Chronicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Membership / Recruitment Status Column (PRD Section 3.9 & Section 9) */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              Membership
            </h4>
            {isRecruitmentOpen ? (
              <div className="p-4 bg-navy-deep/60 border border-phoenix-blue/30 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-phoenix-cyan animate-pulse" />
                  <span className="text-[11px] font-mono text-phoenix-cyan font-bold uppercase">
                    Recruitment Active
                  </span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  {clubConfig.recruitment.role}. Review deadline: {clubConfig.recruitment.deadline}.
                </p>
                <a
                  href={clubConfig.recruitment.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-bold hover:text-phoenix-cyan transition-colors"
                >
                  <span>Submit Application</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className="p-4 bg-white/[0.02] border border-white/10 space-y-2">
                <p className="text-xs font-mono text-secondary">Recruitment Closed</p>
                <p className="text-xs text-secondary/80 leading-relaxed">
                  General cohort applications are currently closed. Inquire at our Discord lounge for open research pods.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Developer Credits & Copyright (PRD Section 3.9) */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-secondary">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} {clubConfig.name}. All rights reserved.</span>
            <span>•</span>
            <span className="text-secondary/70">
              {clubConfig.developerCredits.team}
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
