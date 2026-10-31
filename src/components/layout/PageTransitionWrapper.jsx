'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransitionWrapper({ children }) {
  const pathname = usePathname();
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      key={pathname}
      className={`transition-all duration-[350ms] ${
        animating
          ? 'opacity-0 translate-y-3'
          : 'opacity-100 translate-y-0'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  );
}

