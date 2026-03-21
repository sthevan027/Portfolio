'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

const FEATURED_ORDER = ['codefocus', 'ceo-os', 'gh-dev-analyzer', 'eletrolab', 'system-control']

export default function Projects() {
  const featuredProjects = useMemo(() => {
    const featured = projects.filter((p) => p.featured)
    return featured.sort((a, b) => {
      const repoA = a.github.split('/').pop()?.toLowerCase().replace(/\s+/g, '-') ?? ''
      const repoB = b.github.split('/').pop()?.toLowerCase().replace(/\s+/g, '-') ?? ''
      const iA = FEATURED_ORDER.indexOf(repoA)
      const iB = FEATURED_ORDER.indexOf(repoB)
      if (iA === -1) return 1
      if (iB === -1) return -1
      return iA - iB
    })
  }, [])

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes, demonstrando expertise em desenvolvimento
            full stack, automação e criação de soluções inovadoras.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-heading font-bold mb-8 text-center">
            Projetos em <span className="gradient-text">Destaque</span>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button size="lg" asChild className="glow">
              <Link href="/projetos" className="inline-flex items-center">
                Ver mais projetos
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
