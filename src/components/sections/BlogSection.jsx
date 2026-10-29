'use client';

import React, { useState } from 'react';
import { blogPosts } from '@/data/galleryData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookOpen, ArrowRight, Clock, User, CheckCircle2 } from 'lucide-react';

export function BlogSection() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="blog" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07090D] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <Badge variant="blue" icon={BookOpen}>
            07 // THOUGHT LEADERSHIP & DISPATCHES
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            AI Insights & <span className="text-phoenix-cyan">Dispatches</span>.
          </h2>
          <p className="text-base text-gray-400 font-sans leading-relaxed">
            Deep technical teardowns, algorithmic post-mortems, and paper reviews written by club researchers.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group relative p-6 rounded-xl bg-surface-100/70 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-4">
                  <span className="text-phoenix-cyan bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-white mb-3 group-hover:text-phoenix-cyan transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <User className="w-3.5 h-3.5 text-phoenix-ember" />
                  <span>{post.author}</span>
                </div>
                <span className="text-phoenix-cyan group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter / Dispatch Subscribe Box */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-surface-200 via-surface-100 to-surface-200 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Subscribe to the Phoenix Research Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-sans">
              Get our monthly breakdown of papers, open-source code repositories, and upcoming collegiate hackathons delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed! Check your campus email.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded bg-black/60 border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-phoenix-cyan w-full sm:w-64"
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
