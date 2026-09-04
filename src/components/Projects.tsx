'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import { useLanguage } from '@/contexts/LanguageContext'

const FEATURED_ORDER = [
  'gerador-de-relatorio',
  'gerador-de-art',
  'ceo-os',
  'system-control',
  'devradar',
  'laudofacil',
]

export default function Projects() {
  const { t } = useLanguage()
  const featuredProjects = useMemo(() => {
    const featured = projects.filter((p) => p.featured)
    return featured.sort((a, b) => {
      const repoA = a.github?.split('/').pop()?.toLowerCase().replace(/\s+/g, '-') ?? ''
      const repoB = b.github?.split('/').pop()?.toLowerCase().replace(/\s+/g, '-') ?? ''
      const iA = FEATURED_ORDER.indexOf(repoA)
      const iB = FEATURED_ORDER.indexOf(repoB)
      if (iA === -1) return 1
      if (iB === -1) return -1
      return iA - iB
    })
  }, [])

  return (
    <section id="projects" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-heading font-bold mb-8 text-center">
            {t('projects.featured')}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                size="featured"
              />
            ))}
          </div>

          {/* Ver mais projetos button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button size="lg" asChild className="hover:glow">
              <Link href="/projetos" className="inline-flex items-center">
                {t('projects.viewMore')}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
