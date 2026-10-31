'use client';

import React from 'react';

/**
 * Zone 04: Operations Bridge
 * Mission control terminal desk and telemetry displays at Z = -75 on the right side.
 */
export default function OperationsBridge() {
  return (
    <group position={[2.8, 0, -75]}>
      {/* Console Pedestal Desk */}
      <mesh position={[-0.4, 0.8, 0]}>
        <boxGeometry args={[1.2, 0.8, 3.2]} />
        <meshStandardMaterial color="#222828" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* Tilted Command Screen Panel Left */}
      <group position={[-0.3, 1.4, -0.8]} rotation={[0, -0.3, 0.15]}>
        <mesh>
          <boxGeometry args={[0.06, 0.55, 0.9]} />
          <meshStandardMaterial color="#343D3C" roughness={0.4} />
        </mesh>
        <mesh position={[-0.035, 0, 0]}>
          <planeGeometry args={[0.85, 0.5]} />
          <meshBasicMaterial color="#1a2020" />
        </mesh>
        <mesh position={[-0.036, 0.15, 0]}>
          <planeGeometry args={[0.7, 0.04]} />
          <meshBasicMaterial color="#A2B29F" />
        </mesh>
      </group>

      {/* Tilted Command Screen Panel Right */}
      <group position={[-0.3, 1.4, 0.8]} rotation={[0, 0.3, 0.15]}>
        <mesh>
          <boxGeometry args={[0.06, 0.55, 0.9]} />
          <meshStandardMaterial color="#343D3C" roughness={0.4} />
        </mesh>
        <mesh position={[-0.035, 0, 0]}>
          <planeGeometry args={[0.85, 0.5]} />
          <meshBasicMaterial color="#1a2020" />
        </mesh>
        <mesh position={[-0.036, 0.15, 0]}>
          <planeGeometry args={[0.7, 0.04]} />
          <meshBasicMaterial color="#D4A373" />
        </mesh>
      </group>

      {/* Overhead Cable Drop */}
      <mesh position={[-0.4, 2.6, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2.2]} />
        <meshStandardMaterial color="#171B1C" roughness={0.7} />
      </mesh>

      {/* Soft Operations Light */}
      <pointLight position={[-0.5, 2.4, 0]} color="#FFF8EE" intensity={1.1} distance={7} />
    </group>
  );
}

