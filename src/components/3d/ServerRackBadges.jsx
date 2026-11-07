'use client';

import React, { useMemo, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Bot, ChevronRight, Sparkles } from 'lucide-react';
import { audioManager } from '@/utils/audioManager';

/**
 * SERVER_NODES
 * 7 Interactive Server Node Badges distributed along the data centre cold aisle.
 * Stationed directly on the server racks lining the corridor where the robot walks.
 */
export const SERVER_NODES = [
  {
    id: 'hero',
    code: '01',
    label: 'Home',
    subtext: 'Facility Arrival',
    targetId: 'section-arrival',
    position: [-2.05, 1.88, 4.5], // Left server rack
    isLeft: true,
    progressCenter: 0.05,
  },
  {
    id: 'discussions',
    code: '02',
    label: 'Discussions',
    subtext: 'Debate & GD Core',
    targetId: 'discussions',
    position: [2.05, 1.88, -2.0], // Right server rack
    isLeft: false,
    progressCenter: 0.22,
  },
  {
    id: 'events',
    code: '03',
    label: 'Events',
    subtext: 'Operations & Hackathons',
    targetId: 'events',
    position: [-2.05, 1.88, -8.0], // Left server rack
    isLeft: true,
    progressCenter: 0.38,
  },
  {
    id: 'radar',
    code: '04',
    label: 'AI Radar',
    subtext: 'Research & Signals',
    targetId: 'radar',
    position: [2.05, 1.88, -13.5], // Right server rack
    isLeft: false,
    progressCenter: 0.55,
  },
  {
    id: 'projects',
    code: '05',
    label: 'Projects',
    subtext: 'Deployed Models',
    targetId: 'projects',
    position: [-2.05, 1.88, -19.5], // Left server rack
    isLeft: true,
    progressCenter: 0.70,
  },
  {
    id: 'team',
    code: '06',
    label: 'Team',
    subtext: 'Core Researchers',
    targetId: 'team',
    position: [2.05, 1.88, -26.0], // Right server rack
    isLeft: false,
    progressCenter: 0.85,
  },
  {
    id: 'join',
    code: '07',
    label: 'Join',
    subtext: 'Network Access',
    targetId: 'join-network',
    position: [-2.05, 1.88, -32.5], // Left server rack
    isLeft: true,
    progressCenter: 0.96,
  },
];

/**
 * ServerRackBadges
 * In-world 3D badges affixed to each server rack along the cold aisle.
 * Highlights with a glowing beacon when the BDX robot reaches that server,
 * and smoothly scrolls the entire page to that section upon click.
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
    audioManager.playClick();
    if (onNavigateToSection) {
      onNavigateToSection(node.targetId, node.id);
    }
  };

  return (
    <group name="server-rack-badges">
      {SERVER_NODES.map((node) => {
        const isRobotNear = activeRobotNode === node.id;
        const isActiveNav = activeNavId === node.id;
        const isHighlighted = isRobotNear || isActiveNav;

        // Position slightly outward into aisle from server rack face
        const htmlOffsetX = node.isLeft ? 0.38 : -0.38;

        return (
          <group
            key={node.id}
            position={[node.position[0], node.position[1], node.position[2]]}
          >
            {/* 1. Physical 3D Metallic Mounting Arm projecting from rack upright */}
            <mesh position={[htmlOffsetX * 0.45, 0, 0]}>
              <boxGeometry args={[0.22, 0.024, 0.024]} />
              <meshStandardMaterial
                color={isHighlighted ? '#526662' : '#283133'}
                metalness={0.85}
                roughness={0.3}
              />
            </mesh>

            {/* 2. LED Status Diode on Mount */}
            <mesh position={[htmlOffsetX * 0.8, 0, 0]}>
              <sphereGeometry args={[0.022, 12, 12]} />
              <meshBasicMaterial
                color={isHighlighted ? '#A2B29F' : '#4FD1C5'}
              />
            </mesh>

            {/* Subtle Point Light when robot is near */}
            {isHighlighted && (
              <pointLight
                position={[htmlOffsetX * 0.8, 0, 0]}
                color="#A2B29F"
                intensity={0.6}
                distance={2.5}
              />
            )}

            {/* 3. Interactive Floating HTML Badge (matches header pill style) */}
            <Html
              position={[htmlOffsetX, 0, 0]}
              center
              distanceFactor={8.5}
              zIndexRange={[70, 0]}
            >
              <div
                onClick={(e) => handleBadgeClick(node, e)}
                className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-full select-none cursor-pointer transition-all duration-300 font-sans whitespace-nowrap shadow-[0_4px_24px_rgba(0,0,0,0.5)] ${
                  isHighlighted
                    ? 'bg-[#101415]/95 border border-sage text-ivory ring-1 ring-sage/40 shadow-sage-glow scale-105'
                    : 'bg-[#101415]/80 backdrop-blur-md border border-white/[0.08] text-ivory/80 hover:border-sage/50 hover:text-ivory hover:bg-[#161B1C] hover:scale-102'
                }`}
                title={`Server Node ${node.code}: ${node.label} — Click to Scroll`}
              >
                {/* Active / Proximity Indicator Dot */}
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

                {/* Robot Proximity Indicator / Arrow Hint */}
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
