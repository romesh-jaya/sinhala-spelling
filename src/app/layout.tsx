import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sinhala Spelling Game | Learn to Spell in Sinhala",
  description: "Free interactive Sinhala spelling game for kids. Learn basic Sinhala letters and words through fun, gamified lessons. Perfect for beginners of all ages.",
  keywords: "Sinhala spelling game, learn Sinhala, Sinhala letters, educational game for kids, Sinhala language learning",
  metadataBase: new URL('https://sinhala-spelling.web.app'),
  alternates: {
    canonical: 'https://sinhala-spelling.web.app',
  },
  openGraph: {
    title: "Sinhala Spelling Game | Learn to Spell in Sinhala",
    description: "Free interactive Sinhala spelling game for kids. Learn basic Sinhala letters and words through fun, gamified lessons.",
    url: 'https://sinhala-spelling.web.app',
    siteName: 'Sinhala Spelling Game',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sinhala Spelling Game",
    description: "Free interactive Sinhala spelling game for kids",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-google-analytics-opt-out="">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
