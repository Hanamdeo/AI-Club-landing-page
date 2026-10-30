'use client';

import React, { useState } from 'react';
import { projectsData, projectCategories } from '@/data/projectsData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Cpu, 
  Activity, 
  Star, 
  Layers, 
  Code2, 
  Sparkles,
  Zap
} from 'lucide-react';

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All Projects'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07090D] border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-phoenix-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-4">
            <Badge variant="cyan" icon={FolderGit2}>
              05 // STUDENT AI BUILDS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Project <span className="text-phoenix-cyan">Showcase</span>.
            </h2>
            <p className="text-base text-gray-400 font-sans">
              Real systems, open-source repositories, and frontier models engineered by undergraduate club members.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeCategory === category
                    ? 'bg-phoenix-cyan text-[#07090D] font-bold shadow-glow-cyan/30'
                    : 'bg-surface-100 text-gray-400 border border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-xl bg-surface-100/80 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-glow-cyan/20 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="h-1 w-full bg-gradient-to-r from-phoenix-cyan/50 via-phoenix-blue/50 to-transparent group-hover:from-phoenix-cyan group-hover:via-phoenix-blue transition-all" />

              <div className="p-6">
                {/* Header Badge & Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Badge variant="blue">
                    {project.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs font-mono text-gray-400">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{project.stars}</span>
                  </div>
                </div>

                {project.badge && (
                  <div className="text-[10px] font-mono text-phoenix-ember mb-2 font-semibold">
                    ★ {project.badge}
                  </div>
                )}

                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-phoenix-cyan transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Performance Metrics Chips */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-surface-200/90 border border-white/5 mb-6 text-[11px] font-mono">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Latency</span>
                    <span className="text-phoenix-cyan font-semibold">{project.metrics.latency}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Accuracy</span>
                    <span className="text-white font-semibold">{project.metrics.accuracy}</span>
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.tags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono bg-white/5 text-gray-400 rounded border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-gray-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono text-phoenix-cyan hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architecture</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-surface-50 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-surface-50 text-phoenix-cyan hover:bg-phoenix-cyan/20 transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Project Architecture Details Modal */}
        {selectedProject && (
          <Modal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            title={selectedProject.title}
            subtitle={`Project Lead: ${selectedProject.lead} // ${selectedProject.category}`}
          >
            <div className="space-y-6">
              {/* Overview */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-phoenix-cyan font-bold mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  System Overview
                </h4>
                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Architecture Blueprint */}
              <div className="p-4 rounded-lg bg-surface-200 border border-cyan-500/20 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-phoenix-cyan font-bold flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Deep-Learning Architecture & Quantization
                </h4>
                <p className="text-xs sm:text-sm font-mono text-gray-300 leading-relaxed">
                  {selectedProject.architectureDetails}
                </p>
              </div>

              {/* Benchmarks Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded bg-surface-100 border border-white/5 text-center">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Inference Time</div>
                  <div className="text-sm font-mono font-bold text-phoenix-cyan">{selectedProject.metrics.latency}</div>
                </div>
                <div className="p-3 rounded bg-surface-100 border border-white/5 text-center">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Accuracy Metric</div>
                  <div className="text-sm font-mono font-bold text-white">{selectedProject.metrics.accuracy}</div>
                </div>
                <div className="p-3 rounded bg-surface-100 border border-white/5 text-center">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Training Scale</div>
                  <div className="text-sm font-mono font-bold text-phoenix-ember">{selectedProject.metrics.dataset}</div>
                </div>
                <div className="p-3 rounded bg-surface-100 border border-white/5 text-center">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Deployment</div>
                  <div className="text-sm font-mono font-bold text-emerald-400">{selectedProject.metrics.status}</div>
                </div>
              </div>

              {/* Full Tech Stack */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-phoenix-cyan" />
                  Compiled Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-mono bg-surface-50 text-cyan-300 border border-cyan-500/30 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Github}
                  href={selectedProject.githubUrl}
                  target="_blank"
                >
                  View Source Code
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={ExternalLink}
                  href={selectedProject.demoUrl}
                  target="_blank"
                >
                  Launch Demo
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}

