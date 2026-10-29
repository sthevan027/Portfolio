'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const ITEMS = ['d1', 'd2', 'd3', 'd4'] as const

/** Diferenciais: o que o cliente ganha ao contratar. */
export default function Differentials() {
  const { t } = useLanguage()

  return (
    <section id="differentials" aria-labelledby="diff-title" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t('diff.eyebrow')}</p>
          <h2 id="diff-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('diff.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('diff.lede')}</p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((k) => (
            <li key={k} className="plate p-7">
              <h3 className="text-[1.2rem] font-bold leading-snug text-ink">{t(`diff.${k}Title`)}</h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-steel">{t(`diff.${k}Text`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
