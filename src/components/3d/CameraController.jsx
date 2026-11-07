'use client';

import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

/**
 * CameraController
 * Drives cinematic camera movement across the 3 Immersive Experience A Sections:
 * - Progress 0.00: Section 01 (The Arrival - Corridor threshold)
 * - Progress 0.50: Section 02 (The Intelligence Core - Server racks & Compute)
 * - Progress 1.00: Section 03 (The Projection Chamber - Facing BDX-01 on pedestal)
 *
 * Provides physical lerp damping and gentle mouse perspective parallax.
 */
export default function CameraController({
  scrollProgress = 0,
  scrollProgressRef,
  isIntro = false,
}) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 0.22;
      mouseRef.current.targetY = ny * 0.12;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3 Key Architectural Waypoints for Experience A
  const waypoints = useMemo(
    () => [
      {
        progress: 0.0,
        pos: new THREE.Vector3(0, 1.9, 12.5),
        target: new THREE.Vector3(0, 1.6, 0),
      },
      {
        progress: 0.5,
        pos: new THREE.Vector3(0.55, 1.8, -13.5),
        target: new THREE.Vector3(-0.8, 1.55, -18.5),
      },
      {
        progress: 1.0,
        pos: new THREE.Vector3(-0.4, 1.85, -31.2),
        target: new THREE.Vector3(0.85, 1.45, -35.0),
      },
    ],
    []
  );

  const currentPos = useRef(new THREE.Vector3(0, 2.3, 17));
  const currentTarget = useRef(new THREE.Vector3(0, 1.6, 0));
  const tempPos = useRef(new THREE.Vector3());
  const tempTarget = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

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

    tempPos.current.x += mouseRef.current.x;
    tempPos.current.y += mouseRef.current.y;
    tempTarget.current.x += mouseRef.current.x * 0.4;

    const lerpFactor = Math.min(1, delta * (isIntro ? 2.5 : 4.5));
    currentPos.current.lerp(tempPos.current, lerpFactor);
    currentTarget.current.lerp(tempTarget.current, lerpFactor);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
