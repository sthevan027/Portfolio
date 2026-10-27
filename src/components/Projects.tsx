'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Projects() {
  const { t } = useLanguage()

  // destaques primeiro; o restante segue a ordem do sync
  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured))

  return (
    <section id="projects" aria-labelledby="projects-title" className="overflow-hidden bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t('projects.eyebrow')}</p>
          <h2 id="projects-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('projects.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('projects.lede')}</p>
        </div>

        <div className="mt-12">
          <ProjectsCarousel items={ordered} />
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outlineSign" size="lg">
            <Link href="/projetos">
              {t('projects.viewAll')}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
