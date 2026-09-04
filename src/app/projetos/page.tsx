'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'

const CATEGORIES = [
  { id: 'all', labelKey: 'projects.all' },
  { id: 'fullstack', labelKey: 'projects.fullstack' },
  { id: 'frontend', labelKey: 'projects.frontend' },
  { id: 'backend', labelKey: 'projects.backend' },
  { id: 'automation', labelKey: 'projects.automation' },
]

function ProjetosContent() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')
  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter)

  return (
    <main className="min-h-screen pt-16">
      <ScrollProgress />
      <Navbar />
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('projects.backHome')}
            </Link>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {t('projects.allTitle')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t('projects.allDescription')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={filter === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(cat.id)}
                className="transition-all duration-200"
              >
                {t(cat.labelKey)}
              </Button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                size="compact"
              />
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default function ProjetosPage() {
  return (
    <LanguageProvider>
      <ProjetosContent />
    </LanguageProvider>
  )
}
