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

    const cyanColor = new THREE.Color('#48BDE8'); // Circuit Cyan
    const goldColor = new THREE.Color('#E6A12E'); // Beak Gold
    const copperColor = new THREE.Color('#D97236'); // Node Copper
    const whiteColor = new THREE.Color('#F4F6F8'); // Crisp White

    for (let i = 0; i < particleCount; i++) {
      // Spawn around trailing tail / wing tips
      pos[i * 3] = (Math.random() - 0.5) * 1.2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.6 - 0.3;
      pos[i * 3 + 2] = -0.5 - Math.random() * 1.8;

      vel[i * 3] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 1] = (Math.random() - 0.2) * 0.015;
      vel[i * 3 + 2] = -0.035 - Math.random() * 0.04;

      life[i] = Math.random();

      // Palette distribution: 60% Circuit Cyan, 25% Beak Gold, 10% Node Copper, 5% Crisp White
      const rand = Math.random();
      let chosenColor = cyanColor;
      if (rand > 0.95) {
        chosenColor = whiteColor;
      } else if (rand > 0.85) {
        chosenColor = copperColor;
      } else if (rand > 0.6) {
        chosenColor = goldColor;
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
