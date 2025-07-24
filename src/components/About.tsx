'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Target, Eye, Heart, Users } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Missão',
      description: 'Criar interfaces excepcionais que proporcionam experiências digitais memoráveis e funcionais.'
    },
    {
      icon: Eye,
      title: 'Visão',
      description: 'Ser referência em desenvolvimento frontend, especialmente em React e Next.js no cenário brasileiro.'
    },
    {
      icon: Heart,
      title: 'Valores',
      description: 'Excelência em UX/UI, código limpo, performance e foco na experiência do usuário.'
    },
    {
      icon: Users,
      title: 'Impacto',
      description: 'Mais de 30 projetos frontend entregues, criando interfaces que encantam usuários.'
    }
  ]

  const timeline = [
    {
      year: '2025',
      title: 'CEO da DevLoop & Engenheiro de Software',
      description: 'Liderança da DevLoop e atuação como engenheiro de software especializado em soluções frontend.'
    },
    {
      year: '2024',
      title: 'Especialista React & Next.js',
      description: 'Foco total em React, Next.js e TypeScript. Desenvolvimento de interfaces modernas e performáticas.'
    },
    {
      year: '2023',
      title: 'Full Stack Developer',
      description: 'Consolidação como desenvolvedor full stack, com foco crescente no frontend e React.'
    },
    {
      year: '2022',
      title: 'Frontend Developer',
      description: 'Especialização em desenvolvimento frontend com React, Tailwind CSS e Framer Motion.'
    },
    {
      year: '2021',
      title: 'Início da Jornada',
      description: 'Primeiros passos no desenvolvimento web, descoberta da paixão por criar interfaces.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-background">
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
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sou um engenheiro de software apaixonado por criar interfaces que fazem a diferença. 
            Especialista em React e Next.js, busco sempre entregar experiências digitais excepcionais 
            com foco na performance e na experiência do usuário.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass hover:glow transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-heading font-bold text-center mb-12">
            Minha <span className="gradient-text">Jornada</span>
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-secondary"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="glass">
                    <CardContent className="p-6">
                      <div className="text-primary font-bold text-lg mb-2">{item.year}</div>
                      <h4 className="font-heading font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold mb-4">
                Vamos <span className="gradient-text">Conversar?</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Estou sempre aberto a novos projetos frontend e oportunidades de colaboração. 
                Vamos criar interfaces incríveis juntos!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 glow"
                >
                  Entrar em Contato
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  Ver Projetos
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

