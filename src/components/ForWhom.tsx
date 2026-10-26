'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const GROUPS = ['g1', 'g2', 'g3'] as const

/** Quem pode contratar: pessoa física, pequeno negócio e empresa, cada um com um exemplo. */
export default function ForWhom() {
  const { t } = useLanguage()

  return (
    <section id="for-whom" aria-labelledby="for-whom-title" className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="for-whom-title"
            className="font-display text-[clamp(3.2rem,9vw,5.6rem)] font-extrabold uppercase leading-[0.88] text-white lg:col-span-6"
          >
            {t('forWhom.title')}
          </h2>
          <p className="max-w-[52ch] text-[1.125rem] leading-relaxed text-white/80 lg:col-span-6">{t('forWhom.lede')}</p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {GROUPS.map((g) => (
            <li key={g} className="rounded-[10px] border-2 border-sign p-6 sm:p-7">
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-sign-ink">
                {t(`forWhom.${g}Label`)}
              </p>
              <h3 className="mt-3 font-display text-[1.8rem] font-extrabold uppercase leading-[0.95] text-white">
                {t(`forWhom.${g}Title`)}
              </h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-white/80">{t(`forWhom.${g}Text`)}</p>
              <p className="mt-4 border-l-[3px] border-sign pl-3 text-[15px] font-semibold text-white">
                {t(`forWhom.${g}Example`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
