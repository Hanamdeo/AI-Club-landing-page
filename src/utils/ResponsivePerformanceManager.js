'use client';

/**
 * ResponsivePerformanceManager
 * Centralized Adaptive Performance & Hardware Quality Coordinator for 3D WebGL.
 *
 * Implements Phase 3 Architecture:
 * - Three Quality Tiers: 'low' | 'medium' | 'high'
 * - Hardware Detection (GPU vendor/model heuristics, CPU cores, device memory)
 * - Real-time Frame Time Monitoring with Hysteresis & Cooldowns
 * - Respects prefers-reduced-motion
 * - Manual tier override ('low' | 'medium' | 'high' | 'auto')
 * - Event subscriber pattern for zero-overhead R3F / DOM synchronization
 */

class PerformanceCoordinator {
  constructor() {
    this.tier = 'high';
    this.mode = 'auto'; // 'auto' | 'low' | 'medium' | 'high'
    this.fps = 60;
    this.frameTime = 16.6;
    this.isReducedMotion = false;
    this.dpr = 1.5;
    this.targetFps = 60;
    this.listeners = new Set();

    // Hysteresis & cooldown tracking
    this.history = [];
    this.historyLength = 45; // ~0.75 second moving window
    this.lastTierChangeTime = 0;
    this.cooldownDuration = 8000; // 8 seconds cooldown between automatic quality shifts
    this.consecutiveLowFrames = 0;
    this.consecutiveGoodFrames = 0;

    this.initialized = false;
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    // 1. Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.isReducedMotion = motionQuery.matches;
    motionQuery.addEventListener('change', (e) => {
      this.isReducedMotion = e.matches;
      if (this.isReducedMotion && this.tier === 'high') {
        this.setTier('medium', false);
      }
    });

    // 2. Initial Hardware Classification Heuristics
    const initialTier = this.detectHardwareCapability();
    this.setTier(initialTier, false);
  }

  detectHardwareCapability() {
    if (typeof window === 'undefined') return 'medium';

    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4; // in GB
    const isMobile =
      (typeof window !== 'undefined' && window.innerWidth < 768) ||
      (typeof navigator !== 'undefined' &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent));
    this.isMobile = !!isMobile;

    // Detect WebGL renderer string
    let isIntegratedOrLowEndGpu = false;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
          // Comprehensive detection for mobile GPUs (Mali-G57, Adreno, PowerVR, etc.)
          if (
            renderer.includes('mali') ||
            renderer.includes('adreno') ||
            renderer.includes('powervr') ||
            renderer.includes('intel hd') ||
            renderer.includes('intel(r) hd') ||
            renderer.includes('uhd graphics') ||
            renderer.includes('llvmpipe') ||
            renderer.includes('swiftshader')
          ) {
            isIntegratedOrLowEndGpu = true;
          }
        }
      }
    } catch {
      // Fallback silently if WebGL debug info is restricted by browser privacy
    }

    if (this.isReducedMotion) {
      return 'low';
    }

    // Any mobile phone or low-end GPU runs on 'low' tier to prevent frame drops
    if (isMobile || isIntegratedOrLowEndGpu || cores <= 4 || memory <= 4) {
      return 'low';
    }

    if (cores <= 6 || memory <= 6) {
      return 'medium';
    }

    return 'high';
  }

  setTier(newTier, notify = true) {
    if (this.tier === newTier) return;
    this.tier = newTier;

    // Update DPR & target frame rates per tier
    switch (this.tier) {
      case 'low':
        this.dpr = 1.0;
        this.targetFps = 60;
        break;
      case 'medium':
        this.dpr = this.isMobile ? 1.0 : 1.15;
        this.targetFps = 60;
        break;
      case 'high':
      default:
        this.dpr = this.isMobile ? 1.0 : 1.25;
        this.targetFps = 60;
        break;
    }

    this.lastTierChangeTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

    if (notify) {
      this.listeners.forEach((callback) => {
        try {
          callback(this.getState());
        } catch (err) {
          console.error('[ResponsivePerformanceManager] Listener error:', err);
        }
      });
    }
  }

  setManualMode(mode) {
    this.mode = mode;
    if (mode !== 'auto') {
      this.setTier(mode, true);
    } else {
      this.setTier(this.detectHardwareCapability(), true);
    }
  }

  /**
   * Called on every R3F useFrame tick to monitor frame delta
   * Uses rolling frame time with cooldown to prevent rapid quality oscillation
   */
  recordFrame(delta) {
    if (this.mode !== 'auto') return;

    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const frameMs = delta * 1000;
    this.frameTime = frameMs;
    this.fps = THREE_Math_clamp(1 / Math.max(delta, 0.001), 10, 120);

    this.history.push(frameMs);
    if (this.history.length > this.historyLength) {
      this.history.shift();
    }

    // Must wait for full history buffer and check cooldown
    if (this.history.length < this.historyLength) return;
    if (now - this.lastTierChangeTime < this.cooldownDuration) return;

    // Calculate average frame time
    const avgFrameTime = this.history.reduce((a, b) => a + b, 0) / this.history.length;

    // Downgrade condition: Sustained frame time > 32ms (~<31 FPS)
    if (avgFrameTime > 32) {
      this.consecutiveLowFrames++;
      this.consecutiveGoodFrames = 0;
      if (this.consecutiveLowFrames > 2) {
        if (this.tier === 'high') {
          this.setTier('medium', true);
        } else if (this.tier === 'medium') {
          this.setTier('low', true);
        }
        this.history = [];
        this.consecutiveLowFrames = 0;
      }
    }
    // Upgrade condition: Sustained frame time < 17.5ms (~>57 FPS)
    // Never auto-upgrade on mobile/budget devices to avoid sudden stutter when scrolling
    else if (avgFrameTime < 17.5 && !this.isMobile) {
      this.consecutiveGoodFrames++;
      this.consecutiveLowFrames = 0;
      if (this.consecutiveGoodFrames > 4) {
        if (this.tier === 'low') {
          this.setTier('medium', true);
        } else if (this.tier === 'medium' && window.innerWidth >= 768) {
          this.setTier('high', true);
        }
        this.history = [];
        this.consecutiveGoodFrames = 0;
      }
    }
  }

  getState() {
    return {
      tier: this.tier,
      mode: this.mode,
      dpr: this.dpr,
      fps: Math.round(this.fps),
      targetFps: this.targetFps,
      isReducedMotion: this.isReducedMotion,
      // Tier-specific rendering flags for progressive visual degradation
      features: {
        drawLeds: this.tier !== 'low',
        enableSubfloorPlenum: this.tier === 'high',
        enableCeilingTrapezes: this.tier !== 'low',
        maxLights: this.tier === 'low' ? 3 : this.tier === 'medium' ? 5 : 6,
        highPrecisionNormals: this.tier === 'high',
        enableComplexHologram: this.tier !== 'low',
        particlesDensity: this.tier === 'low' ? 0.35 : this.tier === 'medium' ? 0.7 : 1.0,
      },
    };
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.getState());
    return () => this.listeners.delete(callback);
  }
}

function THREE_Math_clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

// Global Singleton Instance
export const performanceManager = new PerformanceCoordinator();

if (typeof window !== 'undefined') {
  window.__performanceManager = performanceManager;
}

// React Hook for dynamic component tier subscriptions
import { useState, useEffect } from 'react';

export function usePerformanceTier() {
  const [state, setState] = useState(() => performanceManager.getState());

  useEffect(() => {
    performanceManager.init();
    return performanceManager.subscribe((newState) => {
      setState(newState);
    });
  }, []);

  return state;
}

