import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Projetos',
  description:
    'Os 21 projetos de Sthevan Santos: sistemas fullstack em React, TypeScript e Supabase e automações em Python para engenharia — com prints e stack de cada um.',
  alternates: { canonical: '/projetos' },
  openGraph: {
    title: 'Projetos · Sthevan Santos',
    description: 'Sistemas fullstack e automações para engenharia — 21 projetos com prints e stack.',
    url: '/projetos',
  },
}

/** Lista de projetos como dados estruturados (ItemList de SoftwareSourceCode). */
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Projetos de Sthevan Santos',
  numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareSourceCode',
      name: p.title,
      description: p.description,
      programmingLanguage: p.technologies,
      author: { '@type': 'Person', name: 'Sthevan Santos', url: SITE.url },
      ...(p.github ? { codeRepository: p.github } : {}),
      ...(p.previewImage ? { image: `${SITE.url}${p.previewImage}` } : {}),
    },
  })),
}

export default function ProjetosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      {children}
    </>
  )
}
