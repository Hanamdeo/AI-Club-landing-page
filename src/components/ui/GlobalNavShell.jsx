'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HUDNavbar from './HUDNavbar';
import TerminalCLI from './TerminalCLI';

/**
 * GlobalNavShell
 * Persists the precision HUD Navbar and interactive UNIX Terminal CLI globally
 * across all routes in the Next.js application.
 */
export default function GlobalNavShell() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const router = useRouter();

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
      <HUDNavbar onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)} />
      <TerminalCLI
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigateToSection={handleTerminalNavigate}
      />
    </>
  );
}
