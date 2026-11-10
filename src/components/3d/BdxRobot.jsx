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

// Facility corridor spline control points across 6 Progressive Depth Zones (Centrally Aligned)
const DESKTOP_CONTROL_POINTS = [
  new THREE.Vector3(0.00, 1.45, 8.0),    // p = 0.00: Zone 01 Entry threshold (centered)
  new THREE.Vector3(0.00, 1.40, -1.0),   // p = 0.20: Zone 02 Featured display (centered)
  new THREE.Vector3(0.00, 1.35, -13.0),  // p = 0.40: Zone 03 Community collaborative aisle (centered)
  new THREE.Vector3(0.00, 1.30, -24.0),  // p = 0.60: Zone 04 Research intelligence core (centered)
  new THREE.Vector3(0.00, 1.25, -35.0),  // p = 0.80: Zone 05 Projects hardware archive (centered)
  new THREE.Vector3(0.00, 1.20, -45.0),  // p = 1.00: Zone 06 Discovery final landmark hub (centered)
];

const MOBILE_CONTROL_POINTS = [
  new THREE.Vector3(0.00, 1.30, 8.0),    // p = 0.00 (centered)
  new THREE.Vector3(0.00, 1.25, -1.0),   // p = 0.20 (centered)
  new THREE.Vector3(0.00, 1.20, -13.0),  // p = 0.40 (centered)
  new THREE.Vector3(0.00, 1.15, -24.0),  // p = 0.60 (centered)
  new THREE.Vector3(0.00, 1.10, -35.0),  // p = 0.80 (centered)
  new THREE.Vector3(0.00, 1.05, -45.0),  // p = 1.00 (centered)
];

