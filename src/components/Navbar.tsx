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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/90 text-ink backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded-lg focus:bg-sign focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        {t('nav.skip')}
      </a>
      <nav className="mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-[17px] font-extrabold tracking-tight text-ink">
          Sthevan Santos
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg px-3 py-2 text-[15px] font-medium text-steel transition-colors hover:bg-paper hover:text-ink"
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
              className="flex min-h-[44px] items-center gap-1 px-2 text-[14px] font-semibold"
            >
              {/* nome acessível começa pelo texto visível ("PT / EN") e completa com a ação */}
              <span className={language === 'pt' ? 'text-sign' : 'text-steel'}>PT</span>
              <span className="text-line" aria-hidden>/</span>
              <span className={language === 'en' ? 'text-sign' : 'text-steel'}>EN</span>
              <span className="sr-only"> — {t('nav.switchLanguage')}</span>
            </button>
          )}

          <Button asChild variant="route" size="sm" className="hidden sm:inline-flex">
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
        <div id="mobile-menu" className="border-t border-line bg-white md:hidden">
          <ul className="mx-auto max-w-site px-4 py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-[52px] items-center border-b border-line text-lg font-semibold text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Button asChild variant="route" size="lg" className="mt-4 w-full">
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
                className="flex min-h-[48px] items-center text-[16px] font-medium text-steel"
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
