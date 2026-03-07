import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sthevan Santos - Frontend Developer & CEO da Virex",
  description: "Portfólio de Sthevan Santos - Especialista em React, Next.js e automações. CEO da Virex. Transformando ideias em soluções digitais inovadoras.",
  keywords: [
    "Sthevan Santos",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Virex",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Desenvolvedor Frontend",
    "Portfólio",
    "Automação",
    "Web Development"
  ],
  authors: [{ name: "Sthevan Santos" }],
  creator: "Sthevan Santos",
  publisher: "Virex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sthevan-santos.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Sthevan Santos - Frontend Developer & CEO da Virex",
    description: "Especialista em React, Next.js e automações. Transformando ideias em soluções digitais inovadoras.",
    url: 'https://sthevan-santos.vercel.app',
    siteName: 'Sthevan Santos Portfolio',
    images: [
      {
        url: '/sthevan.jpg',
        width: 1200,
        height: 630,
        alt: 'Sthevan Santos - Frontend Developer',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sthevan Santos - Frontend Developer & CEO da Virex",
    description: "Especialista em React, Next.js e automações. Transformando ideias em soluções digitais inovadoras.",
    images: ['/sthevan.jpg'],
    creator: '@sthevan_dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Adicione seu código de verificação
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563EB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Sthevan Santos",
              "jobTitle": "Frontend Developer & CEO",
              "worksFor": {
                "@type": "Organization",
                "name": "Virex"
              },
              "description": "Especialista em React, Next.js e automações",
              "url": "https://sthevan-santos.vercel.app",
              "sameAs": [
                "https://linkedin.com/in/sthevan-santos",
                "https://github.com/sthevan-santos",
                "https://instagram.com/sthevan.dev"
              ],
              "image": "/sthevan.jpg",
              "email": "sthevan@virex.com.br",
              "telephone": "+55-27-98877-2784"
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
