'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * HolographicDataCentreProjection
 * Renders futuristic holographic cube projection matrices for all data centre server racks
 * before they solidify into physical hardware enclosures.
 *
 * Visual Features:
 * - Glowing electric cyan/sage wireframe cube cages (EIA 42U rack bounds)
 * - Volumetric downward laser projection beams streaming from overhead ceiling trays
 * - Scanning laser plane sweeping vertically through the racks
 * - Digital voxel grid lattice layers
 * - Smooth materialization transition from pure digital projection to physical solid hardware
 */
export default function HolographicDataCentreProjection({
  materializeProgress = 1.0, // 0.0 = pure hologram cubes, 1.0 = fully materialized physical racks
  isScanning = false,
}) {
  const groupRef = useRef();
  const scanPlaneRef = useRef();
  const beamLinesRef = useRef();
  const cubeMeshRef = useRef();
  const edgeLinesRef = useRef();

  // Compute exact rack matrix locations matching EnterpriseServerRacks.jsx
  const { rackPositions, cubeInstanceTransforms, beamInstanceTransforms } = useMemo(() => {
    const rackWidthZ = 0.86;
    const rackDepthX = 1.10;
    const rackHeightY = 2.42;
    const rackSpacing = 0.98;
    const reservedOpenings = [-15, -35];

    const aisleSides = [
      { side: 'left', centerX: -2.60, dir: 1 },
      { side: 'right', centerX: 2.60, dir: -1 },
    ];

    const positions = [];
    const cTransforms = [];
    const bTransforms = [];
    const dummy = new THREE.Object3D();

    for (let z = 12; z >= -56; z -= rackSpacing) {
      const inOpening = reservedOpenings.some((oz) => Math.abs(z - oz) < 2.6);
      if (inOpening) continue;

      aisleSides.forEach(({ centerX, dir }) => {
        const posX = centerX - dir * 0.05;
        const posY = rackHeightY / 2 + 0.04;
        const posZ = z;

        positions.push({ x: posX, y: posY, z: posZ });

        // 1. Cube Matrix Transform
        dummy.position.set(posX, posY, posZ);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(rackDepthX, rackHeightY, rackWidthZ);
        dummy.updateMatrix();
        cTransforms.push(dummy.matrix.clone());

        // 2. Ceiling Downward Laser Beam Transform (from Y=4.1 ceiling down to rack top Y=2.45)
        const beamHeight = 4.1 - (rackHeightY + 0.04);
        dummy.position.set(posX, rackHeightY + 0.04 + beamHeight / 2, posZ);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(0.04, beamHeight, 0.04);
        dummy.updateMatrix();
        bTransforms.push(dummy.matrix.clone());
      });
    }

    return {
      rackPositions: positions,
      cubeInstanceTransforms: cTransforms,
      beamInstanceTransforms: bTransforms,
    };
  }, []);

  // Geometry for individual rack bounding cube
  const { cubeGeom, wireGeom } = useMemo(() => {
    const box = new THREE.BoxGeometry(1, 1, 1);
    const edges = new THREE.EdgesGeometry(box);
    return { cubeGeom: box, wireGeom: edges };
  }, []);

  // Initialize instanced matrices
  useMemo(() => {
    // will be bound in useFrame / initial layout
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Calculate dynamic hologram visibility / opacity based on materializeProgress
    // When materializeProgress is 1.0 (fully formed), keep subtle ambient holographic telemetry glow (or pulse if scanning)
    const baseHoloAlpha = isScanning ? 0.75 : Math.max(0, 1.0 - materializeProgress);
    const pulse = 0.5 + Math.sin(t * 3.2) * 0.25;

    if (cubeMeshRef.current) {
      cubeMeshRef.current.material.opacity = (baseHoloAlpha * 0.18 + (isScanning ? pulse * 0.15 : 0.02));
      cubeMeshRef.current.visible = cubeMeshRef.current.material.opacity > 0.005;
    }

    if (edgeLinesRef.current) {
      edgeLinesRef.current.material.opacity = (baseHoloAlpha * 0.85 + (isScanning ? pulse * 0.4 : 0.12));
      edgeLinesRef.current.visible = edgeLinesRef.current.material.opacity > 0.01;
    }

    if (beamLinesRef.current) {
      beamLinesRef.current.material.opacity = baseHoloAlpha * 0.45;
      beamLinesRef.current.visible = baseHoloAlpha > 0.05;
    }

    // Vertical sweep scanning plane
    if (scanPlaneRef.current) {
      const scanCycle = (t * 1.4) % 2.0; // 0 to 2
      const scanY = 0.1 + scanCycle * 1.2;
      scanPlaneRef.current.position.y = scanY;
      scanPlaneRef.current.material.opacity = (baseHoloAlpha > 0.05 || isScanning) ? 0.45 : 0.0;
    }
  });

  return (
    <group ref={groupRef} name="holographic-data-centre-projection">
      {/* 1. Instanced Translucent Holographic Voxel Cubes */}
      <instancedMesh
        ref={(mesh) => {
          cubeMeshRef.current = mesh;
          if (mesh) {
            cubeInstanceTransforms.forEach((mat, i) => mesh.setMatrixAt(i, mat));
            mesh.instanceMatrix.needsUpdate = true;
          }
        }}
        args={[cubeGeom, null, cubeInstanceTransforms.length]}
      >
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </instancedMesh>

      {/* 2. Instanced Glowing Electric Cyan / Sage Wireframe Edge Lines */}
      {/* Using lineSegments for razor-sharp sci-fi blueprint aesthetic */}
      <instancedMesh
        ref={(mesh) => {
          edgeLinesRef.current = mesh;
          if (mesh) {
            cubeInstanceTransforms.forEach((mat, i) => mesh.setMatrixAt(i, mat));
            mesh.instanceMatrix.needsUpdate = true;
          }
        }}
        args={[cubeGeom, null, cubeInstanceTransforms.length]}
      >
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.65}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      {/* 3. Downward Ceiling Emitter Laser Projection Lines */}
      <instancedMesh
        ref={(mesh) => {
          beamLinesRef.current = mesh;
          if (mesh) {
            beamInstanceTransforms.forEach((mat, i) => mesh.setMatrixAt(i, mat));
            mesh.instanceMatrix.needsUpdate = true;
          }
        }}
        args={[cubeGeom, null, beamInstanceTransforms.length]}
      >
        <meshBasicMaterial
          color="#24BFEA"
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      {/* 4. Sweeping Horizontal Holographic Scanner Plane */}
      <mesh
        ref={scanPlaneRef}
        position={[0, 1.25, -22]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[7.2, 70]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
