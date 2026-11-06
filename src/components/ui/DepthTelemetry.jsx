'use client';

import React, { useMemo } from 'react';

const CORRIDOR_SECTIONS = [
  { id: 'arrival', label: 'Section 01: Arrival', targetZ: 12.5 },
  { id: 'core', label: 'Section 02: Intelligence Core', targetZ: -15.0 },
  { id: 'chamber', label: 'Section 03: Projection Chamber', targetZ: -35.0 },
];

/**
 * DepthTelemetry
 * Displays real-time facility corridor depth, waypoint coordinates,
 * and corridor progress in a sleek glass telemetry HUD on the bottom-left.
 */
export default function DepthTelemetry({ scrollProgress = 0, activeZoneIndex = 0 }) {
  const currentDepth = useMemo(() => {
    const startZ = 12.5;
    const endZ = -35.0;
    const z = startZ + scrollProgress * (endZ - startZ);
    return z.toFixed(1);
  }, [scrollProgress]);

  const activeZone = CORRIDOR_SECTIONS[activeZoneIndex] || CORRIDOR_SECTIONS[0];

  return (
    <aside className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col items-start gap-2.5 pointer-events-none select-none font-sans">
      <div className="p-3.5 px-4 rounded-2xl bg-charcoal/60 backdrop-blur-md border border-white/10 shadow-glass-panel text-left text-xs">
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-sage sage-indicator animate-ping" />
          <span>Facility Z-Coordinate</span>
        </div>
        <div className="text-sm font-bold text-sage font-mono mt-0.5">
          {currentDepth} m
        </div>
        <div className="text-[11px] text-ivory/80 mt-0.5 font-medium">
          {activeZone.label}
        </div>
      </div>

      {/* Horizontal Waypoint Track */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal/50 backdrop-blur-sm border border-white/10">
        {CORRIDOR_SECTIONS.map((sec, idx) => {
          const isActive = idx === activeZoneIndex;
          const isPassed = idx < activeZoneIndex;

          return (
            <div
              key={sec.id}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-6 bg-sage shadow-sage-glow'
                  : isPassed
                  ? 'w-3 bg-slate-hairline'
                  : 'w-2 bg-slate-struct/50'
              }`}
              title={sec.label}
            />
          );
        })}
      </div>
    </aside>
  );
}
