import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sthevan Santos - Frontend Developer & CEO da Virex",
  description:
    "Portfólio de Sthevan Santos - Especialista em React, Next.js e automações. CEO da Virex. Transformando ideias em soluções digitais inovadoras.",
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
    "Web Development",
  ],
  authors: [{ name: "Sthevan Santos" }],
  creator: "Sthevan Santos",
  publisher: "Virex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sthevan-santos.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/sthevan.jpg",
  },
  openGraph: {
    title: "Sthevan Santos - Frontend Developer & CEO da Virex",
    description:
      "Especialista em React, Next.js e automações. Transformando ideias em soluções digitais inovadoras.",
    url: "https://sthevan-santos.vercel.app",
    siteName: "Sthevan Santos Portfolio",
    images: [
      {
        url: "/sthevan.jpg",
        width: 1200,
        height: 630,
        alt: "Sthevan Santos - Frontend Developer",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sthevan Santos - Frontend Developer & CEO da Virex",
    description:
      "Especialista em React, Next.js e automações. Transformando ideias em soluções digitais inovadoras.",
    images: ["/sthevan.jpg"],
    creator: "@sthevan_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sthevan Santos",
              jobTitle: "Frontend Developer & CEO",
              worksFor: {
                "@type": "Organization",
                name: "Virex",
              },
              description: "Especialista em React, Next.js e automações",
              url: "https://sthevan-santos.vercel.app",
              sameAs: [
                "https://linkedin.com/in/sthevan-santos",
                "https://github.com/sthevan-santos",
                "https://instagram.com/sthevan.dev",
              ],
              image: "/sthevan.jpg",
              email: "sthevan@virex.com.br",
              telephone: "+55-27-98877-2784",
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
