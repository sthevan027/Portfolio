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
    <section id="cases" aria-labelledby="cases-title" className="bg-paper pb-16 pt-4 sm:pb-24">
      <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
        <div className="grid gap-6 pb-8 lg:grid-cols-12 lg:items-end">
          <h2
            id="cases-title"
            className="font-display text-[clamp(3.2rem,9vw,5.6rem)] font-extrabold uppercase leading-[0.88] text-ink lg:col-span-5"
          >
            {t('cases.title')}
          </h2>
          <p className="max-w-[62ch] text-[1.125rem] leading-relaxed text-steel lg:col-span-7">{t('cases.lede')}</p>
        </div>

        <div role="group" aria-label={t('cases.filterLabel')} className="mb-10 flex flex-wrap gap-2">
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
                className={`min-h-[44px] rounded-[6px] border-2 px-4 font-display text-[16px] font-bold uppercase tracking-wide transition-colors ${
                  active ? 'border-sign bg-sign text-white' : 'border-ink bg-white text-ink hover:border-sign hover:text-sign'
                }`}
              >
                {t(`cases.filter.${f}`)}
              </button>
            )
          })}
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => {
            const isDemo = c.kind === 'demonstracao' && c.demoUrl
            const project = isDemo ? undefined : projects.find((p) => p.title === c.projectTitle)
            if (!isDemo && !project) return null

            return (
              <li key={c.slug}>
                <article className="frame group flex h-full flex-col overflow-hidden bg-white transition-transform duration-300 ease-out hover:-translate-y-1">
                  <div className={`${project ? CATEGORY_STYLE[project.category] : 'bg-ink text-white'} flex items-center justify-between gap-3 px-5 py-2.5`}>
                    <span className="font-display text-[15px] font-bold uppercase tracking-[0.12em]">
                      {project ? project.technologies.slice(0, 3).join(' · ') : t('cases.demoLabel')}
                    </span>
                    <span className="rounded-[4px] bg-white/15 px-2 py-0.5 font-display text-[12px] font-bold uppercase tracking-[0.12em]">
                      {t(`cases.kind.${c.kind}`)}
                    </span>
                  </div>
                  {project?.previewImage && (
                    <div className="relative aspect-video w-full border-y-[3px] border-ink bg-ink">
                      <Image
                        src={project.previewImage}
                        alt={`${t('projects.previewAlt')}: ${project.title}`}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                    <p className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-steel">
                      {t(`cases.client.${c.clientType}`)}
                    </p>
                    <h3 className="font-display text-[1.9rem] font-extrabold uppercase leading-[0.95] text-ink">{c.projectTitle}</h3>
                    <p className="text-[1.02rem] leading-snug text-steel" lang="pt-BR">{c.tagline}</p>
                    {c.result && (
                      <p className="rounded-[6px] bg-sign px-3 py-2 ring-2 ring-inset ring-ink">
                        <span className="block font-display text-[1.2rem] font-extrabold uppercase leading-tight text-white" lang="pt-BR">
                          {c.result}
                        </span>
                        <span className="mt-0.5 block font-display text-[12px] font-bold uppercase tracking-[0.14em] text-sign-ink">
                          {t('cases.measured')}
                        </span>
                      </p>
                    )}
                    {isDemo ? (
                      <a
                        href={c.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('case_demo_click', { case: c.slug })}
                        className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-1 font-display text-[17px] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
                      >
                        {t('cases.viewDemo')}
                        <ExternalLink className="h-4 w-4" aria-hidden />
                      </a>
                    ) : (
                      <Link
                        href={`/projetos/${c.slug}`}
                        className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-1 font-display text-[17px] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
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
              className="min-h-[44px] font-display text-[17px] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
            >
              {showAll ? t('cases.showLess') : t('cases.showAll')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
