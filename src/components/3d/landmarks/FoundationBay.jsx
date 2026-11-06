'use client';

import React from 'react';

/**
 * Zone 02: Foundation Bay (Refinement V3)
 * Glass partition alcove at Z = -15 on the right side.
 * Crisp structural stanchions and clear glass panel without transmission blur passes.
 */
export default function FoundationBay() {
  return (
    <group position={[2.9, 0, -15]}>
      {/* Structural Glass Barrier Panel (High clarity, zero transmission blur) */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[0.06, 3.4, 4.2]} />
        <meshStandardMaterial
          color="#2A3835"
          roughness={0.15}
          metalness={0.4}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Structural Upright Supports */}
      <mesh position={[0, 1.8, -2]}>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#384547" roughness={0.45} metalness={0.7} />
      </mesh>
      <mesh position={[0, 1.8, 2]}>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#384547" roughness={0.45} metalness={0.7} />
      </mesh>

      {/* Monolith Pillar with Subtle Warm Glow */}
      <mesh position={[-0.4, 1.4, 0]}>
        <boxGeometry args={[0.3, 2.6, 0.6]} />
        <meshStandardMaterial color="#222A2B" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[-0.4, 2.8, 0]}>
        <boxGeometry args={[0.32, 0.05, 0.62]} />
        <meshBasicMaterial color="#A2B29F" />
      </mesh>

      {/* Subtle Alcove Downlight */}
      <pointLight position={[-0.3, 3.2, 0]} color="#FFF8EE" intensity={1.1} distance={7} />
    </group>
  );
}
