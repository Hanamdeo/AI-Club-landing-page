'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, ExternalLink, Camera } from 'lucide-react';

export function ImageLightbox({ item, items, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, items]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const navigate = (direction) => {
    const newIndex = (currentIndex + direction + items.length) % items.length;
    onNavigate(items[newIndex]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Lightbox Content Container */}
      <div
        className="relative w-full max-w-5xl bg-navy-deep border border-white/20 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 text-secondary hover:text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Frame */}
        <div className="relative md:flex-1 bg-gradient-to-tr from-[#05070B] via-[#0C1524] to-[#080E1A] min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          {/* Abstract Cybernetic Photographic Representation */}
          <div className="relative z-10 flex flex-col items-center gap-4 text-center max-w-md p-6 bg-black/40 border border-white/10">
            <div className="w-16 h-16 rounded-full bg-phoenix-blue/20 border border-phoenix-blue flex items-center justify-center text-phoenix-cyan">
              <Camera className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-phoenix-cyan uppercase tracking-widest font-bold">
                Archival Record #{item.id}
              </span>
              <p className="text-xs font-mono text-secondary">
                {item.altText}
              </p>
            </div>
          </div>

          {/* Navigation Controls on the Image Frame */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/90 text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/90 text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Counter */}
          <div className="absolute bottom-4 left-4 text-[11px] font-mono text-secondary/80 bg-black/70 px-2.5 py-1 border border-white/10">
            {currentIndex + 1} / {items.length}
          </div>
        </div>

        {/* Sidebar Information Panel (PRD Section 6.2 D) */}
        <div className="w-full md:w-80 lg:w-96 p-6 sm:p-8 bg-[#05080E] border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-phoenix-blue/20 text-phoenix-cyan border border-phoenix-blue/40 font-bold">
                {item.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-primary leading-snug">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-secondary font-sans leading-relaxed">
              {item.caption}
            </p>

            <div className="space-y-2 pt-4 border-t border-white/10 text-xs font-mono text-secondary">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-phoenix-blue" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-phoenix-orange" />
                <span>{item.location}</span>
              </div>
            </div>

            {/* Tags */}
            {item.tags && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono text-secondary/70 bg-white/5 px-2 py-0.5 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Related Event Link (PRD Section 6.2 D) */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            {item.relatedEventUrl ? (
              <Link
                href={item.relatedEventUrl}
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-navy-deep hover:bg-phoenix-blue/20 border border-phoenix-blue/30 text-xs font-mono text-phoenix-cyan flex items-center justify-between transition-colors font-bold"
              >
                <span>View Related Event Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div className="text-[11px] font-mono text-secondary/60">
                Official AI Club Archival Documentation
              </div>
            )}

            <div className="text-[10px] font-mono text-secondary/40 text-center">
              Use ← / → keys to browse • ESC to exit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

