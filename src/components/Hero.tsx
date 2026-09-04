'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, MessageCircle, Download, X, Code2, Zap, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'

const CV_OPTIONS = [
  {
    id: 'web' as const,
    labelKey: 'hero.cvOptionWebLabel',
    descriptionKey: 'hero.cvOptionWebDescription',
    icon: Code2,
    fileName: 'Sthevan Santos _ Desenvolvedor Web.pdf',
    folder: 'programacao' as const,
    downloadAs: 'Sthevan-Santos-Desenvolvedor-Web.pdf',
  },
  {
    id: 'eletrica' as const,
    labelKey: 'hero.cvOptionEletricaLabel',
    descriptionKey: 'hero.cvOptionEletricaDescription',
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

function useTypewriter(fullText: string, speedMs = 45) {
  const [typedLength, setTypedLength] = useState(0)

  useEffect(() => {
    setTypedLength(0)

    let i = 0
    const interval = setInterval(() => {
      i += 1
      setTypedLength(i)
      if (i >= fullText.length) clearInterval(interval)
    }, speedMs)

    return () => clearInterval(interval)
  }, [fullText, speedMs])

  return { typedLength, isDone: typedLength >= fullText.length }
}

export default function Hero() {
  const { t } = useLanguage()
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const bgY = useTransform(smoothProgress, [0, 1], ['0%', '25%'])
  const imageY = useTransform(smoothProgress, [0, 1], ['0%', '15%'])
  const contentOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0])

  const greeting = t('hero.greeting')
  const name = 'Sthevan Santos'
  const fullGreeting = `${greeting} ${name}`
  const { typedLength, isDone } = useTypewriter(fullGreeting)
  const typedGreeting = fullGreeting.slice(0, Math.min(typedLength, greeting.length))
  const typedName = fullGreeting.slice(greeting.length + 1, typedLength)

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

  useEffect(() => {
    if (!cvModalOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCvModal()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [cvModalOpen])

  const handleWhatsAppClick = () => {
    const phoneNumber = '5527988772784'
    const message = encodeURIComponent(t('hero.whatsappMessage'))
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
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden scroll-mt-20"
    >
      <div
        id="curriculo"
        className="absolute left-0 top-0 h-px w-px overflow-hidden pointer-events-none"
        aria-hidden
      />
      <motion.div style={{ y: bgY }} className="hero-bg absolute inset-0" />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-5 font-mono text-xs uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {t('contact.available')}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              <span aria-hidden>
                {typedGreeting}
                {typedName && ' '}
                <span className="text-primary">{typedName}</span>
                <span className="ml-1 inline-block w-[2px] h-8 sm:h-9 md:h-11 lg:h-12 translate-y-1 bg-primary align-middle animate-pulse" />
              </span>
              <span className="sr-only">
                {greeting} <span className="text-primary">{name}</span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              {t('hero.title')}
            </p>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 glow"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t('hero.whatsapp')}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleProjectsClick}
              >
                {t('hero.projects')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={handleDownloadCVClick}
              >
                <Download className="mr-2 h-5 w-5" />
                {t('hero.cv')}
              </Button>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ y: imageY }}
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
                aria-hidden
              >
                <Zap className="h-6 w-6 lg:h-7 lg:w-7 text-primary" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 w-10 h-10 lg:w-12 lg:h-12 bg-secondary/20 rounded-full flex items-center justify-center glass"
                aria-hidden
              >
                <Rocket className="h-5 w-5 lg:h-6 lg:w-6 text-secondary-foreground" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

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
                aria-label={t('hero.closeModal')}
              >
                <X className="h-5 w-5" />
              </button>
              <h2
                id="cv-modal-title"
                className="font-heading text-xl font-semibold pr-10 mb-1"
              >
                {t('hero.cvModalTitle')}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {t('hero.cvModalSubtitle')}
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
                        <span className="block font-medium">{t(option.labelKey)}</span>
                        <span className="text-sm text-muted-foreground">
                          {t(option.descriptionKey)}
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

