'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Lock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Project, ProjectCategory } from '@/data/projects'
import { localized } from '@/lib/project-i18n'
import { CASES } from '@/data/cases'

/** Cabeçalho de placa por categoria — a cor diz o tipo, como na sinalização. */
export const CATEGORY_STYLE: Record<ProjectCategory, string> = {
  automation: 'bg-sign text-white',
  fullstack: 'bg-info text-white',
  frontend: 'bg-ink text-sign',
  backend: 'bg-white text-ink',
}

export function CategoryTag({ category, className = '' }: { category: ProjectCategory; className?: string }) {
  const { t } = useLanguage()
  return (
    <span
      className={`inline-flex items-center rounded-[4px] px-2 py-0.5 font-display text-[13px] font-bold uppercase tracking-wider ring-2 ring-inset ring-ink ${CATEGORY_STYLE[category]} ${className}`}
    >
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
          className="inline-flex min-h-[44px] items-center gap-1.5 font-display text-[17px] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
        >
          {t('cases.read')}
        </Link>
      )}
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 font-display text-[17px] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route"
        >
          {t('projects.code')}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      ) : (
        <span className="inline-flex min-h-[44px] items-center gap-1.5 font-display text-[15px] font-bold uppercase tracking-wide text-steel">
          <Lock className="h-4 w-4" aria-hidden />
          {t('projects.private')}
        </span>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[6px] bg-route px-3 font-display text-[17px] font-bold uppercase tracking-wide text-white hover:bg-route-deep"
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
    <p className="rounded-[6px] bg-sign px-4 py-3 ring-2 ring-inset ring-ink">
      <span className="block font-display text-[1.45rem] font-extrabold uppercase leading-tight text-ink">
        {L.impact}
      </span>
      <span className="mt-1 block font-display text-[13px] font-bold uppercase tracking-[0.14em] text-sign-ink">
        {t('projects.measured')}
      </span>
    </p>
  )

  const stack = (
    <ul className="flex flex-wrap gap-2" aria-label="Stack">
      {project.technologies.map((tech) => (
        <li key={tech} className="rounded-[4px] border-2 border-ink/80 px-2 py-0.5 text-[14px] font-semibold text-ink">
          {tech}
        </li>
      ))}
    </ul>
  )

  return (
    <article className="frame group flex h-full flex-col overflow-hidden bg-white transition-transform duration-300 ease-out hover:-translate-y-1">
      <div className={`${CATEGORY_STYLE[project.category]} px-5 py-2.5`}>
        <span className="font-display text-[15px] font-bold uppercase tracking-[0.12em]">
          {t(`projects.${project.category}`)}
        </span>
      </div>

      {project.previewImage && (
        <div className="border-y-[3px] border-ink bg-ink">
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
        <div className="grid flex-1 gap-6 p-5 sm:p-7 lg:grid-cols-12 lg:gap-10 lg:p-10">
          <div className="lg:col-span-7">
            <Heading className="font-display text-[2.6rem] font-extrabold uppercase text-ink sm:text-[3.2rem]">{L.title}</Heading>
            <p className="mt-4 max-w-[62ch] text-[1.05rem] leading-relaxed text-steel">{L.description}</p>
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
        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-7">
          <Heading className="font-display text-[2rem] font-extrabold uppercase text-ink">{L.title}</Heading>
          <p className="max-w-[60ch] text-[1.05rem] leading-relaxed text-steel">{L.description}</p>
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
