'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Lock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Project, ProjectCategory } from '@/data/projects'
import { localized } from '@/lib/project-i18n'
import { CASES } from '@/data/cases'

/** Selo de categoria: cor suave por tipo, sem caixa alta. */
export const CATEGORY_STYLE: Record<ProjectCategory, string> = {
  automation: 'bg-sign-soft text-sign',
  fullstack: 'bg-paper text-ink',
  frontend: 'bg-paper text-steel',
  backend: 'bg-white text-ink ring-1 ring-inset ring-line',
}

export function CategoryTag({ category, className = '' }: { category: ProjectCategory; className?: string }) {
  const { t } = useLanguage()
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[13px] font-semibold ${CATEGORY_STYLE[category]} ${className}`}>
      {t(`projects.${category}`)}
    </span>
  )
}

export function ProjectLinks({ project }: { project: Project }) {
  const { t } = useLanguage()
  const caseStudy = CASES.find((c) => c.projectTitle === project.title)
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {caseStudy && (
        <Link
          href={`/projetos/${caseStudy.slug}`}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[16px] font-semibold text-sign hover:text-route-deep"
        >
          {t('cases.read')}
        </Link>
      )}
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[16px] font-semibold text-ink hover:text-sign"
        >
          {t('projects.code')}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      ) : (
        <span className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] text-steel">
          <Lock className="h-4 w-4" aria-hidden />
          {t('projects.private')}
        </span>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-sign px-4 text-[16px] font-semibold text-white hover:bg-route-deep"
        >
          {t('projects.demo')}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      )}
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  layout?: 'wide' | 'plate'
  priority?: boolean
  /** nível do título: h3 dentro da seção da home, h2 na página /projetos */
  headingLevel?: 2 | 3
}

export default function ProjectCard({ project, layout = 'plate', priority = false, headingLevel = 3 }: ProjectCardProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const { t, language } = useLanguage()
  const L = localized(project, language)
  const wide = layout === 'wide'

  const gain = L.impact && (
    <p className="rounded-xl bg-sign-soft px-4 py-3">
      <span className="block text-[1.2rem] font-bold leading-snug text-ink">{L.impact}</span>
      <span className="mt-0.5 block text-[13px] font-semibold text-sign">{t('projects.measured')}</span>
    </p>
  )

  const stack = (
    <ul className="flex flex-wrap gap-2" aria-label="Stack">
      {project.technologies.map((tech) => (
        <li key={tech} className="rounded-full bg-paper px-2.5 py-1 text-[13px] font-medium text-ink">
          {tech}
        </li>
      ))}
    </ul>
  )

  return (
    <article className="plate group flex h-full flex-col overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1">
      {project.previewImage && (
        <div className="border-b border-line bg-paper">
          {/* no card largo o print é recortado por cima: a metade de baixo dos prints de app costuma ser vazia */}
          <div className={`relative w-full ${wide ? 'aspect-video lg:aspect-[21/8]' : 'aspect-video'}`}>
            <Image
              src={project.previewImage}
              alt={`${t('projects.previewAlt')}: ${L.title}`}
              fill
              priority={priority}
              sizes={wide ? '(min-width: 1024px) 1200px, 100vw' : '(min-width: 1024px) 560px, 100vw'}
              className="object-cover object-top"
            />
          </div>
        </div>
      )}

      {wide ? (
        <div className="grid flex-1 gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <CategoryTag category={project.category} />
            <Heading className="mt-3 text-[2rem] font-extrabold text-ink sm:text-[2.4rem]">{L.title}</Heading>
            <p className="mt-3 max-w-[62ch] text-[1.05rem] leading-relaxed text-steel">{L.description}</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-5">
            {gain}
            {stack}
            <div className="mt-auto pt-1">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
          <div>
            <CategoryTag category={project.category} />
            <Heading className="mt-3 text-[1.6rem] font-extrabold leading-tight text-ink">{L.title}</Heading>
          </div>
          <p className="max-w-[60ch] text-[1rem] leading-relaxed text-steel">{L.description}</p>
          {gain}
          {stack}
          <div className="mt-auto pt-1">
            <ProjectLinks project={project} />
          </div>
        </div>
      )}
    </article>
  )
}
