'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  Filter,
  FileText,
  Sparkles,
} from 'lucide-react';
import { getAllDiscussions } from '@/lib/contentSelectors';
import { filterByCategory, getUniqueCategories } from '@/lib/contentHelpers';
import { audioManager } from '@/utils/audioManager';
import HolographicCard from '@/components/ui/HolographicCard';

/**
 * Section 04: The Discussion Room
 * Dedicated to Group Discussions (GDs), reading circles, and knowledge sharing.
 * Features category filtering, upcoming vs past session archives, and resource references.
 */
export default function DiscussionRoom() {
  const allDiscussions = getAllDiscussions();
  const categories = getUniqueCategories(allDiscussions, 'category');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewTab, setViewTab] = useState('upcoming'); // 'upcoming' | 'past'
  const [registeredIds, setRegisteredIds] = useState([]);

  const filteredDiscussions = filterByCategory(allDiscussions, selectedCategory, 'category').filter(
    (item) => item.status === viewTab
  );

  const handleRegister = (id) => {
    audioManager.playClick();
    if (!registeredIds.includes(id)) {
      setRegisteredIds((prev) => [...prev, id]);
    }
  };

  return (
    <section id="discussions" className="relative w-full py-16 sm:py-20 px-6 md:px-12 lg:px-16 border-t border-white/[0.08] font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Elevated Architectural Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-md bg-[#131718] border border-white/[0.1] text-[10px] font-mono tracking-widest text-[#A7B7A1] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_8px_#22C55E]" />
              <span>SECTOR 04 // KNOWLEDGE EXCHANGE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-archivo font-black tracking-tight text-gradient-cyber leading-[0.98] drop-shadow-sm">
              THE DISCUSSION ROOM
            </h2>
            <p className="text-sm sm:text-base text-[#B5B8AF] font-normal mt-3 max-w-2xl leading-relaxed">
              Weekly reading circles, technical deconstructions, and adversarial paper debates exploring the frontier of machine intelligence and systems theory.
            </p>
          </div>

          {/* View Tab Toggle: Upcoming vs Archive (Frosted Cyber Toggle) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#131718] border border-white/[0.08] self-start md:self-auto shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
            <button
              onClick={() => {
                audioManager.playClick();
                setViewTab('upcoming');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer btn-tactile ${
                viewTab === 'upcoming'
                  ? 'bg-gradient-to-r from-[#A7B7A1] to-[#B6C4B4] text-[#141819] shadow-[0_2px_12px_rgba(167,183,161,0.3)]'
                  : 'text-[#B5B8AF] hover:text-[#F2EFE8] hover:bg-white/[0.04]'
              }`}
            >
              Upcoming GDs
            </button>
            <button
              onClick={() => {
                audioManager.playClick();
                setViewTab('past');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer btn-tactile ${
                viewTab === 'past'
                  ? 'bg-gradient-to-r from-[#A7B7A1] to-[#B6C4B4] text-[#141819] shadow-[0_2px_12px_rgba(167,183,161,0.3)]'
                  : 'text-[#B5B8AF] hover:text-[#F2EFE8] hover:bg-white/[0.04]'
              }`}
            >
              Past Archive
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          <Filter className="w-3.5 h-3.5 text-sage shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                audioManager.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all cursor-pointer btn-tactile ${
                selectedCategory === cat
                  ? 'bg-[#1B2122] border border-sage/60 text-sage font-semibold'
                  : 'bg-[#141819] border border-white/[0.08] text-ivory/70 hover:border-white/[0.16] hover:text-ivory'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Discussions Grid */}
        {filteredDiscussions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredDiscussions.map((gd, index) => {
              const isRegistered = registeredIds.includes(gd.id);

              return (
                <HolographicCard
                  key={gd.id}
                  index={index}
                  isFeatured={gd.featured}
                  className={`p-6 ${
                    gd.featured ? 'solo-leveling-card-featured' : 'solo-leveling-card'
                  }`}
                >
                  <div>
                    {/* Category & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#1B2122] border border-white/[0.08] text-sage font-medium">
                        {gd.category}
                      </span>
                      {gd.featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sage/15 border border-sage/30 text-sage font-semibold uppercase">
                          Featured Topic
                        </span>
                      )}
                    </div>

                    {/* Topic Title */}
                    <h3 className="text-lg sm:text-xl font-display font-bold text-ivory mb-2 leading-snug tracking-tight">
                      {gd.topic}
                    </h3>

                    {/* Abstract / Description */}
                    <p className="text-xs sm:text-sm text-ivory/75 leading-relaxed mb-4 line-clamp-2 font-normal">
                      {gd.abstract}
                    </p>

                    {/* Compact Logistics Metadata */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-4 font-mono bg-[#101415] p-3 rounded-lg border border-white/[0.05]">
                      <div className="flex items-center gap-2 truncate">
                        <Calendar className="w-3.5 h-3.5 text-sage shrink-0" />
                        <span className="truncate">{gd.date}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <Clock className="w-3.5 h-3.5 text-sage shrink-0" />
                        <span className="truncate">{gd.time}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <MapPin className="w-3.5 h-3.5 text-sage shrink-0" />
                        <span className="truncate">{gd.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <User className="w-3.5 h-3.5 text-sage shrink-0" />
                        <span className="truncate">{gd.moderator}</span>
                      </div>
                    </div>

                    {/* Past Summary or Resources */}
                    {gd.summary && (
                      <div className="mb-4 p-3 rounded-lg bg-[#101415] border border-white/[0.06] text-xs text-ivory/80 leading-relaxed font-normal">
                        <span className="text-sage font-mono font-semibold block mb-1 text-[10px] uppercase">
                          Discussion Summary:
                        </span>
                        <p className="line-clamp-2">{gd.summary}</p>
                      </div>
                    )}

                    {gd.resources && gd.resources.length > 0 && (
                      <div className="mb-4">
                        <span className="text-[10px] font-mono text-slate-400 block mb-1.5 font-medium uppercase">
                          Referenced Papers:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {gd.resources.map((res, i) => (
                            <a
                              key={i}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#101415] border border-white/[0.06] hover:border-sage/40 text-[11px] text-sage font-mono transition-colors"
                            >
                              <FileText className="w-3 h-3 shrink-0" />
                              <span className="truncate max-w-[180px]">{res.name}</span>
                              <ArrowUpRight className="w-3 h-3 shrink-0 opacity-70" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Bar for Upcoming Sessions */}
                  {viewTab === 'upcoming' && (
                    <div className="pt-3 border-t border-white/[0.08]">
                      <button
                        onClick={() => handleRegister(gd.id)}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer tracking-wider uppercase btn-tactile ${
                          isRegistered
                            ? 'bg-sage/20 border border-sage/50 text-sage cursor-default'
                            : 'bg-sage hover:bg-sage-glow text-graphite shadow-tactile active:shadow-tactile-active font-bold'
                        }`}
                      >
                        {isRegistered ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                            <span>Seat Reserved</span>
                          </>
                        ) : (
                          <>
                            <span>RESERVE SEAT IN GD</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </HolographicCard>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-xl bg-[#141819] border border-white/[0.08] text-slate-400 text-xs font-mono">
            No discussions found for the selected category.
          </div>
        )}
      </div>
    </section>
  );
}

