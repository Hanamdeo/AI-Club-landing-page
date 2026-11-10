'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * HolographicCard
 * Solo Leveling "System UI" inspired holographic animated card component.
 * Features:
 * - Staggered vertical holographic entrance animation with blue glow
 * - Subtle 3D cursor-tracking perspective tilt and holographic specular reflection
 * - Lift and intensified electric cyan border glow on hover
 * - Responsive click glow pulse and tactile compression
 * - Fully respects prefers-reduced-motion
 * - Preserves existing layout, typography, 3D background transparency, and event bubbling
 */
export default function HolographicCard({
  children,
  className = '',
  index = 0,
  onClick,
  as: Component = 'div',
  isFeatured = false,
  ...props
}) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const clickTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  // Stagger calculation: 90ms per index, cycling every 8 items so later cards don't wait too long
  const staggerDelay = (index % 8) * 90;

  // Viewport intersection observer for scroll-triggered entrance
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Subtle 3D perspective tilt calculation using CSS custom variables
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      // Subtle tilt: max 3.5 degrees
      const tiltX = (-y * 4.5).toFixed(2);
      const tiltY = (x * 4.5).toFixed(2);

      el.style.setProperty('--tilt-x', `${tiltX}deg`);
      el.style.setProperty('--tilt-y', `${tiltY}deg`);
      el.style.setProperty('--mouse-x', `${((x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--mouse-y', `${((y + 0.5) * 100).toFixed(1)}%`);
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    }
  }, []);

  // Click glow pulse and tactile response
  const handleClick = useCallback(
    (e) => {
      setIsClicked(true);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      clickTimeoutRef.current = setTimeout(() => {
        setIsClicked(false);
      }, 350);

      if (onClick) {
        onClick(e);
      }
    },
    [onClick]
  );

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`group relative overflow-hidden focus-within:border-[#E2E8F0] focus-within:shadow-[0_0_24px_rgba(255, 255, 255, 0.35)] transition-all duration-300 ${
        isClicked ? 'scale-[0.985]' : ''
      } ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(-5px)'
          : isVisible
          ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)'
          : 'perspective(1000px) translateY(35px) scale(0.97)',
        opacity: isVisible ? 1 : 0,
        boxShadow: !isVisible
          ? '0 0 24px rgba(255, 255, 255, 0.35)'
          : undefined,
        transitionProperty: 'transform, opacity, box-shadow, border-color',
        transitionDuration: isVisible ? (isHovered ? '120ms' : '480ms') : '480ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: isVisible && !isHovered ? `${staggerDelay}ms` : '0ms',
      }}
      {...props}
    >
      {/* Solo Leveling Top Refraction Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none z-20 transition-opacity duration-300 ${
          isFeatured
            ? 'bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent opacity-90'
            : 'bg-gradient-to-r from-transparent via-[#E2E8F0]/60 to-transparent opacity-40 group-hover:opacity-100'
        }`}
      />

      {/* Solo Leveling Tech Corner Notches */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[#E2E8F0]/40 pointer-events-none z-20 group-hover:border-[#E2E8F0]/80 transition-colors" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[#E2E8F0]/40 pointer-events-none z-20 group-hover:border-[#E2E8F0]/80 transition-colors" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-[#E2E8F0]/40 pointer-events-none z-20 group-hover:border-[#E2E8F0]/80 transition-colors" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-[#E2E8F0]/40 pointer-events-none z-20 group-hover:border-[#E2E8F0]/80 transition-colors" />

      {/* Dynamic Cursor-Tracked Specular Holographic Sheen */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.09), transparent 60%)',
        }}
      />

      {/* Click Neon Border Flash Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none z-20 rounded-2xl transition-opacity duration-300 ${
          isClicked
            ? 'opacity-100 shadow-[inset_0_0_20px_rgba(255, 255, 255, 0.4),0_0_28px_rgba(255, 255, 255, 0.6)] border border-[#E2E8F0]'
            : 'opacity-0'
        }`}
      />

      {/* Card Inner Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </Component>
  );
}
