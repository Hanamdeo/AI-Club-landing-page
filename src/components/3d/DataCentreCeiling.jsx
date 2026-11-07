'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * DataCentreCeiling (Refinement V3)
 * High-Scale Overhead Data Centre Infrastructure:
 * - Industrial ladder cable trays suspended above the server racks
 * - High-visibility Telecom Yellow FiberRunner optical raceways
 * - Chilled-water cooling supply/return pipes with metallic coupling collars
 * - Continuous architectural linear LED light battens illuminating the cold aisle
 * - Cold Aisle Containment (CAC) crystal-clear polycarbonate ceiling baffles (no blur)
 * - Increased ceiling clearance (Y = 4.5m) for majestic enterprise scale
 */
export default function DataCentreCeiling() {
  const { trapezePositions, pipeJointPositions } = useMemo(() => {
    const trapezes = [];
    const pipeJoints = [];

    for (let z = 14; z >= -62; z -= 3.8) {
      trapezes.push(z);
    }
    for (let z = 14; z >= -62; z -= 5.5) {
      pipeJoints.push(z);
    }

    return { trapezePositions: trapezes, pipeJointPositions: pipeJoints };
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Structural Concrete Ceiling Slab (Y = 4.5m) */}
      <mesh position={[0, 4.5, -25]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11.5, 95]} />
        <meshStandardMaterial
          color="#181B1C"
          roughness={0.65}
          metalness={0.45}
        />
      </mesh>

      {/* Ceiling Structural Grid Rails */}
      <gridHelper
        args={[95, 80, '#2D3536', '#1E2425']}
        position={[0, 4.49, -25]}
      />

      {/* 2. Primary Chilled-Water Piping (Dual 200mm Heavy Pipes) */}
      {/* Supply Pipe (Right side, X = 1.35, Y = 4.22) */}
      <mesh position={[1.35, 4.22, -25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.095, 0.095, 95, 20]} />
        <meshStandardMaterial color="#323C3D" roughness={0.35} metalness={0.75} />
      </mesh>

      {/* Return Pipe (Left side, X = -1.35, Y = 4.22) */}
      <mesh position={[-1.35, 4.22, -25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.095, 0.095, 95, 20]} />
        <meshStandardMaterial color="#323C3D" roughness={0.35} metalness={0.75} />
      </mesh>

      {/* Pipe Flange Joints & Identification Colored Bands */}
      {pipeJointPositions.map((z, idx) => (
        <group key={`pipe-joints-${idx}`}>
          {/* Supply Coupling Flange */}
          <mesh position={[1.35, 4.22, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.14, 16]} />
            <meshStandardMaterial color="#A2B29F" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Return Coupling Flange */}
          <mesh position={[-1.35, 4.22, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.14, 16]} />
            <meshStandardMaterial color="#4A5958" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 3. High-Visibility FiberRunner Optical Duct (Vibrant Telecom Yellow) */}
      <mesh position={[0, 4.08, -25]}>
        <boxGeometry args={[0.44, 0.11, 95]} />
        <meshStandardMaterial color="#E08E28" roughness={0.38} metalness={0.25} />
      </mesh>
      {/* FiberRunner Snap-on Lid */}
      <mesh position={[0, 4.14, -25]}>
        <boxGeometry args={[0.46, 0.02, 95]} />
        <meshStandardMaterial color="#222829" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* 4. Overhead Basket Cable Trays (Left & Right above racks) */}
      {/* Left Overhead Tray (X = -2.65, Y = 3.92) */}
      <mesh position={[-2.65, 3.92, -25]}>
        <boxGeometry args={[0.68, 0.06, 95]} />
        <meshStandardMaterial color="#2B3436" roughness={0.45} metalness={0.8} />
      </mesh>
      {/* Left Tray Bundled Cables (Data Trunk Blue & Optical Yellow) */}
      <mesh position={[-2.75, 3.97, -25]}>
        <boxGeometry args={[0.30, 0.05, 95]} />
        <meshStandardMaterial color="#1B3854" roughness={0.65} metalness={0.3} />
      </mesh>
      <mesh position={[-2.52, 3.97, -25]}>
        <boxGeometry args={[0.22, 0.05, 95]} />
        <meshStandardMaterial color="#C76E1A" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Right Overhead Tray (X = 2.65, Y = 3.92) */}
      <mesh position={[2.65, 3.92, -25]}>
        <boxGeometry args={[0.68, 0.06, 95]} />
        <meshStandardMaterial color="#2B3436" roughness={0.45} metalness={0.8} />
      </mesh>
      {/* Right Tray Bundled Cables */}
      <mesh position={[2.75, 3.97, -25]}>
        <boxGeometry args={[0.30, 0.05, 95]} />
        <meshStandardMaterial color="#1B3854" roughness={0.65} metalness={0.3} />
      </mesh>
      <mesh position={[2.52, 3.97, -25]}>
        <boxGeometry args={[0.22, 0.05, 95]} />
        <meshStandardMaterial color="#C76E1A" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* 5. Suspended Unistrut Trapeze Hangers every 3.8m */}
      {trapezePositions.map((z, idx) => (
        <group key={`trapeze-${idx}`} position={[0, 0, z]}>
          {/* Horizontal Strut */}
          <mesh position={[0, 3.94, 0]}>
            <boxGeometry args={[6.2, 0.045, 0.05]} />
            <meshStandardMaterial color="#3E4C4E" roughness={0.35} metalness={0.75} />
          </mesh>
          {/* Threaded Suspension Rods */}
          <mesh position={[-3.0, 4.22, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.55, 8]} />
            <meshStandardMaterial color="#9AA7A8" roughness={0.25} metalness={0.9} />
          </mesh>
          <mesh position={[3.0, 4.22, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.55, 8]} />
            <meshStandardMaterial color="#9AA7A8" roughness={0.25} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* 6. Continuous Architectural Linear LED Light Battens (Neutral White 4500K) */}
      {/* Left Linear Light Fixture (X = -1.65, Y = 3.98) */}
      <group position={[-1.65, 3.98, -25]}>
        <mesh>
          <boxGeometry args={[0.12, 0.06, 95]} />
          <meshStandardMaterial color="#262D2E" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.035, 0]}>
          <boxGeometry args={[0.09, 0.018, 95]} />
          <meshBasicMaterial color="#FFFDF8" />
        </mesh>
      </group>

      {/* Right Linear Light Fixture (X = 1.65, Y = 3.98) */}
      <group position={[1.65, 3.98, -25]}>
        <mesh>
          <boxGeometry args={[0.12, 0.06, 95]} />
          <meshStandardMaterial color="#262D2E" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.035, 0]}>
          <boxGeometry args={[0.09, 0.018, 95]} />
          <meshBasicMaterial color="#FFFDF8" />
        </mesh>
      </group>

      {/* 7. Cold Aisle Containment (CAC) Crystal Polycarbonate Ceiling Baffles */}
      {/* Zero transmission pass = Crisp sharp 60 FPS rendering without blur */}
      <mesh position={[0, 3.92, -25]}>
        <boxGeometry args={[3.4, 0.012, 95]} />
        <meshStandardMaterial
          color="#8FA89B"
          roughness={0.2}
          metalness={0.3}
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  );
}
