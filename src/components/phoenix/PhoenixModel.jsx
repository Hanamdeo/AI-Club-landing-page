'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export function PhoenixModel({ flightVelocity = 1 }) {
  const groupRef = useRef();
  const { scene, animations } = useGLTF('/models/phoenix.glb');
  // Pass scene directly to useAnimations so mixer is bound to the exact bone hierarchy
  const { actions } = useAnimations(animations, scene);

  // Configure materials, shadows, and frustum culling
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        // SkinnedMesh vertices are deformed by GPU shaders; disable frustum culling to prevent sudden disappearance
        child.frustumCulled = false;
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          // Preserve the original rich diffuse and emissive textures from the GLB
          child.material.side = THREE.DoubleSide;
          child.material.transparent = true;
          child.material.alphaTest = 0.12;
          child.material.depthWrite = true;

          // Luminous cyber-aesthetic: electric blue dominates per directive
          child.material.color = new THREE.Color('#38B6FF');
          child.material.emissive = new THREE.Color('#147DFF');
          child.material.emissiveIntensity = 2.4;
          child.material.roughness = 0.35;
          child.material.metalness = 0.3;
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
        The model's bounding box center is at [-377, 170, 0] with wingspan ~964 units.
        Offset by [+377, -170, 0] so the pivot point is at the exact center of mass / heart.
        Scale 0.0029 normalizes wingspan to ~2.8 units in Three.js world space.
        Rotation:
        - Y = -Math.PI * 0.65 (-117°) points the head and chest FORWARD (+Z towards viewer)
          and diagonally left (-X towards the hero headline).
        - X = -0.05 tilts slightly upward into soaring stance.
        - Z = 0.06 provides gentle aerodynamic bank.
      */}
      <group
        scale={[0.0029, 0.0029, 0.0029]}
        rotation={[-0.05, -Math.PI * 0.65, 0.06]}
      >
        <group position={[377, -170, 0]}>
          <primitive object={scene} />
        </group>
      </group>

      {/* Internal Crystalline Blue Heart Light */}
      <pointLight color="#49D8FF" intensity={3.5} distance={6} decay={2} position={[0, 0.2, 0.3]} />
      {/* Rear Flame Accent Light for dramatic silhouette */}
      <pointLight color="#FF7138" intensity={2.2} distance={5} decay={2} position={[-0.4, -0.2, -0.6]} />
    </group>
  );
}

useGLTF.preload('/models/phoenix.glb');
