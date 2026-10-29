import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import SmoothScroll from "@/components/SmoothScroll";
import { OG_IMAGE } from "@/lib/seo";

// uma família só, para corpo e títulos: leitura limpa e um único arquivo de fonte
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://sthevandev.vercel.app";
const TITLE = "Virex · Sites, sistemas e apps · Sthevan Santos (ES)";
const DESCRIPTION =
  "Sites, sistemas e apps para negócios e projetos pessoais no Espírito Santo, e à distância para o Brasil e o exterior. Sthevan Santos, desenvolvedor fullstack.";

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | Sthevan Santos",
  },
  description: DESCRIPTION,
  authors: [{ name: "Sthevan Santos", url: SITE_URL }],
  creator: "Sthevan Santos",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/sthevan-perfil.jpg",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Sthevan Santos",
    images: [OG_IMAGE],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
    creator: "@SantosSthevan",
  },
  // código de verificação do Search Console (opcional, vem do ambiente)
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${manrope.variable} font-sans antialiased`}
      >
        {children}
        <SmoothScroll />
        <Analytics />
      </body>
    </html>
  );
}
