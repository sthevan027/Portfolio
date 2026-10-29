'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle2, Loader2, Mail, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/contexts/LanguageContext'
import { SITE, NEED_TYPES, whatsappLink } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'

const EMPTY = { name: '', company: '', contact: '', need: '', message: '', website: '' }

const NEED_KEY = {
  sistema: 'contact.needSistema',
  automacao: 'contact.needAutomacao',
  manutencao: 'contact.needManutencao',
  outro: 'contact.needOutro',
} as const

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      // a confirmação só aparece quando o servidor confirmou o envio
      if (!res.ok || data.success !== true) {
        setError(res.status === 400 ? t('contact.errorValidation') : t('contact.errorRetry'))
        setStatus('error')
        trackEvent('form_error', { status: res.status })
        return
      }
      setStatus('sent')
      setForm(EMPTY)
      trackEvent('form_submit', { need: form.need })
    } catch {
      setError(t('contact.errorRetry'))
      setStatus('error')
      trackEvent('form_error', { status: 0 })
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-paper py-12 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h2 id="contact-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('contact.lede')}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="plate plate-ink flex flex-col p-7 sm:p-8">
              <h3 className="text-[1.5rem] font-bold text-white">{t('contact.clientTitle')}</h3>
              <p className="mt-2 text-[1rem] leading-relaxed text-white/80">{t('contact.clientText')}</p>
              <Button asChild size="lg" className="mt-6 w-full">
                <a
                  href={whatsappLink(t('hero.whatsappMessage'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'contact' })}
                >
                  <MessageCircle aria-hidden />
                  {t('contact.whatsapp')}
                </a>
              </Button>
              <p className="mt-3 text-center text-[15px] text-white/70">{SITE.phoneDisplay}</p>
              <p className="mt-4 text-center">
                <a
                  href={`mailto:${SITE.email}`}
                  onClick={() => trackEvent('email_click', { location: 'contact' })}
                  className="inline-flex min-h-[44px] items-center gap-2 text-white underline underline-offset-4 hover:text-sign-ink"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="plate h-full p-7 sm:p-9">
              <h3 className="text-[1.5rem] font-bold text-ink">{t('contact.formTitle')}</h3>

              {status === 'sent' ? (
                <div className="mt-8 flex flex-col items-start gap-4" role="status">
                  <CheckCircle2 className="h-12 w-12 text-sign" aria-hidden />
                  <p className="text-[1.5rem] font-bold text-ink">{t('contact.success')}</p>
                  <p className="text-steel">{t('contact.successText')}</p>
                  <Button type="button" variant="link" size="sm" className="text-base" onClick={() => setStatus('idle')}>
                    {t('contact.sendAnother')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                  {status === 'error' && error && (
                    <div role="alert" className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-[15px] font-medium text-destructive sm:col-span-2">
                      <p className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                        {error}
                      </p>
                      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 pl-6 font-normal">
                        {t('contact.errorFallback')}
                        <a
                          href={whatsappLink(t('hero.whatsappMessage'))}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent('whatsapp_click', { location: 'form_error' })}
                          className="font-semibold underline"
                        >
                          WhatsApp
                        </a>
                        <a href={`mailto:${SITE.email}`} className="font-semibold underline">
                          {SITE.email}
                        </a>
                      </p>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="contact-name">{t('contact.name')}</Label>
                    <Input id="contact-name" name="name" required maxLength={120} autoComplete="name" value={form.name} onChange={onChange} placeholder={t('contact.namePlaceholder')} />
                  </div>
                  <div>
                    <Label htmlFor="contact-company">{t('contact.company')}</Label>
                    <Input id="contact-company" name="company" maxLength={120} autoComplete="organization" value={form.company} onChange={onChange} placeholder={t('contact.companyPlaceholder')} />
                  </div>
                  <div>
                    <Label htmlFor="contact-contact">{t('contact.contactField')}</Label>
                    <Input id="contact-contact" name="contact" required maxLength={160} autoComplete="email" value={form.contact} onChange={onChange} placeholder={t('contact.contactPlaceholder')} />
                  </div>
                  <div>
                    <Label htmlFor="contact-need">{t('contact.need')}</Label>
                    <select
                      id="contact-need"
                      name="need"
                      required
                      value={form.need}
                      onChange={onChange}
                      className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[1rem] text-ink focus:border-sign focus:outline-none focus:ring-2 focus:ring-sign/30"
                    >
                      <option value="" disabled>
                        {t('contact.needPlaceholder')}
                      </option>
                      {NEED_TYPES.map((n) => (
                        <option key={n} value={n}>
                          {t(NEED_KEY[n])}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="contact-message">{t('contact.message')}</Label>
                    <Textarea id="contact-message" name="message" required rows={6} maxLength={4000} value={form.message} onChange={onChange} placeholder={t('contact.messagePlaceholder')} />
                  </div>
                  {/* campo-armadilha para robôs: invisível e fora da ordem de tabulação */}
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                    <label htmlFor="contact-website">Website</label>
                    <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
                  </div>
                  <p className="text-[14px] text-steel sm:col-span-2">
                    {t('contact.privacy')}{' '}
                    <Link href="/privacidade" className="font-semibold underline">
                      {t('contact.privacyLink')}
                    </Link>
                    .
                  </p>
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                      {status === 'sending' ? <Loader2 className="animate-spin" aria-hidden /> : <Send aria-hidden />}
                      {status === 'sending' ? t('contact.sending') : t('contact.send')}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
