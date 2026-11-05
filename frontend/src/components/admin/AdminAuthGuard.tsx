'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { adminApi } from '@/lib/api';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // If on login page, skip guard
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('advocate_admin_token') : null;

    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Verify session with Express backend
    adminApi
      .getMe(token)
      .then((data) => {
        if (data && data.user) {
          setAuthorized(true);
        } else {
          localStorage.removeItem('advocate_admin_token');
          router.push('/admin/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('advocate_admin_token');
        router.push('/admin/login');
      });
  }, [pathname, router]);

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-brass border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-brass font-bold">
            Verifying Administrative Session...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
