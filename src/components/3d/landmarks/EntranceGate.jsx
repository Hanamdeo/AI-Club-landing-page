'use client';

import React from 'react';

/**
 * Zone 01: Entrance Gate Bulkhead (Refinement V3)
 * Heavy architectural facility airlock entrance at Z = 10.
 * Clean, high-clarity materials without heavy transmission blur passes.
 */
export default function EntranceGate() {
  return (
    <group position={[0, 0, 10]}>
      {/* Outer Door Frame Trim */}
      <mesh position={[-2.8, 1.9, 0]}>
        <boxGeometry args={[0.4, 3.8, 0.4]} />
        <meshStandardMaterial color="#364244" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[2.8, 1.9, 0]}>
        <boxGeometry args={[0.4, 3.8, 0.4]} />
        <meshStandardMaterial color="#364244" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0, 3.7, 0]}>
        <boxGeometry args={[5.8, 0.35, 0.4]} />
        <meshStandardMaterial color="#364244" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* High-Clarity Header Glass Panel (No transmission blur) */}
      <mesh position={[0, 3.2, 0.05]}>
        <boxGeometry args={[4.8, 0.6, 0.04]} />
        <meshStandardMaterial
          color="#2C3A38"
          roughness={0.2}
          metalness={0.4}
          transparent
          opacity={0.55}
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
        <meshStandardMaterial color="#222A2B" roughness={0.45} metalness={0.7} />
      </mesh>
    </group>
  );
}