// Continuous idle settle orientation: Perfectly centered facing forward towards camera
function getIdleAngle() {
  return 0.0;
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
  const currentPos = useRef(new THREE.Vector3(0.00, 1.45, 8.0));
  const currentRotY = useRef(0.0);
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

  // =========================================================================
  // 1. PROCEDURAL VISOR EMOTION FACE DRAWER (HIGH-RES OLED DISPLAY)
  // Accurate, highly visible emojis (😊, 😂, 😎, 😢, 🤨, 😑) with bold outlines,
  // pitch-black sunglasses with white reflection glares, and prominent visible mouths.
  // =========================================================================
  const drawVisorFace = useCallback((ctx, emotion, blinkScale, gazeX, gazeY, time) => {
    if (!ctx) return;
    const w = 1024;
    const h = 512;

    // 1. Transparent Visor Canvas Background (seamlessly displays curved obsidian visor glass without rectangular box)
    ctx.clearRect(0, 0, w, h);

    // Glowing Monochrome White Stroke Helper
    const drawGlowStroke = (drawFn, color = '#FFFFFF', coreColor = '#FFFFFF', lineWidth = 20, glowWidth = 34) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = glowWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      drawFn();
      ctx.stroke();

      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      drawFn();
      ctx.stroke();

      if (coreColor) {
        ctx.strokeStyle = coreColor;
        ctx.lineWidth = Math.max(5, lineWidth * 0.44);
        drawFn();
        ctx.stroke();
      }
      ctx.restore();
    };

    // Cheerful smiling arch eye ◠
    const drawArchEye = (cx, cy, radius = 76, startA = Math.PI * 0.12, endA = Math.PI * 0.88) => {
      drawGlowStroke(() => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, Math.PI + startA, Math.PI + endA, false);
      }, '#FFFFFF', '#FFFFFF', 20, 34);
    };

    // Sad downturned arch eye ◡
    const drawDownArchEye = (cx, cy, radius = 76, startA = Math.PI * 0.12, endA = Math.PI * 0.88) => {
      drawGlowStroke(() => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, startA, endA, false);
      }, '#FFFFFF', '#FFFFFF', 20, 34);
    };

    // Straight horizontal bar for eyes or mouth
    const drawFlatBar = (x1, y1, x2, y2, width = 20, color = '#FFFFFF', core = '#FFFFFF') => {
      drawGlowStroke(() => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }, color, core, width, width + 14);
    };

    // Happy smiling mouth curve ◡
    const drawSmileMouth = (cx = 512, cy = 300, radius = 76, startA = Math.PI * 0.15, endA = Math.PI * 0.85) => {
      drawGlowStroke(() => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, startA, endA, false);
      }, '#FFFFFF', '#FFFFFF', 18, 30);
    };

    // Sad frown mouth curve ◠
    const drawFrownMouth = (cx = 512, cy = 390, radius = 76, startA = Math.PI * 0.15, endA = Math.PI * 0.85) => {
      drawGlowStroke(() => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, Math.PI + startA, Math.PI + endA, false);
      }, '#FFFFFF', '#FFFFFF', 18, 30);
    };

    // Blinking eye squash: if blinking and emotion is not closed-eye emoji
    const isClosedEye = emotion === 'LAUGH' || emotion === 'COOL' || emotion === 'DEADPAN';
    if (blinkScale < 0.2 && !isClosedEye) {
      drawFlatBar(220, 225, 400, 225, 14, '#FFFFFF', '#FFFFFF');
      drawFlatBar(624, 225, 804, 225, 14, '#FFFFFF', '#FFFFFF');
      if (emotion === 'CRY') {
        drawFrownMouth(512, 390, 76);
      } else {
        drawSmileMouth(512, 300, 76);
      }
      return;
    }

    // 1. 😊 HAPPY
    if (emotion === 'HAPPY') {
      drawArchEye(310, 240, 76);
      drawArchEye(714, 240, 76);
      drawSmileMouth(512, 300, 78);
    }
    // 2. 😂 LAUGH
    else if (emotion === 'LAUGH') {
      drawGlowStroke(() => {
        ctx.beginPath();
        ctx.moveTo(250, 175);
        ctx.lineTo(360, 215);
        ctx.lineTo(250, 255);
      }, '#FFFFFF', '#FFFFFF', 22, 36);

      drawGlowStroke(() => {
        ctx.beginPath();
        ctx.moveTo(774, 175);
        ctx.lineTo(664, 215);
        ctx.lineTo(774, 255);
      }, '#FFFFFF', '#FFFFFF', 22, 36);

      const tCycle = (time * 2.8) % 1.0;
      const tearDist = tCycle * 85;
      const tearAlpha = 1.0 - tCycle * 0.8;
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, ' + tearAlpha + ')';
      ctx.beginPath();
      ctx.arc(220 - tearDist, 215 + tearDist * 0.3, 16 * (1 - tCycle * 0.4), 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(804 + tearDist, 215 + tearDist * 0.3, 16 * (1 - tCycle * 0.4), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(420, 315);
      ctx.lineTo(604, 315);
      ctx.bezierCurveTo(604, 400, 420, 400, 420, 315);
      ctx.closePath();
      ctx.fillStyle = '#060B14';
      ctx.fill();

      ctx.save();
      ctx.clip();
      ctx.beginPath();
      ctx.arc(512, 390, 46, 0, Math.PI * 2);
      ctx.fillStyle = '#CBD5E1';
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 14;
      ctx.stroke();
      ctx.restore();
    }
    // 3. 😎 COOL
    else if (emotion === 'COOL') {
      ctx.save();
      const drawLens = (tlX, tlY, trX, trY, brX, brY, blX, blY) => {
        ctx.beginPath();
        ctx.moveTo(tlX, tlY);
        ctx.lineTo(trX, trY);
        ctx.lineTo(brX, brY);
        ctx.lineTo(blX, blY);
        ctx.closePath();
        ctx.fillStyle = '#000206';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 14;
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 3.5;
        ctx.stroke();
      };

      drawLens(195, 165, 465, 165, 435, 260, 225, 260);
      drawLens(559, 165, 829, 165, 799, 260, 589, 260);

      ctx.beginPath();
      ctx.moveTo(460, 185);
      ctx.lineTo(564, 185);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.stroke();

      const drawGlares = (xOff) => {
        ctx.beginPath();
        ctx.moveTo(xOff + 75, 180);
        ctx.lineTo(xOff + 35, 245);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xOff + 110, 180);
        ctx.lineTo(xOff + 70, 245);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.90)';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.stroke();
      };
      drawGlares(235);
      drawGlares(600);
      ctx.restore();

      drawGlowStroke(() => {
        ctx.beginPath();
        ctx.moveTo(440, 345);
        ctx.quadraticCurveTo(515, 355, 590, 318);
      }, '#FFFFFF', '#FFFFFF', 18, 30);
    }
    // 4. 😢 CRY
    else if (emotion === 'CRY') {
      drawDownArchEye(310, 180, 76);
      drawDownArchEye(714, 180, 76);

      const tCycle = (time * 1.6) % 1.0;
      const tearY = 240 + tCycle * 105;
      const drawTeardrop = (tx) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tx, tearY - 18);
        ctx.bezierCurveTo(tx + 14, tearY - 2, tx + 14, tearY + 14, tx, tearY + 16);
        ctx.bezierCurveTo(tx - 14, tearY + 14, tx - 14, tearY - 2, tx, tearY - 18);
        ctx.closePath();
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      };
      drawTeardrop(265);
      drawTeardrop(759);

      drawFrownMouth(512, 395, 78);
    }
    // 5. 🤨 SKEPTICAL
    else if (emotion === 'SKEPTICAL') {
      drawGlowStroke(() => {
        ctx.beginPath();
        ctx.moveTo(195, 140);
        ctx.quadraticCurveTo(310, 95, 425, 145);
      }, '#FFFFFF', '#FFFFFF', 18, 30);

      drawGlowStroke(() => {
        ctx.beginPath();
        ctx.arc(310, 215, 50, 0, Math.PI * 2);
      }, '#FFFFFF', null, 14, 26);
      ctx.save();
      ctx.beginPath();
      ctx.arc(310, 215, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.restore();

      drawFlatBar(610, 185, 825, 185, 18, '#FFFFFF', '#FFFFFF');
      drawFlatBar(630, 225, 805, 225, 14, '#FFFFFF', '#FFFFFF');

      drawGlowStroke(() => {
        ctx.beginPath();
        ctx.moveTo(435, 345);
        ctx.quadraticCurveTo(500, 340, 535, 350);
        ctx.quadraticCurveTo(565, 355, 590, 335);
      }, '#FFFFFF', '#FFFFFF', 18, 30);
    }
    // 6. 😑 DEADPAN
    else if (emotion === 'DEADPAN') {
      drawFlatBar(215, 215, 405, 215, 22, '#FFFFFF', '#FFFFFF');
      drawFlatBar(619, 215, 809, 215, 22, '#FFFFFF', '#FFFFFF');
      drawFlatBar(440, 345, 584, 345, 18, '#FFFFFF', '#FFFFFF');
    }
    // 7. DEFAULT / IDLE
    else {
      drawArchEye(310, 245, 76);
      drawArchEye(714, 245, 76);
      drawSmileMouth(512, 300, 76);
    }
  }, []);

  const cycleList = useMemo(
    () => ['HAPPY', 'LAUGH', 'COOL', 'CRY', 'SKEPTICAL', 'DEADPAN'],
    []
  );
  const emojiCycleIndex = useRef(0);

  const handleClick = useCallback(
    (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      isJumping.current = true;
      jumpTime.current = 0;
      const nextEmotion = cycleList[emojiCycleIndex.current % cycleList.length];
      emojiCycleIndex.current = (emojiCycleIndex.current + 1) % cycleList.length;
      triggerEmotion(nextEmotion, 4.0);

      // Force immediate synchronous redraw on the canvas texture
      if (faceCanvasRef.current && faceTextureRef.current) {
        lastRenderStateRef.current.emotion = nextEmotion;
        drawVisorFace(
          faceCanvasRef.current.getContext('2d'),
          nextEmotion,
          1.0,
          0,
          0,
          0
        );
        faceTextureRef.current.needsUpdate = true;
      }

      audioManager.playEmotionSound(nextEmotion);

      // Broadcast globally so docked companion and scene robot both react synchronously
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('bdx-emotion', { detail: nextEmotion }));
      }
    },
    [cycleList, triggerEmotion, drawVisorFace]
  );

  // Global window event listener to cycle emotions on external tap/click
  useEffect(() => {
    const handleCycle = () => {
      handleClick();
    };
    window.addEventListener('bdx-emotion-cycle', handleCycle);
    return () => window.removeEventListener('bdx-emotion-cycle', handleCycle);
  }, [handleClick]);

  // Global window event listener for emotion triggers from UI docks or buttons
  useEffect(() => {
    const handleEmotionEvent = (e) => {
      if (e && e.detail) {
        triggerEmotion(e.detail, 4.0);
        if (faceCanvasRef.current && faceTextureRef.current) {
          lastRenderStateRef.current.emotion = e.detail;
          drawVisorFace(
            faceCanvasRef.current.getContext('2d'),
            e.detail,
            1.0,
            0,
            0,
            0
          );
          faceTextureRef.current.needsUpdate = true;
        }
        audioManager.playEmotionSound(e.detail);
      }
    };
    window.addEventListener('bdx-emotion', handleEmotionEvent);
    return () => window.removeEventListener('bdx-emotion', handleEmotionEvent);
  }, [triggerEmotion, drawVisorFace]);

  // Keyboard shortcut listener: Keys 1 to 6 trigger 😊, 😂, 😎, 😢, 🤨, 😑
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      const keyMap = {
        '1': 'HAPPY',      // 😊
        '2': 'LAUGH',      // 😂
        '3': 'COOL',       // 😎
        '4': 'CRY',        // 😢
        '5': 'SKEPTICAL',  // 🤨
        '6': 'DEADPAN',    // 😑
      };
      if (keyMap[e.key]) {
        triggerEmotion(keyMap[e.key], 4.0);
        audioManager.playEmotionSound(keyMap[e.key]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [triggerEmotion]);

  // Digital Eye Blink Timer
  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);

  // Welcome Visitor on First Scene Entry & Immediate Face Render
  useEffect(() => {
    // Immediately paint initial smiling face on the canvas texture (zero delay)
    if (faceCanvasRef.current && faceTextureRef.current) {
      lastRenderStateRef.current.emotion = 'HAPPY';
      drawVisorFace(
        faceCanvasRef.current.getContext('2d'),
        'HAPPY',
        1.0,
        0,
        0,
        0
      );
      faceTextureRef.current.needsUpdate = true;
    }

    const timer = setTimeout(() => {
      if (!welcomeTriggeredRef.current) {
        welcomeTriggeredRef.current = true;
        triggerEmotion('EXCITED', 2.8);
        audioManager.playChirp();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [triggerEmotion, drawVisorFace]);

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

            ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = segThickness;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(cx, cy, segRadius, startA, endA);
      ctx.stroke();

      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = segThickness * 0.42;
      ctx.stroke();
    }

    ctx.fillStyle = '#161d28';
    ctx.beginPath();
    ctx.arc(cx, cy, 96, 0, Math.PI * 2);
    ctx.fill();

    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 66);
    coreGrad.addColorStop(0, '#FFFFFF');
    coreGrad.addColorStop(0.35, '#E2E8F0');
    coreGrad.addColorStop(0.75, '#64748B');
    coreGrad.addColorStop(1, '#0F172A');
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
        leftArmRef.current.rotation.z = -0.20 - armSway + armFlightOffset;
        rightArmRef.current.rotation.z = 0.20 + armSway - armFlightOffset;
        leftArmRef.current.rotation.x = currentPitchX.current * 0.6;
        rightArmRef.current.rotation.x = currentPitchX.current * 0.6;
      }

      // 8. Emotion State Machine & Meaningful 6-Zone Depth Triggers
      zoneCooldownRef.current += safeDelta;
      let currentZone = 0;
      if (p >= 0.85) currentZone = 5;      // Zone 6 Discovery
      else if (p >= 0.68) currentZone = 4; // Zone 5 Projects
      else if (p >= 0.51) currentZone = 3; // Zone 4 Research
      else if (p >= 0.34) currentZone = 2; // Zone 3 Community
      else if (p >= 0.17) currentZone = 1; // Zone 2 Featured
      else currentZone = 0;                // Zone 1 Entry

      if (currentZone !== lastZoneRef.current && zoneCooldownRef.current > 3.5) {
        lastZoneRef.current = currentZone;
        zoneCooldownRef.current = 0;
        if (currentZone === 1) {
          // Zone 2 Featured: Confident swagger for hackathons and competitions
          triggerEmotion('COOL', 2.8);
        } else if (currentZone === 2) {
          // Zone 3 Community: Friendly smiling welcome to collaborative discussions
          triggerEmotion('HAPPY', 2.8);
        } else if (currentZone === 3) {
          // Zone 4 Research: Deep analytical thinking evaluating cognitive architectures
          triggerEmotion('THINKING', 2.8);
        } else if (currentZone === 4) {
          // Zone 5 Projects: Curious inspection of student repositories & builds
          triggerEmotion('CURIOUS', 2.8);
        } else if (currentZone === 5) {
          // Zone 6 Discovery: Celebratory excitation docking at terminal hub
          triggerEmotion('EXCITED', 3.0);
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
      headRef.current.rotation.x += (targetRotX - headRef.current.rotation.x) * headLerp;
      headRef.current.rotation.z = 0; // Rigid upright lock: zero neck roll/deformation
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
    if (currentEmotion === 'LAUGH' || currentEmotion === 'CRY') {
      needsRedraw = true; // Actively animate streaming and rolling tears
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
        color: '#181C22', // Deep monochrome graphite
        roughness: 0.28,
        metalness: 0.70,
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
        color: '#FFFFFF',
      }),
    []
  );

  const cyanGlassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#E0E6ED',
        emissive: '#A0AEC0',
        emissiveIntensity: 0.25,
        roughness: 0.12,
        metalness: 0.35,
        transmission: 0.85,
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
          {/* Main Lacquered White Rear Helmet Shell */}
          <mesh
            position={[0, 0, -0.08]}
            castShadow
            receiveShadow
            material={pearlCeramicMat}
            scale={[1.10, 0.98, 1.0]}
            onPointerDown={handleClick}
            onClick={handleClick}
          >
            <sphereGeometry args={[0.48, 48, 40]} />
          </mesh>

          {/* Smooth Visor Outer Lip Bezel Frame */}
          <mesh
            position={[0, 0.02, 0.34]}
            scale={[1.06, 0.86, 0.9]}
            material={pearlCeramicMat}
            castShadow
            onPointerDown={handleClick}
            onClick={handleClick}
          >
            <torusGeometry args={[0.42, 0.045, 24, 52]} />
          </mesh>

          {/* Curved Obsidian Visor Glass Screen (Recessed to Z = 0.18, front apex reaches Z = 0.54) */}
          <mesh
            position={[0, 0.02, 0.18]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[1.02, 0.82, 0.82]}
            material={visorGlassMat}
            castShadow
            onPointerDown={handleClick}
            onClick={handleClick}
          >
            <sphereGeometry args={[0.44, 48, 36, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
          </mesh>

          {/* ============================================================ */}
          {/* DIGITAL HIGH-RES OLED VISOR DISPLAY SCREEN (Placed safely at Z = 0.585) */}
          {/* Sits cleanly in front of the curved glass apex (0.54) with zero clipping and zero box */}
          {visorTexture && (
            <mesh
              ref={eyeDisplayRef}
              position={[0, 0.015, 0.585]}
              renderOrder={10}
              onPointerDown={handleClick}
              onClick={handleClick}
            >
              <planeGeometry args={[0.54, 0.34]} />
              <meshBasicMaterial
                map={visorTexture}
                transparent
                opacity={0.99}
                depthWrite={false}
              />
            </mesh>
          )}

          {/* Forward Soft Eye Glow Projection - Pure White */}
          <pointLight position={[0, 0.04, 0.75]} color="#FFFFFF" intensity={1.2} distance={2.5} decay={2} />

          {/* Broad Transparent Click Target Sphere over the Face & Helmet */}
          <mesh
            position={[0, 0.05, 0.35]}
            onPointerDown={handleClick}
            onClick={handleClick}
          >
            <sphereGeometry args={[0.55, 16, 16]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

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
            onPointerDown={handleClick}
            onClick={handleClick}
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
            <pointLight position={[0, 0, 0.08]} color="#FFFFFF" intensity={0.9} distance={1.4} decay={2} />

            {/* Volumetric Hologram Cone (Activates during Section 3 Projection) */}
            <group position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh ref={projectorBeamRef} position={[0, 1.4, 0]} visible={isProjecting}>
                <coneGeometry args={[1.2, 2.8, 32, 1, true]} />
                <meshBasicMaterial
                  color="#FFFFFF"
                  transparent
                  opacity={0.25}
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
            <pointLight position={[0, -0.22, 0]} color="#E2E8F0" intensity={1.2} distance={2.4} decay={2} />
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
