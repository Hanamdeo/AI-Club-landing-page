'use client';

import React from 'react';
import { galleryItems } from '@/data/galleryData';
import { Badge } from '@/components/ui/Badge';
import { Camera, Calendar } from 'lucide-react';

export function GallerySection() {
  return (
    <section id="gallery" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#080B10] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <Badge variant="cyan" icon={Camera}>
            06 // CHRONICLES & MOMENTS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Club <span className="text-phoenix-cyan">Archives</span>.
          </h2>
          <p className="text-base text-gray-400 font-sans leading-relaxed">
            Snapshots from our compute clusters, 36-hour hackathons, robotics field tests, and dialectic sessions.
          </p>
        </div>

        {/* Gallery Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden bg-surface-100 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Graphic Banner Mockup with Cyber Visual styling */}
              <div className="relative h-48 w-full bg-gradient-to-br from-surface-50 via-surface-200 to-surface-300 flex items-center justify-center p-6 overflow-hidden">
                {/* Visual geometric pattern */}
                <div className="absolute inset-0 bg-cyber-grid opacity-30" />
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-phoenix-cyan/10 rounded-full blur-2xl group-hover:bg-phoenix-cyan/25 transition-all" />

                <div className="relative z-10 text-center space-y-2">
                  <div className="inline-flex p-3 rounded-xl bg-surface-300/80 border border-white/10 text-phoenix-cyan group-hover:scale-110 group-hover:border-phoenix-cyan transition-all">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
                    Archive #{index + 1} // {item.category}
                  </div>
                </div>

                {/* Subtle date tag */}
                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-phoenix-cyan" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Caption & Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-phoenix-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed mt-1">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span className="text-phoenix-cyan font-semibold">● DOCUMENTED</span>
                  <span>VERIFIED RECORD</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
