'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MessageCircle, Download, X, Code2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const CV_OPTIONS = [
  {
    id: 'web' as const,
    label: 'Desenvolvimento Web',
    description: 'Desenvolvedor Web — React, Next.js e frontend',
    icon: Code2,
    fileName: 'Sthevan Santos _ Desenvolvedor Web.pdf',
    folder: 'programacao' as const,
    downloadAs: 'Sthevan-Santos-Desenvolvedor-Web.pdf',
  },
  {
    id: 'eletrica' as const,
    label: 'Elétrica',
    description: 'Eletricista FC',
    icon: Zap,
    fileName: 'Sthevan Santos _ Eletricista FC.pdf',
    folder: 'eletrica' as const,
    downloadAs: 'Sthevan-Santos-Eletricista-FC.pdf',
  },
]

function downloadPdf(folder: string, fileName: string, downloadAs: string) {
  const href = `/curriculo/${folder}/${encodeURIComponent(fileName)}`
  const link = document.createElement('a')
  link.href = href
  link.download = downloadAs
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function Hero() {
  const [cvModalOpen, setCvModalOpen] = useState(false)

  useEffect(() => {
    const openCvFromHash = () => {
      if (window.location.hash === '#curriculo') {
        setCvModalOpen(true)
      }
    }
    openCvFromHash()
    window.addEventListener('hashchange', openCvFromHash)
    return () => window.removeEventListener('hashchange', openCvFromHash)
  }, [])

  const clearCurriculoHash = () => {
    if (typeof window !== 'undefined' && window.location.hash === '#curriculo') {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}`
      )
    }
  }

  const closeCvModal = () => {
    setCvModalOpen(false)
    clearCurriculoHash()
  }

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

  const handleDownloadCVClick = () => {
    setCvModalOpen(true)
  }

  const handlePickCv = (option: (typeof CV_OPTIONS)[number]) => {
    downloadPdf(option.folder, option.fileName, option.downloadAs)
    closeCvModal()
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden scroll-mt-20"
    >
      <div
        id="curriculo"
        className="absolute left-0 top-0 h-px w-px overflow-hidden pointer-events-none"
        aria-hidden
      />
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
                onClick={handleDownloadCVClick}
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

      <AnimatePresence>
        {cvModalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={closeCvModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md rounded-2xl border border-border bg-card/95 p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={closeCvModal}
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
              <h2
                id="cv-modal-title"
                className="font-heading text-xl font-semibold pr-10 mb-1"
              >
                Qual currículo baixar?
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Escolha a versão que combina com a vaga ou o contato.
              </p>
              <div className="flex flex-col gap-3">
                {CV_OPTIONS.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handlePickCv(option)}
                      className="flex w-full items-start gap-4 rounded-xl border border-border bg-background/50 p-4 text-left transition-colors hover:border-primary/50 hover:bg-muted/50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-medium">{option.label}</span>
                        <span className="text-sm text-muted-foreground">
                          {option.description}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
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

