'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ResearchRadarSection } from '@/components/sections/ResearchRadarSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { GDRoomSection } from '@/components/sections/GDRoomSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { BlogSection } from '@/components/sections/BlogSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { Footer } from '@/components/layout/Footer';

// Dynamic import for the 3D Phoenix persistent canvas (SSR false)
const PhoenixCanvas = dynamic(
  () => import('@/components/phoenix/PhoenixCanvas').then((mod) => mod.PhoenixCanvas),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="relative bg-background min-h-screen text-white">
      {/* Persistent Fixed 3D WebGL Canvas Layer */}
      <PhoenixCanvas />

      {/* Top Navbar */}
      <Navbar />

      {/* Content Sections */}
      <div className="relative z-20">
        {/* 02. Hero Section */}
        <HeroSection />

        {/* 03. About the Club */}
        <AboutSection />

        {/* 04. AI Research Radar */}
        <ResearchRadarSection />

        {/* 05. Events & Arena */}
        <EventsSection />

        {/* 06. GD Room (Group Discussion Arena) */}
        <GDRoomSection />

        {/* 07. Club Gallery */}
        <GallerySection />

        {/* 08. AI Insights & Blog */}
        <BlogSection />

        {/* 09. Team & Leadership */}
        <TeamSection />

        {/* 10. Technical Footer */}
        <Footer />
      </div>
    </main>
  );
}

