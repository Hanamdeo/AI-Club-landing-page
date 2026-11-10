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

    const ctx = gsap.context(() => {
      // Progress bar at top of section
      if (progressBarRef.current && treeRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: treeRef.current,
            start: 'top 80%',
            end: 'bottom 80%',
            scrub: 0.3,
          },
        });
      }

      // Vertical Spine expansion scrub
      if (spineRef.current && treeRef.current) {
        gsap.fromTo(
          spineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: treeRef.current,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.5,
            },
          }
        );
      }

      // Animate each hierarchy level
      const levelElements = gsap.utils.toArray('.hierarchy-level');
      levelElements.forEach((levelEl) => {
        const depthVal = levelEl.getAttribute('data-depth');
        const tag = levelEl.querySelector('.level-tag');
        const busLines = levelEl.querySelectorAll('.bus-line');
        const nodeCards = levelEl.querySelectorAll('.member-node');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: levelEl,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });

        if (tag) {
          tl.from(tag, {
            opacity: 0,
            y: 18,
            duration: 0.45,
            ease: 'power2.out',
          });
        }

        if (busLines.length > 0) {
          tl.from(
            busLines,
            {
              scaleX: 0,
              duration: 0.5,
              ease: 'power2.out',
              transformOrigin: 'center center',
            },
            '-=0.2'
          );
        }

        if (nodeCards.length > 0) {
          tl.from(
            nodeCards,
            {
              opacity: 0,
              y: 24,
              duration: 0.55,
              stagger: {
                each: 0.06,
                from: 'center',
              },
              ease: 'power2.out',
            },
            '-=0.3'
          );
        }

        // Depth tracker scroll trigger
        ScrollTrigger.create({
          trigger: levelEl,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive && depthVal) {
              setActiveDepth(depthVal);
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-8 select-none">
      {/* Top Section Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/10 z-20 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-white origin-left scale-x-0 transition-transform shadow-[0_0_8px_#FFFFFF]"
        />
      </div>

      {/* Floating Depth Telemetry Monitor */}
      <div className="sticky top-20 z-30 mb-8 flex items-center justify-between pointer-events-none px-2 sm:px-0">
        <div className="pointer-events-auto inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#0C1014]/90 border border-white/20 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
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

        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0C1014]/80 border border-white/10 text-[10px] font-mono text-slate-400">
          <span>TREE NAVIGATION ACTIVE</span>
        </div>
      </div>

      {/* Main Hierarchy Tree Container */}
      <div
        ref={treeRef}
        className="relative max-w-6xl mx-auto px-2 sm:px-4 md:px-8 pb-20"
      >
        {/* Continuous Central Vertical Spine Line */}
        <div
          ref={spineRef}
          className="absolute left-1/2 -translate-x-1/2 top-4 bottom-24 w-[1.5px] bg-gradient-to-b from-white via-white/40 to-white/15 pointer-events-none z-0"
        />

        {/* ================================================================ */}
        {/* LEVEL 1: LEADERSHIP (President & Vice President)                */}
        {/* ================================================================ */}
        <section
          className="hierarchy-level relative z-10 mb-20"
          data-depth="L1 // Leadership"
        >
          {/* Level Header Tag */}
          <div className="level-tag flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C1014] border border-white/30 backdrop-blur-md shadow-[0_0_16px_rgba(255,255,255,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFFFFF]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white">
                LEADERSHIP CADRE
              </span>
            </div>
          </div>

          {/* President Card */}
          <div className="max-w-[360px] mx-auto mb-10">
            <MemberNodeCard
              member={TEAM_HIERARCHY_TREE.levels[0].rows[0].members[0]}
              prominent
              onClick={() => setSelectedMember(TEAM_HIERARCHY_TREE.levels[0].rows[0].members[0])}
            />
          </div>

          {/* Vice President Card */}
          <div className="max-w-[360px] mx-auto">
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
          className="hierarchy-level relative z-10 mb-24"
          data-depth="L2 // Administration"
        >
          {/* Level Header Tag */}
          <div className="level-tag flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C1014] border border-white/25 backdrop-blur-md shadow-[0_0_14px_rgba(255,255,255,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white">
                ADMINISTRATION & FISCAL
              </span>
            </div>
          </div>

          {/* 2-Column Pair Grid with Horizontal Bus Connector */}
          <div className="relative max-w-xl mx-auto">
            {/* Bus Line joining the 2 nodes */}
            <div className="bus-line hidden sm:block absolute -top-6 left-[25%] right-[25%] h-[1.5px] bg-white/30" />

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
          className="hierarchy-level relative z-10 mb-24"
          data-depth="L3 // Core Heads"
        >
          {/* Level Header Tag */}
          <div className="level-tag flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C1014] border border-white/25 backdrop-blur-md shadow-[0_0_14px_rgba(255,255,255,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white">
                CORE TECHNICAL & DOMAIN HEADS
              </span>
            </div>
          </div>

          {/* 6-Column Grid with Horizontal Bus */}
          <div className="relative w-full">
            {/* Bus Line spanning across columns */}
            <div className="bus-line hidden lg:block absolute -top-6 left-[8.33%] right-[8.33%] h-[1.5px] bg-white/30" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
          <div className="level-tag flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C1014] border border-white/25 backdrop-blur-md shadow-[0_0_14px_rgba(255,255,255,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white">
                SUB-HEADS & COORDINATORS
              </span>
            </div>
          </div>

          {/* Row 1 of 5 */}
          <div className="relative w-full mb-8">
            <div className="bus-line hidden lg:block absolute -top-6 left-[10%] right-[10%] h-[1.5px] bg-white/25" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
          <div className="relative w-full">
            <div className="bus-line hidden lg:block absolute -top-6 left-[10%] right-[10%] h-[1.5px] bg-white/25" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#0C1014] border border-white/25 shadow-[0_16px_48px_rgba(0,0,0,0.8)] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-[#14181C] border border-white/30 flex items-center justify-center text-2xl font-bold font-barlow-condensed text-white shadow-[0_0_16px_rgba(255,255,255,0.15)]">
                {selectedMember.initials}
              </div>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-300 uppercase">
                  {selectedMember.level} • {selectedMember.levelTitle}
                </span>
                <h3 className="text-2xl font-barlow-condensed font-bold uppercase tracking-tight text-white mt-1">
                  {selectedMember.name}
                </h3>
                <p className="text-xs font-mono text-slate-300 uppercase">
                  {selectedMember.role}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 font-manrope leading-relaxed mb-6">
              {selectedMember.bio}
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{selectedMember.department}</span>
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
 * Individual Node Card representing a member in the hierarchy
 */
function MemberNodeCard({ member, prominent = false, compact = false, onClick }) {
  if (!member) return null;

  return (
    <div
      onClick={onClick}
      className={`member-node group relative rounded-2xl bg-[#0C1014]/90 border transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center ${
        prominent
          ? 'p-6 sm:p-7 border-white/35 hover:border-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
          : compact
          ? 'p-3.5 sm:p-4 border-white/15 hover:border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_0_18px_rgba(255,255,255,0.12)]'
          : 'p-5 sm:p-6 border-white/20 hover:border-white/50 shadow-[0_6px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_0_22px_rgba(255,255,255,0.15)]'
      } hover:-translate-y-1`}
    >
      {/* Node Silhouette / Initials Avatar */}
      <div
        className={`rounded-full flex items-center justify-center border transition-all duration-300 ${
          prominent
            ? 'w-16 h-16 mb-3.5 bg-[#12161A] border-white/30 text-white font-barlow-condensed font-bold text-2xl shadow-[0_0_16px_rgba(255,255,255,0.15)] group-hover:scale-105'
            : compact
            ? 'w-10 h-10 mb-2.5 bg-[#12161A] border-white/20 text-slate-200 font-barlow-condensed font-bold text-sm shadow-sm group-hover:scale-105'
            : 'w-12 h-12 mb-3 bg-[#12161A] border-white/25 text-white font-barlow-condensed font-bold text-base shadow-[0_0_12px_rgba(255,255,255,0.1)] group-hover:scale-105'
        }`}
      >
        <svg
          viewBox="0 0 212 212"
          className="w-full h-full p-2.5 opacity-80 group-hover:opacity-100 transition-opacity"
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
        className={`font-mono uppercase tracking-wider block font-medium truncate max-w-full ${
          prominent
            ? 'text-[11px] text-slate-300 mb-1.5'
            : compact
            ? 'text-[9px] text-slate-400 mb-1'
            : 'text-[10px] text-slate-300 mb-1'
        }`}
      >
        {member.role}
      </span>

      {/* Name Heading */}
      <strong
        className={`font-barlow-condensed font-bold uppercase tracking-tight text-white block leading-tight ${
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
        <span className="text-[9px] font-mono text-slate-400 mt-2 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
          {member.domain}
        </span>
      )}
    </div>
  );
}
