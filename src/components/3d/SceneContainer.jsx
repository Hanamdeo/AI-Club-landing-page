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
 * Dynamically shifts lighting focus, aisle downlight trajectory, and chamber spotlights
 * in lockstep with the active server rack cluster transition.
 */
function ZoneLightingController({ scrollProgress = 0, scrollProgressRef }) {
  const overheadLightRef = useRef();
  const coreWashRef = useRef();
  const chamberSpotRef = useRef();

  useFrame((_, delta) => {
    const rawP = scrollProgressRef?.current !== undefined ? scrollProgressRef.current : scrollProgress;
    const { lighting } = getZoneTransitionState(rawP);
    const lerpRate = Math.min(1, delta * 5);

    if (overheadLightRef.current) {
      overheadLightRef.current.position.z += (lighting.lightZ - overheadLightRef.current.position.z) * lerpRate;
      overheadLightRef.current.intensity = lighting.lightIntensity;
      overheadLightRef.current.color.set(lighting.lightColor);
    }
    if (coreWashRef.current) {
      coreWashRef.current.intensity += (lighting.coreWashIntensity - coreWashRef.current.intensity) * lerpRate;
    }
    if (chamberSpotRef.current) {
      chamberSpotRef.current.intensity += (lighting.chamberSpotIntensity - chamberSpotRef.current.intensity) * lerpRate;
    }
  });

  return (
    <>
      {/* Dynamic Key Overhead Downlight: Follows visitor along cold aisle Z */}
      <directionalLight
        ref={overheadLightRef}
        position={[0, 9.5, 4.0]}
        color="#E8F8FA"
        intensity={1.75}
      />

      {/* Cross-Aisle Rack Grazing Lights */}
      <directionalLight
        ref={coreWashRef}
        position={[4.8, 4.5, -15]}
        color="#00E5FF"
        intensity={1.25}
      />

      <directionalLight
        position={[-4.8, 4.5, -12]}
        color="#22C55E"
        intensity={0.95}
      />

      {/* Midground Atmospheric Wash */}
      <directionalLight
        position={[-2.0, 4.0, -28]}
        color="#A7B7A1"
        intensity={1.1}
      />

      {/* Dynamic Chamber Volumetric Pedestal Spotlight */}
      <spotLight
        ref={chamberSpotRef}
        position={[0, 8.5, -35.0]}
        target-position={[0, 1.2, -35.0]}
        color="#FFFFFF"
        intensity={0.3}
        angle={0.65}
        penumbra={0.6}
        distance={30}
      />
    </>
  );
}

/**
 * SceneContainer (High-Performance Cyber Data Centre)
 * Atmospheric Architectural Lighting & Holographic Infrastructure:
 * - Dynamic cluster transitions: server clusters smoothly fade/part outward to reveal next bay
 * - Holographic cube-matrix projection of server racks before physical form
 * - In-world 3D Server Node Badges marking key facilities along the corridor
 * - Deep cinematic contrast lighting with electric cyan rim Grazing & soft bounce
 * - 60+ FPS optimized GPU pipeline
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000 ease-out"
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
        {/* Controlled Enterprise Atmosphere: Deep Midnight Slate */}
        <color attach="background" args={['#0C1012']} />
        <fog attach="fog" args={['#0C1012', 20, 85]} />

        {/* ============================================================== */}
        {/* CINEMATIC DATA CENTRE LIGHTING ARCHITECTURE                     */}
        {/* Deep contrast shadows, cool cyan rim grazes, crisp floor bounce */}
        {/* ============================================================== */}
        {/* 1. Deep Midnight Base Ambient: Preserves true obsidian blacks on server faces */}
        <ambientLight color="#0D171A" intensity={0.65} />

        {/* Dynamic Zone Lighting Controller: Shifts focus along cold aisle */}
        <ZoneLightingController
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
        />

        {/* Studio-Grade 3-Point Lighting for NEX-01 Robot Companion */}
        <directionalLight
          position={[2.8, 3.8, 11.2]}
          color="#FFFFFF"
          intensity={1.4}
        />

        <directionalLight
          position={[1.2, 3.2, 5.0]}
          color="#00F0FF"
          intensity={1.35}
        />

        <pointLight
          position={[1.3, 0.4, 8.5]}
          color="#8BE9FD"
          intensity={0.55}
          distance={4.0}
        />

        {/* Dynamic Scroll-Controlled Camera along Cold Aisle */}
        <CameraController
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
          isIntro={isIntro}
        />

        {/* ============================================================== */}
        {/* DATA CENTRE PHYSICAL INFRASTRUCTURE                            */}
        {/* ============================================================== */}
        {/* 1. Raised Access Floor System */}
        <DataCentreFloor />

        {/* 2. Industrial Ceiling & Overhead Cable Trays */}
        <DataCentreCeiling />

        {/* 3. Holographic Cube Projection Structures (Cluster Transition Pulse) */}
        <HolographicDataCentreProjection
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
        />

        {/* 4. Enterprise Server Rack Lineup (Cluster Transition Engine) */}
        <EnterpriseServerRacks
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
        />

        {/* 5. In-Row Precision Cooling Units (CRAH) */}
        <InRowCoolingUnits />

        {/* 6. Suspended Overhead Technical Identity Signage */}
        <DataCentreSignage />

        {/* ============================================================== */}
        {/* SECTION SPECIFIC ARCHITECTURAL LANDMARKS                       */}
        {/* ============================================================== */}
        {/* Section 01: Entrance Airlock Bulkhead */}
        <EntranceGate />

        {/* Section 02: Foundation Bay & Interactive Rack Inspection Node */}
        <FoundationBay />
        <InteractiveServerRack onOpenModal={onOpenRackModal} />

        {/* Section 03: The Projection Chamber Landmark */}
        <ProjectionChamber isProjecting={isProjecting} />

        {/* Interactive In-World Server Rack Badges lining the cold aisle */}
        <ServerRackBadges
          scrollProgress={scrollProgress}
          scrollProgressRef={scrollProgressRef}
          activeNavId={activeNavId}
          onNavigateToSection={onNavigateToSection}
        />

        {/* NEX-01 Autonomous Robot Companion */}
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
