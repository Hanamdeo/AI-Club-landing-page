'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Flame } from 'lucide-react';
import { clubConfig } from '@/data/clubConfig';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#05070B]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-glass'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Mascot Anchor */}
          <a href="#" className="flex items-center gap-3.5 group select-none">
            {/* Mascot Emblem Anchor */}
            <div
              id="navbar-phoenix-anchor"
              className="relative w-10 h-10 bg-navy-deep/90 border border-phoenix-blue/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-phoenix-blue group-hover:shadow-glow-blue"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-phoenix-blue/20 via-transparent to-phoenix-orange/20 opacity-60 group-hover:opacity-100 transition-opacity" />
              <Flame className="w-5 h-5 text-phoenix-blue group-hover:text-phoenix-cyan transition-colors" />
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-display font-bold text-primary text-base tracking-wider uppercase group-hover:text-phoenix-cyan transition-colors">
                  {clubConfig.name}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[9px] font-mono uppercase bg-phoenix-blue/10 text-phoenix-cyan border border-phoenix-blue/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-phoenix-cyan animate-pulse mr-1.5" />
                  ONLINE
                </span>
              </div>
              <span className="block text-[10px] font-mono text-secondary tracking-tight">
                {clubConfig.college.split('&')[0].trim()}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {clubConfig.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative py-1 text-xs font-mono tracking-widest text-secondary hover:text-primary transition-colors group uppercase"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-phoenix-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowUpRight}
              href="#events"
            >
              Explore Calendar
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-secondary hover:text-primary transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bg-[#05070B]/98 backdrop-blur-2xl border-b border-white/10 p-8 shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            {clubConfig.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 text-base font-display font-medium text-secondary hover:text-primary border-b border-white/5 uppercase tracking-wider"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-secondary/60" />
              </a>
            ))}

            <div className="pt-6">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                href="#events"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Lab Calendar
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
