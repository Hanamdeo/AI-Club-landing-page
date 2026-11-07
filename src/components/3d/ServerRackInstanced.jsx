'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * ServerRackInstanced
 * Highly optimized instanced mesh rendering 80+ server racks along both corridor walls.
 * Uses 2 draw calls for the entire corridor's server infrastructure.
 */
export default function ServerRackInstanced() {
  const rackBodyRef = useRef();
  const rackBezelRef = useRef();
  const rackLedRef = useRef();

  // Zone alcove openings where racks are recessed or omitted to make room for zone landmarks
  const zoneOpenings = useMemo(() => [-15, -45, -75, -105, -135, -165], []);

  // Compute transform matrices for rack instances
  const { rackMatrices, bezelMatrices, ledMatrices, ledCount } = useMemo(() => {
    const rMats = [];
    const bMats = [];
    const lMats = [];

    const dummy = new THREE.Object3D();
    const rackSpacing = 2.4;
    const startZ = 12;
    const endZ = -175;

    let totalLeds = 0;

    for (let z = startZ; z >= endZ; z -= rackSpacing) {
      // Check if this position collides with a zone opening
      const inOpening = zoneOpenings.some((oz) => Math.abs(z - oz) < 3.2);

      // Left side racks (X = -3.2)
      if (!inOpening || Math.abs(z - -165) > 6) {
        // Main rack body
        dummy.position.set(-3.2, 1.8, z);
        dummy.rotation.set(0, Math.PI / 2, 0);
        dummy.scale.set(1.4, 3.6, 0.9);
        dummy.updateMatrix();
        rMats.push(dummy.matrix.clone());

        // Front bezel frame
        dummy.position.set(-2.72, 1.8, z);
        dummy.rotation.set(0, Math.PI / 2, 0);
        dummy.scale.set(1.35, 3.4, 0.08);
        dummy.updateMatrix();
        bMats.push(dummy.matrix.clone());

        // Small indicator LED clusters on server face
        for (let row = 0; row < 4; row++) {
          dummy.position.set(-2.67, 0.6 + row * 0.8, z - 0.4 + (row % 2) * 0.3);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(0.04, 0.04, 0.04);
          dummy.updateMatrix();
          lMats.push(dummy.matrix.clone());
          totalLeds++;
        }
      }

      // Right side racks (X = 3.2)
      if (!inOpening || Math.abs(z - -165) > 6) {
        // Main rack body
        dummy.position.set(3.2, 1.8, z);
        dummy.rotation.set(0, -Math.PI / 2, 0);
        dummy.scale.set(1.4, 3.6, 0.9);
        dummy.updateMatrix();
        rMats.push(dummy.matrix.clone());

        // Front bezel frame
        dummy.position.set(2.72, 1.8, z);
        dummy.rotation.set(0, -Math.PI / 2, 0);
        dummy.scale.set(1.35, 3.4, 0.08);
        dummy.updateMatrix();
        bMats.push(dummy.matrix.clone());

        // Small indicator LED clusters on server face
        for (let row = 0; row < 4; row++) {
          dummy.position.set(2.67, 0.6 + row * 0.8, z - 0.3 + (row % 2) * 0.3);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(0.04, 0.04, 0.04);
          dummy.updateMatrix();
          lMats.push(dummy.matrix.clone());
          totalLeds++;
        }
      }
    }

    return {
      rackMatrices: rMats,
      bezelMatrices: bMats,
      ledMatrices: lMats,
      ledCount: totalLeds,
    };
  }, [zoneOpenings]);

  // Apply matrices to instanced meshes once mounted
  React.useEffect(() => {
    if (rackBodyRef.current) {
      rackMatrices.forEach((mat, i) => {
        rackBodyRef.current.setMatrixAt(i, mat);
      });
      rackBodyRef.current.instanceMatrix.needsUpdate = true;
    }

    if (rackBezelRef.current) {
      bezelMatrices.forEach((mat, i) => {
        rackBezelRef.current.setMatrixAt(i, mat);
      });
      rackBezelRef.current.instanceMatrix.needsUpdate = true;
    }

    if (rackLedRef.current) {
      const sageColor = new THREE.Color('#A2B29F');
      const ivoryColor = new THREE.Color('#E6E2D8');
      const amberColor = new THREE.Color('#D4A373');

      ledMatrices.forEach((mat, i) => {
        rackLedRef.current.setMatrixAt(i, mat);
        // Alternate colors for industrial activity
        const color = i % 7 === 0 ? amberColor : i % 3 === 0 ? ivoryColor : sageColor;
        rackLedRef.current.setColorAt(i, color);
      });
      rackLedRef.current.instanceMatrix.needsUpdate = true;
      if (rackLedRef.current.instanceColor) {
        rackLedRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [rackMatrices, bezelMatrices, ledMatrices]);

  // Subtle pulsing animation on LEDs
  useFrame(({ clock }) => {
    if (rackLedRef.current) {
      const t = clock.getElapsedTime();
      rackLedRef.current.material.opacity = 0.65 + Math.sin(t * 3.5) * 0.25;
    }
  });

  return (
    <group>
      {/* 1. Main Rack Bodies (Charcoal Metal) */}
      <instancedMesh
        ref={rackBodyRef}
        args={[null, null, rackMatrices.length]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#222828"
          roughness={0.7}
          metalness={0.4}
        />
      </instancedMesh>

      {/* 2. Front Server Blade Bezels (Slate Grey Slits) */}
      <instancedMesh
        ref={rackBezelRef}
        args={[null, null, bezelMatrices.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#343D3C"
          roughness={0.5}
          metalness={0.6}
        />
      </instancedMesh>

      {/* 3. Server Activity Indicator LEDs */}
      <instancedMesh
        ref={rackLedRef}
        args={[null, null, ledCount]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          transparent
          opacity={0.8}
        />
      </instancedMesh>
    </group>
  );
}

