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
      title: 'SECTOR 01 // HIGH-DENSITY AI COMPUTE',
      sub: 'COLD AISLE 01 • RACKS 01-16 • 415V 3-PHASE',
    },
    {
      z: -10.0,
      title: 'FOUNDATION CLUSTER // DISTRIBUTED ML',
      sub: 'HOPPER SXM5 ACCELERATOR PODS • 900 GB/s NVLINK',
    },
    {
      z: -28.0,
      title: 'PROJECTION CHAMBER // AUTONOMOUS LINK',
      sub: 'BDX-01 DOCKING PLATFORM • OPTICAL ARRAY ONLINE',
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

          {/* Top Status LED Bar (Sage Green) */}
          <mesh position={[0, 0.1, 0.023]}>
            <planeGeometry args={[2.6, 0.015]} />
            <meshBasicMaterial color="#A2B29F" />
          </mesh>

          {/* Glowing Indicator Pip */}
          <mesh position={[-1.2, 0, 0.024]}>
            <circleGeometry args={[0.025, 16]} />
            <meshBasicMaterial color="#A2B29F" />
          </mesh>
          <pointLight position={[-1.2, 0, 0.06]} color="#A2B29F" intensity={0.3} distance={1.2} />

          {/* Dual Sided: Facing down the corridor in both directions */}
          <mesh position={[0, 0, -0.021]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[2.76, 0.24]} />
            <meshStandardMaterial color="#222828" roughness={0.5} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.1, -0.023]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[2.6, 0.015]} />
            <meshBasicMaterial color="#A2B29F" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

