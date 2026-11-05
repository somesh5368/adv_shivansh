import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'navy' | 'gray' | 'success';
  className?: string;
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const variants = {
    gold: 'bg-gold/15 text-gold-dark border border-gold/30',
    navy: 'bg-navy/10 text-navy border border-navy/20',
    gray: 'bg-gray-100 text-gray-700 border border-gray-200',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
