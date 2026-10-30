'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PhoenixModel } from './PhoenixModel';
import { PhoenixParticles } from './PhoenixParticles';
import { WebGLFallback } from '@/components/ui/WebGLFallback';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useWindowSize } from '@/hooks/useWindowSize';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger safely in browser
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Scene Controller component inside the Canvas
function SceneController({ isMobile, isReducedMotion }) {
  const phoenixGroupRef = useRef();
  const [velocity, setVelocity] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined' || !phoenixGroupRef.current) return;

    const group = phoenixGroupRef.current;

    // Mobile vs Desktop target coordinates
    const scaleFactor = isMobile ? 0.65 : 1.0;
    const xHero = isMobile ? 0 : 2.1;
    const yHero = isMobile ? 0.8 : -0.1;

    // Phase A: Set initial position in navbar emblem region
    gsap.set(group.position, {
      x: isMobile ? 0 : -3.2,
      y: isMobile ? 2.8 : 2.4,
      z: -3.8,
    });
    gsap.set(group.scale, {
      x: 0.35 * scaleFactor,
      y: 0.35 * scaleFactor,
      z: 0.35 * scaleFactor,
    });
    gsap.set(group.rotation, {
      x: 0.1,
      y: 0.4,
      z: 0,
    });

    if (isReducedMotion) {
      gsap.to(group.position, { x: xHero, y: yHero, z: 0, duration: 1 });
      gsap.to(group.scale, {
        x: 1.0 * scaleFactor,
        y: 1.0 * scaleFactor,
        z: 1.0 * scaleFactor,
        duration: 1,
      });
      return;
    }

    // Phase B: Cinematic curved flight entrance (Navbar -> Hero)
    const introTl = gsap.timeline({ delay: 0.2 });

    introTl
      // Dive & accelerate across center
      .to(group.position, {
        x: isMobile ? 0 : 0.4,
        y: isMobile ? 1.4 : -0.8,
        z: -1.2,
        duration: 1.3,
        ease: 'power2.in',
        onStart: () => setVelocity(2.2),
      })
      .to(
        group.rotation,
        {
          x: -0.2,
          y: -0.7,
          z: 0.4, // aerodynamic banking
          duration: 1.3,
          ease: 'power2.in',
        },
        '<'
      )
      // Swoop up into hero right section with breathing room
      .to(group.position, {
        x: xHero,
        y: yHero,
        z: 0,
        duration: 1.5,
        ease: 'power3.out',
        onComplete: () => setVelocity(1.0),
      })
      .to(
        group.scale,
        {
          x: 1.0 * scaleFactor,
          y: 1.0 * scaleFactor,
          z: 1.0 * scaleFactor,
          duration: 1.5,
          ease: 'power3.out',
        },
        '<'
      )
      .to(
        group.rotation,
        {
          x: 0.05,
          y: isMobile ? 0 : -0.5,
          z: 0.05,
          duration: 1.5,
          ease: 'power3.out',
        },
        '<'
      );

    // Phase D: ScrollTrigger Journey across editorial sections
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    // 01. About Section: Cruising glide slightly backgrounded
    scrollTl.to(group.position, {
      x: isMobile ? 0 : 1.4,
      y: isMobile ? -0.8 : -0.5,
      z: -1.8,
      ease: 'power1.inOut',
    });
    scrollTl.to(
      group.rotation,
      {
        x: -0.1,
        y: isMobile ? 0 : -0.3,
        z: -0.1,
        ease: 'power1.inOut',
      },
      '<'
    );

    // 02. AI Research Radar: Glides to left flank, projecting scan
    scrollTl.to(group.position, {
      x: isMobile ? 0 : -1.8,
      y: isMobile ? 0.6 : 0.2,
      z: -0.9,
      ease: 'power1.inOut',
    });
    scrollTl.to(
      group.rotation,
      {
        x: 0.15,
        y: isMobile ? 0 : 0.7,
        z: -0.1,
        ease: 'power1.inOut',
      },
      '<'
    );

    // 03. Events & Arena: High aerodynamic perch over flagship banner
    scrollTl.to(group.position, {
      x: isMobile ? 0 : 1.8,
      y: isMobile ? 1.0 : 0.7,
      z: -1.2,
      ease: 'power1.inOut',
    });
    scrollTl.to(
      group.rotation,
      {
        x: 0.1,
        y: isMobile ? 0 : -0.6,
        z: 0.15,
        ease: 'power1.inOut',
      },
      '<'
    );

    // 04. Dialectic Arena (GD): Center overhead council stance
    scrollTl.to(group.position, {
      x: 0,
      y: 0.9,
      z: -1.4,
      ease: 'power1.inOut',
    });
    scrollTl.to(
      group.rotation,
      {
        x: 0.3,
        y: 0,
        z: 0,
        ease: 'power1.inOut',
      },
      '<'
    );

    // 05. Chronicles & Gallery: Pulls back into deep space for parallax
    scrollTl.to(group.position, {
      x: isMobile ? 0 : 1.5,
      y: 0.4,
      z: -2.8,
      ease: 'power1.inOut',
    });
    scrollTl.to(
      group.rotation,
      {
        x: 0.0,
        y: isMobile ? 0 : -0.4,
        z: 0.0,
        ease: 'power1.inOut',
      },
      '<'
    );

    // 06. Dispatches & Insights: Sweeps gracefully across the background
    scrollTl.to(group.position, {
      x: isMobile ? 0 : -1.5,
      y: 0.2,
      z: -2.2,
      ease: 'power1.inOut',
    });
    scrollTl.to(
      group.rotation,
      {
        x: 0.1,
        y: isMobile ? 0 : 0.4,
        z: 0.05,
        ease: 'power1.inOut',
      },
      '<'
    );

    // 07. Research Council: Anchors right margin beside leadership directory
    scrollTl.to(group.position, {
      x: isMobile ? 0 : 1.5,
      y: -0.3,
      z: -1.3,
      ease: 'power1.inOut',
    });
    scrollTl.to(
      group.rotation,
      {
        x: 0.1,
        y: isMobile ? 0 : -0.5,
        z: 0.0,
        ease: 'power1.inOut',
      },
      '<'
    );

    // 08. Finale & Footer: Ascending soaring pose into the sky
    scrollTl.to(group.position, {
      x: 0,
      y: 0.6,
      z: isMobile ? -1.0 : 0.2,
      ease: 'power2.out',
    });
    scrollTl.to(
      group.scale,
      {
        x: 1.15 * scaleFactor,
        y: 1.15 * scaleFactor,
        z: 1.15 * scaleFactor,
        ease: 'power2.out',
      },
      '<'
    );
    scrollTl.to(
      group.rotation,
      {
        x: 0.1,
        y: 0,
        z: 0,
        ease: 'power2.out',
      },
      '<'
    );

    return () => {
      introTl.kill();
      scrollTl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile, isReducedMotion]);

  return (
    <group ref={phoenixGroupRef}>
      <Suspense fallback={null}>
        <PhoenixModel flightVelocity={velocity} />
      </Suspense>
      <PhoenixParticles isMobile={isMobile} />
    </group>
  );
}

export function PhoenixCanvas() {
  const { isMobile } = useWindowSize();
  const isReducedMotion = useReducedMotion();
  const [hasWebGL, setHasWebGL] = useState(true);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center opacity-40">
        <WebGLFallback />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        {/* Cinematic Multi-Point Lighting */}
        <ambientLight intensity={0.4} color="#0B1929" />
        
        {/* Key Electric Blue Light from Front-Right */}
        <directionalLight
          position={[6, 5, 5]}
          intensity={2.5}
          color="#147DFF"
        />

        {/* Cobalt / Cyan Rim Light from Top-Left */}
        <directionalLight
          position={[-6, 4, -4]}
          intensity={3.2}
          color="#49D8FF"
        />

        {/* Warm Flame Orange Accent Fill from Below */}
        <pointLight
          position={[0, -3, 2]}
          intensity={1.6}
          color="#FF7138"
          distance={10}
        />

        {/* Scene Mascot & Particles */}
        <SceneController
          isMobile={isMobile}
          isReducedMotion={isReducedMotion}
        />
      </Canvas>
    </div>
  );
}
