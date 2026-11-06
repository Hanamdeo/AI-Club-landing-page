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
import DepthTelemetry from '@/components/ui/DepthTelemetry';
import ServerBladeModal from '@/components/ui/ServerBladeModal';
import TerminalCLI from '@/components/ui/TerminalCLI';
import BdxHolographicProjector from '@/components/ui/BdxHolographicProjector';

// EXPERIENCE A: IMMERSIVE 3D FACILITY (SECTIONS 01 - 03)
import Zone1Hero from '@/components/ui/zones/Zone1Hero';
import Zone2Foundation from '@/components/ui/zones/Zone2Foundation';
import Section03ProjectionChamber from '@/components/ui/zones/Section03ProjectionChamber';

// EXPERIENCE B: EDITORIAL ARCHIVE (SECTIONS 04 - 09)
import DiscussionRoom from '@/components/ui/editorial/DiscussionRoom';
import OperationsBoard from '@/components/ui/editorial/OperationsBoard';
import AiRadar from '@/components/ui/editorial/AiRadar';
import ProjectArchive from '@/components/ui/editorial/ProjectArchive';
import ThePeople from '@/components/ui/editorial/ThePeople';
import JoinTheNetwork from '@/components/ui/editorial/JoinTheNetwork';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const [scrollProgress3D, setScrollProgress3D] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeNavId, setActiveNavId] = useState('hero');
  const [isEditorialMode, setIsEditorialMode] = useState(false);

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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
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
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress3D(p);

            if (p < 0.35) {
              setActiveSection('hero');
              setActiveNavId('hero');
              setIsEditorialMode(false);
            } else if (p < 0.75) {
              setActiveSection('about');
              setActiveNavId('hero');
              setIsEditorialMode(false);
            } else {
              setActiveSection('chamber');
              setActiveNavId('hero');
              setIsEditorialMode(false);
            }
          },
        });
      }

      // 2. Observer triggers for Editorial Sections 4 to 9
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
            start: 'top 50%',
            end: 'bottom 50%',
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

      {/* 1. Master WebGL 3D Data Centre Canvas (Experience A: Sections 01 - 03) */}
      {mounted && (
        <SceneContainer
          scrollProgress={scrollProgress3D}
          isIntro={isIntro}
          isProjecting={activeSection === 'chamber'}
          onOpenRackModal={() => setIsRackModalOpen(true)}
          sceneOpacity={isEditorialMode ? 0.08 : 1.0}
        />
      )}

      {/* 2. Minimal HUD Navigation Bar */}
      <div
        className={`transition-opacity duration-700 ${
          isIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <HUDNavbar
          activeNavId={activeNavId}
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
          scrollProgress={scrollProgress3D}
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
      {/* ============================================================== */}
      <div ref={immersiveContainerRef} className="relative z-10 w-full pointer-events-none">
        {/* SECTION 01: THE ARRIVAL */}
        <div id="section-arrival" className="w-full">
          <Zone1Hero
            onExploreClick={() => handleNavigateToSection('intelligence-core', 'hero')}
          />
        </div>

        {/* SECTION 02: THE INTELLIGENCE CORE */}
        <div id="intelligence-core" className="w-full">
          <Zone2Foundation onInspectRack={() => setIsRackModalOpen(true)} />
        </div>

        {/* SECTION 03: THE PROJECTION CHAMBER */}
        <div id="section-chamber" className="w-full">
          <Section03ProjectionChamber
            onTransitionToEditorial={() => handleNavigateToSection('discussions', 'discussions')}
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* EXPERIENCE B: EDITORIAL ARCHIVE WEBSITE (SECTIONS 04 TO 09)    */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full bg-graphite/95 backdrop-blur-md">
        {/* SECTION 04: THE DISCUSSION ROOM */}
        <DiscussionRoom />

        {/* SECTION 05: THE OPERATIONS BOARD */}
        <OperationsBoard />

        {/* SECTION 06: AI RADAR */}
        <AiRadar />

        {/* SECTION 07: PROJECT ARCHIVE */}
        <ProjectArchive />

        {/* SECTION 08: THE PEOPLE */}
        <ThePeople />

        {/* SECTION 09: JOIN THE NETWORK */}
        <JoinTheNetwork
          onReturnTop={() => handleNavigateToSection('section-arrival', 'hero')}
        />
      </div>
    </main>
  );
}
