'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export function PhoenixModel({ flightVelocity = 1 }) {
  const groupRef = useRef();
  const { scene, animations } = useGLTF('/models/phoenix.glb');
  const { actions } = useAnimations(animations, scene);

  // Configure materials, cyber-circuit shaders, and shadows
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = false;
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.side = THREE.DoubleSide;
          child.material.transparent = true;
          child.material.alphaTest = 0.12;
          child.material.depthWrite = true;

          // Exact brand palette: Circuit Cyan #48BDE8 and Beak Gold #E6A12E
          child.material.color = new THREE.Color('#48BDE8');
          child.material.emissive = new THREE.Color('#48BDE8');
          child.material.emissiveIntensity = 2.2;
          child.material.roughness = 0.3;
          child.material.metalness = 0.45;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  // Trigger flight animation 'Take 001'
  useEffect(() => {
    if (actions && actions['Take 001']) {
      const action = actions['Take 001'];
      action.reset().fadeIn(0.5).play();
      action.timeScale = 1.0 * flightVelocity;
    }
    return () => {
      if (actions && actions['Take 001']) {
        actions['Take 001'].fadeOut(0.3);
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
      groupRef.current.position.y = Math.sin(time * 2.2) * 0.05;
      groupRef.current.rotation.z = Math.sin(time * 1.5) * 0.03;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* 
        Offset by [+377, -170, 0] so the pivot point is at the exact center of mass / heart.
        Scale 0.0029 normalizes wingspan to ~2.8 units in Three.js world space.
      */}
      <group
        scale={[0.0029, 0.0029, 0.0029]}
        rotation={[-0.05, -Math.PI * 0.65, 0.06]}
      >
        <group position={[377, -170, 0]}>
          <primitive object={scene} />
        </group>
      </group>

      {/* Internal Crystalline Circuit Cyan Heart Light (#48BDE8) */}
      <pointLight color="#48BDE8" intensity={3.8} distance={6} decay={2} position={[0, 0.2, 0.3]} />
      {/* Secondary Beak Gold Accent Light (#E6A12E) for eagle circuit radiance */}
      <pointLight color="#E6A12E" intensity={2.6} distance={5} decay={2} position={[-0.4, -0.2, -0.6]} />
    </group>
  );
}

useGLTF.preload('/models/phoenix.glb');
