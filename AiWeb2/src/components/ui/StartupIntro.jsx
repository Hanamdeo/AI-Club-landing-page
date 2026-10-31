'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import BdxRobot from '@/components/3d/BdxRobot';

/**
 * StartupIntro
 * Cinematic architectural facility initialization sequence.
 * Features the iconic BDX bipedal robot (NVIDIA / Disney) that looks at the user inquisitively,
 * tilts its periscope head curiously, shifts weight between its orange feet, and welcomes them.
 */
export default function StartupIntro({ onComplete }) {
  const containerRef = useRef(null);
  const topShutterRef = useRef(null);
  const bottomShutterRef = useRef(null);
  const centerContentRef = useRef(null);
  const logoTextRef = useRef(null);
  const progressLineRef = useRef(null);
  const [progressNum, setProgressNum] = useState(0);

  useEffect(() => {
    // Progress counter animation from 0 to 100
    const counterObj = { val: 0 };
    const counterTween = gsap.to(counterObj, {
      val: 100,
      duration: 2.4,
      ease: 'power2.out',
      onUpdate: () => {
        setProgressNum(Math.floor(counterObj.val));
      },
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Initial State
      gsap.set(centerContentRef.current, { opacity: 0, scale: 0.94 });
      gsap.set(logoTextRef.current, { opacity: 0, y: 15 });
      gsap.set(progressLineRef.current, { scaleX: 0 });

      // 2. Robot and Center content fade in
      tl.to(centerContentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power2.out',
      })
        .to(
          logoTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          progressLineRef.current,
          {
            scaleX: 1,
            duration: 1.6,
            ease: 'power2.inOut',
          },
          '-=0.7'
        )
        // 3. Hold for a brief curious moment at 100%
        .to({}, { duration: 0.4 })
        // 4. Center robot & text softly fades out
        .to(centerContentRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.5,
          ease: 'power2.in',
        })
        // 5. Dual architectural blast shutters split open
        .to(
          topShutterRef.current,
          {
            yPercent: -100,
            duration: 1.0,
            ease: 'power4.inOut',
          },
          '-=0.1'
        )
        .to(
          bottomShutterRef.current,
          {
            yPercent: 100,
            duration: 1.0,
            ease: 'power4.inOut',
          },
          '<'
        )
        // 6. Remove container from interaction
        .set(containerRef.current, { display: 'none' });
    });

    return () => {
      counterTween.kill();
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center overflow-hidden select-none font-sans"
    >
      {/* Top Architectural Shutter */}
      <div
        ref={topShutterRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#121516] border-b border-slate-struct/40 z-10 flex items-end justify-center pb-8"
      >
        <div className="absolute top-6 left-8 text-xs text-slate-500 uppercase tracking-widest hidden sm:block font-medium">
          Facility Initialization
        </div>
      </div>

      {/* Bottom Architectural Shutter */}
      <div
        ref={bottomShutterRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#121516] border-t border-slate-struct/40 z-10 flex items-start justify-center pt-8"
      >
        <div className="absolute bottom-6 right-8 text-xs text-slate-500 uppercase tracking-widest hidden sm:block font-medium">
          AI Club Autonomous Systems
        </div>
      </div>

      {/* Center Cinematic Awakening Element with 3D BDX Biped Robot */}
      <div
        ref={centerContentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center px-6"
      >
        {/* Interactive 3D BDX Robot Canvas (Properly Centered & Scaled) */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 relative mb-1 cursor-grab active:cursor-grabbing">
          <Canvas
            camera={{ position: [0, 0.08, 2.85], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={1.3} color="#FFFFFF" />
            <directionalLight position={[4, 5, 4]} intensity={2.4} color="#FFF8EE" />
            <directionalLight position={[-4, 3, 2]} intensity={1.2} color="#E6E2D8" />

            <BdxRobot scale={1.0} />
          </Canvas>
        </div>

        {/* Title & Tagline */}
        <div ref={logoTextRef} className="space-y-1 mb-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ivory font-sans">
            AI CLUB
          </h1>
          <p className="text-xs sm:text-sm text-sage font-light tracking-wide">
            Where Curiosity Meets Intelligence
          </p>
        </div>

        {/* Hairline Progress Indicator */}
        <div className="w-48 sm:w-64 space-y-2">
          <div className="w-full h-1 bg-charcoal/80 rounded-full overflow-hidden border border-slate-struct/40">
            <div
              ref={progressLineRef}
              className="w-full h-full bg-sage origin-left rounded-full"
            />
          </div>
          <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
            <span className="uppercase text-[11px] tracking-wider">Starting Systems</span>
            <span className="num-normal text-sage font-semibold">{progressNum}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
