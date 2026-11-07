'use client';

import React from 'react';

/**
 * Zone 07: Exit Portal
 * Bright architectural exit threshold at Z = -165 to -180.
 * A luminous gateway symbolizing transition to the collaborative future.
 */
export default function ExitPortal() {
  return (
    <group position={[0, 0, -175]}>
      {/* Grand Architectural Portal Frame */}
      <mesh position={[-3.4, 2.0, 0]}>
        <boxGeometry args={[0.6, 4.0, 0.8]} />
        <meshStandardMaterial color="#343D3C" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[3.4, 2.0, 0]}>
        <boxGeometry args={[0.6, 4.0, 0.8]} />
        <meshStandardMaterial color="#343D3C" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0, 3.85, 0]}>
        <boxGeometry args={[7.4, 0.5, 0.8]} />
        <meshStandardMaterial color="#343D3C" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Vertical Luminous Light Pylons Framing the Threshold */}
      <mesh position={[-2.9, 1.9, 0.2]}>
        <boxGeometry args={[0.1, 3.6, 0.1]} />
        <meshBasicMaterial color="#E6E2D8" />
      </mesh>
      <mesh position={[2.9, 1.9, 0.2]}>
        <boxGeometry args={[0.1, 3.6, 0.1]} />
        <meshBasicMaterial color="#E6E2D8" />
      </mesh>

      {/* Luminous Horizon Light Plane (The Bright Exterior World) */}
      <mesh position={[0, 2.0, -8]}>
        <planeGeometry args={[18, 10]} />
        <meshBasicMaterial color="#F2EFE8" />
      </mesh>

      {/* High-Lumen Volumetric Light Glow */}
      <pointLight position={[0, 2.5, -4]} color="#FFF8EE" intensity={3.5} distance={20} decay={1.5} />
      <directionalLight position={[0, 3, -6]} target-position={[0, 1.8, -165]} color="#FFF8EE" intensity={1.8} />
    </group>
  );
}

