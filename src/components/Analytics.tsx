'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const STORAGE_KEY = 'portfolio-analytics-consent'

type Consent = 'granted' | 'denied' | null

/**
 * Google Analytics 4 opcional: só renderiza se NEXT_PUBLIC_GA_ID existir e só
 * carrega o script depois que o visitante aceita. Sem ID, não há banner nem script.
 */
export default function Analytics() {
  const [consent, setConsent] = useState<Consent>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'granted' || stored === 'denied') setConsent(stored)
    } catch {
      // sem localStorage: o banner volta a cada visita
    }
    setReady(true)
  }, [])

  if (!GA_ID || !ready) return null

  const choose = (value: 'granted' | 'denied') => {
    setConsent(value)
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // segue só em memória
    }
  }

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}</Script>
        </>
      )}
      {consent === null && (
        <section
          aria-label="Aviso de cookies"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-[10px] bg-ink p-4 text-paper ring-[3px] ring-inset ring-sign sm:bottom-5"
        >
          <p className="text-[15px] leading-snug">
            Uso o Google Analytics, só se você permitir, para saber quais páginas e botões ajudam quem visita o site.{' '}
            <a href="/privacidade" className="font-semibold text-sign underline">
              Política de privacidade
            </a>
            .
          </p>
          <div className="mt-3 flex gap-3">
            <button
              type="button"
              onClick={() => choose('granted')}
              className="min-h-[44px] rounded-[6px] bg-sign px-4 font-display text-base font-bold uppercase tracking-wide text-white"
            >
              Aceitar
            </button>
            <button
              type="button"
              onClick={() => choose('denied')}
              className="min-h-[44px] rounded-[6px] border-2 border-paper/60 px-4 font-display text-base font-bold uppercase tracking-wide text-paper"
            >
              Recusar
            </button>
          </div>
        </section>
      )}
    </>
  )
}
