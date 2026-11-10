'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '@/utils/audioManager';

/**
 * AudioToggle
 * Floating capsule control for enabling/disabling synthesized server room ambience.
 * Displays mini animated equalizer bars when sound is active.
 */
export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((active) => {
      setIsPlaying(active);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    audioManager.toggleSound();
  };

  return (
    <button
      onClick={handleToggle}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 border cursor-pointer select-none ${
        isPlaying
          ? 'bg-sage/15 border-sage/60 text-sage shadow-sage-glow'
          : 'bg-charcoal/40 border-slate-struct/40 text-ivory/60 hover:text-ivory hover:border-slate-struct/70'
      }`}
      title={isPlaying ? 'Mute Facility Ambience' : 'Enable Atmospheric Server Ambience'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-sage" />
          <div className="flex items-end gap-0.5 h-2.5 px-0.5">
            <span className="w-0.5 h-2 bg-sage rounded-full animate-pulse" />
            <span className="w-0.5 h-3 bg-sage rounded-full animate-bounce" />
            <span className="w-0.5 h-1.5 bg-sage rounded-full animate-pulse" />
          </div>
          {/* <span className="hidden sm:inline text-[11px] tracking-wider uppercase font-semibold">
            SOUND: ON
          </span> */}
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          {/* <span className="hidden sm:inline text-[11px] tracking-wider uppercase">
            SOUND: OFF
          </span> */}
        </>
      )}
    </button>
  );
}

