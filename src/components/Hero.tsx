'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Hero() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '5527988772784'
    const message = encodeURIComponent('Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.')
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const handleProjectsClick = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadCV = () => {
    // Criar um link temporário para download
    const link = document.createElement('a')
    link.href = '/cv-sthevan-santos.pdf' // Assumindo que o CV está na pasta public
    link.download = 'Sthevan-Santos-CV.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="hero-bg absolute inset-0"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight"
            >
              Olá, eu sou{' '}
              <span className="gradient-text">Sthevan Santos</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium"
            >
              Frontend Developer | Especialista em React & Next.js
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              Transformo designs em interfaces incríveis com React e Next.js. Especialista em criar experiências 
              digitais modernas, responsivas e performáticas. Apaixonado por frontend e sempre em busca da melhor UX.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 glow"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleProjectsClick}
              >
                Ver Projetos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg"
                onClick={handleDownloadCV}
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <Image
                    src="/sthevan.jpg"
                    alt="Sthevan Santos"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-14 h-14 lg:w-16 lg:h-16 bg-primary/20 rounded-full flex items-center justify-center glass"
              >
                <span className="text-xl lg:text-2xl">⚡</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 w-10 h-10 lg:w-12 lg:h-12 bg-secondary/20 rounded-full flex items-center justify-center glass"
              >
                <span className="text-lg lg:text-xl">🚀</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

