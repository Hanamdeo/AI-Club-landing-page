'use client';

import React from 'react';

/**
 * Zone 01: Entrance Gate Bulkhead
 * Heavy architectural facility airlock entrance at Z = 10.
 */
export default function EntranceGate() {
  return (
    <group position={[0, 0, 10]}>
      {/* Outer Door Frame Trim */}
      <mesh position={[-2.8, 1.9, 0]}>
        <boxGeometry args={[0.4, 3.8, 0.4]} />
        <meshStandardMaterial color="#343D3C" roughness={0.6} metalness={0.5} />
      </mesh>
      <mesh position={[2.8, 1.9, 0]}>
        <boxGeometry args={[0.4, 3.8, 0.4]} />
        <meshStandardMaterial color="#343D3C" roughness={0.6} metalness={0.5} />
      </mesh>
      <mesh position={[0, 3.7, 0]}>
        <boxGeometry args={[5.8, 0.35, 0.4]} />
        <meshStandardMaterial color="#343D3C" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* Frosted Glass Header Panel with Subtle Sage Border */}
      <mesh position={[0, 3.2, 0.05]}>
        <boxGeometry args={[4.8, 0.6, 0.05]} />
        <meshPhysicalMaterial
          color="#A2B29F"
          roughness={0.2}
          transmission={0.6}
          thickness={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Status Beacon Bar above Entrance */}
      <mesh position={[0, 3.55, 0.22]}>
        <boxGeometry args={[1.2, 0.06, 0.05]} />
        <meshBasicMaterial color="#A2B29F" />
      </mesh>

      {/* Floor Threshold Transition Plate */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[5.2, 0.02, 1.2]} />
        <meshStandardMaterial color="#222828" roughness={0.5} metalness={0.6} />
      </mesh>
    </group>
  );
}

