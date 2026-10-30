'use client';

import React from 'react';
import Link from 'next/link';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  onClick,
  href,
  disabled = false,
  target,
  rel,
  ...props
}) {
  const sizeStyles = {
    sm: 'px-4 py-2 text-[11px] gap-2',
    md: 'px-6 py-2.5 text-xs gap-2.5',
    lg: 'px-7 py-3.5 text-xs sm:text-sm gap-3',
  };

  // Base shared styles with spring physics
  const baseStyles = 'relative inline-flex items-center justify-center font-mono font-medium tracking-wider uppercase select-none cursor-pointer rounded-[6px] overflow-hidden focus:outline-none transition-all';

  if (variant === 'primary') {
    // Primary CTA Button per Specification:
    // Base: #0C0F14 bg, 1px solid #48BDE8 border, #F4F6F8 text, 6px radius
    // Hover: directional sweep using #48BDE8, text shifts to #050507 bold, translateY(-2px), glow
    // Active: translateY(0) scale(0.98)
    const buttonContent = (
      <>
        {/* Sweep background layer */}
        <span
          className="absolute inset-0 bg-circuit-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        {/* Interactive content layer */}
        <span className="relative z-10 inline-flex items-center gap-2 group-hover:text-[#050507] group-hover:font-bold transition-colors duration-200">
          {Icon && iconPosition === 'left' && (
            <Icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          )}
        </span>
      </>
    );

    const primaryClasses = `${baseStyles} ${sizeStyles[size]} bg-[#0C0F14] border border-circuit-cyan text-text-primary group hover:-translate-y-0.5 hover:shadow-circuit-btn active:translate-y-0 active:scale-[0.98] ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

    if (href) {
      const isExternal = href.startsWith('http') || target === '_blank';
      if (isExternal) {
        return (
          <a
            href={href}
            target={target || '_blank'}
            rel={rel || 'noopener noreferrer'}
            className={primaryClasses}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            {...props}
          >
            {buttonContent}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className={primaryClasses}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          {...props}
        >
          {buttonContent}
        </Link>
      );
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={primaryClasses}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }

  // Secondary / Ghost / Trace Button per Specification:
  // Animated underline trace or corner borders in #E6A12E (Beak Gold) drawing left to right (transform-origin: left)
  // Sliding arrow icon (transform: translateX(4px))
  const isSecondaryOrGhost = variant === 'secondary' || variant === 'ghost' || variant === 'outline';

  const secondaryContent = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2 text-text-primary group-hover:text-white transition-colors">
        {Icon && iconPosition === 'left' && (
          <Icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
        )}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && (
          <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
      {/* Animated Beak Gold underline trace */}
      <span
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-circuit-amber scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 pointer-events-none"
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      />
    </>
  );

  const secondaryClasses = `${baseStyles} ${sizeStyles[size]} group bg-[#0C0F14]/80 backdrop-blur-sm border border-[rgba(72,189,232,0.18)] hover:border-circuit-amber hover:-translate-y-0.5 hover:shadow-[0_4px_18px_-2px_rgba(230,161,46,0.25)] active:translate-y-0 active:scale-[0.98] ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http') || target === '_blank';
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          className={secondaryClasses}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          {...props}
        >
          {secondaryContent}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={secondaryClasses}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        {...props}
      >
        {secondaryContent}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={secondaryClasses}
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      {...props}
    >
      {secondaryContent}
    </button>
  );
}
