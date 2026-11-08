'use client';

import React, { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getZoneTransitionState } from '@/utils/zoneTransition';

/**
 * Generates hardware instance transform matrices for a specific Z span.
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
      chassis: [],
      drives: [],
      latches: [],
      gpus: [],
      fans: [],
      tors: [],
      greenLeds: [],
      cyanLeds: [],
      amberLeds: [],
      redLeds: [],
    },
    right: {
      frames: [],
      canopies: [],
      rails: [],
      chassis: [],
      drives: [],
      latches: [],
      gpus: [],
      fans: [],
      tors: [],
      greenLeds: [],
      cyanLeds: [],
      amberLeds: [],
      redLeds: [],
    },
  };

  let rackIndex = 0;

  for (let z = zStart; z >= zEnd; z -= rackSpacing) {
    const inOpening = reservedOpenings.some((oz) => Math.abs(z - oz) < 2.6);
    if (inOpening) continue;

    sides.forEach(({ side, centerX, dir }) => {
      rackIndex++;
      const target = result[side];
      const rackType = rackIndex % 3;

      // 1. Outer Cabinet Frame
      dummy.position.set(centerX - dir * 0.05, rackHeightY / 2 + 0.04, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(rackDepthX, rackHeightY, rackWidthZ);
      dummy.updateMatrix();
      target.frames.push(dummy.matrix.clone());

      // 2. Top Canopy Trim
      dummy.position.set(centerX, rackHeightY + 0.03, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(rackDepthX + 0.04, 0.06, rackWidthZ + 0.04);
      dummy.updateMatrix();
      target.canopies.push(dummy.matrix.clone());

      // 3. EIA 19" Mounting Rails
      const railZOffsets = [-rackWidthZ * 0.40, rackWidthZ * 0.40];
      railZOffsets.forEach((rz) => {
        dummy.position.set(centerX + dir * 0.42, rackHeightY / 2 + 0.04, z + rz);
        dummy.scale.set(0.04, rackHeightY - 0.08, 0.04);
        dummy.updateMatrix();
        target.rails.push(dummy.matrix.clone());
      });

      // 4. Server Chassis Units (42U Stack)
      const frontFaceX = centerX + dir * 0.43;

      if (rackType === 0) {
        // High-Density Blade Compute (2U Chassis)
        for (let u = 0; u < 10; u++) {
          const uPosY = 0.22 + u * 0.21;

          dummy.position.set(frontFaceX - dir * 0.40, uPosY, z);
          dummy.scale.set(0.82, 0.17, rackWidthZ * 0.82);
          dummy.updateMatrix();
          target.chassis.push(dummy.matrix.clone());

          // NVMe Drive Caddies
          for (let d = 0; d < 4; d++) {
            const driveZ = z - rackWidthZ * 0.28 + d * (rackWidthZ * 0.18);

            dummy.position.set(frontFaceX, uPosY, driveZ);
            dummy.scale.set(0.03, 0.12, 0.13);
            dummy.updateMatrix();
            target.drives.push(dummy.matrix.clone());

            // Latch
            dummy.position.set(frontFaceX + dir * 0.015, uPosY - 0.03, driveZ);
            dummy.scale.set(0.01, 0.03, 0.09);
            dummy.updateMatrix();
            target.latches.push(dummy.matrix.clone());

            // Activity LED
            const ledRand = ((rackIndex * 17 + u * 7 + d * 3) % 100) / 100;
            const targetLed = ledRand < 0.65 ? target.greenLeds : target.cyanLeds;
            dummy.position.set(frontFaceX + dir * 0.018, uPosY + 0.035, driveZ);
            dummy.scale.set(0.008, 0.008, 0.008);
            dummy.updateMatrix();
            targetLed.push(dummy.matrix.clone());
          }
        }
      } else if (rackType === 1) {
        // GPU AI Accelerator Pods (4U Chassis)
        for (let g = 0; g < 5; g++) {
          const gPosY = 0.30 + g * 0.42;

          dummy.position.set(frontFaceX - dir * 0.42, gPosY, z);
          dummy.scale.set(0.84, 0.36, rackWidthZ * 0.84);
          dummy.updateMatrix();
          target.gpus.push(dummy.matrix.clone());

          // Dual intake fan shrouds
          [-0.18, 0.18].forEach((fz, fanIdx) => {
            dummy.position.set(frontFaceX + dir * 0.01, gPosY, z + fz);
            dummy.rotation.set(0, 0, Math.PI / 2);
            dummy.scale.set(0.12, 0.03, 0.12);
            dummy.updateMatrix();
            target.fans.push(dummy.matrix.clone());

            // Cyan ring indicator
            dummy.position.set(frontFaceX + dir * 0.015, gPosY + 0.13, z + fz);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(0.01, 0.01, 0.01);
            dummy.updateMatrix();
            target.cyanLeds.push(dummy.matrix.clone());
          });

          // Telemetry warning/normal LED
          const isWarning = (rackIndex + g) % 7 === 0;
          const targetLed = isWarning ? target.amberLeds : target.greenLeds;
          dummy.position.set(frontFaceX + dir * 0.015, gPosY - 0.13, z);
          dummy.scale.set(0.01, 0.01, 0.01);
          dummy.updateMatrix();
          targetLed.push(dummy.matrix.clone());
        }
      } else {
        // Storage & Top-of-Rack Fiber Switch
        // ToR 48-port switch at top
        dummy.position.set(frontFaceX - dir * 0.38, 2.25, z);
        dummy.scale.set(0.78, 0.08, rackWidthZ * 0.82);
        dummy.updateMatrix();
        target.tors.push(dummy.matrix.clone());

        // Dense Switch optical port LEDs
        for (let port = 0; port < 8; port++) {
          const portZ = z - rackWidthZ * 0.32 + port * (rackWidthZ * 0.09);
          const portLed = port % 5 === 0 ? target.amberLeds : target.cyanLeds;
          dummy.position.set(frontFaceX + dir * 0.01, 2.25, portZ);
          dummy.scale.set(0.007, 0.007, 0.007);
          dummy.updateMatrix();
          portLed.push(dummy.matrix.clone());
        }

        // Storage Drawers below ToR
        for (let s = 0; s < 7; s++) {
          const sPosY = 0.26 + s * 0.26;
          dummy.position.set(frontFaceX - dir * 0.38, sPosY, z);
          dummy.scale.set(0.80, 0.22, rackWidthZ * 0.82);
          dummy.updateMatrix();
          target.chassis.push(dummy.matrix.clone());

          // Handle
          dummy.position.set(frontFaceX + dir * 0.015, sPosY, z);
          dummy.scale.set(0.01, 0.04, rackWidthZ * 0.45);
          dummy.updateMatrix();
          target.latches.push(dummy.matrix.clone());

          // Status LED
          dummy.position.set(frontFaceX + dir * 0.015, sPosY + 0.07, z + rackWidthZ * 0.32);
          dummy.scale.set(0.008, 0.008, 0.008);
          dummy.updateMatrix();
          target.greenLeds.push(dummy.matrix.clone());
        }
      }
    });
  }

  dummy.rotation.set(0, 0, 0);
  return result;
}

/**
 * Individual Cluster Wing Component
 * Renders instanced meshes for one side of an aisle cluster.
 */
