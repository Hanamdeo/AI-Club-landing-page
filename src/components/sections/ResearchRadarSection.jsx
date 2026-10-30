'use client';

import React, { useState } from 'react';
import { researchRadarData } from '@/data/researchData';
import { Radio, BookOpen, User, Sparkles, Terminal } from 'lucide-react';

export function ResearchRadarSection() {
  const [selectedNode, setSelectedNode] = useState(researchRadarData.nodes[0]);

  return (
    <section id="radar" className="relative py-32 px-6 sm:px-8 bg-[#05070B] border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-phoenix-blue/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-phoenix-blue uppercase">
            02 // RESEARCH VECTORS & SCAN
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-phoenix-blue/30 via-white/10 to-transparent" />
        </div>

        <div className="max-w-3xl mb-12 space-y-3">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            Frontier AI Research <span className="text-gradient-cyan">Radar</span>.
          </h2>
          <p className="text-base text-secondary font-sans leading-relaxed">
            {researchRadarData.sectionSubtitle}
          </p>
        </div>

        {/* Laboratory Exploration Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Radar Terminal */}
          <div className="lg:col-span-5 relative flex items-center justify-center p-8 bg-navy-deep/50 border border-white/10 overflow-hidden min-h-[420px]">
            {/* Concentric Radar Rings */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-phoenix-blue/20 flex items-center justify-center">
              <div className="absolute inset-6 rounded-full border border-phoenix-blue/25" />
              <div className="absolute inset-16 rounded-full border border-dashed border-phoenix-blue/30" />
              <div className="absolute inset-28 rounded-full border border-phoenix-blue/20" />
              
              {/* Coordinate Crosshairs */}
              <div className="absolute inset-x-0 h-[1px] bg-phoenix-blue/20" />
              <div className="absolute inset-y-0 w-[1px] bg-phoenix-blue/20" />

              {/* Rotating Sweep Beam */}
              <div className="absolute inset-0 rounded-full animate-radar-sweep pointer-events-none">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-phoenix-blue/30 to-transparent origin-bottom-right" />
              </div>

              {/* Interactive Vector Blips */}
              {researchRadarData.nodes.map((node, index) => {
                const isSelected = selectedNode.id === node.id;
                const positions = [
                  'top-14 right-14', // NE
                  'top-14 left-14',  // NW
                  'bottom-14 left-14', // SW
                  'bottom-14 right-14' // SE
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
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phoenix-cyan opacity-80" />
                      )}
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${
                        isSelected ? 'bg-phoenix-cyan shadow-glow-cyan' : 'bg-secondary/60 group-hover:bg-phoenix-blue'
                      } transition-all`} />
                    </span>
                    <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-wider whitespace-nowrap text-secondary group-hover:text-primary transition-colors bg-black/80 px-1.5 py-0.5 border border-white/10">
                      {node.quadrant}
                    </span>
                  </button>
                );
              })}

              {/* Center Core Beacon */}
              <div className="w-3 h-3 rounded-full bg-primary shadow-glow-cyan animate-pulse" />
            </div>

            <div className="absolute bottom-4 left-6 text-[10px] font-mono text-phoenix-cyan/80 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-phoenix-blue animate-pulse" />
              <span>SCAN ACTIVE // 4 QUADRANTS TRACKED</span>
            </div>
          </div>

          {/* Right Column: Node Details & Selector Console */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Node Dossier Panel */}
            <div className="p-8 bg-navy-deep/80 border border-white/10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-phoenix-cyan uppercase tracking-widest font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedNode.tag}</span>
                </div>
                <span className="text-xs font-mono text-secondary bg-white/5 px-2.5 py-1 border border-white/10">
                  CONFIDENCE: {selectedNode.confidence}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary">
                  {selectedNode.title}
                </h3>
                <p className="text-sm sm:text-base text-secondary font-sans leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              <div className="p-4 bg-background/80 border border-phoenix-blue/20 space-y-1.5">
                <div className="text-[10px] font-mono text-phoenix-cyan uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Current Investigation:</span>
                </div>
                <p className="text-xs sm:text-sm text-primary font-mono">
                  "{selectedNode.activeWork}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono text-secondary">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-phoenix-blue" />
                  <span>Curated Papers: <strong className="text-primary">{selectedNode.papersStudied}+</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-phoenix-orange" />
                  <span>Pod Lead: <strong className="text-primary">{selectedNode.leadResearcher}</strong></span>
                </div>
              </div>
            </div>

            {/* Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {researchRadarData.nodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3 border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-navy-deep border-phoenix-blue text-primary shadow-glow-blue/20'
                        : 'bg-background/60 border-white/5 text-secondary hover:border-white/20 hover:text-primary'
                    }`}
                  >
                    <div className="text-[9px] font-mono text-phoenix-cyan uppercase">
                      {node.quadrant}
                    </div>
                    <div className="text-xs font-display font-semibold truncate mt-1">
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
