'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Hash, Terminal, FileCode, ScanText, Code2 } from 'lucide-react'
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
import { fadeUpTransition } from '@/lib/motion'

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
  const allSkills = skillCategoriesData
    .flatMap((cat) => cat.skills)
    .sort((a, b) => b.level - a.level)

  return (
    <section id="experience" className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={fadeUpTransition()}
          viewport={{ once: true, amount: 0.4 }}
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
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={fadeUpTransition()}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Card className="glass bg-gray-900/50 border-gray-700">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-wrap justify-center gap-3">
                {allSkills.map((skill, index) => {
                  const Icon = getSkillIcon(skill.name)
                  return (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.5, y: 12 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.035, ease: 'backOut' }}
                      viewport={{ once: true, amount: 0.6 }}
                      whileHover={{ scale: 1.1, y: -4 }}
                      title={skill.name}
                      aria-label={skill.name}
                      className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-700 bg-gray-800/60 text-gray-200 transition-colors hover:border-primary hover:text-primary"
                    >
                      <Icon className="h-6 w-6" />
                    </motion.span>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={fadeUpTransition()}
          viewport={{ once: true, amount: 0.6 }}
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

