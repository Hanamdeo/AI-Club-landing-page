'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Flame, Sparkles } from 'lucide-react';
import { clubConfig } from '@/data/clubConfig';
import { Button } from '@/components/ui/Button';

export function Navbar({ onOpenJoinModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090D]/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Mascot Anchor */}
          <a href="#" className="flex items-center gap-3 group select-none">
            {/* Mascot Emblem Anchor */}
            <div
              id="navbar-phoenix-anchor"
              className="relative w-10 h-10 rounded-lg bg-surface-200/80 border border-cyan-500/30 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-phoenix-cyan group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-phoenix-cyan/20 to-phoenix-blue/30 opacity-75 group-hover:opacity-100 transition-opacity" />
              <Flame className="w-5 h-5 text-phoenix-cyan transition-transform group-hover:scale-110" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-white text-base tracking-wider uppercase group-hover:text-phoenix-cyan transition-colors">
                  {clubConfig.name}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />
                  Live
                </span>
              </div>
              <span className="block text-[10px] font-mono text-gray-400 tracking-tight">
                {clubConfig.college.split('&')[0].trim()}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {clubConfig.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3 py-1.5 text-xs font-mono tracking-wider text-gray-300 hover:text-white transition-colors group flex items-center gap-1.5"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 text-[9px] font-mono bg-phoenix-cyan/20 text-phoenix-cyan border border-phoenix-cyan/30 rounded">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-phoenix-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              icon={Sparkles}
              onClick={onOpenJoinModal}
            >
              Join Club
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#07090D]/95 backdrop-blur-xl border-b border-cyan-500/20 p-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-3">
            {clubConfig.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-mono text-gray-300 hover:text-phoenix-cyan border-b border-white/5"
              >
                <span>{link.name}</span>
                {link.badge ? (
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-phoenix-cyan/20 text-phoenix-cyan rounded">
                    {link.badge}
                  </span>
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-gray-500" />
                )}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal();
                }}
              >
                Join AI Club
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
