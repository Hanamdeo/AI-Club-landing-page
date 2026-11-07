'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { audioManager } from '@/utils/audioManager';

// Waypoints along the 3-section corridor arc:
// Progress 0.0 -> Section 1 (The Arrival: Facing visitor, welcoming stance)
// Progress 0.5 -> Section 2 (The Intelligence Core: Walking along rack corridor)
// Progress 1.0 -> Section 3 (The Projection Chamber: Pedestal & Hologram Emission)
const FACILITY_WAYPOINTS = [
  {
    progress: 0.0,
    pos: new THREE.Vector3(1.10, 0.70, 6.8),
    idleRotY: -0.18, // Welcoming angle facing directly towards the visitor/camera (+Z)
  },
  {
    progress: 0.5,
    pos: new THREE.Vector3(-0.95, 0.70, -18.5),
    idleRotY: 0.35,
  },
  {
    progress: 1.0,
    pos: new THREE.Vector3(1.10, 0.82, -34.8),
    idleRotY: 0.12,
  },
];

/**
 * BdxRobot
 * High-precision Disney / NVIDIA BDX Biped Companion Robot:
 * - Proper anatomical hierarchy (Hips -> Thigh -> Knee -> Shin -> Ankle -> Feet)
 * - Front face with dual glowing white eyes facing forward towards the visitor (+Z)
 * - Lifelike cursor gaze tracking, organic eye blinks, and interactive jump/chirp
 * - Natural walking gait that rotates from the hips during scroll transit
 * - Articulated Holographic Projector with volumetric sage light beam
 */
