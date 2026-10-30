'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { galleryItems, galleryCategories } from '@/data/galleryData';
import { ImageLightbox } from '@/components/gallery/ImageLightbox';
import { Camera, Calendar, MapPin, ExternalLink, Filter, Sparkles, Layers } from 'lucide-react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  // Filter items
  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((i) => i.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Group items by category for section-based organization
  const categoriesToRender = selectedCategory === 'All'
    ? galleryCategories.filter((c) => c !== 'All')
    : [selectedCategory];

  return (
    <div className="relative min-h-screen bg-background text-white flex flex-col selection:bg-phoenix-blue selection:text-white">
      {/* Global Navbar */}
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* A. Gallery Header (PRD Section 6.2 A) */}
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-phoenix-cyan uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-phoenix-cyan animate-pulse" />
              <span>VISUAL CHRONICLES // CAMPUS & COMPUTATION</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-primary">
              Visual <span className="text-gradient-cyan">Chronicles</span>.
            </h1>

            <p className="text-base sm:text-lg text-secondary font-sans leading-relaxed">
              An organized archival record of AI Club workshops, 36-hour hackathon endurance sprints, dialectic debates, and campus skunkworks milestones.
            </p>
          </div>

          {/* Category Filter Pills (PRD Section 6.2 B & C) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-secondary mr-2 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-phoenix-cyan" />
                Track:
              </span>
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-phoenix-blue/20 border-phoenix-cyan text-phoenix-cyan font-bold'
                      : 'border-white/10 text-secondary hover:text-primary hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-secondary">
              Showing {filteredItems.length} Archival Records
            </span>
          </div>

          {/* Section-Based Layout Organization (PRD Section 6.2 B & C) */}
          <div className="space-y-16">
            {categoriesToRender.map((categoryName) => {
              const itemsInCategory = galleryItems.filter((item) =>
                item.category.toLowerCase().includes(categoryName.toLowerCase())
              );

              if (itemsInCategory.length === 0) return null;

              return (
                <div key={categoryName} className="space-y-6">
                  {/* Category Section Divider & Heading */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-phoenix-cyan uppercase tracking-widest font-bold">
                      {categoryName}
                    </span>
                    <span className="text-xs font-mono text-secondary/60">
                      ({itemsInCategory.length})
                    </span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </div>

                  {/* Asymmetric Responsive Image Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itemsInCategory.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setActiveLightboxItem(item)}
                        className="group bg-navy-deep/60 border border-white/10 hover:border-phoenix-blue/50 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                      >
                        {/* Visual Image Presentation Tile */}
                        <div className="relative h-56 bg-gradient-to-tr from-[#05070B] via-[#0A1424] to-[#070D18] border-b border-white/10 flex items-center justify-center p-6 overflow-hidden">
                          <div className="absolute inset-0 bg-grid-pattern opacity-20 group-hover:opacity-35 transition-opacity" />

                          <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-phoenix-cyan group-hover:border-phoenix-cyan group-hover:scale-110 transition-all">
                              <Camera className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-mono text-secondary uppercase tracking-wider">
                              Record #{item.id}
                            </span>
                          </div>

                          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-secondary/70 bg-black/60 px-2 py-0.5">
                            {item.location}
                          </div>
                        </div>

                        {/* Card Metadata & Caption */}
                        <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-mono text-secondary">
                              <span className="text-phoenix-blue uppercase">{item.date}</span>
                              <span className="text-secondary/60 text-[10px]">Click to inspect</span>
                            </div>

                            <h3 className="text-lg font-display font-bold text-primary group-hover:text-phoenix-cyan transition-colors leading-snug">
                              {item.title}
                            </h3>

                            <p className="text-xs text-secondary font-sans leading-relaxed line-clamp-3">
                              {item.caption}
                            </p>
                          </div>

                          {/* Related Event Badge if exists */}
                          {item.relatedEventTitle && (
                            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-phoenix-cyan mt-3">
                              <span>Event: {item.relatedEventTitle}</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Accessible Lightbox Modal (PRD Section 6.2 D & E) */}
      {activeLightboxItem && (
        <ImageLightbox
          item={activeLightboxItem}
          items={filteredItems}
          onClose={() => setActiveLightboxItem(null)}
          onNavigate={(newItem) => setActiveLightboxItem(newItem)}
        />
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

