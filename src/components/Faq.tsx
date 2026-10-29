'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const ITEMS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const

/** Dúvidas de cliente, com resposta visível. Usa <details>: funciona sem JavaScript. */
export default function Faq() {
  const { t } = useLanguage()

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper py-12 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">{t('faq.eyebrow')}</p>
            <h2 id="faq-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3rem)] font-extrabold text-ink">
              {t('faq.title')}
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-steel">{t('faq.lede')}</p>
          </div>

          <div className="lg:col-span-8">
            <ul className="plate divide-y divide-line">
              {ITEMS.map((k) => (
                <li key={k}>
                  <details className="group p-6 sm:p-7">
                    <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-[1.1rem] font-bold text-ink [&::-webkit-details-marker]:hidden">
                      {t(`faq.${k}Q`)}
                      <span
                        aria-hidden
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sign-soft text-lg font-bold text-sign transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-[64ch] text-[1.02rem] leading-relaxed text-steel">{t(`faq.${k}A`)}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
