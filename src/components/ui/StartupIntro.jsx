'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Cpu,
  Server,
  Radio,
  Bot,
  ShieldCheck,
  Boxes,
  Zap,
} from 'lucide-react';
import { audioManager } from '@/utils/audioManager';

/**
 * HUD Diagnostic Nodes that pop up sequentially during the facility boot sequence
 */
const HUD_DIAGNOSTIC_NODES = [
  {
    id: 'neural-core',
    icon: Cpu,
    tag: 'SYS_01',
    label: 'NEURAL CLUSTER',
    status: 'ONLINE',
    detail: '4,096 Tensor Cores Active',
    color: '#00F0FF',
  },
  {
    id: 'server-racks',
    icon: Server,
    tag: 'SYS_02',
    label: '42U DATA LINEUP',
    status: 'PROJECTING',
    detail: 'Holographic Voxel Cubes',
    color: '#24BFEA',
  },
  {
    id: 'optical-fabric',
    icon: Radio,
    tag: 'SYS_03',
    label: 'OPTICAL FABRIC',
    status: 'CONNECTED',
    detail: '800 Gbps Low-Latency Bus',
    color: '#A7B7A1',
  },
  {
    id: 'companion-bot',
    icon: Bot,
    tag: 'SYS_04',
    label: 'NEX-01 COMPANION',
    status: 'SYNCHRONIZED',
    detail: 'Autonomous Visor Online',
    color: '#00E5FF',
  },
  {
    id: 'security-matrix',
    icon: ShieldCheck,
    tag: 'SYS_05',
    label: 'SECURITY MATRIX',
    status: 'VERIFIED',
    detail: 'MITS Academic Clearance',
    color: '#22C55E',
  },
  {
    id: 'holographic-grid',
    icon: Boxes,
    tag: 'SYS_06',
    label: 'VOXEL PROJECTION',
    status: 'MATERIALIZING',
    detail: 'Cube Structure Assembly',
    color: '#38BDF8',
  },
];

/**
 * StartupIntro (Lag-Free High-Performance Architectural HUD Sequence)
 * Engineered for 60+ FPS zero-jank initialization:
 * - Replaces heavy dual-canvas WebGL with hardware-accelerated SVG & CSS transforms
 * - Uses direct DOM reference updates for percentage counter (ZERO React re-render thrashing)
 * - Sequentially pops up tactical HUD icons with cyber status nodes
 * - Plays high-tech procedural audio feedback blips
 * - Splits dual industrial blast shutters open cleanly
 */
