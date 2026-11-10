'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { audioManager } from '@/utils/audioManager';

/**
 * Neural Network Topology Configuration
 * 4 Layers: Input (4) -> Hidden 1 (5) -> Hidden 2 (5) -> Output (3)
 * Optimized SVG coordinate space: 520 x 210
 */
const LAYERS = [
  { id: 'input', label: 'INPUT', x: 60, nodes: [35, 78, 122, 165] },
  { id: 'hidden1', label: 'TENSOR_01', x: 190, nodes: [25, 62, 100, 138, 175] },
  { id: 'hidden2', label: 'TENSOR_02', x: 330, nodes: [25, 62, 100, 138, 175] },
  { id: 'output', label: 'OUTPUT', x: 460, nodes: [50, 100, 150] },
];

// Precompute flat node definitions with activation thresholds
const NETWORK_NODES = [];
LAYERS.forEach((layer, layerIdx) => {
  layer.nodes.forEach((y, nodeIdx) => {
    // Staggered activation thresholds based on layer position
    let threshold = 0.05;
    if (layerIdx === 0) threshold = 0.04 + nodeIdx * 0.02;
    else if (layerIdx === 1) threshold = 0.28 + nodeIdx * 0.03;
    else if (layerIdx === 2) threshold = 0.58 + nodeIdx * 0.03;
    else if (layerIdx === 3) threshold = 0.84 + nodeIdx * 0.04;

    NETWORK_NODES.push({
      id: `${layer.id}_${nodeIdx}`,
      layerIdx,
      nodeIdx,
      x: layer.x,
      y,
      threshold,
      color: layerIdx === 3 ? '#22C55E' : layerIdx === 0 ? '#24BFEA' : '#A7B7A1',
    });
  });
});

// Precompute cubic-bezier synaptic connection curves
const SYNAPSE_CONNECTIONS = [];
for (let l = 0; l < LAYERS.length - 1; l++) {
  const sourceLayer = LAYERS[l];
  const targetLayer = LAYERS[l + 1];

  let layerStart = 0.08;
  let layerEnd = 0.38;
  if (l === 1) {
    layerStart = 0.36;
    layerEnd = 0.68;
  } else if (l === 2) {
    layerStart = 0.66;
    layerEnd = 0.94;
  }

  const totalInGroup = sourceLayer.nodes.length * targetLayer.nodes.length;
  let connIdx = 0;

  sourceLayer.nodes.forEach((y1, sIdx) => {
    targetLayer.nodes.forEach((y2, tIdx) => {
      const x1 = sourceLayer.x;
      const x2 = targetLayer.x;
      const dx = x2 - x1;
      const pathD = `M ${x1} ${y1} C ${x1 + dx * 0.45} ${y1}, ${x2 - dx * 0.45} ${y2}, ${x2} ${y2}`;

      // Smooth staggered threshold for each synaptic connection line
      const stagger = (connIdx / totalInGroup) * (layerEnd - layerStart) * 0.6;
      const start = layerStart + stagger;
      const end = start + (layerEnd - layerStart) * 0.45;

      SYNAPSE_CONNECTIONS.push({
        id: `syn_${l}_${sIdx}_${tIdx}`,
        layerIndex: l,
        d: pathD,
        start,
        end,
        color: l === 0 ? '#24BFEA' : l === 1 ? '#A7B7A1' : '#72E29B',
      });
      connIdx++;
    });
  });
}

/**
 * StartupIntro
 * Features an organic, high-performance SVG Neural Network that dynamically
 * connects nodes and propagates synaptic impulses in real-time as the loading bar charges.
 * Engineered for zero React re-renders with direct DOM updates (60+ FPS).
 */
