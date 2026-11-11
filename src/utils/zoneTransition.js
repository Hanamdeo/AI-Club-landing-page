/**
 * Zone Transition State Machine (6-Zone Progressive Depth Architecture)
 * Coordinates 3D server rack cluster transitions, lighting focus, and content synchronization.
 *
 * 6 Connected Data Centre Zones:
 * 1. Entry zone (p: 0.00 - 0.16): Welcome / Introduction & primary actions
 * 2. Featured zone (p: 0.17 - 0.33): Highlighted server area & upcoming activities
 * 3. Community zone (p: 0.34 - 0.50): Server aisle, reading circles & club culture
 * 4. Research zone (p: 0.51 - 0.67): Intelligence Core, research tracks & preprints
 * 5. Projects zone (p: 0.68 - 0.84): Project showcase displays & hardware builds
 * 6. Discovery/exit zone (p: 0.85 - 1.00): Final landmark projection chamber & navigation hub
 */

export const FACILITY_6_ZONES = [
  { id: 'entry', index: 0, code: '01', name: 'Entry Threshold', range: [0.0, 0.16], center: 0.08 },
  { id: 'featured', index: 1, code: '02', name: 'Featured Cluster', range: [0.17, 0.33], center: 0.25 },
  { id: 'community', index: 2, code: '03', name: 'Community Aisle', range: [0.34, 0.50], center: 0.42 },
  { id: 'research', index: 3, code: '04', name: 'Research Core', range: [0.51, 0.67], center: 0.59 },
  { id: 'projects', index: 4, code: '05', name: 'Project Archive', range: [0.68, 0.84], center: 0.76 },
  { id: 'discovery', index: 5, code: '06', name: 'Discovery Hub', range: [0.85, 1.00], center: 0.93 },
];

// Zero-GC Preallocated Transition State Cache
const cachedTransitionState = {
  activeZone: 'entry',
  zoneIndex: 0,
  sceneState: 'idle',
  statusMessage: 'BAY 01 // ENTRY THRESHOLD: WELCOME',
  clusters: {
    c1: { slide: 0, opacity: 1.0 },
    c2: { slide: 0, opacity: 1.0 },
    c3: { slide: 0, opacity: 1.0 },
  },
  lighting: {
    lightZ: 4.0,
    lightIntensity: 1.5,
    lightColor: '#F0F6F7',
    coreWashIntensity: 0.5,
    chamberSpotIntensity: 0.25,
  },
};

/**
 * Calculates continuous cluster transforms, lighting parameters, and scene state.
 * Uses zero-allocation cached return to eliminate Garbage Collection thrashing in useFrame loops.
 * @param {number} rawP - Scroll progress (0.0 to 1.0)
 * @param {boolean} isReducedMotion - Respect prefers-reduced-motion
 */
export function getZoneTransitionState(rawP = 0, isReducedMotion = false) {
  const p = Math.max(0, Math.min(1, rawP));
  const maxSlide = isReducedMotion ? 0 : 0.44; // Lateral rack movement (meters)

  let activeZone = 'entry';
  let zoneIndex = 0;
  let statusMessage = 'SECTOR 01 // ENTRY THRESHOLD: NOMINAL';

  if (p >= 0.85) {
    activeZone = 'discovery';
    zoneIndex = 5;
    statusMessage = 'CHAMBER 06 // DISCOVERY & INTAKE HUB ONLINE';
  } else if (p >= 0.68) {
    activeZone = 'projects';
    zoneIndex = 4;
    statusMessage = 'BAY 05 // PROJECT ARCHIVES DOCKED';
  } else if (p >= 0.51) {
    activeZone = 'research';
    zoneIndex = 3;
    statusMessage = 'BAY 04 // RESEARCH INTELLIGENCE CORE ACTIVE';
  } else if (p >= 0.34) {
    activeZone = 'community';
    zoneIndex = 2;
    statusMessage = 'AISLE 03 // COMMUNITY COLLABORATIVE LOUNGE';
  } else if (p >= 0.17) {
    activeZone = 'featured';
    zoneIndex = 1;
    statusMessage = 'BAY 02 // FEATURED DEPLOYMENTS & EVENTS';
  } else {
    activeZone = 'entry';
    zoneIndex = 0;
    statusMessage = 'BAY 01 // ENTRY THRESHOLD: WELCOME';
  }

  // 1. Cluster Transforms (Slide X and Opacity)
  // Majestic continuous data centre corridor: all clusters fully visible and aligned
  const c1Slide = 0;
  const c1Opacity = 1.0;

  const c2Slide = 0;
  const c2Opacity = 1.0;

  const c3Slide = 0;
  const c3Opacity = 1.0;

  // 2. Dynamic Lighting Targets (Harmonious 5200K Architectural Spectrum)
  // Light position glides smoothly along the corridor from Z = +4 to Z = -45
  const lightZ = 4.0 - p * 49.0;
  const lightIntensity = 1.50 + Math.sin(p * Math.PI) * 0.25;
  const lightColor = '#F0F6F7';
  const coreWashIntensity = 0.5 + (p >= 0.45 && p <= 0.75 ? 0.6 : 0.2);
  const chamberSpotIntensity = 0.25 + (p > 0.75 ? ((p - 0.75) / 0.25) * 1.85 : 0);

  // Mutate cached transition state to eliminate GC allocations
  cachedTransitionState.activeZone = activeZone;
  cachedTransitionState.zoneIndex = zoneIndex;
  cachedTransitionState.statusMessage = statusMessage;

  cachedTransitionState.clusters.c1.slide = c1Slide;
  cachedTransitionState.clusters.c1.opacity = c1Opacity;

  cachedTransitionState.clusters.c2.slide = c2Slide;
  cachedTransitionState.clusters.c2.opacity = c2Opacity;

  cachedTransitionState.clusters.c3.slide = c3Slide;
  cachedTransitionState.clusters.c3.opacity = c3Opacity;

  cachedTransitionState.lighting.lightZ = lightZ;
  cachedTransitionState.lighting.lightIntensity = lightIntensity;
  cachedTransitionState.lighting.lightColor = lightColor;
  cachedTransitionState.lighting.coreWashIntensity = coreWashIntensity;
  cachedTransitionState.lighting.chamberSpotIntensity = chamberSpotIntensity;

  return cachedTransitionState;
}
