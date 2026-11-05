'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(hasDarkClass);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    if (nextIsDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch {}
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full border border-brass/40 flex items-center justify-center opacity-70 ${className}`}
        aria-hidden="true"
      >
        <Moon size={15} className="text-brass" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex items-center space-x-2 px-2.5 py-1.5 rounded-full border border-brass/50 bg-charcoal-light/70 hover:bg-oxblood/80 text-bone hover:text-white transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-brass ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun
            size={16}
            className="text-amber-300 transform group-hover:rotate-45 transition-transform duration-300 animate-pulse-subtle"
          />
        ) : (
          <Moon
            size={15}
            className="text-brass group-hover:-rotate-12 transition-transform duration-300"
          />
        )}
      </div>

      {showLabel && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-brass">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
}

