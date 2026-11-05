'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function AdminHeader({ title, description, actions }: AdminHeaderProps) {
  return (
    <div className="bg-white border-b border-bone-dark px-4 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-oxblood">{title}</h1>
        {description && (
          <p className="text-xs text-charcoal/70 mt-1">{description}</p>
        )}
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        {actions}
        
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-bone border border-bone-dark text-xs font-semibold text-charcoal hover:text-oxblood hover:border-brass transition-colors rounded-xs shadow-subtle"
        >
          <span>Live Site</span>
          <ExternalLink size={12} className="text-brass" />
        </Link>

        <div className="hidden lg:flex items-center space-x-2 pl-4 border-l border-bone-dark text-xs text-charcoal font-semibold">
          <ShieldCheck size={16} className="text-brass" />
          <span>Super Admin</span>
        </div>
      </div>
    </div>
  );
}
