import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Shivansh Kumar Pandey | Advocate • Civil Court, Gorakhpur',
    template: '%s | Adv. Shivansh Kumar Pandey',
  },
  description:
    'Advocate Shivansh Kumar Pandey offers dedicated legal counsel and representation in Civil Litigation, Family Law, Taxation & GST, Business Registrations, Labour Welfare, and Intellectual Property at the Civil Court, Gorakhpur, Uttar Pradesh.',
  keywords: [
    'Shivansh Kumar Pandey',
    'Advocate Gorakhpur',
    'Civil Lawyer Gorakhpur',
    'Taxation Lawyer Gorakhpur',
    'GST Advocate UP',
    'Family Court Advocate Gorakhpur',
    'Civil Court Gorakhpur',
  ],
  authors: [{ name: 'Shivansh Kumar Pandey' }],
  metadataBase: new URL('https://advshivpandey.in'),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-ivory text-charcoal">
        {children}
      </body>
    </html>
  );
}

