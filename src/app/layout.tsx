import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Mohd Afsar — AI & Full Stack Engineer | IIT Madras',
  description:
    'AI-native portfolio for Mohd Afsar. IIT Madras Data Science undergraduate, Full Stack Developer Intern at SGBC IIT Madras, and ISRO SIH Browser Agent Lead.',
  keywords: [
    'Mohd Afsar',
    'Afsar AI',
    'IIT Madras',
    'RedactVision Agent',
    'Stroke2D',
    'SGBC',
    'Browser Agents',
    'Full Stack Engineer',
    'Data Science',
    'Machine Learning',
  ],
  authors: [{ name: 'Mohd Afsar', url: 'https://github.com/AfsarAI' }],
  creator: 'Mohd Afsar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Mohd Afsar — AI & Full Stack Engineer',
    description:
      'Grounded AI-native interactive portfolio of Mohd Afsar. Explore projects, research, and experience with AI assistance.',
    siteName: 'Mohd Afsar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohd Afsar — AI & Full Stack Engineer',
    description:
      'Grounded AI-native interactive portfolio of Mohd Afsar. Explore projects, research, and experience with AI assistance.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohd Afsar',
    alternateName: 'Afsar',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    jobTitle: 'AI & Full Stack Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Sudha Gopalakrishnan Brain Centre (SGBC), IIT Madras',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indian Institute of Technology Madras (IIT Madras)',
    },
    sameAs: [
      'https://github.com/AfsarAI',
      'https://leetcode.com/u/AfsarAI',
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent/25 selection:text-accent-light">
        {children}
      </body>
    </html>
  );
}
