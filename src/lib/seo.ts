import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const OG_IMAGE = {
  url: '/og-perfil.png',
  width: 1200,
  height: 630,
  alt: 'Sthevan Santos — desenvolvimento de sistemas e automação de processos para empresas',
}

/**
 * Metadados completos de uma página. O Next não mescla `openGraph` do layout com o
 * da página (a página substitui o objeto inteiro), então cada rota repete imagem,
 * siteName, locale e type por aqui.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string
  description: string
  path: string
  noindex?: boolean
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: path,
      siteName: SITE.name,
      images: [OG_IMAGE],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

export const PERSON_ID = `${SITE.url}/#person`
export const SERVICE_ID = `${SITE.url}/#service`

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE.name,
  alternateName: 'Sthevan das Virgens dos Santos',
  jobTitle: 'Desenvolvedor Fullstack',
  description:
    'Desenvolvedor fullstack que cria sistemas sob medida e automações de processos para empresas.',
  url: SITE.url,
  image: `${SITE.url}/sthevan-perfil.jpg`,
  email: `mailto:${SITE.email}`,
  telephone: '+55-27-98877-2784',
  address: { '@type': 'PostalAddress', addressRegion: 'ES', addressCountry: 'BR' },
  worksFor: { '@type': 'Organization', name: SITE.brand },
  knowsAbout: [
    'Desenvolvimento de sistemas web',
    'Automação de processos',
    'React',
    'TypeScript',
    'Next.js',
    'Python',
    'Node.js',
    'PostgreSQL',
    'Supabase',
    'OCR',
  ],
  sameAs: [SITE.linkedin, SITE.github, SITE.instagram, 'https://x.com/SantosSthevan'],
}

/** Sem endereço comercial, preço ou avaliação: só o que o site afirma. */
export const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': SERVICE_ID,
  name: `${SITE.brand} — desenvolvimento de sistemas e automação (${SITE.name})`,
  url: SITE.url,
  image: `${SITE.url}/sthevan-perfil.jpg`,
  founder: { '@id': PERSON_ID },
  areaServed: { '@type': 'AdministrativeArea', name: 'Espírito Santo, Brasil' },
  availableLanguage: ['pt-BR', 'en'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sistemas personalizados' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automação de processos' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Modernização e melhoria de sistemas' } },
    ],
  },
}

export function jsonLdScript(data: unknown) {
  // evita fechar a tag <script> se algum texto tiver "<"
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') }
}
