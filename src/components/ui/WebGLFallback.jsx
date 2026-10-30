'use client';

import React from 'react';

export function WebGLFallback({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Stylized Glowing SVG Phoenix Hologram */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* Pulsing Aura Rings */}
        <div className="absolute inset-0 rounded-full border border-phoenix-blue/20 animate-ping opacity-25" />
        <div className="absolute inset-6 rounded-full border border-phoenix-cyan/30 animate-pulse" />
        <div className="absolute inset-12 rounded-full border border-phoenix-orange/20" />

        {/* Cyber Phoenix Emblem Vector */}
        <svg
          viewBox="0 0 200 200"
          className="w-48 h-48 sm:w-64 sm:h-64 filter drop-shadow-[0_0_30px_rgba(20,125,255,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Wings */}
          <path
            d="M100 25 L135 65 L175 45 L155 90 L185 115 L145 125 L125 155 L100 135 L75 155 L55 125 L15 115 L45 90 L25 45 L65 65 Z"
            fill="url(#phoenixGradient)"
            opacity="0.85"
          />
          {/* Inner Wings Layer */}
          <path
            d="M100 45 L125 75 L150 70 L135 100 L155 115 L125 120 L115 145 L100 130 L85 145 L75 120 L45 115 L65 100 L50 70 L75 75 Z"
            fill="url(#innerFlameGradient)"
          />
          {/* Energy Core Heart */}
          <polygon
            points="100,70 115,95 100,120 85,95"
            fill="#FFFFFF"
            className="animate-pulse"
          />
          {/* Tail Plumes */}
          <path
            d="M100 135 Q120 165 115 190 Q100 175 100 155 Q100 175 85 190 Q80 165 100 135"
            fill="url(#tailGradient)"
          />
          <defs>
            <linearGradient id="phoenixGradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#49D8FF" />
              <stop offset="60%" stopColor="#147DFF" />
              <stop offset="100%" stopColor="#FF7138" />
            </linearGradient>
            <linearGradient id="innerFlameGradient" x1="50" y1="50" x2="150" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5F7FA" />
              <stop offset="50%" stopColor="#49D8FF" />
              <stop offset="100%" stopColor="#147DFF" />
            </linearGradient>
            <linearGradient id="tailGradient" x1="100" y1="135" x2="100" y2="190" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#49D8FF" />
              <stop offset="70%" stopColor="#FF7138" />
              <stop offset="100%" stopColor="#E64B45" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient status indicator */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-navy-deep/80 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-phoenix-blue animate-ping" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-secondary">
            Holographic Fallback Active
          </span>
        </div>
      </div>
    </div>
  );
}
