'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * InRowCoolingUnits (Refinement V3)
 * In-Row Precision Air Conditioning (CRAH) units stationed between rack banks:
 * - Slender cooling modules flush with the rack row lineup
 * - Front air intake with horizontal/vertical louvers
 * - Digital thermal display readouts (18.2°C Nominal Cold Aisle)
 * - Overhead coolant flex connection lines entering the ceiling plenum
 */
export default function InRowCoolingUnits() {
  const coolingUnits = useMemo(
    () => [
      { side: 'left', x: -2.60, frontX: -2.05, z: 2.5, dir: 1 },
      { side: 'right', x: 2.60, frontX: 2.05, z: 2.5, dir: -1 },
      { side: 'left', x: -2.60, frontX: -2.05, z: -25.5, dir: 1 },
      { side: 'right', x: 2.60, frontX: 2.05, z: -25.5, dir: -1 },
      { side: 'left', x: -2.60, frontX: -2.05, z: -48.0, dir: 1 },
      { side: 'right', x: 2.60, frontX: 2.05, z: -48.0, dir: -1 },
    ],
    []
  );

  return (
    <group position={[0, 0, 0]}>
      {coolingUnits.map((unit, idx) => (
        <group key={`inrow-crah-${idx}`} position={[unit.x, 1.25, unit.z]}>
          {/* Main In-Row Cabinet Shell */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.10, 2.42, 0.42]} />
            <meshStandardMaterial color="#22292B" roughness={0.45} metalness={0.7} />
          </mesh>

          {/* Front Intake Louver Grill */}
          <mesh position={[unit.dir * 0.54, 0, 0]}>
            <boxGeometry args={[0.03, 2.25, 0.36]} />
            <meshStandardMaterial color="#171C1D" roughness={0.5} metalness={0.8} />
          </mesh>

          {/* Louver Fin Dividers */}
          {[-0.8, -0.4, 0, 0.4, 0.8].map((y, i) => (
            <mesh key={`fin-${i}`} position={[unit.dir * 0.555, y, 0]}>
              <boxGeometry args={[0.015, 0.03, 0.34]} />
              <meshStandardMaterial color="#3A4749" roughness={0.3} metalness={0.9} />
            </mesh>
          ))}

          {/* Digital Temperature Display Placard (18.2°C) */}
          <mesh position={[unit.dir * 0.56, 0.95, 0]}>
            <boxGeometry args={[0.012, 0.12, 0.26]} />
            <meshBasicMaterial color="#0A0E0F" />
          </mesh>
          <mesh position={[unit.dir * 0.566, 0.95, 0]}>
            <planeGeometry args={[0.24, 0.09]} />
            <meshBasicMaterial color="#A2B29F" transparent opacity={0.9} />
          </mesh>

          {/* Status Indicator Bar */}
          <mesh position={[unit.dir * 0.56, 1.10, 0]}>
            <boxGeometry args={[0.015, 0.03, 0.28]} />
            <meshBasicMaterial color="#A2B29F" />
          </mesh>

          {/* Top Coolant Feed Hose into Overhead Ceiling */}
          <mesh position={[0, 1.48, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.65, 16]} />
            <meshStandardMaterial color="#344143" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