export default function BdxRobot({
  scale = 1,
  isStatic = false,
  hoverMode = false,
  scrollProgress = 0,
  isProjecting = false,
  onToggleProjector,
}) {
  const rootRef = useRef();
  const hipsRef = useRef();
  const torsoRef = useRef();
  const neckRef = useRef();
  const headRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const projectorBeamRef = useRef();
  const projectorLensRef = useRef();

  // Physical tracking state
  const currentPos = useRef(new THREE.Vector3(1.10, 0.70, 6.8));
  const prevPos = useRef(new THREE.Vector3(1.10, 0.70, 6.8));
  const currentRotY = useRef(-0.18);
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
      const hoverFloatY = Math.sin(t * 2.2) * 0.05;
      const hoverFloatRotY = Math.sin(t * 1.2) * 0.06;

      if (rootRef.current) {
        rootRef.current.position.y = hoverFloatY;
        rootRef.current.rotation.y = hoverFloatRotY;
      }

      // Gentle leg dangle in hover mode
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = 0.12 + Math.sin(t * 2.0) * 0.03;
        rightLegRef.current.rotation.x = 0.12 - Math.sin(t * 2.0) * 0.03;
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

      // Calculate motion speed
      const distDelta = currentPos.current.distanceTo(prevPos.current);
      const speed = distDelta / Math.max(delta, 0.001);
      prevPos.current.copy(currentPos.current);

      const isWalking = speed > 0.18 && p < 0.95;

      let walkBob = 0;
      let walkSway = 0;

      if (isWalking) {
        walkPhase.current += delta * Math.min(16, Math.max(6, speed * 3.8));
        const stepSine = Math.sin(walkPhase.current);

        // Natural leg swing from HIP joints
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = stepSine * 0.38;
          rightLegRef.current.rotation.x = -stepSine * 0.38;
        }

        walkBob = Math.abs(Math.sin(walkPhase.current)) * 0.03;
        walkSway = Math.sin(walkPhase.current) * 0.02;

        if (torsoRef.current) {
          torsoRef.current.rotation.x += (0.06 - torsoRef.current.rotation.x) * (delta * 5);
        }

        // When actively walking down the corridor, orient along the travel direction
        const walkDirectionAngle = -0.35;
        currentRotY.current += (walkDirectionAngle - currentRotY.current) * (delta * 3.0);
      } else {
        // Settling back to upright standing idle stance
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x += (0 - leftLegRef.current.rotation.x) * (delta * 6);
          rightLegRef.current.rotation.x += (0 - rightLegRef.current.rotation.x) * (delta * 6);
        }
        if (torsoRef.current) {
          torsoRef.current.rotation.x += (0 - torsoRef.current.rotation.x) * (delta * 6);
        }

        // Facing forward towards the visitor/camera (+Z)
        currentRotY.current += (targetIdleRotY - currentRotY.current) * (delta * 3.5);
      }

      // Idle sway & jump
      const idleSway = Math.sin(t * 1.8) * 0.015;
      const idleBob = Math.abs(Math.sin(t * 1.8)) * 0.015;

      let jumpOffsetY = 0;
      if (isJumping.current) {
        jumpTime.current += delta * 2.6;
        const progress = jumpTime.current;
        if (progress < 1.0) {
          jumpOffsetY = Math.sin(progress * Math.PI) * 0.22;
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
        rootRef.current.rotation.z = isWalking ? walkSway * 0.5 : -idleSway;
      }
    }

    // 3. Cursor Gaze Tracking
    smoothedCursor.current.x += (cursorRef.current.x - smoothedCursor.current.x) * 0.14;
    smoothedCursor.current.y += (cursorRef.current.y - smoothedCursor.current.y) * 0.14;

    const mx = smoothedCursor.current.x;
    const my = smoothedCursor.current.y;

    if (neckRef.current) {
      neckRef.current.rotation.y = mx * 0.22;
      neckRef.current.rotation.x = -my * 0.10;
    }

    if (headRef.current) {
      const projectorPitch = isProjecting ? -0.08 : 0;
      headRef.current.rotation.y = mx * 0.38;
      headRef.current.rotation.x = -my * 0.20 + projectorPitch;
      headRef.current.rotation.z = -mx * 0.12 + Math.sin(t * 1.4) * 0.02;
    }

    // 4. Lifelike Eye Blinking
    blinkTimer.current += delta;
    if (blinkTimer.current > 3.6) {
      isBlinking.current = true;
      if (blinkTimer.current > 3.74) {
        blinkTimer.current = Math.random() * 0.8;
        isBlinking.current = false;
      }
    }

    const eyeScaleY = isBlinking.current ? 0.08 : 1.0;
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y += (eyeScaleY - leftEyeRef.current.scale.y) * 0.5;
      rightEyeRef.current.scale.y += (eyeScaleY - rightEyeRef.current.scale.y) * 0.5;
    }

    // 5. Hologram Projector Light Beam
    if (projectorBeamRef.current) {
      if (isProjecting) {
        projectorBeamRef.current.visible = true;
        const pulse = 0.32 + Math.sin(t * 3.5) * 0.08;
        projectorBeamRef.current.material.opacity = pulse;
        projectorBeamRef.current.rotation.z = t * 0.15;
      } else {
        projectorBeamRef.current.visible = false;
      }
    }

    if (projectorLensRef.current) {
      projectorLensRef.current.material.opacity = isProjecting ? 0.95 : 0.45;
    }
  });

  // Materials
  const orangeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: hovered ? '#FF7A38' : '#F06522',
        roughness: 0.35,
        metalness: 0.15,
      }),
    [hovered]
  );

  const whiteMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F4F4EE',
        roughness: 0.32,
        metalness: 0.08,
      }),
    []
  );

  const darkMetalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1E2325',
        roughness: 0.40,
        metalness: 0.82,
      }),
    []
  );

  const chromePinMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#B8C0C8',
        roughness: 0.22,
        metalness: 0.90,
      }),
    []
  );

  const soleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        roughness: 0.55,
        metalness: 0.1,
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
      {/* 1. CENTRAL HIP CHASSIS (PELVIS PIVOT)                          */}
      {/* ============================================================== */}
      <group ref={hipsRef} position={[0, 0, 0]}>
        {/* Main Hip Crossbeam */}
        <mesh material={darkMetalMat} castShadow>
          <boxGeometry args={[0.48, 0.09, 0.16]} />
        </mesh>
        {/* Left Hip Bearing Joint */}
        <mesh position={[-0.24, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
          <cylinderGeometry args={[0.06, 0.06, 0.14, 20]} />
        </mesh>
        {/* Right Hip Bearing Joint */}
        <mesh position={[0.24, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
          <cylinderGeometry args={[0.06, 0.06, 0.14, 20]} />
        </mesh>

        {/* ============================================================ */}
        {/* 2. DIGITIGRADE LEGS & FEET (ATTACHED AT HIP JOINTS)         */}
        {/* ============================================================ */}
        {/* LEFT LEG (Pivots from Hip at X = -0.24, Y = 0) */}
        <group ref={leftLegRef} position={[-0.24, 0, 0]}>
          {/* Upper Thigh: Angled downward and forward */}
          <group rotation={[0.28, 0, 0]}>
            <mesh position={[0, -0.15, 0]} material={darkMetalMat} castShadow>
              <boxGeometry args={[0.10, 0.28, 0.08]} />
            </mesh>
            {/* White Thigh Armor Plate */}
            <mesh position={[-0.06, -0.14, 0]} material={whiteMat} castShadow>
              <boxGeometry args={[0.03, 0.24, 0.14]} />
            </mesh>

            {/* Knee Joint: at Y = -0.28 */}
            <group position={[0, -0.28, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
                <cylinderGeometry args={[0.05, 0.05, 0.15, 16]} />
              </mesh>

              {/* Lower Shin: Angled backward towards ankle */}
              <group rotation={[-0.56, 0, 0]}>
                <mesh position={[0, -0.16, 0]} material={darkMetalMat} castShadow>
                  <boxGeometry args={[0.09, 0.30, 0.07]} />
                </mesh>

                {/* Ankle Joint: at Y = -0.30 */}
                <group position={[0, -0.30, 0]}>
                  <mesh rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
                    <cylinderGeometry args={[0.038, 0.038, 0.14, 16]} />
                  </mesh>

                  {/* Left Chunky Orange Boot: Sits flat on the ground */}
                  <group rotation={[0.28, 0, 0]} position={[0, -0.04, 0.08]}>
                    {/* Yellow Rubber Sole */}
                    <mesh position={[0, -0.03, 0]} material={soleMat} receiveShadow>
                      <boxGeometry args={[0.22, 0.03, 0.38]} />
                    </mesh>
                    {/* Orange Main Shoe Chassis */}
                    <mesh position={[0, 0.03, 0]} material={orangeMat} castShadow>
                      <boxGeometry args={[0.20, 0.08, 0.36]} />
                    </mesh>
                    {/* Rear Heel Block */}
                    <mesh position={[0, 0.08, -0.08]} material={orangeMat} castShadow>
                      <boxGeometry args={[0.14, 0.07, 0.14]} />
                    </mesh>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>

        {/* RIGHT LEG (Pivots from Hip at X = 0.24, Y = 0) */}
        <group ref={rightLegRef} position={[0.24, 0, 0]}>
          {/* Upper Thigh: Angled downward and forward */}
          <group rotation={[0.28, 0, 0]}>
            <mesh position={[0, -0.15, 0]} material={darkMetalMat} castShadow>
              <boxGeometry args={[0.10, 0.28, 0.08]} />
            </mesh>
            {/* White Thigh Armor Plate */}
            <mesh position={[0.06, -0.14, 0]} material={whiteMat} castShadow>
              <boxGeometry args={[0.03, 0.24, 0.14]} />
            </mesh>

            {/* Knee Joint: at Y = -0.28 */}
            <group position={[0, -0.28, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
                <cylinderGeometry args={[0.05, 0.05, 0.15, 16]} />
              </mesh>

              {/* Lower Shin: Angled backward towards ankle */}
              <group rotation={[-0.56, 0, 0]}>
                <mesh position={[0, -0.16, 0]} material={darkMetalMat} castShadow>
                  <boxGeometry args={[0.09, 0.30, 0.07]} />
                </mesh>

                {/* Ankle Joint: at Y = -0.30 */}
                <group position={[0, -0.30, 0]}>
                  <mesh rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
                    <cylinderGeometry args={[0.038, 0.038, 0.14, 16]} />
                  </mesh>

                  {/* Right Chunky Orange Boot: Sits flat on the ground */}
                  <group rotation={[0.28, 0, 0]} position={[0, -0.04, 0.08]}>
                    {/* Yellow Rubber Sole */}
                    <mesh position={[0, -0.03, 0]} material={soleMat} receiveShadow>
                      <boxGeometry args={[0.22, 0.03, 0.38]} />
                    </mesh>
                    {/* Orange Main Shoe Chassis */}
                    <mesh position={[0, 0.03, 0]} material={orangeMat} castShadow>
                      <boxGeometry args={[0.20, 0.08, 0.36]} />
                    </mesh>
                    {/* Rear Heel Block */}
                    <mesh position={[0, 0.08, -0.08]} material={orangeMat} castShadow>
                      <boxGeometry args={[0.14, 0.07, 0.14]} />
                    </mesh>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>

        {/* ============================================================== */}
        {/* 3. TORSO MODULE (EXTENDS UPWARD FROM HIPS)                     */}
        {/* ============================================================== */}
        <group ref={torsoRef} position={[0, 0.06, 0]}>
          {/* Lower White Belly Tray */}
          <mesh position={[0, 0.04, 0]} material={whiteMat} castShadow>
            <boxGeometry args={[0.38, 0.10, 0.24]} />
          </mesh>
          {/* Main Orange Chest Block */}
          <mesh position={[0, 0.16, 0]} material={orangeMat} castShadow>
            <boxGeometry args={[0.42, 0.16, 0.26]} />
          </mesh>

          {/* Corner Fastener Rivets */}
          <mesh position={[-0.17, 0.20, 0.132]} material={chromePinMat}>
            <sphereGeometry args={[0.014, 8, 8]} />
          </mesh>
          <mesh position={[0.17, 0.20, 0.132]} material={chromePinMat}>
            <sphereGeometry args={[0.014, 8, 8]} />
          </mesh>
          <mesh position={[-0.17, 0.11, 0.132]} material={chromePinMat}>
            <sphereGeometry args={[0.014, 8, 8]} />
          </mesh>
          <mesh position={[0.17, 0.11, 0.132]} material={chromePinMat}>
            <sphereGeometry args={[0.014, 8, 8]} />
          </mesh>

          {/* Chest Holographic Projector Emitter */}
          <group position={[0, 0.15, 0.132]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.05, 0.02, 24]} />
              <meshStandardMaterial color="#222828" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh ref={projectorLensRef} position={[0, 0, 0.011]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.038, 24]} />
              <meshBasicMaterial color="#A2B29F" transparent opacity={0.5} />
            </mesh>

            {/* Volumetric Hologram Cone */}
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
            </group>
          </group>

          {/* ============================================================ */}
          {/* 4. INDUSTRIAL PERISCOPE NECK                                 */}
          {/* ============================================================ */}
          <group ref={neckRef} position={[0, 0.25, 0]}>
            <mesh position={[0, 0.05, 0]} material={darkMetalMat} castShadow>
              <boxGeometry args={[0.15, 0.10, 0.14]} />
            </mesh>
            <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
              <cylinderGeometry args={[0.038, 0.038, 0.17, 16]} />
            </mesh>
            <mesh position={[0, 0.14, 0.01]} rotation={[-0.08, 0, 0]} material={darkMetalMat} castShadow>
              <boxGeometry args={[0.13, 0.12, 0.12]} />
            </mesh>
            <mesh position={[0, 0.22, 0.02]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
              <cylinderGeometry args={[0.038, 0.038, 0.15, 16]} />
            </mesh>

            {/* ========================================================== */}
            {/* 5. SOLID BDX HEAD (FACING FORWARD TOWARDS VISITOR AT +Z)   */}
            {/* ========================================================== */}
            <group ref={headRef} position={[0, 0.28, 0.02]}>
              {/* Lower Orange Jaw Tray */}
              <mesh position={[0, 0, 0]} material={orangeMat} castShadow>
                <boxGeometry args={[0.52, 0.06, 0.54]} />
              </mesh>

              {/* Upper White Canopy Hood */}
              <group position={[0, 0.09, 0]}>
                <mesh material={whiteMat} castShadow receiveShadow>
                  <boxGeometry args={[0.52, 0.13, 0.54]} />
                </mesh>
                {/* Sloped Brow Visor Edge */}
                <mesh position={[0, 0.025, 0.12]} rotation={[-0.14, 0, 0]} material={whiteMat} castShadow>
                  <boxGeometry args={[0.52, 0.06, 0.28]} />
                </mesh>
                {/* Rear Rounded Cowl */}
                <mesh position={[0, 0, -0.27]} material={whiteMat}>
                  <cylinderGeometry args={[0.25, 0.25, 0.13, 24]} />
                </mesh>
              </group>

              {/* Left Orange Ear Pivot Disc */}
              <mesh position={[-0.265, 0.04, -0.05]} rotation={[0, 0, Math.PI / 2]} material={orangeMat}>
                <cylinderGeometry args={[0.06, 0.06, 0.018, 24]} />
              </mesh>
              <mesh position={[-0.275, 0.04, -0.05]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
                <cylinderGeometry args={[0.02, 0.02, 0.012, 16]} />
              </mesh>

              {/* Right Orange Ear Pivot Disc */}
              <mesh position={[0.265, 0.04, -0.05]} rotation={[0, 0, Math.PI / 2]} material={orangeMat}>
                <cylinderGeometry args={[0.06, 0.06, 0.018, 24]} />
              </mesh>
              <mesh position={[0.275, 0.04, -0.05]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
                <cylinderGeometry args={[0.02, 0.02, 0.012, 16]} />
              </mesh>

              {/* ======================================================== */}
              {/* FRONT VISOR SCREEN WITH DUAL GLOWING WHITE EYES (+Z FACE) */}
              {/* ======================================================== */}
              <group position={[0, 0.05, 0.272]}>
                {/* Dark Visor Glass Screen */}
                <mesh material={darkMetalMat}>
                  <boxGeometry args={[0.48, 0.16, 0.02]} />
                </mesh>
                <mesh position={[0, 0, -0.003]}>
                  <boxGeometry args={[0.50, 0.17, 0.01]} />
                  <meshStandardMaterial color="#0C0E10" roughness={0.3} metalness={0.9} />
                </mesh>

                {/* LEFT GLOWING WHITE ROBOTIC EYE */}
                <group position={[-0.12, 0.01, 0.016]}>
                  {/* Outer Bezel */}
                  <mesh>
                    <torusGeometry args={[0.065, 0.007, 16, 32]} />
                    <meshStandardMaterial color="#252B2E" roughness={0.25} metalness={0.9} />
                  </mesh>
                  {/* Dark Eye Socket Background */}
                  <mesh position={[0, 0, -0.004]}>
                    <circleGeometry args={[0.062, 24]} />
                    <meshBasicMaterial color="#000000" />
                  </mesh>

                  {/* Glowing White Eye Globe */}
                  <group ref={leftEyeRef}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                      <sphereGeometry args={[0.058, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
                      <meshBasicMaterial color="#FFFFFF" />
                    </mesh>

                    {/* Dark Pupil */}
                    <group position={[0, 0, 0.058]}>
                      <mesh>
                        <circleGeometry args={[0.020, 32]} />
                        <meshBasicMaterial color="#101416" />
                      </mesh>
                      {/* Specular Catchlight Sparkle */}
                      <mesh position={[0.008, 0.008, 0.001]}>
                        <circleGeometry args={[0.006, 16]} />
                        <meshBasicMaterial color="#FFFFFF" />
                      </mesh>
                    </group>
                  </group>
                </group>

                {/* RIGHT GLOWING WHITE ROBOTIC EYE */}
                <group position={[0.12, 0.01, 0.016]}>
                  {/* Outer Bezel */}
                  <mesh>
                    <torusGeometry args={[0.065, 0.007, 16, 32]} />
                    <meshStandardMaterial color="#252B2E" roughness={0.25} metalness={0.9} />
                  </mesh>
                  {/* Dark Eye Socket Background */}
                  <mesh position={[0, 0, -0.004]}>
                    <circleGeometry args={[0.062, 24]} />
                    <meshBasicMaterial color="#000000" />
                  </mesh>

                  {/* Glowing White Eye Globe */}
                  <group ref={rightEyeRef}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                      <sphereGeometry args={[0.058, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
                      <meshBasicMaterial color="#FFFFFF" />
                    </mesh>

                    {/* Dark Pupil */}
                    <group position={[0, 0, 0.058]}>
                      <mesh>
                        <circleGeometry args={[0.020, 32]} />
                        <meshBasicMaterial color="#101416" />
                      </mesh>
                      {/* Specular Catchlight Sparkle */}
                      <mesh position={[0.008, 0.008, 0.001]}>
                        <circleGeometry args={[0.006, 16]} />
                        <meshBasicMaterial color="#FFFFFF" />
                      </mesh>
                    </group>
                  </group>
                </group>

                {/* Gentle eye forward light */}
                <pointLight position={[0, 0.01, 0.16]} distance={1.8} intensity={0.5} color="#FFFFFF" />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
