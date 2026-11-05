import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  hoverable?: boolean;
}

export function Card({
  className,
  bordered = true,
  hoverable = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white p-6 shadow-subtle transition-all duration-300',
        bordered && 'border border-ivory-dark',
        hoverable && 'hover:shadow-card-hover hover:border-gold/50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
