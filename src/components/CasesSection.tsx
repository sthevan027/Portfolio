'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { CASES, type ClientType } from '@/data/cases'
import { projects } from '@/data/projects'
import { CATEGORY_STYLE } from '@/components/ProjectCard'
import { trackEvent } from '@/lib/analytics'

type Filter = 'todos' | ClientType

const FILTERS: Filter[] = ['todos', 'pessoa-fisica', 'pequeno-negocio', 'empresa']

/** Casos da landing, com filtro por tipo de cliente. Demonstrações linkam para o site, sem página própria. */
export default function CasesSection() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<Filter>('todos')
  const [showAll, setShowAll] = useState(false)

  const matching = CASES.filter((c) => filter === 'todos' || c.clientType === filter)
  // home mostra três casos em destaque; o restante abre com "ver todos"
  const visible = showAll ? matching : matching.slice(0, 3)

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
                onClick={() => {
                  setFilter(f)
                  setShowAll(false)
                }}
                className={`min-h-[44px] rounded-full border px-4 text-[15px] font-semibold transition-colors ${
                  active ? 'border-sign bg-sign text-white' : 'border-line bg-white text-ink hover:border-sign hover:text-sign'
                }`}
              >
                {t(`cases.filter.${f}`)}
              </button>
            )
          })}
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => {
            const isDemo = c.kind === 'demonstracao' && c.demoUrl
            const project = isDemo ? undefined : projects.find((p) => p.title === c.projectTitle)
            if (!isDemo && !project) return null

            return (
              <li key={c.slug}>
                <article className="plate group flex h-full flex-col overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1">
                  {project?.previewImage ? (
                    <div className="relative aspect-video w-full border-b border-line bg-paper">
                      <Image
                        src={project.previewImage}
                        alt={`${t('projects.previewAlt')}: ${project.title}`}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-video items-end border-b border-line bg-sign-soft p-5">
                      <span className="text-[13px] font-semibold text-sign">{t('cases.demoLabel')}</span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-paper px-2.5 py-1 text-[12.5px] font-semibold text-steel">
                        {t(`cases.client.${c.clientType}`)}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[12.5px] font-semibold ${
                          c.kind === 'demonstracao' ? 'bg-sign-soft text-sign' : 'bg-paper text-ink'
                        }`}
                      >
                        {t(`cases.kind.${c.kind}`)}
                      </span>
                    </div>
                    <h3 className="text-[1.4rem] font-bold leading-tight text-ink">{c.projectTitle}</h3>
                    <p className="text-[1rem] leading-relaxed text-steel" lang="pt-BR">{c.tagline}</p>

                    {c.result && (
                      <p className="rounded-xl bg-sign-soft px-4 py-3">
                        <span className="block text-[1.1rem] font-bold leading-snug text-ink" lang="pt-BR">
                          {c.result}
                        </span>
                        <span className="mt-0.5 block text-[13px] font-semibold text-sign">{t('cases.measured')}</span>
                      </p>
                    )}

                    {isDemo ? (
                      <a
                        href={c.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('case_demo_click', { case: c.slug })}
                        className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 self-start pt-1 text-[16px] font-semibold text-sign hover:text-route-deep"
                      >
                        {t('cases.viewDemo')}
                        <ExternalLink className="h-4 w-4" aria-hidden />
                      </a>
                    ) : (
                      <Link
                        href={`/projetos/${c.slug}`}
                        className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 self-start pt-1 text-[16px] font-semibold text-sign hover:text-route-deep"
                      >
                        {t('cases.read')}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        {matching.length > 3 && (
          <div className="mt-10 flex justify-start">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="min-h-[44px] rounded-xl border border-line bg-white px-5 text-[16px] font-semibold text-ink hover:border-sign hover:text-sign"
            >
              {showAll ? t('cases.showLess') : t('cases.showAll')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
