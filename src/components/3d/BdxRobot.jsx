'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { audioManager } from '@/utils/audioManager';

// Waypoints along the 3-section corridor arc:
// Progress 0.0 -> Section 1 (The Arrival: Entrance Gate)
// Progress 0.5 -> Section 2 (The Intelligence Core: Computing Infrastructure)
// Progress 1.0 -> Section 3 (The Projection Chamber: Pedestal & Hologram Emission)
const FACILITY_WAYPOINTS = [
  {
    progress: 0.0,
    pos: new THREE.Vector3(1.15, 0.74, 6.8),
    idleRotY: -0.28,
  },
  {
    progress: 0.5,
    pos: new THREE.Vector3(-0.95, 0.74, -18.5),
    idleRotY: 0.42,
  },
  {
    progress: 1.0,
    pos: new THREE.Vector3(1.1, 0.88, -34.8),
    idleRotY: -0.32,
  },
];

/**
 * BdxRobot
 * High-precision Disney / NVIDIA BDX Biped Companion Robot:
 * - Gait walking during corridor transit (Sections 1 to 2)
 * - Transitions to stationary pedestal docking at Section 3 (The Projection Chamber)
 * - Articulated Holographic Projector with volumetric sage-green light cone beam
 * - Hover / Floating mode for companion docking
 * - Gaze tracking, lifelike eye blinking, interactive chirps & jump reactions
 */
