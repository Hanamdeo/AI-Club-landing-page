'use client';

import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

/**
 * CameraController
 * Smoothly interpolates camera position and lookAt target along the facility corridor.
 * Driven by `scrollProgress` (normalized 0.0 to 1.0) with physical damping (lerp)
 * and subtle mouse parallax for atmospheric depth.
 * Also performs an entrance fly-in from outside when isIntro is active.
 */
export default function CameraController({ scrollProgress = 0, isIntro = false }) {
  const { camera } = useThree();

  // Mouse coordinate tracker for gentle perspective tilt
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 0.25;
      mouseRef.current.targetY = ny * 0.15;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 7 Waypoints corresponding to the 7 Data Centre Zones
  const waypoints = useMemo(
    () => [
      {
        progress: 0.0,
        pos: new THREE.Vector3(0, 1.8, 12),
        target: new THREE.Vector3(0, 1.6, 0),
      },
      {
        progress: 0.166,
        pos: new THREE.Vector3(0.65, 1.7, -15),
        target: new THREE.Vector3(1.6, 1.6, -20),
      },
      {
        progress: 0.333,
        pos: new THREE.Vector3(-0.75, 1.85, -45),
        target: new THREE.Vector3(-1.9, 1.7, -50),
      },
      {
        progress: 0.5,
        pos: new THREE.Vector3(0.75, 1.8, -75),
        target: new THREE.Vector3(1.9, 1.6, -80),
      },
      {
        progress: 0.666,
        pos: new THREE.Vector3(-0.65, 1.75, -105),
        target: new THREE.Vector3(-1.8, 1.65, -112),
      },
      {
        progress: 0.833,
        pos: new THREE.Vector3(0.55, 1.8, -135),
        target: new THREE.Vector3(1.6, 1.6, -142),
      },
      {
        progress: 1.0,
        pos: new THREE.Vector3(0, 1.8, -165),
        target: new THREE.Vector3(0, 1.8, -185),
      },
    ],
    []
  );

  // Runtime vectors for smooth lerping (starts slightly pulled back outside entrance)
  const currentPos = useRef(new THREE.Vector3(0, 2.3, 17));
  const currentTarget = useRef(new THREE.Vector3(0, 1.6, 0));
  const tempPos = useRef(new THREE.Vector3());
  const tempTarget = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    // 1. Smooth mouse parallax
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

    // 2. If intro is active, hold vantage outside entrance
    if (isIntro) {
      tempPos.current.set(0, 2.2, 16.5);
      tempTarget.current.set(0, 1.6, 0);
    } else {
      // Normal scroll progression
      const p = Math.max(0, Math.min(1, scrollProgress));
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

      // Smooth cubic bezier easing inside segments
      const easeT = localT * localT * (3 - 2 * localT);

      tempPos.current.lerpVectors(startW.pos, endW.pos, easeT);
      tempTarget.current.lerpVectors(startW.target, endW.target, easeT);
    }

    // Add subtle mouse parallax offset to camera position & lookAt
    tempPos.current.x += mouseRef.current.x;
    tempPos.current.y += mouseRef.current.y;
    tempTarget.current.x += mouseRef.current.x * 0.5;

    // Damped physical lerp towards destination (independent of framerate)
    const lerpFactor = Math.min(1, delta * (isIntro ? 2.5 : 4.5));
    currentPos.current.lerp(tempPos.current, lerpFactor);
    currentTarget.current.lerp(tempTarget.current, lerpFactor);

    // Apply to camera
    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
