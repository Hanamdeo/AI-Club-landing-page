'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ChevronRight,
  Clock,
  User,
  Search,
  Sparkles,
  ArrowRight,
  Tag,
  FileText,
} from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog';
import { audioManager } from '@/utils/audioManager';

export default function BlogListingPage() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allTags = ['All', 'MLA', 'Transformers', 'Triton', 'CUDA', 'FP8', 'MCP', 'Autonomous Agents'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <main className="relative min-h-screen bg-[#07090A] text-white font-manrope pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-facility-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(255, 255, 255,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto ">
        

        {/* Master Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 border-b border-[rgba(255, 255, 255,0.18)] pb-8">
          <div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-barlow-condensed font-bold uppercase tracking-tight text-white leading-tight">
              RESEARCH BLOG
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-manrope mt-3 max-w-2xl leading-relaxed">
              In-depth mathematical breakdowns, kernel optimization walk-throughs, and system architecture deconstructions authored by AI Club researchers.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 px-4 sm:px-6 rounded-2xl bg-[#0C1014]/90 border border-[rgba(255,255,255,0.22)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-start md:self-auto text-left md:text-right w-full sm:w-auto">
            <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              DISPATCHED ESSAYS
            </span>
            <span className="text-2xl sm:text-3xl font-barlow-condensed font-bold text-[#FFFFFF] tracking-wider block">
              0{BLOG_POSTS.length} ARTICLES
            </span>
            <span className="text-[10px] font-mono text-[#E2E8F0]">Original Student Analysis</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  try { audioManager.playClick(); } catch {}
                  setSelectedTag(tag);
                }}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  selectedTag === tag
                    ? 'bg-[rgba(255, 255, 255,0.2)] text-white border border-[#FFFFFF] shadow-[0_0_12px_rgba(255, 255, 255,0.3)] font-semibold'
                    : 'bg-[#0C1014] text-slate-400 hover:text-white border border-[rgba(255, 255, 255,0.14)]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-auto sm:min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search research writeups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0C1014] border border-[rgba(255, 255, 255,0.2)] focus:border-[#FFFFFF] rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-6 mb-14">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-5 sm:p-7 md:p-8 rounded-2xl bg-[#0C1014]/90 border border-[rgba(255, 255, 255,0.18)] hover:border-[#FFFFFF]/40 transition-colors shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[rgba(255, 255, 255,0.1)] border border-[rgba(255, 255, 255,0.25)] text-[#FFFFFF] font-semibold">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E2E8F0]" />
                      <span>{post.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{post.publishDate}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-2xl sm:text-3xl font-barlow-condensed font-bold uppercase text-white group-hover:text-[#FFFFFF] transition-colors mb-3 tracking-tight">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-300 font-manrope leading-relaxed mb-6">
                  {post.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & Read Action */}
              <div className="pt-4 border-t border-[rgba(255, 255, 255,0.14)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[rgba(255, 255, 255,0.15)] border border-[rgba(255, 255, 255,0.3)] flex items-center justify-center text-xs font-mono font-bold text-[#FFFFFF]">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-manrope font-semibold text-white block">
                      {post.author}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      {post.authorRole}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#FFFFFF] hover:text-[#FFFFFF] transition-colors group"
                >
                  <span>READ ARTICLE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
