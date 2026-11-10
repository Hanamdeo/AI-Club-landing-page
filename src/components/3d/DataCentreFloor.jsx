'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * DataCentreFloor (Refinement V3)
 * Authentic 600mm x 600mm Raised Access Floor (RAF) System:
 * - Anti-static semi-reflective metallic epoxy tile base with crisp specular response
 * - Properly instanced perforated cold-air plenum intake tiles along rack fronts
 * - Brushed steel tile joint seams and recessed perimeter cable trench covers
 * - Controlled sage-tinted cold aisle demarcation lines and underfloor plenum lighting
 */
export default function DataCentreFloor() {
  const perfTilesRef = useRef();
  const trenchCoversRef = useRef();

  // Compute transform matrices for perforated cold-air tiles and side trench covers
  const { perfTilesMatrices, trenchMatrices } = useMemo(() => {
    const pMats = [];
    const tMats = [];
    const dummy = new THREE.Object3D();

    // 1. Cold air perforated floor tiles placed right along rack intakes (X = -2.05 and X = 2.05)
    for (let z = 14; z >= -62; z -= 1.10) {
      // Left side perforated tiles (X = -2.05)
      dummy.position.set(-2.05, 0.008, z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.set(0.60, 1.05, 1);
      dummy.updateMatrix();
      pMats.push(dummy.matrix.clone());

      // Right side perforated tiles (X = 2.05)
      dummy.position.set(2.05, 0.008, z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.set(0.60, 1.05, 1);
      dummy.updateMatrix();
      pMats.push(dummy.matrix.clone());
    }

    // 2. Side perimeter cable trench covers (X = -4.2 and X = 4.2)
    for (let z = 14; z >= -62; z -= 2.8) {
      dummy.position.set(-4.2, 0.006, z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.set(0.75, 2.7, 1);
      dummy.updateMatrix();
      tMats.push(dummy.matrix.clone());

      dummy.position.set(4.2, 0.006, z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.set(0.75, 2.7, 1);
      dummy.updateMatrix();
      tMats.push(dummy.matrix.clone());
    }

    return {
      perfTilesMatrices: pMats,
      trenchMatrices: tMats,
    };
  }, []);

  // Apply matrix buffers
  useEffect(() => {
    if (perfTilesRef.current && perfTilesMatrices.length > 0) {
      perfTilesMatrices.forEach((mat, i) => {
        perfTilesRef.current.setMatrixAt(i, mat);
      });
      perfTilesRef.current.instanceMatrix.needsUpdate = true;
    }

    if (trenchCoversRef.current && trenchMatrices.length > 0) {
      trenchMatrices.forEach((mat, i) => {
        trenchCoversRef.current.setMatrixAt(i, mat);
      });
      trenchCoversRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [perfTilesMatrices, trenchMatrices]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Main Raised Floor Base: Anti-static semi-matte slate-graphite epoxy (no harsh specular blowout) */}
      <mesh position={[0, -0.01, -25]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[11.5, 95]} />
        <meshStandardMaterial
          color="#151A1B"
          roughness={0.58}
          metalness={0.35}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* 2. Raised Floor 600mm Tile Grid Seams (Clear metallic joints) */}
      <gridHelper
        args={[95, 76, '#323E40', '#222B2D']}
        position={[0, 0.003, -25]}
      />

      {/* 3. Instanced Perforated Cold Air Supply Tiles (Right in front of server racks) */}
      <instancedMesh
        ref={perfTilesRef}
        args={[null, null, perfTilesMatrices.length]}
        receiveShadow
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#252F30"
          roughness={0.4}
          metalness={0.7}
        />
      </instancedMesh>

      {/* 4. Instanced Side Cable Trench Covers */}
      <instancedMesh
        ref={trenchCoversRef}
        args={[null, null, trenchMatrices.length]}
        receiveShadow
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#161B1C"
          roughness={0.5}
          metalness={0.6}
        />
      </instancedMesh>

      {/* 5. Central Cold Aisle Floor Demarcation Guide Strips (Sage Green) */}
      {/* Left guide strip */}
      <mesh position={[-1.72, 0.005, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, 95]} />
        <meshBasicMaterial color="#E2E8F0" transparent opacity={0.65} />
      </mesh>
      {/* Right guide strip */}
      <mesh position={[1.72, 0.005, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, 95]} />
        <meshBasicMaterial color="#E2E8F0" transparent opacity={0.65} />
      </mesh>

      {/* Aisle Center Orientation Line */}
      <mesh position={[0, 0.004, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.02, 95]} />
        <meshBasicMaterial color="#3E4C4E" transparent opacity={0.7} />
      </mesh>

      {/* Stenciled Threshold Placard at Aisle Entrance */}
      <group position={[0, 0.007, 8]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <planeGeometry args={[2.4, 0.14]} />
          <meshBasicMaterial color="#1A2122" />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[2.34, 0.09]} />
          <meshBasicMaterial color="#E2E8F0" transparent opacity={0.85} />
        </mesh>
      </group>

      {/* Underfloor Cold Air Plenum Upward Glow along Racks */}
      {[-2.05, 2.05].map((x) =>
        [6, -6, -18, -30, -42].map((z, idx) => (
          <pointLight
            key={`plenum-glow-${x}-${idx}`}
            position={[x, 0.15, z]}
            color="#8FA89B"
            intensity={0.42}
            distance={4.2}
            decay={2}
          />
        ))
      )}
    </group>
  );
}
