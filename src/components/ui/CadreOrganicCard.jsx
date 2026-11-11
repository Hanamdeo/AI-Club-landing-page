'use client';

import React from 'react';
import { Linkedin } from 'lucide-react';

/**
 * 8 Organic Blob Shape presets mirroring the asymmetric artistic shapes in the design reference.
 */
const BLOB_VARIANTS = [
  {
    outer: '60% 40% 30% 70% / 60% 30% 70% 40%',
    inner: '55% 45% 35% 65% / 55% 35% 65% 45%',
    rotate: '-3deg',
  },
  {
    outer: '40% 60% 65% 35% / 40% 45% 55% 60%',
    inner: '45% 55% 60% 40% / 45% 50% 50% 55%',
    rotate: '2deg',
  },
  {
    outer: '50% 50% 30% 70% / 55% 65% 35% 45%',
    inner: '48% 52% 35% 65% / 50% 60% 40% 50%',
    rotate: '-2deg',
  },
  {
    outer: '70% 30% 50% 50% / 30% 60% 40% 70%',
    inner: '65% 35% 45% 55% / 35% 55% 45% 65%',
    rotate: '4deg',
  },
  {
    outer: '35% 65% 60% 40% / 60% 35% 65% 40%',
    inner: '40% 60% 55% 45% / 55% 40% 60% 45%',
    rotate: '-4deg',
  },
  {
    outer: '55% 45% 70% 30% / 45% 55% 45% 55%',
    inner: '50% 50% 65% 35% / 45% 50% 50% 55%',
    rotate: '3deg',
  },
  {
    outer: '45% 55% 40% 60% / 65% 40% 60% 35%',
    inner: '45% 55% 45% 55% / 60% 45% 55% 40%',
    rotate: '-1deg',
  },
  {
    outer: '65% 35% 55% 45% / 40% 65% 35% 60%',
    inner: '60% 40% 50% 50% / 45% 60% 40% 55%',
    rotate: '2deg',
  },
];

/**
 * CadreOrganicCard
 * Implements the editorial off-white organic blob team directory layout:
 * - Off-white / ivory organic backdrop blob matching website theme
 * - Full-color portrait photo with very thin black border
 * - Minimalist info: Position -> Name -> Official LinkedIn Profile
 */
export default function CadreOrganicCard({ member, index = 0 }) {
  const variant = BLOB_VARIANTS[index % BLOB_VARIANTS.length];
  const photoSrc = member.image || '/images/team/member-0.jpg';

  return (
    <div className="group relative flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5">
      {/* 1. Off-White / Ivory Organic Blob + Full-Color Photo Frame */}
      <div className="relative w-44 h-48 sm:w-48 sm:h-52 mb-4 flex items-center justify-center">
        {/* Organic Off-White / Ivory Blob Backdrop */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-[#E6E2D8] via-[#F2EFE8] to-[#DDD8CE] transition-all duration-500 shadow-[0_8px_32px_rgba(230,226,216,0.30)] group-hover:shadow-[0_12px_42px_rgba(242,239,232,0.55)] group-hover:scale-105"
          style={{
            borderRadius: variant.outer,
            transform: `rotate(${variant.rotate})`,
          }}
        />

        {/* Soft warm off-white atmospheric glow halo behind blob */}
        <div
          className="absolute -inset-2 bg-[#E6E2D8]/18 blur-xl pointer-events-none rounded-full transition-opacity group-hover:opacity-90 opacity-50"
        />

        {/* Person Portrait in Full Vibrant Color with Thin Black Border */}
        <div
          className="relative z-10 w-36 h-44 sm:w-40 sm:h-48 overflow-hidden border border-black/90 transition-all duration-300 group-hover:scale-105 shadow-[0_0_0_1px_rgba(0,0,0,0.85)]"
          style={{
            borderRadius: variant.inner,
          }}
        >
          <img
            src={photoSrc}
            alt={member.name}
            draggable={false}
            className="w-full h-full object-cover transition-all duration-500 pointer-events-none"
            loading="lazy"
          />
        </div>
      </div>

      {/* 2. Position / Role (Top Line) */}
      <span className="text-[11px] sm:text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1 font-medium">
        {member.role}
      </span>

      {/* 3. Name (Bold White Heading) */}
      <h3 className="text-xl sm:text-2xl font-barlow-condensed font-bold uppercase text-white tracking-tight leading-tight mb-2">
        {member.name}
      </h3>

      {/* 4. Contact / LinkedIn Link */}
      {member.linkedin ? (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#0A66C2] hover:text-[#2884E0] transition-colors group/link cursor-pointer px-2 py-0.5 rounded-md hover:bg-[#0A66C2]/10"
        >
          <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] group-hover/link:text-[#2884E0] transition-colors shrink-0" />
          <span className="underline underline-offset-4 decoration-[#0A66C2]/60 group-hover/link:decoration-[#2884E0]">
            LinkedIn Profile
          </span>
        </a>
      ) : member.email ? (
        <a
          href={`mailto:${member.email}`}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-white transition-colors px-2 py-0.5"
        >
          <span>{member.email}</span>
        </a>
      ) : (
        <span className="text-[11px] font-mono text-slate-400">
          {member.department || 'MITS Gwalior'}
        </span>
      )}
    </div>
  );
}
