/** Contatos e arquivos do site — fonte única (vault: 2-Áreas/Pessoal/Contatos.md). */
export const SITE = {
  url: 'https://sthevandev.vercel.app',
  name: 'Sthevan Santos',
  brand: 'Virex',
  email: 'sthevan.ssantos@gmail.com',
  phoneDisplay: '+55 (27) 98877-2784',
  whatsappNumber: '5527988772784',
  linkedin: 'https://www.linkedin.com/in/sthevanssantos',
  github: 'https://github.com/sthevan027',
  instagram: 'https://instagram.com/sthevan.dev',
  resumeDev: `/curriculo/programacao/${encodeURIComponent('Sthevan Santos _ Desenvolvedor Web.pdf')}`,
  resumeAuto: `/curriculo/eletrica/${encodeURIComponent('Curriculo sthevan - Automacao e Eletrica.pdf')}`,
} as const

/** Tipos de necessidade do formulário comercial (o `value` viaja para a API). */
export const NEED_TYPES = ['sistema', 'automacao', 'manutencao', 'outro'] as const
export type NeedType = (typeof NEED_TYPES)[number]

/** Data fixa do último conteúdo relevante — o sitemap não deve mudar a cada build. */
export const CONTENT_UPDATED = '2026-10-22'

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}
