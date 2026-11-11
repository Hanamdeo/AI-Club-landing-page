import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Users,
  ExternalLink,
} from 'lucide-react';
import { EVENTS } from '@/data/events';
import { getEventBySlug } from '@/lib/contentSelectors';
import { isPast, formatEventDateRange } from '@/lib/dateUtils';

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

  const isEventConcluded = isPast(event.date, event.endDate);
  const isRegistrationOpen =
    event.registrationStatus === 'open' && !isEventConcluded && Boolean(event.registrationUrl);
  const dateDisplay = formatEventDateRange(event.date, event.endDate);

  return (
    <main className="relative min-h-screen bg-[#07090A] text-[#F8FAFC] font-events-body pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-facility-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[550px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-24 left-1/4 w-[500px] h-80 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Breadcrumb Navigation: IBM Plex Mono */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8 events-mono-meta text-slate-400 overflow-x-auto no-scrollbar py-1">
          <Link href="/" className="hover:text-white transition-colors shrink-0">
            FACILITY
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
          <Link href="/events" className="hover:text-white transition-colors shrink-0">
            OPERATIONS
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
          <span className="text-[#FFFFFF] font-semibold truncate max-w-[180px] sm:max-w-none">
            {event.title}
          </span>
        </div>

        {/* Back Button: IBM Plex Mono */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#FFFFFF]/15 border border-white/[0.1] hover:border-[#FFFFFF]/40 events-mono-btn text-slate-200 hover:text-white transition-all group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>RETURN TO OPERATIONS BOARD</span>
        </Link>

        {/* Header Hero Card */}
        <div className="p-5 sm:p-8 md:p-10 rounded-3xl bg-[#0D1012]/95 border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.85)] mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            {/* Category Badge: IBM Plex Mono */}
            <span className="events-mono-meta px-3 py-1 rounded-full bg-[#FFFFFF]/15 border border-[#FFFFFF]/35 text-white font-semibold">
              {event.category}
            </span>

            {/* Status Pill: IBM Plex Mono */}
            <span
              className={`events-mono-meta px-3 py-1 rounded-full flex items-center gap-1.5 ${
                isEventConcluded
                  ? 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
                  : isRegistrationOpen
                  ? 'bg-[#E2E8F0]/15 text-[#FFFFFF] border border-[#E2E8F0]/35 shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                  : 'bg-white/[0.05] text-slate-300 border border-white/[0.12]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              {isEventConcluded
                ? 'OPERATION CONCLUDED'
                : isRegistrationOpen
                ? 'CLEARANCE OPEN // ACTIVE'
                : 'SCHEDULED // INTAKE PENDING'}
            </span>
          </div>

          {/* Event Title */}
          <h1 className="events-detail-title mb-6">
            {event.title}
          </h1>

          {/* Event Description */}
          <p className="events-body-prose text-slate-200 mb-8">
            {event.description}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#080A0C] border border-white/[0.08] text-xs font-events-mono">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#FFFFFF] shrink-0" />
              <div>
                <span className="block events-mono-meta text-slate-500">DATE</span>
                <span className="text-white font-semibold tracking-wide">{dateDisplay}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#E2E8F0] shrink-0" />
              <div>
                <span className="block events-mono-meta text-slate-500">TIMING</span>
                <span className="text-white font-semibold tracking-wide">{event.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
              <MapPin className="w-4 h-4 text-white/80 shrink-0" />
              <div>
                <span className="block events-mono-meta text-slate-500">VENUE</span>
                <span className="text-white font-semibold truncate tracking-wide">{event.venue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prerequisites & Tooling */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0D1012]/90 border border-white/[0.1]">
              <div className="flex items-center gap-2 mb-4 events-mono-meta text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#FFFFFF]" />
                <span>PREREQUISITES & CLEARANCE REQUIREMENTS</span>
              </div>
              <p className="events-body-text text-slate-300">
                {event.prerequisites || 'Open to all enrolled students with active GitHub accounts and basic technical curiosity.'}
              </p>
            </div>

            {/* Operational Directive */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0D1012]/90 border border-white/[0.1]">
              <div className="flex items-center gap-2 mb-4 events-mono-meta text-[#FFFFFF] font-semibold">
                <Cpu className="w-4 h-4 text-[#E2E8F0]" />
                <span>SYSTEM BRIEFING & CURRICULUM</span>
              </div>
              <div className="space-y-3 events-body-text text-slate-300">
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
            <div className="p-6 rounded-2xl bg-[#0D1012] border border-[#FFFFFF]/35 shadow-[0_4px_24px_rgba(255,255,255,0.18)] text-center">
              <span className="events-mono-meta text-slate-400 block mb-1">
                SEAT AVAILABILITY
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-events-heading bg-gradient-to-r from-[#FFFFFF] via-[#E2E8F0] to-[#FFFFFF] bg-clip-text text-transparent tracking-wider block mb-4 leading-tight">
                {event.seats || 'Open Capacity'}
              </span>

              {isRegistrationOpen && event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#E2E8F0] via-[#FFFFFF] to-[#E2E8F0] text-[#000000] events-mono-btn transition-all shadow-[0_0_22px_rgba(255,255,255,0.45)] font-black"
                >
                  <span>OFFICIAL REGISTRATION</span>
                  <ExternalLink className="w-4 h-4 text-[#000000]" />
                </a>
              ) : (
                <div className="w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
                  {isEventConcluded ? 'REGISTRATION CONCLUDED' : 'INTAKE DETAILS ANNOUNCING SOON'}
                </div>
              )}
            </div>

            {/* Coordinator Contact Card */}
            <div className="p-6 rounded-2xl bg-[#0D1012] border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3 events-mono-meta text-slate-400">
                <Users className="w-4 h-4 text-white" />
                <span>OPERATION COORDINATOR</span>
              </div>
              <p className="font-semibold text-white text-sm mb-1">
                {event.coordinator || 'AI Club Operations Cadre'}
              </p>
              <p className="text-xs text-slate-400 font-sans">
                For seat allocation queries, contact{' '}
                <a href="mailto:aiclub@mitsgwalior.in" className="text-white hover:underline">
                  aiclub@mitsgwalior.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
