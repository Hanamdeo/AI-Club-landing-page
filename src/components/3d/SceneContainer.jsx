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
        camera={{ position: [0, 1.9, 13.5], fov: 50, near: 0.1, far: 115 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        {/* Controlled Enterprise Atmosphere: Deep Industrial Slate */}
        {/* Fog starts at distance 24 (Z = -11.5) preserving 100% sharpness in foreground */}
        <color attach="background" args={['#101415']} />
        <fog attach="fog" args={['#101415', 24, 95]} />

        {/* ============================================================== */}
        {/* BALANCED DATA CENTRE ILLUMINATION ARCHITECTURE                 */}
        {/* ============================================================== */}
        {/* 1. Ambient Baseline: Clean industrial baseline, no pitch-black corners */}
        <ambientLight color="#384446" intensity={1.15} />

        {/* 2. Key Overhead Downlight: 4500K Neutral White */}
        <directionalLight
          position={[0, 6.5, 9]}
          color="#FFFDF8"
          intensity={1.35}
          castShadow
          shadow-bias={-0.0001}
        />

        {/* 3. Server Rack Face Cross-Wash Lighting (reveals front panels & hardware details) */}
        {/* Left-to-Right Rack Cross Wash */}
        <directionalLight
          position={[-6, 4.2, 5]}
          color="#F5F9F8"
          intensity={1.25}
        />
        {/* Right-to-Left Rack Cross Wash */}
        <directionalLight
          position={[6, 4.2, 5]}
          color="#F5F9F8"
          intensity={1.25}
        />

        {/* 4. Ceiling Infrastructure Upward Fill (Reveals cable trays, ducts, and pipes) */}
        <directionalLight
          position={[0, -1.0, -10]}
          color="#425154"
          intensity={0.85}
        />

        {/* 5. Sage-Green High-Tech Identity Accent (Midground & Foundation Bay) */}
        <directionalLight
          position={[-2.5, 2.2, -18]}
          color="#A2B29F"
          intensity={0.70}
        />

        {/* 6. Continuous Central Cold Aisle Linear Downlights (Neutral White 4500K) */}
        {/* Distributed down the length of the ceiling linear battens */}
        {[10, 2, -6, -14, -22, -30, -38, -46, -54].map((z, idx) => (
          <group key={`aisle-lights-cluster-${idx}`}>
            {/* Left batten point light */}
            <pointLight
              position={[-1.65, 3.85, z]}
              color="#FFFDF8"
              intensity={1.15}
              distance={13}
              decay={2}
            />
            {/* Right batten point light */}
            <pointLight
              position={[1.65, 3.85, z]}
              color="#FFFDF8"
              intensity={1.15}
              distance={13}
              decay={2}
            />
          </group>
        ))}

        {/* Dynamic Scroll-Controlled Camera along Cold Aisle */}
        <CameraController scrollProgress={scrollProgress} isIntro={isIntro} />

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

        {/* BDX-01 Autonomous Robot Companion */}
        <BdxRobot
          scale={1.05}
          scrollProgress={scrollProgress}
          isIntro={isIntro}
          isProjecting={isProjecting}
          onToggleProjector={onToggleProjector}
        />
      </Canvas>
    </div>
  );
}