export default function StartupIntro({ onComplete }) {
  const containerRef = useRef(null);
  const topShutterRef = useRef(null);
  const bottomShutterRef = useRef(null);
  const hudCenterRef = useRef(null);
  const progressLineRef = useRef(null);
  const counterTextRef = useRef(null);
  const statusLabelRef = useRef(null);
  const nodesGridRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        if (onComplete) onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Timeline setup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // Direct DOM updates for zero-lag 60fps counter
      const counterObj = { val: 0 };
      const statusPhases = [
        { threshold: 15, text: 'INITIALIZING HARDWARE MATRIX' },
        { threshold: 35, text: 'PROJECTING DATA CENTRE CUBES' },
        { threshold: 60, text: 'LINKING AUTONOMOUS AGENTS' },
        { threshold: 85, text: 'CALIBRATING OPTICAL BUS' },
        { threshold: 100, text: 'FACILITY READY // STAND BY' },
      ];

      // Initial visual states
      gsap.set(hudCenterRef.current, { opacity: 0, scale: 0.92 });
      gsap.set(progressLineRef.current, { scaleX: 0 });

      const nodeEls = nodesGridRef.current ? nodesGridRef.current.children : [];
      if (nodeEls.length) {
        gsap.set(nodeEls, { opacity: 0, scale: 0.75, y: 12 });
      }

      // 1. Center HUD Core & Title Fade In
      tl.to(hudCenterRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      });

      // 2. Main Progress Bar & Counter tween (2.2 seconds smooth linear/ease)
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 2.2,
          ease: 'power1.inOut',
          onUpdate: () => {
            const currentVal = Math.floor(counterObj.val);
            if (counterTextRef.current) {
              counterTextRef.current.innerText = `${currentVal}%`;
            }
            if (statusLabelRef.current) {
              const activePhase = statusPhases.find((p) => currentVal <= p.threshold) || statusPhases[statusPhases.length - 1];
              statusLabelRef.current.innerText = activePhase.text;
            }
          },
        },
        '-=0.2'
      );

      // Progress bar fill synced
      tl.to(
        progressLineRef.current,
        {
          scaleX: 1,
          duration: 2.2,
          ease: 'power1.inOut',
        },
        '<'
      );

      // 3. Staggered Pop-Up of Tactical HUD Diagnostic Nodes
      if (nodeEls.length) {
        tl.to(
          nodeEls,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.35,
            stagger: {
              each: 0.22,
              onStart: function () {
                try {
                  audioManager.playBeep(920 + Math.random() * 300, 0.035);
                } catch {
                  // Audio ignore
                }
              },
            },
            ease: 'back.out(1.8)',
          },
          0.3
        );
      }

      // 4. Brief hold at 100% full authorization
      tl.to({}, { duration: 0.3 });

      // 5. Sound trigger for shutter release
      tl.call(() => {
        try {
          audioManager.playWhoosh();
        } catch {
          // Audio ignore
        }
      });

      // 6. Center HUD softly scales up and fades out
      tl.to(hudCenterRef.current, {
        opacity: 0,
        scale: 1.06,
        duration: 0.45,
        ease: 'power2.in',
      });

      // 7. Architectural Blast Shutters split open
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

      // 8. Remove container from interaction
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
      className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center overflow-hidden select-none font-sans"
    >
      {/* Top Architectural Blast Shutter */}
      <div
        ref={topShutterRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0C0F10] border-b border-white/[0.08] z-10 flex items-start justify-between p-6 sm:p-8"
      >
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-[#A7B7A1] tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-[#24BFEA] animate-pulse shadow-[0_0_8px_#24BFEA]" />
          <span>FACILITY TELEMETRY // BOOT_SEQUENCE</span>
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
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0C0F10] border-t border-white/[0.08] z-10 flex items-end justify-between p-6 sm:p-8"
      >
        <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest hidden sm:block">
          MADHAV INSTITUTE OF TECHNOLOGY & SCIENCE // AI CLUB
        </div>
        <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
          SECURITY PROTOCOL: ALPHA-7
        </div>
      </div>

      {/* Center Cinematic HUD Telemetry Container */}
      <div
        ref={hudCenterRef}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl w-full"
      >
        {/* Holographic Radar Gyro Ring */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-5 flex items-center justify-center">
          {/* Outer Rotating Ticked Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#24BFEA]/40 animate-[spin_10s_linear_infinite]" />
          {/* Inner Counter-Rotating Ring */}
          <div className="absolute inset-2 rounded-full border border-[#A7B7A1]/30 border-t-[#24BFEA] animate-[spin_4s_linear_infinite_reverse]" />
          {/* Core Crest */}
          <div className="w-12 h-12 rounded-xl bg-[#141819] border border-white/[0.12] flex items-center justify-center shadow-[0_0_24px_rgba(36,191,234,0.3)]">
            <Zap className="w-6 h-6 text-[#24BFEA] animate-pulse" />
          </div>
        </div>

        {/* Master Heading & Subtitle */}
        <div className="space-y-1.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#131718] border border-white/[0.08] text-[10px] font-mono tracking-[0.2em] uppercase text-[#A7B7A1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#24BFEA] animate-ping" />
            <span>INITIALIZING RESEARCH FACILITY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-archivo font-black tracking-tight text-gradient-cyber drop-shadow-sm leading-none">
            AI CLUB
          </h1>

          <p className="text-xs sm:text-sm text-[#B6C4B4] font-space font-medium tracking-wide">
            Where Curiosity Meets Intelligence
          </p>
        </div>

        {/* Tactical HUD Diagnostic Grid: Icons pop up like a HUD starting */}
        <div
          ref={nodesGridRef}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 w-full max-w-2xl mb-8"
        >
          {HUD_DIAGNOSTIC_NODES.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-[#121617]/85 backdrop-blur-md border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.35)] text-left"
              >
                {/* Glowing Icon Cell */}
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 border border-white/[0.1]"
                  style={{ backgroundColor: `${node.color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: node.color }} />
                </div>

                {/* Node Diagnostics Text */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 leading-tight">
                    <span className="text-[9px] font-mono text-slate-400">{node.tag}</span>
                    <span className="text-[10px] font-mono font-bold text-[#F2EFE8] truncate">
                      {node.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
                      style={{ backgroundColor: node.color }}
                    />
                    <span className="text-[9px] font-mono text-[#A7B7A1] font-medium uppercase tracking-tight truncate">
                      {node.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Precision Progress Bar & Telemetry Line */}
        <div className="w-full max-w-md space-y-2">
          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/[0.08] p-0.5">
            <div
              ref={progressLineRef}
              className="w-full h-full bg-gradient-to-r from-[#24BFEA] via-[#A7B7A1] to-[#22C55E] origin-left rounded-full shadow-[0_0_12px_rgba(36,191,234,0.6)]"
            />
          </div>

          <div className="flex justify-between items-center text-xs font-mono font-medium">
            <span
              ref={statusLabelRef}
              className="text-[10px] uppercase tracking-wider text-slate-400"
            >
              STARTING SYSTEMS
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
