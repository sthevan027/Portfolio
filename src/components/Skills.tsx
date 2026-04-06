'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Monitor, 
  Server, 
  Database, 
  Cloud, 
  Smartphone, 
  Settings 
} from 'lucide-react'
import { skillCategories as skillCategoriesData } from '@/data/skills'

const ICON_MAP = {
  Monitor,
  Server,
  Database,
  Cloud,
  Smartphone,
  Settings,
} as const

export default function Skills() {
  const skillCategories = skillCategoriesData.map((cat) => ({
    ...cat,
    icon: ICON_MAP[cat.icon as keyof typeof ICON_MAP] || Monitor,
  }))

  return (
    <section id="experience" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
            Stack & <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Tecnologias e ferramentas que domino para criar soluções completas e inovadoras.
            Especialista em React e Next.js, sempre em constante aprendizado.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
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
                <CardContent className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="h-2 rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, #2563EB 0%, #06B6D4 100%)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cada tecnologia tem seu propósito e eu escolho a melhor ferramenta para cada projeto. 
            Foco especial em React, Next.js e TypeScript para criar experiências digitais excepcionais.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

