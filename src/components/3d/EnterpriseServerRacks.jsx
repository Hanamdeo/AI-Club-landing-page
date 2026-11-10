'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getZoneTransitionState } from '@/utils/zoneTransition';
import { usePerformanceTier } from '@/utils/ResponsivePerformanceManager';

/**
 * High-Performance Hardware Matrix Generator
 * Generates modular 42U rack enclosures, EIA mounting rails, multi-tier compute blocks,
 * and status LED arrays for a designated aisle span.
 */
function generateClusterHardware(zStart, zEnd, reservedOpenings = [-15, -35]) {
  const rackWidthZ = 0.86;
  const rackDepthX = 1.10;
  const rackHeightY = 2.42;
  const rackSpacing = 0.98;

  const dummy = new THREE.Object3D();

  const sides = [
    { side: 'left', centerX: -2.60, dir: 1 },
    { side: 'right', centerX: 2.60, dir: -1 },
  ];

  const result = {
    left: {
      frames: [],
      canopies: [],
      rails: [],
      computeChassis: [],
      gpuChassis: [],
      greenLeds: [],
      cyanLeds: [],
      amberLeds: [],
    },
    right: {
      frames: [],
      canopies: [],
      rails: [],
      computeChassis: [],
      gpuChassis: [],
      greenLeds: [],
      cyanLeds: [],
      amberLeds: [],
    },
  };

  let rackIndex = 0;

  for (let z = zStart; z >= zEnd; z -= rackSpacing) {
    const inOpening = reservedOpenings.some((oz) => Math.abs(z - oz) < 2.6);
    if (inOpening) continue;

    sides.forEach(({ side, centerX, dir }) => {
      rackIndex++;
      const target = result[side];
      const isGpuRack = rackIndex % 2 === 1;

      // 1. 42U Cabinet Enclosure Shell (Dark Obsidian Steel)
      dummy.position.set(centerX - dir * 0.05, rackHeightY / 2 + 0.04, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(rackDepthX, rackHeightY, rackWidthZ);
      dummy.updateMatrix();
      target.frames.push(dummy.matrix.clone());

      // 2. Canopy Roof Trim & Plinth
      dummy.position.set(centerX, rackHeightY + 0.03, z);
      dummy.scale.set(rackDepthX + 0.04, 0.06, rackWidthZ + 0.04);
      dummy.updateMatrix();
      target.canopies.push(dummy.matrix.clone());

      // 3. Vertical EIA 19" Mounting Rails (Brushed Titanium)
      [-rackWidthZ * 0.40, rackWidthZ * 0.40].forEach((rz) => {
        dummy.position.set(centerX + dir * 0.42, rackHeightY / 2 + 0.04, z + rz);
        dummy.scale.set(0.04, rackHeightY - 0.08, 0.04);
        dummy.updateMatrix();
        target.rails.push(dummy.matrix.clone());
      });

      // 4. Server Chassis Blocks (Stacked Compute Bays)
      const frontFaceX = centerX + dir * 0.43;

      if (!isGpuRack) {
        // High-Density Blade Compute (10 modular 2U chassis)
        for (let u = 0; u < 8; u++) {
          const uPosY = 0.28 + u * 0.26;
          dummy.position.set(frontFaceX - dir * 0.38, uPosY, z);
          dummy.scale.set(0.80, 0.22, rackWidthZ * 0.82);
          dummy.updateMatrix();
          target.computeChassis.push(dummy.matrix.clone());

          // Status LEDs
          const hasCyan = (rackIndex + u) % 3 === 0;
          const targetLed = hasCyan ? target.cyanLeds : target.greenLeds;
          dummy.position.set(frontFaceX + dir * 0.015, uPosY + 0.06, z + (u % 2 === 0 ? 0.22 : -0.22));
          dummy.scale.set(0.01, 0.01, 0.01);
          dummy.updateMatrix();
          targetLed.push(dummy.matrix.clone());
        }
      } else {
        // High-Power GPU AI Accelerator Pods (5 modular 4U chassis)
        for (let g = 0; g < 4; g++) {
          const gPosY = 0.34 + g * 0.52;
          dummy.position.set(frontFaceX - dir * 0.40, gPosY, z);
          dummy.scale.set(0.82, 0.46, rackWidthZ * 0.84);
          dummy.updateMatrix();
          target.gpuChassis.push(dummy.matrix.clone());

          // Dual intake status lights
          dummy.position.set(frontFaceX + dir * 0.015, gPosY + 0.16, z + 0.18);
          dummy.scale.set(0.012, 0.012, 0.012);
          dummy.updateMatrix();
          target.cyanLeds.push(dummy.matrix.clone());

          dummy.position.set(frontFaceX + dir * 0.015, gPosY + 0.16, z - 0.18);
          dummy.updateMatrix();
          target.cyanLeds.push(dummy.matrix.clone());

          // Warning / Activity beacon
          const isWarn = (rackIndex + g) % 5 === 0;
          dummy.position.set(frontFaceX + dir * 0.015, gPosY - 0.16, z);
          dummy.scale.set(0.01, 0.01, 0.01);
          dummy.updateMatrix();
          (isWarn ? target.amberLeds : target.greenLeds).push(dummy.matrix.clone());
        }
      }
    });
  }

  return result;
}

/**
 * Ultra-Fast Instanced Cluster Wing
 * Zero React re-renders. Manages direct Three.js materials for maximum 60-120 FPS throughput.
 */
function ClusterWing({ transforms, materialsRef, drawLeds = true }) {
  const fRef = useRef();
  const cRef = useRef();
  const rRef = useRef();
  const scRef = useRef();
  const gcRef = useRef();
  const grnRef = useRef();
  const cynRef = useRef();
  const ambRef = useRef();

  useEffect(() => {
    if (fRef.current) transforms.frames.forEach((m, i) => fRef.current.setMatrixAt(i, m));
    if (cRef.current) transforms.canopies.forEach((m, i) => cRef.current.setMatrixAt(i, m));
    if (rRef.current) transforms.rails.forEach((m, i) => rRef.current.setMatrixAt(i, m));
    if (scRef.current) transforms.computeChassis.forEach((m, i) => scRef.current.setMatrixAt(i, m));
    if (gcRef.current) transforms.gpuChassis.forEach((m, i) => gcRef.current.setMatrixAt(i, m));
    if (drawLeds && grnRef.current) transforms.greenLeds.forEach((m, i) => grnRef.current.setMatrixAt(i, m));
    if (drawLeds && cynRef.current) transforms.cyanLeds.forEach((m, i) => cynRef.current.setMatrixAt(i, m));
    if (drawLeds && ambRef.current) transforms.amberLeds.forEach((m, i) => ambRef.current.setMatrixAt(i, m));

    [fRef, cRef, rRef, scRef, gcRef, grnRef, cynRef, ambRef].forEach((ref) => {
      if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
    });
  }, [transforms, drawLeds]);

  return (
    <group>
      {transforms.frames.length > 0 && (
        <instancedMesh ref={fRef} args={[null, null, transforms.frames.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#131718"
            roughness={0.7}
            metalness={0.35}
            transparent
            opacity={1.0}
          />
        </instancedMesh>
      )}
      {transforms.canopies.length > 0 && (
        <instancedMesh ref={cRef} args={[null, null, transforms.canopies.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#1B2123"
            roughness={0.5}
            metalness={0.55}
            transparent
            opacity={1.0}
          />
        </instancedMesh>
      )}
      {transforms.rails.length > 0 && (
        <instancedMesh ref={rRef} args={[null, null, transforms.rails.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#5A6769"
            roughness={0.32}
            metalness={0.8}
            transparent
            opacity={1.0}
          />
        </instancedMesh>
      )}
      {transforms.computeChassis.length > 0 && (
        <instancedMesh ref={scRef} args={[null, null, transforms.computeChassis.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#182022"
            roughness={0.58}
            metalness={0.5}
            transparent
            opacity={1.0}
          />
        </instancedMesh>
      )}
      {transforms.gpuChassis.length > 0 && (
        <instancedMesh ref={gcRef} args={[null, null, transforms.gpuChassis.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#222B2D"
            roughness={0.42}
            metalness={0.7}
            transparent
            opacity={1.0}
          />
        </instancedMesh>
      )}
      {drawLeds && transforms.greenLeds.length > 0 && (
        <instancedMesh ref={grnRef} args={[null, null, transforms.greenLeds.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#26B85E"
            transparent
            opacity={0.85}
          />
        </instancedMesh>
      )}
      {drawLeds && transforms.cyanLeds.length > 0 && (
        <instancedMesh ref={cynRef} args={[null, null, transforms.cyanLeds.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#FFFFFF"
            transparent
            opacity={0.85}
          />
        </instancedMesh>
      )}
      {drawLeds && transforms.amberLeds.length > 0 && (
        <instancedMesh ref={ambRef} args={[null, null, transforms.amberLeds.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#F59E0B"
            transparent
            opacity={0.85}
          />
        </instancedMesh>
      )}
    </group>
  );
}

/**
 * EnterpriseServerRacks (Zero-Lag Cluster Engine)
 * High-performance GPU pipeline with continuous physical lerp and zero React state updates.
 */
export default function EnterpriseServerRacks({
  scrollProgress = 0,
  scrollProgressRef,
}) {
  const isReducedMotion = useRef(false);
  const tierState = usePerformanceTier();
  const drawLeds = tierState.features?.drawLeds ?? true;

  useEffect(() => {
    isReducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Compute instance matrices for 3 discrete cluster cohorts
  const c1Data = useMemo(() => generateClusterHardware(12, -5.5), []);
  const c2Data = useMemo(() => generateClusterHardware(-6.5, -25.5), []);
  const c3Data = useMemo(() => generateClusterHardware(-26.5, -56.0), []);

  // Material direct references for 0-overhead opacity updates
  const c1Materials = useRef([]);
  const c2Materials = useRef([]);
  const c3Materials = useRef([]);

  // Cluster Wing Group Refs
  const c1LeftRef = useRef();
  const c1RightRef = useRef();
  const c2LeftRef = useRef();
  const c2RightRef = useRef();
  const c3LeftRef = useRef();
  const c3RightRef = useRef();

  // Internal physical lerp tracking values
  const currentC1Slide = useRef(0);
  const currentC2Slide = useRef(0.44);
  const currentC3Slide = useRef(0.44);

  const currentC1Op = useRef(1.0);
  const currentC2Op = useRef(0.18);
  const currentC3Op = useRef(0.18);

  useFrame((_, delta) => {
    const rawP = scrollProgressRef?.current !== undefined ? scrollProgressRef.current : scrollProgress;
    const { clusters } = getZoneTransitionState(rawP, isReducedMotion.current);

    const lerpFactor = Math.min(1, delta * 8.5);

    // 1. Cluster 1 Lateral Slide & Opacity
    currentC1Slide.current += (clusters.c1.slide - currentC1Slide.current) * lerpFactor;
    currentC1Op.current += (clusters.c1.opacity - currentC1Op.current) * lerpFactor;

    if (c1LeftRef.current) c1LeftRef.current.position.x = -currentC1Slide.current;
    if (c1RightRef.current) c1RightRef.current.position.x = currentC1Slide.current;
    c1Materials.current.forEach((mat) => { mat.opacity = currentC1Op.current; });

    // 2. Cluster 2 Lateral Slide & Opacity
    currentC2Slide.current += (clusters.c2.slide - currentC2Slide.current) * lerpFactor;
    currentC2Op.current += (clusters.c2.opacity - currentC2Op.current) * lerpFactor;

    if (c2LeftRef.current) c2LeftRef.current.position.x = -currentC2Slide.current;
    if (c2RightRef.current) c2RightRef.current.position.x = currentC2Slide.current;
    c2Materials.current.forEach((mat) => { mat.opacity = currentC2Op.current; });

    // 3. Cluster 3 Lateral Slide & Opacity
    currentC3Slide.current += (clusters.c3.slide - currentC3Slide.current) * lerpFactor;
    currentC3Op.current += (clusters.c3.opacity - currentC3Op.current) * lerpFactor;

    if (c3LeftRef.current) c3LeftRef.current.position.x = -currentC3Slide.current;
    if (c3RightRef.current) c3RightRef.current.position.x = currentC3Slide.current;
    c3Materials.current.forEach((mat) => { mat.opacity = currentC3Op.current; });
  });

  return (
    <group name="enterprise-server-racks-clusters">
      {/* CLUSTER 1: ARRIVAL BAY (Z = +12 to -5.5) */}
      <group name="cluster-01-arrival">
        <group ref={c1LeftRef}>
          <ClusterWing transforms={c1Data.left} materialsRef={c1Materials} drawLeds={drawLeds} />
        </group>
        <group ref={c1RightRef}>
          <ClusterWing transforms={c1Data.right} materialsRef={c1Materials} drawLeds={drawLeds} />
        </group>
      </group>

      {/* CLUSTER 2: INTELLIGENCE CORE BAY (Z = -6.5 to -25.5) */}
      <group name="cluster-02-core">
        <group ref={c2LeftRef}>
          <ClusterWing transforms={c2Data.left} materialsRef={c2Materials} drawLeds={drawLeds} />
        </group>
        <group ref={c2RightRef}>
          <ClusterWing transforms={c2Data.right} materialsRef={c2Materials} drawLeds={drawLeds} />
        </group>
      </group>

      {/* CLUSTER 3: PROJECTION CHAMBER BAY (Z = -26.5 to -56.0) */}
      <group name="cluster-03-chamber">
        <group ref={c3LeftRef}>
          <ClusterWing transforms={c3Data.left} materialsRef={c3Materials} drawLeds={drawLeds} />
        </group>
        <group ref={c3RightRef}>
          <ClusterWing transforms={c3Data.right} materialsRef={c3Materials} drawLeds={drawLeds} />
        </group>
      </group>
    </group>
  );
}
