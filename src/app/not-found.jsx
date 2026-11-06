'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Radio, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-graphite flex items-center justify-center p-6 text-ivory font-sans select-none">
      <div className="max-w-md w-full p-8 rounded-2xl bg-charcoal/90 border border-white/10 shadow-2xl text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/40 border border-sage/40 mb-6 text-sage">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        </div>

        <p className="text-xs font-mono text-sage uppercase tracking-widest mb-2">
          Sector Error // 404
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight mb-3">
          Signal Lost
        </h1>

        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          The requested data node does not exist within the facility grid or has been decommissioned.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sage hover:bg-sage-glow text-graphite font-bold text-xs uppercase tracking-wider transition-all shadow-sage-glow font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Facility Entrance</span>
        </Link>
      </div>
    </main>
  );
}
