'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Code, 
  Database, 
  Smartphone, 
  Cloud, 
  Bot, 
  Palette,
  Server,
  Globe,
  Zap,
  Shield,
  GitBranch,
  Monitor
} from 'lucide-react'

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Monitor,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Framer Motion', level: 85 },
        { name: 'Vue.js', level: 80 }
      ]
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 95 },
        { name: 'Python', level: 90 },
        { name: 'Express/Fastify', level: 90 },
        { name: 'GraphQL', level: 85 },
        { name: 'REST APIs', level: 95 }
      ]
    },
    {
      title: 'Database',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'PostgreSQL', level: 90 },
        { name: 'MongoDB', level: 85 },
        { name: 'Redis', level: 80 },
        { name: 'Prisma ORM', level: 90 },
        { name: 'SQL', level: 95 }
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: Cloud,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Docker', level: 85 },
        { name: 'AWS', level: 80 },
        { name: 'Vercel', level: 95 },
        { name: 'GitHub Actions', level: 85 },
        { name: 'Nginx', level: 80 }
      ]
    },
    {
      title: 'Mobile',
      icon: Smartphone,
      color: 'from-indigo-500 to-purple-500',
      skills: [
        { name: 'React Native', level: 85 },
        { name: 'Expo', level: 90 },
        { name: 'Flutter', level: 75 },
        { name: 'PWA', level: 90 },
        { name: 'App Store', level: 80 }
      ]
    },
    {
      title: 'Automação',
      icon: Bot,
      color: 'from-yellow-500 to-orange-500',
      skills: [
        { name: 'Selenium', level: 90 },
        { name: 'Puppeteer', level: 85 },
        { name: 'WhatsApp API', level: 95 },
        { name: 'Web Scraping', level: 90 },
        { name: 'Zapier', level: 85 }
      ]
    }
  ]

  const tools = [
    { name: 'VS Code', icon: Code },
    { name: 'Git', icon: GitBranch },
    { name: 'Figma', icon: Palette },
    { name: 'Postman', icon: Zap },
    { name: 'Linux', icon: Shield },
    { name: 'Vercel', icon: Globe }
  ]

  return (
    <section id="skills" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Stack & <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tecnologias e ferramentas que domino para criar soluções completas e inovadoras.
            Sempre em constante aprendizado e evolução.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass hover:glow transition-all duration-300 h-full">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} p-0.5`}>
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <category.icon className="h-8 w-8 text-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                            className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-heading font-bold mb-8">
            Ferramentas <span className="gradient-text">Favoritas</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center p-4 glass rounded-lg hover:glow transition-all duration-300"
              >
                <tool.icon className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="glass max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                Soft <span className="gradient-text">Skills</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  'Liderança',
                  'Comunicação',
                  'Resolução de Problemas',
                  'Trabalho em Equipe',
                  'Adaptabilidade',
                  'Criatividade',
                  'Gestão de Tempo',
                  'Pensamento Crítico'
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-3 bg-primary/10 rounded-lg"
                  >
                    <span className="text-sm font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

