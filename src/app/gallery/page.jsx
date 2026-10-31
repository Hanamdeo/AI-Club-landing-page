'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransitionWrapper } from '@/components/layout/PageTransitionWrapper';
import { galleryItems, galleryCategories } from '@/data/galleryData';
import { ImageLightbox } from '@/components/gallery/ImageLightbox';
import { CircuitCard } from '@/components/ui/CircuitCard';
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
    <div className="relative min-h-screen bg-[#050507] text-text-primary flex flex-col selection:bg-circuit-cyan selection:text-[#050507]">
      {/* Background Cyber-Circuit Grid */}
      <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />

      {/* Global Navbar */}
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 sm:px-8 relative z-10">
        <PageTransitionWrapper>
          <div className="max-w-7xl mx-auto space-y-16">
            {/* Header */}
            <div className="space-y-6 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0C0F14] border border-[rgba(72,189,232,0.18)] rounded-[4px] text-xs font-mono text-circuit-cyan uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-circuit-cyan animate-pulse" />
                <span>VISUAL CHRONICLES // CAMPUS & COMPUTATION</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tightest text-text-primary">
                Visual <span className="text-gradient-cyan">Chronicles</span>.
              </h1>

              <p className="text-base sm:text-lg text-text-muted font-sans leading-relaxed">
                An organized archival record of AI Club workshops, 36-hour hackathon endurance sprints, dialectic debates, and campus skunkworks milestones.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[rgba(72,189,232,0.14)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-text-muted mr-2 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-circuit-cyan" />
                  Track:
                </span>
                {galleryCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer rounded-[4px] ${
                      selectedCategory === cat
                        ? 'bg-circuit-cyan/15 border-circuit-cyan text-circuit-cyan font-bold'
                        : 'border-[rgba(72,189,232,0.14)] bg-[#0C0F14] text-text-muted hover:text-text-primary hover:border-circuit-cyan/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-text-muted">
                Showing {filteredItems.length} Archival Records
              </span>
            </div>

            {/* Section-Based Layout Organization */}
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
                      <span className="text-xs font-mono text-circuit-cyan uppercase tracking-widest font-bold">
                        {categoryName}
                      </span>
                      <span className="text-xs font-mono text-text-muted/60">
                        ({itemsInCategory.length})
                      </span>
                      <div className="h-[1px] flex-1 bg-[rgba(72,189,232,0.14)]" />
                    </div>

                    {/* Asymmetric Responsive Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {itemsInCategory.map((item) => (
                        <CircuitCard
                          key={item.id}
                          onClick={() => setActiveLightboxItem(item)}
                          className="cursor-pointer flex flex-col justify-between"
                          withTicks={true}
                        >
                          {/* Visual Image Presentation Tile */}
                          <div className="relative h-52 bg-[#080B10] border-b border-[rgba(72,189,232,0.14)] flex items-center justify-center p-6 overflow-hidden">
                            <div className="absolute inset-0 bg-circuit-grid opacity-25 group-hover:opacity-40 transition-opacity" />

                            <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                              <div className="w-12 h-12 rounded-full bg-[#0C0F14] border border-[rgba(72,189,232,0.2)] flex items-center justify-center text-circuit-cyan group-hover:border-circuit-cyan group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(72,189,232,0.3)] transition-all">
                                <Camera className="w-5 h-5" />
                              </div>
                              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                                Record #{item.id}
                              </span>
                            </div>

                            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-text-muted/80 bg-[#050507]/80 px-2 py-0.5 rounded-[2px] border border-white/5">
                              {item.location}
                            </div>
                          </div>

                          {/* Card Metadata & Caption */}
                          <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                                <span className="text-circuit-amber uppercase">{item.date}</span>
                                <span className="text-text-muted/60 text-[10px]">Click to inspect</span>
                              </div>

                              <h3 className="text-lg font-display font-bold text-text-primary group-hover:text-circuit-cyan transition-colors leading-snug">
                                {item.title}
                              </h3>

                              <p className="text-xs text-text-muted font-sans leading-relaxed line-clamp-3">
                                {item.caption}
                              </p>
                            </div>

                            {/* Related Event Badge if exists */}
                            {item.relatedEventTitle && (
                              <div className="pt-3 border-t border-[rgba(72,189,232,0.1)] flex items-center justify-between text-[11px] font-mono text-circuit-cyan mt-3">
                                <span>Event: {item.relatedEventTitle}</span>
                                <ExternalLink className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                        </CircuitCard>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PageTransitionWrapper>
      </main>

      {/* Accessible Lightbox Modal */}
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
