'use client';

import React, { useRef } from 'react';

export function CircuitCard({
  children,
  className = '',
  withTicks = true,
  spotlightColor = 'rgba(72, 189, 232, 0.28)',
  accentNode = true,
  ...props
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative group bg-[#0C0F14] border border-[rgba(72,189,232,0.14)] rounded-[6px] transition-all duration-300 ${withTicks ? 'corner-ticks' : ''} ${className}`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      {...props}
    >
      {/* Dynamic Cursor-Tracking Radial Spotlight Border */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 40%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Optional technical circuit node dots at corners */}
      {accentNode && (
        <>
          <span className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-circuit-cyan/40 pointer-events-none group-hover:bg-circuit-cyan transition-colors" />
          <span className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-circuit-amber/40 pointer-events-none group-hover:bg-circuit-amber transition-colors" />
        </>
      )}

      {children}
    </div>
  );
}

