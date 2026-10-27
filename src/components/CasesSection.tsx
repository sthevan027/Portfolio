'use client'

import { useState } from 'react'
import ElegantCarousel, { type CarouselSlide } from '@/components/ui/elegant-carousel'
import { useLanguage } from '@/contexts/LanguageContext'
import { CASES, type ClientType } from '@/data/cases'
import { projects } from '@/data/projects'

type Filter = 'todos' | ClientType

const FILTERS: Filter[] = ['todos', 'pessoa-fisica', 'pequeno-negocio', 'empresa']

/**
 * Cor de cada caso tirada da própria imagem (cor dominante amostrada das
 * capturas). Mantém o destaque do carrossel igual ao que se vê no print.
 */
const ACCENT_FROM_IMAGE: Record<string, string> = {
  'restaurante-vo-zilda': '#5B4B28',
  'gerador-de-relatorio': '#8EB0EE',
  'gerador-de-art': '#2B7B4D',
  'analise-de-medicao': '#62B9FA',
  'painel-gerencial': '#88ACDD',
  dashboardcusto: '#3B83F8',
  laudofacil: '#007595',
  meusalario: '#12BA9C',
}

/** Casos da landing em slideshow, com filtro por tipo de cliente. */
export default function CasesSection() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<Filter>('todos')

  const matching = CASES.filter((c) => filter === 'todos' || c.clientType === filter)

  const slides: CarouselSlide[] = matching.map((c) => {
    const isDemo = c.kind === 'demonstracao' && !!c.demoUrl
    const project = isDemo ? undefined : projects.find((p) => p.title === c.projectTitle)
    return {
      title: c.projectTitle,
      subtitle: `${t(`cases.client.${c.clientType}`)} · ${t(`cases.kind.${c.kind}`)}`,
      description: c.summary,
      accent: ACCENT_FROM_IMAGE[c.slug] ?? '#2563EB',
      imageUrl: project?.previewImage ?? c.image ?? '',
      href: isDemo ? c.demoUrl : `/projetos/${c.slug}`,
      hrefLabel: isDemo ? t('cases.viewDemo') : t('cases.read'),
      external: isDemo,
      result: c.result,
    }
  })

  return (
    <section id="cases" aria-labelledby="cases-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t('cases.eyebrow')}</p>
          <h2 id="cases-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('cases.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('cases.lede')}</p>
        </div>

        <div role="group" aria-label={t('cases.filterLabel')} className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={`min-h-[44px] rounded-full border px-4 text-[15px] font-semibold transition-colors ${
                  active ? 'border-sign bg-sign text-white' : 'border-line bg-white text-ink hover:border-sign hover:text-sign'
                }`}
              >
                {t(`cases.filter.${f}`)}
              </button>
            )
          })}
        </div>

        <div className="mt-10">
          {/* key por filtro: ao trocar de filtro o carrossel volta ao primeiro caso */}
          <ElegantCarousel
            key={filter}
            slides={slides}
            labels={{
              prev: t('cases.prev'),
              next: t('cases.next'),
              goTo: t('projects.goTo'),
              resultLabel: t('cases.measured'),
            }}
          />
        </div>
      </div>
    </section>
  )
}
