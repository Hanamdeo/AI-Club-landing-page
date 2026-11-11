'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import CameraController from './CameraController';
import DataCentreFloor from './DataCentreFloor';
import DataCentreCeiling from './DataCentreCeiling';
import EnterpriseServerRacks from './EnterpriseServerRacks';
import InRowCoolingUnits from './InRowCoolingUnits';
import DataCentreSignage from './DataCentreSignage';
import InteractiveServerRack from './landmarks/InteractiveServerRack';
import BdxRobot from './BdxRobot';
import EntranceGate from './landmarks/EntranceGate';
import FoundationBay from './landmarks/FoundationBay';
import ProjectionChamber from './landmarks/ProjectionChamber';
import HolographicDataCentreProjection from './HolographicDataCentreProjection';
import { getZoneTransitionState } from '@/utils/zoneTransition';
import { usePerformanceTier } from '@/utils/ResponsivePerformanceManager';

/**
 * ZoneLightingController
 * Unified, harmonious architectural lighting that seamlessly blends with the facility palette.
 * Replaces harsh, saturated primary neon colors with elegant, calibrated silver-cyan grazing
 * and soft ceramic sage atmospheric warmth.
 */
function ZoneLightingController({ scrollProgress = 0, scrollProgressRef, isLowTier = false }) {
  const overheadLightRef = useRef();
  const chamberSpotRef = useRef();

  useFrame((_, delta) => {
    const rawP = scrollProgressRef?.current !== undefined ? scrollProgressRef.current : scrollProgress;
    const { lighting } = getZoneTransitionState(rawP);
    const lerpRate = Math.min(1, delta * 5);

    if (overheadLightRef.current) {
      overheadLightRef.current.position.z += (lighting.lightZ - overheadLightRef.current.position.z) * lerpRate;
      overheadLightRef.current.intensity = lighting.lightIntensity;
    }
    if (chamberSpotRef.current && !isLowTier) {
      chamberSpotRef.current.intensity += (lighting.chamberSpotIntensity - chamberSpotRef.current.intensity) * lerpRate;
    }
  });

  return (
    <>
      {/* 1. Dynamic Key Overhead Downlight: 5200K architectural clean daylight */}
      <directionalLight
        ref={overheadLightRef}
        position={[0, 9.5, 4.0]}
        color="#F0F6F7"
        intensity={1.50}
      />

      {/* 2. Cohesive Lateral Rack Grazing Light (Omitted on low tier to preserve mobile fillrate) */}
      {!isLowTier && (
        <directionalLight
          position={[0, 4.5, -15]}
          color="#E2E8F0"
          intensity={0.65}
        />
      )}

      {/* 3. Dynamic Chamber Pedestal Spot (Omitted on low tier to preserve mobile fillrate) */}
      {!isLowTier && (
        <spotLight
          ref={chamberSpotRef}
          position={[0, 8.0, -35.0]}
          target-position={[0, 1.2, -35.0]}
          color="#F8FAFC"
          intensity={0.35}
          angle={0.65}
          penumbra={0.6}
          distance={28}
        />
      )}
    </>
  );
}

/**
 * VanishingPointPortal
 * The illuminated doorway seen at the corridor vanishing point in monochrome silver-white.
 */
function VanishingPointPortal() {
  return (
    <group position={[0, 1.6, -58]}>
      {/* Outer Door Frame Arch (Crisp White) */}
      <mesh position={[-1.2, 0, 0]}>
        <boxGeometry args={[0.15, 3.2, 0.2]} />
        <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
      </mesh>
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[0.15, 3.2, 0.2]} />
        <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[2.55, 0.15, 0.2]} />
        <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
      </mesh>

      {/* Radiant Portal Light Aperture */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.25, 3.05]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>

      {/* Atmospheric Forward Beam (Crisp White) */}
      <pointLight position={[0, 0, 1.5]} color="#FFFFFF" intensity={2.2} distance={18} decay={2} />
    </group>
  );
}

