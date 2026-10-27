'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import { CategoryTag, ProjectLinks } from '@/components/ProjectCard'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { localized } from '@/lib/project-i18n'

const OTHERS_ON_HOME = 8

export default function Projects() {
  const { t, language } = useLanguage()

  // os projetos com estudo de caso aparecem na seção Casos
  const others = projects.filter((p) => !p.featured).slice(0, OTHERS_ON_HOME)

  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t('projects.eyebrow')}</p>
          <h2 id="projects-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('projects.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('projects.lede')}</p>
        </div>

        {others.length > 0 && (
          <ul className="plate mt-12 divide-y divide-line">
            {others.map((p) => (
              <li
                key={p.id}
                className="grid gap-3 p-6 transition-colors hover:bg-paper sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:p-7"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[1.25rem] font-bold text-ink">{localized(p, language).title}</h3>
                    <CategoryTag category={p.category} />
                  </div>
                  <p className="mt-1.5 max-w-[70ch] text-[15px] leading-relaxed text-steel">{localized(p, language).description}</p>
                  <p className="mt-1.5 text-[14px] font-medium text-ink/70">{p.technologies.join(' · ')}</p>
                </div>
                <ProjectLinks project={p} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex justify-start">
          <Button asChild variant="outlineSign" size="lg">
            <Link href="/projetos">
              {t('projects.viewAll').replace('21', String(projects.length))}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
