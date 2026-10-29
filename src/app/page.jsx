'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ResearchRadarSection } from '@/components/sections/ResearchRadarSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { GDRoomSection } from '@/components/sections/GDRoomSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { BlogSection } from '@/components/sections/BlogSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { JoinCTASection } from '@/components/sections/JoinCTASection';
import { Footer } from '@/components/layout/Footer';

// Dynamic import for the 3D Phoenix persistent canvas (SSR false)
const PhoenixCanvas = dynamic(
  () => import('@/components/phoenix/PhoenixCanvas').then((mod) => mod.PhoenixCanvas),
  { ssr: false }
);

export default function HomePage() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <main className="relative bg-background min-h-screen text-white">
      {/* Persistent Fixed 3D WebGL Canvas Layer */}
      <PhoenixCanvas />

      {/* Top Navbar */}
      <Navbar onOpenJoinModal={() => setIsJoinModalOpen(true)} />

      {/* Content Sections */}
      <div className="relative z-20">
        {/* 02. Hero Section */}
        <HeroSection onOpenJoinModal={() => setIsJoinModalOpen(true)} />

        {/* 03. About the Club */}
        <AboutSection />

        {/* 04. AI Research Radar */}
        <ResearchRadarSection />

        {/* 05. Events & Arena */}
        <EventsSection onOpenJoinModal={() => setIsJoinModalOpen(true)} />

        {/* 06. GD Room (Group Discussion Arena) */}
        <GDRoomSection onOpenJoinModal={() => setIsJoinModalOpen(true)} />

        {/* 07. Priority: Student AI Projects Showcase */}
        <ProjectsSection />

        {/* 08. Club Gallery */}
        <GallerySection />

        {/* 09. AI Insights & Blog */}
        <BlogSection />

        {/* 10. Team & Leadership */}
        <TeamSection />

        {/* 11. Priority: Join the Club CTA */}
        <JoinCTASection
          isModalOpen={isJoinModalOpen}
          setIsModalOpen={setIsJoinModalOpen}
        />

        {/* 12. Technical Footer */}
        <Footer />
      </div>
    </main>
  );
}
