'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
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

/**
 * SceneContainer (High-Performance Cyber Data Centre)
 * Atmospheric Architectural Lighting & Holographic Infrastructure:
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

        {/* 2. Key Overhead Aisle Downlight: 5000K Clean White along cold aisle */}
        <directionalLight
          position={[0, 9.5, 4.0]}
          color="#E8F8FA"
          intensity={1.75}
        />

        {/* 3. Cross-Aisle Rack Grazing Lights (Reveals drive caddies, louvers & mesh) */}
        {/* Left Rack Wash: Electric Cyan Grazing beam */}
        <directionalLight
          position={[4.8, 4.5, -12]}
          color="#00E5FF"
          intensity={1.25}
        />

        {/* Right Rack Wash: Neon Sage-Emerald Grazing beam */}
        <directionalLight
          position={[-4.8, 4.5, -12]}
          color="#22C55E"
          intensity={0.95}
        />

        {/* 4. Midground Cold Aisle Atmospheric Wash */}
        <directionalLight
          position={[-2.0, 4.0, -28]}
          color="#A7B7A1"
          intensity={1.1}
        />

        {/* Studio-Grade 3-Point Lighting for NEX-01 Robot Companion */}
        {/* Key Light: High-clarity white revealing ceramic curvature */}
        <directionalLight
          position={[2.8, 3.8, 11.2]}
          color="#FFFFFF"
          intensity={1.4}
        />

        {/* Intense Cyan Rim Light: Iconic luminous Tron/Disney edge silhouette */}
        <directionalLight
          position={[1.2, 3.2, 5.0]}
          color="#00F0FF"
          intensity={1.35}
        />

        {/* Floor Indirect Bounce Fill: Softens underside shadows */}
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

        {/* 3. Holographic Cube Projection Structures (Data centres projected before physical form) */}
        <HolographicDataCentreProjection />

        {/* 4. Enterprise Server Rack Lineup (Modular 42U Cabinets, Compute, GPUs, Storage) */}
        <EnterpriseServerRacks />

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
