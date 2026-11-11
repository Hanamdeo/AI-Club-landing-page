'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { usePerformanceTier } from '@/utils/ResponsivePerformanceManager';

/**
 * LuminousConduits
 * High-intensity illuminated overhead conduit tubes from the Synapse data centre reference.
 * Features continuous glowing neon pipes with dynamic streaming light packets racing down the aisle.
 */
function LuminousConduits() {
  const pulseRefL = useRef();
  const pulseRefR = useRef();
  const numPulses = 8;
  const pulseTransforms = useMemo(() => {
    return Array.from({ length: numPulses }, (_, i) => ({
      offset: i * (80 / numPulses),
      speed: 14 + (i % 3) * 3,
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pulseRefL.current) {
      pulseTransforms.forEach(({ offset, speed }, i) => {
        const z = 14 - (((t * speed + offset) % 78));
        dummy.position.set(-2.15, 2.95, z);
        dummy.rotation.set(Math.PI / 2, 0, 0);
        dummy.scale.set(0.18, 5.5, 0.18);
        dummy.updateMatrix();
        pulseRefL.current.setMatrixAt(i, dummy.matrix);
      });
      pulseRefL.current.instanceMatrix.needsUpdate = true;
    }
    if (pulseRefR.current) {
      pulseTransforms.forEach(({ offset, speed }, i) => {
        const z = 14 - (((t * speed + offset + 5.2) % 78));
        dummy.position.set(2.15, 2.95, z);
        dummy.rotation.set(Math.PI / 2, 0, 0);
        dummy.scale.set(0.18, 5.5, 0.18);
        dummy.updateMatrix();
        pulseRefR.current.setMatrixAt(i, dummy.matrix);
      });
      pulseRefR.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. Left Twin Conduits: Lower White Neon + Upper Slate Silver Core + Volumetric Aura */}
      <group position={[-2.15, 2.95, -25]}>
        {/* Structural cable tray chassis */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.26, 0.08, 95]} />
          <meshStandardMaterial color="#11161B" roughness={0.5} metalness={0.7} />
        </mesh>
        {/* Primary lower glowing conduit pipe (Crisp White) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 95, 16]} />
          <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
        </mesh>
        {/* Volumetric glow sheath (Soft Silver Aura) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 95, 16]} />
          <meshBasicMaterial
            color="#F1F5F9"
            transparent
            opacity={0.32}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
        {/* Parallel upper conduit pipe (Twin Rail in Slate Grey) */}
        <mesh position={[0, 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 95, 16]} />
          <meshBasicMaterial color="#94A3B8" toneMapped={false} />
        </mesh>
      </group>

      {/* 2. Right Twin Conduits: Lower White Neon + Upper Slate Silver Core + Volumetric Aura */}
      <group position={[2.15, 2.95, -25]}>
        {/* Structural cable tray chassis */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.26, 0.08, 95]} />
          <meshStandardMaterial color="#11161B" roughness={0.5} metalness={0.7} />
        </mesh>
        {/* Primary lower glowing conduit pipe (Crisp White) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 95, 16]} />
          <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
        </mesh>
        {/* Volumetric glow sheath (Soft Silver Aura) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 95, 16]} />
          <meshBasicMaterial
            color="#F1F5F9"
            transparent
            opacity={0.32}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
        {/* Parallel upper conduit pipe (Twin Rail in Slate Grey) */}
        <mesh position={[0, 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 95, 16]} />
          <meshBasicMaterial color="#94A3B8" toneMapped={false} />
        </mesh>
      </group>

      {/* Vertical Hanger Struts connecting Ceiling to Conduits */}
      {Array.from({ length: 22 }).map((_, i) => {
        const hz = 12 - i * 3.5;
        return (
          <group key={`hanger-${i}`}>
            <mesh position={[-2.15, 3.6, hz]}>
              <cylinderGeometry args={[0.012, 0.012, 1.2, 8]} />
              <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[2.15, 3.6, hz]}>
              <cylinderGeometry args={[0.012, 0.012, 1.2, 8]} />
              <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        );
      })}

      {/* Longitudinal Center Ceiling Light Rails pointing to Vanishing Point */}
      <mesh position={[-0.5, 4.15, -25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 95, 8]} />
        <meshBasicMaterial color="#E2E8F0" transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh position={[0.5, 4.15, -25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 95, 8]} />
        <meshBasicMaterial color="#E2E8F0" transparent opacity={0.55} toneMapped={false} />
      </mesh>

      {/* 3. Traveling High-Intensity Laser Pulse Streaks */}
      <instancedMesh ref={pulseRefL} args={[null, null, numPulses]}>
        <cylinderGeometry args={[1, 1, 1, 12]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      <instancedMesh ref={pulseRefR} args={[null, null, numPulses]}>
        <cylinderGeometry args={[1, 1, 1, 12]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}

/**
 * DataCentreCeiling (High-Performance GPU-Instanced Infrastructure)
 * - Trapeze hangers and pipe flanges rendered via InstancedMesh (drops 88 draw calls to 4)
 * - Progressive tier adaptation (culls fine hangers on low-tier hardware)
 * - Industrial cable trays, optical raceways, and linear LED fixtures
 */
export default function DataCentreCeiling() {
  const tierState = usePerformanceTier();
  const enableTrapezes = tierState.features?.enableCeilingTrapezes ?? true;

  const {
    trapezeCount,
    strutMatrices,
    rodLeftMatrices,
    rodRightMatrices,
    flangeSupplyMatrices,
    flangeReturnMatrices,
    pipeJointCount,
  } = useMemo(() => {
    const trapezes = [];
    const pipeJoints = [];

    for (let z = 14; z >= -62; z -= 3.8) {
      trapezes.push(z);
    }
    for (let z = 14; z >= -62; z -= 5.5) {
      pipeJoints.push(z);
    }

    const dummy = new THREE.Object3D();

    const struts = [];
    const rodL = [];
    const rodR = [];

    trapezes.forEach((z) => {
      // Horizontal strut
      dummy.position.set(0, 3.94, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(6.2, 0.045, 0.05);
      dummy.updateMatrix();
      struts.push(dummy.matrix.clone());

      // Left rod
      dummy.position.set(-3.0, 4.22, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      rodL.push(dummy.matrix.clone());

      // Right rod
      dummy.position.set(3.0, 4.22, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      rodR.push(dummy.matrix.clone());
    });

    const fSupply = [];
    const fReturn = [];

    pipeJoints.forEach((z) => {
      // Supply coupling flange
      dummy.position.set(1.35, 4.22, z);
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      fSupply.push(dummy.matrix.clone());

      // Return coupling flange
      dummy.position.set(-1.35, 4.22, z);
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      fReturn.push(dummy.matrix.clone());
    });

    return {
      trapezeCount: trapezes.length,
      strutMatrices: struts,
      rodLeftMatrices: rodL,
      rodRightMatrices: rodR,
      pipeJointCount: pipeJoints.length,
      flangeSupplyMatrices: fSupply,
      flangeReturnMatrices: fReturn,
    };
  }, []);

  const strutInstRef = useRef();
  const rodLeftInstRef = useRef();
  const rodRightInstRef = useRef();
  const fSupplyInstRef = useRef();
  const fReturnInstRef = useRef();

  useEffect(() => {
    if (enableTrapezes) {
      if (strutInstRef.current) {
        strutMatrices.forEach((m, i) => strutInstRef.current.setMatrixAt(i, m));
        strutInstRef.current.instanceMatrix.needsUpdate = true;
      }
      if (rodLeftInstRef.current) {
        rodLeftMatrices.forEach((m, i) => rodLeftInstRef.current.setMatrixAt(i, m));
        rodLeftInstRef.current.instanceMatrix.needsUpdate = true;
      }
      if (rodRightInstRef.current) {
        rodRightMatrices.forEach((m, i) => rodRightInstRef.current.setMatrixAt(i, m));
        rodRightInstRef.current.instanceMatrix.needsUpdate = true;
      }
    }
    if (fSupplyInstRef.current) {
      flangeSupplyMatrices.forEach((m, i) => fSupplyInstRef.current.setMatrixAt(i, m));
      fSupplyInstRef.current.instanceMatrix.needsUpdate = true;
    }
    if (fReturnInstRef.current) {
      flangeReturnMatrices.forEach((m, i) => fReturnInstRef.current.setMatrixAt(i, m));
      fReturnInstRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [
    enableTrapezes,
    strutMatrices,
    rodLeftMatrices,
    rodRightMatrices,
    flangeSupplyMatrices,
    flangeReturnMatrices,
  ]);

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

      {/* Instanced Pipe Flange Joints */}
      {pipeJointCount > 0 && (
        <>
          <instancedMesh ref={fSupplyInstRef} args={[null, null, pipeJointCount]}>
            <cylinderGeometry args={[0.12, 0.12, 0.14, 16]} />
            <meshStandardMaterial color="#A2B29F" roughness={0.3} metalness={0.8} />
          </instancedMesh>
          <instancedMesh ref={fReturnInstRef} args={[null, null, pipeJointCount]}>
            <cylinderGeometry args={[0.12, 0.12, 0.14, 16]} />
            <meshStandardMaterial color="#4A5958" roughness={0.3} metalness={0.8} />
          </instancedMesh>
        </>
      )}

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

      {/* 5. Instanced Suspended Unistrut Trapeze Hangers (Adaptive) */}
      {enableTrapezes && trapezeCount > 0 && (
        <>
          <instancedMesh ref={strutInstRef} args={[null, null, trapezeCount]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#3E4C4E" roughness={0.35} metalness={0.75} />
          </instancedMesh>
          <instancedMesh ref={rodLeftInstRef} args={[null, null, trapezeCount]}>
            <cylinderGeometry args={[0.012, 0.012, 0.55, 8]} />
            <meshStandardMaterial color="#9AA7A8" roughness={0.25} metalness={0.9} />
          </instancedMesh>
          <instancedMesh ref={rodRightInstRef} args={[null, null, trapezeCount]}>
            <cylinderGeometry args={[0.012, 0.012, 0.55, 8]} />
            <meshStandardMaterial color="#9AA7A8" roughness={0.25} metalness={0.9} />
          </instancedMesh>
        </>
      )}

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
      {/* 8. Synapse Reference: Overhead High-Intensity Luminous Conduits & Laser Streaks */}
      <LuminousConduits />
    </group>
  );
}
