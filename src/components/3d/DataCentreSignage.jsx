'use client';

import React from 'react';
import * as THREE from 'three';

/**
 * DataCentreSignage
 * Authentic suspended overhead aisle identification banners and bulkhead placards:
 * - "SECTOR 01 // HIGH DENSITY AI COMPUTE"
 * - "COLD AISLE 01 // 18°C NOMINAL"
 * - "GPU CLUSTER ALPHA // SXM5 & RTX 4090"
 */
export default function DataCentreSignage() {
  const signageBanners = [
    {
      z: 7.5,
      title: 'MITS GWALIOR • AI RESEARCH LAB',
      sub: 'DEPARTMENT OF COMPUTER SCIENCE & AI',
    },
    {
      z: -10.0,
      title: 'COMPUTE INFRASTRUCTURE • GPU NODES',
      sub: 'DISTRIBUTED TRAINING & INFERENCE CLUSTER',
    },
    {
      z: -28.0,
      title: 'PROJECTION CHAMBER • BDX-01',
      sub: 'AUTONOMOUS RESEARCH COMPANION PLATFORM',
    },
  ];

  return (
    <group position={[0, 0, 0]}>
      {signageBanners.map((banner, idx) => (
        <group key={`signage-${idx}`} position={[0, 3.42, banner.z]}>
          {/* Suspended Industrial Signboard Chassis */}
          <mesh>
            <boxGeometry args={[2.8, 0.28, 0.04]} />
            <meshStandardMaterial color="#171B1C" roughness={0.4} metalness={0.7} />
          </mesh>

          {/* Border Trim (Sage hairline border) */}
          <mesh position={[0, 0, 0.021]}>
            <planeGeometry args={[2.76, 0.24]} />
            <meshStandardMaterial color="#222828" roughness={0.5} metalness={0.5} />
          </mesh>

          {/* Left / Right Suspension Wire Rods */}
          <mesh position={[-1.25, 0.28, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.32, 8]} />
            <meshStandardMaterial color="#8E9999" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[1.25, 0.28, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.32, 8]} />
            <meshStandardMaterial color="#8E9999" roughness={0.2} metalness={0.9} />
          </mesh>

          {/* Top Status LED Bar (Vibrant Cyber Blue) */}
          <mesh position={[0, 0.1, 0.023]}>
            <planeGeometry args={[2.6, 0.018]} />
            <meshBasicMaterial color="#00A3FF" toneMapped={false} />
          </mesh>

          {/* Glowing Indicator Pip (Electric Cyan Blue with Halo) */}
          <mesh position={[-1.2, 0, 0.024]}>
            <circleGeometry args={[0.028, 24]} />
            <meshBasicMaterial color="#38BDF8" toneMapped={false} />
          </mesh>
          <pointLight position={[-1.2, 0, 0.08]} color="#00A3FF" intensity={0.9} distance={2.0} decay={2} />

          {/* Dual Sided: Facing down the corridor in both directions */}
          <mesh position={[0, 0, -0.021]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[2.76, 0.24]} />
            <meshStandardMaterial color="#222828" roughness={0.5} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.1, -0.023]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[2.6, 0.018]} />
            <meshBasicMaterial color="#00A3FF" toneMapped={false} />
          </mesh>
          <mesh position={[1.2, 0, -0.024]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.028, 24]} />
            <meshBasicMaterial color="#38BDF8" toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

