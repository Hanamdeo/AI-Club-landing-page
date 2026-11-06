'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * EnterpriseServerRacks (Refinement V3)
 * High-Fidelity Enterprise Autonomous AI Infrastructure:
 * - Geometrically accurate 42U modular rack enclosures with open front chassis
 * - Structural EIA 19" vertical mounting rails in brushed metallic gunmetal
 * - 3 distinct, highly detailed server configurations:
 *     1. Config 0: High-Density 2U Blade Compute (NVMe caddies, pull handles, horizontal louvers)
 *     2. Config 1: 4U Heavy GPU AI Accelerator Pods (hex grills, rotating dual intake fans on X axis, status rings)
 *     3. Config 2: Top-of-Rack (ToR) 48-port optical switch with dense storage drawers
 * - Visible material contrast & texture variation (dark titanium frames, brushed faceplates, metallic latches)
 * - Sharp asynchronous blinking LEDs (Cyan, Green, Amber, Red)
 * - Primary cold aisle racks + secondary background rows for massive spatial depth
 */
export default function EnterpriseServerRacks() {
  const rackFramesRef = useRef();
  const rackCanopiesRef = useRef();
  const rackRailsRef = useRef();
  const serverChassisRef = useRef();
  const driveCaddiesRef = useRef();
  const caddyLatchesRef = useRef();
  const gpuNodesRef = useRef();
  const fanShroudsRef = useRef();
  const fanBladesRef = useRef();
  const torSwitchesRef = useRef();
  const greenLedsRef = useRef();
  const cyanLedsRef = useRef();
  const amberLedsRef = useRef();
  const redLedsRef = useRef();

  // Compute all hardware transforms
  const {
    frameTransforms,
    canopyTransforms,
    railTransforms,
    chassisTransforms,
    driveTransforms,
    latchTransforms,
    gpuTransforms,
    fanShroudTransforms,
    fanBladeTransforms,
    torTransforms,
    greenLedTransforms,
    cyanLedTransforms,
    amberLedTransforms,
    redLedTransforms,
  } = useMemo(() => {
    const fMats = [];
    const cMats = [];
    const rMats = [];
    const sMats = [];
    const dMats = [];
    const lMats = [];
    const gMats = [];
    const fsMats = [];
    const fbMats = [];
    const torMats = [];
    const grnLeds = [];
    const cynLeds = [];
    const ambLeds = [];
    const redLeds = [];

    const dummy = new THREE.Object3D();

    // Rack Physical Dimensions
    const rackWidthZ = 0.86;   // Width along aisle (Z axis)
    const rackDepthX = 1.10;   // Depth perpendicular to aisle (X axis)
    const rackHeightY = 2.42;  // Height (Y axis)
    const rackSpacing = 0.98;  // Spacing between rack centers along Z

    // Openings for zone transition landmarks:
    // Section 2 Foundation Bay at Z = -15, Section 3 Chamber at Z = -35
    const reservedOpenings = [-15, -35];

    // Left and Right primary rows along the cold aisle
    // Left: X center = -2.60 (front face at X = -2.05, normal points +X)
    // Right: X center = 2.60 (front face at X = 2.05, normal points -X)
    const aisleSides = [
      { side: 'left', centerX: -2.60, frontX: -2.05, dir: 1 },
      { side: 'right', centerX: 2.60, frontX: 2.05, dir: -1 },
    ];

    let rackIndex = 0;

    for (let z = 12; z >= -56; z -= rackSpacing) {
      const inOpening = reservedOpenings.some((oz) => Math.abs(z - oz) < 2.6);

      aisleSides.forEach(({ side, centerX, frontX, dir }) => {
        if (inOpening) return;

        rackIndex++;
        const rackType = rackIndex % 3; // 0: Blade Compute, 1: GPU Accelerator, 2: Storage & ToR Switch

        // 1. RACK ENCLOSURE STRUCTURE
        // 1.1 Outer Cabinet Shell (Dark industrial steel side panels and back)
        dummy.position.set(centerX - dir * 0.05, rackHeightY / 2 + 0.04, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(rackDepthX, rackHeightY, rackWidthZ);
        dummy.updateMatrix();
        fMats.push(dummy.matrix.clone());

        // 1.2 Top Canopy & Bottom Plinth Trim
        dummy.position.set(centerX, rackHeightY + 0.03, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(rackDepthX + 0.04, 0.06, rackWidthZ + 0.04);
        dummy.updateMatrix();
        cMats.push(dummy.matrix.clone());

        // Bottom plinth
        dummy.position.set(centerX, 0.04, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(rackDepthX + 0.02, 0.08, rackWidthZ + 0.02);
        dummy.updateMatrix();
        cMats.push(dummy.matrix.clone());

        // 1.3 Front EIA 19" Vertical Mounting Rails (Left & Right posts of cabinet)
        [-rackWidthZ / 2 + 0.04, rackWidthZ / 2 - 0.04].forEach((postZ) => {
          dummy.position.set(frontX, rackHeightY / 2 + 0.04, z + postZ);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(0.04, rackHeightY - 0.06, 0.04);
          dummy.updateMatrix();
          rMats.push(dummy.matrix.clone());
        });

        // 1.4 Top Header Status Fascia Placard
        dummy.position.set(frontX + dir * 0.015, rackHeightY - 0.06, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(0.02, 0.08, rackWidthZ - 0.08);
        dummy.updateMatrix();
        rMats.push(dummy.matrix.clone());

        // Header Status LED
        dummy.position.set(frontX + dir * 0.03, rackHeightY - 0.06, z + (dir * 0.3));
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(0.016, 0.016, 0.016);
        dummy.updateMatrix();
        grnLeds.push(dummy.matrix.clone());

        // ============================================================
        // 2. MODULAR SERVER HARDWARE CONFIGURATIONS
        // ============================================================
        if (rackType === 0) {
          // ------------------------------------------------------------
          // CONFIG 0: HIGH-DENSITY 2U BLADE COMPUTE CHASSIS (8 BLADES)
          // ------------------------------------------------------------
          for (let u = 0; u < 8; u++) {
            const bladeY = 0.24 + u * 0.25;

            // 2U Blade Chassis Front Faceplate
            dummy.position.set(frontX + dir * 0.01, bladeY, z);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(0.035, 0.22, rackWidthZ - 0.10);
            dummy.updateMatrix();
            sMats.push(dummy.matrix.clone());

            // 6 Hot-Swap 2.5" NVMe Drive Caddies per blade
            for (let d = 0; d < 6; d++) {
              const driveZ = z - 0.30 + d * 0.12;

              // Drive sled body
              dummy.position.set(frontX + dir * 0.025, bladeY, driveZ);
              dummy.rotation.set(0, 0, 0);
              dummy.scale.set(0.02, 0.16, 0.095);
              dummy.updateMatrix();
              dMats.push(dummy.matrix.clone());

              // Anodized Silver Ejector Latch Handle
              dummy.position.set(frontX + dir * 0.036, bladeY - 0.04, driveZ);
              dummy.rotation.set(0, 0, 0);
              dummy.scale.set(0.01, 0.03, 0.075);
              dummy.updateMatrix();
              lMats.push(dummy.matrix.clone());

              // Drive Activity LED
              dummy.position.set(frontX + dir * 0.038, bladeY + 0.05, driveZ);
              dummy.rotation.set(0, 0, 0);
              dummy.scale.set(0.012, 0.012, 0.012);
              dummy.updateMatrix();
              if ((u + d) % 3 === 0) {
                cynLeds.push(dummy.matrix.clone());
              } else {
                grnLeds.push(dummy.matrix.clone());
              }
            }

            // Blade Power / Diagnostic LED on far right
            dummy.position.set(frontX + dir * 0.038, bladeY, z + 0.36);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(0.014, 0.014, 0.014);
            dummy.updateMatrix();
            if (u === 3 && rackIndex % 4 === 0) {
              ambLeds.push(dummy.matrix.clone()); // Diagnostic warning
            } else if (u === 6 && rackIndex % 6 === 0) {
              redLeds.push(dummy.matrix.clone()); // Rare maintenance fault
            } else {
              grnLeds.push(dummy.matrix.clone());
            }
          }
        } else if (rackType === 1) {
          // ------------------------------------------------------------
          // CONFIG 1: 4U HEAVY GPU AI ACCELERATOR PODS (4 NODES)
          // ------------------------------------------------------------
          for (let g = 0; g < 4; g++) {
            const gpuY = 0.32 + g * 0.50;

            // 4U GPU Chassis Body
            dummy.position.set(frontX + dir * 0.012, gpuY, z);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(0.045, 0.44, rackWidthZ - 0.09);
            dummy.updateMatrix();
            gMats.push(dummy.matrix.clone());

            // Dual High-CFM Rotating Intake Fans (circular, facing the aisle!)
            for (let f = 0; f < 2; f++) {
              const fanZ = z - 0.18 + f * 0.36;

              // Circular Fan Shroud Ring
              dummy.position.set(frontX + dir * 0.032, gpuY, fanZ);
              // Rotate 90 deg on Z so cylinder axis aligns with X (normal facing aisle)
              dummy.rotation.set(0, 0, Math.PI / 2);
              dummy.scale.set(0.16, 0.02, 0.16);
              dummy.updateMatrix();
              fsMats.push(dummy.matrix.clone());

              // Fan Impeller Blades (spins on X axis)
              dummy.position.set(frontX + dir * 0.035, gpuY, fanZ);
              dummy.rotation.set(0, 0, Math.PI / 2);
              dummy.scale.set(0.14, 0.015, 0.14);
              dummy.updateMatrix();
              fbMats.push(dummy.matrix.clone());

              // Fan status ring LED
              dummy.position.set(frontX + dir * 0.038, gpuY + 0.17, fanZ);
              dummy.rotation.set(0, 0, 0);
              dummy.scale.set(0.014, 0.014, 0.014);
              dummy.updateMatrix();
              cynLeds.push(dummy.matrix.clone());
            }

            // PCIe Accelerator telemetry LEDs
            dummy.position.set(frontX + dir * 0.038, gpuY - 0.16, z + 0.34);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(0.014, 0.014, 0.014);
            dummy.updateMatrix();
            grnLeds.push(dummy.matrix.clone());
          }
        } else {
          // ------------------------------------------------------------
          // CONFIG 2: TOP-OF-RACK SWITCH & HIGH-DENSITY STORAGE SAN
          // ------------------------------------------------------------
          // Top-of-Rack 48-port Optical Switch (Y = 2.18)
          dummy.position.set(frontX + dir * 0.012, 2.18, z);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(0.04, 0.12, rackWidthZ - 0.08);
          dummy.updateMatrix();
          torMats.push(dummy.matrix.clone());

          // 12 Optical Fiber SFP+ Port Link LEDs (Cyan link pulse)
          for (let p = 0; p < 8; p++) {
            dummy.position.set(frontX + dir * 0.035, 2.18, z - 0.28 + p * 0.08);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(0.012, 0.012, 0.012);
            dummy.updateMatrix();
            cynLeds.push(dummy.matrix.clone());
          }

          // Dense NVMe Storage Drawers Below (5 Large Drawers)
          for (let s = 0; s < 5; s++) {
            const storY = 0.32 + s * 0.34;

            dummy.position.set(frontX + dir * 0.012, storY, z);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(0.035, 0.30, rackWidthZ - 0.10);
            dummy.updateMatrix();
            sMats.push(dummy.matrix.clone());

            // Storage Grab Handle
            dummy.position.set(frontX + dir * 0.036, storY, z);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(0.012, 0.04, 0.32);
            dummy.updateMatrix();
            lMats.push(dummy.matrix.clone());

            // Storage Status LED
            dummy.position.set(frontX + dir * 0.038, storY + 0.10, z - 0.32);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(0.014, 0.014, 0.014);
            dummy.updateMatrix();
            grnLeds.push(dummy.matrix.clone());
          }
        }
      });
    }

    // ----------------------------------------------------------------
    // 3. SECONDARY BACKGROUND ROWS FOR EXTENSIVE SPATIAL DEPTH
    // Placed at X = -4.8 and X = 4.8 along the perimeter
    // ----------------------------------------------------------------
    for (let bz = 12; bz >= -54; bz -= 1.4) {
      [-4.8, 4.8].forEach((bx) => {
        dummy.position.set(bx, rackHeightY / 2 + 0.04, bz);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(rackDepthX, rackHeightY, rackWidthZ);
        dummy.updateMatrix();
        fMats.push(dummy.matrix.clone());

        // Top canopy for secondary racks
        dummy.position.set(bx, rackHeightY + 0.03, bz);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(rackDepthX + 0.02, 0.06, rackWidthZ + 0.02);
        dummy.updateMatrix();
        cMats.push(dummy.matrix.clone());
      });
    }

    return {
      frameTransforms: fMats,
      canopyTransforms: cMats,
      railTransforms: rMats,
      chassisTransforms: sMats,
      driveTransforms: dMats,
      latchTransforms: lMats,
      gpuTransforms: gMats,
      fanShroudTransforms: fsMats,
      fanBladeTransforms: fbMats,
      torTransforms: torMats,
      greenLedTransforms: grnLeds,
      cyanLedTransforms: cynLeds,
      amberLedTransforms: ambLeds,
      redLedTransforms: redLeds,
    };
  }, []);

  // Apply matrix buffers cleanly on mount and update
  useEffect(() => {
    const applyMatrices = (meshRef, transforms) => {
      if (meshRef.current && transforms) {
        transforms.forEach((mat, i) => {
          meshRef.current.setMatrixAt(i, mat);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
      }
    };

    applyMatrices(rackFramesRef, frameTransforms);
    applyMatrices(rackCanopiesRef, canopyTransforms);
    applyMatrices(rackRailsRef, railTransforms);
    applyMatrices(serverChassisRef, chassisTransforms);
    applyMatrices(driveCaddiesRef, driveTransforms);
    applyMatrices(caddyLatchesRef, latchTransforms);
    applyMatrices(gpuNodesRef, gpuTransforms);
    applyMatrices(fanShroudsRef, fanShroudTransforms);
    applyMatrices(fanBladesRef, fanBladeTransforms);
    applyMatrices(torSwitchesRef, torTransforms);
    applyMatrices(greenLedsRef, greenLedTransforms);
    applyMatrices(cyanLedsRef, cyanLedTransforms);
    applyMatrices(amberLedsRef, amberLedTransforms);
    applyMatrices(redLedsRef, redLedTransforms);
  }, [
    frameTransforms,
    canopyTransforms,
    railTransforms,
    chassisTransforms,
    driveTransforms,
    latchTransforms,
    gpuTransforms,
    fanShroudTransforms,
    fanBladeTransforms,
    torTransforms,
    greenLedTransforms,
    cyanLedTransforms,
    amberLedTransforms,
    redLedTransforms,
  ]);

  // Subtle GPU fan rotation & asynchronous LED activity flicker
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 1. Asynchronous packet traffic flickering
    if (cyanLedsRef.current) {
      cyanLedsRef.current.material.opacity = 0.65 + Math.sin(t * 8.5) * 0.30;
    }
    if (greenLedsRef.current) {
      greenLedsRef.current.material.opacity = 0.70 + Math.cos(t * 5.2) * 0.25;
    }
    if (amberLedsRef.current) {
      amberLedsRef.current.material.opacity = 0.75 + Math.sin(t * 2.8) * 0.20;
    }

    // 2. High-speed rotation of GPU intake fans (around local X axis)
    if (fanBladesRef.current) {
      fanBladesRef.current.rotation.x = t * 7.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. 42U Rack Outer Cabinet Enclosures (Deep Titanium Slate #22292B) */}
      <instancedMesh
        ref={rackFramesRef}
        args={[null, null, frameTransforms.length]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#22292B"
          roughness={0.55}
          metalness={0.65}
        />
      </instancedMesh>

      {/* 2. Rack Canopies & Heavy Bottom Plinths (Industrial Graphite #1C2224) */}
      <instancedMesh
        ref={rackCanopiesRef}
        args={[null, null, canopyTransforms.length]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#1C2224"
          roughness={0.5}
          metalness={0.7}
        />
      </instancedMesh>

      {/* 3. EIA 19" Vertical Corner Mounting Rails (Brushed Gunmetal #3E4B4E) */}
      <instancedMesh
        ref={rackRailsRef}
        args={[null, null, railTransforms.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#3E4B4E"
          roughness={0.35}
          metalness={0.8}
        />
      </instancedMesh>

      {/* 4. Server Blade Chassis & Storage Faceplates (Brushed Dark Slate #2A3436) */}
      <instancedMesh
        ref={serverChassisRef}
        args={[null, null, chassisTransforms.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#2A3436"
          roughness={0.4}
          metalness={0.75}
        />
      </instancedMesh>

      {/* 5. Hot-Swap NVMe Drive Caddies (Matte Charcoal #1E2527) */}
      <instancedMesh
        ref={driveCaddiesRef}
        args={[null, null, driveTransforms.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#1E2527"
          roughness={0.5}
          metalness={0.6}
        />
      </instancedMesh>

      {/* 6. Anodized Silver Ejector Latches & Drawer Handles (#8E9D9F) */}
      <instancedMesh
        ref={caddyLatchesRef}
        args={[null, null, latchTransforms.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#8E9D9F"
          roughness={0.25}
          metalness={0.9}
        />
      </instancedMesh>

      {/* 7. 4U GPU AI Accelerator Nodes (Deep Charcoal Hex Shrouds #263032) */}
      <instancedMesh
        ref={gpuNodesRef}
        args={[null, null, gpuTransforms.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#263032"
          roughness={0.38}
          metalness={0.75}
        />
      </instancedMesh>

      {/* 8. GPU Fan Shroud Bezels (#384548) */}
      <instancedMesh
        ref={fanShroudsRef}
        args={[null, null, fanShroudTransforms.length]}
      >
        <cylinderGeometry args={[1, 1, 1, 24]} />
        <meshStandardMaterial
          color="#384548"
          roughness={0.3}
          metalness={0.8}
        />
      </instancedMesh>

      {/* 9. GPU High-CFM Rotating Fan Impellers (#1A2123) */}
      <instancedMesh
        ref={fanBladesRef}
        args={[null, null, fanBladeTransforms.length]}
      >
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial
          color="#1A2123"
          roughness={0.25}
          metalness={0.85}
        />
      </instancedMesh>

      {/* 10. Top-of-Rack 48-Port Fiber Switches (#323E40) */}
      <instancedMesh
        ref={torSwitchesRef}
        args={[null, null, torTransforms.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#323E40"
          roughness={0.35}
          metalness={0.8}
        />
      </instancedMesh>

      {/* 11. Activity LEDs: Green (#22C55E) */}
      <instancedMesh
        ref={greenLedsRef}
        args={[null, null, greenLedTransforms.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#22C55E" transparent opacity={0.9} />
      </instancedMesh>

      {/* 12. Optical Link LEDs: Cyan (#00E5FF) */}
      <instancedMesh
        ref={cyanLedsRef}
        args={[null, null, cyanLedTransforms.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.9} />
      </instancedMesh>

      {/* 13. Telemetry Warning LEDs: Amber (#F59E0B) */}
      <instancedMesh
        ref={amberLedsRef}
        args={[null, null, amberLedTransforms.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.9} />
      </instancedMesh>

      {/* 14. Maintenance Fault LEDs: Red (#EF4444) */}
      <instancedMesh
        ref={redLedsRef}
        args={[null, null, redLedTransforms.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={0.9} />
      </instancedMesh>
    </group>
  );
}
