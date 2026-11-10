'use client';

import React from 'react';

/**
 * RobotFace.jsx (Full BDX Research Companion Bot)
 * Custom 2D Vector Robot based on the AI Club 3D Laboratory Mascot.
 * 
 * Features:
 * - Complete Full-Body Robot:
 *   - Pearlescent white spherical head with studio specular highlights.
 *   - Headphone-style cylindrical ear pods with illuminated cyan core rings & aerodynamic fin.
 *   - Glossy dark indigo/obsidian visor screen with curved glass reflection.
 *   - Smooth hovering pod torso with articulated side fin arms.
 *   - Signature chest illuminated shield reactor core with segmented cyan LED ring & button.
 *   - Deep navy aerodynamic thruster hover cap at the base.
 * - Glowing digital cyan LED eyes with 6 distinct expression variants.
 * - Strictly stationary chassis: ONLY eyes blink naturally with staggered intervals.
 * - Full prefers-reduced-motion accessibility support.
 */

const VARIANT_NAMES = [
  'friendly',
  'neutral',
  'curious',
  'focused',
  'analytical',
  'surprised',
];

const VARIANT_CONFIGS = {
  friendly: {
    name: 'Robot 01 — Friendly (Happy Arcs)',
    duration: '4.2s',
    delay: '0.5s',
  },
  neutral: {
    name: 'Robot 02 — Neutral (Calm LED Ovals)',
    duration: '4.7s',
    delay: '1.2s',
  },
  curious: {
    name: 'Robot 03 — Curious (Asymmetric Inquisitive)',
    duration: '3.9s',
    delay: '1.8s',
  },
  focused: {
    name: 'Robot 04 — Focused (Angled Concentrated Slits)',
    duration: '5.1s',
    delay: '2.4s',
  },
  analytical: {
    name: 'Robot 05 — Analytical (Scanner Reticles)',
    duration: '4.0s',
    delay: '1.0s',
  },
  surprised: {
    name: 'Robot 06 — Surprised (Wide Apertures)',
    duration: '4.8s',
    delay: '2.8s',
  },
};

