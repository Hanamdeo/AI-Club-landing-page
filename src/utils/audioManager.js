/**
 * audioManager.js
 * Audio Engine completely disabled as requested.
 * All sound effects, Web Audio synthesizers, and ambient drones are muted / no-ops.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.isInitialized = false;
    this.listeners = new Set();
  }

  init() {
    // Audio permanently disabled
  }

  subscribe(callback) {
    if (callback) callback(false);
    return () => {};
  }

  notifyListeners() {
    // No-op
  }

  setupAmbience() {
    // No-op
  }

  toggleSound() {
    return false;
  }

  setSoundEnabled(enabled) {
    return false;
  }

  playClick() {
    // Muted
  }

  playWhoosh() {
    // Muted
  }

  playBeep() {
    // Muted
  }

  playServo() {
    // Muted
  }

  playChirp() {
    // Muted
  }
}

export const audioManager = new SoundEngine();
