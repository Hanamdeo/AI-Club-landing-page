'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getZoneTransitionState } from '@/utils/zoneTransition';

/**
 * HolographicDataCentreProjection
 * Renders futuristic holographic cube projection matrices for all data centre server racks
 * before they solidify into physical hardware enclosures.
 *
 * Visual Features:
 * - Glowing electric cyan/sage wireframe cube cages (EIA 42U rack bounds)
 * - Volumetric downward laser projection beams streaming from overhead ceiling trays
 * - Scanning laser plane sweeping vertically through the racks during cluster transitions
 * - Digital voxel grid lattice layers
 * - Smooth materialization transition from pure digital projection to physical solid hardware
 */
export default function HolographicDataCentreProjection({
  materializeProgress = 1.0, // 0.0 = pure hologram cubes, 1.0 = fully materialized physical racks
  isScanning = false,
  scrollProgress = 0,
  scrollProgressRef,
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
    const rawP = scrollProgressRef?.current !== undefined ? scrollProgressRef.current : scrollProgress;
    const { sceneState } = getZoneTransitionState(rawP);
    const activeScan = isScanning || sceneState === 'transitioning';

    // Calculate dynamic hologram visibility / opacity based on materializeProgress and sceneState
    const baseHoloAlpha = activeScan ? 0.85 : Math.max(0, 1.0 - materializeProgress);
    const pulse = 0.5 + Math.sin(t * 3.6) * 0.3;

    if (cubeMeshRef.current) {
      const alpha = activeScan ? pulse * 0.16 + 0.10 : baseHoloAlpha * 0.18;
      cubeMeshRef.current.material.opacity = alpha;
      cubeMeshRef.current.visible = activeScan || baseHoloAlpha > 0.05;
    }

    if (edgeLinesRef.current) {
      const alpha = activeScan ? pulse * 0.45 + 0.40 : baseHoloAlpha * 0.85;
      edgeLinesRef.current.material.opacity = alpha;
      edgeLinesRef.current.visible = activeScan || baseHoloAlpha > 0.05;
    }

    if (beamLinesRef.current) {
      const alpha = activeScan ? 0.35 : baseHoloAlpha * 0.45;
      beamLinesRef.current.material.opacity = alpha;
      beamLinesRef.current.visible = activeScan && alpha > 0.05;
    }

    // Vertical sweep scanning plane during cluster transit
    if (scanPlaneRef.current) {
      if (activeScan) {
        scanPlaneRef.current.visible = true;
        const scanCycle = (t * 1.8) % 2.0;
        const scanY = 0.1 + scanCycle * 1.2;
        scanPlaneRef.current.position.y = scanY;
        scanPlaneRef.current.material.opacity = 0.55;
      } else {
        scanPlaneRef.current.visible = false;
      }
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
          color="#FFFFFF"
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
          color="#E2E8F0"
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
          color="#CBD5E1"
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
          color="#FFFFFF"
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
