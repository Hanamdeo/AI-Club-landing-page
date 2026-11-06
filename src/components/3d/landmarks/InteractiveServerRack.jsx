'use client';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Cpu, Activity } from 'lucide-react';
import { audioManager } from '@/utils/audioManager';

/**
 * InteractiveServerRack (Refinement V3)
 * High-precision 3D interactive server rack stationed in Zone 02 (Foundation Bay).
 * Seamlessly fits the 42U enterprise rack lineup (X = -2.60, Z = -19.5).
 * Clicking slides out a server blade drawer into the aisle, exposing GPUs, copper heat pipes, and DIMM slots.
 */
export default function InteractiveServerRack({ onOpenModal }) {
  const rackRef = useRef();
  const trayRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Target slide offset (0 = closed inside rack, 0.65 = extended into cold aisle)
  const targetSlide = useRef(0);
  const currentSlide = useRef(0);

  const toggleTray = (e) => {
    if (e) e.stopPropagation();
    const nextState = !isOpen;
    setIsOpen(nextState);
    targetSlide.current = nextState ? 0.65 : 0;

    audioManager.playServo();
    if (nextState) {
      audioManager.playBeep(1100, 0.1);
      if (onOpenModal) onOpenModal();
    }
  };

  useFrame((_, delta) => {
    // Smooth lerp for drawer sliding
    currentSlide.current += (targetSlide.current - currentSlide.current) * (delta * 6.5);
    if (trayRef.current) {
      // Rack faces +X, local +Z extends into the aisle
      trayRef.current.position.z = currentSlide.current;
    }
  });

  // Materials
  const frameMat = new THREE.MeshStandardMaterial({
    color: hovered ? '#354345' : '#22292B',
    roughness: 0.45,
    metalness: 0.75,
  });

  const copperMat = new THREE.MeshStandardMaterial({
    color: '#D47A43',
    roughness: 0.25,
    metalness: 0.9,
  });

  const pcbMat = new THREE.MeshStandardMaterial({
    color: '#152E28',
    roughness: 0.6,
    metalness: 0.2,
  });

  const heatsinkMat = new THREE.MeshStandardMaterial({
    color: '#A6B3B5',
    roughness: 0.28,
    metalness: 0.9,
  });

  return (
    <group
      ref={rackRef}
      position={[-2.60, 1.25, -19.5]}
      rotation={[0, Math.PI / 2, 0]}
      onClick={toggleTray}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== 'undefined') document.body.style.cursor = 'default';
      }}
    >
      {/* 1. Outer 42U Server Cabinet Enclosure */}
      <mesh material={frameMat} castShadow receiveShadow>
        <boxGeometry args={[0.86, 2.42, 1.10]} />
      </mesh>

      {/* Rack Status Glow Trim at Header */}
      <mesh position={[0, 1.18, 0.54]}>
        <boxGeometry args={[0.82, 0.04, 0.02]} />
        <meshBasicMaterial color={hovered ? '#E6E2D8' : '#A2B29F'} />
      </mesh>

      {/* 2. Interactive Sliding Server Blade Drawer (Local +Z is out into aisle) */}
      <group ref={trayRef} position={[0, -0.15, 0]}>
        {/* Blade Base PCB Tray */}
        <mesh position={[0, 0, 0.18]} material={pcbMat}>
          <boxGeometry args={[0.78, 0.22, 0.72]} />
        </mesh>

        {/* Front Server Blade Bezel Handle & Indicator */}
        <mesh position={[0, 0, 0.55]}>
          <boxGeometry args={[0.80, 0.24, 0.03]} />
          <meshStandardMaterial color="#2B3638" roughness={0.35} metalness={0.75} />
        </mesh>

        {/* Drawer Pull Handle (Brushed Aluminum) */}
        <mesh position={[0, 0, 0.58]}>
          <boxGeometry args={[0.26, 0.035, 0.03]} />
          <meshStandardMaterial color="#E6E2D8" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* 4x GPU Accelerator Blocks (Liquid Cooled H100s) */}
        {[-0.26, -0.09, 0.09, 0.26].map((posX, i) => (
          <group key={i} position={[posX, 0.06, 0.1]}>
            {/* GPU Heatsink Block */}
            <mesh material={heatsinkMat}>
              <boxGeometry args={[0.14, 0.12, 0.36]} />
            </mesh>
            {/* Copper Heatpipe Lines */}
            <mesh position={[0, 0.07, 0]} material={copperMat}>
              <cylinderGeometry args={[0.01, 0.01, 0.32, 12]} />
            </mesh>
            {/* GPU Activity LED */}
            <mesh position={[0, 0.07, 0.19]}>
              <boxGeometry args={[0.015, 0.015, 0.015]} />
              <meshBasicMaterial color={i % 2 === 0 ? '#00E5FF' : '#22C55E'} />
            </mesh>
          </group>
        ))}

        {/* Dual Cooling Blower Fans */}
        <mesh position={[-0.22, 0.03, -0.18]} rotation={[0, 0, 0]} material={heatsinkMat}>
          <cylinderGeometry args={[0.11, 0.11, 0.10, 20]} />
        </mesh>
        <mesh position={[0.22, 0.03, -0.18]} rotation={[0, 0, 0]} material={heatsinkMat}>
          <cylinderGeometry args={[0.11, 0.11, 0.10, 20]} />
        </mesh>
      </group>

      {/* 3. Floating 3D Beacon Tag (Drei Html) */}
      <Html
        position={[0, 1.35, 0.56]}
        center
        distanceFactor={7.5}
        zIndexRange={[80, 0]}
      >
        <div
          onClick={toggleTray}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal/90 backdrop-blur-md border border-sage/50 text-ivory text-xs font-sans font-medium shadow-glass-panel hover:border-sage hover:bg-charcoal cursor-pointer select-none whitespace-nowrap transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
          <Cpu className="w-3.5 h-3.5 text-sage" />
          <span className="text-[11px] font-semibold text-ivory tracking-wide">
            {isOpen ? 'NODE ALPHA // EXTENDED' : 'NODE ALPHA // INSPECT RACK'}
          </span>
          <Activity className="w-3 h-3 text-sage/70 group-hover:text-sage" />
        </div>
      </Html>
    </group>
  );
}
