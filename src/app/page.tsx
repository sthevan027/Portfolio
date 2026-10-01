'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ResultsBoard from '@/components/ResultsBoard'
import Projects from '@/components/Projects'
import Path from '@/components/Path'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <ResultsBoard />
        <Projects />
        <Path />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </LanguageProvider>
  )
}
