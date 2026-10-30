'use client';

import React from 'react';

export function Badge({
  children,
  variant = 'cyan',
  className = '',
  icon: Icon,
}) {
  const base = 'inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest font-medium rounded-[4px] border transition-colors';

  const variants = {
    cyan: 'bg-circuit-cyan/10 text-circuit-cyan border-circuit-cyan/30',
    amber: 'bg-circuit-amber/10 text-circuit-amber border-circuit-amber/35',
    gold: 'bg-circuit-amber/10 text-circuit-amber border-circuit-amber/35',
    copper: 'bg-circuit-copper/15 text-circuit-copper border-circuit-copper/35',
    neutral: 'bg-white/5 text-text-muted border-[rgba(72,189,232,0.12)]',
    blue: 'bg-circuit-cyan/10 text-circuit-cyan border-circuit-cyan/30',
  };

  return (
    <span className={`${base} ${variants[variant] || variants.cyan} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
