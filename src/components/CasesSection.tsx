'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { CASES } from '@/data/cases'
import { projects } from '@/data/projects'
import { CATEGORY_STYLE } from '@/components/ProjectCard'

/** Seis projetos com problema/solução em uma página própria cada (/projetos/[slug]). Texto dos casos em português. */
export default function CasesSection() {
  const { t } = useLanguage()

  return (
    <section id="cases" aria-labelledby="cases-title" className="bg-paper pb-16 pt-4 sm:pb-24">
      <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
        <div className="grid gap-6 pb-10 lg:grid-cols-12 lg:items-end">
          <h2
            id="cases-title"
            className="font-display text-[clamp(3.2rem,9vw,5.6rem)] font-extrabold uppercase leading-[0.88] text-ink lg:col-span-5"
          >
            {t('cases.title')}
          </h2>
          <p className="max-w-[62ch] text-[1.125rem] leading-relaxed text-steel lg:col-span-7">{t('cases.lede')}</p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => {
            const project = projects.find((p) => p.title === c.projectTitle)
            if (!project) return null
            return (
              <li key={c.slug}>
                <article className="frame group flex h-full flex-col overflow-hidden bg-white transition-transform duration-300 ease-out hover:-translate-y-1">
                  <div className={`${CATEGORY_STYLE[project.category]} px-5 py-2.5`}>
                    <span className="font-display text-[15px] font-bold uppercase tracking-[0.12em]">
                      {project.technologies.slice(0, 3).join(' · ')}
                    </span>
                  </div>
                  {project.previewImage && (
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
                    <h3 className="font-display text-[1.9rem] font-extrabold uppercase leading-[0.95] text-ink">{c.projectTitle}</h3>
                    <p className="text-[1.02rem] leading-snug text-steel" lang="pt-BR">{c.tagline}</p>
                    {c.result && (
                      <p className="rounded-[6px] bg-sign px-3 py-2 ring-2 ring-inset ring-ink">
                        <span className="block font-display text-[1.2rem] font-extrabold uppercase leading-tight text-ink" lang="pt-BR">
                          {c.result}
                        </span>
                        <span className="mt-0.5 block font-display text-[12px] font-bold uppercase tracking-[0.14em] text-sign-ink">
                          {t('cases.measured')}
                        </span>
                      </p>
                    )}
                    <Link
                      href={`/projetos/${c.slug}`}
                      className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-1 font-display text-[17px] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
                    >
                      {t('cases.read')}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
