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
import ServerRackBadges from './ServerRackBadges';
import HolographicDataCentreProjection from './HolographicDataCentreProjection';
import { getZoneTransitionState } from '@/utils/zoneTransition';

/**
 * ZoneLightingController
 * Unified, harmonious architectural lighting that seamlessly blends with the facility palette.
 * Replaces harsh, saturated primary neon colors with elegant, calibrated silver-cyan grazing
 * and soft ceramic sage atmospheric warmth.
 */
function ZoneLightingController({ scrollProgress = 0, scrollProgressRef }) {
  const overheadLightRef = useRef();
  const rackGrazingLeftRef = useRef();
  const rackGrazingRightRef = useRef();
  const chamberSpotRef = useRef();

  useFrame((_, delta) => {
    const rawP = scrollProgressRef?.current !== undefined ? scrollProgressRef.current : scrollProgress;
    const { lighting } = getZoneTransitionState(rawP);
    const lerpRate = Math.min(1, delta * 5);

    if (overheadLightRef.current) {
      overheadLightRef.current.position.z += (lighting.lightZ - overheadLightRef.current.position.z) * lerpRate;
      overheadLightRef.current.intensity = lighting.lightIntensity;
    }
    if (chamberSpotRef.current) {
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

      {/* 2. Cohesive Lateral Rack Grazing Lights (Uniform Ice-Silver Cyan for natural metallic speculars) */}
      {/* Left Row Grazing */}
      <directionalLight
        ref={rackGrazingLeftRef}
        position={[4.6, 4.2, -15]}
        color="#88D5E8"
        intensity={0.65}
      />

      {/* Right Row Grazing */}
      <directionalLight
        ref={rackGrazingRightRef}
        position={[-4.6, 4.2, -15]}
        color="#88D5E8"
        intensity={0.65}
      />

      {/* 3. Midground Soft Sage Floor Warmth: Signature AI Club atmospheric tone */}
      <directionalLight
        position={[0, 3.5, -22]}
        color="#94A891"
        intensity={0.40}
      />

      {/* 4. Dynamic Chamber Pedestal Spot */}
      <spotLight
        ref={chamberSpotRef}
        position={[0, 8.0, -35.0]}
        target-position={[0, 1.2, -35.0]}
        color="#E8F4EC"
        intensity={0.35}
        angle={0.65}
        penumbra={0.6}
        distance={28}
      />
    </>
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
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700 ease-out"
      style={{ opacity: sceneOpacity }}
    >
      <Canvas
        className="pointer-events-auto"
        style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}
        camera={{ position: [0, 1.9, 13.5], fov: 50, near: 0.1, far: 110 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          precision: 'mediump',
        }}
      >
        {/* Harmonious Obsidian Atmosphere: Blends seamlessly with website background */}
        <color attach="background" args={['#0A0E10']} />
        <fog attach="fog" args={['#0A0E10', 16, 78]} />

        {/* 1. Neutral Deep Shadow Ambient: Preserves rich true blacks */}
        <ambientLight color="#0F1416" intensity={0.52} />

        {/* 2. Harmonious Zone Lighting Controller */}
        <ZoneLightingController
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
        />

        {/* 3. Restrained Studio 3-Point Lighting for Companion NEX-01 */}
        {/* Soft Ceramic Key */}
        <directionalLight
          position={[2.6, 3.6, 11.0]}
          color="#FFFFFF"
          intensity={1.20}
        />

        {/* Subtle Silver-Cyan Rim (Calibrated, not blinding neon) */}
        <directionalLight
          position={[1.2, 3.0, 5.0]}
          color="#8ED5E8"
          intensity={0.60}
        />

        {/* Floor Bounce Fill */}
        <pointLight
          position={[1.3, 0.4, 8.5]}
          color="#1B2527"
          intensity={0.30}
          distance={3.5}
        />

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

        {/* Interactive In-World Server Badges (Optimized, zero pointLight shader lag) */}
        <ServerRackBadges
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
          activeNavId={activeNavId}
          onNavigateToSection={onNavigateToSection}
        />

        {/* NEX-01 Robot Companion */}
        <BdxRobot
          scale={0.94}
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
          isIntro={isIntro}
          isProjecting={isProjecting}
          onToggleProjector={onToggleProjector}
        />
      </Canvas>
    </div>
  );
}
