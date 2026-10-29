'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { whatsappLink } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'

const STEPS = ['s1', 's2', 's3'] as const

/** Três passos até a entrega. Preço e prazo médios ficam no FAQ; o valor exato vem na proposta. */
export default function HowIWork() {
  const { t } = useLanguage()

  return (
    <section id="how-i-work" aria-labelledby="how-title" className="bg-paper py-12 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t('howWork.eyebrow')}</p>
          <h2 id="how-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('howWork.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('howWork.lede')}</p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s} className="plate flex flex-col p-7 sm:p-8">
              <span className="tabular flex h-10 w-10 items-center justify-center rounded-full bg-sign text-[15px] font-bold text-white" aria-hidden>
                {i + 1}
              </span>
              <h3 className="mt-5 text-[1.4rem] font-bold leading-tight text-ink">{t(`howWork.${s}Title`)}</h3>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-steel">{t(`howWork.${s}Text`)}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-start">
          <Button asChild size="lg" className="h-auto w-full whitespace-normal py-3 text-left sm:w-auto">
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
