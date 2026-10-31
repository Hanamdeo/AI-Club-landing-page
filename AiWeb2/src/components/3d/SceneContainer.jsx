'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import DataCentreCorridor from './DataCentreCorridor';
import ServerRackInstanced from './ServerRackInstanced';
import BdxRobot from './BdxRobot';
import EntranceGate from './landmarks/EntranceGate';
import FoundationBay from './landmarks/FoundationBay';
import ResearchSphere from './landmarks/ResearchSphere';
import OperationsBridge from './landmarks/OperationsBridge';
import BladeArchive from './landmarks/BladeArchive';
import CommunityLounge from './landmarks/CommunityLounge';
import ExitPortal from './landmarks/ExitPortal';

/**
 * SceneContainer
 * Master WebGL Canvas containing the continuous 3D Data Centre facility.
 * Fixed in the background behind transparent HTML overlay views.
 */
export default function SceneContainer({ scrollProgress = 0, isIntro = false }) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 2.2, 16.5], fov: 55, near: 0.1, far: 140 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        {/* Soft Industrial Atmospheric Fog */}
        <color attach="background" args={['#141718']} />
        <fog attach="fog" args={['#141718', 8, 55]} />

        {/* Enhanced Ambient & Key Architectural Lighting */}
        <ambientLight color="#353E3D" intensity={0.95} />
        <directionalLight
          position={[0, 5, 12]}
          target-position={[0, 1, -20]}
          color="#FFF8EE"
          intensity={1.4}
        />

        {/* Dynamic Scroll-Controlled Camera with Entrance Fly-in */}
        <CameraController scrollProgress={scrollProgress} isIntro={isIntro} />

        {/* Continuous Architectural Corridor Infrastructure */}
        <DataCentreCorridor />

        {/* Instanced Server Rack Cluster (80+ Racks) */}
        <ServerRackInstanced />

        {/* BDX Biped Companion Robot: Standing in Corridor Facing Forward into Camera with Two White Eyes */}
        <group position={[1.22, 0.74, 6.8]} rotation={[0, -0.23, 0]}>
          <BdxRobot scale={1.1} />
        </group>

        {/* Zone-Specific Architectural Landmarks */}
        <EntranceGate />
        <FoundationBay />
        <ResearchSphere />
        <OperationsBridge />
        <BladeArchive />
        <CommunityLounge />
        <ExitPortal />
      </Canvas>
    </div>
  );
}
