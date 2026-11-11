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

const ZONE_DEFINITIONS = [
  { id: 'entry', index: 0, label: '01 Entry', center: 0.08, zProgress: 0.00 },
  { id: 'featured', index: 1, label: '02 Featured', center: 0.25, zProgress: 0.20 },
  { id: 'community', index: 2, label: '03 Community', center: 0.42, zProgress: 0.40 },
  { id: 'research', index: 3, label: '04 Research', center: 0.59, zProgress: 0.60 },
  { id: 'projects', index: 4, label: '05 Projects', center: 0.76, zProgress: 0.80 },
  { id: 'discovery', index: 5, label: '06 Discovery', center: 0.93, zProgress: 1.00 },
];

let hasGlobalIntroPlayed = false;

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isIntro, setIsIntro] = useState(() => !hasGlobalIntroPlayed);
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('entry');

  // Performance-optimized shared refs: zero React re-render thrashing during scroll
  const scrollProgressRef = useRef(0);
  const currentZoneIndexRef = useRef(0);

  // Modal & Terminal States
  const [isRackModalOpen, setIsRackModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const scrollTrackRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize GSAP & Lenis smooth scroll
  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window === 'undefined') return false;
      const isNarrow = window.innerWidth < 768;
      const isMobilePhoneUA = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return isNarrow || (isMobilePhoneUA && window.innerWidth < 1024);
    };

    const isMobile = checkIsMobile();
    setIsMobileDevice(isMobile);

    const handleResize = () => {
      setIsMobileDevice(checkIsMobile());
    };
    window.addEventListener('resize', handleResize, { passive: true });

    if (isMobile || hasGlobalIntroPlayed) {
      setIsIntro(false);
    }
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    // Only instantiate Lenis on desktop / pointer:fine devices to preserve buttery native hardware touch momentum on mobile
    let lenis = null;
    let tickerUpdate = null;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 0.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      tickerUpdate = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerUpdate);
      gsap.ticker.lagSmoothing(500, 33);
    }

    // Progressive Depth ScrollTrigger driving the entire 3D data centre journey
    const ctx = gsap.context(() => {
      if (scrollTrackRef.current) {
        ScrollTrigger.create({
          trigger: scrollTrackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: isMobile ? true : 0.25,
          onUpdate: (self) => {
            const p = self.progress;
            scrollProgressRef.current = p;

            // Determine active zone index (0 to 5) for navigation state
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
              if (typeof window !== 'undefined') {
                window.dispatchEvent(
                  new CustomEvent('facility-zone-change', {
                    detail: { zoneIndex: newZoneIdx, id: ZONE_DEFINITIONS[newZoneIdx].id },
                  })
                );
              }
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
      window.removeEventListener('resize', handleResize);
      if (tickerUpdate) gsap.ticker.remove(tickerUpdate);
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isRackModalOpen]);

  // Smooth, snappy scroll navigation to target depth zone (instant UI response + 0.75s camera glide)
  const handleNavigateToZone = useCallback((zoneIndex) => {
    const targetDef = ZONE_DEFINITIONS[zoneIndex] || ZONE_DEFINITIONS[0];
    currentZoneIndexRef.current = zoneIndex;
    setActiveZoneIndex(zoneIndex);
    setActiveSection(targetDef.id);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('facility-zone-change', {
          detail: { zoneIndex, id: targetDef.id },
        })
      );
    }
    if (lenisRef.current) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = targetDef.center * maxScroll;
      lenisRef.current.scrollTo(targetScroll, { duration: 0.75 });
    } else {
      const sectionIds = ['section-arrival', 'section-featured', 'section-community', 'section-research', 'section-projects', 'section-discovery'];
      const targetId = sectionIds[zoneIndex] || 'section-arrival';
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleNavigateToSection = useCallback((id, zProgress) => {
    const zoneIdx = ZONE_DEFINITIONS.findIndex((z) => z.id === id);
    if (zoneIdx !== -1) {
      currentZoneIndexRef.current = zoneIdx;
      setActiveZoneIndex(zoneIdx);
      setActiveSection(id);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('facility-zone-change', {
            detail: { zoneIndex: zoneIdx, id },
          })
        );
      }
    }
    if (lenisRef.current) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetP = typeof zProgress === 'number' ? zProgress : 0;
      const targetScroll = targetP * maxScroll;
      lenisRef.current.scrollTo(targetScroll, { duration: 0.75 });
    } else {
      const targetId = id === 'entry' ? 'section-arrival' : `section-${id}`;
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Listen for global navigation events from top HUDNavbar
  useEffect(() => {
    const handleFacilityNav = (e) => {
      const { id, zProgress, zoneIndex } = e.detail || {};
      if (typeof zoneIndex === 'number') {
        handleNavigateToZone(zoneIndex);
      } else if (id) {
        const found = ZONE_DEFINITIONS.find((z) => z.id === id);
        if (found) {
          handleNavigateToSection(found.id, found.center);
        }
      }
    };
    window.addEventListener('facility-navigate', handleFacilityNav);
    return () => window.removeEventListener('facility-navigate', handleFacilityNav);
  }, [handleNavigateToZone, handleNavigateToSection]);

  return (
    <main className="relative bg-graphite text-ivory selection:bg-sage selection:text-graphite min-h-screen">
      {/* Cinematic Architectural Startup Animation */}
      {mounted && isIntro && (
        <StartupIntro
          onComplete={() => {
            hasGlobalIntroPlayed = true;
            setIsIntro(false);
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 100);
          }}
        />
      )}

      {/* 1. Master WebGL 3D Data Centre Canvas: Exclusively Rendered on Desktop / Laptops */}
      {mounted && !isMobileDevice && (
        <SceneContainer
          scrollProgressRef={scrollProgressRef}
          isIntro={isIntro}
          isProjecting={activeSection === 'discovery'}
          onOpenRackModal={() => setIsRackModalOpen(true)}
          sceneOpacity={1.0}
          onNavigateToSection={handleNavigateToSection}
          activeNavId={activeSection}
        />
      )}

      {/* 1b. Mobile Pure CSS Cyber Backdrop: Zero WebGL Context / Zero GPU Shaders */}
      {isMobileDevice && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0E10]" aria-hidden="true">
          <div className="absolute inset-0 bg-facility-grid opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_15%,rgba(162,178,159,0.10),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_85%,rgba(142,213,232,0.07),transparent_70%)]" />
        </div>
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

      {/* 3. Interactive BDX-01 Autonomous Holographic Projector (Persistent) */}
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
      {/* CONTENT REVEAL VIEWPORT                                        */}
      {/* - Mobile: Natural continuous document flow with full readability */}
      {/* - Desktop: Progressive Depth-Based HUD Overlay (3D Camera Travel) */}
      {/* ============================================================== */}
      {isMobileDevice ? (
        <div className="relative z-10 w-full flex flex-col gap-14 px-4 pt-20 pb-28">
          <section id="section-arrival" className="w-full">
            <Zone1Hero onExploreClick={() => handleNavigateToZone(1)} />
          </section>

          <section id="section-featured" className="w-full">
            <Zone2Featured onNextZone={() => handleNavigateToZone(2)} />
          </section>

          <section id="section-community" className="w-full">
            <Zone3Community onNextZone={() => handleNavigateToZone(3)} />
          </section>

          <section id="section-research" className="w-full">
            <Zone4Research onNextZone={() => handleNavigateToZone(4)} />
          </section>

          <section id="section-projects" className="w-full">
            <Zone5Projects onNextZone={() => handleNavigateToZone(5)} />
          </section>

          <section id="section-discovery" className="w-full">
            <Zone6Discovery onReturnTop={() => handleNavigateToZone(0)} />
          </section>
        </div>
      ) : (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {/* ZONE 01: ENTRY ZONE (Welcome, AI Club Intro, Primary Actions) */}
          <div
            className={`w-full h-full absolute inset-0 transition-all duration-300 ease-out transform pointer-events-none ${
              activeZoneIndex === 0
                ? 'opacity-100 translate-y-0 scale-100 visible'
                : 'opacity-0 translate-y-8 scale-95 invisible pointer-events-none'
            }`}
          >
            <Zone1Hero onExploreClick={() => handleNavigateToZone(1)} />
          </div>

          {/* ZONE 02: FEATURED ZONE (Highlighted server cluster & upcoming activities) */}
          <div
            className={`w-full h-full absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all duration-200 ease-out transform ${
              activeZoneIndex === 1
                ? 'opacity-100 translate-y-0 scale-100 visible'
                : 'opacity-0 translate-y-8 scale-95 invisible pointer-events-none'
            }`}
          >
            <div className="w-full max-w-6xl">
              <Zone2Featured onNextZone={() => handleNavigateToZone(2)} />
            </div>
          </div>

          {/* ZONE 03: COMMUNITY ZONE (Discussions, reading circles & student culture) */}
          <div
            className={`w-full h-full absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all duration-200 ease-out transform ${
              activeZoneIndex === 2
                ? 'opacity-100 translate-y-0 scale-100 visible'
                : 'opacity-0 translate-y-8 scale-95 invisible pointer-events-none'
            }`}
          >
            <div className="w-full max-w-6xl">
              <Zone3Community onNextZone={() => handleNavigateToZone(3)} />
            </div>
          </div>

          {/* ZONE 04: RESEARCH ZONE (Intelligence Core, research tracks & preprints) */}
          <div
            className={`w-full h-full absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all duration-200 ease-out transform ${
              activeZoneIndex === 3
                ? 'opacity-100 translate-y-0 scale-100 visible'
                : 'opacity-0 translate-y-8 scale-95 invisible pointer-events-none'
            }`}
          >
            <div className="w-full max-w-6xl">
              <Zone4Research onNextZone={() => handleNavigateToZone(4)} />
            </div>
          </div>

          {/* ZONE 05: PROJECTS ZONE (Project showcase displays & hardware builds) */}
          <div
            className={`w-full h-full absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all duration-200 ease-out transform ${
              activeZoneIndex === 4
                ? 'opacity-100 translate-y-0 scale-100 visible'
                : 'opacity-0 translate-y-8 scale-95 invisible pointer-events-none'
            }`}
          >
            <div className="w-full max-w-6xl">
              <Zone5Projects onNextZone={() => handleNavigateToZone(5)} />
            </div>
          </div>

          {/* ZONE 06: DISCOVERY / EXIT ZONE (Final landmark & navigation hub) */}
          <div
            className={`w-full h-full absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all duration-200 ease-out transform ${
              activeZoneIndex === 5
                ? 'opacity-100 translate-y-0 scale-100 visible'
                : 'opacity-0 translate-y-8 scale-95 invisible pointer-events-none'
            }`}
          >
            <div className="w-full max-w-6xl">
              <Zone6Discovery onReturnTop={() => handleNavigateToZone(0)} />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIRTUAL DEPTH SCROLL TRACK (DRIVES 3D TRAVEL & ZONE DISCOVERY) */}
      {/* Rendered ONLY on desktop to drive 3D WebGL camera depth        */}
      {/* ============================================================== */}
      {!isMobileDevice && (
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
      )}
    </main>
  );
}
