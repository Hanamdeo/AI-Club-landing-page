'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  // Scroll listener for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Route transition flash
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
    >
      <div
        className="h-full bg-circuit-cyan transition-all duration-150 ease-out shadow-[0_0_8px_#48BDE8]"
        style={{
          width: isNavigating ? '100%' : `${scrollProgress}%`,
          opacity: isNavigating ? 1 : scrollProgress > 1 ? 0.9 : 0,
        }}
      />
    </div>
  );
}

