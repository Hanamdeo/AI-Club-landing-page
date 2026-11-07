'use client';

import React, { useMemo } from 'react';
import { FACILITY_ZONES } from '@/data/clubData';

/**
 * DepthTelemetry
 * Displays live virtual data centre depth, corridor coordinates,
 * and a vertical facility waypoint ladder in rounded glass capsules.
 * Clean, human-readable formatting without code comments.
 */
export default function DepthTelemetry({ scrollProgress = 0, activeZoneIndex = 0 }) {
  // Compute approximate real-time Z-depth in meters
  const currentDepth = useMemo(() => {
    // Range from +12m at entry down to -165m at exit
    const startZ = 12.0;
    const endZ = -165.0;
    const z = startZ + scrollProgress * (endZ - startZ);
    return z.toFixed(1);
  }, [scrollProgress]);

  const activeZone = FACILITY_ZONES[activeZoneIndex] || FACILITY_ZONES[0];

  return (
    <aside className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none select-none font-sans">
      {/* Real-Time Facility Coordinate Box */}
      <div className="p-3.5 px-4 rounded-2xl bg-charcoal/40 backdrop-blur-md border border-slate-struct/50 shadow-glass-panel text-right text-xs">
        <div className="flex items-center justify-end gap-2 text-[11px] text-slate-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-sage sage-indicator" />
          <span>Facility Depth</span>
        </div>
        <div className="text-sm font-bold text-sage num-normal mt-0.5">
          {currentDepth} m
        </div>
        <div className="text-[11px] text-ivory/70 mt-0.5 font-medium">
          {activeZone.label}
        </div>
      </div>

      {/* Vertical Waypoint Progress Ladder */}
      <div className="flex flex-col items-center gap-1.5 p-2 rounded-full bg-charcoal/40 backdrop-blur-sm border border-slate-struct/40">
        {FACILITY_ZONES.map((zone, idx) => {
          const isActive = idx === activeZoneIndex;
          const isPassed = idx < activeZoneIndex;

          return (
            <div
              key={zone.id}
              className={`w-1.5 transition-all duration-300 rounded-full ${
                isActive
                  ? 'h-4 bg-sage shadow-sage-glow'
                  : isPassed
                  ? 'h-1.5 bg-slate-struct'
                  : 'h-1 bg-slate-struct/40'
              }`}
              title={zone.label}
            />
          );
        })}
      </div>
    </aside>
  );
}
