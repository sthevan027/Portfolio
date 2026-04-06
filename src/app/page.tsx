'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { LanguageProvider } from '@/contexts/LanguageContext'

const About = dynamic(() => import('@/components/About'), { ssr: true })
const Skills = dynamic(() => import('@/components/Skills'), { ssr: true })
const Projects = dynamic(() => import('@/components/Projects'), { ssr: true })
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true })
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), {
  ssr: true,
})

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </main>
    </LanguageProvider>
  )
}
