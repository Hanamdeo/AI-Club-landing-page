'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import StaticFooter from './StaticFooter';

/**
 * GlobalFooterShell
 * Client controller for rendering the high-tech facility footer.
 * Strictly excludes the 3D home corridor (pathname === '/') so the Three.js
 * viewport and camera trajectory remain 100% immersive and uninterrupted.
 */
export default function GlobalFooterShell() {
  const pathname = usePathname();

  // Exclude 3D interactive home corridor
  if (pathname === '/') return null;

  const handleOpenTerminal = () => {
    // Trigger global shortcut listener for terminal
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '`' }));
  };

  return <StaticFooter onOpenTerminal={handleOpenTerminal} />;
}

