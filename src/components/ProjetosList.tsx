'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { projects, type ProjectCategory } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'

const CATEGORIES: ('all' | ProjectCategory)[] = ['all', 'fullstack', 'automation', 'frontend', 'backend']

function ProjetosContent() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')
  const available = CATEGORIES.filter((c) => c === 'all' || projects.some((p) => p.category === c))
  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <Navbar />
      <main id="main" className="bg-paper">
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-site px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16 lg:pt-32">
            <Link
              href="/#projects"
              className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-sign hover:text-route-deep"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {t('projects.backHome')}
            </Link>
            <h1 className="mt-6 text-[clamp(2.4rem,5.4vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink">
              {t('projects.allTitle')}
            </h1>
            <p className="mt-5 max-w-[60ch] text-[1.125rem] leading-relaxed text-steel">{t('projects.allLede')}</p>
          </div>
        </section>

        <section className="mx-auto max-w-site px-4 py-12 sm:px-6 lg:px-8">
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(v) => v && setFilter(v as 'all' | ProjectCategory)}
            aria-label={t('projects.filterLabel')}
          >
            {available.map((c) => {
              const count = c === 'all' ? projects.length : projects.filter((p) => p.category === c).length
              return (
                <ToggleGroupItem key={c} value={c}>
                  {t(`projects.${c}`)}
                  <span className="tabular text-[14px] opacity-70">{count}</span>
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

export default function ProjetosList() {
  return (
    <LanguageProvider>
      <ProjetosContent />
    </LanguageProvider>
  )
}
