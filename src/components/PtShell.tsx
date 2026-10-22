'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { LanguageProvider } from '@/contexts/LanguageContext'

/** Moldura das páginas de conteúdo que existem só em português (sem alternância PT/EN). */
export default function PtShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider locked="pt">
      <Navbar showLanguageSwitch={false} />
      <main id="main" className="bg-paper pt-16">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </LanguageProvider>
  )
}
