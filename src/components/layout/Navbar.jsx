'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, UserPlus } from 'lucide-react';
import { clubConfig } from '@/data/clubConfig';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
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
          ? 'bg-[#0C0F14]/75 backdrop-blur-xl border-b border-[rgba(72,189,232,0.14)] py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.7)]'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <Link href="/" className="flex items-center gap-3.5 group select-none">
            {/* Logo Setup per Specification: height 40px, width auto, subtle cyan drop-shadow on hover */}
            <div
              id="navbar-phoenix-anchor"
              className="relative h-10 w-auto flex items-center justify-center transition-all duration-300 group"
            >
              <img
                src="/logo.png"
                alt="AI CLUB Brand Mark"
                className="h-10 w-auto max-w-none object-contain transition-all duration-300 group-hover:[filter:drop-shadow(0_0_8px_rgba(72,189,232,0.35))]"
              />
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-display font-bold text-text-primary text-base tracking-tight uppercase group-hover:text-circuit-cyan transition-colors">
                  AI CLUB
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[9px] font-mono uppercase bg-circuit-cyan/10 text-circuit-cyan border border-circuit-cyan/30 rounded-[3px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-circuit-cyan animate-pulse mr-1.5" />
                  ONLINE
                </span>
              </div>
              <span className="block text-[10px] font-mono text-text-muted tracking-tight">
                {clubConfig.college ? clubConfig.college.split('&')[0].trim() : 'COLLEGIATE RESEARCH COLLECTIVE'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {clubConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-xs font-mono tracking-widest uppercase transition-colors group ${
                    isActive ? 'text-circuit-cyan font-semibold' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <span>{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-circuit-cyan transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
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
                Explore Sprints
              </Button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-text-muted hover:text-text-primary transition-colors cursor-pointer border border-[rgba(72,189,232,0.14)] rounded-[4px] bg-[#0C0F14]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0C0F14]/98 backdrop-blur-2xl border-b border-[rgba(72,189,232,0.18)] p-6 sm:p-8 shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            {clubConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-mono tracking-wider py-2 uppercase border-b border-white/5 transition-colors ${
                    isActive ? 'text-circuit-cyan font-bold pl-2 border-l-2 border-l-circuit-cyan' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Action Button */}
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
                  Explore Sprints
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
