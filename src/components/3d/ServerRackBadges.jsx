'use client';

import React, { useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Bot, ChevronRight } from 'lucide-react';
import { audioManager } from '@/utils/audioManager';

/**
 * SERVER_NODES
 * 7 Interactive Server Node Badges distributed along the data centre cold aisle.
 * Affixed to each server rack along the cold aisle where companion BDX walks.
 */
export const SERVER_NODES = [
  {
    id: 'hero',
    code: '01',
    label: 'Home',
    subtext: 'Facility Arrival',
    href: '/',
    targetId: 'section-arrival',
    position: [-2.05, 1.88, 4.5],
    isLeft: true,
  },
  {
    id: 'discussions',
    code: '02',
    label: 'Research',
    subtext: 'Debate & GD Core',
    href: '/research',
    targetId: 'discussions',
    position: [2.05, 1.88, -2.0],
    isLeft: false,
  },
  {
    id: 'events',
    code: '03',
    label: 'Events',
    subtext: 'Operations & Hackathons',
    href: '/events',
    targetId: 'events',
    position: [-2.05, 1.88, -8.0],
    isLeft: true,
  },
  {
    id: 'radar',
    code: '04',
    label: 'About',
    subtext: 'Research & Signals',
    href: '/about',
    targetId: 'radar',
    position: [2.05, 1.88, -13.5],
    isLeft: false,
  },
  {
    id: 'projects',
    code: '05',
    label: 'Projects',
    subtext: 'Deployed Models',
    href: '/projects',
    targetId: 'projects',
    position: [-2.05, 1.88, -19.5],
    isLeft: true,
  },
  {
    id: 'team',
    code: '06',
    label: 'Team',
    subtext: 'Core Researchers',
    href: '/team',
    targetId: 'team',
    position: [2.05, 1.88, -26.0],
    isLeft: false,
  },
  {
    id: 'join',
    code: '07',
    label: 'Join',
    subtext: 'Network Access',
    href: '/join',
    targetId: 'join-network',
    position: [-2.05, 1.88, -32.5],
    isLeft: true,
  },
];

/**
 * ServerRackBadges
 * High-performance 3D rack badges. Zero dynamic pointLights to prevent shader recompilation stutters.
 */
export default function ServerRackBadges({
  scrollProgress = 0,
  scrollProgressRef,
  activeNavId = 'hero',
  onNavigateToSection,
}) {
  const [activeRobotNode, setActiveRobotNode] = useState('hero');

  useFrame(() => {
    const sp = scrollProgressRef?.current !== undefined ? scrollProgressRef.current : scrollProgress;
    const rZ = 6.8 - sp * 41.6;

    let closestNode = SERVER_NODES[0];
    let minDistance = 999;
    for (let i = 0; i < SERVER_NODES.length; i++) {
      const d = Math.abs(rZ - SERVER_NODES[i].position[2]);
      if (d < minDistance) {
        minDistance = d;
        closestNode = SERVER_NODES[i];
      }
    }

    if (minDistance < 4.2 && activeRobotNode !== closestNode.id) {
      setActiveRobotNode(closestNode.id);
    }
  });

  const handleBadgeClick = (node, e) => {
    if (e) e.stopPropagation();
    try { audioManager.playClick(); } catch {}
    if (node.href && node.href !== '/' && typeof window !== 'undefined') {
      window.location.href = node.href;
    } else if (onNavigateToSection) {
      onNavigateToSection(node.targetId, node.id);
    }
  };

  return (
    <group name="server-rack-badges">
      {SERVER_NODES.map((node) => {
        const isRobotNear = activeRobotNode === node.id;
        const isActiveNav = activeNavId === node.id;
        const isHighlighted = isRobotNear || isActiveNav;
        const htmlOffsetX = node.isLeft ? 0.38 : -0.38;

        return (
          <group
            key={node.id}
            position={[node.position[0], node.position[1], node.position[2]]}
          >
            {/* 1. Physical 3D Mounting Arm */}
            <mesh position={[htmlOffsetX * 0.45, 0, 0]}>
              <boxGeometry args={[0.22, 0.024, 0.024]} />
              <meshStandardMaterial
                color={isHighlighted ? '#4A5856' : '#222829'}
                metalness={0.8}
                roughness={0.35}
              />
            </mesh>

            {/* 2. Emissive Diode Indicator (Zero-cost emissive, no point light recompiles) */}
            <mesh position={[htmlOffsetX * 0.8, 0, 0]}>
              <sphereGeometry args={[0.024, 10, 10]} />
              <meshBasicMaterial
                color={isHighlighted ? '#A2B29F' : '#475558'}
              />
            </mesh>

            {/* 3. Interactive Floating HTML Badge */}
            <Html
              position={[htmlOffsetX, 0, 0]}
              center
              distanceFactor={8.5}
              zIndexRange={[70, 0]}
            >
              <div
                onClick={(e) => handleBadgeClick(node, e)}
                className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-full select-none cursor-pointer transition-all duration-200 font-sans whitespace-nowrap shadow-[0_4px_24px_rgba(0,0,0,0.5)] ${
                  isHighlighted
                    ? 'bg-[#101415]/95 border border-sage/80 text-ivory ring-1 ring-sage/30 shadow-sage-glow'
                    : 'bg-[#101415]/80 backdrop-blur-md border border-white/[0.08] text-ivory/80 hover:border-sage/50 hover:text-ivory hover:bg-[#161B1C]'
                }`}
                title={`Server Node ${node.code}: ${node.label} — Click to Scroll`}
              >
                {/* Active Indicator Dot */}
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 ${
                    isHighlighted
                      ? 'bg-sage shadow-[0_0_8px_#A2B29F]'
                      : 'bg-white/25 group-hover:bg-white/50'
                  }`}
                />

                {/* Section Name */}
                <span className="text-xs font-semibold tracking-wide">
                  {node.label}
                </span>

                {/* Robot Proximity Badge or Chevron */}
                {isRobotNear ? (
                  <div className="flex items-center gap-1 text-[9px] font-mono text-sage bg-sage/15 px-1.5 py-0.5 rounded-full animate-pulse">
                    <Bot className="w-3 h-3 text-sage" />
                    <span className="hidden sm:inline">ROBOT</span>
                  </div>
                ) : (
                  <ChevronRight className="w-3 h-3 text-sage/60 group-hover:text-sage group-hover:translate-x-0.5 transition-all" />
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
