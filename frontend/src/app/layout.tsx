import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Justice Alliance Associates & Law Firm | Advocates & Legal Counsel',
    template: '%s | Justice Alliance Associates & Law Firm',
  },
  description:
    'Justice Alliance Associates & Law Firm is a premier multi-disciplinary law firm providing authoritative counsel and litigation across Civil, Criminal, Cyber, Family, and Taxation law.',
  keywords: [
    'Justice Alliance Associates',
    'Law Firm Gorakhpur',
    'Civil Lawyer',
    'Criminal Lawyer',
    'Cyber Crime Advocate',
    'Family Court Advocate',
    'Taxation and GST Advocate',
    'Advocate Shivansh',
    'Advocate Rahul Maurya',
    'Advocate Ratnakar Yadav',
  ],
  authors: [
    { name: 'Justice Alliance Associates & Law Firm' },
    { name: 'Adv. Shivansh' },
    { name: 'Adv. Rahul Maurya' },
    { name: 'Adv. Ratnakar Yadav' },
  ],
  metadataBase: new URL('https://adv-shivansh.vercel.app'),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Justice Alliance Associates & Law Firm | Premier Advocates & Legal Counsel',
    description:
      'Premier legal chamber handling Civil, Criminal, Cyber, Family, and Taxation litigation with strict adherence to the Bar Council of India standards.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Justice Alliance Associates & Law Firm',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-bone text-charcoal selection:bg-brass selection:text-charcoal-dark font-sans">
        {children}
      </body>
    </html>
  );
}
