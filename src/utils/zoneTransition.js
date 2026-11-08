/**
 * Zone Transition State Machine
 * Coordinates 3D server rack cluster transitions, lighting focus, and content synchronization.
 *
 * Explicit Scene States:
 * - 'idle': Active cluster is fully docked, settled, and interactive.
 * - 'approach': Visitor is nearing a zone boundary; subtle anticipation lighting initiates.
 * - 'transitioning': Current cluster parts outward and dims; incoming cluster slides into place and illuminates.
 * - 'revealed': Incoming cluster has docked; environment is ready and content settles in.
 */

// Zone Scroll Thresholds
export const ZONE_THRESHOLDS = {
  ZONE_1_END: 0.22,
  TRANS_1_START: 0.26,
  TRANS_1_END: 0.38,
  ZONE_2_SETTLED: 0.44,
  ZONE_2_END: 0.60,
  TRANS_2_START: 0.64,
  TRANS_2_END: 0.76,
  ZONE_3_SETTLED: 0.82,
};

/**
 * Calculates continuous cluster transforms, lighting parameters, and scene state.
 * @param {number} rawP - Scroll progress (0.0 to 1.0)
 * @param {boolean} isReducedMotion - Respect prefers-reduced-motion
 */
export function getZoneTransitionState(rawP = 0, isReducedMotion = false) {
  const p = Math.max(0, Math.min(1, rawP));
  const maxSlide = isReducedMotion ? 0 : 0.44; // Lateral rack movement (meters)

  let activeZone = 'hero';
  let sceneState = 'idle';
  let statusMessage = 'CLUSTER_01: DOCKED [NOMINAL]';

  // 1. Cluster Transforms (Slide X and Opacity)
  let c1Slide = 0;
  let c1Opacity = 1.0;

  let c2Slide = maxSlide;
  let c2Opacity = 0.18;

  let c3Slide = maxSlide;
  let c3Opacity = 0.18;

  // 2. Dynamic Lighting Targets (Harmonious 5200K Architectural Spectrum)
  let lightZ = 4.0;
  let lightIntensity = 1.55;
  let lightColor = '#F0F6F7';
  let coreWashIntensity = 0.5;
  let chamberSpotIntensity = 0.25;

  // ZONE 1: ARRIVAL
  if (p < ZONE_THRESHOLDS.ZONE_1_END) {
    activeZone = 'hero';
    sceneState = 'idle';
    c1Slide = 0;
    c1Opacity = 1.0;
    c2Slide = maxSlide;
    c2Opacity = 0.18;
    c3Slide = maxSlide;
    c3Opacity = 0.18;
    lightZ = 4.0;
    lightIntensity = 1.55;
    lightColor = '#F0F6F7';
    statusMessage = 'BAY 01 // ARRIVAL CLUSTER: NOMINAL';
  }
  // APPROACHING ZONE 2
  else if (p < ZONE_THRESHOLDS.TRANS_1_START) {
    activeZone = 'hero';
    sceneState = 'approach';
    const t = (p - ZONE_THRESHOLDS.ZONE_1_END) / (ZONE_THRESHOLDS.TRANS_1_START - ZONE_THRESHOLDS.ZONE_1_END);
    c1Slide = 0;
    c1Opacity = 1.0;
    c2Slide = maxSlide;
    c2Opacity = 0.18 + t * 0.15;
    lightZ = 4.0 - t * 4.0;
    lightIntensity = 1.55 + t * 0.15;
    coreWashIntensity = 0.5 + t * 0.3;
    statusMessage = 'APPROACHING COMPUTE CORE // INITIATING CLUSTER TRANSIT';
  }
  // TRANSITIONING ZONE 1 -> ZONE 2
  else if (p < ZONE_THRESHOLDS.TRANS_1_END) {
    activeZone = p > 0.32 ? 'about' : 'hero';
    sceneState = 'transitioning';
    const rawT = (p - ZONE_THRESHOLDS.TRANS_1_START) / (ZONE_THRESHOLDS.TRANS_1_END - ZONE_THRESHOLDS.TRANS_1_START);
    // Smooth cubic easing
    const ease = rawT * rawT * (3 - 2 * rawT);

    // Cluster 1 parts outward and dims
    c1Slide = ease * maxSlide;
    c1Opacity = 1.0 - ease * 0.82;

    // Cluster 2 slides smoothly inward and illuminates
    c2Slide = (1 - ease) * maxSlide;
    c2Opacity = 0.18 + ease * 0.82;

    // Lighting focus moves along cold aisle to Z = -15
    lightZ = 0.0 - ease * 15.0;
    lightIntensity = 1.65;
    lightColor = '#F0F6F7';
    coreWashIntensity = 0.7 + ease * 0.4;
    statusMessage = 'RECONFIGURING AISLE // BAY 01 PARTING ➔ BAY 02 ENGAGING';
  }
  // REVEALED IN ZONE 2
  else if (p < ZONE_THRESHOLDS.ZONE_2_SETTLED) {
    activeZone = 'about';
    sceneState = 'revealed';
    c1Slide = maxSlide;
    c1Opacity = 0.18;
    c2Slide = 0;
    c2Opacity = 1.0;
    c3Slide = maxSlide;
    c3Opacity = 0.18;
    lightZ = -15.0;
    lightIntensity = 1.65;
    lightColor = '#F0F6F7';
    coreWashIntensity = 1.1;
    statusMessage = 'BAY 02 // COMPUTE CORE DOCKED & READY';
  }
  // SETTLED IN ZONE 2 (INTELLIGENCE CORE)
  else if (p < ZONE_THRESHOLDS.ZONE_2_END) {
    activeZone = 'about';
    sceneState = 'idle';
    c1Slide = maxSlide;
    c1Opacity = 0.18;
    c2Slide = 0;
    c2Opacity = 1.0;
    c3Slide = maxSlide;
    c3Opacity = 0.18;
    lightZ = -15.0;
    lightIntensity = 1.55;
    lightColor = '#F0F6F7';
    coreWashIntensity = 1.0;
    statusMessage = 'BAY 02 // INTELLIGENCE CORE: NOMINAL';
  }
  // APPROACHING ZONE 3
  else if (p < ZONE_THRESHOLDS.TRANS_2_START) {
    activeZone = 'about';
    sceneState = 'approach';
    const t = (p - ZONE_THRESHOLDS.ZONE_2_END) / (ZONE_THRESHOLDS.TRANS_2_START - ZONE_THRESHOLDS.ZONE_2_END);
    c2Slide = 0;
    c2Opacity = 1.0;
    c3Slide = maxSlide;
    c3Opacity = 0.18 + t * 0.2;
    lightZ = -15.0 - t * 6.0;
    chamberSpotIntensity = 0.25 + t * 0.4;
    statusMessage = 'APPROACHING PROJECTION PEDESTAL // VOLUMETRIC ALIGNMENT';
  }
  // TRANSITIONING ZONE 2 -> ZONE 3
  else if (p < ZONE_THRESHOLDS.TRANS_2_END) {
    activeZone = p > 0.70 ? 'chamber' : 'about';
    sceneState = 'transitioning';
    const rawT = (p - ZONE_THRESHOLDS.TRANS_2_START) / (ZONE_THRESHOLDS.TRANS_2_END - ZONE_THRESHOLDS.TRANS_2_START);
    const ease = rawT * rawT * (3 - 2 * rawT);

    // Cluster 2 parts outward and dims
    c2Slide = ease * maxSlide;
    c2Opacity = 1.0 - ease * 0.82;

    // Cluster 3 slides into position and locks in
    c3Slide = (1 - ease) * maxSlide;
    c3Opacity = 0.18 + ease * 0.82;

    lightZ = -21.0 - ease * 14.0;
    lightIntensity = 1.6;
    lightColor = '#F0F6F7';
    chamberSpotIntensity = 0.6 + ease * 0.8;
    statusMessage = 'RECONFIGURING AISLE // BAY 02 PARTING ➔ CHAMBER EMITTER ACTIVE';
  }
  // REVEALED IN ZONE 3
  else if (p < ZONE_THRESHOLDS.ZONE_3_SETTLED) {
    activeZone = 'chamber';
    sceneState = 'revealed';
    c1Slide = maxSlide;
    c1Opacity = 0.18;
    c2Slide = maxSlide;
    c2Opacity = 0.18;
    c3Slide = 0;
    c3Opacity = 1.0;
    lightZ = -35.0;
    lightIntensity = 1.8;
    chamberSpotIntensity = 2.0;
    statusMessage = 'CHAMBER 03 // VOLUMETRIC ARRAY ONLINE';
  }
  // SETTLED IN ZONE 3 (PROJECTION CHAMBER)
  else {
    activeZone = 'chamber';
    sceneState = 'idle';
    c1Slide = maxSlide;
    c1Opacity = 0.18;
    c2Slide = maxSlide;
    c2Opacity = 0.18;
    c3Slide = 0;
    c3Opacity = 1.0;
    lightZ = -35.0;
    lightIntensity = 1.8;
    chamberSpotIntensity = 2.0;
    statusMessage = 'CHAMBER 03 // BDX-01 PEDESTAL DOCKED';
  }

  return {
    activeZone,
    sceneState,
    statusMessage,
    clusters: {
      c1: { slide: c1Slide, opacity: c1Opacity },
      c2: { slide: c2Slide, opacity: c2Opacity },
      c3: { slide: c3Slide, opacity: c3Opacity },
    },
    lighting: {
      lightZ,
      lightIntensity,
      lightColor,
      coreWashIntensity,
      chamberSpotIntensity,
    },
  };
}
