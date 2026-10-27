'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const ITEMS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] as const

/** Sinais que o visitante reconhece antes de ver a oferta. */
export default function Problems() {
  const { t } = useLanguage()

  return (
    <section id="problems" aria-labelledby="problems-title" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t('problems.eyebrow')}</p>
          <h2 id="problems-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('problems.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('problems.lede')}</p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((k, i) => (
            <li key={k} className="plate flex gap-4 p-6">
              <span className="tabular flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sign-soft text-[15px] font-bold text-sign" aria-hidden>
                {i + 1}
              </span>
              <p className="text-[1.05rem] leading-snug text-ink">{t(`problems.${k}`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
