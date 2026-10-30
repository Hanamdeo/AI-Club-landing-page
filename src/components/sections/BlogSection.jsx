'use client';

import React, { useState } from 'react';
import { blogPosts } from '@/data/galleryData';
import { Button } from '@/components/ui/Button';
import { Clock, User, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function BlogSection() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const leadPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="blog" className="relative py-32 px-6 sm:px-8 bg-[#05070B] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-phoenix-blue uppercase">
            06 // TECHNICAL DISPATCHES & WRITING
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-phoenix-blue/30 via-white/10 to-transparent" />
        </div>

        <div className="max-w-3xl mb-12 space-y-3">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            AI Insights & <span className="text-gradient-cyan">Dispatches</span>.
          </h2>
          <p className="text-base text-secondary font-sans leading-relaxed">
            Deep technical teardowns, algorithmic benchmarks, and peer reviews authored by club researchers.
          </p>
        </div>

        {/* Magazine Editorial Split Layout (NOT identical cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Lead Article (7 Cols) */}
          <article className="lg:col-span-7 p-8 sm:p-10 bg-navy-deep/70 border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-secondary">
                <span className="text-phoenix-cyan uppercase">{leadPost.category}</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{leadPost.readTime}</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary hover:text-phoenix-cyan transition-colors leading-snug cursor-pointer">
                {leadPost.title}
              </h3>

              <p className="text-sm sm:text-base text-secondary font-sans leading-relaxed">
                {leadPost.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-secondary">
                <User className="w-4 h-4 text-phoenix-orange" />
                <span>By <strong className="text-primary">{leadPost.author}</strong></span>
              </div>
              <span className="text-phoenix-blue hover:text-white flex items-center gap-1 font-display font-semibold transition-colors cursor-pointer">
                Read Full Paper <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </article>

          {/* Supporting Articles List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {otherPosts.map((post) => (
              <article
                key={post.id}
                className="p-6 bg-navy-deep/40 border-b border-white/10 flex flex-col justify-between space-y-3 hover:bg-navy-deep/60 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-secondary">
                  <span className="text-phoenix-blue uppercase">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h4 className="text-lg font-display font-bold text-primary hover:text-phoenix-cyan transition-colors cursor-pointer">
                  {post.title}
                </h4>
                <p className="text-xs text-secondary font-sans leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-2 text-[11px] font-mono text-secondary flex items-center justify-between">
                  <span>{post.author}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-secondary hover:text-primary transition-colors cursor-pointer" />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Minimal Terminal Dispatch Subscribe Strip */}
        <div className="p-8 sm:p-10 bg-navy-deep/90 border border-phoenix-blue/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-primary">
              Subscribe to the Monthly Research Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-secondary font-sans">
              Monthly breakdown of reproducible papers, GPU cluster allocations, and hackathon schedules. Zero spam.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dossier Confirmed! Check your campus inbox.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 bg-background border border-white/15 text-primary placeholder-muted text-xs font-mono focus:outline-none focus:border-phoenix-blue w-full sm:w-72"
                />
                <Button variant="primary" size="md" type="submit">
                  Subscribe
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
