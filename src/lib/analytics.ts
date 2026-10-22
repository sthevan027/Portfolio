/**
 * Eventos de conversão. Só chegam ao Google Analytics se o visitante aceitou os
 * cookies de medição (ver components/Analytics.tsx); sem consentimento ou sem
 * NEXT_PUBLIC_GA_ID configurado, a chamada não faz nada.
 */
type Gtag = (command: 'event', name: string, params?: Record<string, string | number>) => void

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === 'undefined') return
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag === 'function') gtag('event', name, params)
}
