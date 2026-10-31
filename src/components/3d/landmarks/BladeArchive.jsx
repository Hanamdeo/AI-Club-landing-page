'use client';

import React from 'react';

/**
 * Zone 05: Blade Archive
 * High-density storage and compute blade cabinet at Z = -105 on the left side.
 */
export default function BladeArchive() {
  return (
    <group position={[-2.8, 0, -105]}>
      {/* High-Density Vault Frame */}
      <mesh position={[0.4, 1.8, 0]}>
        <boxGeometry args={[1.0, 3.5, 3.4]} />
        <meshStandardMaterial color="#222828" roughness={0.65} metalness={0.4} />
      </mesh>

      {/* Internal Rack Trays (Recessed) */}
      <mesh position={[0.88, 1.8, 0]}>
        <boxGeometry args={[0.08, 3.2, 3.0]} />
        <meshStandardMaterial color="#343D3C" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Vertical Fiber Busbars (Warm Ivory and Sage) */}
      <mesh position={[0.93, 1.8, -0.9]}>
        <boxGeometry args={[0.03, 3.0, 0.04]} />
        <meshBasicMaterial color="#E6E2D8" />
      </mesh>
      <mesh position={[0.93, 1.8, 0]}>
        <boxGeometry args={[0.03, 3.0, 0.04]} />
        <meshBasicMaterial color="#A2B29F" />
      </mesh>
      <mesh position={[0.93, 1.8, 0.9]}>
        <boxGeometry args={[0.03, 3.0, 0.04]} />
        <meshBasicMaterial color="#A2B29F" />
      </mesh>

      {/* Vault Status Indicator */}
      <mesh position={[0.4, 3.45, 0]}>
        <boxGeometry args={[0.8, 0.06, 0.1]} />
        <meshBasicMaterial color="#A2B29F" />
      </mesh>

      {/* Direct Spotlight into Archive Bay */}
      <pointLight position={[0.9, 2.5, 0]} color="#E6E2D8" intensity={1.2} distance={6} decay={2} />
    </group>
  );
}

