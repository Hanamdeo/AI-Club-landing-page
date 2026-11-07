'use client';

import React from 'react';

/**
 * GlassPanel
 * Architectural transparent glass interface panel with modern rounded borders.
 * Truly transparent background allowing the continuous 3D Data Centre scene to shine through.
 */
export default function GlassPanel({
  children,
  className = '',
}) {
  return (
    <div
      className={`relative bg-black/10 border border-white/10 rounded-2xl pointer-events-auto p-6 md:p-10 transition-all ${className}`}
    >
      {children}
    </div>
  );
}
