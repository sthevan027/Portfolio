'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { SITE, whatsappLink } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="bg-sign pt-16">
      <div className="mx-auto max-w-site px-3 pb-6 pt-6 sm:px-6 lg:px-8 lg:pb-6 lg:pt-6">
        {/* a dobra inteira é uma placa: borda interna preta, cantos de chapa */}
        <div className="plate plate-sign plate-screws px-6 pb-11 pt-11 sm:px-10 lg:px-14 lg:pb-10 lg:pt-11">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="inline-block rounded-[6px] bg-ink px-3 py-1.5 font-display text-[15px] font-bold uppercase tracking-wider text-sign sm:text-base">
                {t('hero.eyebrow')}
              </p>

              <h1 className="mt-4 font-display text-[clamp(2.5rem,6.4vw,4.4rem)] font-extrabold uppercase leading-[0.92] text-ink">
                {t('hero.headline')}
              </h1>

              <p className="mt-5 max-w-[58ch] text-[1.125rem] leading-relaxed text-ink">{t('hero.lede')}</p>
              <p className="mt-3 max-w-[58ch] text-[1rem] leading-relaxed text-sign-ink">{t('hero.background')}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild>
                  <a href="#contact" onClick={() => trackEvent('quote_click', { location: 'hero' })}>
                    {t('hero.ctaQuote')}
                    <ArrowRight aria-hidden />
                  </a>
                </Button>
                <Button asChild variant="route">
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
                <Button asChild variant="link">
                  <Link href="/servicos">{t('hero.ctaServices')}</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="mx-auto max-w-[400px]">
                <div className="plate plate-paper plate-screws px-5 pb-9 pt-10">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] border-[3px] border-ink">
                    <Image
                      src="/sthevan-perfil.jpg"
                      alt={t('hero.photoAlt')}
                      fill
                      sizes="(min-width: 1024px) 360px, min(360px, calc(100vw - 112px))"
                      quality={70}
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="px-1 pb-1 pt-3 font-display text-[15px] font-bold uppercase tracking-wide text-ink">
                    {SITE.name} · {t('hero.location')}
                  </figcaption>
                </div>
              </figure>
            </div>
          </div>

          <p className="mt-6 inline-flex items-center gap-3 rounded-[6px] bg-ink px-4 py-2.5 font-display text-[15px] font-bold uppercase tracking-wider text-sign sm:text-base">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-sign opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sign" />
            </span>
            {t('hero.available')}
          </p>
        </div>
      </div>
      <div className="hazard h-7" aria-hidden />
    </section>
  )
}
