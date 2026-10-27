'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { CASES, type ClientType, type CaseStudy } from '@/data/cases'
import { projects } from '@/data/projects'
import { trackEvent } from '@/lib/analytics'

type Filter = 'todos' | ClientType

const FILTERS: Filter[] = ['todos', 'pessoa-fisica', 'pequeno-negocio', 'empresa']

/**
 * Casos em slideshow: texto à esquerda (contador, título, resultado, ação) e a
 * imagem do projeto à direita. Demonstrações não têm página própria: o botão
 * abre o site de demonstração.
 */
export default function CasesSection() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<Filter>('todos')
  const [index, setIndex] = useState(0)

  const matching = CASES.filter((c) => filter === 'todos' || c.clientType === filter)
  const total = matching.length
  const current: CaseStudy | undefined = matching[Math.min(index, total - 1)]

  // volta ao primeiro caso sempre que o filtro muda
  useEffect(() => setIndex(0), [filter])

  const go = (next: number) => setIndex(Math.max(0, Math.min(total - 1, next)))
  const pad = (n: number) => String(n).padStart(2, '0')

  if (!current) return null

  const isDemo = current.kind === 'demonstracao' && !!current.demoUrl
  const project = isDemo ? undefined : projects.find((p) => p.title === current.projectTitle)

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

        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label={t('cases.slideLabel')}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') go(index - 1)
            if (e.key === 'ArrowRight') go(index + 1)
          }}
          className="plate mt-10 grid overflow-hidden lg:grid-cols-2"
        >
          <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
            <div>
              <div className="flex items-center gap-3 text-[14px] font-semibold text-steel" aria-live="polite">
                <span className="h-px w-10 bg-steel/40" aria-hidden />
                <span className="tabular text-sign">
                  {pad(index + 1)} / {pad(total)}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-paper px-2.5 py-1 text-[12.5px] font-semibold text-steel">
                  {t(`cases.client.${current.clientType}`)}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[12.5px] font-semibold ${
                    current.kind === 'demonstracao' ? 'bg-sign-soft text-sign' : 'bg-paper text-ink'
                  }`}
                >
                  {t(`cases.kind.${current.kind}`)}
                </span>
              </div>

              <h3 className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-tight tracking-tight text-ink">
                {current.projectTitle}
              </h3>
              <p className="mt-2 text-[1.05rem] font-medium text-sign" lang="pt-BR">
                {current.tagline}
              </p>
              <p className="mt-4 max-w-[52ch] text-[1.02rem] leading-relaxed text-steel">{current.summary}</p>

              {current.result && (
                <p className="mt-6 inline-block rounded-xl bg-sign-soft px-4 py-3">
                  <span className="block text-[1.1rem] font-bold leading-snug text-ink" lang="pt-BR">
                    {current.result}
                  </span>
                  <span className="mt-0.5 block text-[13px] font-semibold text-sign">{t('cases.measured')}</span>
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  disabled={index === 0}
                  aria-label={t('cases.prev')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-sign hover:text-sign disabled:opacity-40"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  disabled={index >= total - 1}
                  aria-label={t('cases.next')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-sign hover:text-sign disabled:opacity-40"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>

              {isDemo ? (
                <a
                  href={current.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('case_demo_click', { case: current.slug })}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-sign px-5 text-[16px] font-semibold text-white hover:bg-route-deep"
                >
                  {t('cases.viewDemo')}
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              ) : (
                <Link
                  href={`/projetos/${current.slug}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-sign px-5 text-[16px] font-semibold text-white hover:bg-route-deep"
                >
                  {t('cases.read')}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </div>
          </div>

          <div className="relative min-h-[320px] border-t border-line bg-paper lg:border-l lg:border-t-0">
            {project?.previewImage ? (
              <Image
                key={current.slug}
                src={project.previewImage}
                alt={`${t('projects.previewAlt')}: ${project.title}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center p-10 text-center">
                <p className="text-[1.1rem] font-semibold text-sign">{t('cases.demoLabel')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
