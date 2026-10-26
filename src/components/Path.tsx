'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const STEPS = ['s1', 's2', 's3', 's4'] as const

/** Trajetória como placas de rota: cada etapa aponta para a próxima. */
export default function Path() {
  const { t } = useLanguage()

  return (
    <section id="path" className="bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-[clamp(3.6rem,10vw,6rem)] font-extrabold uppercase leading-[0.85] text-sign lg:col-span-6">
            {t('path.title')}
          </h2>
          <p className="max-w-[48ch] text-[1.2rem] leading-relaxed text-paper/80 lg:col-span-6">{t('path.lede')}</p>
        </div>

        <ol className="mt-12 grid gap-5 lg:grid-cols-4 lg:gap-4">
          {STEPS.map((s) => (
            <li key={s} className="flex flex-col">
              <div
                className="flex h-16 items-center bg-sign pl-5 pr-10 font-display text-[1.35rem] font-extrabold uppercase tracking-wide text-white [clip-path:polygon(0_0,calc(100%-28px)_0,100%_50%,calc(100%-28px)_100%,0_100%)]"
              >
                <span className="tabular">{t(`path.${s}Period`)}</span>
              </div>
              <div className="mt-[-1px] flex-1 rounded-b-[10px] border-[3px] border-t-0 border-sign/90 p-5">
                <h3 className="font-display text-[1.7rem] font-extrabold uppercase leading-[0.95] text-paper">
                  {t(`path.${s}Title`)}
                </h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-paper/75">{t(`path.${s}Text`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