/**
 * SceneContainer (High-Performance Cyber Data Centre)
 * - Harmonious, non-clashing cinematic lighting (obsidian base, silver-cyan grazing, soft sage warmth)
 * - Zero-lag cluster hardware engine
 * - Seamless fog-to-background visual blending
 */
export default function SceneContainer({
  scrollProgress = 0,
  scrollProgressRef,
  isIntro = false,
  isProjecting = false,
  onOpenRackModal,
  onToggleProjector,
  sceneOpacity = 1,
  onNavigateToSection,
  activeNavId = 'hero',
}) {
  const tierState = usePerformanceTier();
  const isLowTier = tierState.tier === 'low';
  const maxLights = tierState.features?.maxLights ?? 5;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700 ease-out"
      style={{ opacity: sceneOpacity }}
    >
      <Canvas
        className="pointer-events-auto"
        style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}
        camera={{ position: [0, 1.9, 13.5], fov: 50, near: 0.15, far: isLowTier ? 65 : 110 }}
        dpr={isLowTier ? 1.0 : [1, Math.min(1.25, tierState.dpr)]}
        gl={{
          antialias: !isLowTier,
          powerPreference: isLowTier ? 'low-power' : 'high-performance',
          stencil: false,
          depth: true,
          precision: isLowTier ? 'lowp' : 'mediump',
        }}
        onCreated={({ gl, scene, camera }) => {
          if (typeof window !== 'undefined') { window.__THREE_SCENE__ = scene; window.__THREE_CAMERA__ = camera; }
          if (typeof window !== 'undefined') {
            window.__THREE_GL__ = gl;
          }
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('[WebGL] Context lost. Attempting recovery...');
          });
        }}
      >
        {/* Architectural Monochrome Atmosphere with Slate Grey Nuance */}
        <color attach="background" args={['#080A0C']} />
        <fog attach="fog" args={['#080A0C', 22, isLowTier ? 65 : 90]} />

        {/* 1. Deep Neutral Shadow Ambient: Preserves blacks while enhancing metallic slate edges */}
        <ambientLight color="#181B1F" intensity={0.65} />

        {/* 2. Harmonious Zone Lighting Controller */}
        <ZoneLightingController
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
          isLowTier={isLowTier}
        />

        {/* 3. Studio Lighting for Centered Companion NEX-01 */}
        {/* Soft Ceramic Key */}
        <directionalLight
          position={[1.8, 3.6, 11.0]}
          color="#FFFFFF"
          intensity={1.20}
        />

        {/* Subtle Silver-Cyan Rim (Calibrated, not blinding neon) */}
        {maxLights >= 4 && (
          <directionalLight
            position={[-1.8, 3.0, 5.0]}
            color="#E2E8F0"
            intensity={0.60}
          />
        )}

        {/* Floor Bounce Fill */}
        {maxLights >= 5 && (
          <pointLight
            position={[0.0, 0.4, 8.5]}
            color="#1B2527"
            intensity={0.30}
            distance={3.5}
          />
        )}

        {/* Dynamic Scroll-Controlled Camera along Cold Aisle */}
        <CameraController
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
          isIntro={isIntro}
        />

        {/* ============================================================== */}
        {/* DATA CENTRE INFRASTRUCTURE                                     */}
        {/* ============================================================== */}
        <DataCentreFloor />
        <DataCentreCeiling />

        {/* Holographic Projection (Synchronized with transitions) */}
        <HolographicDataCentreProjection
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
        />

        {/* Ultra-Fast Enterprise Server Rack Lineup */}
        <EnterpriseServerRacks
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
        />

        <InRowCoolingUnits />
        <DataCentreSignage />

        {/* Section Landmarks */}
        <EntranceGate />
        <FoundationBay />
        <InteractiveServerRack onOpenModal={onOpenRackModal} />
        <ProjectionChamber isProjecting={isProjecting} />
        <VanishingPointPortal />

        {/* NEX-01 Robot Companion */}
        <BdxRobot
          scale={0.94}
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
          isIntro={isIntro}
          isProjecting={isProjecting}
          onToggleProjector={onToggleProjector}
          activeNavId={activeNavId}
        />
      </Canvas>
    </div>
  );
}
