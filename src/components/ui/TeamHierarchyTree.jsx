'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  Linkedin,
  Github,
  Mail,
  ExternalLink,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TEAM_HIERARCHY_TREE } from '@/data/team';
import { audioManager } from '@/utils/audioManager';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TeamHierarchyTree() {
  const containerRef = useRef(null);
  const treeRef = useRef(null);
  const spineRef = useRef(null);
  const progressBarRef = useRef(null);
  const [activeDepth, setActiveDepth] = useState('L1 // Leadership');
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Small delay to ensure DOM and fonts have settled before measuring triggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      // Progress bar scrub at the top
      if (progressBarRef.current && treeRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: treeRef.current,
            start: 'top 85%',
            end: 'bottom 85%',
            scrub: 0.3,
          },
        });
      }

      // Continuous Spine growth scrub
      if (spineRef.current && treeRef.current) {
        gsap.fromTo(
          spineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: treeRef.current,
              start: 'top 80%',
              end: 'bottom 85%',
              scrub: 0.4,
            },
          }
        );
      }

      // Animate each hierarchy level safely (always visible fallback, once: true)
      const levelElements = gsap.utils.toArray('.hierarchy-level');
      levelElements.forEach((levelEl) => {
        const depthVal = levelEl.getAttribute('data-depth');
        const tag = levelEl.querySelector('.level-tag');
        const busLines = levelEl.querySelectorAll('.bus-line');
        const nodeCards = levelEl.querySelectorAll('.member-node');

        // Reveal tag
        if (tag) {
          gsap.fromTo(
            tag,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: 'power2.out',
              clearProps: 'opacity,transform',
              scrollTrigger: {
                trigger: levelEl,
                start: 'top 95%',
                once: true,
              },
            }
          );
        }

        // Expand bus lines horizontally
        if (busLines.length > 0) {
          gsap.fromTo(
            busLines,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.5,
              ease: 'power2.out',
              transformOrigin: 'center center',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: levelEl,
                start: 'top 95%',
                once: true,
              },
            }
          );
        }

        // Stagger nodes into view without ever hiding them if scroll happens fast
        if (nodeCards.length > 0) {
          gsap.fromTo(
            nodeCards,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: 'power2.out',
              clearProps: 'opacity,transform',
              scrollTrigger: {
                trigger: levelEl,
                start: 'top 95%',
                once: true,
              },
            }
          );
        }

        // Depth tracker trigger
        ScrollTrigger.create({
          trigger: levelEl,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => {
            if (self.isActive && depthVal) {
              setActiveDepth(depthVal);
            }
          },
        });
      });
    }, containerRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-4 select-none">
      {/* Top Section Scroll Progress Bar */}
      <div className="sticky top-16 left-0 right-0 h-[2px] bg-white/10 z-30 overflow-hidden mb-6">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-white origin-left scale-x-0 transition-transform shadow-[0_0_8px_#FFFFFF]"
        />
      </div>

      {/* Floating Depth Telemetry Monitor */}
      <div className="sticky top-20 z-20 mb-8 flex items-center justify-between pointer-events-none px-2 sm:px-0">
        <div className="pointer-events-auto inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#0C1014]/95 border border-white/20 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_#FFFFFF]" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              ACTIVE CADRE DEPTH:
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-white tracking-wider">
            {activeDepth}
          </span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0C1014]/85 border border-white/10 text-[10px] font-mono text-slate-400">
          <span>TREE NAVIGATION ACTIVE</span>
        </div>
      </div>

      {/* Main Hierarchy Tree Container */}
      <div
        ref={treeRef}
        className="relative max-w-6xl mx-auto px-2 sm:px-4 md:px-6 pb-20"
      >
        {/* Continuous Central Vertical Spine Line */}
        <div
          ref={spineRef}
          className="absolute left-1/2 -translate-x-1/2 top-4 bottom-16 w-[1.5px] bg-gradient-to-b from-white via-white/40 to-white/15 pointer-events-none z-0"
        />

        {/* ================================================================ */}
        {/* LEVEL 1: LEADERSHIP (President & Vice President)                */}
        {/* ================================================================ */}
        <section
          className="hierarchy-level relative z-10 mb-16 sm:mb-20"
          data-depth="L1 // Leadership"
        >
          {/* Level Header Tag */}
          <div className="level-tag flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C1014] border border-white/30 backdrop-blur-md shadow-[0_0_16px_rgba(255,255,255,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFFFFF]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white">
                LEADERSHIP CADRE
              </span>
            </div>
          </div>

          {/* President Card */}
          <div className="max-w-[340px] sm:max-w-[360px] mx-auto mb-8 sm:mb-10">
            <MemberNodeCard
              member={TEAM_HIERARCHY_TREE.levels[0].rows[0].members[0]}
              prominent
              onClick={() => setSelectedMember(TEAM_HIERARCHY_TREE.levels[0].rows[0].members[0])}
            />
          </div>

          {/* Vice President Card */}
          <div className="max-w-[340px] sm:max-w-[360px] mx-auto">
            <MemberNodeCard
              member={TEAM_HIERARCHY_TREE.levels[0].rows[1].members[0]}
              prominent
              onClick={() => setSelectedMember(TEAM_HIERARCHY_TREE.levels[0].rows[1].members[0])}
            />
          </div>
        </section>

        {/* ================================================================ */}
        {/* LEVEL 2: ADMINISTRATION (Secretary & Treasurer)                  */}
        {/* ================================================================ */}
        <section
          className="hierarchy-level relative z-10 mb-20 sm:mb-24"
          data-depth="L2 // Administration"
        >
          {/* Level Header Tag */}
          <div className="level-tag flex justify-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C1014] border border-white/25 backdrop-blur-md shadow-[0_0_14px_rgba(255,255,255,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white">
                ADMINISTRATION & FISCAL
              </span>
            </div>
          </div>

          {/* 2-Column Pair Grid with Horizontal Bus Connector */}
          <div className="relative max-w-xl mx-auto pt-6">
            {/* Bus Line joining the 2 nodes */}
            <div className="bus-line hidden sm:block absolute top-0 left-[25%] right-[25%] h-[1.5px] bg-white/30" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {TEAM_HIERARCHY_TREE.levels[1].rows[0].members.map((member) => (
                <div key={member.id} className="relative">
                  {/* Vertical stem connecting node to bus */}
                  <div className="hidden sm:block absolute -top-6 left-1/2 -translate-x-1/2 w-[1.5px] h-6 bg-white/30" />
                  <MemberNodeCard
                    member={member}
                    onClick={() => setSelectedMember(member)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* LEVEL 3: CORE HEADS (6 Domain Leads)                             */}
        {/* ================================================================ */}
        <section
          className="hierarchy-level relative z-10 mb-20 sm:mb-24"
          data-depth="L3 // Core Heads"
        >
          {/* Level Header Tag */}
          <div className="level-tag flex justify-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C1014] border border-white/25 backdrop-blur-md shadow-[0_0_14px_rgba(255,255,255,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white">
                CORE TECHNICAL & DOMAIN HEADS
              </span>
            </div>
          </div>

          {/* 6-Column Grid with Horizontal Bus */}
          <div className="relative w-full pt-6">
            {/* Bus Line spanning across columns */}
            <div className="bus-line hidden lg:block absolute top-0 left-[8.33%] right-[8.33%] h-[1.5px] bg-white/30" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {TEAM_HIERARCHY_TREE.levels[2].rows[0].members.map((member) => (
                <div key={member.id} className="relative">
                  {/* Vertical stem connecting node to bus */}
                  <div className="hidden lg:block absolute -top-6 left-1/2 -translate-x-1/2 w-[1.5px] h-6 bg-white/30" />
                  <MemberNodeCard
                    member={member}
                    compact
                    onClick={() => setSelectedMember(member)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* LEVEL 4: SUB-HEADS & COORDINATORS (2 Rows of 5)                  */}
        {/* ================================================================ */}
        <section
          className="hierarchy-level relative z-10"
          data-depth="L4 // Sub-Heads & Coordinators"
        >
          {/* Level Header Tag */}
          <div className="level-tag flex justify-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C1014] border border-white/25 backdrop-blur-md shadow-[0_0_14px_rgba(255,255,255,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white">
                SUB-HEADS & COORDINATORS
              </span>
            </div>
          </div>

          {/* Row 1 of 5 */}
          <div className="relative w-full pt-6 mb-8 sm:mb-10">
            <div className="bus-line hidden lg:block absolute top-0 left-[10%] right-[10%] h-[1.5px] bg-white/25" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {TEAM_HIERARCHY_TREE.levels[3].rows[0].members.map((member) => (
                <div key={member.id} className="relative">
                  <div className="hidden lg:block absolute -top-6 left-1/2 -translate-x-1/2 w-[1.5px] h-6 bg-white/25" />
                  <MemberNodeCard
                    member={member}
                    compact
                    onClick={() => setSelectedMember(member)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 of 5 */}
          <div className="relative w-full pt-6">
            <div className="bus-line hidden lg:block absolute top-0 left-[10%] right-[10%] h-[1.5px] bg-white/25" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {TEAM_HIERARCHY_TREE.levels[3].rows[1].members.map((member) => (
                <div key={member.id} className="relative">
                  <div className="hidden lg:block absolute -top-6 left-1/2 -translate-x-1/2 w-[1.5px] h-6 bg-white/25" />
                  <MemberNodeCard
                    member={member}
                    compact
                    onClick={() => setSelectedMember(member)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Quick Profile Modal Preview */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-8 rounded-2xl bg-[#0C1014] border border-white/25 shadow-[0_16px_48px_rgba(0,0,0,0.8)] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3.5 sm:gap-4 mb-4 sm:mb-5 pr-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#14181C] border border-white/30 flex items-center justify-center text-xl sm:text-2xl font-bold font-barlow-condensed text-white shadow-[0_0_16px_rgba(255,255,255,0.15)] shrink-0">
                {selectedMember.initials}
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-300 uppercase block truncate max-w-fit">
                  {selectedMember.level} • {selectedMember.levelTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-barlow-condensed font-bold uppercase tracking-tight text-white mt-1 break-words">
                  {selectedMember.name}
                </h3>
                <p className="text-xs font-mono text-slate-300 uppercase">
                  {selectedMember.role}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-manrope leading-relaxed mb-5 sm:mb-6">
              {selectedMember.bio}
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <span className="truncate">{selectedMember.department}</span>
              <div className="flex items-center gap-3">
                {selectedMember.linkedin && (
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {selectedMember.email && (
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Individual Node Card representing a member in the hierarchy.
 * Opacity is set to 100% by default so it never stays invisible during load.
 */
function MemberNodeCard({ member, prominent = false, compact = false, onClick }) {
  if (!member) return null;

  return (
    <div
      onClick={onClick}
      className={`member-node group relative rounded-2xl bg-[#0E1215] border transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center opacity-100 ${
        prominent
          ? 'p-6 sm:p-7 border-white/35 hover:border-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
          : compact
          ? 'p-3.5 sm:p-4 border-white/20 hover:border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_0_18px_rgba(255,255,255,0.15)]'
          : 'p-5 sm:p-6 border-white/25 hover:border-white/60 shadow-[0_6px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_22px_rgba(255,255,255,0.18)]'
      } hover:-translate-y-1`}
    >
      {/* Node Silhouette / Initials Avatar */}
      <div
        className={`rounded-full flex items-center justify-center border transition-all duration-300 ${
          prominent
            ? 'w-16 h-16 mb-3 bg-[#14181C] border-white/30 text-white font-barlow-condensed font-bold text-2xl shadow-[0_0_16px_rgba(255,255,255,0.15)] group-hover:scale-105'
            : compact
            ? 'w-10 h-10 mb-2 bg-[#14181C] border-white/25 text-slate-200 font-barlow-condensed font-bold text-sm shadow-sm group-hover:scale-105'
            : 'w-12 h-12 mb-2.5 bg-[#14181C] border-white/30 text-white font-barlow-condensed font-bold text-base shadow-[0_0_12px_rgba(255,255,255,0.1)] group-hover:scale-105'
        }`}
      >
        <svg
          viewBox="0 0 212 212"
          className="w-full h-full p-2.5 text-slate-400 group-hover:text-white transition-colors"
          aria-hidden="true"
        >
          <circle cx="106" cy="82" r="38" fill="currentColor" />
          <path
            d="M28 212c0-46 34-74 78-74s78 28 78 74z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Role Monospace Pill */}
      <span
        className={`font-mono uppercase tracking-wider block font-semibold truncate max-w-full ${
          prominent
            ? 'text-[11px] text-slate-300 mb-1'
            : compact
            ? 'text-[9px] text-slate-300 mb-0.5'
            : 'text-[10px] text-slate-300 mb-1'
        }`}
      >
        {member.role}
      </span>

      {/* Name Heading */}
      <strong
        className={`font-barlow-condensed font-bold uppercase tracking-tight text-white block leading-tight break-words max-w-full ${
          prominent
            ? 'text-xl sm:text-2xl'
            : compact
            ? 'text-sm sm:text-base'
            : 'text-base sm:text-lg'
        }`}
      >
        {member.name}
      </strong>

      {/* Quick Domain Tag */}
      {member.domain && !compact && (
        <span className="text-[9px] font-mono text-slate-400 mt-2 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] truncate max-w-full">
          {member.domain}
        </span>
      )}
    </div>
  );
}
