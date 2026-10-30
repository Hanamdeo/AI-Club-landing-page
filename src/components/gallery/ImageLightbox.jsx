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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050507]/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Lightbox Content Container */}
      <div
        className="relative w-full max-w-5xl bg-[#0C0F14] border border-[rgba(72,189,232,0.22)] rounded-[6px] shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#050507]/80 text-text-muted hover:text-white transition-colors cursor-pointer border border-[rgba(72,189,232,0.18)] rounded-[4px]"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Frame */}
        <div className="relative md:flex-1 bg-[#080B10] min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8 overflow-hidden">
          <div className="absolute inset-0 bg-circuit-grid opacity-30" />

          {/* Cybernetic Photographic Representation */}
          <div className="relative z-10 flex flex-col items-center gap-4 text-center max-w-md p-6 bg-[#0C0F14]/80 border border-[rgba(72,189,232,0.18)] rounded-[6px]">
            <div className="w-16 h-16 rounded-full bg-circuit-cyan/15 border border-circuit-cyan flex items-center justify-center text-circuit-cyan shadow-[0_0_16px_rgba(72,189,232,0.3)]">
              <Camera className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-circuit-cyan uppercase tracking-widest font-bold">
                Archival Record #{item.id}
              </span>
              <p className="text-xs font-mono text-text-muted">
                {item.altText}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-[#050507]/80 hover:bg-[#050507] text-white border border-[rgba(72,189,232,0.2)] rounded-[4px] transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-[#050507]/80 hover:bg-[#050507] text-white border border-[rgba(72,189,232,0.2)] rounded-[4px] transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Counter */}
          <div className="absolute bottom-4 left-4 text-[11px] font-mono text-text-muted bg-[#050507]/90 px-2.5 py-1 border border-[rgba(72,189,232,0.14)] rounded-[2px]">
            {currentIndex + 1} / {items.length}
          </div>
        </div>

        {/* Sidebar Information Panel */}
        <div className="w-full md:w-80 lg:w-96 p-6 sm:p-8 bg-[#0C0F14] border-t md:border-t-0 md:border-l border-[rgba(72,189,232,0.14)] flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-circuit-cyan/15 text-circuit-cyan border border-circuit-cyan/40 rounded-[3px] font-bold">
                {item.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-text-primary leading-snug tracking-tight">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed">
              {item.caption}
            </p>

            <div className="space-y-2 pt-4 border-t border-[rgba(72,189,232,0.12)] text-xs font-mono text-text-muted">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-circuit-cyan" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-circuit-amber" />
                <span>{item.location}</span>
              </div>
            </div>

            {/* Tags */}
            {item.tags && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono text-text-muted bg-[#080B10] px-2 py-0.5 border border-[rgba(72,189,232,0.1)] rounded-[2px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Related Event Link */}
          <div className="pt-4 border-t border-[rgba(72,189,232,0.14)] space-y-3">
            {item.relatedEventUrl ? (
              <Link
                href={item.relatedEventUrl}
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-[#080B10] hover:bg-circuit-cyan/20 border border-circuit-cyan/40 rounded-[4px] text-xs font-mono text-circuit-cyan flex items-center justify-between transition-colors font-bold"
              >
                <span>View Related Event Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div className="text-[11px] font-mono text-text-muted/60">
                Official AI Club Archival Documentation
              </div>
            )}

            <div className="text-[10px] font-mono text-text-muted/50 text-center">
              Use ← / → keys to browse • ESC to exit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
