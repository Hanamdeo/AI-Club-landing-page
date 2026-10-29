'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PhoenixModel({ progress = 0, flightVelocity = 1 }) {
  const groupRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();
  const tailRef = useRef();
  const coreRef = useRef();

  // Create customized materials with electric cyan emissive glow & obsidian carbon body
  const materials = useMemo(() => {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0A111E'),
      roughness: 0.2,
      metalness: 0.9,
      emissive: new THREE.Color('#003366'),
      emissiveIntensity: 0.4,
    });

    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00F0FF'),
      emissive: new THREE.Color('#00F0FF'),
      emissiveIntensity: 2.8,
      roughness: 0.1,
      metalness: 0.5,
    });

    const cobaltGlowMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0070F3'),
      emissive: new THREE.Color('#0055DD'),
      emissiveIntensity: 2.2,
      roughness: 0.2,
      metalness: 0.6,
    });

    const emberAccentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FF4500'),
      emissive: new THREE.Color('#FF3300'),
      emissiveIntensity: 2.5,
      roughness: 0.2,
      metalness: 0.8,
    });

    const crystalCoreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E0F7FF'),
      emissive: new THREE.Color('#00F0FF'),
      emissiveIntensity: 3.5,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
    });

    return { bodyMat, cyanGlowMat, cobaltGlowMat, emberAccentMat, crystalCoreMat };
  }, []);

  // Procedural geometries for stylized aerodynamic Cyber-Phoenix
  const geometries = useMemo(() => {
    // Torso: Faceted stealth fuselage
    const bodyGeo = new THREE.ConeGeometry(0.35, 2.2, 5);
    bodyGeo.rotateX(Math.PI / 2);

    // Head / Crest: Angular sharp beak and swept crest
    const headGeo = new THREE.ConeGeometry(0.2, 0.8, 4);
    headGeo.rotateX(Math.PI / 2);

    const crestGeo = new THREE.ConeGeometry(0.12, 1.1, 3);
    crestGeo.rotateX(-Math.PI / 3);

    // Wing Primary Panel (Segmented blade)
    const wingPrimaryShape = new THREE.Shape();
    wingPrimaryShape.moveTo(0, 0);
    wingPrimaryShape.lineTo(1.8, 0.8);
    wingPrimaryShape.lineTo(2.4, 0.3);
    wingPrimaryShape.lineTo(1.5, -0.4);
    wingPrimaryShape.lineTo(0.4, -0.6);
    wingPrimaryShape.closePath();
    const wingPrimaryGeo = new THREE.ExtrudeGeometry(wingPrimaryShape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    });

    // Wing Secondary Feather Blade
    const wingSecondaryShape = new THREE.Shape();
    wingSecondaryShape.moveTo(0, 0);
    wingSecondaryShape.lineTo(1.2, 0.5);
    wingSecondaryShape.lineTo(1.6, 0.0);
    wingSecondaryShape.lineTo(0.9, -0.4);
    wingSecondaryShape.closePath();
    const wingSecondaryGeo = new THREE.ExtrudeGeometry(wingSecondaryShape, {
      depth: 0.03,
      bevelEnabled: false,
    });

    // Tail Feather Plume (Curved trailing blade)
    const tailShape = new THREE.Shape();
    tailShape.moveTo(0, 0);
    tailShape.lineTo(0.2, -1.2);
    tailShape.lineTo(0.05, -2.4);
    tailShape.lineTo(-0.05, -2.4);
    tailShape.lineTo(-0.2, -1.2);
    tailShape.closePath();
    const tailGeo = new THREE.ExtrudeGeometry(tailShape, {
      depth: 0.03,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.01,
      bevelThickness: 0.01,
    });

    // Heart Energy Core
    const coreGeo = new THREE.OctahedronGeometry(0.25, 1);

    return {
      bodyGeo,
      headGeo,
      crestGeo,
      wingPrimaryGeo,
      wingSecondaryGeo,
      tailGeo,
      coreGeo,
    };
  }, []);

  // R3F Animation Loop: Flight Kinematics
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const flapFreq = 2.4 * flightVelocity;
    const flapAmp = 0.38;

    // Wing flapping motion with aerodynamic phase lag
    if (leftWingRef.current && rightWingRef.current) {
      const flap = Math.sin(time * flapFreq) * flapAmp;
      leftWingRef.current.rotation.z = flap;
      leftWingRef.current.rotation.y = -Math.cos(time * flapFreq) * 0.15;

      rightWingRef.current.rotation.z = -flap;
      rightWingRef.current.rotation.y = Math.cos(time * flapFreq) * 0.15;
    }

    // Trailing tail feathers undulating with physical spring lag
    if (tailRef.current) {
      tailRef.current.rotation.x = 0.2 + Math.sin(time * flapFreq - 0.8) * 0.15;
      tailRef.current.rotation.y = Math.cos(time * flapFreq * 0.5) * 0.1;
    }

    // Heart core pulse
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 6) * 0.12;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Gentle aerodynamic floating hover in local space
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 1.8) * 0.08;
      groupRef.current.rotation.z = Math.sin(time * 1.2) * 0.04;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Fuselage / Body */}
      <mesh geometry={geometries.bodyGeo} material={materials.bodyMat} position={[0, 0, 0]} castShadow />

      {/* Head & Swept Crest */}
      <mesh geometry={geometries.headGeo} material={materials.bodyMat} position={[0, 0.2, 1.2]} />
      <mesh geometry={geometries.crestGeo} material={materials.cyanGlowMat} position={[0, 0.5, 1.0]} />
      {/* Eye glowing nodes */}
      <mesh position={[0.12, 0.25, 1.3]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <primitive object={materials.cyanGlowMat} />
      </mesh>
      <mesh position={[-0.12, 0.25, 1.3]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <primitive object={materials.cyanGlowMat} />
      </mesh>

      {/* Pulsing Crystalline Heart Energy Core */}
      <mesh ref={coreRef} geometry={geometries.coreGeo} material={materials.crystalCoreMat} position={[0, 0.1, 0.3]}>
        <pointLight color="#00F0FF" intensity={3.5} distance={4} decay={2} />
      </mesh>

      {/* Left Wing Assembly */}
      <group ref={leftWingRef} position={[0.25, 0.15, 0.2]}>
        {/* Main Blade */}
        <mesh geometry={geometries.wingPrimaryGeo} material={materials.bodyMat} />
        {/* Glowing Leading Edge Highlight */}
        <mesh geometry={geometries.wingSecondaryGeo} material={materials.cyanGlowMat} position={[0.2, 0.02, 0.1]} />
        {/* Wing Tip Flame Accent */}
        <mesh position={[2.2, 0.35, 0.02]}>
          <coneGeometry args={[0.1, 0.4, 4]} />
          <primitive object={materials.emberAccentMat} />
        </mesh>
      </group>

      {/* Right Wing Assembly (Mirrored) */}
      <group ref={rightWingRef} position={[-0.25, 0.15, 0.2]} scale={[-1, 1, 1]}>
        {/* Main Blade */}
        <mesh geometry={geometries.wingPrimaryGeo} material={materials.bodyMat} />
        {/* Glowing Leading Edge Highlight */}
        <mesh geometry={geometries.wingSecondaryGeo} material={materials.cyanGlowMat} position={[0.2, 0.02, 0.1]} />
        {/* Wing Tip Flame Accent */}
        <mesh position={[2.2, 0.35, 0.02]}>
          <coneGeometry args={[0.1, 0.4, 4]} />
          <primitive object={materials.emberAccentMat} />
        </mesh>
      </group>

      {/* Trailing Tail Feathers Assembly */}
      <group ref={tailRef} position={[0, 0, -1.0]}>
        {/* Central Tail Plume */}
        <mesh geometry={geometries.tailGeo} material={materials.cyanGlowMat} position={[0, 0, 0]} />
        {/* Left Swept Tail Plume */}
        <mesh
          geometry={geometries.tailGeo}
          material={materials.cobaltGlowMat}
          position={[0.2, -0.05, -0.2]}
          rotation={[0, 0, -0.25]}
          scale={[0.8, 0.9, 0.8]}
        />
        {/* Right Swept Tail Plume */}
        <mesh
          geometry={geometries.tailGeo}
          material={materials.cobaltGlowMat}
          position={[-0.2, -0.05, -0.2]}
          rotation={[0, 0, 0.25]}
          scale={[0.8, 0.9, 0.8]}
        />
        {/* Trailing Ember Tips */}
        <mesh position={[0, -0.1, -2.3]}>
          <octahedronGeometry args={[0.08, 0]} />
          <primitive object={materials.emberAccentMat} />
        </mesh>
      </group>
    </group>
  );
}
