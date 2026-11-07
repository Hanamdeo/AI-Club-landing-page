'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Zone 03: Research Lab Core
 * Suspended geometric compute nucleus at Z = -45 on the left side.
 * Slowly rotates with restrained sage emission.
 */
export default function ResearchSphere() {
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3;
      ringRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={[-2.8, 1.9, -45]}>
      {/* Geodesic Core / Neural Compute Node */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#343D3C"
          wireframe
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#A2B29F" />
      </mesh>

      {/* Magnetic Containment Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.05, 0.04, 12, 48]} />
        <meshStandardMaterial color="#222828" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Overhead Containment Cable */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.8]} />
        <meshStandardMaterial color="#222828" roughness={0.8} />
      </mesh>

      {/* Dedicated Soft Sage Light Pulse */}
      <pointLight color="#A2B29F" intensity={1.4} distance={6} decay={2} />
    </group>
  );
}

