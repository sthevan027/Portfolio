'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { whatsappLink } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'

const STEPS = ['s1', 's2', 's3'] as const

/** Três passos até a entrega. Sem preço nem prazo publicados. */
export default function HowIWork() {
  const { t } = useLanguage()

  return (
    <section id="how-i-work" aria-labelledby="how-title" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="how-title"
            className="font-display text-[clamp(3.2rem,9vw,5.6rem)] font-extrabold uppercase leading-[0.88] text-ink lg:col-span-6"
          >
            {t('howWork.title')}
          </h2>
          <p className="max-w-[52ch] text-[1.125rem] leading-relaxed text-steel lg:col-span-6">{t('howWork.lede')}</p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s} className="plate plate-screws flex flex-col px-6 py-9 sm:px-8">
              <span className="font-display text-[3.2rem] font-extrabold leading-none text-sign tabular" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-[1.7rem] font-extrabold uppercase leading-[0.95] text-ink">
                {t(`howWork.${s}Title`)}
              </h3>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-steel">{t(`howWork.${s}Text`)}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-start">
          <Button asChild size="lg" className="h-auto max-w-full whitespace-normal py-3 text-left text-base sm:text-lg">
            <a
              href={whatsappLink(t('hero.whatsappMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'how_i_work' })}
            >
              <MessageCircle aria-hidden />
              {t('hero.ctaWhatsapp')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