export default function BdxRobot({
  scale = 1,
  isStatic = false,
  hoverMode = false,
  scrollProgress = 0,
  isProjecting = false,
  onToggleProjector,
  animationState = 'idle', // 'intro' | 'hover' | 'walk' | 'projector' | 'info' | 'idle'
}) {
  const rootRef = useRef();
  const torsoRef = useRef();
  const neckRef = useRef();
  const headRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const projectorBeamRef = useRef();
  const projectorLensRef = useRef();

  // Physical tracking state
  const currentPos = useRef(new THREE.Vector3(1.15, 0.74, 6.8));
  const prevPos = useRef(new THREE.Vector3(1.15, 0.74, 6.8));
  const currentRotY = useRef(-0.28);
  const walkPhase = useRef(0);
  const tempTargetPos = useRef(new THREE.Vector3());

  // Interaction State
  const [hovered, setHovered] = useState(false);
  const jumpTime = useRef(0);
  const isJumping = useRef(false);

  // Gaze tracking
  const cursorRef = useRef({ x: 0, y: 0 });
  const smoothedCursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX !== undefined && clientY !== undefined) {
        const nx = (clientX / window.innerWidth) * 2 - 1;
        const ny = -(clientY / window.innerHeight) * 2 + 1;
        cursorRef.current.x = nx;
        cursorRef.current.y = ny;
      }
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  const handleClick = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      isJumping.current = true;
      jumpTime.current = 0;
      audioManager.playChirp();
      if (onToggleProjector) onToggleProjector();
    },
    [onToggleProjector]
  );

  // Blink timing
  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (hoverMode) {
      // 1. FLOATING / HOVER COMPANION MODE (Used in docked companion UI)
      const hoverFloatY = Math.sin(t * 2.2) * 0.08;
      const hoverFloatRotY = Math.sin(t * 1.2) * 0.06;

      if (rootRef.current) {
        rootRef.current.position.y = hoverFloatY;
        rootRef.current.rotation.y = hoverFloatRotY;
      }

      // Smooth leg settling in hover
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = 0.15 + Math.sin(t * 2.0) * 0.03;
        rightLegRef.current.rotation.x = 0.15 - Math.sin(t * 2.0) * 0.03;
      }
    } else if (!isStatic) {
      // 2. CORRIDOR WAYPOINT TRAVEL (Experience A)
      const p = Math.max(0, Math.min(1, scrollProgress));
      let startW = FACILITY_WAYPOINTS[0];
      let endW = FACILITY_WAYPOINTS[FACILITY_WAYPOINTS.length - 1];

      for (let i = 0; i < FACILITY_WAYPOINTS.length - 1; i++) {
        if (p >= FACILITY_WAYPOINTS[i].progress && p <= FACILITY_WAYPOINTS[i + 1].progress) {
          startW = FACILITY_WAYPOINTS[i];
          endW = FACILITY_WAYPOINTS[i + 1];
          break;
        }
      }

      const span = endW.progress - startW.progress;
      const localT = span > 0 ? (p - startW.progress) / span : 0;
      const easeT = localT * localT * (3 - 2 * localT);

      tempTargetPos.current.lerpVectors(startW.pos, endW.pos, easeT);
      const targetIdleRotY = THREE.MathUtils.lerp(startW.idleRotY, endW.idleRotY, easeT);

      currentPos.current.lerp(tempTargetPos.current, Math.min(1, delta * 4.2));

      // Calculate translation speed
      const distDelta = currentPos.current.distanceTo(prevPos.current);
      const speed = distDelta / Math.max(delta, 0.001);
      prevPos.current.copy(currentPos.current);

      const isWalking = speed > 0.16 && p < 0.95;

      let walkBob = 0;
      let walkSway = 0;

      if (isWalking) {
        walkPhase.current += delta * Math.min(18, Math.max(7, speed * 4.2));
        const stepSine = Math.sin(walkPhase.current);

        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = stepSine * 0.42;
          rightLegRef.current.rotation.x = -stepSine * 0.42;
        }

        walkBob = Math.abs(Math.sin(walkPhase.current)) * 0.04;
        walkSway = Math.sin(walkPhase.current) * 0.03;

        if (torsoRef.current) {
          torsoRef.current.rotation.x += (0.08 - torsoRef.current.rotation.x) * (delta * 6);
        }

        const forwardAngle = Math.PI - 0.25;
        currentRotY.current += (forwardAngle - currentRotY.current) * (delta * 3.5);
      } else {
        // Settling back to upright idle stance
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x += (0 - leftLegRef.current.rotation.x) * (delta * 6);
          rightLegRef.current.rotation.x += (0 - rightLegRef.current.rotation.x) * (delta * 6);
        }
        if (torsoRef.current) {
          torsoRef.current.rotation.x += (0 - torsoRef.current.rotation.x) * (delta * 6);
        }

        // At Section 03 (p > 0.9), orient towards the camera / user directly
        const targetRot = p > 0.9 ? 0.15 : targetIdleRotY;
        currentRotY.current += (targetRot - currentRotY.current) * (delta * 3.5);
      }

      // Idle sway & jump
      const idleSway = Math.sin(t * 2.2) * 0.02;
      const idleBob = Math.abs(Math.sin(t * 2.2)) * 0.03;

      let jumpOffsetY = 0;
      if (isJumping.current) {
        jumpTime.current += delta * 2.6;
        const progress = jumpTime.current;
        if (progress < 1.0) {
          jumpOffsetY = Math.sin(progress * Math.PI) * 0.24;
        } else {
          isJumping.current = false;
          jumpTime.current = 0;
        }
      }

      if (rootRef.current) {
        rootRef.current.position.set(
          currentPos.current.x + (isWalking ? walkSway : idleSway),
          currentPos.current.y + (isWalking ? walkBob : idleBob) + jumpOffsetY,
          currentPos.current.z
        );
        rootRef.current.rotation.y = currentRotY.current;
        rootRef.current.rotation.z = isWalking ? walkSway * 0.6 : -idleSway;
      }
    }

    // 3. Cursor tracking smoothing
    smoothedCursor.current.x += (cursorRef.current.x - smoothedCursor.current.x) * 0.16;
    smoothedCursor.current.y += (cursorRef.current.y - smoothedCursor.current.y) * 0.16;

    const mx = smoothedCursor.current.x;
    const my = smoothedCursor.current.y;

    // Gaze tracking
    if (neckRef.current) {
      neckRef.current.rotation.y = mx * 0.25;
      neckRef.current.rotation.x = -my * 0.12;
    }

    if (headRef.current) {
      // In projector mode, head orients slightly upwards towards the projection field
      const projectorPitchOffset = isProjecting ? -0.1 : 0;
      headRef.current.rotation.y = mx * 0.48;
      headRef.current.rotation.x = -my * 0.26 + projectorPitchOffset;
      headRef.current.rotation.z = -mx * 0.18 + Math.sin(t * 1.5) * 0.03;
    }

    // 4. White Eye Blinking
    blinkTimer.current += delta;
    if (blinkTimer.current > 3.4) {
      isBlinking.current = true;
      if (blinkTimer.current > 3.54) {
        blinkTimer.current = Math.random() * 0.7;
        isBlinking.current = false;
      }
    }

    const eyeScaleY = isBlinking.current ? 0.08 : 1.0;
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y += (eyeScaleY - leftEyeRef.current.scale.y) * 0.55;
      rightEyeRef.current.scale.y += (eyeScaleY - rightEyeRef.current.scale.y) * 0.55;
    }

    // 5. Holographic Projector Volumetric Beam Animation
    if (projectorBeamRef.current) {
      if (isProjecting) {
        projectorBeamRef.current.visible = true;
        const pulse = 0.35 + Math.sin(t * 4.0) * 0.1;
        projectorBeamRef.current.material.opacity = pulse;
        projectorBeamRef.current.rotation.z = t * 0.2;
      } else {
        projectorBeamRef.current.visible = false;
      }
    }

    if (projectorLensRef.current) {
      projectorLensRef.current.material.opacity = isProjecting ? 0.95 : 0.4;
    }
  });

  // Materials
  const orangeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: hovered ? '#FF7A38' : '#F06522',
        roughness: 0.3,
        metalness: 0.15,
      }),
    [hovered]
  );

  const whiteMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F5F5F0',
        roughness: 0.3,
        metalness: 0.1,
      }),
    []
  );

  const darkMetalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#181B1C',
        roughness: 0.35,
        metalness: 0.85,
      }),
    []
  );

  const chromePinMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#B0B7C0',
        roughness: 0.2,
        metalness: 0.9,
      }),
    []
  );

  return (
    <group
      ref={rootRef}
      scale={scale}
      dispose={null}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== 'undefined') document.body.style.cursor = 'default';
      }}
    >
      {/* ============================================================== */}
      {/* 1. BIPED FEET (CHUNKY ORANGE BOOTS WITH YELLOW SOLES)          */}
      {/* ============================================================== */}
      {/* Left Foot */}
      <group position={[-0.26, -0.62, 0]}>
        <mesh position={[0, 0.02, 0.04]} receiveShadow>
          <boxGeometry args={[0.26, 0.04, 0.44]} />
          <meshStandardMaterial color="#F59E0B" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.07, 0.04]} castShadow material={orangeMat}>
          <boxGeometry args={[0.24, 0.07, 0.4]} />
        </mesh>
        <mesh position={[0, 0.13, -0.04]} material={orangeMat}>
          <boxGeometry args={[0.16, 0.08, 0.14]} />
        </mesh>
        <mesh position={[0, 0.14, -0.04]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
          <cylinderGeometry args={[0.035, 0.035, 0.18, 16]} />
        </mesh>
      </group>

      {/* Right Foot */}
      <group position={[0.26, -0.62, 0]}>
        <mesh position={[0, 0.02, 0.04]} receiveShadow>
          <boxGeometry args={[0.26, 0.04, 0.44]} />
          <meshStandardMaterial color="#F59E0B" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.07, 0.04]} castShadow material={orangeMat}>
          <boxGeometry args={[0.24, 0.07, 0.4]} />
        </mesh>
        <mesh position={[0, 0.13, -0.04]} material={orangeMat}>
          <boxGeometry args={[0.16, 0.08, 0.14]} />
        </mesh>
        <mesh position={[0, 0.14, -0.04]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
          <cylinderGeometry args={[0.035, 0.035, 0.18, 16]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. DIGITIGRADE LEGS (KNEES BENT FORWARD)                       */}
      {/* ============================================================== */}
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.26, -0.48, -0.04]}>
        <mesh position={[0, 0.14, 0.05]} rotation={[-0.38, 0, 0]} material={darkMetalMat}>
          <boxGeometry args={[0.11, 0.28, 0.07]} />
        </mesh>
        <group position={[0, 0.26, 0.1]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
            <cylinderGeometry args={[0.055, 0.055, 0.18, 16]} />
          </mesh>
          <mesh position={[0, 0.15, -0.06]} rotation={[0.42, 0, 0]} material={darkMetalMat}>
            <boxGeometry args={[0.11, 0.3, 0.07]} />
          </mesh>
          <mesh position={[-0.08, 0.15, -0.06]} rotation={[0.42, 0, 0]} material={whiteMat} castShadow>
            <boxGeometry args={[0.04, 0.26, 0.16]} />
          </mesh>
        </group>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.26, -0.48, -0.04]}>
        <mesh position={[0, 0.14, 0.05]} rotation={[-0.38, 0, 0]} material={darkMetalMat}>
          <boxGeometry args={[0.11, 0.28, 0.07]} />
        </mesh>
        <group position={[0, 0.26, 0.1]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
            <cylinderGeometry args={[0.055, 0.055, 0.18, 16]} />
          </mesh>
          <mesh position={[0, 0.15, -0.06]} rotation={[0.42, 0, 0]} material={darkMetalMat}>
            <boxGeometry args={[0.11, 0.3, 0.07]} />
          </mesh>
          <mesh position={[0.08, 0.15, -0.06]} rotation={[0.42, 0, 0]} material={whiteMat} castShadow>
            <boxGeometry args={[0.04, 0.26, 0.16]} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 3. HIP CHASSIS & TORSO MODULE                                  */}
      {/* ============================================================== */}
      <group position={[0, -0.06, 0]}>
        <mesh material={darkMetalMat}>
          <boxGeometry args={[0.48, 0.09, 0.15]} />
        </mesh>
        <mesh position={[-0.26, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
          <cylinderGeometry args={[0.065, 0.065, 0.16, 16]} />
        </mesh>
        <mesh position={[0.26, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
          <cylinderGeometry args={[0.065, 0.065, 0.16, 16]} />
        </mesh>

        {/* Torso Module */}
        <group ref={torsoRef} position={[0, 0.2, 0]}>
          <mesh position={[0, -0.06, 0]} material={whiteMat} castShadow>
            <boxGeometry args={[0.38, 0.14, 0.24]} />
          </mesh>
          <mesh position={[0, 0.08, 0]} material={orangeMat} castShadow>
            <boxGeometry args={[0.4, 0.16, 0.25]} />
          </mesh>

          {/* Corner Fastener Rivets */}
          <mesh position={[-0.16, 0.11, 0.13]} material={chromePinMat}>
            <sphereGeometry args={[0.016, 8, 8]} />
          </mesh>
          <mesh position={[0.16, 0.11, 0.13]} material={chromePinMat}>
            <sphereGeometry args={[0.016, 8, 8]} />
          </mesh>
          <mesh position={[-0.16, 0.04, 0.13]} material={chromePinMat}>
            <sphereGeometry args={[0.016, 8, 8]} />
          </mesh>
          <mesh position={[0.16, 0.04, 0.13]} material={chromePinMat}>
            <sphereGeometry args={[0.016, 8, 8]} />
          </mesh>

          {/* ============================================================ */}
          {/* BDX-01 INTEGRATED HOLOGRAPHIC PROJECTOR EMITTER ON CHEST     */}
          {/* ============================================================ */}
          <group position={[0, 0.06, 0.13]}>
            {/* Projector Bezel Housing */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.05, 0.02, 24]} />
              <meshStandardMaterial color="#222828" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Glowing Sage Hologram Emitter Lens */}
            <mesh ref={projectorLensRef} position={[0, 0, 0.012]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.038, 24]} />
              <meshBasicMaterial color="#A2B29F" transparent opacity={0.6} />
            </mesh>

            {/* VOLUMETRIC HOLOGRAPHIC LIGHT BEAM CONE */}
            <group position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh ref={projectorBeamRef} position={[0, 1.4, 0]} visible={isProjecting}>
                <coneGeometry args={[1.2, 2.8, 32, 1, true]} />
                <meshBasicMaterial
                  color="#A2B29F"
                  transparent
                  opacity={0.3}
                  side={THREE.DoubleSide}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
              {/* Central Intense Beam Core */}
              {isProjecting && (
                <mesh position={[0, 1.4, 0]}>
                  <cylinderGeometry args={[0.04, 0.6, 2.8, 16, 1, true]} />
                  <meshBasicMaterial
                    color="#E6E2D8"
                    transparent
                    opacity={0.4}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                  />
                </mesh>
              )}
            </group>

            {/* Focused Projector Spotlight */}
            {isProjecting && (
              <pointLight position={[0, 0, 0.3]} color="#A2B29F" intensity={2.5} distance={4} />
            )}
          </group>

          {/* ============================================================ */}
          {/* 4. TALL ARTICULATED INDUSTRIAL NECK                          */}
          {/* ============================================================ */}
          <group ref={neckRef} position={[0, 0.18, 0]}>
            <mesh position={[0, 0.06, 0]} material={darkMetalMat}>
              <boxGeometry args={[0.16, 0.12, 0.14]} />
            </mesh>
            <mesh position={[0, 0.06, 0]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
              <cylinderGeometry args={[0.04, 0.04, 0.18, 16]} />
            </mesh>
            <mesh position={[0, 0.17, 0.01]} rotation={[-0.1, 0, 0]} material={darkMetalMat}>
              <boxGeometry args={[0.14, 0.14, 0.12]} />
            </mesh>
            <mesh position={[0, 0.27, 0.02]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
              <cylinderGeometry args={[0.042, 0.042, 0.16, 16]} />
            </mesh>

            {/* ========================================================== */}
            {/* 5. SOLID BDX PERISCOPE HEAD WITH DUAL GLOWING WHITE EYES   */}
            {/* ========================================================== */}
            <group ref={headRef} position={[0, 0.33, 0.03]}>
              {/* Lower Orange Jaw Tray */}
              <mesh position={[0, -0.03, 0]} material={orangeMat} castShadow>
                <boxGeometry args={[0.56, 0.06, 0.60]} />
              </mesh>

              {/* Left Orange Ear Pivot Plate */}
              <mesh position={[-0.285, 0.04, -0.06]} rotation={[0, 0, Math.PI / 2]} material={orangeMat}>
                <cylinderGeometry args={[0.065, 0.065, 0.018, 24]} />
              </mesh>
              <mesh position={[-0.296, 0.04, -0.06]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
                <cylinderGeometry args={[0.022, 0.022, 0.012, 16]} />
              </mesh>

              {/* Right Orange Ear Pivot Plate */}
              <mesh position={[0.285, 0.04, -0.06]} rotation={[0, 0, Math.PI / 2]} material={orangeMat}>
                <cylinderGeometry args={[0.065, 0.065, 0.018, 24]} />
              </mesh>
              <mesh position={[0.296, 0.04, -0.06]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
                <cylinderGeometry args={[0.022, 0.022, 0.012, 16]} />
              </mesh>

              {/* Upper White Canopy Hood */}
              <group position={[0, 0.07, 0]}>
                <mesh material={whiteMat} castShadow receiveShadow>
                  <boxGeometry args={[0.56, 0.14, 0.62]} />
                </mesh>
                <mesh position={[0, 0.035, 0.14]} rotation={[-0.16, 0, 0]} material={whiteMat} castShadow>
                  <boxGeometry args={[0.56, 0.07, 0.32]} />
                </mesh>
                <mesh position={[0, 0, -0.31]} material={whiteMat}>
                  <cylinderGeometry args={[0.27, 0.27, 0.14, 24]} />
                </mesh>
              </group>

              {/* Front Dark Visor Screen Panel */}
              <group position={[0, 0.035, 0.31]}>
                <mesh material={darkMetalMat}>
                  <boxGeometry args={[0.50, 0.17, 0.03]} />
                </mesh>
                <mesh position={[0, 0, -0.005]}>
                  <boxGeometry args={[0.52, 0.18, 0.02]} />
                  <meshStandardMaterial color="#111314" roughness={0.5} />
                </mesh>

                {/* LEFT GLOWING WHITE ROBOTIC EYE */}
                <group position={[-0.13, 0.01, 0.02]}>
                  <mesh>
                    <torusGeometry args={[0.072, 0.008, 16, 32]} />
                    <meshStandardMaterial color="#252B2E" roughness={0.25} metalness={0.9} />
                  </mesh>
                  <mesh position={[0, 0, -0.005]}>
                    <circleGeometry args={[0.068, 24]} />
                    <meshStandardMaterial color="#0A0C0E" roughness={0.2} />
                  </mesh>

                  <group ref={leftEyeRef}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                      <sphereGeometry args={[0.064, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
                      <meshBasicMaterial color="#FFFFFF" />
                    </mesh>

                    <group ref={leftPupilRef} position={[0, 0, 0.064]}>
                      <mesh>
                        <circleGeometry args={[0.022, 32]} />
                        <meshBasicMaterial color="#0F1214" />
                      </mesh>
                      <mesh position={[0, 0, 0.001]}>
                        <ringGeometry args={[0.026, 0.03, 32]} />
                        <meshBasicMaterial color="#0F1214" transparent opacity={0.65} side={THREE.DoubleSide} />
                      </mesh>
                      <mesh position={[0, 0, 0.002]}>
                        <circleGeometry args={[0.007, 16]} />
                        <meshBasicMaterial color="#FFFFFF" />
                      </mesh>
                    </group>
                  </group>
                </group>

                {/* RIGHT GLOWING WHITE ROBOTIC EYE */}
                <group position={[0.13, 0.01, 0.02]}>
                  <mesh>
                    <torusGeometry args={[0.072, 0.008, 16, 32]} />
                    <meshStandardMaterial color="#252B2E" roughness={0.25} metalness={0.9} />
                  </mesh>
                  <mesh position={[0, 0, -0.005]}>
                    <circleGeometry args={[0.068, 24]} />
                    <meshStandardMaterial color="#0A0C0E" roughness={0.2} />
                  </mesh>

                  <group ref={rightEyeRef}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                      <sphereGeometry args={[0.064, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
                      <meshBasicMaterial color="#FFFFFF" />
                    </mesh>

                    <group ref={rightPupilRef} position={[0, 0, 0.064]}>
                      <mesh>
                        <circleGeometry args={[0.022, 32]} />
                        <meshBasicMaterial color="#0F1214" />
                      </mesh>
                      <mesh position={[0, 0, 0.001]}>
                        <ringGeometry args={[0.026, 0.03, 32]} />
                        <meshBasicMaterial color="#0F1214" transparent opacity={0.65} side={THREE.DoubleSide} />
                      </mesh>
                      <mesh position={[0, 0, 0.002]}>
                        <circleGeometry args={[0.007, 16]} />
                        <meshBasicMaterial color="#FFFFFF" />
                      </mesh>
                    </group>
                  </group>
                </group>

                {/* Clean White Ambient Eye Glow Light */}
                <pointLight position={[0, 0.01, 0.18]} distance={2.0} intensity={0.7} color="#FFFFFF" />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
