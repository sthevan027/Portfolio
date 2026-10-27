'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const STEPS = ['s1', 's2', 's3', 's4'] as const

/** Trajetória em linha do tempo: a história de campo como prova de experiência. */
export default function Path() {
  const { t } = useLanguage()

  return (
    <section id="path" aria-labelledby="path-title" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t('path.eyebrow')}</p>
          <h2 id="path-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('path.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('path.lede')}</p>
        </div>

        <ol className="mt-12 grid gap-5 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s} className="plate flex flex-col p-7">
              <span className="tabular text-[14px] font-semibold text-sign">{t(`path.${s}Period`)}</span>
              <h3 className="mt-3 text-[1.25rem] font-bold leading-snug text-ink">{t(`path.${s}Title`)}</h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-steel">{t(`path.${s}Text`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
