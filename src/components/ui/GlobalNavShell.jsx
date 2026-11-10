'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import HUDNavbar from './HUDNavbar';
import TerminalCLI from './TerminalCLI';

/**
 * RouteProgressBar
 * Ultra-fast, zero-latency visual progress line on the top viewport edge.
 * Provides instant 0ms tactile feedback during page transitions across mobile & desktop.
 */
function RouteProgressBar() {
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Complete and fade out progress bar when pathname finishes changing
  useEffect(() => {
    setProgress(100);
    const timer = setTimeout(() => {
      setNavigating(false);
      setProgress(0);
    }, 200);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Listen for instant route navigation triggers with guaranteed auto-completion
  useEffect(() => {
    let t1, t2, t3, t4;
    const handleStart = () => {
      setNavigating(true);
      setProgress(40);
      t1 = setTimeout(() => setProgress(75), 100);
      t2 = setTimeout(() => setProgress(92), 220);
      // Guaranteed full completion so the bar NEVER freezes mid-screen
      t3 = setTimeout(() => setProgress(100), 400);
      t4 = setTimeout(() => {
        setNavigating(false);
        setProgress(0);
      }, 620);
    };
    window.addEventListener('route-navigate-start', handleStart);
    return () => {
      window.removeEventListener('route-navigate-start', handleStart);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (!navigating && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none bg-black/40 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#24BFEA] via-[#A7B7A1] to-[#22C55E] shadow-[0_0_10px_#24BFEA] transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/**
 * GlobalNavShell
 * Persists the precision HUD Navbar and interactive UNIX Terminal CLI globally
 * across all routes in the Next.js application.
 */
export default function GlobalNavShell() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // CSS Integrity Guardian: Prevents unstyled raw HTML drops during client navigation
  useEffect(() => {
    const verifyCssIntegrity = () => {
      if (typeof window === 'undefined') return;
      const testVal = getComputedStyle(document.documentElement).getPropertyValue('--accent-sage')?.trim();
      if (!testVal) {
        const lastRecovery = sessionStorage.getItem('last_css_recovery');
        const now = Date.now();
        if (!lastRecovery || now - Number(lastRecovery) > 4000) {
          sessionStorage.setItem('last_css_recovery', String(now));
          window.location.reload();
        }
      }
    };

    const timer = setTimeout(verifyCssIntegrity, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        // Prevent typing backtick into input when opening
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsTerminalOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTerminalNavigate = (targetId, navId) => {
    setIsTerminalOpen(false);
    window.dispatchEvent(new CustomEvent('route-navigate-start'));
    if (navId === 'events') router.push('/events');
    else if (navId === 'team') router.push('/team');
    else if (navId === 'projects') router.push('/projects');
    else if (navId === 'discussions' || navId === 'research') router.push('/research');
    else if (navId === 'radar' || navId === 'about') router.push('/about');
    else if (navId === 'join') router.push('/join');
    else router.push('/');
  };

  return (
    <>
      <RouteProgressBar />
      <HUDNavbar onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)} />
      <TerminalCLI
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigateToSection={handleTerminalNavigate}
      />
    </>
  );
}
