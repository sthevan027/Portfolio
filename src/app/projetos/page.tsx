'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { projects, type ProjectCategory } from '@/data/projects'
import ProjectCard, { CATEGORY_STYLE } from '@/components/ProjectCard'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'

const CATEGORIES: ('all' | ProjectCategory)[] = ['all', 'fullstack', 'automation', 'frontend', 'backend']

/** Aba ligada = cor da placa daquela categoria. */
const onStyle = (c: ProjectCategory) =>
  CATEGORY_STYLE[c]
    .split(' ')
    .map((cls) => `data-[state=on]:${cls}`)
    .join(' ')

function ProjetosContent() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')
  const available = CATEGORIES.filter((c) => c === 'all' || projects.some((p) => p.category === c))
  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <Navbar />
      <main className="bg-paper pt-16">
        <section className="bg-sign">
          <div className="mx-auto max-w-site px-3 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-14">
            <Link
              href="/#projects"
              className="inline-flex min-h-[44px] items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
              {t('projects.backHome')}
            </Link>
            <h1 className="mt-6 font-display text-[clamp(3.6rem,11vw,6rem)] font-extrabold uppercase leading-[0.85] text-ink">
              {t('projects.allTitle')}
            </h1>
            <p className="mt-5 max-w-[60ch] text-[1.125rem] leading-relaxed text-sign-ink">{t('projects.allLede')}</p>
          </div>
          <div className="hazard h-7" aria-hidden />
        </section>

        <section className="mx-auto max-w-site px-3 py-12 sm:px-6 lg:px-8">
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(v) => v && setFilter(v as 'all' | ProjectCategory)}
            aria-label={t('projects.filterLabel')}
          >
            {available.map((c) => {
              const count = c === 'all' ? projects.length : projects.filter((p) => p.category === c).length
              return (
                <ToggleGroupItem
                  key={c}
                  value={c}
                  className={c === 'all' ? 'data-[state=on]:bg-ink data-[state=on]:text-paper' : onStyle(c)}
                >
                  {t(`projects.${c}`)}
                  <span className="tabular text-[15px] opacity-70">{count}</span>
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>

          {list.length === 0 ? (
            <p className="mt-10 text-steel">{t('projects.empty')}</p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {list.map((p) => (
                <ProjectCard key={p.id} project={p} headingLevel={2} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function ProjetosPage() {
  return (
    <LanguageProvider>
      <ProjetosContent />
    </LanguageProvider>
  )
}
