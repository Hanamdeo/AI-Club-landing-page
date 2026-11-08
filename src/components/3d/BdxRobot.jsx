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
  activeNavId = 'hero',
}) {
  const rootRef = useRef();
  const hoverGroupRef = useRef();
  const bodyRef = useRef();
  const headRef = useRef();
  const eyeDisplayRef = useRef();
  const leftEyeMeshRef = useRef();
  const rightEyeMeshRef = useRef();
  const mouthMeshRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const projectorBeamRef = useRef();
  const projectorLensRef = useRef();

  // Procedural Visor Dynamic Face Canvas & Texture
  const faceCanvasRef = useRef(null);
  const faceTextureRef = useRef(null);
  const lastRenderStateRef = useRef({
    emotion: '',
    blink: 1,
    gazeX: 0,
    gazeY: 0,
    step: 0,
  });

  const { canvas: visorCanvas, texture: visorTexture } = useMemo(() => {
    if (typeof document === 'undefined') return { canvas: null, texture: null };
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 512;
    const t = new THREE.CanvasTexture(c);
    t.needsUpdate = true;
    return { canvas: c, texture: t };
  }, []);

  faceCanvasRef.current = visorCanvas;
  faceTextureRef.current = visorTexture;

  // Emotion State Machine & Gestures
  const currentEmotionRef = useRef('IDLE');
  const emotionTimerRef = useRef(0);
  const emotionDurationRef = useRef(0);
  const zoneCooldownRef = useRef(0);
  const lastZoneRef = useRef(-1);
  const welcomeTriggeredRef = useRef(false);
  const idleTimeRef = useRef(0);

  // Additive Gesture Offsets (decoupled from spline flight)
  const gestureTiltZ = useRef(0);
  const gestureNodX = useRef(0);
  const gestureBounceY = useRef(0);
  const gestureArmFlutter = useRef(0);
  const meshScaleSmoothed = useRef(1.0);

  const triggerEmotion = useCallback((emotion, duration = 2.4) => {
    currentEmotionRef.current = emotion;
    emotionTimerRef.current = 0;
    emotionDurationRef.current = duration;
  }, []);

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
      triggerEmotion('EXCITED', 2.6);
      audioManager.playChirp();
      if (onToggleProjector) onToggleProjector();
    },
    [onToggleProjector, triggerEmotion]
  );

  // Digital Eye Blink Timer
  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);

  // Welcome Visitor on First Scene Entry
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!welcomeTriggeredRef.current) {
        welcomeTriggeredRef.current = true;
        triggerEmotion('EXCITED', 2.8);
        audioManager.playChirp();
      }
    }, 850);
    return () => clearTimeout(timer);
  }, [triggerEmotion]);

  // Reactive response when projecting starts or active nav changes
  useEffect(() => {
    if (isProjecting) {
      triggerEmotion('EXCITED', 2.8);
      audioManager.playChirp();
    }
  }, [isProjecting, triggerEmotion]);

  useEffect(() => {
    if (activeNavId === 'events') {
      triggerEmotion('HAPPY', 2.4);
    } else if (activeNavId === 'discussions' || activeNavId === 'radar') {
      triggerEmotion('THINKING', 2.4);
    } else if (activeNavId === 'projects') {
      triggerEmotion('CURIOUS', 2.4);
    }
  }, [activeNavId, triggerEmotion]);

  // =========================================================================
  // 1. PROCEDURAL VISOR EMOTION FACE DRAWER (MICRO-LED MATRIX)
  // =========================================================================
  const drawVisorFace = useCallback((ctx, emotion, blinkScale, gazeX, gazeY, time) => {
    if (!ctx) return;
    const w = 1024;
    const h = 512;

    // 1. Deep Midnight Obsidian Screen Background
    ctx.fillStyle = '#060B14';
    ctx.fillRect(0, 0, w, h);

    const dotSpacing = 11;
    const dotSize = 4.4;

    const drawLedDot = (x, y, size = dotSize, color = '#00F0FF', core = '#E6FCFF') => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 2.3);
      grad.addColorStop(0, color);
      grad.addColorStop(0.35, 'rgba(0, 210, 255, 0.65)');
      grad.addColorStop(1, 'rgba(0, 210, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, size * 2.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.92, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawBlush = (cx, cy) => {
      for (let dx = -20; dx <= 20; dx += 11) {
        for (let dy = -6; dy <= 6; dy += 11) {
          drawLedDot(cx + dx, cy + dy, 3.4, '#FF4D82', '#FFEBF1');
        }
      }
    };

    const drawSmile = (cx, cy, outerR, innerR, startAngle = 0.18 * Math.PI, endAngle = 0.82 * Math.PI) => {
      for (let x = cx - outerR - 15; x <= cx + outerR + 15; x += dotSpacing) {
        for (let y = cy - 15; y <= cy + outerR + 15; y += dotSpacing) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= innerR && dist <= outerR && dy >= 0) {
            const angle = Math.atan2(dy, dx);
            if (angle >= startAngle && angle <= endAngle) {
              drawLedDot(x, y, dotSize * 0.95);
            }
          }
        }
      }
    };

    const drawFrown = (cx, cy, outerR, innerR, startAngle = 0.18 * Math.PI, endAngle = 0.82 * Math.PI) => {
      for (let x = cx - outerR - 15; x <= cx + outerR + 15; x += dotSpacing) {
        for (let y = cy - outerR - 15; y <= cy + 15; y += dotSpacing) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= innerR && dist <= outerR && dy <= 0) {
            const angle = Math.atan2(-dy, dx);
            if (angle >= startAngle && angle <= endAngle) {
              drawLedDot(x, y, dotSize * 0.95);
            }
          }
        }
      }
    };

    // Blinking check: if eyes are closed, draw micro-scanlines
    if (blinkScale < 0.18) {
      for (let x = 210; x <= 410; x += dotSpacing) {
        drawLedDot(x, 290, dotSize * 0.85);
      }
      for (let x = 614; x <= 814; x += dotSpacing) {
        drawLedDot(x, 290, dotSize * 0.85);
      }
      drawSmile(512, 355, 80, 58);
      return;
    }

    // Draw eyes with vertical blink squash transform
    ctx.save();
    ctx.translate(0, 290);
    ctx.scale(1, Math.max(0.18, blinkScale));
    ctx.translate(0, -290);

    const drawArchEye = (cx, cy, outerR, innerR, startA = 0.14 * Math.PI, endA = 0.86 * Math.PI) => {
      for (let x = cx - outerR - 15; x <= cx + outerR + 15; x += dotSpacing) {
        for (let y = cy - outerR - 15; y <= cy + 15; y += dotSpacing) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= innerR && dist <= outerR && dy <= 0) {
            const angle = Math.atan2(-dy, dx);
            if (angle >= startA && angle <= endA) {
              drawLedDot(x, y);
            }
          }
        }
      }
    };

    const drawDownArchEye = (cx, cy, outerR, innerR, startA = 0.15 * Math.PI, endA = 0.85 * Math.PI) => {
      for (let x = cx - outerR - 15; x <= cx + outerR + 15; x += dotSpacing) {
        for (let y = cy - 15; y <= cy + outerR + 15; y += dotSpacing) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= innerR && dist <= outerR && dy >= 0) {
            const angle = Math.atan2(dy, dx);
            if (angle >= startA && angle <= endA) {
              drawLedDot(x, y);
            }
          }
        }
      }
    };

    const drawCaretEye = (apexX, apexY, width = 80, height = 75) => {
      for (let step = 0; step <= 8; step++) {
        const frac = step / 8;
        // Left leg
        const lx = apexX - frac * width;
        const ly = apexY + frac * height;
        drawLedDot(lx, ly, dotSize * 1.05);
        drawLedDot(lx + 4, ly, dotSize * 0.8);
        // Right leg
        const rx = apexX + frac * width;
        const ry = apexY + frac * height;
        drawLedDot(rx, ry, dotSize * 1.05);
        drawLedDot(rx - 4, ry, dotSize * 0.8);
      }
    };

    const drawRoundEye = (cx, cy, gazePxX, gazePxY) => {
      const outerR = 115;
      const innerR = 80;
      for (let x = cx - outerR - 10; x <= cx + outerR + 10; x += dotSpacing) {
        for (let y = cy - outerR - 10; y <= cy + outerR + 10; y += dotSpacing) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= innerR && dist <= outerR) {
            drawLedDot(x, y, dotSize * 0.95);
          }
        }
      }
      const px = cx + gazePxX;
      const py = cy + gazePxY;
      for (let x = px - 36; x <= px + 36; x += dotSpacing) {
        for (let y = py - 36; y <= py + 36; y += dotSpacing) {
          const dx = x - px;
          const dy = y - py;
          if (dx * dx + dy * dy <= 34 * 34) {
            drawLedDot(x, y, dotSize * 1.05, '#00F0FF', '#FFFFFF');
          }
        }
      }
    };

    const drawThinkingBars = () => {
      for (let x = 220; x <= 400; x += dotSpacing) {
        drawLedDot(x, 276, dotSize * 1.0);
        drawLedDot(x, 302, dotSize * 1.0);
      }
      for (let x = 624; x <= 804; x += dotSpacing) {
        drawLedDot(x, 276, dotSize * 1.0);
        drawLedDot(x, 302, dotSize * 1.0);
      }
      const pulseIndex = Math.floor((time * 4) % 3);
      const dots = [476, 512, 548];
      dots.forEach((x, idx) => {
        const isActive = idx === pulseIndex;
        drawLedDot(
          x,
          289,
          isActive ? dotSize * 1.2 : dotSize * 0.7,
          isActive ? '#00FFAA' : '#007A99',
          isActive ? '#FFFFFF' : '#66D9FF'
        );
      });
    };

    if (emotion === 'HAPPY') {
      drawArchEye(310, 285, 150, 92, 0.10 * Math.PI, 0.90 * Math.PI);
      drawArchEye(714, 285, 150, 92, 0.10 * Math.PI, 0.90 * Math.PI);
      drawBlush(235, 345);
      drawBlush(789, 345);
    } else if (emotion === 'EXCITED') {
      drawCaretEye(310, 235);
      drawCaretEye(714, 235);
      drawBlush(235, 345);
      drawBlush(789, 345);
    } else if (emotion === 'CURIOUS') {
      const pxX = Math.max(-28, Math.min(28, gazeX * 26));
      const pxY = Math.max(-18, Math.min(18, -gazeY * 18));
      drawRoundEye(310, 285, pxX, pxY);
      drawRoundEye(714, 285, pxX, pxY);
    } else if (emotion === 'THINKING') {
      drawThinkingBars();
    } else if (emotion === 'SAD') {
      drawDownArchEye(310, 295, 142, 95);
      drawDownArchEye(714, 295, 142, 95);
    } else {
      // Default IDLE
      drawArchEye(310, 290, 145, 95);
      drawArchEye(714, 290, 145, 95);
    }

    ctx.restore();

    // Draw mouth (outside the blink scale squash)
    if (emotion === 'CURIOUS') {
      const cx = 512;
      const cy = 368;
      for (let x = cx - 36; x <= cx + 36; x += dotSpacing) {
        for (let y = cy - 36; y <= cy + 36; y += dotSpacing) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= 18 && dist <= 36) {
            drawLedDot(x, y, dotSize * 0.9);
          }
        }
      }
    } else if (emotion === 'THINKING') {
      for (let x = 468; x <= 556; x += dotSpacing) {
        drawLedDot(x, 370, dotSize * 0.95);
      }
    } else if (emotion === 'SAD') {
      drawFrown(512, 395, 82, 58);
    } else if (emotion === 'EXCITED') {
      drawSmile(512, 350, 115, 68, 0.14 * Math.PI, 0.86 * Math.PI);
    } else if (emotion === 'HAPPY') {
      drawSmile(512, 352, 105, 72, 0.16 * Math.PI, 0.84 * Math.PI);
    } else {
      drawSmile(512, 355, 95, 68);
    }
  }, []);

  // Initial Face Render
  useEffect(() => {
    if (visorCanvas) {
      drawVisorFace(visorCanvas.getContext('2d'), 'IDLE', 1.0, 0, 0, 0);
      if (visorTexture) visorTexture.needsUpdate = true;
    }
  }, [visorCanvas, visorTexture, drawVisorFace]);

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
    const safeDelta = Math.min(delta, 0.05);

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

      // 7. Natural Wing Arm Stabilization + Expression Flutter
      if (leftArmRef.current && rightArmRef.current) {
        const armSway = Math.sin(t * 2.0) * 0.02 * hoverFactor;
        const armFlightOffset = motionWeight * 0.05;
        leftArmRef.current.rotation.z = -0.20 - armSway + armFlightOffset - gestureArmFlutter.current;
        rightArmRef.current.rotation.z = 0.20 + armSway - armFlightOffset + gestureArmFlutter.current;
        leftArmRef.current.rotation.x = currentPitchX.current * 0.6;
        rightArmRef.current.rotation.x = currentPitchX.current * 0.6;
      }

      // 8. Emotion State Machine & Meaningful Zone Triggers
      zoneCooldownRef.current += safeDelta;
      let currentZone = 0;
      if (p >= 0.85) currentZone = 3;
      else if (p >= 0.60) currentZone = 2;
      else if (p >= 0.28) currentZone = 1;

      if (currentZone !== lastZoneRef.current && zoneCooldownRef.current > 4.5) {
        lastZoneRef.current = currentZone;
        zoneCooldownRef.current = 0;
        if (currentZone === 1) {
          // Foundation Bay: Robot inspects the high-density computing clusters
          triggerEmotion('CURIOUS', 2.8);
        } else if (currentZone === 2) {
          // Event Horizon / Interactive Server: Robot evaluates data streams
          triggerEmotion('THINKING', 2.8);
        } else if (currentZone === 3) {
          // Projection Chamber: Robot celebrates arrival at terminal
          triggerEmotion('EXCITED', 2.8);
          audioManager.playChirp();
        }
      }

      // Idle Curiosity: When visitor pauses, robot glances and observes
      if (absVel < 0.005) {
        idleTimeRef.current += safeDelta;
        if (idleTimeRef.current > 5.5 && currentEmotionRef.current === 'IDLE') {
          triggerEmotion(Math.random() > 0.4 ? 'CURIOUS' : 'HAPPY', 2.2);
          idleTimeRef.current = 0;
        }
      } else {
        idleTimeRef.current = 0;
      }
    }

    // Emotion Countdown
    emotionTimerRef.current += safeDelta;
    if (currentEmotionRef.current !== 'IDLE' && emotionTimerRef.current >= emotionDurationRef.current) {
      currentEmotionRef.current = 'IDLE';
    }

    const currentEmotion = currentEmotionRef.current;
    const emotionProgress = Math.min(1, emotionTimerRef.current / Math.max(emotionDurationRef.current, 0.001));

    // Dynamic Additive Gesture Offsets
    let targetGestureTiltZ = 0;
    let targetGestureNodX = 0;
    let targetGestureBounceY = 0;
    let targetArmFlutter = 0;

    if (currentEmotion === 'EXCITED') {
      const hopPhase = emotionProgress * Math.PI * 4;
      targetGestureBounceY = Math.max(0, Math.sin(hopPhase)) * 0.15 * (1 - emotionProgress);
      targetArmFlutter = Math.sin(t * 22) * 0.14 * (1 - emotionProgress);
      targetGestureTiltZ = Math.sin(t * 8) * 0.06 * (1 - emotionProgress);
    } else if (currentEmotion === 'HAPPY') {
      const bouncePhase = emotionProgress * Math.PI * 2;
      targetGestureBounceY = Math.max(0, Math.sin(bouncePhase)) * 0.08 * (1 - emotionProgress);
      targetGestureNodX = Math.sin(bouncePhase) * 0.04;
    } else if (currentEmotion === 'CURIOUS') {
      targetGestureTiltZ = 0.14; // ~8 deg playful inquisitiveness tilt
      targetGestureNodX = -0.05;
    } else if (currentEmotion === 'THINKING') {
      targetGestureNodX = -0.08;
      targetGestureTiltZ = -0.04;
    } else if (currentEmotion === 'SAD') {
      targetGestureNodX = 0.09;
      targetGestureBounceY = -0.03;
    }

    const gestureLerp = 1 - Math.exp(-safeDelta * 6.0);
    gestureTiltZ.current += (targetGestureTiltZ - gestureTiltZ.current) * gestureLerp;
    gestureNodX.current += (targetGestureNodX - gestureNodX.current) * gestureLerp;
    gestureBounceY.current += (targetGestureBounceY - gestureBounceY.current) * (1 - Math.exp(-safeDelta * 10.0));
    gestureArmFlutter.current += (targetArmFlutter - gestureArmFlutter.current) * gestureLerp;

    // Apply Root Additive Bounce
    if (rootRef.current && !isStatic && !hoverMode) {
      rootRef.current.position.y += gestureBounceY.current;
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

      const headLerp = 1 - Math.exp(-safeDelta * 5.0);
      headRef.current.rotation.y += (targetRotY - headRef.current.rotation.y) * headLerp;
      headRef.current.rotation.x += (targetRotX + gestureNodX.current - headRef.current.rotation.x) * headLerp;
      headRef.current.rotation.z += (gestureTiltZ.current - headRef.current.rotation.z) * headLerp;
    }

    // Digital Eye Blinking Animation
    blinkTimer.current += safeDelta;
    if (blinkTimer.current > 3.8) {
      isBlinking.current = true;
      if (blinkTimer.current > 3.96) {
        blinkTimer.current = Math.random() * 0.8;
        isBlinking.current = false;
      }
    }

    // Dynamic 3D Mesh Scaling (Arch eyes & mouth active in IDLE and HAPPY, smoothly hidden in other emotions)
    const targetMeshScale = (currentEmotion === 'IDLE' || currentEmotion === 'HAPPY') ? 1.0 : 0.0;
    meshScaleSmoothed.current += (targetMeshScale - meshScaleSmoothed.current) * (1 - Math.exp(-safeDelta * 14.0));
    const s = meshScaleSmoothed.current;
    const eyeScaleY = (isBlinking.current ? 0.06 : 1.0) * s;

    if (leftEyeMeshRef.current && rightEyeMeshRef.current) {
      leftEyeMeshRef.current.scale.set(s, eyeScaleY, s);
      rightEyeMeshRef.current.scale.set(s, eyeScaleY, s);
    }
    if (mouthMeshRef.current) {
      mouthMeshRef.current.scale.set(s, s, s);
    }

    // High-Performance Dynamic Face Canvas Redraw (Zero overhead when idle/flying)
    let needsRedraw = false;
    const currentBlink = isBlinking.current ? 0.06 : 1.0;
    const timeStep = Math.floor(t * 4);

    if (lastRenderStateRef.current.emotion !== currentEmotion) {
      needsRedraw = true;
    }
    if (Math.abs(lastRenderStateRef.current.blink - currentBlink) > 0.05) {
      needsRedraw = true;
    }
    if (currentEmotion === 'THINKING' && lastRenderStateRef.current.step !== timeStep) {
      needsRedraw = true;
    }
    if (currentEmotion === 'CURIOUS') {
      if (
        Math.abs(lastRenderStateRef.current.gazeX - mx) > 0.06 ||
        Math.abs(lastRenderStateRef.current.gazeY - my) > 0.06
      ) {
        needsRedraw = true;
      }
    }

    if (needsRedraw && faceCanvasRef.current && faceTextureRef.current) {
      lastRenderStateRef.current = {
        emotion: currentEmotion,
        blink: currentBlink,
        gazeX: mx,
        gazeY: my,
        step: timeStep,
      };
      drawVisorFace(
        faceCanvasRef.current.getContext('2d'),
        currentEmotion,
        currentBlink,
        mx,
        my,
        t
      );
      faceTextureRef.current.needsUpdate = true;
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
        if (currentEmotionRef.current === 'IDLE') {
          triggerEmotion('HAPPY', 1.8);
        }
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
          {/* DIGITAL MICRO-LED MATRIX DISPLAY SCREEN (VISOR FACE) */}
          {visorTexture && (
            <group ref={eyeDisplayRef} position={[0, 0.04, 0.575]} renderOrder={9}>
              <mesh>
                <planeGeometry args={[0.54, 0.28]} />
                <meshBasicMaterial
                  map={visorTexture}
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
            <group ref={mouthMeshRef} position={[0, -0.092, 0]} renderOrder={10}>
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
