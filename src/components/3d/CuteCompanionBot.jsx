'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * CuteCompanionBot
 * Inspired by modern companion robots (NVIDIA Isaac / Eve / Astro Bot).
 * - Floats and bobs gently with physical inertia
 * - Curiously tracks the user's cursor with head tilt and eye tracking
 * - Blinks in an adorable, lifelike manner
 * - Expressive glowing sage-green digital eyes
 */
export default function CuteCompanionBot({ scale = 1, isAwake = true }) {
  const groupRef = useRef();
  const headRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftHandRef = useRef();
  const rightHandRef = useRef();

  // Mouse coordinate tracker for smooth gaze tracking
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.targetX = nx;
      mouse.current.targetY = ny;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Blink timing state
  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // 1. Smooth mouse interpolation
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    // 2. Idle Floating & Hovering physics
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 2.2) * 0.12;
      groupRef.current.rotation.y = Math.sin(t * 1.1) * 0.08;
    }

    // 3. Cute Head Tracking & Inquisitive Tilt
    if (headRef.current) {
      // Head turns toward cursor
      const targetRotY = mouse.current.x * 0.65;
      const targetRotX = -mouse.current.y * 0.45;
      // Adorable head tilt (rolls when looking left/right)
      const targetRotZ = -mouse.current.x * 0.22 + Math.sin(t * 1.5) * 0.04;

      headRef.current.rotation.y += (targetRotY - headRef.current.rotation.y) * 0.1;
      headRef.current.rotation.x += (targetRotX - headRef.current.rotation.x) * 0.1;
      headRef.current.rotation.z += (targetRotZ - headRef.current.rotation.z) * 0.1;
    }

    // 4. Detached Floating Hands playful bobbing
    if (leftHandRef.current && rightHandRef.current) {
      leftHandRef.current.position.y = -0.55 + Math.sin(t * 2.5 + 0.5) * 0.06;
      leftHandRef.current.position.x = -0.95 + mouse.current.x * 0.1;
      leftHandRef.current.rotation.z = 0.2 + mouse.current.x * 0.2;

      rightHandRef.current.position.y = -0.55 + Math.sin(t * 2.5 + 2.0) * 0.06;
      rightHandRef.current.position.x = 0.95 + mouse.current.x * 0.1;
      rightHandRef.current.rotation.z = -0.2 + mouse.current.x * 0.2;
    }

    // 5. Lifelike Eye Blinking Animation
    blinkTimer.current += delta;
    if (blinkTimer.current > 3.2) {
      isBlinking.current = true;
      if (blinkTimer.current > 3.38) {
        // Reset timer with slight random offset for natural rhythm
        blinkTimer.current = Math.random() * 0.8;
        isBlinking.current = false;
      }
    }

    const eyeScaleY = isBlinking.current ? 0.08 : 1.0;
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y += (eyeScaleY - leftEyeRef.current.scale.y) * 0.4;
      rightEyeRef.current.scale.y += (eyeScaleY - rightEyeRef.current.scale.y) * 0.4;

      // Subtle pupil shift inside the visor toward target
      const eyeShiftX = mouse.current.x * 0.06;
      const eyeShiftY = mouse.current.y * 0.05;
      leftEyeRef.current.position.x = -0.32 + eyeShiftX;
      leftEyeRef.current.position.y = 0.06 + eyeShiftY;
      rightEyeRef.current.position.x = 0.32 + eyeShiftX;
      rightEyeRef.current.position.y = 0.06 + eyeShiftY;
    }
  });

  return (
    <group ref={groupRef} scale={scale} dispose={null}>
      {/* 1. HEAD ASSEMBLY */}
      <group ref={headRef} position={[0, 0.45, 0]}>
        {/* Main Head Skull (Sleek Ceramic Charcoal) */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.9, 36, 32]} />
          <meshStandardMaterial
            color="#222828"
            roughness={0.25}
            metalness={0.4}
          />
        </mesh>

        {/* Glossy Black Curved Visor Screen */}
        <mesh position={[0, 0.04, 0.22]} scale={[1.05, 0.78, 0.82]}>
          <sphereGeometry args={[0.82, 32, 24]} />
          <meshStandardMaterial
            color="#0E1213"
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Visor Bezel Ring */}
        <mesh position={[0, 0.04, 0.18]} scale={[1.07, 0.8, 0.84]}>
          <torusGeometry args={[0.8, 0.03, 16, 48]} />
          <meshStandardMaterial
            color="#343D3C"
            roughness={0.5}
            metalness={0.6}
          />
        </mesh>

        {/* Cute Expressive Digital Eyes (Glowing Sage Green) */}
        <group position={[0, 0, 0.9]}>
          {/* Left Eye */}
          <mesh ref={leftEyeRef} position={[-0.32, 0.06, 0]}>
            <capsuleGeometry args={[0.13, 0.18, 12, 20]} />
            <meshBasicMaterial color="#A2B29F" />
          </mesh>

          {/* Right Eye */}
          <mesh ref={rightEyeRef} position={[0.32, 0.06, 0]}>
            <capsuleGeometry args={[0.13, 0.18, 12, 20]} />
            <meshBasicMaterial color="#A2B29F" />
          </mesh>
        </group>

        {/* Left Ear Audio Sensor Puck */}
        <group position={[-0.92, 0.05, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.22, 0.12, 24]} />
            <meshStandardMaterial color="#343D3C" roughness={0.4} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.065, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.02, 24]} />
            <meshBasicMaterial color="#A2B29F" />
          </mesh>
        </group>

        {/* Right Ear Audio Sensor Puck */}
        <group position={[0.92, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.22, 0.12, 24]} />
            <meshStandardMaterial color="#343D3C" roughness={0.4} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.065, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.02, 24]} />
            <meshBasicMaterial color="#A2B29F" />
          </mesh>
        </group>

        {/* Cute Sleek Top Antenna Fin with Light Tip */}
        <mesh position={[0, 0.95, -0.05]} rotation={[-0.2, 0, 0]}>
          <capsuleGeometry args={[0.04, 0.22, 8, 16]} />
          <meshStandardMaterial color="#343D3C" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 1.15, -0.1]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#A2B29F" />
        </mesh>
      </group>

      {/* 2. MAGNETIC NECK COLLAR RING */}
      <mesh position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.05, 16, 36]} />
        <meshStandardMaterial color="#343D3C" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* 3. COMPACT POD BODY */}
      <group position={[0, -0.9, 0]}>
        {/* Main Body Shell */}
        <mesh castShadow receiveShadow scale={[0.8, 0.88, 0.72]}>
          <sphereGeometry args={[0.7, 32, 28]} />
          <meshStandardMaterial
            color="#222828"
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>

        {/* Chest Plate with AI Badge */}
        <mesh position={[0, 0.05, 0.52]} scale={[0.38, 0.38, 0.04]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#343D3C" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.05, 0.55]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#A2B29F" />
        </mesh>

        {/* Magnetic Hover Thruster Base Ring */}
        <mesh position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.04, 16, 32]} />
          <meshBasicMaterial color="#E6E2D8" />
        </mesh>

        {/* Soft Downward Propulsion Glow */}
        <pointLight position={[0, -0.85, 0]} color="#A2B29F" intensity={1.8} distance={3} decay={2} />
      </group>

      {/* 4. DETACHED FLOATING HANDS */}
      {/* Left Hand Pod */}
      <group ref={leftHandRef} position={[-0.95, -0.55, 0]}>
        <mesh castShadow scale={[0.22, 0.28, 0.22]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color="#293030" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Right Hand Pod */}
      <group ref={rightHandRef} position={[0.95, -0.55, 0]}>
        <mesh castShadow scale={[0.22, 0.28, 0.22]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color="#293030" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

