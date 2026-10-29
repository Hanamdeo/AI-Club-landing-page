'use client';

import React, { useState } from 'react';
import { researchRadarData } from '@/data/researchData';
import { Badge } from '@/components/ui/Badge';
import { Radar, Radio, BookOpen, User, Sparkles } from 'lucide-react';

export function ResearchRadarSection() {
  const [selectedNode, setSelectedNode] = useState(researchRadarData.nodes[0]);

  return (
    <section id="radar" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07090D] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-phoenix-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <Badge variant="cyan" icon={Radar}>
            02 // FRONTIER LAB VECTORS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            AI Research <span className="text-phoenix-cyan">Radar</span>.
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-sans leading-relaxed">
            {researchRadarData.sectionSubtitle}
          </p>
        </div>

        {/* Radar & Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Radar Screen */}
          <div className="lg:col-span-5 relative flex items-center justify-center p-8 bg-surface-200/50 border border-cyan-500/20 rounded-xl overflow-hidden min-h-[380px]">
            {/* Radar Grid Circles */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-cyan-500/20 flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-cyan-500/25" />
              <div className="absolute inset-12 rounded-full border border-dashed border-cyan-500/30" />
              <div className="absolute inset-20 rounded-full border border-cyan-500/20" />
              
              {/* Radar Crosshairs */}
              <div className="absolute inset-x-0 h-[1px] bg-cyan-500/20" />
              <div className="absolute inset-y-0 w-[1px] bg-cyan-500/20" />

              {/* Rotating Sweep Beam */}
              <div className="absolute inset-0 rounded-full animate-radar-sweep pointer-events-none">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/30 to-transparent origin-bottom-right" />
              </div>

              {/* Interactive Blips for each node */}
              {researchRadarData.nodes.map((node, index) => {
                const isSelected = selectedNode.id === node.id;
                // Coordinates for 4 quadrants
                const positions = [
                  'top-12 right-12', // NE
                  'top-12 left-12',  // NW
                  'bottom-12 left-12', // SW
                  'bottom-12 right-12' // SE
                ];

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`absolute ${positions[index]} group cursor-pointer focus:outline-none`}
                    aria-label={`Select ${node.title}`}
                  >
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      {isSelected && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phoenix-cyan opacity-75" />
                      )}
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${isSelected ? 'bg-phoenix-cyan shadow-[0_0_12px_#00F0FF]' : 'bg-gray-500 group-hover:bg-cyan-300'} transition-all`} />
                    </span>
                    <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-wider whitespace-nowrap text-gray-400 group-hover:text-white transition-colors bg-black/60 px-1 rounded">
                      {node.quadrant}
                    </span>
                  </button>
                );
              })}

              {/* Center Beacon */}
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_#FFFFFF] animate-pulse" />
            </div>

            <div className="absolute bottom-3 left-4 text-[9px] font-mono text-cyan-400/60 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>RADAR SCAN ACTIVE // 4 NODES LOCKED</span>
            </div>
          </div>

          {/* Right Column: Node Details & Selector Cards */}
          <div className="lg:col-span-7 space-y-4">
            {/* Active Node Detail Card */}
            <div className="p-6 sm:p-8 rounded-xl bg-surface-100 border border-cyan-500/30 shadow-glow-cyan/10 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <Badge variant="cyan" icon={Sparkles}>
                  {selectedNode.tag}
                </Badge>
                <span className="text-xs font-mono text-phoenix-cyan bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-0.5 rounded">
                  {selectedNode.confidence}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                {selectedNode.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed mb-6">
                {selectedNode.description}
              </p>

              <div className="p-4 rounded-lg bg-surface-200/80 border border-white/5 space-y-2 mb-6">
                <div className="text-xs font-mono text-phoenix-cyan uppercase tracking-wider">
                  Active Pod In-Flight:
                </div>
                <p className="text-xs sm:text-sm text-gray-300 font-mono">
                  "{selectedNode.activeWork}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-400">
                  <BookOpen className="w-4 h-4 text-phoenix-cyan" />
                  <span>Papers Curated: <strong className="text-white">{selectedNode.papersStudied}+</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <User className="w-4 h-4 text-phoenix-ember" />
                  <span>Pod Lead: <strong className="text-white">{selectedNode.leadResearcher}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Switch Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {researchRadarData.nodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-surface-50 border-phoenix-cyan text-white shadow-glow-cyan/20'
                        : 'bg-surface-200/40 border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-phoenix-cyan truncate">
                      {node.quadrant}
                    </div>
                    <div className="text-xs font-mono font-medium truncate mt-0.5">
                      {node.title.split('&')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
