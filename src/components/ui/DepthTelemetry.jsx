'use client';

import React, { useMemo } from 'react';

const CORRIDOR_SECTIONS = [
  { id: 'entry', label: '01 Entry Threshold', targetZ: 12.5 },
  { id: 'featured', label: '02 Featured Cluster', targetZ: -2.5 },
  { id: 'community', label: '03 Community Aisle', targetZ: -15.0 },
  { id: 'research', label: '04 Research Core', targetZ: -28.0 },
  { id: 'projects', label: '05 Project Archive', targetZ: -38.0 },
  { id: 'discovery', label: '06 Discovery Hub', targetZ: -48.0 },
];

/**
 * DepthTelemetry
 * Displays real-time corridor depth coordinates, waypoint progress across 6 zones,
 * and adaptive device performance tier calibration with live FPS reporting.
 */
export default function DepthTelemetry({
  scrollProgress = 0,
  activeZoneIndex = 0,
  coordRef,
  perfTier = 'medium',
  perfConfig,
  fps = 60,
  onCycleTier,
}) {
  const currentDepth = useMemo(() => {
    const startZ = 12.5;
    const endZ = -48.0;
    const z = startZ + scrollProgress * (endZ - startZ);
    return z.toFixed(1);
  }, [scrollProgress]);

  const activeZone = CORRIDOR_SECTIONS[activeZoneIndex] || CORRIDOR_SECTIONS[0];

  return (
    <aside className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col items-start gap-2 pointer-events-none select-none font-sans">
      <div className="p-3.5 px-4 rounded-xl bg-[#0D1011]/85 backdrop-blur-md border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.35)] text-left min-w-[170px]">
        {/* Header Telemetry Identifier */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-sage ring-2 ring-sage/20" />
          <span>CORRIDOR DEPTH</span>
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

        {/* Device Performance Tier & Live Frame Profiler */}
        {perfTier && (
          <div className="pt-2 mt-2 border-t border-white/[0.08] flex items-center justify-between gap-2">
            <button
              onClick={onCycleTier}
              className="pointer-events-auto flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] transition-colors cursor-pointer text-[9px] font-mono text-slate-300 hover:text-white"
              title="Click to toggle device performance profile (ECO / BALANCED / HIGH)"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  perfTier === 'low'
                    ? 'bg-signal-green shadow-[0_0_6px_#22C55E]'
                    : perfTier === 'high'
                    ? 'bg-sage shadow-[0_0_6px_#A7B7A1]'
                    : 'bg-[#24BFEA] shadow-[0_0_6px_#24BFEA]'
                }`}
              />
              <span className="font-semibold">{perfConfig?.shortLabel || 'BALANCED'}</span>
            </button>
            <span className="text-[9px] font-mono text-slate-400 tnum">
              {fps} FPS
            </span>
          </div>
        )}
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
