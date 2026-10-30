'use client';

import React from 'react';

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
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-display text-xs uppercase tracking-wider font-semibold transition-all duration-300 relative overflow-hidden group select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-phoenix-blue/40 rounded-none';

  const sizeStyles = {
    sm: 'px-4 py-2 text-[11px] gap-2',
    md: 'px-6 py-3 text-xs gap-2.5',
    lg: 'px-8 py-3.5 text-sm gap-3',
  };

  const variantStyles = {
    primary: 'bg-phoenix-blue text-white hover:bg-white hover:text-black shadow-glow-blue active:scale-[0.98]',
    secondary: 'bg-navy-deep/90 text-primary border border-white/15 hover:border-phoenix-blue hover:bg-navy-surface hover:text-white active:scale-[0.98]',
    orange: 'bg-phoenix-orange text-white hover:bg-white hover:text-black shadow-glow-orange active:scale-[0.98]',
    outline: 'bg-transparent text-primary border border-white/20 hover:border-phoenix-cyan hover:text-phoenix-cyan active:scale-[0.98]',
    ghost: 'bg-transparent text-secondary hover:text-white hover:bg-white/5',
  };

  const content = (
    <>
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
