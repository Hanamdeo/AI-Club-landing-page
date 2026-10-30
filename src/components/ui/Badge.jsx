'use client';

import React from 'react';

export function Badge({
  children,
  variant = 'blue',
  className = '',
  icon: Icon,
}) {
  const base = 'inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-medium border';

  const variants = {
    blue: 'bg-phoenix-blue/10 text-phoenix-cyan border-phoenix-blue/30',
    cyan: 'bg-phoenix-cyan/10 text-phoenix-cyan border-phoenix-cyan/30',
    orange: 'bg-phoenix-orange/15 text-phoenix-orange border-phoenix-orange/30',
    neutral: 'bg-white/5 text-secondary border-white/10',
  };

  return (
    <span className={`${base} ${variants[variant] || variants.blue} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
