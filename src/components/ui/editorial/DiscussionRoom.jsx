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
    <section id="discussions" className="relative w-full py-24 px-6 md:px-12 lg:px-16 border-t border-white/10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-sage/10 border border-sage/30 text-xs font-mono text-sage uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 04 // Knowledge Exchange</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-ivory tracking-tight">
              THE DISCUSSION ROOM
            </h2>
            <p className="text-base sm:text-lg text-sage/90 font-light mt-2 max-w-2xl">
              Weekly reading circles, technical deconstructions, and adversarial paper debates exploring the bleeding edge of AI theory.
            </p>
          </div>

          {/* View Tab Toggle: Upcoming vs Archive */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 self-start md:self-auto shrink-0">
            <button
              onClick={() => {
                audioManager.playClick();
                setViewTab('upcoming');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                viewTab === 'upcoming'
                  ? 'bg-sage text-graphite shadow-sage-glow'
                  : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
              }`}
            >
              Upcoming GDs
            </button>
            <button
              onClick={() => {
                audioManager.playClick();
                setViewTab('past');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                viewTab === 'past'
                  ? 'bg-sage text-graphite shadow-sage-glow'
                  : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
              }`}
            >
              Past Archive & Resources
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          <Filter className="w-3.5 h-3.5 text-sage shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                audioManager.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sage/20 border border-sage text-sage shadow-sage-glow'
                  : 'bg-black/20 border border-white/10 text-ivory/70 hover:border-white/20 hover:text-ivory'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Discussions Grid */}
        {filteredDiscussions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDiscussions.map((gd) => {
              const isRegistered = registeredIds.includes(gd.id);

              return (
                <div
                  key={gd.id}
                  className="rounded-2xl bg-charcoal/40 border border-white/10 p-6 sm:p-7 hover:border-sage/40 hover:bg-charcoal/60 transition-all flex flex-col justify-between shadow-glass-panel"
                >
                  <div>
                    {/* Category & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-black/40 border border-white/10 text-sage font-medium">
                        {gd.category}
                      </span>
                      {gd.featured && (
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sage/20 border border-sage/40 text-sage font-semibold uppercase">
                          Featured Topic
                        </span>
                      )}
                    </div>

                    {/* Topic Title */}
                    <h3 className="text-xl font-bold text-ivory mb-2.5 leading-snug tracking-tight">
                      {gd.topic}
                    </h3>

                    {/* Abstract / Description */}
                    <p className="text-sm text-ivory/80 leading-relaxed mb-5 font-normal">
                      {gd.abstract}
                    </p>

                    {/* Session Logistics Metadata */}
                    <div className="space-y-2 text-xs text-slate-300 mb-6 font-mono bg-black/25 p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-sage" />
                        <span>{gd.date}</span>
                        <span className="text-slate-500">•</span>
                        <Clock className="w-3.5 h-3.5 text-sage" />
                        <span>{gd.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-sage" />
                        <span>{gd.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-sage" />
                        <span>Moderator: {gd.moderator}</span>
                      </div>
                    </div>

                    {/* Past Summary or Resources */}
                    {gd.summary && (
                      <div className="mb-5 p-3 rounded-xl bg-black/30 border border-white/10 text-xs text-ivory/80 leading-relaxed">
                        <span className="text-sage font-mono font-bold block mb-1">
                          // DISCUSSION SUMMARY:
                        </span>
                        {gd.summary}
                      </div>
                    )}

                    {gd.resources && gd.resources.length > 0 && (
                      <div className="mb-5">
                        <span className="text-[11px] font-mono text-slate-400 block mb-2 font-medium uppercase">
                          Referenced Reading & Papers:
                        </span>
                        <div className="space-y-1.5">
                          {gd.resources.map((res, i) => (
                            <a
                              key={i}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs text-sage hover:underline"
                            >
                              <FileText className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{res.name}</span>
                              <ArrowUpRight className="w-3 h-3 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Bar for Upcoming Sessions */}
                  {viewTab === 'upcoming' && (
                    <div className="pt-4 border-t border-white/10">
                      <button
                        onClick={() => handleRegister(gd.id)}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer tracking-wider uppercase ${
                          isRegistered
                            ? 'bg-sage/20 border border-sage text-sage cursor-default'
                            : 'bg-sage hover:bg-sage-glow text-graphite shadow-sage-glow'
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
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-black/20 border border-white/10 text-slate-400 text-sm">
            No discussions found for the selected category.
          </div>
        )}
      </div>
    </section>
  );
}

