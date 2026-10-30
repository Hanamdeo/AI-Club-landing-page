'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
    const xOffset = isMobile ? 0 : 2.2;
    const yOffset = isMobile ? 1.0 : 0.1;

    // Set initial position: Navbar emblem region (top-left)
    gsap.set(group.position, {
      x: isMobile ? 0 : -3.2,
      y: isMobile ? 3.0 : 2.5,
      z: -4.0,
    });
    gsap.set(group.scale, {
      x: 0.4 * scaleFactor,
      y: 0.4 * scaleFactor,
      z: 0.4 * scaleFactor,
    });
    gsap.set(group.rotation, {
      x: 0.1,
      y: 0.5,
      z: 0,
    });

    if (isReducedMotion) {
      // Gentle static placement beside hero
      gsap.to(group.position, { x: xOffset, y: yOffset, z: 0, duration: 1 });
      gsap.to(group.scale, {
        x: 1.8 * scaleFactor,
        y: 1.8 * scaleFactor,
        z: 1.8 * scaleFactor,
        duration: 1,
      });
      return;
    }

    // Phase A & B: Flight entrance animation (Navbar -> Hero)
    const introTl = gsap.timeline({ delay: 0.3 });

    introTl
      // Curve flight swoop
      .to(group.position, {
        x: isMobile ? 0 : 0.5,
        y: isMobile ? 1.5 : -0.6,
        z: -1.5,
        duration: 1.2,
        ease: 'power2.in',
        onStart: () => setVelocity(2.5),
      })
      .to(
        group.rotation,
        {
          x: -0.2,
          y: -0.8,
          z: 0.35, // banking
          duration: 1.2,
          ease: 'power2.in',
        },
        '<'
      )
      // Swoop up into hero right section
      .to(group.position, {
        x: xOffset,
        y: yOffset,
        z: 0,
        duration: 1.4,
        ease: 'power3.out',
        onComplete: () => setVelocity(1.0),
      })
      .to(
        group.scale,
        {
          x: 1.8 * scaleFactor,
          y: 1.8 * scaleFactor,
          z: 1.8 * scaleFactor,
          duration: 1.4,
          ease: 'power3.out',
        },
        '<'
      )
      .to(
        group.rotation,
        {
          x: 0.1,
          y: isMobile ? 0 : -0.6,
          z: 0.05,
          duration: 1.4,
          ease: 'power3.out',
        },
        '<'
      );

    // Phase D: ScrollTrigger Journey across sections
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    // 03. About Section: Cruising glide slightly backgrounded
    scrollTl.to(group.position, {
      x: isMobile ? 0 : 1.6,
      y: isMobile ? -0.8 : -0.4,
      z: -2.0,
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

    // 04. AI Research Radar: Glides to left flank, projecting scan
    scrollTl.to(group.position, {
      x: isMobile ? 0 : -2.2,
      y: isMobile ? 0.8 : 0.2,
      z: -0.8,
      ease: 'power1.inOut',
    });
    scrollTl.to(
      group.rotation,
      {
        x: 0.2,
        y: isMobile ? 0 : 0.8,
        z: -0.1,
        ease: 'power1.inOut',
      },
      '<'
    );

    // 05. Events & Arena: High aerodynamic perch over events
    scrollTl.to(group.position, {
      x: isMobile ? 0 : 2.0,
      y: isMobile ? 1.2 : 0.9,
      z: -1.2,
      ease: 'power1.inOut',
    });
    scrollTl.to(
      group.rotation,
      {
        x: 0.1,
        y: isMobile ? 0 : -0.7,
        z: 0.2,
        ease: 'power1.inOut',
      },
      '<'
    );

    // 06. GD Room: Center overhead council stance
    scrollTl.to(group.position, {
      x: 0,
      y: 1.1,
      z: -1.6,
      ease: 'power1.inOut',
    });
    scrollTl.to(
      group.rotation,
      {
        x: 0.35,
        y: 0,
        z: 0,
        ease: 'power1.inOut',
      },
      '<'
    );

    // 07. Gallery & Chronicles: Pulls back into deep space for gallery parallax
    scrollTl.to(group.position, {
      x: isMobile ? 0 : 1.8,
      y: 0.4,
      z: -3.2,
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

    // 08. Insights & Dispatches: Sweeps gracefully across the background
    scrollTl.to(group.position, {
      x: isMobile ? 0 : -1.8,
      y: 0.3,
      z: -2.5,
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

    // 09. Team & Leadership: Anchors right flank beside mentors
    scrollTl.to(group.position, {
      x: isMobile ? 0 : 1.7,
      y: -0.2,
      z: -1.5,
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

    // 10. Finale & Footer: Centered soaring pose above footer
    scrollTl.to(group.position, {
      x: 0,
      y: 0.5,
      z: isMobile ? -1.0 : 0.2,
      ease: 'power2.out',
    });
    scrollTl.to(
      group.scale,
      {
        x: 2.1 * scaleFactor,
        y: 2.1 * scaleFactor,
        z: 2.1 * scaleFactor,
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
      <PhoenixModel flightVelocity={velocity} />
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
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        {/* Cinematic Multi-Point Lighting */}
        <ambientLight intensity={0.5} />
        
        {/* Key Cyan Light */}
        <directionalLight
          position={[5, 6, 4]}
          intensity={1.8}
          color="#00F0FF"
        />

        {/* Cobalt Rim Light (Opposite Angle for Edge Separation) */}
        <directionalLight
          position={[-5, 3, -3]}
          intensity={2.5}
          color="#0070F3"
        />

        {/* Ember Accent Fill Light (Warm Underglow) */}
        <pointLight
          position={[0, -3, 2]}
          intensity={1.5}
          color="#FF4500"
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

