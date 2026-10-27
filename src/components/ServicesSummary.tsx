'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackEvent } from '@/lib/analytics'

const ITEMS = [
  { key: 's1', anchor: 'sistemas-personalizados' },
  { key: 's2', anchor: 'automacao-de-processos' },
  { key: 's3', anchor: 'modernizacao-e-melhoria' },
] as const

/** Resumo dos serviços na home; o detalhe fica em /servicos. */
export default function ServicesSummary() {
  const { t } = useLanguage()

  return (
    <section id="services" aria-labelledby="services-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t('services.eyebrow')}</p>
          <h2 id="services-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('services.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('services.lede')}</p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {ITEMS.map((s) => (
            <li key={s.key} className="plate flex flex-col p-7 sm:p-8">
              <h3 className="text-[1.5rem] font-bold leading-tight text-ink">{t(`services.${s.key}Title`)}</h3>
              <p className="mt-3 flex-1 text-[1.02rem] leading-relaxed text-steel">{t(`services.${s.key}Text`)}</p>
              <Link
                href={`/servicos#${s.anchor}`}
                onClick={() => trackEvent('service_view', { service: s.anchor })}
                className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 self-start text-[16px] font-semibold text-sign hover:text-route-deep"
              >
                {t('services.more')}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outlineSign" size="lg">
            <Link href="/servicos">{t('services.all')}</Link>
          </Button>
          <Button asChild size="lg">
            <a href="#contact" onClick={() => trackEvent('quote_click', { location: 'services' })}>
              {t('services.quote')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
