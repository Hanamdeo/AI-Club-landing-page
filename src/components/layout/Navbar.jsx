'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Flame, UserPlus } from 'lucide-react';
import { clubConfig } from '@/data/clubConfig';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isRecruitmentOpen = clubConfig.recruitment?.isOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05070B]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-glass'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Wordmark (PRD Section 3.2) */}
          <Link href="/" className="flex items-center gap-3.5 group select-none">
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
          </Link>

          {/* Desktop Navigation Links (PRD Section 3.2) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {clubConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-xs font-mono tracking-widest uppercase transition-colors group ${
                    isActive ? 'text-phoenix-cyan font-semibold' : 'text-secondary hover:text-primary'
                  }`}
                >
                  <span>{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-phoenix-cyan transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs (PRD Section 3.2 & Section 9: Conditional Recruitment CTA) */}
          <div className="hidden sm:flex items-center gap-4">
            {isRecruitmentOpen ? (
              <Button
                variant="primary"
                size="sm"
                icon={UserPlus}
                href={clubConfig.recruitment.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the Club
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                icon={ArrowUpRight}
                href="/events"
              >
                Explore Events
              </Button>
            )}
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
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#05070B]/98 backdrop-blur-2xl border-b border-white/10 p-6 sm:p-8 shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            {clubConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-mono tracking-wider py-2 uppercase border-b border-white/5 transition-colors ${
                    isActive ? 'text-phoenix-cyan font-bold pl-2 border-l-2 border-l-phoenix-cyan' : 'text-secondary hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Conditional Recruitment or Events Button */}
            <div className="pt-4">
              {isRecruitmentOpen ? (
                <Button
                  variant="primary"
                  size="md"
                  icon={UserPlus}
                  href={clubConfig.recruitment.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full justify-center"
                >
                  Join the Club
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="md"
                  icon={ArrowUpRight}
                  href="/events"
                  className="w-full justify-center"
                >
                  Explore Events
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
