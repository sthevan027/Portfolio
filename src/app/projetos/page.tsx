import ProjetosList from '@/components/ProjetosList'
import { projects } from '@/data/projects'
import { SITE } from '@/lib/site'
import { jsonLdScript, pageMetadata, PERSON_ID } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Projetos de sistemas e automação',
  description:
    'Sistemas, dashboards e automações desenvolvidos por Sthevan Santos com React, TypeScript, Supabase e Python, com a stack de cada projeto e estudos de caso.',
  path: '/projetos',
})

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
      author: { '@id': PERSON_ID },
      ...(p.github ? { codeRepository: p.github } : {}),
      ...(p.previewImage ? { image: `${SITE.url}${p.previewImage}` } : {}),
    },
  })),
}

export default function ProjetosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(itemList)} />
      <ProjetosList />
    </>
  )
}
