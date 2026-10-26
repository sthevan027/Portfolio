'use client'

import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SITE } from '@/lib/site'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-site flex-col gap-6 px-3 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="inline-block rounded-[6px] bg-sign px-3 py-1.5 font-display text-xl font-extrabold uppercase leading-none tracking-wide text-white">
            Sthevan Santos
          </p>
          <p className="mt-3 text-paper/70">{t('footer.line')}</p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[17px] font-bold uppercase tracking-wide">
          <li>
            <Link href="/servicos" className="hover:text-sign">{t('nav.services')}</Link>
          </li>
          <li>
            <Link href="/projetos" className="hover:text-sign">{t('nav.projects')}</Link>
          </li>
          <li>
            <Link href="/privacidade" className="hover:text-sign">{t('footer.privacy')}</Link>
          </li>
          <li>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-sign">GitHub</a>
          </li>
          <li>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-sign">LinkedIn</a>
          </li>
          <li>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-sign">Instagram</a>
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
              className="inline-flex min-h-[44px] items-center gap-1.5 font-display font-bold uppercase tracking-wide text-sign hover:underline"
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
              {t('footer.backToTop')}
            </button>
          </li>
        </ul>
      </div>
      <p className="border-t border-paper/10 px-3 py-4 text-center text-[14px] text-paper/50">
        © {new Date().getFullYear()} {t('footer.rights')}
      </p>
    </footer>
  )
}
