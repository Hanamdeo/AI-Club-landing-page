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
  const baseStyles = 'inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 rounded-sm relative overflow-hidden group select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-phoenix-cyan/50';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[11px] gap-1.5',
    md: 'px-5 py-2.5 text-xs gap-2',
    lg: 'px-7 py-3.5 text-sm gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-phoenix-cyan text-[#07090D] hover:bg-white hover:shadow-glow-cyan active:scale-[0.98]',
    secondary: 'bg-surface-100/80 text-white border border-white/10 hover:border-phoenix-cyan/50 hover:bg-surface-50 hover:text-phoenix-cyan active:scale-[0.98]',
    ember: 'bg-phoenix-ember text-white hover:bg-orange-500 hover:shadow-glow-ember active:scale-[0.98]',
    outline: 'bg-transparent text-phoenix-cyan border border-phoenix-cyan/40 hover:border-phoenix-cyan hover:bg-phoenix-cyan/10 active:scale-[0.98]',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5',
  };

  const content = (
    <>
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
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
