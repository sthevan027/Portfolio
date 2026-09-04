'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, TrendingUp, Hash, Terminal, FileCode, AppWindow, Code2 } from 'lucide-react'
import { SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss, SiPostgresql, SiGnubash } from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import type { Project } from '@/data/projects'
import type { IconType } from 'react-icons'
import { useLanguage } from '@/contexts/LanguageContext'
import { EASE_SMOOTH } from '@/lib/motion'

const TECH_ICONS: Record<string, IconType> = {
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  HTML: SiHtml5,
  CSS: SiCss,
  Java: FaJava,
  PLpgSQL: SiPostgresql,
  Shell: SiGnubash,
  'C#': Hash,
  PowerShell: Terminal,
  VBScript: FileCode,
  Batchfile: Terminal,
  Tkinter: AppWindow,
}

function getTechIcon(tech: string): IconType {
  return TECH_ICONS[tech] || Code2
}

const GRADIENTS = [
  'from-blue-600 to-cyan-500',
  'from-blue-700 to-sky-600',
  'from-cyan-600 to-blue-500',
  'from-sky-700 to-blue-600',
  'from-blue-600 to-sky-500',
  'from-sky-600 to-cyan-500',
]

function getProjectPreview(project: { title: string }, index: number) {
  const gradient = GRADIENTS[index % GRADIENTS.length]
  const words = project.title.split(/\s+/)
  const initials =
    words.length >= 2
      ? words
          .slice(0, 2)
          .map((w) => w[0])
          .join('')
          .toUpperCase()
      : project.title.slice(0, 2).toUpperCase()
  return { gradient, initials: initials || '?' }
}

interface ProjectCardProps {
  project: Project
  index: number
  size?: 'featured' | 'compact'
}

export default function ProjectCard({ project, index, size = 'compact' }: ProjectCardProps) {
  const { t } = useLanguage()
  const [previewFailed, setPreviewFailed] = useState(false)
  const preview = getProjectPreview(project, index)
  const isFeatured = size === 'featured'
  const showImage = project.previewImage && !previewFailed

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: index * (isFeatured ? 0.1 : 0.06) }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
    >
      <Card className="glass hover:glow transition-all duration-300 h-full overflow-hidden flex flex-col min-h-0">
        <div className="aspect-video rounded-t-lg overflow-hidden bg-muted relative shrink-0">
          {showImage ? (
            <img
              src={project.previewImage}
              alt={`Pré-visualização de ${project.title}`}
              width={640}
              height={360}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setPreviewFailed(true)}
            />
          ) : (
            <div
              className={`absolute inset-0 w-full h-full bg-gradient-to-br ${preview.gradient} flex items-center justify-center`}
            >
              <span
                className={`font-bold text-white/90 tracking-tighter drop-shadow-lg select-none ${
                  isFeatured ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
                }`}
              >
                {preview.initials}
              </span>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className={isFeatured ? 'text-xl' : 'text-lg'}>{project.title}</CardTitle>
          <p
            className={`text-muted-foreground ${isFeatured ? '' : 'text-sm'}`}
          >
            {project.description}
          </p>
          {project.impact && (
            <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 text-sm font-medium">
              <TrendingUp className="h-4 w-4 shrink-0" />
              <span>{project.impact}</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(isFeatured ? project.technologies : project.technologies.slice(0, 3)).map(
              (tech) => {
                const Icon = getTechIcon(tech)
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {tech}
                  </span>
                )
              }
            )}
          </div>
          <div className="flex gap-2">
            {project.github && (
              <Button size="sm" variant="outline" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  {t('projects.code')}
                </a>
              </Button>
            )}
            {project.demo && (
              <Button size="sm" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('projects.demo')}
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
