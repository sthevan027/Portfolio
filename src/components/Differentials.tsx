'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const ITEMS = ['d1', 'd2', 'd3', 'd4'] as const

export default function Differentials() {
  const { t } = useLanguage()

  return (
    <section id="differentials" aria-labelledby="diff-title" className="bg-sign py-16 sm:py-24">
      <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="diff-title"
            className="font-display text-[clamp(3rem,8vw,5.2rem)] font-extrabold uppercase leading-[0.88] text-ink lg:col-span-7"
          >
            {t('diff.title')}
          </h2>
          <p className="max-w-[48ch] text-[1.15rem] leading-relaxed text-sign-ink lg:col-span-5">{t('diff.lede')}</p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((k) => (
            <li key={k} className="plate plate-paper plate-screws px-6 pb-9 pt-11">
              <h3 className="font-display text-[1.6rem] font-extrabold uppercase leading-[0.95] text-ink">{t(`diff.${k}Title`)}</h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-steel">{t(`diff.${k}Text`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
