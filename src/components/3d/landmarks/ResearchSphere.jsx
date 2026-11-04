'use client';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Sparkles, Brain, Radio } from 'lucide-react';
import { audioManager } from '@/utils/audioManager';

const NEURAL_NODES = [
  { id: 'llm', label: 'LLMs & Reasoning', pos: [0, 0.85, 0], projects: '3 Active Models', color: '#A2B29F' },
  { id: 'vision', label: '3D Splatting & Vision', pos: [0.75, 0.25, 0.4], projects: '2 Preprints', color: '#E6E2D8' },
  { id: 'robotics', label: 'Embodied Robotics', pos: [-0.75, 0.25, -0.4], projects: 'Sim2Real RL', color: '#D4A373' },
  { id: 'audio', label: 'Speech & Audio', pos: [0.5, -0.65, -0.4], projects: 'Edge Conformer', color: '#A2B29F' },
  { id: 'systems', label: 'Distributed CUDA', pos: [-0.5, -0.65, 0.4], projects: 'vLLM Kernel', color: '#E6E2D8' },
];

/**
 * Zone 03: Research Lab Core
 * Interactive rotatable neural hologram sphere at Z = -45.
 * Drag with mouse/touch to spin the neural net in 3D.
 * Hover/click individual neural nodes to inspect domain telemetry.
 */
export default function ResearchSphere() {
  const groupRef = useRef();
  const sphereRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  const [hoveredNode, setHoveredNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Drag rotation velocity & inertial physics
  const pointerDown = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const rotVelocity = useRef({ x: 0.15, y: 0.25 });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    pointerDown.current = true;
    setIsDragging(true);
    prevPointer.current = { x: e.clientX, y: e.clientY };
    if (e.target && e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!pointerDown.current) return;
    const dx = e.clientX - prevPointer.current.x;
    const dy = e.clientY - prevPointer.current.y;
    prevPointer.current = { x: e.clientX, y: e.clientY };

    // Apply rotational momentum
    rotVelocity.current.y = dx * 0.008;
    rotVelocity.current.x = dy * 0.008;

    if (sphereRef.current) {
      sphereRef.current.rotation.y += dx * 0.01;
      sphereRef.current.rotation.x += dy * 0.01;
    }
  };

  const handlePointerUp = (e) => {
    pointerDown.current = false;
    setIsDragging(false);
    if (e.target && e.target.releasePointerCapture) {
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  useFrame((_, delta) => {
    if (sphereRef.current) {
      // Natural idle rotation + drag inertia with gentle damping
      if (!pointerDown.current) {
        sphereRef.current.rotation.y += rotVelocity.current.y * delta * 5.0;
        sphereRef.current.rotation.x += rotVelocity.current.x * delta * 5.0;

        // Dampen velocity back to gentle base cruise speed
        rotVelocity.current.y += (0.22 - rotVelocity.current.y) * 0.03;
        rotVelocity.current.x += (0.12 - rotVelocity.current.x) * 0.03;
      }
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z -= delta * 0.35;
      ring1Ref.current.rotation.y += delta * 0.15;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.25;
      ring2Ref.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[-2.8, 1.9, -45]}>
      {/* Interactive Rotatable Neural Net Sphere */}
      <group
        ref={sphereRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOver={() => {
          if (typeof document !== 'undefined') {
            document.body.style.cursor = isDragging ? 'grabbing' : 'grab';
          }
        }}
        onPointerOut={() => {
          if (!pointerDown.current && typeof document !== 'undefined') {
            document.body.style.cursor = 'default';
          }
        }}
      >
        {/* Geodesic Wireframe Lattice */}
        <mesh>
          <icosahedronGeometry args={[0.85, 2]} />
          <meshStandardMaterial
            color="#343D3C"
            wireframe
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>

        {/* Inner Glowing Hologram Core */}
        <mesh>
          <sphereGeometry args={[0.42, 24, 24]} />
          <meshBasicMaterial color="#A2B29F" transparent opacity={0.85} />
        </mesh>

        {/* Synaptic Nodes Arranged on Lattice */}
        {NEURAL_NODES.map((node) => {
          const isNodeActive = hoveredNode?.id === node.id;

          return (
            <group
              key={node.id}
              position={node.pos}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredNode(node);
                audioManager.playBeep(1200, 0.04);
                if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                setHoveredNode(null);
                if (typeof document !== 'undefined') document.body.style.cursor = 'default';
              }}
            >
              {/* Node Outer Ring */}
              <mesh>
                <sphereGeometry args={[isNodeActive ? 0.09 : 0.06, 16, 16]} />
                <meshBasicMaterial color={node.color} />
              </mesh>

              {/* Glowing Pulse Aura */}
              <mesh>
                <sphereGeometry args={[isNodeActive ? 0.16 : 0.09, 12, 12]} />
                <meshBasicMaterial
                  color={node.color}
                  transparent
                  opacity={isNodeActive ? 0.5 : 0.25}
                />
              </mesh>

              {/* Interactive Tooltip Card when Hovered */}
              {isNodeActive && (
                <Html
                  position={[0, 0.25, 0]}
                  center
                  distanceFactor={6}
                  zIndexRange={[90, 0]}
                >
                  <div className="p-2.5 rounded-xl bg-charcoal/95 backdrop-blur-md border border-sage/60 text-ivory text-[11px] shadow-glass-panel whitespace-nowrap pointer-events-none select-none font-sans">
                    <div className="flex items-center gap-1.5 font-bold text-sage mb-0.5">
                      <Brain className="w-3 h-3 text-sage" />
                      <span>{node.label}</span>
                    </div>
                    <div className="text-[10px] text-ivory/80">{node.projects}</div>
                  </div>
                </Html>
              )}
            </group>
          );
        })}
      </group>

      {/* Magnetic Containment Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.25, 0.035, 12, 48]} />
        <meshStandardMaterial color="#222828" roughness={0.4} metalness={0.8} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.4, 0.025, 12, 48]} />
        <meshStandardMaterial color="#343D3C" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Overhead Containment Pylon */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.2]} />
        <meshStandardMaterial color="#222828" roughness={0.8} />
      </mesh>

      {/* Light Source */}
      <pointLight color="#A2B29F" intensity={1.8} distance={7} decay={2} />

      {/* Floating Cue Label */}
      <Html position={[0, -1.35, 0]} center distanceFactor={7.5} zIndexRange={[80, 0]}>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-charcoal/80 backdrop-blur-xs border border-slate-struct/40 text-[10px] text-slate-400 select-none whitespace-nowrap">
          <Radio className="w-3 h-3 text-sage" />
          <span>DRAG TO ROTATE NEURAL CORE</span>
        </div>
      </Html>
    </group>
  );
}
