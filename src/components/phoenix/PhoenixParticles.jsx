'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PhoenixParticles({ count = 90, isMobile = false }) {
  const pointsRef = useRef();
  const particleCount = isMobile ? 35 : count;

  // Generate particle positions, velocities, colors, and life cycles
  const { positions, colors, velocities, lifetimes } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const life = new Float32Array(particleCount);

    const blueColor = new THREE.Color('#147DFF');
    const cyanColor = new THREE.Color('#49D8FF');
    const flameColor = new THREE.Color('#FF7138');

    for (let i = 0; i < particleCount; i++) {
      // Spawn around trailing tail / wing tips
      pos[i * 3] = (Math.random() - 0.5) * 1.2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.6 - 0.3;
      pos[i * 3 + 2] = -0.5 - Math.random() * 1.8;

      vel[i * 3] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 1] = (Math.random() - 0.2) * 0.015;
      vel[i * 3 + 2] = -0.035 - Math.random() * 0.04;

      life[i] = Math.random();

      // 60% electric blue, 25% icy cyan, 15% flame orange ember
      const rand = Math.random();
      let chosenColor = blueColor;
      if (rand > 0.85) {
        chosenColor = flameColor;
      } else if (rand > 0.6) {
        chosenColor = cyanColor;
      }

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return {
      positions: pos,
      colors: col,
      velocities: vel,
      lifetimes: life,
    };
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      lifetimes[i] += delta * 1.1;

      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Respawn if lifetime exceeds 1.0 or drifted too far
      if (lifetimes[i] > 1.0 || pos[i * 3 + 2] < -5.0) {
        lifetimes[i] = 0;
        pos[i * 3] = (Math.random() - 0.5) * 0.8;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4 - 0.3;
        pos[i * 3 + 2] = -0.4 - Math.random() * 0.6;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.09 : 0.13}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
