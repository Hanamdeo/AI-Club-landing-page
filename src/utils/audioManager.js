/**
 * audioManager.js
 * High-performance Web Audio API procedural synthesis engine.
 * Generates immersive server room ambience and futuristic sound effects
 * entirely client-side with zero external assets and zero network overhead.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.isInitialized = false;
    this.ambientGain = null;
    this.humOsc1 = null;
    this.humOsc2 = null;
    this.noiseNode = null;
    this.listeners = new Set();
  }

  /**
   * Lazily initialize AudioContext on user gesture
   */
  init() {
    if (typeof window === 'undefined') return;
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Read initial mute state from sessionStorage (default to muted for polite UX)
      const saved = sessionStorage.getItem('aiclub_sound_enabled');
      this.isMuted = saved === 'true' ? false : true;

      this.setupAmbience();
      this.isInitialized = true;
      this.notifyListeners();
    } catch (e) {
      console.warn('Web Audio API initialization failed:', e);
    }
  }

  /**
   * Subscribe to sound mute state changes
   */
  subscribe(callback) {
    this.listeners.add(callback);
    callback(!this.isMuted);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach((cb) => cb(!this.isMuted));
  }

  /**
   * Create continuous server room cooling air + low-frequency power transformer drone
   */
  setupAmbience() {
    if (!this.ctx) return;

    // Master Ambient Gain Node with smooth ramping
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.18, this.ctx.currentTime);
    this.ambientGain.connect(this.ctx.destination);

    // 1. Transformer Core Hum: 55Hz Sine Wave (Fundamental hum)
    this.humOsc1 = this.ctx.createOscillator();
    this.humOsc1.type = 'sine';
    this.humOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    const humGain1 = this.ctx.createGain();
    humGain1.gain.setValueAtTime(0.35, this.ctx.currentTime);

    // Subtle 0.2Hz LFO for natural breathing server room fluctuation
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(humGain1.gain);
    lfo.start();

    this.humOsc1.connect(humGain1);
    humGain1.connect(this.ambientGain);
    this.humOsc1.start();

    // 2. Harmonic Detune: 110Hz Triangle Wave through steep low-pass filter
    this.humOsc2 = this.ctx.createOscillator();
    this.humOsc2.type = 'triangle';
    this.humOsc2.frequency.setValueAtTime(110.4, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, this.ctx.currentTime);

    const humGain2 = this.ctx.createGain();
    humGain2.gain.setValueAtTime(0.2, this.ctx.currentTime);

    this.humOsc2.connect(filter);
    filter.connect(humGain2);
    humGain2.connect(this.ambientGain);
    this.humOsc2.start();

    // 3. Cooling Fan Airflow: Pink/White Noise filtered for soft ventilation rush
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(380, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.32, this.ctx.currentTime);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ambientGain);
    whiteNoise.start();
    this.noiseNode = whiteNoise;
  }

  /**
   * Toggle audio ambience on / off
   */
  toggleSound() {
    this.init();
    if (!this.ctx) return false;

    this.isMuted = !this.isMuted;
    sessionStorage.setItem('aiclub_sound_enabled', (!this.isMuted).toString());

    if (this.ambientGain) {
      const target = this.isMuted ? 0.0001 : 0.18;
      this.ambientGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.ambientGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.4);
    }

    if (!this.isMuted) {
      this.playBeep(880, 0.08);
    }
    this.notifyListeners();
    return !this.isMuted;
  }

  setSoundEnabled(enabled) {
    if (enabled === !this.isMuted) return;
    this.toggleSound();
  }

  /**
   * Tactile High-Tech Optical Button Click
   */
  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio context error ignore
    }
  }

  /**
   * BDX Robot Companion Expressive Chirp / Trill
   * Frequency-ramped melodic FM synthesis (R2-D2 / Wall-E style friendly chirp)
   */
  playChirp() {
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const carrier = this.ctx.createOscillator();
      const modulator = this.ctx.createOscillator();
      const modGain = this.ctx.createGain();
      const masterGain = this.ctx.createGain();

      // Pitch sweep
      carrier.type = 'sine';
      carrier.frequency.setValueAtTime(850, now);
      carrier.frequency.linearRampToValueAtTime(1480, now + 0.08);
      carrier.frequency.linearRampToValueAtTime(1100, now + 0.15);
      carrier.frequency.linearRampToValueAtTime(1750, now + 0.22);

      // FM Modulation for robotic trill
      modulator.type = 'triangle';
      modulator.frequency.setValueAtTime(42, now);
      modGain.gain.setValueAtTime(120, now);

      modulator.connect(modGain);
      modGain.connect(carrier.frequency);

      masterGain.gain.setValueAtTime(0.22, now);
      masterGain.gain.linearRampToValueAtTime(0.25, now + 0.12);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      carrier.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      modulator.start(now);
      carrier.start(now);
      modulator.stop(now + 0.3);
      carrier.stop(now + 0.3);
    } catch {
      // Ignore
    }
  }

  /**
   * Mechanical Servo Slide Sound for Server Blade Drawer
   */
  playServo() {
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.linearRampToValueAtTime(380, now + 0.18);
      osc.frequency.linearRampToValueAtTime(180, now + 0.35);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(750, now);
      filter.Q.setValueAtTime(3.5, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Ignore
    }
  }

  /**
   * High-Tech Terminal Beep / Notification
   */
  playBeep(freq = 980, duration = 0.08) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.02);
    } catch {
      // Ignore
    }
  }

  /**
   * Atmospheric Door / Waypoint Shutter Whoosh
   */
  playWhoosh() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.08;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.15);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.38);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.4);
    } catch {
      // Ignore
    }
  }
}

// Export singleton instance
export const audioManager = new SoundEngine();

