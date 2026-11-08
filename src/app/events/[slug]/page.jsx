import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  Share2,
} from 'lucide-react';
import { EVENTS } from '@/data/events';
import { getEventBySlug } from '@/lib/contentSelectors';

export async function generateStaticParams() {
  return EVENTS.flatMap((e) => [
    { slug: e.slug },
    { slug: e.id },
  ]);
}

export default function EventDetailPage({ params }) {
  const event = getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const isRegistrationOpen = event.registrationStatus === 'open';

  return (
    <main className="relative min-h-screen bg-[#0A0E10] text-[#E6E2D8] font-sans pt-28 pb-24 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Grid & Glow */}
      <div className="absolute inset-0 bg-facility-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(36,191,234,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-8 font-mono text-[10px] text-slate-400 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#A7B7A1] transition-colors">
            FACILITY
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link href="/events" className="hover:text-[#A7B7A1] transition-colors">
            OPERATIONS
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-[#24BFEA] font-semibold truncate max-w-[200px] sm:max-w-none">
            {event.title}
          </span>
        </div>

        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-all group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>RETURN TO OPERATIONS BOARD</span>
        </Link>

        {/* Header Hero Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#121617]/90 border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.6)] mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-[#A7B7A1] font-semibold">
              {event.category}
            </span>

            <span
              className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 ${
                isRegistrationOpen
                  ? 'bg-signal-green/15 text-signal-green border border-signal-green/30'
                  : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              {isRegistrationOpen ? 'CLEARANCE OPEN // ACTIVE' : 'OPERATION CONCLUDED'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-labeouf font-bold text-ivory tracking-wide leading-tight mb-6">
            {event.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-8">
            {event.description}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#0D1011] border border-white/[0.06] text-xs font-mono">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#24BFEA] shrink-0" />
              <div>
                <span className="block text-[9px] text-slate-500 uppercase">DATE</span>
                <span className="text-slate-200 font-semibold">{event.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#A7B7A1] shrink-0" />
              <div>
                <span className="block text-[9px] text-slate-500 uppercase">TIMING</span>
                <span className="text-slate-200 font-semibold">{event.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
              <MapPin className="w-4 h-4 text-signal-green shrink-0" />
              <div>
                <span className="block text-[9px] text-slate-500 uppercase">VENUE</span>
                <span className="text-slate-200 font-semibold truncate">{event.venue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prerequisites & Tooling */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#121617]/80 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#A7B7A1] uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#24BFEA]" />
                <span>PREREQUISITES & CLEARANCE REQUIREMENTS</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {event.prerequisites || 'Open to all enrolled students with active GitHub accounts and basic technical curiosity.'}
              </p>
            </div>

            {/* Operational Directive */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#121617]/80 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#A7B7A1] uppercase tracking-wider font-semibold">
                <Cpu className="w-4 h-4 text-signal-green" />
                <span>SYSTEM BRIEFING & CURRICULUM</span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                <p>
                  Participants will work directly with AI Club mentors, deploying open models on dedicated facility hardware and accessing cloud computing clusters for benchmark experiments.
                </p>
                <p>
                  All source code, weights, and technical artifacts created during this operation must be committed to public GitHub repositories under open licenses.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Registration & Logistics (1 col) */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="p-6 rounded-2xl bg-[#121617] border border-[#24BFEA]/30 shadow-[0_4px_24px_rgba(36,191,234,0.1)] text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                SEAT AVAILABILITY
              </span>
              <span className="text-xl font-bold font-labeouf text-[#24BFEA] tracking-wider block mb-4">
                {event.seats || 'Open Capacity'}
              </span>

              {isRegistrationOpen && event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#24BFEA] hover:bg-[#38BDF8] text-[#0A0E10] text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(36,191,234,0.4)]"
                >
                  <span>OFFICIAL REGISTRATION</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="w-full py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-slate-500">
                  REGISTRATION CLOSED
                </div>
              )}
            </div>

            {/* Coordinator Info */}
            <div className="p-5 rounded-2xl bg-[#121617]/80 border border-white/[0.08] text-xs font-mono">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block mb-2">
                OPERATIONAL COORDINATOR
              </span>
              <p className="text-sm font-bold text-ivory">
                {event.coordinator || 'AI Club Operations Cadre'}
              </p>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Department of CSE & AI, MITS Gwalior
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
