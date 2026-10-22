'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { SITE } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'

/** `showLanguageSwitch={false}` nas páginas de conteúdo que existem só em português. */
export default function Navbar({ showLanguageSwitch = true }: { showLanguageSwitch?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const navItems = [
    { href: '/servicos', label: t('nav.services') },
    { href: '/#cases', label: t('nav.cases') },
    { href: '/#path', label: t('nav.path') },
    { href: '/#contact', label: t('nav.contact') },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink text-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded-[6px] focus:bg-sign focus:px-4 focus:py-2 focus:font-display focus:font-bold focus:uppercase focus:text-ink"
      >
        {t('nav.skip')}
      </a>
      <nav className="mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rounded-[6px] bg-sign px-3 py-1.5 font-display text-lg font-extrabold uppercase leading-none tracking-wide text-ink"
        >
          Sthevan Santos
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-2 font-display text-[17px] font-bold uppercase tracking-wide text-paper/85 underline-offset-[10px] transition-colors hover:text-sign hover:underline decoration-sign"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {showLanguageSwitch && (
          <button
            type="button"
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            className="flex min-h-[44px] items-center gap-1 px-2 font-display text-[15px] font-bold uppercase tracking-wider"
          >
            {/* nome acessível começa pelo texto visível ("PT / EN") e completa com a ação */}
            <span className={language === 'pt' ? 'text-sign' : 'text-paper/60'}>PT</span>
            <span className="text-paper/40" aria-hidden>/</span>
            <span className={language === 'en' ? 'text-sign' : 'text-paper/60'}>EN</span>
            <span className="sr-only"> — {t('nav.switchLanguage')}</span>
          </button>
          )}

          <Button asChild variant="sign" size="sm" className="hidden rounded-[6px] sm:inline-flex">
            <Link href="/#contact" onClick={() => trackEvent('quote_click', { location: 'navbar' })}>
              {t('nav.quote')}
            </Link>
          </Button>

          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div id="mobile-menu" className="border-t-4 border-sign bg-ink md:hidden">
          <ul className="mx-auto max-w-site px-4 py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-[52px] items-center border-b border-paper/10 font-display text-2xl font-extrabold uppercase tracking-wide text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Button asChild variant="sign" size="lg" className="mt-3 w-full">
                <Link
                  href="/#contact"
                  onClick={() => {
                    setIsOpen(false)
                    trackEvent('quote_click', { location: 'navbar_mobile' })
                  }}
                >
                  {t('nav.quote')}
                </Link>
              </Button>
            </li>
            <li>
              <a
                href={SITE.resumeDev}
                download
                onClick={() => setIsOpen(false)}
                className="flex min-h-[48px] items-center font-display text-lg font-bold uppercase tracking-wide text-paper/70"
              >
                {t('nav.resume')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