function ClusterWing({ transforms, opacity }) {
  const fRef = useRef();
  const cRef = useRef();
  const rRef = useRef();
  const sRef = useRef();
  const dRef = useRef();
  const lRef = useRef();
  const gRef = useRef();
  const fanRef = useRef();
  const torRef = useRef();
  const grnRef = useRef();
  const cynRef = useRef();
  const ambRef = useRef();
  const redRef = useRef();

  useEffect(() => {
    if (fRef.current) transforms.frames.forEach((m, i) => fRef.current.setMatrixAt(i, m));
    if (cRef.current) transforms.canopies.forEach((m, i) => cRef.current.setMatrixAt(i, m));
    if (rRef.current) transforms.rails.forEach((m, i) => rRef.current.setMatrixAt(i, m));
    if (sRef.current) transforms.chassis.forEach((m, i) => sRef.current.setMatrixAt(i, m));
    if (dRef.current) transforms.drives.forEach((m, i) => dRef.current.setMatrixAt(i, m));
    if (lRef.current) transforms.latches.forEach((m, i) => lRef.current.setMatrixAt(i, m));
    if (gRef.current) transforms.gpus.forEach((m, i) => gRef.current.setMatrixAt(i, m));
    if (fanRef.current) transforms.fans.forEach((m, i) => fanRef.current.setMatrixAt(i, m));
    if (torRef.current) transforms.tors.forEach((m, i) => torRef.current.setMatrixAt(i, m));
    if (grnRef.current) transforms.greenLeds.forEach((m, i) => grnRef.current.setMatrixAt(i, m));
    if (cynRef.current) transforms.cyanLeds.forEach((m, i) => cynRef.current.setMatrixAt(i, m));
    if (ambRef.current) transforms.amberLeds.forEach((m, i) => ambRef.current.setMatrixAt(i, m));
    if (redRef.current) transforms.redLeds.forEach((m, i) => redRef.current.setMatrixAt(i, m));

    [fRef, cRef, rRef, sRef, dRef, lRef, gRef, fanRef, torRef, grnRef, cynRef, ambRef, redRef].forEach((ref) => {
      if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
    });
  }, [transforms]);

  return (
    <group>
      {transforms.frames.length > 0 && (
        <instancedMesh ref={fRef} args={[null, null, transforms.frames.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#161C1D" roughness={0.65} metalness={0.4} transparent opacity={opacity} />
        </instancedMesh>
      )}
      {transforms.canopies.length > 0 && (
        <instancedMesh ref={cRef} args={[null, null, transforms.canopies.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#1E2527" roughness={0.5} metalness={0.6} transparent opacity={opacity} />
        </instancedMesh>
      )}
      {transforms.rails.length > 0 && (
        <instancedMesh ref={rRef} args={[null, null, transforms.rails.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#6B787A" roughness={0.3} metalness={0.85} transparent opacity={opacity} />
        </instancedMesh>
      )}
      {transforms.chassis.length > 0 && (
        <instancedMesh ref={sRef} args={[null, null, transforms.chassis.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#1A2022" roughness={0.6} metalness={0.5} transparent opacity={opacity} />
        </instancedMesh>
      )}
      {transforms.drives.length > 0 && (
        <instancedMesh ref={dRef} args={[null, null, transforms.drives.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#2B3638" roughness={0.5} metalness={0.6} transparent opacity={opacity} />
        </instancedMesh>
      )}
      {transforms.latches.length > 0 && (
        <instancedMesh ref={lRef} args={[null, null, transforms.latches.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#8E9D9F" roughness={0.25} metalness={0.9} transparent opacity={opacity} />
        </instancedMesh>
      )}
      {transforms.gpus.length > 0 && (
        <instancedMesh ref={gRef} args={[null, null, transforms.gpus.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#263032" roughness={0.38} metalness={0.75} transparent opacity={opacity} />
        </instancedMesh>
      )}
      {transforms.fans.length > 0 && (
        <instancedMesh ref={fanRef} args={[null, null, transforms.fans.length]}>
          <cylinderGeometry args={[1, 1, 1, 16]} />
          <meshStandardMaterial color="#384548" roughness={0.3} metalness={0.8} transparent opacity={opacity} />
        </instancedMesh>
      )}
      {transforms.tors.length > 0 && (
        <instancedMesh ref={torRef} args={[null, null, transforms.tors.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#323E40" roughness={0.35} metalness={0.8} transparent opacity={opacity} />
        </instancedMesh>
      )}
      {transforms.greenLeds.length > 0 && (
        <instancedMesh ref={grnRef} args={[null, null, transforms.greenLeds.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#22C55E" transparent opacity={opacity * 0.9} />
        </instancedMesh>
      )}
      {transforms.cyanLeds.length > 0 && (
        <instancedMesh ref={cynRef} args={[null, null, transforms.cyanLeds.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={opacity * 0.9} />
        </instancedMesh>
      )}
      {transforms.amberLeds.length > 0 && (
        <instancedMesh ref={ambRef} args={[null, null, transforms.amberLeds.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={opacity * 0.9} />
        </instancedMesh>
      )}
      {transforms.redLeds.length > 0 && (
        <instancedMesh ref={redRef} args={[null, null, transforms.redLeds.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#EF4444" transparent opacity={opacity * 0.9} />
        </instancedMesh>
      )}
    </group>
  );
}

/**
 * EnterpriseServerRacks (Cluster Transition Engine)
 * Renders 3 discrete rack cluster cohorts along the data centre cold aisle:
 * - Cluster 1 (Arrival Bay): Z >= -5.5
 * - Cluster 2 (Intelligence Core Bay): -25.5 <= Z < -5.5
 * - Cluster 3 (Projection Chamber Bay): Z < -25.5
 *
 * Transitions:
 * - Outgoing cluster smoothly parts laterally (±0.44m) and dims.
 * - Incoming cluster smoothly glides into docked alignment (0.0m) and illuminates.
 * - Automatically respects prefers-reduced-motion (only opacity/lighting transitions).
 */
export default function EnterpriseServerRacks({
  scrollProgress = 0,
  scrollProgressRef,
}) {
  const isReducedMotion = useRef(false);

  useEffect(() => {
    isReducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Compute instance matrices for 3 discrete cluster cohorts
  const c1Data = useMemo(() => generateClusterHardware(12, -5.5), []);
  const c2Data = useMemo(() => generateClusterHardware(-6.5, -25.5), []);
  const c3Data = useMemo(() => generateClusterHardware(-26.5, -56.0), []);

  // Cluster Wing Refs
  const c1LeftRef = useRef();
  const c1RightRef = useRef();
  const c2LeftRef = useRef();
  const c2RightRef = useRef();
  const c3LeftRef = useRef();
  const c3RightRef = useRef();

  // Smooth lerp tracking values
  const currentC1Slide = useRef(0);
  const currentC2Slide = useRef(0.44);
  const currentC3Slide = useRef(0.44);

  const [c1Opacity, setC1Opacity] = useState(1.0);
  const [c2Opacity, setC2Opacity] = useState(0.2);
  const [c3Opacity, setC3Opacity] = useState(0.2);

  useFrame((_, delta) => {
    const rawP = scrollProgressRef?.current !== undefined ? scrollProgressRef.current : scrollProgress;
    const { clusters } = getZoneTransitionState(rawP, isReducedMotion.current);

    const lerpFactor = Math.min(1, delta * 9);

    // 1. Cluster 1 Lateral Slide
    currentC1Slide.current += (clusters.c1.slide - currentC1Slide.current) * lerpFactor;
    if (c1LeftRef.current) c1LeftRef.current.position.x = -currentC1Slide.current;
    if (c1RightRef.current) c1RightRef.current.position.x = currentC1Slide.current;

    // 2. Cluster 2 Lateral Slide
    currentC2Slide.current += (clusters.c2.slide - currentC2Slide.current) * lerpFactor;
    if (c2LeftRef.current) c2LeftRef.current.position.x = -currentC2Slide.current;
    if (c2RightRef.current) c2RightRef.current.position.x = currentC2Slide.current;

    // 3. Cluster 3 Lateral Slide
    currentC3Slide.current += (clusters.c3.slide - currentC3Slide.current) * lerpFactor;
    if (c3LeftRef.current) c3LeftRef.current.position.x = -currentC3Slide.current;
    if (c3RightRef.current) c3RightRef.current.position.x = currentC3Slide.current;

    // Throttle opacity state updates to avoid React render thrashing
    const targetC1Op = Math.round(clusters.c1.opacity * 20) / 20;
    const targetC2Op = Math.round(clusters.c2.opacity * 20) / 20;
    const targetC3Op = Math.round(clusters.c3.opacity * 20) / 20;

    if (Math.abs(targetC1Op - c1Opacity) > 0.04) setC1Opacity(targetC1Op);
    if (Math.abs(targetC2Op - c2Opacity) > 0.04) setC2Opacity(targetC2Op);
    if (Math.abs(targetC3Op - c3Opacity) > 0.04) setC3Opacity(targetC3Op);
  });

  return (
    <group name="enterprise-server-racks-clusters">
      {/* ============================================================== */}
      {/* CLUSTER 1: ARRIVAL BAY (Z = +12 to -5.5)                       */}
      {/* ============================================================== */}
      <group name="cluster-01-arrival">
        <group ref={c1LeftRef}>
          <ClusterWing transforms={c1Data.left} opacity={c1Opacity} />
        </group>
        <group ref={c1RightRef}>
          <ClusterWing transforms={c1Data.right} opacity={c1Opacity} />
        </group>
      </group>

      {/* ============================================================== */}
      {/* CLUSTER 2: INTELLIGENCE CORE BAY (Z = -6.5 to -25.5)           */}
      {/* ============================================================== */}
      <group name="cluster-02-core">
        <group ref={c2LeftRef}>
          <ClusterWing transforms={c2Data.left} opacity={c2Opacity} />
        </group>
        <group ref={c2RightRef}>
          <ClusterWing transforms={c2Data.right} opacity={c2Opacity} />
        </group>
      </group>

      {/* ============================================================== */}
      {/* CLUSTER 3: PROJECTION CHAMBER BAY (Z = -26.5 to -56.0)         */}
      {/* ============================================================== */}
      <group name="cluster-03-chamber">
        <group ref={c3LeftRef}>
          <ClusterWing transforms={c3Data.left} opacity={c3Opacity} />
        </group>
        <group ref={c3RightRef}>
          <ClusterWing transforms={c3Data.right} opacity={c3Opacity} />
        </group>
      </group>
    </group>
  );
}
