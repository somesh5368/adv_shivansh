'use client';

import React from 'react';
import { UserCheck, Shield } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function AdminHeader({ title, description, actions }: AdminHeaderProps) {
  return (
    <div className="bg-white border-b border-ivory-dark px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">{title}</h1>
        {description && (
          <p className="text-xs text-charcoal/60 mt-1">{description}</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {actions}
        <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-ivory-dark text-xs text-navy font-medium">
          <Shield size={14} className="text-gold" />
          <span>Super Admin Active</span>
        </div>
      </div>
    </div>
  );
}

