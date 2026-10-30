'use client';

import React from 'react';

export function Badge({
  children,
  variant = 'cyan',
  className = '',
  icon: Icon,
}) {
  const base = 'inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest font-medium rounded-full border';

  const variants = {
    cyan: 'bg-phoenix-cyan/10 text-phoenix-cyan border-phoenix-cyan/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]',
    blue: 'bg-phoenix-blue/15 text-blue-300 border-phoenix-blue/30',
    ember: 'bg-phoenix-ember/15 text-phoenix-ember border-phoenix-ember/30',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    neutral: 'bg-white/5 text-gray-300 border-white/10',
  };

  return (
    <span className={`${base} ${variants[variant] || variants.cyan} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}

