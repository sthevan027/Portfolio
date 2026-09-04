'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Monitor,
  Server,
  Database,
  Cloud,
  Smartphone,
  Settings,
  Hash,
  Terminal,
  FileCode,
  ScanText,
  Code2,
} from 'lucide-react'
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiPostgresql,
  SiGnubash,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiSupabase,
  SiDocker,
  SiVercel,
  SiGithubactions,
  SiPwa,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { skillCategories as skillCategoriesData } from '@/data/skills'
import { useLanguage } from '@/contexts/LanguageContext'

const ICON_MAP = {
  Monitor,
  Server,
  Database,
  Cloud,
  Smartphone,
  Settings,
} as const

const SKILL_ICONS: Record<string, IconType> = {
  TypeScript: SiTypescript,
  'React/Next.js': SiReact,
  'Tailwind CSS': SiTailwindcss,
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  'Node.js': SiNodedotjs,
  'C#': Hash,
  Java: FaJava,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  Docker: SiDocker,
  Vercel: SiVercel,
  'GitHub Actions': SiGithubactions,
  PWA: SiPwa,
  Python: SiPython,
  'OCR (Tesseract)': ScanText,
  PowerShell: Terminal,
  Shell: SiGnubash,
  VBScript: FileCode,
}

function getSkillIcon(name: string): IconType {
  return SKILL_ICONS[name] || Code2
}

export default function Skills() {
  const { t } = useLanguage()
  const skillCategories = skillCategoriesData.map((cat) => ({
    ...cat,
    icon: ICON_MAP[cat.icon as keyof typeof ICON_MAP] || Monitor,
    skills: [...cat.skills].sort((a, b) => b.level - a.level),
  }))

  return (
    <section id="experience" className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('skills.description')}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <Card className="glass hover:glow transition-all duration-300 h-full bg-gray-900/50 border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className={`text-xl ${category.iconColor}`}>{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const Icon = getSkillIcon(skill.name)
                      return (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800/60 px-3 py-1 text-sm text-gray-200"
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0" />
                          {skill.name}
                        </span>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('skills.philosophy')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

