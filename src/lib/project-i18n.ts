import type { Project } from '@/data/projects'
import type { Language } from '@/lib/i18n'

/** Título, descrição e ganho no idioma do visitante (cai no português quando falta tradução). */
export function localized(p: Project, lang: Language) {
  if (lang !== 'en') return { title: p.title, description: p.description, impact: p.impact }
  return {
    title: p.titleEn ?? p.title,
    description: p.descriptionEn ?? p.description,
    impact: p.impactEn ?? p.impact,
  }
}
