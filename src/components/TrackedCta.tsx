'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { whatsappLink } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'

/** Par de botões de conversão das páginas internas: orçamento (formulário na home) e WhatsApp. */
export default function TrackedCta({ location, message }: { location: string; message: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button asChild>
        <Link href="/#contact" onClick={() => trackEvent('quote_click', { location })}>
          Solicitar orçamento
        </Link>
      </Button>
      <Button asChild variant="route">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { location })}
        >
          <MessageCircle aria-hidden />
          Chamar no WhatsApp
        </a>
      </Button>
    </div>
  )
}