export default function StartupIntro({ onComplete }) {
  const containerRef = useRef(null);
  const topShutterRef = useRef(null);
  const bottomShutterRef = useRef(null);
  const centerContentRef = useRef(null);
  const progressLineRef = useRef(null);
  const counterTextRef = useRef(null);
  const statusLabelRef = useRef(null);

  // Direct DOM references for synaptic paths and node elements
  const connectionRefs = useRef([]);
  const nodeHaloRefs = useRef({});
  const nodeCoreRefs = useRef({});

  useEffect(() => {
    // Instantly bypass on mobile screens (< 768px or touch mobile agents)
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 ||
        window.matchMedia('(max-width: 767px)').matches ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    if (isMobile) {
      if (onComplete) onComplete();
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        if (onComplete) onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      const counterObj = { val: 0 };
      const statusPhases = [
        { threshold: 18, text: 'MAPPING INPUT NEURAL CLUSTERS...' },
        { threshold: 45, text: 'FORMING SYNAPTIC WEIGHTS [LAYER 1]...' },
        { threshold: 72, text: 'DEEP TENSOR PROPAGATION [LAYER 2]...' },
        { threshold: 92, text: 'NEURAL CONVERGENCE REACHED...' },
        { threshold: 100, text: 'NETWORK SYNCHRONIZED // ACCESS GRANTED' },
      ];

      // Initial visual states
      gsap.set(centerContentRef.current, { opacity: 0, scale: 0.95 });
      gsap.set(progressLineRef.current, { scaleX: 0 });

      // Initialize all synapse paths to fully retracted (offset = 100)
      connectionRefs.current.forEach((pathEl) => {
        if (pathEl) {
          pathEl.style.strokeDashoffset = '100';
          pathEl.style.opacity = '0';
        }
      });

      // 1. Center Title & Neural Net Container Fade In
      tl.to(centerContentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      });

      // Track activated nodes to trigger subtle acoustic blips only once
      const activatedNodes = new Set();

      // 2. Main Progress Bar & Synaptic Connection Animation
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 2.4,
          ease: 'power1.inOut',
          onUpdate: () => {
            const currentVal = Math.floor(counterObj.val);
            const progress = counterObj.val / 100;

            // Direct text update (zero React re-render)
            if (counterTextRef.current) {
              counterTextRef.current.innerText = `${currentVal}%`;
            }

            // Status message update
            if (statusLabelRef.current) {
              const activePhase =
                statusPhases.find((p) => currentVal <= p.threshold) ||
                statusPhases[statusPhases.length - 1];
              statusLabelRef.current.innerText = activePhase.text;
            }

            // A. Update Synapse Connection Lines
            SYNAPSE_CONNECTIONS.forEach((conn, idx) => {
              const pathEl = connectionRefs.current[idx];
              if (!pathEl) return;

              if (progress <= conn.start) {
                pathEl.style.strokeDashoffset = '100';
                pathEl.style.opacity = '0';
              } else if (progress >= conn.end) {
                pathEl.style.strokeDashoffset = '0';
                pathEl.style.opacity = '0.75';
              } else {
                const fraction = (progress - conn.start) / (conn.end - conn.start);
                const offset = 100 * (1 - fraction);
                pathEl.style.strokeDashoffset = `${offset.toFixed(1)}`;
                pathEl.style.opacity = `${(fraction * 0.75).toFixed(2)}`;
              }
            });

            // B. Update Neural Nodes Illumination
            NETWORK_NODES.forEach((node) => {
              const halo = nodeHaloRefs.current[node.id];
              const core = nodeCoreRefs.current[node.id];
              if (!halo || !core) return;

              if (progress >= node.threshold) {
                halo.style.opacity = '0.9';
                core.setAttribute('fill', node.color);
                core.style.filter = `drop-shadow(0 0 6px ${node.color})`;

                if (!activatedNodes.has(node.id)) {
                  activatedNodes.add(node.id);
                  try {
                    audioManager.playBeep(520 + node.layerIdx * 180 + node.nodeIdx * 45, 0.025);
                  } catch {
                    // Audio fallback
                  }
                }
              } else {
                halo.style.opacity = '0.15';
                core.setAttribute('fill', '#182022');
                core.style.filter = 'none';
              }
            });
          },
        },
        '-=0.15'
      );

      // Progress bar fill line synced
      tl.to(
        progressLineRef.current,
        {
          scaleX: 1,
          duration: 2.4,
          ease: 'power1.inOut',
        },
        '<'
      );

      // 3. Neural Convergence Pulse at 100%
      tl.to(
        centerContentRef.current,
        {
          scale: 1.02,
          duration: 0.25,
          ease: 'power2.out',
        },
        '+=0.1'
      );

      // 4. Shutter sound trigger
      tl.call(() => {
        try {
          audioManager.playWhoosh();
        } catch {
          // Audio fallback
        }
      });

      // 5. Center content smoothly fades out
      tl.to(centerContentRef.current, {
        opacity: 0,
        scale: 1.06,
        duration: 0.45,
        ease: 'power2.in',
      });

      // 6. Blast Shutters split open
      tl.to(
        topShutterRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
        },
        '-=0.15'
      );
      tl.to(
        bottomShutterRef.current,
        {
          yPercent: 100,
          duration: 0.85,
          ease: 'power4.inOut',
        },
        '<'
      );

      // 7. Cleanup container
      tl.set(containerRef.current, { display: 'none' });
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="hidden md:flex fixed inset-0 z-50 pointer-events-auto items-center justify-center overflow-hidden select-none font-sans bg-[#0A0E10]"
    >
      {/* Top Architectural Blast Shutter */}
      <div
        ref={topShutterRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0A0E10] border-b border-white/[0.08] z-10 flex items-start justify-between p-6 sm:p-8"
      >
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-[#A7B7A1] tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-[#24BFEA] animate-pulse shadow-[0_0_8px_#24BFEA]" />
          <span>NEURAL NETWORK BOOT // FACILITY CORE</span>
        </div>

        <button
          onClick={() => onComplete && onComplete()}
          className="text-xs font-mono text-[#E6E2D8]/50 hover:text-[#A7B7A1] transition-colors cursor-pointer tracking-wider uppercase px-3 py-1 rounded bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.15]"
        >
          [SKIP INTRO ↵]
        </button>
      </div>

      {/* Bottom Architectural Blast Shutter */}
      <div
        ref={bottomShutterRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0A0E10] border-t border-white/[0.08] z-10 flex items-end justify-between p-6 sm:p-8"
      >
        <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest hidden sm:block">
          MADHAV INSTITUTE OF TECHNOLOGY & SCIENCE // AI CLUB
        </div>
        <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
          SYSTEM: NEURAL FABRIC v2.4
        </div>
      </div>

      {/* Ambient Radial Cyber Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(36,191,234,0.08)_0%,transparent_65%)] pointer-events-none" />

      {/* Center Neural Network & Brand Experience */}
      <div
        ref={centerContentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-2xl w-full"
      >
        {/* Facility Header */}
        <div className="space-y-1 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono tracking-[0.2em] uppercase text-[#A7B7A1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#24BFEA] animate-ping" />
            <span>CONNECTING NEURAL ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-labeouf font-bold tracking-wider text-gradient-cyber drop-shadow-sm leading-none mt-2">
            AI CLUB
          </h1>

          <p className="text-xs sm:text-sm text-[#B6C4B4] font-sans font-normal tracking-wide">
            Where Curiosity Meets Intelligence
          </p>
        </div>

        {/* Dynamic Neural Network SVG Visualizer */}
        <div className="w-full max-w-lg mb-6 relative">
          <svg
            viewBox="0 0 520 205"
            className="w-full h-auto overflow-visible select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          >
            <defs>
              {/* Linear Gradients for Synapse Connections */}
              <linearGradient id="synapseGradCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#24BFEA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#A7B7A1" stopOpacity="0.8" />
              </linearGradient>

              <linearGradient id="synapseGradSage" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A7B7A1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0.9" />
              </linearGradient>

              {/* Node Glow Filters */}
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
              </filter>
            </defs>

            {/* 1. Inactive Synapse Traces (Subtle architectural mesh guides) */}
            <g className="opacity-20">
              {SYNAPSE_CONNECTIONS.map((conn) => (
                <path
                  key={`inactive_${conn.id}`}
                  d={conn.d}
                  fill="none"
                  stroke="#3A484A"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
              ))}
            </g>

            {/* 2. Active Synaptic Connection Curves (Draw and connect dynamically) */}
            <g>
              {SYNAPSE_CONNECTIONS.map((conn, idx) => (
                <path
                  key={`active_${conn.id}`}
                  ref={(el) => (connectionRefs.current[idx] = el)}
                  d={conn.d}
                  fill="none"
                  stroke={conn.layerIndex === 0 ? 'url(#synapseGradCyan)' : 'url(#synapseGradSage)'}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  style={{
                    transition: 'stroke-dashoffset 0.04s linear',
                    filter: 'drop-shadow(0 0 3px rgba(36,191,234,0.4))',
                  }}
                />
              ))}
            </g>

            {/* 3. Layer Column Identifiers */}
            {LAYERS.map((layer) => (
              <text
                key={`label_${layer.id}`}
                x={layer.x}
                y={198}
                textAnchor="middle"
                className="fill-[#5C6E6D] font-mono text-[9px] tracking-wider uppercase"
              >
                {layer.label}
              </text>
            ))}

            {/* 4. Neural Network Nodes */}
            {NETWORK_NODES.map((node) => (
              <g key={node.id} className="cursor-default">
                {/* Outer Glow Ring */}
                <circle
                  ref={(el) => (nodeHaloRefs.current[node.id] = el)}
                  cx={node.x}
                  cy={node.y}
                  r="10"
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  className="opacity-15 transition-opacity duration-300"
                />

                {/* Base Socket Rim */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="6"
                  fill="#0D1213"
                  stroke="#2E3C3E"
                  strokeWidth="1.5"
                />

                {/* Active Glowing Core */}
                <circle
                  ref={(el) => (nodeCoreRefs.current[node.id] = el)}
                  cx={node.x}
                  cy={node.y}
                  r="3.5"
                  fill="#182022"
                  className="transition-colors duration-300"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Minimal High-Precision Progress Bar & Status */}
        <div className="w-full max-w-md space-y-2">
          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/[0.08] p-0.5">
            <div
              ref={progressLineRef}
              className="w-full h-full bg-gradient-to-r from-[#24BFEA] via-[#A7B7A1] to-[#22C55E] origin-left rounded-full shadow-[0_0_12px_rgba(36,191,234,0.6)]"
            />
          </div>

          <div className="flex justify-between items-center text-xs font-mono font-medium">
            <span
              ref={statusLabelRef}
              className="text-[10px] uppercase tracking-wider text-slate-400 font-mono"
            >
              INITIALIZING NEURAL NODES...
            </span>
            <span
              ref={counterTextRef}
              className="text-[11px] font-bold text-[#24BFEA] tnum"
            >
              0%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
