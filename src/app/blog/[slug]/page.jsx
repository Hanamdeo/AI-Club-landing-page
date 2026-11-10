'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Calendar,
  BookOpen,
  Share2,
  FileText,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#07090A] text-white pt-32 px-6 text-center">
        <h1 className="text-3xl font-barlow-condensed font-bold uppercase text-white mb-4">
          Article Not Found
        </h1>
        <Link href="/blog" className="text-xs font-mono text-[#55DFFF]">
          RETURN TO BLOG LISTING
        </Link>
      </main>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug);

  return (
    <main className="relative min-h-screen bg-[#07090A] text-white font-manrope pt-28 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-facility-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(85,223,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 font-mono text-[10px] text-slate-400 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#55DFFF] transition-colors">
            FACILITY 3D
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link href="/blog" className="hover:text-[#55DFFF] transition-colors">
            BLOG
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-[#55DFFF] font-semibold truncate max-w-[200px] sm:max-w-none">
            {post.title}
          </span>
        </div>

        {/* Return Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[rgba(85,223,255,0.15)] border border-white/[0.08] hover:border-[#55DFFF]/40 text-xs font-mono text-slate-300 hover:text-white transition-all group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>RETURN TO RESEARCH ARTICLES</span>
        </Link>

        {/* Article Header Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0C1014]/90 border border-[rgba(85,223,255,0.20)] shadow-[0_8px_32px_rgba(0,0,0,0.6)] mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[rgba(85,223,255,0.12)] border border-[rgba(85,223,255,0.30)] text-[#55DFFF] font-semibold uppercase">
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#24BFEA]" />
                <span>{post.readTime}</span>
              </span>
              <span>•</span>
              <span>{post.publishDate}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-barlow-condensed font-bold uppercase tracking-tight text-white mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-slate-300 font-manrope leading-relaxed mb-6">
            {post.summary}
          </p>

          {/* Author Block */}
          <div className="flex items-center gap-3 pt-6 border-t border-[rgba(85,223,255,0.14)]">
            <div className="w-10 h-10 rounded-full bg-[rgba(85,223,255,0.2)] border border-[rgba(85,223,255,0.4)] flex items-center justify-center font-mono text-sm font-bold text-[#55DFFF]">
              {post.author.charAt(0)}
            </div>
            <div>
              <span className="text-sm font-manrope font-semibold text-white block">
                {post.author}
              </span>
              <span className="text-xs font-mono text-slate-400 block">
                {post.authorRole}
              </span>
            </div>
          </div>
        </div>

        {/* Article Markdown-style Body */}
        <article className="p-8 sm:p-10 rounded-3xl bg-[#0C1014]/70 border border-white/[0.08] mb-10 prose prose-invert max-w-none text-slate-200 leading-relaxed font-manrope text-sm sm:text-base space-y-6">
          {post.body.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-barlow-condensed font-bold uppercase text-white mt-8 mb-3 text-[#24BFEA]">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('```')) {
              return (
                <pre key={idx} className="p-4 rounded-xl bg-[#07090A] border border-[rgba(85,223,255,0.15)] font-mono text-xs overflow-x-auto text-[#55DFFF]">
                  {paragraph.replace(/```python|```/g, '')}
                </pre>
              );
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1 text-slate-300">
                  {paragraph.split('\n').map((line, lIdx) => (
                    <li key={lIdx}>{line.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Cited Evidence & References (PRD 4.7 Requirement) */}
        {post.references && post.references.length > 0 && (
          <div className="p-6 rounded-2xl bg-[#0C1014]/90 border border-[rgba(85,223,255,0.18)] mb-10">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3 font-semibold">
              ACADEMIC CITATIONS & OFFICIAL REFERENCES
            </span>
            <div className="space-y-2">
              {post.references.map((ref, rIdx) => (
                <a
                  key={rIdx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#07090A] border border-white/[0.06] hover:border-[#55DFFF]/40 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#55DFFF]" />
                    <span className="text-xs font-mono text-slate-200 group-hover:text-white">{ref.title}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#55DFFF] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-barlow-condensed font-bold uppercase text-white mb-4">
              RELATED RESEARCH WRITEUPS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="p-5 rounded-2xl bg-[#0C1014]/80 border border-[rgba(85,223,255,0.16)] hover:border-[#55DFFF]/50 transition-colors group block"
                >
                  <span className="text-[10px] font-mono text-[#24BFEA] block mb-1 uppercase font-semibold">
                    {rel.category}
                  </span>
                  <h4 className="text-lg font-barlow-condensed font-bold uppercase text-white group-hover:text-[#55DFFF] transition-colors mb-2 leading-snug">
                    {rel.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    {rel.publishDate} • {rel.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
