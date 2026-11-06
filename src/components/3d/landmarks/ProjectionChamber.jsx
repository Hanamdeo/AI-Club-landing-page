'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * ProjectionChamber (Section 03 Landmark)
 * Positioned at Z = -35.
 * The architectural transition threshold between the 3D facility and editorial website.
 * Contains the BDX-01 docking pedestal, holographic floor rings, and ambient data beacons.
 */
export default function ProjectionChamber({ isProjecting = false }) {
  const ringRef = useRef();
  const pulseRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.35;
    }
    if (pulseRef.current) {
      const pulse = 0.5 + Math.sin(t * 2.5) * 0.3;
      pulseRef.current.material.opacity = isProjecting ? pulse * 0.75 : 0.2;
    }
  });

  return (
    <group position={[0, 0, -35]}>
      {/* 1. Chamber Octagonal Floor Base */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.4, 0.08, 8]} />
        <meshStandardMaterial color="#1A1F20" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Outer Chamber Perimeter Border */}
      <mesh position={[0, 0.04, 0]}>
        <ringGeometry args={[4.0, 4.15, 8]} />
        <meshStandardMaterial color="#343D3C" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Rotating Concentric Sage Holographic Floor Glyphs */}
      <group ref={ringRef} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[1.2, 1.25, 48]} />
          <meshBasicMaterial color="#A2B29F" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[1.6, 1.63, 48]} />
          <meshBasicMaterial color="#A2B29F" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[2.2, 2.22, 64]} />
          <meshBasicMaterial color="#A2B29F" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Docking Pedestal Base for BDX-01 */}
      <group position={[1.1, 0.1, 0.2]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[0.75, 0.85, 0.2, 24]} />
          <meshStandardMaterial color="#222828" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.65, 32]} />
          <meshBasicMaterial color="#A2B29F" transparent opacity={0.7} />
        </mesh>
        {/* Subtle Pedestal Uplight */}
        <pointLight position={[0, 0.4, 0]} color="#A2B29F" intensity={0.9} distance={2.5} />
      </group>

      {/* Ceiling Holographic Emitter Bezel */}
      <group position={[0, 4.2, 0]}>
        <mesh>
          <cylinderGeometry args={[2.5, 2.7, 0.2, 24]} />
          <meshStandardMaterial color="#222828" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2.2, 32]} />
          <meshBasicMaterial color="#A2B29F" transparent opacity={0.5} />
        </mesh>
        {/* Soft Downward Projection Wash */}
        <pointLight position={[0, -0.3, 0]} color="#A2B29F" intensity={isProjecting ? 1.8 : 0.6} distance={6} />
      </group>

      {/* Ambient Pulsing Holographic Column */}
      <mesh ref={pulseRef} position={[0, 2.1, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 4.0, 24, 1, true]} />
        <meshBasicMaterial color="#A2B29F" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Architectural Portal Archway behind Chamber */}
      <group position={[0, 0, -2.5]}>
        {/* Left Column */}
        <mesh position={[-3.2, 2.1, 0]}>
          <boxGeometry args={[0.4, 4.2, 0.4]} />
          <meshStandardMaterial color="#343D3C" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Right Column */}
        <mesh position={[3.2, 2.1, 0]}>
          <boxGeometry args={[0.4, 4.2, 0.4]} />
          <meshStandardMaterial color="#343D3C" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Top Header */}
        <mesh position={[0, 4.1, 0]}>
          <boxGeometry args={[6.8, 0.35, 0.4]} />
          <meshStandardMaterial color="#343D3C" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Header Indicator */}
        <mesh position={[0, 3.9, 0.22]}>
          <boxGeometry args={[1.8, 0.05, 0.04]} />
          <meshBasicMaterial color="#A2B29F" />
        </mesh>
      </group>
    </group>
  );
}

