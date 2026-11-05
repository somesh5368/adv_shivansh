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
  Mail,
  Users,
} from 'lucide-react';
import { ScalesEmblem } from '@/components/public/ScalesEmblem';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { label: 'Overview & Enquiries', href: '/admin', icon: LayoutDashboard },
    { label: 'Firm Profile', href: '/admin/profile', icon: User },
    { label: 'Practice Areas', href: '/admin/practice-areas', icon: Scale },
    { label: 'Legal Services', href: '/admin/services', icon: Briefcase },
    { label: 'Articles & Insights', href: '/admin/articles', icon: FileText },
    { label: 'Media Manager', href: '/admin/media', icon: Image },
    { label: 'Site Settings', href: '/admin/settings', icon: Sliders },
    { label: 'Security & Access', href: '/admin/security', icon: Shield },
  ];

  const handleLogout = () => {
    localStorage.removeItem('advocate_admin_token');
    router.push('/admin/login');
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full bg-[#0c1017] text-bone">
      <div>
        {/* Admin Brand Header */}
        <div className="p-6 border-b border-[#1c2436] flex items-center justify-between bg-[#080b10]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xs bg-oxblood border border-brass/50 flex items-center justify-center shrink-0 shadow-sm">
              <ScalesEmblem size={22} className="text-brass" />
            </div>
            <div>
              <span className="font-serif text-sm font-bold tracking-wider text-white block">
                JUSTICE ALLIANCE
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brass block font-semibold">
                Associates &amp; Law Firm
              </span>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-bone/70 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Status Pill */}
        <div className="px-6 py-3 bg-[#111724] border-b border-[#1c2436] flex items-center justify-between text-[11px] text-bone/60">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 font-medium">Chambers Online</span>
          </span>
          <span className="text-[10px] uppercase font-bold text-brass/80">Super Admin</span>
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
                  'flex items-center space-x-3 px-3.5 py-2.5 text-xs font-semibold tracking-wide transition-all rounded-xs',
                  isActive
                    ? 'bg-oxblood text-brass border-l-2 border-brass shadow-sm font-bold'
                    : 'text-bone/70 hover:bg-[#151c2c] hover:text-white'
                )}
              >
                <Icon size={16} className={isActive ? 'text-brass' : 'text-bone/50'} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-[#1c2436] space-y-2.5 bg-[#080b10]">
        <div className="px-3 py-2 bg-[#111724] rounded-xs border border-[#1c2436]">
          <span className="text-[10px] text-bone/50 uppercase tracking-wider block">Logged in as:</span>
          <span className="text-xs font-bold text-brass truncate block">
            justicealliencelaw@gmail.com
          </span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs text-bone/70 hover:text-white hover:bg-[#151c2c] transition-colors rounded-xs"
        >
          <span className="flex items-center space-x-2">
            <ExternalLink size={14} className="text-brass" />
            <span>View Public Website</span>
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors text-left rounded-xs"
        >
          <LogOut size={14} />
          <span>Sign Out of Chambers</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className="md:hidden sticky top-0 z-30 bg-[#0c1017] border-b border-[#1c2436] px-4 py-3 flex items-center justify-between text-white w-full">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xs bg-oxblood border border-brass/50 flex items-center justify-center">
            <ScalesEmblem size={18} className="text-brass" />
          </div>
          <div>
            <span className="font-serif text-sm font-bold tracking-wide text-white block leading-tight">
              JUSTICE ALLIANCE
            </span>
            <span className="text-[9px] uppercase tracking-wider text-brass block">
              Associates &amp; Law Firm
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 text-brass hover:text-brass-light focus:outline-none"
          aria-label="Open Admin Menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Slide-Over Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="w-72 bg-[#0c1017] text-bone border-r border-[#1c2436] flex flex-col h-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop Permanent Docked Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0c1017] text-bone border-r border-[#1c2436] flex-col justify-between shrink-0 min-h-screen">
        {navContent}
      </aside>
    </>
  );
}
