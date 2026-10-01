import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

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
const TITLE = "Sthevan Santos — Desenvolvedor fullstack que veio da obra";
const DESCRIPTION =
  "Dev fullstack (React, TypeScript, Supabase) e automação em Python. Saí da obra automatizando relatórios, ARTs e medições — veja os 21 projetos e ganhos medidos.";

export const viewport: Viewport = {
  themeColor: "#F5C400",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s · Sthevan Santos",
  },
  description: DESCRIPTION,
  keywords: [
    "Sthevan Santos",
    "desenvolvedor fullstack",
    "desenvolvedor React",
    "TypeScript",
    "Supabase",
    "Next.js",
    "automação Python",
    "automação de engenharia",
    "dev Espírito Santo",
    "Virex",
  ],
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
    apple: "/sthevan.jpg",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Sthevan Santos",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sthevan Santos — desenvolvedor fullstack que veio da obra",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
    creator: "@SantosSthevan",
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
};

const DIRECTION_CONTRACT = `<!--
THESIS: O portfólio como a sinalização de uma obra: cada projeto é uma placa, cada ganho medido é um contador. Recusa o hero escuro com acento neon e grade de cards iguais.
OWN-WORLD: amarelo segurança em campo cheio, preto de placa, branco esmaltado; placas com borda interna e parafusos; faixa zebrada nas divisas; Barlow Condensed em caixa alta; verde de rota só para ação; azul informativo nas placas de categoria.
STORY: o visitante entende em segundos que é um dev fullstack que veio da obra, vê ganhos medidos e projetos funcionando, e chama no WhatsApp ou baixa o currículo.
FIRST VIEWPORT: placa amarela de ponta a ponta; nome gigante condensado à esquerda, foto emoldurada como placa à direita; linha "fullstack que veio da obra"; ações Ver projetos / WhatsApp / Currículo; faixa zebrada fecha a dobra e o quadro de resultados vira os dígitos logo abaixo.
FORM: sinalização de canteiro, 5ª da lista ordenada, seed 212ab402.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sthevan Santos",
  alternateName: "Sthevan das Virgens dos Santos",
  jobTitle: "Desenvolvedor Fullstack",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/sthevan.jpg`,
  email: "mailto:sthevan.ssantos@gmail.com",
  telephone: "+55-27-98877-2784",
  address: {
    "@type": "PostalAddress",
    addressRegion: "ES",
    addressCountry: "BR",
  },
  worksFor: { "@type": "Organization", name: "Virex" },
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "Supabase",
    "PostgreSQL",
    "Node.js",
    "Python",
    "OCR",
    "Automação de processos",
  ],
  sameAs: [
    "https://www.linkedin.com/in/sthevanssantos",
    "https://github.com/sthevan027",
    "https://instagram.com/sthevan.dev",
    "https://x.com/SantosSthevan",
  ],
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
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
