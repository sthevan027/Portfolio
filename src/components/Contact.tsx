'use client'

import { useState } from 'react'
import { AlertCircle, ArrowUpRight, CheckCircle2, Download, Loader2, Mail, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/contexts/LanguageContext'
import { SITE, whatsappLink } from '@/lib/site'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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
      if (!res.ok) {
        setError(data.error || t('contact.errorGeneric'))
        setStatus('error')
        return
      }
      setStatus('sent')
      setForm(EMPTY)
    } catch {
      setError(t('contact.errorRetry'))
      setStatus('error')
    }
  }

  const linkClass =
    'inline-flex min-h-[44px] items-center gap-2 font-display text-[1.2rem] font-bold uppercase tracking-wide text-ink underline decoration-2 underline-offset-[5px] hover:text-route-deep'

  return (
    <section id="contact" className="bg-sign">
      <div className="hazard h-7" aria-hidden />
      <div className="mx-auto max-w-site px-3 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-[clamp(3.6rem,10vw,6rem)] font-extrabold uppercase leading-[0.85] text-ink lg:col-span-8">
            {t('contact.title')}
          </h2>
          <p className="text-[1.2rem] font-semibold text-sign-ink lg:col-span-4">{t('contact.lede')}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <div className="plate plate-screws px-6 py-11 sm:px-9">
              <h3 className="font-display text-[2rem] font-extrabold uppercase text-ink">{t('contact.recruiterTitle')}</h3>
              <p className="mt-2 text-steel">{t('contact.recruiterText')}</p>
              <ul className="mt-5 space-y-1">
                <li>
                  <a href={SITE.resumeDev} download className={linkClass}>
                    <Download className="h-5 w-5" aria-hidden />
                    {t('contact.resumeDev')}
                  </a>
                </li>
                <li>
                  <a href={SITE.resumeAuto} download className={linkClass}>
                    <Download className="h-5 w-5" aria-hidden />
                    {t('contact.resumeAuto')}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className={linkClass}>
                    <Mail className="h-5 w-5" aria-hidden />
                    {SITE.email}
                  </a>
                </li>
                <li className="flex flex-wrap gap-x-6">
                  <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    LinkedIn
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                  <a href={SITE.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    GitHub
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              </ul>
            </div>

            <div className="plate plate-ink plate-screws px-6 py-11 text-paper sm:px-9">
              <h3 className="font-display text-[2rem] font-extrabold uppercase text-sign">{t('contact.clientTitle')}</h3>
              <p className="mt-2 text-paper/80">{t('contact.clientText')}</p>
              <Button asChild variant="route" size="lg" className="mt-6 w-full">
                <a href={whatsappLink(t('hero.whatsappMessage'))} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden />
                  {t('contact.whatsapp')}
                </a>
              </Button>
              <p className="mt-3 text-center text-[15px] text-paper/70">{SITE.phoneDisplay}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="plate plate-screws h-full px-6 py-11 sm:px-9">
              <h3 className="font-display text-[2rem] font-extrabold uppercase text-ink">{t('contact.formTitle')}</h3>

              {status === 'sent' ? (
                <div className="mt-8 flex flex-col items-start gap-4" role="status">
                  <CheckCircle2 className="h-12 w-12 text-route" aria-hidden />
                  <p className="font-display text-[1.8rem] font-extrabold uppercase text-ink">{t('contact.success')}</p>
                  <p className="text-steel">{t('contact.successText')}</p>
                  <Button type="button" variant="link" size="sm" className="text-lg" onClick={() => setStatus('idle')}>
                    {t('contact.sendAnother')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                  {status === 'error' && error && (
                    <p
                      role="alert"
                      className="flex items-start gap-2 rounded-[6px] border-[3px] border-destructive bg-destructive/10 px-3 py-2.5 text-[15px] font-semibold text-destructive sm:col-span-2"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      {error}
                    </p>
                  )}
                  <div>
                    <Label htmlFor="contact-name">{t('contact.name')}</Label>
                    <Input id="contact-name" name="name" required autoComplete="name" value={form.name} onChange={onChange} placeholder={t('contact.namePlaceholder')} />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">{t('contact.email')}</Label>
                    <Input id="contact-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={onChange} placeholder={t('contact.emailPlaceholder')} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="contact-subject">{t('contact.subject')}</Label>
                    <Input id="contact-subject" name="subject" required value={form.subject} onChange={onChange} placeholder={t('contact.subjectPlaceholder')} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="contact-message">{t('contact.message')}</Label>
                    <Textarea id="contact-message" name="message" required rows={6} value={form.message} onChange={onChange} placeholder={t('contact.messagePlaceholder')} />
                  </div>
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
