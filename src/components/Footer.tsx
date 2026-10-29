'use client'

import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SITE } from '@/lib/site'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-site flex-col gap-8 px-4 py-14 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div className="max-w-sm">
          <p className="text-xl font-extrabold tracking-tight">{SITE.brand} <span className="font-medium text-white/60">· {SITE.name}</span></p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">{t('footer.line')}</p>
        </div>
        <nav aria-label={t('footer.navLabel')}>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-[15px] font-medium sm:grid-cols-1">
            <li>
              <Link href="/servicos" className="text-white/80 hover:text-white">{t('nav.services')}</Link>
            </li>
            <li>
              <Link href="/privacidade" className="text-white/80 hover:text-white">{t('footer.privacy')}</Link>
            </li>
            <li>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">GitHub</a>
            </li>
            <li>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">LinkedIn</a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">Instagram</a>
            </li>
            <li>
              {/* funciona em qualquer página (o #home só existe na home) */}
              <button
                type="button"
                onClick={() => {
                  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
                  document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true })
                }}
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sign-ink hover:text-white"
              >
                <ArrowUp className="h-4 w-4" aria-hidden />
                {t('footer.backToTop')}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <p className="border-t border-white/10 px-4 py-5 text-center text-[14px] text-white/50">
        © {new Date().getFullYear()} {t('footer.rights')}
      </p>
    </footer>
  )
}
