'use client';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Cpu, Activity, ExternalLink } from 'lucide-react';
import { audioManager } from '@/utils/audioManager';

/**
 * InteractiveServerRack
 * High-precision 3D interactive server rack located in Zone 02 (Foundation Bay).
 * Clicking slides out a server blade drawer exposing GPUs, copper heat pipes, and DIMM slots.
 */
export default function InteractiveServerRack({ onOpenModal }) {
  const rackRef = useRef();
  const trayRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [slideX, setSlideX] = useState(0);

  // Target slide offset (0 = closed inside rack, 0.75 = extended into aisle)
  const targetSlide = useRef(0);
  const currentSlide = useRef(0);

  const toggleTray = (e) => {
    if (e) e.stopPropagation();
    const nextState = !isOpen;
    setIsOpen(nextState);
    targetSlide.current = nextState ? 0.72 : 0;

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
      // Rack is at X = -2.7 facing +X, so extending drawer moves +Z in local space or +X
      trayRef.current.position.z = currentSlide.current;
    }
  });

  // Materials
  const frameMat = new THREE.MeshStandardMaterial({
    color: hovered ? '#2D3534' : '#1C2122',
    roughness: 0.5,
    metalness: 0.8,
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
    color: '#9CA3AF',
    roughness: 0.3,
    metalness: 0.9,
  });

  return (
    <group
      ref={rackRef}
      position={[-2.75, 1.8, -19.5]}
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
      {/* 1. Outer 42U Server Chassis Frame */}
      <mesh material={frameMat} castShadow receiveShadow>
        <boxGeometry args={[1.35, 3.5, 0.95]} />
      </mesh>

      {/* Rack Status Glow Trim */}
      <mesh position={[0, 1.76, 0.48]}>
        <boxGeometry args={[1.3, 0.04, 0.02]} />
        <meshBasicMaterial color={hovered ? '#E6E2D8' : '#A2B29F'} />
      </mesh>

      {/* 2. Interactive Sliding Server Blade Drawer (Local +Z is out into aisle) */}
      <group ref={trayRef} position={[0, -0.15, 0]}>
        {/* Blade Base PCB Tray */}
        <mesh position={[0, 0, 0.2]} material={pcbMat}>
          <boxGeometry args={[1.18, 0.28, 0.8]} />
        </mesh>

        {/* Front Server Blade Bezel Handle & Indicator */}
        <mesh position={[0, 0, 0.61]}>
          <boxGeometry args={[1.22, 0.32, 0.04]} />
          <meshStandardMaterial color="#2B3233" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Drawer Pull Handle */}
        <mesh position={[0, 0, 0.64]}>
          <boxGeometry args={[0.3, 0.04, 0.03]} />
          <meshStandardMaterial color="#E6E2D8" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* 4x GPU Accelerator Blocks (Liquid Cooled H100s) */}
        {[-0.38, -0.13, 0.13, 0.38].map((posX, i) => (
          <group key={i} position={[posX, 0.08, 0.1]}>
            {/* GPU Heatsink Block */}
            <mesh material={heatsinkMat}>
              <boxGeometry args={[0.18, 0.14, 0.42]} />
            </mesh>
            {/* Copper Heatpipe Lines */}
            <mesh position={[0, 0.08, 0]} material={copperMat}>
              <cylinderGeometry args={[0.012, 0.012, 0.38, 12]} />
            </mesh>
            {/* GPU Activity LED */}
            <mesh position={[0, 0.08, 0.22]}>
              <boxGeometry args={[0.02, 0.02, 0.02]} />
              <meshBasicMaterial color={i % 2 === 0 ? '#A2B29F' : '#D4A373'} />
            </mesh>
          </group>
        ))}

        {/* Dual Cooling Blower Fans */}
        <mesh position={[-0.3, 0.04, -0.22]} rotation={[0, 0, 0]} material={heatsinkMat}>
          <cylinderGeometry args={[0.14, 0.14, 0.12, 24]} />
        </mesh>
        <mesh position={[0.3, 0.04, -0.22]} rotation={[0, 0, 0]} material={heatsinkMat}>
          <cylinderGeometry args={[0.14, 0.14, 0.12, 24]} />
        </mesh>
      </group>

      {/* 3. Floating 3D Beacon Tag (Drei Html) */}
      <Html
        position={[0, 1.95, 0.5]}
        center
        distanceFactor={7.5}
        zIndexRange={[80, 0]}
      >
        <div
          onClick={toggleTray}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal/90 backdrop-blur-md border border-sage/50 text-ivory text-xs font-mono font-medium shadow-glass-panel hover:border-sage hover:bg-charcoal cursor-pointer select-none whitespace-nowrap transition-all"
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

