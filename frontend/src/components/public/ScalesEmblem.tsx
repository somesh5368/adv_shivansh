import React from 'react';

interface ScalesEmblemProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export function ScalesEmblem({ className = 'text-brass', size = 28, glow = false }: ScalesEmblemProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={glow ? { filter: 'drop-shadow(0 0 12px rgba(201, 162, 75, 0.45))' } : undefined}
      aria-hidden="true"
    >
      {/* Central Pillar Finial */}
      <circle cx="32" cy="7" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M32 10V56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Pillar Base Pedestal */}
      <path d="M22 56H42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 60H46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Main Balance Beam */}
      <path d="M10 20C18 17 46 17 54 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="18.5" r="2.5" fill="currentColor" />

      {/* Left Pan Chains & Pan */}
      <line x1="12" y1="20" x2="6" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="20" x2="18" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 36C4 41 20 41 20 36Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />

      {/* Right Pan Chains & Pan */}
      <line x1="52" y1="20" x2="46" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <line x1="52" y1="20" x2="58" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <path d="M44 36C44 41 60 41 60 36Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

