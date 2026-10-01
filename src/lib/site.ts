/** Contatos e arquivos do site — fonte única (vault: 2-Áreas/Pessoal/Contatos.md). */
export const SITE = {
  url: 'https://sthevandev.vercel.app',
  email: 'sthevan.ssantos@gmail.com',
  phoneDisplay: '+55 (27) 98877-2784',
  whatsappNumber: '5527988772784',
  linkedin: 'https://www.linkedin.com/in/sthevanssantos',
  github: 'https://github.com/sthevan027',
  instagram: 'https://instagram.com/sthevan.dev',
  resumeDev: `/curriculo/programacao/${encodeURIComponent('Sthevan Santos _ Desenvolvedor Web.pdf')}`,
  resumeAuto: `/curriculo/eletrica/${encodeURIComponent('Curriculo sthevan - Automacao e Eletrica.pdf')}`,
} as const

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}
