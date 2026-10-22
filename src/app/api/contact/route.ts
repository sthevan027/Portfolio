import { NextRequest, NextResponse } from 'next/server'
import { NEED_TYPES, SITE } from '@/lib/site'

/**
 * Formulário comercial. Envia o e-mail pela API do Resend; sem as variáveis de
 * ambiente abaixo a rota responde 503 e o site NÃO mostra confirmação de envio.
 *
 *   RESEND_API_KEY      chave do Resend (só no servidor)
 *   CONTACT_TO_EMAIL    destino (padrão: e-mail do site)
 *   CONTACT_FROM_EMAIL  remetente verificado (padrão: onboarding@resend.dev,
 *                       que só entrega para o e-mail dono da conta Resend)
 */

const NEED_LABEL: Record<(typeof NEED_TYPES)[number], string> = {
  sistema: 'Sistema personalizado',
  automacao: 'Automação de processos',
  manutencao: 'Manutenção e melhoria de sistema',
  outro: 'Outro assunto',
}

const LIMITS = { name: 120, company: 120, contact: 160, message: 4000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// limite simples por IP; vale por instância (best effort contra rajadas)
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 500) hits.clear()
  return recent.length > MAX_HITS
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function isPhone(v: string) {
  const digits = v.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Muitas tentativas. Aguarde alguns minutos.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 })
  }

  // campo-armadilha: humanos não preenchem; responde ok sem enviar nada
  if (clean(body.website, 200)) return NextResponse.json({ success: true })

  const name = clean(body.name, LIMITS.name)
  const company = clean(body.company, LIMITS.company)
  const contact = clean(body.contact, LIMITS.contact)
  const need = clean(body.need, 20) as (typeof NEED_TYPES)[number]
  const message = clean(body.message, LIMITS.message)

  if (!name || !contact || !message || !NEED_TYPES.includes(need)) {
    return NextResponse.json({ error: 'Preencha nome, contato, tipo de necessidade e descrição.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(contact) && !isPhone(contact)) {
    return NextResponse.json({ error: 'Informe um e-mail ou WhatsApp válido.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Contato: RESEND_API_KEY não configurada — mensagem não enviada.')
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const contactIsEmail = EMAIL_RE.test(contact)
  const html = `
    <h2>Novo contato pelo site</h2>
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(company || '—')}</p>
    <p><strong>Contato:</strong> ${escapeHtml(contact)}</p>
    <p><strong>Necessidade:</strong> ${NEED_LABEL[need]}</p>
    <p><strong>Descrição:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || `Site ${SITE.name} <onboarding@resend.dev>`,
        to: [process.env.CONTACT_TO_EMAIL || SITE.email],
        subject: `Novo contato (${NEED_LABEL[need]}): ${name.replace(/[\r\n]+/g, ' ')}`,
        html,
        ...(contactIsEmail ? { reply_to: contact } : {}),
      }),
    })
    if (!res.ok) {
      console.error('Contato: Resend respondeu', res.status, await res.text().catch(() => ''))
      return NextResponse.json({ error: 'send_failed' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contato: falha ao chamar o Resend', error)
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }
}
