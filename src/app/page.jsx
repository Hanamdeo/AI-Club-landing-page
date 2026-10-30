'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ClubStorySection } from '@/components/sections/ClubStorySection';
import { AboutSection } from '@/components/sections/AboutSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { GDRoomSection } from '@/components/sections/GDRoomSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { Footer } from '@/components/layout/Footer';
import { PageTransitionWrapper } from '@/components/layout/PageTransitionWrapper';

// Dynamic import for the 3D Phoenix persistent canvas on homepage (SSR false)
const PhoenixCanvas = dynamic(
  () => import('@/components/phoenix/PhoenixCanvas').then((mod) => mod.PhoenixCanvas),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="relative bg-[#050507] min-h-screen text-text-primary selection:bg-circuit-cyan selection:text-[#050507]">
      {/* Persistent Fixed 3D WebGL Phoenix Canvas Layer (Homepage Only) */}
      <PhoenixCanvas />

      {/* Global Top Navbar */}
      <Navbar />

      <PageTransitionWrapper>
        {/* Homepage Editorial Experience */}
        <div className="relative z-20">
          {/* 01. Hero Section + Telemetry + Phoenix Target */}
          <HeroSection />

          {/* 02. Club Visual Storytelling & Moments */}
          <ClubStorySection />

          {/* 03. About the Club & Pillars */}
          <AboutSection />

          {/* 04. Events & Sprints Preview */}
          <EventsSection />

          {/* 05. GD Dialectic Room Preview */}
          <GDRoomSection />

          {/* 06. Team Organizational Hierarchy */}
          <TeamSection />

          {/* 07. Technical Footer */}
          <Footer />
        </div>
      </PageTransitionWrapper>
    </main>
  );
}
