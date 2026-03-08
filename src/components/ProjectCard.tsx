'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/data/projects'

const GRADIENTS = [
  'from-blue-600 to-cyan-500',
  'from-violet-600 to-purple-500',
  'from-amber-500 to-orange-600',
  'from-emerald-600 to-teal-500',
  'from-rose-600 to-pink-500',
  'from-indigo-600 to-blue-500',
]

const SCREENSHOT_PARAMS = 'width=640&height=360&format=webp&block_ads=true'

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

function getScreenshotUrl(demoUrl: string) {
  return `https://pageshot.site/v1/screenshot?url=${encodeURIComponent(demoUrl)}&${SCREENSHOT_PARAMS}`
}

interface ProjectCardProps {
  project: Project
  index: number
  size?: 'featured' | 'compact'
}

export default function ProjectCard({ project, index, size = 'compact' }: ProjectCardProps) {
  const [screenshotError, setScreenshotError] = useState(false)
  const preview = getProjectPreview(project, index)
  const isFeatured = size === 'featured'
  const showScreenshot = project.demo && !screenshotError

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * (isFeatured ? 0.2 : 0.1) }}
      viewport={{ once: true }}
    >
      <Card className="glass hover:glow transition-all duration-300 h-full overflow-hidden flex flex-col min-h-0">
        <div className="aspect-video rounded-t-lg overflow-hidden bg-muted relative shrink-0">
          {showScreenshot ? (
            <img
              src={getScreenshotUrl(project.demo!)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setScreenshotError(true)}
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
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(isFeatured ? project.technologies : project.technologies.slice(0, 3)).map(
              (tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                >
                  {tech}
                </span>
              )
            )}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Código
              </a>
            </Button>
            {project.demo && (
              <Button size="sm" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
