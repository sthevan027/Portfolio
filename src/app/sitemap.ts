import type { MetadataRoute } from 'next'
import { CASES } from '@/data/cases'
import { CONTENT_UPDATED, SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED)
  return [
    { url: SITE.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/servicos`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...CASES.map((c) => ({
      url: `${SITE.url}/projetos/${c.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
