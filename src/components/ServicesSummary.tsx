'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackEvent } from '@/lib/analytics'

const ITEMS = [
  { key: 's1', anchor: 'sistemas-personalizados', plate: 'bg-info text-white' },
  { key: 's2', anchor: 'automacao-de-processos', plate: 'bg-sign text-white' },
  { key: 's3', anchor: 'modernizacao-e-melhoria', plate: 'bg-ink text-sign' },
] as const

/** Resumo dos três serviços na home; o detalhe fica em /servicos. */
export default function ServicesSummary() {
  const { t } = useLanguage()

  return (
    <section id="services" aria-labelledby="services-title" className="bg-sign py-16 sm:py-24">
      <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="services-title"
            className="font-display text-[clamp(3.2rem,9vw,5.6rem)] font-extrabold uppercase leading-[0.88] text-ink lg:col-span-6"
          >
            {t('services.title')}
          </h2>
          <p className="max-w-[48ch] text-[1.15rem] leading-relaxed text-sign-ink lg:col-span-6">{t('services.lede')}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {ITEMS.map((s) => (
            <article key={s.key} className="frame flex flex-col overflow-hidden bg-white">
              <div className={`${s.plate} px-5 py-2.5`} aria-hidden>
                <span className="font-display text-[15px] font-bold uppercase tracking-[0.12em]">
                  {String(ITEMS.indexOf(s) + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5 sm:p-7">
                <h3 className="font-display text-[2rem] font-extrabold uppercase leading-[0.95] text-ink">
                  {t(`services.${s.key}Title`)}
                </h3>
                <p className="text-[1.05rem] leading-relaxed text-steel">{t(`services.${s.key}Text`)}</p>
                <Link
                  href={`/servicos#${s.anchor}`}
                  onClick={() => trackEvent('service_view', { service: s.anchor })}
                  className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 font-display text-[17px] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep"
                >
                  {t('services.more')}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/servicos">{t('services.all')}</Link>
          </Button>
          <Button asChild size="lg" variant="plate">
            <a href="#contact" onClick={() => trackEvent('quote_click', { location: 'services' })}>
              {t('services.quote')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
