'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Filter } from 'lucide-react'

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'Sistema de Gestão Industrial',
      description: 'Plataforma completa para gestão industrial com dashboard analytics, CRM, Kanban e monitoramento de redes sociais.',
      image: '/api/placeholder/400/250',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/sthevan',
      demo: 'https://demo.com',
      featured: true
    },
    {
      id: 2,
      title: 'E-commerce Automation Bot',
      description: 'Bot inteligente para automação de vendas em e-commerce, com integração WhatsApp e análise de dados.',
      image: '/api/placeholder/400/250',
      category: 'automation',
      technologies: ['Python', 'Selenium', 'WhatsApp API', 'MongoDB'],
      github: 'https://github.com/sthevan',
      demo: 'https://demo.com',
      featured: true
    },
    {
      id: 3,
      title: 'DevLoop Landing Page',
      description: 'Landing page moderna e responsiva para a DevLoop, com animações e design glassmorphism.',
      image: '/api/placeholder/400/250',
      category: 'frontend',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
      github: 'https://github.com/sthevan',
      demo: 'https://devloop.com.br',
      featured: false
    },
    {
      id: 4,
      title: 'API de Gestão Financeira',
      description: 'API RESTful para gestão financeira com autenticação JWT, relatórios e integração bancária.',
      image: '/api/placeholder/400/250',
      category: 'backend',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
      github: 'https://github.com/sthevan',
      demo: null,
      featured: false
    },
    {
      id: 5,
      title: 'Dashboard Analytics',
      description: 'Dashboard interativo para análise de dados com gráficos em tempo real e relatórios customizados.',
      image: '/api/placeholder/400/250',
      category: 'frontend',
      technologies: ['React', 'Chart.js', 'Material-UI', 'WebSocket'],
      github: 'https://github.com/sthevan',
      demo: 'https://demo.com',
      featured: false
    },
    {
      id: 6,
      title: 'Microserviços Architecture',
      description: 'Arquitetura de microserviços escalável com Docker, Kubernetes e monitoramento.',
      image: '/api/placeholder/400/250',
      category: 'backend',
      technologies: ['Docker', 'Kubernetes', 'Node.js', 'Redis'],
      github: 'https://github.com/sthevan',
      demo: null,
      featured: false
    }
  ]

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'automation', label: 'Automação' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <section id="projects" className="py-20 bg-background">
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
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes, demonstrando expertise em 
            desenvolvimento full stack, automação e criação de soluções inovadoras.
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass hover:glow transition-all duration-300 overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-4xl font-bold gradient-text">{project.title.charAt(0)}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      {project.github && (
                        <Button size="sm" variant="secondary">
                          <Github className="h-4 w-4 mr-2" />
                          Código
                        </Button>
                      )}
                      {project.demo && (
                        <Button size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      {project.github && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      )}
                      {project.demo && (
                        <Button size="sm" className="flex-1">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <Filter className="h-5 w-5 text-muted-foreground mr-2 mt-2" />
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category.id)}
              className={filter === category.id ? "glow" : ""}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass hover:glow transition-all duration-300 overflow-hidden group h-full">
                <div className="relative overflow-hidden">
                  <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold gradient-text">{project.title.charAt(0)}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                    {project.github && (
                      <Button size="sm" variant="secondary">
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                    {project.demo && (
                      <Button size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

