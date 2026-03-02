import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBadge from '@/components/CosmicBadge';
import { getSiteSettings } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'My Organization',
  description: 'Making a difference in our community through programs, events, and dedicated people.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const orgName = settings?.metadata?.organization_name || 'My Organization';
  const logoUrl = settings?.metadata?.logo?.imgix_url;
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <Header organizationName={orgName} logoUrl={logoUrl} />
        <main className="flex-1">{children}</main>
        <Footer organizationName={orgName} />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}