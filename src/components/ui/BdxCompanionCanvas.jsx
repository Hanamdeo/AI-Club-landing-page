'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import BdxRobot from '@/components/3d/BdxRobot';

/**
 * BdxCompanionCanvas
 * Lightweight, dedicated 3D canvas rendering the BDX-01 companion in hovering / projector state.
 * Rendered inside the docked interactive companion pod.
 */
export default function BdxCompanionCanvas({ isProjecting = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 2.5], fov: 42 }}
      dpr={1}
      frameloop="always"
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight color="#404040" intensity={1.5} />
      <directionalLight position={[2, 3, 4]} color="#FFFFFF" intensity={1.8} />

      <BdxRobot
        scale={0.95}
        isStatic={false}
        hoverMode={true}
        isProjecting={isProjecting}
      />
    </Canvas>
  );
}

