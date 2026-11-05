'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Scale,
  Briefcase,
  FileText,
  Image,
  Sliders,
  Shield,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Profile', href: '/admin/profile', icon: User },
    { label: 'Practice Areas', href: '/admin/practice-areas', icon: Scale },
    { label: 'Services', href: '/admin/services', icon: Briefcase },
    { label: 'Articles', href: '/admin/articles', icon: FileText },
    { label: 'Media Manager', href: '/admin/media', icon: Image },
    { label: 'Site Settings', href: '/admin/settings', icon: Sliders },
    { label: 'Security & Logs', href: '/admin/security', icon: Shield },
  ];

  const handleLogout = () => {
    localStorage.removeItem('advocate_admin_token');
    router.push('/admin/login');
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Admin Brand */}
        <div className="p-6 border-b border-navy-800 flex items-center justify-between">
          <div>
            <span className="font-serif text-lg font-bold tracking-wider text-white block">
              JUSTICE ALLIANCE
            </span>
            <span className="text-[10px] font-mono text-gold uppercase tracking-widest block mt-0.5">
              Associates & Law Firm
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-ivory/70 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === '/admin'
                ? pathname === '/admin'
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2.5 text-xs font-medium tracking-wide transition-all rounded-xs',
                  isActive
                    ? 'bg-navy text-gold border-l-2 border-gold font-semibold'
                    : 'text-ivory/70 hover:bg-navy-800 hover:text-white'
                )}
              >
                <Icon size={16} className={isActive ? 'text-gold' : 'text-ivory/50'} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-navy-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs text-ivory/60 hover:text-white hover:bg-navy-800 transition-colors"
        >
          <span className="flex items-center space-x-2">
            <ExternalLink size={14} />
            <span>View Public Website</span>
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-navy-800 transition-colors text-left"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className="md:hidden sticky top-0 z-30 bg-navy-900 border-b border-navy-800 px-4 py-3 flex items-center justify-between text-white w-full">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 bg-navy border border-gold/40 flex items-center justify-center">
            <Scale size={16} className="text-gold" />
          </div>
          <div>
            <span className="font-serif text-sm font-bold tracking-wide text-white block leading-tight">
              JUSTICE ALLIANCE
            </span>
            <span className="text-[9px] font-mono text-gold uppercase tracking-wider block">
              Associates & Law Firm
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 text-gold hover:text-gold-light focus:outline-none"
          aria-label="Open Admin Menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Slide-Over Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="w-72 bg-navy-900 text-ivory border-r border-navy-800 flex flex-col h-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop Permanent Docked Sidebar */}
      <aside className="hidden md:flex w-64 bg-navy-900 text-ivory border-r border-navy-800 flex-col justify-between shrink-0 min-h-screen">
        {navContent}
      </aside>
    </>
  );
}
