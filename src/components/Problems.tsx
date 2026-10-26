'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const ITEMS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] as const

/** Sinais de que a empresa precisa de sistema ou automação — o visitante se reconhece antes de ver a oferta. */
export default function Problems() {
  const { t } = useLanguage()

  return (
    <section id="problems" aria-labelledby="problems-title" className="bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="problems-title"
            className="font-display text-[clamp(3rem,8vw,5.2rem)] font-extrabold uppercase leading-[0.88] text-ink lg:col-span-7"
          >
            {t('problems.title')}
          </h2>
          <p className="max-w-[48ch] text-[1.15rem] leading-relaxed text-steel lg:col-span-5">{t('problems.lede')}</p>
        </div>
        <ul className="mt-10 grid gap-x-8 border-t-[3px] border-ink md:grid-cols-2">
          {ITEMS.map((k, i) => (
            <li key={k} className="flex gap-4 border-b-2 border-ink/15 py-5">
              <span className="tabular font-display text-[1.8rem] font-extrabold leading-none text-ink" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[1.1rem] leading-snug text-ink">{t(`problems.${k}`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
