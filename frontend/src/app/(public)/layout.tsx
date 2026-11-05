import React from 'react';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { EntryFlowModal } from '@/components/public/EntryFlowModal';
import { FloatingWhatsApp } from '@/components/public/FloatingWhatsApp';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bone dark:bg-[#0b0f17] text-charcoal dark:text-[#f3efe6] relative transition-colors duration-200">
      <EntryFlowModal />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
