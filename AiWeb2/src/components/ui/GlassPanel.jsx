'use client';

import React from 'react';

/**
 * GlassPanel
 * Architectural transparent glass interface panel with modern rounded borders.
 * Clean, minimal, without pseudo-code telemetry headers or text clutter.
 */
export default function GlassPanel({
  children,
  className = '',
}) {
  return (
    <div
      className={`relative bg-graphite/20 backdrop-blur-md border border-slate-struct/40 rounded-2xl shadow-glass-panel pointer-events-auto p-6 md:p-10 transition-all ${className}`}
    >
      {children}
    </div>
  );
}
