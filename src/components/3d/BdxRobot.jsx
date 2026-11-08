'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { audioManager } from '@/utils/audioManager';

// Helper: Shortest-arc angle interpolation (prevents 360-degree spinning or snapping at +/- PI)
function lerpAngle(from, to, t) {
  const diff = (to - from) % (Math.PI * 2);
  const shortest = ((diff + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  return from + shortest * t;
}

// Facility corridor spline control points across Experience A (Arrival -> Foundation Bay -> Chamber)
const DESKTOP_CONTROL_POINTS = [
  new THREE.Vector3(1.28, 1.50, 8.2),    // p = 0.00: Section 01 Arrival threshold
  new THREE.Vector3(0.70, 1.30, -3.0),   // p = 0.25: Gentle transition down right aisle
  new THREE.Vector3(-0.95, 0.95, -18.5), // p = 0.50: Section 02 Foundation Bay
  new THREE.Vector3(-0.20, 1.05, -26.5), // p = 0.75: Chamber approach
  new THREE.Vector3(0.85, 1.05, -34.8),  // p = 1.00: Section 03 Projection Chamber pedestal
];

const MOBILE_CONTROL_POINTS = [
  new THREE.Vector3(0.35, 1.15, 8.0),    // p = 0.00
  new THREE.Vector3(0.15, 1.05, -3.0),   // p = 0.25
  new THREE.Vector3(-0.40, 0.90, -18.5), // p = 0.50
  new THREE.Vector3(-0.05, 0.95, -26.5), // p = 0.75
  new THREE.Vector3(0.35, 0.95, -34.8),  // p = 1.00
];

// Continuous idle settle orientation across facility sections
function getIdleAngle(p) {
  if (p <= 0.5) {
    const t = p / 0.5;
    const ease = t * t * (3 - 2 * t);
    return THREE.MathUtils.lerp(-0.25, 0.35, ease);
  } else {
    const t = (p - 0.5) / 0.5;
    const ease = t * t * (3 - 2 * t);
    return THREE.MathUtils.lerp(0.35, 0.00, ease);
  }
}

/**
 * High-Fidelity NEX-01 Companion Robot
 * Engineered directly from the reference 3D render:
 * - Prominent, fully exposed curved obsidian visor screen facing forward (+Z)
 * - Dual smiling cyan digital LED arch eyes (◠ ◠) with micro-LED dot matrix glow
 * - Thick, smooth white beveled bezel framing the curved face shield
 * - Teardrop flipper arms naturally pointing DOWNWARD along the body (-Y)
 * - Large cylindrical headphone ear cups with rear-pointing aerodynamic cyan fins
 * - Distinct shield-shaped chest arc reactor with 12 segmented cyan power blocks and core button
 * - Cobalt-navy tapered conical hover thruster base with cyan propulsion glow
 * - High-gloss automotive clearcoat pearl white finish with studio reflections
 */
export default function BdxRobot({
  scale = 0.94,
  isStatic = false,
  hoverMode = false,
  isIntro = false,
  scrollProgress = 0,
  scrollProgressRef,
  isProjecting = false,
  onToggleProjector,
}) {
  const rootRef = useRef();
  const hoverGroupRef = useRef();
  const bodyRef = useRef();
  const headRef = useRef();
  const eyeDisplayRef = useRef();
  const leftEyeMeshRef = useRef();
  const rightEyeMeshRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const projectorBeamRef = useRef();
  const projectorLensRef = useRef();

  // Smooth continuous 3D Catmull-Rom flight trajectories
  const desktopCurve = useMemo(
    () => new THREE.CatmullRomCurve3(DESKTOP_CONTROL_POINTS, false, 'centripetal'),
    []
  );
  const mobileCurve = useMemo(
    () => new THREE.CatmullRomCurve3(MOBILE_CONTROL_POINTS, false, 'centripetal'),
    []
  );

  // Single Source of Truth for Progress & Kinematic Transforms
  const progressSmoothed = useRef(0);
  const prevProgress = useRef(0);
  const smoothedVelocity = useRef(0);
  const currentPos = useRef(new THREE.Vector3(1.28, 1.50, 8.2));
  const currentRotY = useRef(-0.25);
  const currentPitchX = useRef(0);
  const currentRollZ = useRef(0);

  // Interaction State
  const [hovered, setHovered] = useState(false);
  const jumpTime = useRef(0);
  const isJumping = useRef(false);

  // Gaze tracking
  const cursorRef = useRef({ x: 0, y: 0 });
  const smoothedCursor = useRef({ x: 0, y: 0 });

  // Responsive state detection
  const isMobileRef = useRef(false);
  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 1024;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Digital Eye Blink Timer
  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);

  // =========================================================================
  // 1. PROCEDURAL DIGITAL MICRO-LED MATRIX CANVAS TEXTURE (ARCH EYES ◠ ◠)
  // =========================================================================
  const ledEyeTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep midnight visor screen background
    ctx.fillStyle = '#060B14';
    ctx.fillRect(0, 0, 1024, 512);

    const dotSpacing = 11;
    const dotSize = 4.4;

    const drawArchEye = (centerX, centerY, outerR, innerR) => {
      for (let x = centerX - outerR - 15; x <= centerX + outerR + 15; x += dotSpacing) {
        for (let y = centerY - outerR - 15; y <= centerY + 15; y += dotSpacing) {
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist >= innerR && dist <= outerR && dy <= 0) {
            const angle = Math.atan2(-dy, dx);
            if (angle >= 0.14 * Math.PI && angle <= 0.86 * Math.PI) {
              // Cyan bloom aura
              const grad = ctx.createRadialGradient(x, y, 0, x, y, dotSize * 2.4);
              grad.addColorStop(0, '#00F0FF');
              grad.addColorStop(0.35, 'rgba(0, 210, 255, 0.7)');
              grad.addColorStop(1, 'rgba(0, 210, 255, 0)');
              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(x, y, dotSize * 2.4, 0, Math.PI * 2);
              ctx.fill();

              // High-intensity white-cyan micro-LED dot
              ctx.fillStyle = '#E6FCFF';
              ctx.beginPath();
              ctx.arc(x, y, dotSize * 0.95, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
    };

    // Draw smiling cyan mouth arc (◡) on the micro-LED visor
    const drawSmile = (centerX, centerY, outerR, innerR) => {
      for (let x = centerX - outerR - 15; x <= centerX + outerR + 15; x += dotSpacing) {
        for (let y = centerY - 15; y <= centerY + outerR + 15; y += dotSpacing) {
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist >= innerR && dist <= outerR && dy >= 0) {
            const angle = Math.atan2(dy, dx);
            if (angle >= 0.18 * Math.PI && angle <= 0.82 * Math.PI) {
              const grad = ctx.createRadialGradient(x, y, 0, x, y, dotSize * 2.2);
              grad.addColorStop(0, '#00F0FF');
              grad.addColorStop(0.35, 'rgba(0, 210, 255, 0.7)');
              grad.addColorStop(1, 'rgba(0, 210, 255, 0)');
              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(x, y, dotSize * 2.2, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = '#E6FCFF';
              ctx.beginPath();
              ctx.arc(x, y, dotSize * 0.90, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
    };

    drawArchEye(310, 310, 150, 95);
    drawArchEye(714, 310, 150, 95);
    drawSmile(512, 350, 95, 68);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // =========================================================================
  // 2. PROCEDURAL CHEST ARC REACTOR TEXTURE (12 SEGMENTED CYAN BARS)
  // =========================================================================
  const chestReactorTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0f141d';
    ctx.fillRect(0, 0, 512, 512);

    const cx = 256;
    const cy = 256;
    const numSegments = 12;
    const segRadius = 160;
    const segThickness = 44;

    for (let i = 0; i < numSegments; i++) {
      const startA = (i / numSegments) * Math.PI * 2 - Math.PI / 2 + 0.05;
      const endA = ((i + 0.82) / numSegments) * Math.PI * 2 - Math.PI / 2;

      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = segThickness;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(cx, cy, segRadius, startA, endA);
      ctx.stroke();

      ctx.strokeStyle = '#E6FCFF';
      ctx.lineWidth = segThickness * 0.42;
      ctx.stroke();
    }

    ctx.fillStyle = '#161d28';
    ctx.beginPath();
    ctx.arc(cx, cy, 96, 0, Math.PI * 2);
    ctx.fill();

    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 66);
    coreGrad.addColorStop(0, '#FFFFFF');
    coreGrad.addColorStop(0.3, '#00F0FF');
    coreGrad.addColorStop(0.8, '#0090C4');
    coreGrad.addColorStop(1, '#004A6B');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 66, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Frame animation loop
  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (hoverMode) {
      // DOCKED COMPANION CANVAS HOVER
      const hoverFloatY = Math.sin(t * 2.0) * 0.05;
      const hoverFloatRotY = Math.sin(t * 1.1) * 0.07;
      const hoverFloatRotZ = Math.cos(t * 1.3) * 0.025;

      if (rootRef.current) {
        rootRef.current.position.y = hoverFloatY;
        rootRef.current.rotation.y = hoverFloatRotY;
        rootRef.current.rotation.z = hoverFloatRotZ;
      }

      // Natural downward flipper sway
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.z = -0.20 + Math.sin(t * 2.0) * 0.025;
        rightArmRef.current.rotation.z = 0.20 - Math.sin(t * 2.0) * 0.025;
      }
    } else if (!isStatic) {
      // 1. Single source of truth for normalized scroll progress
      const rawP = isIntro
        ? 0
        : Math.max(0, Math.min(1, scrollProgressRef?.current ?? scrollProgress ?? 0));

      const safeDelta = Math.min(delta, 0.05);

      // Frame-rate independent exponential progress damping (eliminates discrete trackpad/wheel jitter)
      const progressLerpRate = 1 - Math.exp(-safeDelta * 7.5);
      progressSmoothed.current += (rawP - progressSmoothed.current) * progressLerpRate;

      const p = progressSmoothed.current;

      // 2. Signed velocity tracking with low-pass filter (positive = forward, negative = reverse)
      const pDelta = p - prevProgress.current;
      prevProgress.current = p;
      const rawVelocity = pDelta / Math.max(safeDelta, 0.001);
      smoothedVelocity.current += (rawVelocity - smoothedVelocity.current) * (1 - Math.exp(-safeDelta * 6.0));
      const velocity = smoothedVelocity.current;
      const absVel = Math.abs(velocity);

      // 3. Smooth continuous 3D Path Sampling (C1 continuous Catmull-Rom spline)
      const curve = isMobileRef.current ? mobileCurve : desktopCurve;
      const targetPos = curve.getPoint(p);
      const tangent = curve.getTangent(p);

      // Damped position interpolation (guarantees smooth glide to target)
      currentPos.current.lerp(targetPos, 1 - Math.exp(-safeDelta * 9.0));

      // 4. Direction of Travel vs Settle Orientation
      // Idle settle orientation at facility landmark waypoints
      const settleAngle = getIdleAngle(p);

      // Travel heading:
      // Forward motion: faces along path tangent (towards -Z corridor)
      // Reverse motion: faces along -tangent (towards +Z arrival)
      let travelAngle = settleAngle;
      if (velocity >= 0.012) {
        travelAngle = Math.atan2(tangent.x, tangent.z);
      } else if (velocity <= -0.012) {
        travelAngle = Math.atan2(-tangent.x, -tangent.z);
      }

      // Smoothstep blending between settle angle and travel angle
      let motionWeight = 0;
      if (absVel > 0.02) {
        const norm = Math.min(1, (absVel - 0.02) / 0.08);
        motionWeight = norm * norm * (3 - 2 * norm);
      }

      // Shortest-arc angular lerp (prevents 360-deg spins or snapping)
      const targetYaw = lerpAngle(settleAngle, travelAngle, motionWeight);
      currentRotY.current = lerpAngle(
        currentRotY.current,
        targetYaw,
        1 - Math.exp(-safeDelta * 4.5)
      );

      // 5. Natural aerodynamic pitch & lateral banking
      const targetPitchX = Math.min(0.12, Math.max(-0.12, velocity * 0.18));
      currentPitchX.current += (targetPitchX - currentPitchX.current) * (1 - Math.exp(-safeDelta * 4.0));

      const targetRollZ = Math.min(0.14, Math.max(-0.14, -tangent.x * velocity * 0.35));
      currentRollZ.current += (targetRollZ - currentRollZ.current) * (1 - Math.exp(-safeDelta * 4.0));

      // 6. Idle Hover Bobbing (Damped during flight)
      const hoverFactor = 1 - Math.min(1, absVel * 3.0);
      const hoverBob = Math.sin(t * 2.0) * (0.028 * hoverFactor + 0.008);
      const hoverSway = Math.cos(t * 1.4) * (0.018 * hoverFactor);

      // Interactive jump hop
      let jumpOffsetY = 0;
      if (isJumping.current) {
        jumpTime.current += safeDelta * 2.8;
        if (jumpTime.current < 1.0) {
          jumpOffsetY = Math.sin(jumpTime.current * Math.PI) * 0.22;
        } else {
          isJumping.current = false;
          jumpTime.current = 0;
        }
      }

      if (bodyRef.current) {
        bodyRef.current.rotation.x = currentPitchX.current;
      }

      if (rootRef.current) {
        rootRef.current.position.set(
          currentPos.current.x + hoverSway,
          currentPos.current.y + hoverBob + jumpOffsetY,
          currentPos.current.z
        );
        rootRef.current.rotation.y = currentRotY.current;
        rootRef.current.rotation.z = currentRollZ.current;
      }

      // 7. Natural Wing Arm Stabilization
      if (leftArmRef.current && rightArmRef.current) {
        const armSway = Math.sin(t * 2.0) * 0.02 * hoverFactor;
        const armFlightOffset = motionWeight * 0.05;
        leftArmRef.current.rotation.z = -0.20 - armSway + armFlightOffset;
        rightArmRef.current.rotation.z = 0.20 + armSway - armFlightOffset;
        leftArmRef.current.rotation.x = currentPitchX.current * 0.6;
        rightArmRef.current.rotation.x = currentPitchX.current * 0.6;
      }
    }

    // Inquisitive Cursor Gaze Tracking (Grounded & Stable)
    smoothedCursor.current.x += (cursorRef.current.x - smoothedCursor.current.x) * 0.10;
    smoothedCursor.current.y += (cursorRef.current.y - smoothedCursor.current.y) * 0.10;

    const mx = smoothedCursor.current.x;
    const my = smoothedCursor.current.y;

    if (headRef.current) {
      const projectorPitch = isProjecting ? -0.06 : 0;
      // Head subtly looks forward when flying, and looks at user when slowed/settled
      const gazeWeight = 1 - Math.min(1, Math.abs(smoothedVelocity.current) * 2.5);
      const targetRotY = mx * 0.24 * gazeWeight;
      const targetRotX = (0.06 - my * 0.12) * gazeWeight + projectorPitch;

      const safeDelta = Math.min(delta, 0.05);
      const headLerp = 1 - Math.exp(-safeDelta * 5.0);
      headRef.current.rotation.y += (targetRotY - headRef.current.rotation.y) * headLerp;
      headRef.current.rotation.x += (targetRotX - headRef.current.rotation.x) * headLerp;
      // Permanent Roll Lock: upright at all times
      headRef.current.rotation.z = 0;
    }

    // Digital Eye Blinking Animation (Squashes into sharp horizontal scanlines)
    const safeDelta = Math.min(delta, 0.05);
    blinkTimer.current += safeDelta;
    if (blinkTimer.current > 3.8) {
      isBlinking.current = true;
      if (blinkTimer.current > 3.96) {
        blinkTimer.current = Math.random() * 0.8;
        isBlinking.current = false;
      }
    }

    const eyeScaleY = isBlinking.current ? 0.06 : 1.0;
    const eyeLerp = 1 - Math.exp(-safeDelta * 14.0);
    if (eyeDisplayRef.current) {
      eyeDisplayRef.current.scale.y += (eyeScaleY - eyeDisplayRef.current.scale.y) * eyeLerp;
    }
    if (leftEyeMeshRef.current && rightEyeMeshRef.current) {
      leftEyeMeshRef.current.scale.y += (eyeScaleY - leftEyeMeshRef.current.scale.y) * eyeLerp;
      rightEyeMeshRef.current.scale.y += (eyeScaleY - rightEyeMeshRef.current.scale.y) * eyeLerp;
    }

    if (projectorLensRef.current) {
      projectorLensRef.current.material.opacity = isProjecting ? 0.95 : 0.45;
    }
  });

  // =========================================================================
  // 3. PHOTOREALISTIC STUDIO MATERIALS MATCHING REFERENCE RENDER
  // =========================================================================
  const pearlCeramicMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: hovered ? '#FFFFFF' : '#F5F6FA',
        roughness: 0.16,
        metalness: 0.04,
        clearcoat: 0.94, // High-gloss lacquered clearcoat reflection
        clearcoatRoughness: 0.08,
        reflectivity: 0.90,
      }),
    [hovered]
  );

  const visorGlassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#080E1A',
        roughness: 0.08,
        metalness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        transparent: true,
        opacity: 0.94,
        reflectivity: 0.95,
      }),
    []
  );

  const cobaltThrusterMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#152A4A', // Exact deep cobalt-navy from reference thruster base
        roughness: 0.24,
        metalness: 0.65,
        clearcoat: 0.6,
        clearcoatRoughness: 0.15,
      }),
    []
  );

  const titaniumTrimMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9EABB8',
        roughness: 0.24,
        metalness: 0.88,
      }),
    []
  );

  const darkMechanicalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#141822',
        roughness: 0.35,
        metalness: 0.75,
      }),
    []
  );

  const cyanEmissiveMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#00E5FF',
      }),
    []
  );

  const cyanGlassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#00D8F6',
        emissive: '#0090B8',
        emissiveIntensity: 0.50,
        roughness: 0.12,
        metalness: 0.25,
        transmission: 0.75,
        transparent: true,
        opacity: 0.90,
        ior: 1.45,
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
      <group ref={hoverGroupRef}>
        {/* ============================================================== */}
        {/* 1. HEAD ASSEMBLY (CUTE ROUND HELMET + CURVED VISOR FACE)       */}
        {/* ============================================================== */}
        <group ref={headRef} position={[0, 0.42, 0]}>
          {/* Main Lacquered White Rear Helmet Shell (Recessed to Z = -0.08) */}
          <mesh position={[0, 0, -0.08]} castShadow receiveShadow material={pearlCeramicMat} scale={[1.10, 0.98, 1.0]}>
            <sphereGeometry args={[0.48, 48, 40]} />
          </mesh>

          {/* Smooth Visor Outer Lip Bezel Frame (Encircles the curved visor at Z = 0.34) */}
          <mesh position={[0, 0.02, 0.34]} scale={[1.06, 0.86, 0.9]} material={pearlCeramicMat} castShadow>
            <torusGeometry args={[0.42, 0.045, 24, 52]} />
          </mesh>

          {/* Curved Obsidian Visor Glass Screen (Sits proudly forward at Z = 0.22, reaches Z = 0.58) */}
          <mesh
            position={[0, 0.02, 0.22]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[1.04, 0.84, 0.84]}
            material={visorGlassMat}
            castShadow
          >
            <sphereGeometry args={[0.44, 48, 36, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
          </mesh>

          {/* ============================================================ */}
          {/* DIGITAL MICRO-LED MATRIX DISPLAY SCREEN (VISOR FACE)         */}
          {/* ============================================================ */}
          {ledEyeTexture && (
            <group ref={eyeDisplayRef} position={[0, 0.04, 0.575]} renderOrder={9}>
              <mesh>
                <planeGeometry args={[0.54, 0.28]} />
                <meshBasicMaterial
                  map={ledEyeTexture}
                  transparent
                  opacity={0.96}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
            </group>
          )}

          {/* High-Definition 3D Luminous Arch Meshes for Expressive Smiling Eyes (◠ ◠) at Z = 0.585 */}
          <group position={[0, 0.04, 0.585]}>
            {/* Left Eye Glowing Cyan Arch (◠) */}
            <group ref={leftEyeMeshRef} position={[-0.145, 0, 0]} renderOrder={10}>
              <mesh rotation={[0, 0, Math.PI * 0.14]}>
                <torusGeometry args={[0.078, 0.024, 20, 36, Math.PI * 0.72]} />
                <meshBasicMaterial color="#00E5FF" toneMapped={false} />
              </mesh>
              {/* Inner High-Intensity White Core Segment */}
              <mesh position={[0, 0, 0.005]} rotation={[0, 0, Math.PI * 0.15]} renderOrder={11}>
                <torusGeometry args={[0.078, 0.010, 16, 32, Math.PI * 0.70]} />
                <meshBasicMaterial color="#E8FFFF" toneMapped={false} />
              </mesh>
            </group>

            {/* Right Eye Glowing Cyan Arch (◠) */}
            <group ref={rightEyeMeshRef} position={[0.145, 0, 0]} renderOrder={10}>
              <mesh rotation={[0, 0, Math.PI * 0.14]}>
                <torusGeometry args={[0.078, 0.024, 20, 36, Math.PI * 0.72]} />
                <meshBasicMaterial color="#00E5FF" toneMapped={false} />
              </mesh>
              {/* Inner High-Intensity White Core Segment */}
              <mesh position={[0, 0, 0.005]} rotation={[0, 0, Math.PI * 0.15]} renderOrder={11}>
                <torusGeometry args={[0.078, 0.010, 16, 32, Math.PI * 0.70]} />
                <meshBasicMaterial color="#E8FFFF" toneMapped={false} />
              </mesh>
            </group>

            {/* Expressive Cute Smiling Mouth Arch (◡) */}
            <group position={[0, -0.092, 0]} renderOrder={10}>
              <mesh rotation={[0, 0, Math.PI * 1.15]}>
                <torusGeometry args={[0.052, 0.015, 16, 32, Math.PI * 0.70]} />
                <meshBasicMaterial color="#00E5FF" toneMapped={false} />
              </mesh>
              {/* Inner High-Intensity White Core Segment */}
              <mesh position={[0, 0, 0.005]} rotation={[0, 0, Math.PI * 1.15]} renderOrder={11}>
                <torusGeometry args={[0.052, 0.007, 16, 32, Math.PI * 0.68]} />
                <meshBasicMaterial color="#E8FFFF" toneMapped={false} />
              </mesh>
            </group>
          </group>

          {/* Forward Soft Eye Glow Projection */}
          <pointLight position={[0, 0.04, 0.75]} color="#00E5FF" intensity={1.2} distance={2.5} decay={2} />

          {/* ============================================================ */}
          {/* PROMINENT HEADPHONE EAR CUPS + REAR CYAN AERODYNAMIC FINS    */}
          {/* ============================================================ */}
          {/* Left Ear Module */}
          <group position={[-0.56, 0.02, 0]}>
            {/* Outer White Cylindrical Bezel with Beveled Lip */}
            <mesh rotation={[0, 0, Math.PI / 2]} material={pearlCeramicMat} castShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.07, 36]} />
            </mesh>
            {/* Recessed Dark Metallic Well */}
            <mesh position={[-0.036, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={darkMechanicalMat}>
              <cylinderGeometry args={[0.14, 0.14, 0.018, 36]} />
            </mesh>
            {/* Concentric Glowing Cyan Blue LED Ring */}
            <mesh position={[-0.044, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={cyanEmissiveMat}>
              <torusGeometry args={[0.088, 0.015, 16, 36]} />
            </mesh>
            {/* Center Cyan Dot */}
            <mesh position={[-0.046, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={cyanEmissiveMat}>
              <cylinderGeometry args={[0.036, 0.036, 0.014, 24]} />
            </mesh>

            {/* Rear Cyan Aerodynamic Stabilizer Fin (Angled backward and upward!) */}
            <group position={[0.02, 0.08, -0.12]} rotation={[-0.45, 0, -0.15]}>
              <mesh material={cyanGlassMat} castShadow>
                <boxGeometry args={[0.035, 0.20, 0.16]} />
              </mesh>
              <mesh position={[0, 0.10, 0]} material={cobaltThrusterMat}>
                <coneGeometry args={[0.032, 0.09, 4]} />
              </mesh>
            </group>
          </group>

          {/* Right Ear Module */}
          <group position={[0.56, 0.02, 0]}>
            {/* Outer White Cylindrical Bezel with Beveled Lip */}
            <mesh rotation={[0, 0, Math.PI / 2]} material={pearlCeramicMat} castShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.07, 36]} />
            </mesh>
            {/* Recessed Dark Metallic Well */}
            <mesh position={[0.036, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={darkMechanicalMat}>
              <cylinderGeometry args={[0.14, 0.14, 0.018, 36]} />
            </mesh>
            {/* Concentric Glowing Cyan Blue LED Ring */}
            <mesh position={[0.044, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={cyanEmissiveMat}>
              <torusGeometry args={[0.088, 0.015, 16, 36]} />
            </mesh>
            {/* Center Cyan Dot */}
            <mesh position={[0.046, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={cyanEmissiveMat}>
              <cylinderGeometry args={[0.036, 0.036, 0.014, 24]} />
            </mesh>

            {/* Rear Cyan Aerodynamic Stabilizer Fin (Angled backward and upward!) */}
            <group position={[-0.02, 0.08, -0.12]} rotation={[-0.45, 0, 0.15]}>
              <mesh material={cyanGlassMat} castShadow>
                <boxGeometry args={[0.035, 0.20, 0.16]} />
              </mesh>
              <mesh position={[0, 0.10, 0]} material={cobaltThrusterMat}>
                <coneGeometry args={[0.032, 0.09, 4]} />
              </mesh>
            </group>
          </group>
        </group>

        {/* ============================================================== */}
        {/* 2. RECESSED NARROW MAGNETIC NECK SEAM                          */}
        {/* ============================================================== */}
        <mesh position={[0, -0.05, 0]} material={darkMechanicalMat}>
          <cylinderGeometry args={[0.22, 0.22, 0.06, 32]} />
        </mesh>

        {/* ============================================================== */}
        {/* 3. PEAR-EGG BODY + CHEST SHIELD ARC REACTOR + COBALT THRUSTER  */}
        {/* ============================================================== */}
        <group ref={bodyRef} position={[0, -0.10, 0]}>
          {/* Main Glossy Pearl White Torso Capsule */}
          <mesh
            position={[0, -0.22, 0]}
            scale={[0.88, 1.05, 0.82]}
            material={pearlCeramicMat}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[0.45, 40, 36]} />
          </mesh>

          {/* ============================================================ */}
          {/* SHIELD-SHAPED CHEST ARC REACTOR EMBLEM                       */}
          {/* ============================================================ */}
          <group position={[0, -0.19, 0.38]} rotation={[-0.14, 0, 0]}>
            {/* Inverted Rounded Shield Outer Bezel in Pearl White */}
            <mesh rotation={[Math.PI / 2, 0, Math.PI]} material={pearlCeramicMat} scale={[1.18, 0.35, 1.05]} castShadow>
              <cylinderGeometry args={[0.18, 0.14, 0.06, 3]} />
            </mesh>

            {/* Titanium Inner Bezel Rim */}
            <mesh position={[0, 0, 0.012]} rotation={[Math.PI / 2, 0, Math.PI]} material={titaniumTrimMat} scale={[1.10, 0.25, 0.98]}>
              <cylinderGeometry args={[0.17, 0.13, 0.05, 3]} />
            </mesh>

            {/* High-Resolution Segmented Arc Reactor Power Faceplate */}
            {chestReactorTexture && (
              <mesh position={[0, 0, 0.026]}>
                <circleGeometry args={[0.135, 36]} />
                <meshBasicMaterial map={chestReactorTexture} />
              </mesh>
            )}

            {/* Central Holographic Core Projector Lens */}
            <mesh
              ref={projectorLensRef}
              position={[0, 0, 0.038]}
              rotation={[Math.PI / 2, 0, 0]}
              material={cyanEmissiveMat}
            >
              <cylinderGeometry args={[0.034, 0.034, 0.018, 24]} />
            </mesh>

            {/* Soft Controlled Chest Glow */}
            <pointLight position={[0, 0, 0.08]} color="#00E5FF" intensity={0.9} distance={1.4} decay={2} />

            {/* Volumetric Hologram Cone (Activates during Section 3 Projection) */}
            <group position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh ref={projectorBeamRef} position={[0, 1.4, 0]} visible={isProjecting}>
                <coneGeometry args={[1.2, 2.8, 32, 1, true]} />
                <meshBasicMaterial
                  color="#00E5FF"
                  transparent
                  opacity={0.35}
                  side={THREE.DoubleSide}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
            </group>
          </group>

          {/* ============================================================ */}
          {/* TAPERED METALLIC COBALT-NAVY HOVER THRUSTER CONE             */}
          {/* ============================================================ */}
          <group position={[0, -0.58, 0]}>
            {/* Deep Cobalt Thruster Bell (Smooth taper matching reference) */}
            <mesh material={cobaltThrusterMat} castShadow>
              <cylinderGeometry args={[0.24, 0.11, 0.22, 36]} />
            </mesh>

            {/* Rounded Bottom Cap */}
            <mesh position={[0, -0.11, 0]} material={cobaltThrusterMat} scale={[1, 0.7, 1]}>
              <sphereGeometry args={[0.11, 28, 24]} />
            </mesh>

            {/* Glowing Cyan Thruster Exhaust Ring */}
            <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]} material={cyanEmissiveMat}>
              <torusGeometry args={[0.15, 0.014, 16, 36]} />
            </mesh>

            {/* Soft Downward Propulsion Light */}
            <pointLight position={[0, -0.22, 0]} color="#00E5FF" intensity={1.5} distance={2.4} decay={2} />
          </group>

          {/* ============================================================ */}
          {/* 4. SEAMLESS TEARDROP FLIPPER ARMS (HANGING NATURALLY DOWN!)   */}
          {/* ============================================================ */}
          {/* Left Wing Arm */}
          <group ref={leftArmRef} position={[-0.40, -0.14, 0]}>
            {/* Polished Titanium Shoulder Ball Bearing */}
            <mesh material={titaniumTrimMat}>
              <sphereGeometry args={[0.06, 24, 24]} />
            </mesh>
            {/* Smooth Lacquered Flipper Arm Body (Hangs naturally along torso) */}
            <mesh position={[-0.02, -0.12, 0.01]} material={pearlCeramicMat} castShadow>
              <capsuleGeometry args={[0.048, 0.22, 16, 28]} />
            </mesh>
            {/* Dark Mechanical Inner Tip Accent */}
            <mesh position={[-0.02, -0.21, 0.015]} material={darkMechanicalMat}>
              <capsuleGeometry args={[0.035, 0.06, 8, 16]} />
            </mesh>
          </group>

          {/* Right Wing Arm */}
          <group ref={rightArmRef} position={[0.40, -0.14, 0]}>
            {/* Polished Titanium Shoulder Ball Bearing */}
            <mesh material={titaniumTrimMat}>
              <sphereGeometry args={[0.06, 24, 24]} />
            </mesh>
            {/* Smooth Lacquered Flipper Arm Body (Hangs naturally along torso) */}
            <mesh position={[0.02, -0.12, 0.01]} material={pearlCeramicMat} castShadow>
              <capsuleGeometry args={[0.048, 0.22, 16, 28]} />
            </mesh>
            {/* Dark Mechanical Inner Tip Accent */}
            <mesh position={[0.02, -0.21, 0.015]} material={darkMechanicalMat}>
              <capsuleGeometry args={[0.035, 0.06, 8, 16]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
