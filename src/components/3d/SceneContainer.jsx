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

/**
 * SceneContainer (Refinement V3)
 * High-Clarity Enterprise Autonomous AI Data Centre & Research Facility Canvas:
 * - Balanced architectural lighting hierarchy with cross-aisle rack illumination
 * - Pushed-back atmospheric depth fog (near: 24m, far: 95m) for razor-sharp foreground & midground
 * - Dual linear aisle ceiling downlights revealing server faces, vents, and RAF floor tiles
 * - Upward ceiling wash revealing FiberRunner, cable trays, and chilled water pipes
 * - Crisp, unblurred BDX-01 companion rendering
 */
export default function SceneContainer({
  scrollProgress = 0,
  scrollProgressRef,
  isIntro = false,
  isProjecting = false,
  onOpenRackModal,
  onToggleProjector,
  sceneOpacity = 1,
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
        {/* Controlled Enterprise Atmosphere: Deep Industrial Slate */}
        {/* Fog starts at distance 24 (Z = -11.5) preserving 100% sharpness in foreground */}
        <color attach="background" args={['#101415']} />
        <fog attach="fog" args={['#101415', 24, 90]} />

        {/* ============================================================== */}
        {/* HIGH-PERFORMANCE DATA CENTRE LIGHTING ARCHITECTURE             */}
        {/* Streamlined from 24 lights down to 5 balanced lights for 60FPS */}
        {/* ============================================================== */}
        {/* 1. Base Ambient: Crisp even baseline across entire corridor */}
        <ambientLight color="#455254" intensity={1.25} />

        {/* 2. Key Overhead Downlight: 4500K Neutral White along corridor */}
        <directionalLight
          position={[0, 9.0, 5]}
          color="#FFFDF8"
          intensity={1.5}
        />

        {/* Studio-Grade Lighting Suite for NEX-01 Autonomous Companion */}
        {/* Soft Key Light: Reveals smooth ceramic curves and visor reflections */}
        <directionalLight
          position={[2.8, 3.8, 11.2]}
          color="#FFFDF7"
          intensity={1.15}
        />

        {/* Cyan Rim Light: Grazes helmet silhouette and ear fins from behind */}
        <directionalLight
          position={[1.2, 3.2, 5.0]}
          color="#00E5FF"
          intensity={0.95}
        />

        {/* Floor Indirect Bounce Fill: Softens under-chin and thruster shadows */}
        <pointLight
          position={[1.3, 0.4, 8.5]}
          color="#E8E2D5"
          intensity={0.65}
          distance={4.0}
        />

        {/* 3. Server Rack Face Cross-Wash Lighting (Reveals front panels & caddies) */}
        <directionalLight
          position={[-6, 5.0, -15]}
          color="#E8F2F4"
          intensity={1.15}
        />
        <directionalLight
          position={[6, 5.0, -15]}
          color="#E8F2F4"
          intensity={1.15}
        />

        {/* 4. Sage Identity Accent Light (Foundation Bay & Midground) */}
        <directionalLight
          position={[-2.5, 3.0, -28]}
          color="#A2B29F"
          intensity={0.85}
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

        {/* 3. Enterprise Server Rack Lineup (Modular 42U Cabinets, Compute, GPUs, Storage) */}
        <EnterpriseServerRacks />

        {/* 4. In-Row Precision Cooling Units (CRAH) */}
        <InRowCoolingUnits />

        {/* 5. Suspended Overhead Technical Identity Signage */}
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
