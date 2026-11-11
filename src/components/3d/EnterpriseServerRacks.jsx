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
      neonFrames: [],
      matrixCyanLeds: [],
      matrixBlueLeds: [],
      matrixWhiteLeds: [],
      hexagons: [],
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
      neonFrames: [],
      matrixCyanLeds: [],
      matrixBlueLeds: [],
      matrixWhiteLeds: [],
      hexagons: [],
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

      // 4. Server Chassis Blocks (Stacked Compute Bays) & Aisle Face Plane
      // The rack enclosure front edge facing the center corridor aisle:
      const aisleFaceX = (centerX - dir * 0.05) + dir * (rackDepthX / 2);
      const frontFaceX = aisleFaceX + dir * 0.025; // 2.5cm out in front of the cabinet facing corridor

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

      // 5. Synapse Reference: Vertical Luminous Neon Rack Frames (Solid glowing boundary pillars & trim)
      // Left upright neon pillar
      dummy.position.set(frontFaceX + dir * 0.02, rackHeightY / 2 + 0.04, z + rackWidthZ * 0.48);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.024, rackHeightY, 0.024);
      dummy.updateMatrix();
      target.neonFrames.push(dummy.matrix.clone());

      // Right upright neon pillar
      dummy.position.set(frontFaceX + dir * 0.02, rackHeightY / 2 + 0.04, z - rackWidthZ * 0.48);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.024, rackHeightY, 0.024);
      dummy.updateMatrix();
      target.neonFrames.push(dummy.matrix.clone());

      // Top horizontal neon beam
      dummy.position.set(frontFaceX + dir * 0.02, rackHeightY + 0.03, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.022, 0.022, rackWidthZ);
      dummy.updateMatrix();
      target.neonFrames.push(dummy.matrix.clone());

      // Bottom horizontal neon beam
      dummy.position.set(frontFaceX + dir * 0.02, 0.05, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.022, 0.022, rackWidthZ);
      dummy.updateMatrix();
      target.neonFrames.push(dummy.matrix.clone());

      // 6. Synapse Reference: Dense Dot-Matrix Micro-LED Grid (High-Tech Compute Pattern)
      for (let r = 0; r < 9; r++) {
        const rowY = 0.36 + r * 0.22;
        for (let c = 0; c < 5; c++) {
          const colZ = z - rackWidthZ * 0.32 + c * (rackWidthZ * 0.16);
          dummy.position.set(frontFaceX + dir * 0.025, rowY, colZ);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(0.02, 0.042, 0.056);
          dummy.updateMatrix();
          const seed = (rackIndex * 13 + r * 7 + c);
          if (seed % 3 === 0) {
            target.matrixCyanLeds.push(dummy.matrix.clone());
          } else if (seed % 3 === 1) {
            target.matrixBlueLeds.push(dummy.matrix.clone());
          } else {
            target.matrixWhiteLeds.push(dummy.matrix.clone());
          }
        }
      }

      // 7. Synapse Reference: Floating Hexagonal Holographic Wireframe Brackets
      if (rackIndex % 2 === 1) {
        dummy.position.set(frontFaceX + dir * 0.035, rackHeightY * 0.52, z);
        dummy.rotation.set(0, dir === 1 ? Math.PI / 2 : -Math.PI / 2, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        target.hexagons.push(dummy.matrix.clone());
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
  const neonRef = useRef();
  const matCynRef = useRef();
  const matBluRef = useRef();
  const matWhiRef = useRef();
  const hexRef = useRef();
  const hexInnerRef = useRef();

  useEffect(() => {
    if (fRef.current) transforms.frames.forEach((m, i) => fRef.current.setMatrixAt(i, m));
    if (cRef.current) transforms.canopies.forEach((m, i) => cRef.current.setMatrixAt(i, m));
    if (rRef.current) transforms.rails.forEach((m, i) => rRef.current.setMatrixAt(i, m));
    if (scRef.current) transforms.computeChassis.forEach((m, i) => scRef.current.setMatrixAt(i, m));
    if (gcRef.current) transforms.gpuChassis.forEach((m, i) => gcRef.current.setMatrixAt(i, m));
    if (drawLeds && grnRef.current) transforms.greenLeds.forEach((m, i) => grnRef.current.setMatrixAt(i, m));
    if (drawLeds && cynRef.current) transforms.cyanLeds.forEach((m, i) => cynRef.current.setMatrixAt(i, m));
    if (drawLeds && ambRef.current) transforms.amberLeds.forEach((m, i) => ambRef.current.setMatrixAt(i, m));

    if (neonRef.current && transforms.neonFrames) transforms.neonFrames.forEach((m, i) => neonRef.current.setMatrixAt(i, m));
    if (matCynRef.current && transforms.matrixCyanLeds) transforms.matrixCyanLeds.forEach((m, i) => matCynRef.current.setMatrixAt(i, m));
    if (matBluRef.current && transforms.matrixBlueLeds) transforms.matrixBlueLeds.forEach((m, i) => matBluRef.current.setMatrixAt(i, m));
    if (matWhiRef.current && transforms.matrixWhiteLeds) transforms.matrixWhiteLeds.forEach((m, i) => matWhiRef.current.setMatrixAt(i, m));
    if (hexRef.current && transforms.hexagons) transforms.hexagons.forEach((m, i) => hexRef.current.setMatrixAt(i, m));
    if (hexInnerRef.current && transforms.hexagons) transforms.hexagons.forEach((m, i) => hexInnerRef.current.setMatrixAt(i, m));

    [fRef, cRef, rRef, scRef, gcRef, grnRef, cynRef, ambRef, neonRef, matCynRef, matBluRef, matWhiRef, hexRef, hexInnerRef].forEach((ref) => {
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
            color="#E2E8F0"
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
            opacity={0.95}
          />
        </instancedMesh>
      )}
      {drawLeds && transforms.amberLeds.length > 0 && (
        <instancedMesh ref={ambRef} args={[null, null, transforms.amberLeds.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#94A3B8"
            transparent
            opacity={0.80}
          />
        </instancedMesh>
      )}

      {/* Monochrome Data Centre: Solid Luminous White Rack Boundary Frames & Uprights */}
      {transforms.neonFrames && transforms.neonFrames.length > 0 && (
        <instancedMesh ref={neonRef} args={[null, null, transforms.neonFrames.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#FFFFFF"
            toneMapped={false}
          />
        </instancedMesh>
      )}

      {/* Monochrome Data Centre: Dense Dot-Matrix Micro-LED Activity Grids (White, Slate & Cool Grey) */}
      {drawLeds && transforms.matrixCyanLeds && transforms.matrixCyanLeds.length > 0 && (
        <instancedMesh ref={matCynRef} args={[null, null, transforms.matrixCyanLeds.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#FFFFFF"
            toneMapped={false}
          />
        </instancedMesh>
      )}
      {drawLeds && transforms.matrixBlueLeds && transforms.matrixBlueLeds.length > 0 && (
        <instancedMesh ref={matBluRef} args={[null, null, transforms.matrixBlueLeds.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#94A3B8"
            toneMapped={false}
          />
        </instancedMesh>
      )}
      {drawLeds && transforms.matrixWhiteLeds && transforms.matrixWhiteLeds.length > 0 && (
        <instancedMesh ref={matWhiRef} args={[null, null, transforms.matrixWhiteLeds.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
            color="#CBD5E1"
            toneMapped={false}
          />
        </instancedMesh>
      )}

      {/* Monochrome Data Centre: Floating Hexagonal Holographic Wireframe Brackets (Dual Ring in Silver-White) */}
      {transforms.hexagons && transforms.hexagons.length > 0 && (
        <group>
          {/* Outer Ring */}
          <instancedMesh ref={hexRef} args={[null, null, transforms.hexagons.length]}>
            <ringGeometry args={[0.22, 0.25, 6]} />
            <meshBasicMaterial
              ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
              color="#FFFFFF"
              transparent
              opacity={0.82}
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </instancedMesh>
          {/* Inner Ring */}
          <instancedMesh ref={hexInnerRef} args={[null, null, transforms.hexagons.length]}>
            <ringGeometry args={[0.09, 0.11, 6]} />
            <meshBasicMaterial
              ref={(mat) => { if (mat && !materialsRef.current.includes(mat)) materialsRef.current.push(mat); }}
              color="#94A3B8"
              transparent
              opacity={0.65}
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </instancedMesh>
        </group>
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
  const drawLeds = true;

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

    const op1 = currentC1Op.current;
    const vis1 = op1 > 0.02;
    if (c1LeftRef.current) {
      c1LeftRef.current.position.x = -currentC1Slide.current;
      c1LeftRef.current.visible = vis1;
    }
    if (c1RightRef.current) {
      c1RightRef.current.position.x = currentC1Slide.current;
      c1RightRef.current.visible = vis1;
    }
    if (vis1) {
      const trans1 = op1 < 0.98;
      c1Materials.current.forEach((mat) => {
        mat.opacity = op1;
        if (mat.transparent !== trans1) mat.transparent = trans1;
      });
    }

    // 2. Cluster 2 Lateral Slide & Opacity
    currentC2Slide.current += (clusters.c2.slide - currentC2Slide.current) * lerpFactor;
    currentC2Op.current += (clusters.c2.opacity - currentC2Op.current) * lerpFactor;

    const op2 = currentC2Op.current;
    const vis2 = op2 > 0.02;
    if (c2LeftRef.current) {
      c2LeftRef.current.position.x = -currentC2Slide.current;
      c2LeftRef.current.visible = vis2;
    }
    if (c2RightRef.current) {
      c2RightRef.current.position.x = currentC2Slide.current;
      c2RightRef.current.visible = vis2;
    }
    if (vis2) {
      const trans2 = op2 < 0.98;
      c2Materials.current.forEach((mat) => {
        mat.opacity = op2;
        if (mat.transparent !== trans2) mat.transparent = trans2;
      });
    }

    // 3. Cluster 3 Lateral Slide & Opacity
    currentC3Slide.current += (clusters.c3.slide - currentC3Slide.current) * lerpFactor;
    currentC3Op.current += (clusters.c3.opacity - currentC3Op.current) * lerpFactor;

    const op3 = currentC3Op.current;
    const vis3 = op3 > 0.02;
    if (c3LeftRef.current) {
      c3LeftRef.current.position.x = -currentC3Slide.current;
      c3LeftRef.current.visible = vis3;
    }
    if (c3RightRef.current) {
      c3RightRef.current.position.x = currentC3Slide.current;
      c3RightRef.current.visible = vis3;
    }
    if (vis3) {
      const trans3 = op3 < 0.98;
      c3Materials.current.forEach((mat) => {
        mat.opacity = op3;
        if (mat.transparent !== trans3) mat.transparent = trans3;
      });
    }
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
