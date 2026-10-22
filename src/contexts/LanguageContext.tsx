'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, getTranslation } from '@/lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const STORAGE_KEY = 'portfolio-language'

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/** `locked` fixa o idioma (páginas de conteúdo só em português) e ignora a preferência salva. */
export function LanguageProvider({ children, locked }: { children: ReactNode; locked?: Language }) {
  const [language, setLanguageState] = useState<Language>(locked ?? 'pt')

  useEffect(() => {
    if (locked) return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'pt' || stored === 'en') {
      setLanguageState(stored)
    }
  }, [locked])

  // leitores de tela e tradutores usam o lang do <html> para pronunciar o conteúdo
  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR'
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // localStorage indisponível (modo privado etc.) — segue só em memória
    }
  }

  const t = (key: string) => getTranslation(language, key)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

