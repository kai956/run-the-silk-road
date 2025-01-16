import type { Metadata, Viewport } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { LanguageProvider } from './context/LanguageContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://silkroadmarathon.com'
  ),
  title: "Run The Silk Road - Marathon Series",
  description: "Experience historic routes through breathtaking landscapes across Asia",
  keywords: "marathon, silk road, running, trail running, Asia, sports events",
  openGraph: {
    title: "Run The Silk Road - Marathon Series",
    description: "Experience historic routes through breathtaking landscapes across Asia",
    images: ['/images/og-image.jpg'],
    type: 'website',
    siteName: 'Silk Road Marathon Series',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Run The Silk Road - Marathon Series",
    description: "Experience historic routes through breathtaking landscapes across Asia",
    images: ['/images/og-image.jpg'],
  },
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
    <html lang="en" className={GeistSans.className}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
} 