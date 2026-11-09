'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Intelligent Multi-Tier Device Performance Profiler
 * Dynamically detects CPU cores, memory, GPU renderer tier, and live runtime FPS
 * to automatically calibrate 3D scene complexity, DPR, light budget, and geometry.
 *
 * Tiers:
 * - 'low': Budget laptops, integrated graphics (Intel HD), mobile devices, battery-saver mode
 * - 'medium': Mid-range laptops, Intel Iris Xe, standard modern desktop
 * - 'high': Dedicated GPUs (NVIDIA RTX, AMD Radeon, Apple Silicon M-series)
 */

export const PERFORMANCE_TIER_CONFIGS = {
  low: {
    label: 'ECO / OPTIMIZED',
    shortLabel: 'ECO',
    dpr: [0.75, 0.88],
    antialias: false,
    rackZEnd: -38,
    maxDepthZ: -42,
    floorGridDivisions: 44,
    ceilingGridDivisions: 28,
    enableVolumetrics: false,
    enableComplexShaders: false,
    shadows: false,
    lightCount: 2,
    lightingIntensity: 0.85,
    description: 'Optimized for low-power and integrated GPUs',
  },
  medium: {
    label: 'BALANCED',
    shortLabel: 'BALANCED',
    dpr: [0.85, 1.05],
    antialias: true,
    rackZEnd: -48,
    maxDepthZ: -54,
    floorGridDivisions: 68,
    ceilingGridDivisions: 44,
    enableVolumetrics: false,
    enableComplexShaders: true,
    shadows: false,
    lightCount: 4,
    lightingIntensity: 1.0,
    description: 'Balanced fidelity and framerate',
  },
  high: {
    label: 'HIGH FIDELITY',
    shortLabel: 'HIGH',
    dpr: [1.0, 1.25],
    antialias: true,
    rackZEnd: -56,
    maxDepthZ: -64,
    floorGridDivisions: 110,
    ceilingGridDivisions: 72,
    enableVolumetrics: true,
    enableComplexShaders: true,
    shadows: false,
    lightCount: 6,
    lightingIntensity: 1.0,
    description: 'Maximum visual fidelity for dedicated GPUs',
  },
};

/**
 * Perform initial hardware heuristic analysis.
 * Inspects logical CPU cores, RAM, screen resolution, and unmasked WebGL renderer string.
 */
export function detectHardwareTier() {
  if (typeof window === 'undefined') return 'medium';

  try {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4; // in GB (Chrome/Edge API)
    const isMobile =
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
      (window.innerWidth < 768 && navigator.maxTouchPoints > 1);

    // Query GPU Vendor & Renderer String via offscreen canvas
    let gpuRenderer = '';
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        gpuRenderer = (
          gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || ''
        ).toLowerCase();
      }
      // Properly release temporary context
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) {
        loseContext.loseContext();
      }
    }

    // High-performance indicators
    const isDedicatedGPU =
      /nvidia|geforce|rtx|gtx|radeon|rx\s*\d|apple\s*m\d/i.test(gpuRenderer);
    const isLowPowerGPU =
      /intel\s*(hd|uhd)|mali|adreno\s*(3|4|5|61)|powervr|swiftshader|llvmpipe|basic\s*render/i.test(
        gpuRenderer
      );

    // Rule 1: Dedicated modern GPU with ample cores & memory -> High
    if (isDedicatedGPU && cores >= 6 && memory >= 6 && !isMobile) {
      return 'high';
    }

    // Rule 2: Low-end GPU, software renderer, low core count, or low RAM -> Low
    if (isLowPowerGPU || cores <= 4 || memory <= 4 || isMobile) {
      return 'low';
    }

    // Rule 3: Mid-tier fallback
    return 'medium';
  } catch (err) {
    return 'medium';
  }
}

/**
 * Custom React Hook: useDevicePerformanceTier
 * Provides reactive performance tier, adaptive DPR, live configuration,
 * and automatic runtime FPS downgrade when frame-drops occur.
 * Performance optimized: throttled state updates to prevent re-render thrashing.
 */
export function useDevicePerformanceTier() {
  const [tier, setTier] = useState('medium');
  const [isAuto, setIsAuto] = useState(true);
  const [fps, setFps] = useState(60);

  const frameTimesRef = useRef([]);
  const lastTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : 0);
  const lastFpsUpdateRef = useRef(0);
  const consecutiveLowFpsCount = useRef(0);

  // Initial detection on mount (runs once)
  useEffect(() => {
    const detected = detectHardwareTier();
    setTier(detected);
  }, []);

  // Frame monitoring callback to detect sustained lag without React re-render thrashing
  const reportFrame = useCallback(() => {
    if (!isAuto) return;
    const now = performance.now();
    const delta = now - lastTimeRef.current;
    lastTimeRef.current = now;

    if (delta > 0 && delta < 200) {
      const currentFps = 1000 / delta;
      frameTimesRef.current.push(currentFps);
      if (frameTimesRef.current.length > 45) {
        frameTimesRef.current.shift();
      }

      // Check average FPS and throttle state updates to at most once every 1.5 seconds
      if (now - lastFpsUpdateRef.current > 1500 && frameTimesRef.current.length >= 20) {
        lastFpsUpdateRef.current = now;
        const sum = frameTimesRef.current.reduce((a, b) => a + b, 0);
        const avgFps = sum / frameTimesRef.current.length;
        setFps(Math.round(avgFps));

        // If sustained framerate is below 35 FPS, step down tier
        if (avgFps < 35) {
          consecutiveLowFpsCount.current += 1;
          if (consecutiveLowFpsCount.current >= 2) {
            setTier((prev) => {
              if (prev === 'high') return 'medium';
              if (prev === 'medium') return 'low';
              return prev;
            });
            consecutiveLowFpsCount.current = 0;
            frameTimesRef.current = [];
          }
        } else {
          consecutiveLowFpsCount.current = Math.max(0, consecutiveLowFpsCount.current - 1);
        }
      }
    }
  }, [isAuto]);

  const cycleTier = useCallback(() => {
    setIsAuto(false);
    setTier((prev) => {
      if (prev === 'high') return 'medium';
      if (prev === 'medium') return 'low';
      return 'high';
    });
  }, []);

  const config = PERFORMANCE_TIER_CONFIGS[tier] || PERFORMANCE_TIER_CONFIGS.medium;

  return {
    tier,
    config,
    isAuto,
    fps,
    reportFrame,
    setTier: (newTier) => {
      setIsAuto(false);
      setTier(newTier);
    },
    cycleTier,
  };
}
