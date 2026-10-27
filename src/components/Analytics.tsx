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
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 text-ink shadow-[0_18px_40px_-16px_rgb(15_23_42/0.35)] sm:bottom-5"
        >
          <p className="text-[15px] leading-relaxed text-steel">
            Uso o Google Analytics, só se você permitir, para saber quais páginas e botões ajudam quem visita o site.{' '}
            <a href="/privacidade" className="font-semibold text-sign underline">
              Política de privacidade
            </a>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => choose('granted')}
              className="min-h-[44px] rounded-xl bg-sign px-5 text-[15px] font-semibold text-white hover:bg-route-deep"
            >
              Aceitar
            </button>
            <button
              type="button"
              onClick={() => choose('denied')}
              className="min-h-[44px] rounded-xl border border-line bg-white px-5 text-[15px] font-semibold text-ink hover:border-sign hover:text-sign"
            >
              Recusar
            </button>
          </div>
        </section>
      )}
    </>
  )
}
