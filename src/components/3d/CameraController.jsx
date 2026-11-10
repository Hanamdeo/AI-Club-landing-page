'use client';

import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { performanceManager } from '@/utils/ResponsivePerformanceManager';

/**
 * CameraController
 * Drives cinematic camera movement across the 6 Progressive Depth Zones.
 *
 * Universal Responsive Architecture:
 * - Dynamic Container ResizeObserver (tracks real canvas element aspect ratio)
 * - Portrait & Mobile Compensation (FOV adaptation & lateral offset to prevent corridor clipping)
 * - Zero GC allocation in useFrame (pre-allocated reusable vectors)
 * - Coordinates frame delta with ResponsivePerformanceManager
 * - Respects prefers-reduced-motion for parallax and camera damping
 */
export default function CameraController({
  scrollProgress = 0,
  scrollProgressRef,
  isIntro = false,
}) {
  const { camera, gl } = useThree();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isReducedMotionRef = useRef(false);
  const containerAspectRef = useRef(16 / 9);

  // 1. Container ResizeObserver: accurately measure canvas dimensions
  useEffect(() => {
    const parent = gl.domElement?.parentElement;
    if (!parent || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          const aspect = width / height;
          containerAspectRef.current = aspect;

          // Adaptive camera FOV & projection update for portrait mobile and ultrawides
          if (camera.isPerspectiveCamera) {
            if (aspect < 0.75) {
              // Narrow portrait mobile (e.g. 375x812, 390x844): widen FOV slightly to frame both corridor walls
              camera.fov = 60;
            } else if (aspect < 1.0) {
              // Standard tablet / foldable portrait
              camera.fov = 55;
            } else if (aspect > 2.2) {
              // 21:9 or 32:9 ultrawide: slightly tighter vertical FOV for cinematic intimacy
              camera.fov = 46;
            } else {
              // Standard 16:9 / 16:10 desktop & laptop
              camera.fov = 50;
            }
            camera.updateProjectionMatrix();
          }
        }
      }
    });

    observer.observe(parent);
    return () => observer.disconnect();
  }, [camera, gl.domElement]);

  // 2. Parallax mouse/pointer listener (respects reduced motion, skipped on touch/mobile)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent);
    if (isTouchDevice) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = motionQuery.matches;

    const handleMotionChange = (e) => {
      isReducedMotionRef.current = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    const handleMouseMove = (e) => {
      if (isReducedMotionRef.current) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 0.18;
      mouseRef.current.targetY = ny * 0.10;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // 6 Progressive Architectural Depth Waypoints: Smooth straight-line trajectory down corridor center
  // Maintains consistent, comfortable framing distance so camera never zooms in on robot
  const waypoints = useMemo(
    () => [
      {
        progress: 0.0,
        pos: new THREE.Vector3(0.00, 1.85, 13.5),
        target: new THREE.Vector3(0.00, 1.45, 0.0),
      },
      {
        progress: 0.2,
        pos: new THREE.Vector3(0.00, 1.80, 5.0),
        target: new THREE.Vector3(0.00, 1.40, -10.0),
      },
      {
        progress: 0.4,
        pos: new THREE.Vector3(0.00, 1.80, -7.0),
        target: new THREE.Vector3(0.00, 1.40, -22.0),
      },
      {
        progress: 0.6,
        pos: new THREE.Vector3(0.00, 1.80, -18.0),
        target: new THREE.Vector3(0.00, 1.40, -33.0),
      },
      {
        progress: 0.8,
        pos: new THREE.Vector3(0.00, 1.80, -29.0),
        target: new THREE.Vector3(0.00, 1.40, -44.0),
      },
      {
        progress: 1.0,
        pos: new THREE.Vector3(0.00, 1.80, -39.0),
        target: new THREE.Vector3(0.00, 1.40, -54.0),
      },
    ],
    []
  );

  const currentPos = useRef(new THREE.Vector3(0.00, 1.85, 13.5));
  const currentTarget = useRef(new THREE.Vector3(0.00, 1.45, 0.0));
  const tempPos = useRef(new THREE.Vector3());
  const tempTarget = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    // Record real delta into centralized performance coordinator
    performanceManager.recordFrame(delta);

    const safeDelta = Math.min(delta, 0.1);

    if (!isReducedMotionRef.current) {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
    } else {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    }

    if (isIntro) {
      tempPos.current.set(0, 2.2, 16.5);
      tempTarget.current.set(0, 1.6, 0);
    } else {
      const rawP = scrollProgressRef ? scrollProgressRef.current : scrollProgress;
      const p = Math.max(0, Math.min(1, rawP));
      let startW = waypoints[0];
      let endW = waypoints[waypoints.length - 1];

      for (let i = 0; i < waypoints.length - 1; i++) {
        if (p >= waypoints[i].progress && p <= waypoints[i + 1].progress) {
          startW = waypoints[i];
          endW = waypoints[i + 1];
          break;
        }
      }

      const segmentSpan = endW.progress - startW.progress;
      const localT = segmentSpan > 0 ? (p - startW.progress) / segmentSpan : 0;
      const easeT = localT * localT * (3 - 2 * localT);

      tempPos.current.lerpVectors(startW.pos, endW.pos, easeT);
      tempTarget.current.lerpVectors(startW.target, endW.target, easeT);
    }

    // Adaptive vertical & lateral camera offset on portrait displays: keep aisle and companion robot framed above mobile cards
    const aspect = containerAspectRef.current;
    if (aspect < 0.85) {
      // Pull camera back slightly in +Z to provide comfortable corridor breathing room
      tempPos.current.z += (1 - aspect) * 1.4;
      tempPos.current.y += (1 - aspect) * 0.40;
      tempTarget.current.y += (1 - aspect) * 0.50;
    }

    tempPos.current.x += mouseRef.current.x;
    tempPos.current.y += mouseRef.current.y;
    tempTarget.current.x += mouseRef.current.x * 0.4;

    const lerpFactor = Math.min(1, safeDelta * (isIntro ? 2.5 : 4.5));
    currentPos.current.lerp(tempPos.current, lerpFactor);
    currentTarget.current.lerp(tempTarget.current, lerpFactor);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
