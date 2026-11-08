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

import HUDNavbar from '@/components/ui/HUDNavbar';
import ServerSideNav from '@/components/ui/ServerSideNav';
import DepthTelemetry from '@/components/ui/DepthTelemetry';
import ServerBladeModal from '@/components/ui/ServerBladeModal';
import TerminalCLI from '@/components/ui/TerminalCLI';
import BdxHolographicProjector from '@/components/ui/BdxHolographicProjector';

// EXPERIENCE A: IMMERSIVE 3D FACILITY (SECTIONS 01 - 03)
import Zone1Hero from '@/components/ui/zones/Zone1Hero';
import Zone2Foundation from '@/components/ui/zones/Zone2Foundation';
import Section03ProjectionChamber from '@/components/ui/zones/Section03ProjectionChamber';

// EXPERIENCE B: FACILITY TERMINAL & EDITORIAL ARCHIVE (SECTIONS 04 - 09)
import DiscussionRoom from '@/components/ui/editorial/DiscussionRoom';
import OperationsBoard from '@/components/ui/editorial/OperationsBoard';
import AiRadar from '@/components/ui/editorial/AiRadar';
import ProjectArchive from '@/components/ui/editorial/ProjectArchive';
import ThePeople from '@/components/ui/editorial/ThePeople';
import JoinTheNetwork from '@/components/ui/editorial/JoinTheNetwork';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeNavId, setActiveNavId] = useState('hero');
  const [isEditorialMode, setIsEditorialMode] = useState(false);

  // Performance-optimized shared refs: zero React re-render thrashing during scroll
  const scrollProgressRef = useRef(0);
  const currentSectionRef = useRef('hero');
  const depthCoordRef = useRef(null);

  // Modal & Terminal States
  const [isRackModalOpen, setIsRackModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const containerRef = useRef(null);
  const immersiveContainerRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize GSAP & Lenis smooth scroll
  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.8,
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

    // 1. ScrollTrigger dedicated to Experience A (Sections 1 to 3)
    const ctx = gsap.context(() => {
      if (immersiveContainerRef.current) {
        ScrollTrigger.create({
          trigger: immersiveContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
          onUpdate: (self) => {
            const p = self.progress;
            scrollProgressRef.current = p;

            // Direct DOM update for DepthTelemetry coordinate (zero React re-render)
            if (depthCoordRef.current) {
              const currentZ = 12.5 + p * (-35.0 - 12.5);
              depthCoordRef.current.innerText = currentZ.toFixed(1);
            }

            // Only trigger React state updates when crossing zone thresholds!
            const newZone = p < 0.35 ? 'hero' : p < 0.75 ? 'about' : 'chamber';
            if (currentSectionRef.current !== newZone) {
              currentSectionRef.current = newZone;
              setActiveSection(newZone);
              setActiveNavId('hero');
              setIsEditorialMode(false);
            }
          },
        });
      }

      // 2. Dedicated Trigger for entering the Central Editorial Archive
      const archiveEl = document.getElementById('editorial-archive');
      if (archiveEl) {
        ScrollTrigger.create({
          trigger: archiveEl,
          start: 'top 85%',
          end: 'bottom top',
          onEnter: () => setIsEditorialMode(true),
          onLeaveBack: () => setIsEditorialMode(false),
        });
      }

      // 3. Observer triggers for Editorial Sections 4 to 9
      const editorialSections = [
        { id: 'discussions', navId: 'discussions' },
        { id: 'events', navId: 'events' },
        { id: 'radar', navId: 'radar' },
        { id: 'projects', navId: 'projects' },
        { id: 'team', navId: 'team' },
        { id: 'join-network', navId: 'join' },
      ];

      editorialSections.forEach(({ id, navId }) => {
        const el = document.getElementById(id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 45%',
            end: 'bottom 45%',
            onEnter: () => {
              setActiveSection(id);
              setActiveNavId(navId);
              setIsEditorialMode(true);
            },
            onEnterBack: () => {
              setActiveSection(id);
              setActiveNavId(navId);
              setIsEditorialMode(true);
            },
          });
        }
      });
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

  // Smooth scroll navigation to target element ID
  const handleNavigateToSection = useCallback((targetId, navId) => {
    setActiveNavId(navId);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetElement, { duration: 1.4, offset: -40 });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <main className="relative bg-graphite text-ivory selection:bg-sage selection:text-graphite min-h-screen">
      {/* Cinematic Architectural Startup Animation */}
      {mounted && isIntro && <StartupIntro onComplete={() => setIsIntro(false)} />}

      {/* 1. Master WebGL 3D Data Centre Canvas: Remains Visually Connected Across the Whole Journey */}
      {mounted && (
        <SceneContainer
          scrollProgressRef={scrollProgressRef}
          isIntro={isIntro}
          isProjecting={activeSection === 'chamber'}
          onOpenRackModal={() => setIsRackModalOpen(true)}
          sceneOpacity={isEditorialMode ? 0.35 : 1.0}
          onNavigateToSection={handleNavigateToSection}
          activeNavId={activeNavId}
        />
      )}

      {/* 2. Interactive Data Server Facility Navigation Rail (from GsR) */}
      <div
        className={`transition-opacity duration-700 ${
          isIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <ServerSideNav
          activeNavId={activeNavId}
          scrollProgressRef={scrollProgressRef}
          onNavigateToSection={handleNavigateToSection}
          onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
          isEditorialMode={isEditorialMode}
        />
      </div>

      {/* 3. Spatial Telemetry & Depth Meter (in Experience A) */}
      <div
        className={`transition-opacity duration-700 ${
          isIntro || isEditorialMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <DepthTelemetry
          coordRef={depthCoordRef}
          activeZoneIndex={activeSection === 'hero' ? 0 : activeSection === 'about' ? 1 : 2}
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
      {/* EXPERIENCE A: IMMERSIVE 3D FACILITY (SECTIONS 01 TO 03)        */}
      {/* In-environment floating holographic screens & server displays  */}
      {/* ============================================================== */}
      <div ref={immersiveContainerRef} className="relative z-10 w-full pointer-events-none">
        {/* SECTION 01: THE ARRIVAL (Holographic Information Terminal) */}
        <div id="section-arrival" className="w-full">
          <Zone1Hero
            onExploreClick={() => handleNavigateToSection('intelligence-core', 'hero')}
          />
        </div>

        {/* SECTION 02: THE INTELLIGENCE CORE (Rack-Mounted Server Consoles) */}
        <div id="intelligence-core" className="w-full">
          <Zone2Foundation onInspectRack={() => setIsRackModalOpen(true)} />
        </div>

        {/* SECTION 03: THE PROJECTION CHAMBER (Volumetric Emitter Screen) */}
        <div id="section-chamber" className="w-full">
          <Section03ProjectionChamber
            onTransitionToEditorial={() => handleNavigateToSection('discussions', 'discussions')}
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* EXPERIENCE B: CENTRAL FACILITY TERMINAL & ARCHIVE (04 TO 09)   */}
      {/* Coherent environmental backdrop with atmospheric depth         */}
      {/* ============================================================== */}
      <div
        id="editorial-archive"
        className="relative z-20 w-full bg-[#0A0E10]/92 backdrop-blur-xl border-t border-white/[0.08] bg-facility-grid"
      >
        {/* ARCHITECTURAL TRANSITION GATEWAY: VOLUMETRIC CORRIDOR ➔ ARCHIVE DOCK */}
        <div className="relative w-full py-10 px-6 sm:px-10 flex flex-col items-center justify-center border-b border-white/[0.08] bg-gradient-to-b from-[#0E1214]/95 via-[#0A0E10]/92 to-[#0A0E10]/95">
          {/* Emitter Conduit Optical Alignment Telemetry */}
          <div className="w-full max-w-4xl flex items-center justify-between gap-4 mb-3.5 text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-sage">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse shadow-[0_0_6px_rgba(162,178,159,0.5)]" />
              <span>TERMINAL DOCKING PROTOCOL: ENGAGED</span>
            </span>
            <span className="hidden sm:inline-block text-slate-500">
              OPTICAL DATA BUS // LATENCY: 0.8ms
            </span>
            <span className="text-sage font-semibold">6 REPOSITORIES ONLINE</span>
          </div>

          {/* Central Decompression Status Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2 rounded-xl bg-[#141819]/90 border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.5)] corner-reticle text-xs font-mono text-[#A7B7A1]">
            <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse shadow-[0_0_8px_#22C55E]" />
            <span className="font-bold tracking-widest uppercase text-ivory">
              CENTRAL FACILITY TERMINAL
            </span>
            <span className="text-white/20">|</span>
            <span className="tracking-wider uppercase text-[11px] text-sage">
              RESEARCH ARCHIVES & INTEL COMMONS
            </span>
          </div>

          {/* Sector Breadcrumb Navigation Bar */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] font-mono text-slate-400">
            <span className="text-slate-500">SECTOR TRAJECTORY:</span>
            <span className="text-slate-400">01 ARRIVAL</span>
            <span className="text-white/20">➔</span>
            <span className="text-slate-400">02 CORE</span>
            <span className="text-white/20">➔</span>
            <span className="text-slate-400">03 CHAMBER</span>
            <span className="text-white/20">➔</span>
            <span className="text-sage font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              04-09 ARCHIVAL COMMONS
            </span>
          </div>
        </div>

        {/* SECTION 04: THE DISCUSSION ROOM (Clean, High-Contrast 2D Layout) */}
        <DiscussionRoom />

        {/* SECTION 05: THE OPERATIONS BOARD (Live Project & Milestone Sprints) */}
        <OperationsBoard />

        {/* SECTION 06: AI RADAR (Model & Technology Radar Horizon) */}
        <AiRadar />

        {/* SECTION 07: PROJECT ARCHIVE (Searchable & Filterable Research Papers & Repos) */}
        <ProjectArchive />

        {/* SECTION 08: THE PEOPLE (Student Leads & Research Cadre Directory) */}
        <ThePeople />

        {/* SECTION 09: JOIN THE NETWORK (Access Clearance Application Terminal) */}
        <JoinTheNetwork
          onReturnTop={() => handleNavigateToSection('section-arrival', 'hero')}
        />
      </div>
    </main>
  );
}
