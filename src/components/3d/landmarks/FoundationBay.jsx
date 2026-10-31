'use client';

import React from 'react';

/**
 * Zone 02: Foundation Bay
 * Glass partition alcove at Z = -15 on the right side.
 * Features structural slate stanchions and translucent architectural monoliths.
 */
export default function FoundationBay() {
  return (
    <group position={[2.9, 0, -15]}>
      {/* Structural Glass Barrier Panel */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[0.08, 3.4, 4.2]} />
        <meshPhysicalMaterial
          color="#A2B29F"
          roughness={0.15}
          transmission={0.7}
          thickness={0.4}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Structural Upright Supports */}
      <mesh position={[0, 1.8, -2]}>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#343D3C" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.8, 2]}>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#343D3C" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Monolith Pillar with Subtle Warm Glow */}
      <mesh position={[-0.4, 1.4, 0]}>
        <boxGeometry args={[0.3, 2.6, 0.6]} />
        <meshStandardMaterial color="#222828" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[-0.4, 2.8, 0]}>
        <boxGeometry args={[0.32, 0.05, 0.62]} />
        <meshBasicMaterial color="#A2B29F" />
      </mesh>

      {/* Subtle Alcove Downlight */}
      <pointLight position={[-0.3, 3.2, 0]} color="#FFF8EE" intensity={0.9} distance={6} />
    </group>
  );
}