export default function RobotFace({
  variant = 'friendly',
  size = 68,
  className = '',
}) {
  // Normalize variant string or number index
  let normalizedVariant = 'friendly';
  if (typeof variant === 'number') {
    normalizedVariant = VARIANT_NAMES[Math.abs(variant) % VARIANT_NAMES.length];
  } else if (typeof variant === 'string' && VARIANT_CONFIGS[variant.toLowerCase()]) {
    normalizedVariant = variant.toLowerCase();
  }

  const config = VARIANT_CONFIGS[normalizedVariant] || VARIANT_CONFIGS.friendly;
  const animClass = `robot-blink-${normalizedVariant}`;

  // Aspect ratio: width 80, height 102
  const width = size;
  const height = (size * 102) / 80;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width, height }}
      aria-label={config.name}
      title={config.name}
    >
      <style jsx>{`
        @keyframes robotBlinkKeyframe {
          0%, 91%, 100% {
            transform: scaleY(1);
          }
          95% {
            transform: scaleY(0.06);
          }
        }
        .${animClass} {
          transform-origin: 40px 29.5px;
          animation: robotBlinkKeyframe ${config.duration} infinite ease-in-out;
          animation-delay: ${config.delay};
        }
        @media (prefers-reduced-motion: reduce) {
          .${animClass} {
            animation: none !important;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 80 102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Pearlescent White Dome Gradient */}
          <linearGradient id="fullRoboHeadGrad" x1="40" y1="6" x2="40" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#EFF4F8" />
            <stop offset="100%" stopColor="#D5DFE8" />
          </linearGradient>

          {/* White Torso Gradient */}
          <linearGradient id="fullRoboTorsoGrad" x1="40" y1="52" x2="40" y2="92" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#ECF2F7" />
            <stop offset="100%" stopColor="#C9D6E2" />
          </linearGradient>

          {/* Arm Gradient Left */}
          <linearGradient id="fullRoboArmGradL" x1="16" y1="54" x2="16" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CBD8E4" />
          </linearGradient>

          {/* Arm Gradient Right */}
          <linearGradient id="fullRoboArmGradR" x1="64" y1="54" x2="64" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CBD8E4" />
          </linearGradient>

          {/* Deep Obsidian Visor Screen Gradient */}
          <linearGradient id="fullRoboVisorGrad" x1="40" y1="15" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#141A2E" />
            <stop offset="40%" stopColor="#0D1120" />
            <stop offset="100%" stopColor="#060811" />
          </linearGradient>

          {/* Ear Module Outer Ring Gradient */}
          <linearGradient id="fullRoboEarGrad" x1="0" y1="18" x2="0" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CCD6E0" />
          </linearGradient>

          {/* Cyan Glow Filter for Eyes & Reactor */}
          <filter id="fullRoboCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#38D9FF" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* ============================================================== */}
        {/* 1. AERODYNAMIC FIN / ANTENNA (Behind Left Ear)                 */}
        {/* ============================================================== */}
        <path
          d="M15 20 L8 5 Q17 9 19 21 Z"
          fill="#24BFEA"
          stroke="#198FB5"
          strokeWidth="0.8"
        />
        <path
          d="M12 11 L10 7 Q14 10 15 16 Z"
          fill="#55DFFF"
          opacity="0.8"
        />

        {/* ============================================================== */}
        {/* 2. LOWER BODY & TORSO (Hovering Pod Chassis)                   */}
        {/* ============================================================== */}
        {/* Torso Ambient Drop Shadow */}
        <path
          d="M26 55 C26 55 23 74 33 87 C37 92 43 92 47 87 C57 74 54 55 54 55 Z"
          fill="#94A3B8"
          opacity="0.3"
        />

        {/* Main Egg-pod White Torso */}
        <path
          d="M26 54 C26 54 23 72 33 85 C37 90 43 90 47 85 C57 72 54 54 54 54 Z"
          fill="url(#fullRoboTorsoGrad)"
          stroke="#CBD5E1"
          strokeWidth="1"
        />

        {/* Dark Navy Aerodynamic Hover Thruster Cap at Bottom Tip */}
        <path
          d="M33 85 C37 90 43 90 47 85 C46 95 34 95 33 85 Z"
          fill="#1A2B5E"
          stroke="#121D42"
          strokeWidth="0.8"
        />
        {/* Glowing Thruster Center Bead */}
        <ellipse cx="40" cy="91" rx="2.5" ry="1.2" fill="#38D9FF" opacity="0.85" filter="url(#fullRoboCyanGlow)" />

        {/* ============================================================== */}
        {/* 3. CHEST SHIELD REACTOR CORE (Signature Illuminated Emblem)    */}
        {/* ============================================================== */}
        {/* White Outer Shield Bezel */}
        <path
          d="M30 61 H50 C50 61 51.5 75 40 81 C28.5 75 30 61 30 61 Z"
          fill="#FFFFFF"
          stroke="#CCD8E4"
          strokeWidth="1"
        />

        {/* Recessed Dark Shield Cavity */}
        <path
          d="M32 63 H48 C48 63 49 73.5 40 78.5 C31 73.5 32 63 32 63 Z"
          fill="#0B1220"
        />

        {/* Glowing Cyan Segmented Arc Reactor Ring */}
        <g filter="url(#fullRoboCyanGlow)">
          {/* Top Arc Segment */}
          <path d="M34 65.5 H46" stroke="#38D9FF" strokeWidth="1.8" strokeLinecap="round" />
          {/* Left Arc Segment */}
          <path d="M34 68 Q33 72 36 75" stroke="#38D9FF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Right Arc Segment */}
          <path d="M46 68 Q47 72 44 75" stroke="#38D9FF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Bottom V Segment */}
          <path d="M38.5 76.5 L40 77.5 L41.5 76.5" stroke="#38D9FF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </g>

        {/* Inner Reactor Central Hub */}
        <circle cx="40" cy="70" r="4.2" fill="#0E1626" stroke="#1D2A40" strokeWidth="0.9" />
        {/* Cyan Glowing Core Button */}
        <circle cx="40" cy="70" r="2.2" fill="#38D9FF" filter="url(#fullRoboCyanGlow)" />
        <circle cx="40" cy="70" r="0.9" fill="#FFFFFF" />

        {/* ============================================================== */}
        {/* 4. STREAMLINED HOVERING ARMS                                    */}
        {/* ============================================================== */}
        {/* Left Arm (Angled down-left) */}
        <g transform="rotate(22 20 62)">
          <rect x="16" y="52" width="7.5" height="19" rx="3.75" fill="url(#fullRoboArmGradL)" stroke="#CBD5E1" strokeWidth="0.9" />
          {/* Inner Dark Joint Accent */}
          <path d="M17.5 67 Q19.75 70 22 67" stroke="#1A2434" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Right Arm (Angled down-right) */}
        <g transform="rotate(-22 60 62)">
          <rect x="56.5" y="52" width="7.5" height="19" rx="3.75" fill="url(#fullRoboArmGradR)" stroke="#CBD5E1" strokeWidth="0.9" />
          {/* Inner Dark Joint Accent */}
          <path d="M58 67 Q60.25 70 62.5 67" stroke="#1A2434" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* ============================================================== */}
        {/* 5. CHASSIS HEAD DOME (Spherical Pearlescent White)             */}
        {/* ============================================================== */}
        {/* Neck Shadow Occlusion */}
        <ellipse cx="40" cy="51" rx="14" ry="4" fill="#94A3B8" opacity="0.4" />

        {/* Main Head Dome Sphere */}
        <ellipse
          cx="40"
          cy="29.5"
          rx="26"
          ry="23.5"
          fill="url(#fullRoboHeadGrad)"
          stroke="#CBD5E1"
          strokeWidth="1"
        />

        {/* Top Dome Specular Curved Light Arc */}
        <path
          d="M28 10 Q40 6.5 52 10"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* ============================================================== */}
        {/* 6. SIDE EAR POD MODULES (Cylindrical Headphone Ring Caps)      */}
        {/* ============================================================== */}
        {/* Left Ear Pod */}
        <g>
          <ellipse cx="14" cy="29.5" rx="5.5" ry="11" fill="url(#fullRoboEarGrad)" stroke="#B8C5D0" strokeWidth="0.9" />
          <ellipse cx="13.5" cy="29.5" rx="3.5" ry="8" fill="#0C1322" />
          <ellipse cx="13.5" cy="29.5" rx="2.2" ry="5.5" stroke="#38D9FF" strokeWidth="1.2" fill="none" opacity="0.9" filter="url(#fullRoboCyanGlow)" />
          <ellipse cx="13.5" cy="29.5" rx="1" ry="2.5" fill="#38D9FF" />
        </g>

        {/* Right Ear Pod */}
        <g>
          <ellipse cx="66" cy="29.5" rx="5.5" ry="11" fill="url(#fullRoboEarGrad)" stroke="#B8C5D0" strokeWidth="0.9" />
          <ellipse cx="66.5" cy="29.5" rx="3.5" ry="8" fill="#0C1322" />
          <ellipse cx="66.5" cy="29.5" rx="2.2" ry="5.5" stroke="#38D9FF" strokeWidth="1.2" fill="none" opacity="0.9" filter="url(#fullRoboCyanGlow)" />
          <ellipse cx="66.5" cy="29.5" rx="1" ry="2.5" fill="#38D9FF" />
        </g>

        {/* ============================================================== */}
        {/* 7. LARGE DARK GLOSSY VISOR SCREEN                              */}
        {/* ============================================================== */}
        {/* Visor Bezel Inset Shadow */}
        <ellipse cx="40" cy="29.5" rx="19.5" ry="14.5" fill="#B0BDC9" opacity="0.6" />

        {/* Deep Indigo/Obsidian Visor Screen */}
        <ellipse
          cx="40"
          cy="29"
          rx="19"
          ry="14"
          fill="url(#fullRoboVisorGrad)"
          stroke="rgba(85,223,255,0.35)"
          strokeWidth="1.2"
        />

        {/* Glossy Curved Visor Reflection (Top Edge Sheen) */}
        <path
          d="M26 21 Q40 17 54 21"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Bottom Visor Secondary Subtle Ambient Glow */}
        <path
          d="M29 38 Q40 41 51 38"
          stroke="rgba(56,217,255,0.2)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* ============================================================== */}
        {/* 8. GLOWING CYAN LED EYES (Stationary chassis; ONLY eyes blink)  */}
        {/* ============================================================== */}
        <g className={animClass} filter="url(#fullRoboCyanGlow)">
          {/* ------------------------------------------------------------ */}
          {/* VARIANT 01: FRIENDLY (Exact Match: Happy Upward Cyber Arcs)  */}
          {/* ------------------------------------------------------------ */}
          {normalizedVariant === 'friendly' && (
            <g>
              {/* Left Smiling Arc */}
              <path
                d="M28 32.5 Q33 23.5 38 32.5"
                stroke="#38D9FF"
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right Smiling Arc */}
              <path
                d="M42 32.5 Q47 23.5 52 32.5"
                stroke="#38D9FF"
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Digital LED dot highlights inside arcs */}
              <circle cx="33" cy="26" r="1" fill="#FFFFFF" opacity="0.8" />
              <circle cx="47" cy="26" r="1" fill="#FFFFFF" opacity="0.8" />
            </g>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VARIANT 02: NEUTRAL (Calm, Steady Glowing LED Capsules)       */}
          {/* ------------------------------------------------------------ */}
          {normalizedVariant === 'neutral' && (
            <g>
              {/* Left Eye */}
              <rect x="29" y="24.5" width="8" height="9.5" rx="4" fill="#38D9FF" />
              <circle cx="31" cy="27" r="1.3" fill="#FFFFFF" opacity="0.9" />
              {/* Right Eye */}
              <rect x="43" y="24.5" width="8" height="9.5" rx="4" fill="#38D9FF" />
              <circle cx="45" cy="27" r="1.3" fill="#FFFFFF" opacity="0.9" />
            </g>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VARIANT 03: CURIOUS (Asymmetric: Left Raised + Arch Brow)     */}
          {/* ------------------------------------------------------------ */}
          {normalizedVariant === 'curious' && (
            <g>
              {/* Inquisitive Eyebrow Arc over Left Eye */}
              <path
                d="M28 20.5 Q33 18 38 20.5"
                stroke="#38D9FF"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Left Eye (Wide Round Inquisitive Aperture) */}
              <rect x="28.5" y="23" width="9" height="11" rx="4.5" fill="#38D9FF" />
              <circle cx="31" cy="25.5" r="1.5" fill="#FFFFFF" opacity="0.95" />
              {/* Right Eye (Narrower Calm Oval) */}
              <rect x="43.5" y="26" width="8" height="7.5" rx="3.5" fill="#38D9FF" />
              <circle cx="45.5" cy="28" r="1.2" fill="#FFFFFF" opacity="0.85" />
            </g>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VARIANT 04: FOCUSED (Sharp Inward-Slanted Concentrated Slits) */}
          {/* ------------------------------------------------------------ */}
          {normalizedVariant === 'focused' && (
            <g>
              {/* Left Laser Slit */}
              <polygon points="27,28 37,24.5 37,31 27,33" fill="#38D9FF" />
              <line x1="28" y1="29" x2="36" y2="26" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
              {/* Right Laser Slit */}
              <polygon points="53,28 43,24.5 43,31 53,33" fill="#38D9FF" />
              <line x1="52" y1="29" x2="44" y2="26" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
            </g>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VARIANT 05: ANALYTICAL (Target Reticle Optics & Crosshairs)   */}
          {/* ------------------------------------------------------------ */}
          {normalizedVariant === 'analytical' && (
            <g>
              {/* Left Eye Reticle */}
              <circle cx="33" cy="29" r="5" stroke="#38D9FF" strokeWidth="1.6" fill="none" />
              <circle cx="33" cy="29" r="2" fill="#38D9FF" />
              <circle cx="33" cy="29" r="0.8" fill="#FFFFFF" />
              <line x1="26" y1="29" x2="28" y2="29" stroke="#38D9FF" strokeWidth="1.2" />
              <line x1="38" y1="29" x2="40" y2="29" stroke="#38D9FF" strokeWidth="1.2" />

              {/* Right Eye Reticle */}
              <circle cx="47" cy="29" r="5" stroke="#38D9FF" strokeWidth="1.6" fill="none" />
              <circle cx="47" cy="29" r="2" fill="#38D9FF" />
              <circle cx="47" cy="29" r="0.8" fill="#FFFFFF" />
              <line x1="40" y1="29" x2="42" y2="29" stroke="#38D9FF" strokeWidth="1.2" />
              <line x1="52" y1="29" x2="54" y2="29" stroke="#38D9FF" strokeWidth="1.2" />
            </g>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VARIANT 06: SURPRISED (Wide Circular Discovery Apertures)    */}
          {/* ------------------------------------------------------------ */}
          {normalizedVariant === 'surprised' && (
            <g>
              {/* Left Eye: Big Alert Circle */}
              <circle cx="33" cy="29" r="5.5" fill="#38D9FF" />
              <circle cx="33" cy="29" r="2.4" fill="#0A0F1E" />
              <circle cx="34.8" cy="27.2" r="1.1" fill="#FFFFFF" />

              {/* Right Eye: Big Alert Circle */}
              <circle cx="47" cy="29" r="5.5" fill="#38D9FF" />
              <circle cx="47" cy="29" r="2.4" fill="#0A0F1E" />
              <circle cx="48.8" cy="27.2" r="1.1" fill="#FFFFFF" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
