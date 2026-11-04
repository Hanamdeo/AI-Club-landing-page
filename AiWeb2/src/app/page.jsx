'use client';

import React, { useState, useEffect, useRef } from 'react';
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

import Zone1Hero from '@/components/ui/zones/Zone1Hero';
import Zone2Foundation from '@/components/ui/zones/Zone2Foundation';
import Zone3Research from '@/components/ui/zones/Zone3Research';
import Zone4Operations from '@/components/ui/zones/Zone4Operations';
import Zone5Archive from '@/components/ui/zones/Zone5Archive';
import Zone6Community from '@/components/ui/zones/Zone6Community';
import Zone7Exit from '@/components/ui/zones/Zone7Exit';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);

  // Modal & Terminal States
  const [isRackModalOpen, setIsRackModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const containerRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize GSAP & Lenis smooth scroll
  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    // Initialize smooth scrolling with Lenis
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

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Master ScrollTrigger tracking total facility travel
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Determine current active zone (0 to 6)
          const zoneIndex = Math.min(
            6,
            Math.max(0, Math.round(progress * 6))
          );
          setActiveZoneIndex(zoneIndex);
        },
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

  // Jump smoothly to a specific facility zone
  const handleNavigateToZone = (index) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = (index / 6) * totalHeight;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, { duration: 1.4 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative bg-transparent text-ivory selection:bg-sage selection:text-graphite min-h-screen">
      {/* Cinematic Architectural Startup Animation */}
      {mounted && isIntro && <StartupIntro onComplete={() => setIsIntro(false)} />}

      {/* 1. Master WebGL 3D Data Centre Environment (Fixed) with Interactive Landmarks */}
      {mounted && (
        <SceneContainer
          scrollProgress={scrollProgress}
          isIntro={isIntro}
          onOpenRackModal={() => setIsRackModalOpen(true)}
        />
      )}

      {/* 2. Minimal HUD Navigation (Fades in once intro completes) */}
      <div
        className={`transition-opacity duration-700 ${
          isIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <HUDNavbar
          activeZoneIndex={activeZoneIndex}
          onNavigate={handleNavigateToZone}
          onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        />
      </div>

      {/* 3. Spatial Telemetry & Depth Meter */}
      <div
        className={`transition-opacity duration-700 ${
          isIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <DepthTelemetry
          scrollProgress={scrollProgress}
          activeZoneIndex={activeZoneIndex}
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
        onNavigateToZone={handleNavigateToZone}
      />

      {/* 4. Scrollable Container with 7 Architectural Facility Zones */}
      <div ref={containerRef} className="relative z-10 w-full pointer-events-none">
        {/* ZONE 01: ENTRANCE — HERO */}
        <div id="zone-hero" className="w-full">
          <Zone1Hero onExploreClick={() => handleNavigateToZone(1)} />
        </div>

        {/* ZONE 02: THE FOUNDATION — ABOUT US */}
        <div id="zone-about" className="w-full">
          <Zone2Foundation onInspectRack={() => setIsRackModalOpen(true)} />
        </div>

        {/* ZONE 03: RESEARCH LAB — AI RESEARCH */}
        <div id="zone-research" className="w-full">
          <Zone3Research />
        </div>

        {/* ZONE 04: OPERATIONS CENTRE — EVENTS */}
        <div id="zone-operations" className="w-full">
          <Zone4Operations />
        </div>

        {/* ZONE 05: PROJECT ARCHIVE — PROJECTS */}
        <div id="zone-projects" className="w-full">
          <Zone5Archive />
        </div>

        {/* ZONE 06: COMMUNITY HUB — TEAM */}
        <div id="zone-team" className="w-full">
          <Zone6Community />
        </div>

        {/* ZONE 07: THE EXIT — JOIN AI CLUB */}
        <div id="zone-exit" className="w-full">
          <Zone7Exit onReturnTop={() => handleNavigateToZone(0)} />
        </div>
      </div>
    </main>
  );
}
