'use client';

import React, { useMemo } from 'react';

const CORRIDOR_SECTIONS = [
  { id: 'arrival', label: 'Sector 01: Arrival Threshold', targetZ: 12.5 },
  { id: 'core', label: 'Sector 02: Intelligence Core', targetZ: -15.0 },
  { id: 'chamber', label: 'Sector 03: Projection Chamber', targetZ: -35.0 },
];

/**
 * DepthTelemetry
 * Displays real-time corridor depth coordinates and waypoint progress.
 * Built with clinical precision: tabular JetBrains Mono metrics, restrained hairline borders,
 * and zero visual flicker or distracting pings.
 */
export default function DepthTelemetry({
  scrollProgress = 0,
  activeZoneIndex = 0,
  coordRef,
}) {
  const currentDepth = useMemo(() => {
    const startZ = 12.5;
    const endZ = -35.0;
    const z = startZ + scrollProgress * (endZ - startZ);
    return z.toFixed(1);
  }, [scrollProgress]);

  const activeZone = CORRIDOR_SECTIONS[activeZoneIndex] || CORRIDOR_SECTIONS[0];

  return (
    <aside className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col items-start gap-2 pointer-events-none select-none font-sans">
      <div className="p-3.5 px-4 rounded-xl bg-[#0D1011]/85 backdrop-blur-md border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.35)] text-left">
        {/* Header Telemetry Identifier */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-sage ring-2 ring-sage/20" />
          <span>FACILITY WAYPOINT Z</span>
        </div>

        {/* Tabular Coordinate Value */}
        <div className="text-sm font-bold text-sage font-mono mt-0.5 tnum tracking-tight flex items-baseline gap-1">
          <span ref={coordRef} id="depth-coord-val">{currentDepth}</span>
          <span className="text-[10px] text-slate-400 font-normal">m</span>
        </div>

        {/* Active Sector Name */}
        <div className="text-[11px] text-ivory/80 mt-0.5 font-medium tracking-tight">
          {activeZone.label}
        </div>
      </div>

      {/* Segmented Architectural Coordinate Gauge */}
      <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0D1011]/70 backdrop-blur-sm border border-white/[0.06]">
        {CORRIDOR_SECTIONS.map((sec, idx) => {
          const isActive = idx === activeZoneIndex;
          const isPassed = idx < activeZoneIndex;

          return (
            <div
              key={sec.id}
              className={`h-1 transition-all duration-200 rounded-sm ${
                isActive
                  ? 'w-6 bg-sage'
                  : isPassed
                  ? 'w-3 bg-slate-400/50'
                  : 'w-2 bg-white/10'
              }`}
              title={sec.label}
            />
          );
        })}
      </div>
    </aside>
  );
}
