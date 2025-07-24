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

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Monitor,
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-400',
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'vite.js', level: 85 },
        { name: 'Vue.js', level: 80 },
        { name: 'HTML', level: 90 },
        { name: 'CSS', level: 85 },
        { name: 'JavaScript', level: 90 }
      ]
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-400',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'PHP', level: 75 },
        { name: 'GO', level: 75 }
      ]
    },
    {
      title: 'Database',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-400',
      skills: [
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'Redis', level: 75 },
        { name: 'Prisma ORM', level: 80 },
        { name: 'SQL', level: 85 }
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: Cloud,
      color: 'from-orange-500 to-red-500',
      iconColor: 'text-orange-400',
      skills: [
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'Vercel', level: 85 },
        { name: 'GitHub Actions', level: 80 }
      ]
    },
    {
      title: 'Mobile',
      icon: Smartphone,
      color: 'from-indigo-500 to-purple-500',
      iconColor: 'text-indigo-400',
      skills: [
        { name: 'React Native', level: 80 },
        { name: 'Expo', level: 85 },
        { name: 'Flutter', level: 75 },
        { name: 'PWA', level: 85 },
        { name: 'App Store', level: 75 }
      ]
    },
    {
      title: 'Automação',
      icon: Settings,
      color: 'from-yellow-500 to-orange-500',
      iconColor: 'text-yellow-400',
      skills: [
        { name: 'Python', level: 80 },
        { name: 'N8N', level: 85 },
        { name: 'Make', level: 80 },
        { name: 'Node.js', level: 85 }
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 bg-black">
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
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          viewport={{ once: true }}
                          className={`h-2 bg-gradient-to-r ${category.color} rounded-full`}
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

