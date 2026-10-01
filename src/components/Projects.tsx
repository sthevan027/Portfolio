'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import ProjectCard, { CategoryTag, ProjectLinks } from '@/components/ProjectCard'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { localized } from '@/lib/project-i18n'

/** Ordem dos destaques: as ferramentas com ganho medido abrem a lista. */
const FEATURED_ORDER = [
  'gerador-de-relatorio',
  'gerador-de-art',
  'ceo-os',
  'atlas', // título do ceo-os no portfólio (repo privado, sem link)
  'laudofacil',
  'devradar',
]

// repo privado vem sem link: cai no título, sem acento ("Relatório" → "relatorio")
const slug = (p: { github: string | null; title: string }) =>
  (p.github?.split('/').pop() ?? p.title)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')

const OTHERS_ON_HOME = 8

export default function Projects() {
  const { t, language } = useLanguage()

  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => {
      const ia = FEATURED_ORDER.indexOf(slug(a))
      const ib = FEATURED_ORDER.indexOf(slug(b))
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
  const [lead, ...rest] = featured
  const others = projects.filter((p) => !p.featured).slice(0, OTHERS_ON_HOME)

  return (
    <section id="projects" className="bg-paper pb-20 pt-4 sm:pb-28">
      <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
        <div className="grid gap-6 pb-10 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-[clamp(4rem,12vw,6rem)] font-extrabold uppercase leading-[0.85] text-ink lg:col-span-6">
            {t('projects.title')}
          </h2>
          <p className="max-w-[58ch] text-[1.125rem] leading-relaxed text-steel lg:col-span-6">
            {t('projects.lede')}
          </p>
        </div>

        {lead && <ProjectCard project={lead} layout="wide" priority />}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-20">
            <h3 className="font-display text-[2.6rem] font-extrabold uppercase text-ink">
              {t('projects.othersTitle')}
            </h3>
            <ul className="mt-6 border-t-[3px] border-ink">
              {others.map((p) => (
                <li
                  key={p.id}
                  className="grid gap-3 border-b-2 border-ink/15 py-5 transition-colors hover:bg-white sm:grid-cols-[150px_1fr_auto] sm:items-center sm:gap-6 sm:px-3"
                >
                  <CategoryTag category={p.category} className="hidden justify-self-start sm:inline-flex sm:self-center" />
                  <div>
                    <p className="font-display text-[1.6rem] font-extrabold uppercase leading-none text-ink">
                      {localized(p, language).title}
                    </p>
                    <p className="mt-1.5 max-w-[70ch] text-[15px] leading-snug text-steel">{localized(p, language).description}</p>
                    <p className="mt-1.5 text-[14px] font-semibold text-ink/80">{p.technologies.join(' · ')}</p>
                    <CategoryTag category={p.category} className="mt-3 sm:hidden" />
                  </div>
                  <ProjectLinks project={p} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex justify-start">
          <Button asChild size="lg">
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
