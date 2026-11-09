'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Dynamically import Three.js components with SSR disabled
const StartupIntro = dynamic(() => import('@/components/ui/StartupIntro'), {
  ssr: false,
});
const SceneContainer = dynamic(() => import('@/components/3d/SceneContainer'), {
  ssr: false,
});

import ServerSideNav from '@/components/ui/ServerSideNav';
import DepthTelemetry from '@/components/ui/DepthTelemetry';
import ServerBladeModal from '@/components/ui/ServerBladeModal';
import TerminalCLI from '@/components/ui/TerminalCLI';
import BdxHolographicProjector from '@/components/ui/BdxHolographicProjector';

// 6 PROGRESSIVE DEPTH ZONES (THE CENTRAL REDESIGN EXPERIENCE MODEL)
import Zone1Hero from '@/components/ui/zones/Zone1Hero';
import Zone2Featured from '@/components/ui/zones/Zone2Featured';
import Zone3Community from '@/components/ui/zones/Zone3Community';
import Zone4Research from '@/components/ui/zones/Zone4Research';
import Zone5Projects from '@/components/ui/zones/Zone5Projects';
import Zone6Discovery from '@/components/ui/zones/Zone6Discovery';
import { useDevicePerformanceTier } from '@/utils/deviceTier';

const ZONE_DEFINITIONS = [
  { id: 'entry', index: 0, label: '01 Entry', center: 0.08, zProgress: 0.00 },
  { id: 'featured', index: 1, label: '02 Featured', center: 0.25, zProgress: 0.20 },
  { id: 'community', index: 2, label: '03 Community', center: 0.42, zProgress: 0.40 },
  { id: 'research', index: 3, label: '04 Research', center: 0.59, zProgress: 0.60 },
  { id: 'projects', index: 4, label: '05 Projects', center: 0.76, zProgress: 0.80 },
  { id: 'discovery', index: 5, label: '06 Discovery', center: 0.93, zProgress: 1.00 },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('entry');

  // Intelligent Device Hardware Tier & Performance Profiler
  const {
    tier: perfTier,
    config: perfConfig,
    fps,
    reportFrame,
    cycleTier,
  } = useDevicePerformanceTier();

  // Performance-optimized shared refs: zero React re-render thrashing during scroll
  const scrollProgressRef = useRef(0);
  const currentZoneIndexRef = useRef(0);
  const depthCoordRef = useRef(null);

  // Modal & Terminal States
  const [isRackModalOpen, setIsRackModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const scrollTrackRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize GSAP & Lenis smooth scroll
  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    // Progressive Depth ScrollTrigger driving the entire 3D data centre journey
    const ctx = gsap.context(() => {
      if (scrollTrackRef.current) {
        ScrollTrigger.create({
          trigger: scrollTrackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.25,
          onUpdate: (self) => {
            const p = self.progress;
            scrollProgressRef.current = p;

            // Direct DOM update for DepthTelemetry coordinate (-48.0m to +12.5m)
            if (depthCoordRef.current) {
              const currentZ = 12.5 + p * (-48.0 - 12.5);
              depthCoordRef.current.innerText = currentZ.toFixed(1);
            }

            // Determine active zone index (0 to 5) for telemetry & navigation state
            let newZoneIdx = 0;
            if (p >= 0.85) newZoneIdx = 5;
            else if (p >= 0.68) newZoneIdx = 4;
            else if (p >= 0.51) newZoneIdx = 3;
            else if (p >= 0.34) newZoneIdx = 2;
            else if (p >= 0.17) newZoneIdx = 1;
            else newZoneIdx = 0;

            if (currentZoneIndexRef.current !== newZoneIdx) {
              currentZoneIndexRef.current = newZoneIdx;
              setActiveZoneIndex(newZoneIdx);
              setActiveSection(ZONE_DEFINITIONS[newZoneIdx].id);
            }
          },
        });
      }
    });

    // Keyboard shortcut [~] / [ ` ] to toggle Terminal
    const handleGlobalKey = (e) => {
      if ((e.key === '`' || e.key === '~') && !isRackModalOpen) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);

    return () => {
      window.removeEventListener('keydown', handleGlobalKey);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isRackModalOpen]);

  // Smooth scroll navigation to target depth zone
  const handleNavigateToZone = useCallback((zoneIndex) => {
    if (!lenisRef.current) return;
    const targetDef = ZONE_DEFINITIONS[zoneIndex] || ZONE_DEFINITIONS[0];
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    lenisRef.current.scrollTo(targetDef.center * maxScroll, { duration: 1.4 });
  }, []);

  const handleNavigateToSection = useCallback((id, zProgress) => {
    if (!lenisRef.current) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetP = typeof zProgress === 'number' ? zProgress : 0;
    lenisRef.current.scrollTo(targetP * maxScroll, { duration: 1.4 });
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIsIntro(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
    <main className="relative bg-graphite text-ivory selection:bg-sage selection:text-graphite min-h-screen">
      {/* Cinematic Architectural Startup Animation */}
      {mounted && isIntro && (
        <StartupIntro onComplete={handleIntroComplete} />
      )}

      {/* 1. Master WebGL 3D Data Centre Canvas: Remains Visually Connected Across the Whole Journey */}
      {mounted && (
        <SceneContainer
          scrollProgressRef={scrollProgressRef}
          isIntro={isIntro}
          isProjecting={activeSection === 'discovery'}
          onOpenRackModal={() => setIsRackModalOpen(true)}
          sceneOpacity={1.0}
          onNavigateToSection={handleNavigateToSection}
          activeNavId={activeSection}
          perfConfig={perfConfig}
          onReportFrame={!isIntro ? reportFrame : undefined}
        />
      )}

      {/* 2. Interactive Data Server Facility Navigation Rail */}
      <div
        className={`transition-opacity duration-700 ${
          isIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <ServerSideNav
          activeNavId={activeSection}
          scrollProgressRef={scrollProgressRef}
          onNavigateToSection={handleNavigateToSection}
          onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        />
      </div>

      {/* 3. Spatial Telemetry & Depth Meter (Progressive corridor depth & hardware profiling) */}
      <div
        className={`transition-opacity duration-700 ${
          isIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <DepthTelemetry
          coordRef={depthCoordRef}
          activeZoneIndex={activeZoneIndex}
          perfTier={perfTier}
          perfConfig={perfConfig}
          fps={fps}
          onCycleTier={cycleTier}
        />
      </div>

      {/* 4. Interactive BDX-01 Autonomous Holographic Projector (Persistent) */}
      <div
        className={`transition-opacity duration-700 ${
          isIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <BdxHolographicProjector
          activeSection={activeSection}
          onNavigateSection={handleNavigateToSection}
        />
      </div>

      {/* Interactive Server Rack Telemetry Modal */}
      <ServerBladeModal
        isOpen={isRackModalOpen}
        onClose={() => setIsRackModalOpen(false)}
      />

      {/* Interactive Terminal CLI Window */}
      <TerminalCLI
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* ============================================================== */}
      {/* PROGRESSIVE DEPTH-BASED CONTENT REVEAL VIEWPORT (HUD OVERLAY)  */}
      {/* Open, borderless holographic HUD directly floating in the 3D world */}
      {/* ============================================================== */}
      <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
        {/* ZONE 01: ENTRY ZONE (Welcome, AI Club Intro, Primary Actions) */}
        <div
          className={`w-full max-w-6xl absolute transition-all duration-700 ease-out transform ${
            activeZoneIndex === 0
              ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
              : 'opacity-0 pointer-events-none translate-y-8 scale-95'
          }`}
        >
          <Zone1Hero onExploreClick={() => handleNavigateToZone(1)} />
        </div>

        {/* ZONE 02: FEATURED ZONE (Highlighted server cluster & upcoming activities) */}
        <div
          className={`w-full max-w-6xl absolute transition-all duration-700 ease-out transform ${
            activeZoneIndex === 1
              ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
              : 'opacity-0 pointer-events-none translate-y-8 scale-95'
          }`}
        >
          <Zone2Featured onNextZone={() => handleNavigateToZone(2)} />
        </div>

        {/* ZONE 03: COMMUNITY ZONE (Discussions, reading circles & student culture) */}
        <div
          className={`w-full max-w-6xl absolute transition-all duration-700 ease-out transform ${
            activeZoneIndex === 2
              ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
              : 'opacity-0 pointer-events-none translate-y-8 scale-95'
          }`}
        >
          <Zone3Community onNextZone={() => handleNavigateToZone(3)} />
        </div>

        {/* ZONE 04: RESEARCH ZONE (Intelligence Core, research tracks & preprints) */}
        <div
          className={`w-full max-w-6xl absolute transition-all duration-700 ease-out transform ${
            activeZoneIndex === 3
              ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
              : 'opacity-0 pointer-events-none translate-y-8 scale-95'
          }`}
        >
          <Zone4Research onNextZone={() => handleNavigateToZone(4)} />
        </div>

        {/* ZONE 05: PROJECTS ZONE (Project showcase displays & hardware builds) */}
        <div
          className={`w-full max-w-6xl absolute transition-all duration-700 ease-out transform ${
            activeZoneIndex === 4
              ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
              : 'opacity-0 pointer-events-none translate-y-8 scale-95'
          }`}
        >
          <Zone5Projects onNextZone={() => handleNavigateToZone(5)} />
        </div>

        {/* ZONE 06: DISCOVERY / EXIT ZONE (Final landmark & navigation hub) */}
        <div
          className={`w-full max-w-6xl absolute transition-all duration-700 ease-out transform ${
            activeZoneIndex === 5
              ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
              : 'opacity-0 pointer-events-none translate-y-8 scale-95'
          }`}
        >
          <Zone6Discovery onReturnTop={() => handleNavigateToZone(0)} />
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIRTUAL DEPTH SCROLL TRACK (DRIVES 3D TRAVEL & ZONE DISCOVERY) */}
      {/* 600vh total height = ~100vh of depth travel per zone           */}
      {/* ============================================================== */}
      <div ref={scrollTrackRef} className="relative w-full h-[600vh] pointer-events-none">
        {/* Invisible spatial waypoints for accessibility & screen readers */}
        <div className="sr-only">
          <h2>Data Centre Facility Corridor</h2>
          <p>Zone 1: Entry Threshold</p>
          <p>Zone 2: Featured Events & Hackathons</p>
          <p>Zone 3: Community Discussions & Working Groups</p>
          <p>Zone 4: Research Labs & Intelligence Core</p>
          <p>Zone 5: Project Showcase & Open Source Builds</p>
          <p>Zone 6: Discovery Hub & Membership Intake</p>
        </div>
      </div>
    </main>
  );
}
