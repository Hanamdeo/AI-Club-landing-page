'use client';

import React from 'react';

/**
 * Zone 06: Community Lounge
 * Collaborative alcove at Z = -135 on the right side.
 */
export default function CommunityLounge() {
  return (
    <group position={[2.8, 0, -135]}>
      {/* Cantilevered Work Surface Bench */}
      <mesh position={[-0.4, 0.75, 0]}>
        <boxGeometry args={[1.2, 0.08, 3.2]} />
        <meshStandardMaterial color="#343D3C" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Support Pedestals */}
      <mesh position={[-0.4, 0.35, -1.2]}>
        <boxGeometry args={[0.2, 0.7, 0.4]} />
        <meshStandardMaterial color="#222828" roughness={0.7} />
      </mesh>
      <mesh position={[-0.4, 0.35, 1.2]}>
        <boxGeometry args={[0.2, 0.7, 0.4]} />
        <meshStandardMaterial color="#222828" roughness={0.7} />
      </mesh>

      {/* Frosted Architectural Glass Divider */}
      <mesh position={[0.3, 1.8, 0]}>
        <boxGeometry args={[0.06, 3.4, 3.8]} />
        <meshPhysicalMaterial
          color="#343D3C"
          roughness={0.2}
          transmission={0.65}
          thickness={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Overhead Luminaire Strip */}
      <mesh position={[-0.4, 3.4, 0]}>
        <boxGeometry args={[0.8, 0.04, 2.4]} />
        <meshBasicMaterial color="#FFF8EE" />
      </mesh>

      {/* Warm Ambient Downlight */}
      <pointLight position={[-0.4, 3.0, 0]} color="#FFF8EE" intensity={1.3} distance={7} />
    </group>
  );
}

