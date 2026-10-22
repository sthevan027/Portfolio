import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { OG_IMAGE } from "@/lib/seo";

const barlow = Barlow({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  // corpo: sem troca de fonte depois da pintura (a troca virava o LCP no celular);
  // o fallback do next/font já tem as métricas ajustadas à Barlow
  display: "optional",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const SITE_URL = "https://sthevandev.vercel.app";
const TITLE = "Sistemas e automação de processos para empresas | Sthevan Santos";
const DESCRIPTION =
  "Sistemas sob medida, automação de planilhas, relatórios e documentos e melhoria de sistemas web para empresas. Sthevan Santos, desenvolvedor no Espírito Santo.";

export const viewport: Viewport = {
  themeColor: "#F5C400",
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
        className={`${barlow.variable} ${barlowCondensed.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
