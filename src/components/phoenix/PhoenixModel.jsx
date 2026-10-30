'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export function PhoenixModel({ flightVelocity = 1 }) {
  const groupRef = useRef();
  const { scene, animations } = useGLTF('/models/phoenix.glb');
  const { actions, mixer } = useAnimations(animations, groupRef);

  // Clone scene so we don't mutate the cached GLTF in memory
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Enhance materials for a futuristic, cinematic cyber-phoenix aesthetic
  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          const originalMat = child.material;
          const enhancedMat = new THREE.MeshStandardMaterial({
            map: originalMat.map || null,
            normalMap: originalMat.normalMap || null,
            roughness: 0.35,
            metalness: 0.75,
            color: new THREE.Color('#0A1A2E'),
            emissive: new THREE.Color('#0A3A75'),
            emissiveIntensity: 1.4,
          });

          // Add glowing electric blue edge accents
          if (child.name.includes('01b') || child.name.includes('Feather')) {
            enhancedMat.emissive = new THREE.Color('#147DFF');
            enhancedMat.emissiveIntensity = 2.2;
          }

          child.material = enhancedMat;
        }
      }
    });
  }, [clonedScene]);

  // Trigger flight animation 'Take 001'
  useEffect(() => {
    if (actions && actions['Take 001']) {
      const action = actions['Take 001'];
      action.reset().fadeIn(0.6).play();
      action.timeScale = 1.0 * flightVelocity;
    }
    return () => {
      if (actions && actions['Take 001']) {
        actions['Take 001'].fadeOut(0.4);
      }
    };
  }, [actions, flightVelocity]);

  // Adjust animation speed smoothly when flight velocity changes
  useEffect(() => {
    if (actions && actions['Take 001']) {
      actions['Take 001'].timeScale = Math.max(0.6, flightVelocity);
    }
  }, [flightVelocity, actions]);

  // Gentle organic flight hover and aerodynamic banking
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y += Math.sin(time * 2.2) * 0.0015;
      groupRef.current.rotation.z = Math.sin(time * 1.5) * 0.025;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* 
        Raw Phoenix scale is ~800 units, so 0.0035 fits ~2.8-3.0 units in world space.
        Rotated to face elegantly across the hero composition.
      */}
      <group scale={[0.0035, 0.0035, 0.0035]} rotation={[0, -Math.PI / 1.8, 0]} position={[0, -0.6, 0]}>
        <primitive object={clonedScene} />
      </group>

      {/* Internal Crystalline Blue Heart Light */}
      <pointLight color="#49D8FF" intensity={3.0} distance={5} decay={2} position={[0, 0, 0.2]} />
      {/* Rear Restrained Flame Accent Light */}
      <pointLight color="#FF7138" intensity={1.8} distance={4} decay={2} position={[0, -0.4, -0.8]} />
    </group>
  );
}

useGLTF.preload('/models/phoenix.glb');
