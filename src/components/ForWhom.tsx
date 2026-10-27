'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const GROUPS = ['g1', 'g2', 'g3'] as const

/** Quem pode contratar: pessoa física, pequeno negócio e empresa, cada um com um exemplo. */
export default function ForWhom() {
  const { t } = useLanguage()

  return (
    <section id="for-whom" aria-labelledby="for-whom-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t('forWhom.eyebrow')}</p>
          <h2 id="for-whom-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('forWhom.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('forWhom.lede')}</p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {GROUPS.map((g) => (
            <li key={g} className="plate flex flex-col p-7 sm:p-8">
              <span className="self-start rounded-full bg-sign-soft px-3 py-1 text-[13px] font-semibold text-sign">
                {t(`forWhom.${g}Label`)}
              </span>
              <h3 className="mt-5 text-[1.5rem] font-bold leading-tight text-ink">{t(`forWhom.${g}Title`)}</h3>
              <p className="mt-3 flex-1 text-[1rem] leading-relaxed text-steel">{t(`forWhom.${g}Text`)}</p>
              <p className="mt-5 rounded-xl bg-paper p-4 text-[15px] leading-snug text-ink">{t(`forWhom.${g}Example`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
