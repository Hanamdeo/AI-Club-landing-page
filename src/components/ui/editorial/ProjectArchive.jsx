'use client';

import React, { useState } from 'react';
import {
  FolderGit2,
  Github,
  ExternalLink,
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
    <section id="projects" className="relative w-full py-20 px-6 md:px-12 lg:px-16 border-t border-white/[0.08] font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 rounded-md bg-[#15191A] border border-white/[0.08] text-[11px] font-mono text-sage uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" />
              <span>Open Source Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-ivory tracking-tight">
              PROJECT ARCHIVE
            </h2>
            <p className="text-sm sm:text-base text-ivory/70 font-light mt-2 max-w-2xl leading-relaxed">
              Production inference engines, browser-native 3D neural graphics, and embedded TinyML architectures engineered by AI Club students.
            </p>
          </div>

          <div className="p-3 px-4 rounded-lg bg-[#141819] border border-white/[0.08] text-right self-start md:self-auto">
            <span className="block text-[11px] font-mono text-ivory/50 uppercase">
              Shipped Projects
            </span>
            <span className="text-xl font-bold text-sage font-mono">
              {projects.length} Repositories
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  audioManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sage text-graphite font-semibold shadow-sm'
                    : 'bg-[#141819] text-ivory/70 border border-white/[0.08] hover:text-ivory hover:border-white/[0.16]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="relative rounded-xl bg-[#141819] border border-white/[0.08] hover:border-white/[0.16] p-5 sm:p-6 transition-all duration-200 card-lift crosshair-corner flex flex-col justify-between group"
            >
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-sage font-medium">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sage/10 border border-sage/30 text-sage font-semibold uppercase">
                        Featured
                      </span>
                    )}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-ivory/50">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-ivory mb-1.5 leading-snug tracking-tight group-hover:text-sage transition-colors">
                  {project.title}
                </h3>

                {/* Description (2-line clamped) */}
                <p className="text-xs sm:text-[13px] text-ivory/70 leading-relaxed mb-3.5 font-normal line-clamp-2">
                  {project.description}
                </p>

                {/* Verified Benchmarks */}
                {project.benchmarks && project.benchmarks.length > 0 && (
                  <div className="p-3 rounded-lg bg-[#101415] border border-white/[0.06] mb-3.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-sage uppercase font-semibold mb-2">
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span>Verified Benchmarks</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {project.benchmarks.map((b, i) => (
                        <div key={i} className="p-1.5 rounded bg-white/[0.03] border border-white/[0.04]">
                          <span className="block text-[9px] text-ivory/50 font-mono truncate">
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
                <div className="flex items-center gap-2 text-xs text-ivory/60 mb-3 font-mono">
                  <Users className="w-3.5 h-3.5 text-sage shrink-0" />
                  <span className="truncate">Builders: {project.contributors.join(', ')}</span>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-ivory/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-3.5 border-t border-white/[0.06] flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.10] text-xs text-ivory font-mono transition-all btn-tactile cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5 text-ivory/70" />
                    <span>Source Code</span>
                  </a>
                )}

                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-sage hover:bg-sage/90 text-graphite font-bold text-xs font-mono transition-all btn-tactile shadow-sm cursor-pointer"
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

