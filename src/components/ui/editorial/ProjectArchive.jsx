'use client';

import React, { useState } from 'react';
import {
  FolderGit2,
  Github,
  ExternalLink,
  Sparkles,
  Cpu,
  BarChart2,
  Users,
} from 'lucide-react';
import { getAllProjects } from '@/lib/contentSelectors';
import { filterByCategory, getUniqueCategories } from '@/lib/contentHelpers';
import { audioManager } from '@/utils/audioManager';

/**
 * Section 07: Project Archive
 * Student open-source projects, high-performance engines, and verified benchmarks.
 */
export default function ProjectArchive() {
  const projects = getAllProjects();
  const categories = getUniqueCategories(projects, 'category');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredProjects = filterByCategory(projects, selectedCategory, 'category');

  return (
    <section id="projects" className="relative w-full py-24 px-6 md:px-12 lg:px-16 border-t border-white/10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-sage/10 border border-sage/30 text-xs font-mono text-sage uppercase tracking-wider">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Section 07 // Open Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-ivory tracking-tight">
              PROJECT ARCHIVE
            </h2>
            <p className="text-base sm:text-lg text-sage/90 font-light mt-2 max-w-2xl">
              Production inference engines, browser-native 3D neural graphics, and embedded TinyML architectures engineered by AI Club students.
            </p>
          </div>

          <div className="p-3 px-5 rounded-2xl bg-black/40 border border-white/10 text-right self-start md:self-auto">
            <span className="block text-[11px] font-mono text-slate-400 uppercase">
              Production Repositories
            </span>
            <span className="text-2xl font-bold text-sage num-normal">
              {projects.length} Shipped
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                audioManager.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sage/20 border border-sage text-sage shadow-sage-glow'
                  : 'bg-black/20 border border-white/10 text-ivory/70 hover:border-white/20 hover:text-ivory'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-charcoal/40 border border-white/10 p-6 sm:p-7 hover:border-sage/40 hover:bg-charcoal/60 transition-all flex flex-col justify-between shadow-glass-panel"
            >
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-black/40 border border-white/10 text-sage font-medium">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sage/20 border border-sage/40 text-sage font-semibold uppercase">
                        Featured
                      </span>
                    )}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/30 border border-white/10 text-slate-400">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-ivory mb-2 leading-snug tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-ivory/80 leading-relaxed mb-4 font-normal">
                  {project.description}
                </p>

                {/* Verified Benchmarks */}
                {project.benchmarks && project.benchmarks.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 mb-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-sage uppercase font-bold mb-2">
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span>Verified Benchmarks:</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {project.benchmarks.map((b, i) => (
                        <div key={i} className="p-1.5 rounded bg-black/40 border border-white/5">
                          <span className="block text-[9px] text-slate-400 font-mono">
                            {b.metric}
                          </span>
                          <span className="text-xs font-bold text-ivory font-mono">
                            {b.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contributors */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-mono">
                  <Users className="w-3.5 h-3.5 text-sage shrink-0" />
                  <span className="truncate">Builders: {project.contributors.join(', ')}</span>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-black/40 border border-white/10 text-ivory/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-black/30 hover:bg-white/10 border border-white/15 text-xs text-ivory font-medium transition-all cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                )}

                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sage hover:bg-sage-glow text-graphite font-bold text-xs shadow-sage-glow transition-all uppercase cursor-pointer"
                  >
                    <span>Launch Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

