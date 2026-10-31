'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * BdxRobot
 * High-precision 3D BDX biped companion robot (Disney / NVIDIA):
 * - TWO BRILLIANT GLOWING WHITE ROBOTIC EYES on a sleek dark visor
 * - Expressive cursor-tracking pupils with concentric high-tech reticle detailing
 * - Natural digital blinking animation
 * - Articulated industrial neck with full physical clearance (no orange torso clipping / glitches)
 * - Flush ear pivot caps (no horizontal orange wing flaps)
 * - Dynamic head & neck gaze tracking following the user's cursor across the screen
 */
export default function BdxRobot({ scale = 1, isStatic = false }) {
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

  // Mouse & Touch tracker for cursor following (normalized -1.0 to +1.0)
  const cursorRef = useRef({ x: 0, y: 0 });
  const smoothedCursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      // Support mouse, touch, and stylus events
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX !== undefined && clientY !== undefined) {
        // Normalize screen coordinates to [-1.0, 1.0]
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

  // Blink timing state
  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // 1. Snappy & fluid cursor smoothing (responsive 0.16 per frame)
    smoothedCursor.current.x += (cursorRef.current.x - smoothedCursor.current.x) * 0.16;
    smoothedCursor.current.y += (cursorRef.current.y - smoothedCursor.current.y) * 0.16;

    const mx = smoothedCursor.current.x;
    const my = smoothedCursor.current.y;

    // 2. Playful Biped Sway & Weight Shift
    const sway = Math.sin(t * 2.2);
    const bob = Math.abs(Math.sin(t * 2.2));

    if (rootRef.current && !isStatic) {
      rootRef.current.position.y = -0.1 + bob * 0.03;
      rootRef.current.position.x = sway * 0.02;
      rootRef.current.rotation.z = -sway * 0.02;
    }

    if (torsoRef.current && !isStatic) {
      torsoRef.current.rotation.y = sway * 0.02 + mx * 0.06;
    }

    // 3. Dynamic Cursor Tracking: Articulated Neck & Head Tracking
    // Neck base swivel (turns left/right and slight tilt)
    if (neckRef.current) {
      const neckTargetYaw = mx * 0.25;
      const neckTargetPitch = -my * 0.12;
      neckRef.current.rotation.y = neckTargetYaw;
      neckRef.current.rotation.x = neckTargetPitch;
    }

    // Head provides pronounced gaze tracking + adorable puppy/bird cocked head tilt
    // Safe clamped angles prevent any geometry clipping with torso/neck
    if (headRef.current) {
      // Yaw: turns left/right to follow cursor (up to ~28 degrees)
      const headTargetYaw = mx * 0.48;
      // Pitch: tilts up/down to follow cursor (up to ~15 degrees)
      const headTargetPitch = -my * 0.26;
      // Inquisitive head tilt: cocks head sideways when curious (up to ~10 degrees)
      const headCuriousTilt = -mx * 0.18 + Math.sin(t * 1.5) * 0.03;

      headRef.current.rotation.y = headTargetYaw;
      headRef.current.rotation.x = headTargetPitch;
      headRef.current.rotation.z = headCuriousTilt;
    }

    // 4. Lifelike White Eye Blinking & Pupil Tracking
    blinkTimer.current += delta;
    if (blinkTimer.current > 3.4) {
      isBlinking.current = true;
      if (blinkTimer.current > 3.54) {
        blinkTimer.current = Math.random() * 0.7;
        isBlinking.current = false;
      }
    }

    const eyeScaleY = isBlinking.current ? 0.08 : 1.0;
    const pupilShiftX = mx * 0.016;
    const pupilShiftY = my * 0.014;

    // Both white eyes blink smoothly (scale Y)
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y += (eyeScaleY - leftEyeRef.current.scale.y) * 0.55;
      rightEyeRef.current.scale.y += (eyeScaleY - rightEyeRef.current.scale.y) * 0.55;
    }

    // Pupils actively dart towards cursor
    if (leftPupilRef.current && rightPupilRef.current) {
      leftPupilRef.current.position.x = pupilShiftX;
      leftPupilRef.current.position.y = pupilShiftY;
      rightPupilRef.current.position.x = pupilShiftX;
      rightPupilRef.current.position.y = pupilShiftY;
    }

    // 5. Leg flex
    if (leftLegRef.current && rightLegRef.current && !isStatic) {
      leftLegRef.current.rotation.x = -sway * 0.05;
      rightLegRef.current.rotation.x = sway * 0.05;
    }
  });

  // Materials
  const orangeMat = new THREE.MeshStandardMaterial({
    color: '#F06522',
    roughness: 0.3,
    metalness: 0.15,
  });

  const whiteMat = new THREE.MeshStandardMaterial({
    color: '#F5F5F0',
    roughness: 0.3,
    metalness: 0.1,
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: '#181B1C',
    roughness: 0.35,
    metalness: 0.85,
  });

  const chromePinMat = new THREE.MeshStandardMaterial({
    color: '#B0B7C0',
    roughness: 0.2,
    metalness: 0.9,
  });

  return (
    <group ref={rootRef} scale={scale} dispose={null}>
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

        {/* Torso Module (Orange Top Block, White Lower Block) */}
        <group ref={torsoRef} position={[0, 0.2, 0]}>
          {/* Lower White Torso Block */}
          <mesh position={[0, -0.06, 0]} material={whiteMat} castShadow>
            <boxGeometry args={[0.38, 0.14, 0.24]} />
          </mesh>
          {/* Upper Orange Torso Block */}
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
          {/* 4. TALL ARTICULATED INDUSTRIAL NECK (AMPLE TORSO CLEARANCE) */}
          {/* ============================================================ */}
          <group ref={neckRef} position={[0, 0.18, 0]}>
            {/* Lower Neck Swivel Base Collar */}
            <mesh position={[0, 0.06, 0]} material={darkMetalMat}>
              <boxGeometry args={[0.16, 0.12, 0.14]} />
            </mesh>
            <mesh position={[0, 0.06, 0]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
              <cylinderGeometry args={[0.04, 0.04, 0.18, 16]} />
            </mesh>
            {/* Middle Articulated Neck Link */}
            <mesh position={[0, 0.17, 0.01]} rotation={[-0.1, 0, 0]} material={darkMetalMat}>
              <boxGeometry args={[0.14, 0.14, 0.12]} />
            </mesh>
            {/* Upper Neck Riser Collar & Pivot Pin (Gives Full Vertical Clearance) */}
            <mesh position={[0, 0.27, 0.02]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
              <cylinderGeometry args={[0.042, 0.042, 0.16, 16]} />
            </mesh>

            {/* ========================================================== */}
            {/* 5. SOLID BDX PERISCOPE HEAD WITH DUAL GLOWING WHITE EYES   */}
            {/* ========================================================== */}
            <group ref={headRef} position={[0, 0.33, 0.03]}>
              {/* Lower Orange Jaw Tray (Slim & Recessed, No Torso Collision) */}
              <mesh position={[0, -0.03, 0]} material={orangeMat} castShadow>
                <boxGeometry args={[0.56, 0.06, 0.60]} />
              </mesh>

              {/* Left Orange Ear Pivot Plate (Flush with Head Wall, No Flap) */}
              <mesh position={[-0.285, 0.04, -0.06]} rotation={[0, 0, Math.PI / 2]} material={orangeMat}>
                <cylinderGeometry args={[0.065, 0.065, 0.018, 24]} />
              </mesh>
              <mesh position={[-0.296, 0.04, -0.06]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
                <cylinderGeometry args={[0.022, 0.022, 0.012, 16]} />
              </mesh>

              {/* Right Orange Ear Pivot Plate (Flush with Head Wall, No Flap) */}
              <mesh position={[0.285, 0.04, -0.06]} rotation={[0, 0, Math.PI / 2]} material={orangeMat}>
                <cylinderGeometry args={[0.065, 0.065, 0.018, 24]} />
              </mesh>
              <mesh position={[0.296, 0.04, -0.06]} rotation={[0, 0, Math.PI / 2]} material={chromePinMat}>
                <cylinderGeometry args={[0.022, 0.022, 0.012, 16]} />
              </mesh>

              {/* Upper White Canopy Hood */}
              <group position={[0, 0.07, 0]}>
                {/* White Main Hull */}
                <mesh material={whiteMat} castShadow receiveShadow>
                  <boxGeometry args={[0.56, 0.14, 0.62]} />
                </mesh>

                {/* Overhanging Brow Visor Canopy (Forward +Z) */}
                <mesh position={[0, 0.035, 0.14]} rotation={[-0.16, 0, 0]} material={whiteMat} castShadow>
                  <boxGeometry args={[0.56, 0.07, 0.32]} />
                </mesh>

                {/* Back of Head Rounded Shell */}
                <mesh position={[0, 0, -0.31]} material={whiteMat}>
                  <cylinderGeometry args={[0.27, 0.27, 0.14, 24]} />
                </mesh>
              </group>

              {/* Front Dark Visor Screen Panel (+Z Direction, Clean Flush Capping) */}
              <group position={[0, 0.035, 0.31]}>
                {/* Inset Glossy Dark Visor Screen */}
                <mesh material={darkMetalMat}>
                  <boxGeometry args={[0.50, 0.17, 0.03]} />
                </mesh>

                {/* Visor Bezel Rim */}
                <mesh position={[0, 0, -0.005]}>
                  <boxGeometry args={[0.52, 0.18, 0.02]} />
                  <meshStandardMaterial color="#111314" roughness={0.5} />
                </mesh>

                {/* ====================================================== */}
                {/* TWO BRILLIANT GLOWING WHITE ROBOTIC EYES               */}
                {/* ====================================================== */}

                {/* LEFT GLOWING WHITE ROBOTIC EYE */}
                <group position={[-0.13, 0.01, 0.02]}>
                  {/* Sleek Dark Titanium Socket Ring */}
                  <mesh>
                    <torusGeometry args={[0.072, 0.008, 16, 32]} />
                    <meshStandardMaterial color="#252B2E" roughness={0.25} metalness={0.9} />
                  </mesh>

                  {/* Recessed Dark Eye Housing */}
                  <mesh position={[0, 0, -0.005]}>
                    <circleGeometry args={[0.068, 24]} />
                    <meshStandardMaterial color="#0A0C0E" roughness={0.2} />
                  </mesh>

                  {/* GLOWING PURE WHITE ROBOTIC EYE (Blinks smoothly on Y-scale) */}
                  <group ref={leftEyeRef}>
                    {/* Convex Glowing Pure White Eye Dome */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                      <sphereGeometry args={[0.064, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
                      <meshBasicMaterial color="#FFFFFF" />
                    </mesh>

                    {/* DYNAMIC OPTICAL PUPIL & RETICLE (Tracks Cursor) */}
                    <group ref={leftPupilRef} position={[0, 0, 0.064]}>
                      {/* Dark Expressive Optical Pupil */}
                      <mesh>
                        <circleGeometry args={[0.022, 32]} />
                        <meshBasicMaterial color="#0F1214" />
                      </mesh>

                      {/* Concentric Precision Reticle Ring */}
                      <mesh position={[0, 0, 0.001]}>
                        <ringGeometry args={[0.026, 0.03, 32]} />
                        <meshBasicMaterial color="#0F1214" transparent opacity={0.65} side={THREE.DoubleSide} />
                      </mesh>

                      {/* Inner Glowing White Sensor Point */}
                      <mesh position={[0, 0, 0.002]}>
                        <circleGeometry args={[0.007, 16]} />
                        <meshBasicMaterial color="#FFFFFF" />
                      </mesh>
                    </group>
                  </group>
                </group>

                {/* RIGHT GLOWING WHITE ROBOTIC EYE */}
                <group position={[0.13, 0.01, 0.02]}>
                  {/* Sleek Dark Titanium Socket Ring */}
                  <mesh>
                    <torusGeometry args={[0.072, 0.008, 16, 32]} />
                    <meshStandardMaterial color="#252B2E" roughness={0.25} metalness={0.9} />
                  </mesh>

                  {/* Recessed Dark Eye Housing */}
                  <mesh position={[0, 0, -0.005]}>
                    <circleGeometry args={[0.068, 24]} />
                    <meshStandardMaterial color="#0A0C0E" roughness={0.2} />
                  </mesh>

                  {/* GLOWING PURE WHITE ROBOTIC EYE (Blinks smoothly on Y-scale) */}
                  <group ref={rightEyeRef}>
                    {/* Convex Glowing Pure White Eye Dome */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                      <sphereGeometry args={[0.064, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
                      <meshBasicMaterial color="#FFFFFF" />
                    </mesh>

                    {/* DYNAMIC OPTICAL PUPIL & RETICLE (Tracks Cursor) */}
                    <group ref={rightPupilRef} position={[0, 0, 0.064]}>
                      {/* Dark Expressive Optical Pupil */}
                      <mesh>
                        <circleGeometry args={[0.022, 32]} />
                        <meshBasicMaterial color="#0F1214" />
                      </mesh>

                      {/* Concentric Precision Reticle Ring */}
                      <mesh position={[0, 0, 0.001]}>
                        <ringGeometry args={[0.026, 0.03, 32]} />
                        <meshBasicMaterial color="#0F1214" transparent opacity={0.65} side={THREE.DoubleSide} />
                      </mesh>

                      {/* Inner Glowing White Sensor Point */}
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
