'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PhoenixParticles({ count = 80, isMobile = false }) {
  const pointsRef = useRef();
  const particleCount = isMobile ? 30 : count;

  // Generate particle positions, velocities, colors, and life cycles
  const { positions, colors, velocities, lifetimes } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const life = new Float32Array(particleCount);

    const cyanColor = new THREE.Color('#00F0FF');
    const blueColor = new THREE.Color('#0070F3');
    const emberColor = new THREE.Color('#FF4500');

    for (let i = 0; i < particleCount; i++) {
      // Spawn around trailing tail / wings
      pos[i * 3] = (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = -0.8 - Math.random() * 1.5;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.2) * 0.02;
      vel[i * 3 + 2] = -0.04 - Math.random() * 0.04;

      life[i] = Math.random();

      // 80% cyan/blue, 20% ember flame
      const isEmber = Math.random() > 0.82;
      const chosenColor = isEmber ? emberColor : (Math.random() > 0.4 ? cyanColor : blueColor);

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
      lifetimes[i] += delta * 1.2;

      // Move particles backward and slightly disperse
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Respawn if lifetime exceeds 1.0 or drifted too far
      if (lifetimes[i] > 1.0 || pos[i * 3 + 2] < -4.5) {
        lifetimes[i] = 0;
        pos[i * 3] = (Math.random() - 0.5) * 0.6;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
        pos[i * 3 + 2] = -0.5 - Math.random() * 0.5;
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
        size={isMobile ? 0.08 : 0.12}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
