'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { whatsappLink } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'

/** Atalho de WhatsApp: só aparece depois da dobra, quando o botão do hero já saiu da tela. */
export default function WhatsAppButton() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappLink(t('hero.whatsappMessage'))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { location: 'floating' })}
      aria-label={t('hero.ctaWhatsapp')}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-10px_rgb(15_23_42/0.5)] transition-all duration-300 ease-out hover:scale-105 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
    </a>
  )
}
