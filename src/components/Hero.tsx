'use client'

import Image from 'next/image'
import { ArrowDown, Check, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { SITE, whatsappLink } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'

/**
 * Dobra do sistema v2: uma promessa clara para o cliente, prova logo abaixo e
 * duas ações — orçamento no WhatsApp (principal) e ver casos (secundária).
 */
export default function Hero() {
  const { t } = useLanguage()
  const proof = [t('hero.proof1'), t('hero.proof2'), t('hero.proof3')]

  return (
    <section id="home" className="relative overflow-hidden bg-white pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-site items-center gap-12 px-4 pb-10 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-14">
        <div className="lg:col-span-7">
          <p className="eyebrow">{t('hero.eyebrow')}</p>

          <h1 className="mt-4 text-[clamp(2.5rem,5.6vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink">
            {t('hero.headline')}
          </h1>

          <p className="mt-6 max-w-[56ch] text-[1.125rem] leading-relaxed text-steel">{t('hero.lede')}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-auto w-full whitespace-normal py-3 text-left sm:w-auto">
              <a
                href={whatsappLink(t('hero.whatsappMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'hero' })}
              >
                <MessageCircle aria-hidden />
                {t('hero.ctaWhatsapp')}
              </a>
            </Button>
            <Button asChild variant="outlineSign" size="lg" className="w-full sm:w-auto">
              <a href="#cases" onClick={() => trackEvent('cases_click', { location: 'hero' })}>
                {t('hero.ctaCases')}
                <ArrowDown aria-hidden />
              </a>
            </Button>
          </div>

          <ul className="mt-10 grid gap-3 text-[15px] text-ink sm:grid-cols-3">
            {proof.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sign-soft text-sign">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="leading-snug">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="lg:col-span-5">
          <div className="plate mx-auto max-w-[420px] overflow-hidden p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[12px]">
              <Image
                src="/sthevan-perfil.jpg"
                alt={t('hero.photoAlt')}
                fill
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 420px, calc(100vw - 32px)"
                quality={75}
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-4 text-center text-[15px] text-steel">
            {SITE.name} · {t('hero.location')}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
