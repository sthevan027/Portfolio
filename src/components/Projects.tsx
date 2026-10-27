'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Gallery4, type Gallery4Item } from '@/components/blocks/gallery4'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { CASES } from '@/data/cases'
import { projects } from '@/data/projects'
import { localized } from '@/lib/project-i18n'

/** Projetos em destaque no carrossel: destaques primeiro, cada um com link para o caso ou o código. */
export default function Projects() {
  const { t, language } = useLanguage()

  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured))

  const items: Gallery4Item[] = ordered
    .filter((p) => p.previewImage)
    .map((p) => {
      const L = localized(p, language)
      const caseStudy = CASES.find((c) => c.projectTitle === p.title)
      const base = { id: String(p.id), title: L.title, description: L.description, image: p.previewImage as string }
      if (caseStudy) return { ...base, href: `/projetos/${caseStudy.slug}`, linkLabel: t('cases.read') }
      if (p.github) return { ...base, href: p.github, external: true, linkLabel: t('projects.code') }
      if (p.demo) return { ...base, href: p.demo, external: true, linkLabel: t('projects.demo') }
      return { ...base, href: '/projetos', linkLabel: t('cases.read') }
    })

  return (
    <Gallery4
      id="projects"
      title={t('projects.title')}
      description={t('projects.lede')}
      items={items}
      labels={{
        prev: t('projects.prev'),
        next: t('projects.next'),
        goTo: t('projects.goTo'),
        readMore: t('cases.read'),
      }}
      footer={
        <Button asChild variant="outlineSign" size="lg">
          <Link href="/projetos">
            {t('projects.viewAll')}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      }
    />
  )
}
