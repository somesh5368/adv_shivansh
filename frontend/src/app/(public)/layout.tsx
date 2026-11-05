import React from 'react';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { MobileCallBar } from '@/components/public/MobileCallBar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />
      <main className="flex-grow pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}
